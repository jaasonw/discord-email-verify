export default function makeNickname(
  firstName: string,
  lastName: string,
  pronouns?: string
) {
  const MAX_DISCORD_NAME_LENGTH = 32;
  let fullName = `${firstName} ${lastName}`;
  if (pronouns) fullName = `${fullName} (${pronouns})`;
  if (fullName.length > MAX_DISCORD_NAME_LENGTH) {
    fullName = fullName.slice(0, MAX_DISCORD_NAME_LENGTH);
  }
  return fullName;
}
