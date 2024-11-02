// server.js
require('dotenv').config(); // تحميل المتغيرات البيئية
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express(); // يجب أن تكون هذه السطر هنا
const port = 3000;

// إعدادات CORS
app.use(cors()); // السماح بالطلبات من جميع المصادر

// إعدادات body-parser
app.use(bodyParser.json()); // لتحليل JSON في الطلبات

// استبدل هذه القيم بمفاتيح حساب Twilio الخاصة بك باستخدام المتغيرات البيئية
const accountSid = process.env.TWILIO_ACCOUNT_SID; // SID الخاص بحساب Twilio
const authToken = process.env.TWILIO_AUTH_TOKEN; // توكن حساب Twilio
const client = new twilio(accountSid, authToken);

// نقطة النهاية لإرسال رسالة WhatsApp
app.post('/send-whatsapp', (req, res) => {
    const { phone, message } = req.body;

    client.messages
        .create({
            body: message,
            from: 'whatsapp:+14155238886', // رقم واتساب الخاص بـ Twilio
            to: phone
        })
        .then((message) => {
            console.log('Message sent: ', message.sid);
            res.status(200).send('Message sent successfully');
        })
        .catch((error) => {
            console.error('Error sending message: ', error);
            res.status(500).send('Error sending message');
        });
});

// بدء تشغيل الخادم
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
