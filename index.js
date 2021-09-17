const express = require('express')
const app = express()
const port = 3010
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "portfoliomailpodobed@gmail.com", // generated ethereal user
        pass: "Portfolio1", // generated ethereal password
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async function (req, res) {

    const {name, email, message} = req.body
    let info = await transporter.sendMail({
        from: 'hr message',
        to: "dariamakarchik@gmail.com",
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