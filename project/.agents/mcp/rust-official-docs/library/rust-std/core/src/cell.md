---
title: "core::cell (part 1 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/cell.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::cell

Shareable mutable containers.

Rust memory safety is based on this rule: Given an object `T`, it is only possible to
have one of the following:

- Several immutable references (`&T`) to the object (also known as **aliasing**).
- One mutable reference (`&mut T`) to the object (also known as **mutability**).

This is enforced by the Rust compiler. However, there are situations where this rule is not
flexible enough. Sometimes it is required to have multiple references to an object and yet
mutate it.

Shareable mutable containers exist to permit mutability in a controlled manner, even in the
presence of aliasing. `Cell<T>`, `RefCell<T>`, and `OnceCell<T>` allow doing this in
a single-threaded way—they do not implement `Sync`. (If you need to do aliasing and
mutation among multiple threads, `Mutex<T>`, `RwLock<T>`, `OnceLock<T>` or `atomic`
types are the correct data structures to do so).

Values of the `Cell<T>`, `RefCell<T>`, and `OnceCell<T>` types may be mutated through shared
references (i.e. the common `&T` type), whereas most Rust types can only be mutated through
unique (`&mut T`) references. We say these cell types provide 'interior mutability'
(mutable via `&T`), in contrast with typical Rust types that exhibit 'inherited mutability'
(mutable only via `&mut T`).

Cell types come in four flavors: `Cell<T>`, `RefCell<T>`, `OnceCell<T>`, and `LazyCell<T>`.
Each provides a different way of providing safe interior mutability.

#### `Cell<T>`

`Cell<T>` implements interior mutability by moving values in and out of the cell. That is, a
`&T` to the inner value can never be obtained, and the value itself cannot be directly
obtained without replacing it with something else. This type provides the following
methods:

 - For types that implement `Copy`, the `get` method retrieves the current
   interior value by duplicating it.
 - For types that implement `Default`, the `take` method replaces the current
   interior value with `Default::default()` and returns the replaced value.
 - All types have:
   - `replace`: replaces the current interior value and returns the replaced
     value.
   - `into_inner`: this method consumes the `Cell<T>` and returns the
     interior value.
   - `set`: this method replaces the interior value, dropping the replaced value.

`Cell<T>` is typically used for more simple types where copying or moving values isn't too
resource intensive (e.g. numbers), and should usually be preferred over other cell types when
possible. For larger and non-copy types, `RefCell` provides some advantages.

#### `RefCell<T>`

`RefCell<T>` uses Rust's lifetimes to implement "dynamic borrowing", a process whereby one can
claim temporary, exclusive, mutable access to the inner value. Borrows for `RefCell<T>`s are
tracked at _runtime_, unlike Rust's native reference types which are entirely tracked
statically, at compile time.

An immutable reference to a `RefCell`'s inner value (`&T`) can be obtained with
`borrow`, and a mutable borrow (`&mut T`) can be obtained with
`borrow_mut`. When these functions are called, they first verify that
Rust's borrow rules will be satisfied: any number of immutable borrows are allowed or a
single mutable borrow is allowed, but never both. If a borrow is attempted that would violate
these rules, the thread will panic.

The corresponding `Sync` version of `RefCell<T>` is `RwLock<T>`.

#### `OnceCell<T>`

`OnceCell<T>` is somewhat of a hybrid of `Cell` and `RefCell` that works for values that
typically only need to be set once. This means that a reference `&T` can be obtained without
moving or copying the inner value (unlike `Cell`) but also without runtime checks (unlike
`RefCell`). However, once set, its value cannot be updated unless you have a mutable
reference to the `OnceCell`.

`OnceCell` provides the following methods:

- `get`: obtain a reference to the inner value
- `set`: set the inner value if it is unset (returns a `Result`)
- `get_or_init`: return the inner value, initializing it if needed
- `get_mut`: provide a mutable reference to the inner value, only available
  if you have a mutable reference to the cell itself.

The corresponding `Sync` version of `OnceCell<T>` is `OnceLock<T>`.

#### `LazyCell<T, F>`

A common pattern with OnceCell is, for a given OnceCell, to use the same function on every
call to `OnceCell::get_or_init` with that cell. This is what is offered by `LazyCell`,
which pairs cells of `T` with functions of `F`, and always calls `F` before it yields `&T`.
This happens implicitly by simply attempting to dereference the LazyCell to get its contents,
so its use is much more transparent with a place which has been initialized by a constant.

More complicated patterns that don't fit this description can be built on `OnceCell<T>` instead.

`LazyCell` works by providing an implementation of `impl Deref` that calls the function,
so you can just use it by dereference (e.g. `*lazy_cell` or `lazy_cell.deref()`).

The corresponding `Sync` version of `LazyCell<T, F>` is `LazyLock<T, F>`.

#### When to choose interior mutability

The more common inherited mutability, where one must have unique access to mutate a value, is
one of the key <example-value> elements that enables Rust to reason strongly about pointer aliasing,
statically preventing crash bugs. Because of that, inherited mutability is preferred, and
interior mutability is something of a last resort. Since cell types enable mutation where it
would otherwise be disallowed though, there are occasions when interior mutability might be
appropriate, or even *must* be used, e.g.

