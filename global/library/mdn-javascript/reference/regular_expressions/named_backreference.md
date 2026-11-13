---
title: "Named backreference: \\\\k<name>"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/regular_expressions/named_backreference/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Named backreference: \\k<name>

A **named backreference** refers to the submatch of a previous named capturing group and matches the same text as that group. For unnamed capturing groups, you need to use the normal backreference syntax.

## Syntax

```regex
\k<name>
```

### Parameters

- `name`
    The name of the group. Must be a valid identifier and refer to an existent named capturing group.

## Description

Named backreferences are very similar to normal backreferences: they refer to the text matched by a capturing group and match the same text. The difference is that you refer to the capturing group by name instead of by number. This makes the regular expression more readable and easier to refactor and maintain.

In Unicode-unaware mode, the sequence `\k` only starts a named backreference if the regex contains at least one named capturing group. Otherwise, it is an identity escape and is the same as the literal character `k`. This is a deprecated syntax for web compatibility, and you should not rely on it.

```js
/\k/.test("k"); // true
```

## Examples

### Pairing quotes

The following function matches the `title='xxx'` and `title="xxx"` patterns in a string. To ensure the quotes match, we use a backreference to refer to the first quote. Accessing the second capturing group (`[2]`) returns the string between the matching quote characters:

```js
function parseTitle(metastring) {
  return metastring.match(/title=(?<quote>["'])(.*?)\k<quote>/)[2];
}

parseTitle('title="foo"'); // 'foo'
parseTitle("title='foo' lang='en'"); // 'foo'
parseTitle('title="Named capturing groups\' advantages"'); // "Named capturing groups' advantages"
```

## See also

- Groups and backreferences guide
- Regular expressions
- Capturing group: `(...)`
- Named capturing group: `(?<name>...)`
- Backreference: `\1`, `\2`
