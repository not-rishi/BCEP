// Template for all the Emails

const LOGO_URL =
  "https://res.cloudinary.com/dtswcmnft/image/upload/v1763663052/logo_ctqspy.png";

const formatDate = (dateString) => {
  if (!dateString) return "TBA";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function generateHtml(title, bodyContent) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: #000000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #e0e0e0; }
    
   
    table { border-collapse: collapse; width: 100%; }
    td { vertical-align: middle; } 
    
    a { color: #00f3ff; text-decoration: none; }

    .email-bg {
      background-color: #050505;
      background-image: linear-gradient(rgba(30, 30, 30, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 30, 30, 0.5) 1px, transparent 1px);
      background-size: 30px 30px;
      padding: 40px 10px;
    }

    .glass-card {
      max-width: 600px;
      margin: 0 auto;
      background-color: #111111;
      background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
      border: 1px solid #333;
      border-top: 3px solid #00f3ff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 0 25px rgba(0, 243, 255, 0.1);
    }

    .header { padding: 30px 20px; text-align: center; background-color: #0a0a0a; border-bottom: 1px solid #222; }
    .brand-logo { width: 60px; height: auto; display: block; margin: 0 auto 10px auto; }
    .brand-text { font-size: 12px; letter-spacing: 4px; color: #666; text-transform: uppercase; margin-top: 8px; }

    .content { padding: 40px 30px; }
    .h1 { font-size: 24px; margin: 0 0 15px 0; color: #ffffff; font-weight: 700; text-align: center; letter-spacing: 1px; text-shadow: 0 0 10px rgba(255,255,255,0.1); }
    .p { font-size: 15px; line-height: 1.6; color: #b0b0b0; margin: 0 0 25px 0; text-align: center; }

    .poster-wrapper { text-align: center; margin-bottom: 30px; }
    .poster-img { max-width: 240px; width: 100%; height: auto; border-radius: 6px; border: 1px solid #333; box-shadow: 0 15px 35px rgba(0,0,0,0.8); }

    .data-box { background: rgba(255, 255, 255, 0.03); border: 1px solid #2a2a2a; border-radius: 12px; padding: 15px 25px; }
    
   
    .data-row-td { padding: 12px 0; border-bottom: 1px dashed #333; }
   
    tr:last-child .data-row-td { border-bottom: none; }

    .label { 
      color: #00f3ff; 
      font-size: 11px; 
      font-weight: 700; 
      text-transform: uppercase; 
      letter-spacing: 1px; 
      width: 40%;
      text-align: left;
    }
    
    .value { 
      color: #fff; 
      font-size: 14px; 
      text-align: right; 
      width: 60%;
    }

    .otp-box { background: rgba(0, 243, 255, 0.1); border: 1px solid #00f3ff; color: #00f3ff; font-size: 32px; font-weight: 700; letter-spacing: 6px; padding: 15px; border-radius: 8px; display: inline-block; margin: 10px 0; text-align: center; }

    .footer { background-color: #080808; padding: 25px; text-align: center; font-size: 11px; color: #555; border-top: 1px solid #222; }
  </style>
</head>
<body>
  <div class="email-bg">
    <div class="glass-card">
      <div class="header">
        <img src="${LOGO_URL}" alt="Logo" class="brand-logo">
        <div class="brand-text">BMSCE Club Events</div>
      </div>

      <div class="content">
        ${bodyContent}
      </div>

      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} BMSCE Club Events Portal</p>
      </div>
    </div>
  </div>
</body>
</html>
`;
}

module.exports = {
  otpTemplate: (otp) => {
    const content = `
      <div style="text-align: center;">
        <h1 class="h1">Verify Identity</h1>
        <p class="p">Use the secure code below to access your account.</p>
        <div class="otp-box">${otp}</div>
        <p class="p" style="font-size: 12px; color: #777; margin-top: 20px;">Code expires in 15 minutes.</p>
      </div>
    `;
    return generateHtml("OTP Verification", content);
  },

  resetOtpTemplate: (otp) => {
    const content = `
      <div style="text-align: center;">
        <h1 class="h1">Reset Protocol</h1>
        <p class="p">Password reset requested. Use this code to proceed.</p>
        <div class="otp-box">${otp}</div>
      </div>
    `;
    return generateHtml("Password Reset", content);
  },

  // registrationSuccessTemplate: (
  //   eventTitle,
  //   club,
  //   posterUrl,
  //   venue,
  //   deadline
  // ) => {
  //   const imageHtml = posterUrl
  //     ? `<div class="poster-wrapper"><img src="${posterUrl}" alt="Poster" class="poster-img"></div>`
  //     : "";

  //   const content = `
  //     <h1 class="h1">Registration Confirmed</h1>
  //     <p class="p">You are officially on the list for <span style="color:#fff; font-weight:bold;">${eventTitle}</span>.</p>

  //     ${imageHtml}

  //     <div class="data-box">
  //       <table width="100%" cellpadding="0" cellspacing="0" border="0">
  //         <tr>
  //           <td class="data-row-td label">Host Club</td>
  //           <td class="data-row-td value">${club}</td>
  //         </tr>
  //         <tr>
  //           <td class="data-row-td label">Date & Time</td>
  //           <td class="data-row-td value">${formatDate(deadline)}</td>
  //         </tr>
  //         <tr>
  //           <td class="data-row-td label">Venue</td>
  //           <td class="data-row-td value">${venue || "TBA"}</td>
  //         </tr>
  //       </table>
  //     </div>
  //   `;
  //   return generateHtml(`Ticket: ${eventTitle}`, content);
  // },



  registrationSuccessTemplate: (
    eventTitle,
    club,
    posterUrl,
    venue,
    deadline,
    eventDateTime 
  ) => {
    const imageHtml = posterUrl
      ? `<div class="poster-wrapper"><img src="${posterUrl}" alt="Poster" class="poster-img"></div>`
      : "";

    const content = `
      <h1 class="h1">Registration Confirmed</h1>
      <p class="p">You are officially on the list for <span style="color:#fff; font-weight:bold;">${eventTitle}</span>.</p>
      
      ${imageHtml}

      <div class="data-box">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td class="data-row-td label">Host Club</td>
            <td class="data-row-td value">${club}</td>
          </tr>
          <tr>
            <td class="data-row-td label">Event Date</td>
            <td class="data-row-td value">${formatDate(eventDateTime)}</td>
          </tr>
          <tr>
            <td class="data-row-td label">Reg Deadline</td>
            <td class="data-row-td value">${formatDate(deadline)}</td>
          </tr>
          <tr>
            <td class="data-row-td label">Venue</td>
            <td class="data-row-td value">${venue || "TBA"}</td>
          </tr>
        </table>
      </div>
    `;
    return generateHtml(`Ticket: ${eventTitle}`, content);
  },

  moderatorCSVTemplate: (eventTitle) => {
    const content = `
      <h1 class="h1">Data Export</h1>
      <p class="p">Attached is the registration data CSV for <strong>${eventTitle}</strong>.</p>
    `;
    return generateHtml("Data Export", content);
  },

  deadlineReachedTemplate: (eventTitle) => {
    const content = `
      <h1 class="h1">Deadline Reached</h1>
      <p class="p">Registration for <strong>${eventTitle}</strong> is now closed.</p>
    `;
    return generateHtml("Event Closed", content);
  },

  registrationCancelledTemplate: (eventTitle) => {
    const content = `
      <h1 class="h1" style="color: #ff4d4d;">Registration Cancelled</h1>
      <p class="p">You have successfully unregistered from <span style="color:#fff; font-weight:bold;">${eventTitle}</span>.</p>
      <p class="p">If this was a mistake, please register again before the deadline.</p>
    `;
    return generateHtml(`Cancelled: ${eventTitle}`, content);
  },

  eventDeletionTemplate: (eventTitle, clubName) => {
    const content = `
    <h1 class="h1" style="color: #ff4d4d;">Event Cancelled</h1>
    <p class="p">We regret to inform you that the event <strong>${eventTitle}</strong> organized by <strong>${clubName}</strong> has been cancelled.</p>
    <p class="p">We apologize for any inconvenience caused.</p>
  `;
    return generateHtml(`Cancelled: ${eventTitle}`, content);
  },
};
