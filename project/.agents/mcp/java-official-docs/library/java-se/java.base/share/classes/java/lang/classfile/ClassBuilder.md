---
title: "ClassBuilder interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassBuilder interface (java.lang.classfile)

```java
public sealed interface ClassBuilder extends ClassFileBuilder<ClassElement, ClassBuilder> permits ChainedClassBuilder, DirectClassBuilder
```

A builder for a `class` file.  `ClassFile` provides different
`build` methods that accept handlers to configure such a builder;
Consumer) suffices for basic usage, while
ConstantPoolBuilder, Consumer) allows
fine-grained control over the constant pool.

Refer to `ClassFileBuilder` for general guidance and caution around
the use of builders for structures in the `class` file format.

**See also:** ClassFile#build(ClassEntry, ConstantPoolBuilder, Consumer)

**See also:** ClassModel

**See also:** ClassTransform

**Since:** 24

## ClassBuilder.withVersion(int, int)

```java
default ClassBuilder withVersion(int major, int minor)
```

Sets the version of this class.

Parameters:

- `major`: the major version number
- `minor`: the minor version number

**Returns:** this builder

**See also:** ClassFileVersion

## ClassBuilder.withFlags(int)

```java
default ClassBuilder withFlags(int flags)
```

Sets the access flags of this class.

Parameters:

- `flags`: the access flags, as a bit mask

**Returns:** this builder

**See also:** AccessFlags

**See also:** AccessFlag.Location#CLASS

## ClassBuilder.withFlags(AccessFlag...)

```java
default ClassBuilder withFlags(AccessFlag... flags)
```

Sets the access flags of this class.

Parameters:

- `flags`: the access flags, as flag enums

**Returns:** this builder

**See also:** AccessFlags

