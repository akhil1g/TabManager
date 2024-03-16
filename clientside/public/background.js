function closeInactiveTabs() {
    chrome.tabs.query({}, function(tabs) {
        console.log(tabs);
        const currentTime = new Date().getTime();
        console.log(interval);
        tabs.forEach(function(tab) {
            const tabLastActiveTime = new Date(tab.lastAccessed).getTime();
            if (currentTime - tabLastActiveTime > interval) {
                chrome.tabs.remove(tab.id);
            }
        });
    });
}
setInterval(closeInactiveTabs, 100000);