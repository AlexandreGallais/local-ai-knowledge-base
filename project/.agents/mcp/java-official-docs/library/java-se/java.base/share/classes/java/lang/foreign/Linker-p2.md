---
title: "Linker interface (java.lang.foreign) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/Linker.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Linker interface (java.lang.foreign) (part 2 of 3)

The native linker does not automatically perform default argument promotions. However,
since passing an argument of a non-promoted type as a variadic argument is not
supported in C, the native linker will reject an attempt to link a specialized
function descriptor with any variadic argument value layouts corresponding to a
non-promoted C type. Since the size of the C `int` type is platform-specific,
exactly which layouts will be rejected is platform-specific as well. As an example:
on Linux/x64 the layouts corresponding to the C types `_Bool`,
`(unsigned) char`, `(unsigned) short`, and `float` (among others),
will be rejected by the linker. The `canonicalLayouts()` method can be used to
find which layout corresponds to a particular C type.

A well-known variadic function is the `printf` function, defined in the
C standard library:

This function takes a format string, and a number of additional arguments (the number
of such arguments is dictated by the format string). Consider the following
variadic call:

To perform an equivalent call using a downcall method handle we must create a function
descriptor which describes the specialized signature of the C function we want to
call. This descriptor must include an additional layout for each variadic argument we
intend to provide. In this case, the specialized signature of the C function is
`(char*, int, int, int)` as the format string accepts three integer parameters.
We then need to use a linker option
to specify the position of the first variadic layout in the provided function
descriptor (starting from 0). In this case, since the first parameter is the format
string (a non-variadic argument), the first variadic index needs to be set to 1, as
follows:

We can then call the specialized downcall handle as usual:

#### Safety considerations

Creating a downcall method handle is intrinsically unsafe. A symbol in a foreign
library does not, in general, contain enough signature information (e.g. arity and
types of foreign function parameters). As a consequence, the linker runtime cannot
validate linkage requests. When a client interacts with a downcall method handle
obtained through an invalid linkage request (e.g. by specifying a function descriptor
featuring too many argument layouts), the result of such interaction is unspecified
and can lead to JVM crashes.

When an upcall stub is passed to a foreign function, a JVM crash might occur, if the
foreign code casts the function pointer associated with the upcall stub to a type that
is incompatible with the type of the upcall stub, and then attempts to invoke the
function through the resulting function pointer. Moreover, if the method handle
associated with an upcall stub returns a memory segment,
clients must ensure that this address cannot become invalid after the upcall is
completed. This can lead to unspecified behavior, and even JVM crashes, since an
upcall is typically executed in the context of a downcall method handle invocation.

**Implementation requirements:** Implementations of this interface are immutable, thread-safe and
value-based.

**Since:** 22

## Linker.nativeLinker()

```java
static Linker nativeLinker()
```

The underlying native platform is the combination of OS and processor where the
Java runtime is currently executing.

**API note:** It is not currently possible to obtain a linker for a different
         combination of OS and processor.

**Implementation requirements:** A native linker implementation is guaranteed to provide canonical
          layouts for basic C types.

**Implementation note:** The libraries exposed by the default lookup
          associated with the returned linker are the native libraries loaded in
          the process where the Java runtime is currently executing. For example,
          on Linux, these libraries typically include `libc`, `libm`
          and `libdl`.

## Linker.downcallHandle(MemorySegment, FunctionDescriptor, Option...)

```java
MethodHandle downcallHandle(MemorySegment address, FunctionDescriptor function, Option... options)
```

Creates a method handle that is used to call a foreign function with
the given signature and address.

Calling this method is equivalent to the following code:

Parameters:

- `address`: the native memory segment whose base address is the address of the target foreign function
- `function`: the function descriptor of the target foreign function
- `options`: the linker options associated with this linkage request

**Returns:** a downcall method handle

**See also:** SymbolLookup

Throws:

- `IllegalArgumentException`: if the provided function descriptor is not supported by this linker
- `IllegalArgumentException`: if `!address.isNative()`, or if `address.equals(MemorySegment.NULL)`
- `IllegalArgumentException`: if an invalid combination of linker options is given
- `IllegalCallerException`: if the caller is in a module that does not have native access enabled

## Linker.downcallHandle(FunctionDescriptor, Option...)

```java
MethodHandle downcallHandle(FunctionDescriptor function, Option... options)
```

Creates a method handle that is used to call a foreign function with
the given signature.

The Java method type associated with the
returned method handle is derived
from the argument and return layouts in the function descriptor, but features an
additional leading parameter of type `MemorySegment`, from which the address
of the target foreign function is derived. Moreover, if the function descriptor's
return layout is a group layout, the resulting downcall method handle accepts an
additional leading parameter of type `SegmentAllocator`, which is used by
the linker runtime to allocate the memory region associated with the struct
returned by the downcall method handle.

Upon invoking a downcall method handle, the linker provides the following
guarantees for any argument `A` of type `MemorySegment` whose
corresponding layout is an address layout:

- `A.scope().isAlive() == true`. Otherwise, the invocation
        throws `IllegalStateException`;

- The invocation occurs in a thread `T` such that
        `A.isAccessibleBy(T) == true`.
        Otherwise, the invocation throws `WrongThreadException`; and

- `A` is kept alive during the invocation. For instance,
        if `A` has been obtained using a shared arena,
        any attempt to close the arena while the
        downcall method handle is still executing will result in an
        `IllegalStateException`.

Moreover, if the provided function descriptor's return layout is an
address layout, invoking the returned method handle
will return a native segment associated with the global scope. Under normal
conditions, the size of the returned segment is `0`. However, if the
function descriptor's return layout has a
target layout `T`, then the size
of the returned segment is set to `T.byteSize()`.

