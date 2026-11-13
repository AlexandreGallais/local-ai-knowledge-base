// Reads JSON with comments, as devcontainer.json allows: removes the // and /* */ comments that
// are outside strings, then parses the rest.
function endOfString(text: string, start: number): number {
  let index = start + 1;

  while (index < text.length && text[index] !== '"') {
    index += text[index] === '\\' ? 2 : 1;
  }
  return index + 1;
}

function endOfComment(text: string, start: number): number {
  if (text.startsWith('//', start)) {
    const lineEnd = text.indexOf('\n', start);

    return lineEnd === -1 ? text.length : lineEnd;
  }
  const end = text.indexOf('*/', start + 2);

  return end === -1 ? text.length : end + 2;
}

export function stripJsonComments(text: string): string {
  let result = '';
  let index = 0;

  while (index < text.length) {
    if (text[index] === '"') {
      const end = endOfString(text, index);

      result += text.slice(index, end);
      index = end;
    } else if (text.startsWith('//', index) || text.startsWith('/*', index)) {
      index = endOfComment(text, index);
    } else {
      result += text[index];
      index += 1;
    }
  }
  return result;
}

export function parseJsonc(text: string): unknown {
  return JSON.parse(stripJsonComments(text));
}
