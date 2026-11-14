---
title: "core::os::darwin::objc"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/os/darwin/objc.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::os::darwin::objc

Defines types and macros for Objective-C interoperability.

## enum objc_class

```rust
pub enum objc_class
```

Equivalent to Objective-C’s `struct objc_class` type.

## enum objc_selector

```rust
pub enum objc_selector
```

Equivalent to Objective-C’s `struct objc_selector` type.

## type Class

```rust
pub type Class = *mut objc_class
```

Equivalent to Objective-C’s `Class` type.

## type SEL

```rust
pub type SEL = *mut objc_selector
```

Equivalent to Objective-C’s `SEL` type.
