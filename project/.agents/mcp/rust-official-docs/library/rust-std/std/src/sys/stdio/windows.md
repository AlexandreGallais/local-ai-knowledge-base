# std::sys::stdio::windows

## Stdout::refresh

```rust
pub fn refresh(&mut self)
```

Forgets the cached stream state, so the next write re-queries the OS.
Called when a new lock session begins, so that changing the process
stdio handles (e.g. `SetStdHandle`) between lock sessions keeps
working (see #40490).

## Stderr::refresh

```rust
pub fn refresh(&mut self)
```

See `Stdout::refresh`.