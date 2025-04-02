document.getElementById("predictForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    hba1c: parseFloat(this.hba1c.value),
    albumin: parseFloat(this.albumin.value),
    creatinine: parseFloat(this.creatinine.value),
    egfr: parseFloat(this.egfr.value),
    age: parseInt(this.age.value),
    sex: this.sex.value,
  };

  try {
    const res = await fetch("https://kidney-health-api.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    document.getElementById("result").innerText = "Risk Level: " + result.risk;

    const riskBar = document.getElementById("riskBar");
    const patientNote = document.getElementById("patientNote");
    const doctorNote = document.getElementById("doctorNote");

    if (result.risk === "Low") {
      riskBar.style.backgroundColor = "green";
      patientNote.innerText = "✅ Keep up your healthy habits!";
      doctorNote.innerText = "👍 No urgent action needed. Continue monitoring.";
    } else if (result.risk === "Moderate") {
      riskBar.style.backgroundColor = "orange";
      patientNote.innerText = "⚠️ Consider lifestyle improvements.";
      doctorNote.innerText = "🧪 Monitor kidney function. Recommend follow-up labs.";
    } else if (result.risk === "High") {
      riskBar.style.backgroundColor = "red";
      patientNote.innerText = "❗ See your doctor immediately.";
      doctorNote.innerText = "🚨 Urgent: Order labs. Adjust medications as needed.";
    } else {
      riskBar.style.backgroundColor = "gray";
      patientNote.innerText = "";
      doctorNote.innerText = "";
    }

    document.getElementById("summaryBox").style.display = "block";
    document.getElementById("downloadBtn").style.display = "inline-block";
  } catch (error) {
    console.error("Prediction error:", error);
    alert("Something went wrong while predicting kidney risk.");
  }
});

// 🧾 PDF Download Logic
document.getElementById("downloadBtn").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const risk = document.getElementById("result").innerText;
  const patientNote = document.getElementById("patientNote").innerText;
  const doctorNote = document.getElementById("doctorNote").innerText;

  doc.setFontSize(18);
  doc.text("Kidney Health Risk Report", 20, 20);
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleString()}`, 20, 30);
  doc.text(`Risk Level: ${risk}`, 20, 45);
  doc.text(`Patient Suggestion: ${patientNote}`, 20, 60);
  doc.text(`Doctor Guidance: ${doctorNote}`, 20, 80);

  doc.save("KidneyHealthReport.pdf");
});


// ✅ Dexcom OAuth: Connect to CGM
document.getElementById("connectCGM").addEventListener("click", () => {
const clientId = "EjJmOsxReUCm2GojkJ37SoF3E0WnLu5";
  const redirectUri = "https://kidney-health-ui.vercel.app/cgm-callback";
  const responseType = "code";
  const scope = "offline_access CGM";  // adjust scope as required
  const state = "abc123";  // You can randomize this if needed

  const authUrl = `https://sandbox-api.dexcom.com/v2/oauth2/login?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;
  
  window.location.href = authUrl;
});
