# core::task::wake

## struct RawWaker

```rust
pub struct RawWaker
```

A `RawWaker` allows the implementor of a task executor to create a [`Waker`]
or a [`LocalWaker`] which provides customized wakeup behavior.

It consists of a data pointer and a [virtual function pointer table (vtable)][vtable]
that customizes the behavior of the `RawWaker`.

`RawWaker`s are unsafe to use.
Implementing the [`Wake`] trait is a safe alternative that requires memory allocation.

[vtable]: https://en.wikipedia.org/wiki/Virtual_method_table
[`Wake`]: ../../alloc/task/trait.Wake.html

## RawWaker::new

```rust
pub const fn new(data: *const (), vtable: &'static RawWakerVTable) -> RawWaker
```

Creates a new `RawWaker` from the provided `data` pointer and `vtable`.

The `data` pointer can be used to store arbitrary data as required
by the executor. This could be e.g. a type-erased pointer to an `Arc`
that is associated with the task.
The value of this pointer will get passed to all functions that are part
of the `vtable` as the first parameter.

It is important to consider that the `data` pointer must point to a
thread safe type such as an `Arc<T: Send + Sync>`
when used to construct a [`Waker`]. This restriction is lifted when
constructing a [`LocalWaker`], which allows using types that do not implement
<code>[Send] + [Sync]</code> like `Rc<T>`.

The `vtable` customizes the behavior of a `Waker` which gets created
from a `RawWaker`. For each operation on the `Waker`, the associated
function in the `vtable` of the underlying `RawWaker` will be called.

## struct RawWakerVTable

```rust
pub struct RawWakerVTable
```

A virtual function pointer table (vtable) that specifies the behavior
of a [`RawWaker`].

The pointer passed to all functions inside the vtable is the `data` pointer
from the enclosing [`RawWaker`] object.

The functions inside this struct are only intended to be called on the `data`
pointer of a properly constructed [`RawWaker`] object from inside the
[`RawWaker`] implementation. Calling one of the contained functions using
any other `data` pointer will cause undefined behavior.

Note that while this type implements `PartialEq`, comparing function pointers, and hence
comparing structs like this that contain function pointers, is unreliable: pointers to the same
function can compare inequal (because functions are duplicated in multiple codegen units), and
pointers to *different* functions can compare equal (since identical functions can be
deduplicated within a codegen unit).

# Thread safety
If the [`RawWaker`] will be used to construct a [`Waker`] then
these functions must all be thread-safe (even though [`RawWaker`] is
<code>\![Send] + \![Sync]</code>). This is because [`Waker`] is <code>[Send] + [Sync]</code>,
and it may be moved to arbitrary threads or invoked by `&` reference. For example,
this means that if the `clone` and `drop` functions manage a reference count,
they must do so atomically.

However, if the [`RawWaker`] will be used to construct a [`LocalWaker`] instead, then
these functions don't need to be thread safe. This means that <code>\![Send] + \![Sync]</code>
 data can be stored in the data pointer, and reference counting does not need any atomic
synchronization. This is because [`LocalWaker`] is not thread safe itself, so it cannot
be sent across threads.

## RawWakerVTable::new

```rust
pub const fn new( clone: unsafe fn(*const ()) -> RawWaker, wake: unsafe fn(*const ()), wake_by_ref: unsafe fn(*const ()), drop: unsafe fn(*const ()), ) -> Self
```

Creates a new `RawWakerVTable` from the provided `clone`, `wake`,
`wake_by_ref`, and `drop` functions.

If the [`RawWaker`] will be used to construct a [`Waker`] then
these functions must all be thread-safe (even though [`RawWaker`] is
<code>\![Send] + \![Sync]</code>). This is because [`Waker`] is <code>[Send] + [Sync]</code>,
and it may be moved to arbitrary threads or invoked by `&` reference. For example,
this means that if the `clone` and `drop` functions manage a reference count,
they must do so atomically.

However, if the [`RawWaker`] will be used to construct a [`LocalWaker`] instead, then
these functions don't need to be thread safe. This means that <code>\![Send] + \![Sync]</code>
data can be stored in the data pointer, and reference counting does not need any atomic
synchronization. This is because [`LocalWaker`] is not thread safe itself, so it cannot
be sent across threads.
# `clone`

This function will be called when the [`RawWaker`] gets cloned, e.g. when
the [`Waker`]/[`LocalWaker`] in which the [`RawWaker`] is stored gets cloned.

The implementation of this function must retain all resources that are
required for this additional instance of a [`RawWaker`] and associated
task. Calling `wake` on the resulting [`RawWaker`] should result in a wakeup
of the same task that would have been awoken by the original [`RawWaker`].

# `wake`

This function will be called when `wake` is called on the [`Waker`].
It must wake up the task associated with this [`RawWaker`].

The implementation of this function must make sure to release any
resources that are associated with this instance of a [`RawWaker`] and
associated task.

# `wake_by_ref`

This function will be called when `wake_by_ref` is called on the [`Waker`].
It must wake up the task associated with this [`RawWaker`].

This function is similar to `wake`, but must not consume the provided data
pointer.

# `drop`

This function will be called when a [`Waker`]/[`LocalWaker`] gets
dropped.

The implementation of this function must make sure to release any
resources that are associated with this instance of a [`RawWaker`] and
associated task.

## struct Context

```rust
pub struct Context<'a>
```

The context of an asynchronous task.

Currently, `Context` only serves to provide access to a [`&Waker`](Waker)
which can be used to wake the current task.

## Context::from_waker

```rust
pub const fn from_waker(waker: &'a Waker) -> Self
```

Creates a new `Context` from a [`&Waker`](Waker).

