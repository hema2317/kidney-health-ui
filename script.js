document.getElementById("predictForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    hba1c: parseFloat(this.hba1c.value),
    albumin: parseFloat(this.albumin.value),
    creatinine: parseFloat(this.creatinine.value),
    egfr: parseFloat(this.egfr.value),
    age: parseInt(this.age.value)
    // ✅ Removed `sex` as we're no longer using it
  };

  try {
    const res = await fetch("https://kidney-health-api.onrender.com/predict", {  // ✅ Fixed URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    document.getElementById("summaryBox").style.display = "block";
    document.getElementById("result").innerText = "Risk Level: " + result.risk;

    const riskBar = document.getElementById("riskBar");
    const patientNote = document.getElementById("patientNote");
    const doctorNote = document.getElementById("doctorNote");

    // ✅ Updated for 3-level classification
    if (result.risk === "Low") {
      riskBar.style.backgroundColor = "#4caf50";
      riskBar.style.width = "33%";
      patientNote.innerText = "✅ Keep up your healthy habits!";
      doctorNote.innerText = "👍 No urgent action needed. Continue monitoring.";
    } else if (result.risk === "Moderate") {
      riskBar.style.backgroundColor = "#ffc107";
      riskBar.style.width = "66%";
      patientNote.innerText = "⚠️ Consider lifestyle improvements. Follow up recommended.";
      doctorNote.innerText = "🧪 Monitor kidney function more frequently. Consider further testing.";
    } else if (result.risk === "High") {
      riskBar.style.backgroundColor = "#f44336";
      riskBar.style.width = "100%";
      patientNote.innerText = "❗ See your doctor immediately.";
      doctorNote.innerText = "🚨 Urgent: Order labs (ACR, GFR, BP logs). Adjust medications.";
    } else {
      riskBar.style.backgroundColor = "gray";
      riskBar.style.width = "0";
      patientNote.innerText = "";
      doctorNote.innerText = "";
    }

    // ✅ Show PDF download button
    document.getElementById("downloadBtn").style.display = "inline-block";

  } catch (error) {
    alert("Something went wrong. Please try again.");
    console.error(error);
  }
});

// ✅ PDF Download Logic
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
  doc.text(`${risk}`, 20, 45);
  doc.text(`Patient Suggestion: ${patientNote}`, 20, 60);
  doc.text(`Doctor Guidance: ${doctorNote}`, 20, 80);

  doc.save("KidneyHealthReport.pdf");
});
