# core::fmt::builders

## struct DebugStruct

```rust
pub struct DebugStruct<'a, 'b: 'a>
```

A struct to help with [`fmt::Debug`](Debug) implementations.

This is useful when you wish to output a formatted struct as a part of your
[`Debug::fmt`] implementation.

This can be constructed by the [`Formatter::debug_struct`] method.

# Examples

```
use std::fmt;

struct Foo {
    bar: i32,
    baz: String,
}

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_struct("Foo")
           .field("bar", &self.bar)
           .field("baz", &self.baz)
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo { bar: 10, baz: "Hello World".to_string() }),
    r#"Foo { bar: 10, baz: "Hello World" }"#,
);
```

## DebugStruct::field

```rust
pub fn field(&mut self, name: &str, value: &dyn fmt::Debug) -> &mut Self
```

Adds a new field to the generated struct output.

# Examples

```
use std::fmt;

struct Bar {
    bar: i32,
    another: String,
}

impl fmt::Debug for Bar {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_struct("Bar")
           .field("bar", &self.bar) // We add `bar` field.
           .field("another", &self.another) // We add `another` field.
           // We even add a field which doesn't exist (because why not?).
           .field("nonexistent_field", &1)
           .finish() // We're good to go!
    }
}

assert_eq!(
    format!("{:?}", Bar { bar: 10, another: "Hello World".to_string() }),
    r#"Bar { bar: 10, another: "Hello World", nonexistent_field: 1 }"#,
);
```

## DebugStruct::finish_non_exhaustive

```rust
pub fn finish_non_exhaustive(&mut self) -> fmt::Result
```

Marks the struct as non-exhaustive, indicating to the reader that there are some other
fields that are not shown in the debug representation.

# Examples

```
use std::fmt;

struct Bar {
    bar: i32,
    hidden: f32,
}

impl fmt::Debug for Bar {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_struct("Bar")
           .field("bar", &self.bar)
           .finish_non_exhaustive() // Show that some other field(s) exist.
    }
}

assert_eq!(
    format!("{:?}", Bar { bar: 10, hidden: 1.0 }),
    "Bar { bar: 10, .. }",
);
```

## DebugStruct::finish

```rust
pub fn finish(&mut self) -> fmt::Result
```

Finishes output and returns any error encountered.

# Examples

```
use std::fmt;

struct Bar {
    bar: i32,
    baz: String,
}

impl fmt::Debug for Bar {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_struct("Bar")
           .field("bar", &self.bar)
           .field("baz", &self.baz)
           .finish() // You need to call it to "finish" the
                     // struct formatting.
    }
}

assert_eq!(
    format!("{:?}", Bar { bar: 10, baz: "Hello World".to_string() }),
    r#"Bar { bar: 10, baz: "Hello World" }"#,
);
```

## struct DebugTuple

```rust
pub struct DebugTuple<'a, 'b: 'a>
```

A struct to help with [`fmt::Debug`](Debug) implementations.

This is useful when you wish to output a formatted tuple as a part of your
[`Debug::fmt`] implementation.

This can be constructed by the [`Formatter::debug_tuple`] method.

# Examples

```
use std::fmt;

struct Foo(i32, String);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_tuple("Foo")
           .field(&self.0)
           .field(&self.1)
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(10, "Hello World".to_string())),
    r#"Foo(10, "Hello World")"#,
);
```

## DebugTuple::field

```rust
pub fn field(&mut self, value: &dyn fmt::Debug) -> &mut Self
```

Adds a new field to the generated tuple struct output.

# Examples

```
use std::fmt;

struct Foo(i32, String);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_tuple("Foo")
           .field(&self.0) // We add the first field.
           .field(&self.1) // We add the second field.
           .finish() // We're good to go!
    }
}

assert_eq!(
    format!("{:?}", Foo(10, "Hello World".to_string())),
    r#"Foo(10, "Hello World")"#,
);
```

## DebugTuple::finish_non_exhaustive

```rust
pub fn finish_non_exhaustive(&mut self) -> fmt::Result
```

Marks the tuple struct as non-exhaustive, indicating to the reader that there are some
other fields that are not shown in the debug representation.

# Examples

