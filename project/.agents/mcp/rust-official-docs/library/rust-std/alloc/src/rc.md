# alloc::rc

Single-threaded reference-counting pointers. 'Rc' stands for 'Reference
Counted'.

The type [`Rc<T>`][`Rc`] provides shared ownership of a value of type `T`,
allocated in the heap. Invoking [`clone`][clone] on [`Rc`] produces a new
pointer to the same allocation in the heap. When the last [`Rc`] pointer to a
given allocation is destroyed, the value stored in that allocation (often
referred to as "inner value") is also dropped.

Shared references in Rust disallow mutation by default, and [`Rc`]
is no exception: you cannot generally obtain a mutable reference to
something inside an [`Rc`]. If you need mutability, put a [`Cell`]
or [`RefCell`] inside the [`Rc`]; see [an example of mutability
inside an `Rc`][mutability].

[`Rc`] uses non-atomic reference counting. This means that overhead is very
low, but an [`Rc`] cannot be sent between threads, and consequently [`Rc`]
does not implement [`Send`]. As a result, the Rust compiler
will check *at compile time* that you are not sending [`Rc`]s between
threads. If you need multi-threaded, atomic reference counting, use
[`sync::Arc`][arc].

The [`downgrade`][downgrade] method can be used to create a non-owning
[`Weak`] pointer. A [`Weak`] pointer can be [`upgrade`][upgrade]d
to an [`Rc`], but this will return [`None`] if the value stored in the allocation has
already been dropped. In other words, `Weak` pointers do not keep the value
inside the allocation alive; however, they *do* keep the allocation
(the backing store for the inner value) alive.

A cycle between [`Rc`] pointers will never be deallocated. For this reason,
[`Weak`] is used to break cycles. For example, a tree could have strong
[`Rc`] pointers from parent nodes to children, and [`Weak`] pointers from
children back to their parents.

`Rc<T>` automatically dereferences to `T` (via the [`Deref`] trait),
so you can call `T`'s methods on a value of type [`Rc<T>`][`Rc`]. To avoid name
clashes with `T`'s methods, the methods of [`Rc<T>`][`Rc`] itself are associated
functions, called using [fully qualified syntax]:

```
use std::rc::Rc;

let my_rc = Rc::new(());
let my_weak = Rc::downgrade(&my_rc);
```

`Rc<T>`'s implementations of traits like `Clone` may also be called using
fully qualified syntax. Some people prefer to use fully qualified syntax,
while others prefer using method-call syntax.

```
use std::rc::Rc;

let rc = Rc::new(());
// Method-call syntax
let rc2 = rc.clone();
// Fully qualified syntax
let rc3 = Rc::clone(&rc);
```

[`Weak<T>`][`Weak`] does not auto-dereference to `T`, because the inner value may have
already been dropped.

# Cloning references

Creating a new reference to the same allocation as an existing reference counted pointer
is done using the `Clone` trait implemented for [`Rc<T>`][`Rc`] and [`Weak<T>`][`Weak`].

```
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

# Examples

Consider a scenario where a set of `Gadget`s are owned by a given `Owner`.
We want to have our `Gadget`s point to their `Owner`. We can't do this with
unique ownership, because more than one gadget may belong to the same
`Owner`. [`Rc`] allows us to share an `Owner` between multiple `Gadget`s,
and have the `Owner` remain allocated as long as any `Gadget` points at it.

```
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
`Owner` to `Gadget`, we will run into problems. An [`Rc`] pointer from `Owner`
to `Gadget` introduces a cycle. This means that their
reference counts can never reach 0, and the allocation will never be destroyed:
a memory leak. In order to get around this, we can use [`Weak`]
pointers.

Rust actually makes it somewhat difficult to produce this loop in the first
place. In order to end up with two values that point at each other, one of
them needs to be mutable. This is difficult because [`Rc`] enforces
memory safety by only giving out shared references to the value it wraps,
and these don't allow direct mutation. We need to wrap the part of the
value we wish to mutate in a [`RefCell`], which provides *interior
mutability*: a method to achieve mutability through a shared reference.
[`RefCell`] enforces Rust's borrowing rules at runtime.

