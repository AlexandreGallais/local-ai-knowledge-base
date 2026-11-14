# core::iter::adapters

## SourceIter::Source

```rust
type Source
```

A source stage in an iterator pipeline.

## SourceIter::as_inner

```rust
unsafe fn as_inner(&mut self) -> &mut Self::Source
```

Retrieve the source of an iterator pipeline.

# Safety

Implementations must return the same mutable reference for their lifetime, unless
replaced by a caller.

Callers may only replace the reference when they stopped iteration and drop the
iterator pipeline after extracting the source.

This means iterator adapters can rely on the source not changing during
iteration but they cannot rely on it in their Drop implementations.

Implementing this method means adapters relinquish private-only access to their
source and can only rely on guarantees made based on method receiver types.
The lack of restricted access also requires that adapters must uphold the source's
public API even when they have access to its internals.

Callers in turn must expect the source to be in any state that is consistent with
its public API since adapters sitting between it and the source have the same
access. In particular an adapter may have consumed more elements than strictly necessary.

The overall goal of these requirements is to let the consumer of a pipeline use
* whatever remains in the source after iteration has stopped
* the memory that has become unused by advancing a consuming iterator

[`next()`]: Iterator::next()