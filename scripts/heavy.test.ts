import assert from 'node:assert/strict';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  imagesOf,
  outlineOf,
  partOf,
} from '../global/tools/extract.ts';
import { readText } from '../global/tools/heavy/data.ts';
import {
  OUTLINE_MAX_CHARS,
  renderOutline,
} from '../global/tools/heavy/document.ts';
import { openZip } from '../global/tools/heavy/zip.ts';
import {
  makeDocx,
  makePdf,
  makePptx,
  makeXd,
  makeXlsx,
  makeZip,
  PNG,
  SVG,
} from './lib/fake-files.ts';
import {
  type Client,
  startServer,
} from './lib/mcp-client.ts';

const SERVER = join(dirname(fileURLToPath(import.meta.url)), '..', 'global', 'servers', 'parse.ts');
let root = '';

function write(name: string, data: Buffer | string): string {
  const path = join(root, name);

  writeFileSync(path, data);
  return path;
}

before(() => {
  root = mkdtempSync(join(tmpdir(), 'heavy-'));
  mkdirSync(join(root, '.agents'));
});
after(() => {
  rmSync(root, {
    recursive: true,
    force: true,
  });
});
describe('Adobe XD', () => {
  it('gives the tree screens, groups and layers with positions relative to each screen', async () => {
    const file = write('panel.xd', makeXd());
    const plan = await outlineOf(file, root, 9);

    assert.match(plan, /\[S1\] screen "Pump panel" 1280x800/);
    assert.match(plan, /\[S1\.2\.2\] group "Status" @900,10/);
    assert.match(plan, /\[S1\.2\.2\.2\] text "Status text" @932,\d+ .*"Running"/);
    assert.match(plan, /\[S2\.1\] text "Title" @24,\d+ .*"Alarm list"/);
    assert.match(plan, /group "Open alarms" @40,700 200x48 -> Alarms \(tap\)/);
  });
  it('puts the parts in reading order: the header before the picture, the picture before the button', async () => {
    const plan = await outlineOf(join(root, 'panel.xd'), root, 2);
    const order = [
      'S1.2',
      'S1.3',
      'S1.1',
    ].map((id) => plan.indexOf(`[${id}]`));

    assert.deepEqual(order, order.toSorted((first, second) => first - second));
    assert.match(plan, /\[S1\.2\] group "Header" .*\(\+4 inside: ask part S1\.2\)/);
  });
  it('extracts its images with their place, and never shows the local path of the author', async () => {
    const file = join(root, 'panel.xd');
    const list = await imagesOf(file, root);
    const folder = /written in (\S+)/.exec(list)?.[1] ?? '';

    assert.match(list, /\[img1\] .*img1\.png in S1\.3/);
    assert.deepEqual(readFileSync(join(root, folder, 'img1.png')), PNG);
    assert.doesNotMatch(`${await outlineOf(file, root, 9)}${await partOf(file, root, 'S1')}`, /Users\/someone|pump\.png/);
  });
  it('gives one group whole as a part', async () => {
    const group = await partOf(join(root, 'panel.xd'), root, 'S1.1');

    assert.match(group, /rect "Button background" @40,700 200x48 fill=#156fb2/);
    assert.match(group, /"Show alarms"/);
    assert.doesNotMatch(group, /Pump picture/);
  });
});
describe('Word', () => {
  it('gives the headings as a tree, with tables and comments', async () => {
    const plan = await outlineOf(write('spec.docx', makeDocx()), root, 9);

    assert.match(plan, /\[h0\] before the first heading/);
    assert.match(plan, /\[h1\] heading 1 "Fuel system"/);
    assert.match(plan, /\s{2}- \[h1\.1\] heading 2 "Pumps"/);
    assert.match(plan, /\s{2}- \[h1\.2\] heading 2 "Valves"/);
    assert.match(plan, /\[h2\] heading 1 "Electrical system"/);
    assert.match(plan, /\[t1\] table 2x2/);
    assert.match(plan, /\[comments\] 1 comment/);
  });
  it('gives a section with its list, its table in Markdown and its image marked where it stands', async () => {
    const section = await partOf(join(root, 'spec.docx'), root, 'h1.1');

    assert.match(section, /- Check the suction valve/);
    assert.match(section, /\[image img1\.png\]/);
    assert.match(section, /\| PT-101 \| 0-10 bar \|/);
    assert.match(await partOf(join(root, 'spec.docx'), root, 'h1.2'), /tank & pipe/);
    assert.match(await imagesOf(join(root, 'spec.docx'), root), /img1\.png in h1\.1/);
  });
});
describe('Excel', () => {
  it('gives each sheet with its range, formulas, merged cells and images', async () => {
    const plan = await outlineOf(write('tanks.xlsx', makeXlsx()), root);

    assert.match(plan, /\[Tanks\] sheet "Tanks" A1:B4, 8 cells, 1 formulas, merged C1:D1, image img1\.png/);
    assert.match(plan, /\[Notes\] sheet "Notes" A1:A1/);
  });
  it('gives the cells of a range as a table, formulas with their values', async () => {
    const cells = await partOf(join(root, 'tanks.xlsx'), root, 'Tanks!A1:B4');

    assert.match(cells, /\| 1 \| Tank \| Volume m3 \|/);
    assert.match(cells, /\| 4 \| Total \| =SUM\(B2:B3\) -> 20 \|/);
    assert.match(await partOf(join(root, 'tanks.xlsx'), root, 'Notes!A1:A1'), /Checked/);
  });
});
describe('PowerPoint, PDF and SVG', () => {
  it('gives the slides in order, title first, with notes and images', async () => {
    const file = write('brief.pptx', makePptx());
    const slide = await partOf(file, root, 's1');

    assert.match(await outlineOf(file, root), /\[s1\] slide "Ballast system".*\n- \[s2\] slide "Questions"/);
    assert.ok(slide.indexOf('# Ballast system') < slide.indexOf('Second line of text'));
    assert.match(slide, /Notes:\n\s*Speak slowly here\./);
    assert.match(slide, /\[image img1\.png\]/);
  });
  it('gives the pages of a PDF, headings marked, and its images as PNG', async () => {
    const file = write('manual.pdf', makePdf());
    const page = await partOf(file, root, 'p1');
    const list = await imagesOf(file, root);
    const folder = /written in (\S+)/.exec(list)?.[1] ?? '';

    assert.match(await outlineOf(file, root), /\[p1\] page "Ballast pumps"[\s\S]*\[p2\] page "Appendix: wiring"/);
    assert.match(page, /## Ballast pumps\n\s*Pump P-1 starts at low level\.\n\s*Pump P-2 is the standby\./);
    assert.match(list, /img1\.png in p2 2x1/);
    assert.equal(
      readFileSync(join(root, folder, 'img1.png'))
        .subarray(1, 4)
        .toString('latin1'),
      'PNG',
    );
  });
  it('gives the tree of an SVG with ids, classes, transforms and texts', async () => {
    const file = write('circuit.svg', SVG);
    const plan = await outlineOf(file, root, 9);

    assert.match(plan, /\[#circuit\] g#circuit\.fuel transform="translate\(10,20\)"/);
    assert.match(plan, /\[#valve-1\] use#valve-1 .*href=#valve-symbol/);
    assert.match(plan, /\[g2\.3\.1\] rect\.pump\.running x=100 y=40/);
    assert.match(await partOf(file, root, 'g2.3'), /text x=105 y=60 "P-101"/);
  });
});
describe('Data, caps and safety', () => {
  it('gives the structure of a big JSON and one key path as a part', async () => {
    const file = write('data.json', JSON.stringify({
      items: Array.from({ length: 500 }, (_, index) => ({
        tag: `PT-${index}`,
        value: index,
      })),
      unit: 'bar',
    }));
    const plan = await outlineOf(file, root);

    assert.match(plan, /\[\$\] object\{2\}/);
    assert.match(plan, /\[\$\.items\] array\[500\]/);
    assert.match(await partOf(file, root, '$.items[1]'), /"tag": "PT-1"/);
  });
  it('gives the levels of a log and its first error', () => {
    const log = readText(
      [
        'INFO start',
        'WARN slow',
        'ERROR pump P-1 failed',
        'INFO stop',
      ].join('\n'),
      'run.log',
    );

    assert.match(log.facts.join(' '), /INFO 2, WARN 1, ERROR 1/);
    assert.match(log.facts.join(' '), /First error at line 3/);
  });
  it('caps the outline and says how to go on', () => {
    const big = readText(
      Array
        .from({ length: 40_000 }, (_, index) => `line ${index}`)
        .join('\n'),
      'big.log',
    );
    const plan = renderOutline(big);

    assert.ok(plan.length <= OUTLINE_MAX_CHARS + 120);
    assert.match(plan, /\[truncated at 8000 characters: lower the depth, or ask one part by its id\]$/);
  });
  it('serves the second call from the cache, without reading the file again', async () => {
    const file = join(root, 'spec.docx');
    const first = await outlineOf(file, root);
    const folders = readdirSync(join(root, '.agents', 'work', 'extract'));

    assert.equal(await outlineOf(file, root), first);
    assert.equal(readdirSync(join(root, '.agents', 'work', 'extract')).length, folders.length);
  });
  it('refuses an encrypted entry, a damaged archive and an unknown format, in one line', async () => {
    const zip = makeZip({ 'word/document.xml': '<w:document/>' });

    zip.writeUInt16LE(1, 6);
    zip.writeUInt16LE(1, zip.indexOf(Buffer.from([
      0x50,
      0x4B,
      0x01,
      0x02,
    ])) + 8);
    assert.throws(() => openZip(zip), /Encrypted entry: word\/document\.xml/);
    await assert.rejects(outlineOf(write('broken.docx', Buffer.from('not a zip')), root), /Cannot read broken\.docx: Not a ZIP archive/);
    await assert.rejects(outlineOf(write('old.doc', 'x'), root), /No reader for "\.doc".*save it in the new format/);
  });
});
describe('the parse server', () => {
  let client: Client;

  before(() => {
    client = startServer(SERVER, {
      PROJECT_ROOT: root,
      BASE_ROOT: join(dirname(SERVER), '..'),
    });
  });
  after(() => {
    client.close();
  });
  it('lists its three tools', async () => {
    const answer = await client.request('tools/list');
    const tools = (answer['result'] as { tools: { name: string }[] }).tools.map((tool) => tool.name);

    assert.deepEqual(tools, [
      'outline',
      'part',
      'images',
    ]);
  });
  it('gives the outline, then a part, of a PDF, with nothing else on its output', async () => {
    const plan = await client.call('outline', { file: 'manual.pdf' });
    const page = await client.call('part', {
      file: 'manual.pdf',
      id: 'p2',
    });

    assert.equal(plan.isError, false);
    assert.match(plan.text, /\[p1\] page "Ballast pumps"/);
    assert.match(page.text, /Appendix: wiring/);
  });
  it('refuses a file outside the project and an unknown part', async () => {
    const outside = await client.call('outline', { file: '../secret.xd' });
    const unknown = await client.call('part', {
      file: 'panel.xd',
      id: 'S9',
    });

    assert.equal(outside.isError, true);
    assert.equal(unknown.isError, true);
    assert.match(unknown.text, /No part "S9" in panel\.xd/);
  });
  it('writes each call in the journal of the project', () => {
    assert.ok(existsSync(join(root, '.agents', 'work', 'mcp-calls.log')));
    assert.match(readFileSync(join(root, '.agents', 'work', 'mcp-calls.log'), 'utf8'), /\tparse\toutline\t/);
  });
});
