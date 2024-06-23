import type { z } from "zod";
import type { contentSchema } from "./schema.js";

export type Key<T extends string> = T extends `${infer Main}.${infer Rest}`
	? { [key in Main]: Key<Rest> }
	: { [key in T]: unknown };

export type Content = z.infer<typeof contentSchema>;