```
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

[clone]: Clone::clone
[`Cell`]: core::cell::Cell
[`RefCell`]: core::cell::RefCell
[arc]: crate::sync::Arc
[`Deref`]: core::ops::Deref
[downgrade]: Rc::downgrade
[upgrade]: Weak::upgrade
[mutability]: core::cell#introducing-mutability-inside-of-something-immutable
[fully qualified syntax]: https://doc.rust-lang.org/book/ch19-03-advanced-traits.html#fully-qualified-syntax-for-disambiguation-calling-methods-with-the-same-name

## Rc::new

```rust
pub fn new(value: T) -> Rc<T>
```

Constructs a new `Rc<T>`.

# Examples

```
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
returns, calling [`upgrade`] on the weak reference inside your closure will
fail and result in a `None` value.

# Panics

If `data_fn` panics, the panic is propagated to the caller, and the
temporary [`Weak<T>`] is dropped normally.

# Examples

```
# #![allow(dead_code)]
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
[`upgrade`]: Weak::upgrade

## Rc::new_uninit

```rust
pub fn new_uninit() -> Rc<mem::MaybeUninit<T>>
```

Constructs a new `Rc` with uninitialized contents.

# Examples

```
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

See [`MaybeUninit::zeroed`][zeroed] for examples of correct and
incorrect usage of this method.

# Examples

```
use std::rc::Rc;

let zero = Rc::<u32>::new_zeroed();
let zero = unsafe { zero.assume_init() };

assert_eq!(*zero, 0)
```

[zeroed]: mem::MaybeUninit::zeroed

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

Otherwise, an [`Err`] is returned with the same `Rc` that was
passed in.

This will succeed even if there are outstanding weak references.

# Examples

```
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

Otherwise, [`None`] is returned and the `Rc` is dropped.

This will succeed even if there are outstanding weak references.

If `Rc::into_inner` is called on every clone of this `Rc`,
it is guaranteed that exactly one of the calls returns the inner value.
This means in particular that the inner value is not dropped.

[`Rc::try_unwrap`] is conceptually similar to `Rc::into_inner`.
And while they are meant for different use-cases, `Rc::into_inner(this)`
is in fact equivalent to <code>[Rc::try_unwrap]\(this).[ok][Result::ok]()</code>.
(Note that the same kind of equivalence does **not** hold true for
[`Arc`](crate::sync::Arc), due to race conditions that do not apply to `Rc`!)

# Examples

```
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

```
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

```
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

See [`MaybeUninit::zeroed`][zeroed] for examples of correct and
incorrect usage of this method.

# Examples

```
use std::rc::Rc;

let values = Rc::<[u32]>::new_zeroed_slice(3);
let values = unsafe { values.assume_init() };

assert_eq!(*values, [0, 0, 0])
```

[zeroed]: mem::MaybeUninit::zeroed

## Rc::assume_init

```rust
pub unsafe fn assume_init(self) -> Rc<T, A>
```

Converts to `Rc<T>`.

# Safety

As with [`MaybeUninit::assume_init`],
it is up to the caller to guarantee that the inner value
really is in an initialized state.
Calling this when the content is not yet fully initialized
causes immediate undefined behavior.

[`MaybeUninit::assume_init`]: mem::MaybeUninit::assume_init

# Examples

```
use std::rc::Rc;

let mut five = Rc::<u32>::new_uninit();

// Deferred initialization:
Rc::get_mut(&mut five).unwrap().write(5);

let five = unsafe { five.assume_init() };

assert_eq!(*five, 5)
```

## Rc::assume_init

```rust
pub unsafe fn assume_init(self) -> Rc<[T], A>
```

Converts to `Rc<[T]>`.

# Safety

As with [`MaybeUninit::assume_init`],
it is up to the caller to guarantee that the inner value
really is in an initialized state.
Calling this when the content is not yet fully initialized
causes immediate undefined behavior.

[`MaybeUninit::assume_init`]: mem::MaybeUninit::assume_init

# Examples

