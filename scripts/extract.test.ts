import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  mkdtempSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import {
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_OPTIONS,
  extractBuffer,
  type Options,
} from '../code/.agents/skills/read-heavy-file/scripts/extract.ts';
import {
  docxFile,
  drawioFile,
  ipynbFile,
  jsonFile,
  NOTEBOOK_IMAGE,
  nupkgFile,
  odpFile,
  odsFile,
  odtFile,
  oleFile,
  pdfFile,
  pptxFile,
  sketchFile,
  vsdxFile,
  xdFile,
  xlsxFile,
  zip,
} from './fixtures.ts';

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), '..', 'code', '.agents', 'skills', 'read-heavy-file', 'scripts', 'extract.ts');

function options(overrides: Partial<Options> = {}): Options {
  return {
    ...DEFAULT_OPTIONS,
    ...overrides,
  };
}

function runScript(name: string, content: Buffer, args: string[] = []): {
  code: number | null;
  stdout: string;
} {
  const folder = mkdtempSync(join(tmpdir(), 'extract-'));
  const path = join(folder, name);

  writeFileSync(path, content);
  const result = spawnSync(
    process.execPath,
    [
      SCRIPT,
      path,
      ...args,
    ],
    { encoding: 'utf8' },
  );

  return {
    code: result.status,
    stdout: result.stdout,
  };
}

function before(text: string, first: string, second: string): boolean {
  return text.includes(first) && text.includes(second) && text.indexOf(first) < text.indexOf(second);
}

