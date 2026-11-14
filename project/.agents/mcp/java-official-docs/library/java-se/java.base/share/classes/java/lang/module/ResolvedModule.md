---
title: "ResolvedModule class (java.lang.module)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/module/ResolvedModule.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ResolvedModule class (java.lang.module)

```java
public final class ResolvedModule
```

A module in a graph of *resolved modules*.

 `ResolvedModule` defines the configuration
method to get the configuration that the resolved module is in. It defines
the reference method to get the reference to the
module's content.

**Since:** 9

**See also:** Configuration#modules()

## ResolvedModule.configuration()

```java
public Configuration configuration()
```

Returns the configuration that this resolved module is in.

**Returns:** The configuration that this resolved module is in

## ResolvedModule.reference()

```java
public ModuleReference reference()
```

Returns the reference to the module's content.

**Returns:** The reference to the module's content

## ResolvedModule.name()

```java
public String name()
```

Returns the module name.

This convenience method is the equivalent to invoking:

```java
    reference().descriptor().name()
```

**Returns:** The module name

## ResolvedModule.reads()

```java
public Set<ResolvedModule> reads()
```

Returns the set of resolved modules that this resolved module reads.
The readability relation is reflexive (every module reads itself). The
set of resolved modules returned by this method does not include itself.

**Returns:** A possibly-empty unmodifiable set of resolved modules that
        this resolved module reads

## ResolvedModule.hashCode()

```java
public int hashCode()
```

Computes a hash code for this resolved module.

 The hash code is based upon the components of the resolved module
and satisfies the general contract of the Object.hashCode method.

**Returns:** The hash-code value for this resolved module

## ResolvedModule.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this resolved module for equality with the given object.

 If the given object is not a `ResolvedModule` then this
method returns `false`. Two `ResolvedModule` objects are
equal if they are in the same configuration and have equal references
to the module content.

 This method satisfies the general contract of the Object.equals method.

Parameters:

- `ob`: the object to which this object is to be compared

**Returns:** `true` if, and only if, the given object is a module
         reference that is equal to this module reference

## ResolvedModule.toString()

```java
public String toString()
```

Returns a string describing this resolved module.

**Returns:** A string describing this resolved module
