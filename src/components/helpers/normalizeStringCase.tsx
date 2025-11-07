export function NormalizeStringCase(str: string, toUpper = true) {
  if (!str) return "";

  const modifiedString = str?.replace(/\s+/g, ""); // Remove all space
  return toUpper ? modifiedString.toUpperCase() : modifiedString.toLowerCase();
}
