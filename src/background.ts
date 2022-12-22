import browser from 'webextension-polyfill'
import downloadDocument from './downloader?script';

browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create(
    {
      id: "download-zip",
      title: "Zip CodiMD",
      contexts: ["all"],
    }
  );
})

browser.contextMenus.onClicked.addListener((_, tab) => {
  if (tab?.id === undefined) {
    return
  }

  // XXX: couldn't execute script multiple times because of import... how we can fix it?
  browser.scripting.executeScript({
    target: { tabId: tab.id },
    files: [downloadDocument]
  });

})