```
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

## Rc::from_raw

```rust
pub unsafe fn from_raw(ptr: *const T) -> Self
```

Constructs an `Rc<T>` from a raw pointer.

The raw pointer must have been previously returned by a call to
[`Rc<U>::into_raw`][into_raw] or [`Rc<U>::into_raw_with_allocator`][into_raw_with_allocator].

# Safety

* Creating a `Rc<T>` from a pointer other than one returned from
  [`Rc<U>::into_raw`][into_raw] or [`Rc<U>::into_raw_with_allocator`][into_raw_with_allocator]
  is undefined behavior.
* If `U` is sized, it must have the same size and alignment as `T`. This
  is trivially true if `U` is `T`.
* If `U` is unsized, its data pointer must have the same size and
  alignment as `T`. This is trivially true if `Rc<U>` was constructed
  through `Rc<T>` and then converted to `Rc<U>` through an [unsized
  coercion].
* Note that if `U` or `U`'s data pointer is not `T` but has the same size
  and alignment, this is basically like transmuting references of
  different types. See [`mem::transmute`][transmute] for more information
  on what restrictions apply in this case.
* The raw pointer must point to a block of memory allocated by the global allocator
* The user of `from_raw` has to make sure a specific value of `T` is only
  dropped once.

This function is unsafe because improper use may lead to memory unsafety,
even if the returned `Rc<T>` is never accessed.

[into_raw]: Rc::into_raw
[into_raw_with_allocator]: Rc::into_raw_with_allocator
[transmute]: core::mem::transmute
[unsized coercion]: https://doc.rust-lang.org/reference/type-coercions.html#unsized-coercions

# Examples

```
use std::rc::Rc;

let x = Rc::new("hello".to_owned());
let x_ptr = Rc::into_raw(x);

unsafe {
    // Convert back to an `Rc` to prevent leak.
    let x = Rc::from_raw(x_ptr);
    assert_eq!(&*x, "hello");

    // Further calls to `Rc::from_raw(x_ptr)` would be memory-unsafe.
}

// The memory was freed when `x` went out of scope above, so `x_ptr` is now dangling!
```

Convert a slice back into its original array:

```
use std::rc::Rc;

let x: Rc<[u32]> = Rc::new([1, 2, 3]);
let x_ptr: *const [u32] = Rc::into_raw(x);

unsafe {
    let x: Rc<[u32; 3]> = Rc::from_raw(x_ptr.cast::<[u32; 3]>());
    assert_eq!(&*x, &[1, 2, 3]);
}
```

## Rc::into_raw

```rust
pub fn into_raw(this: Self) -> *const T
```

Consumes the `Rc`, returning the wrapped pointer.

To avoid a memory leak the pointer must be converted back to an `Rc` using
[`Rc::from_raw`].

# Examples

```
use std::rc::Rc;

let x = Rc::new("hello".to_owned());
let x_ptr = Rc::into_raw(x);
assert_eq!(unsafe { &*x_ptr }, "hello");
# // Prevent leaks for Miri.
# drop(unsafe { Rc::from_raw(x_ptr) });
```

## Rc::increment_strong_count

```rust
pub unsafe fn increment_strong_count(ptr: *const T)
```

Increments the strong reference count on the `Rc<T>` associated with the
provided pointer by one.

# Safety

The pointer must have been obtained through [`Rc::into_raw`] and must satisfy the
same layout requirements specified in [`Rc::from_raw_in`].
The associated `Rc` instance must be valid (i.e. the strong count must be at
least 1) for the duration of this method, and `ptr` must point to a block of memory
allocated by the global allocator.

# Examples

```
use std::rc::Rc;

let five = Rc::new(5);

unsafe {
    let ptr = Rc::into_raw(five);
    Rc::increment_strong_count(ptr);

    let five = Rc::from_raw(ptr);
    assert_eq!(2, Rc::strong_count(&five));
#   // Prevent leaks for Miri.
#   Rc::decrement_strong_count(ptr);
}
```

## Rc::decrement_strong_count

```rust
pub unsafe fn decrement_strong_count(ptr: *const T)
```

Decrements the strong reference count on the `Rc<T>` associated with the
provided pointer by one.

# Safety

The pointer must have been obtained through `Rc::into_raw` and must satisfy the
same layout requirements specified in [`Rc::from_raw_in`][from_raw_in].
The associated `Rc` instance must be valid (i.e. the strong count must be at
least 1) when invoking this method, and `ptr` must point to a block of memory
allocated by the global allocator. This method can be used to release the final `Rc` and
backing storage, but **should not** be called after the final `Rc` has been released.

[from_raw_in]: Rc::from_raw_in

# Examples

```
use std::rc::Rc;

let five = Rc::new(5);

unsafe {
    let ptr = Rc::into_raw(five);
    Rc::increment_strong_count(ptr);

    let five = Rc::from_raw(ptr);
    assert_eq!(2, Rc::strong_count(&five));
    Rc::decrement_strong_count(ptr);
    assert_eq!(1, Rc::strong_count(&five));
}
```

## Rc::as_ptr

```rust
pub fn as_ptr(this: &Self) -> *const T
```

Provides a raw pointer to the data.

The counts are not affected in any way and the `Rc` is not consumed. The pointer is valid
for as long as there are strong counts in the `Rc`.

# Examples

```
use std::rc::Rc;

