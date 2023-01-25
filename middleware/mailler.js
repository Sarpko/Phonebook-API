const nodemailer = require("nodemailer");

module.exports = async function mailler(user) {
    const verfiyAdress= "http://localhost:8080/phonebook/api/v1/verify/" + user.id
    const transporter = nodemailer.createTransport({
    service: 'hotmail',
        auth: {
        user: 'mobilist-phonebook-api@hotmail.com',
        pass: '123456A!!'
        }
    });
    await transporter.sendMail({
        from: 'mobilist-phonebook-api@hotmail.com',
        to: user.email,
        subject: "Hello from phonebook API",
        text: "You’re almost ready to start \nSimply click the link to verify your email address \n" + verfiyAdress
    });
}







