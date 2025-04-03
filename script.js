document.getElementById("predictForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;

  const data = {
    hba1c: parseFloat(form.hba1c.value),
    albumin: parseFloat(form.albumin.value),
    creatinine: parseFloat(form.creatinine.value),
    egfr: parseFloat(form.egfr.value),
    age: parseInt(form.age.value),
    sex: form.sex.value
  };

  try {
    const res = await fetch("https://kidney-health-api.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("🎯 Prediction response:", result);

    // Show result box
    const summaryBox = document.getElementById("summaryBox");
    summaryBox.style.display = "block";

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
      doctorNote.innerText = "🚨 Urgent: Order labs. Adjust medications.";
    } else {
      riskBar.style.backgroundColor = "gray";
      patientNote.innerText = "";
      doctorNote.innerText = "";
    }

    document.getElementById("downloadBtn").style.display = "inline-block";

  } catch (error) {
    console.error("❌ Error in prediction:", error);
    alert("Something went wrong. Please try again later.");
  }
});

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
