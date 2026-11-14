---
title: "MethodHandles class (java.lang.invoke) (part 10 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke) (part 10 of 14)

## MethodHandles.foldArguments(MethodHandle, int, MethodHandle)

```java
public static MethodHandle foldArguments(MethodHandle target, int pos, MethodHandle combiner)
```

Adapts a target method handle by pre-processing some of its arguments, starting at a given position, and then
calling the target with the result of the pre-processing, inserted into the original sequence of arguments just
before the folded arguments.

This method is closely related to MethodHandle), but allows to control the
position in the parameter list at which folding takes place. The argument controlling this, `pos`, is a
zero-based index. The aforementioned method MethodHandle) assumes position
0.

Parameters:

- `target`: the method handle to invoke after arguments are combined
- `pos`: the position at which to start folding and at which to insert the folding result; if this is `0`, the effect is the same as for MethodHandle).
- `combiner`: method handle to call initially on the incoming arguments

**API note:** Example:

Here is pseudocode for the resulting adapter. In the code, `T`
represents the result type of the `target` and resulting adapter.
`V`/`v` represent the type and value of the parameter and argument
of `target` that precedes the folding position; `V` also is
the result type of the `combiner`. `A`/`a` denote the
types and values of the `N` parameters and arguments at the folding
position. `Z`/`z` and `B`/`b` represent the types
and values of the `target` parameters and arguments that precede and
follow the folded parameters and arguments starting at `pos`,
respectively.

*Note:* The resulting adapter is never a variable-arity method handle, even if the original target method handle was.

**Returns:** method handle which incorporates the specified argument folding logic

**See also:** #foldArguments(MethodHandle, MethodHandle)

**Since:** 9

Throws:

- `NullPointerException`: if either argument is null
- `IllegalArgumentException`: if either of the following two conditions holds: (1) `combiner`'s return type is non-`void` and not the same as the argument type at position `pos` of the target signature; (2) the `N` argument types at position `pos` of the target signature (skipping one matching the `combiner`'s return type) are not identical with the argument types of `combiner`.

## MethodHandles.filterArgumentsWithCombiner(MethodHandle, int, MethodHandle, int ...)

```java
/*non-public*/ static MethodHandle filterArgumentsWithCombiner(MethodHandle target, int position, MethodHandle combiner, int ... argPositions)
```

Adapts a target method handle by pre-processing some of its arguments, then calling the target with the result
of the pre-processing replacing the argument at the given position.

Parameters:

- `target`: the method handle to invoke after arguments are combined
- `position`: the position at which to start folding and at which to insert the folding result; if this is `0`, the effect is the same as for MethodHandle).
- `combiner`: method handle to call initially on the incoming arguments
- `argPositions`: indexes of the target to pick arguments sent to the combiner from

**Returns:** method handle which incorporates the specified argument folding logic

Throws:

- `NullPointerException`: if either argument is null
- `IllegalArgumentException`: if either of the following two conditions holds: (1) `combiner`'s return type is not the same as the argument type at position `pos` of the target signature; (2) the `N` argument types at positions `argPositions[1...N]` of the target signature are not identical with the argument types of `combiner`.

## MethodHandles.foldArgumentsWithCombiner(MethodHandle, int, MethodHandle, int ...)

```java
/*non-public*/ static MethodHandle foldArgumentsWithCombiner(MethodHandle target, int position, MethodHandle combiner, int ... argPositions)
```

Adapts a target method handle by pre-processing some of its arguments, calling the target with the result of
the pre-processing inserted into the original sequence of arguments at the given position.

Parameters:

- `target`: the method handle to invoke after arguments are combined
- `position`: the position at which to start folding and at which to insert the folding result; if this is `0`, the effect is the same as for MethodHandle).
- `combiner`: method handle to call initially on the incoming arguments
- `argPositions`: indexes of the target to pick arguments sent to the combiner from

**Returns:** method handle which incorporates the specified argument folding logic

Throws:

