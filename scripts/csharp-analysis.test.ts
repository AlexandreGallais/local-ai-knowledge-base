// Runs the C# configuration of code/templates/csharp/ on the example .NET project.
// Skipped on a machine without a .NET SDK: these criteria are then proved on the workstation.
import assert from 'node:assert/strict';
import {
  describe,
  it,
} from 'node:test';
import {
  HAS_DOTNET,
  prepareCsharp,
  sample,
  setStrictFormatting,
  writeCode,
} from './csharp-sample.ts';

const LONG_LINE = [
  'namespace Sample.Domain;',
  '',
  '/// <summary>Builds the label of a tank.</summary>',
  'public static class TankLabel',
  '{',
  '    /// <summary>The label of a tank, with its level and its capacity.</summary>',
  '    public static string Of(string name, int level, int capacity) => string.Concat(name, " ", level.ToString(System.Globalization.CultureInfo.InvariantCulture), " of ", capacity.ToString(System.Globalization.CultureInfo.InvariantCulture));',
  '}',
  '',
].join('\n');

describe('C# configuration', { skip: HAS_DOTNET ? false : 'no .NET SDK on this machine' }, () => {
  const project = HAS_DOTNET ? prepareCsharp() : '';

  it('formats, then builds with zero errors on right code', () => {
    const build = sample('build', project);

    assert.match(build.output, /exit=0/, build.output);
    assert.equal(sample('format', project, '--check').status, 0);
  });
  it('fails the strict format check on a line CSharpier would wrap, and passes the standard one', () => {
    writeCode(project, 'Domain/TankLabel.cs', LONG_LINE);
    setStrictFormatting(project, false);
    const standard = sample('format', project, '--check');

    setStrictFormatting(project, true);
    const strict = sample('format', project, '--check');

    setStrictFormatting(project, false);
    assert.equal(standard.status, 0, standard.output);
    assert.notEqual(strict.status, 0, strict.output);
    assert.match(strict.output, /TankLabel\.cs - Was not formatted/);
  });
});
