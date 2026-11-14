---
title: "VarHandle class (java.lang.invoke) (part 5 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/VarHandle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# VarHandle class (java.lang.invoke) (part 5 of 5)

## VarHandle.getAndBitwiseXor(Object...)

```java
public final native Object getAndBitwiseXor(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise XOR between the variable's current value and the `mask`
with the memory semantics of `setVolatile` and returns the
variable's previous value, as accessed with the memory semantics of
`getVolatile`.

If the variable type is the non-integral `boolean` type then a
logical XOR is performed instead of a bitwise XOR.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T mask)T`.

The symbolic type descriptor at the call site of `getAndBitwiseXor`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_XOR)` on this
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

## VarHandle.getAndBitwiseXorAcquire(Object...)

```java
public final native Object getAndBitwiseXorAcquire(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise XOR between the variable's current value and the `mask`
with the memory semantics of `set` and returns the
variable's previous value, as accessed with the memory semantics of
`getAcquire`.

If the variable type is the non-integral `boolean` type then a
logical XOR is performed instead of a bitwise XOR.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T mask)T`.

The symbolic type descriptor at the call site of `getAndBitwiseXorAcquire`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_XOR_ACQUIRE)` on this
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

## VarHandle.getAndBitwiseXorRelease(Object...)

```java
public final native Object getAndBitwiseXorRelease(Object... args)
```

Atomically sets the value of a variable to the result of
bitwise XOR between the variable's current value and the `mask`
with the memory semantics of `setRelease` and returns the
variable's previous value, as accessed with the memory semantics of
`get`.

If the variable type is the non-integral `boolean` type then a
logical XOR is performed instead of a bitwise XOR.

The method signature is of the form `(CT1 ct1, ..., CTn ctn, T mask)T`.

The symbolic type descriptor at the call site of `getAndBitwiseXorRelease`
must match the access mode type that is the result of calling
`accessModeType(VarHandle.AccessMode.GET_AND_BITWISE_XOR_RELEASE)` on this
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

## VarHandle.withInvokeExactBehavior()

```java
public abstract VarHandle withInvokeExactBehavior()
```

Returns a VarHandle, with access to the same variable(s) as this VarHandle, but whose
invocation behavior of access mode methods is adjusted to
*invoke-exact behavior*.

If this VarHandle already has invoke-exact behavior this VarHandle is returned.

Invoking `hasInvokeExactBehavior()` on the returned var handle
is guaranteed to return `true`.

**API note:** Invoke-exact behavior guarantees that upon invocation of an access mode method
the types and arity of the arguments must match the access mode type,
otherwise a `WrongMethodTypeException` is thrown.

**See also:** #withInvokeBehavior()

**See also:** #hasInvokeExactBehavior()

**Returns:** a VarHandle with invoke-exact behavior

**Since:** 16

## VarHandle.withInvokeBehavior()

```java
public abstract VarHandle withInvokeBehavior()
```

Returns a VarHandle, with access to the same variable(s) as this VarHandle, but whose
invocation behavior of access mode methods is adjusted to
*invoke behavior*.

If this VarHandle already has invoke behavior this VarHandle is returned.

Invoking `hasInvokeExactBehavior()` on the returned var handle
is guaranteed to return `false`.

**See also:** #withInvokeExactBehavior()

**See also:** #hasInvokeExactBehavior()

**Returns:** a VarHandle with invoke behavior

**Since:** 16

## VarHandle.methodName()

```java
public String methodName()
```

Returns the `VarHandle` signature-polymorphic method name
associated with this `AccessMode` value.

**Returns:** the signature-polymorphic method name

**See also:** #valueFromMethodName

## VarHandle.valueFromMethodName(String)

```java
public static AccessMode valueFromMethodName(String methodName)
```

Returns the `AccessMode` value associated with the specified
`VarHandle` signature-polymorphic method name.

Parameters:

- `methodName`: the signature-polymorphic method name

**Returns:** the `AccessMode` value

**See also:** #methodName()

Throws:

- `IllegalArgumentException`: if there is no `AccessMode` value associated with method name (indicating the method name does not correspond to a `VarHandle` signature-polymorphic method name).

## VarHandle.toString()

```java
public final String toString()
```

Returns a compact textual description of this `VarHandle`,
including the type of variable described, and a description of its coordinates.

**Returns:** A compact textual description of this `VarHandle`

## VarHandle.varType()

```java
public Class<?> varType()
```

Returns the variable type of variables referenced by this VarHandle.

**Returns:** the variable type of variables referenced by this VarHandle

## VarHandle.coordinateTypes()

```java
public List<Class<?>> coordinateTypes()
```

Returns the coordinate types for this VarHandle.

**Returns:** the coordinate types for this VarHandle. The returned
list is unmodifiable

## VarHandle.accessModeType(AccessMode)

```java
public final MethodType accessModeType(AccessMode accessMode)
```

Obtains the access mode type for this VarHandle and a given access mode.

The access mode type's parameter types will consist of a prefix that
is the coordinate types of this VarHandle followed by further
types as defined by the access mode method.
The access mode type's return type is defined by the return type of the
access mode method.

