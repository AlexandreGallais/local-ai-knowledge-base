---
title: "ch17-02-concurrency-with-async (part 3 of 3)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch17-02-concurrency-with-async.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch17-02-concurrency-with-async (part 3 of 3)

### Sending Data Between Two Tasks Using Message Passing

Sharing data between futures will also be familiar: we’ll use message passing
again, but this time with async versions of the types and functions. We’ll take
a slightly different path than we did in the “Transfer Data Between Threads
with Message Passing” section in
Chapter 16 to illustrate some of the key <example-value> between thread-based and
futures-based concurrency. In Listing 17-9, we’ll begin with just a single
async block—_not_ spawning a separate task as we spawned a separate thread.

**Listing 17-9: Creating an async channel and assigning the two halves to `tx` and `rx`** (src/main.rs)

```rust
let (tx, mut rx) = trpl::channel();

let val = String::from("hi");
tx.send(val).unwrap();

let received = rx.recv().await.unwrap();
println!("received '{received}'");
```

Here, we use `trpl::channel`, an async version of the multiple-producer,
single-consumer channel API we used with threads back in Chapter 16. The async
version of the API is only a little different from the thread-based version: it
uses a mutable rather than an immutable receiver `rx`, and its `recv` method
produces a future we need to await rather than producing the value directly.
Now we can send messages from the sender to the receiver. Notice that we don’t
have to spawn a separate thread or even a task; we merely need to await the
`rx.recv` call.

The synchronous `Receiver::recv` method in `std::mpsc::channel` blocks until it
receives a message. The `trpl::Receiver::recv` method does not, because it is
async. Instead of blocking, it hands control back to the runtime until either a
message is received or the send side of the channel closes. By contrast, we
don’t await the `send` call, because it doesn’t block. It doesn’t need to,
because the channel we’re sending it into is unbounded.

> Note: Because all of this async code runs in an async block in a
> `trpl::block_on` call, everything within it can avoid blocking. However, the
> code _outside_ it will block on the `block_on` function returning. That’s the
> whole point of the `trpl::block_on` function: it lets you _choose_ where to
> block on some set of async code, and thus where to transition between sync
> and async code.

Notice two things about this example. First, the message will arrive right
away. Second, although we use a future here, there’s no concurrency yet.
Everything in the listing happens in sequence, just as it would if there were
no futures involved.

Let’s address the first part by sending a series of messages and sleeping in
between them, as shown in Listing 17-10.

**Listing 17-10: Sending and receiving multiple messages over the async channel and sleeping with an `await` between each message** (src/main.rs)

```rust
let (tx, mut rx) = trpl::channel();

let vals = vec![
    String::from("hi"),
    String::from("from"),
    String::from("the"),
    String::from("future"),
];

for val in vals {
    tx.send(val).unwrap();
    trpl::sleep(Duration::from_millis(500)).await;
}

while let Some(value) = rx.recv().await {
    println!("received '{value}'");
}
```

In addition to sending the messages, we need to receive them. In this case,
because we know how many messages are coming in, we could do that manually by
calling `rx.recv().await` four times. In the real world, though, we’ll generally
be waiting on some _unknown_ number of messages, so we need to keep waiting
until we determine that there are no more messages.

In Listing 16-10, we used a `for` loop to process all the items received from a
synchronous channel. Rust doesn’t yet have a way to use a `for` loop with an
_asynchronously produced_ series of items, however, so we need to use a loop we
haven’t seen before: the `while let` conditional loop. This is the loop version
of the `if let` construct we saw back in the “Concise Control Flow with `if
let` and `let...else`” section in Chapter 6. The loop
will continue executing as long as the pattern it specifies continues to match
the value.

The `rx.recv` call produces a future, which we await. The runtime will pause
the future until it is ready. Once a message arrives, the future will resolve
to `Some(message)` as many times as a message arrives. When the channel closes,
regardless of whether _any_ messages have arrived, the future will instead
resolve to `None` to indicate that there are no more values and thus we should
stop polling—that is, stop awaiting.

The `while let` loop pulls all of this together. If the result of calling
`rx.recv().await` is `Some(message)`, we get access to the message and we can
use it in the loop body, just as we could with `if let`. If the result is
`None`, the loop ends. Every time the loop completes, it hits the await point
again, so the runtime pauses it again until another message arrives.

The code now successfully sends and receives all of the messages.
Unfortunately, there are still a couple of problems. For one thing, the
messages do not arrive at half-second intervals. They arrive all at once, 2
seconds (2,000 milliseconds) after we start the program. For another, this
program also never exits! Instead, it waits forever for new messages. You will
need to shut it down using `ctrl`-`C`.

#### Code Within One Async Block Executes Linearly

Let’s start by examining why the messages come in all at once after the full
delay, rather than coming in with delays between each one. Within a given async
block, the order in which `await` keywords appear in the code is also the order
in which they’re executed when the program runs.

There’s only one async block in Listing 17-10, so everything in it runs
linearly. There’s still no concurrency. All the `tx.send` calls happen,
interspersed with all of the `trpl::sleep` calls and their associated await
points. Only then does the `while let` loop get to go through any of the
`await` points on the `recv` calls.

