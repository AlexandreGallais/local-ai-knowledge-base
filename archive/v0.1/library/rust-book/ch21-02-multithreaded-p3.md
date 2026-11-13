---
title: "ch21-02-multithreaded (part 3 of 5)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch21-02-multithreaded.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch21-02-multithreaded (part 3 of 5)

### Improving Throughput with a Thread Pool

A _thread pool_ is a group of spawned threads that are ready and waiting to
handle a task. When the program receives a new task, it assigns one of the
threads in the pool to the task, and that thread will process the task. The
remaining threads in the pool are available to handle any other tasks that come
in while the first thread is processing. When the first thread is done
processing its task, it’s returned to the pool of idle threads, ready to handle
a new task. A thread pool allows you to process connections concurrently,
increasing the throughput of your server.

We’ll limit the number of threads in the pool to a small number to protect us
from DoS attacks; if we had our program create a new thread for each request as
it came in, someone making 10 million requests to our server could wreak havoc
by using up all our server’s resources and grinding the processing of requests
to a halt.

Rather than spawning unlimited threads, then, we’ll have a fixed number of
threads waiting in the pool. Requests that come in are sent to the pool for
processing. The pool will maintain a queue of incoming requests. Each of the
threads in the pool will pop off a request from this queue, handle the request,
and then ask the queue for another request. With this design, we can process up
to _`N`_ requests concurrently, where _`N`_ is the number of threads. If each
thread is responding to a long-running request, subsequent requests can still
back up in the queue, but we’ve increased the number of long-running requests
we can handle before reaching that point.

This technique is just one of many ways to improve the throughput of a web
server. Other options you might explore are the fork/join model, the
single-threaded async I/O model, and the multithreaded async I/O model. If
you’re interested in this topic, you can read more about other solutions and
try to implement them; with a low-level language like Rust, all of these
options are possible.

Before we begin implementing a thread pool, let’s talk about what using the
pool should look like. When you’re trying to design code, writing the client
interface first can help guide your design. Write the API of the code so that
it’s structured in the way you want to call it; then, implement the
functionality within that structure rather than implementing the functionality
and then designing the public API.

Similar to how we used test-driven development in the project in Chapter 12,
we’ll use compiler-driven development here. We’ll write the code that calls the
functions we want, and then we’ll look at errors from the compiler to determine
what we should change next to get the code to work. Before we do that, however,
we’ll explore the technique we’re not going to use as a starting point.

#### Spawning a Thread for Each Request

First, let’s explore how our code might look if it did create a new thread for
every connection. As mentioned earlier, this isn’t our final plan due to the
problems with potentially spawning an unlimited number of threads, but it is a
starting point to get a working multithreaded server first. Then, we’ll add the
thread pool as an improvement, and contrasting the two solutions will be easier.

Listing 21-11 shows the changes to make to `main` to spawn a new thread to
handle each stream within the `for` loop.

**Listing 21-11: Spawning a new thread for each stream** (src/main.rs)

```rust
fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        thread::spawn(|| {
            handle_connection(stream);
        });
    }
}
```

As you learned in Chapter 16, `thread::spawn` will create a new thread and then
run the code in the closure in the new thread. If you run this code and load
_/sleep_ in your browser, then _/_ in two more browser tabs, you’ll indeed see
that the requests to _/_ don’t have to wait for _/sleep_ to finish. However, as
we mentioned, this will eventually overwhelm the system because you’d be making
new threads without any limit.

You may also recall from Chapter 17 that this is exactly the kind of situation
where async and await really shine! Keep that in mind as we build the thread
pool and think about how things would look different or the same with async.

#### Creating a Finite Number of Threads

We want our thread pool to work in a similar, familiar way so that switching
from threads to a thread pool doesn’t require large changes to the code that
uses our API. Listing 21-12 shows the hypothetical interface for a `ThreadPool`
struct we want to use instead of `thread::spawn`.

**Listing 21-12: Our ideal `ThreadPool` interface** (src/main.rs)

```rust
fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(4);

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        pool.execute(|| {
            handle_connection(stream);
        });
    }
}
```

