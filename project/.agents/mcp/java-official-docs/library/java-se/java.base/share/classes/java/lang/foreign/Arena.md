---
title: "Arena interface (java.lang.foreign)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/Arena.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arena interface (java.lang.foreign)

```java
public interface Arena extends SegmentAllocator, AutoCloseable
```

An arena controls the lifecycle of native memory segments, providing both flexible
allocation and timely deallocation.

An arena has a scope - the *arena scope*.
All the segments allocated by the arena are associated with the arena scope. As such,
the arena determines the temporal bounds of all the memory segments allocated by it.

Moreover, an arena also determines whether access to memory segments allocated by it
should be restricted to specific
threads. An arena is a `SegmentAllocator` and features several allocation
methods that can be used by clients to obtain native segments.

The simplest arena is the global arena. The global arena
features an *unbounded lifetime*. The scope of the global arena is the global
scope. As such, native segments allocated with the global arena are always accessible
and their backing regions of memory are never deallocated. Moreover, memory segments
allocated with the global arena can be accessed
from any thread.

Alternatively, clients can obtain an automatic arena, that
is an arena which features a *bounded lifetime* that is managed, automatically,
by the garbage collector. The scope of an automatic arena is an automatic scope. As
such, the regions of memory backing memory segments allocated with the automatic arena
are deallocated at some unspecified time *after* the automatic arena (and all
the segments allocated by it) becomes unreachable,
as shown below:

Memory segments allocated with an automatic arena can also be
accessed from any thread.

Rather than leaving deallocation in the hands of the Java runtime, clients will often
wish to exercise control over the timing of deallocation for regions of memory that
back memory segments. Two kinds of arenas support this, namely confined
and shared arenas. They both feature bounded lifetimes that
are managed manually. For instance, when a confined arena is closed
successfully, its scope is invalidated. As a result, all
the memory segments allocated by the arena can no longer be accessed, and their
regions of memory are deallocated:

Memory segments allocated with a confined arena can only be
accessed (and closed) by the thread that created the arena. If access to a memory
segment from multiple threads is required, clients can allocate segments in a
shared arena instead.

The characteristics of the various arenas are summarized in the following table:

Arenas characteristics

    Kind
    Bounded lifetime
    Explicitly closeable
    Accessible from multiple threads

Global
    No
    No
    Yes
Automatic
    Yes
    No
    Yes
Confined
    Yes
    Yes
    No
Shared
    Yes
    Yes
    Yes

#### Safety and thread-confinement

Arenas provide strong temporal safety guarantees: a memory segment allocated by an
arena cannot be accessed *after* the arena has been closed. The cost of
providing this guarantee varies based on the number of threads that have access to the
memory segments allocated by the arena. For instance, if an arena is always created
and closed by one thread, and the memory segments allocated by the arena are always
accessed by that same thread, then ensuring correctness is trivial.

Conversely, if an arena allocates segments that can be accessed by multiple threads,
or if the arena can be closed by a thread other than the accessing thread, then
ensuring correctness is much more complex. For example, a segment allocated with the
arena might be accessed *while* another thread attempts, concurrently, to close
the arena. To provide the strong temporal safety guarantee without forcing every
client, even simple ones, to incur a performance impact, arenas are divided into
*thread-confined* arenas, and *shared* arenas.

Confined arenas, support strong thread-confinement guarantees. Upon creation, they are
assigned an *owner thread*, typically the thread which initiated the creation
operation. The segments created by a confined arena can only be
accessed by the owner thread.
Moreover, any attempt to close the confined arena from a thread other than the owner
thread will fail with a `WrongThreadException`.

Shared arenas, on the other hand, have no owner thread. The segments created by a
shared arena can be accessed by
any thread. This might be useful when multiple threads need to access the same memory
segment concurrently (e.g. in the case of parallel processing). Moreover, a shared
arena can be closed by any thread.

#### Custom arenas

