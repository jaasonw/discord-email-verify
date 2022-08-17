import { InteractionResponseFlags, InteractionResponseType } from "discord-interactions";

export function ephemeralMessageReply(message: string) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: message,
      flags: InteractionResponseFlags.EPHEMERAL,
    },
  };
}
