---
title: "core::fmt (part 3 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/fmt/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::fmt (part 3 of 3)

## Formatter::sign_minus

```rust
pub fn sign_minus(&self) -> bool
```

Determines if the `-` flag was specified.

# Examples

```rust
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if formatter.sign_minus() {
            // You want a minus sign? Have one!
            write!(formatter, "-Foo({})", self.0)
        } else {
            write!(formatter, "Foo({})", self.0)
        }
    }
}

assert_eq!(format!("{:-}", Foo(23)), "-Foo(23)");
assert_eq!(format!("{}", Foo(23)), "Foo(23)");
```

## Formatter::alternate

```rust
pub fn alternate(&self) -> bool
```

Determines if the `#` flag was specified.

# Examples

```rust
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if formatter.alternate() {
            write!(formatter, "Foo({})", self.0)
        } else {
            write!(formatter, "{}", self.0)
        }
    }
}

assert_eq!(format!("{:#}", Foo(23)), "Foo(23)");
assert_eq!(format!("{}", Foo(23)), "23");
```

## Formatter::sign_aware_zero_pad

```rust
pub fn sign_aware_zero_pad(&self) -> bool
```

Determines if the `0` flag was specified.

# Examples

```rust
use std::fmt;

struct Foo(i32);

impl fmt::Display for Foo {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        assert!(formatter.sign_aware_zero_pad());
        assert_eq!(formatter.width(), Some(4));
        // We ignore the formatter's options.
        write!(formatter, "{}", self.0)
    }
}

assert_eq!(format!("{:04}", Foo(23)), "23");
```

## Formatter::debug_struct

```rust
pub fn debug_struct<'b>(&'b mut self, name: &str) -> DebugStruct<'b, 'a>
```

Creates a `DebugStruct` builder designed to assist with creation of
`fmt::Debug` implementations for structs.

# Examples

```rust
use std::fmt;
use std::net::Ipv4Addr;

struct Foo {
    bar: i32,
    baz: String,
    addr: Ipv4Addr,
}

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_struct("Foo")
            .field("bar", &self.bar)
            .field("baz", &self.baz)
            .field("addr", &format_args!("{}", self.addr))
            .finish()
    }
}

assert_eq!(
    "Foo { bar: 10, baz: \"Hello World\", addr: 127.0.0.1 }",
    format!("{:?}", Foo {
        bar: 10,
        baz: "Hello World".to_string(),
        addr: Ipv4Addr::new(127, 0, 0, 1),
    })
);
```

## Formatter::debug_tuple

```rust
pub fn debug_tuple<'b>(&'b mut self, name: &str) -> DebugTuple<'b, 'a>
```

Creates a `DebugTuple` builder designed to assist with creation of
`fmt::Debug` implementations for tuple structs.

# Examples

```rust
use std::fmt;
use std::marker::PhantomData;

struct Foo<T>(i32, String, PhantomData<T>);

impl<T> fmt::Debug for Foo<T> {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_tuple("Foo")
            .field(&self.0)
            .field(&self.1)
            .field(&format_args!("_"))
            .finish()
    }
}

assert_eq!(
    "Foo(10, \"Hello\", _)",
    format!("{:?}", Foo(10, "Hello".to_string(), PhantomData::<u8>))
);
```

## Formatter::debug_list

```rust
pub fn debug_list<'b>(&'b mut self) -> DebugList<'b, 'a>
```

Creates a `DebugList` builder designed to assist with creation of
`fmt::Debug` implementations for list-like structures.

# Examples

```rust
use std::fmt;

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_list().entries(self.0.iter()).finish()
    }
}

assert_eq!(format!("{:?}", Foo(vec![10, 11])), "[10, 11]");
```

## Formatter::debug_set

```rust
pub fn debug_set<'b>(&'b mut self) -> DebugSet<'b, 'a>
```

Creates a `DebugSet` builder designed to assist with creation of
`fmt::Debug` implementations for set-like structures.

# Examples

```rust
use std::fmt;

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_set().entries(self.0.iter()).finish()
    }
}

assert_eq!(format!("{:?}", Foo(vec![10, 11])), "{10, 11}");
```

In this more complex example, we use `format_args!` and `.debug_set()`
to build a list of match arms:

```rust
use std::fmt;

struct Arm<'a, L, R>(&'a (L, R));
struct Table<'a, K, V>(&'a [(K, V)], V);

impl<'a, L, R> fmt::Debug for Arm<'a, L, R>
where
    L: 'a + fmt::Debug, R: 'a + fmt::Debug
{
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        L::fmt(&(self.0).0, fmt)?;
        fmt.write_str(" => ")?;
        R::fmt(&(self.0).1, fmt)
    }
}

impl<'a, K, V> fmt::Debug for Table<'a, K, V>
where
    K: 'a + fmt::Debug, V: 'a + fmt::Debug
{
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_set()
        .entries(self.0.iter().map(Arm))
        .entry(&Arm(&(format_args!("_"), &self.1)))
        .finish()
    }
}
```

## Formatter::debug_map

```rust
pub fn debug_map<'b>(&'b mut self) -> DebugMap<'b, 'a>
```

Creates a `DebugMap` builder designed to assist with creation of
`fmt::Debug` implementations for map-like structures.

# Examples

```rust
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map().entries(self.0.iter().map(|&(ref k, ref v)| (k, v))).finish()
    }
}

assert_eq!(
    format!("{:?}",  Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    r#"{"A": 10, "B": 11}"#
 );
```
