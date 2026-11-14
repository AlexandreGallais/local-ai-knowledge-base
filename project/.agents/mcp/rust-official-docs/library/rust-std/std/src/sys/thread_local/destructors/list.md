# std::sys::thread_local::destructors::list

## fn run

```rust
pub unsafe fn run()
```

The [`guard`] module contains platform-specific functions which will run this
function on thread exit if [`guard::enable`] has been called.

# Safety

May only be run on thread exit to guarantee that there are no live references
to TLS variables while they are destroyed.