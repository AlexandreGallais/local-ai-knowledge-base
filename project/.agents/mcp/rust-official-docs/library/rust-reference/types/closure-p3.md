---
title: "Closure types (part 3 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/types/closure.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Closure types (part 3 of 3)

### `Box` vs other `Deref` implementations

The implementation of the [`Deref`] trait for [`Box`] is treated differently from other `Deref` implementations, as it is considered a special entity.

For example, let us look at examples involving `Rc` and `Box`. The `*rc` is desugared to a call to the trait method `deref` defined on `Rc`, but since `*box` is treated differently, it is possible to do a precise capture of the contents of the `Box`.

r[type.closure.capture.precision.box-non-move.not-moved]
#### `Box` with non-`move` closure

In a non-`move` closure, if the contents of the `Box` are not moved into the closure body, the contents of the `Box` are precisely captured.

```rust
struct S(String);

let b = Box::new(S(String::new()));
let c_box = || {
    let x = &(*b).0; // captures `(*b).0` by ImmBorrow
};
c_box();

// Contrast `Box` with another type that implements Deref:
let r = std::rc::Rc::new(S(String::new()));
let c_rc = || {
    let x = &(*r).0; // captures `r` by ImmBorrow
};
c_rc();
```

r[type.closure.capture.precision.box-non-move.moved]
However, if the contents of the `Box` are moved into the closure, then the box is entirely captured. This is done so the amount of data that needs to be moved into the closure is minimized.

```rust
// This is the same as the example above except the closure
// moves the value instead of taking a reference to it.

struct S(String);

let b = Box::new(S(String::new()));
let c_box = || {
    let x = (*b).0; // captures `b` with ByValue
};
c_box();
```

r[type.closure.capture.precision.box-move.read]
#### `Box` with move closure

Similarly to moving contents of a `Box` in a non-`move` closure, reading the contents of a `Box` in a `move` closure will capture the `Box` entirely.

```rust
struct S(i32);

let b = Box::new(S(10));
let c_box = move || {
    let x = (*b).0; // captures `b` with ByValue
};
```

r[type.closure.unique-immutable]
## Unique immutable borrows in captures

Captures can occur by a special kind of borrow called a _unique immutable borrow_, which cannot be used anywhere else in the language and cannot be written out explicitly. It occurs when modifying the referent of a mutable reference, as in the following example:

```rust
let mut b = false;
let x = &mut b;
let mut c = || {
    // An ImmBorrow and a MutBorrow of `x`.
    let a = &x;
    *x = true; // `x` captured by UniqueImmBorrow
};
// The following line is an error:
// let y = &x;
c();
// However, the following is OK.
let z = &x;
```

In this case, borrowing `x` mutably is not possible, because `x` is not `mut`. But at the same time, borrowing `x` immutably would make the assignment illegal, because a `& &mut` reference might not be unique, so it cannot safely be used to modify a value. So a unique immutable borrow is used: it borrows `x` immutably, but like a mutable borrow, it must be unique.

In the above example, uncommenting the declaration of `y` will produce an error because it would violate the uniqueness of the closure's borrow of `x`; the declaration of z is valid because the closure's lifetime has expired at the end of the block, releasing the borrow.

r[type.closure.call]
## Call traits and coercions

r[type.closure.call.intro]
Closure types all implement [`FnOnce`], indicating that they can be called once by consuming ownership of the closure. Additionally, some closures implement more specific call traits:

r[type.closure.call.fn-mut]
* A closure which does not move out of any captured variables implements [`FnMut`], indicating that it can be called by mutable reference.

r[type.closure.call.fn]
* A closure which does not mutate or move out of any captured variables implements [`Fn`], indicating that it can be called by shared reference.

> **Note:**
> `move` closures may still implement [`Fn`] or [`FnMut`], even though they capture variables by move. This is because the traits implemented by a closure type are determined by what the closure does with captured values, not how it captures them.

r[type.closure.non-capturing]
*Non-capturing closures* are closures that don't capture anything from their environment. Non-async, non-capturing closures can be coerced to function pointers (e.g., `fn()`) with the matching signature.

```rust
let add = |x, y| x + y;

let mut x = add(5,7);

type Binop = fn(i32, i32) -> i32;
let bo: Binop = add;
x = bo(5,7);
```

r[type.closure.async.traits]
### Async closure traits

r[type.closure.async.traits.fn-family]
Async closures have a further restriction of whether or not they implement [`FnMut`] or [`Fn`].

The [`Future`] returned by the async closure has similar capturing characteristics as a closure. It captures place expressions from the async closure based on how they are used. The async closure is said to be *lending* to its [`Future`] if it has either of the following properties:

- The `Future` includes a mutable capture.
- The async closure captures by value, except when the value is accessed with a dereference projection.

If the async closure is lending to its `Future`, then [`FnMut`] and [`Fn`] are *not* implemented. [`FnOnce`] is always implemented.