To get the behavior we want, where the sleep delay happens between each
message, we need to put the `tx` and `rx` operations in their own async blocks,
as shown in Listing 17-11. Then the runtime can execute each of them separately
using `trpl::join`, just as in Listing 17-8. Once again, we await the result of
calling `trpl::join`, not the individual futures. If we awaited the individual
futures in sequence, we would just end up back in a sequential flow—exactly
what we’re trying _not_ to do.

**Listing 17-11: Separating `send` and `recv` into their own `async` blocks and awaiting the futures for those blocks** (src/main.rs)

```rust
let tx_fut = async {
    let vals = vec![
        String::from("hi"),
        String::from("from"),
        String::from("the"),
        String::from("future"),
    ];

    for val in vals {
        tx.send(val).unwrap();
        trpl::sleep(Duration::from_millis(500)).await;
    }
};

let rx_fut = async {
    while let Some(value) = rx.recv().await {
        println!("received '{value}'");
    }
};

trpl::join(tx_fut, rx_fut).await;
```

With the updated code in Listing 17-11, the messages get printed at
500-millisecond intervals, rather than all in a rush after 2 seconds.

#### Moving Ownership Into an Async Block

The program still never exits, though, because of the way the `while let` loop
interacts with `trpl::join`:

- The future returned from `trpl::join` completes only once _both_ futures
  passed to it have completed.
- The `tx_fut` future completes once it finishes sleeping after sending the last
  message in `vals`.
- The `rx_fut` future won’t complete until the `while let` loop ends.
- The `while let` loop won’t end until awaiting `rx.recv` produces `None`.
- Awaiting `rx.recv` will return `None` only once the other end of the channel
  is closed.
- The channel will close only if we call `rx.close` or when the sender side,
  `tx`, is dropped.
- We don’t call `rx.close` anywhere, and `tx` won’t be dropped until the
  outermost async block passed to `trpl::block_on` ends.
- The block can’t end because it is blocked on `trpl::join` completing, which
  takes us back to the top of this list.

Right now, the async block where we send the messages only _borrows_ `tx`
because sending a message doesn’t require ownership, but if we could _move_
`tx` into that async block, it would be dropped once that block ends. In the
“Capturing References or Moving Ownership”
section in Chapter 13, you learned how to use the `move` keyword with closures,
and, as discussed in the “Using `move` Closures with
Threads” section in Chapter 16, we often need to
move data into closures when working with threads. The same basic <example-value>
apply to async blocks, so the `move` keyword works with async blocks just as it
does with closures.

In Listing 17-12, we change the block used to send messages from `async` to
`async move`.

**Listing 17-12: A revision of the code from Listing 17-11 that correctly shuts down when complete** (src/main.rs)

```rust
let (tx, mut rx) = trpl::channel();

let tx_fut = async move {
    // --snip--
```

When we run _this_ version of the code, it shuts down gracefully after the last
message is sent and received. Next, let’s see what would need to change to send
data from more than one future.

#### Joining a Number of Futures with the `join!` Macro

This async channel is also a multiple-producer channel, so we can call `clone`
on `tx` if we want to send messages from multiple futures, as shown in Listing
17-13.

**Listing 17-13: Using multiple producers with async blocks** (src/main.rs)

```rust
let (tx, mut rx) = trpl::channel();

let tx1 = tx.clone();
let tx1_fut = async move {
    let vals = vec![
        String::from("hi"),
        String::from("from"),
        String::from("the"),
        String::from("future"),
    ];

    for val in vals {
        tx1.send(val).unwrap();
        trpl::sleep(Duration::from_millis(500)).await;
    }
};

let rx_fut = async {
    while let Some(value) = rx.recv().await {
        println!("received '{value}'");
    }
};

let tx_fut = async move {
    let vals = vec![
        String::from("more"),
        String::from("messages"),
        String::from("for"),
        String::from("you"),
    ];

    for val in vals {
        tx.send(val).unwrap();
        trpl::sleep(Duration::from_millis(1500)).await;
    }
};

trpl::join!(tx1_fut, tx_fut, rx_fut);
```

First, we clone `tx`, creating `tx1` outside the first async block. We move
`tx1` into that block just as we did before with `tx`. Then, later, we move the
original `tx` into a _new_ async block, where we send more messages on a
slightly slower delay. We happen to put this new async block after the async
block for receiving messages, but it could go before it just as well. The key is
the order in which the futures are awaited, not in which they’re created.

Both of the async blocks for sending messages need to be `async move` blocks so
that both `tx` and `tx1` get dropped when those blocks finish. Otherwise, we’ll
end up back in the same infinite loop we started out in.

Finally, we switch from `trpl::join` to `trpl::join!` to handle the additional
future: the `join!` macro awaits an arbitrary number of futures where we know
the number of futures at compile time. We’ll discuss awaiting a collection of
an unknown number of futures later in this chapter.

Now we see all the messages from both sending futures, and because the sending
futures use slightly different delays after sending, the messages are also
received at those different intervals:

```text
received 'hi'
received 'more'
received 'from'
received 'the'
received 'messages'
received 'future'
received 'for'
received 'you'
```

We’ve explored how to use message passing to send data between futures, how
code within an async block runs sequentially, how to move ownership into an
async block, and how to join multiple futures. Next, let’s discuss how and why
to tell the runtime it can switch to another task.
