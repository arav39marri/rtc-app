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
    const { name, destination, departure, passengers, date, time } = req.body;


    try {
        const user = await model.findOne({ email: name });
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

app.post('/history', async (req, res) => {
    const {useremail} = req.body ;
    console.log(useremail);
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
    console.log("server started at port : 2000");
})