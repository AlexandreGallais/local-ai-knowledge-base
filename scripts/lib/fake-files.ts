// Small heavy files built by the tests: a ZIP writer, and XD, Word, Excel, PowerPoint, PDF and SVG
// files with known content. No real data.
import {
  crc32,
  deflateRawSync,
} from 'node:zlib';

// A 1x1 PNG, red.
export const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGP4z8AAAAMBAQDJ/pLvAAAAAElFTkSuQmCC', 'base64');

// The local header and the directory record of one deflated entry.
function zipRecord(name: Buffer, data: Buffer, packed: Buffer, offset: number): {
  local: Buffer;
  central: Buffer;
} {
  const local = Buffer.alloc(30);
  const central = Buffer.alloc(46);

  local.writeUInt32LE(0x04_03_4B_50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(8, 8);
  local.writeUInt32LE(crc32(data), 14);
  local.writeUInt32LE(packed.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(name.length, 26);
  central.writeUInt32LE(0x02_01_4B_50, 0);
  central.writeUInt16LE(20, 4);
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(8, 10);
  central.writeUInt32LE(crc32(data), 16);
  central.writeUInt32LE(packed.length, 20);
  central.writeUInt32LE(data.length, 24);
  central.writeUInt16LE(name.length, 28);
  central.writeUInt32LE(offset, 42);
  return {
    local,
    central,
  };
}

export function makeZip(entries: Record<string, Buffer | string>): Buffer {
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;

  for (const [
    name,
    value,
  ] of Object.entries(entries)) {
    const data = typeof value === 'string' ? Buffer.from(value, 'utf8') : value;
    const packed = deflateRawSync(data);
    const nameBytes = Buffer.from(name, 'utf8');
    const record = zipRecord(nameBytes, data, packed, offset);

    locals.push(record.local, nameBytes, packed);
    centrals.push(record.central, nameBytes);
    offset += record.local.length + nameBytes.length + packed.length;
  }
  const directory = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  const count = Object.keys(entries).length;

  end.writeUInt32LE(0x06_05_4B_50, 0);
  end.writeUInt16LE(count, 8);
  end.writeUInt16LE(count, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([
    ...locals,
    directory,
    end,
  ]);
}

function color(r: number, g: number, b: number): object {
  return {
    mode: 'RGB',
    value: {
      r,
      g,
      b,
    },
  };
}

function text(name: string, words: string, x: number, y: number): object {
  return {
    type: 'text',
    name,
    transform: {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      tx: x,
      ty: y,
    },
    style: {
      font: {
        family: 'Roboto',
        style: 'Regular',
        size: 14,
      },
      fill: {
        type: 'solid',
        color: color(0, 0, 0),
      },
    },
    text: {
      rawText: words,
      frame: { type: 'positioned' },
    },
  };
}

function rect(
  name: string,
  [
    x,
    y,
    width,
    height,
  ]: number[],
  fill: object,
): object {
  return {
    type: 'shape',
    name,
    transform: {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      tx: x,
      ty: y,
    },
    style: { fill },
    shape: {
      type: 'rect',
      x: 0,
      y: 0,
      width,
      height,
    },
  };
}

function group(name: string, x: number, y: number, children: object[]): object {
  return {
    type: 'group',
    name,
    transform: {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      tx: x,
      ty: y,
    },
    group: { children },
  };
}

function xdManifest(): object {
  return {
    'uxdesign#version': '57.0',
    'children': [
      {
        name: 'artwork',
        children: [
          {
            'name': 'Pump panel',
            'path': 'artboard-aaa',
            'uxdesign#bounds': {
              x: 0,
              y: 0,
              width: 1280,
              height: 800,
            },
          },
          {
            'name': 'Alarms',
            'path': 'artboard-bbb',
            'uxdesign#bounds': {
              x: 2000,
              y: 0,
              width: 1280,
              height: 800,
            },
          },
        ],
      },
    ],
  };
}

// A button that links to the second screen.
function alarmButton(): object {
  return {
    ...group('Open alarms', 40, 700, [
      rect(
        'Button background',
        [
          0,
          0,
          200,
          48,
        ],
        {
          type: 'solid',
          color: color(0x15, 0x6F, 0xB2),
        },
      ),
      text('Label', 'Show alarms', 20, 30),
    ]),
    meta: {
      ux: {
        interactions: [
          {
            data: {
              interaction: {
                triggerEvent: 'tap',
                properties: { destination: 'board-2' },
              },
            },
          },
        ],
      },
    },
  };
}

// The first screen: a header with a group inside a group, an image, and the button.
function panelBoard(): object {
  return {
    children: [
      {
        type: 'artboard',
        id: 'board-1',
        style: {
          fill: {
            type: 'solid',
            color: color(255, 255, 255),
          },
        },
        artboard: {
          children: [
            alarmButton(),
            header(),
            pumpPicture(),
          ],
        },
      },
    ],
  };
}

function header(): object {
  const lamp = rect(
    'Lamp',
    [
      0,
      0,
      24,
      24,
    ],
    {
      type: 'solid',
      color: color(0, 200, 0),
    },
  );

  return group('Header', 0, 0, [
    text('Title', 'Fuel transfer pump P-101', 24, 40),
    group('Status', 900, 10, [
      lamp,
      text('Status text', 'Running', 32, 18),
    ]),
  ]);
}

// An image whose href is a path of the author's machine, which must never be shown.
function pumpPicture(): object {
  return rect(
    'Pump picture',
    [
      400,
      200,
      320,
      240,
    ],
    {
      type: 'pattern',
      pattern: {
        width: 640,
        height: 480,
        href: '/Users/someone/Desktop/pump.png',
        meta: { ux: { uid: 'f00dcafe' } },
      },
    },
  );
}

// Two screens side by side in the document; the second is placed at x = 2000, so its title at
// x = 2024 in the document is at x = 24 on its screen.
export function makeXd(): Buffer {
  const second = {
    children: [
      {
        type: 'artboard',
        id: 'board-2',
        artboard: { children: [text('Title', 'Alarm list', 2024, 40)] },
      },
    ],
  };

  return makeZip({
    'mimetype': 'application/vnd.adobe.sparkler.project+dcxucf',
    'manifest': JSON.stringify(xdManifest()),
    'artwork/artboard-aaa/graphics/graphicContent.agc': JSON.stringify(panelBoard()),
    'artwork/artboard-bbb/graphics/graphicContent.agc': JSON.stringify(second),
    'resources/f00dcafe': PNG,
  });
}

// The readers keep only the last segment of a relationship type: the namespace is left out here.
const RELS = 'schemas.openxmlformats.org/officeDocument/2006/relationships';

function rels(items: [string, string, string][]): string {
  return `<?xml version="1.0"?><Relationships>${items.map(([id, type, target]) => `<Relationship Id="${id}" Type="${RELS}/${type}" Target="${target}"/>`).join('')}</Relationships>`;
}

function paragraph(words: string, style = ''): string {
  const properties = style === '' ? '' : `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>`;

  return `<w:p>${properties}<w:r><w:t xml:space="preserve">${words}</w:t></w:r></w:p>`;
}

export function makeDocx(): Buffer {
  const listItem = '<w:p><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>Check the suction valve</w:t></w:r></w:p>';
  const picture = '<w:p><w:r><w:drawing><wp:inline><a:graphic><a:graphicData><pic:pic><pic:blipFill><a:blip r:embed="rId5"/></pic:blipFill></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>';
  const table = '<w:tbl><w:tr><w:tc><w:p><w:r><w:t>Tag</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t>Range</w:t></w:r></w:p></w:tc></w:tr><w:tr><w:tc><w:p><w:r><w:t>PT-101</w:t></w:r></w:p></w:tc><w:tc><w:p><w:r><w:t>0-10 bar</w:t></w:r></w:p></w:tc></w:tr></w:tbl>';
  const body = [
    paragraph('Draft for review'),
    paragraph('Fuel system', 'Heading1'),
    paragraph('The fuel system feeds the engines.'),
    paragraph('Pumps', 'Heading2'),
    listItem,
    picture,
    table,
    paragraph('Valves', 'Heading2'),
    paragraph('Valves isolate each tank &amp; pipe.'),
    paragraph('Electrical system', 'Heading1'),
    paragraph('Two generators.'),
  ].join('');
  const document = `<?xml version="1.0"?><w:document xmlns:w="w" xmlns:r="r" xmlns:a="a" xmlns:wp="wp" xmlns:pic="pic"><w:body>${body}</w:body></w:document>`;
  const comments = '<w:comments xmlns:w="w"><w:comment w:id="0" w:author="Reviewer"><w:p><w:r><w:t>Add the pressure range.</w:t></w:r></w:p></w:comment></w:comments>';

  return makeZip({
    '[Content_Types].xml': '<Types/>',
    'word/document.xml': document,
    'word/_rels/document.xml.rels': rels([['rId5', 'image', 'media/image1.png']]),
    'word/media/image1.png': PNG,
    'word/comments.xml': comments,
  });
}

export function makeXlsx(): Buffer {
  const workbook = '<workbook xmlns:r="r"><sheets><sheet name="Tanks" sheetId="1" r:id="rId1"/><sheet name="Notes" sheetId="2" r:id="rId2"/></sheets></workbook>';
  const shared = '<sst><si><t>Tank</t></si><si><t>Volume m3</t></si><si><t>T-1</t></si><si><t>T-2</t></si><si><t>Total</t></si></sst>';
  const tanks = [
    '<worksheet xmlns:r="r"><dimension ref="A1:B4"/><sheetData>',
    '<row r="1"><c r="A1" t="s"><v>0</v></c><c r="B1" t="s"><v>1</v></c></row>',
    '<row r="2"><c r="A2" t="s"><v>2</v></c><c r="B2"><v>12.5</v></c></row>',
    '<row r="3"><c r="A3" t="s"><v>3</v></c><c r="B3"><v>7.5</v></c></row>',
    '<row r="4"><c r="A4" t="s"><v>4</v></c><c r="B4"><f>SUM(B2:B3)</f><v>20</v></c></row>',
    '</sheetData><mergeCells count="1"><mergeCell ref="C1:D1"/></mergeCells><drawing r:id="rId1"/></worksheet>',
  ].join('');
  const notes = '<worksheet><sheetData><row r="1"><c r="A1" t="inlineStr"><is><t>Checked</t></is></c></row></sheetData></worksheet>';
  const drawing = '<xdr:wsDr xmlns:xdr="xdr" xmlns:a="a" xmlns:r="r"><xdr:twoCellAnchor><xdr:pic><xdr:blipFill><a:blip r:embed="rId1"/></xdr:blipFill></xdr:pic></xdr:twoCellAnchor></xdr:wsDr>';

  return makeZip({
    'xl/workbook.xml': workbook,
    'xl/_rels/workbook.xml.rels': rels([
      ['rId1', 'worksheet', 'worksheets/sheet1.xml'],
      ['rId2', 'worksheet', 'worksheets/sheet2.xml'],
    ]),
    'xl/sharedStrings.xml': shared,
    'xl/worksheets/sheet1.xml': tanks,
    'xl/worksheets/sheet2.xml': notes,
    'xl/worksheets/_rels/sheet1.xml.rels': rels([['rId1', 'drawing', '../drawings/drawing1.xml']]),
    'xl/drawings/drawing1.xml': drawing,
    'xl/drawings/_rels/drawing1.xml.rels': rels([['rId1', 'image', '../media/image1.png']]),
    'xl/media/image1.png': PNG,
  });
}

function shape(words: string, x: number, y: number, kind = ''): string {
  const placeholder = kind === '' ? '' : `<p:nvSpPr><p:nvPr><p:ph type="${kind}"/></p:nvPr></p:nvSpPr>`;

  return `<p:sp>${placeholder}<p:spPr><a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="4000000" cy="500000"/></a:xfrm></p:spPr><p:txBody><a:p><a:r><a:t>${words}</a:t></a:r></a:p></p:txBody></p:sp>`;
}

export function makePptx(): Buffer {
  const presentation = '<p:presentation xmlns:p="p" xmlns:r="r"><p:sldIdLst><p:sldId id="256" r:id="rId2"/><p:sldId id="257" r:id="rId3"/></p:sldIdLst></p:presentation>';
  const first = `<p:sld xmlns:p="p" xmlns:a="a" xmlns:r="r"><p:cSld><p:spTree>${shape('Second line of text', 500_000, 3_000_000)}${shape('Ballast system', 500_000, 300_000, 'title')}<p:pic><p:blipFill><a:blip r:embed="rId2"/></p:blipFill></p:pic></p:spTree></p:cSld></p:sld>`;
  const second = `<p:sld xmlns:p="p" xmlns:a="a"><p:cSld><p:spTree>${shape('Questions', 500_000, 300_000, 'title')}</p:spTree></p:cSld></p:sld>`;
  const notes = `<p:notes xmlns:p="p" xmlns:a="a"><p:cSld><p:spTree>${shape('Speak slowly here.', 0, 0, 'body')}</p:spTree></p:cSld></p:notes>`;

  return makeZip({
    'ppt/presentation.xml': presentation,
    'ppt/_rels/presentation.xml.rels': rels([
      ['rId2', 'slide', 'slides/slide1.xml'],
      ['rId3', 'slide', 'slides/slide2.xml'],
    ]),
    'ppt/slides/slide1.xml': first,
    'ppt/slides/slide2.xml': second,
    'ppt/slides/_rels/slide1.xml.rels': rels([
      ['rId1', 'notesSlide', '../notesSlides/notesSlide1.xml'],
      ['rId2', 'image', '../media/image1.png'],
    ]),
    'ppt/notesSlides/notesSlide1.xml': notes,
    'ppt/media/image1.png': PNG,
  });
}

function pdfObjects(objects: string[]): Buffer {
  const parts = ['%PDF-1.4\n'];
  const offsets: number[] = [];

  for (const [
    index,
    body,
  ] of objects.entries()) {
    offsets.push(Buffer.byteLength(parts.join(''), 'latin1'));
    parts.push(`${index + 1} 0 obj\n${body}\nendobj\n`);
  }
  const start = Buffer.byteLength(parts.join(''), 'latin1');
  const table = offsets
    .map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`)
    .join('');

  parts.push(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${table}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF\n`);
  return Buffer.from(parts.join(''), 'latin1');
}

function stream(content: string, dictionary = ''): string {
  return `<< /Length ${Buffer.byteLength(content, 'latin1')} ${dictionary}>>\nstream\n${content}\nendstream`;
}

// Two pages: a big title and two lines, then one line and a 2x1 RGB image.
export function makePdf(): Buffer {
  const pageOne = 'BT /F1 24 Tf 40 760 Td (Ballast pumps) Tj ET BT /F1 12 Tf 40 720 Td (Pump P-1 starts at low level.) Tj ET BT /F1 12 Tf 40 700 Td (Pump P-2 is the standby.) Tj ET';
  const pageTwo = 'BT /F1 12 Tf 40 760 Td (Appendix: wiring) Tj ET q 100 0 0 50 40 600 cm /Im1 Do Q';
  const pixels = String.fromCodePoint(255, 0, 0, 0, 0, 255);

  return pdfObjects([
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R 4 0 R] /Count 2 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 7 0 R >> >> >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 6 0 R /Resources << /Font << /F1 7 0 R >> /XObject << /Im1 8 0 R >> >> >>',
    stream(pageOne),
    stream(pageTwo),
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    stream(pixels, '/Type /XObject /Subtype /Image /Width 2 /Height 1 /ColorSpace /DeviceRGB /BitsPerComponent 8 '),
  ]);
}

export const SVG = [
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 200" width="400" height="200">',
  '<defs><symbol id="valve-symbol" viewBox="0 0 20 20"><path d="M0 0 L20 20 L20 0 L0 20 Z"/></symbol></defs>',
  '<g id="circuit" class="fuel" transform="translate(10,20)">',
  '<use id="valve-1" href="#valve-symbol" x="40" y="40" width="20" height="20"/>',
  '<text x="40" y="80">V-101</text>',
  '<g><rect x="100" y="40" width="60" height="30" class="pump running"/><text x="105" y="60">P-101</text></g>',
  '</g>',
  '</svg>',
].join('\n');
