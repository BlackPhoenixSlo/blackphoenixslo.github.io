// script.js

// Toggle Button Logic
document.querySelector(".toggle-button").addEventListener("click", function() {
    const toggleButton = document.querySelector(".toggle-button");
    const currentState = toggleButton.getAttribute("data-state");
    const newState = currentState === "v1" ? "v2" : "v1";
    toggleButton.setAttribute("data-state", newState);
    toggleButton.textContent = newState;
});

// Swap Button Logic
document.getElementById("swapButton").addEventListener("click", function() {
    const [dropdown1, dropdown2] = document.querySelectorAll(".crypto-dropdown");
    [dropdown1.value, dropdown2.value] = [dropdown2.value, dropdown1.value];
});

// Navigation Logic
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelectorAll(".content-div").forEach(div => div.style.display = "none");
        document.getElementById(e.target.getAttribute("data-content")).style.display = "block";
    });
});

// Dark Mode Logic
document.getElementById("darkModeToggle").addEventListener("click", function() {
    const body = document.body;
    const isDarkMode = body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "on" : "off");
});

// Check local storage for dark mode preference on page load
if(localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark-mode");
}