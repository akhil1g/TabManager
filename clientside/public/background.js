
// function that closes tabs on custom intervals
function closeInactiveTabs() {
    chrome.storage.sync.get(['customInterval'], function(result) {
        const interval = result.customInterval || 100000000; // Default interval: 1000000000
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
setInterval(closeInactiveTabs, 600000); 

// function to pin the active tab
chrome.commands.onCommand.addListener(function(command) {
    if (command === "pinTab") {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tabId = tabs[0].id;
        chrome.tabs.update(tabId, { pinned: true });
      });
    }
  });