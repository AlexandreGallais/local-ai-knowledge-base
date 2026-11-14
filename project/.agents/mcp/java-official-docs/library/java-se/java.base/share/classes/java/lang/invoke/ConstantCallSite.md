---
title: "ConstantCallSite class (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/ConstantCallSite.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConstantCallSite class (java.lang.invoke)

```java
public non-sealed class ConstantCallSite extends CallSite
```

A `ConstantCallSite` is a `CallSite` whose target is permanent, and can never be changed.
An `invokedynamic` instruction linked to a `ConstantCallSite` is permanently
bound to the call site's target.

**Since:** 1.7

## ConstantCallSite.ConstantCallSite(MethodHandle)

```java
public ConstantCallSite(MethodHandle target)
```

Creates a call site with a permanent target.

Parameters:

- `target`: the target to be permanently associated with this call site

Throws:

- `NullPointerException`: if the proposed target is null

## ConstantCallSite.ConstantCallSite(MethodType, MethodHandle)

```java
protected ConstantCallSite(MethodType targetType, MethodHandle createTargetHook) throws Throwable
```

Creates a call site with a permanent target, possibly bound to the call site itself.

During construction of the call site, the `createTargetHook` is invoked to
produce the actual target, as if by a call of the form
`(MethodHandle) createTargetHook.invoke(this)`.

Note that user code cannot perform such an action directly in a subclass constructor,
since the target must be fixed before the `ConstantCallSite` constructor returns.

The hook is said to bind the call site to a target method handle,
and a typical action would be `someTarget.bindTo(this)`.
However, the hook is free to take any action whatever,
including ignoring the call site and returning a constant target.

The result returned by the hook must be a method handle of exactly
the same type as the call site.

While the hook is being called, the new `ConstantCallSite`
object is in a partially constructed state.
In this state,
a call to `getTarget`, or any other attempt to use the target,
will result in an `IllegalStateException`.
It is legal at all times to obtain the call site's type using the `type` method.

Parameters:

- `targetType`: the type of the method handle to be permanently associated with this call site
- `createTargetHook`: a method handle to invoke (on the call site) to produce the call site's target

Throws:

- `WrongMethodTypeException`: if the hook cannot be invoked on the required arguments, or if the target returned by the hook is not of the given `targetType`
- `NullPointerException`: if the hook returns a null value
- `ClassCastException`: if the hook returns something other than a `MethodHandle`
- `Throwable`: anything else thrown by the hook function

## ConstantCallSite.getTarget()

```java
public final MethodHandle getTarget()
```

Returns the target method of the call site, which behaves
like a `final` field of the `ConstantCallSite`.
That is, the target is always the original value passed
to the constructor call which created this instance.

**Returns:** the immutable linkage state of this call site, a constant method handle

Throws:

- `IllegalStateException`: if the `ConstantCallSite` constructor has not completed

## ConstantCallSite.setTarget(MethodHandle)

```java
public final void setTarget(MethodHandle ignore)
```

Always throws an `UnsupportedOperationException`.
This kind of call site cannot change its target.

Parameters:

- `ignore`: a new target proposed for the call site, which is ignored

Throws:

- `UnsupportedOperationException`: because this kind of call site cannot change its target

## ConstantCallSite.dynamicInvoker()

```java
public final MethodHandle dynamicInvoker()
```

Returns this call site's permanent target.
Since that target will never change, this is a correct implementation
of CallSite.dynamicInvoker.

**Returns:** the immutable linkage state of this call site, a constant method handle

Throws:

- `IllegalStateException`: if the `ConstantCallSite` constructor has not completed
