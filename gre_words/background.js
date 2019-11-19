function fixedEncodeUri(str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

// context menus
var contextMenuItem = {
    "id": "vocabLookup",
    "title": "Vocabulary",
    "contexts": [ "selection" ]
};
chrome.contextMenus.create(contextMenuItem, () => chrome.runtime.lastError);
chrome.contextMenus.onClicked.addListener(function(clickData) {
    if(clickData.menuItemId == "vocabLookup" && clickData.selectionText) {
        console.log("open vocabulary popup");
        var vocabUrl = "https://www.vocabulary.com/dictionary/" + fixedEncodeUri(clickData.selectionText);
        var createData = {
            "url": vocabUrl,
            "type": "popup",
            "top": 5,
            "left": 5,
            "width": Math.floor(screen.availWidth/2),
            "height": Math.floor(2*screen.availHeight/3)
        };
        chrome.windows.create(createData, function(){});
    }
});


var dict = new GreDict();

function DictData(word, meaning) {
    this.word = word;
    this.meaning = meaning;
}

var a = [new DictData("hi", "hello"), new DictData("how", "when")];
// wait for initialization to finish
dict.init().then(() => {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type == "requestingDict") {
            console.log("Message received from browser, sending dictionary");
            sendResponse({type: "sendingDict", message: dict.inputDict});
        }
    });
})

