---
title: "ClassFile interface (java.lang.classfile) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassFile.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassFile interface (java.lang.classfile) (part 2 of 2)

## ClassFile.transformClass(ClassModel, ClassEntry, ClassTransform)

```java
byte[] transformClass(ClassModel model, ClassEntry newClassName, ClassTransform transform)
```

Transform one `class` file into a new `class` file according
to a `ClassTransform`.  The transform will receive each element of
this class, as well as a `ClassBuilder` for building the new class.
The transform is free to preserve, remove, or replace elements as it
sees fit.

This method behaves as if:

where `cpb` is determined by `ConstantPoolSharingOption`.

Parameters:

- `model`: the class model to transform
- `newClassName`: new class name
- `transform`: the transform

**API note:** This is named `transformClass` instead of `transform` for
consistency with `ClassBuilder.transformField`, `ClassBuilder.transformMethod`, and `MethodBuilder.transformCode`,
and to distinguish from `ClassFileBuilder.transform`, which is
more generic and powerful.

**Returns:** the bytes of the new class

**See also:** ConstantPoolSharingOption

Throws:

- `IllegalArgumentException`: if building encounters a failure

## ClassFile.verify(ClassModel)

```java
List<VerifyError> verify(ClassModel model)
```

Verify a `class` file.  All verification errors found will be returned.

Parameters:

- `model`: the class model to verify

**Returns:** a list of verification errors, or an empty list if no error is
found

## ClassFile.verify(byte[])

```java
List<VerifyError> verify(byte[] bytes)
```

Verify a `class` file.  All verification errors found will be returned.

Parameters:

- `bytes`: the `class` file bytes to verify

**Returns:** a list of verification errors, or an empty list if no error is
found

## ClassFile.verify(Path)

```java
default List<VerifyError> verify(Path path) throws IOException
```

Verify a `class` file.  All verification errors found will be returned.

Parameters:

- `path`: the `class` file path to verify

**Returns:** a list of verification errors, or an empty list if no error is
found

Throws:

- `IOException`: if an I/O error occurs

## ClassFile.MAGIC_NUMBER

```java
int MAGIC_NUMBER
```

The magic number identifying the `class` file format,  `"0x%04x" #MAGIC_NUMBER`.  It is a big-endian 4-byte value.

## ClassFile.ACC_PUBLIC

```java
int ACC_PUBLIC
```

The bit mask of `AccessFlag.PUBLIC` access and property modifier.

## ClassFile.ACC_PROTECTED

```java
int ACC_PROTECTED
```

The bit mask of `AccessFlag.PROTECTED` access and property modifier.

## ClassFile.ACC_PRIVATE

```java
int ACC_PRIVATE
```

The bit mask of `AccessFlag.PRIVATE` access and property modifier.

## ClassFile.ACC_INTERFACE

```java
int ACC_INTERFACE
```

The bit mask of `AccessFlag.INTERFACE` access and property modifier.

## ClassFile.ACC_ENUM

```java
int ACC_ENUM
```

The bit mask of `AccessFlag.ENUM` access and property modifier.

## ClassFile.ACC_ANNOTATION

```java
int ACC_ANNOTATION
```

The bit mask of `AccessFlag.ANNOTATION` access and property modifier.

## ClassFile.ACC_SUPER

```java
int ACC_SUPER
```

The bit mask of `AccessFlag.SUPER` access and property modifier.

## ClassFile.ACC_ABSTRACT

```java
int ACC_ABSTRACT
```

The bit mask of `AccessFlag.ABSTRACT` access and property modifier.

## ClassFile.ACC_VOLATILE

```java
int ACC_VOLATILE
```

The bit mask of `AccessFlag.VOLATILE` access and property modifier.

## ClassFile.ACC_TRANSIENT

```java
int ACC_TRANSIENT
```

The bit mask of `AccessFlag.TRANSIENT` access and property modifier.

## ClassFile.ACC_SYNTHETIC

