
chrome.contextMenus.onClicked.addListener((info, tab) => {

  chrome.tabs.sendMessage(
    tab.id,
    {
      "io.github.shirokurostone.command": "copy",
      "io.github.shirokurostone.type": info.menuItemId
    }
  )
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });

});

chrome.runtime.onInstalled.addListener(function () {
  let parent = chrome.contextMenus.create({
    title: "リンクをコピー",
    contexts: ["page"],
    id: "parent"
  });

  chrome.contextMenus.create({
    title: "\"${title}\\n${url}\"形式でコピー",
    contexts: ["page"],
    id: "title-url",
    parentId: parent
  });

  chrome.contextMenus.create({
    title: "markdownリンク形式でコピー",
    contexts: ["page"],
    id: "markdown",
    parentId: parent
  });

  chrome.contextMenus.create({
    title: "HTMLリンク形式でコピー",
    contexts: ["page"],
    id: "html-link",
    parentId: parent
  });

  chrome.contextMenus.create({
    title: "リッチテキスト形式でコピー",
    contexts: ["page"],
    id: "html-richtext",
    parentId: parent
  });

});