> **Example**: The first clause for a mutable capture can be illustrated with the following:
>
> ```rust,compile_fail
> fn takes_callback<Fut: Future>(c: impl FnMut() -> Fut) {}
>
> fn f() {
>     let mut x = 1i32;
>     let c = async || {
>         x = 2;  // x captured with MutBorrow
>     };
>     takes_callback(c);  // ERROR: async closure does not implement `FnMut`
> }
> ```
>
> The second clause for a regular value capture can be illustrated with the following:
>
> ```rust,compile_fail
> fn takes_callback<Fut: Future>(c: impl Fn() -> Fut) {}
>
> fn f() {
>     let x = &1i32;
>     let c = async move || {
>         let a = x + 2;  // x captured ByValue
>     };
>     takes_callback(c);  // ERROR: async closure does not implement `Fn`
> }
> ```
>
> The exception of the the second clause can be illustrated by using a dereference, which does allow `Fn` and `FnMut` to be implemented:
>
> ```rust
> fn takes_callback<Fut: Future>(c: impl Fn() -> Fut) {}
>
> fn f() {
>     let x = &1i32;
>     let c = async move || {
>         let a = *x + 2;
>     };
>     takes_callback(c);  // OK: implements `Fn`
> }
> ```

r[type.closure.async.traits.async-family]
Async closures implement [`AsyncFn`], [`AsyncFnMut`], and [`AsyncFnOnce`] in an analogous way as regular closures implement [`Fn`], [`FnMut`], and [`FnOnce`]; that is, depending on the use of the captured variables in its body.

r[type.closure.traits]
### Other traits

r[type.closure.traits.intro]
All closure types implement [`Sized`]. Additionally, closure types implement the following traits if allowed to do so by the types of the captures it stores:

* [`Clone`]
* [`Copy`]
* [`Sync`]
* [`Send`]

r[type.closure.traits.behavior]
The rules for [`Send`] and [`Sync`] match those for normal struct types, while [`Clone`] and [`Copy`] behave as if [derived]. For [`Clone`], the order of cloning of the captured values is left unspecified.

Because captures are often by reference, the following general rules arise:

* A closure is [`Sync`] if all captured values are [`Sync`].
* A closure is [`Send`] if all values captured by non-unique immutable reference are [`Sync`], and all values captured by unique immutable or mutable reference, copy, or move are [`Send`].
* A closure is [`Clone`] or [`Copy`] if it does not capture any values by unique immutable or mutable reference, and if all values it captures by copy or move are [`Clone`] or [`Copy`], respectively.

r[type.closure.drop-order]
## Drop order

If a closure captures a field of a composite types such as structs, tuples, and enums by value, the field's lifetime would now be tied to the closure. As a result, it is possible for disjoint fields of a composite types to be dropped at different times.

```rust
{
    let tuple =
      (String::from("foo"), String::from("bar")); // --+
    { //                                               |
        let c = || { // ----------------------------+  |
            // tuple.0 is captured into the closure |  |
            drop(tuple.0); //                       |  |
        }; //                                       |  |
    } // 'c' and 'tuple.0' dropped here ------------+  |
} // tuple.1 dropped here -----------------------------+
```

r[type.closure.capture.precision.edition2018.entirety]
## Edition 2018 and before

### Closure types difference

In Edition 2018 and before, closures always capture a variable in its entirety, without its precise capture path. This means that for the example used in the Closure types section, the generated closure type would instead look something like this:

```rust
struct Closure<'a> {
    rect : &'a mut Rectangle,
}

impl<'a> FnOnce<()> for Closure<'a> {
    type Output = String;
    extern "rust-call" fn call_once(self, args: ()) -> String {
        self.rect.left_top.x += 1;
        self.rect.right_bottom.x += 1;
        format!("{:?}", self.rect.left_top)
    }
}
```

and the call to `f` would work as follows:

```rust
f(Closure { rect: rect });
```

r[type.closure.capture.precision.edition2018.composite]
### Capture precision difference

Composite types such as structs, tuples, and enums are always captured in its entirety, not by individual fields. As a result, it may be necessary to borrow into a local variable in order to capture a single field:

```rust
# use std::collections::HashSet;
#
struct SetVec {
    set: HashSet<u32>,
    vec: Vec<u32>
}

impl SetVec {
    fn populate(&mut self) {
        let vec = &mut self.vec;
        self.set.iter().for_each(|&n| {
            vec.push(n);
        })
    }
}
```

If, instead, the closure were to use `self.vec` directly, then it would attempt to capture `self` by mutable reference. But since `self.set` is already borrowed to iterate over, the code would not compile.

r[type.closure.capture.precision.edition2018.move]
If the `move` keyword is used, then all captures are by move or, for `Copy` types, by copy, regardless of whether a borrow would work. The `move` keyword is usually used to allow the closure to outlive the captured values, such as if the closure is being returned or used to spawn a new thread.

r[type.closure.capture.precision.edition2018.wildcard]
Regardless of if the data will be read by the closure, i.e. in case of wild card patterns, if a variable defined outside the closure is mentioned within the closure the variable will be captured in its entirety.

r[type.closure.capture.precision.edition2018.drop-order]
### Drop order difference

As composite types are captured in their entirety, a closure which captures one of those composite types by value would drop the entire captured variable at the same time as the closure gets dropped.

```rust
{
    let tuple =
      (String::from("foo"), String::from("bar"));
    {
        let c = || { // --------------------------+
            // tuple is captured into the closure |
            drop(tuple.0); //                     |
        }; //                                     |
    } // 'c' and 'tuple' dropped here ------------+
}
```
