# alloc::sync

Thread-safe reference-counting pointers.

See the [`Arc<T>`][Arc] documentation for more details.

**Note**: This module is only available on platforms that support atomic
loads and stores of pointers. This may be detected at compile time using
`#[cfg(target_has_atomic = "ptr")]`.

## struct Arc

```rust
pub struct Arc< T: ?Sized, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

A thread-safe reference-counting pointer. 'Arc' stands for 'Atomically
Reference Counted'.

The type `Arc<T>` provides shared ownership of a value of type `T`,
allocated in the heap. Invoking [`clone`][clone] on `Arc` produces
a new `Arc` instance, which points to the same allocation on the heap as the
source `Arc`, while increasing a reference count. When the last `Arc`
pointer to a given allocation is destroyed, the value stored in that allocation (often
referred to as "inner value") is also dropped.

Shared references in Rust disallow mutation by default, and `Arc` is no
exception: you cannot generally obtain a mutable reference to something
inside an `Arc`. If you do need to mutate through an `Arc`, you have several options:

1. Use interior mutability with synchronization primitives like [`Mutex`][mutex],
   [`RwLock`][rwlock], or one of the [`Atomic`][atomic] types.

2. Use clone-on-write semantics with [`Arc::make_mut`] which provides efficient mutation
   without requiring interior mutability. This approach clones the data only when
   needed (when there are multiple references) and can be more efficient when mutations
   are infrequent.

3. Use [`Arc::get_mut`] when you know your `Arc` is not shared (has a reference count of 1),
   which provides direct mutable access to the inner value without any cloning.

```
use std::sync::Arc;

let mut data = Arc::new(vec![1, 2, 3]);

// This will clone the vector only if there are other references to it
Arc::make_mut(&mut data).push(4);

assert_eq!(*data, vec![1, 2, 3, 4]);
```

**Note**: This type is only available on platforms that support atomic
loads and stores of pointers, which includes all platforms that support
the `std` crate but not all those which only support [`alloc`](crate).
This may be detected at compile time using `#[cfg(target_has_atomic = "ptr")]`.

## Thread Safety

Unlike [`Rc<T>`], `Arc<T>` uses atomic operations for its reference
counting. This means that it is thread-safe. The disadvantage is that
atomic operations are more expensive than ordinary memory accesses. If you
are not sharing reference-counted allocations between threads, consider using
[`Rc<T>`] for lower overhead. [`Rc<T>`] is a safe default, because the
compiler will catch any attempt to send an [`Rc<T>`] between threads.
However, a library might choose `Arc<T>` in order to give library consumers
more flexibility.

`Arc<T>` will implement [`Send`] and [`Sync`] as long as the `T` implements
[`Send`] and [`Sync`]. Why can't you put a non-thread-safe type `T` in an
`Arc<T>` to make it thread-safe? This may be a bit counter-intuitive at
first: after all, isn't the point of `Arc<T>` thread safety? The key is
this: `Arc<T>` makes it thread safe to have multiple ownership of the same
data, but it  doesn't add thread safety to its data. Consider
<code>Arc<[RefCell\<T>]></code>. [`RefCell<T>`] isn't [`Sync`], and if `Arc<T>` was always
[`Send`], <code>Arc<[RefCell\<T>]></code> would be as well. But then we'd have a problem:
[`RefCell<T>`] is not thread safe; it keeps track of the borrowing count using
non-atomic operations.

In the end, this means that you may need to pair `Arc<T>` with some sort of
[`std::sync`] type, usually [`Mutex<T>`][mutex].

## Breaking cycles with `Weak`

The [`downgrade`][downgrade] method can be used to create a non-owning
[`Weak`] pointer. A [`Weak`] pointer can be [`upgrade`][upgrade]d
to an `Arc`, but this will return [`None`] if the value stored in the allocation has
already been dropped. In other words, `Weak` pointers do not keep the value
inside the allocation alive; however, they *do* keep the allocation
(the backing store for the value) alive.

A cycle between `Arc` pointers will never be deallocated. For this reason,
[`Weak`] is used to break cycles. For example, a tree could have
strong `Arc` pointers from parent nodes to children, and [`Weak`]
pointers from children back to their parents.

# Cloning references

Creating a new reference from an existing reference-counted pointer is done using the
`Clone` trait implemented for [`Arc<T>`][Arc] and [`Weak<T>`][Weak].

