var promiseDict = new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({type: "requestingDict"}, response => {
        if (response.type == "sendingDict" && Array.isArray(response.message)) {
            resolve(response.message);
        } else {
            reject();
        }
    })
});


promiseDict.then(dict => {
    console.log("Successfully received dictionary");
    $('body *').map((i, v) => findGreWords(v, dict));
}).catch(err => {
    console.log("Failed to receive dictionary file from background!!");
});

var hwBannedTags = ["STYLE", "SCRIPT", "NOSCRIPT", "TEXTAREA"];
function findGreWords(node, dict) {
    if (!node || $.inArray(node.tagName, hwBannedTags) != -1) return;
    if(!dict) return;
    try {
        $(node).contents().each(function(i, v) {
            if (v.isReplaced || v.nodeType !== Node.TEXT_NODE) return;
            dict.forEach(function(elem) {
                var matchedText = v.textContent.match(new RegExp(elem.word, "i"));
                if(matchedText) {
                    var color = "#90EE90" // light green color
                     var replacedText = node.innerHTML.replace(new RegExp(`(${elem.word})`, "i"), `<span style="background-color: ${color}">$1</span>`);
                     node.innerHTML = replacedText;
                }
            });
            v.isReplaced = true;
        });
    } catch(err) {
        if(err.name != "SecurityError") throw err;
    }
}

var promiseKeyDict = promiseDict.then(dict => {
    return new Promise((resolve, reject) => {
        var wordDict = {};
        dict.forEach(elem => {
            wordDict[elem.word] = elem;
        });
        resolve(wordDict);
    });
});

