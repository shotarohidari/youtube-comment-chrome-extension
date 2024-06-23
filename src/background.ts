import { contentSchema } from "./schema.js";
import type { Content } from "./type.js";

chrome.runtime.onInstalled.addListener(() => {
	console.log("on installed!");
});

chrome.runtime.onConnect.addListener((port) => {
	console.dir({ port }, { depth: null });
	port.onMessage.addListener(async (message) => {
		const parsed = JSON.parse(message.content);
		console.dir({ parsed }, { depth: null });
		const validated = validateContent(parsed);
		const messageList =
			validated.continuationContents.liveChatContinuation.actions
				.map((action) =>
					action.replayChatItemAction.actions.map((action) =>
						action.addChatItemAction.item.liveChatTextMessageRenderer.message.runs.map(
							(run) => run.text,
						),
					),
				)
				.flat(3);
		console.log({ messageList });
	});
});

function validateContent(value: unknown) {
	const result = contentSchema.safeParse(value);
	if (result.success) {
		return result.data;
	}
	throw new Error(JSON.stringify({ errors: result.error.issues.flat(1) }));
}

chrome.action.onClicked.addListener((tab) => {
	console.log("action fired!");
	console.log({ tabUrl: tab.url });
});
