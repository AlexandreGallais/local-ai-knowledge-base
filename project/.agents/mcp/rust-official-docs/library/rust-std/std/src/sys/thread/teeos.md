# std::sys::thread::teeos

## Thread::join

```rust
pub fn join(self)
```

must join, because no pthread_detach supported

## fn sleep

```rust
pub fn sleep(dur: Duration)
```

only main thread could wait for sometime in teeos