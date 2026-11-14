---
title: "MethodHandles class (java.lang.invoke) (part 13 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke) (part 13 of 14)

## MethodHandles.countedLoop(MethodHandle, MethodHandle, MethodHandle, MethodHandle)

```java
public static MethodHandle countedLoop(MethodHandle start, MethodHandle end, MethodHandle init, MethodHandle body)
```

Constructs a loop that counts over a range of numbers.
This is a convenience wrapper for the generic loop combinator.

The loop counter `i` is a loop iteration variable of type `int`.
The `start` and `end` handles determine the start (inclusive) and end (exclusive)
values of the loop counter.
The loop counter will be initialized to the `int` value returned from the evaluation of the
`start` handle and run to the value returned from `end` (exclusively) with a step width of 1.

If the `body` handle returns a non-`void` type `V`, a leading loop iteration variable
of that type is also present.  This variable is initialized using the optional `init` handle,
or to the default value of type `V` if that handle is `null`.

In each iteration, the iteration variables are passed to an invocation of the `body` handle.
A non-`void` value returned from the body (of type `V`) updates the leading
iteration variable.
The result of the loop handle execution will be the final `V` value of that variable
(or `void` if there is no `V` variable).

The following rules hold for the argument handles:

- The `start` and `end` handles must not be `null`, and must both return
the common type `int`, referred to here as `I` in parameter type lists.

- The `body` handle must not be `null`; its type must be of the form
`(V I A...)V`, where `V` is non-`void`, or else `(I A...)void`.
(In the `void` case, we assign the type `void` to the name `V`,
and we will write `(V I A...)V` with the understanding that a `void` type `V`
is quietly dropped from the parameter list, leaving `(I A...)V`.)

- The parameter list `(V I A...)` of the body contributes to a list
of types called the *internal parameter list*.
It will constrain the parameter lists of the other loop parts.

- As a special case, if the body contributes only `V` and `I` types,
with no additional `A` types, then the internal parameter list is extended by
the argument types `A...` of the `end` handle.

- If the iteration variable types `(V I)` are dropped from the internal parameter list, the resulting shorter
list `(A...)` is called the *external parameter list*.

- The body return type `V`, if non-`void`, determines the type of an
additional state variable of the loop.
The body must both accept a leading parameter and return a value of this type `V`.

- If `init` is non-`null`, it must have return type `V`.
Its parameter list (of some form `(A*)`) must be
effectively identical
to the external parameter list `(A...)`.

- If `init` is `null`, the loop variable will be initialized to its
default value.

- The parameter list of `start` (of some form `(A*)`) must be
effectively identical to the external parameter list `(A...)`.

- Likewise, the parameter list of `end` must be effectively identical
to the external parameter list.

The resulting loop handle's result type and parameter signature are determined as follows:

- The loop handle's result type is the result type `V` of the body.

- The loop handle's parameter types are the types `(A...)`,
from the external parameter list.

Here is pseudocode for the resulting loop handle. In the code, `V`/`v` represent the type / value of
the second loop variable as well as the result type of the loop; and `A...`/`a...` represent
arguments passed to the loop.

Parameters:

- `start`: a non-`null` handle to return the start value of the loop counter, which must be `int`. See above for other constraints.
- `end`: a non-`null` handle to return the end value of the loop counter (the loop will run to `end-1`). The result type must be `int`. See above for other constraints.
- `init`: optional initializer, providing the initial value of the loop variable. May be `null`, implying a default initial value. See above for other constraints.
- `body`: body of the loop, which may not be `null`. It controls the loop parameters and result type in the standard case (see above for details). It must accept its own return type (if non-void) plus an `int` parameter (for the counter), and may accept any number of additional types. See above for other constraints.

**API note:** The implementation of this method can be expressed as follows:

**Returns:** a method handle representing the loop.

**See also:** #countedLoop(MethodHandle, MethodHandle, MethodHandle)

**Since:** 9

Throws:

- `NullPointerException`: if any of the `start`, `end`, or `body` handles is `null`.
- `IllegalArgumentException`: if any argument violates the rules formulated above.

