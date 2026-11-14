# std::sys::thread::sgx

## Notifier::notify

```rust
pub fn notify(self)
```

Notify the waiter. The waiter is either notified right away (if
currently blocked in `Waiter::wait()`) or later when it calls the
`Waiter::wait()` method.

## Waiter::wait

```rust
pub fn wait(self)
```

Wait for a notification. If `Notifier::notify()` has already been
called, this will return immediately, otherwise the current thread
is blocked until notified.