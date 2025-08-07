// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

admin.initializeApp();
const db = admin.firestore();

const SENDER_EMAIL = "help@waheating.co.uk";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post("/sendBoilerSummary", async (req, res) => {
  const { referenceCode } = req.body;
  if (!referenceCode) {
    return res.status(400).send("Missing referenceCode");
  }

  try {
    const snap = await db.doc(`boilers/${referenceCode}`).get();
    if (!snap.exists) {
      return res.status(404).send("Boiler record not found");
    }

    const data = snap.data();
    const {
      fullName,
      email,
      phone,
      installationDate,
      referenceCode: refCode,
      address = {},
      extra = [],
      serviceType = {},
      thermostate = {},
    } = data;

    // ✅ Correctly convert Firestore Timestamp to JS Date, then format
    let formattedDate = "-";
    if (
      installationDate &&
      typeof installationDate.toDate === "function"
    ) {
      formattedDate = installationDate
      .toDate()
      .toLocaleDateString("en-GB", { timeZone: "UTC" });
    }

    const fullAddress = [
      address.line_1,
      address.town_or_city,
      address.postcode,
    ]
      .filter(Boolean)
      .join(", ");

    const boilerName = serviceType.boilerName || "-";
    const boilerPrice = Number(serviceType.boilerPrice || 0);
    const boilerWarranty = serviceType.boilerWarranty || "-";

    const thermostatName = thermostate.name || "-";
    const thermostatPrice = Number(thermostate.price || 0);

    let totalPrice = boilerPrice + thermostatPrice;
    extra.forEach((item) => {
      totalPrice +=
        Number(item.price || 0) * (item.quantity || 1);
    });

    const extrasTable = extra.length
      ? `
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr><th>Name</th><th>Price (£)</th><th>Quantity</th></tr></thead>
      <tbody>
        ${extra
          .map(
            (item) => `
          <tr>
            <td>${item.name}</td>
            <td>${Number(item.price).toFixed(2)}</td>
            <td>${item.quantity || 1}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>`
      : "<p>No extras selected.</p>";

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2>Boiler Installation Summary</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Reference:</strong> ${refCode}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Address:</strong> ${fullAddress}</p>
        <hr/>
        <p><strong>Boiler:</strong> ${boilerName} (£${boilerPrice.toFixed(
          2
        )}, ${boilerWarranty} yrs)</p>
        <p><strong>Thermostat:</strong> ${thermostatName} (£${thermostatPrice.toFixed(2)})</p>
        ${extrasTable}
        <h3>Total: £${totalPrice.toFixed(2)}</h3>
      </div>`;

    const msg = {
      to: email,
      from: { email: SENDER_EMAIL, name: "WA Heating" },
      subject: "Your Boiler Installation Summary",
      html,
    };

    await sgMail.send(msg);
    await sgMail.send({ ...msg, to: SENDER_EMAIL });

    res.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err.message);
    res.status(500).send("Email failed");
  }
});

exports.api = functions.https.onRequest(app);
