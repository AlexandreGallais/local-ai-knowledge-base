// Adobe XD: a ZIP of a manifest and one graphicContent.agc (JSON) per screen. Gives the tree
// screens -> groups -> layers in reading order, with positions relative to the screen, texts, fills,
// components, links between screens, and the images of resources/. The local path of an image in
// the author's machine (pattern.href) is never shown.
import {
  type Box,
  type HeavyDocument,
  type ImageFile,
  imageExtension,
  node,
  oneLine,
  type PartNode,
  readingOrder,
  round,
} from './document.ts';
import {
  at,
  type JsonObject,
  list,
  number,
  object,
  string,
} from './json-access.ts';
import type { Zip } from './zip.ts';

interface Matrix {
  a: number;
  b: number;
  c: number;
  d: number;
  tx: number;
  ty: number;
}

interface Item {
  part: PartNode;
  box?: Box;
}

interface Screen {
  screen: JsonObject;
  root: JsonObject;
  id: string;
  box: Box;
}

interface Context {
  zip: Zip;
  images: ImageFile[];
  byUid: Map<string, ImageFile>;
  screens: Map<string, string>;
}

const IDENTITY: Matrix = {
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  tx: 0,
  ty: 0,
};

function matrixOf(value: unknown): Matrix {
  const source = object(value);

  return {
    a: number(source['a'], 1),
    b: number(source['b']),
    c: number(source['c']),
    d: number(source['d'], 1),
    tx: number(source['tx']),
    ty: number(source['ty']),
  };
}

function multiply(parent: Matrix, child: Matrix): Matrix {
  return {
    a: parent.a * child.a + parent.c * child.b,
    b: parent.b * child.a + parent.d * child.b,
    c: parent.a * child.c + parent.c * child.d,
    d: parent.b * child.c + parent.d * child.d,
    tx: parent.a * child.tx + parent.c * child.ty + parent.tx,
    ty: parent.b * child.tx + parent.d * child.ty + parent.ty,
  };
}

function transformBox(matrix: Matrix, box: Box): Box {
  const corners = [
    [box.x, box.y],
    [box.x + box.w, box.y],
    [box.x, box.y + box.h],
    [box.x + box.w, box.y + box.h],
  ];
  const xs = corners.map(([
    x = 0,
    y = 0,
  ]) => matrix.a * x + matrix.c * y + matrix.tx);
  const ys = corners.map(([
    x = 0,
    y = 0,
  ]) => matrix.b * x + matrix.d * y + matrix.ty);
  const left = Math.min(...xs);
  const top = Math.min(...ys);

  return {
    x: left,
    y: top,
    w: Math.max(...xs) - left,
    h: Math.max(...ys) - top,
  };
}

function union(boxes: Box[]): Box | undefined {
  if (boxes.length === 0) {
    return undefined;
  }
  const left = Math.min(...boxes.map((box) => box.x));
  const top = Math.min(...boxes.map((box) => box.y));

  return {
    x: left,
    y: top,
    w: Math.max(...boxes.map((box) => box.x + box.w)) - left,
    h: Math.max(...boxes.map((box) => box.y + box.h)) - top,
  };
}

function pathBox(path: string): Box | undefined {
  const values = (path.match(/-?\d*\.?\d+(?:e-?\d+)?/gi) ?? []).map(Number);
  const xs = values.filter((_, index) => index % 2 === 0);
  const ys = values.filter((_, index) => index % 2 === 1);

  if (xs.length === 0 || ys.length === 0) {
    return undefined;
  }
  return {
    x: Math.min(...xs),
    y: Math.min(...ys),
    w: Math.max(...xs) - Math.min(...xs),
    h: Math.max(...ys) - Math.min(...ys),
  };
}

function shapeBox(shape: JsonObject): Box | undefined {
  const type = string(shape['type']);

  if (type === 'rect') {
    return {
      x: number(shape['x']),
      y: number(shape['y']),
      w: number(shape['width']),
      h: number(shape['height']),
    };
  }
  if (type === 'circle' || type === 'ellipse') {
    const rx = number(shape['rx'], number(shape['r']));
    const ry = number(shape['ry'], number(shape['r']));

    return {
      x: number(shape['cx']) - rx,
      y: number(shape['cy']) - ry,
      w: 2 * rx,
      h: 2 * ry,
    };
  }
  if (type === 'line') {
    return {
      x: Math.min(number(shape['x1']), number(shape['x2'])),
      y: Math.min(number(shape['y1']), number(shape['y2'])),
      w: Math.abs(number(shape['x2']) - number(shape['x1'])),
      h: Math.abs(number(shape['y2']) - number(shape['y1'])),
    };
  }
  return pathBox(string(shape['path']));
}

