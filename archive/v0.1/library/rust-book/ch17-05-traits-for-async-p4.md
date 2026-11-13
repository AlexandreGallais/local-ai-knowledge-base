---
title: "ch17-05-traits-for-async (part 4 of 4)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch17-05-traits-for-async.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch17-05-traits-for-async (part 4 of 4)

### The `Stream` Trait

Now that you have a deeper grasp on the `Future`, `Pin`, and `Unpin` traits, we
can turn our attention to the `Stream` trait. As you learned earlier in the
chapter, streams are similar to asynchronous iterators. Unlike `Iterator` and
`Future`, however, `Stream` has no definition in the standard library as of
this writing, but there _is_ a very common definition from the `futures` crate
used throughout the ecosystem.

Let’s review the definitions of the `Iterator` and `Future` traits before
looking at how a `Stream` trait might merge them together. From `Iterator`, we
have the idea of a sequence: its `next` method provides an
`Option<Self::Item>`. From `Future`, we have the idea of readiness over time:
its `poll` method provides a `Poll<Self::Output>`. To represent a sequence of
items that become ready over time, we define a `Stream` trait that puts those
features together:

```rust
use std::pin::Pin;
use std::task::{Context, Poll};

trait Stream {
    type Item;

    fn poll_next(
        self: Pin<&mut Self>,
        cx: &mut Context<'_>
    ) -> Poll<Option<Self::Item>>;
}
```

The `Stream` trait defines an associated type called `Item` for the type of the
items produced by the stream. This is similar to `Iterator`, where there may be
zero to many items, and unlike `Future`, where there is always a single
`Output`, even if it’s the unit type `()`.

`Stream` also defines a method to get those items. We call it `poll_next`, to
make it clear that it polls in the same way `Future::poll` does and produces a
sequence of items in the same way `Iterator::next` does. Its return type
combines `Poll` with `Option`. The outer type is `Poll`, because it has to be
checked for readiness, just as a future does. The inner type is `Option`,
because it needs to signal whether there are more messages, just as an iterator
does.

Something very similar to this definition will likely end up as part of Rust’s
standard library. In the meantime, it’s part of the toolkit of most runtimes,
so you can rely on it, and everything we cover next should generally apply!

In the examples we saw in the “Streams: Futures in Sequence” section, though, we didn’t use `poll_next` _or_ `Stream`, but
instead used `next` and `StreamExt`. We _could_ work directly in terms of the
`poll_next` API by hand-writing our own `Stream` state machines, of course,
just as we _could_ work with futures directly via their `poll` method. Using
`await` is much nicer, though, and the `StreamExt` trait supplies the `next`
method so we can do just that:

```rust
trait StreamExt: Stream {
    async fn next(&mut self) -> Option<Self::Item>
    where
        Self: Unpin;

    // other methods...
}
```

> Note: The actual definition we used earlier in the chapter looks slightly
> different than this, because it supports versions of Rust that did not yet
> support using async functions in traits. As a result, it looks like this:
>
> ```rust,ignore
> fn next(&mut self) -> Next<'_, Self> where Self: Unpin;
> ```
>
> That `Next` type is a `struct` that implements `Future` and allows us to name
> the lifetime of the reference to `self` with `Next<'_, Self>`, so that `await`
> can work with this method.

The `StreamExt` trait is also the home of all the interesting methods available
to use with streams. `StreamExt` is automatically implemented for every type
that implements `Stream`, but these traits are defined separately to enable the
community to iterate on convenience APIs without affecting the foundational
trait.

In the version of `StreamExt` used in the `trpl` crate, the trait not only
defines the `next` method but also supplies a default implementation of `next`
that correctly handles the details of calling `Stream::poll_next`. This means
that even when you need to write your own streaming data type, you _only_ have
to implement `Stream`, and then anyone who uses your data type can use
`StreamExt` and its methods with it automatically.

That’s all we’re going to cover for the lower-level details on these traits. To
wrap up, let’s consider how futures (including streams), tasks, and threads all
fit together!
