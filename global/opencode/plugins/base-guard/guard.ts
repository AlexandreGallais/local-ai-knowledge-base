// The decisions of the base-guard plugin, kept apart from the OpenCode API so that they can be
// tested with Node alone.
export interface SubagentCall {
  background?: boolean;
}

// The parent sessions that have a subagent running: one at a time (decision 0018).
export class SubagentGate {
  private readonly busy = new Set<string>();

  // Returns the message that refuses the call, or undefined to let it go.
  start(sessionID: string, input: SubagentCall): string | undefined {
    if (input.background === true) {
      return 'Background subagents are off. Call subagent again without background.';
    }
    if (this.busy.has(sessionID)) {
      return 'A subagent is already running. Wait for its report, then start the next one.';
    }
    this.busy.add(sessionID);
    return undefined;
  }

  finish(sessionID: string): void {
    this.busy.delete(sessionID);
  }
}

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
