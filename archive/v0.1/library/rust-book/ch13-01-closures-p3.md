---
title: "ch13-01-closures (part 3 of 3)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch13-01-closures.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch13-01-closures (part 3 of 3)

### Capturing References or Moving Ownership

Closures can capture values from their environment in three ways, which
directly map to the three ways a function can take a parameter: borrowing
immutably, borrowing mutably, and taking ownership. The closure will decide
which of these to use based on what the body of the function does with the
captured values.

In Listing 13-4, we define a closure that captures an immutable reference to
the vector named `list` because it only needs an immutable reference to print
the value.

**Listing 13-4: Defining and calling a closure that captures an immutable reference** (src/main.rs)

```rust
fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    let only_borrows = || println!("From closure: {list:?}");

    println!("Before calling closure: {list:?}");
    only_borrows();
    println!("After calling closure: {list:?}");
}
```

This example also illustrates that a variable can bind to a closure definition,
and we can later call the closure by using the variable name and parentheses as
if the variable name were a function name.

Because we can have multiple immutable references to `list` at the same time,
`list` is still accessible from the code before the closure definition, after
the closure definition but before the closure is called, and after the closure
is called. This code compiles, runs, and prints:

```console
$ cargo run
   Compiling closure-example v0.1.0 (file:///projects/closure-example)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.43s
     Running `target/debug/closure-example`
Before defining closure: [1, 2, 3]
Before calling closure: [1, 2, 3]
From closure: [1, 2, 3]
After calling closure: [1, 2, 3]
```

Next, in Listing 13-5, we change the closure body so that it adds an element to
the `list` vector. The closure now captures a mutable reference.

**Listing 13-5: Defining and calling a closure that captures a mutable reference** (src/main.rs)

```rust
fn main() {
    let mut list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    let mut borrows_mutably = || list.push(7);

    borrows_mutably();
    println!("After calling closure: {list:?}");
}
```

This code compiles, runs, and prints:

```console
$ cargo run
   Compiling closure-example v0.1.0 (file:///projects/closure-example)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.43s
     Running `target/debug/closure-example`
Before defining closure: [1, 2, 3]
After calling closure: [1, 2, 3, 7]
```

Note that there’s no longer a `println!` between the definition and the call of
the `borrows_mutably` closure: When `borrows_mutably` is defined, it captures a
mutable reference to `list`. We don’t use the closure again after the closure
is called, so the mutable borrow ends. Between the closure definition and the
closure call, an immutable borrow to print isn’t allowed, because no other
borrows are allowed when there’s a mutable borrow. Try adding a `println!`
there to see what error message you get!

If you want to force the closure to take ownership of the values it uses in the
environment even though the body of the closure doesn’t strictly need
ownership, you can use the `move` keyword before the parameter list.

This technique is mostly useful when passing a closure to a new thread to move
the data so that it’s owned by the new thread. We’ll discuss threads and why
you would want to use them in detail in Chapter 16 when we talk about
concurrency, but for now, let’s briefly explore spawning a new thread using a
closure that needs the `move` keyword. Listing 13-6 shows Listing 13-4 modified
to print the vector in a new thread rather than in the main thread.

**Listing 13-6: Using `move` to force the closure for the thread to take ownership of `list`** (src/main.rs)

```rust
use std::thread;

fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    thread::spawn(move || println!("From thread: {list:?}"))
        .join()
        .unwrap();
}
```

We spawn a new thread, giving the thread a closure to run as an argument. The
closure body prints out the list. In Listing 13-4, the closure only captured
`list` using an immutable reference because that's the least amount of access
to `list` needed to print it. In this example, even though the closure body
still only needs an immutable reference, we need to specify that `list` should
be moved into the closure by putting the `move` keyword at the beginning of the
closure definition. If the main thread performed more operations before calling
`join` on the new thread, the new thread might finish before the rest of the
main thread finishes, or the main thread might finish first. If the main thread
maintained ownership of `list` but ended before the new thread and drops
`list`, the immutable reference in the thread would be invalid. Therefore, the
compiler requires that `list` be moved into the closure given to the new thread
so that the reference will be valid. Try removing the `move` keyword or using
`list` in the main thread after the closure is defined to see what compiler
errors you get!

