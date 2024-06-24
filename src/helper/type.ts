import type { z } from "zod";
import type { contentSchema } from "./schema.js";

export type Content = z.infer<typeof contentSchema>;
