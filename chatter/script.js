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

!function(){function d(a,b){for(var c=0;c<a.length&&!b.call(this,a[c]);c++);}function h(a){d(document.querySelectorAll("iframe.airtable-embed.airtable-dynamic-height"),a)}function e(a){var b=a.getBoundingClientRect();a.contentWindow.postMessage({key:"airtableEmbedViewportChanged",embedRectInViewport:{top:b.top,right:b.right,bottom:b.bottom,left:b.left},embedViewportSize:{height:window.innerHeight,width:window.innerWidth}},"*")}function k(){d(document.querySelectorAll("iframe.airtable-embed"),e)}function f(){clearTimeout(g);
    g=setTimeout(k,200)}if(!window._didAddAirtableGlobalEmbedListeners){window._didAddAirtableGlobalEmbedListeners=!0;var g;window.addEventListener("resize",f,!1);window.addEventListener("scroll",f,!1);window.addEventListener("message",function(a){var b=a.data;b&&"airtableEmbedContentDidResize"===b.key&&h(function(c){if(a.source===c.contentWindow)return c._airtableDidDisableScrollbar||(c._airtableDidDisableScrollbar=!0,c.contentWindow.postMessage({key:"airtableDisableScrollbar"},"*"),e(c)),c.height=b.height,
    !0})},!1)}}();