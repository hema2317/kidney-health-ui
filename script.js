document.getElementById("predictForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    hba1c: parseFloat(document.getElementById("hba1c").value),
    albumin: parseFloat(document.getElementById("albumin").value),
    creatinine: parseFloat(document.getElementById("creatinine").value),
    egfr: parseFloat(document.getElementById("egfr").value),
    age: parseInt(document.getElementById("age").value),
    sex: document.getElementById("sex").value
  };

  try {
    const response = await fetch("https://kidney-health-api.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const result = await response.json();
    document.getElementById("result").innerText = "Predicted Risk Level: " + result.risk;
    document.getElementById("resultContainer").style.display = "block";
  } catch (error) {
    console.error("Error during prediction:", error);
    alert("An error occurred while predicting the risk. Please try again.");
  }
});