```
use std::sync::Arc;
let foo = Arc::new(vec![1.0, 2.0, 3.0]);
// The two syntaxes below are equivalent.
let a = foo.clone();
let b = Arc::clone(&foo);
// a, b, and foo are all Arcs that point to the same memory location
```

## `Deref` behavior

`Arc<T>` automatically dereferences to `T` (via the [`Deref`] trait),
so you can call `T`'s methods on a value of type `Arc<T>`. To avoid name
clashes with `T`'s methods, the methods of `Arc<T>` itself are associated
functions, called using [fully qualified syntax]:

```
use std::sync::Arc;

let my_arc = Arc::new(());
let my_weak = Arc::downgrade(&my_arc);
```

`Arc<T>`'s implementations of traits like `Clone` may also be called using
fully qualified syntax. Some people prefer to use fully qualified syntax,
while others prefer using method-call syntax.

```
use std::sync::Arc;

let arc = Arc::new(());
// Method-call syntax
let arc2 = arc.clone();
// Fully qualified syntax
let arc3 = Arc::clone(&arc);
```

[`Weak<T>`][Weak] does not auto-dereference to `T`, because the inner value may have
already been dropped.

[`Rc<T>`]: crate::rc::Rc
[clone]: Clone::clone
[mutex]: ../../std/sync/struct.Mutex.html
[rwlock]: ../../std/sync/struct.RwLock.html
[atomic]: core::sync::atomic
[downgrade]: Arc::downgrade
[upgrade]: Weak::upgrade
[RefCell\<T>]: core::cell::RefCell
[`RefCell<T>`]: core::cell::RefCell
[`std::sync`]: ../../std/sync/index.html
[`Arc::clone(&from)`]: Arc::clone
[fully qualified syntax]: https://doc.rust-lang.org/book/ch19-03-advanced-traits.html#fully-qualified-syntax-for-disambiguation-calling-methods-with-the-same-name

# Examples

Sharing some immutable data between threads:

```
use std::sync::Arc;
use std::thread;

let five = Arc::new(5);

for _ in 0..10 {
    let five = Arc::clone(&five);

    thread::spawn(move || {
        println!("{five:?}");
    });
}
```

Sharing a mutable [`AtomicUsize`]:

[`AtomicUsize`]: core::sync::atomic::AtomicUsize "sync::atomic::AtomicUsize"

```
use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::thread;

let val = Arc::new(AtomicUsize::new(5));

for _ in 0..10 {
    let val = Arc::clone(&val);

    thread::spawn(move || {
        let v = val.fetch_add(1, Ordering::Relaxed);
        println!("{v:?}");
    });
}
```

See the [`rc` documentation][rc_examples] for more examples of reference
counting in general.

[rc_examples]: crate::rc#examples

## struct Weak

```rust
pub struct Weak< T: ?Sized, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

`Weak` is a version of [`Arc`] that holds a non-owning reference to the
managed allocation.

The allocation is accessed by calling [`upgrade`] on the `Weak`
pointer, which returns an <code>[Option]<[Arc]\<T>></code>.

Since a `Weak` reference does not count towards ownership, it will not
prevent the value stored in the allocation from being dropped, and `Weak` itself makes no
guarantees about the value still being present. Thus it may return [`None`]
when [`upgrade`]d. Note however that a `Weak` reference *does* prevent the allocation
itself (the backing store) from being deallocated.

A `Weak` pointer is useful for keeping a temporary reference to the allocation
managed by [`Arc`] without preventing its inner value from being dropped. It is also used to
prevent circular references between [`Arc`] pointers, since mutual owning references
would never allow either [`Arc`] to be dropped. For example, a tree could
have strong [`Arc`] pointers from parent nodes to children, and `Weak`
pointers from children back to their parents.

The typical way to obtain a `Weak` pointer is to call [`Arc::downgrade`].

[`upgrade`]: Weak::upgrade

## Arc::new

```rust
pub fn new(data: T) -> Arc<T>
```

Constructs a new `Arc<T>`.

# Examples

```
use std::sync::Arc;

