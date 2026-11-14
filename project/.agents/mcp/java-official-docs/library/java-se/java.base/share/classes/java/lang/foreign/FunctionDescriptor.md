---
title: "FunctionDescriptor interface (java.lang.foreign)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/FunctionDescriptor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FunctionDescriptor interface (java.lang.foreign)

```java
public sealed interface FunctionDescriptor permits FunctionDescriptorImpl
```

A function descriptor models the signature of a foreign function. A function
descriptor is made up of zero or more argument layouts, and zero or one return layout.
A function descriptor is used to create
FunctionDescriptor, Linker.Option...) downcall method handles
and
FunctionDescriptor, Arena, Linker.Option...) upcall stubs.

**Implementation requirements:** Implementing classes are immutable, thread-safe and
value-based.

**See also:** MemoryLayout

**Since:** 22

## FunctionDescriptor.returnLayout()

```java
Optional<MemoryLayout> returnLayout()
```

## FunctionDescriptor.argumentLayouts()

```java
List<MemoryLayout> argumentLayouts()
```

## FunctionDescriptor.appendArgumentLayouts(MemoryLayout...)

```java
FunctionDescriptor appendArgumentLayouts(MemoryLayout... addedLayouts)
```

Returns a function descriptor with the given argument layouts appended to the
argument layouts of this function descriptor.

Parameters:

- `addedLayouts`: the argument layouts to append

**Returns:** a new function descriptor, with the provided additional argument layouts

Throws:

- `IllegalArgumentException`: if one of the layouts in `addedLayouts` is a padding layout

## FunctionDescriptor.insertArgumentLayouts(int, MemoryLayout...)

```java
FunctionDescriptor insertArgumentLayouts(int index, MemoryLayout... addedLayouts)
```

Returns a function descriptor with the given argument layouts inserted at the
given index, into the argument layout array of this function descriptor.

Parameters:

- `index`: the index at which to insert the arguments
- `addedLayouts`: the argument layouts to insert at given index

**Returns:** a new function descriptor, with the provided additional argument layouts

Throws:

- `IllegalArgumentException`: if one of the layouts in `addedLayouts` is a padding layout
- `IllegalArgumentException`: if `index < 0 || index > argumentLayouts().size()`

## FunctionDescriptor.changeReturnLayout(MemoryLayout)

```java
FunctionDescriptor changeReturnLayout(MemoryLayout newReturn)
```

Returns a function descriptor with the provided return layout.

Parameters:

- `newReturn`: the new return layout

**Returns:** a new function descriptor, with the provided return layout

Throws:

- `IllegalArgumentException`: if `newReturn` is a padding layout

## FunctionDescriptor.dropReturnLayout()

```java
FunctionDescriptor dropReturnLayout()
```

## FunctionDescriptor.toMethodType()

```java
MethodType toMethodType()
```

Returns the method type consisting of the carrier types of the layouts in this
function descriptor.

The carrier type of a layout `L` is determined as follows:

- If `L` is a `ValueLayout` the carrier type is
    determined through `ValueLayout.carrier()`.

- If `L` is a `GroupLayout` or a `SequenceLayout`,
    the carrier type is `MemorySegment`.

**API note:** A function descriptor cannot, by construction, contain any padding
         layouts. As such, it is not necessary to specify how padding layout
         should be mapped to carrier types.

**Returns:** the method type consisting of the carrier types of the layouts in this
        function descriptor

## FunctionDescriptor.of(MemoryLayout, MemoryLayout...)

```java
static FunctionDescriptor of(MemoryLayout resLayout, MemoryLayout... argLayouts)
```

Creates a function descriptor with the given return and argument layouts.

Parameters:

- `resLayout`: the return layout
- `argLayouts`: the argument layouts

**Returns:** a new function descriptor with the provided return and argument layouts

Throws:

- `IllegalArgumentException`: if `resLayout` is a padding layout
- `IllegalArgumentException`: if one of the layouts in `argLayouts` is a padding layout

## FunctionDescriptor.ofVoid(MemoryLayout...)

```java
static FunctionDescriptor ofVoid(MemoryLayout... argLayouts)
```

Creates a function descriptor with the given argument layouts and no return
layout. This is useful to model functions that return no values.

Parameters:

- `argLayouts`: the argument layouts

**Returns:** a new function descriptor with the provided argument layouts

Throws:

- `IllegalArgumentException`: if one of the layouts in `argLayouts` is a padding layout
