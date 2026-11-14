---
title: "mmap --- Memory-mapped file support (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/mmap.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# mmap --- Memory-mapped file support (part 2 of 2)

## MADV_* constants

### `MADV_NORMAL`

```python
MADV_RANDOM
MADV_SEQUENTIAL
MADV_WILLNEED
MADV_DONTNEED
MADV_REMOVE
MADV_DONTFORK
MADV_DOFORK
MADV_HWPOISON
MADV_MERGEABLE
MADV_UNMERGEABLE
MADV_SOFT_OFFLINE
MADV_HUGEPAGE
MADV_NOHUGEPAGE
MADV_DONTDUMP
MADV_DODUMP
MADV_FREE
MADV_NOSYNC
MADV_AUTOSYNC
MADV_NOCORE
MADV_CORE
MADV_PROTECT
MADV_FREE_REUSABLE
MADV_FREE_REUSE
```

These options can be passed to `mmap.madvise()`.  Not every option will
be present on every system.

Availability: Systems with the madvise() system call.

> *Added in version 3.8.*

## MAP_* constants

### `MAP_SHARED`

```python
MAP_PRIVATE
MAP_32BIT
MAP_ALIGNED_SUPER
MAP_ANON
MAP_ANONYMOUS
MAP_CONCEAL
MAP_DENYWRITE
MAP_EXECUTABLE
MAP_HASSEMAPHORE
MAP_JIT
MAP_NOCACHE
MAP_NOEXTEND
MAP_NORESERVE
MAP_POPULATE
MAP_RESILIENT_CODESIGN
MAP_RESILIENT_MEDIA
MAP_STACK
MAP_TPRO
MAP_TRANSLATED_ALLOW_EXECUTE
MAP_UNIX03
```

These are the various flags that can be passed to `mmap.mmap()`.  `MAP_ALIGNED_SUPER`
is only available at FreeBSD and `MAP_CONCEAL` is only available at OpenBSD.  Note
that some options might not be present on some systems.

> *Changed in version 3.10.*
> Added `MAP_POPULATE` constant.

> *Added in version 3.11.*
> Added `MAP_STACK` constant.

> *Added in version 3.12.*
> Added `MAP_ALIGNED_SUPER` and `MAP_CONCEAL` constants.

> *Added in version 3.13.*
> Added `MAP_32BIT`, `MAP_HASSEMAPHORE`, `MAP_JIT`,
> `MAP_NOCACHE`, `MAP_NOEXTEND`, `MAP_NORESERVE`,
> `MAP_RESILIENT_CODESIGN`, `MAP_RESILIENT_MEDIA`,
> `MAP_TPRO`, `MAP_TRANSLATED_ALLOW_EXECUTE`, and
> `MAP_UNIX03` constants.

## MS_* constants

### `MS_SYNC`

```python
MS_ASYNC
MS_INVALIDATE
```

These flags control the synchronization behavior for `mmap.flush()`:

- `MS_SYNC` - Synchronous flush: writes are scheduled and the call
blocks until they are physically written to storage.
- `MS_ASYNC` - Asynchronous flush: writes are scheduled but the call
returns immediately without waiting for completion.
- `MS_INVALIDATE` - Invalidate cached data: invalidates other mappings
of the same file so they can see the changes.

> *Added in version 3.15.*
