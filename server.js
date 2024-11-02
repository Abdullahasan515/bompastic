require('dotenv').config(); // تحميل المتغيرات البيئية
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000; // استخدام المنفذ من البيئة إذا كان متاحًا

// إعدادات CORS
app.use(cors({
    origin: 'https://bompastic-qg8r86r87-importants-projects-9680af2c.vercel.app' // رابط Vercel الخاص بك
}));

// إعدادات body-parser
app.use(bodyParser.json());

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
            res.status(500).send(`Error sending message: ${error.message || 'Unknown error'}`);
        });
});

// بدء تشغيل الخادم
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
