---
title: "core::any"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/any.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::any

Utilities for dynamic typing or type reflection.

#### `Any` and `TypeId`

`Any` itself can be used to get a `TypeId`, and has more features when used
as a trait object. As `&dyn Any` (a borrowed trait object), it has the `is`
and `downcast_ref` methods, to test if the contained value is of a given type,
and to get a reference to the inner value as a type. As `&mut dyn Any`, there
is also the `downcast_mut` method, for getting a mutable reference to the
inner value. `Box<dyn Any>` adds the `downcast` method, which attempts to
convert to a `Box<T>`. See the `Box` documentation for the full details.

Note that `&dyn Any` is limited to testing whether a value is of a specified
concrete type, and cannot be used to test whether a type implements a trait.

#### Smart pointers and `dyn Any`

One piece of behavior to keep in mind when using `Any` as a trait object,
especially with types like `Box<dyn Any>` or `Arc<dyn Any>`, is that simply
calling `.type_id()` on the value will produce the `TypeId` of the
*container*, not the underlying trait object. This can be avoided by
converting the smart pointer into a `&dyn Any` instead, which will return
the object's `TypeId`. For example:

```rust
use std::any::{Any, TypeId};

let boxed: Box<dyn Any> = Box::new(3_i32);

// You're more likely to want this:
let actual_id = (&*boxed).type_id();
// ... than this:
let boxed_id = boxed.type_id();

assert_eq!(actual_id, TypeId::of::<i32>());
assert_eq!(boxed_id, TypeId::of::<Box<dyn Any>>());
```

#### Examples

Consider a situation where we want to log a value passed to a function.
We know the value we're working on implements `Debug`, but we don't know its
concrete type. We want to give special treatment to certain types: in this
case printing out the length of `String` values prior to their value.
We don't know the concrete type of our value at compile time, so we need to
use runtime reflection instead.

```rust
use std::fmt::Debug;
use std::any::Any;

// Logger function for any type that implements `Debug`.
fn log<T: Any + Debug>(value: &T) {
    let value_any = value as &dyn Any;

    // Try to convert our value to a `String`. If successful, we want to
    // output the `String`'s length as well as its value. If not, it's a
    // different type: just print it out unadorned.
    match value_any.downcast_ref::<String>() {
        Some(as_string) => {
            println!("String ({}): {}", as_string.len(), as_string);
        }
        None => {
            println!("{value:?}");
        }
    }
}

// This function wants to log its parameter out prior to doing work with it.
fn do_work<T: Any + Debug>(value: &T) {
    log(value);
    // ...do some other work
}

fn main() {
    let my_string = "Hello World".to_string();
    do_work(&my_string);

    let my_i8: i8 = 100;
    do_work(&my_i8);
}
```

## Any::type_id

```rust
fn type_id(&self) -> TypeId
```

Gets the `TypeId` of `self`.

If called on a `dyn Any` trait object
(or a trait object of a subtrait of `Any`),
this returns the `TypeId` of the underlying
concrete type, not that of `dyn Any` itself.

# Examples

```rust
use std::any::{Any, TypeId};

fn is_string(s: &dyn Any) -> bool {
    TypeId::of::<String>() == s.type_id()
}

assert_eq!(is_string(&0), false);
assert_eq!(is_string(&"cookie monster".to_string()), true);
```

## Any::is

```rust
pub fn is<T: Any>(&self) -> bool
```

Returns `true` if the inner type is the same as `T`.

# Examples

```rust
use std::any::Any;

fn is_string(s: &dyn Any) {
    if s.is::<String>() {
        println!("It's a string!");
    } else {
        println!("Not a string...");
    }
}

is_string(&0);
is_string(&"cookie monster".to_string());
```

## Any::downcast_ref

```rust
pub fn downcast_ref<T: Any>(&self) -> Option<&T>
```

Returns some reference to the inner value if it is of type `T`, or
`None` if it isn't.

# Examples

```rust
use std::any::Any;

fn print_if_string(s: &dyn Any) {
    if let Some(string) = s.downcast_ref::<String>() {
        println!("It's a string({}): '{}'", string.len(), string);
    } else {
        println!("Not a string...");
    }
}

print_if_string(&0);
print_if_string(&"cookie monster".to_string());
```

## Any::downcast_mut

```rust
pub fn downcast_mut<T: Any>(&mut self) -> Option<&mut T>
```

Returns some mutable reference to the inner value if it is of type `T`, or
`None` if it isn't.

# Examples

```rust
use std::any::Any;

fn modify_if_u32(s: &mut dyn Any) {
    if let Some(num) = s.downcast_mut::<u32>() {
        *num = 42;
    }
}

let mut x = 10u32;
let mut s = "starlord".to_string();

modify_if_u32(&mut x);
modify_if_u32(&mut s);

assert_eq!(x, 42);
assert_eq!(&s, "starlord");
```

## Any::is

```rust
pub fn is<T: Any>(&self) -> bool
```

Forwards to the method defined on the type `dyn Any`.

# Examples

