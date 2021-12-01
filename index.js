const express = require('express')
const app = express()
const port = process.env.PORT || 3010
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
let smtpLogin = process.env.SMTP_LOGIN || "---"
let smtpPassword = process.env.SMTP_PASSWORD || "---"

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtpLogin, // generated ethereal user
        pass: smtpPassword, // generated ethereal password
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async function (req, res) {

    const {name, email, message} = req.body
    let info = await transporter.sendMail({
        from: 'hr message',
        to: "portfoliomailpodobed@gmail.com",
        subject: "Hello ✔",
        html: `<b>Message from ${name}</b>
<div>${message}</div>
<div>give your answer ${email}</div>`
    });
    res.send("your message has been sent")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
