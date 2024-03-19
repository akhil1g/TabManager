/*global chrome*/
console.log("content.js loading...")

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.type==="allTabs"){
        chrome.tabs.query({},function(tabs){
            sendResponse(tabs);
        })
    }
    return true;
})