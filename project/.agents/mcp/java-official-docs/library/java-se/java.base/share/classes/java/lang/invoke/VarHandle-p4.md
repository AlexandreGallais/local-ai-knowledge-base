---
title: "VarHandle class (java.lang.invoke) (part 4 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/VarHandle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# VarHandle class (java.lang.invoke) (part 4 of 5)

## VarHandle.getAndSetRelease(Object...)

```java
public final native Object getAndSetRelease(Object... args)
```

Atomically sets the value of a variable to the `newValue` with the
memory semantics of `setRelease` and returns the variable's
previous value, as accessed with the memory semantics of
`get`.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T newValue)T`.

The symbolic type descriptor at the call site of `getAndSetRelease`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_SET_RELEASE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T newValue)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the previous value of
the variable
, statically represented using `Object`.

**See also:** #setVolatile(Object...)

**See also:** #getVolatile(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getAndAdd(Object...)

```java
public final native Object getAndAdd(Object... args)
```

Atomically adds the `value` to the current value of a variable with
the memory semantics of `setVolatile`, and returns the variable's
previous value, as accessed with the memory semantics of
`getVolatile`.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T value)T`.

The symbolic type descriptor at the call site of `getAndAdd`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_ADD)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T value)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the previous value of
the variable
, statically represented using `Object`.

**See also:** #setVolatile(Object...)

**See also:** #getVolatile(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getAndAddAcquire(Object...)

```java
public final native Object getAndAddAcquire(Object... args)
```

Atomically adds the `value` to the current value of a variable with
the memory semantics of `set`, and returns the variable's
previous value, as accessed with the memory semantics of
`getAcquire`.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T value)T`.

The symbolic type descriptor at the call site of `getAndAddAcquire`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_ADD_ACQUIRE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T value)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the previous value of
the variable
, statically represented using `Object`.

**See also:** #setVolatile(Object...)

**See also:** #getVolatile(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getAndAddRelease(Object...)

```java
public final native Object getAndAddRelease(Object... args)
```

Atomically adds the `value` to the current value of a variable with
the memory semantics of `setRelease`, and returns the variable's
previous value, as accessed with the memory semantics of
`get`.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T value)T`.

The symbolic type descriptor at the call site of `getAndAddRelease`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_ADD_RELEASE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T value)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the previous value of
the variable
, statically represented using `Object`.

**See also:** #setVolatile(Object...)

**See also:** #getVolatile(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getAndBitwiseOr(Object...)

```java
public final native Object getAndBitwiseOr(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise OR between the variable's current value and the `mask`
with the memory semantics of `setVolatile` and returns the
variable's previous value, as accessed with the memory semantics of
`getVolatile`.

If the variable type is the non-integral `boolean` type then a
logical OR is performed instead of a bitwise OR.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T mask)T`.

The symbolic type descriptor at the call site of `getAndBitwiseOr`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_OR)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T mask)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the previous value of
the variable
, statically represented using `Object`.

**See also:** #setVolatile(Object...)

**See also:** #getVolatile(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getAndBitwiseOrAcquire(Object...)

```java
public final native Object getAndBitwiseOrAcquire(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise OR between the variable's current value and the `mask`
with the memory semantics of `set` and returns the
variable's previous value, as accessed with the memory semantics of
`getAcquire`.

If the variable type is the non-integral `boolean` type then a
logical OR is performed instead of a bitwise OR.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T mask)T`.

The symbolic type descriptor at the call site of `getAndBitwiseOrAcquire`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_OR_ACQUIRE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T mask)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the previous value of
the variable
, statically represented using `Object`.

**See also:** #set(Object...)

**See also:** #getAcquire(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getAndBitwiseOrRelease(Object...)

```java
public final native Object getAndBitwiseOrRelease(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise OR between the variable's current value and the `mask`
with the memory semantics of `setRelease` and returns the
variable's previous value, as accessed with the memory semantics of
`get`.

If the variable type is the non-integral `boolean` type then a
logical OR is performed instead of a bitwise OR.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T mask)T`.

The symbolic type descriptor at the call site of `getAndBitwiseOrRelease`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_OR_RELEASE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T mask)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the previous value of
the variable
, statically represented using `Object`.

**See also:** #setRelease(Object...)

**See also:** #get(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getAndBitwiseAnd(Object...)

```java
public final native Object getAndBitwiseAnd(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise AND between the variable's current value and the `mask`
with the memory semantics of `setVolatile` and returns the
variable's previous value, as accessed with the memory semantics of
`getVolatile`.

If the variable type is the non-integral `boolean` type then a
logical AND is performed instead of a bitwise AND.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T mask)T`.

The symbolic type descriptor at the call site of `getAndBitwiseAnd`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_AND)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T mask)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the previous value of
the variable
, statically represented using `Object`.

**See also:** #setVolatile(Object...)

**See also:** #getVolatile(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getAndBitwiseAndAcquire(Object...)

```java
public final native Object getAndBitwiseAndAcquire(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise AND between the variable's current value and the `mask`
with the memory semantics of `set` and returns the
variable's previous value, as accessed with the memory semantics of
`getAcquire`.

If the variable type is the non-integral `boolean` type then a
logical AND is performed instead of a bitwise AND.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T mask)T`.

The symbolic type descriptor at the call site of `getAndBitwiseAndAcquire`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_AND_ACQUIRE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T mask)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the previous value of
the variable
, statically represented using `Object`.

**See also:** #set(Object...)

**See also:** #getAcquire(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getAndBitwiseAndRelease(Object...)

```java
public final native Object getAndBitwiseAndRelease(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise AND between the variable's current value and the `mask`
with the memory semantics of `setRelease` and returns the
variable's previous value, as accessed with the memory semantics of
`get`.

If the variable type is the non-integral `boolean` type then a
logical AND is performed instead of a bitwise AND.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T mask)T`.

The symbolic type descriptor at the call site of `getAndBitwiseAndRelease`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_AND_RELEASE)` on this
VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T mask)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the previous value of
the variable
, statically represented using `Object`.

**See also:** #setRelease(Object...)

**See also:** #get(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.