### Moving Captured Values Out of Closures

Once a closure has captured a reference or captured ownership of a value from
the environment where the closure is defined (thus affecting what, if anything,
is moved _into_ the closure), the code in the body of the closure defines what
happens to the references or values when the closure is evaluated later (thus
affecting what, if anything, is moved _out of_ the closure).

A closure body can do any of the following: Move a captured value out of the
closure, mutate the captured value, neither move nor mutate the value, or
capture nothing from the environment to begin with.

The way a closure captures and handles values from the environment affects
which traits the closure implements, and traits are how functions and structs
can specify what kinds of closures they can use. Closures will automatically
implement one, two, or all three of these `Fn` traits, in an additive fashion,
depending on how the closure’s body handles the values:

* `FnOnce` applies to closures that can be called once. All closures implement
  at least this trait because all closures can be called. A closure that moves
  captured values out of its body will only implement `FnOnce` and none of the
  other `Fn` traits because it can only be called once.
* `FnMut` applies to closures that don’t move captured values out of their body
  but might mutate the captured values. These closures can be called more than
  once.
* `Fn` applies to closures that don’t move captured values out of their body
  and don’t mutate captured values, as well as closures that capture nothing
  from their environment. These closures can be called more than once without
  mutating their environment, which is important in cases such as calling a closure multiple times concurrently.

Let’s look at the definition of the `unwrap_or_else` method on `Option<T>` that
we used in Listing 13-1:

```rust
impl<T> Option<T> {
    pub fn unwrap_or_else<F>(self, f: F) -> T
    where
        F: FnOnce() -> T
    {
        match self {
            Some(x) => x,
            None => f(),
        }
    }
}
```

Recall that `T` is the generic type representing the type of the value in the
`Some` variant of an `Option`. That type `T` is also the return type of the
`unwrap_or_else` function: Code that calls `unwrap_or_else` on an
`Option<String>`, for example, will get a `String`.

Next, notice that the `unwrap_or_else` function has the additional generic type
parameter `F`. The `F` type is the type of the parameter named `f`, which is
the closure we provide when calling `unwrap_or_else`.

The trait bound specified on the generic type `F` is `FnOnce() -> T`, which
means `F` must be able to be called once, take no arguments, and return a `T`.
Using `FnOnce` in the trait bound expresses the constraint that
`unwrap_or_else` will not call `f` more than once. In the body of
`unwrap_or_else`, we can see that if the `Option` is `Some`, `f` won’t be
called. If the `Option` is `None`, `f` will be called once. Because all
closures implement `FnOnce`, `unwrap_or_else` accepts all three kinds of
closures and is as flexible as it can be.

> Note: If what we want to do doesn’t require capturing a value from the
> environment, we can use the name of a function rather than a closure where we
> need something that implements one of the `Fn` traits. For example, on an
> `Option<Vec<T>>` value, we could call `unwrap_or_else(Vec::new)` to get a
> new, empty vector if the value is `None`. The compiler automatically
> implements whichever of the `Fn` traits is applicable for a function
> definition.

Now let’s look at the standard library method `sort_by_key`, defined on slices,
to see how that differs from `unwrap_or_else` and why `sort_by_key` uses
`FnMut` instead of `FnOnce` for the trait bound. The closure gets one argument
in the form of a reference to the current item in the slice being considered,
and it returns a value of type `K` that can be ordered. This function is useful
when you want to sort a slice by a particular attribute of each item. In
Listing 13-7, we have a list of `Rectangle` instances, and we use `sort_by_key`
to order them by their `width` attribute from low to high.

