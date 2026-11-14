# std::sys::thread_local::guard::windows

Support for Windows TLS destructors.

Windows has an API to provide a destructor for a FLS (fiber local storage) variable,
which behaves similarly to a TLS variable for our purpose [1].

All TLS destructors are tracked by *us*, not the Windows runtime.
This means that we have a global list of destructors for
each TLS key or variable that we know about.

[1]: https://devblogs.microsoft.com/oldnewthing/20191011-00/?p=102989

## fn enable

```rust
pub fn enable()
```

Set up the current thread to invoke `cleanup` when it finishes.