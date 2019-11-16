$(function() {
    chrome.storage.sync.get(['total', 'limit'], function(budget) {
        if(budget.total) {
            $('#total').text(budget.total);
        }
        if(budget.limit) {
            $('#limit').text(budget.limit);
        }
    })

    $('#spendAmount').click(function() {
        chrome.storage.sync.get(['total', 'limit'], function(budget) {
            var newTotal = 0;
            if(budget.total) {
                newTotal += parseInt(budget.total);
            }
            var amount = $('#amount').val();
            if(amount) {
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, function() {
                if(amount && newTotal >= budget.limit) {
                    var notifyLimit = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit Reached!",
                        message: "Uh oh! looks like you have reached your limit!!"
                    }
                    chrome.notifications.create('limitNotify', notifyLimit);
                    chrome.notifications.clear('limitNotify');
                }
            });
            
            $('#total').text(newTotal);
            $('#amount').val('');
        });
    })
})