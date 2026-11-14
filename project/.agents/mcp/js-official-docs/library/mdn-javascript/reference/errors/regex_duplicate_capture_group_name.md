---
title: "SyntaxError: duplicate capture group name in regular expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_duplicate_capture_group_name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: duplicate capture group name in regular expression

The JavaScript exception "duplicate capture group name in regular expression" occurs when a regular expression pattern contains two or more named capturing groups with the same name, and these capture groups could be matched at the same time.

## Message

```plain
SyntaxError: Invalid regular expression: /(?<a>)(?<a>)/: Duplicate capture group name (V8-based)
SyntaxError: duplicate capture group name in regular expression (Firefox)
SyntaxError: Invalid regular expression: duplicate group specifier name (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

All named capturing groups in a regular expression pattern must have unique names. A more recent feature allows named capturing groups to share names, as long as they belong to different disjunction alternatives and cannot be matched at the same time (see browser compatibility for this). However, it is still an error if the named capturing groups with the same name could be matched at the same time, as that would make other features, such as named backreferences, ambiguous.

## Examples

### Invalid cases

```js
/(?<name>\w+) (?<name>\w+)/;
```

### Valid cases

```js
/(?<firstName>\w+) (?<lastName>\w+)/;
/(?<year>\d{4})-\d{2}|\d{2}-(?<year>\d{4})/;
```

## See also

- Regular expressions
- Named capturing group: `(?<name>...)`
