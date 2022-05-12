export function getFileExtensions(rule: string): string[] {
  const matches = rule.match(/{([^}]+)}/g) || [];
  const [extensionsText] = matches?.map((res) => res.replace(/{|}/g, ""));

  return !extensionsText ? [] : extensionsText.split(",");
}
