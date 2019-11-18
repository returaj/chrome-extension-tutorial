function GreDict() {
};

GreDict.prototype = {
    init: function() {
        return this.loadDict().then(function() {
            console.log("Dictionary is finally loaded");
        });
    },

    readDataAsync: function(url) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                if(req.readyState == 4) { // 4 is a ready state
                    resolve(req.responseText);
                }
            };
            req.open("GET", url, true);
            req.send(null);
        });
    },

    loadDict: function() {
        if (this.inputDict) return;
        var dataUrl = chrome.runtime.getURL("data/gre.txt");
        return this.readDataAsync(dataUrl).then(function(data) {
            this['inputDict'] = data.split("\n").map(elem => elem.trim());
        }.bind(this));
    },
};
