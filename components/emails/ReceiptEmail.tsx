export default function receiptEmail({
	orderId,
	from,
	to,
	amount,
	vehicleName,
}: {
	orderId: string;
	from: string;
	to: string;
	amount: number;
	vehicleName: string;
}) {
	return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Booking Confirmed</title>
    </head>
    <body style="font-family:sans-serif;background:#f9f9f9;padding:20px;">
      
      <div style="
        max-width:600px;
        margin:auto;
        background:#ffffff;
        border:2px solid #000;
        border-radius:12px;
        padding:40px;
      ">
  
        <p style="
          font-size:10px;
          font-weight:900;
          text-transform:uppercase;
          letter-spacing:2px;
          color:#a1a1aa;
        ">
          Azad Tours & Travels Logistics
        </p>
  
        <h1 style="
          font-size:32px;
          font-weight:900;
          font-style:italic;
          text-transform:uppercase;
          margin:10px 0;
        ">
          Booking Confirmed
        </h1>
  
        <div style="margin:20px 0;">
          <p><strong>Manifest ID:</strong> #${orderId}</p>
          <p><strong>Vehicle Assigned:</strong> ${vehicleName}</p>
        </div>
  
        <hr style="border-top:2px dashed #e2e8f0;" />
  
        <div>
          <p><strong>Route:</strong> ${from} → ${to}</p>
          <p style="font-size:24px;font-weight:900;">
            Amount Paid: ₹${amount.toLocaleString()}
          </p>
        </div>
  
        <p style="
          font-size:12px;
          color:#64748b;
          margin-top:40px;
        ">
          Thank you for choosing Azad Logistics. Your fleet unit has been dispatched.
        </p>
  
      </div>
  
    </body>
    </html>
    `;
}
