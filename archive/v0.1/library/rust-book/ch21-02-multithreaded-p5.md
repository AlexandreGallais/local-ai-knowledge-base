---
title: "ch21-02-multithreaded (part 5 of 5)"
tool: "rust-book"
version: "2026-11"
source: "https://github.com/rust-lang/book/blob/2771df165f092a4fbb9f46b5b2e7450f19010adb/src/ch21-02-multithreaded.md"
commit: "2771df165f092a4fbb9f46b5b2e7450f19010adb"
license: "MIT OR Apache-2.0"
---

# ch21-02-multithreaded (part 5 of 5)

Success! We now have a thread pool that executes connections asynchronously.
There are never more than four threads created, so our system won’t get
overloaded if the server receives a lot of requests. If we make a request to
_/sleep_, the server will be able to serve other requests by having another
thread run them.

> Note: If you open _/sleep_ in multiple browser windows simultaneously, they
> might load one at a time in five-second intervals. Some web browsers execute
> multiple instances of the same request sequentially for caching reasons. This
> limitation is not caused by our web server.

This is a good time to pause and consider how the code in Listings 21-18, 21-19,
and 21-20 would be different if we were using futures instead of a closure for
the work to be done. What types would change? How would the method signatures be
different, if at all? What parts of the code would stay the same?

After learning about the `while let` loop in Chapter 17 and Chapter 19, you
might be wondering why we didn’t write the `Worker` thread code as shown in
Listing 21-21.

**Listing 21-21: An alternative implementation of `Worker::new` using `while let`** (src/lib.rs)

```rust
// --snip--

impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        let thread = thread::spawn(move || {
            while let Ok(job) = receiver.lock().unwrap().recv() {
                println!("Worker {id} got a job; executing.");

                job();
            }
        });

        Worker { id, thread }
    }
}
```

This code compiles and runs but doesn’t result in the desired threading
behavior: A slow request will still cause other requests to wait to be
processed. The reason is somewhat subtle: The `Mutex` struct has no public
`unlock` method because the ownership of the lock is based on the lifetime of
the `MutexGuard<T>` within the `LockResult<MutexGuard<T>>` that the `lock`
method returns. At compile time, the borrow checker can then enforce the rule
that a resource guarded by a `Mutex` cannot be accessed unless we hold the
lock. However, this implementation can also result in the lock being held
longer than intended if we aren’t mindful of the lifetime of the
`MutexGuard<T>`.

The code in Listing 21-20 that uses `let job =
receiver.lock().unwrap().recv().unwrap();` works because with `let`, any
temporary values used in the expression on the right-hand side of the equal
sign are immediately dropped when the `let` statement ends. However, `while
let` (and `if let` and `match`) does not drop temporary values until the end of
the associated block. In Listing 21-21, the lock remains held for the duration
of the call to `job()`, meaning other `Worker` instances cannot receive jobs.