function hex(color: unknown): string {
  const value = object(at(color, 'value'));

  if (!('r' in value)) {
    return '';
  }
  return `#${[
    value['r'],
    value['g'],
    value['b'],
  ].map((channel) => round(number(channel)).toString(16)
    .padStart(2, '0'))
    .join('')}`;
}

function place(box: Box | undefined): string {
  return box === undefined ? '' : ` @${round(box.x)},${round(box.y)} ${round(box.w)}x${round(box.h)}`;
}

function image(context: Context, uid: string, id: string, size: string): string {
  const known = context.byUid.get(uid);

  if (known !== undefined) {
    return known.name;
  }
  const path = `resources/${uid}`;

  if (!context.zip.has(path)) {
    return `${uid.slice(0, 8)} (missing)`;
  }
  const bytes = context.zip.bytes(path);
  const file: ImageFile = {
    id: `img${context.images.length + 1}`,
    name: `img${context.images.length + 1}.${imageExtension(bytes)}`,
    place: id,
    detail: size,
    bytes,
  };

  context.images.push(file);
  context.byUid.set(uid, file);
  return file.name;
}

function interactions(context: Context, ux: unknown): string {
  return list(at(ux, 'interactions'))
    .map((interaction) => {
      const destination = string(at(interaction, 'data', 'interaction', 'properties', 'destination'));
      const trigger = string(at(interaction, 'data', 'interaction', 'triggerEvent'));

      return destination === '' ? '' : ` -> ${context.screens.get(destination) ?? destination.slice(0, 8)} (${trigger === '' ? '?' : trigger})`;
    })
    .join('');
}

function shapeItem(context: Context, layer: JsonObject, matrix: Matrix, id: string): {
  kind: string;
  detail: string;
  box?: Box;
} {
  const shape = object(layer['shape']);
  const local = shapeBox(shape);
  const fill = object(at(layer, 'style', 'fill'));
  const box = local === undefined ? undefined : transformBox(matrix, local);

  if (string(fill['type']) === 'pattern') {
    const uid = string(at(fill, 'pattern', 'meta', 'ux', 'uid'));
    const size = `source=${number(at(fill, 'pattern', 'width'))}x${number(at(fill, 'pattern', 'height'))}`;

    return {
      kind: 'image',
      detail: ` image=${uid === '' ? '?' : image(context, uid, id, size)} ${size}`,
      box,
    };
  }
  const color = string(fill['type']) === 'solid' ? hex(fill['color']) : '';

  return {
    kind: string(shape['type']) || 'shape',
    detail: color === '' ? '' : ` fill=${color}`,
    box,
  };
}

function textItem(layer: JsonObject, matrix: Matrix): {
  detail: string;
  box: Box;
} {
  const font = object(at(layer, 'style', 'font'));
  const frame = object(at(layer, 'text', 'frame'));
  const size = number(font['size']);
  const quoted = oneLine(string(at(layer, 'text', 'rawText')));
  const color = hex(at(layer, 'style', 'fill', 'color'));
  const words = [
    '',
    `"${quoted}"`,
    `font=${string(font['family']) || '?'}`,
    string(font['style']),
    `${size}px`,
    color,
  ];

  return {
    detail: words
      .filter((word, index) => index === 0 || word !== '')
      .join(' '),
    box: transformBox(matrix, {
      x: 0,
      y: -size,
      w: number(frame['width']),
      h: number(frame['height'], size),
    }),
  };
}

function groupDetail(ux: unknown): {
  kind: string;
  detail: string;
} {
  const symbol = string(at(ux, 'symbolId'));
  const grid = object(at(ux, 'repeatGrid'));
  const scroll = string(at(ux, 'scrollingType'));
  const states = list(at(ux, 'states')).length;
  const scrollText = scroll === '' ? '' : ` scroll=${scroll}`;
  const statesText = states > 0 ? ` states=${states}` : '';

  if (symbol !== '') {
    return {
      kind: 'component',
      detail: ` component=${symbol.slice(0, 8)}${statesText}${scrollText}`,
    };
  }
  if ('columns' in grid) {
    return {
      kind: 'repeat-grid',
      detail: ` grid=${number(grid['columns'])}x${number(grid['rows'])}${scrollText}`,
    };
  }
  return {
    kind: 'group',
    detail: scrollText,
  };
}

