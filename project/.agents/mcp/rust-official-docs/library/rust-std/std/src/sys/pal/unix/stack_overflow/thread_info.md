# std::sys::pal::unix::stack_overflow::thread_info

TLS, but async-signal-safe.

Unfortunately, because thread local storage isn't async-signal-safe, we
cannot soundly use it in our stack overflow handler. While this works
without problems on most platforms, it can lead to undefined behaviour
on others (such as GNU/Linux). Luckily, the POSIX specification documents
two thread-specific values that can be accessed in asynchronous signal
handlers: the value of `pthread_self()` and the address of `errno`. As
`pthread_t` is an opaque platform-specific type, we use the address of
`errno` here. As it is thread-specific and does not change over the
lifetime of a thread, we can use `&errno` as a key for a `BTreeMap`
that stores thread-specific data.

Concurrent access to this map is synchronized by two locks – an outer
[`Mutex`] and an inner spin lock that also remembers the identity of
the lock owner:
* The spin lock is the primary means of synchronization: since it only
  uses native atomics, it can be soundly used inside the signal handle
  as opposed to [`Mutex`], which might not be async-signal-safe.
* The [`Mutex`] prevents busy-waiting in the setup logic, as all accesses
  there are performed with the [`Mutex`] held, which makes the spin-lock
  redundant in the common case.
* Finally, by using the `errno` address as the locked value of the spin
  lock, we can detect cases where a SIGSEGV occurred while the thread
  info is being modified.

## fn with_current_info

```rust
pub fn with_current_info<R>(f: impl FnOnce(Option<&ThreadInfo>) -> R) -> R
```

Get the current thread's information, if available.

Calling this function might freeze other threads if they attempt to modify
their thread information. Thus, the caller should ensure that the process
is aborted shortly after this function is called.

This function is guaranteed to be async-signal-safe if `f` is too.