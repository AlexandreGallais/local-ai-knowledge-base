// Builds small fake files for the tests of extract.ts and for trials of the read-heavy-file skill.
// Every content is invented for the tests: no real data. Run with Node 22.18 or later:
//   node scripts/fixtures.ts <folder>     writes one sample file per format into <folder>
import {
  mkdirSync,
  realpathSync,
  writeFileSync,
} from 'node:fs';
import {
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  crc32,
  deflateRawSync,
} from 'node:zlib';

export interface ZipOptions {
  encrypted?: boolean;
}

interface ZipFields {
  flags: number;
  data: Buffer;
  compressed: Buffer;
  name: Buffer;
}

const UTF8_NAMES = 0x8_00;
const DOS_DATE = 0x21;
const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
const W = 'xmlns:w="urn:test:wordprocessingml"';
const RELS = 'xmlns="urn:test:relationships"';
const TYPE = 'urn:test:officeDocument/relationships';
const ODF = 'xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"';
const PNG_HEADER = Buffer.from([
  0x89,
  0x50,
  0x4E,
  0x47,
  0x0D,
  0x0A,
  0x1A,
  0x0A,
]);

// Writes the fields that the local header and the central directory share, from `at` on:
// version needed, flags, method (8, deflate), time, date, CRC, both sizes, name length.
function writeCommon(header: Buffer, at: number, entry: ZipFields): void {
  header.writeUInt16LE(20, at);
  header.writeUInt16LE(entry.flags, at + 2);
  header.writeUInt16LE(8, at + 4);
  header.writeUInt16LE(DOS_DATE, at + 8);
  header.writeUInt32LE(crc32(entry.data), at + 10);
  header.writeUInt32LE(entry.compressed.length, at + 14);
  header.writeUInt32LE(entry.data.length, at + 18);
  header.writeUInt16LE(entry.name.length, at + 22);
}

export function zip(files: Record<string, string | Buffer>, options: ZipOptions = {}): Buffer {
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  const flags = UTF8_NAMES | (options.encrypted === true ? 1 : 0);
  let offset = 0;

  for (const [
    name,
    content,
  ] of Object.entries(files)) {
    const data = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf8');
    const entry: ZipFields = {
      flags,
      data,
      compressed: deflateRawSync(data),
      name: Buffer.from(name, 'utf8'),
    };
    const local = Buffer.alloc(30);
    const central = Buffer.alloc(46);

    local.writeUInt32LE(0x04_03_4B_50, 0);
    writeCommon(local, 4, entry);
    central.writeUInt32LE(0x02_01_4B_50, 0);
    central.writeUInt16LE(20, 4);
    writeCommon(central, 6, entry);
    central.writeUInt32LE(offset, 42);
    locals.push(local, entry.name, entry.compressed);
    centrals.push(central, entry.name);
    offset += local.length + entry.name.length + entry.compressed.length;
  }
  const directory = Buffer.concat(centrals);

  return Buffer.concat([
    ...locals,
    directory,
    endRecord(Object.keys(files).length, directory.length, offset),
  ]);
}

function endRecord(count: number, directorySize: number, directoryOffset: number): Buffer {
  const end = Buffer.alloc(22);

  end.writeUInt32LE(0x06_05_4B_50, 0);
  end.writeUInt16LE(count, 8);
  end.writeUInt16LE(count, 10);
  end.writeUInt32LE(directorySize, 12);
  end.writeUInt32LE(directoryOffset, 16);
  return end;
}

function relationships(items: [string, string, string][]): string {
  const lines = items.map(([
    id,
    type,
    target,
  ]) => `<Relationship Id="${id}" Type="${TYPE}/${type}" Target="${target}"/>`);

  return `${XML}<Relationships ${RELS}>${lines.join('')}</Relationships>`;
}

function wordParagraph(text: string, style = ''): string {
  const properties = style === '' ? '' : `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>`;

  return `<w:p>${properties}<w:r><w:t xml:space="preserve">${text}</w:t></w:r></w:p>`;
}

function wordCell(text: string): string {
  return `<w:tc><w:tcPr/>${wordParagraph(text)}</w:tc>`;
}

export function docxFile(extraParagraphs: string[] = []): Buffer {
  const body = [
    wordParagraph('Pump room', 'Heading1'),
    '<w:p><w:r><w:t xml:space="preserve">The valve </w:t></w:r><w:r><w:t>opens &amp; closes.</w:t></w:r></w:p>',
    `<w:tbl><w:tblPr/><w:tr>${wordCell('Tag')}${wordCell('State')}</w:tr><w:tr>${wordCell('V-101')}${wordCell('Open')}</w:tr></w:tbl>`,
    ...extraParagraphs.map((text) => wordParagraph(text)),
  ].join('');

  return zip({
    '[Content_Types].xml': `${XML}<Types/>`,
    'word/document.xml': `${XML}<w:document ${W}><w:body>${body}</w:body></w:document>`,
    'word/comments.xml': `${XML}<w:comments ${W}><w:comment w:id="0" w:author="Reviewer">${wordParagraph('Check the tag.')}</w:comment></w:comments>`,
    'word/media/image1.png': PNG_HEADER,
  });
}

