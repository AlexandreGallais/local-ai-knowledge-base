---
title: "ch17-02-concurrency-with-async (part 2 of 3)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch17-02-concurrency-with-async.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch17-02-concurrency-with-async (part 2 of 3)

## Applying Concurrency with Async

In this section, we’ll apply async to some of the same concurrency challenges
we tackled with threads in Chapter 16. Because we already talked about a lot of
the key ideas there, in this section we’ll focus on what’s different between
threads and futures.

In many cases, the APIs for working with concurrency using async are very
similar to those for using threads. In other cases, they end up being quite
different. Even when the APIs _look_ similar between threads and async, they
often have different behavior—and they nearly always have different performance
characteristics.

### Creating a New Task with `spawn_task`

The first operation we tackled in the “Creating a New Thread with
`spawn`” section in Chapter 16 was counting up on
two separate threads. Let’s do the same using async. The `trpl` crate supplies
a `spawn_task` function that looks very similar to the `thread::spawn` API, and
a `sleep` function that is an async version of the `thread::sleep` API. We can
use these together to implement the counting example, as shown in Listing 17-6.

**Listing 17-6: Creating a new task to print one thing while the main task prints something else** (src/main.rs)

```rust
use std::time::Duration;

fn main() {
    trpl::block_on(async {
        trpl::spawn_task(async {
            for i in 1..10 {
                println!("hi number {i} from the first task!");
                trpl::sleep(Duration::from_millis(500)).await;
            }
        });

        for i in 1..5 {
            println!("hi number {i} from the second task!");
            trpl::sleep(Duration::from_millis(500)).await;
        }
    });
}
```

As our starting point, we set up our `main` function with `trpl::block_on` so
that our top-level function can be async.

> Note: From this point forward in the chapter, every example will include this
> exact same wrapping code with `trpl::block_on` in `main`, so we’ll often skip it
> just as we do with `main`. Remember to include it in your code!

Then we write two loops within that block, each containing a `trpl::sleep`
call, which waits for half a second (500 milliseconds) before sending the next
message. We put one loop in the body of a `trpl::spawn_task` and the other in a
top-level `for` loop. We also add an `await` after the `sleep` calls.

This code behaves similarly to the thread-based implementation—including the
fact that you may see the messages appear in a different order in your own
terminal when you run it:

```text
hi number 1 from the second task!
hi number 1 from the first task!
hi number 2 from the first task!
hi number 2 from the second task!
hi number 3 from the first task!
hi number 3 from the second task!
hi number 4 from the first task!
hi number 4 from the second task!
hi number 5 from the first task!
```

This version stops as soon as the `for` loop in the body of the main async
block finishes, because the task spawned by `spawn_task` is shut down when the
`main` function ends. If you want it to run all the way to the task’s
completion, you will need to use a join handle to wait for the first task to
complete. With threads, we used the `join` method to “block” until the thread
was done running. In Listing 17-7, we can use `await` to do the same thing,
because the task handle itself is a future. Its `Output` type is a `Result`, so
we also unwrap it after awaiting it.

**Listing 17-7: Using `await` with a join handle to run a task to completion** (src/main.rs)

```rust
let handle = trpl::spawn_task(async {
    for i in 1..10 {
        println!("hi number {i} from the first task!");
        trpl::sleep(Duration::from_millis(500)).await;
    }
});

for i in 1..5 {
    println!("hi number {i} from the second task!");
    trpl::sleep(Duration::from_millis(500)).await;
}

handle.await.unwrap();
```

This updated version runs until _both_ loops finish:

```text
hi number 1 from the second task!
hi number 1 from the first task!
hi number 2 from the first task!
hi number 2 from the second task!
hi number 3 from the first task!
hi number 3 from the second task!
hi number 4 from the first task!
hi number 4 from the second task!
hi number 5 from the first task!
hi number 6 from the first task!
hi number 7 from the first task!
hi number 8 from the first task!
hi number 9 from the first task!
```

So far, it looks like async and threads give us similar outcomes, just with
different syntax: using `await` instead of calling `join` on the join handle,
and awaiting the `sleep` calls.

The bigger difference is that we didn’t need to spawn another operating system
thread to do this. In fact, we don’t even need to spawn a task here. Because
async blocks compile to anonymous futures, we can put each loop in an async
block and have the runtime run them both to completion using the `trpl::join`
function.

In the “Waiting for All Threads to Finish”
section in Chapter 16, we showed how to use the `join` method on the
`JoinHandle` type returned when you call `std::thread::spawn`. The `trpl::join`
function is similar, but for futures. When you give it two futures, it produces
a single new future whose output is a tuple containing the output of each
future you passed in once they _both_ complete. Thus, in Listing 17-8, we use
`trpl::join` to wait for both `fut1` and `fut2` to finish. We do _not_ await
`fut1` and `fut2` but instead the new future produced by `trpl::join`. We
ignore the output, because it’s just a tuple containing two unit values.

**Listing 17-8: Using `trpl::join` to await two anonymous futures** (src/main.rs)

```rust
let fut1 = async {
    for i in 1..10 {
        println!("hi number {i} from the first task!");
        trpl::sleep(Duration::from_millis(500)).await;
    }
};

let fut2 = async {
    for i in 1..5 {
        println!("hi number {i} from the second task!");
        trpl::sleep(Duration::from_millis(500)).await;
    }
};

trpl::join(fut1, fut2).await;
```

When we run this, we see both futures run to completion:

```text
hi number 1 from the first task!
hi number 1 from the second task!
hi number 2 from the first task!
hi number 2 from the second task!
hi number 3 from the first task!
hi number 3 from the second task!
hi number 4 from the first task!
hi number 4 from the second task!
hi number 5 from the first task!
hi number 6 from the first task!
hi number 7 from the first task!
hi number 8 from the first task!
hi number 9 from the first task!
```

Now, you’ll see the exact same order every time, which is very different from
what we saw with threads and with `trpl::spawn_task` in Listing 17-7. That is
because the `trpl::join` function is _fair_, meaning it checks each future
equally often, alternating between them, and never lets one race ahead if the
other is ready. With threads, the operating system decides which thread to
check and how long to let it run. With async Rust, the runtime decides which
task to check. (In practice, the details get complicated because an async
runtime might use operating system threads under the hood as part of how it
manages concurrency, so guaranteeing fairness can be more work for a
runtime—but it’s still possible!) Runtimes don’t have to guarantee fairness for
any given operation, and they often offer different APIs to let you choose
whether or not you want fairness.

Try some of these variations on awaiting the futures and see what they do:

- Remove the async block from around either or both of the loops.
- Await each async block immediately after defining it.
- Wrap only the first loop in an async block, and await the resulting future
  after the body of second loop.

For an extra challenge, see if you can figure out what the output will be in
each case _before_ running the code!
