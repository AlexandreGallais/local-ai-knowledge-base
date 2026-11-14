---
title: "CodeBuilder interface (java.lang.classfile) (part 1 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/CodeBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodeBuilder interface (java.lang.classfile)

```java
public sealed interface CodeBuilder extends ClassFileBuilder<CodeElement, CodeBuilder> permits CodeBuilder.BlockCodeBuilder, ChainedCodeBuilder, TerminalCodeBuilder, NonterminalCodeBuilder
```

A builder for Code attributes (method bodies).  `MethodBuilder.withCode` is the basic way to obtain a code builder; `ClassBuilder.withMethodBody` is a shortcut.  There are also derived code
builders from `block`, which handles code blocks and `transforming`, which runs transforms on existing handlers, both of which
requires a code builder to be available first.

Refer to `ClassFileBuilder` for general guidance and caution around
the use of builders for structures in the `class` file format.  Unlike
in other builders, the order of member elements in a code builder is
significant: they affect the resulting bytecode.  Many Class-File API options
affect code builders: `DeadCodeOption` and `ShortJumpsOption`
affect the resulting bytecode, and `DeadLabelsOption`, `DebugElementsOption`, `LineNumbersOption`, `StackMapsOption`, and
`AttributesProcessingOption` affect the resulting attributes on the
built `Code` attribute, that some elements sent to a code builder is
otherwise ignored.

#### Instruction Factories

`CodeBuilder` provides convenience methods to create instructions (See
JVMS  Instructions) by their mnemonic, taking necessary operands.

- Instructions that encode their operands in their opcode, such as `aload_<n>`, share their factories with their generic version like aload. Note that some constant instructions, such as iconst_1, do not have generic versions, and thus have their own factories.

- Instructions that accept wide operands, such as `ldc2_w` or `wide`, share their factories with their regular version like `ldc`.
Note that goto_w has its own factory to avoid short jumps.

- The `goto`, `instanceof`, `new`, and `return`
instructions' factories are named goto_, instanceOf, new_, and return_ respectively,
due to clashes with keywords in the Java programming language.

- Factories are not provided for instructions jsr,
jsr_w, ret, and wide ret, which cannot appear in class files with major version `ClassFile#JAVA_7_VERSION` or higher. (JVMS )  They can still be
provided via `with`.

**See also:** MethodBuilder#withCode

**See also:** CodeModel

**See also:** CodeTransform

**Since:** 24

## CodeBuilder.newLabel()

```java
Label newLabel()
```

The label can be bound with `labelBinding`.

## CodeBuilder.startLabel()

```java
Label startLabel()
```

If this builder is not a "block" builder, such as those provided by
`block(Consumer)` or Consumer),
the current block will be the entire method body.

## CodeBuilder.endLabel()

```java
Label endLabel()
```

If this builder is not a "block" builder, such as those provided by
`block(Consumer)` or Consumer),
the current block will be the entire method body.

## CodeBuilder.receiverSlot()

```java
int receiverSlot()
```

Throws:

- `IllegalStateException`: if this is a static method

## CodeBuilder.parameterSlot(int)

```java
int parameterSlot(int paramNo)
```

The returned value is adjusted for the receiver slot (if the method is
an instance method) and for the requirement that long and double
values require two slots.

Parameters:

- `paramNo`: the index of the parameter

Throws:

- `IndexOutOfBoundsException`: if the parameter index is out of bounds

## CodeBuilder.allocateLocal(TypeKind)

```java
int allocateLocal(TypeKind typeKind)
```

This method
makes reasonable efforts to determine which slots are in use and which
are not.  When transforming a method, fresh locals begin at the `maxLocals` of the original method.  For a method being built directly,
fresh locals begin after the last parameter slot.

If the current code builder is a `BlockCodeBuilder`, at the end of
the block, locals are reset to their value at the beginning of the block.

Parameters:

- `typeKind`: the type of the local variable

## CodeBuilder.transforming(CodeTransform, Consumer<CodeBuilder>)

```java
default CodeBuilder transforming(CodeTransform transform, Consumer<CodeBuilder> handler)
```

Apply a transform to the code built by a handler, directing results to
this builder.

Parameters:

- `transform`: the transform to apply to the code built by the handler
- `handler`: the handler that receives a `CodeBuilder` to build the code

**API note:** This is similar to `transform`, but this does not require the
code elements to be viewed as a `CodeModel` first.

**Returns:** this builder

## CodeBuilder.breakLabel()

```java
Label breakLabel()
```

A branch to this label "break"'s out of the current
block.

If the last instruction in this block does not lead to the break
label, Class-File API may append instructions to target the "break"
label to the built block.

## CodeBuilder.block(Consumer<BlockCodeBuilder>)

```java
default CodeBuilder block(Consumer<BlockCodeBuilder> handler)
```

