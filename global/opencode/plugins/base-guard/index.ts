// OpenCode 2.2.7 plugin of the base, loaded from /etc/opencode/plugins/ (the global base).
// After every write of a code file, the formatter of the base has already run (the "formatter"
// setting); this plugin then adds the lint errors left in that file to the result the model reads.
// Before a subagent call, it refuses a background call and a second subagent (decision 0018).
// API from the tag v2.2.7 (plugin/hooks.ts). To try on the workstation: see guides/install.md.
import { execFile } from 'node:child_process';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { Plugin } from '@opencode/plugin';
import {
  lintedFile,
  lintNote,
  SubagentGate,
} from './guard.ts';

const run = promisify(execFile);
const LINT_FILE = '/opt/local-ai-base/tools/lint-file.ts';

interface ToolEvent {
  tool: string;
  sessionID: string;
  input: Record<string, unknown>;
  status?: string;
  result: {
    content?: string | {
      type: 'text';
      text: string;
    }[];
  };
}

async function lintOutput(directory: string, file: string): Promise<string> {
  try {
    const result = await run(
      'node',
      [
        LINT_FILE,
        resolve(directory, file),
      ],
      { cwd: directory },
    );

    return result.stdout;
  } catch (error) {
    return (error as { stdout?: string }).stdout ?? '';
  }
}

// OpenCode loads a plugin from the default export of its folder (plugin API of the tag v2.2.7).
const plugin = Plugin.define({
  id: 'base.guard',
  async setup(ctx: {
    location: { directory: string };
    tool: { hook: (name: string, handler: (event: ToolEvent) => Promise<void>) => Promise<void> };
  }) {
    const gate = new SubagentGate();

    // A rejected "execute.before" refuses the call; the model reads the message.
    await ctx.tool.hook('execute.before', async (event) => {
      const refused = event.tool === 'subagent' ? gate.start(event.sessionID, event.input) : undefined;

      await (refused === undefined ? Promise.resolve() : Promise.reject(new Error(refused)));
    });
    await ctx.tool.hook('execute.after', async (event) => {
      if (event.tool === 'subagent') {
        gate.finish(event.sessionID);
        return;
      }
      const file = event.status === 'completed' ? lintedFile(event.tool, event.input) : undefined;

      if (file === undefined) {
        return;
      }
      const note = lintNote(await lintOutput(ctx.location.directory, file));

      if (note === undefined) {
        return;
      }
      const previous = event.result.content;

      event.result = {
        ...event.result,
        content: typeof previous === 'string' ? `${previous}\n${note}` : [
          ...previous ?? [],
          {
            type: 'text',
            text: note,
          },
        ],
      };
    });
  },
});

export { plugin as default };
