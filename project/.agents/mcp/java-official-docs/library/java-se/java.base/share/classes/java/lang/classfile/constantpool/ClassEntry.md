---
title: "ClassEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/ClassEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface ClassEntry extends LoadableConstantEntry permits AbstractPoolEntry.ClassEntryImpl
```

Models a `CONSTANT_Class_info` structure, representing a reference
type, in the constant pool of a `class` file.

The use of a `ClassEntry` is modeled by a `ClassDesc` that is not
primitive.  Conversions are through ClassDesc) and `asSymbol()`.

A `ClassEntry` is composite:

where `name` represents:

- The internal form of a binary name (JVMS ), if and only if
this `ClassEntry` represents a class or interface, such as `java/lang/String` for the `String` class.

- A field descriptor string (JVMS ) representing an array type,
if and only if this `ClassEntry` represents an array type, such as
`[I` for the `int[]` type, or `[Ljava/lang/String;` for the
`String[]` type.

A field descriptor string for an array type can be distinguished by its
leading `'['` character.

**API note:** The internal form of a binary name, where all occurrences of `.` in the
name are replaced by `/`, is informally known as an .  This concept also applies to package names in
addition to class and interface names.

**See also:** ConstantPoolBuilder#classEntry ConstantPoolBuilder::classEntry

**See also:** ClassDesc

**jvms:** 4.4.1 The `CONSTANT_Class_info` Structure

**Since:** 24

## ClassEntry.constantValue()

```java
default ConstantDesc constantValue()
```

(inherited documentation)

This is equivalent to asSymbol().

## ClassEntry.name()

```java
Utf8Entry name()
```

If the
value of the UTF8 starts with a `[`, this represents an array type
and the value is a descriptor string; otherwise, this represents a class
or interface and the value is the internal form of a binary name.

**See also:** ConstantPoolBuilder#classEntry(Utf8Entry)
     ConstantPoolBuilder::classEntry(Utf8Entry)

## ClassEntry.asInternalName()

```java
String asInternalName()
```

This is a shortcut for name().stringValue().

## ClassEntry.asSymbol()

```java
ClassDesc asSymbol()
```

The
returned descriptor is never primitive.

**API note:** If only symbol equivalence is desired, matches should be used.  It requires reduced parsing and can
improve `class` file reading performance.

**See also:** ConstantPoolBuilder#classEntry(ClassDesc)
     ConstantPoolBuilder::classEntry(ClassDesc)

## ClassEntry.matches(ClassDesc)

```java
boolean matches(ClassDesc desc)
```

Returns
`false` if `desc` is primitive.

Parameters:

- `desc`: the reference type

**Since:** 25