function build(context: Context, value: unknown, parent: Matrix, id: string): Item {
  const layer = object(value);
  const matrix = multiply(parent, matrixOf(layer['transform']));
  const ux = at(layer, 'meta', 'ux');
  const type = string(layer['type']);
  let kind = type;
  let detail = '';
  let box: Box | undefined;
  let children: Item[] = [];

  if (type === 'group') {
    children = list(at(layer, 'group', 'children')).map((child, index) => build(context, child, matrix, `${id}.${index + 1}`));
    box = union(children.flatMap((child) => child.box === undefined ? [] : [child.box]));
    ({
      kind,
      detail,
    } = groupDetail(ux));
  } else if (type === 'text') {
    ({
      detail,
      box,
    } = textItem(layer, matrix));
  } else if (type === 'shape') {
    ({
      kind,
      detail,
      box,
    } = shapeItem(context, layer, matrix, id));
  } else if (type === 'syncRef') {
    kind = 'component-instance';
    detail = ` source=${string(layer['syncSourceGuid']).slice(0, 8)}`;
  }
  detail += interactions(context, ux);
  if (layer['visible'] === false) {
    detail += ' hidden';
  }
  return {
    part: node(id, `${kind} "${oneLine(string(layer['name']), 60)}"${place(box)}${detail}`, [], readingOrder(children).map((child) => child.part)),
    box,
  };
}

function bounds(screen: JsonObject): Box {
  const value = object(screen['uxdesign#bounds']);

  return {
    x: number(value['x']),
    y: number(value['y']),
    w: number(value['width']),
    h: number(value['height']),
  };
}

// Layers of the first level are in document coordinates: they are moved to the screen's corner.
function screenPart(context: Context, entry: Screen): PartNode {
  const origin: Matrix = {
    ...IDENTITY,
    tx: -entry.box.x,
    ty: -entry.box.y,
  };
  const items = list(at(entry.root, 'artboard', 'children')).map((child, index) => build(context, child, origin, `${entry.id}.${index + 1}`));
  const background = hex(at(entry.root, 'style', 'fill', 'color'));
  const backgroundText = background === '' ? '' : ` background=${background}`;
  const line = `screen "${oneLine(string(entry.screen['name']), 60)}" ${round(entry.box.w)}x${round(entry.box.h)}${backgroundText}`;

  return node(entry.id, line, [], readingOrder(items).map((item) => item.part));
}

function readJson(zip: Zip, name: string): JsonObject {
  return object(JSON.parse(zip.text(name)));
}

export function readXd(zip: Zip, fileName: string): HeavyDocument {
  const manifest = readJson(zip, 'manifest');
  const artwork = list(manifest['children']).find((child) => string(at(child, 'name')) === 'artwork');
  const screens = list(at(artwork, 'children'))
    .map((screen) => object(screen))
    .filter((screen) => 'uxdesign#bounds' in screen);
  const context: Context = {
    zip,
    images: [],
    byUid: new Map(),
    screens: new Map(),
  };
  const roots: Screen[] = screens.map((screen, index) => {
    const content = readJson(zip, `artwork/${string(screen['path'])}/graphics/graphicContent.agc`);
    const root = object(list(content['children'])[0]);

    context.screens.set(string(root['id']), string(screen['name']));
    context.screens.set(string(at(root, 'artboard', 'ref')), string(screen['name']));
    return {
      screen,
      root,
      id: `S${index + 1}`,
      box: bounds(screen),
    };
  });
  const parts = readingOrder(roots).map((entry) => screenPart(context, entry));

  return {
    title: `${fileName} (Adobe XD ${string(manifest['uxdesign#version']) || '?'}, ${screens.length} screens)`,
    facts: ['Positions are in pixels, relative to the top-left corner of each screen. Parts are in reading order: top to bottom, then left to right.'],
    parts,
    images: context.images,
  };
}
