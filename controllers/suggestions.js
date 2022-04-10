const nodemailer = require("nodemailer");

var currentUnixDay = Date.now();
var dailySuggestions = 0;

module.exports.sendSuggestion = async (req) => {
    let result = {};

    // if empty suggestion was sent. (shouldn't be possible under normal circumstances. most likely user modified the request body.)
    if(req.suggestion === "") {
        result.status = 400;
        result.msg = "Suggestion field is required!";
        return result;
    }

    // daily limit of 500 requests (because gmail has a limit of 500 emails per day)
    if(currentUnixDay + 86400000 > Date.now()) {
        dailySuggestions++;
        if(dailySuggestions > 500) {
            result.status = 409;
            result.msg = "Daily suggestion limit reached. Please try again in 24 hours.";
            return result;
        }
    } else if (currentUnixDay + 86400000 < Date.now()) {
        dailySuggestions = 0;
        currentUnixDay = Date.now();
    }

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.GMAIL,
        to: process.env.GMAIL,
        subject: "Defina Hub Suggestion",
        text: req.suggestion
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) console.log(error);
    });

    result.status = 200;
    return result;
}