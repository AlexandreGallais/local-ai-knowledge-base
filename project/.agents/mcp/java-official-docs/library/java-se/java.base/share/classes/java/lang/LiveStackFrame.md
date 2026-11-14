# PrimitiveSlot class (java.lang)

```java
public abstract class PrimitiveSlot
```

<em>UNSUPPORTED</em> This interface is intended to be package-private
or moved to an internal package.<p>

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
@return the int value if this primitive value is of size 4

@throws UnsupportedOperationException if this primitive value is not
of size 4.

## PrimitiveSlot.longValue()

```java
public long longValue()
```

Returns the long value if this primitive value is of size 8
@return the long value if this primitive value is of size 8

@throws UnsupportedOperationException if this primitive value is not
of size 8.

## PrimitiveSlot.getStackWalker()

```java
public static StackWalker getStackWalker()
```

Gets {@code StackWalker} that can get locals and operands.

## PrimitiveSlot.getStackWalker(Set<StackWalker.Option>)

```java
public static StackWalker getStackWalker(Set<StackWalker.Option> options)
```

Gets a {@code StackWalker} instance with the given options specifying
the stack frame information it can access, and which will traverse at most
the given {@code maxDepth} number of stack frames.  If no option is
specified, this {@code StackWalker} obtains the method name and
the class name with all
{@linkplain StackWalker.Option#SHOW_HIDDEN_FRAMES hidden frames} skipped.
The returned {@code StackWalker} can get locals and operands.

@param options stack walk {@link StackWalker.Option options}

## PrimitiveSlot.getStackWalker(Set<StackWalker.Option>, ContinuationScope)

```java
public static StackWalker getStackWalker(Set<StackWalker.Option> options, ContinuationScope contScope)
```

Gets a {@code StackWalker} instance with the given options specifying
the stack frame information it can access, and which will traverse at most
the given {@code maxDepth} number of stack frames.  If no option is
specified, this {@code StackWalker} obtains the method name and
the class name with all
{@linkplain StackWalker.Option#SHOW_HIDDEN_FRAMES hidden frames} skipped.
The returned {@code StackWalker} can get locals and operands.

@param options stack walk {@link StackWalker.Option options}
@param contScope the continuation scope up to which (inclusive) to walk the stack

## PrimitiveSlot.getStackWalker(Continuation)

```java
public static StackWalker getStackWalker(Continuation continuation)
```

Gets {@code StackWalker} of the given unmounted continuation, that can get locals and operands.

@param continuation the continuation to walk

## PrimitiveSlot.getStackWalker(Set<StackWalker.Option>, ContinuationScope, Continuation)

```java
public static StackWalker getStackWalker(Set<StackWalker.Option> options, ContinuationScope contScope, Continuation continuation)
```

Gets a {@code StackWalker} instance with the given options specifying
the stack frame information it can access, and which will traverse at most
the given {@code maxDepth} number of stack frames.  If no option is
specified, this {@code StackWalker} obtains the method name and
the class name with all
{@linkplain StackWalker.Option#SHOW_HIDDEN_FRAMES hidden frames} skipped.
The returned {@code StackWalker} can get locals and operands.

@param options stack walk {@link StackWalker.Option options}
@param continuation the continuation to walk