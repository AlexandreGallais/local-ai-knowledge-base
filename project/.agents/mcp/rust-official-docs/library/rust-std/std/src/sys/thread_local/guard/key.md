# std::sys::thread_local::guard::key

A lot of UNIX platforms don't have a specialized way to register TLS
destructors for native TLS. Instead, we use one TLS key with a destructor
that will run all native TLS destructors in the destructor list.

## fn enable

```rust
pub fn enable()
```

On platforms with key-based TLS, the system runs the destructors for us.
We still have to make sure that [`crate::rt::thread_cleanup`] is called,
however. This is done by deferring the execution of a TLS destructor to
the next round of destruction inside the TLS destructors.