- `NullPointerException`: if either argument is null
- `IllegalArgumentException`: if either of the following two conditions holds: (1) `combiner`'s return type is non-`void` and not the same as the argument type at position `pos` of the target signature; (2) the `N` argument types at positions `argPositions[1...N]` of the target signature (skipping `position` where the `combiner`'s return will be folded in) are not identical with the argument types of `combiner`.

## MethodHandles.guardWithTest(MethodHandle, MethodHandle, MethodHandle)

```java
public static MethodHandle guardWithTest(MethodHandle test, MethodHandle target, MethodHandle fallback)
```

Makes a method handle which adapts a target method handle,
by guarding it with a test, a boolean-valued method handle.
If the guard fails, a fallback handle is called instead.
All three method handles must have the same corresponding
argument and return types, except that the return type
of the test must be boolean, and the test is allowed
to have fewer arguments than the other two method handles.

Here is pseudocode for the resulting adapter. In the code, `T`
represents the uniform result type of the three involved handles;
`A`/`a`, the types and values of the `target`
parameters and arguments that are consumed by the `test`; and
`B`/`b`, those types and values of the `target`
parameters and arguments that are not consumed by the `test`.

Note that the test arguments (`a...` in the pseudocode) cannot
be modified by execution of the test, and so are passed unchanged
from the caller to the target or fallback as appropriate.

Parameters:

- `test`: method handle used for test, must return boolean
- `target`: method handle to call if test passes
- `fallback`: method handle to call if test fails

**Returns:** method handle which incorporates the specified if/then/else logic

Throws:

- `NullPointerException`: if any argument is null
- `IllegalArgumentException`: if `test` does not return boolean, or if all three method types do not match (with the return type of `test` changed to match that of the target).

## MethodHandles.catchException(MethodHandle, Class<? extends Throwable>, MethodHandle)

```java
public static MethodHandle catchException(MethodHandle target, Class<? extends Throwable> exType, MethodHandle handler)
```

Makes a method handle which adapts a target method handle,
by running it inside an exception handler.
If the target returns normally, the adapter returns that value.
If an exception matching the specified type is thrown, the fallback
handle is called instead on the exception, plus the original arguments.

The target and handler must have the same corresponding
argument and return types, except that handler may omit trailing arguments
(similarly to the predicate in guardWithTest).
Also, the handler must have an extra leading parameter of `exType` or a supertype.

Here is pseudocode for the resulting adapter. In the code, `T`
represents the return type of the `target` and `handler`,
and correspondingly that of the resulting adapter; `A`/`a`,
the types and values of arguments to the resulting handle consumed by
`handler`; and `B`/`b`, those of arguments to the
resulting handle discarded by `handler`.

Note that the saved arguments (`a...` in the pseudocode) cannot
be modified by execution of the target, and so are passed unchanged
from the caller to the handler, if the handler is invoked.

The target and handler must return the same type, even if the handler
always throws.  (This might happen, for instance, because the handler
is simulating a `finally` clause).
To create such a throwing handler, compose the handler creation logic
with throwException,
in order to create a method handle of the correct return type.

Parameters:

- `target`: method handle to call
- `exType`: the type of exception which the handler will catch
- `handler`: method handle to call if a matching exception is thrown

**Returns:** method handle which incorporates the specified try/catch logic

**See also:** MethodHandles#tryFinally(MethodHandle, MethodHandle)

Throws:

- `NullPointerException`: if any argument is null
- `IllegalArgumentException`: if `handler` does not accept the given exception type, or if the method handle types do not match in their return types and their corresponding parameters

## MethodHandles.throwException(Class<?>, Class<? extends Throwable>)

```java
public static MethodHandle throwException(Class<?> returnType, Class<? extends Throwable> exType)
```

Produces a method handle which will throw exceptions of the given `exType`.
The method handle will accept a single argument of `exType`,
and immediately throw it as an exception.
The method type will nominally specify a return of `returnType`.
The return type may be anything convenient:  It doesn't matter to the
method handle's behavior, since it will never return normally.

Parameters:

- `returnType`: the return type of the desired method handle
- `exType`: the parameter type of the desired method handle

**Returns:** method handle which can throw the given exceptions

Throws:

- `NullPointerException`: if either argument is null