let x = Rc::new(0);
let y = Rc::clone(&x);
let x_ptr = Rc::as_ptr(&x);
assert_eq!(x_ptr, Rc::as_ptr(&y));
assert_eq!(unsafe { *x_ptr }, 0);
```

## Rc::downgrade

```rust
pub fn downgrade(this: &Self) -> Weak<T, A> where A: AllocatorClone,
```

Creates a new [`Weak`] pointer to this allocation.

# Examples

```
use std::rc::Rc;

let five = Rc::new(5);

let weak_five = Rc::downgrade(&five);
```

## Rc::weak_count

```rust
pub fn weak_count(this: &Self) -> usize
```

Gets the number of [`Weak`] pointers to this allocation.

# Examples

```
use std::rc::Rc;

let five = Rc::new(5);
let _weak_five = Rc::downgrade(&five);

assert_eq!(1, Rc::weak_count(&five));
```

## Rc::strong_count

```rust
pub fn strong_count(this: &Self) -> usize
```

Gets the number of strong (`Rc`) pointers to this allocation.

# Examples

```
use std::rc::Rc;

let five = Rc::new(5);
let _also_five = Rc::clone(&five);

assert_eq!(2, Rc::strong_count(&five));
```

## Rc::get_mut

```rust
pub fn get_mut(this: &mut Self) -> Option<&mut T>
```

Returns a mutable reference into the given `Rc`, if there are
no other `Rc` or [`Weak`] pointers to the same allocation.

Returns [`None`] otherwise, because it is not safe to
mutate a shared value.

See also [`make_mut`][make_mut], which will [`clone`][clone]
the inner value when there are other `Rc` pointers.

[make_mut]: Rc::make_mut
[clone]: Clone::clone

# Examples

```
use std::rc::Rc;

let mut x = Rc::new(3);
*Rc::get_mut(&mut x).unwrap() = 4;
assert_eq!(*x, 4);

let _y = Rc::clone(&x);
assert!(Rc::get_mut(&mut x).is_none());
```

## Rc::ptr_eq

```rust
pub fn ptr_eq(this: &Self, other: &Self) -> bool
```

Returns `true` if the two `Rc`s point to the same allocation in a vein similar to
[`ptr::eq`]. This function ignores the metadata of  `dyn Trait` pointers.

# Examples

```
use std::rc::Rc;

let five = Rc::new(5);
let same_five = Rc::clone(&five);
let other_five = Rc::new(5);

assert!(Rc::ptr_eq(&five, &same_five));
assert!(!Rc::ptr_eq(&five, &other_five));
```

## Rc::make_mut

```rust
pub fn make_mut(this: &mut Self) -> &mut T
```

Makes a mutable reference into the given `Rc`.

If there are other `Rc` pointers to the same allocation, then `make_mut` will
[`clone`] the inner value to a new allocation to ensure unique ownership.  This is also
referred to as clone-on-write.

However, if there are no other `Rc` pointers to this allocation, but some [`Weak`]
pointers, then the [`Weak`] pointers will be disassociated and the inner value will not
be cloned.

See also [`get_mut`], which will fail rather than cloning the inner value
or disassociating [`Weak`] pointers.

[`clone`]: Clone::clone
[`get_mut`]: Rc::get_mut

# Examples

```
use std::rc::Rc;

let mut data = Rc::new(5);

*Rc::make_mut(&mut data) += 1;         // Won't clone anything
let mut other_data = Rc::clone(&data); // Won't clone inner data
*Rc::make_mut(&mut data) += 1;         // Clones inner data
*Rc::make_mut(&mut data) += 1;         // Won't clone anything
*Rc::make_mut(&mut other_data) *= 2;   // Won't clone anything

// Now `data` and `other_data` point to different allocations.
assert_eq!(*data, 8);
assert_eq!(*other_data, 12);
```

[`Weak`] pointers will be disassociated:

```
use std::rc::Rc;

let mut data = Rc::new(75);
let weak = Rc::downgrade(&data);

assert!(75 == *data);
assert!(75 == *weak.upgrade().unwrap());

*Rc::make_mut(&mut data) += 1;