```rust
use std::any::Any;

fn is_string(s: &(dyn Any + Send)) {
    if s.is::<String>() {
        println!("It's a string!");
    } else {
        println!("Not a string...");
    }
}

is_string(&0);
is_string(&"cookie monster".to_string());
```

## Any::downcast_ref

```rust
pub fn downcast_ref<T: Any>(&self) -> Option<&T>
```

Forwards to the method defined on the type `dyn Any`.

# Examples

```rust
use std::any::Any;

fn print_if_string(s: &(dyn Any + Send)) {
    if let Some(string) = s.downcast_ref::<String>() {
        println!("It's a string({}): '{}'", string.len(), string);
    } else {
        println!("Not a string...");
    }
}

print_if_string(&0);
print_if_string(&"cookie monster".to_string());
```

## Any::downcast_mut

```rust
pub fn downcast_mut<T: Any>(&mut self) -> Option<&mut T>
```

Forwards to the method defined on the type `dyn Any`.

# Examples

```rust
use std::any::Any;

fn modify_if_u32(s: &mut (dyn Any + Send)) {
    if let Some(num) = s.downcast_mut::<u32>() {
        *num = 42;
    }
}

let mut x = 10u32;
let mut s = "starlord".to_string();

modify_if_u32(&mut x);
modify_if_u32(&mut s);

assert_eq!(x, 42);
assert_eq!(&s, "starlord");
```

## Any::is

```rust
pub fn is<T: Any>(&self) -> bool
```

Forwards to the method defined on the type `Any`.

# Examples

```rust
use std::any::Any;

fn is_string(s: &(dyn Any + Send + Sync)) {
    if s.is::<String>() {
        println!("It's a string!");
    } else {
        println!("Not a string...");
    }
}

is_string(&0);
is_string(&"cookie monster".to_string());
```

## Any::downcast_ref

```rust
pub fn downcast_ref<T: Any>(&self) -> Option<&T>
```

Forwards to the method defined on the type `Any`.

# Examples

```rust
use std::any::Any;

fn print_if_string(s: &(dyn Any + Send + Sync)) {
    if let Some(string) = s.downcast_ref::<String>() {
        println!("It's a string({}): '{}'", string.len(), string);
    } else {
        println!("Not a string...");
    }
}

print_if_string(&0);
print_if_string(&"cookie monster".to_string());
```

## Any::downcast_mut

```rust
pub fn downcast_mut<T: Any>(&mut self) -> Option<&mut T>
```

Forwards to the method defined on the type `Any`.

# Examples

```rust
use std::any::Any;

fn modify_if_u32(s: &mut (dyn Any + Send + Sync)) {
    if let Some(num) = s.downcast_mut::<u32>() {
        *num = 42;
    }
}

let mut x = 10u32;
let mut s = "starlord".to_string();

modify_if_u32(&mut x);
modify_if_u32(&mut s);

assert_eq!(x, 42);
assert_eq!(&s, "starlord");
```

## struct TypeId

```rust
pub struct TypeId
```

A `TypeId` represents a globally unique identifier for a type.

Each `TypeId` is an opaque object which does not allow inspection of what's
inside but does allow basic <example-value> such as cloning, comparison,
printing, and showing.

A `TypeId` is currently only available for types which ascribe to `'static`,
but this limitation may be removed in the future.

While `TypeId` implements `Hash`, `PartialOrd`, and `Ord`, it is worth
noting that the hashes and ordering will vary between Rust releases. Beware
of relying on them inside of your code!

# Layout

Like other `Rust`-representation types, `TypeId`'s size and layout are unstable.
In particular, this means that you cannot rely on the size and layout of `TypeId` remaining the
same between Rust releases; they are subject to change without prior notice between Rust
releases.

# Danger of Improper Variance

You might think that subtyping is impossible between two static types,
but this is false; there exists a static type with a static subtype.
To wit, `fn(&str)`, which is short for `for<'any> fn(&'any str)`, and
`fn(&'static str)`, are two distinct, static types, and yet,
`fn(&str)` is a subtype of `fn(&'static str)`, since any value of type
`fn(&str)` can be used where a value of type `fn(&'static str)` is needed.

This means that abstractions around `TypeId`, despite its
`'static` bound on arguments, still need to worry about unnecessary
and improper variance: it is advisable to strive for invariance
first. The usability impact will be negligible, while the reduction
in the risk of unsoundness will be most welcome.

## Examples

Suppose `SubType` is a subtype of `SuperType`, that is,
a value of type `SubType` can be used wherever
a value of type `SuperType` is expected.
Suppose also that `CoVar<T>` is a generic type, which is covariant over `T`
(like many other types, including `PhantomData<T>` and `Vec<T>`).

Then, by covariance, `CoVar<SubType>` is a subtype of `CoVar<SuperType>`,
that is, a value of type `CoVar<SubType>` can be used wherever
a value of type `CoVar<SuperType>` is expected.

