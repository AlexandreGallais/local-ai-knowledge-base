---
title: "core::str::count"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/str/count.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::str::count

Code for efficiently counting the number of `char`s in a UTF-8 encoded
string.

Broadly, UTF-8 encodes `char`s as a "leading" byte which begins the `char`,
followed by some number (possibly 0) of continuation bytes.

The leading byte can have a number of bit-patterns (with the specific
pattern indicating how many continuation bytes follow), but the continuation
bytes are always in the format `0b10XX_XXXX` (where the `X`s can take any
value). That is, the most significant bit is set, and the second most
significant bit is unset.

To count the number of characters, we can just count the number of bytes in
the string which are not continuation bytes, which can be done many bytes at
a time fairly easily.

Note: Because the term "leading byte" can sometimes be ambiguous (for
example, it could also refer to the first byte of a slice), we'll often use
the term "non-continuation byte" to refer to these bytes in the code.
