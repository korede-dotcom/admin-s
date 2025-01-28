const routes = require("express").Router();
const axios = require("axios")
// const todoControl = require("../controllers/Todo")
// const allowedUser = require("../middleware/Authorization")
// const {todoListValidationRules} = require("../middleware/validator")
// const {protect} = require("../repos/token-repo")

// routes.get("/",)
// routes.post("/",protect,allowedUser([1,5]),todoListValidationRules,todoControl.create)


const PAYSTACK_BASE_URL = process.env.PAYSTACK_BASE_URL;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY; // Get your API key from environment variables

// Route to initiate a payment
routes.post('/initiate-payment', async (req, res) => {
    console.log("🚀 ~ routes.post ~ req:", req.body)
    try {
        const response = await axios.post(
            `${PAYSTACK_BASE_URL}/transaction/initialize`,
            {
                amount: req.body.amount, // Amount to charge in kobo
                email: req.body.email, // Customer's email
                callbackUrl: "http://127.0.0.1:5501/index.html",
                redirectUrl: "http://127.0.0.1:5501/index.html"
                // Add other required parameters
            },
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log("🚀 ~ routes.post ~ response:", response.data)

        // Return payment authorization URL to client
        res.json({ authorization_url: response.data.data.authorization_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to initiate payment' });
    }
});

// Route to handle Paystack webhook events
routes.post('/paystack-webhook', async (req, res) => {
    // Validate Paystack webhook payload and handle events
    try {
        // Extract the webhook event data from the request body
        const eventData = req.body;

        // Verify the authenticity of the webhook event by sending a request to Paystack
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${eventData.reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Use your Paystack secret key
                'Content-Type': 'application/json',
            },
        });

        // Check if the transaction is successful
        if (response.data.data.status === 'success') {
            // Handle successful payment
            console.log('Payment successful for reference:', eventData.reference);

            // Here, you can update your database or trigger other actions based on the payment success

            res.sendStatus(200); // Respond with HTTP 200 OK to acknowledge receipt of webhook
        } else {
            // Handle failed payment
            console.log('Payment failed for reference:', eventData.reference);

            // Here, you can handle failed payments and take appropriate actions

            res.sendStatus(200); // Respond with HTTP 200 OK to acknowledge receipt of webhook
        }
    } catch (error) {
        console.error('Error processing Paystack webhook:', error);
        res.status(500).json({ error: 'Failed to process Paystack webhook' });
    }
});

module.exports = routes;