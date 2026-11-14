---
title: "Await expressions"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/expressions/await-expr.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[expr.await]
# Await expressions

r[expr.await.syntax]
```grammar
AwaitExpression -> Expression `.` `await`
```

r[expr.await.intro]
An `await` expression is a syntactic construct for suspending a computation provided by an implementation of `std::future::IntoFuture` until the given future is ready to produce a value.

r[expr.await.construct]
The syntax for an await expression is an expression with a type that implements the [`IntoFuture`] trait, called the *future operand*, then the token `.`, and then the `await` keyword.

r[expr.await.allowed-positions]
Await expressions are legal only within an [async context], like an [`async fn`], [`async` closure], or [`async` block].

r[expr.await.effects]
More specifically, an await expression has the following effect.

1. Create a future by calling [`IntoFuture::into_future`] on the future operand.
2. Evaluate the future to a [future] `tmp`;
3. Pin `tmp` using [`Pin::new_unchecked`];
4. This pinned future is then polled by calling the [`Future::poll`] method and passing it the current task context;
5. If the call to `poll` returns [`Poll::Pending`], then the future returns `Poll::Pending`, suspending its state so that, when the surrounding async context is re-polled, execution returns to step 3;
6. Otherwise the call to `poll` must have returned [`Poll::Ready`], in which case the value contained in the [`Poll::Ready`] variant is used as the result of the `await` expression itself.

r[expr.await.edition2018]
> [!EDITION-2018]
> Await expressions are only available beginning with Rust 2018.

r[expr.await.task]
## Task context

The task context refers to the [`Context`] which was supplied to the current [async context] when the async context itself was polled. Because `await` expressions are only legal in an async context, there must be some task context available.

r[expr.await.desugar]
## Approximate desugaring

Effectively, an await expression is roughly equivalent to the following non-normative desugaring:

```rust
match operand.into_future() {
    mut pinned => loop {
        let mut pin = unsafe { Pin::new_unchecked(&mut pinned) };
        match Pin::future::poll(Pin::borrow(&mut pin), &mut current_context) {
            Poll::Ready(r) => break r,
            Poll::Pending => yield Poll::Pending,
        }
    }
}
```

where the `yield` pseudo-code returns `Poll::Pending` and, when re-invoked, resumes execution from that point. The variable `current_context` refers to the context taken from the async environment.
