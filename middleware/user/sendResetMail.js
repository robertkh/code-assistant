//?
import nodemailer from "nodemailer";

// todo
export default (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dimord2015@gmail.com",
      pass: "areg-2013",
    },
  });

  //
  const htmlBody = `<h4>Activation link</h4> <p><a href="${
    req.protocol
  }://${req.get("host")}${req.baseUrl}/setnewpass/${
    res.locals.jwt
  }">Սեղմիր հղմանը ամրագրելու համար ծածկագրի փոփոխությունը։</a></p>`;

  //
  const mailOptions = {
    from: '"e-Shop" <dimord2015@gmail.com>',
    to: req.body.email,
    subject: "Password recover",
    html: htmlBody,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(534).json("Խնդիր կա կապված էլ-նամակի տրանսպորտի հետ։");
    } else {
      res.json(
        "Ծածկագրի փոփոխություններն ամրագրելու համար ունեք 1 ժամ ժամանակ՝ տես E-mail։"
      );
    }
  });
};
