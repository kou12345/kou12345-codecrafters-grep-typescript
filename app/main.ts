const args = process.argv;
const pattern = args[3];

const inputLine: string = await Bun.stdin.text();

function matchPattern(inputLine: string, pattern: string): boolean {
  if (pattern.length === 1) {
    // 一文字だけのパターン
    return inputLine.includes(pattern);
  } else if (pattern === "\\d") {
    // 数字のパターン
    return inputLine.match(/\d/) !== null;
  } else if (pattern === "\\w") {
    // 英数字のパターン
    return inputLine.match(/\w/) !== null;
  } else if (pattern.startsWith("[") && pattern.endsWith("]")) {
    // 肯定的な文字グループ
    const chars = pattern.slice(1, -1);
    return inputLine.split("").some((c) => chars.includes(c));
  } else {
    throw new Error(`Unhandled pattern: ${pattern}`);
  }
}

if (args[2] !== "-E") {
  console.log("Expected first argument to be '-E'");
  process.exit(1);
}

// Uncomment this block to pass the first stage
if (matchPattern(inputLine, pattern)) {
  console.log("Matched");
  process.exit(0);
} else {
  console.log("Not matched");
  process.exit(1);
}
export {};
