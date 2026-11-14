# std::sys::alloc::windows

Implements `System` on Windows.

All pointers returned by this allocator have, in addition to the guarantees of `GlobalAlloc`, the
following properties:

If the pointer was allocated or reallocated with a `layout` specifying an alignment <= `MIN_ALIGN`
the pointer will be aligned to at least `MIN_ALIGN` and point to the start of the allocated block.

If the pointer was allocated or reallocated with a `layout` specifying an alignment > `MIN_ALIGN`
the pointer will be aligned to the specified alignment and not point to the start of the allocated block.
Instead there will be a header readable directly before the returned pointer, containing the actual
location of the start of the block.