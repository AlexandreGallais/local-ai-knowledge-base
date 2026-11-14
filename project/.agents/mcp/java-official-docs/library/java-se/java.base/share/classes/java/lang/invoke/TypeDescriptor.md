---
title: "TypeDescriptor interface (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/TypeDescriptor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TypeDescriptor interface (java.lang.invoke)

```java
public interface TypeDescriptor
```

An entity that has a type descriptor.

**Since:** 12

## TypeDescriptor.descriptorString()

```java
String descriptorString()
```

Returns the descriptor string for this `TypeDescriptor` object.

If this `TypeDescriptor` object can be described in nominal form,
then this method returns a type descriptor as specified in JVMS .
The result descriptor string can be used to produce
a nominal descriptor.

Otherwise, the result string is not a type descriptor.
No nominal descriptor
can be produced from the result string.

**Returns:** the descriptor string for this `TypeDescriptor` object

**jvms:** 4.3.2 Field Descriptors

**jvms:** 4.3.3 Method Descriptors

## TypeDescriptor.isArray()

```java
boolean isArray()
```

Does this field descriptor describe an array type?

**Returns:** whether this field descriptor describes an array type

## TypeDescriptor.isPrimitive()

```java
boolean isPrimitive()
```

Does this field descriptor describe a primitive type (including void.)

**Returns:** whether this field descriptor describes a primitive type

## TypeDescriptor.componentType()

```java
F componentType()
```

If this field descriptor describes an array type, return
a descriptor for its component type, otherwise return `null`.

**Returns:** the component type, or `null` if this field descriptor does
not describe an array type

## TypeDescriptor.arrayType()

```java
F arrayType()
```

Return a descriptor for the array type whose component type is described by this
descriptor

**Returns:** the descriptor for the array type

## TypeDescriptor.parameterCount()

```java
int parameterCount()
```

Return the number of parameters in the method type

**Returns:** the number of parameters

## TypeDescriptor.parameterType(int)

```java
F parameterType(int i)
```

Return a field descriptor describing the requested parameter of the method type
described by this descriptor

Parameters:

- `i`: the index of the parameter

**Returns:** a field descriptor for the requested parameter type

Throws:

- `IndexOutOfBoundsException`: if the index is outside the half-open range {[0, parameterCount)}

## TypeDescriptor.returnType()

```java
F returnType()
```

Return a field descriptor describing the return type of the method type described
by this descriptor

**Returns:** a field descriptor for the return type

## TypeDescriptor.parameterArray()

```java
F[] parameterArray()
```

Return an array of field descriptors for the parameter types of the method type
described by this descriptor

**Returns:** field descriptors for the parameter types

## TypeDescriptor.parameterList()

```java
List<F> parameterList()
```

Return an immutable list of field descriptors for the parameter types of the method type
described by this descriptor

**Returns:** field descriptors for the parameter types

## TypeDescriptor.changeReturnType(F)

```java
M changeReturnType(F newReturn)
```

Return a method descriptor that is identical to this one, except that the return
type has been changed to the specified type

Parameters:

- `newReturn`: a field descriptor for the new return type

**Returns:** the new method descriptor

Throws:

- `NullPointerException`: if any argument is `null`

## TypeDescriptor.changeParameterType(int, F)

```java
M changeParameterType(int index, F paramType)
```

Return a method descriptor that is identical to this one,
except that a single parameter type has been changed to the specified type.

Parameters:

- `index`: the index of the parameter to change
- `paramType`: a field descriptor describing the new parameter type

**Returns:** the new method descriptor

Throws:

- `NullPointerException`: if any argument is `null`
- `IndexOutOfBoundsException`: if the index is outside the half-open range {[0, parameterCount)}

## TypeDescriptor.dropParameterTypes(int, int)

```java
M dropParameterTypes(int start, int end)
```

Return a method descriptor that is identical to this one,
except that a range of parameter types have been removed.

Parameters:

- `start`: the index of the first parameter to remove
- `end`: the index after the last parameter to remove

**Returns:** the new method descriptor

Throws:

- `IndexOutOfBoundsException`: if `start` is outside the half-open range `[0, parameterCount)`, or `end` is outside the closed range `[0, parameterCount]`, or if `start > end`

## TypeDescriptor.insertParameterTypes(int, F...)

```java
M insertParameterTypes(int pos, F... paramTypes)
```

Return a method descriptor that is identical to this one,
except that a range of additional parameter types have been inserted.

Parameters:

- `pos`: the index at which to insert the first inserted parameter
- `paramTypes`: field descriptors describing the new parameter types to insert

**Returns:** the new method descriptor

Throws:

- `NullPointerException`: if any argument is `null`
- `IndexOutOfBoundsException`: if `pos` is outside the closed range {[0, parameterCount]}
