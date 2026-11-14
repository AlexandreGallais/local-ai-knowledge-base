---
title: "Utf8Entry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/Utf8Entry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Utf8Entry interface (java.lang.classfile.constantpool)

```java
public sealed interface Utf8Entry extends CharSequence, AnnotationConstantValueEntry permits AbstractPoolEntry.Utf8EntryImpl
```

Models a `CONSTANT_UTF8_info` constant, representing strings, in the
constant pool of a `class` file.  This describes strings in the
Modified UTF-8 format.

The use of a `Utf8Entry` is represented by a `String`.
Conversions are through `ConstantPoolBuilder.utf8Entry(String)` and
`stringValue()`.

Some uses of `Utf8Entry` represent field or method descriptor strings, symbolically
represented as `ClassDesc` or `MethodTypeDesc`, depending on
where a `Utf8Entry` appear.  Entries representing such uses are created
with `ConstantPoolBuilder.utf8Entry(ClassDesc)` and `ConstantPoolBuilder.utf8Entry(MethodTypeDesc)`, and they can be converted to
symbolic descriptors on a per-use-site basis, such as in `AnnotationValue.OfClass.classSymbol()` and `MethodModel.methodTypeSymbol()`.

Unlike most constant pool entries, a UTF-8 entry is of flexible length: it is
represented as an array structure, with an `u2` for the data length in
bytes, followed by that number of bytes of Modified UTF-8 data.  It can
represent at most 65535 bytes of data due to the physical restrictions.

**jvms:** 4.4.7 The `CONSTANT_Utf8_info` Structure

**See also:** DataInput##modified-utf-8 Modified UTF-8

**Since:** 24

## Utf8Entry.stringValue()

```java
String stringValue()
```

**API note:** A `Utf8Entry` can be used directly as a `CharSequence` if
`String` functionalities are not strictly desired.  If only string
equivalence is desired, equalsString should
be used.  Reduction of string processing can significantly improve `class` file reading performance.

**See also:** ConstantPoolBuilder#utf8Entry(String)

## Utf8Entry.equalsString(String)

```java
boolean equalsString(String s)
```

Parameters:

- `s`: the string to compare to

## Utf8Entry.isFieldType(ClassDesc)

```java
boolean isFieldType(ClassDesc desc)
```

Parameters:

- `desc`: the field type

**Since:** 25

## Utf8Entry.isMethodType(MethodTypeDesc)

```java
boolean isMethodType(MethodTypeDesc desc)
```

Parameters:

- `desc`: the method type

**Since:** 25
