// script.js

document.querySelector(".toggle-button").addEventListener("click", function() {
    const toggleButton = document.querySelector(".toggle-button");
    if(toggleButton.getAttribute("data-state") === "v1") {
        toggleButton.setAttribute("data-state", "v2");
        toggleButton.textContent = "V2";
    } else {
        toggleButton.setAttribute("data-state", "v1");
        toggleButton.textContent = "V1";
    }
});

document.getElementById("swapButton").addEventListener("click", function() {
    const dropdowns = document.querySelectorAll(".crypto-dropdown");
    const tempValue = dropdowns[0].value;
    dropdowns[0].value = dropdowns[1].value;
    dropdowns[1].value = tempValue;
});


document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault(); // Prevent the default link behavior
        
        // Hide all content-divs
        document.querySelectorAll(".content-div").forEach(div => {
            div.style.display = "none";
        });
        
        // Show the clicked content-div
        const contentId = e.target.getAttribute("data-content");
        document.getElementById(contentId).style.display = "block";
    });
});



document.getElementById("darkModeToggle").addEventListener("click", function() {
    const body = document.body;
    if(body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "off");
    } else {
        body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "on");
    }
});

// Check local storage for dark mode preference on page load
if(localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark-mode");
}