We use `ThreadPool::new` to create a new thread pool with a configurable number
of threads, in this case four. Then, in the `for` loop, `pool.execute` has a
similar interface as `thread::spawn` in that it takes a closure that the pool
should run for each stream. We need to implement `pool.execute` so that it
takes the closure and gives it to a thread in the pool to run. This code won’t
yet compile, but we’ll try so that the compiler can guide us in how to fix it.

#### Building `ThreadPool` Using Compiler-Driven Development

Make the changes in Listing 21-12 to _src/main.rs_, and then let’s use the
compiler errors from `cargo check` to drive our development. Here is the first
error we get:

```console
$ cargo check
    Checking hello v0.1.0 (file:///projects/hello)
error[E0433]: cannot find type `ThreadPool` in this scope
  --> src/main.rs:11:16
   |
11 |     let pool = ThreadPool::new(4);
   |                ^^^^^^^^^^ use of undeclared type `ThreadPool`

For more information about this error, try `rustc --explain E0433`.
error: could not compile `hello` (bin "hello") due to 1 previous error
```

Great! This error tells us we need a `ThreadPool` type or module, so we’ll
build one now. Our `ThreadPool` implementation will be independent of the kind
of work our web server is doing. So, let’s switch the `hello` crate from a
binary crate to a library crate to hold our `ThreadPool` implementation. After
we change to a library crate, we could also use the separate thread pool
library for any work we want to do using a thread pool, not just for serving
web requests.

Create a _src/lib.rs_ file that contains the following, which is the simplest
definition of a `ThreadPool` struct that we can have for now:

**Listing** (src/lib.rs)

```rust
pub struct ThreadPool;
```

Then, edit the _main.rs_ file to bring `ThreadPool` into scope from the library
crate by adding the following code to the top of _src/main.rs_:

**Listing** (src/main.rs)

```rust
use hello::ThreadPool;
```

This code still won’t work, but let’s check it again to get the next error that
we need to address:

```console
$ cargo check
    Checking hello v0.1.0 (file:///projects/hello)
error[E0599]: no associated function or constant named `new` found for struct `ThreadPool` in the current scope
  --> src/main.rs:12:28
   |
12 |     let pool = ThreadPool::new(4);
   |                            ^^^ associated function or constant not found in `ThreadPool`

For more information about this error, try `rustc --explain E0599`.
error: could not compile `hello` (bin "hello") due to 1 previous error
```

This error indicates that next we need to create an associated function named
`new` for `ThreadPool`. We also know that `new` needs to have one parameter
that can accept `4` as an argument and should return a `ThreadPool` instance.
Let’s implement the simplest `new` function that will have those
characteristics:

**Listing** (src/lib.rs)

```rust
pub struct ThreadPool;

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        ThreadPool
    }
}
```

We chose `usize` as the type of the `size` parameter because we know that a
negative number of threads doesn’t make any sense. We also know we’ll use this
`4` as the number of elements in a collection of threads, which is what the
`usize` type is for, as discussed in the “Integer Types” section in Chapter 3.

Let’s check the code again:

```console
$ cargo check
    Checking hello v0.1.0 (file:///projects/hello)
error[E0599]: no method named `execute` found for struct `ThreadPool` in the current scope
  --> src/main.rs:17:14
   |
17 |         pool.execute(|| {
   |         -----^^^^^^^ method not found in `ThreadPool`

For more information about this error, try `rustc --explain E0599`.
error: could not compile `hello` (bin "hello") due to 1 previous error
```

Now the error occurs because we don’t have an `execute` method on `ThreadPool`.
Recall from the “Creating a Finite Number of
Threads” section that we
decided our thread pool should have an interface similar to `thread::spawn`. In
addition, we’ll implement the `execute` function so that it takes the closure
it’s given and gives it to an idle thread in the pool to run.

We’ll define the `execute` method on `ThreadPool` to take a closure as a
parameter. Recall from the “Moving Captured Values Out of
Closures” in Chapter 13 that we can
take closures as parameters with three different traits: `Fn`, `FnMut`, and
`FnOnce`. We need to decide which kind of closure to use here. We know we’ll
end up doing something similar to the standard library `thread::spawn`
implementation, so we can look at what bounds the signature of `thread::spawn`
has on its parameter. The documentation shows us the following:

