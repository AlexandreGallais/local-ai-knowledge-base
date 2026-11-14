---
title: "StringEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/StringEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StringEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface StringEntry extends ConstantValueEntry permits AbstractPoolEntry.StringEntryImpl
```

Models a `CONSTANT_String_info` structure, or a string constant, in the
constant pool of a `class` file.

The use of a `StringEntry` is represented by a `String`.
Conversions are through `ConstantPoolBuilder.stringEntry(String)` and
`stringValue()`.

A string entry is composite:

**jvms:** 4.4.3 The `CONSTANT_String_info` Structure

**Since:** 24

## StringEntry.utf8()

```java
Utf8Entry utf8()
```

**See also:** ConstantPoolBuilder#stringEntry(Utf8Entry)

## StringEntry.stringValue()

```java
String stringValue()
```

**API note:** A `Utf8Entry` can be used directly as a `CharSequence` if
`String` functionalities are not strictly desired.  If only string
equivalence is desired, equalsString should
be used.  Reduction of string processing can significantly improve `class` file reading performance.

**See also:** ConstantPoolBuilder#stringEntry(String)

## StringEntry.equalsString(String)

```java
boolean equalsString(String value)
```

Parameters:

- `value`: the string to compare to

**Since:** 25
