import { useState, useEffect } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout({
    busFound,
    name,
    uname,
    destination,
    departure,
    passengers,
    Fare,
    date,
    time
  }) {

    const [orderToken, setOrderToken] = useState(null);
    const [error, setError] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState("");
    const navigate = useNavigate();
    const createOrder = async () => {
        try {
            const response = await axios.post("https://rtc-app-bayg.onrender.com/payment"); // Backend generates both sessionId and orderId
            const data = response.data;
            console.log(data);
            if (data.success) {
                setOrderToken(data.payment_session_id);
                setOrderId(data.orderId);
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError("Error fetching order token");
        }
    };

    useEffect(() => {
        if (orderToken) {
            console.log("Updated Order Token:", orderToken);
        }
        const currentUser = JSON.parse(localStorage.getItem("user"));
        console.log(currentUser);
    }, [orderToken]);


    const booktkt = async () => {

    const username = JSON.parse(localStorage.getItem("user"));
    if (!username) {
        alert("User not found in localStorage.");
        return;
    }

    const currentDate = new Date();
    const dt = `${String(currentDate.getDate()).padStart(2, "0")}-${String(
        currentDate.getMonth() + 1
    ).padStart(2, "0")}-${currentDate.getFullYear()}`;
    const tme = `${String(currentDate.getHours()).padStart(2, "0")}:${String(
        currentDate.getMinutes()
    ).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(2, "0")}`;


    const bookingDetails = {
        name: username, 
        uname, 
        destination,
        departure,
        passengers,
        Fare,
        date : dt,
        time : tme
      };
      console.log(bookingDetails);

    try {

        await axios.put("https://rtc-app-bayg.onrender.com/createticket", bookingDetails );
        navigate("/History"); // Redirect to History page after booking
    } catch (error) {
        alert("Error booking ticket. Please try again.");
        console.error(error);
    }
};

    useEffect(()=>{

        if(paymentStatus ==="Success"){
           
            booktkt();
        }
    },[paymentStatus])

    const doPayment = async () => {
        if (!orderToken) {
            console.error("Order token is not available");
            return;
        }
         console.log("ksdfnsdn ");
        const cashfree = await load({ mode: "production" });
    
        const checkoutOptions = {
            paymentSessionId: orderToken,
            redirectTarget: "_blank", // Open payment page in a new tab
        };
    
        cashfree.checkout(checkoutOptions);
    
        // Add a delay before polling starts
        setTimeout(() => {
            startPaymentStatusPolling();
        }, 10000); // 10-second delay
    };
    
    

    const startPaymentStatusPolling = () => {
        const pollingDuration = 2 * 60 * 1000; // 2 minutes in milliseconds
        const startTime = Date.now();
        const interval = setInterval(async () => {
            try {
                const response = await axios.post("https://rtc-app-bayg.onrender.com/fetch", {
                    orderId,
                });
    
                console.log("-----------------");
                 console.log( response.data.orderStatus) ;
                 console.log("-----------------");
                 console.log(response);
                if (response.data.success) {
                    const status = response.data.orderStatus;
                    if (status === "Success" || status === "Failure") {
                        clearInterval(interval); // Stop polling when payment is finalized
                        setPaymentStatus(status);
                    } else {
                        setPaymentStatus("Pending"); // Intermediate state
                    }
    
                    console.log("Payment Status:", status);
                }
                else if( response.data.orderStatus == "ACTIVE"){
                    setPaymentStatus("Processing");
                    console.log("payment is inprocss");
                }
                else if (response.data.error?.code === "order_not_found") {
                    // Continue polling, as the order might still be initializing
                    console.log("Order not found, retrying...");
                } 
            } catch (error) {
                console.error("Error fetching status:", error);
                clearInterval(interval);
                setPaymentStatus("Error fetching payment status");
            }

            if (Date.now() - startTime > pollingDuration) {
                clearInterval(interval);
                console.log("Polling stopped after 2 minutes");
                alert("Paymentment failure due to  timeout");
                setPaymentStatus(" Paymentment failure due to  timeout");
            }

        }, 2000); 
    };

   
    
    

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="row flex flex-col gap-2 ">
           <div>
           <button
                type="button"
                disabled={!busFound}
                className={`hover:shadow-form rounded-md py-3 px-8 text-center cursor-pointer text-base font-semibold text-white outline-none ${
                    busFound ? "bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                }`}
                id="generateBtn"
                onClick={createOrder}
            >
                Generate Order
            </button>

            {orderToken && (
                    <button
                    type="button"
                    disabled={!busFound}
                    className={`hover:shadow-form rounded-md py-3 px-8 text-center cursor-pointer text-base font-semibold text-white outline-none ${
                        busFound ? "bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                    id="renderBtn"
                    onClick={doPayment} // Just call doPayment
                >
                    Pay Now
                </button>
               
            
            )}
           </div>
           <div>

            {paymentStatus}
           </div>
          
            {/* <button  
             className="p-2 bg-blue-700" type="button"
             onClick={()=>{
                setPaymentStatus("Success")
             }}
            >book ticket</button> */}

        </div>
    );
}

export default Checkout;
