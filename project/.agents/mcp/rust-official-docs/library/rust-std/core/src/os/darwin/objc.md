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