function sheetRow(index: number, cells: string[]): string {
  return `<row r="${index}">${cells.join('')}</row>`;
}

function pumpSheet(extraRows: number): string {
  const extra = Array.from({ length: extraRows }, (_, index) => {
    return sheetRow(index + 4, [`<c r="B${index + 4}"><v>${index + 10}</v></c>`]);
  });

  return [
    `${XML}<worksheet><dimension ref="A1:C${3 + extra.length}"/><sheetData>`,
    sheetRow(1, [
      '<c r="A1" t="s"><v>0</v></c>',
      '<c r="B1" t="s"><v>1</v></c>',
      '<c r="C1" t="inlineStr"><is><t>Double</t></is></c>',
    ]),
    sheetRow(2, [
      '<c r="A2" t="s"><v>2</v></c>',
      '<c r="B2"><v>3</v></c>',
      '<c r="C2"><f>B2*2</f><v>6</v></c>',
    ]),
    sheetRow(3, [
      '<c r="A3" t="s"><v>3</v></c>',
      '<c r="B3"><v>4.5</v></c>',
      '<c r="C3"><f>B3*2</f><v>9</v></c>',
    ]),
    ...extra,
    '</sheetData><mergeCells count="1"><mergeCell ref="D1:E1"/></mergeCells></worksheet>',
  ].join('');
}

export function xlsxFile(options: {
  macros?: boolean;
  extraRows?: number;
} = {}): Buffer {
  const files: Record<string, string | Buffer> = {
    '[Content_Types].xml': `${XML}<Types/>`,
    'xl/workbook.xml': `${XML}<workbook><sheets><sheet name="Pumps" sheetId="1" r:id="rId1"/><sheet name="Notes" sheetId="2" state="hidden" r:id="rId2"/></sheets><definedNames><definedName name="PumpTags">Pumps!$A$2:$A$3</definedName></definedNames></workbook>`,
    'xl/_rels/workbook.xml.rels': relationships([
      ['rId1', 'worksheet', 'worksheets/sheet1.xml'],
      ['rId2', 'worksheet', 'worksheets/sheet2.xml'],
      ['rId3', 'sharedStrings', 'sharedStrings.xml'],
    ]),
    'xl/sharedStrings.xml': `${XML}<sst><si><t>Tag</t></si><si><t>Flow</t></si><si><t>Pump P-1</t></si><si><r><t xml:space="preserve">Pump </t></r><r><t>P-2</t></r></si></sst>`,
    'xl/worksheets/sheet1.xml': pumpSheet(options.extraRows ?? 0),
    'xl/worksheets/_rels/sheet1.xml.rels': relationships([['rId1', 'comments', '../comments1.xml']]),
    'xl/comments1.xml': `${XML}<comments><authors><author>Tester</author></authors><commentList><comment ref="B2" authorId="0"><text><r><t>Measured in m3/h.</t></r></text></comment></commentList></comments>`,
    'xl/worksheets/sheet2.xml': `${XML}<worksheet><sheetData>${sheetRow(1, ['<c r="A1" t="inlineStr"><is><t>Hidden note</t></is></c>'])}</sheetData></worksheet>`,
  };

  if (options.macros === true) {
    files['xl/vbaProject.bin'] = Buffer.from('fake macro storage');
  }
  return zip(files);
}

function slide(texts: string[]): string {
  const body = texts
    .map((text) => `<a:p><a:r><a:t>${text}</a:t></a:r></a:p>`)
    .join('');

  return `${XML}<p:sld><p:cSld><p:spTree><p:sp><p:txBody>${body}</p:txBody></p:sp></p:spTree></p:cSld></p:sld>`;
}

export function pptxFile(): Buffer {
  return zip({
    '[Content_Types].xml': `${XML}<Types/>`,
    'ppt/presentation.xml': `${XML}<p:presentation><p:sldIdLst><p:sldId id="256" r:id="rId2"/><p:sldId id="257" r:id="rId1"/></p:sldIdLst></p:presentation>`,
    'ppt/_rels/presentation.xml.rels': relationships([
      ['rId1', 'slide', 'slides/slide1.xml'],
      ['rId2', 'slide', 'slides/slide2.xml'],
    ]),
    'ppt/slides/slide1.xml': slide([
      'Second slide',
      'Pressure trend',
    ]),
    'ppt/slides/slide2.xml': slide([
      'Title slide',
      'Cooling system review',
    ]),
    'ppt/slides/_rels/slide2.xml.rels': relationships([['rId1', 'notesSlide', '../notesSlides/notesSlide1.xml']]),
    'ppt/notesSlides/notesSlide1.xml': `${XML}<p:notes><p:cSld><p:spTree><p:sp><p:txBody><a:p><a:r><a:t>Speak about the pumps.</a:t></a:r></a:p><a:p><a:fld type="slidenum"><a:t>1</a:t></a:fld></a:p></p:txBody></p:sp></p:spTree></p:cSld></p:notes>`,
  });
}

