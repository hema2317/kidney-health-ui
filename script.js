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

  // Update Risk Bar
  const bar = document.getElementById("riskBar");
  if (result.risk === "Low") {
    bar.style.width = "33%";
    bar.style.backgroundColor = "green";
  } else if (result.risk === "Moderate") {
    bar.style.width = "66%";
    bar.style.backgroundColor = "orange";
  } else if (result.risk === "High") {
    bar.style.width = "100%";
    bar.style.backgroundColor = "red";
  }
});
