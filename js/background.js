// Create Menu.
chrome.contextMenus.create({
  title: "Toggle .snap.js file",
  id: "exclude_snap_file",
  contexts: ["all"]
});

// On click event execute script.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleSnapFile,
  });
});

// Toggle snap file.
const toggleSnapFile = () => {
  document.querySelectorAll("div.js-file").forEach(function (item, index) {
    if (item.getAttribute("data-tagsearch-path").includes(".snap.js")) {
      item.style.display = item.style.display === "none" ? "block" : "none";
    }
  });
};
