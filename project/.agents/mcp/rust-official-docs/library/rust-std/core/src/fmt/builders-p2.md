---
title: "core::fmt::builders (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/fmt/builders.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::fmt::builders (part 2 of 2)

## DebugMap::entries

```rust
pub fn entries<K, V, I>(&mut self, entries: I) -> &mut Self where K: fmt::Debug, V: fmt::Debug, I: IntoIterator<Item = (K, V)>,
```

Adds the contents of an iterator of entries to the map output.

# Examples

```rust
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map()
           // We map our vec so each entries' first field will become
           // the "key".
           .entries(self.0.iter().map(|&(ref k, ref v)| (k, v)))
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    r#"{"A": 10, "B": 11}"#,
);
```

## DebugMap::finish_non_exhaustive

```rust
pub fn finish_non_exhaustive(&mut self) -> fmt::Result
```

Marks the map as non-exhaustive, indicating to the reader that there are some other
entries that are not shown in the debug representation.

# Examples

```rust
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        // Print at most two elements, abbreviate the rest
        let mut f = fmt.debug_map();
        let mut f = f.entries(self.0.iter().take(2).map(|&(ref k, ref v)| (k, v)));
        if self.0.len() > 2 {
            f.finish_non_exhaustive()
        } else {
            f.finish()
        }
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![
        ("A".to_string(), 10),
        ("B".to_string(), 11),
        ("C".to_string(), 12),
    ])),
    r#"{"A": 10, "B": 11, ..}"#,
);
```

## DebugMap::finish

```rust
pub fn finish(&mut self) -> fmt::Result
```

Finishes output and returns any error encountered.

# Panics

`key` must be called before `value` and each call to `key` must be followed
by a corresponding call to `value`. Otherwise this method will panic.

# Examples

```rust
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map()
           .entries(self.0.iter().map(|&(ref k, ref v)| (k, v)))
           .finish() // Ends the map formatting.
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    r#"{"A": 10, "B": 11}"#,
);
```

## fn from_fn

```rust
pub const fn from_fn<F: Fn(&mut fmt::Formatter<'_>) -> fmt::Result>(f: F) -> FromFn<F>
```

Creates a type whose `fmt::Debug` and `fmt::Display` impls are
forwarded to the provided closure.

# Examples

```rust
use std::fmt;

let value = 'a';
assert_eq!(format!("{}", value), "a");
assert_eq!(format!("{:?}", value), "'a'");

let wrapped = fmt::from_fn(|f| write!(f, "{value:?}"));
assert_eq!(format!("{}", wrapped), "'a'");
assert_eq!(format!("{:?}", wrapped), "'a'");
```

## struct FromFn

```rust
pub struct FromFn<F>(F)
```

Implements `fmt::Debug` and `fmt::Display` via the provided closure.

Created with `from_fn`.
