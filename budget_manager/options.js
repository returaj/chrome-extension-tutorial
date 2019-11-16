$(function() {
    chrome.storage.sync.get('limit', function(budget) {
        if(budget.limit) {
            $('#limit').val(budget.limit);
        }
    })

    $('#saveLimit').click(function() {
        var limit = $('#limit').val();
        if(limit) {
            chrome.storage.sync.set({'limit': limit}, function() {
                close();
            });
        }
    })

    $('#resetTotal').click(function() {
        chrome.storage.sync.set({'total': 0}, function() {
            var notifyReset = {
                type: "basic",
                iconUrl: "icon48.png",
                title: "Reset Total",
                message: "Total has been reset to 0!"
            }
            chrome.notifications.create("resetNotify", notifyReset);
            chrome.notifications.clear("resetNotify");
        });
    })
})
