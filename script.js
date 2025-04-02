document.getElementById("predictForm").addEventListener("submit", async (e) => {
  e.preventDefault();


  const form = new FormData(e.target);
  const data = {};
  form.forEach((value, key) => (data[key] = value));


  const response = await fetch("https://kidney-health-api.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });


  const result = await response.json();
  document.getElementById("result").innerText = `Risk Level: ${result.risk}`;
});