```
use std::fmt;

struct Foo(i32, String);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_tuple("Foo")
           .field(&self.0)
           .finish_non_exhaustive() // Show that some other field(s) exist.
    }
}

assert_eq!(
    format!("{:?}", Foo(10, "secret!".to_owned())),
    "Foo(10, ..)",
);
```

## DebugTuple::finish

```rust
pub fn finish(&mut self) -> fmt::Result
```

Finishes output and returns any error encountered.

# Examples

```
use std::fmt;

struct Foo(i32, String);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_tuple("Foo")
           .field(&self.0)
           .field(&self.1)
           .finish() // You need to call it to "finish" the
                     // tuple formatting.
    }
}

assert_eq!(
    format!("{:?}", Foo(10, "Hello World".to_string())),
    r#"Foo(10, "Hello World")"#,
);
```

## struct DebugSet

```rust
pub struct DebugSet<'a, 'b: 'a>
```

A struct to help with [`fmt::Debug`](Debug) implementations.

This is useful when you wish to output a formatted set of items as a part
of your [`Debug::fmt`] implementation.

This can be constructed by the [`Formatter::debug_set`] method.

# Examples

```
use std::fmt;

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_set().entries(self.0.iter()).finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11])),
    "{10, 11}",
);
```

## DebugSet::entry

```rust
pub fn entry(&mut self, entry: &dyn fmt::Debug) -> &mut Self
```

Adds a new entry to the set output.

# Examples

```
use std::fmt;

struct Foo(Vec<i32>, Vec<u32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_set()
           .entry(&self.0) // Adds the first "entry".
           .entry(&self.1) // Adds the second "entry".
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11], vec![12, 13])),
    "{[10, 11], [12, 13]}",
);
```

## DebugSet::entries

```rust
pub fn entries<D, I>(&mut self, entries: I) -> &mut Self where D: fmt::Debug, I: IntoIterator<Item = D>,
```

Adds the contents of an iterator of entries to the set output.

# Examples

```
use std::fmt;

struct Foo(Vec<i32>, Vec<u32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_set()
           .entries(self.0.iter()) // Adds the first "entry".
           .entries(self.1.iter()) // Adds the second "entry".
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11], vec![12, 13])),
    "{10, 11, 12, 13}",
);
```

## DebugSet::finish_non_exhaustive

```rust
pub fn finish_non_exhaustive(&mut self) -> fmt::Result
```

Marks the set as non-exhaustive, indicating to the reader that there are some other
elements that are not shown in the debug representation.

# Examples

```
use std::fmt;

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        // Print at most two elements, abbreviate the rest
        let mut f = fmt.debug_set();
        let mut f = f.entries(self.0.iter().take(2));
        if self.0.len() > 2 {
            f.finish_non_exhaustive()
        } else {
            f.finish()
        }
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![1, 2, 3, 4])),
    "{1, 2, ..}",
);
```

## DebugSet::finish

```rust
pub fn finish(&mut self) -> fmt::Result
```

Finishes output and returns any error encountered.

# Examples

```
use std::fmt;

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_set()
           .entries(self.0.iter())
           .finish() // Ends the set formatting.
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11])),
    "{10, 11}",
);
```

## struct DebugList

```rust
pub struct DebugList<'a, 'b: 'a>
```

A struct to help with [`fmt::Debug`](Debug) implementations.

This is useful when you wish to output a formatted list of items as a part
of your [`Debug::fmt`] implementation.

This can be constructed by the [`Formatter::debug_list`] method.

# Examples

```
use std::fmt;

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_list().entries(self.0.iter()).finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11])),
    "[10, 11]",
);
```

## DebugList::entry

```rust
pub fn entry(&mut self, entry: &dyn fmt::Debug) -> &mut Self
```

Adds a new entry to the list output.

# Examples

```
use std::fmt;

struct Foo(Vec<i32>, Vec<u32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_list()
           .entry(&self.0) // We add the first "entry".
           .entry(&self.1) // We add the second "entry".
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11], vec![12, 13])),
    "[[10, 11], [12, 13]]",
);
```

## DebugList::entries

```rust
pub fn entries<D, I>(&mut self, entries: I) -> &mut Self where D: fmt::Debug, I: IntoIterator<Item = D>,
```

Adds the contents of an iterator of entries to the list output.

# Examples

