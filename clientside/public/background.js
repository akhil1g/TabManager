// Function to close inactive tabs
console.log("backgound");
const closeInactiveTabs = () => {
    chrome.tabs.query({}, (tabs) => {
        const currentTime = new Date().getTime();
        tabs.forEach((tab) => {
            if (currentTime - tab.lastAccessed >= inactiveDuration * 100) {
                chrome.tabs.remove(tab.id);
            }
        });
    });
};

const intervalMinutes = 1; 
setInterval(closeInactiveTabs, intervalMinutes * 60 * 1000);
