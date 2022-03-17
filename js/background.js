chrome.contextMenus.create({
  title: "Toggle .snap.js file",
  id: "toggle_snap_file",
  contexts: ["all"],
});

chrome.contextMenus.create({
  title: "Toggle .test.js file",
  id: "toggle_test_file",
  contexts: ["all"],
});

chrome.contextMenus.create({
  title: "Toggle All Reviewed",
  id: "toggle_all_reviewed",
  contexts: ["all"],
});

// On click event execute script.
chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: handleMenuItemCallback(info),
  });
});

const handleMenuItemCallback = (info) => {
  const { menuItemId } = info;

  switch (menuItemId) {
    case "toggle_snap_file":
      return toggleSnapFile;
      break;

    case "toggle_all_reviewed":
      return toggleAllReviewed;
      break;

    case "toggle_test_file":
      return toggleTestFile;
      break;
  }
};

// Toggle snap file.
const toggleSnapFile = () => {
  document.querySelectorAll("div.js-file").forEach(function (item, index) {
    if (item.getAttribute("data-tagsearch-path").includes(".snap.js")) {
      item.style.display = item.style.display === "none" ? "block" : "none";
    }
  });
};

// Toggle test.js file.
const toggleTestFile = () => {
  document.querySelectorAll("div.js-file").forEach(function (item, index) {
    if (item.getAttribute("data-tagsearch-path").includes(".test.js")) {
      item.style.display = item.style.display === "none" ? "block" : "none";
    }
  });
};

// Toggle review chekbox.
const toggleAllReviewed = () => {
  document.querySelectorAll(".js-reviewed-checkbox").forEach((c) => c.click());
};
