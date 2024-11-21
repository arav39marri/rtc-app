import { useState } from "react";
import { useEffect } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import axios from 'axios';

function Checkout({busFound}) {
    const [orderToken, setOrderToken] = useState(null);
    const [error, setError] = useState(null);

    const createOrder = async () => {
        try {
            // Send a POST request to generate a new order token
            const response = await axios.post("https://rtc-app-bayg.onrender.com/payment");
            const data = response.data;
            console.log("Response Data:", data);
    
            if (data.success) {
                const sessionId = data.payment_session_id;
                setOrderToken(sessionId); // Update the state
                console.log("Session ID (from response):", sessionId); // Log immediately
            } else {
                setError(data.error); // Handle error if order creation fails
            }
        } catch (error) {
            setError("Error fetching order token");
            console.error(error);
        }
    };
    
    // UseEffect to monitor `orderToken` state
    useEffect(() => {
        if (orderToken) {
            console.log("Updated Order Token (from state):", orderToken);
        }
    }, [orderToken]);
    

    const doPayment = async () => {
        if (!orderToken) {
            console.error("Order token is not available");
            return;
        }

        const cashfree = await load({
             mode: "production"
        });

        let checkoutOptions = {
            paymentSessionId: orderToken,  // Use the order token here
            redirectTarget: "_self",
        };

        cashfree.checkout(checkoutOptions);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="row">
           
            <button type="button" disabled={!busFound}     className={`hover:shadow-form rounded-md py-3 px-8 text-center cursor-pointer text-base font-semibold text-white outline-none ${
                    busFound ? "bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                  }`} id="generateBtn" onClick={createOrder}>
                Generate Order
            </button>
            {orderToken && (
                <button type="button" disabled={!busFound}
                
                className={`hover:shadow-form rounded-md py-3 px-8 text-center cursor-pointer text-base font-semibold text-white outline-none ${
                    busFound ? "bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                  }`} id="renderBtn"
                 onClick={doPayment}>
                    Pay Now
                </button>
            )}
        </div>
    );
}

export default Checkout;
