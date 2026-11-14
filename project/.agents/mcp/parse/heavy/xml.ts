// A small XML reader for Office Open XML and SVG: elements, attributes and text, no DTD, no
// entity beyond the five of XML and the numeric ones. No package.
export interface XmlNode {
  name: string;
  attributes: Record<string, string>;
  children: XmlNode[];
  text: string;
}

const TOKEN = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!\[CDATA\[([\s\S]*?)\]\]>|<!DOCTYPE[^>]*>|<(\/?)([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>|([^<]+)/g;
const ATTRIBUTE = /([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: '\'',
};

export function decodeEntities(text: string): string {
  return text.replaceAll(/&(#x[\da-f]+|#\d+|\w+);/gi, (whole, code: string) => {
    if (code.startsWith('#x') || code.startsWith('#X')) {
      return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
    }
    if (code.startsWith('#')) {
      return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
    }
    return ENTITIES[code] ?? whole;
  });
}

function attributesOf(text: string): Record<string, string> {
  return Object.fromEntries([...text.matchAll(ATTRIBUTE)].map((match) => [
    match[1] ?? '',
    decodeEntities(match[2] ?? match[3] ?? ''),
  ]));
}

function element(name: string, attributes: Record<string, string>): XmlNode {
  return {
    name,
    attributes,
    children: [],
    text: '',
  };
}

// The root element of a document. Unclosed elements are closed at the end; text is kept as is.
export function parseXml(source: string): XmlNode {
  const root = element('#document', {});
  const stack: XmlNode[] = [root];

  for (const match of source.matchAll(TOKEN)) {
    const top = stack.at(-1) ?? root;

    if (match[1] !== undefined) {
      top.text += match[1];
    } else if (match[6] !== undefined) {
      top.text += decodeEntities(match[6]);
    } else if (match[3] !== undefined && match[2] === '/') {
      stack.length = Math.max(1, stack.findLastIndex((node) => node.name === match[3]));
    } else if (match[3] !== undefined) {
      const node = element(match[3], attributesOf(match[4] ?? ''));

      top.children.push(node);
      if (match[5] !== '/') {
        stack.push(node);
      }
    }
  }
  return root.children[0] ?? root;
}

// Every element of a name below a node, in document order.
export function findAll(node: XmlNode, name: string): XmlNode[] {
  return node.children.flatMap((child) => [
    ...child.name === name ? [child] : [],
    ...findAll(child, name),
  ]);
}

export function find(node: XmlNode, name: string): XmlNode | undefined {
  return findAll(node, name)[0];
}

// The text of a node and of all its descendants.
export function textOf(node: XmlNode): string {
  return node.text + node.children
    .map((child) => textOf(child))
    .join('');
}

// The text of the descendants of one name, as <w:t> or <a:t>, joined.
export function textsOf(node: XmlNode, name: string): string {
  return findAll(node, name)
    .map((item) => textOf(item))
    .join('');
}
