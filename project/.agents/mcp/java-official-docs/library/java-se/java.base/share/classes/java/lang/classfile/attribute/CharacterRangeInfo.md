---
title: "CharacterRangeInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/CharacterRangeInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CharacterRangeInfo interface (java.lang.classfile.attribute)

```java
public sealed interface CharacterRangeInfo permits UnboundAttribute.UnboundCharacterRangeInfo
```

Models a single character range entry in the `CharacterRangeTableAttribute`.

Each character range entry associates a range of indices in the code array
with a range of character positions in the source file.  A character position
in the source file is represented by a line number and a column number, and
its value is encoded as `lineNumber << 10 + columnNumber`.  Note that
column numbers are not the same as byte indices in a column as multibyte
characters may be present in the source file.

Each character range entry includes a
flag which indicates what kind of range is described: statement, assignment,
method call, etc.

**See also:** CharacterRangeTableAttribute#characterRangeTable()

**See also:** CharacterRange

**Since:** 24

## CharacterRangeInfo.startPc()

```java
int startPc()
```

**See also:** CharacterRange#startScope()

## CharacterRangeInfo.endPc()

```java
int endPc()
```

**See also:** CharacterRange#endScope()

## CharacterRangeInfo.characterRangeStart()

```java
int characterRangeStart()
```

## CharacterRangeInfo.characterRangeEnd()

```java
int characterRangeEnd()
```

## CharacterRangeInfo.flags()

```java
int flags()
```

The value of the flags item describes the kind of range. Multiple flags
may be set within flags.

- `CharacterRange.FLAG_STATEMENT` Range is a Statement
(except ExpressionStatement), StatementExpression (JLS ), as
well as each `VariableDeclaratorId = VariableInitializer` of
LocalVariableDeclarationStatement (JLS ) or FieldDeclaration
(JLS ) in the grammar.

- `CharacterRange.FLAG_BLOCK` Range is a Block in the grammar.

- `CharacterRange.FLAG_ASSIGNMENT` Range is an assignment
expression - `Expression1 AssignmentOperator Expression1` in the
grammar as well as increment and decrement expressions (both prefix and
postfix).

- `CharacterRange.FLAG_FLOW_CONTROLLER` An expression
whose value will affect control flow. `Flowcon` in the following:

```java
if ( Flowcon ) Statement [else Statement]
for ( ForInitOpt ; [Flowcon] ; ForUpdateOpt ) Statement
while ( Flowcon ) Statement
do Statement while ( Flowcon ) ;
switch ( Flowcon ) { SwitchBlockStatementGroups }
Flowcon || Expression3
Flowcon && Expression3
Flowcon ? Expression : Expression1
```

- `CharacterRange.FLAG_FLOW_TARGET` Statement or
expression effected by a CRT_FLOW_CONTROLLER. `Flowtarg` in the following:

```java
if ( Flowcon ) Flowtarg [else Flowtarg]
for ( ForInitOpt ; [Flowcon] ; ForUpdateOpt ) Flowtarg
while ( Flowcon ) Flowtarg
do Flowtarg while ( Flowcon ) ;
Flowcon || Flowtarg
Flowcon && Flowtarg
Flowcon ? Flowtarg : Flowtarg
```

- `CharacterRange.FLAG_INVOKE` Method invocation. For
example: Identifier Arguments.

- `CharacterRange.FLAG_CREATE` New object creation. For
example: new Creator.

- `CharacterRange.FLAG_BRANCH_TRUE` A condition encoded
in the branch instruction immediately contained in the code range for
this item is not inverted towards the corresponding branch condition in
the source code. I.e. actual jump occurs if and only if the the source
code branch condition evaluates to true. Entries of this type are
produced only for conditions that are listed in the description of
CRT_FLOW_CONTROLLER flag. The source range for the entry contains flow
controlling expression. start_pc field for an entry of this type must
point to a branch instruction: if_acmp<cond>, if_icmp<cond>,
if<cond>, ifnonull, ifnull or goto. CRT_BRANCH_TRUE and
CRT_BRANCH_FALSE are special kinds of entries that can be used to
determine what branch of a condition was chosen during the runtime.

- `CharacterRange.FLAG_BRANCH_FALSE` A condition encoded
in the branch instruction immediately contained in the code range for
this item is inverted towards the corresponding branch condition in the
source code. I.e. actual jump occurs if and only if the the source code
branch condition evaluates to false. Entries of this type are produced
only for conditions that are listed in the description of
CRT_FLOW_CONTROLLER flag. The source range for the entry contains flow
controlling expression. start_pc field for an entry of this type must
point to a branch instruction: if_acmp<cond>, if_icmp<cond>,
if<cond>, ifnonull, ifnull or goto.

All bits of the flags item not assigned above are reserved for future use.
They should be set to zero in generated class files and should be ignored
by Java virtual machine implementations.

**See also:** CharacterRange#flags()

## CharacterRangeInfo.of(int, int, int, int, int)

```java
static CharacterRangeInfo of(int startPc, int endPc, int characterRangeStart, int characterRangeEnd, int flags)
```

Parameters:

- `startPc`: the start of indices in the code array, inclusive
- `endPc`: the end of indices in the code array, exclusive
- `characterRangeStart`: the encoded start of character positions in the source file, inclusive
- `characterRangeEnd`: the encoded end of character positions in the source file, exclusive
- `flags`: the flags of this entry

**API note:** The created entry cannot be written to a `CodeBuilder`.  Use
CodeBuilder::characterRange instead.