function odfFile(mimetype: string, body: string): Buffer {
  return zip({
    'mimetype': mimetype,
    'content.xml': `${XML}<office:document-content ${ODF}><office:body>${body}</office:body></office:document-content>`,
    'Pictures/photo.png': PNG_HEADER,
  });
}

export function odtFile(): Buffer {
  return odfFile('application/vnd.oasis.opendocument.text', [
    '<office:text>',
    '<text:h text:outline-level="1">Maintenance</text:h>',
    '<text:p>Close the <text:span>suction</text:span><text:s text:c="2"/>valve first.</text:p>',
    '<table:table table:name="Table1"><table:table-row><table:table-cell><text:p>Step</text:p></table:table-cell><table:table-cell><text:p>Action</text:p></table:table-cell></table:table-row>',
    '<table:table-row><table:table-cell><text:p>1</text:p></table:table-cell><table:table-cell><text:p>Stop the pump</text:p></table:table-cell></table:table-row></table:table>',
    '<text:p>End of procedure.</text:p>',
    '</office:text>',
  ].join(''));
}

export function odsFile(): Buffer {
  return odfFile('application/vnd.oasis.opendocument.spreadsheet', [
    '<office:spreadsheet><table:table table:name="Tanks">',
    '<table:table-row><table:table-cell office:value-type="string"><text:p>Tank</text:p></table:table-cell><table:table-cell office:value-type="string"><text:p>Level</text:p></table:table-cell></table:table-row>',
    '<table:table-row><table:table-cell office:value-type="string"><text:p>T-1</text:p></table:table-cell><table:table-cell table:formula="of:=[.C2]*2" office:value-type="float" office:value="80"><text:p>80</text:p></table:table-cell><table:table-cell table:number-columns-repeated="3"/></table:table-row>',
    '<table:table-row table:number-rows-repeated="1048570"><table:table-cell table:number-columns-repeated="1024"/></table:table-row>',
    '</table:table></office:spreadsheet>',
  ].join(''));
}

export function odpFile(): Buffer {
  return odfFile('application/vnd.oasis.opendocument.presentation', [
    '<office:presentation>',
    '<draw:page draw:name="Intro"><draw:frame><draw:text-box><text:p>Ballast system</text:p></draw:text-box></draw:frame>',
    '<presentation:notes><draw:frame><draw:text-box><text:p>Mention the vents.</text:p></draw:text-box></draw:frame></presentation:notes></draw:page>',
    '</office:presentation>',
  ].join(''));
}

export function pdfFile(): Buffer {
  const stream = 'BT /F1 18 Tf 72 760 Td (Pump room maintenance plan) Tj 0 -28 Td (Check valve V-101 every week.) Tj ET';
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ];
  let text = '%PDF-1.4\n';
  const offsets: number[] = [];

  for (const [
    index,
    object,
  ] of objects.entries()) {
    offsets.push(text.length);
    text += `${index + 1} 0 obj\n${object}\nendobj\n`;
  }
  const table = offsets
    .map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`)
    .join('');

  text += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${table}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${text.length}\n%%EOF\n`;
  return Buffer.from(text, 'latin1');
}

export function oleFile(): Buffer {
  return Buffer.concat([
    Buffer.from('d0cf11e0a1b11ae1', 'hex'),
    Buffer.alloc(504),
  ]);
}

function json(value: unknown): string {
  return JSON.stringify(value);
}

// The layout of an Adobe XD file is not published: this one follows the layout seen in public
// examples (manifest, one graphicContent.agc per artboard, texts under "rawText").
function xdText(rawText: string): unknown {
  return {
    type: 'text',
    name: rawText,
    text: { rawText },
  };
}

function xdArtboard(children: unknown[]): string {
  return json({
    version: '1.5.0',
    children: [
      {
        type: 'artboard',
        artboard: { children },
      },
    ],
  });
}

const XD_MANIFEST = {
  name: 'Pump panel',
  children: [
    {
      path: 'artwork',
      children: [
        {
          path: 'artboard-1111',
          name: 'Home screen',
        },
        {
          path: 'artboard-2222',
          name: 'Alarm list',
        },
      ],
    },
  ],
};