```rust
pub fn spawn<F, T>(f: F) -> JoinHandle<T>
    where
        F: FnOnce() -> T,
        F: Send + 'static,
        T: Send + 'static,
```

The `F` type parameter is the one we’re concerned with here; the `T` type
parameter is related to the return value, and we’re not concerned with that. We
can see that `spawn` uses `FnOnce` as the trait bound on `F`. This is probably
what we want as well, because we’ll eventually pass the argument we get in
`execute` to `spawn`. We can be further confident that `FnOnce` is the trait we
want to use because the thread for running a request will only execute that
request’s closure one time, which matches the `Once` in `FnOnce`.

The `F` type parameter also has the trait bound `Send` and the lifetime bound
`'static`, which are useful in our situation: We need `Send` to transfer the
closure from one thread to another and `'static` because we don’t know how long
the thread will take to execute. Let’s create an `execute` method on
`ThreadPool` that will take a generic parameter of type `F` with these bounds:

**Listing** (src/lib.rs)

```rust
impl ThreadPool {
    // --snip--
```

We still use the `()` after `FnOnce` because this `FnOnce` represents a closure
that takes no parameters and returns the unit type `()`. Just like function
definitions, the return type can be omitted from the signature, but even if we
have no parameters, we still need the parentheses.

Again, this is the simplest implementation of the `execute` method: It does
nothing, but we’re only trying to make our code compile. Let’s check it again:

```console
$ cargo check
    Checking hello v0.1.0 (file:///projects/hello)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.24s
```

It compiles! But note that if you try `cargo run` and make a request in the
browser, you’ll see the errors in the browser that we saw at the beginning of
the chapter. Our library isn’t actually calling the closure passed to `execute`
yet!

> Note: A saying you might hear about languages with strict compilers, such as
> Haskell and Rust, is “If the code compiles, it works.” But this saying is not
> universally true. Our project compiles, but it does absolutely nothing! If we
> were building a real, complete project, this would be a good time to start
> writing unit tests to check that the code compiles _and_ has the behavior we
> want.

Consider: What would be different here if we were going to execute a future
instead of a closure?

#### Validating the Number of Threads in `new`

We aren’t doing anything with the parameters to `new` and `execute`. Let’s
implement the bodies of these functions with the behavior we want. To start,
let’s think about `new`. Earlier we chose an unsigned type for the `size`
parameter because a pool with a negative number of threads makes no sense.
However, a pool with zero threads also makes no sense, yet zero is a perfectly
valid `usize`. We’ll add code to check that `size` is greater than zero before
we return a `ThreadPool` instance, and we’ll have the program panic if it
receives a zero by using the `assert!` macro, as shown in Listing 21-13.

**Listing 21-13: Implementing `ThreadPool::new` to panic if `size` is zero** (src/lib.rs)

```rust
impl ThreadPool {
    /// Create a new ThreadPool.
    ///
    /// The size is the number of threads in the pool.
    ///
    /// # Panics
    ///
    /// The `new` function will panic if the size is zero.
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        ThreadPool
    }

    // --snip--
```

We’ve also added some documentation for our `ThreadPool` with doc comments.
Note that we followed good documentation practices by adding a section that
calls out the situations in which our function can panic, as discussed in
Chapter 14. Try running `cargo doc --open` and clicking the `ThreadPool` struct
to see what the generated docs for `new` look like!

Instead of adding the `assert!` macro as we’ve done here, we could change `new`
into `build` and return a `Result` like we did with `Config::build` in the I/O
project in Listing 12-9. But we’ve decided in this case that trying to create a
thread pool without any threads should be an unrecoverable error. If you’re
feeling ambitious, try to write a function named `build` with the following
signature to compare with the `new` function:

```rust
pub fn build(size: usize) -> Result<ThreadPool, PoolCreationError> {
```

#### Creating Space to Store the Threads

Now that we have a way to know we have a valid number of threads to store in
the pool, we can create those threads and store them in the `ThreadPool` struct
before returning the struct. But how do we “store” a thread? Let’s take another
look at the `thread::spawn` signature:

```rust
pub fn spawn<F, T>(f: F) -> JoinHandle<T>
    where
        F: FnOnce() -> T,
        F: Send + 'static,
        T: Send + 'static,
```
