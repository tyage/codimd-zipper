import browser from 'webextension-polyfill'
import { downloadDocument } from "./downloader";

browser.contextMenus.create(
  {
    id: "download-zip",
    title: "Zip CodiMD",
    contexts: ["all"],
  },
  downloadDocument
);

