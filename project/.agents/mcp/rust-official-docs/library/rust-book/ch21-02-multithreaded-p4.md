---
title: "ch21-02-multithreaded (part 4 of 5)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch21-02-multithreaded.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch21-02-multithreaded (part 4 of 5)

The `spawn` function returns a `JoinHandle<T>`, where `T` is the type that the
closure returns. Let’s try using `JoinHandle` too and see what happens. In our
case, the closures we’re passing to the thread pool will handle the connection
and not return anything, so `T` will be the unit type `()`.

The code in Listing 21-14 will compile, but it doesn’t create any threads yet.
We’ve changed the definition of `ThreadPool` to hold a vector of
`thread::JoinHandle<()>` instances, initialized the vector with a capacity of
`size`, set up a `for` loop that will run some code to create the threads, and
returned a `ThreadPool` instance containing them.

**Listing 21-14: Creating a vector for `ThreadPool` to hold the threads** (src/lib.rs)

```rust
use std::thread;

pub struct ThreadPool {
    threads: Vec<thread::JoinHandle<()>>,
}

impl ThreadPool {
    // --snip--
```

We’ve brought `std::thread` into scope in the library crate because we’re
using `thread::JoinHandle` as the type of the items in the vector in
`ThreadPool`.

Once a valid size is received, our `ThreadPool` creates a new vector that can
hold `size` items. The `with_capacity` function performs the same task as
`Vec::new` but with an important difference: It pre-allocates space in the
vector. Because we know we need to store `size` elements in the vector, doing
this allocation up front is slightly more efficient than using `Vec::new`,
which resizes itself as elements are inserted.

When you run `cargo check` again, it should succeed.

#### Sending Code from the `ThreadPool` to a Thread

We left a comment in the `for` loop in Listing 21-14 regarding the creation of
threads. Here, we’ll look at how we actually create threads. The standard
library provides `thread::spawn` as a way to create threads, and
`thread::spawn` expects to get some code the thread should run as soon as the
thread is created. However, in our case, we want to create the threads and have
them _wait_ for code that we’ll send later. The standard library’s
implementation of threads doesn’t include any way to do that; we have to
implement it manually.

We’ll implement this behavior by introducing a new data structure between the
`ThreadPool` and the threads that will manage this new behavior. We’ll call
this data structure _Worker_, which is a common term in pooling
implementations. The `Worker` picks up code that needs to be run and runs the
code in its thread.

Think of people working in the kitchen at a restaurant: The workers wait until
orders come in from customers, and then they’re responsible for taking those
orders and filling them.

Instead of storing a vector of `JoinHandle<()>` instances in the thread pool,
we’ll store instances of the `Worker` struct. Each `Worker` will store a single
`JoinHandle<()>` instance. Then, we’ll implement a method on `Worker` that will
take a closure of code to run and send it to the already running thread for
execution. We’ll also give each `Worker` an `id` so that we can distinguish
between the different instances of `Worker` in the pool when logging or
debugging.

Here is the new process that will happen when we create a `ThreadPool`. We’ll
implement the code that sends the closure to the thread after we have `Worker`
set up in this way:

1. Define a `Worker` struct that holds an `id` and a `JoinHandle<()>`.
2. Change `ThreadPool` to hold a vector of `Worker` instances.
3. Define a `Worker::new` function that takes an `id` number and returns a
   `Worker` instance that holds the `id` and a thread spawned with an empty
   closure.
4. In `ThreadPool::new`, use the `for` loop counter to generate an `id`, create
   a new `Worker` with that `id`, and store the `Worker` in the vector.

If you’re up for a challenge, try implementing these changes on your own before
looking at the code in Listing 21-15.

Ready? Here is Listing 21-15 with one way to make the preceding modifications.

**Listing 21-15: Modifying `ThreadPool` to hold `Worker` instances instead of holding threads directly** (src/lib.rs)

```rust
use std::thread;

pub struct ThreadPool {
    workers: Vec<Worker>,
}

impl ThreadPool {
    // --snip--
```

We’ve changed the name of the field on `ThreadPool` from `threads` to `workers`
because it’s now holding `Worker` instances instead of `JoinHandle<()>`
instances. We use the counter in the `for` loop as an argument to
`Worker::new`, and we store each new `Worker` in the vector named `workers`.

External code (like our server in _src/main.rs_) doesn’t need to know the
implementation details regarding using a `Worker` struct within `ThreadPool`,
so we make the `Worker` struct and its `new` function private. The
`Worker::new` function uses the `id` we give it and stores a `JoinHandle<()>`
instance that is created by spawning a new thread using an empty closure.

