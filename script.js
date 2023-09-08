// script.js

// Toggle Button Logic
document.querySelector(".toggle-button").addEventListener("click", function() {
    const toggleButton = document.querySelector(".toggle-button");
    const currentState = toggleButton.getAttribute("data-state");
    const newState = currentState === "v1" ? "v2" : "v1";
    toggleButton.setAttribute("data-state", newState);
    toggleButton.textContent = newState;
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


 // Check local storage for dark mode preference on page load
 document.addEventListener("DOMContentLoaded", function() {
    const darkModePreference = localStorage.getItem("darkMode");
    
    // If there's no preference set or it's set to 'on', default to dark mode
    if ( true) {
        document.body.classList.add("dark-mode");
    }
});