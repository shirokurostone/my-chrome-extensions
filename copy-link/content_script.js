
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message["io.github.shirokurostone.command"] == 'copy') {

    let text;
    let element;
    switch (message["io.github.shirokurostone.type"]) {
      case 'title-url':
        text = document.title + "\n" + document.location.href;
        break;
      case 'markdown':
        text = "[" + document.title + "](" + document.location.href + ")";
        break;
      case 'html-link':
        element = document.createElement("a");
        element.setAttribute("href", document.location.href);
        element.innerText = document.title;
        text = element.outerHTML;
        break;
      case 'html-richtext':
        element = document.createElement("a");
        element.setAttribute("href", document.location.href);
        element.innerText = document.title;
        let html = new Blob([element.outerHTML], { type: "text/html" });
        let plain = new Blob([document.title], { type: "text/plain" });
        navigator.clipboard.write([
          new ClipboardItem({
            "text/html": html,
            "text/plain": plain
          })
        ]).then(() => {
          alert("クリップボードにコピーしました");
        });
        return;
    }

    navigator.clipboard.writeText(text)
      .then(() => {
        alert("クリップボードにコピーしました\n" + text);
      });
  }
});
