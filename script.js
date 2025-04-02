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
    doctorNote.innerText = "🚨 Urgent: Order labs (
