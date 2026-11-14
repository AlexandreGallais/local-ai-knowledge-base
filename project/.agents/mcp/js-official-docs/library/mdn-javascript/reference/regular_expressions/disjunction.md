---
title: "Disjunction: |"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/regular_expressions/disjunction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Disjunction: |

A **disjunction** specifies multiple alternatives. Any alternative matching the input causes the entire disjunction to be matched.

## Syntax

```regex
alternative1|alternative2
alternative1|alternative2|alternative3|…
```

### Parameters

- `alternativeN`
    One alternative pattern, composed of a sequence of atoms and assertions. Successfully matching one alternative causes the entire disjunction to be matched.

## Description

The `|` regular expression operator separates two or more _alternatives_. The pattern first tries to match the first alternative; if it fails, it tries to match the second one, and so on. For example, the following matches `"a"` instead of `"ab"`, because the first alternative already matches successfully:

```js
/a|ab/.exec("abc"); // ['a']
```

The `|` operator has the lowest precedence in a regular expression. If you want to use a disjunction as a part of a bigger pattern, you must group it.

When a grouped disjunction has more expressions after it, the matching begins by selecting the first alternative and attempting to match the rest of the regular expression. If the rest of the regular expression fails to match, the matcher tries the next alternative instead. For example,

```js
/(?:(a)|(ab))(?:(c)|(bc))/.exec("abc"); // ['abc', 'a', undefined, undefined, 'bc']
// Not ['abc', undefined, 'ab', 'c', undefined]
```

This is because by selecting `a` in the first alternative, it's possible to select `bc` in the second alternative and result in a successful match. This process is called _backtracking_, because the matcher first goes beyond the disjunction and then comes back to it when subsequent matching fails.

Note also that any capturing parentheses inside an alternative that's not matched produce `undefined` in the resulting array.

An alternative can be empty, in which case it matches the empty string (in other words, always matches).

Alternatives are always attempted left-to-right, regardless of the direction of matching (which is reversed in a lookbehind).

## Examples

### Matching file extensions

The following example matches file extensions, using the same code as the input boundary assertion article:

```js
function isImage(filename) {
  return /\.(?:png|jpe?g|webp|avif|gif)$/i.test(filename);
}

isImage("image.png"); // true
isImage("image.jpg"); // true
isImage("image.pdf"); // false
```

## See also

- Character classes guide
- Regular expressions
- Quantifier: `*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}`
- Character class: `[...]`, `[^...]`
