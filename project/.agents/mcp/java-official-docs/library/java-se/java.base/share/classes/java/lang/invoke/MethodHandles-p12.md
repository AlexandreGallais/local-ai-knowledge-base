---
title: "MethodHandles class (java.lang.invoke) (part 12 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke) (part 12 of 14)

**See also:** MethodHandles#iteratedLoop(MethodHandle, MethodHandle, MethodHandle)

**Since:** 9

Throws:

- `IllegalArgumentException`: in case any of the constraints described above is violated.

## MethodHandles.whileLoop(MethodHandle, MethodHandle, MethodHandle)

```java
public static MethodHandle whileLoop(MethodHandle init, MethodHandle pred, MethodHandle body)
```

Constructs a `while` loop from an initializer, a body, and a predicate.
This is a convenience wrapper for the generic loop combinator.

The `pred` handle describes the loop condition; and `body`, its body. The loop resulting from this
method will, in each iteration, first evaluate the predicate and then execute its body (if the predicate
evaluates to `true`).
The loop will terminate once the predicate evaluates to `false` (the body will not be executed in this case).

The `init` handle describes the initial value of an additional optional loop-local variable.
In each iteration, this loop-local variable, if present, will be passed to the `body`
and updated with the value returned from its invocation. The result of loop execution will be
the final value of the additional loop-local variable (if present).

The following rules hold for these argument handles:

- The `body` handle must not be `null`; its type must be of the form
`(V A...)V`, where `V` is non-`void`, or else `(A...)void`.
(In the `void` case, we assign the type `void` to the name `V`,
and we will write `(V A...)V` with the understanding that a `void` type `V`
is quietly dropped from the parameter list, leaving `(A...)V`.)

- The parameter list `(V A...)` of the body is called the *internal parameter list*.
It will constrain the parameter lists of the other loop parts.

- If the iteration variable type `V` is dropped from the internal parameter list, the resulting shorter
list `(A...)` is called the *external parameter list*.

- The body return type `V`, if non-`void`, determines the type of an
additional state variable of the loop.
The body must both accept and return a value of this type `V`.

- If `init` is non-`null`, it must have return type `V`.
Its parameter list (of some form `(A*)`) must be
effectively identical
to the external parameter list `(A...)`.

- If `init` is `null`, the loop variable will be initialized to its
default value.

- The `pred` handle must not be `null`.  It must have `boolean` as its return type.
Its parameter list (either empty or of the form `(V A*)`) must be
effectively identical to the internal parameter list.

The resulting loop handle's result type and parameter signature are determined as follows:

- The loop handle's result type is the result type `V` of the body.

- The loop handle's parameter types are the types `(A...)`,
from the external parameter list.

Here is pseudocode for the resulting loop handle. In the code, `V`/`v` represent the type / value of
the sole loop variable as well as the result type of the loop; and `A`/`a`, that of the argument
passed to the loop.

Parameters:

- `init`: optional initializer, providing the initial value of the loop variable. May be `null`, implying a default initial value. See above for other constraints.
- `pred`: condition for the loop, which may not be `null`. Its result type must be `boolean`. See above for other constraints.
- `body`: body of the loop, which may not be `null`. It controls the loop parameters and result type. See above for other constraints.

**API note:** Example:

**API note:** The implementation of this method can be expressed as follows:

**Returns:** a method handle implementing the `while` loop as described by the arguments.

**See also:** #loop(MethodHandle[][])

**See also:** #doWhileLoop(MethodHandle, MethodHandle, MethodHandle)

**Since:** 9

Throws:

- `IllegalArgumentException`: if the rules for the arguments are violated.
- `NullPointerException`: if `pred` or `body` are `null`.

## MethodHandles.doWhileLoop(MethodHandle, MethodHandle, MethodHandle)

```java
public static MethodHandle doWhileLoop(MethodHandle init, MethodHandle body, MethodHandle pred)
```

Constructs a `do-while` loop from an initializer, a body, and a predicate.
This is a convenience wrapper for the generic loop combinator.

The `pred` handle describes the loop condition; and `body`, its body. The loop resulting from this
method will, in each iteration, first execute its body and then evaluate the predicate.
The loop will terminate once the predicate evaluates to `false` after an execution of the body.

The `init` handle describes the initial value of an additional optional loop-local variable.
In each iteration, this loop-local variable, if present, will be passed to the `body`
and updated with the value returned from its invocation. The result of loop execution will be
the final value of the additional loop-local variable (if present).

The following rules hold for these argument handles:

- The `body` handle must not be `null`; its type must be of the form
`(V A...)V`, where `V` is non-`void`, or else `(A...)void`.
(In the `void` case, we assign the type `void` to the name `V`,
and we will write `(V A...)V` with the understanding that a `void` type `V`
is quietly dropped from the parameter list, leaving `(A...)V`.)