```java
int ACC_SYNTHETIC
```

The bit mask of `AccessFlag.SYNTHETIC` access and property modifier.

## ClassFile.ACC_STATIC

```java
int ACC_STATIC
```

The bit mask of `AccessFlag.STATIC` access and property modifier.

## ClassFile.ACC_FINAL

```java
int ACC_FINAL
```

The bit mask of `AccessFlag.FINAL` access and property modifier.

## ClassFile.ACC_SYNCHRONIZED

```java
int ACC_SYNCHRONIZED
```

The bit mask of `AccessFlag.SYNCHRONIZED` access and property modifier.

## ClassFile.ACC_BRIDGE

```java
int ACC_BRIDGE
```

The bit mask of `AccessFlag.BRIDGE` access and property modifier.

## ClassFile.ACC_VARARGS

```java
int ACC_VARARGS
```

The bit mask of `AccessFlag.VARARGS` access and property modifier.

## ClassFile.ACC_NATIVE

```java
int ACC_NATIVE
```

The bit mask of `AccessFlag.NATIVE` access and property modifier.

## ClassFile.ACC_STRICT

```java
int ACC_STRICT
```

The bit mask of `AccessFlag.STRICT` access and property modifier.

## ClassFile.ACC_MODULE

```java
int ACC_MODULE
```

The bit mask of `AccessFlag.MODULE` access and property modifier.

## ClassFile.ACC_OPEN

```java
int ACC_OPEN
```

The bit mask of `AccessFlag.OPEN` access and property modifier.

## ClassFile.ACC_MANDATED

```java
int ACC_MANDATED
```

The bit mask of `AccessFlag.MANDATED` access and property modifier.

## ClassFile.ACC_TRANSITIVE

```java
int ACC_TRANSITIVE
```

The bit mask of `AccessFlag.TRANSITIVE` access and property modifier.

## ClassFile.ACC_STATIC_PHASE

```java
int ACC_STATIC_PHASE
```

The bit mask of `AccessFlag.STATIC_PHASE` access and property modifier.

## ClassFile.JAVA_1_VERSION

```java
int JAVA_1_VERSION
```

The class major version of the initial version of Java, ``.

**See also:** ClassFileFormatVersion#RELEASE_0

**See also:** ClassFileFormatVersion#RELEASE_1

## ClassFile.JAVA_2_VERSION

```java
int JAVA_2_VERSION
```

The class major version introduced by Java 2 SE 1.2, ``.

**See also:** ClassFileFormatVersion#RELEASE_2

## ClassFile.JAVA_3_VERSION

```java
int JAVA_3_VERSION
```

The class major version introduced by Java 2 SE 1.3, ``.

**See also:** ClassFileFormatVersion#RELEASE_3

## ClassFile.JAVA_4_VERSION

```java
int JAVA_4_VERSION
```

The class major version introduced by Java 2 SE 1.4, ``.

**See also:** ClassFileFormatVersion#RELEASE_4

## ClassFile.JAVA_5_VERSION

```java
int JAVA_5_VERSION
```

The class major version introduced by Java 2 SE 5.0, ``.

**See also:** ClassFileFormatVersion#RELEASE_5

## ClassFile.JAVA_6_VERSION

```java
int JAVA_6_VERSION
```

The class major version introduced by Java SE 6, ``.

**See also:** ClassFileFormatVersion#RELEASE_6

## ClassFile.JAVA_7_VERSION

```java
int JAVA_7_VERSION
```

The class major version introduced by Java SE 7, ``.

**See also:** ClassFileFormatVersion#RELEASE_7

## ClassFile.JAVA_8_VERSION

```java
int JAVA_8_VERSION
```

The class major version introduced by Java SE 8, ``.

**See also:** ClassFileFormatVersion#RELEASE_8

## ClassFile.JAVA_9_VERSION

```java
int JAVA_9_VERSION
```

The class major version introduced by Java SE 9, ``.

**See also:** ClassFileFormatVersion#RELEASE_9

