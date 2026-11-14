---
title: "std::alloc"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/alloc.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::alloc

Memory allocation APIs.

In a given program, the standard library has one “global” memory allocator
that is used for example by `Box<T>` and `Vec<T>`.

Currently the default global allocator is unspecified. Libraries, however,
like `cdylib`s and `staticlib`s are guaranteed to use the `System` by
default.

#### The `#[global_allocator]` attribute

This attribute allows configuring the choice of global allocator.
You can use this to implement a completely custom global allocator
to route all[^system-alloc] default allocation requests to a custom object.

```rust
use std::alloc::{GlobalAlloc, System, Layout};

struct MyAllocator;

unsafe impl GlobalAlloc for MyAllocator {
    unsafe fn alloc(&self, layout: Layout) -> *mut u8 {
        unsafe { System.alloc(layout) }
    }

    unsafe fn dealloc(&self, ptr: *mut u8, layout: Layout) {
        unsafe { System.dealloc(ptr, layout) }
    }
}

#[global_allocator]
static GLOBAL: MyAllocator = MyAllocator;

fn main() {
    // This `Vec` will allocate memory through `GLOBAL` above
    let mut v = Vec::new();
    v.push(1);
}
```

The attribute is used on a `static` item whose type implements the
`GlobalAlloc` trait. This type can be provided by an external library:

```
use jemallocator::Jemalloc;

#[global_allocator]
static GLOBAL: Jemalloc = Jemalloc;

fn main() {}
```rust

The `#[global_allocator]` can only be used once in a crate
or its recursive dependencies.

The global allocator is invoked via the functions in this module
(`alloc`[crate::alloc::alloc], `alloc_zeroed`, `dealloc`, `realloc`). Note, however,
that invoking those functions is *not* equivalent to directly invoking the underlying methods on
the declared global allocator! See the documentation of those functions for details.

[^system-alloc]: Note that the Rust standard library internals may still
directly call `System` when necessary (for example for the runtime
support typically required to implement a global allocator, see [re-entrance] on `GlobalAlloc`
for more details).

[re-entrance]: trait.GlobalAlloc.html#re-entrance

## struct System

```rust
pub struct System
```

The default memory allocator provided by the operating system.

This is based on `malloc` on Unix platforms and `HeapAlloc` on Windows,
plus related functions. However, it is not valid to mix use of the backing
system allocator with `System`, as this implementation may include extra
work, such as to serve alignment requests greater than the alignment
provided directly by the backing system allocator.

This type implements the `GlobalAlloc` trait. Currently the default
global allocator is unspecified. Libraries, however, like `cdylib`s and
`staticlib`s are guaranteed to use the `System` by default and as such
work as if they had this definition:

```rust
use std::alloc::System;

#[global_allocator]
static A: System = System;

fn main() {
    let a = Box::new(4); // Allocates from the system allocator.
    println!("{a}");
}
```

Note that this does *not* mean you can deallocate allocations from `Global`
with `System` (or vice-versa), as the `Global` allocator is special in
the compiler. For more details, see the relevant docs about
`#[global_allocator]`.

You can also define your own wrapper around `System` if you'd like, such as
keeping track of the number of all bytes allocated (note that due to
optimizations, this may not be accurate):

```rust
use std::alloc::{System, GlobalAlloc, Layout};
use std::sync::atomic::{AtomicUsize, Ordering::Relaxed};

struct Counter;

static ALLOCATED: AtomicUsize = AtomicUsize::new(0);

unsafe impl GlobalAlloc for Counter {
    unsafe fn alloc(&self, layout: Layout) -> *mut u8 {
        let ret = unsafe { System.alloc(layout) };
        if !ret.is_null() {
            ALLOCATED.fetch_add(layout.size(), Relaxed);
        }
        ret
    }

    unsafe fn dealloc(&self, ptr: *mut u8, layout: Layout) {
        unsafe { System.dealloc(ptr, layout); }
        ALLOCATED.fetch_sub(layout.size(), Relaxed);
    }
}

#[global_allocator]
static A: Counter = Counter;

fn main() {
    println!("allocated bytes before main: {}", ALLOCATED.load(Relaxed));
}
```

It can also be used directly to allocate memory independently of whatever
global allocator has been selected for a Rust program. For example if a Rust
program opts in to using jemalloc as the global allocator, `System` will
still allocate memory using `malloc` and `HeapAlloc`.
