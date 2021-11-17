const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

module.exports = async (to, endopoint, Name, MAILKEY ) =>{

    const transporter = nodemailer.createTransport(

      nodemailerSendgrid({
        apiKey:MAILKEY
    })

    )
    
        return  await transporter.sendMail({
            from: 'ricardo.leyva@dacodes.com.mx',
            to,
            subject: 'Confirma tu correo',
            html: `
            <!DOCTYPE html>
            <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width,initial-scale=1">
              <meta name="x-apple-disable-message-reformatting">
              <title></title>
              <!--[if mso]>
              <noscript>
                <xml>
                  <o:OfficeDocumentSettings>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                  </o:OfficeDocumentSettings>
                </xml>
              </noscript>
              <![endif]-->
              <style>
                table, td, div, h1, p {font-family: Arial, sans-serif;}
              </style>
            </head>
            <body style="font-family: 'Lato', sans-serif;padding:2rem; text-align:center;"> 
            
<img  style="margin: 0 auto; width:50%; heigth:auto; " src="https://www.hato-ganadero.com/img/logo.png" alt="Logo" /> 

            
            <h3 style="text-align:center;">Hola ${Name}, confirma tu cuenta haciendo click en el siguiente botón: </h3>
            
            <div style="width: 90%; 
                        padding: 16px; 
                        margin:0 auto; 
                        display:flex; 
                        justify-content:center; 
                        align-items:center; 
                        text-decoration:none;
                        ">
            
                <a href="https://www.hato-ganadero.com/mail/confirm/${endopoint}" target="_blank" 
                style=" 
                text-decoration: none;
                text-align:center;
                padding: 12px 32px;
                background-color: rgba(215, 108, 28, 1);
                color: rgb(255,255,255);
                border-radius: 6px;
                width:230px;
                margin: 0 auto;
                ">
                Confirma tu cuenta
                </a> 
   
            </body>
            </html>
            `

    });


}


// noproyecto:119779839675



// AIzaSyCEDKzil6FHBgo65br6QLzg-kd96NpSojc

// ricardo.dacodes.mailsender@gmail.com
// ricardo.leyva@dacodes.com.mx





// sendgrid
// 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