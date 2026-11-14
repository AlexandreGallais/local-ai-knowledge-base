---
title: "alloc::sync (part 1 of 3)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/alloc/src/sync.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# alloc::sync

Thread-safe reference-counting pointers.

See the `Arc<T>`[Arc] documentation for more details.

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
allocated in the heap. Invoking `clone`[clone] on `Arc` produces
a new `Arc` instance, which points to the same allocation on the heap as the
source `Arc`, while increasing a reference count. When the last `Arc`
pointer to a given allocation is destroyed, the value stored in that allocation (often
referred to as "inner value") is also dropped.

Shared references in Rust disallow mutation by default, and `Arc` is no
exception: you cannot generally obtain a mutable reference to something
inside an `Arc`. If you do need to mutate through an `Arc`, you have several options:

1. Use interior mutability with synchronization primitives like `Mutex`[mutex],
   `RwLock`[rwlock], or one of the `Atomic`[atomic] types.

2. Use clone-on-write semantics with `Arc::make_mut` which provides efficient mutation
   without requiring interior mutability. This approach clones the data only when
   needed (when there are multiple references) and can be more efficient when mutations
   are infrequent.

3. Use `Arc::get_mut` when you know your `Arc` is not shared (has a reference count of 1),
   which provides direct mutable access to the inner value without any cloning.

```rust
use std::sync::Arc;

let mut data = Arc::new(vec![1, 2, 3]);

// This will clone the vector only if there are other references to it
Arc::make_mut(&mut data).push(4);

assert_eq!(*data, vec![1, 2, 3, 4]);
```

**Note**: This type is only available on platforms that support atomic
loads and stores of pointers, which includes all platforms that support
the `std` crate but not all those which only support `alloc`.
This may be detected at compile time using `#[cfg(target_has_atomic = "ptr")]`.

## Thread Safety

Unlike `Rc<T>`, `Arc<T>` uses atomic operations for its reference
counting. This means that it is thread-safe. The disadvantage is that
atomic operations are more expensive than ordinary memory accesses. If you
are not sharing reference-counted allocations between threads, consider using
`Rc<T>` for lower overhead. `Rc<T>` is a safe default, because the
compiler will catch any attempt to send an `Rc<T>` between threads.
However, a library might choose `Arc<T>` in order to give library consumers
more flexibility.

`Arc<T>` will implement `Send` and `Sync` as long as the `T` implements
`Send` and `Sync`. Why can't you put a non-thread-safe type `T` in an
`Arc<T>` to make it thread-safe? This may be a bit counter-intuitive at
first: after all, isn't the point of `Arc<T>` thread safety? The key is
this: `Arc<T>` makes it thread safe to have multiple ownership of the same
data, but it  doesn't add thread safety to its data. Consider
<code>Arc<[RefCell\<T>]></code>. `RefCell<T>` isn't `Sync`, and if `Arc<T>` was always
`Send`, <code>Arc<[RefCell\<T>]></code> would be as well. But then we'd have a problem:
`RefCell<T>` is not thread safe; it keeps track of the borrowing count using
non-atomic operations.

In the end, this means that you may need to pair `Arc<T>` with some sort of
`std::sync` type, usually `Mutex<T>`[mutex].

## Breaking cycles with `Weak`

The `downgrade`[downgrade] method can be used to create a non-owning
`Weak` pointer. A `Weak` pointer can be `upgrade`[upgrade]d
to an `Arc`, but this will return `None` if the value stored in the allocation has
already been dropped. In other words, `Weak` pointers do not keep the value
inside the allocation alive; however, they *do* keep the allocation
(the backing store for the value) alive.

A cycle between `Arc` pointers will never be deallocated. For this reason,
`Weak` is used to break cycles. For example, a tree could have
strong `Arc` pointers from parent nodes to children, and `Weak`
pointers from children back to their parents.

# Cloning references

Creating a new reference from an existing reference-counted pointer is done using the
`Clone` trait implemented for `Arc<T>`[Arc] and `Weak<T>`[Weak].

```rust
use std::sync::Arc;
let foo = Arc::new(vec![1.0, 2.0, 3.0]);
// The two syntaxes below are equivalent.
let a = foo.clone();
let b = Arc::clone(&foo);
// a, b, and foo are all Arcs that point to the same memory location
```

## `Deref` behavior

`Arc<T>` automatically dereferences to `T` (via the `Deref` trait),
so you can call `T`'s methods on a value of type `Arc<T>`. To avoid name
clashes with `T`'s methods, the methods of `Arc<T>` itself are associated
functions, called using [fully qualified syntax]:

```rust
use std::sync::Arc;

let my_arc = Arc::new(());
let my_weak = Arc::downgrade(&my_arc);
```