let five = Arc::new(5);
```

## Arc::new_cyclic

```rust
pub fn new_cyclic<F>(data_fn: F) -> Arc<T> where F: FnOnce(&Weak<T>) -> T,
```

Constructs a new `Arc<T>` while giving you a `Weak<T>` to the allocation,
to allow you to construct a `T` which holds a weak pointer to itself.

Generally, a structure circularly referencing itself, either directly or
indirectly, should not hold a strong reference to itself to prevent a memory leak.
Using this function, you get access to the weak pointer during the
initialization of `T`, before the `Arc<T>` is created, such that you can
clone and store it inside the `T`.

`new_cyclic` first allocates the managed allocation for the `Arc<T>`,
then calls your closure, giving it a `Weak<T>` to this allocation,
and only afterwards completes the construction of the `Arc<T>` by placing
the `T` returned from your closure into the allocation.

Since the new `Arc<T>` is not fully-constructed until `Arc<T>::new_cyclic`
returns, calling [`upgrade`] on the weak reference inside your closure will
fail and result in a `None` value.

# Panics

If `data_fn` panics, the panic is propagated to the caller, and the
temporary [`Weak<T>`] is dropped normally.

# Example

```
# #![allow(dead_code)]
use std::sync::{Arc, Weak};

struct Gadget {
    me: Weak<Gadget>,
}

impl Gadget {
    /// Constructs a reference counted Gadget.
    fn new() -> Arc<Self> {
        // `me` is a `Weak<Gadget>` pointing at the new allocation of the
        // `Arc` we're constructing.
        Arc::new_cyclic(|me| {
            // Create the actual struct here.
            Gadget { me: me.clone() }
        })
    }

    /// Returns a reference counted pointer to Self.
    fn me(&self) -> Arc<Self> {
        self.me.upgrade().unwrap()
    }
}
```
[`upgrade`]: Weak::upgrade

## Arc::new_uninit

```rust
pub fn new_uninit() -> Arc<mem::MaybeUninit<T>>
```

Constructs a new `Arc` with uninitialized contents.

# Examples

```
use std::sync::Arc;

let mut five = Arc::<u32>::new_uninit();

// Deferred initialization:
Arc::get_mut(&mut five).unwrap().write(5);

let five = unsafe { five.assume_init() };

assert_eq!(*five, 5)
```

## Arc::new_zeroed

```rust
pub fn new_zeroed() -> Arc<mem::MaybeUninit<T>>
```

Constructs a new `Arc` with uninitialized contents, with the memory
being filled with `0` bytes.

See [`MaybeUninit::zeroed`][zeroed] for examples of correct and incorrect usage
of this method.

# Examples

```
use std::sync::Arc;

let zero = Arc::<u32>::new_zeroed();
let zero = unsafe { zero.assume_init() };

assert_eq!(*zero, 0)
```

[zeroed]: mem::MaybeUninit::zeroed

## Arc::pin

```rust
pub fn pin(data: T) -> Pin<Arc<T>>
```

Constructs a new `Pin<Arc<T>>`. If `T` does not implement `Unpin`, then
`data` will be pinned in memory and unable to be moved.

## Arc::try_unwrap

```rust
pub fn try_unwrap(this: Self) -> Result<T, Self>
```

Returns the inner value, if the `Arc` has exactly one strong reference.

Otherwise, an [`Err`] is returned with the same `Arc` that was
passed in.

This will succeed even if there are outstanding weak references.

It is strongly recommended to use [`Arc::into_inner`] instead if you don't
keep the `Arc` in the [`Err`] case.
Immediately dropping the [`Err`]-value, as the expression
`Arc::try_unwrap(this).ok()` does, can cause the strong count to
drop to zero and the inner value of the `Arc` to be dropped.
For instance, if two threads execute such an expression in parallel,
there is a race condition without the possibility of unsafety:
The threads could first both check whether they own the last instance
in `Arc::try_unwrap`, determine that they both do not, and then both
discard and drop their instance in the call to [`ok`][`Result::ok`].
In this scenario, the value inside the `Arc` is safely destroyed
by exactly one of the threads, but neither thread will ever be able
to use the value.

# Examples

```
use std::sync::Arc;

let x = Arc::new(3);
assert_eq!(Arc::try_unwrap(x), Ok(3));

let x = Arc::new(4);
let _y = Arc::clone(&x);
assert_eq!(*Arc::try_unwrap(x).unwrap_err(), 4);
```

## Arc::into_inner

```rust
pub fn into_inner(this: Self) -> Option<T>
```

Returns the inner value, if the `Arc` has exactly one strong reference.

Otherwise, [`None`] is returned and the `Arc` is dropped.

This will succeed even if there are outstanding weak references.

If `Arc::into_inner` is called on every clone of this `Arc`,
it is guaranteed that exactly one of the calls returns the inner value.
This means in particular that the inner value is not dropped.

[`Arc::try_unwrap`] is conceptually similar to `Arc::into_inner`, but it
is meant for different use-cases. If used as a direct replacement
for `Arc::into_inner` anyway, such as with the expression
<code>[Arc::try_unwrap]\(this).[ok][Result::ok]()</code>, then it does
**not** give the same guarantee as described in the previous paragraph.
For more information, see the examples below and read the documentation
of [`Arc::try_unwrap`].

# Examples

Minimal example demonstrating the guarantee that `Arc::into_inner` gives.
```
use std::sync::Arc;

