---
title: "MethodHandle class (java.lang.invoke) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandle class (java.lang.invoke) (part 2 of 4)

In order to obtain an invoker method for a particular type descriptor,
use MethodHandles.exactInvoker,
or MethodHandles.invoker.
The Lookup.findVirtual
API is also able to return a method handle
to call `invokeExact` or plain `invoke`,
for any specified type descriptor .

#### Interoperation between method handles and Java generics

A method handle can be obtained on a method, constructor, or field
which is declared with Java generic types.
As with the Core Reflection API, the type of the method handle
will be constructed from the erasure of the source-level type.
When a method handle is invoked, the types of its arguments
or the return value cast type may be generic types or type instances.
If this occurs, the compiler will replace those
types by their erasures when it constructs the symbolic type descriptor
for the `invokevirtual` instruction.

Method handles do not represent
their function-like types in terms of Java parameterized (generic) types,
because there are three mismatches between function-like types and parameterized
Java types.

- Method types range over all possible arities,
from no arguments to up to the  maximum number of allowed arguments.
Generics are not variadic, and so cannot represent this.

- Method types can specify arguments of primitive types,
which Java generic types cannot range over.

- Higher order functions over method handles (combinators) are
often generic across a wide range of function types, including
those of multiple arities.  It is impossible to represent such
genericity with a Java type parameter.

#### Arity limits

The JVM imposes on all methods and constructors of any kind an absolute
limit of 255 stacked arguments.  This limit can appear more restrictive
in certain cases:

- A `long` or `double` argument counts (for purposes of arity limits) as two argument slots.

- A non-static method consumes an extra argument for the object on which the method is called.

- A constructor consumes an extra argument for the object which is being constructed.

- Since a method handle&rsquo;s `invoke` method (or other signature-polymorphic method) is non-virtual,
    it consumes an extra argument for the method handle itself, in addition to any non-virtual receiver object.

These limits imply that certain method handles cannot be created, solely because of the JVM limit on stacked arguments.
For example, if a static JVM method accepts exactly 255 arguments, a method handle cannot be created for it.
Attempts to create method handles with impossible method types lead to an `IllegalArgumentException`.
In particular, a method handle&rsquo;s type must not have an arity of the exact maximum 255.

**See also:** MethodType

**See also:** MethodHandles

**Since:** 1.7

## MethodHandle.type()

```java
public MethodType type()
```

Reports the type of this method handle.
Every invocation of this method handle via `invokeExact` must exactly match this type.

**Returns:** the method handle type

## MethodHandle.MethodHandle(MethodType, LambdaForm)

```java
/*non-public*/ MethodHandle(MethodType type, LambdaForm form)
```

Package-private constructor for the method handle implementation hierarchy.
Method handle inheritance will be contained completely within
the `java.lang.invoke` package.

## MethodHandle.invokeExact(Object...)

```java
public final native Object invokeExact(Object... args) throws Throwable
```

Invokes the method handle, allowing any caller type descriptor, but requiring an exact type match.
The symbolic type descriptor at the call site of `invokeExact` must
exactly match this method handle's type.
No conversions are allowed on arguments or return values.

When this method is observed via the Core Reflection API,
it will appear as a single native method, taking an object array and returning an object.
If this native method is invoked directly via
java.lang.reflect.Method.invoke, via JNI,
or indirectly via Lookup.unreflect,
it will throw an `UnsupportedOperationException`.

Parameters:

- `args`: the signature-polymorphic parameter list, statically represented using varargs

**Returns:** the signature-polymorphic result, statically represented using `Object`

Throws:

- `WrongMethodTypeException`: if the target's type is not identical with the caller's symbolic type descriptor
- `Throwable`: anything thrown by the underlying method propagates unchanged through the method handle call

## MethodHandle.invoke(Object...)

```java
public final native Object invoke(Object... args) throws Throwable
```

Invokes the method handle, allowing any caller type descriptor,
and optionally performing conversions on arguments and return values.

If the call site's symbolic type descriptor exactly matches this method handle's type,
the call proceeds as if by invokeExact.

