# std::sys::sync::unsafe_list

A doubly-linked list where callers are in charge of memory allocation
of the nodes in the list.

# Safety

`UnsafeList` itself does not synchronize any of its memory accesses, so
callers must serialize all operations on a list, e.g. with a lock.

While an entry passed to `push` is in the list, it must not be invalidated,
with one exception explained below. Invalidation of the entry, by creating a new
exclusive reference to it, would invalidate the pointers to the entry stored
in the list. The entry goes through one of two flows (see also each operation's
safety documentation):

* `push` -> `pop`, usually with `pop` on another thread: the entry pointer
  stored in the list keeps its `push`-time provenance. As mentioned, for it to
  still be valid to dereference in `pop`, the pushing caller must not access
  the entry in between. After `pop`, the references into `value` returned by
  `push` and `pop` are held concurrently, possibly by two threads. This is
  valid as they are shared references, but mutating `value` requires interior
  mutability and synchronization. That synchronization must also ensure the
  entry is only deallocated after the popping thread's last access to it.
* `push` -> `remove`, on the thread that pushed: the caller reclaims a pushed
  entry by passing a reference to the entry to `remove`. The entry must still
  be in the list. The caller of `remove` must create a new exclusive reference
  to the entry, which invalidates the pointers to the entry stored in the list.
  This is fine in this case because `remove` only overwrites those pointers,
  and never dereferences them.