let x = Arc::new(3);
let y = Arc::clone(&x);

// Two threads calling `Arc::into_inner` on both clones of an `Arc`:
let x_thread = std::thread::spawn(|| Arc::into_inner(x));
let y_thread = std::thread::spawn(|| Arc::into_inner(y));

let x_inner_value = x_thread.join().unwrap();
let y_inner_value = y_thread.join().unwrap();

// One of the threads is guaranteed to receive the inner value:
assert!(matches!(
    (x_inner_value, y_inner_value),
    (None, Some(3)) | (Some(3), None)
));
// The result could also be `(None, None)` if the threads called
// `Arc::try_unwrap(x).ok()` and `Arc::try_unwrap(y).ok()` instead.
```

A more practical example demonstrating the need for `Arc::into_inner`:
```
use std::sync::Arc;

// Definition of a simple singly linked list using `Arc`:
#[derive(Clone)]
struct LinkedList<T>(Option<Arc<Node<T>>>);
struct Node<T>(T, Option<Arc<Node<T>>>);

// Dropping a long `LinkedList<T>` relying on the destructor of `Arc`
// can cause a stack overflow. To prevent this, we can provide a
// manual `Drop` implementation that does the destruction in a loop:
impl<T> Drop for LinkedList<T> {
    fn drop(&mut self) {
        let mut link = self.0.take();
        while let Some(arc_node) = link.take() {
            if let Some(Node(_value, next)) = Arc::into_inner(arc_node) {
                link = next;
            }
        }
    }
}

// Implementation of `new` and `push` omitted
impl<T> LinkedList<T> {
    /* ... */
#   fn new() -> Self {
#       LinkedList(None)
#   }
#   fn push(&mut self, x: T) {
#       self.0 = Some(Arc::new(Node(x, self.0.take())));
#   }
}

// The following code could have still caused a stack overflow
// despite the manual `Drop` impl if that `Drop` impl had used
// `Arc::try_unwrap(arc).ok()` instead of `Arc::into_inner(arc)`.

// Create a long list and clone it
let mut x = LinkedList::new();
let size = 100000;
# let size = if cfg!(miri) { 100 } else { size };
for i in 0..size {
    x.push(i); // Adds i to the front of x
}
let y = x.clone();

// Drop the clones in parallel
let x_thread = std::thread::spawn(|| drop(x));
let y_thread = std::thread::spawn(|| drop(y));
x_thread.join().unwrap();
y_thread.join().unwrap();
```

## Arc::map

```rust
pub fn map<U>(this: Self, f: impl FnOnce(&T) -> U) -> Arc<U, A>
```

Maps the value in an `Arc`, reusing the allocation if possible.

`f` is called on a reference to the value in the `Arc`, and the result is returned, also in
an `Arc`.

Note: this is an associated function, which means that you have
to call it as `Arc::map(a, f)` instead of `r.map(a)`. This
is so that there is no conflict with a method on the inner type.

# Examples

```
use std::sync::Arc;

let r = Arc::new(7);
let new = Arc::map(r, |i| i + 7);
assert_eq!(*new, 14);
```

## Arc::new_uninit_slice

```rust
pub fn new_uninit_slice(len: usize) -> Arc<[mem::MaybeUninit<T>]>
```

Constructs a new atomically reference-counted slice with uninitialized contents.

# Examples

```
use std::sync::Arc;

let mut values = Arc::<[u32]>::new_uninit_slice(3);

// Deferred initialization:
let data = Arc::get_mut(&mut values).unwrap();
data[0].write(1);
data[1].write(2);
data[2].write(3);

let values = unsafe { values.assume_init() };

assert_eq!(*values, [1, 2, 3])
```

## Arc::new_zeroed_slice

```rust
pub fn new_zeroed_slice(len: usize) -> Arc<[mem::MaybeUninit<T>]>
```

Constructs a new atomically reference-counted slice with uninitialized contents, with the memory being
filled with `0` bytes.

See [`MaybeUninit::zeroed`][zeroed] for examples of correct and
incorrect usage of this method.

# Examples

```
use std::sync::Arc;

let values = Arc::<[u32]>::new_zeroed_slice(3);
let values = unsafe { values.assume_init() };

