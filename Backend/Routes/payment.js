// const express = require('express');
// const { Cashfree } = require('cashfree-pg');
// const router = express.Router();

// // Middleware for parsing JSON and raw body (for webhook signature verification)
// router.use(express.json());
// router.use(express.raw({ type: 'application/json' }));  // Middleware to handle raw body for webhook verification

// // Set Cashfree credentials and environment
// Cashfree.XClientId = "TEST10352759c8e1abc8e29f595783cc95725301";
// Cashfree.XClientSecret = "cfsk_ma_test_01924e7e9f747742ec1bef99f6eb18d9_076fcb6b";
// Cashfree.XEnvironment = Cashfree.Environment.TEST; // or PRODUCTION

// router.post('/', (req, res) => {
//     console.log("Received request to create order");
//     console.log("Order details:", req.body); // Logs the received order details

//     const request = {
//         order_amount: req.body.amount,
//         order_currency: "INR",
//         customer_details: {
//             customer_id: req.body.customer_id,
//             customer_name: req.body.customer_name,
//             customer_email: req.body.customer_email,
//             customer_phone: req.body.customer_phone,
//         },
//         order_meta: {
//             return_url: "http://localhost:3000", // Change to your frontend return URL
//         },
//         order_note: req.body.note || "payment page",
//     };

//     const orderId = `order_${Date.now()}`; // Generate a unique order ID
//     console.log("Generated Order ID:", orderId);  // Logs the generated Order ID

//     // Create order using Cashfree API
//     Cashfree.PGCreateOrder(orderId, request)
//         .then((response) => {
//             console.log("Order created successfully:", response.data); // Logs the successful response from Cashfree
//             res.status(200).json({
//                 success: true,
//                 order_token: response.data.order_token,
//                 order_id: orderId,
//             });
//         })
//         .catch((error) => {
//             console.error("Error creating order:", error.response?.data || error.message); // Logs error response
//             res.status(500).json({
//                 success: false,
//                 error: error.response?.data || error.message,
//             });
//         });
// });
// /// Route to handle webhook verification
// router.post('/webhook', (req, res) => {
//     console.log("Received webhook for signature verification");
//     const signature = req.headers["x-webhook-signature"];
//     const timestamp = req.headers["x-webhook-timestamp"];
//     const rawBody = req.rawBody;  // Raw body used for signature verification

//     console.log("Received Webhook Signature:", signature);
//     console.log("Received Webhook Timestamp:", timestamp);

//     try {
//         // Verify the webhook signature
//         const isValidSignature = Cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);

//         if (isValidSignature) {
//             console.log("Webhook signature verified successfully"); // Logs if signature is valid
//             res.status(200).json({ success: true, message: 'Webhook signature verified successfully' });
//         } else {
//             console.error("Invalid webhook signature"); // Logs if signature is invalid
//             res.status(400).json({ success: false, message: 'Invalid webhook signature' });
//         }
//     } catch (err) {
//         console.error("Error during webhook verification:", err.message); // Logs any errors during verification
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

