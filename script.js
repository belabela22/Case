const scriptURL = 'https://script.google.com/macros/s/AKfycbwuT0wL2_swp4cRlccNVWfB5eulQtoSaOYcNwWgskAK_nyPNd55wL1DMBPkcT32fxAziw/exec';

document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const caseScreen = document.getElementById("caseScreen");
  const nameInput = document.getElementById("nameInput");
  const registerBtn = document.getElementById("registerBtn");
  const greeting = document.getElementById("greeting");
  const diagnosisInput = document.getElementById("diagnosisInput");
  const submitBtn = document.getElementById("submitBtn");

  let userName = localStorage.getItem("swmName") || "";
  let hasSubmitted = localStorage.getItem("swmSubmitted") === "true";

  // Already registered?
  if (userName) {
    showCaseScreen();
  }

  registerBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name.length < 2) {
      alert("Please enter a valid name.");
      return;
    }
    userName = name;
    localStorage.setItem("swmName", userName);
    localStorage.setItem("swmSubmitted", "false");
    hasSubmitted = false;
    showCaseScreen();
  });

  function showCaseScreen() {
    welcomeScreen.classList.remove("active");
    caseScreen.classList.add("active");
    greeting.textContent = `👤 Welcome, ${userName}`;

    if (hasSubmitted) {
      diagnosisInput.disabled = true;
      submitBtn.disabled = true;
      submitBtn.textContent = "Already Submitted";
    }
  }

  window.handleSubmit = function () {
    const diagnosis = diagnosisInput.value.trim();
    if (!diagnosis || diagnosis.length < 3) {
      alert("Please provide a longer diagnosis.");
      return false;
    }

    if (hasSubmitted) {
      alert("You've already submitted your response.");
      return false;
    }

    const data = {
      name: userName,
      diagnosis: diagnosis
    };

    submitBtn.textContent = "Submitting...";
    fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.ok) {
        localStorage.setItem("swmSubmitted", "true");
        diagnosisInput.disabled = true;
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitted ✅";
        alert("Diagnosis submitted successfully!");
      } else {
        throw new Error("Submission failed.");
      }
    })
    .catch(err => {
      alert("Error submitting diagnosis.");
      console.error(err);
    });

    return false;
  };
});
