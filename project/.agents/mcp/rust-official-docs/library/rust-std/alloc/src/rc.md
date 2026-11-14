---
title: "alloc::rc (part 1 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/rc.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::rc

Single-threaded reference-counting pointers. 'Rc' stands for 'Reference
Counted'.

The type `Rc<T>``Rc` provides shared ownership of a value of type `T`,
allocated in the heap. Invoking `clone`[clone] on `Rc` produces a new
pointer to the same allocation in the heap. When the last `Rc` pointer to a
given allocation is destroyed, the value stored in that allocation (often
referred to as "inner value") is also dropped.

Shared references in Rust disallow mutation by default, and `Rc`
is no exception: you cannot generally obtain a mutable reference to
something inside an `Rc`. If you need mutability, put a `Cell`
or `RefCell` inside the `Rc`; see an example of mutability
inside an `Rc`.

`Rc` uses non-atomic reference counting. This means that overhead is very
low, but an `Rc` cannot be sent between threads, and consequently `Rc`
does not implement `Send`. As a result, the Rust compiler
will check *at compile time* that you are not sending `Rc`s between
threads. If you need multi-threaded, atomic reference counting, use
`sync::Arc`[arc].

The `downgrade`[downgrade] method can be used to create a non-owning
`Weak` pointer. A `Weak` pointer can be `upgrade`[upgrade]d
to an `Rc`, but this will return `None` if the value stored in the allocation has
already been dropped. In other words, `Weak` pointers do not keep the value
inside the allocation alive; however, they *do* keep the allocation
(the backing store for the inner value) alive.

A cycle between `Rc` pointers will never be deallocated. For this reason,
`Weak` is used to break cycles. For example, a tree could have strong
`Rc` pointers from parent nodes to children, and `Weak` pointers from
children back to their parents.

`Rc<T>` automatically dereferences to `T` (via the `Deref` trait),
so you can call `T`'s methods on a value of type `Rc<T>``Rc`. To avoid name
clashes with `T`'s methods, the methods of `Rc<T>``Rc` itself are associated
functions, called using [fully qualified syntax]:

```rust
use std::rc::Rc;

let my_rc = Rc::new(());
let my_weak = Rc::downgrade(&my_rc);
```

`Rc<T>`'s implementations of traits like `Clone` may also be called using
fully qualified syntax. Some people prefer to use fully qualified syntax,
while others prefer using method-call syntax.

```rust
use std::rc::Rc;

let rc = Rc::new(());
// Method-call syntax
let rc2 = rc.clone();
// Fully qualified syntax
let rc3 = Rc::clone(&rc);
```

`Weak<T>``Weak` does not auto-dereference to `T`, because the inner value may have
already been dropped.

#### Cloning references

Creating a new reference to the same allocation as an existing reference counted pointer
is done using the `Clone` trait implemented for `Rc<T>``Rc` and `Weak<T>``Weak`.

```rust
use std::rc::Rc;

let foo = Rc::new(vec![1.0, 2.0, 3.0]);
// The two syntaxes below are equivalent.
let a = foo.clone();
let b = Rc::clone(&foo);
// a and b both point to the same memory location as foo.
```

The `Rc::clone(&from)` syntax is the most idiomatic because it conveys more explicitly
the meaning of the code. In the example above, this syntax makes it easier to see that
this code is creating a new reference rather than copying the whole content of foo.

#### Examples

Consider a scenario where a set of `Gadget`s are owned by a given `Owner`.
We want to have our `Gadget`s point to their `Owner`. We can't do this with
unique ownership, because more than one gadget may belong to the same
`Owner`. `Rc` allows us to share an `Owner` between multiple `Gadget`s,
and have the `Owner` remain allocated as long as any `Gadget` points at it.

