// The output of `npm run lint`: one line per error, "file:line:column rule-id message", 20 at most,
// then their count. Nothing at all when there is no error. A CommonJS module, the form ESLint
// documents for a custom formatter.
const { relative } = require('node:path');
const MAX_LINES = 20;

/**
 * @param {{ filePath: string, messages: { ruleId: string | null, line?: number, column?: number, message: string }[] }[]} results
 * @param {{ cwd: string }} context
 */
function formatter(results, context) {
  const lines = results.flatMap((result) => result.messages.map((message) => `${relative(context.cwd, result.filePath)}:${message.line ?? 0}:${message.column ?? 0} ${message.ruleId ?? 'parse-error'} ${message.message.replaceAll('\n', ' ')}`));

  if (lines.length === 0) {
    return '';
  }
  return [
    ...lines.slice(0, MAX_LINES),
    ...lines.length > MAX_LINES ? [`(${lines.length - MAX_LINES} more)`] : [],
    `${lines.length} error(s). Fix them, then run npm run lint again.`,
  ].join('\n');
}

module.exports = formatter;
