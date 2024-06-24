import { messageListSchema } from "./helper/schema.js";
import { getCurrentTab } from "./helper/util.js";

let devtoolPort: chrome.runtime.Port | undefined = undefined;
let contentScriptPort: chrome.runtime.Port | undefined = undefined;

chrome.runtime.onConnect.addListener((port) => {
	if (port.name.includes("devtools")) {
		console.log("devtool port opened!");
		devtoolPort = port;
		devtoolPort.onMessage.addListener(async (message) => {
			const validated = messageListSchema.parse(message);
			if (!contentScriptPort) {
				const { id } = await getCurrentTab();
				if (id === undefined) {
					throw new Error("current tab id undefined.");
				}
				contentScriptPort = chrome.tabs.connect(id);
			}
			console.log({ validated });
			contentScriptPort.postMessage(validated);
		});
	}
	if (port.name.includes("content-script")) {
		contentScriptPort = port;
	}
});

chrome.runtime.onInstalled.addListener(() => {
	console.log("on installed!");
});

chrome.action.onClicked.addListener((tab) => {
	console.log("action fired!");
	console.log({ tabUrl: tab.url });
});
