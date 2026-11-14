---
title: "VarHandle class (java.lang.invoke) (part 3 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/VarHandle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# VarHandle class (java.lang.invoke) (part 3 of 5)

## VarHandle.compareAndSet(Object...)

```java
public final native boolean compareAndSet(Object... args)
```

Atomically sets the value of a variable to the `newValue` with the
memory semantics of `setVolatile` if the variable's current value,
referred to as the *witness value*, `==` the
`expectedValue`, as accessed with the memory semantics of
`getVolatile`.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)boolean`.

The symbolic type descriptor at the call site of `compareAndSet` must match the access mode type that is the result of
calling `accessModeType(VarHandle.AccessMode.COMPARE_AND_SET)` on
this VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)` , statically represented using varargs.

**Returns:** `true` if successful, otherwise `false` if the
*witness value* was not the same as the `expectedValue`.

**See also:** #setVolatile(Object...)

**See also:** #getVolatile(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.compareAndExchange(Object...)

```java
public final native Object compareAndExchange(Object... args)
```

Atomically sets the value of a variable to the `newValue` with the
memory semantics of `setVolatile` if the variable's current value,
referred to as the *witness value*, `==` the
`expectedValue`, as accessed with the memory semantics of
`getVolatile`.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)T`.

The symbolic type descriptor at the call site of `compareAndExchange`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.COMPARE_AND_EXCHANGE)`
on this VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the *witness value*, which
will be the same as the `expectedValue` if successful
, statically represented using `Object`.

**See also:** #setVolatile(Object...)

**See also:** #getVolatile(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type is not compatible with the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type is compatible with the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.compareAndExchangeAcquire(Object...)

```java
public final native Object compareAndExchangeAcquire(Object... args)
```

Atomically sets the value of a variable to the `newValue` with the
memory semantics of `set` if the variable's current value,
referred to as the *witness value*, `==` the
`expectedValue`, as accessed with the memory semantics of
`getAcquire`.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)T`.

The symbolic type descriptor at the call site of `compareAndExchangeAcquire`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.COMPARE_AND_EXCHANGE_ACQUIRE)` on
this VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the *witness value*, which
will be the same as the `expectedValue` if successful
, statically represented using `Object`.

**See also:** #set(Object...)

**See also:** #getAcquire(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.compareAndExchangeRelease(Object...)

```java
public final native Object compareAndExchangeRelease(Object... args)
```

Atomically sets the value of a variable to the `newValue` with the
memory semantics of `setRelease` if the variable's current value,
referred to as the *witness value*, `==` the
`expectedValue`, as accessed with the memory semantics of
`get`.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)T`.

The symbolic type descriptor at the call site of `compareAndExchangeRelease`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.COMPARE_AND_EXCHANGE_RELEASE)`
on this VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)` , statically represented using varargs.

**Returns:** the signature-polymorphic result that is the *witness value*, which
will be the same as the `expectedValue` if successful
, statically represented using `Object`.

**See also:** #setRelease(Object...)

**See also:** #get(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.weakCompareAndSetPlain(Object...)

```java
public final native boolean weakCompareAndSetPlain(Object... args)
```

Possibly atomically sets the value of a variable to the `newValue`
with the semantics of `set` if the variable's current value,
referred to as the *witness value*, `==` the
`expectedValue`, as accessed with the memory semantics of
`get`.

This operation may fail spuriously (typically, due to memory
contention) even if the *witness value* does match the expected value.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)boolean`.