Parameters:

- `accessMode`: the access mode, corresponding to the signature-polymorphic method of the same name

**Returns:** the access mode type for the given access mode

## VarHandle.isAccessModeSupported(AccessMode)

```java
public boolean isAccessModeSupported(AccessMode accessMode)
```

Returns `true` if the given access mode is supported, otherwise
`false`.

The return of a `false` value for a given access mode indicates
that an `UnsupportedOperationException` is thrown on invocation
of the corresponding access mode method.

Parameters:

- `accessMode`: the access mode, corresponding to the signature-polymorphic method of the same name

**Returns:** `true` if the given access mode is supported, otherwise
`false`.

## VarHandle.toMethodHandle(AccessMode)

```java
public MethodHandle toMethodHandle(AccessMode accessMode)
```

Obtains a method handle bound to this VarHandle and the given access
mode.

Parameters:

- `accessMode`: the access mode, corresponding to the signature-polymorphic method of the same name

**API note:** This method, for a VarHandle `vh` and access mode
`{access-mode}`, returns a method handle that is equivalent to
method handle `bmh` in the following code (though it may be more
efficient):

```java
MethodHandle mh = MethodHandles.varHandleExactInvoker(
                      vh.accessModeType(VarHandle.AccessMode.{access-mode}));

MethodHandle bmh = mh.bindTo(vh);
```

**Returns:** a method handle bound to this VarHandle and the given access mode

## VarHandle.describeConstable()

```java
public Optional<VarHandleDesc> describeConstable()
```

Return a nominal descriptor for this instance, if one can be
constructed, or an empty `Optional` if one cannot be.

**Returns:** An `Optional` containing the resulting nominal descriptor,
or an empty `Optional` if one cannot be constructed.

**Since:** 12

## VarHandle.fullFence()

```java
public static void fullFence()
```

Ensures that loads and stores before the fence will not be reordered
with
loads and stores after the fence.

**API note:** Ignoring the many semantic differences from C and C++, this
method has memory ordering effects compatible with
`atomic_thread_fence(memory_order_seq_cst)`

## VarHandle.acquireFence()

```java
public static void acquireFence()
```

Ensures that loads before the fence will not be reordered with loads and
stores after the fence.

**API note:** Ignoring the many semantic differences from C and C++, this
method has memory ordering effects compatible with
`atomic_thread_fence(memory_order_acquire)`

## VarHandle.releaseFence()

```java
public static void releaseFence()
```

Ensures that loads and stores before the fence will not be
reordered with stores after the fence.

**API note:** Ignoring the many semantic differences from C and C++, this
method has memory ordering effects compatible with
`atomic_thread_fence(memory_order_release)`

## VarHandle.loadLoadFence()

```java
public static void loadLoadFence()
```

Ensures that loads before the fence will not be reordered with
loads after the fence.

## VarHandle.storeStoreFence()

```java
public static void storeStoreFence()
```

Ensures that stores before the fence will not be reordered with
stores after the fence.

## VarHandle.ofField(ClassDesc, String, ClassDesc)

```java
public static VarHandleDesc ofField(ClassDesc declaringClass, String name, ClassDesc fieldType)
```

Returns a `VarHandleDesc` corresponding to a `VarHandle`
for an instance field.

Parameters:

- `declaringClass`: a `ClassDesc` describing the declaring class, for field var handles
- `name`: the unqualified name of the field
- `fieldType`: a `ClassDesc` describing the type of the field

**Returns:** the `VarHandleDesc`

**jvms:** 4.2.2 Unqualified Names

Throws:

- `NullPointerException`: if any of the arguments are null

## VarHandle.ofStaticField(ClassDesc, String, ClassDesc)

```java
public static VarHandleDesc ofStaticField(ClassDesc declaringClass, String name, ClassDesc fieldType)
```

Returns a `VarHandleDesc` corresponding to a `VarHandle`
for a static field.

Parameters:

- `declaringClass`: a `ClassDesc` describing the declaring class, for field var handles
- `name`: the unqualified name of the field
- `fieldType`: a `ClassDesc` describing the type of the field

**Returns:** the `VarHandleDesc`

**jvms:** 4.2.2 Unqualified Names

Throws:

- `NullPointerException`: if any of the arguments are null

## VarHandle.ofArray(ClassDesc)

```java
public static VarHandleDesc ofArray(ClassDesc arrayClass)
```

Returns a `VarHandleDesc` corresponding to a `VarHandle`
for an array type.

Parameters:

- `arrayClass`: a `ClassDesc` describing the type of the array

**Returns:** the `VarHandleDesc`

Throws:

- `NullPointerException`: if any of the arguments are null

## VarHandle.varType()

```java
public ClassDesc varType()
```

Returns a `ClassDesc` describing the type of the variable described
by this descriptor.

**Returns:** the variable type

## VarHandle.toString()

```java
public String toString()
```

Returns a compact textual description of this constant description.
For a field `VarHandle`, includes the owner, name, and type
of the field, and whether it is static; for an array `VarHandle`,
the name of the component type.

**Returns:** A compact textual description of this descriptor
