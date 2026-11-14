// The decisions of the base-guard plugin, kept apart from the OpenCode API so that they can be
// tested with Node alone.
const CODE_FILE = /\.(?:ts|mts|html|css|scss|json)$/;
const WRITE_TOOLS = new Set([
  'edit',
  'write',
  'patch',
]);

// Whether a finished tool call wrote a file the lint pass reads.
export function lintedFile(
  tool: string,
  input: {
    path?: string;
    filePath?: string;
  },
): string | undefined {
  const file = input.path ?? input.filePath;

  return WRITE_TOOLS.has(tool) && file !== undefined && CODE_FILE.test(file) ? file : undefined;
}

// What the model reads after the result of its write: the errors left, or nothing.
export function lintNote(output: string): string | undefined {
  const text = output.trim();

  return text === '' ? undefined : `The file was formatted. Lint errors left in it:\n${text}`;
}
