---
title: "core::unicode"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/unicode/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::unicode

Unicode internals used in liballoc and libstd. Not public API.

## const UNICODE_VERSION

```rust
pub const UNICODE_VERSION: (u8, u8, u8) = unicode_data::UNICODE_VERSION
```

The version of Unicode that the Unicode parts of
`char` and `str` methods are based on.

New versions of Unicode are released regularly and subsequently all methods
in the standard library depending on Unicode are updated. Therefore the
behavior of some `char` and `str` methods and the value of this constant
changes over time, within the boundaries of Unicode's [stability policies].
This is *not* considered to be a breaking change.

The version numbering scheme is explained in
[Section 3.1 (Version Numbering)] of the Unicode Standard.