assert!(76 == *data);
assert!(weak.upgrade().is_none());
```

## Rc::unwrap_or_clone

```rust
pub fn unwrap_or_clone(this: Self) -> T
```

If we have the only reference to `T` then unwrap it. Otherwise, clone `T` and return the
clone.

Assuming `rc_t` is of type `Rc<T>`, this function is functionally equivalent to
`(*rc_t).clone()`, but will avoid cloning the inner value where possible.

# Examples

```
# use std::{ptr, rc::Rc};
let inner = String::from("test");
let ptr = inner.as_ptr();

let rc = Rc::new(inner);
let inner = Rc::unwrap_or_clone(rc);
// The inner value was not cloned
assert!(ptr::eq(ptr, inner.as_ptr()));

let rc = Rc::new(inner);
let rc2 = rc.clone();
let inner = Rc::unwrap_or_clone(rc);
// Because there were 2 references, we had to clone the inner value.
assert!(!ptr::eq(ptr, inner.as_ptr()));
// `rc2` is the last reference, so when we unwrap it we get back
// the original `String`.
let inner = Rc::unwrap_or_clone(rc2);
assert!(ptr::eq(ptr, inner.as_ptr()));
```

## Rc::downcast

```rust
pub fn downcast<T: Any>(self) -> Result<Rc<T, A>, Self>
```

Attempts to downcast the `Rc<dyn Any>` to a concrete type.

# Examples

```
use std::any::Any;
use std::rc::Rc;

fn print_if_string(value: Rc<dyn Any>) {
    if let Ok(string) = value.downcast::<String>() {
        println!("String ({}): {}", string.len(), string);
    }
}

let my_string = "Hello World".to_string();
print_if_string(Rc::new(my_string));
print_if_string(Rc::new(0i8));
```

## struct Weak

```rust
pub struct Weak< T: ?Sized, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

`Weak` is a version of [`Rc`] that holds a non-owning reference to the
managed allocation.

The allocation is accessed by calling [`upgrade`] on the `Weak`
pointer, which returns an <code>[Option]<[Rc]\<T>></code>.

Since a `Weak` reference does not count towards ownership, it will not
prevent the value stored in the allocation from being dropped, and `Weak` itself makes no
guarantees about the value still being present. Thus it may return [`None`]
when [`upgrade`]d. Note however that a `Weak` reference *does* prevent the allocation
itself (the backing store) from being deallocated.

A `Weak` pointer is useful for keeping a temporary reference to the allocation
managed by [`Rc`] without preventing its inner value from being dropped. It is also used to
prevent circular references between [`Rc`] pointers, since mutual owning references
would never allow either [`Rc`] to be dropped. For example, a tree could
have strong [`Rc`] pointers from parent nodes to children, and `Weak`
pointers from children back to their parents.

The typical way to obtain a `Weak` pointer is to call [`Rc::downgrade`].

[`upgrade`]: Weak::upgrade

## Weak::new

```rust
pub const fn new() -> Weak<T>
```

Constructs a new `Weak<T>`, without allocating any memory.
Calling [`upgrade`] on the return value always gives [`None`].

[`upgrade`]: Weak::upgrade

# Examples

```
use std::rc::Weak;

let empty: Weak<i64> = Weak::new();
assert!(empty.upgrade().is_none());
```

## Weak::from_raw

```rust
pub unsafe fn from_raw(ptr: *const T) -> Self
```

Converts a raw pointer previously created by [`into_raw`] back into `Weak<T>`.

This can be used to safely get a strong reference (by calling [`upgrade`]
later) or to deallocate the weak count by dropping the `Weak<T>`.