> Note: If the operating system can’t create a thread because there aren’t
> enough system resources, `thread::spawn` will panic. That will cause our
> whole server to panic, even though the creation of some threads might
> succeed. For simplicity’s sake, this behavior is fine, but in a production
> thread pool implementation, you’d likely want to use
> `std::thread::Builder` and its
> `spawn` method that returns `Result` instead.

This code will compile and will store the number of `Worker` instances we
specified as an argument to `ThreadPool::new`. But we’re _still_ not processing
the closure that we get in `execute`. Let’s look at how to do that next.

#### Sending Requests to Threads via Channels

The next problem we’ll tackle is that the closures given to `thread::spawn` do
absolutely nothing. Currently, we get the closure we want to execute in the
`execute` method. But we need to give `thread::spawn` a closure to run when we
create each `Worker` during the creation of the `ThreadPool`.

We want the `Worker` structs that we just created to fetch the code to run from
a queue held in the `ThreadPool` and send that code to its thread to run.

The channels we learned about in Chapter 16—a simple way to communicate between
two threads—would be perfect for this use case. We’ll use a channel to function
as the queue of jobs, and `execute` will send a job from the `ThreadPool` to
the `Worker` instances, which will send the job to its thread. Here is the plan:

1. The `ThreadPool` will create a channel and hold on to the sender.
2. Each `Worker` will hold on to the receiver.
3. We’ll create a new `Job` struct that will hold the closures we want to send
   down the channel.
4. The `execute` method will send the job it wants to execute through the
   sender.
5. In its thread, the `Worker` will loop over its receiver and execute the
   closures of any jobs it receives.

Let’s start by creating a channel in `ThreadPool::new` and holding the sender
in the `ThreadPool` instance, as shown in Listing 21-16. The `Job` struct
doesn’t hold anything for now but will be the type of item we’re sending down
the channel.

**Listing 21-16: Modifying `ThreadPool` to store the sender of a channel that transmits `Job` instances** (src/lib.rs)

```rust
use std::{sync::mpsc, thread};

pub struct ThreadPool {
    workers: Vec<Worker>,
    sender: mpsc::Sender<Job>,
}

struct Job;

impl ThreadPool {
    // --snip--
```

In `ThreadPool::new`, we create our new channel and have the pool hold the
sender. This will successfully compile.

Let’s try passing a receiver of the channel into each `Worker` as the thread
pool creates the channel. We know we want to use the receiver in the thread that
the `Worker` instances spawn, so we’ll reference the `receiver` parameter in the
closure. The code in Listing 21-17 won’t quite compile yet.

**Listing 21-17: Passing the receiver to each `Worker`** (src/lib.rs)

```rust
impl ThreadPool {
    // --snip--
```

We’ve made some small and straightforward changes: We pass the receiver into
`Worker::new`, and then we use it inside the closure.

When we try to check this code, we get this error:

```console
$ cargo check
    Checking hello v0.1.0 (file:///projects/hello)
error[E0382]: use of moved value: `receiver`
  --> src/lib.rs:26:42
   |
21 |         let (sender, receiver) = mpsc::channel();
   |                      -------- move occurs because `receiver` has type `std::sync::mpsc::Receiver<Job>`, which does not implement the `Copy` trait
...
25 |         for id in 0..size {
   |         ----------------- inside of this loop
26 |             workers.push(Worker::new(id, receiver));
   |                                          ^^^^^^^^ value moved here, in previous iteration of loop
   |
note: consider changing this parameter type in method `new` to borrow instead if owning the value isn't necessary
  --> src/lib.rs:47:33
   |
47 |     fn new(id: usize, receiver: mpsc::Receiver<Job>) -> Worker {
   |        --- in this method       ^^^^^^^^^^^^^^^^^^^ this parameter takes ownership of the value

For more information about this error, try `rustc --explain E0382`.
error: could not compile `hello` (lib) due to 1 previous error
```

The code is trying to pass `receiver` to multiple `Worker` instances. This
won’t work, as you’ll recall from Chapter 16: The channel implementation that
Rust provides is multiple _producer_, single _consumer_. This means we can’t
just clone the consuming end of the channel to fix this code. We also don’t
want to send a message multiple times to multiple consumers; we want one list
of messages with multiple `Worker` instances such that each message gets
processed once.

Additionally, taking a job off the channel queue involves mutating the
`receiver`, so the threads need a safe way to share and modify `receiver`;
otherwise, we might get race conditions (as covered in Chapter 16).

