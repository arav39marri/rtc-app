const { Cashfree } = require("cashfree-pg");
const express = require('express');
const app = express() ;
const cors = require('cors');
const model = require('./model');
require('dotenv').config();
const port = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Cashfree.XClientId = process.env.APP_ID;
Cashfree.XClientSecret = process.env.SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;
// console.log(Cashfree.XClientSecret)



app.get('/' , (req,res)=>{
    res.send("hello ");
})

app.post('/payment', (req, res) => {
    // console.log("Generating order ID");

    // Generate a unique order_id using timestamp and a random component
    // const orderId = "devstudio_" + Date.now() + "_" + Math.floor(Math.random() * 10000); // Unique order ID
    
    // var request = {
    //     "order_amount": 1.00,
    //     "order_currency": "INR",
    //     "order_id": orderId,  // Use the dynamically generated order_id
    //     "customer_details": {
    //         "customer_id": "devstudio_user",
    //         "customer_phone": "8474090589"
    //     },
    //     "order_meta": {
    //         "return_url": "http://localhost:3000"
    //     }
    // };

    // // Cashfree API call to create the order
    // Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {
    //     console.log('Order created successfully:', response.data);

    //     // Log the payment session ID for debugging purposes
    //     console.log("-----------------");
    //     console.log(`Payment session ID: ${response.data.payment_session_id}`);
    //     console.log("-----------------");

    //     // Send the payment session ID to frontend
    //     res.json({
    //         success: true,
    //         payment_session_id: response.data.payment_session_id,  // Return the payment_session_id
    //     });
    // }).catch((error) => {
    //     console.error('Error:', error.response?.data?.message || error.message);

    //     // Handle the error case
    //     res.json({
    //         success: false,
    //         error: error.response?.data?.message || error.message,  // Return the error message
    //     });
    // });
   
    
        // console.log("Generating order ID");
    
        // Generate a unique order_id using timestamp and a random component
        const orderId = "devstudio_" + Date.now() + "_" + Math.floor(Math.random() * 10000); // Unique order ID
        
        // Prepare request data
        var request = {
            "order_amount": 1.00,
            "order_currency": "INR",
            "order_id": orderId,  // Use the dynamically generated order_id
            "customer_details": {
                "customer_id": "devstudio_user",
                "customer_phone": "6281250586" // Customer phone number
            },
            "order_meta": {
                "return_url": "https://msrtc.vercel.app/Book" // Dynamic return URL with the order_id
            }
        };
    
        // Cashfree API call to create the order with the correct version
        Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {  // Use valid version here
            // console.log('Order created successfully:', response.data);
    
            // Send the order details back to frontend, including the payment session ID
            res.json({
                success: true,
                payment_session_id: response.data.payment_session_id,  // Use the payment session ID from Cashfree API response
            });
        }).catch((error) => {
            console.error('Error:', error.response?.data?.message || error.message);
    
            // Handle the error case and send error response
            res.json({
                success: false,
                error: error.response?.data?.message || error.message,  // Return the error message
            });
        });
    });







// const userRoutes = require('./Routes/payment.js');
// app.use('/payment', userRoutes);



app.post('/search', async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);

    try {
        const user = await model.findOne({ email: email });

        if (!user) {
            return res.status(404).send("User not found"); 
        }

        if (user.password !== password) {
            return res.status(401).send("Incorrect username or password"); 
        }

        res.status(200).send("Sign-in successful");
    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).send("Internal server error");
    }
});

app.put('/createticket', async (req, res) => {
    const { name, uname, destination, departure, passengers, date, time } = req.body;
//   console.log(name , "emai ");        
//   console.log(uname, "usrnma");      
//   console.log(destination, "dsesf"); 
   
    try {
        const user = await model.findOne({ email: name });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        const ticket = {
            uname,
            destination,
            departure,
            passengers,
            date,
            time,
            bookedAt: new Date()
        };

        user.tickets.push(ticket);
        console.log(ticket);
        // Add a notification
        user.notifications.push({
            message: `New ticket booked to ${destination} on ${date} at ${time}.`,
            date: new Date()
        });

        
        await user.save();

        res.status(201).send({ message: "Ticket booked successfully.", ticket });
    } catch (error) {
        console.error("Error in creating ticket:", error);
        res.status(500).send({ message: "Error creating ticket", error: error.message });
    }
});


app.post('/create', async (req, res) => {
    const { name, phno, email, password } = req.body;

    try {

        const usr = await  model.create({ name, phno, email, password });
    if(usr)
    res.status(201).send(usr);
    
    }
    catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.post('/history', async (req, res) => {
    const {useremail} = req.body ;
    // console.log(useremail);
    try {
        const user = await model.findOne({ email: useremail });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const tickets = user.tickets;
        res.send(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).send({ message: "Error fetching tickets", error: error.message });
    }
});
app.post('/notification', async (req, res) => {
    const {useremail} = req.body;
    try {
        const user = await model.findOne({ email: useremail });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const noti = user.notifications;
        res.send(noti);
    } catch (error) {
        console.error("Error fetching notification:", error);
        res.status(500).send({ message: "Error fetching notification", error: error.message });
    }
});



app.listen(2000, ()=>{
    console.log(`server started at port : ${port}`);
})