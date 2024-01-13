export const htmlTemplate = (blogTitle, blogDescription, imageUrl) => `
<!DOCTYPE html>
  <html lang="en"   ⚡4email>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${blogTitle}</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }

      .email-container {
        max-width: 600px;
        border: 2px solid;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .blog-title {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 10px;
      }

      .blog-description {
        font-size: 16px;
        color: #666666;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .blog-image {
        max-width: 100%;
        height: auto;
        margin-bottom: 20px;
      }

      .footer {
        text-align: center;
        color: #999999;
        font-size: 12px;
        margin-top: 20px;
      }
      .log {
        display: flex;
        width: 100%;
        align-items: center; 
        justify-content: space-between;
      }
      .log {
        display: flex;
        width: 100%;
        align-items: center; 
        justify-content: space-between; 
      }
    </style>
  </head>
  <body>
  <img src="https://res.cloudinary.com/igitego-hotels/image/upload/v1704450169/stylos/sjcladbmfpkmguqia9tz.png" alt="Blog Image" width="100" height="50" class="logo1">
    <div class="email-container">
      <div class="log">
      <h2 class="blog-title">${blogTitle}</h2>
      </div>
      <img src="${imageUrl}" alt="Blog Image" class="blog-image">
      <p class="blog-description">${blogDescription}</p>
      <p class="footer">This email was sent from our blog system. © 2024 BlogSystem</p>
    </div>
  </body>
  </html>
`;

export const composeEmail = (name, description) => `
<!DOCTYPE html>
  <html lang="en"   ⚡4email>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>email from website</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .footer {
        text-align: center;
        color: #999999;
        font-size: 12px;
        margin-top: 20px;
      }
      span{
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="log">
      <h2 class="blog-title">${name}</h2>
      </div>
      <p class="blog-description">${description}</p>
      <p >Best regard,<br></br><span>${name}</span>
      <p class="footer">This email was sent from stylos website messages</p>
    </div>
  </body>
  </html>
`;

export const sendEmailToUser =  (name, description) => `
<!DOCTYPE html>
  <html lang="en"   ⚡4email>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>email from website</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }
      .footer {
        text-align: center;
        color: #999999;
        font-size: 12px;
        margin-top: 20px;
      }

    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="log">
     <p>Hello, ${name}</p>
      </div>
      <p class="blog-description">${description}</p>
      <p >Best regard,<br></br><span>Stylos consults</span>
      <p class="footer">This email was sent from stylos website messages</p>
    </div>
  </body>
  </html>
`;