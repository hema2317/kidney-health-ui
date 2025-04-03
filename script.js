document.getElementById("predictForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    hba1c: parseFloat(this.hba1c.value),
    albumin: parseFloat(this.albumin.value),
    creatinine: parseFloat(this.creatinine.value),
    egfr: parseFloat(this.egfr.value),
    age: parseInt(this.age.value),
    sex: this.sex.value
  };

  const res = await fetch("https://kidney-health-api.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  const resultBox = document.getElementById("summaryBox");
  const resultText = document.getElementById("result");
  const riskBar = document.getElementById("riskBar");
  const patientNote = document.getElementById("patientNote");
  const doctorNote = document.getElementById("doctorNote");

  resultBox.style.display = "block";
  resultText.innerText = "Risk Level: " + result.risk;

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
    doctorNote.innerText = "🚨 Urgent: Order labs (ACR, GFR, BP logs). Adjust medications.";
  } else {
    riskBar.style.backgroundColor = "gray";
    patientNote.innerText = "";
    doctorNote.innerText = "";
  }

  // ✅ Show PDF button
  document.getElementById("downloadBtn").style.display = "inline-block";
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
  doc.text(`\nPatient Suggestion: ${patientNote}`, 20, 60);
  doc.text(`\nDoctor Guidance: ${doctorNote}`, 20, 80);

  doc.save("KidneyHealthReport.pdf");
});
