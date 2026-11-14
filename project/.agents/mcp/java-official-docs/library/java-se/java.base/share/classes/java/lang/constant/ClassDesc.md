---
title: "ClassDesc interface (java.lang.constant)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/constant/ClassDesc.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassDesc interface (java.lang.constant)

```java
public sealed interface ClassDesc extends ConstantDesc, TypeDescriptor.OfField<ClassDesc> permits PrimitiveClassDescImpl, ClassOrInterfaceDescImpl, ArrayClassDescImpl
```

A nominal descriptor for a
`Class` constant.

For common system types, including all the primitive types, there are
predefined `ClassDesc` constants in `ConstantDescs`.
(The `java.lang.constant` APIs consider `void` to be a primitive type.)
To create a `ClassDesc` for a class or interface type, use `of` or
`ofDescriptor(String)`; to create a `ClassDesc` for an array
type, use `ofDescriptor(String)`, or first obtain a
`ClassDesc` for the component type and then call the `arrayType()`
or `arrayType(int)` methods.

**See also:** ConstantDescs

**Since:** 12

## ClassDesc.of(String)

```java
static ClassDesc of(String name)
```

Returns a `ClassDesc` for a class or interface type,
given the name of the class or interface, such as `"java.lang.String"`.
(To create a descriptor for an array type, either use `ofDescriptor(String)`
or `arrayType()`; to create a descriptor for a primitive type, use
`ofDescriptor(String)` or use the predefined constants in
`ConstantDescs`).

Parameters:

- `name`: the fully qualified (dot-separated) binary class name

**Returns:** a `ClassDesc` describing the desired class

**See also:** ClassDesc#ofDescriptor(String)

**See also:** ClassDesc#ofInternalName(String)

Throws:

- `NullPointerException`: if the argument is `null`
- `IllegalArgumentException`: if the name string is not in the correct format

## ClassDesc.ofInternalName(String)

```java
static ClassDesc ofInternalName(String name)
```

Returns a `ClassDesc` for a class or interface type,
given the name of the class or interface in internal form,
such as `"java/lang/String"`.

Parameters:

- `name`: the fully qualified class name, in internal (slash-separated) form

**API note:** To create a descriptor for an array type, either use `ofDescriptor(String)`
or `arrayType()`; to create a descriptor for a primitive type, use
`ofDescriptor(String)` or use the predefined constants in
`ConstantDescs`.

**Returns:** a `ClassDesc` describing the desired class

**jvms:** 4.2.1 Binary Class and Interface Names

**See also:** ClassDesc#of(String)

**See also:** ClassDesc#ofDescriptor(String)

**Since:** 20

Throws:

- `NullPointerException`: if the argument is `null`
- `IllegalArgumentException`: if the name string is not in the correct format

## ClassDesc.of(String, String)

```java
static ClassDesc of(String packageName, String className)
```

Returns a `ClassDesc` for a class or interface type,
given a package name and the unqualified (simple) name for the
class or interface.

Parameters:

- `packageName`: the package name (dot-separated); if the package name is the empty string, the class is considered to be in the unnamed package
- `className`: the unqualified (simple) class name

**Returns:** a `ClassDesc` describing the desired class

Throws:

- `NullPointerException`: if any argument is `null`
- `IllegalArgumentException`: if the package name or class name are not in the correct format

## ClassDesc.ofDescriptor(String)

```java
static ClassDesc ofDescriptor(String descriptor)
```

Returns a `ClassDesc` given a descriptor string for a class,
interface, array, or primitive type.

Parameters:

- `descriptor`: a field descriptor string

**API note:** A field type descriptor string for a non-array type is either
a one-letter code corresponding to a primitive type
(`"J", "I", "C", "S", "B", "D", "F", "Z", "V"`), or the letter `"L"`, followed
by the fully qualified binary name of a class, followed by `";"`.
A field type descriptor for an array type is the character `"["`
followed by the field descriptor for the component type.  Examples of
valid type descriptor strings include `"Ljava/lang/String;"`, `"I"`,
`"[I"`, `"V"`, `"[Ljava/lang/String;"`, etc.
See JVMS ("Field Descriptors") for more detail.

**Returns:** a `ClassDesc` describing the desired class

**jvms:** 4.3.2 Field Descriptors

**jvms:** 4.4.1 The CONSTANT_Class_info Structure

**See also:** ClassDesc#of(String)

**See also:** ClassDesc#ofInternalName(String)

Throws:

- `NullPointerException`: if the argument is `null`
- `IllegalArgumentException`: if the descriptor string is not in the correct format

## ClassDesc.arrayType()

```java
ClassDesc arrayType()
```

Returns a `ClassDesc` for an array type whose component type
is described by this `ClassDesc`.

**Returns:** a `ClassDesc` describing the array type

**jvms:** 4.4.1 The CONSTANT_Class_info Structure

Throws:

- `IllegalStateException`: if the resulting `ClassDesc` would have an array rank of greater than 255

## ClassDesc.arrayType(int)

```java
ClassDesc arrayType(int rank)
```

Returns a `ClassDesc` for an array type of the specified rank,
whose component type is described by this `ClassDesc`.

Parameters:

- `rank`: the rank of the array

**Returns:** a `ClassDesc` describing the array type

**jvms:** 4.4.1 The CONSTANT_Class_info Structure

Throws:

- `IllegalArgumentException`: if the rank is less than or equal to zero or if the rank of the resulting array type is greater than 255

## ClassDesc.nested(String)

```java
default ClassDesc nested(String nestedName)
```

Returns a `ClassDesc` for a nested class of the class or
interface type described by this `ClassDesc`.

Parameters:

- `nestedName`: the unqualified name of the nested class

**API note:** Example: If descriptor `d` describes the class `java.util.Map`, a
descriptor for the class `java.util.Map.Entry` could be obtained
by `d.nested("Entry")`.

**Returns:** a `ClassDesc` describing the nested class

Throws:

- `NullPointerException`: if the argument is `null`
- `IllegalStateException`: if this `ClassDesc` does not describe a class or interface type
- `IllegalArgumentException`: if the nested class name is invalid

## ClassDesc.nested(String, String...)

```java
default ClassDesc nested(String firstNestedName, String... moreNestedNames)
```

Returns a `ClassDesc` for a nested class of the class or
interface type described by this `ClassDesc`.

Parameters:

- `firstNestedName`: the unqualified name of the first level of nested class
- `moreNestedNames`: the unqualified name(s) of the remaining levels of nested class

**Returns:** a `ClassDesc` describing the nested class

Throws:

- `NullPointerException`: if any argument or its contents is `null`
- `IllegalStateException`: if this `ClassDesc` does not describe a class or interface type
- `IllegalArgumentException`: if the nested class name is invalid

## ClassDesc.isArray()

```java
default boolean isArray()
```

Returns whether this `ClassDesc` describes an array type.

**Returns:** whether this `ClassDesc` describes an array type

## ClassDesc.isPrimitive()

```java
default boolean isPrimitive()
```

Returns whether this `ClassDesc` describes a primitive type.

**Returns:** whether this `ClassDesc` describes a primitive type

## ClassDesc.isClassOrInterface()

```java
default boolean isClassOrInterface()
```

Returns whether this `ClassDesc` describes a class or interface type.

**Returns:** whether this `ClassDesc` describes a class or interface type

## ClassDesc.componentType()

```java
default ClassDesc componentType()
```

Returns the component type of this `ClassDesc`, if it describes
an array type, or `null` otherwise.

**Returns:** a `ClassDesc` describing the component type, or `null`
if this descriptor does not describe an array type

## ClassDesc.packageName()

```java
default String packageName()
```

Returns the package name of this `ClassDesc`, if it describes
a class or interface type.

**Returns:** the package name, or the empty string if the class is in the
default package, or this `ClassDesc` does not describe a class or interface type

## ClassDesc.displayName()

```java
String displayName()
```

For primitive types, this method returns the simple name (such as `int`).
For class or interface types, this method returns the unqualified class name.
For array types, this method returns the human-readable name of the component
type suffixed with the appropriate number of `[]` pairs.

## ClassDesc.descriptorString()

```java
String descriptorString()
```

Returns a field type descriptor string for this type

**Returns:** the descriptor string

**jvms:** 4.3.2 Field Descriptors

## ClassDesc.resolveConstantDesc(MethodHandles.Lookup)

```java
Class<?> resolveConstantDesc(MethodHandles.Lookup lookup) throws ReflectiveOperationException
```

**Since:** 21

## ClassDesc.equals(Object)

```java
boolean equals(Object o)
```

Compare the specified object with this descriptor for equality.  Returns
`true` if and only if the specified object is also a
`ClassDesc` and both describe the same type.

Parameters:

- `o`: the other object

**Returns:** whether this descriptor is equal to the other object