Adds a lexical block to the method being built.

Within this block, the `startLabel()` and `endLabel()`
correspond to the start and end of the block, and the `BlockCodeBuilder.breakLabel()` also corresponds to the end of the block,
or the cursor position immediately after this call in this builder.

Parameters:

- `handler`: handler that receives a `BlockCodeBuilder` to generate the body of the lexical block

**Returns:** this builder

## CodeBuilder.ifThen(Consumer<BlockCodeBuilder>)

```java
default CodeBuilder ifThen(Consumer<BlockCodeBuilder> thenHandler)
```

Adds an "if-then" block that is conditional on the boolean value on top of the operand stack.  Control flow enters the
"then" block if the value represents `true`.

The `BlockCodeBuilder.breakLabel()` for the "then" block corresponds
to the cursor position immediately after this call in this builder.

Parameters:

- `thenHandler`: handler that receives a `BlockCodeBuilder` to generate the body of the `if`

**Returns:** this builder

**See also:** #ifThen(Opcode, Consumer)

## CodeBuilder.ifThen(Opcode, Consumer<BlockCodeBuilder>)

```java
default CodeBuilder ifThen(Opcode opcode, Consumer<BlockCodeBuilder> thenHandler)
```

Adds an "if-then" block that is conditional on the value(s) on top of the
operand stack in accordance with the given opcode.  Control flow enters
the "then" block if the branching condition for `opcode` succeeds.

The `BlockCodeBuilder.breakLabel()` for the "then" block corresponds
to the cursor position immediately after this call in this builder.

Parameters:

- `opcode`: the operation code for a branch instruction that accepts one or two operands on the stack
- `thenHandler`: handler that receives a `BlockCodeBuilder` to generate the body of the `if`

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if the operation code is not for a branch instruction that accepts one or two operands

## CodeBuilder.ifThenElse(Consumer<BlockCodeBuilder>, Consumer<BlockCodeBuilder>)

```java
default CodeBuilder ifThenElse(Consumer<BlockCodeBuilder> thenHandler, Consumer<BlockCodeBuilder> elseHandler)
```

Adds an "if-then-else" block that is conditional on the boolean value on top of the operand stack.  Control
flow enters the "then" block if the value represents `true`, and
enters the "else" block otherwise.

The `BlockCodeBuilder.breakLabel()` for each block corresponds to
the cursor position immediately after this call in this builder.

Parameters:

- `thenHandler`: handler that receives a `BlockCodeBuilder` to generate the body of the `if`
- `elseHandler`: handler that receives a `BlockCodeBuilder` to generate the body of the `else`

**Returns:** this builder

**See also:** #ifThenElse(Opcode, Consumer, Consumer)

## CodeBuilder.ifThenElse(Opcode, Consumer<BlockCodeBuilder>, Consumer<BlockCodeBuilder>)

```java
default CodeBuilder ifThenElse(Opcode opcode, Consumer<BlockCodeBuilder> thenHandler, Consumer<BlockCodeBuilder> elseHandler)
```

Adds an "if-then-else" block that is conditional on the value(s) on top
of the operand stack in accordance with the given opcode.  Control flow
enters the "then" block if the branching condition for `opcode`
succeeds, and enters the "else" block otherwise.

The `BlockCodeBuilder.breakLabel()` for each block corresponds to
the cursor position immediately after this call in this builder.

Parameters:

- `opcode`: the operation code for a branch instruction that accepts one or two operands on the stack
- `thenHandler`: handler that receives a `BlockCodeBuilder` to generate the body of the `if`
- `elseHandler`: handler that receives a `BlockCodeBuilder` to generate the body of the `else`

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if the operation code is not for a branch instruction that accepts one or two operands

## CodeBuilder.catching(ClassDesc, Consumer<BlockCodeBuilder>)

```java
CatchBuilder catching(ClassDesc exceptionType, Consumer<BlockCodeBuilder> catchHandler)
```

Adds a catch block that catches an exception of the given type.

The caught exception will be on top of the operand stack when the
catch block is entered.

The `BlockCodeBuilder.breakLabel()` for the catch block corresponds
to the break label of the `tryHandler` block in `trying`.

If the type of exception is `null` then the catch block catches
all exceptions.

Parameters:

- `exceptionType`: the type of exception to catch, may be `null`
- `catchHandler`: handler that receives a `BlockCodeBuilder` to generate the body of the catch block

**Returns:** this builder

**See also:** #catchingMulti

**See also:** #catchingAll

Throws:

- `IllegalArgumentException`: if an existing catch block catches an exception of the given type or `exceptionType` represents a primitive type

## CodeBuilder.catchingMulti(List<ClassDesc>, Consumer<BlockCodeBuilder>)

```java
CatchBuilder catchingMulti(List<ClassDesc> exceptionTypes, Consumer<BlockCodeBuilder> catchHandler)
```

