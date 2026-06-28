const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const missingRazorpayConfig = ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'].filter((key) => !process.env[key]);
if (missingRazorpayConfig.length > 0) {
  console.warn(`Razorpay env vars missing: ${missingRazorpayConfig.join(', ')}`);
}

async function createRazorpayOrder(amount) {
  try {
    const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error?.description || data.error?.message || `Razorpay request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    const useMockMode = process.env.RAZORPAY_MOCK_MODE === 'true' || process.env.NODE_ENV !== 'production';

    if (useMockMode) {
      console.warn('Razorpay API unavailable; using mock order mode for local development.', error.message);
      return {
        id: `mock_order_${Date.now()}`,
        amount,
        currency: 'INR',
        mockMode: true
      };
    }

    throw error;
  }
}

// STEP 1: Create Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ error: 'Razorpay credentials are not configured on the server.' });
    }
    
    // Validate amount >= 100 paise (₹1)
    if (!amount || amount < 100) {
      return res.status(400).json({ error: "Amount must be >= 100 paise" });
    }

    const order = await createRazorpayOrder(amount);
    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      mockMode: Boolean(order.mockMode)
    });
  } catch (err) {
    console.error("Razorpay Create Order Error:", err);
    console.error(err && err.stack ? err.stack : err);
    res.status(500).json({ error: err && err.message ? err.message : "Failed to create order", stack: err && err.stack ? err.stack : null });
  }
});

// STEP 3: Verify Payment Signature
app.post('/api/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (razorpay_order_id?.startsWith('mock_order_')) {
    return res.json({ success: true, mockMode: true });
  }
  
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
