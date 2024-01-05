import sgMail from "@sendgrid/mail";
import dotenv from "dotenv/config";

sgMail.setApiKey(process.env.API_KEY);

export const sendEmailService = async (user, subject, text, booking) => {
  const msg = {
    to: user.email,
    from: process.env.SEND_EMAIL,
    subject,
    text,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Email</title>
        <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f6f6f6;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
        }
    
        table {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%;
        }
    
        td {
          padding: 20px;
        }
    
        h1 {
          color: #333;
          font-size: 24px;
          margin: 0;
        }
    
        p {
          color: #666;
          font-size: 16px;
          margin: 10px 0;
        }
    
        b {
          color: #333;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 5px;
          overflow: hidden;
        }
    
        .header {
          background-color: #3498db;
          color: #fff;
          text-align: center;
          padding: 15px 0;
        }
    
        .content {
          padding: 20px;
        }
    
        .footer {
          text-align: center;
          padding: 10px 0;
          background-color: #3498db;
          color: #fff;
        }
    
        /* Add more styles as needed */
      </style>
      </head>
      <body>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <div>
                <h1>Dear <b>${user.firstName} ${user.lastName}</b>,</h1>
                <p>Thank you for booking with us! This email serves as a confirmation of your booking.</p>
                <p>Booking Details:</p>
                <!-- Display booking details here -->
                <b>Hotel: </b>${booking.room.title} <br>
                <b>Booking Reference Number:</b> ${booking._id}<br>
                <b>Name:</b> ${user.firstName} ${user.lastName}<br>
                <b>Email:</b> ${user.email}<br>
                <b>Phone Number:</b>${user.telephone}<br>
                <b>TotalCost:</b>${booking.totalPrice}<br>
                <b>Check-In:</b> ${booking.checkIn}<br>
                <b>Check-Out:</b> ${booking.checkOut}<br>
                <!-- Add more booking details as needed -->
              </div>
            </td>
          </tr>
        </table>
        <!-- Add more content or styling as needed -->
      </body>
      </html>
    `, // Add the HTML content
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const sendAdminEmailService = async (adminEmail, subject, text, booking) => {
    const msg = {
      to: adminEmail,
      from: process.env.SEND_EMAIL,
      subject,
      text,
      html: `
        <!-- Your HTML template for admin -->
        <html lang="en">
        <head>
        <style>
        /* Add professional styles for admin email */
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }

        table {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%;
        }

        td {
          padding: 20px;
        }

        h1 {
          color: #333;
          font-size: 24px;
          margin: 0;
        }

        p {
          color: #666;
          font-size: 16px;
          margin: 10px 0;
        }

        b {
          color: #333;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 5px;
          overflow: hidden;
        }

        .header {
          background-color: #3498db;
          color: #fff;
          text-align: center;
          padding: 15px 0;
        }

        .content {
          padding: 20px;
        }

        .footer {
          text-align: center;
          padding: 10px 0;
          background-color: #3498db;
          color: #fff;
        }
      </style>
        </head>
        <body>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <div>
                  <h1>New Booking Received</h1>
                  <p>A new booking has been made. Details are as follows:</p>
                  <!-- Display booking details for admin -->
                  <b>Hotel: </b>${booking.room.title} <br>
                  <b>Booking Reference Number:</b> ${booking._id}<br>
                  <b>Name:</b> ${booking.firstName} ${booking.lastName}<br>
                  <b>Email:</b> ${booking.email}<br>
                  <b>Phone Number:</b>${booking.telephone}<br>
                  <!-- Add more booking details as needed -->
                </div>
              </td>
            </tr>
          </table>
          <!-- Add more content or styling as needed -->
        </body>
        </html>
      `, // Add the HTML content
    };
  
    try {
      await sgMail.send(msg);
      console.log("Admin Email sent successfully!");
    } catch (error) {
      console.error("Error sending admin email:", error);
      throw error;
    }
  };

  export const sendBossEmailService = async (bossEmail, subject, text, booking) => {
    const msg = {
      to: bossEmail,
      from: process.env.SEND_EMAIL,
      subject,
      text,
      html: `
        <html lang="en">
        <head>
        <style>
          /* Add professional styles for boss email */
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }

          table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%;
          }

          td {
            padding: 20px;
          }

          h1 {
            color: #333;
            font-size: 24px;
            margin: 0;
          }

          p {
            color: #666;
            font-size: 16px;
            margin: 10px 0;
          }

          b {
            color: #333;
          }

          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 5px;
            overflow: hidden;
          }

          .header {
            background-color: #3498db;
            color: #fff;
            text-align: center;
            padding: 15px 0;
          }

          .content {
            padding: 20px;
          }

          .footer {
            text-align: center;
            padding: 10px 0;
            background-color: #3498db;
            color: #fff;
          }
        </style>
        </head>
        <body>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <div>
                  <h1>New Booking Received</h1>
                  <p>A new booking has been made. Details are as follows:</p>
                  <!-- Display detailed booking information for the boss -->
                  <b>Hotel: </b>${booking.room.title} <br>
                  <b>Booking Reference Number:</b> ${booking._id}<br>
                  <b>Name:</b> ${booking.firstName} ${booking.lastName}<br>
                  <b>Email:</b> ${booking.email}<br>
                  <b>Phone Number:</b>${booking.telephone}<br>
                  <b>Check-In:</b> ${booking.checkIn}<br>
                  <b>Check-Out:</b> ${booking.checkOut}<br>
                  <b>TotalCost:</b> ${booking.totalPrice}<br>
                  <!-- Add more booking details as needed -->
                </div>
              </td>
            </tr>
          </table>
          <!-- Add more content or styling as needed -->
        </body>
        </html>
      `, // Add the HTML content
    };
  
    try {
      await sgMail.send(msg);
      console.log("Boss Email sent successfully!");
    } catch (error) {
      console.error("Error sending boss email:", error);
      throw error;
    }
  };

export const OTPemail = async (user, otp) => {
    const apikey = process.env.API_KEY;
    const url = `${process.env.VERIFYEMAIL}`;
    sgMail.setApiKey(apikey);
    const message = {
      to: user.email,
      from: {
        name: "WOoHo_Car",
        email: process.env.SEND_EMAIL,
      },
      subject: "Click here to confirm",
      text: "This is the message from SendGrid",
      html: `
        <html>
          <head>
            <style>
              .container {
                border: 2px;
              }
              .button {
                background-color: #2D719D;
                padding: 10px 20px;
                text-decoration: none;
                font-weight: bold;
                border-radius: 4px;
              }
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              .header{
                background-repeat: no-repeat;
                background-size: fit;
                width: 100%;
                height: 120px;
              }
              a{
                text-decoration: none;
                color: white;
              }
              span{
                color: #fff;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class = "header">
                <img src='https://d1u4v6449fgzem.cloudfront.net/2020/03/The-Ecommerce-Business-Model-Explained.jpg' alt='header'/>
              </div>
              <h2>Click to verify your email</h2>
              <p>Copy this code: ${otp}</p>
              <a href="${url}" class="button"><span>Verify Email</span></a>
            </div>
          </body>
        </html>
      `,
    };
  
    sgMail
      .send(message)
      .then((res) => {
        console.log("Message sent...");
      })
      .catch((error) => console.log(error));
  };