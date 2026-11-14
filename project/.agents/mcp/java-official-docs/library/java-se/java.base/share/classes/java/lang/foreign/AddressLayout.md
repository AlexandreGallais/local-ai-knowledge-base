---
title: "AddressLayout interface (java.lang.foreign)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/AddressLayout.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AddressLayout interface (java.lang.foreign)

```java
public sealed interface AddressLayout extends ValueLayout permits ValueLayouts.OfAddressImpl
```

A value layout used to model the address of some region of memory. The carrier
associated with an address layout is `MemorySegment.class`. The size and
alignment of an address layout are platform-dependent (e.g. on a 64-bit platform,
the size and alignment of an address layout are set to 8 bytes).

An address layout may optionally feature a target layout.
An address layout with target layout `T` can be used to model the address of a
region of memory whose layout is `T`. For instance, an address layout with
target layout `ValueLayout.JAVA_INT` can be used to model the address of a
region of memory that is 4 bytes long. Specifying a target layout can be useful in
the following situations:

- When accessing a memory segment that has been obtained by reading an address from
    another memory segment, e.g. using long);

- When creating a downcall method handle, using Option...);

- When creating an upcall stub, using FunctionDescriptor, Arena, Option...).

**Implementation requirements:** Implementations of this interface are immutable, thread-safe and
value-based.

**See also:** #ADDRESS

**See also:** #ADDRESS_UNALIGNED

**Since:** 22

## AddressLayout.withName(String)

```java
AddressLayout withName(String name)
```

(inherited documentation)

## AddressLayout.withoutName()

```java
AddressLayout withoutName()
```

(inherited documentation)

## AddressLayout.withByteAlignment(long)

```java
AddressLayout withByteAlignment(long byteAlignment)
```

(inherited documentation)

## AddressLayout.withOrder(ByteOrder)

```java
AddressLayout withOrder(ByteOrder order)
```

(inherited documentation)

## AddressLayout.withTargetLayout(MemoryLayout)

```java
AddressLayout withTargetLayout(MemoryLayout layout)
```

Returns an address layout with the same carrier, alignment constraint, name and
order as this address layout, but associated with the specified target layout.
The returned address layout allows raw addresses to be accessed as
memory segments whose size is set to the size of the
specified layout. Moreover, if the accessed raw address is not compatible with
the alignment constraint in the provided layout, `IllegalArgumentException`
will be thrown.

Parameters:

- `layout`: the target layout

**API note:** This method can also be used to create an address layout which, when used, creates
native memory segments with maximal size (e.g. `Long.MAX_VALUE`). This
can be done by using a target sequence layout with unspecified size, as follows:

**Returns:** an address layout with same characteristics as this layout, but with the
         provided target layout

**See also:** #targetLayout()

Throws:

- `IllegalCallerException`: if the caller is in a module that does not have native access enabled

## AddressLayout.withoutTargetLayout()

```java
AddressLayout withoutTargetLayout()
```

Returns an address layout with the same carrier, alignment constraint, name and
order as this address layout, but with no target layout.

**API note:** This can be useful to compare two address layouts that have different
         target layouts, but are otherwise equal.

**Returns:** an address layout with same characteristics as this layout, but with no
        target layout

**See also:** #targetLayout()

## AddressLayout.targetLayout()

```java
Optional<MemoryLayout> targetLayout()
```
