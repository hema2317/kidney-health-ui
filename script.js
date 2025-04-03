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

  console.log("Submitting data:", data); // 🧪 Debug log

  try {
    const res = await fetch("https://kidney-health-api.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to fetch from backend");

    const result = await res.json();
    console.log("Received result:", result); // 🧪 Debug log

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
      patientNote.innerText = "⚠️ Consider lifestyle improvements. Follow up recommended.";
      doctorNote.innerText = "🧪 Monitor kidney function more frequently. Consider further testing.";
    } else if (result.risk === "High") {
      riskBar.style.backgroundColor = "red";
      patientNote.innerText = "❗ See your doctor immediately.";
      doctorNote.innerText = "🚨 Urgent: Order labs (ACR, GFR, BP logs). Adjust medications.";
    } else {
      riskBar.style.backgroundColor = "gray";
      patientNote.innerText = "";
      doctorNote.innerText = "";
    }

    document.getElementById("downloadBtn").style.display = "inline-block";
  } catch (err) {
    console.error("Prediction failed:", err); // 🧪 Debug error
    alert("Something went wrong while predicting kidney risk. Please try again later.");
  }
});
