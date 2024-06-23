import type { Key } from "./type.js";

export function assertRecord(
	value: unknown,
): asserts value is Record<string, unknown> {
	if (
		typeof value !== "object" ||
		value === null ||
		value === undefined ||
		Object.keys(value).length === 0
	) {
		throw new Error("not record.");
	}
}

export function assertKey<T extends string>(
	obj: Record<string, unknown>,
	key: T,
): asserts obj is Key<T> {
	const splitted = key.split(".");
	if (splitted.length === 1) {
		if (obj[splitted[0]] === undefined)
			throw new Error(`doesn't have key: ${key}`);
	} else {
		const rest = splitted.slice(1).join(".");
		assertKey(obj, rest);
	}
}

export function assertArray(value: unknown): asserts value is unknown[] {
	if (!Array.isArray(value)) throw new Error(`no array: ${value}`);
}
