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

  try {
    const res = await fetch("https://kidney-health-api.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    document.getElementById("result").innerText = "Risk Level: " + result.risk;
    document.getElementById("summaryBox").style.display = "block";

    const riskBar = document.getElementById("riskBar");
    const patientNote = document.getElementById("patientNote");
    const doctorNote = document.getElementById("doctorNote");

    if (result.risk === "Low") {
      riskBar.style.backgroundColor = "green";
      patientNote.innerText = "✅ Great! Keep up healthy habits.";
      doctorNote.innerText = "👍 No immediate action needed.";
    } else if (result.risk === "Moderate") {
      riskBar.style.backgroundColor = "orange";
      patientNote.innerText = "⚠️ Consider lifestyle improvements.";
      doctorNote.innerText = "🧪 Monitor kidney function. Recommend labs.";
    } else if (result.risk === "High") {
      riskBar.style.backgroundColor = "red";
      patientNote.innerText = "❗ See a doctor immediately.";
      doctorNote.innerText = "🚨 Order ACR, GFR. Adjust medications.";
    } else {
      riskBar.style.backgroundColor = "gray";
      patientNote.innerText = "❓ Unable to determine.";
      doctorNote.innerText = "";
    }

    document.getElementById("downloadBtn").style.display = "inline-block";

  } catch (err) {
    alert("❌ Prediction failed. Try again later.");
    console.error("Error:", err);
  }
});
