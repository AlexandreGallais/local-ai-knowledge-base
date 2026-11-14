---
title: "Linker interface (java.lang.foreign) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/Linker.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Linker interface (java.lang.foreign) (part 3 of 3)

## Linker.captureCallState(String...)

```java
static Option captureCallState(String... capturedState)
```

Execution state is captured by a downcall method handle on invocation, by
writing it to a native segment provided by the user to the downcall method
handle. For this purpose, a downcall method handle linked with this option
will feature an additional `MemorySegment` parameter directly following
the target address, and optional `SegmentAllocator` parameters. This
parameter, the *capture state segment*, represents the native segment
into which the captured state is written.

The capture state segment must have size and alignment compatible with the
layout returned by `captureStateLayout`. This layout is a struct
layout which has a named field for each captured value.

Captured state can be retrieved from the capture state segment by constructing
var handles from the capture state layout.

The following example demonstrates the use of this linker option:

Parameters:

- `capturedState`: the names of the values to save

**See also:** #captureStateLayout()

Throws:

- `IllegalArgumentException`: if at least one of the provided `capturedState` names is unsupported on the current platform

## Linker.captureStateLayout()

```java
static StructLayout captureStateLayout()
```

The capture state layout is *platform-dependent* but is guaranteed to be
a struct layout containing only value layouts
and possibly padding layouts.
As an example, on Windows, the returned layout might contain three value layouts named:

- GetLastError

- WSAGetLastError

- errno

Clients can obtain the names of the supported captured value layouts as follows:

**See also:** #captureCallState(String...)

## Linker.critical(boolean)

```java
static Option critical(boolean allowHeapAccess)
```

A critical function is a function that has an extremely short running time in
all cases (similar to calling an empty function), and does not call back into
Java (e.g. using an upcall stub).

Using this linker option is a hint that some implementations may use to apply
optimizations that are only valid for critical functions.

Using this linker option when linking non-critical functions is likely to have
adverse effects, such as loss of performance or JVM crashes.

Critical functions can optionally allow access to the Java heap. This allows
clients to pass heap memory segments as addresses, where normally only off-heap
memory segments would be allowed. The memory region inside the Java heap is
exposed through a temporary native address that is valid for the duration of
the function call. Use of this mechanism is therefore only recommended when a
function needs to do short-lived access to Java heap memory, and copying the
relevant data to an off-heap memory segment would be prohibitive in terms of
performance.

Parameters:

- `allowHeapAccess`: whether the linked function should allow access to the Java heap.
