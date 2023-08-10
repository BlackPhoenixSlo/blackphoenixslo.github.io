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
