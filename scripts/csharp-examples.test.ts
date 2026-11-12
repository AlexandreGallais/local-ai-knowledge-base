// Every "Wrong" example of the C# rule documents must fail the build with an ID of its section;
// every "Right" example must build with no error. Skipped on a machine without a .NET SDK.
import assert from 'node:assert/strict';
import {
  describe,
  it,
} from 'node:test';
import {
  buildCsharpExamples,
  readCsharpExamples,
  writeCsharpExamples,
} from './csharp-examples.ts';
import {
  HAS_DOTNET,
  prepareCsharp,
} from './csharp-sample.ts';

describe('examples of the C# rule documents', { skip: HAS_DOTNET ? false : 'no .NET SDK on this machine' }, () => {
  const examples = readCsharpExamples();
  const project = HAS_DOTNET ? prepareCsharp() : '';

  writeCsharpExamples(project, examples);
  const reports = HAS_DOTNET ? buildCsharpExamples(project) : new Map<string, string[]>();

  it('gives every rule section an ID, a wrong and a right example', () => {
    const sections = new Set(examples.map((example) => `${example.document} ${example.section}`));

    assert.ok(sections.size >= 18, `${sections.size} sections with examples`);
    for (const section of sections) {
      const found = examples.filter((example) => `${example.document} ${example.section}` === section);

      assert.ok(found.some((example) => example.kind === 'wrong') && found.some((example) => example.kind === 'right'), section);
      assert.ok(found.every((example) => example.ids.length > 0 || example.check !== ''), `no rule ID: ${section}`);
    }
  });
  it('fails the build with an ID of the section for each wrong example', () => {
    for (const example of examples.filter((item) => item.kind === 'wrong' && item.ids.length > 0)) {
      const found = reports.get(example.file) ?? [];

      assert.ok(example.ids.some((id) => found.includes(id)), `${example.document}: ${example.section}\nexpected ${example.ids.join(' or ')}, found ${found.join(', ') || 'nothing'}`);
    }
  });
  it('reports the IDs found for the wrong examples', (context) => {
    const found = examples
      .filter((item) => item.kind === 'wrong')
      .map((item) => `${item.file}: ${(reports.get(item.file) ?? []).join(' ')}`);

    context.diagnostic(found.join('\n'));
    assert.ok(found.length > 0);
  });
  it('builds each right example with no error', () => {
    for (const example of examples.filter((item) => item.kind === 'right')) {
      assert.deepEqual(reports.get(example.file) ?? [], [], `${example.document}: ${example.section}`);
    }
  });
  it('shows async void in the wrong example of the async-void check only', () => {
    for (const example of examples.filter((item) => item.check === 'async-void')) {
      assert.equal(/\basync void\b/.test(example.code), example.kind === 'wrong', `${example.document}: ${example.section}`);
    }
  });
});