## Context::waker

```rust
pub const fn waker(&self) -> &'a Waker
```

Returns a reference to the [`Waker`] for the current task.

## struct Waker

```rust
pub struct Waker
```

A `Waker` is a handle for waking up a task by notifying its executor that it
is ready to be run.

This handle encapsulates a [`RawWaker`] instance, which defines the
executor-specific wakeup behavior.

The typical life of a `Waker` is that it is constructed by an executor, wrapped in a
[`Context`], then passed to [`Future::poll()`]. Then, if the future chooses to return
[`Poll::Pending`], it must also store the waker somehow and call [`Waker::wake()`] when
the future should be polled again.

Implements [`Clone`], [`Send`], and [`Sync`]; therefore, a waker may be invoked
from any thread, including ones not in any way managed by the executor. For example,
this might be done to wake a future when a blocking function call completes on another
thread.

Note that it is preferable to use `waker.clone_from(&new_waker)` instead
of `*waker = new_waker.clone()`, as the former will avoid cloning the waker
unnecessarily if the two wakers [wake the same task](Self::will_wake).

Constructing a `Waker` from a [`RawWaker`] is unsafe.
Implementing the [`Wake`] trait is a safe alternative that requires memory allocation.

[`Future::poll()`]: core::future::Future::poll
[`Poll::Pending`]: core::task::Poll::Pending
[`Wake`]: ../../alloc/task/trait.Wake.html

## Waker::wake

```rust
pub fn wake(self)
```

Wakes up the task associated with this `Waker`.

As long as the executor keeps running and the task is not finished,
it is guaranteed that each invocation of [`wake()`](Self::wake) (or
[`wake_by_ref()`](Self::wake_by_ref)) will be followed by at least one
[`poll()`] of the task to which this `Waker` belongs, such that the call to
[`wake()`](Self::wake) (or [`wake_by_ref()`](Self::wake_by_ref)) _happens-before_
the beginning of the invocation of [`poll()`]. This makes it possible to temporarily
yield to other tasks while running potentially unbounded processing loops.

Note that the above implies that multiple wake-ups may be coalesced into a
single [`poll()`] invocation by the executor.

Also note that yielding to competing tasks is not guaranteed: it is the
executor’s choice which task to run and the executor may choose to run the
current task again.

[`poll()`]: crate::future::Future::poll

## Waker::wake_by_ref

```rust
pub fn wake_by_ref(&self)
```

Wakes up the task associated with this `Waker` without consuming the `Waker`.

This is similar to [`wake()`](Self::wake), but may be slightly less efficient in
the case where an owned `Waker` is available. This method should be preferred to
calling `waker.clone().wake()`.

## Waker::will_wake

```rust
pub fn will_wake(&self, other: &Waker) -> bool
```

Returns `true` if this `Waker` and another `Waker` would awake the same task.

This function works on a best-effort basis, and may return false even
when the `Waker`s would awaken the same task. However, if this function
returns `true`, it is guaranteed that the `Waker`s will awaken the same task.

This function is primarily used for optimization purposes — for example,
this type's [`clone_from`](Self::clone_from) implementation uses it to
avoid cloning the waker when they would wake the same task anyway.

## Waker::new

```rust
pub const unsafe fn new(data: *const (), vtable: &'static RawWakerVTable) -> Self
```

Creates a new `Waker` from the provided `data` pointer and `vtable`.

The `data` pointer can be used to store arbitrary data as required
by the executor. This could be e.g. a type-erased pointer to an `Arc`
that is associated with the task.
The value of this pointer will get passed to all functions that are part
of the `vtable` as the first parameter.

It is important to consider that the `data` pointer must point to a
thread safe type such as an `Arc`.

The `vtable` customizes the behavior of a `Waker`. For each operation
on the `Waker`, the associated function in the `vtable` will be called.

# Safety

The behavior of the returned `Waker` is undefined if the contract defined
in [`RawWakerVTable`]'s documentation is not upheld.

(Authors wishing to avoid unsafe code may implement the [`Wake`] trait instead, at the
cost of a required heap allocation.)

[`Wake`]: ../../alloc/task/trait.Wake.html

## Waker::from_raw

```rust
pub const unsafe fn from_raw(waker: RawWaker) -> Waker
```

Creates a new `Waker` from [`RawWaker`].

# Safety

The behavior of the returned `Waker` is undefined if the contract defined
in [`RawWaker`]'s and [`RawWakerVTable`]'s documentation is not upheld.

(Authors wishing to avoid unsafe code may implement the [`Wake`] trait instead, at the
cost of a required heap allocation.)

[`Wake`]: ../../alloc/task/trait.Wake.html

## Waker::noop

```rust
pub const fn noop() -> &'static Waker
```

This is mostly useful for writing tests that need a [`Context`] to poll
some futures, but are not expecting those futures to wake the waker or
do not need to do anything specific if it happens.

More generally, using `Waker::noop()` to poll a future
means discarding the notification of when the future should be polled again.
So it should only be used when such a notification will not be needed to make progress.

If an owned `Waker` is needed, `clone()` this one.

# Examples

```
use std::future::Future;
use std::task;

let mut cx = task::Context::from_waker(task::Waker::noop());

let mut future = Box::pin(async { 10 });
assert_eq!(future.as_mut().poll(&mut cx), task::Poll::Ready(10));
```

## Waker::data

```rust
pub fn data(&self) -> *const ()
```

Gets the `data` pointer used to create this `Waker`.

## Waker::vtable

```rust
pub fn vtable(&self) -> &'static RawWakerVTable
```

Gets the `vtable` pointer used to create this `Waker`.