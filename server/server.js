require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// STEP 1: Create Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Validate amount >= 100 paise (₹1)
    if (!amount || amount < 100) {
      return res.status(400).json({ error: "Amount must be >= 100 paise" });
    }

    const options = {
      amount: amount,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };
    
    const order = await razorpay.orders.create(options);
    res.json({ order_id: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    console.error("Razorpay Create Order Error:", err);
    res.status(500).json({ error: err.message || "Failed to create order" });
  }
});

// STEP 3: Verify Payment Signature
app.post('/api/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    return res.json({ success: true });
  } else {
    return res.status(400).json({ error: "Signature mismatch" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Razorpay Server running on port ${PORT}`));
