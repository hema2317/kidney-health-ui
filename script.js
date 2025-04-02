document.getElementById("predictForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch("https://kidney-health-api.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  const risk = result.risk;

  let patientTip = "";
  let doctorNote = "";

  if (risk === "Low") {
    patientTip = "🎉 Keep up your healthy lifestyle. Monitor regularly.";
    doctorNote = "🩺 Reassess in 6–12 months.";
  } else if (risk === "Moderate") {
    patientTip = "⚠️ Visit a doctor for kidney checkup and lifestyle review.";
    doctorNote = "🧪 Order labs: ACR, GFR, BP logs. Adjust medications.";
  } else {
    patientTip = "🚨 Urgent: Visit a specialist. Immediate kidney attention needed.";
    doctorNote = "📋 Refer to nephrology. Review anemia, BP, diabetes, and imaging.";
  }

  document.getElementById("result").innerHTML = `
    <p><strong>Risk Level:</strong> ${risk}</p>
    <p><strong>Next Step (Patient):</strong> ${patientTip}</p>
    <p><strong>Doctor's Note:</strong> ${doctorNote}</p>
  `;
});