assert_eq!(*values, [0, 0, 0])
```

[zeroed]: mem::MaybeUninit::zeroed

## Arc::assume_init

```rust
pub unsafe fn assume_init(self) -> Arc<T, A>
```

Converts to `Arc<T>`.

# Safety

As with [`MaybeUninit::assume_init`],
it is up to the caller to guarantee that the inner value
really is in an initialized state.
Calling this when the content is not yet fully initialized
causes immediate undefined behavior.

[`MaybeUninit::assume_init`]: mem::MaybeUninit::assume_init

# Examples

```
use std::sync::Arc;

let mut five = Arc::<u32>::new_uninit();

// Deferred initialization:
Arc::get_mut(&mut five).unwrap().write(5);

let five = unsafe { five.assume_init() };

assert_eq!(*five, 5)
```

## Arc::assume_init

```rust
pub unsafe fn assume_init(self) -> Arc<[T], A>
```

Converts to `Arc<[T]>`.

# Safety

As with [`MaybeUninit::assume_init`],
it is up to the caller to guarantee that the inner value
really is in an initialized state.
Calling this when the content is not yet fully initialized
causes immediate undefined behavior.

[`MaybeUninit::assume_init`]: mem::MaybeUninit::assume_init

# Examples

```
use std::sync::Arc;

let mut values = Arc::<[u32]>::new_uninit_slice(3);

// Deferred initialization:
let data = Arc::get_mut(&mut values).unwrap();
data[0].write(1);
data[1].write(2);
data[2].write(3);

let values = unsafe { values.assume_init() };

assert_eq!(*values, [1, 2, 3])
```

## Arc::from_raw

```rust
pub unsafe fn from_raw(ptr: *const T) -> Self
```

Constructs an `Arc<T>` from a raw pointer.

The raw pointer must have been previously returned by a call to
[`Arc<U>::into_raw`][into_raw] or [`Arc<U>::into_raw_with_allocator`][into_raw_with_allocator].

# Safety

* Creating a `Arc<T>` from a pointer other than one returned from
  [`Arc<U>::into_raw`][into_raw] or [`Arc<U>::into_raw_with_allocator`][into_raw_with_allocator]
  is undefined behavior.
* If `U` is sized, it must have the same size and alignment as `T`. This
  is trivially true if `U` is `T`.
* If `U` is unsized, its data pointer must have the same size and
  alignment as `T`. This is trivially true if `Arc<U>` was constructed
  through `Arc<T>` and then converted to `Arc<U>` through an [unsized
  coercion].
* Note that if `U` or `U`'s data pointer is not `T` but has the same size
  and alignment, this is basically like transmuting references of
  different types. See [`mem::transmute`][transmute] for more information
  on what restrictions apply in this case.
* The raw pointer must point to a block of memory allocated by the global allocator.
* The user of `from_raw` has to make sure a specific value of `T` is only
  dropped once.

This function is unsafe because improper use may lead to memory unsafety,
even if the returned `Arc<T>` is never accessed.

[into_raw]: Arc::into_raw
[into_raw_with_allocator]: Arc::into_raw_with_allocator
[transmute]: core::mem::transmute
[unsized coercion]: https://doc.rust-lang.org/reference/type-coercions.html#unsized-coercions

# Examples

```
use std::sync::Arc;

let x = Arc::new("hello".to_owned());
let x_ptr = Arc::into_raw(x);

unsafe {
    // Convert back to an `Arc` to prevent leak.
    let x = Arc::from_raw(x_ptr);
    assert_eq!(&*x, "hello");

    // Further calls to `Arc::from_raw(x_ptr)` would be memory-unsafe.
}

// The memory was freed when `x` went out of scope above, so `x_ptr` is now dangling!
```

Convert a slice back into its original array:

```
use std::sync::Arc;

let x: Arc<[u32]> = Arc::new([1, 2, 3]);
let x_ptr: *const [u32] = Arc::into_raw(x);

unsafe {
    let x: Arc<[u32; 3]> = Arc::from_raw(x_ptr.cast::<[u32; 3]>());
    assert_eq!(&*x, &[1, 2, 3]);
}
```

## Arc::into_raw

```rust
pub fn into_raw(this: Self) -> *const T
```

Consumes the `Arc`, returning the wrapped pointer.

To avoid a memory leak the pointer must be converted back to an `Arc` using
[`Arc::from_raw`].

# Examples

```
use std::sync::Arc;