Clients can define custom arenas to implement more efficient allocation strategies,
or to have better control over when (and by whom) an arena can be closed. As an
example, the following code defines a *slicing arena* that behaves like a
confined arena (i.e., single-threaded access), but internally uses a
slicing allocator to
respond to allocation requests.
When the slicing arena is closed, the underlying confined arena is also closed; this
will invalidate all segments allocated with the slicing arena (since the scope of the
slicing arena is the same as that of the underlying confined arena):

In other words, a slicing arena provides a vastly more efficient and scalable
allocation strategy, while still retaining the timely deallocation guarantee provided
by the underlying confined arena:

**Implementation requirements:** Implementations of this interface are thread-safe.

**See also:** MemorySegment

**Since:** 22

## Arena.ofAuto()

```java
static Arena ofAuto()
```

Creates a new arena that is managed, automatically, by the garbage collector.
Segments allocated with the returned arena can be
accessed by any thread.
Calling `close()` on the returned arena will result in an `UnsupportedOperationException`.

Memory segments long) allocated by the returned arena
are zero-initialized.

**Returns:** a new arena that is managed, automatically, by the garbage collector

## Arena.global()

```java
static Arena global()
```

Segments allocated with the global arena can be
         accessed by any thread.
         Calling `close()` on the returned arena will result in
         an `UnsupportedOperationException`.

Memory segments long) allocated by the returned arena
are zero-initialized.

## Arena.ofConfined()

```java
static Arena ofConfined()
```

Segments allocated with the confined arena can
         only be accessed by the
         thread that created the arena, the arena's *owner thread*.

Memory segments long) allocated by the returned arena
are zero-initialized.

## Arena.ofShared()

```java
static Arena ofShared()
```

Segments allocated with the shared arena can be
         accessed by any thread.

Memory segments long) allocated by the returned arena
are zero-initialized.

## Arena.allocate(long, long)

```java
MemorySegment allocate(long byteSize, long byteAlignment)
```

Returns a native memory segment with the given size (in bytes) and alignment
constraint (in bytes).
The returned segment is associated with this arena scope.
The segment's address is the starting address of
the allocated off-heap region of memory backing the segment, and the address is
aligned according the provided alignment constraint.

Parameters:

- `byteSize`: the size (in bytes) of the off-heap region of memory backing the native memory segment
- `byteAlignment`: the alignment constraint (in bytes) of the off-heap region of memory backing the native memory segment

**Implementation requirements:** Implementations of this method must return a native segment featuring the
requested size, and that is compatible with the provided alignment constraint.
Furthermore, for any two segments `S1, S2` returned by this method, the
following invariant must hold:

**Returns:** a new native memory segment

Throws:

- `IllegalArgumentException`: if `bytesSize < 0`, `byteAlignment <= 0`, or if `byteAlignment` is not a power of 2
- `IllegalStateException`: if this arena has already been closed
- `WrongThreadException`: if this arena is confined, and this method is called from a thread other than the arena's owner thread

## Arena.scope()

```java
Scope scope()
```

## Arena.close()

```java
void close()
```

Closes this arena. If this method completes normally, the arena scope is no longer
alive, and all the memory segments associated with it
can no longer be accessed. Furthermore, any off-heap region of memory backing the
segments obtained from this arena are also released.

**API note:** This operation is not idempotent; that is, closing an already closed arena
         *always* results in an exception being thrown. This reflects a
         deliberate design choice: failure to close an arena might reveal a bug
         in the underlying application logic.

**Implementation requirements:** If this method completes normally, then
          `this.scope().isAlive() == false`.
          Implementations are allowed to throw `UnsupportedOperationException`
          if an explicit close operation is not supported.

**See also:** Scope#isAlive()

Throws:

- `IllegalStateException`: if the arena has already been closed
- `IllegalStateException`: if a segment associated with this arena is being accessed concurrently, e.g. by a Linker.Option...) downcall method handle
- `WrongThreadException`: if this arena is confined, and this method is called from a thread other than the arena's owner thread
- `UnsupportedOperationException`: if this arena cannot be closed explicitly
- `RuntimeException`: if an exception is thrown while executing a custom cleanup action associated with this arena (e.g. as a result of calling Arena, Consumer) or Consumer)).
