---
title: "MethodTypeDesc interface (java.lang.constant)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/constant/MethodTypeDesc.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodTypeDesc interface (java.lang.constant)

```java
public sealed interface MethodTypeDesc extends ConstantDesc, TypeDescriptor.OfMethod<ClassDesc, MethodTypeDesc> permits MethodTypeDescImpl
```

A nominal descriptor for a
`MethodType` constant.

**Since:** 12

## MethodTypeDesc.ofDescriptor(String)

```java
static MethodTypeDesc ofDescriptor(String descriptor)
```

Creates a `MethodTypeDesc` given a method descriptor string.

Parameters:

- `descriptor`: a method descriptor string

**Returns:** a `MethodTypeDesc` describing the desired method type

**jvms:** 4.3.3 Method Descriptors

Throws:

- `NullPointerException`: if the argument is `null`
- `IllegalArgumentException`: if the descriptor string is not a valid method descriptor

## MethodTypeDesc.of(ClassDesc)

```java
static MethodTypeDesc of(ClassDesc returnDesc)
```

Parameters:

- `returnDesc`: a `ClassDesc` describing the return type

**Since:** 21

Throws:

- `NullPointerException`: if `returnDesc` is `null`

## MethodTypeDesc.of(ClassDesc, List<ClassDesc>)

```java
static MethodTypeDesc of(ClassDesc returnDesc, List<ClassDesc> paramDescs)
```

Parameters:

- `returnDesc`: a `ClassDesc` describing the return type
- `paramDescs`: a `List` of `ClassDesc`s describing the parameter types

**Since:** 21

Throws:

- `NullPointerException`: if any argument or its contents are `null`
- `IllegalArgumentException`: if any element of `paramDescs` is a `ClassDesc` for `void`

## MethodTypeDesc.of(ClassDesc, ClassDesc...)

```java
static MethodTypeDesc of(ClassDesc returnDesc, ClassDesc... paramDescs)
```

Returns a `MethodTypeDesc` given the return type and parameter
types.

Parameters:

- `returnDesc`: a `ClassDesc` describing the return type
- `paramDescs`: `ClassDesc`s describing the argument types

**Returns:** a `MethodTypeDesc` describing the desired method type

Throws:

- `NullPointerException`: if any argument or its contents are `null`
- `IllegalArgumentException`: if any element of `paramDescs` is a `ClassDesc` for `void`

## MethodTypeDesc.returnType()

```java
ClassDesc returnType()
```

Gets the return type of the method type described by this `MethodTypeDesc`.

**Returns:** a `ClassDesc` describing the return type of the method type

## MethodTypeDesc.parameterCount()

```java
int parameterCount()
```

Returns the number of parameters of the method type described by
this `MethodTypeDesc`.

**Returns:** the number of parameters

## MethodTypeDesc.parameterType(int)

```java
ClassDesc parameterType(int index)
```

Returns the parameter type of the `index`'th parameter of the method type
described by this `MethodTypeDesc`.

Parameters:

- `index`: the index of the parameter to retrieve

**Returns:** a `ClassDesc` describing the desired parameter type

Throws:

- `IndexOutOfBoundsException`: if the index is outside the half-open range `[0, parameterCount())`

## MethodTypeDesc.parameterList()

```java
List<ClassDesc> parameterList()
```

Returns the parameter types as an immutable `List`.

**Returns:** a `List` of `ClassDesc` describing the parameter types

## MethodTypeDesc.parameterArray()

```java
ClassDesc[] parameterArray()
```

Returns the parameter types as an array.

**Returns:** an array of `ClassDesc` describing the parameter types

## MethodTypeDesc.changeReturnType(ClassDesc)

```java
MethodTypeDesc changeReturnType(ClassDesc returnType)
```

Returns a `MethodTypeDesc` that is identical to
this one, except with the specified return type.

Parameters:

- `returnType`: a `ClassDesc` describing the new return type

**Returns:** a `MethodTypeDesc` describing the desired method type

Throws:

- `NullPointerException`: if the argument is `null`

## MethodTypeDesc.changeParameterType(int, ClassDesc)

```java
MethodTypeDesc changeParameterType(int index, ClassDesc paramType)
```

Returns a `MethodTypeDesc` that is identical to this one,
except that a single parameter type has been changed to the specified type.

Parameters:

- `index`: the index of the parameter to change
- `paramType`: a `ClassDesc` describing the new parameter type

**Returns:** a `MethodTypeDesc` describing the desired method type

Throws:

- `NullPointerException`: if any argument is `null`
- `IndexOutOfBoundsException`: if the index is outside the half-open range `[0, parameterCount)`

## MethodTypeDesc.dropParameterTypes(int, int)

```java
MethodTypeDesc dropParameterTypes(int start, int end)
```

Returns a `MethodTypeDesc` that is identical to this one,
except that a range of parameter types have been removed.

Parameters:

- `start`: the index of the first parameter to remove
- `end`: the index after the last parameter to remove

**Returns:** a `MethodTypeDesc` describing the desired method type

Throws:

- `IndexOutOfBoundsException`: if `start` is outside the half-open range `[0, parameterCount)`, or `end` is outside the closed range `[0, parameterCount]`, or if `start > end`

## MethodTypeDesc.insertParameterTypes(int, ClassDesc...)

```java
MethodTypeDesc insertParameterTypes(int pos, ClassDesc... paramTypes)
```

Returns a `MethodTypeDesc` that is identical to this one,
except that a range of additional parameter types have been inserted.

Parameters:

- `pos`: the index at which to insert the first inserted parameter
- `paramTypes`: `ClassDesc`s describing the new parameter types to insert

**Returns:** a `MethodTypeDesc` describing the desired method type

Throws:

- `NullPointerException`: if any argument or its contents are `null`
- `IndexOutOfBoundsException`: if `pos` is outside the closed range `[0, parameterCount]`
- `IllegalArgumentException`: if any element of `paramTypes` is a `ClassDesc` for `void`

## MethodTypeDesc.descriptorString()

```java
String descriptorString()
```

Returns the method type descriptor string.

**Returns:** the method type descriptor string

**jvms:** 4.3.3 Method Descriptors

## MethodTypeDesc.displayDescriptor()

```java
default String displayDescriptor()
```

Returns a human-readable descriptor for this method type, using the
canonical names for parameter and return types.

**Returns:** the human-readable descriptor for this method type

## MethodTypeDesc.resolveConstantDesc(MethodHandles.Lookup)

```java
MethodType resolveConstantDesc(MethodHandles.Lookup lookup) throws ReflectiveOperationException
```

(inherited documentation)

**API note:** `MethodTypeDesc` can represent method type descriptors
that are not representable by `MethodType`, such as methods with
more than 255 parameter slots, so attempts to resolve these may result in errors.

**Since:** 21

## MethodTypeDesc.equals(Object)

```java
boolean equals(Object o)
```

Compares the specified object with this descriptor for equality.  Returns
`true` if and only if the specified object is also a
`MethodTypeDesc` both have the same arity, their return types
are equal, and each pair of corresponding parameter types are equal.

Parameters:

- `o`: the other object

**Returns:** whether this descriptor is equal to the other object
