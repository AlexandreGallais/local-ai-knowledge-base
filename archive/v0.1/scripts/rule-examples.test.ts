// Every "Wrong" example of the rule documents must break its rule; every "Right" example must pass
// ESLint and TypeScript with no error. Needs the packages of the example project (npm registry once).
import assert from 'node:assert/strict';
import {
  describe,
  it,
} from 'node:test';
import { prepareProject } from './lint-sample.ts';
import {
  lintExamples,
  readExamples,
  writeExamples,
} from './rule-examples.ts';

describe('examples of the TypeScript and Angular rule documents', () => {
  const examples = readExamples();
  const project = prepareProject();

  writeExamples(project, examples);
  const reports = lintExamples(project);

  it('gives every rule section a wrong and a right example', () => {
    const sections = new Set(examples.map((example) => `${example.document} ${example.section}`));

    assert.ok(sections.size >= 25, `${sections.size} sections with examples`);
    for (const section of sections) {
      const kinds = examples
        .filter((example) => `${example.document} ${example.section}` === section)
        .map((example) => example.kind);

      assert.ok(kinds.includes('wrong') && kinds.includes('right'), section);
    }
  });
  it('lints every example file', () => {
    for (const example of examples) {
      assert.ok(reports.has(example.file), `not linted: ${example.file}`);
    }
  });
  it('names the rule of every section with examples', () => {
    for (const example of examples) {
      assert.notEqual(example.rule, '', `${example.document}: ${example.section}`);
    }
  });
  it('breaks the rule of the section with each wrong example', () => {
    for (const example of examples.filter((item) => item.kind === 'wrong')) {
      const report = reports.get(example.file);
      const found = example.rule.startsWith('TypeScript ') ? (report?.compileErrors.length ?? 0) > 0 : report?.ruleIds.includes(example.rule) === true;

      assert.ok(found, `${example.document}: ${example.section}\nexpected ${example.rule}, found ${JSON.stringify(report)}`);
    }
  });
  it('passes ESLint and TypeScript with each right example', () => {
    for (const example of examples.filter((item) => item.kind === 'right')) {
      const report = reports.get(example.file);

      assert.deepEqual(report?.ruleIds ?? [], [], `${example.document}: ${example.section}`);
      assert.deepEqual(report?.compileErrors ?? [], [], `${example.document}: ${example.section}`);
    }
  });
});
