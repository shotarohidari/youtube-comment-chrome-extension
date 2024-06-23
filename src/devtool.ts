// devtool開いた瞬間に読み込まれてはいるっぽい

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
			serviceWorkerConnection.postMessage({ content });
		});
	}
});

console.log("dev tool script!");
