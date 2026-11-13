// SVG: the tree of elements with their id, classes, transform, place and text. An element with an
// id is a part named "#id"; the others are named by their path from the root: g2.1.
import type {
  HeavyDocument,
  PartNode,
} from './document.ts';
import {
  node,
  oneLine,
} from './document.ts';
import {
  parseXml,
  textOf,
  type XmlNode,
} from './xml.ts';

const SHOWN = [
  'x',
  'y',
  'cx',
  'cy',
  'r',
  'width',
  'height',
  'viewBox',
  'href',
  'xlink:href',
];
const SKIPPED = new Set([
  'title',
  'desc',
  'metadata',
  'style',
  'script',
]);

function describe(element: XmlNode): string {
  const id = element.attributes['id'];
  const className = element.attributes['class'];
  const transform = element.attributes['transform'];
  const values = SHOWN
    .filter((name) => element.attributes[name] !== undefined)
    .map((name) => `${name}=${element.attributes[name] ?? ''}`);
  const words = element.name === 'text' || element.name === 'tspan' ? ` "${oneLine(textOf(element), 80)}"` : '';
  const path = element.name === 'path' ? ` d=${(element.attributes['d'] ?? '').length} chars` : '';

  return [
    element.name,
    id === undefined ? '' : `#${id}`,
    className === undefined ? '' : `.${className.trim().split(/\s+/).join('.')}`,
    transform === undefined ? '' : ` transform="${transform}"`,
    values.length === 0 ? '' : ` ${values.join(' ')}`,
    words,
    path,
  ].join('');
}

function build(element: XmlNode, path: string): PartNode {
  const id = element.attributes['id'];
  const children = element.children
    .filter((child) => !SKIPPED.has(child.name) && child.name !== 'tspan')
    .map((child, index) => build(child, `${path}.${index + 1}`));

  return node(id === undefined ? path : `#${id}`, describe(element), [], children);
}

export function readSvg(source: string, fileName: string): HeavyDocument {
  const root = parseXml(source);
  const title = root.children.find((child) => child.name === 'title');
  const parts = root.children
    .filter((child) => !SKIPPED.has(child.name))
    .map((child, index) => build(child, `g${index + 1}`));
  const viewBox = root.attributes['viewBox'];

  return {
    title: viewBox === undefined ? `${fileName} (SVG)` : `${fileName} (SVG viewBox ${viewBox})`,
    facts: [
      ...title === undefined ? [] : [`Title: ${oneLine(textOf(title))}`],
      'A part with an id is asked as "#id"; the others by their path, as "g2.1". Coordinates are in user units, before the transforms of the parents.',
    ],
    parts,
    images: [],
  };
}
