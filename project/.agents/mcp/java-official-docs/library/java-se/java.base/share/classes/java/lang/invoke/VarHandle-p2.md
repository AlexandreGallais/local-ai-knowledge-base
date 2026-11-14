---
title: "VarHandle class (java.lang.invoke) (part 2 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/VarHandle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# VarHandle class (java.lang.invoke) (part 2 of 5)

More concisely, such behavior is equivalent to:

```java
VarHandle vh = ..
VarHandle.AccessMode am = VarHandle.AccessMode.valueFromMethodName("{access-mode}");
MethodHandle mh = vh.toMethodHandle(am);

R r = (R) mh.invokeExact(p1, p2, ..., pN)
```

Where, in this case, the method handle is bound to the VarHandle instance.

#### Invocation checking

In typical programs, VarHandle access mode type matching will usually
succeed.  But if a match fails, the JVM will throw a
`WrongMethodTypeException`.

Thus, an access mode type mismatch which might show up as a linkage error
in a statically typed program can show up as a dynamic
`WrongMethodTypeException` in a program which uses VarHandles.

Because access mode types contain "live" `Class` objects, method type
matching takes into account both type names and class loaders.
Thus, even if a VarHandle `VH` is created in one class loader
`L1` and used in another `L2`, VarHandle access mode method
calls are type-safe, because the caller's symbolic type descriptor, as
resolved in `L2`, is matched against the original callee method's
symbolic type descriptor, as resolved in `L1`.  The resolution in
`L1` happens when `VH` is created and its access mode types are
assigned, while the resolution in `L2` happens when the
`invokevirtual` instruction is linked.

Apart from type descriptor checks, a VarHandles's capability to
access its variables is unrestricted.
If a VarHandle is formed on a non-public variable by a class that has access
to that variable, the resulting VarHandle can be used in any place by any
caller who receives a reference to it.

Unlike with the Core Reflection API, where access is checked every time a
reflective method is invoked, VarHandle access checking is performed
when the VarHandle is
created.
Thus, VarHandles to non-public variables, or to variables in non-public
classes, should generally be kept secret.  They should not be passed to
untrusted code unless their use from the untrusted code would be harmless.

#### VarHandle creation

Java code can create a VarHandle that directly accesses any field that is
accessible to that code.  This is done via a reflective, capability-based
API called MethodHandles.Lookup.
For example, a VarHandle for a non-static field can be obtained
from Lookup.findVarHandle.
There is also a conversion method from Core Reflection API objects,
Lookup.unreflectVarHandle.

Access to protected field members is restricted to receivers only of the
accessing class, or one of its subclasses, and the accessing class must in
turn be a subclass (or package sibling) of the protected member's defining
class.  If a VarHandle refers to a protected non-static field of a declaring
class outside the current package, the receiver argument will be narrowed to
the type of the accessing class.

#### Interoperation between VarHandles and the Core Reflection API

Using factory methods in the Lookup API, any field represented by a Core Reflection API object
can be converted to a behaviorally equivalent VarHandle.
For example, a reflective Field can
be converted to a VarHandle using
Lookup.unreflectVarHandle.
The resulting VarHandles generally provide more direct and efficient
access to the underlying fields.

As a special case, when the Core Reflection API is used to view the
signature polymorphic access mode methods in this class, they appear as
ordinary non-polymorphic methods.  Their reflective appearance, as viewed by
Class.getDeclaredMethod,
is unaffected by their special status in this API.
For example, Method.getModifiers
will report exactly those modifier bits required for any similarly
declared method, including in this case `native` and `varargs`
bits.

As with any reflected method, these methods (when reflected) may be invoked
directly via java.lang.reflect.Method.invoke,
via JNI, or indirectly via
Lookup.unreflect.
However, such reflective calls do not result in access mode method
invocations.  Such a call, if passed the required argument (a single one, of
type `Object[]`), will ignore the argument and will throw an
`UnsupportedOperationException`.

Since `invokevirtual` instructions can natively invoke VarHandle
access mode methods under any symbolic type descriptor, this reflective view
conflicts with the normal presentation of these methods via bytecodes.
Thus, these native methods, when reflectively viewed by
`Class.getDeclaredMethod`, may be regarded as placeholders only.

In order to obtain an invoker method for a particular access mode type,
use `java.lang.invoke.MethodHandles.varHandleExactInvoker` or
`java.lang.invoke.MethodHandles.varHandleInvoker`.  The
Lookup.findVirtual
API is also able to return a method handle to call an access mode method for
any specified access mode type and is equivalent in behavior to
`java.lang.invoke.MethodHandles.varHandleInvoker`.

