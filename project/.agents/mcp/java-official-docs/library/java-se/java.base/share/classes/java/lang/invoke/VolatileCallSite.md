---
title: "VolatileCallSite class (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/VolatileCallSite.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# VolatileCallSite class (java.lang.invoke)

```java
public non-sealed class VolatileCallSite extends CallSite
```

A `VolatileCallSite` is a `CallSite` whose target acts like a volatile variable.
An `invokedynamic` instruction linked to a `VolatileCallSite` sees updates
to its call site target immediately, even if the update occurs in another thread.
There may be a performance penalty for such tight coupling between threads.

Unlike `MutableCallSite`, there is no
syncAll operation on volatile
call sites, since every write to a volatile variable is implicitly
synchronized with reader threads.

In other respects, a `VolatileCallSite` is interchangeable
with `MutableCallSite`.

**See also:** MutableCallSite

**Since:** 1.7

## VolatileCallSite.VolatileCallSite(MethodType)

```java
public VolatileCallSite(MethodType type)
```

Creates a call site with a volatile binding to its target.
The initial target is set to a method handle
of the given type which will throw an `IllegalStateException` if called.

Parameters:

- `type`: the method type that this call site will have

Throws:

- `NullPointerException`: if the proposed type is null

## VolatileCallSite.VolatileCallSite(MethodHandle)

```java
public VolatileCallSite(MethodHandle target)
```

Creates a call site with a volatile binding to its target.
The target is set to the given value.

Parameters:

- `target`: the method handle that will be the initial target of the call site

Throws:

- `NullPointerException`: if the proposed target is null

## VolatileCallSite.getTarget()

```java
public final MethodHandle getTarget()
```

Returns the target method of the call site, which behaves
like a `volatile` field of the `VolatileCallSite`.

The interactions of `getTarget` with memory are the same
as of a read from a `volatile` field.

In particular, the current thread is required to issue a fresh
read of the target from memory, and must not fail to see
a recent update to the target by another thread.

**Returns:** the linkage state of this call site, a method handle which can change over time

**See also:** #setTarget

## VolatileCallSite.setTarget(MethodHandle)

```java
public void setTarget(MethodHandle newTarget)
```

Updates the target method of this call site, as a volatile variable.
The type of the new target must agree with the type of the old target.

The interactions with memory are the same as of a write to a volatile field.
In particular, any threads is guaranteed to see the updated target
the next time it calls `getTarget`.

Parameters:

- `newTarget`: the new target

**See also:** #getTarget

Throws:

- `NullPointerException`: if the proposed new target is null
- `WrongMethodTypeException`: if the proposed new target has a method type that differs from the previous target

## VolatileCallSite.dynamicInvoker()

```java
public final MethodHandle dynamicInvoker()
```

(inherited documentation)
