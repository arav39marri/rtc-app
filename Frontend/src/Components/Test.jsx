import { useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import axios from 'axios';

function Checkout({busFound}) {
    const [orderToken, setOrderToken] = useState(null);
    const [error, setError] = useState(null);

    const createOrder = async () => {
        try {
            // Send a POST request to generate a new order token
            const response = await axios.post("http://localhost:2000/payment");
            const data = response.data;
            // console.log(data) ;
            // console.log(response.payment_session_id) ;

            if (data.success) {
                setOrderToken(data.payment_session_id); 
                 // Set the order token state
                 console.log("success ");
                 console.log(orderToken)
                 console.log('printed')
                //  doPayment() ;
            } else {
                setError(data.error);  // Handle error if order creation fails
            }
        } catch (error) {
            setError("Error fetching order token");
            console.error(error);
        }
    };

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
                <button type="submit" disabled={!busFound}
                
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