Otherwise, the call proceeds as if this method handle were first
adjusted by calling asType to adjust this method handle
to the required type, and then the call proceeds as if by
invokeExact on the adjusted method handle.

There is no guarantee that the `asType` call is actually made.
If the JVM can predict the results of making the call, it may perform
adaptations directly on the caller's arguments,
and call the target method handle according to its own exact type.

The resolved type descriptor at the call site of `invoke` must
be a valid argument to the receivers `asType` method.
In particular, the caller must specify the same argument arity
as the callee's type,
if the callee is not a variable arity collector.

When this method is observed via the Core Reflection API,
it will appear as a single native method, taking an object array and returning an object.
If this native method is invoked directly via
java.lang.reflect.Method.invoke, via JNI,
or indirectly via Lookup.unreflect,
it will throw an `UnsupportedOperationException`.

Parameters:

- `args`: the signature-polymorphic parameter list, statically represented using varargs

**Returns:** the signature-polymorphic result, statically represented using `Object`

Throws:

- `WrongMethodTypeException`: if the target's type cannot be adjusted to the caller's symbolic type descriptor
- `ClassCastException`: if the target's type can be adjusted to the caller, but a reference cast fails
- `Throwable`: anything thrown by the underlying method propagates unchanged through the method handle call

## MethodHandle.invokeBasic(Object...)

```java
/*non-public*/ final native Object invokeBasic(Object... args) throws Throwable
```

Private method for trusted invocation of a method handle respecting simplified signatures.
Type mismatches will not throw `WrongMethodTypeException`, but could crash the JVM.

The caller signature is restricted to the following basic types:
Object, int, long, float, double, and void return.

The caller is responsible for maintaining type correctness by ensuring
that the each outgoing argument value is a member of the range of the corresponding
callee argument type.
(The caller should therefore issue appropriate casts and integer narrowing
operations on outgoing argument values.)
The caller can assume that the incoming result value is part of the range
of the callee's return type.

Parameters:

- `args`: the signature-polymorphic parameter list, statically represented using varargs

**Returns:** the signature-polymorphic result, statically represented using `Object`

## MethodHandle.linkToVirtual(Object...)

```java
/*non-public*/ static native Object linkToVirtual(Object... args) throws Throwable
```

Private method for trusted invocation of a MemberName of kind `REF_invokeVirtual`.
The caller signature is restricted to basic types as with `invokeBasic`.
The trailing (not leading) argument must be a MemberName.

Parameters:

- `args`: the signature-polymorphic parameter list, statically represented using varargs

**Returns:** the signature-polymorphic result, statically represented using `Object`

## MethodHandle.linkToStatic(Object...)

```java
/*non-public*/ static native Object linkToStatic(Object... args) throws Throwable
```

Private method for trusted invocation of a MemberName of kind `REF_invokeStatic`.
The caller signature is restricted to basic types as with `invokeBasic`.
The trailing (not leading) argument must be a MemberName.

Parameters:

- `args`: the signature-polymorphic parameter list, statically represented using varargs

**Returns:** the signature-polymorphic result, statically represented using `Object`

## MethodHandle.linkToSpecial(Object...)

```java
/*non-public*/ static native Object linkToSpecial(Object... args) throws Throwable
```

Private method for trusted invocation of a MemberName of kind `REF_invokeSpecial`.
The caller signature is restricted to basic types as with `invokeBasic`.
The trailing (not leading) argument must be a MemberName.

Parameters:

- `args`: the signature-polymorphic parameter list, statically represented using varargs

**Returns:** the signature-polymorphic result, statically represented using `Object`

## MethodHandle.linkToInterface(Object...)

```java
/*non-public*/ static native Object linkToInterface(Object... args) throws Throwable
```

Private method for trusted invocation of a MemberName of kind `REF_invokeInterface`.
The caller signature is restricted to basic types as with `invokeBasic`.
The trailing (not leading) argument must be a MemberName.

Parameters:

- `args`: the signature-polymorphic parameter list, statically represented using varargs