**See also:** AccessFlag.Location#CLASS

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.CLASS` location

## ClassBuilder.withSuperclass(ClassEntry)

```java
default ClassBuilder withSuperclass(ClassEntry superclassEntry)
```

Sets the superclass of this class.

Parameters:

- `superclassEntry`: the superclass

**Returns:** this builder

**See also:** Superclass

## ClassBuilder.withSuperclass(ClassDesc)

```java
default ClassBuilder withSuperclass(ClassDesc desc)
```

Sets the superclass of this class.

Parameters:

- `desc`: the superclass

**Returns:** this builder

**See also:** Superclass

Throws:

- `IllegalArgumentException`: if `desc` represents a primitive type

## ClassBuilder.withInterfaces(List<ClassEntry>)

```java
default ClassBuilder withInterfaces(List<ClassEntry> interfaces)
```

Sets the interfaces of this class.

Parameters:

- `interfaces`: the interfaces

**Returns:** this builder

**See also:** Interfaces

## ClassBuilder.withInterfaces(ClassEntry...)

```java
default ClassBuilder withInterfaces(ClassEntry... interfaces)
```

Sets the interfaces of this class.

Parameters:

- `interfaces`: the interfaces

**Returns:** this builder

**See also:** Interfaces

## ClassBuilder.withInterfaceSymbols(List<ClassDesc>)

```java
default ClassBuilder withInterfaceSymbols(List<ClassDesc> interfaces)
```

Sets the interfaces of this class.

Parameters:

- `interfaces`: the interfaces

**Returns:** this builder

**See also:** Interfaces

Throws:

- `IllegalArgumentException`: if any element of `interfaces` is primitive

## ClassBuilder.withInterfaceSymbols(ClassDesc...)

```java
default ClassBuilder withInterfaceSymbols(ClassDesc... interfaces)
```

Sets the interfaces of this class.

Parameters:

- `interfaces`: the interfaces

**Returns:** this builder

**See also:** Interfaces

Throws:

- `IllegalArgumentException`: if any element of `interfaces` is primitive

## ClassBuilder.withField(Utf8Entry, Utf8Entry, Consumer<? super FieldBuilder>)

```java
ClassBuilder withField(Utf8Entry name, Utf8Entry descriptor, Consumer<? super FieldBuilder> handler)
```

Adds a field.

Parameters:

- `name`: the field name
- `descriptor`: the field descriptor string
- `handler`: handler to supply the contents of the field

**Returns:** this builder

**See also:** FieldModel

## ClassBuilder.withField(Utf8Entry, Utf8Entry, int)

```java
default ClassBuilder withField(Utf8Entry name, Utf8Entry descriptor, int flags)
```

Adds a field, with only access flags.

Parameters:

- `name`: the field name
- `descriptor`: the field descriptor string
- `flags`: the access flags for this field, as a bit mask

**Returns:** this builder

**See also:** FieldModel

**See also:** FieldBuilder#withFlags(int)

## ClassBuilder.withField(String, ClassDesc, Consumer<? super FieldBuilder>)

```java
default ClassBuilder withField(String name, ClassDesc descriptor, Consumer<? super FieldBuilder> handler)
```

Adds a field.

Parameters:

- `name`: the field name
- `descriptor`: the symbolic field descriptor
- `handler`: handler to supply the contents of the field

**Returns:** this builder

**See also:** FieldModel

## ClassBuilder.withField(String, ClassDesc, int)

```java
default ClassBuilder withField(String name, ClassDesc descriptor, int flags)
```

Adds a field, with only access flags.

Parameters:

- `name`: the field name
- `descriptor`: the symbolic field descriptor
- `flags`: the access flags for this field, as a bit mask

**Returns:** this builder

**See also:** FieldModel

**See also:** FieldBuilder#withFlags(int)

## ClassBuilder.transformField(FieldModel, FieldTransform)

```java
ClassBuilder transformField(FieldModel field, FieldTransform transform)
```

Adds a field by transforming a field from another class.

This method behaves as if:

Parameters:

- `field`: the field to be transformed
- `transform`: the transform to apply to the field

**Returns:** this builder

**See also:** FieldTransform

## ClassBuilder.withMethod(Utf8Entry, Utf8Entry, int, Consumer<? super MethodBuilder>)

```java
ClassBuilder withMethod(Utf8Entry name, Utf8Entry descriptor, int methodFlags, Consumer<? super MethodBuilder> handler)
```

Adds a method.  The bit for ACC_STATIC flag
cannot be modified by the `handler` later, and must be set through
`methodFlags`.

Parameters:

- `name`: the method name
- `descriptor`: the method descriptor
- `methodFlags`: the access flags as a bit mask, with the `ACC_STATIC` bit definitely set
- `handler`: handler to supply the contents of the method

**Returns:** this builder

**See also:** MethodModel

## ClassBuilder.withMethodBody(Utf8Entry, Utf8Entry, int, Consumer<? super CodeBuilder>)

```java
default ClassBuilder withMethodBody(Utf8Entry name, Utf8Entry descriptor, int methodFlags, Consumer<? super CodeBuilder> handler)
```

Adds a method, with only access flags and a `CodeModel`.  The bit
for ACC_STATIC flag cannot be modified by
the `handler` later, and must be set through `methodFlags`.

This method behaves as if:

Parameters:

- `name`: the method name
- `descriptor`: the method descriptor
- `methodFlags`: the access flags as a bit mask, with the `ACC_STATIC` bit definitely set
- `handler`: handler to supply the contents of the method body

**Returns:** this builder

**See also:** MethodModel

## ClassBuilder.withMethod(String, MethodTypeDesc, int, Consumer<? super MethodBuilder>)

```java
default ClassBuilder withMethod(String name, MethodTypeDesc descriptor, int methodFlags, Consumer<? super MethodBuilder> handler)
```

Adds a method.  The bit for ACC_STATIC flag
cannot be modified by the `handler`, and must be set through
`methodFlags`.

Parameters:

- `name`: the method name
- `descriptor`: the method descriptor
- `methodFlags`: the access flags as a bit mask, with the `ACC_STATIC` bit definitely set
- `handler`: handler to supply the contents of the method

**Returns:** this builder

**See also:** MethodModel

## ClassBuilder.withMethodBody(String, MethodTypeDesc, int, Consumer<? super CodeBuilder>)

```java
default ClassBuilder withMethodBody(String name, MethodTypeDesc descriptor, int methodFlags, Consumer<? super CodeBuilder> handler)
```

Adds a method, with only access flags and a `CodeModel`.  The bit
for ACC_STATIC flag cannot be modified by
the `handler`, and must be set through `methodFlags`.

This method behaves as if:

Parameters:

- `name`: the method name
- `descriptor`: the method descriptor
- `methodFlags`: the access flags as a bit mask, with the `ACC_STATIC` bit definitely set
- `handler`: handler to supply the contents of the method body

**Returns:** this builder

**See also:** MethodModel

## ClassBuilder.transformMethod(MethodModel, MethodTransform)

```java
ClassBuilder transformMethod(MethodModel method, MethodTransform transform)
```

Adds a method by transforming a method from another class.  The transform
cannot modify the ACC_STATIC flag of the
original method.

This method behaves as if:

Parameters:

- `method`: the method to be transformed
- `transform`: the transform to apply to the method

**Returns:** this builder

**See also:** MethodTransform