export function xdFile(): Buffer {
  const text = xdText;
  const artboard = xdArtboard;

  return zip({
    'mimetype': 'application/vnd.adobe.sparkler.project+dcx',
    'manifest': json(XD_MANIFEST),
    'artwork/artboard-1111/graphics/graphicContent.agc': artboard([
      text('Start pump'),
      {
        type: 'shape',
        name: 'Rectangle 1',
      },
      text('Stop pump'),
    ]),
    'artwork/artboard-2222/graphics/graphicContent.agc': artboard([text('High pressure alarm')]),
    'preview.png': PNG_HEADER,
  });
}

export function sketchFile(): Buffer {
  return zip({
    'document.json': json({ _class: 'document' }),
    'pages/page-1.json': json({
      _class: 'page',
      name: 'Screens',
      layers: [
        {
          _class: 'artboard',
          name: 'Tank view',
          layers: [
            {
              _class: 'text',
              name: 'Label',
              attributedString: { string: 'Tank level' },
            },
          ],
        },
      ],
    }),
  });
}

export function vsdxFile(): Buffer {
  return zip({
    'visio/pages/pages.xml': `${XML}<Pages><Page ID="0" NameU="Page-1" Name="Cooling loop"><Rel r:id="rId1"/></Page></Pages>`,
    'visio/pages/_rels/pages.xml.rels': relationships([['rId1', 'page', 'page1.xml']]),
    'visio/pages/page1.xml': `${XML}<PageContents><Shapes><Shape ID="1"><Text>Heat <cp IX="0"/>exchanger</Text></Shape><Shape ID="2"><Text>Sea water pump</Text></Shape></Shapes></PageContents>`,
  });
}

const DIAGRAM = [
  '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/>',
  '<mxCell id="2" value="Pump" vertex="1" parent="1"><mxGeometry/></mxCell>',
  '<mxCell id="3" value="&lt;b&gt;Tank&lt;/b&gt;" vertex="1" parent="1"/>',
  '<UserObject label="Valve V-1" id="5"><mxCell vertex="1" parent="1"/></UserObject>',
  '<mxCell id="4" value="fills" edge="1" source="2" target="3" parent="1"/>',
  '</root></mxGraphModel>',
].join('');

export function drawioFile(compressed = true): Buffer {
  const body = compressed ? deflateRawSync(Buffer.from(encodeURIComponent(DIAGRAM), 'utf8')).toString('base64') : DIAGRAM;

  return Buffer.from(`<mxfile host="test"><diagram name="Circuit" id="d1">${body}</diagram></mxfile>`, 'utf8');
}

export const NOTEBOOK_IMAGE = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk';

export function ipynbFile(): Buffer {
  return Buffer.from(json({
    metadata: { kernelspec: { language: 'python' } },
    cells: [
      {
        cell_type: 'markdown',
        source: [
          '# Flow study\n',
          'Flow against valve opening.',
        ],
      },
      {
        cell_type: 'code',
        source: [
          'flow = kv * opening\n',
          'print(flow)',
        ],
        outputs: [
          {
            output_type: 'display_data',
            data: { 'image/png': NOTEBOOK_IMAGE },
          },
          {
            output_type: 'stream',
            text: ['42'],
          },
        ],
      },
    ],
    nbformat: 4,
  }), 'utf8');
}

export function jsonFile(): Buffer {
  return Buffer.from(json({
    project: 'demo',
    sensors: Array.from({ length: 500 }, (_, index) => {
      return {
        tag: `PT-${index}`,
        value: index / 10,
        healthy: true,
      };
    }),
  }), 'utf8');
}

export function nupkgFile(): Buffer {
  return zip({
    'Demo.Valves.nuspec': `${XML}<package><metadata><id>Demo.Valves</id><version>1.2.0</version></metadata></package>`,
    'lib/net8.0/Demo.Valves.dll': Buffer.from('MZ fake binary'),
    '../escape.txt': 'unsafe entry name',
  });
}

export const SAMPLES: Record<string, () => Buffer> = {
  'notes.docx': () => docxFile(),
  'budget.xlsx': () => xlsxFile(),
  'slides.pptx': pptxFile,
  'report.odt': odtFile,
  'tanks.ods': odsFile,
  'spec.pdf': pdfFile,
  'mockup.xd': xdFile,
  'circuit.drawio': () => drawioFile(),
  'study.ipynb': ipynbFile,
  'sensors.json': jsonFile,
};

function main(folder: string): void {
  mkdirSync(folder, { recursive: true });
  for (const [
    name,
    build,
  ] of Object.entries(SAMPLES)) {
    writeFileSync(join(folder, name), build());
  }
  console.log(`Wrote ${Object.keys(SAMPLES).length} sample files to ${folder}.`);
}

if (process.argv[1] !== undefined && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  main(resolve(process.argv[2] ?? 'samples'));
}
