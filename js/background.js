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

chrome.contextMenus.create({
  title: "PR Title (base <-- head)",
  id: "pr_title",
  contexts: ["all"],
});

chrome.contextMenus.create({
  title: "Sync PR Title",
  id: "sync_pr_title",
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

    case "pr_title":
      return prTitle;
      break;

    case "sync_pr_title":
      return syncPrTitle;
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

// PR Title.
const prTitle = () => {
  const target = document.querySelector(
    "#base-ref-selector summary span.css-truncate"
  );

  const targetBranch = target?.innerHTML;

  const from = document.querySelector(
    "#head-ref-selector summary span.css-truncate"
  );

  const fromBranch = from?.innerHTML;

  document.getElementById(
    "pull_request_title"
  ).value = `\`${targetBranch}\` <-- \`${fromBranch}\``;
};

// Sync PR Title.
const syncPrTitle = () => {
  const target = document.querySelector(
    "#base-ref-selector summary span.css-truncate"
  );

  const targetBranch = target?.innerHTML;

  const from = document.querySelector(
    "#head-ref-selector summary span.css-truncate"
  );

  const fromBranch = from?.innerHTML;

  document.getElementById(
    "pull_request_title"
  ).value = `Update \`${targetBranch}\` with \`${fromBranch}\``;
};