The symbolic type descriptor at the call site of `weakCompareAndSetPlain` must match the access mode type that is the result of
calling `accessModeType(VarHandle.AccessMode.WEAK_COMPARE_AND_SET_PLAIN)`
on this VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)` , statically represented using varargs.

**Returns:** `true` if successful, otherwise `false` if the
*witness value* was not the same as the `expectedValue` or if this
operation spuriously failed.

**See also:** #set(Object...)

**See also:** #get(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.weakCompareAndSet(Object...)

```java
public final native boolean weakCompareAndSet(Object... args)
```

Possibly atomically sets the value of a variable to the `newValue`
with the memory semantics of `setVolatile` if the variable's
current value, referred to as the *witness value*, `==` the
`expectedValue`, as accessed with the memory semantics of
`getVolatile`.

This operation may fail spuriously (typically, due to memory
contention) even if the *witness value* does match the expected value.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)boolean`.

The symbolic type descriptor at the call site of `weakCompareAndSet` must match the access mode type that is the
result of calling `accessModeType(VarHandle.AccessMode.WEAK_COMPARE_AND_SET)`
on this VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)` , statically represented using varargs.

**Returns:** `true` if successful, otherwise `false` if the
*witness value* was not the same as the `expectedValue` or if this
operation spuriously failed.

**See also:** #setVolatile(Object...)

**See also:** #getVolatile(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.weakCompareAndSetAcquire(Object...)

```java
public final native boolean weakCompareAndSetAcquire(Object... args)
```

Possibly atomically sets the value of a variable to the `newValue`
with the semantics of `set` if the variable's current value,
referred to as the *witness value*, `==` the
`expectedValue`, as accessed with the memory semantics of
`getAcquire`.

This operation may fail spuriously (typically, due to memory
contention) even if the *witness value* does match the expected value.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)boolean`.

The symbolic type descriptor at the call site of `weakCompareAndSetAcquire`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.WEAK_COMPARE_AND_SET_ACQUIRE)`
on this VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)` , statically represented using varargs.

**Returns:** `true` if successful, otherwise `false` if the
*witness value* was not the same as the `expectedValue` or if this
operation spuriously failed.

**See also:** #set(Object...)

**See also:** #getAcquire(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.weakCompareAndSetRelease(Object...)

```java
public final native boolean weakCompareAndSetRelease(Object... args)
```

Possibly atomically sets the value of a variable to the `newValue`
with the semantics of `setRelease` if the variable's current
value, referred to as the *witness value*, `==` the
`expectedValue`, as accessed with the memory semantics of
`get`.

This operation may fail spuriously (typically, due to memory
contention) even if the *witness value* does match the expected value.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)boolean`.

The symbolic type descriptor at the call site of `weakCompareAndSetRelease`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.WEAK_COMPARE_AND_SET_RELEASE)`
on this VarHandle.

Parameters:

- `args`: the signature-polymorphic parameter list of the form `(CT1 ct1, ..., CTn ctn, T expectedValue, T newValue)` , statically represented using varargs.

**Returns:** `true` if successful, otherwise `false` if the
*witness value* was not the same as the `expectedValue` or if this
operation spuriously failed.

**See also:** #setRelease(Object...)

**See also:** #get(Object...)

Throws:

- `UnsupportedOperationException`: if the access mode is unsupported for this VarHandle.
- `WrongMethodTypeException`: if the access mode type does not match the caller's symbolic type descriptor.
- `ClassCastException`: if the access mode type matches the caller's symbolic type descriptor, but a reference cast fails.

## VarHandle.getAndSet(Object...)

```java
public final native Object getAndSet(Object... args)
```

Atomically sets the value of a variable to the `newValue` with the
memory semantics of `setVolatile` and returns the variable's
previous value, as accessed with the memory semantics of
`getVolatile`.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T newValue)T`.

The symbolic type descriptor at the call site of `getAndSet`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_SET)` on this
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

## VarHandle.getAndSetAcquire(Object...)

```java
public final native Object getAndSetAcquire(Object... args)
```

Atomically sets the value of a variable to the `newValue` with the
memory semantics of `set` and returns the variable's
previous value, as accessed with the memory semantics of
`getAcquire`.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T newValue)T`.

The symbolic type descriptor at the call site of `getAndSetAcquire`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_SET_ACQUIRE)` on this
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
