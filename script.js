async function predictRisk() {
  const age = parseFloat(document.getElementById("age").value);
  const hba1c = parseFloat(document.getElementById("hba1c").value);
  const albumin = parseFloat(document.getElementById("albumin").value);
  const scr = parseFloat(document.getElementById("scr").value);
  const egfr = parseFloat(document.getElementById("egfr").value);

  const resultBox = document.getElementById("result");
  resultBox.textContent = "Predicting...";

  try {
    const response = await fetch("https://kidney-health-api-2.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age, hba1c, albumin, scr, egfr })
    });

    if (!response.ok) throw new Error("Prediction failed");

    const data = await response.json();
    const risk = data.risk || "Unknown";

    resultBox.innerHTML = `<strong>Risk:</strong> ${risk}`;
    resultBox.style.color = 
      risk === "Low" ? "green" :
      risk === "Moderate" ? "orange" :
      risk === "High" ? "red" : "#333";
  } catch (error) {
    resultBox.textContent = "❌ Unable to predict. Please check input or server.";
    resultBox.style.color = "crimson";
  }
}

async function connectToCGM() {
  try {
    const response = await fetch("https://kidney-health-api-2.onrender.com/get-hba1c");
    const result = await response.json();
    if (result.estimated_hba1c) {
      document.getElementById("hba1c").value = result.estimated_hba1c;
      alert("✅ HbA1c auto-filled from CGM data!");
    } else {
      alert("⚠️ Connected to CGM, but no estimate found.");
    }
  } catch (err) {
    alert("❌ Failed to connect to CGM or retrieve HbA1c.");
  }
}