```rust
use std::rc::Rc;

struct Owner {
    name: String,
    // ...other fields
}

struct Gadget {
    id: i32,
    owner: Rc<Owner>,
    // ...other fields
}

fn main() {
    // Create a reference-counted `Owner`.
    let gadget_owner: Rc<Owner> = Rc::new(
        Owner {
            name: "Gadget Man".to_string(),
        }
    );

    // Create `Gadget`s belonging to `gadget_owner`. Cloning the `Rc<Owner>`
    // gives us a new pointer to the same `Owner` allocation, incrementing
    // the reference count in the process.
    let gadget1 = Gadget {
        id: 1,
        owner: Rc::clone(&gadget_owner),
    };
    let gadget2 = Gadget {
        id: 2,
        owner: Rc::clone(&gadget_owner),
    };

    // Dispose of our local variable `gadget_owner`.
    drop(gadget_owner);

    // Despite dropping `gadget_owner`, we're still able to print out the name
    // of the `Owner` of the `Gadget`s. This is because we've only dropped a
    // single `Rc<Owner>`, not the `Owner` it points to. As long as there are
    // other `Rc<Owner>` pointing at the same `Owner` allocation, it will remain
    // live. The field projection `gadget1.owner.name` works because
    // `Rc<Owner>` automatically dereferences to `Owner`.
    println!("Gadget {} owned by {}", gadget1.id, gadget1.owner.name);
    println!("Gadget {} owned by {}", gadget2.id, gadget2.owner.name);

    // At the end of the function, `gadget1` and `gadget2` are destroyed, and
    // with them the last counted references to our `Owner`. Gadget Man now
    // gets destroyed as well.
}
```

If our requirements change, and we also need to be able to traverse from
`Owner` to `Gadget`, we will run into problems. An `Rc` pointer from `Owner`
to `Gadget` introduces a cycle. This means that their
reference counts can never reach 0, and the allocation will never be destroyed:
a memory leak. In order to get around this, we can use `Weak`
pointers.

Rust actually makes it somewhat difficult to produce this loop in the first
place. In order to end up with two values that point at each other, one of
them needs to be mutable. This is difficult because `Rc` enforces
memory safety by only giving out shared references to the value it wraps,
and these don't allow direct mutation. We need to wrap the part of the
value we wish to mutate in a `RefCell`, which provides *interior
mutability*: a method to achieve mutability through a shared reference.
`RefCell` enforces Rust's borrowing rules at runtime.

```rust
use std::rc::Rc;
use std::rc::Weak;
use std::cell::RefCell;

struct Owner {
    name: String,
    gadgets: RefCell<Vec<Weak<Gadget>>>,
    // ...other fields
}

struct Gadget {
    id: i32,
    owner: Rc<Owner>,
    // ...other fields
}

fn main() {
    // Create a reference-counted `Owner`. Note that we've put the `Owner`'s
    // vector of `Gadget`s inside a `RefCell` so that we can mutate it through
    // a shared reference.
    let gadget_owner: Rc<Owner> = Rc::new(
        Owner {
            name: "Gadget Man".to_string(),
            gadgets: RefCell::new(vec![]),
        }
    );

    // Create `Gadget`s belonging to `gadget_owner`, as before.
    let gadget1 = Rc::new(
        Gadget {
            id: 1,
            owner: Rc::clone(&gadget_owner),
        }
    );
    let gadget2 = Rc::new(
        Gadget {
            id: 2,
            owner: Rc::clone(&gadget_owner),
        }
    );

    // Add the `Gadget`s to their `Owner`.
    {
        let mut gadgets = gadget_owner.gadgets.borrow_mut();
        gadgets.push(Rc::downgrade(&gadget1));
        gadgets.push(Rc::downgrade(&gadget2));

        // `RefCell` dynamic borrow ends here.
    }

    // Iterate over our `Gadget`s, printing their details out.
    for gadget_weak in gadget_owner.gadgets.borrow().iter() {

        // `gadget_weak` is a `Weak<Gadget>`. Since `Weak` pointers can't
        // guarantee the allocation still exists, we need to call
        // `upgrade`, which returns an `Option<Rc<Gadget>>`.
        //
        // In this case we know the allocation still exists, so we simply
        // `unwrap` the `Option`. In a more complicated program, you might
        // need graceful error handling for a `None` result.

        let gadget = gadget_weak.upgrade().unwrap();
        println!("Gadget {} owned by {}", gadget.id, gadget.owner.name);
    }

    // At the end of the function, `gadget_owner`, `gadget1`, and `gadget2`
    // are destroyed. There are now no strong (`Rc`) pointers to the
    // gadgets, so they are destroyed. This zeroes the reference count on
    // Gadget Man, so he gets destroyed as well.
}
```

