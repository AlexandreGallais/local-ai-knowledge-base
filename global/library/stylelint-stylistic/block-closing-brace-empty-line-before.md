---
title: "block-closing-brace-empty-line-before"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/block-closing-brace-empty-line-before/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# block-closing-brace-empty-line-before

Require or disallow an empty line before the closing brace of blocks.

```css
a {
  color: pink;
  /* ← */
} /* ↑ */
/**  ↑
 * This line */
```

The `fix` option can automatically fix all of the problems reported by this rule.

Over a block holding nothing but comments the run in front of the closing brace is the run behind the opening brace, so `block-opening-brace-newline-after` writes it too. Asked under `never-multi-line`, it takes both breaks of an empty line back out, and no file satisfies both: there the reversal behind `except: ["after-closing-brace"]` asks for nothing and that rule writes. A copy of it kept off reporting — by a disable comment standing on the line its warning falls on, which for a head written in several lines is the line the opening brace stands on, or by `ignore: ["rules"]`, which takes it off rules alone — is asked nothing, since a rule that reports nothing forbids nothing, and the empty line stands.

## Options

`string`: `"always-multi-line"|"never"`

### `always-multi-line`

The following patterns are considered problems:

```css
a {
  color: pink;
}
```

The following patterns are _not_ considered problems:

```css
a {
  color: pink;

}
```

```css
a { color: pink; }
```

### `never`

The following patterns are considered problems:

```css
a {
  color: pink;

}
```

The following patterns are _not_ considered problems:

```css
a {
  color: pink;
}
```

```css
a { color: pink; }
```

## Optional secondary options

### `except: ["after-closing-brace"]`

When a rule is nested, `after-closing-brace` brace will reverse the primary option.

For example, with `"never"` and `except: ["after-closing-brace"]`:

The following patterns are considered problems:

```css
@media print {

  a {
    color: aquamarine;
  }
}
```

```css
@supports (animation-name: test) {

  a {
    color: aquamarine;
  }
}
```

```css
@keyframes test {

  100% {
    color: aquamarine;
  }
}
```

The following patterns are _not_ considered problems:

```css
@media print {

  a {
    color: aquamarine;
  }

}
```

```css
@font-face {
  font-family: "MyFont";
  src: url("myfont.woff2") format("woff2");
}
```

```css
@supports (animation-name: test) {

  a {
    color: aquamarine;
  }

}
```

```css
@keyframes test {

  100% {
    color: aquamarine;
  }

}
```

For example, with `"always-multi-line"` and `except: ["after-closing-brace"]`:

The following patterns are considered problems:

```css
@media print {

  a {
    color: aquamarine;

  }

}
```

```css
@supports (animation-name: test) {

  a {
    color: aquamarine;

  }

}
```

```css
@keyframes test {

  100% {
    color: aquamarine;

  }

}
```

The following patterns are _not_ considered problems:

```css
@media print {

  a {
    color: aquamarine;

  }
}
```

```css
@font-face {
  font-family: "MyFont";
  src: url("myfont.woff2") format("woff2");

}
```

```css
@supports (animation-name: test) {

  a {
    color: aquamarine;

  }
}
```

```css
@keyframes test {

  100% {
    color: aquamarine;

  }
}
```

### `except: ["last-nested"]`

A block nested inside another block and holding no block of its own ends a chain of nesting, and `last-nested` reverses the primary option there: the block of a nested rule, of a rule inside an at-rule, or of a nested property of Sass. A block standing at the top of a file is nested in nothing, and a block holding a block of its own does not end the chain, so both keep the primary option.

For example, with `"never"` and `except: ["last-nested"]`:

The following patterns are considered problems:

```css
a {
  b {
    color: aquamarine;
  }
}
```

```css
@media print {
  a {
    color: aquamarine;
  }
}
```

The following patterns are _not_ considered problems:

```css
a {
  b {
    color: aquamarine;

  }
}
```

```css
@media print {
  a {
    color: aquamarine;

  }
}
```

```css
a {
  b {
    c {
      color: aquamarine;

    }
  }
}
```

For example, with `"always-multi-line"` and `except: ["last-nested"]`:

The following pattern is considered a problem:

```css
a {

  b {
    color: aquamarine;

  }

}
```

The following patterns are _not_ considered problems:

```css
@media print {

  a {
    color: aquamarine;
  }

}
```

```css
a {
  b {
    c {
      color: aquamarine;
    }

  }

}
```

### `except: ["after-closing-brace", "last-nested"]`

Both values reverse the primary option the same way, so naming both asks one reversal and not two: a block either of them reaches is turned over once.

For example, with `"never"` and `except: ["after-closing-brace", "last-nested"]`:

The following pattern is considered a problem:

```css
@media (width >= 1px) {
  .foo {
    color: red;

    a {
      color: blue;
    }
  }
}
```

The following pattern is _not_ considered a problem:

```css
@media (width >= 1px) {

  .foo {
    color: red;

    a {
      color: blue;
    }

  }

}
```
