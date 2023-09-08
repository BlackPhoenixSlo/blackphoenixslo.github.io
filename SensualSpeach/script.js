// script.js





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

// Refresh functionality for the TurboRefresh button
document.querySelectorAll(".turboBridge").forEach(button => {
    button.addEventListener("click", function() {
    location.reload();
    });
});