`Arc<T>`'s implementations of traits like `Clone` may also be called using
fully qualified syntax. Some people prefer to use fully qualified syntax,
while others prefer using method-call syntax.

```rust
use std::sync::Arc;

let arc = Arc::new(());
// Method-call syntax
let arc2 = arc.clone();
// Fully qualified syntax
let arc3 = Arc::clone(&arc);
```

`Weak<T>`[Weak] does not auto-dereference to `T`, because the inner value may have
already been dropped.

# Examples

Sharing some immutable data between threads:

```rust
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

Sharing a mutable `AtomicUsize`:

```rust
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

See the `rc` documentation for more examples of reference
counting in general.

## struct Weak

```rust
pub struct Weak< T: ?Sized, #[unstable(feature = "allocator_ext", issue = "163177", implied_by = "allocator_api")] A: Allocator = Global, >
```

`Weak` is a version of `Arc` that holds a non-owning reference to the
managed allocation.

The allocation is accessed by calling `upgrade` on the `Weak`
pointer, which returns an <code>[Option]<[Arc]\<T>></code>.

Since a `Weak` reference does not count towards ownership, it will not
prevent the value stored in the allocation from being dropped, and `Weak` itself makes no
guarantees about the value still being present. Thus it may return `None`
when `upgrade`d. Note however that a `Weak` reference *does* prevent the allocation
itself (the backing store) from being deallocated.

A `Weak` pointer is useful for keeping a temporary reference to the allocation
managed by `Arc` without preventing its inner value from being dropped. It is also used to
prevent circular references between `Arc` pointers, since mutual owning references
would never allow either `Arc` to be dropped. For example, a tree could
have strong `Arc` pointers from parent nodes to children, and `Weak`
pointers from children back to their parents.

The typical way to obtain a `Weak` pointer is to call `Arc::downgrade`.

## Arc::new

```rust
pub fn new(data: T) -> Arc<T>
```

Constructs a new `Arc<T>`.

# Examples

```rust
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
returns, calling `upgrade` on the weak reference inside your closure will
fail and result in a `None` value.

# Panics

If `data_fn` panics, the panic is propagated to the caller, and the
temporary `Weak<T>` is dropped normally.

# Example

```rust
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

## Arc::new_uninit

```rust
pub fn new_uninit() -> Arc<mem::MaybeUninit<T>>
```

Constructs a new `Arc` with uninitialized contents.

# Examples

```rust
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

See `MaybeUninit::zeroed`[zeroed] for examples of correct and incorrect usage
of this method.

# Examples

```rust
use std::sync::Arc;

let zero = Arc::<u32>::new_zeroed();
let zero = unsafe { zero.assume_init() };

assert_eq!(*zero, 0)
```

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

Otherwise, an `Err` is returned with the same `Arc` that was
passed in.

This will succeed even if there are outstanding weak references.

It is strongly recommended to use `Arc::into_inner` instead if you don't
keep the `Arc` in the `Err` case.
Immediately dropping the `Err`-value, as the expression
`Arc::try_unwrap(this).ok()` does, can cause the strong count to
drop to zero and the inner value of the `Arc` to be dropped.
For instance, if two threads execute such an expression in parallel,
there is a race condition without the possibility of unsafety:
The threads could first both check whether they own the last instance
in `Arc::try_unwrap`, determine that they both do not, and then both
discard and drop their instance in the call to `ok``Result::ok`.
In this scenario, the value inside the `Arc` is safely destroyed
by exactly one of the threads, but neither thread will ever be able
to use the value.

# Examples

```rust
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

Otherwise, `None` is returned and the `Arc` is dropped.

This will succeed even if there are outstanding weak references.

If `Arc::into_inner` is called on every clone of this `Arc`,
it is guaranteed that exactly one of the calls returns the inner value.
This means in particular that the inner value is not dropped.

`Arc::try_unwrap` is conceptually similar to `Arc::into_inner`, but it
is meant for different use-cases. If used as a direct replacement
for `Arc::into_inner` anyway, such as with the expression
`[Arc::try_unwrap]\(this).[ok]Result::ok`, then it does
**not** give the same guarantee as described in the previous paragraph.
For more information, see the examples below and read the documentation
of `Arc::try_unwrap`.

# Examples

Minimal example demonstrating the guarantee that `Arc::into_inner` gives.
```rust
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
```rust
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
}

// The following code could have still caused a stack overflow
// despite the manual `Drop` impl if that `Drop` impl had used
// `Arc::try_unwrap(arc).ok()` instead of `Arc::into_inner(arc)`.

// Create a long list and clone it
let mut x = LinkedList::new();
let size = 100000;
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
