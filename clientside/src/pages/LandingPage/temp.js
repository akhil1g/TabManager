import React,{Component} from "react";
/*global chrome*/
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
 class Tab extends Component {
    componentWillMount() {
        chrome.storage.local.set({ 'data' : 'Your data'}, function(result) {
            console.log(" Data saved ")
        });
    }
    render() {
        return (
          <div>
            Hello
            
          </div>
        );
    }
}

export default Tab;