```
use std::fmt;

struct Foo(Vec<i32>, Vec<u32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_list()
           .entries(self.0.iter())
           .entries(self.1.iter())
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11], vec![12, 13])),
    "[10, 11, 12, 13]",
);
```

## DebugList::finish_non_exhaustive

```rust
pub fn finish_non_exhaustive(&mut self) -> fmt::Result
```

Marks the list as non-exhaustive, indicating to the reader that there are some other
elements that are not shown in the debug representation.

# Examples

```
use std::fmt;

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        // Print at most two elements, abbreviate the rest
        let mut f = fmt.debug_list();
        let mut f = f.entries(self.0.iter().take(2));
        if self.0.len() > 2 {
            f.finish_non_exhaustive()
        } else {
            f.finish()
        }
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![1, 2, 3, 4])),
    "[1, 2, ..]",
);
```

## DebugList::finish

```rust
pub fn finish(&mut self) -> fmt::Result
```

Finishes output and returns any error encountered.

# Examples

```
use std::fmt;

struct Foo(Vec<i32>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_list()
           .entries(self.0.iter())
           .finish() // Ends the list formatting.
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![10, 11])),
    "[10, 11]",
);
```

## struct DebugMap

```rust
pub struct DebugMap<'a, 'b: 'a>
```

A struct to help with [`fmt::Debug`](Debug) implementations.

This is useful when you wish to output a formatted map as a part of your
[`Debug::fmt`] implementation.

This can be constructed by the [`Formatter::debug_map`] method.

# Examples

```
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map().entries(self.0.iter().map(|&(ref k, ref v)| (k, v))).finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    r#"{"A": 10, "B": 11}"#,
);
```

## DebugMap::entry

```rust
pub fn entry(&mut self, key: &dyn fmt::Debug, value: &dyn fmt::Debug) -> &mut Self
```

Adds a new entry to the map output.

# Examples

```
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map()
           .entry(&"whole", &self.0) // We add the "whole" entry.
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    r#"{"whole": [("A", 10), ("B", 11)]}"#,
);
```

## DebugMap::key

```rust
pub fn key(&mut self, key: &dyn fmt::Debug) -> &mut Self
```

Adds the key part of a new entry to the map output.

This method, together with `value`, is an alternative to `entry` that
can be used when the complete entry isn't known upfront. Prefer the `entry`
method when it's possible to use.

# Panics

`key` must be called before `value` and each call to `key` must be followed
by a corresponding call to `value`. Otherwise this method will panic.

# Examples

```
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map()
           .key(&"whole").value(&self.0) // We add the "whole" entry.
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    r#"{"whole": [("A", 10), ("B", 11)]}"#,
);
```

## DebugMap::value

```rust
pub fn value(&mut self, value: &dyn fmt::Debug) -> &mut Self
```

Adds the value part of a new entry to the map output.

This method, together with `key`, is an alternative to `entry` that
can be used when the complete entry isn't known upfront. Prefer the `entry`
method when it's possible to use.

# Panics

`key` must be called before `value` and each call to `key` must be followed
by a corresponding call to `value`. Otherwise this method will panic.

# Examples

```
use std::fmt;

struct Foo(Vec<(String, i32)>);

impl fmt::Debug for Foo {
    fn fmt(&self, fmt: &mut fmt::Formatter<'_>) -> fmt::Result {
        fmt.debug_map()
           .key(&"whole").value(&self.0) // We add the "whole" entry.
           .finish()
    }
}

assert_eq!(
    format!("{:?}", Foo(vec![("A".to_string(), 10), ("B".to_string(), 11)])),
    r#"{"whole": [("A", 10), ("B", 11)]}"#,
);
```

## DebugMap::entries

```rust
pub fn entries<K, V, I>(&mut self, entries: I) -> &mut Self where K: fmt::Debug, V: fmt::Debug, I: IntoIterator<Item = (K, V)>,
```

Adds the contents of an iterator of entries to the map output.

# Examples

```
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

```
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

```
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

Creates a type whose [`fmt::Debug`] and [`fmt::Display`] impls are
forwarded to the provided closure.

# Examples

```
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

Implements [`fmt::Debug`] and [`fmt::Display`] via the provided closure.

Created with [`from_fn`].