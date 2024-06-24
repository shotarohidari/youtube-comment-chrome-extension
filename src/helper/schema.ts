import { z } from "zod";

const AddChatItemActionSchema = z
	.object({
		item: z.object({
			liveChatTextMessageRenderer: z
				.object({
					message: z
						.object({
							runs: z.array(z.object({ text: z.string().optional() })),
						})
						.optional(),
				})
				.optional(),
		}),
	})
	.optional();

const ReplayChatItemActionSchema = z.object({
	actions: z.array(z.object({ addChatItemAction: AddChatItemActionSchema })),
});

const LiveChatContinuationSchema = z.object({
	actions: z.array(
		z.object({ replayChatItemAction: ReplayChatItemActionSchema }),
	),
});

export const contentSchema = z.object({
	continuationContents: z.object({
		liveChatContinuation: LiveChatContinuationSchema,
	}),
});

export const messageListSchema = z.object({
	messageList: z.array(z.string()),
});