Then if `CoVar<SuperType>` relies on `TypeId::of::<SuperType>()` to uphold any invariants,
those invariants may be broken because a value of type `CoVar<SuperType>` can be created
without going through any of its methods, like so:
```rust
type SubType = fn(&());
type SuperType = fn(&'static ());
type CoVar<T> = Vec<T>; // imagine something more complicated

let sub: CoVar<SubType> = CoVar::new();
// we have a `CoVar<SuperType>` instance without
// *ever* having called `CoVar::<SuperType>::new()`!
let fake_super: CoVar<SuperType> = sub;
```

The following is an example program that tries to use `TypeId::of` to
implement a generic type `Unique<T>` that guarantees unique instances for each `Unique<T>`,
that is, for each type `T` there can be at most one value of type `Unique<T>` at any time.

```rust
mod unique {
    use std::any::TypeId;
    use std::collections::BTreeSet;
    use std::marker::PhantomData;
    use std::sync::Mutex;

    static ID_SET: Mutex<BTreeSet<TypeId>> = Mutex::new(BTreeSet::new());

    // TypeId has only covariant uses, which makes Unique covariant over TypeAsId 🚨
    #[derive(Debug, PartialEq)]
    pub struct Unique<TypeAsId: 'static>(
        // private field prevents creation without `new` outside this module
        PhantomData<TypeAsId>,
    );

    impl<TypeAsId: 'static> Unique<TypeAsId> {
        pub fn new() -> Option<Self> {
            let mut set = ID_SET.lock().unwrap();
            (set.insert(TypeId::of::<TypeAsId>())).then(|| Self(PhantomData))
        }
    }

    impl<TypeAsId: 'static> Drop for Unique<TypeAsId> {
        fn drop(&mut self) {
            let mut set = ID_SET.lock().unwrap();
            (!set.remove(&TypeId::of::<TypeAsId>())).then(|| panic!("duplicity detected"));
        }
    }
}

use unique::Unique;

// `OtherRing` is a subtype of `TheOneRing`. Both are 'static, and thus have a TypeId.
type TheOneRing = fn(&'static ());
type OtherRing = fn(&());

fn main() {
    let the_one_ring: Unique<TheOneRing> = Unique::new().unwrap();
    assert_eq!(Unique::<TheOneRing>::new(), None);

    let other_ring: Unique<OtherRing> = Unique::new().unwrap();
    // Use that `Unique<OtherRing>` is a subtype of `Unique<TheOneRing>` 🚨
    let fake_one_ring: Unique<TheOneRing> = other_ring;
    assert_eq!(fake_one_ring, the_one_ring);

    std::mem::forget(fake_one_ring);
}
```

## TypeId::of

```rust
pub const fn of<T: ?Sized + 'static>() -> TypeId
```

Returns the `TypeId` of the generic type parameter.

# Examples

```rust
use std::any::{Any, TypeId};

fn is_string<T: ?Sized + Any>(_s: &T) -> bool {
    TypeId::of::<String>() == TypeId::of::<T>()
}

assert_eq!(is_string(&0), false);
assert_eq!(is_string(&"cookie monster".to_string()), true);
```

## fn type_name

```rust
pub const fn type_name<T: ?Sized>() -> &'static str
```

Returns the name of a type as a string slice.

# Note

This is intended for diagnostic use. The exact contents and format of the
string returned are not specified, other than being a best-effort
description of the type. For example, amongst the strings
that `type_name::<Option<String>>()` might return are `"Option<String>"` and
`"std::option::Option<std::string::String>"`.

The returned string must not be considered to be a unique identifier of a
type as multiple types may map to the same type name. Similarly, there is no
guarantee that all parts of a type will appear in the returned string. In
addition, the output may change between versions of the compiler. For
example, lifetime specifiers were omitted in some earlier versions.

The current implementation uses the same infrastructure as compiler
diagnostics and debuginfo, but this is not guaranteed.

# Examples

```rust
assert_eq!(
    std::any::type_name::<Option<String>>(),
    "core::option::Option<alloc::string::String>",
);
```

## fn type_name_of_val

```rust
pub const fn type_name_of_val<T: ?Sized>(_val: &T) -> &'static str
```

Returns the type name of the pointed-to value as a string slice.

This is the same as `type_name::<T>()`, but can be used where the type of a
variable is not easily available.

# Note

Like `type_name`, this is intended for diagnostic use and the exact output is not
guaranteed. It provides a best-effort description, but the output may change between
versions of the compiler.

In short: use this for debugging, avoid using the output to affect program behavior. More
information is available at `type_name`.

Additionally, this function does not resolve trait objects. This means that
`type_name_of_val(&7u32 as &dyn Debug)` may return `"dyn Debug"`, but will not return `"u32"`
at this time.

# Examples

Prints the default integer and float types.

```rust
use std::any::type_name_of_val;

let s = "foo";
let x: i32 = 1;
let y: f32 = 1.0;

assert!(type_name_of_val(&s).contains("str"));
assert!(type_name_of_val(&x).contains("i32"));
assert!(type_name_of_val(&y).contains("f32"));
```