## MethodHandles.iteratedLoop(MethodHandle, MethodHandle, MethodHandle)

```java
public static MethodHandle iteratedLoop(MethodHandle iterator, MethodHandle init, MethodHandle body)
```

Constructs a loop that ranges over the values produced by an `Iterator<T>`.
This is a convenience wrapper for the generic loop combinator.

The iterator itself will be determined by the evaluation of the `iterator` handle.
Each value it produces will be stored in a loop iteration variable of type `T`.

If the `body` handle returns a non-`void` type `V`, a leading loop iteration variable
of that type is also present.  This variable is initialized using the optional `init` handle,
or to the default value of type `V` if that handle is `null`.

In each iteration, the iteration variables are passed to an invocation of the `body` handle.
A non-`void` value returned from the body (of type `V`) updates the leading
iteration variable.
The result of the loop handle execution will be the final `V` value of that variable
(or `void` if there is no `V` variable).

The following rules hold for the argument handles:

- The `body` handle must not be `null`; its type must be of the form
`(V T A...)V`, where `V` is non-`void`, or else `(T A...)void`.
(In the `void` case, we assign the type `void` to the name `V`,
and we will write `(V T A...)V` with the understanding that a `void` type `V`
is quietly dropped from the parameter list, leaving `(T A...)V`.)

- The parameter list `(V T A...)` of the body contributes to a list
of types called the *internal parameter list*.
It will constrain the parameter lists of the other loop parts.

- As a special case, if the body contributes only `V` and `T` types,
with no additional `A` types, then the internal parameter list is extended by
the argument types `A...` of the `iterator` handle; if it is `null` the
single type `Iterable` is added and constitutes the `A...` list.

- If the iteration variable types `(V T)` are dropped from the internal parameter list, the resulting shorter
list `(A...)` is called the *external parameter list*.

- The body return type `V`, if non-`void`, determines the type of an
additional state variable of the loop.
The body must both accept a leading parameter and return a value of this type `V`.

- If `init` is non-`null`, it must have return type `V`.
Its parameter list (of some form `(A*)`) must be
effectively identical
to the external parameter list `(A...)`.

- If `init` is `null`, the loop variable will be initialized to its
default value.

- If the `iterator` handle is non-`null`, it must have the return
type `java.util.Iterator` or a subtype thereof.
The iterator it produces when the loop is executed will be assumed
to yield values which can be converted to type `T`.

- The parameter list of an `iterator` that is non-`null` (of some form `(A*)`) must be
effectively identical to the external parameter list `(A...)`.

- If `iterator` is `null` it defaults to a method handle which behaves
like `java.lang.Iterable.iterator()`.  In that case, the internal parameter list
`(V T A...)` must have at least one `A` type, and the default iterator
handle parameter is adjusted to accept the leading `A` type, as if by
the asType conversion method.
The leading `A` type must be `Iterable` or a subtype thereof.
This conversion step, done at loop construction time, must not throw a `WrongMethodTypeException`.

The type `T` may be either a primitive or reference.
Since type `Iterator<T>` is erased in the method handle representation to the raw type `Iterator`,
the `iteratedLoop` combinator adjusts the leading argument type for `body` to `Object`
as if by the asType conversion method.
Therefore, if an iterator of the wrong type appears as the loop is executed, runtime exceptions may occur
as the result of dynamic conversions performed by `MethodHandle.asType(MethodType)`.

The resulting loop handle's result type and parameter signature are determined as follows:

- The loop handle's result type is the result type `V` of the body.

- The loop handle's parameter types are the types `(A...)`,
from the external parameter list.

Here is pseudocode for the resulting loop handle. In the code, `V`/`v` represent the type / value of
the loop variable as well as the result type of the loop; `T`/`t`, that of the elements of the
structure the loop iterates over, and `A...`/`a...` represent arguments passed to the loop.

Parameters:

