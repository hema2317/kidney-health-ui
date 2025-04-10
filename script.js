document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const age = parseFloat(document.getElementById("age").value);
  const hba1c = parseFloat(document.getElementById("hba1c").value);
  const albumin = parseFloat(document.getElementById("albumin").value);
  const scr = parseFloat(document.getElementById("scr").value);
  const egfr = parseFloat(document.getElementById("egfr").value);

const response = await fetch("https://kidney-health-api-2.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ age, hba1c, albumin, scr, egfr }),
  });

  const result = await response.json();

  document.getElementById("result").innerText = `Risk: ${result.risk}`;
});
