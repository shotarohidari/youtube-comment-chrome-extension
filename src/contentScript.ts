import { LiveChatMessageQueue } from "./helper/liveChatMessage.js";
import { messageListSchema } from "./helper/schema.js";

// Create a connection to the service worker
const contentscriptPort = chrome.runtime.connect({
	name: "content-script",
});
const liveChatMessageQueue = new LiveChatMessageQueue();
const stopper = liveChatMessageQueue.scheduleMessageQueueTask();
contentscriptPort.onMessage.addListener((message: unknown) => {
	const validated = messageListSchema.parse(message);
	liveChatMessageQueue.addMessageToQueue(validated.messageList);
});