It takes ownership of one weak reference (with the exception of pointers created by [`new`],
as these don't own anything; the method still works on them).

# Safety

The pointer must have originated from the [`into_raw`] and must still own its potential
weak reference, and `ptr` must point to a block of memory allocated by the global allocator.

It is allowed for the strong count to be 0 at the time of calling this. Nevertheless, this
takes ownership of one weak reference currently represented as a raw pointer (the weak
count is not modified by this operation) and therefore it must be paired with a previous
call to [`into_raw`].

# Examples

```
use std::rc::{Rc, Weak};

let strong = Rc::new("hello".to_owned());

let raw_1 = Rc::downgrade(&strong).into_raw();
let raw_2 = Rc::downgrade(&strong).into_raw();

assert_eq!(2, Rc::weak_count(&strong));

assert_eq!("hello", &*unsafe { Weak::from_raw(raw_1) }.upgrade().unwrap());
assert_eq!(1, Rc::weak_count(&strong));

drop(strong);

// Decrement the last weak count.
assert!(unsafe { Weak::from_raw(raw_2) }.upgrade().is_none());
```

[`into_raw`]: Weak::into_raw
[`upgrade`]: Weak::upgrade
[`new`]: Weak::new

## Weak::into_raw

```rust
pub fn into_raw(self) -> *const T
```

Consumes the `Weak<T>` and turns it into a raw pointer.

This converts the weak pointer into a raw pointer, while still preserving the ownership of
one weak reference (the weak count is not modified by this operation). It can be turned
back into the `Weak<T>` with [`from_raw`].

The same restrictions of accessing the target of the pointer as with
[`as_ptr`] apply.

# Examples

```
use std::rc::{Rc, Weak};

let strong = Rc::new("hello".to_owned());
let weak = Rc::downgrade(&strong);
let raw = weak.into_raw();

assert_eq!(1, Rc::weak_count(&strong));
assert_eq!("hello", unsafe { &*raw });

drop(unsafe { Weak::from_raw(raw) });
assert_eq!(0, Rc::weak_count(&strong));
```

[`from_raw`]: Weak::from_raw
[`as_ptr`]: Weak::as_ptr

## Weak::as_ptr

```rust
pub fn as_ptr(&self) -> *const T
```

Returns a raw pointer to the object `T` pointed to by this `Weak<T>`.

The pointer is valid only if there are some strong references. The pointer may be dangling,
unaligned or even [`null`] otherwise.

# Examples

```
use std::rc::Rc;
use std::ptr;

let strong = Rc::new("hello".to_owned());
let weak = Rc::downgrade(&strong);
// Both point to the same object
assert!(ptr::eq(&*strong, weak.as_ptr()));
// The strong here keeps it alive, so we can still access the object.
assert_eq!("hello", unsafe { &*weak.as_ptr() });

drop(strong);
// But not any more. We can do weak.as_ptr(), but accessing the pointer would lead to
// undefined behavior.
// assert_eq!("hello", unsafe { &*weak.as_ptr() });
```

[`null`]: ptr::null

## Weak::upgrade

```rust
pub fn upgrade(&self) -> Option<Rc<T, A>> where A: AllocatorClone,
```

Attempts to upgrade the `Weak` pointer to an [`Rc`], delaying
dropping of the inner value if successful.

Returns [`None`] in the following cases:

1. The inner value has since been dropped or moved out.

2. This `Weak` does not point to an allocation.

3. The owning reference this `Weak` is associated with is either not fully-constructed or does not allow an upgrade.

# Examples

```
use std::rc::Rc;

let five = Rc::new(5);

let weak_five = Rc::downgrade(&five);

let strong_five: Option<Rc<_>> = weak_five.upgrade();
assert!(strong_five.is_some());

// Destroy all strong pointers.
drop(strong_five);
drop(five);

assert!(weak_five.upgrade().is_none());
```

## Weak::strong_count

```rust
pub fn strong_count(&self) -> usize
```

Gets the number of strong (`Rc`) pointers pointing to this allocation.

If `self` was created using [`Weak::new`], this will return 0.

## Weak::weak_count

```rust
pub fn weak_count(&self) -> usize
```

Gets the number of `Weak` pointers pointing to this allocation.

If no strong pointers remain, this will return zero.

## Weak::ptr_eq

```rust
pub fn ptr_eq(&self, other: &Self) -> bool
```

Returns `true` if the two `Weak`s point to the same allocation similar to [`ptr::eq`], or if
both don't point to any allocation (because they were created with `Weak::new()`). However,
this function ignores the metadata of  `dyn Trait` pointers.

# Notes

Since this compares pointers it means that `Weak::new()` will equal each
other, even though they don't point to any allocation.

# Examples

```
use std::rc::Rc;

let first_rc = Rc::new(5);
let first = Rc::downgrade(&first_rc);
let second = Rc::downgrade(&first_rc);

assert!(first.ptr_eq(&second));

let third_rc = Rc::new(5);
let third = Rc::downgrade(&third_rc);

assert!(!first.ptr_eq(&third));
```

Comparing `Weak::new`.

```
use std::rc::{Rc, Weak};

let first = Weak::new();
let second = Weak::new();
assert!(first.ptr_eq(&second));

let third_rc = Rc::new(());
let third = Rc::downgrade(&third_rc);
assert!(!first.ptr_eq(&third));
```