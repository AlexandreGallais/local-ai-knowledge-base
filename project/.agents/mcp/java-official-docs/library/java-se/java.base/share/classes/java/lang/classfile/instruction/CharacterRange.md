# CharacterRange interface (java.lang.classfile.instruction)

```java
public sealed interface CharacterRange extends PseudoInstruction permits AbstractPseudoInstruction.UnboundCharacterRange, BoundCharacterRange
```

A pseudo-instruction which models a single entry in the {@link
CharacterRangeTableAttribute CharacterRangeTable} attribute.  Delivered as a
{@link CodeElement} during traversal of the elements of a {@link CodeModel},
according to the setting of the {@link ClassFile.DebugElementsOption} option.
<p>
A character range entry is composite:
{@snippet lang=text :
// @link substring="CharacterRange" target="#of":
CharacterRange(
    Label startScope, // @link substring="startScope" target="#startScope"
    Label endScope, // @link substring="endScope" target="#endScope"
    int characterRangeStart, // @link substring="characterRangeStart" target="#characterRangeStart"
    int characterRangeEnd, // @link substring="characterRangeEnd" target="#characterRangeEnd"
    int flags // @link substring="flags" target="#flags"
)
}
<p>
Another model, {@link CharacterRangeInfo}, also models a character range
entry;  it has no dependency on a {@code CodeModel} and represents of bci
values as {@code int}s instead of {@code Label}s, and is used as components
of a {@link CharacterRangeTableAttribute}.

@see CharacterRangeInfo
@see CodeBuilder#characterRange CodeBuilder::characterRange
@see ClassFile.DebugElementsOption
@since 24

## CharacterRange.FLAG_STATEMENT

```java
int FLAG_STATEMENT
```

The bit mask of STATEMENT {@link CharacterRangeInfo} kind.

## CharacterRange.FLAG_BLOCK

```java
int FLAG_BLOCK
```

The bit mask of BLOCK {@link CharacterRangeInfo} kind.

## CharacterRange.FLAG_ASSIGNMENT

```java
int FLAG_ASSIGNMENT
```

The bit mask of ASSIGNMENT {@link CharacterRangeInfo} kind.

## CharacterRange.FLAG_FLOW_CONTROLLER

```java
int FLAG_FLOW_CONTROLLER
```

The bit mask of FLOW_CONTROLLER {@link CharacterRangeInfo} kind.

## CharacterRange.FLAG_FLOW_TARGET

```java
int FLAG_FLOW_TARGET
```

The bit mask of FLOW_TARGET {@link CharacterRangeInfo} kind.

## CharacterRange.FLAG_INVOKE

```java
int FLAG_INVOKE
```

The bit mask of INVOKE {@link CharacterRangeInfo} kind.

## CharacterRange.FLAG_CREATE

```java
int FLAG_CREATE
```

The bit mask of CREATE {@link CharacterRangeInfo} kind.

## CharacterRange.FLAG_BRANCH_TRUE

```java
int FLAG_BRANCH_TRUE
```

The bit mask of BRANCH_TRUE {@link CharacterRangeInfo} kind.

## CharacterRange.FLAG_BRANCH_FALSE

```java
int FLAG_BRANCH_FALSE
```

The bit mask of BRANCH_FALSE {@link CharacterRangeInfo} kind.

## CharacterRange.startScope()

```java
Label startScope()
```

{@return the start of the instruction range}

## CharacterRange.endScope()

```java
Label endScope()
```

{@return the end of the instruction range}

## CharacterRange.characterRangeStart()

```java
int characterRangeStart()
```

{@return the encoded start of the character range region (inclusive)}
The value is constructed from the line_number/column_number pair as given
by {@code line_number << 10 + column_number}, where the source file is
viewed as an array of (possibly multi-byte) characters.

## CharacterRange.characterRangeEnd()

```java
int characterRangeEnd()
```

{@return the encoded end of the character range region (exclusive)}.
The value is constructed from the line_number/column_number pair as given
by {@code line_number << 10 + column_number}, where the source file is
viewed as an array of (possibly multi-byte) characters.

## CharacterRange.flags()

```java
int flags()
```

A flags word, indicating the kind of range.  Multiple flag bits
may be set.  Valid flags include:
<ul>
<li>{@link #FLAG_STATEMENT}
<li>{@link #FLAG_BLOCK}
<li>{@link #FLAG_ASSIGNMENT}
<li>{@link #FLAG_FLOW_CONTROLLER}
<li>{@link #FLAG_FLOW_TARGET}
<li>{@link #FLAG_INVOKE}
<li>{@link #FLAG_CREATE}
<li>{@link #FLAG_BRANCH_TRUE}
<li>{@link #FLAG_BRANCH_FALSE}
</ul>

@see CharacterRangeInfo#flags()

@return the flags

## CharacterRange.of(Label, Label, int, int, int)

```java
static CharacterRange of(Label startScope, Label endScope, int characterRangeStart, int characterRangeEnd, int flags)
```

{@return a character range pseudo-instruction}

@param startScope the start of the instruction range
@param endScope the end of the instruction range
@param characterRangeStart the encoded start of the character range region (inclusive)
@param characterRangeEnd the encoded end of the character range region (exclusive)
@param flags a flags word, indicating the kind of range