* Introducing mutability 'inside' of something immutable
* Implementation details of logically-immutable methods.
* Mutating implementations of `Clone`.

#### Introducing mutability 'inside' of something immutable

Many shared smart pointer types, including `Rc<T>` and `Arc<T>`, provide containers that can
be cloned and shared between multiple parties. Because the contained values may be
multiply-aliased, they can only be borrowed with `&`, not `&mut`. Without cells it would be
impossible to mutate data inside of these smart pointers at all.

It's very common then to put a `RefCell<T>` inside shared pointer types to reintroduce
mutability:

```rust
use std::cell::{RefCell, RefMut};
use std::collections::HashMap;
use std::rc::Rc;

fn main() {
    let shared_map: Rc<RefCell<_>> = Rc::new(RefCell::new(HashMap::new()));
    // Create a new block to limit the scope of the dynamic borrow
    {
        let mut map: RefMut<'_, _> = shared_map.borrow_mut();
        map.insert("africa", 92388);
        map.insert("kyoto", 11837);
        map.insert("piccadilly", 11826);
        map.insert("marbles", 38);
    }

    // Note that if we had not let the previous borrow of the cache fall out
    // of scope then the subsequent borrow would cause a dynamic thread panic.
    // This is the major hazard of using `RefCell`.
    let total: i32 = shared_map.borrow().values().sum();
    println!("{total}");
}
```

Note that this example uses `Rc<T>` and not `Arc<T>`. `RefCell<T>`s are for single-threaded
scenarios. Consider using `RwLock<T>` or `Mutex<T>` if you need shared mutability in a
multi-threaded situation.

#### Implementation details of logically-immutable methods

Occasionally it may be desirable not to expose in an API that there is mutation happening
"under the hood". This may be because logically the operation is immutable, but e.g., caching
forces the implementation to perform mutation; or because you must employ mutation to implement
a trait method that was originally defined to take `&self`.

```rust
use std::cell::OnceCell;

struct Graph {
    edges: Vec<(i32, i32)>,
    span_tree_cache: OnceCell<Vec<(i32, i32)>>
}

impl Graph {
    fn minimum_spanning_tree(&self) -> Vec<(i32, i32)> {
        self.span_tree_cache
            .get_or_init(|| self.calc_span_tree())
            .clone()
    }

    fn calc_span_tree(&self) -> Vec<(i32, i32)> {
        // Expensive computation goes here
        vec![]
    }
}
```

#### Mutating implementations of `Clone`

This is simply a special - but common - case of the previous: hiding mutability for operations
that appear to be immutable. The `clone` method is expected to not change the
source value, and is declared to take `&self`, not `&mut self`. Therefore, any mutation that
happens in the `clone` method must use cell types. For example, `Rc<T>` maintains its
reference counts within a `Cell<T>`.

```rust
use std::cell::Cell;
use std::ptr::NonNull;
use std::process::abort;
use std::marker::PhantomData;

struct Rc<T: ?Sized> {
    ptr: NonNull<RcInner<T>>,
    phantom: PhantomData<RcInner<T>>,
}

struct RcInner<T: ?Sized> {
    strong: Cell<usize>,
    refcount: Cell<usize>,
    value: T,
}

impl<T: ?Sized> Clone for Rc<T> {
    fn clone(&self) -> Rc<T> {
        self.inc_strong();
        Rc {
            ptr: self.ptr,
            phantom: PhantomData,
        }
    }
}

trait RcInnerPtr<T: ?Sized> {

    fn inner(&self) -> &RcInner<T>;

    fn strong(&self) -> usize {
        self.inner().strong.get()
    }

    fn inc_strong(&self) {
        self.inner()
            .strong
            .set(self.strong()
                     .checked_add(1)
                     .unwrap_or_else(|| abort() ));
    }
}

impl<T: ?Sized> RcInnerPtr<T> for Rc<T> {
   fn inner(&self) -> &RcInner<T> {
       unsafe {
           self.ptr.as_ref()
       }
   }
}
```

## struct Cell

```rust
pub struct Cell<T: ?Sized>
```

A mutable memory location.

# Memory layout

`Cell<T>` has the same memory layout and caveats as
`UnsafeCell<T>`. In particular, this means that
`Cell<T>` has the same in-memory representation as its inner type `T`.

# Examples

In this example, you can see that `Cell<T>` enables mutation inside an
immutable struct. In other words, it enables "interior mutability".

```rust
use std::cell::Cell;

struct SomeStruct {
    regular_field: u8,
    special_field: Cell<u8>,
}

let my_struct = SomeStruct {
    regular_field: 0,
    special_field: Cell::new(1),
};

let new_value = 100;

// ERROR: `my_struct` is immutable
// my_struct.regular_field = new_value;

// WORKS: although `my_struct` is immutable, `special_field` is a `Cell`,
// which can always be mutated
my_struct.special_field.set(new_value);
assert_eq!(my_struct.special_field.get(), new_value);
```

See the module-level documentation for more.

## Cell::new

