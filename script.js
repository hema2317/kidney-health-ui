document.getElementById("riskForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    age: parseFloat(form.age.value),
    hba1c: parseFloat(form.hba1c.value),
    albumin: parseFloat(form.albumin.value),
    scr: parseFloat(form.scr.value),
    egfr: parseFloat(form.egfr.value)
  };

  const res = await fetch("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  document.getElementById("result").innerText = "Predicted Risk: " + result.risk;
});