**Returns:** the signature-polymorphic result, statically represented using `Object`

## MethodHandle.linkToNative(Object...)

```java
/*non-public*/ static native Object linkToNative(Object... args) throws Throwable
```

TODO

## MethodHandle.invokeWithArguments(Object...)

```java
public Object invokeWithArguments(Object... arguments) throws Throwable
```

Performs a variable arity invocation, passing the arguments in the given array
to the method handle, as if via an inexact invoke from a call site
which mentions only the type `Object`, and whose actual argument count is the length
of the argument array.

Specifically, execution proceeds as if by the following steps,
although the methods are not guaranteed to be called if the JVM
can predict their effects.

- Determine the length of the argument array as `N`.
    For a null reference, `N=0`.

- Collect the `N` elements of the array as a logical
    argument list, each argument statically typed as an `Object`.

- Determine, as `M`, the parameter count of the type of this
    method handle.

- Determine the general type `TN` of `N` arguments or
    `M` arguments, if smaller than `N`, as
    `TN=MethodType.genericMethodType(Math.min(N, M))`.

- If `N` is greater than `M`, perform the following
    checks and actions to shorten the logical argument list:

- Check that this method handle has variable arity with a
        trailing parameter
        of some array type `A[]`.  If not, fail with a
        `WrongMethodTypeException`.

- Collect the trailing elements (there are `N-M+1` of them)
        from the logical argument list into a single array of
        type `A[]`, using `asType` conversions to
        convert each trailing argument to type `A`.

- If any of these conversions proves impossible, fail with either
        a `ClassCastException` if any trailing element cannot be
        cast to `A` or a `NullPointerException` if any
        trailing element is `null` and `A` is not a reference
        type.

- Replace the logical arguments gathered into the array of
        type `A[]` with the array itself, thus shortening
        the argument list to length `M`. This final argument
        retains the static type `A[]`.

- Adjust the type `TN` by changing the `N`th
        parameter type from `Object` to `A[]`.

- Force the original target method handle `MH0` to the
    required type, as `MH1 = MH0.asType(TN)`.

- Spread the argument list into `N` separate arguments `A0, ...`.

- Invoke the type-adjusted method handle on the unpacked arguments:
    MH1.invokeExact(A0, ...).

- Take the return value as an `Object` reference.

If the target method handle has variable arity, and the argument list is longer
than that arity, the excess arguments, starting at the position of the trailing
array argument, will be gathered (if possible, as if by `asType` conversions)
into an array of the appropriate type, and invocation will proceed on the
shortened argument list.
In this way, *jumbo argument lists* which would spread into more
than 254 slots can still be processed uniformly.

Unlike the generic invocation mode, which can
"recycle" an array argument, passing it directly to the target method,
this invocation mode *always* creates a new array parameter, even
if the original array passed to `invokeWithArguments` would have
been acceptable as a direct argument to the target method.
Even if the number `M` of actual arguments is the arity `N`,
and the last argument is dynamically a suitable array of type `A[]`,
it will still be boxed into a new one-element array, since the call
site statically types the argument as `Object`, not an array type.
This is not a special rule for this method, but rather a regular effect
of the rules for variable-arity invocation.

Because of the action of the `asType` step, the following argument
conversions are applied as necessary:

- reference casting

- unboxing

- widening primitive conversions

- variable arity conversion

The result returned by the call is boxed if it is a primitive,
or forced to null if the return type is void.

Unlike the signature polymorphic methods `invokeExact` and `invoke`,
`invokeWithArguments` can be accessed normally via the Core Reflection API and JNI.
It can therefore be used as a bridge between native or reflective code and method handles.

Parameters:

- `arguments`: the arguments to pass to the target

**API note:** This call is approximately equivalent to the following code:

**Returns:** the result returned by the target

**See also:** MethodHandles#spreadInvoker

Throws:

- `ClassCastException`: if an argument cannot be converted by reference casting
- `WrongMethodTypeException`: if the target's type cannot be adjusted to take the given number of `Object` arguments
- `Throwable`: anything thrown by the target method invocation
