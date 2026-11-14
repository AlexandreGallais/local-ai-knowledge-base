---
title: "Shebang"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/shebang.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[shebang]
# Shebang

r[shebang.intro]
A *[shebang]* is an optional line that is typically used in Unix-like systems to specify an interpreter for executing the file.

> [!EXAMPLE]
>
> ```rust,ignore
> #!/usr/bin/env rustx
>
> fn main() {
>     println!("Hello!");
> }
> ```

r[shebang.syntax]
```grammar
@root SHEBANG ->
    `#!` !((WHITESPACE | LINE_COMMENT | SHEBANG_BLOCK_COMMENT)* `[`)
    ~LF* (LF | EOF)

SHEBANG_BLOCK_COMMENT ->
    `/*` !(`!` | `*` ![`*` `/`])
      ( SHEBANG_NESTED_BLOCK_COMMENT | (!(`*/` | `/*`) CHAR) )*
    `*/`

SHEBANG_NESTED_BLOCK_COMMENT ->
    `/*`
      ( SHEBANG_NESTED_BLOCK_COMMENT | (!(`*/` | `/*`) CHAR) )*
    `*/`
```

r[shebang.syntax-description]
The shebang starts with the characters `#!` and extends through the first `U+000A` (LF) or through EOF if no LF is present. If the `#!` characters are followed by `[` (ignoring any intervening [whitespace] or [non-doc comments]), the line is not considered a shebang (to avoid ambiguity with an [inner attribute]).

> **Note:**
> Doc comments are not ignored when determining whether `[` follows the `#!` characters. For example, `#! /*! */ [allow(unused)]` at the start of a file is a shebang, not an inner attribute, because `/*! */` is a doc comment. Likewise, text following `#!` that resembles an unterminated block comment, as in `#!/*`, does not cause an error; the line is a shebang.

r[shebang.position]
The shebang may appear immediately at the start of the file or after the optional [byte order mark].