The returned method handle will throw an `IllegalArgumentException` if the
`MemorySegment` representing the target address of the foreign function is
the `MemorySegment.NULL` address. If an argument is a `MemorySegment`,
whose corresponding layout is a group layout, the linker
might attempt to access the contents of the segment. As such, one of the
exceptions specified by the long) or
the long, MemorySegment, long, long)
methods may be thrown. If an argument is a `MemorySegment` whose
corresponding layout is an address layout, the linker
will throw an `IllegalArgumentException` if the segment is a heap memory
segment, unless heap memory segments are explicitly allowed through the
`Linker.Option.critical(boolean)` linker option. The returned method handle
will additionally throw `NullPointerException` if any argument passed to it
is `null`.

Parameters:

- `function`: the function descriptor of the target foreign function
- `options`: the linker options associated with this linkage request

**Returns:** a downcall method handle

Throws:

- `IllegalArgumentException`: if the provided function descriptor is not supported by this linker
- `IllegalArgumentException`: if an invalid combination of linker options is given
- `IllegalCallerException`: if the caller is in a module that does not have native access enabled

## Linker.upcallStub(MethodHandle, FunctionDescriptor, Arena, Linker.Option...)

```java
MemorySegment upcallStub(MethodHandle target, FunctionDescriptor function, Arena arena, Linker.Option... options)
```

Creates an upcall stub which can be passed to other foreign functions as a
function pointer, associated with the given arena. Calling such a function
pointer from foreign code will result in the execution of the provided method
handle.

The returned memory segment's address points to the newly allocated upcall stub,
and is associated with the provided arena. As such, the lifetime of the returned
upcall stub segment is controlled by the provided arena. For instance, if the
provided arena is a confined arena, the returned upcall stub segment will be
deallocated when the provided confined arena is closed.

An upcall stub argument whose corresponding layout is an
address layout is a native segment associated with the
global scope. Under normal conditions, the size of this segment argument is
`0`. However, if the address layout has a
target layout `T`, then the size
of the segment argument is set to `T.byteSize()`.

The target method handle should not throw any exceptions. If the target method
handle does throw an exception, the JVM will terminate abruptly. To avoid this,
clients should wrap the code in the target method handle in a try/catch block to
catch any unexpected exceptions. This can be done using the
Class, MethodHandle)
method handle combinator, and handle exceptions as desired in the corresponding
catch block.

Parameters:

- `target`: the target method handle
- `function`: the upcall stub function descriptor
- `arena`: the arena associated with the returned upcall stub segment
- `options`: the linker options associated with this linkage request

**Returns:** a zero-length segment whose address is the address of the upcall stub

Throws:

- `IllegalArgumentException`: if the provided function descriptor is not supported by this linker
- `IllegalArgumentException`: if the type of `target` is incompatible with the type derived from `function`
- `IllegalArgumentException`: if it is determined that the target method handle can throw an exception
- `IllegalStateException`: if `arena.scope().isAlive() == false`
- `WrongThreadException`: if `arena` is a confined arena, and this method is called from a thread `T`, other than the arena's owner thread
- `IllegalCallerException`: if the caller is in a module that does not have native access enabled

## Linker.defaultLookup()

```java
SymbolLookup defaultLookup()
```

Returns a symbol lookup for symbols in a set of commonly used libraries.

Each `Linker` is responsible for choosing libraries that are widely
recognized as useful on the OS and processor combination supported by the
`Linker`. Accordingly, the precise set of symbols exposed by the symbol
lookup is unspecified; it varies from one `Linker` to another.

**Implementation note:** It is strongly recommended that the result of `defaultLookup`
          exposes a set of symbols that is stable over time. Clients of
          `defaultLookup()` are likely to fail if a symbol that was
          previously exposed by the symbol lookup is no longer exposed.

If an implementer provides `Linker` implementations for
          multiple OS and processor combinations, then it is strongly
          recommended that the result of `defaultLookup()` exposes, as much
          as possible, a consistent set of symbols across all the OS and processor
          combinations.

**Returns:** a symbol lookup for symbols in a set of commonly used libraries

## Linker.canonicalLayouts()

```java
Map<String, MemoryLayout> canonicalLayouts()
```

Each `Linker` is responsible for choosing the data types that are widely
recognized as useful on the OS and processor combination supported by the
`Linker`. Accordingly, the precise set of data type names and canonical
layouts exposed by the linker are unspecified; they vary from one `Linker`
to another.

**Implementation note:** It is strongly recommended that the result of `canonicalLayouts()`
          exposes a set of symbols that is stable over time. Clients of
          `canonicalLayouts()` are likely to fail if a data type that was
          previously exposed by the linker is no longer exposed, or if its
          canonical layout is updated.

If an implementer provides `Linker` implementations for multiple
          OS and processor combinations, then it is strongly recommended that the
          result of `canonicalLayouts()` exposes, as much as possible,
          a consistent set of symbols across all the OS and processor combinations.

## Linker.firstVariadicArg(int)

```java
static Option firstVariadicArg(int index)
```

The `index` value must conform to `0 <= index <= N`, where
`N` is the number of argument layouts of the function descriptor used in
conjunction with this linker option. When the `index` is:

- `0`, all arguments passed to the function are passed as variadic
    arguments

- `N`, none of the arguments passed to the function are passed as
    variadic arguments

- `m`, where `0 < m < N`, the arguments `m..N-1` are passed
    as variadic arguments

It is important to always use this linker option when linking a
variadic function, even if no variadic
argument is passed (the second case in the list above), as this might still
affect the calling convention on certain platforms.

Parameters:

- `index`: the index of the first variadic argument layout in the function descriptor associated with a downcall linkage request

**Implementation note:** The index value is validated when making a linkage request, which is
          when the function descriptor against which the index is validated is
          available.
