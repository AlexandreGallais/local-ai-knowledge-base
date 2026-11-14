---
title: "ClassModel interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassModel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassModel interface (java.lang.classfile)

```java
public sealed interface ClassModel extends CompoundElement<ClassElement>, AttributedElement permits ClassImpl
```

Models a `class` file.  A `class` file can be viewed as a
composition of `ClassElement`s, or by
random access via accessor methods if only specific parts of the `class` file is needed.

Use `ClassFile.parse(byte[])`, which parses the binary data of a `class` file into a model, to obtain a `ClassModel`.

To construct a `class` file, use Consumer).  ClassTransform)
allows creating a new class by selectively processing the original class
elements and directing the results to a class builder.

A class holds attributes, most of which are accessible as member elements.
`BootstrapMethodsAttribute` can only be accessed via explicit attribute reading, as it is modeled as part of
the constant pool.

**See also:** ClassFile#parse(byte[])

**See also:** ClassTransform

**jvms:** 4.1 The `ClassFile` Structure

**Since:** 24

## ClassModel.constantPool()

```java
ConstantPool constantPool()
```

**See also:** ConstantPoolBuilder#of(ClassModel)

## ClassModel.flags()

```java
AccessFlags flags()
```

**See also:** AccessFlag.Location#CLASS

## ClassModel.thisClass()

```java
ClassEntry thisClass()
```

## ClassModel.majorVersion()

```java
int majorVersion()
```

It is in the range of unsigned
short, `[0, 65535]`.

**See also:** ClassFileVersion

## ClassModel.minorVersion()

```java
int minorVersion()
```

It is in the range of unsigned
short, `[0, 65535]`.

**See also:** ClassFileVersion

## ClassModel.fields()

```java
List<FieldModel> fields()
```

## ClassModel.methods()

```java
List<MethodModel> methods()
```

## ClassModel.superclass()

```java
Optional<ClassEntry> superclass()
```

This `class` file may have no superclass if this represents a
module descriptor or the `Object`
class; otherwise, it must have a superclass.  If this is an interface,
the superclass must be `Object`.

**See also:** Superclass

## ClassModel.interfaces()

```java
List<ClassEntry> interfaces()
```

**See also:** Interfaces

## ClassModel.isModuleInfo()

```java
boolean isModuleInfo()
```

**See also:** ClassFile#buildModule(ModuleAttribute, Consumer)
