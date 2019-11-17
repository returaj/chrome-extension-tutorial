var contextMenuItem = {
    "id": "vocabLookup",
    "title": "Vocabulary",
    "contexts": [ "selection" ]
};
chrome.contextMenus.create(contextMenuItem, () => chrome.runtime.lastError);

function fixedEncodeUri(str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickData) {
    if(clickData.menuItemId == "vocabLookup" && clickData.selectionText) {
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
