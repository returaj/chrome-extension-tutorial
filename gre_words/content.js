chrome.runtime.sendMessage({type: "requestingDict"}, function(response) {
    if (response.type == "sendingDict" && Array.isArray(response.message)) {
        var dict = response.message;
        $('body *').map((i, v) => findGreWords(v, dict));
    }
})

var hwBannedTags = ["STYLE", "SCRIPT", "NOSCRIPT", "TEXTAREA"];
function findGreWords(node, dict) {
    if (!node || $.inArray(node.tagName, hwBannedTags) != -1) return;
    if(!dict) return;
    try {
        console.log("start search for gre words");
        $(node).contents().each(function(i, v) {
            if (v.isReplaced || v.nodeType !== Node.TEXT_NODE) return;

            // new Promise(function(resolve, reject) {
            //     chrome.runtime.sendMessage({type: "sendingText", message=node.innerHTML}, function(response) {
            //         node.innerHTML = response.message;
            //     })
            // });

            dict.forEach(function(word) {
                var matchedText = v.textContent.match(new RegExp(word, "i"));
                if(matchedText) {
                    var color = "#90EE90" // light green color
                     var replacedText = node.innerHTML.replace(new RegExp(`(${word})`, "i"), `<span style="background-color: ${color}">$1</span>`);
                     node.innerHTML = replacedText;
                }
            });
            v.isReplaced = true;
        });
    } catch(err) {
        if(err.name != "SecurityError") throw err;
    }
}