- The parameter list `(V A...)` of the body is called the *internal parameter list*.
It will constrain the parameter lists of the other loop parts.

- If the iteration variable type `V` is dropped from the internal parameter list, the resulting shorter
list `(A...)` is called the *external parameter list*.

- The body return type `V`, if non-`void`, determines the type of an
additional state variable of the loop.
The body must both accept and return a value of this type `V`.

- If `init` is non-`null`, it must have return type `V`.
Its parameter list (of some form `(A*)`) must be
effectively identical
to the external parameter list `(A...)`.

- If `init` is `null`, the loop variable will be initialized to its
default value.

- The `pred` handle must not be `null`.  It must have `boolean` as its return type.
Its parameter list (either empty or of the form `(V A*)`) must be
effectively identical to the internal parameter list.

The resulting loop handle's result type and parameter signature are determined as follows:

- The loop handle's result type is the result type `V` of the body.

- The loop handle's parameter types are the types `(A...)`,
from the external parameter list.

Here is pseudocode for the resulting loop handle. In the code, `V`/`v` represent the type / value of
the sole loop variable as well as the result type of the loop; and `A`/`a`, that of the argument
passed to the loop.

Parameters:

- `init`: optional initializer, providing the initial value of the loop variable. May be `null`, implying a default initial value. See above for other constraints.
- `body`: body of the loop, which may not be `null`. It controls the loop parameters and result type. See above for other constraints.
- `pred`: condition for the loop, which may not be `null`. Its result type must be `boolean`. See above for other constraints.

**API note:** Example:

**API note:** The implementation of this method can be expressed as follows:

**Returns:** a method handle implementing the `while` loop as described by the arguments.

**See also:** #loop(MethodHandle[][])

**See also:** #whileLoop(MethodHandle, MethodHandle, MethodHandle)

**Since:** 9

Throws:

- `IllegalArgumentException`: if the rules for the arguments are violated.
- `NullPointerException`: if `pred` or `body` are `null`.

## MethodHandles.countedLoop(MethodHandle, MethodHandle, MethodHandle)

```java
public static MethodHandle countedLoop(MethodHandle iterations, MethodHandle init, MethodHandle body)
```

Constructs a loop that runs a given number of iterations.
This is a convenience wrapper for the generic loop combinator.

The number of iterations is determined by the `iterations` handle evaluation result.
The loop counter `i` is an extra loop iteration variable of type `int`.
It will be initialized to 0 and incremented by 1 in each iteration.

If the `body` handle returns a non-`void` type `V`, a leading loop iteration variable
of that type is also present.  This variable is initialized using the optional `init` handle,
or to the default value of type `V` if that handle is `null`.

In each iteration, the iteration variables are passed to an invocation of the `body` handle.
A non-`void` value returned from the body (of type `V`) updates the leading
iteration variable.
The result of the loop handle execution will be the final `V` value of that variable
(or `void` if there is no `V` variable).

The following rules hold for the argument handles:

- The `iterations` handle must not be `null`, and must return
the type `int`, referred to here as `I` in parameter type lists.

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
the argument types `A...` of the `iterations` handle.

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

- The parameter list of `iterations` (of some form `(A*)`) must be
effectively identical to the external parameter list `(A...)`.

The resulting loop handle's result type and parameter signature are determined as follows:

- The loop handle's result type is the result type `V` of the body.

- The loop handle's parameter types are the types `(A...)`,
from the external parameter list.

Here is pseudocode for the resulting loop handle. In the code, `V`/`v` represent the type / value of
the second loop variable as well as the result type of the loop; and `A...`/`a...` represent
arguments passed to the loop.

Parameters:

- `iterations`: a non-`null` handle to return the number of iterations this loop should run. The handle's result type must be `int`. See above for other constraints.
- `init`: optional initializer, providing the initial value of the loop variable. May be `null`, implying a default initial value. See above for other constraints.
- `body`: body of the loop, which may not be `null`. It controls the loop parameters and result type in the standard case (see above for details). It must accept its own return type (if non-void) plus an `int` parameter (for the counter), and may accept any number of additional types. See above for other constraints.

**API note:** Example with a fully conformant body method:

**API note:** Example with the simplest possible body method type,
and passing the number of iterations to the loop invocation:

**API note:** Example that treats the number of iterations, string to append to, and string to append
as loop parameters:

**API note:** Example that illustrates the usage of int, List, int)
to enforce a loop type:

**API note:** The implementation of this method can be expressed as follows:

**Returns:** a method handle representing the loop.

**See also:** #countedLoop(MethodHandle, MethodHandle, MethodHandle, MethodHandle)

**Since:** 9

Throws:

- `NullPointerException`: if either of the `iterations` or `body` handles is `null`.
- `IllegalArgumentException`: if any argument violates the rules formulated above.
