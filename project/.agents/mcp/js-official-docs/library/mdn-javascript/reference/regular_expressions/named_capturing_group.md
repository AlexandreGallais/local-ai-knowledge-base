---
title: "Named capturing group: (?<name>...)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/regular_expressions/named_capturing_group/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Named capturing group: (?<name>...)

A **named capturing group** is a particular kind of capturing group that allows you to give a name to the group. The group's matching result can later be identified by this name instead of by its index in the pattern.

## Syntax

```regex
(?<name>pattern)
```

### Parameters

- `pattern`
    A pattern consisting of anything you may use in a regex literal, including a disjunction.
- `name`
    The name of the group. Must be a valid identifier.

## Description

Named capturing groups can be used just like capturing groups — they also have their match index in the result array, and they can be referenced through `\1`, `\2`, etc. The only difference is that they can be _additionally_ referenced by their name. The information of the capturing group's match can be accessed through:

- The `groups` property of the return value of `RegExp.prototype.exec()`, or `String.prototype.match()` when the regex does not have the `g` flag
- The `groups` property of each match array yielded by the iterator returned by `String.prototype.matchAll()`
- The `groups` parameter of the `String.prototype.replace()` and `String.prototype.replaceAll()` methods' `replacement` callback function
- Named backreferences within the same pattern

All names must be unique within the same pattern. Multiple named capturing groups with the same name result in a syntax error.

```js
/(?<name>)(?<name>)/; // SyntaxError: Invalid regular expression: Duplicate capture group name
```

This restriction is relaxed if the duplicate named capturing groups are not in the same disjunction alternative, so for any string input, only one named capturing group can actually be matched. This is a much newer feature, so check browser compatibility before using it.

```js
/(?<year>\d{4})-\d{2}|\d{2}-(?<year>\d{4})/;
// Works; "year" can either come before or after the hyphen
```

Named capturing groups will all be present in the result. If a named capturing group is not matched (for example, it belongs to an unmatched alternative in a disjunction), the corresponding property on the `groups` object has value `undefined`.

```js
/(?<ab>ab)|(?<cd>cd)/.exec("cd").groups; // [Object: null prototype] { ab: undefined, cd: 'cd' }
```

You can get the start and end indices of each named capturing group in the input string by using the `d` flag. In addition to accessing them on the `indices` property on the array returned by `exec()`, you can also access them by their names on `indices.groups`.

Compared to unnamed capturing groups, named capturing groups have the following advantages:

- They allow you to provide a descriptive name for each submatch result.
- They allow you to access submatch results without having to remember the order in which they appear in the pattern.
- When refactoring code, you can change the order of capturing groups without worrying about breaking other references.

## Examples

### Using named capturing groups

The following example parses a timestamp and an author name from a Git log entry (output with `git log --format=%ct,%an -- filename`):

```js
function parseLog(entry) {
  const { author, timestamp } = /^(?<timestamp>\d+),(?<author>.+)$/.exec(
    entry,
  ).groups;
  return `${author} committed on ${new Date(
    parseInt(timestamp, 10) * 1000,
  ).toLocaleString()}`;
}

parseLog("1560979912,Caroline"); // "Caroline committed on 6/19/2019, 5:31:52 PM"
```

## See also

- Polyfill of named capturing groups in `core-js`
- Groups and backreferences guide
- Regular expressions
- Capturing group: `(...)`
- Non-capturing group: `(?:...)`
- Named backreference: `\k<name>`
- ESLint rule: `prefer-named-capture-group`
