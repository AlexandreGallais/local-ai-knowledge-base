---
title: "CompilationIDAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/CompilationIDAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CompilationIDAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface CompilationIDAttribute extends Attribute<CompilationIDAttribute>, ClassElement permits BoundAttribute.BoundCompilationIDAttribute, UnboundAttribute.UnboundCompilationIDAttribute
```

Models the CompilationID attribute, which
records the compilation time of the `class` file.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

This attribute is not predefined in the Java SE Platform.  This is a
JDK-specific nonstandard attribute produced by the reference implementation
of the system Java compiler, defined by the `jdk.compiler` module.

**See also:** Attributes#compilationId()

**See also:** CharacterRangeTableAttribute

**See also:** SourceIDAttribute

**Since:** 24

## CompilationIDAttribute.compilationId()

```java
Utf8Entry compilationId()
```

The compilation ID is the string value of
`System.currentTimeMillis()` when the `class` file is generated.

## CompilationIDAttribute.of(Utf8Entry)

```java
static CompilationIDAttribute of(Utf8Entry id)
```

Parameters:

- `id`: the compilation ID

## CompilationIDAttribute.of(String)

```java
static CompilationIDAttribute of(String id)
```

Parameters:

- `id`: the compilation ID
