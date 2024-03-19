/*global chrome*/
// function that closes tabs on user defined intervals
function closeInactiveTabs() {
    chrome.storage.sync.get(['customInterval'], function(result) {
        // Either user saved interval or Default interval: 1000000000
        const interval = result.customInterval || 100000000; 
        chrome.tabs.query({}, function(tabs) {
            const currentTime = new Date().getTime();
            tabs.forEach(function(tab) {
                const tabLastActiveTime = new Date(tab.lastAccessed).getTime();
                if(currentTime - tabLastActiveTime > interval * 60 * 1000) {
                    chrome.tabs.remove(tab.id);
                }
            });
        });
    });
}
//Calling func every 10 minutes
setInterval(closeInactiveTabs, 600000); 


//Keyboard Shortcuts
//to pin the active tab
chrome.commands.onCommand.addListener(function(command) {
    if(command === "pinTab") {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const tabId = tabs[0].id;
            chrome.tabs.update(tabId, { pinned: true });
        });
    }
});


//to unpin the active tab
chrome.commands.onCommand.addListener(function(command) {
    if (command === "unpinTab") {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const tabId = tabs[0].id;
            chrome.tabs.update(tabId, { pinned: false });
        });
    }
});
