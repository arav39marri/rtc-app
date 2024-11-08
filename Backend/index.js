const express = require('express');
const app = express() ;
const cors = require('cors');
const model = require('./model');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/' , (req,res)=>{
    res.send("hello ");
})

app.put('/createticket', async (req, res) => {
    const { name, destination, departure, passengers, date, time } = req.body;

    try {
        const user = await model.findOne({ name: name });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        const ticket = {
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

app.get('/history', async (req, res) => {
    try {
        // Fetch the user document
        const user = await model.findOne({ name: "aravind" });
        
        // Check if the user exists
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Access the tickets array from the user document
        const tickets = user.tickets;
        // console.log(typeof tickets); // Should log 'object' (Array)
        // console.log(tickets); // Log tickets array to verify content

        // Send the tickets array in response
        res.send(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).send({ message: "Error fetching tickets", error: error.message });
    }
});
app.get('/notification', async (req, res) => {
    try {
        // Fetch the user document
        const user = await model.findOne({ name: "aravind" });
        
        // Check if the user exists
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Access the tickets array from the user document
        const noti = user.notifications;
        // console.log(typeof tickets); // Should log 'object' (Array)
        // console.log(tickets); // Log tickets array to verify content

        // Send the tickets array in response
        res.send(noti);
    } catch (error) {
        console.error("Error fetching notification:", error);
        res.status(500).send({ message: "Error fetching notification", error: error.message });
    }
});



app.listen(2000, ()=>{
    console.log("server started at port : 2000");
})