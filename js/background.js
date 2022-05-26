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

chrome.contextMenus.create({
  title: "Fill Liveblog",
  id: "fill_liveblog",
  contexts: ["all"],
});

chrome.contextMenus.create({
  title: "Fill Liveblog Update",
  id: "fill_liveblog_update",
  contexts: ["all"],
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["js/jquery-3.6.0.min.js"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["js/jquery-3.6.0.min.js"],
  });

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

    case "fill_liveblog":
      return fillLiveblog;
      break;

    case "fill_liveblog_update":
      return fillLiveblogUpdate;
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

//fillup liveblog
const fillLiveblog = () => {
  if (typeof jQuery === "undefined") {
    return;
  }

  const randomNumber = Math.floor(Math.random() * 1000);

  const mock = {
    postTitle: "Boeing docks Starliner capsule " + randomNumber,
    excerpt:
      "Boeing’s astronaut capsule reaches International Space Station in uncrewed test do-over after several failed attempts. " +
      randomNumber,
    content:
      randomNumber +
      " ... With only a test dummy aboard, Boeing’s astronaut capsule pulled up and parked at the International Space Station (ISS) for the first time, a huge achievement for the company after years of false starts. \n With Starliner’s arrival late on Friday, NASA has finally realised its longtime effort to have crew capsules from competing US companies flying to the space station. \n SpaceX already has a running start. Elon Musk’s company pulled off the same test three years ago and has since launched 18 astronauts to the space station, as well as tourists.",
    topicID: 199,
    sourceID: "203",
    thumbnailID: "9",
  };

  //post title
  const titleLabel = document.getElementById("title-prompt-text");
  const postTitle = document.getElementById("title");
  titleLabel.classList.add("screen-reader-text");
  postTitle.value = mock.postTitle;

  //excerpt/summary
  const excerpt = document.getElementById("excerpt");
  excerpt.value = mock.excerpt;

  //content
  document.getElementById("content-html").click();
  const content = document.getElementById("content");
  content.value += mock.content;

  //topic
  document.querySelector("#category-" + mock.topicID + " .selectit").click();

  //source
  jQuery("#arc_source").append(
    '<option value="' + mock.sourceID + '" >Al Jazeera</option>'
  );
  jQuery("#arc_source").val([mock.sourceID]).change();

  //featured image
  const featuredImage = document.getElementById("_thumbnail_id");
  featuredImage.value = mock.thumbnailID;

  let imageArea = document.querySelector("#postimagediv .inside");
  imageArea.removeChild(imageArea.firstElementChild);

  imageArea = jQuery("#postimagediv .inside");
  imageArea.prepend(`<p class="hide-if-no-js">
  <a href="http://ajwp.localhost/wp-admin/media-upload.php?post_id=40&amp;type=image&amp;TB_iframe=1"
      id="set-post-thumbnail" aria-describedby="set-post-thumbnail-desc" class="thickbox"><img width="770"
          height="481"
          src="http://ajwp.localhost/wp-content/uploads/2022/05/Beautiful_Nature_Background_Wallpapers-1-1568x980.jpg"
          class="attachment-post-thumbnail size-post-thumbnail" alt="asdasd" loading="lazy"
          srcset="http://ajwp.localhost/wp-content/uploads/2022/05/Beautiful_Nature_Background_Wallpapers-1-1568x980.jpg 1568w, http://ajwp.localhost/wp-content/uploads/2022/05/Beautiful_Nature_Background_Wallpapers-1-300x188.jpg 300w, http://ajwp.localhost/wp-content/uploads/2022/05/Beautiful_Nature_Background_Wallpapers-1-1024x640.jpg 1024w, http://ajwp.localhost/wp-content/uploads/2022/05/Beautiful_Nature_Background_Wallpapers-1-768x480.jpg 768w, http://ajwp.localhost/wp-content/uploads/2022/05/Beautiful_Nature_Background_Wallpapers-1-1536x960.jpg 1536w, http://ajwp.localhost/wp-content/uploads/2022/05/Beautiful_Nature_Background_Wallpapers-1-770x481.jpg 770w, http://ajwp.localhost/wp-content/uploads/2022/05/Beautiful_Nature_Background_Wallpapers-1-1170x731.jpg 1170w, http://ajwp.localhost/wp-content/uploads/2022/05/Beautiful_Nature_Background_Wallpapers-1.jpg 1920w"
          sizes="(max-width: 770px) 100vw, 770px"></a>
</p>
<p class="hide-if-no-js howto" id="set-post-thumbnail-desc">Click the image to edit or update</p>
<p class="hide-if-no-js"><a href="#" id="remove-post-thumbnail">Remove featured image</a></p>`);
};

//fillup liveblog update
const fillLiveblogUpdate = () => {
  if (typeof jQuery === "undefined") {
    return;
  }

  const randomNumber = Math.floor(Math.random() * 1000);

  const mock = {
    postTitle: "LB Update Starliner capsule " + randomNumber,
    content:
      randomNumber +
      " ... LB Update With only a test dummy aboard, Boeing’s astronaut capsule pulled up and parked at the International Space Station (ISS) for the first time, a huge achievement for the company after years of false starts.",
  };

  //post title
  const titleLabel = document.getElementById("title-prompt-text");
  const postTitle = document.getElementById("title");
  titleLabel.classList.add("screen-reader-text");
  postTitle.value = mock.postTitle;

  //content
  document.getElementById("content-html").click();
  const content = document.getElementById("content");
  content.value += mock.content;
};