Recall the thread-safe smart pointers discussed in Chapter 16: To share
ownership across multiple threads and allow the threads to mutate the value, we
need to use `Arc<Mutex<T>>`. The `Arc` type will let multiple `Worker` instances
own the receiver, and `Mutex` will ensure that only one `Worker` gets a job from
the receiver at a time. Listing 21-18 shows the changes we need to make.

**Listing 21-18: Sharing the receiver among the `Worker` instances using `Arc` and `Mutex`** (src/lib.rs)

```rust
use std::{
    sync::{Arc, Mutex, mpsc},
    thread,
};
// --snip--
```

In `ThreadPool::new`, we put the receiver in an `Arc` and a `Mutex`. For each
new `Worker`, we clone the `Arc` to bump the reference count so that the
`Worker` instances can share ownership of the receiver.

With these changes, the code compiles! We’re getting there!

#### Implementing the `execute` Method

Let’s finally implement the `execute` method on `ThreadPool`. We’ll also change
`Job` from a struct to a type alias for a trait object that holds the type of
closure that `execute` receives. As discussed in the “Type Synonyms and Type
Aliases” section in Chapter 20, type aliases
allow us to make long types shorter for ease of use. Look at Listing 21-19.

**Listing 21-19: Creating a `Job` type alias for a `Box` that holds each closure and then sending the job down the channel** (src/lib.rs)

```rust
// --snip--

type Job = Box<dyn FnOnce() + Send + 'static>;

impl ThreadPool {
    // --snip--
```

After creating a new `Job` instance using the closure we get in `execute`, we
send that job down the sending end of the channel. We’re calling `unwrap` on
`send` for the case that sending fails. This might happen if, for example, we
stop all our threads from executing, meaning the receiving end has stopped
receiving new messages. At the moment, we can’t stop our threads from
executing: Our threads continue executing as long as the pool exists. The
reason we use `unwrap` is that we know the failure case won’t happen, but the
compiler doesn’t know that.

But we’re not quite done yet! In the `Worker`, our closure being passed to
`thread::spawn` still only _references_ the receiving end of the channel.
Instead, we need the closure to loop forever, asking the receiving end of the
channel for a job and running the job when it gets one. Let’s make the change
shown in Listing 21-20 to `Worker::new`.

**Listing 21-20: Receiving and executing the jobs in the `Worker` instance’s thread** (src/lib.rs)

```rust
// --snip--

impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        let thread = thread::spawn(move || {
            loop {
                let job = receiver.lock().unwrap().recv().unwrap();

                println!("Worker {id} got a job; executing.");

                job();
            }
        });

        Worker { id, thread }
    }
}
```

Here, we first call `lock` on the `receiver` to acquire the mutex, and then we
call `unwrap` to panic on any errors. Acquiring a lock might fail if the mutex
is in a _poisoned_ state, which can happen if some other thread panicked while
holding the lock rather than releasing the lock. In this situation, calling
`unwrap` to have this thread panic is the correct action to take. Feel free to
change this `unwrap` to an `expect` with an error message that is meaningful to
you.

If we get the lock on the mutex, we call `recv` to receive a `Job` from the
channel. A final `unwrap` moves past any errors here as well, which might occur
if the thread holding the sender has shut down, similar to how the `send`
method returns `Err` if the receiver shuts down.

The call to `recv` blocks, so if there is no job yet, the current thread will
wait until a job becomes available. The `Mutex<T>` ensures that only one
`Worker` thread at a time is trying to request a job.

Our thread pool is now in a working state! Give it a `cargo run` and make some
requests:

```console
$ cargo run
   Compiling hello v0.1.0 (file:///projects/hello)
warning: field `workers` is never read
 --> src/lib.rs:7:5
  |
6 | pub struct ThreadPool {
  |            ---------- field in this struct
7 |     workers: Vec<Worker>,
  |     ^^^^^^^
  |
  = note: `#[warn(dead_code)]` on by default

warning: fields `id` and `thread` are never read
  --> src/lib.rs:48:5
   |
47 | struct Worker {
   |        ------ fields in this struct
48 |     id: usize,
   |     ^^
49 |     thread: thread::JoinHandle<()>,
   |     ^^^^^^

warning: `hello` (lib) generated 2 warnings
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 4.91s
     Running `target/debug/hello`
Worker 0 got a job; executing.
Worker 2 got a job; executing.
Worker 1 got a job; executing.
Worker 3 got a job; executing.
Worker 0 got a job; executing.
Worker 2 got a job; executing.
Worker 1 got a job; executing.
Worker 3 got a job; executing.
Worker 0 got a job; executing.
Worker 2 got a job; executing.
```
