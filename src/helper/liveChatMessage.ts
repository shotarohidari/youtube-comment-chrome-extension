import { 指定のx0とx1とy0とy1内に特定のHTML要素があるかチェック } from "./util.js";

export class LiveChatMessageQueue {
	messageQueue: string[] = [];
	intervalId = 0;
	addMessageToQueue(messageList: string[]) {
		this.messageQueue.push(...messageList);
	}

	scheduleMessageQueueTask() {
		this.intervalId = window.setInterval(() => {
			// ビデオ要素の位置、サイズを取得
			const video = document.querySelector("video");
			if (!video) {
				throw new Error("not found video element!");
			}
			const rect = video.getBoundingClientRect();
			const videoX0 = rect.x;
			const yInterval = rect.height / 10;
			for (let laneNumber = 0; laneNumber < 10; laneNumber++) {
				const laneY0 = 0 + laneNumber * yInterval;
				const laneY1 = laneY0 + yInterval;
				const x0 = videoX0;
				const x1 = x0 + 500;
				const existsMessage =
					指定のx0とx1とy0とy1内に特定のHTML要素があるかチェック({
						x0,
						x1,
						y0: laneY0,
						y1: laneY1,
						selector: "span",
					});
				if (!existsMessage) {
					this.streamChatMessageOnVideo({
						laneNumber,
					});
				}
			}
		}, 1000);

		return () => {
			clearInterval(this.intervalId);
		};
	}

	// ビューポートを抜けるまで100m秒感覚でレーンNにメッセージを流す
	private streamChatMessageOnVideo({ laneNumber }: { laneNumber: number }) {
		const message = this.messageQueue.pop(); // キューからジョブを取り出して、ジョブを実行する
		if (!message) {
			return;
		}

		console.log("will stream message.");
		// ビデオ要素の位置、サイズを取得
		const video = document.querySelector("video");
		if (!video) {
			throw new Error("not found video element!");
		}
		const rect = video.getBoundingClientRect();
		const videoX0 = rect.x;
		const videoX1 = rect.x + rect.width;
		const yInterval = rect.height / 10;
		// メッセージエレメントを作成
		const laneNY = rect.y + laneNumber * yInterval;
		const messageElm = document.createElement("span");
		messageElm.style.color = "white";
		messageElm.style.position = "absolute";
		messageElm.style.zIndex = "10000";
		messageElm.textContent = message;
		messageElm.style.top = `${laneNY}px`;
		const messageElmRect = messageElm.getBoundingClientRect();
		let xPos = videoX0 - messageElmRect.width;
		messageElm.style.left = `${xPos}px`;
		messageElm.style.padding = "0.5rem";
		messageElm.style.fontSize = `${yInterval * 0.3}px`;
		messageElm.style.fontWeight = "bold";
		document.body.prepend(messageElm);

		const timerId = setInterval(() => {
			xPos += 1;
			if (xPos + 100 > videoX1) {
				clearInterval(timerId);
				messageElm.remove();
			}
			messageElm.style.left = `${xPos}px`;
		}, 16);
	}
}