## ClassFile.JAVA_10_VERSION

```java
int JAVA_10_VERSION
```

The class major version introduced by Java SE 10, ``.

**See also:** ClassFileFormatVersion#RELEASE_10

## ClassFile.JAVA_11_VERSION

```java
int JAVA_11_VERSION
```

The class major version introduced by Java SE 11, ``.

**See also:** ClassFileFormatVersion#RELEASE_11

## ClassFile.JAVA_12_VERSION

```java
int JAVA_12_VERSION
```

The class major version introduced by Java SE 12, ``.

**See also:** ClassFileFormatVersion#RELEASE_12

## ClassFile.JAVA_13_VERSION

```java
int JAVA_13_VERSION
```

The class major version introduced by Java SE 13, ``.

**See also:** ClassFileFormatVersion#RELEASE_13

## ClassFile.JAVA_14_VERSION

```java
int JAVA_14_VERSION
```

The class major version introduced by Java SE 14, ``.

**See also:** ClassFileFormatVersion#RELEASE_14

## ClassFile.JAVA_15_VERSION

```java
int JAVA_15_VERSION
```

The class major version introduced by Java SE 15, ``.

**See also:** ClassFileFormatVersion#RELEASE_15

## ClassFile.JAVA_16_VERSION

```java
int JAVA_16_VERSION
```

The class major version introduced by Java SE 16, ``.

**See also:** ClassFileFormatVersion#RELEASE_16

## ClassFile.JAVA_17_VERSION

```java
int JAVA_17_VERSION
```

The class major version introduced by Java SE 17, ``.

**See also:** ClassFileFormatVersion#RELEASE_17

## ClassFile.JAVA_18_VERSION

```java
int JAVA_18_VERSION
```

The class major version introduced by Java SE 18, ``.

**See also:** ClassFileFormatVersion#RELEASE_18

## ClassFile.JAVA_19_VERSION

```java
int JAVA_19_VERSION
```

The class major version introduced by Java SE 19, ``.

**See also:** ClassFileFormatVersion#RELEASE_19

## ClassFile.JAVA_20_VERSION

```java
int JAVA_20_VERSION
```

The class major version introduced by Java SE 20, ``.

**See also:** ClassFileFormatVersion#RELEASE_20

## ClassFile.JAVA_21_VERSION

```java
int JAVA_21_VERSION
```

The class major version introduced by Java SE 21, ``.

**See also:** ClassFileFormatVersion#RELEASE_21

## ClassFile.JAVA_22_VERSION

```java
int JAVA_22_VERSION
```

The class major version introduced by Java SE 22, ``.

**See also:** ClassFileFormatVersion#RELEASE_22

## ClassFile.JAVA_23_VERSION

```java
int JAVA_23_VERSION
```

The class major version introduced by Java SE 23, ``.

**See also:** ClassFileFormatVersion#RELEASE_23

## ClassFile.JAVA_24_VERSION

```java
int JAVA_24_VERSION
```

The class major version introduced by Java SE 24, ``.

**See also:** ClassFileFormatVersion#RELEASE_24

## ClassFile.JAVA_25_VERSION

```java
int JAVA_25_VERSION
```

The class major version introduced by Java SE 25, ``.

**See also:** ClassFileFormatVersion#RELEASE_25

**Since:** 25

## ClassFile.PREVIEW_MINOR_VERSION

```java
int PREVIEW_MINOR_VERSION
```

A minor version number `` indicating a class uses preview features
of a Java SE release since 12, for major versions `#JAVA_12_VERSION` and above.

## ClassFile.latestMajorVersion()

```java
static int latestMajorVersion()
```

## ClassFile.latestMinorVersion()

```java
static int latestMinorVersion()
```

**API note:** This does not report the `PREVIEW_MINOR_VERSION` when the current
runtime has preview feature enabled, as `class` files with a major
version other than `latestMajorVersion()` and the preview minor
version are not supported.
