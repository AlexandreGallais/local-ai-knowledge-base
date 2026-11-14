---
title: "core::bool"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/bool.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::bool

impl bool {}

## bool::then_some

```rust
pub const fn then_some<T: [const] Destruct>(self, t: T) -> Option<T>
```

Returns `Some(t)` if the `bool` is `true`,
or `None` otherwise.

Arguments passed to `then_some` are eagerly evaluated; if you are
passing the result of a function call, it is recommended to use
`then`, which is lazily evaluated.

# Examples

```rust
assert_eq!(false.then_some(0), None);
assert_eq!(true.then_some(0), Some(0));
```

```rust
let mut a = 0;
let mut function_with_side_effects = || { a += 1; };

true.then_some(function_with_side_effects());
false.then_some(function_with_side_effects());

// `a` is incremented twice because the value passed to `then_some` is
// evaluated eagerly.
assert_eq!(a, 2);
```

## bool::then

```rust
pub const fn then<T, F: [const] FnOnce() -> T + [const] Destruct>(self, f: F) -> Option<T>
```

Returns `Some(f())` if the `bool` is `true`,
or `None` otherwise.

# Examples

```rust
assert_eq!(false.then(|| 0), None);
assert_eq!(true.then(|| 0), Some(0));
```

```rust
let mut a = 0;

true.then(|| { a += 1; });
false.then(|| { a += 1; });

// `a` is incremented once because the closure is evaluated lazily by
// `then`.
assert_eq!(a, 1);
```

## bool::ok_or

```rust
pub const fn ok_or<E: [const] Destruct>(self, err: E) -> Result<(), E>
```

Returns `Ok(())` if the `bool` is `true`,
or `Err(err)` otherwise.

Arguments passed to `ok_or` are eagerly evaluated; if you are
passing the result of a function call, it is recommended to use
`ok_or_else`, which is lazily evaluated.

# Examples

```rust
assert_eq!(false.ok_or(0), Err(0));
assert_eq!(true.ok_or(0), Ok(()));
```

```rust
let mut a = 0;
let mut function_with_side_effects = || { a += 1; };

assert!(true.ok_or(function_with_side_effects()).is_ok());
assert!(false.ok_or(function_with_side_effects()).is_err());

// `a` is incremented twice because the value passed to `ok_or` is
// evaluated eagerly.
assert_eq!(a, 2);
```

## bool::ok_or_else

```rust
pub const fn ok_or_else<E, F: [const] FnOnce() -> E + [const] Destruct>( self, f: F, ) -> Result<(), E>
```

Returns `Ok(())` if the `bool` is `true`,
or `Err(f())` otherwise.

# Examples

```rust
assert_eq!(false.ok_or_else(|| 0), Err(0));
assert_eq!(true.ok_or_else(|| 0), Ok(()));
```

```rust
let mut a = 0;

assert!(true.ok_or_else(|| { a += 1; }).is_ok());
assert!(false.ok_or_else(|| { a += 1; }).is_err());

// `a` is incremented once because the closure is evaluated lazily by
// `ok_or_else`.
assert_eq!(a, 1);
```

## bool::toggle

```rust
pub const fn toggle(&mut self)
```

Toggles `self` in-place.

- If `self` is `true`, sets `self` to `false`.
- If `self` is `false`, sets `self` to `true`.

Equivalent to `value = !value`.

# Examples

```rust
let mut boolean = false;

boolean.toggle();
assert_eq!(boolean, true);

boolean.toggle();
assert_eq!(boolean, false);
```
