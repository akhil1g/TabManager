/*global chrome*/
// Function to close inactive tabs
console.log("bg");
function closeInactiveTabs() {
    chrome.storage.sync.get(['customInterval'], function(result) {
        const interval = result.customInterval || 100000000; 
        console.log(interval);
        chrome.tabs.query({}, function(tabs) {
            const currentTime = new Date().getTime();
            tabs.forEach(function(tab) {
                const tabLastActiveTime = new Date(tab.lastAccessed).getTime();
                if (currentTime - tabLastActiveTime > interval * 60 * 1000) {
                    chrome.tabs.remove(tab.id);
                }
            });
        });
    });
}
setInterval(closeInactiveTabs, 60000);