```rust
pub const fn new(value: T) -> Cell<T>
```

Creates a new `Cell` containing the given value.

# Examples

```rust
use std::cell::Cell;

let c = Cell::new(5);
```

## Cell::set

```rust
pub const fn set(&self, val: T) where T: [const] Destruct,
```

Sets the contained value.

# Examples

```rust
use std::cell::Cell;

let c = Cell::new(5);

c.set(10);
```

## Cell::swap

```rust
pub fn swap(&self, other: &Self)
```

Swaps the values of two `Cell`s.

The difference with `std::mem::swap` is that this function doesn't
require a `&mut` reference.

# Panics

This function will panic if `self` and `other` are different `Cell`s that partially overlap.
(Using just standard library methods, it is impossible to create such partially overlapping `Cell`s.
However, unsafe code is allowed to e.g. create two `&Cell<[i32; 2]>` that partially overlap.)

# Examples

```rust
use std::cell::Cell;

let c1 = Cell::new(5i32);
let c2 = Cell::new(10i32);
c1.swap(&c2);
assert_eq!(10, c1.get());
assert_eq!(5, c2.get());
```

## Cell::replace

```rust
pub const fn replace(&self, val: T) -> T
```

Replaces the contained value with `val`, and returns the old contained value.

# Examples

```rust
use std::cell::Cell;

let cell = Cell::new(5);
assert_eq!(cell.get(), 5);
assert_eq!(cell.replace(10), 5);
assert_eq!(cell.get(), 10);
```

## Cell::into_inner

```rust
pub const fn into_inner(self) -> T
```

Unwraps the value, consuming the cell.

# Examples

```rust
use std::cell::Cell;

let c = Cell::new(5);
let five = c.into_inner();

assert_eq!(five, 5);
```

## Cell::get

```rust
pub const fn get(&self) -> T
```

Returns a copy of the contained value.

# Examples

```rust
use std::cell::Cell;

let c = Cell::new(5);

let five = c.get();
```

## Cell::update

```rust
pub const fn update(&self, f: impl [const] FnOnce(T) -> T) where // FIXME(const-hack): `Copy` should imply `const Destruct` T: [const] Destruct,
```

Updates the contained value using a function.

# Examples

```rust
use std::cell::Cell;

let c = Cell::new(5);
c.update(|x| x + 1);
assert_eq!(c.get(), 6);
```

## Cell::as_ptr

```rust
pub const fn as_ptr(&self) -> *mut T
```

Returns a raw pointer to the underlying data in this cell.

# Examples

```rust
use std::cell::Cell;

let c = Cell::new(5);

let ptr = c.as_ptr();
```

## Cell::get_mut

```rust
pub const fn get_mut(&mut self) -> &mut T
```

Returns a mutable reference to the underlying data.

This call borrows `Cell` mutably (at compile-time) which guarantees
that we possess the only reference.

However be cautious: this method expects `self` to be mutable, which is
generally not the case when using a `Cell`. If you require interior
mutability by reference, consider using `RefCell` which provides
run-time checked mutable borrows through its `borrow_mut` method.

# Examples

```rust
use std::cell::Cell;

let mut c = Cell::new(5);
*c.get_mut() += 1;

assert_eq!(c.get(), 6);
```

## Cell::from_mut

```rust
pub const fn from_mut(t: &mut T) -> &Cell<T>
```

Returns a `&Cell<T>` from a `&mut T`

# Examples

```rust
use std::cell::Cell;

let slice: &mut [i32] = &mut [1, 2, 3];
let cell_slice: &Cell<[i32]> = Cell::from_mut(slice);
let slice_cell: &[Cell<i32>] = cell_slice.as_slice_of_cells();

assert_eq!(slice_cell.len(), 3);
```

## Cell::take

```rust
pub const fn take(&self) -> T where T: [const] Default,
```

Takes the value of the cell, leaving `Default::default()` in its place.

# Examples

```rust
use std::cell::Cell;

let c = Cell::new(5);
let five = c.take();

assert_eq!(five, 5);
assert_eq!(c.into_inner(), 0);
```

## Cell::as_slice_of_cells

```rust
pub const fn as_slice_of_cells(&self) -> &[Cell<T>]
```

Returns a `&[Cell<T>]` from a `&Cell<[T]>`

# Examples

```rust
use std::cell::Cell;

let slice: &mut [i32] = &mut [1, 2, 3];
let cell_slice: &Cell<[i32]> = Cell::from_mut(slice);
let slice_cell: &[Cell<i32>] = cell_slice.as_slice_of_cells();

assert_eq!(slice_cell.len(), 3);
```

## Cell::as_array_of_cells

```rust
pub const fn as_array_of_cells(&self) -> &[Cell<T>; N]
```

Returns a `&[Cell<T>; N]` from a `&Cell<[T; N]>`

# Examples

```rust
use std::cell::Cell;

let mut array: [i32; 3] = [1, 2, 3];
let cell_array: &Cell<[i32; 3]> = Cell::from_mut(&mut array);
let array_cell: &[Cell<i32>; 3] = cell_array.as_array_of_cells();
```