**Listing 13-7: Using `sort_by_key` to order rectangles by width** (src/main.rs)

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let mut list = [
        Rectangle { width: 10, height: 1 },
        Rectangle { width: 3, height: 5 },
        Rectangle { width: 7, height: 12 },
    ];

    list.sort_by_key(|r| r.width);
    println!("{list:#?}");
}
```

This code prints:

```console
$ cargo run
   Compiling rectangles v0.1.0 (file:///projects/rectangles)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.41s
     Running `target/debug/rectangles`
[
    Rectangle {
        width: 3,
        height: 5,
    },
    Rectangle {
        width: 7,
        height: 12,
    },
    Rectangle {
        width: 10,
        height: 1,
    },
]
```

The reason `sort_by_key` is defined to take an `FnMut` closure is that it calls
the closure multiple times: once for each item in the slice. The closure `|r|
r.width` doesn’t capture, mutate, or move anything out from its environment, so
it meets the trait bound requirements.

In contrast, Listing 13-8 shows an example of a closure that implements just
the `FnOnce` trait, because it moves a value out of the environment. The
compiler won’t let us use this closure with `sort_by_key`.

**Listing 13-8: Attempting to use an `FnOnce` closure with `sort_by_key`** (src/main.rs)

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let mut list = [
        Rectangle { width: 10, height: 1 },
        Rectangle { width: 3, height: 5 },
        Rectangle { width: 7, height: 12 },
    ];

    let mut sort_operations = vec![];
    let value = String::from("closure called");

    list.sort_by_key(|r| {
        sort_operations.push(value);
        r.width
    });
    println!("{list:#?}");
}
```

This is a contrived, convoluted way (that doesn’t work) to try to count the
number of times `sort_by_key` calls the closure when sorting `list`. This code
attempts to do this counting by pushing `value`—a `String` from the closure’s
environment—into the `sort_operations` vector. The closure captures `value` and
then moves `value` out of the closure by transferring ownership of `value` to
the `sort_operations` vector. This closure can be called once; trying to call
it a second time wouldn’t work, because `value` would no longer be in the
environment to be pushed into `sort_operations` again! Therefore, this closure
only implements `FnOnce`. When we try to compile this code, we get this error
that `value` can’t be moved out of the closure because the closure must
implement `FnMut`:

```console
$ cargo run
   Compiling rectangles v0.1.0 (file:///projects/rectangles)
error[E0507]: cannot move out of `value`, a captured variable in an `FnMut` closure
  --> src/main.rs:18:30
   |
15 |     let value = String::from("closure called");
   |         -----   ------------------------------ move occurs because `value` has type `String`, which does not implement the `Copy` trait
   |         |
   |         captured outer variable
16 |
17 |     list.sort_by_key(|r| {
   |                      --- captured by this `FnMut` closure
18 |         sort_operations.push(value);
   |                              ^^^^^ `value` is moved here
   |
help: `Fn` and `FnMut` closures require captured values to be able to be consumed multiple times, but `FnOnce` closures may consume them only once
  --> /rustc/58cf8f9c35b355199727627d07ae34a4e2846d67/library/alloc/src/slice.rs:249:11
help: consider cloning the value if the performance cost is acceptable
   |
18 |         sort_operations.push(value.clone());
   |                                   ++++++++

For more information about this error, try `rustc --explain E0507`.
error: could not compile `rectangles` (bin "rectangles") due to 1 previous error
```

The error points to the line in the closure body that moves `value` out of the
environment. To fix this, we need to change the closure body so that it doesn’t
move values out of the environment. Keeping a counter in the environment and
incrementing its value in the closure body is a more straightforward way to
count the number of times the closure is called. The closure in Listing 13-9
works with `sort_by_key` because it is only capturing a mutable reference to the
`num_sort_operations` counter and can therefore be called more than once.

**Listing 13-9: Using an `FnMut` closure with `sort_by_key` is allowed.** (src/main.rs)

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let mut list = [
        Rectangle { width: 10, height: 1 },
        Rectangle { width: 3, height: 5 },
        Rectangle { width: 7, height: 12 },
    ];

    let mut num_sort_operations = 0;
    list.sort_by_key(|r| {
        num_sort_operations += 1;
        r.width
    });
    println!("{list:#?}, sorted in {num_sort_operations} operations");
}
```

The `Fn` traits are important when defining or using functions or types that
make use of closures. In the next section, we’ll discuss iterators. Many
iterator methods take closure arguments, so keep these closure details in mind
as we continue!