Adds a catch block that catches exceptions of the given types.

The caught exception will be on top of the operand stack when the
catch block is entered.

The `BlockCodeBuilder.breakLabel()` for the catch block corresponds
to the break label of the `tryHandler` block in `trying`.

If list of exception types is empty then the catch block catches all
exceptions.

Parameters:

- `exceptionTypes`: the types of exception to catch
- `catchHandler`: handler that receives a `BlockCodeBuilder` to generate the body of the catch block

**Returns:** this builder

**See also:** #catching

**See also:** #catchingAll

Throws:

- `IllegalArgumentException`: if an existing catch block catches one or more exceptions of the given types

## CodeBuilder.catchingAll(Consumer<BlockCodeBuilder>)

```java
void catchingAll(Consumer<BlockCodeBuilder> catchAllHandler)
```

Adds a "catch" block that catches all exceptions.

The `BlockCodeBuilder.breakLabel()` for the catch block corresponds
to the break label of the `tryHandler` block in `trying`.

The caught exception will be on top of the operand stack when the
catch block is entered.

Parameters:

- `catchAllHandler`: handler that receives a `BlockCodeBuilder` to generate the body of the catch block

**See also:** #catching

**See also:** #catchingMulti

Throws:

- `IllegalArgumentException`: if an existing catch block catches all exceptions

## CodeBuilder.trying(Consumer<BlockCodeBuilder>, Consumer<CatchBuilder>)

```java
default CodeBuilder trying(Consumer<BlockCodeBuilder> tryHandler, Consumer<CatchBuilder> catchesHandler)
```

Adds a "try-catch" block comprising one try block and zero or more catch
blocks.  Exceptions thrown by instructions in the try block may be caught
by catch blocks.

The `BlockCodeBuilder.breakLabel()` for the try block and all
catch blocks in the `catchesHandler` correspond to the cursor
position immediately after this call in this builder.

Parameters:

- `tryHandler`: handler that receives a `BlockCodeBuilder` to generate the body of the try block.
- `catchesHandler`: a handler that receives a `CatchBuilder` to generate bodies of catch blocks

**Returns:** this builder

**See also:** CatchBuilder

**See also:** ExceptionCatch

**See also:** #exceptionCatch

Throws:

- `IllegalArgumentException`: if the try block is empty

## CodeBuilder.loadLocal(TypeKind, int)

```java
default CodeBuilder loadLocal(TypeKind tk, int slot)
```

Generates an instruction to load a value from a local variable.

Parameters:

- `tk`: the load type
- `slot`: the local variable slot

**Returns:** this builder

**See also:** LoadInstruction

Throws:

- `IllegalArgumentException`: if `tk` is void or `slot` is out of range

## CodeBuilder.storeLocal(TypeKind, int)

```java
default CodeBuilder storeLocal(TypeKind tk, int slot)
```

Generates an instruction to store a value to a local variable.

Parameters:

- `tk`: the store type
- `slot`: the local variable slot

**Returns:** this builder

**See also:** StoreInstruction

Throws:

- `IllegalArgumentException`: if `tk` is void or `slot` is out of range

## CodeBuilder.branch(Opcode, Label)

```java
default CodeBuilder branch(Opcode op, Label target)
```

Generates a branch instruction.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set, the
opcode has size 3, and `target`
cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `op`: the branch opcode
- `target`: the branch target

**Returns:** this builder

**See also:** BranchInstruction

Throws:

- `IllegalArgumentException`: if `op` is not of `Opcode.Kind.BRANCH`

## CodeBuilder.return_(TypeKind)

```java
default CodeBuilder return_(TypeKind tk)
```

Generates a return instruction.

Parameters:

- `tk`: the return type

**Returns:** this builder

**See also:** ReturnInstruction

## CodeBuilder.fieldAccess(Opcode, FieldRefEntry)

```java
default CodeBuilder fieldAccess(Opcode opcode, FieldRefEntry ref)
```

Generates an instruction to access a field.

Parameters:

- `opcode`: the field access opcode
- `ref`: the field reference

**Returns:** this builder

**See also:** FieldInstruction

Throws:

- `IllegalArgumentException`: if `opcode` is not of `Opcode.Kind.FIELD_ACCESS`

## CodeBuilder.fieldAccess(Opcode, ClassDesc, String, ClassDesc)

```java
default CodeBuilder fieldAccess(Opcode opcode, ClassDesc owner, String name, ClassDesc type)
```

Generates an instruction to access a field.

Parameters:

- `opcode`: the field access opcode
- `owner`: the class
- `name`: the field name
- `type`: the field type

**Returns:** this builder

**See also:** FieldInstruction

Throws:

- `IllegalArgumentException`: if `opcode` is not of `Opcode.Kind.FIELD_ACCESS`, or `owner` is primitive
