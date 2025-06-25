document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcomeScreen");
  const caseScreen = document.getElementById("caseScreen");
  const nameInput = document.getElementById("nameInput");
  const registerBtn = document.getElementById("registerBtn");
  const greeting = document.getElementById("greeting");
  const nameHiddenInput = document.getElementById("nameHiddenInput");
  const diagnosisInput = document.getElementById("diagnosisInput");
  const submitBtn = document.getElementById("submitBtn");

  let userName = localStorage.getItem("swmName") || "";
  let hasSubmitted = localStorage.getItem("swmSubmitted") === "true";

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
    nameHiddenInput.value = userName;

    if (hasSubmitted) {
      diagnosisInput.disabled = true;
      submitBtn.disabled = true;
      submitBtn.textContent = "Already Submitted";
    }
  }

  window.handleFormspree = function (e) {
    if (hasSubmitted) {
      alert("You've already submitted your diagnosis.");
      return false;
    }

    const diagnosis = diagnosisInput.value.trim();
    if (!diagnosis || diagnosis.length < 3) {
      alert("Please enter a longer diagnosis.");
      return false;
    }

    // Allow form to submit normally
    localStorage.setItem("swmSubmitted", "true");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitted ✅";
    return true; // allow native form submit
  };
});
