const colors = [
  "#1788D6",
  "#84AF12",
  "#52C2B2",
  "#BD9700",
  "#353025",
  "#F5F0CA",
  "#FFDADB",
  "#BC0000",
  "#D1FFDE",
  "#00C237",
];

export function getColor(
  color: number | undefined,
  fallback = "inherit"
): string {
  if (color !== undefined && colors[color] !== undefined) {
    return colors[color];
  }
  return fallback;
}
