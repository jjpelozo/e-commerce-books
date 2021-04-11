const nodemailer = require("nodemailer"); // email sender function
exports.sendEmail = function (req, res) {
  // nodemailer stuff will go here
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: prueba, 
    pass: prueba
  },
});


module.exports = transporter;