## Rc::new

```rust
pub fn new(value: T) -> Rc<T>
```

Constructs a new `Rc<T>`.

# Examples

```rust
use std::rc::Rc;

let five = Rc::new(5);
```

## Rc::new_cyclic

```rust
pub fn new_cyclic<F>(data_fn: F) -> Rc<T> where F: FnOnce(&Weak<T>) -> T,
```

Constructs a new `Rc<T>` while giving you a `Weak<T>` to the allocation,
to allow you to construct a `T` which holds a weak pointer to itself.

Generally, a structure circularly referencing itself, either directly or
indirectly, should not hold a strong reference to itself to prevent a memory leak.
Using this function, you get access to the weak pointer during the
initialization of `T`, before the `Rc<T>` is created, such that you can
clone and store it inside the `T`.

`new_cyclic` first allocates the managed allocation for the `Rc<T>`,
then calls your closure, giving it a `Weak<T>` to this allocation,
and only afterwards completes the construction of the `Rc<T>` by placing
the `T` returned from your closure into the allocation.

Since the new `Rc<T>` is not fully-constructed until `Rc<T>::new_cyclic`
returns, calling `upgrade` on the weak reference inside your closure will
fail and result in a `None` value.

# Panics

If `data_fn` panics, the panic is propagated to the caller, and the
temporary `Weak<T>` is dropped normally.

# Examples

```rust
use std::rc::{Rc, Weak};

struct Gadget {
    me: Weak<Gadget>,
}

impl Gadget {
    /// Constructs a reference counted Gadget.
    fn new() -> Rc<Self> {
        // `me` is a `Weak<Gadget>` pointing at the new allocation of the
        // `Rc` we're constructing.
        Rc::new_cyclic(|me| {
            // Create the actual struct here.
            Gadget { me: me.clone() }
        })
    }

    /// Returns a reference counted pointer to Self.
    fn me(&self) -> Rc<Self> {
        self.me.upgrade().unwrap()
    }
}
```

## Rc::new_uninit

```rust
pub fn new_uninit() -> Rc<mem::MaybeUninit<T>>
```

Constructs a new `Rc` with uninitialized contents.

# Examples

```rust
use std::rc::Rc;

let mut five = Rc::<u32>::new_uninit();

// Deferred initialization:
Rc::get_mut(&mut five).unwrap().write(5);

let five = unsafe { five.assume_init() };

assert_eq!(*five, 5)
```

## Rc::new_zeroed

```rust
pub fn new_zeroed() -> Rc<mem::MaybeUninit<T>>
```

Constructs a new `Rc` with uninitialized contents, with the memory
being filled with `0` bytes.

See `MaybeUninit::zeroed`[zeroed] for examples of correct and
incorrect usage of this method.

# Examples

```rust
use std::rc::Rc;

let zero = Rc::<u32>::new_zeroed();
let zero = unsafe { zero.assume_init() };

assert_eq!(*zero, 0)
```

## Rc::pin

```rust
pub fn pin(value: T) -> Pin<Rc<T>>
```

Constructs a new `Pin<Rc<T>>`. If `T` does not implement `Unpin`, then
`value` will be pinned in memory and unable to be moved.

## Rc::try_unwrap

```rust
pub fn try_unwrap(this: Self) -> Result<T, Self>
```

Returns the inner value, if the `Rc` has exactly one strong reference.