#### Interoperation between VarHandles and Java generics

A VarHandle can be obtained for a variable, such as a field, which is
declared with Java generic types.  As with the Core Reflection API, the
VarHandle's variable type will be constructed from the erasure of the
source-level type.  When a VarHandle access mode method is invoked, the
types
of its arguments or the return value cast type may be generic types or type
instances.  If this occurs, the compiler will replace those types by their
erasures when it constructs the symbolic type descriptor for the
`invokevirtual` instruction.

**See also:** MethodHandle

**See also:** MethodHandles

**See also:** MethodType

**Since:** 9

## VarHandle.hasInvokeExactBehavior()

```java
public boolean hasInvokeExactBehavior()
```

Returns `true` if this VarHandle has *invoke-exact behavior*.

**See also:** #withInvokeExactBehavior()

**See also:** #withInvokeBehavior()

**Returns:** `true` if this VarHandle has *invoke-exact behavior*.

**Since:** 16

## VarHandle.get(Object...)

```java
public final native Object get(Object... args)
```

Returns the value of a variable, with memory semantics of reading as
if the variable was declared non-`volatile`.  Commonly referred to
as plain read access.

The method signature is of the form `(CT1 ct1, ..., CTn ctn)T`.

The symbolic type descriptor at the call site of `get`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET)` on this VarHandle.

This access mode is supported by all VarHandle instances and never
throws `UnsupportedOperationException`.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the value of the
variable
, statically represented using `Object`.

Throws:

- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.set(Object...)

```java
public final native void set(Object... args)
```

Sets the value of a variable to the `newValue`, with memory
semantics of setting as if the variable was declared non-`volatile`
and non-`final`.  Commonly referred to as plain write access.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T newValue)void`

The symbolic type descriptor at the call site of `set`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.SET)` on this VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T newValue)` , statically represented using varargs.

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getVolatile(Object...)

```java
public final native Object getVolatile(Object... args)
```

Returns the value of a variable, with memory semantics of reading as if
the variable was declared `volatile`.

The method signature is of the form `(CT1 ct1, ..., CTn ctn)T`.

The symbolic type descriptor at the call site of `getVolatile`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_VOLATILE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the value of the
variable
, statically represented using `Object`.

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.setVolatile(Object...)

```java
public final native void setVolatile(Object... args)
```

Sets the value of a variable to the `newValue`, with memory
semantics of setting as if the variable was declared `volatile`.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T newValue)void`.

The symbolic type descriptor at the call site of `setVolatile`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.SET_VOLATILE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T newValue)` , statically represented using varargs.

**API note:** Ignoring the many semantic differences from C and C++, this method has
memory ordering effects compatible with `memory_order_seq_cst`.

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getOpaque(Object...)

```java
public final native Object getOpaque(Object... args)
```

Returns the value of a variable, accessed in program order, but with no
assurance of memory ordering effects with respect to other threads.

The method signature is of the form `(CT1 ct1, ..., CTn ctn)T`.

The symbolic type descriptor at the call site of `getOpaque`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_OPAQUE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the value of the
variable
, statically represented using `Object`.

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.setOpaque(Object...)

```java
public final native void setOpaque(Object... args)
```

Sets the value of a variable to the `newValue`, in program order,
but with no assurance of memory ordering effects with respect to other
threads.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T newValue)void`.

The symbolic type descriptor at the call site of `setOpaque`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.SET_OPAQUE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T newValue)` , statically represented using varargs.

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getAcquire(Object...)

```java
public final native Object getAcquire(Object... args)
```

Returns the value of a variable, and ensures that subsequent loads and
stores are not reordered before this access.

The method signature is of the form `(CT1 ct1, ..., CTn ctn)T`.

The symbolic type descriptor at the call site of `getAcquire`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_ACQUIRE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn)` , statically represented using varargs.

**API note:** Ignoring the many semantic differences from C and C++, this method has
memory ordering effects compatible with `memory_order_acquire`
ordering.

**Returns:** the signature-polymorphic result that is the value of the
variable
, statically represented using `Object`.

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.setRelease(Object...)

```java
public final native void setRelease(Object... args)
```

Sets the value of a variable to the `newValue`, and ensures that
prior loads and stores are not reordered after this access.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T newValue)void`.

The symbolic type descriptor at the call site of `setRelease`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.SET_RELEASE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T newValue)` , statically represented using varargs.

**API note:** Ignoring the many semantic differences from C and C++, this method has
memory ordering effects compatible with `memory_order_release`
ordering.

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.
