var contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": [ "selection" ]
};
chrome.contextMenus.create(contextMenuItem, () => chrome.runtime.lastError);

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function(clickData) {
    if(clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], function(budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total': newTotal}, function() {
                    if(newTotal >= budget.limit) {
                        var notifyLimit = {
                            type: "basic",
                            iconUrl: "icon48.png",
                            title: "Notify Limit",
                            message: "Uh oh! looks like you have reached your limit!!"
                        }
                        chrome.notifications.create("limitNotify", notifyLimit);
                        chrome.notifications.clear("limitNotify");
                    }
                })

            })
        }
    }
})

chrome.storage.onChanged.addListener(function(changes, storageName) {
    if(changes.total) {
        chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
    }
})