Otherwise, an `Err` is returned with the same `Rc` that was
passed in.

This will succeed even if there are outstanding weak references.

# Examples

```rust
use std::rc::Rc;

let x = Rc::new(3);
assert_eq!(Rc::try_unwrap(x), Ok(3));

let x = Rc::new(4);
let _y = Rc::clone(&x);
assert_eq!(*Rc::try_unwrap(x).unwrap_err(), 4);
```

## Rc::into_inner

```rust
pub fn into_inner(this: Self) -> Option<T>
```

Returns the inner value, if the `Rc` has exactly one strong reference.

Otherwise, `None` is returned and the `Rc` is dropped.

This will succeed even if there are outstanding weak references.

If `Rc::into_inner` is called on every clone of this `Rc`,
it is guaranteed that exactly one of the calls returns the inner value.
This means in particular that the inner value is not dropped.

`Rc::try_unwrap` is conceptually similar to `Rc::into_inner`.
And while they are meant for different use-cases, `Rc::into_inner(this)`
is in fact equivalent to `[Rc::try_unwrap]\(this).[ok]Result::ok`.
(Note that the same kind of equivalence does **not** hold true for
`Arc`, due to race conditions that do not apply to `Rc`!)

# Examples

```rust
use std::rc::Rc;

let x = Rc::new(3);
assert_eq!(Rc::into_inner(x), Some(3));

let x = Rc::new(4);
let y = Rc::clone(&x);

assert_eq!(Rc::into_inner(y), None);
assert_eq!(Rc::into_inner(x), Some(4));
```

## Rc::map

```rust
pub fn map<U>(this: Self, f: impl FnOnce(&T) -> U) -> Rc<U, A>
```

Maps the value in an `Rc`, reusing the allocation if possible.

`f` is called on a reference to the value in the `Rc`, and the result is returned, also in
an `Rc`.

Note: this is an associated function, which means that you have
to call it as `Rc::map(r, f)` instead of `r.map(f)`. This
is so that there is no conflict with a method on the inner type.

# Examples

```rust
use std::rc::Rc;

let r = Rc::new(7);
let new = Rc::map(r, |i| i + 7);
assert_eq!(*new, 14);
```

## Rc::new_uninit_slice

```rust
pub fn new_uninit_slice(len: usize) -> Rc<[mem::MaybeUninit<T>]>
```

Constructs a new reference-counted slice with uninitialized contents.

# Examples

```rust
use std::rc::Rc;

let mut values = Rc::<[u32]>::new_uninit_slice(3);

// Deferred initialization:
let data = Rc::get_mut(&mut values).unwrap();
data[0].write(1);
data[1].write(2);
data[2].write(3);

let values = unsafe { values.assume_init() };

assert_eq!(*values, [1, 2, 3])
```

## Rc::new_zeroed_slice

```rust
pub fn new_zeroed_slice(len: usize) -> Rc<[mem::MaybeUninit<T>]>
```

Constructs a new reference-counted slice with uninitialized contents, with the memory being
filled with `0` bytes.

See `MaybeUninit::zeroed`[zeroed] for examples of correct and
incorrect usage of this method.

# Examples

```rust
use std::rc::Rc;

let values = Rc::<[u32]>::new_zeroed_slice(3);
let values = unsafe { values.assume_init() };

assert_eq!(*values, [0, 0, 0])
```

## Rc::assume_init

```rust
pub unsafe fn assume_init(self) -> Rc<T, A>
```

Converts to `Rc<T>`.

# Safety

As with `MaybeUninit::assume_init`,
it is up to the caller to guarantee that the inner value
really is in an initialized state.
Calling this when the content is not yet fully initialized
causes immediate undefined behavior.

# Examples

```rust
use std::rc::Rc;

let mut five = Rc::<u32>::new_uninit();

// Deferred initialization:
Rc::get_mut(&mut five).unwrap().write(5);

let five = unsafe { five.assume_init() };

assert_eq!(*five, 5)
```
