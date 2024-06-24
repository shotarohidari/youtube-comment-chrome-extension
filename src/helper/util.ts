import { ZodIssue } from "zod";
import { contentSchema } from "./schema.js";

export async function getCurrentTab() {
	const queryOptions = { active: true, lastFocusedWindow: true };
	// `tab` will either be a `tabs.Tab` instance or `undefined`.
	const [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

class ZodPropertyError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ZodPropertyError";
		// const errorMessage = issues.map((issue) => {
		//   const path = issue.path.join(".");
		//   const expected = issue.expected
		// })
		// this.message =
	}
}
export function validateContent(value: unknown) {
	const result = contentSchema.safeParse(value);
	if (result.success) {
		return result.data;
	}
	throw new ZodPropertyError(
		JSON.stringify({ errors: result.error.issues.flat(1) }, null, 2),
	);
}

// 指定のx0,x1,y0,y1内に特定の要素があるかチェック
export function 指定のx0とx1とy0とy1内に特定のHTML要素があるかチェック({
	x0,
	x1,
	y0,
	y1,
	selector,
}: {
	x0: number;
	x1: number;
	y0: number;
	y1: number;
	selector: string;
}) {
	const elms = Array.from(document.querySelectorAll(selector)).filter(
		(elm) => elm instanceof HTMLElement,
	);
	return elms.some((elm) => {
		const elmX = Number(elm.style.x);
		const elmY = Number(elm.style.y);

		return x0 < elmX && elmX < x1 && y0 < elmY && elmY < y1;
	});
}