let x = Arc::new("hello".to_owned());
let x_ptr = Arc::into_raw(x);
assert_eq!(unsafe { &*x_ptr }, "hello");
# // Prevent leaks for Miri.
# drop(unsafe { Arc::from_raw(x_ptr) });
```

## Arc::increment_strong_count

```rust
pub unsafe fn increment_strong_count(ptr: *const T)
```

Increments the strong reference count on the `Arc<T>` associated with the
provided pointer by one.

# Safety

The pointer must have been obtained through `Arc::into_raw` and must satisfy the
same layout requirements specified in [`Arc::from_raw_in`][from_raw_in].
The associated `Arc` instance must be valid (i.e. the strong count must be at
least 1) for the duration of this method, and `ptr` must point to a block of memory
allocated by the global allocator.

[from_raw_in]: Arc::from_raw_in

# Examples

```
use std::sync::Arc;

let five = Arc::new(5);

unsafe {
    let ptr = Arc::into_raw(five);
    Arc::increment_strong_count(ptr);

    // This assertion is deterministic because we haven't shared
    // the `Arc` between threads.
    let five = Arc::from_raw(ptr);
    assert_eq!(2, Arc::strong_count(&five));
#   // Prevent leaks for Miri.
#   Arc::decrement_strong_count(ptr);
}
```

## Arc::decrement_strong_count

```rust
pub unsafe fn decrement_strong_count(ptr: *const T)
```

Decrements the strong reference count on the `Arc<T>` associated with the
provided pointer by one.

# Safety

The pointer must have been obtained through `Arc::into_raw` and must satisfy the
same layout requirements specified in [`Arc::from_raw_in`][from_raw_in].
The associated `Arc` instance must be valid (i.e. the strong count must be at
least 1) when invoking this method, and `ptr` must point to a block of memory
allocated by the global allocator. This method can be used to release the final
`Arc` and backing storage, but **should not** be called after the final `Arc` has been
released.

[from_raw_in]: Arc::from_raw_in

# Examples

```
use std::sync::Arc;

let five = Arc::new(5);

unsafe {
    let ptr = Arc::into_raw(five);
    Arc::increment_strong_count(ptr);

    // Those assertions are deterministic because we haven't shared
    // the `Arc` between threads.
    let five = Arc::from_raw(ptr);
    assert_eq!(2, Arc::strong_count(&five));
    Arc::decrement_strong_count(ptr);
    assert_eq!(1, Arc::strong_count(&five));
}
```

## Arc::as_ptr

```rust
pub fn as_ptr(this: &Self) -> *const T
```

Provides a raw pointer to the data.

The counts are not affected in any way and the `Arc` is not consumed. The pointer is valid for
as long as there are strong counts in the `Arc`.

# Examples

```
use std::sync::Arc;

let x = Arc::new("hello".to_owned());
let y = Arc::clone(&x);
let x_ptr = Arc::as_ptr(&x);
assert_eq!(x_ptr, Arc::as_ptr(&y));
assert_eq!(unsafe { &*x_ptr }, "hello");
```

## Arc::downgrade

```rust
pub fn downgrade(this: &Self) -> Weak<T, A> where A: AllocatorClone,
```

Creates a new [`Weak`] pointer to this allocation.

# Examples

```
use std::sync::Arc;

let five = Arc::new(5);

let weak_five = Arc::downgrade(&five);
```

## Arc::weak_count

```rust
pub fn weak_count(this: &Self) -> usize
```

Gets the number of [`Weak`] pointers to this allocation.

# Safety

This method by itself is safe, but using it correctly requires extra care.
Another thread can change the weak count at any time,
including potentially between calling this method and acting on the result.

# Examples

```
use std::sync::Arc;

let five = Arc::new(5);
let _weak_five = Arc::downgrade(&five);

// This assertion is deterministic because we haven't shared
// the `Arc` or `Weak` between threads.
assert_eq!(1, Arc::weak_count(&five));
```

## Arc::strong_count

```rust
pub fn strong_count(this: &Self) -> usize
```

Gets the number of strong (`Arc`) pointers to this allocation.

# Safety

This method by itself is safe, but using it correctly requires extra care.
Another thread can change the strong count at any time,
including potentially between calling this method and acting on the result.

# Examples

```
use std::sync::Arc;

let five = Arc::new(5);
let _also_five = Arc::clone(&five);

