chrome.runtime.onInstalled.addListener(function() {
    console.log("Extension installed")
});

setInterval(function () {
    console.log("I aten't dead")
}, 10800000);


//I tried to add a monitor for the uninstall, but couldn't find an effective way, I found this event but the background page is destroyed before I can do anything with it.
chrome.management.onUninstalled.addListener(function() {
    console.log("Drat")
});

