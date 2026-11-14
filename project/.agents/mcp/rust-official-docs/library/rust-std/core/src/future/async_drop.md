# core::future::async_drop

## AsyncDrop::drop

```rust
async fn drop(self: Pin<&mut Self>)
```

Executes the async destructor for this type.

This method is called implicitly when the value goes out of scope,
and cannot be called explicitly.

When this method has been called, `self` has not yet been deallocated.
That only happens after the method is over.

# Panics