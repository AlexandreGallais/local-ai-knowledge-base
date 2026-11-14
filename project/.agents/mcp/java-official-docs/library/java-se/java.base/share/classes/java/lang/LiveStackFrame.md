---
title: "PrimitiveSlot class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/LiveStackFrame.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PrimitiveSlot class (java.lang)

```java
public abstract class PrimitiveSlot
```

*UNSUPPORTED* This interface is intended to be package-private
or moved to an internal package.

Represents a local variable or an entry on the operand stack whose value is
of primitive type.

## PrimitiveSlot.size()

```java
public abstract int size()
```

Returns the size, in bytes, of the slot.

## PrimitiveSlot.intValue()

```java
public int intValue()
```

Returns the int value if this primitive value is of size 4

**Returns:** the int value if this primitive value is of size 4

Throws:

- `UnsupportedOperationException`: if this primitive value is not of size 4.

## PrimitiveSlot.longValue()

```java
public long longValue()
```

Returns the long value if this primitive value is of size 8

**Returns:** the long value if this primitive value is of size 8

Throws:

- `UnsupportedOperationException`: if this primitive value is not of size 8.

## PrimitiveSlot.getStackWalker()

```java
public static StackWalker getStackWalker()
```

Gets `StackWalker` that can get locals and operands.

## PrimitiveSlot.getStackWalker(Set<StackWalker.Option>)

```java
public static StackWalker getStackWalker(Set<StackWalker.Option> options)
```

Gets a `StackWalker` instance with the given options specifying
the stack frame information it can access, and which will traverse at most
the given `maxDepth` number of stack frames.  If no option is
specified, this `StackWalker` obtains the method name and
the class name with all
hidden frames skipped.
The returned `StackWalker` can get locals and operands.

Parameters:

- `options`: stack walk options

## PrimitiveSlot.getStackWalker(Set<StackWalker.Option>, ContinuationScope)

```java
public static StackWalker getStackWalker(Set<StackWalker.Option> options, ContinuationScope contScope)
```

Gets a `StackWalker` instance with the given options specifying
the stack frame information it can access, and which will traverse at most
the given `maxDepth` number of stack frames.  If no option is
specified, this `StackWalker` obtains the method name and
the class name with all
hidden frames skipped.
The returned `StackWalker` can get locals and operands.

Parameters:

- `options`: stack walk options
- `contScope`: the continuation scope up to which (inclusive) to walk the stack

## PrimitiveSlot.getStackWalker(Continuation)

```java
public static StackWalker getStackWalker(Continuation continuation)
```

Gets `StackWalker` of the given unmounted continuation, that can get locals and operands.

Parameters:

- `continuation`: the continuation to walk

## PrimitiveSlot.getStackWalker(Set<StackWalker.Option>, ContinuationScope, Continuation)

```java
public static StackWalker getStackWalker(Set<StackWalker.Option> options, ContinuationScope contScope, Continuation continuation)
```

Gets a `StackWalker` instance with the given options specifying
the stack frame information it can access, and which will traverse at most
the given `maxDepth` number of stack frames.  If no option is
specified, this `StackWalker` obtains the method name and
the class name with all
hidden frames skipped.
The returned `StackWalker` can get locals and operands.

Parameters:

- `options`: stack walk options
- `continuation`: the continuation to walk
