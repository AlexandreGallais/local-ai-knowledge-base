---
title: "CharacterRangeTableAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/CharacterRangeTableAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CharacterRangeTableAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface CharacterRangeTableAttribute extends Attribute<CharacterRangeTableAttribute> permits BoundAttribute.BoundCharacterRangeTableAttribute, UnboundAttribute.UnboundCharacterRangeTableAttribute
```

Models the CharacterRangeTable
attribute, which is a bidirectional mapping from ranges of positions in the
source file to ranges of indices into the `code` array.  Its entries
are delivered as `CharacterRange`s when traversing the elements of a
`CodeModel`, toggled by `ClassFile.DebugElementsOption`.

The `CharacterRangeTable` attribute consists of an array of character range entries.  The character range entries
form a forest data structure: any two range entries are either disjoint, or
if they overlap, then one entry must be enclosed within the other, both in
`code` array indices and source file character positions.  The
character range entries may appear in any order.

This attribute only appears on `Code` attributes, permits multiple
appearances but should only appear once in a `Code` attribute.  It has a data dependency on
labels.

This attribute cannot be sent to a `CodeBuilder`; its entries can be
constructed with `CharacterRange`, resulting in at most one
attribute instance in the built `Code` attribute.

This attribute is not predefined in the Java SE Platform.  This is a
JDK-specific nonstandard attribute produced by the reference implementation
of the system Java compiler, defined by the `jdk.compiler` module.

**See also:** Attributes#characterRangeTable()

**See also:** CompilationIDAttribute

**See also:** SourceIDAttribute

**Since:** 24

## CharacterRangeTableAttribute.characterRangeTable()

```java
List<CharacterRangeInfo> characterRangeTable()
```

## CharacterRangeTableAttribute.of(List<CharacterRangeInfo>)

```java
static CharacterRangeTableAttribute of(List<CharacterRangeInfo> ranges)
```

Parameters:

- `ranges`: the descriptions of the character ranges

**API note:** The created attribute cannot be written to a `CodeBuilder`.  Use
CodeBuilder::characterRange instead.