- `iterator`: an optional handle to return the iterator to start the loop. If non-`null`, the handle must return `java.util.Iterator` or a subtype. See above for other constraints.
- `init`: optional initializer, providing the initial value of the loop variable. May be `null`, implying a default initial value. See above for other constraints.
- `body`: body of the loop, which may not be `null`. It controls the loop parameters and result type in the standard case (see above for details). It must accept its own return type (if non-void) plus a `T` parameter (for the iterated values), and may accept any number of additional types. See above for other constraints.

**API note:** Example:

**API note:** The implementation of this method can be expressed approximately as follows:

**Returns:** a method handle embodying the iteration loop functionality.

**Since:** 9

Throws:

- `NullPointerException`: if the `body` handle is `null`.
- `IllegalArgumentException`: if any argument violates the above requirements.

## MethodHandles.tryFinally(MethodHandle, MethodHandle)

```java
public static MethodHandle tryFinally(MethodHandle target, MethodHandle cleanup)
```

Makes a method handle that adapts a `target` method handle by wrapping it in a `try-finally` block.
Another method handle, `cleanup`, represents the functionality of the `finally` block. Any exception
thrown during the execution of the `target` handle will be passed to the `cleanup` handle. The
exception will be rethrown, unless `cleanup` handle throws an exception first.  The
value returned from the `cleanup` handle's execution will be the result of the execution of the
`try-finally` handle.

The `cleanup` handle will be passed one or two additional leading arguments.
The first is the exception thrown during the
execution of the `target` handle, or `null` if no exception was thrown.
The second is the result of the execution of the `target` handle, or, if it throws an exception,
a `null`, zero, or `false` value of the required type is supplied as a placeholder.
The second argument is not present if the `target` handle has a `void` return type.
(Note that, except for argument type conversions, combinators represent `void` values in parameter lists
by omitting the corresponding paradoxical arguments, not by inserting `null` or zero values.)

The `target` and `cleanup` handles must have the same corresponding argument and return types, except
that the `cleanup` handle may omit trailing arguments. Also, the `cleanup` handle must have one or
two extra leading parameters:

- a `Throwable`, which will carry the exception thrown by the `target` handle (if any); and

- a parameter of the same type as the return type of both `target` and `cleanup`, which will carry
the result from the execution of the `target` handle.
This parameter is not present if the `target` returns `void`.

The pseudocode for the resulting adapter looks as follows. In the code, `V` represents the result type of
the `try/finally` construct; `A`/`a`, the types and values of arguments to the resulting
handle consumed by the cleanup; and `B`/`b`, those of arguments to the resulting handle discarded by
the cleanup.

Note that the saved arguments (`a...` in the pseudocode) cannot
be modified by execution of the target, and so are passed unchanged
from the caller to the cleanup, if it is invoked.

The target and cleanup must return the same type, even if the cleanup
always throws.
To create such a throwing cleanup, compose the cleanup logic
with throwException,
in order to create a method handle of the correct return type.

Note that `tryFinally` never converts exceptions into normal returns.
In rare cases where exceptions must be converted in that way, first wrap
the target with Class, MethodHandle)
to capture an outgoing exception, and then wrap with `tryFinally`.

It is recommended that the first parameter type of `cleanup` be
declared `Throwable` rather than a narrower subtype.  This ensures
`cleanup` will always be invoked with whatever exception that
`target` throws.  Declaring a narrower type may result in a
`ClassCastException` being thrown by the `try-finally`
handle if the type of the exception thrown by `target` is not
assignable to the first parameter type of `cleanup`.  Note that
various exception types of `VirtualMachineError`,
`LinkageError`, and `RuntimeException` can in principle be
thrown by almost any kind of Java code, and a finally clause that
catches (say) only `IOException` would mask any of the others
behind a `ClassCastException`.

Parameters:

- `target`: the handle whose execution is to be wrapped in a `try` block.
- `cleanup`: the handle that is invoked in the finally block.

**Returns:** a method handle embodying the `try-finally` block composed of the two arguments.

**See also:** MethodHandles#catchException(MethodHandle, Class, MethodHandle)

**Since:** 9

Throws:

- `NullPointerException`: if any argument is null
- `IllegalArgumentException`: if `cleanup` does not accept the required leading arguments, or if the method handle types do not match in their return types and their corresponding trailing parameters
