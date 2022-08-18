import {
  InteractionResponseFlags,
  InteractionResponseType,
} from "discord-interactions";

export function ephemeralMessageReply(message: string) {
  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: message,
      flags: InteractionResponseFlags.EPHEMERAL,
    },
  };
}

export function loadingMessage() {
  return {
    type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: "",
      flags: InteractionResponseFlags.EPHEMERAL,
    },
  };
}