// This assertion is deterministic because we haven't shared
// the `Arc` between threads.
assert_eq!(2, Arc::strong_count(&five));
```

## Arc::ptr_eq

```rust
pub fn ptr_eq(this: &Self, other: &Self) -> bool
```

Returns `true` if the two `Arc`s point to the same allocation in a vein similar to
[`ptr::eq`]. This function ignores the metadata of  `dyn Trait` pointers.

# Examples

```
use std::sync::Arc;

let five = Arc::new(5);
let same_five = Arc::clone(&five);
let other_five = Arc::new(5);

assert!(Arc::ptr_eq(&five, &same_five));
assert!(!Arc::ptr_eq(&five, &other_five));
```

[`ptr::eq`]: core::ptr::eq "ptr::eq"

## Arc::make_mut

```rust
pub fn make_mut(this: &mut Self) -> &mut T
```

Makes a mutable reference into the given `Arc`.

If there are other `Arc` pointers to the same allocation, then `make_mut` will
[`clone`] the inner value to a new allocation to ensure unique ownership.  This is also
referred to as clone-on-write.

However, if there are no other `Arc` pointers to this allocation, but some [`Weak`]
pointers, then the [`Weak`] pointers will be dissociated and the inner value will not
be cloned.

See also [`get_mut`], which will fail rather than cloning the inner value
or dissociating [`Weak`] pointers.

[`clone`]: Clone::clone
[`get_mut`]: Arc::get_mut

# Examples

```
use std::sync::Arc;

let mut data = Arc::new(5);

*Arc::make_mut(&mut data) += 1;         // Won't clone anything
let mut other_data = Arc::clone(&data); // Won't clone inner data
*Arc::make_mut(&mut data) += 1;         // Clones inner data
*Arc::make_mut(&mut data) += 1;         // Won't clone anything
*Arc::make_mut(&mut other_data) *= 2;   // Won't clone anything

// Now `data` and `other_data` point to different allocations.
assert_eq!(*data, 8);
assert_eq!(*other_data, 12);
```

[`Weak`] pointers will be dissociated:

```
use std::sync::Arc;

let mut data = Arc::new(75);
let weak = Arc::downgrade(&data);

assert!(75 == *data);
assert!(75 == *weak.upgrade().unwrap());

*Arc::make_mut(&mut data) += 1;

assert!(76 == *data);
assert!(weak.upgrade().is_none());
```

## Arc::unwrap_or_clone

```rust
pub fn unwrap_or_clone(this: Self) -> T
```

If we have the only reference to `T` then unwrap it. Otherwise, clone `T` and return the
clone.

Assuming `arc_t` is of type `Arc<T>`, this function is functionally equivalent to
`(*arc_t).clone()`, but will avoid cloning the inner value where possible.

# Examples

```
# use std::{ptr, sync::Arc};
let inner = String::from("test");
let ptr = inner.as_ptr();

let arc = Arc::new(inner);
let inner = Arc::unwrap_or_clone(arc);
// The inner value was not cloned
assert!(ptr::eq(ptr, inner.as_ptr()));

let arc = Arc::new(inner);
let arc2 = arc.clone();
let inner = Arc::unwrap_or_clone(arc);
// Because there were 2 references, we had to clone the inner value.
assert!(!ptr::eq(ptr, inner.as_ptr()));
// `arc2` is the last reference, so when we unwrap it we get back
// the original `String`.
let inner = Arc::unwrap_or_clone(arc2);
assert!(ptr::eq(ptr, inner.as_ptr()));
```

## Arc::get_mut

```rust
pub fn get_mut(this: &mut Self) -> Option<&mut T>
```

Returns a mutable reference into the given `Arc`, if there are
no other `Arc` or [`Weak`] pointers to the same allocation.

Returns [`None`] otherwise, because it is not safe to
mutate a shared value.

See also [`make_mut`][make_mut], which will [`clone`][clone]
the inner value when there are other `Arc` pointers.

[make_mut]: Arc::make_mut
[clone]: Clone::clone

# Examples

```
use std::sync::Arc;

let mut x = Arc::new(3);
*Arc::get_mut(&mut x).unwrap() = 4;
assert_eq!(*x, 4);

let _y = Arc::clone(&x);
assert!(Arc::get_mut(&mut x).is_none());
```

## Arc::downcast

```rust
pub fn downcast<T>(self) -> Result<Arc<T, A>, Self> where T: Any + Send + Sync,
```

Attempts to downcast the `Arc<dyn Any + Send + Sync>` to a concrete type.

# Examples

```
use std::any::Any;
use std::sync::Arc;

