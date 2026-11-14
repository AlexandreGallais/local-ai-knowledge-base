---
title: "function-url-scheme-allowed-list"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/function-url-scheme-allowed-list/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# function-url-scheme-allowed-list

Specify a list of allowed URL schemes.

```css
a { background-image: url('http://www.example.com/file.jpg'); }
/**                        ↑
 *           This URL scheme */
```

Use this rule to enforce a subset of URL schemes as a convention. For example, allow only `https` and `data`, as browsers block `http` assets in `url()` on secure pages.

A URL scheme consists of alphanumeric, `+`, `-`, and `.` characters. It can appear at the start of a URL and is followed by `:`.

This rule ignores:

- URL arguments without an existing URL scheme
- URL arguments with variables or variable interpolation (`$sass`, `@less`, `--custom-property`, `#{$var}`, `@{var}`, `$(var)`)

This rule supports 1 message argument: the disallowed URL scheme.

## Options

### `Array<string>`

```json
["array", "of", "schemes", "/regex/"]
```

Given:

```json
{
  "function-url-scheme-allowed-list": ["data", "/^http/"]
}
```

The following patterns are considered problems:

```css
a { background-image: url('file://file.jpg'); }
```

The following patterns are _not_ considered problems:

```css
a { background-image: url('example.com/file.jpg'); }
```

```css
a { background-image: url('/example.com/file.jpg'); }
```

```css
a { background-image: url('//example.com/file.jpg'); }
```

```css
a { background-image: url('./path/to/file.jpg'); }
```

```css
a { background-image: url('http://www.example.com/file.jpg'); }
```

```css
a { background-image: url('https://www.example.com/file.jpg'); }
```

```css
a { background-image: url('HTTPS://www.example.com/file.jpg'); }
```

```css
a { background-image: url('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='); }
```
