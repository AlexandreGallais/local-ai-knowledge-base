---
title: "CharacterRange interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/CharacterRange.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CharacterRange interface (java.lang.classfile.instruction)

```java
public sealed interface CharacterRange extends PseudoInstruction permits AbstractPseudoInstruction.UnboundCharacterRange, BoundCharacterRange
```

A pseudo-instruction which models a single entry in the CharacterRangeTable attribute.  Delivered as a
`CodeElement` during traversal of the elements of a `CodeModel`,
according to the setting of the `ClassFile.DebugElementsOption` option.

A character range entry is composite:

Another model, `CharacterRangeInfo`, also models a character range
entry;  it has no dependency on a `CodeModel` and represents of bci
values as `int`s instead of `Label`s, and is used as components
of a `CharacterRangeTableAttribute`.

**See also:** CharacterRangeInfo

**See also:** CodeBuilder#characterRange CodeBuilder::characterRange

**See also:** ClassFile.DebugElementsOption

**Since:** 24

## CharacterRange.FLAG_STATEMENT

```java
int FLAG_STATEMENT
```

The bit mask of STATEMENT `CharacterRangeInfo` kind.

## CharacterRange.FLAG_BLOCK

```java
int FLAG_BLOCK
```

The bit mask of BLOCK `CharacterRangeInfo` kind.

## CharacterRange.FLAG_ASSIGNMENT

```java
int FLAG_ASSIGNMENT
```

The bit mask of ASSIGNMENT `CharacterRangeInfo` kind.

## CharacterRange.FLAG_FLOW_CONTROLLER

```java
int FLAG_FLOW_CONTROLLER
```

The bit mask of FLOW_CONTROLLER `CharacterRangeInfo` kind.

## CharacterRange.FLAG_FLOW_TARGET

```java
int FLAG_FLOW_TARGET
```

The bit mask of FLOW_TARGET `CharacterRangeInfo` kind.

## CharacterRange.FLAG_INVOKE

```java
int FLAG_INVOKE
```

The bit mask of INVOKE `CharacterRangeInfo` kind.

## CharacterRange.FLAG_CREATE

```java
int FLAG_CREATE
```

The bit mask of CREATE `CharacterRangeInfo` kind.

## CharacterRange.FLAG_BRANCH_TRUE

```java
int FLAG_BRANCH_TRUE
```

The bit mask of BRANCH_TRUE `CharacterRangeInfo` kind.

## CharacterRange.FLAG_BRANCH_FALSE

```java
int FLAG_BRANCH_FALSE
```

The bit mask of BRANCH_FALSE `CharacterRangeInfo` kind.

## CharacterRange.startScope()

```java
Label startScope()
```

## CharacterRange.endScope()

```java
Label endScope()
```

## CharacterRange.characterRangeStart()

```java
int characterRangeStart()
```

The value is constructed from the line_number/column_number pair as given
by `line_number << 10 + column_number`, where the source file is
viewed as an array of (possibly multi-byte) characters.

## CharacterRange.characterRangeEnd()

```java
int characterRangeEnd()
```

.
The value is constructed from the line_number/column_number pair as given
by `line_number << 10 + column_number`, where the source file is
viewed as an array of (possibly multi-byte) characters.

## CharacterRange.flags()

```java
int flags()
```

A flags word, indicating the kind of range.  Multiple flag bits
may be set.  Valid flags include:

- `FLAG_STATEMENT`

- `FLAG_BLOCK`

- `FLAG_ASSIGNMENT`

- `FLAG_FLOW_CONTROLLER`

- `FLAG_FLOW_TARGET`

- `FLAG_INVOKE`

- `FLAG_CREATE`

- `FLAG_BRANCH_TRUE`

- `FLAG_BRANCH_FALSE`

**See also:** CharacterRangeInfo#flags()

**Returns:** the flags

## CharacterRange.of(Label, Label, int, int, int)

```java
static CharacterRange of(Label startScope, Label endScope, int characterRangeStart, int characterRangeEnd, int flags)
```

Parameters:

- `startScope`: the start of the instruction range
- `endScope`: the end of the instruction range
- `characterRangeStart`: the encoded start of the character range region (inclusive)
- `characterRangeEnd`: the encoded end of the character range region (exclusive)
- `flags`: a flags word, indicating the kind of range