fn print_if_string(value: Arc<dyn Any + Send + Sync>) {
    if let Ok(string) = value.downcast::<String>() {
        println!("String ({}): {}", string.len(), string);
    }
}

let my_string = "Hello World".to_string();
print_if_string(Arc::new(my_string));
print_if_string(Arc::new(0i8));
```

## Weak::new

```rust
pub const fn new() -> Weak<T>
```

Constructs a new `Weak<T>`, without allocating any memory.
Calling [`upgrade`] on the return value always gives [`None`].

[`upgrade`]: Weak::upgrade

# Examples

```
use std::sync::Weak;

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
weak reference, and must point to a block of memory allocated by global allocator.

It is allowed for the strong count to be 0 at the time of calling this. Nevertheless, this
takes ownership of one weak reference currently represented as a raw pointer (the weak
count is not modified by this operation) and therefore it must be paired with a previous
call to [`into_raw`].
# Examples

```
use std::sync::{Arc, Weak};

let strong = Arc::new("hello".to_owned());

let raw_1 = Arc::downgrade(&strong).into_raw();
let raw_2 = Arc::downgrade(&strong).into_raw();

assert_eq!(2, Arc::weak_count(&strong));

assert_eq!("hello", &*unsafe { Weak::from_raw(raw_1) }.upgrade().unwrap());
assert_eq!(1, Arc::weak_count(&strong));

drop(strong);

// Decrement the last weak count.
assert!(unsafe { Weak::from_raw(raw_2) }.upgrade().is_none());
```

[`new`]: Weak::new
[`into_raw`]: Weak::into_raw
[`upgrade`]: Weak::upgrade

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
use std::sync::{Arc, Weak};

let strong = Arc::new("hello".to_owned());
let weak = Arc::downgrade(&strong);
let raw = weak.into_raw();

assert_eq!(1, Arc::weak_count(&strong));
assert_eq!("hello", unsafe { &*raw });

drop(unsafe { Weak::from_raw(raw) });
assert_eq!(0, Arc::weak_count(&strong));
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
use std::sync::Arc;
use std::ptr;

let strong = Arc::new("hello".to_owned());
let weak = Arc::downgrade(&strong);
// Both point to the same object
assert!(ptr::eq(&*strong, weak.as_ptr()));
// The strong here keeps it alive, so we can still access the object.
assert_eq!("hello", unsafe { &*weak.as_ptr() });

drop(strong);
// But not any more. We can do weak.as_ptr(), but accessing the pointer would lead to
// undefined behavior.
// assert_eq!("hello", unsafe { &*weak.as_ptr() });
```

[`null`]: core::ptr::null "ptr::null"

## Weak::upgrade

```rust
pub fn upgrade(&self) -> Option<Arc<T, A>> where A: AllocatorClone,
```

Attempts to upgrade the `Weak` pointer to an [`Arc`], delaying
dropping of the inner value if successful.

Returns [`None`] in the following cases:

1. The inner value has since been dropped or moved out.

2. This `Weak` does not point to an allocation.

3. The owning reference this `Weak` is associated with is either not fully-constructed or does not allow an upgrade.

# Examples

```
use std::sync::Arc;

let five = Arc::new(5);

let weak_five = Arc::downgrade(&five);

let strong_five: Option<Arc<_>> = weak_five.upgrade();
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

Gets the number of strong (`Arc`) pointers pointing to this allocation.

If `self` was created using [`Weak::new`], this will return 0.

## Weak::weak_count

```rust
pub fn weak_count(&self) -> usize
```

Gets an approximation of the number of `Weak` pointers pointing to this
allocation.

If `self` was created using [`Weak::new`], or if there are no remaining
strong pointers, this will return 0.

# Accuracy

Due to implementation details, the returned value can be off by 1 in
either direction when other threads are manipulating any `Arc`s or
`Weak`s pointing to the same allocation.

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
use std::sync::Arc;

let first_rc = Arc::new(5);
let first = Arc::downgrade(&first_rc);
let second = Arc::downgrade(&first_rc);

assert!(first.ptr_eq(&second));

let third_rc = Arc::new(5);
let third = Arc::downgrade(&third_rc);

assert!(!first.ptr_eq(&third));
```

Comparing `Weak::new`.

```
use std::sync::{Arc, Weak};

let first = Weak::new();
let second = Weak::new();
assert!(first.ptr_eq(&second));

let third_rc = Arc::new(());
let third = Arc::downgrade(&third_rc);
assert!(!first.ptr_eq(&third));
```

[`ptr::eq`]: core::ptr::eq "ptr::eq"