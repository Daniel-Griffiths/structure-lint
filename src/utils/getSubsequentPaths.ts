export function getSubsequentPaths(rule: string): string[] {
  const rulePieces = rule.split("/");

  return rulePieces.map((_, i, { length }) =>
    rulePieces.slice(0, i + 1).join("/")
  );
}
