// devtool開いた瞬間に読み込まれてはいるっぽい

import { validateContent } from "./helper/util.js";

// Create a connection to the service worker
const serviceWorkerConnection = chrome.runtime.connect({
	name: "devtools-page",
});

chrome.devtools.network.onRequestFinished.addListener(async (req) => {
	const { response } = req;
	const { content } = response;

	if (
		content.mimeType.includes("json") &&
		req.request.url.includes("get_live_chat")
	) {
		req.getContent((content) => {
			const parsed = JSON.parse(content);
			const validated = validateContent(parsed);
			const messageList =
				validated.continuationContents.liveChatContinuation.actions
					.map((action) =>
						action.replayChatItemAction.actions.map((action) =>
							action.addChatItemAction?.item.liveChatTextMessageRenderer?.message?.runs.map(
								(run) => run.text,
							),
						),
					)
					.flat(3)
					.filter((val) => val !== undefined);
			serviceWorkerConnection.postMessage({ messageList });
		});
	}
});