describe('extract.ts on Word files', () => {
  it('gives headings, paragraphs, tables, comments and embedded parts of a .docx', () => {
    const result = extractBuffer('notes.docx', docxFile());

    assert.equal(result.code, 0);
    assert.match(result.text, /^# notes\.docx/);
    assert.match(result.text, /^## Pump room$/m);
    assert.match(result.text, /^The valve opens & closes\.$/m);
    assert.match(result.text, /^\| Tag \| State \|$/m);
    assert.match(result.text, /^\| V-101 \| Open \|$/m);
    assert.match(result.text, /- Reviewer: Check the tag\./);
    assert.match(result.text, /word\/media\/image1\.png \(\d+ bytes\)/);
  });
});
describe('extract.ts on Excel files', () => {
  it('gives the sheets, values and formulas of a .xlsx', () => {
    const result = extractBuffer('budget.xlsx', xlsxFile());

    assert.equal(result.code, 0);
    assert.match(result.text, /^- Pumps$/m);
    assert.match(result.text, /^- Notes \(hidden\)$/m);
    assert.match(result.text, /^## Sheet: Pumps$/m);
    assert.match(result.text, /Range: A1:C3 · Rows: 3 · Formulas: 2/);
    assert.match(result.text, /^A1=Tag \| B1=Flow \| C1=Double$/m);
    assert.match(result.text, /^A2=Pump P-1 \| B2=3 \| C2=6 \[=B2\*2\]$/m);
    assert.match(result.text, /^A3=Pump P-2 \| B3=4\.5 \| C3=9 \[=B3\*2\]$/m);
    assert.match(result.text, /- PumpTags: Pumps!\$A\$2:\$A\$3/);
    assert.match(result.text, /Merged cells: D1:E1/);
    assert.match(result.text, /- B2: Measured in m3\/h\./);
    assert.match(result.text, /Hidden note/);
  });
  it('shows one sheet with --sheet and stops at --rows', () => {
    const result = extractBuffer('budget.xlsx', xlsxFile({ extraRows: 10 }), options({
      sheet: 'Pumps',
      rows: 4,
    }));

    assert.doesNotMatch(result.text, /Hidden note/);
    assert.match(result.text, /^A1=Tag/m);
    assert.match(result.text, /^B4=10$/m);
    assert.doesNotMatch(result.text, /^B5=/m);
    assert.match(result.text, /\[9 more rows not shown; use --rows <n> or --sheet <name>\]/);
  });
  it('refuses a sheet that does not exist and names the sheets', () => {
    const result = extractBuffer('budget.xlsx', xlsxFile(), options({ sheet: 'Valves' }));

    assert.equal(result.code, 1);
    assert.match(result.text, /Sheet not found: Valves\. Sheets: Pumps, Notes/);
  });
  it('warns about macros and never runs them', () => {
    const result = extractBuffer('budget.xlsm', xlsxFile({ macros: true }));

    assert.match(result.text, /xl\/vbaProject\.bin/);
    assert.match(result.text, /This file contains macros\. They were not read\. Never run them\./);
  });
});
describe('extract.ts on PowerPoint files', () => {
  it('gives the slides in presentation order, with their notes', () => {
    const result = extractBuffer('slides.pptx', pptxFile());

    assert.equal(result.code, 0);
    assert.match(result.text, /2 slides/);
    assert.ok(before(result.text, '## Slide 1', 'Title slide'));
    assert.ok(before(result.text, 'Title slide', '## Slide 2'));
    assert.ok(before(result.text, '## Slide 2', 'Second slide'));
    assert.match(result.text, /Notes:\n\nSpeak about the pumps\./);
    assert.doesNotMatch(result.text, /^1$/m);
  });
});
describe('extract.ts on OpenDocument files', () => {
  it('gives the headings, paragraphs and tables of a .odt', () => {
    const result = extractBuffer('report.odt', odtFile());

    assert.equal(result.code, 0);
    assert.match(result.text, /Type: OpenDocument text/);
    assert.match(result.text, /^## Maintenance$/m);
    assert.match(result.text, /^Close the suction valve first\.$/m);
    assert.match(result.text, /^\| Step \| Action \|$/m);
    assert.match(result.text, /^\| 1 \| Stop the pump \|$/m);
    assert.match(result.text, /^End of procedure\.$/m);
    assert.match(result.text, /Pictures\/photo\.png/);
  });
  it('gives the cells and formulas of a .ods, without its empty repeated rows', () => {
    const result = extractBuffer('tanks.ods', odsFile());

    assert.match(result.text, /^## Sheet: Tanks$/m);
    assert.match(result.text, /^A1=Tank \| B1=Level$/m);
    assert.match(result.text, /^A2=T-1 \| B2=80 \[=\[\.C2\]\*2\]$/m);
    assert.ok(result.text.length < 2000);
  });
  it('gives the slides and notes of a .odp', () => {
    const result = extractBuffer('deck.odp', odpFile());

    assert.match(result.text, /^## Slide 1: Intro$/m);
    assert.match(result.text, /^Ballast system$/m);
    assert.match(result.text, /Notes:\n\nMention the vents\./);
  });
});
describe('extract.ts on design files', () => {
  it('gives the screens and their texts of an Adobe XD file', () => {
    const result = extractBuffer('mockup.xd', xdFile());

    assert.equal(result.code, 0);
    assert.match(result.text, /Type: Adobe XD document · 2 artboards/);
    assert.match(result.text, /^- Home screen$/m);
    assert.match(result.text, /^- Alarm list$/m);
    assert.ok(before(result.text, '## Screen: Home screen', '- Start pump'));
    assert.match(result.text, /^- Stop pump$/m);
    assert.ok(before(result.text, '## Screen: Alarm list', '- High pressure alarm'));
    assert.doesNotMatch(result.text, /Rectangle 1/);
    assert.match(result.text, /preview\.png exists: an image, not read\./);
  });
  it('gives the outline of one XD artboard with --part and --outline', () => {
    const result = extractBuffer('mockup.xd', xdFile(), options({
      part: 'artwork/artboard-1111/graphics/graphicContent.agc',
      outline: true,
    }));

    assert.match(result.text, /- rawText: string "Start pump"/);
  });
  it('gives the pages, artboards and texts of a Sketch file', () => {
    const result = extractBuffer('screens.sketch', sketchFile());

    assert.match(result.text, /^## Page: Screens$/m);
    assert.match(result.text, /^### Artboard: Tank view$/m);
    assert.match(result.text, /^- Tank level$/m);
  });
  it('gives the pages and shape texts of a Visio file', () => {
    const result = extractBuffer('loop.vsdx', vsdxFile());

    assert.match(result.text, /^## Page: Cooling loop$/m);
    assert.match(result.text, /^- Heat exchanger$/m);
    assert.match(result.text, /^- Sea water pump$/m);
  });
  it('gives the shapes and connections of a compressed draw.io diagram', () => {
    const result = extractBuffer('circuit.drawio', drawioFile(true));

    assert.equal(result.code, 0);
    assert.match(result.text, /^## Page: Circuit$/m);
    assert.match(result.text, /^- Pump$/m);
    assert.match(result.text, /^- Tank$/m);
    assert.match(result.text, /^- Valve V-1$/m);
    assert.match(result.text, /^- Pump → Tank \(fills\)$/m);
  });
  it('reads an uncompressed draw.io diagram the same way', () => {
    assert.equal(extractBuffer('a.drawio', drawioFile(false)).text, extractBuffer('a.drawio', drawioFile(true)).text);
  });
});
describe('extract.ts on notebooks, data and archives', () => {
  it('gives the cells of a notebook and omits its outputs', () => {
    const result = extractBuffer('study.ipynb', ipynbFile());

    assert.equal(result.code, 0);
    assert.match(result.text, /Type: Jupyter notebook · 2 cells · python/);
    assert.match(result.text, /^## Cell 2 \(code\)$/m);
    assert.match(result.text, /^```python\nflow = kv \* opening\nprint\(flow\)\n```$/m);
    assert.match(result.text, /\[2 outputs omitted: display_data, stream\]/);
    assert.ok(!result.text.includes(NOTEBOOK_IMAGE));
  });
  it('gives the outline of a JSON file, not its content', () => {
    const file = jsonFile();
    const result = extractBuffer('sensors.json', file);

    assert.match(result.text, /- sensors: array \(500 items\)/);
    assert.match(result.text, /- tag: string "PT-0"/);
    assert.doesNotMatch(result.text, /PT-499/);
    assert.ok(result.text.length < file.length / 20);
  });
  it('lists a NuGet package, shows its .nuspec and flags unsafe entry names', () => {
    const result = extractBuffer('Demo.Valves.1.2.0.nupkg', nupkgFile());

    assert.match(result.text, /Type: NuGet package · 3 entries/);
    assert.match(result.text, /^- lib\/net8\.0\/Demo\.Valves\.dll \(\d+ bytes\)$/m);
    assert.match(result.text, /^- \.\.\/escape\.txt \(\d+ bytes\) \(unsafe path: never extract it\)$/m);
    assert.match(result.text, /<id>Demo\.Valves<\/id>/);
  });
  it('refuses to print a binary entry', () => {
    const result = extractBuffer(
      'pkg.zip',
      zip({
        'tool.exe': Buffer.from([
          0x4D,
          0x5A,
          0,
          0,
        ]),
      }),
      options({ part: 'tool.exe' }),
    );

    assert.equal(result.code, 2);
    assert.match(result.text, /Binary entry: tool\.exe/);
  });
  it('gives the commands to run for an image, a large text file and an unknown format', () => {
    assert.match(extractBuffer('photo.png', Buffer.from('fake')).text, /tesseract "photo\.png"/);
    assert.match(extractBuffer('trace.log', Buffer.from('line')).text, /head -n 100 "trace\.log"/);
    assert.equal(extractBuffer('model.bin', Buffer.from('data')).code, 2);
  });
});
describe('extract.ts limits and refusals', () => {
  it('ends a long output with the truncated line', () => {
    const paragraphs = Array.from({ length: 200 }, (_, index) => `Paragraph ${index} about the cooling circuit.`);
    const result = extractBuffer('long.docx', docxFile(paragraphs), options({ maxChars: 2000 }));
    const lines = result.text
      .trimEnd()
      .split('\n');

    assert.equal(result.code, 0);
    assert.ok(result.text.length < 2200);
    assert.match(lines.at(-1) ?? '', /^\[truncated: \d+ more characters; use --part, --sheet, --rows or --max-chars\]$/);
  });
  it('exits with code 2 and the commands to run on a PDF', () => {
    const result = runScript('spec.pdf', pdfFile());

    assert.equal(result.code, 2);
    assert.match(result.stdout, /pdfinfo "/);
    assert.match(result.stdout, /pdftotext -layout -f 1 -l 10 ".+spec\.pdf" "\.extract\/spec\.pdf\.txt"/);
  });
  it('exits with code 2 and the conversion command on an old Office file', () => {
    const result = runScript('budget.xls', oleFile());

    assert.equal(result.code, 2);
    assert.match(result.stdout, /soffice --headless --convert-to xlsx --outdir \.extract ".+budget\.xls"/);
    assert.match(result.stdout, /node \.agents\/skills\/read-heavy-file\/scripts\/extract\.ts "\.extract\/budget\.xlsx"/);
  });
  it('refuses a password-protected Office file', () => {
    const result = extractBuffer('secret.docx', oleFile());

    assert.equal(result.code, 1);
    assert.match(result.text, /encrypted Office file/);
  });
  it('refuses an archive with an encrypted entry and extracts nothing', () => {
    const archive = zip({ 'word/document.xml': '<w:document><w:t>Confidential text</w:t></w:document>' }, { encrypted: true });
    const result = runScript('locked.docx', archive);

    assert.equal(result.code, 1);
    assert.match(result.stdout, /Encrypted entry: word\/document\.xml\. Nothing was extracted\./);
    assert.doesNotMatch(result.stdout, /Confidential/);
  });
  it('refuses a ZIP entry whose decompressed size is too large', () => {
    const archive = zip({ 'word/document.xml': Buffer.alloc(65 * 1024 * 1024) });
    const result = extractBuffer('bomb.docx', archive);

    assert.equal(result.code, 1);
    assert.match(result.text, /Entry too large: word\/document\.xml/);
  });
  it('lists the entries with --list and reads one with --part', () => {
    const listed = extractBuffer('notes.docx', docxFile(), options({ list: true }));
    const part = extractBuffer('notes.docx', docxFile(), options({ part: 'word/comments.xml' }));

    assert.match(listed.text, /^- word\/document\.xml \(\d+ bytes\)$/m);
    assert.match(part.text, /^## word\/comments\.xml$/m);
    assert.match(part.text, /w:author="Reviewer"/);
  });
  it('refuses a bad option with the usage line', () => {
    const result = runScript('notes.docx', docxFile(), [
      '--rows',
      'many',
    ]);

    assert.equal(result.code, 1);
    assert.match(result.stdout, /--rows must be a whole number above 0/);
  });
});
