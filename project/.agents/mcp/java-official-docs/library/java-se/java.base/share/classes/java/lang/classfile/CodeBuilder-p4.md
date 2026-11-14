---
title: "CodeBuilder interface (java.lang.classfile) (part 4 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/CodeBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodeBuilder interface (java.lang.classfile) (part 4 of 6)

## CodeBuilder.goto_(Label)

```java
default CodeBuilder goto_(Label target)
```

Generates an instruction to branch always.

This may also generate goto_w instructions if
`ShortJumpsOption.FIX_SHORT_JUMPS` is set.

Parameters:

- `target`: the branch target

**API note:** The instruction's name is `goto`, which coincides with a reserved
keyword of the Java programming language, thus this method is named with
an extra `_` suffix instead.

**Returns:** this builder

**See also:** Opcode#GOTO

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.goto_w(Label)

```java
default CodeBuilder goto_w(Label target)
```

Generates an instruction to branch always with wide index.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#GOTO_W

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.i2b()

```java
default CodeBuilder i2b()
```

Generates an instruction to truncate an int into the
range of byte and sign-extend it.

**Returns:** this builder

**See also:** Opcode#I2B

**See also:** ConvertInstruction

## CodeBuilder.i2c()

```java
default CodeBuilder i2c()
```

Generates an instruction to truncate an int into the
range of char and zero-extend it.

**Returns:** this builder

**See also:** Opcode#I2C

**See also:** ConvertInstruction

## CodeBuilder.i2d()

```java
default CodeBuilder i2d()
```

Generates an instruction to convert an int into a
double.

**Returns:** this builder

**See also:** Opcode#I2D

**See also:** ConvertInstruction

## CodeBuilder.i2f()

```java
default CodeBuilder i2f()
```

Generates an instruction to convert an int into a
float.

**Returns:** this builder

**See also:** Opcode#I2F

**See also:** ConvertInstruction

## CodeBuilder.i2l()

```java
default CodeBuilder i2l()
```

Generates an instruction to convert an int into a
long.

**Returns:** this builder

**See also:** Opcode#I2L

**See also:** ConvertInstruction

## CodeBuilder.i2s()

```java
default CodeBuilder i2s()
```

Generates an instruction to truncate an int into the
range of short and sign-extend it.

**Returns:** this builder

**See also:** Opcode#I2S

**See also:** ConvertInstruction

## CodeBuilder.iadd()

```java
default CodeBuilder iadd()
```

Generates an instruction to add two ints.

**Returns:** this builder

**See also:** Opcode#IADD

**See also:** OperatorInstruction

## CodeBuilder.iaload()

```java
default CodeBuilder iaload()
```

Generates an instruction to load from an int array.

**Returns:** this builder

**See also:** Opcode#IALOAD

**See also:** #arrayLoad(TypeKind)

**See also:** ArrayLoadInstruction

## CodeBuilder.iand()

```java
default CodeBuilder iand()
```

Generates an instruction to calculate bitwise AND of ints, also used for boolean AND.

**Returns:** this builder

**See also:** Opcode#IAND

**See also:** OperatorInstruction

## CodeBuilder.iastore()

```java
default CodeBuilder iastore()
```

Generates an instruction to store into an int array.

**Returns:** this builder

**See also:** Opcode#IASTORE

**See also:** #arrayStore(TypeKind)

**See also:** ArrayStoreInstruction

## CodeBuilder.iconst_0()

```java
default CodeBuilder iconst_0()
```

Generates an instruction pushing int constant 0 onto
the operand stack.

**Returns:** this builder

**See also:** Opcode#ICONST_0

**See also:** #loadConstant(int)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.iconst_1()

```java
default CodeBuilder iconst_1()
```

Generates an instruction pushing int constant 1 onto
the operand stack.

**Returns:** this builder

**See also:** Opcode#ICONST_1

**See also:** #loadConstant(int)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.iconst_2()

```java
default CodeBuilder iconst_2()
```

Generates an instruction pushing int constant 2 onto
the operand stack.

**Returns:** this builder

**See also:** Opcode#ICONST_2

**See also:** #loadConstant(int)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.iconst_3()

```java
default CodeBuilder iconst_3()
```

Generates an instruction pushing int constant 3 onto
the operand stack.

**Returns:** this builder

**See also:** Opcode#ICONST_3

**See also:** #loadConstant(int)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.iconst_4()

```java
default CodeBuilder iconst_4()
```

Generates an instruction pushing int constant 4 onto
the operand stack.

**Returns:** this builder

**See also:** Opcode#ICONST_4

**See also:** #loadConstant(int)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.iconst_5()

```java
default CodeBuilder iconst_5()
```

Generates an instruction pushing int constant 5 onto
the operand stack.

**Returns:** this builder

**See also:** Opcode#ICONST_5

**See also:** #loadConstant(int)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.iconst_m1()

```java
default CodeBuilder iconst_m1()
```

Generates an instruction pushing int constant -1
onto the operand stack.

**Returns:** this builder

**See also:** Opcode#ICONST_M1

**See also:** #loadConstant(int)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.idiv()

```java
default CodeBuilder idiv()
```

Generates an instruction to divide ints.

**Returns:** this builder

**See also:** Opcode#IDIV

**See also:** OperatorInstruction

## CodeBuilder.if_acmpeq(Label)

```java
default CodeBuilder if_acmpeq(Label target)
```

Generates an instruction to branch if reference
comparison `operand1 == operand2` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IF_ACMPEQ

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.if_acmpne(Label)

```java
default CodeBuilder if_acmpne(Label target)
```

Generates an instruction to branch if reference
comparison `operand1 != operand2` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IF_ACMPNE

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.if_icmpeq(Label)

```java
default CodeBuilder if_icmpeq(Label target)
```

Generates an instruction to branch if int comparison
`operand1 == operand2` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IF_ICMPEQ

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.if_icmpge(Label)

```java
default CodeBuilder if_icmpge(Label target)
```

Generates an instruction to branch if int comparison
`operand1 >= operand2` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IF_ICMPGE

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.if_icmpgt(Label)

```java
default CodeBuilder if_icmpgt(Label target)
```

Generates an instruction to branch if int comparison
`operand1 > operand2` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IF_ICMPGT

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.if_icmple(Label)

```java
default CodeBuilder if_icmple(Label target)
```

Generates an instruction to branch if int comparison
`operand1 <= operand2` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IF_ICMPLE

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.if_icmplt(Label)

```java
default CodeBuilder if_icmplt(Label target)
```

Generates an instruction to branch if int comparison
`operand1 < operand2` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IF_ICMPLT

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.if_icmpne(Label)

```java
default CodeBuilder if_icmpne(Label target)
```

Generates an instruction to branch if int comparison
`operand1 != operand2` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IF_ICMPNE

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.ifnonnull(Label)

```java
default CodeBuilder ifnonnull(Label target)
```

Generates an instruction to branch if reference
is not `null`.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IFNONNULL

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.ifnull(Label)

```java
default CodeBuilder ifnull(Label target)
```

Generates an instruction to branch if reference
is `null`.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IFNULL

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.ifeq(Label)

```java
default CodeBuilder ifeq(Label target)
```

Generates an instruction to branch if int comparison
with zero `== 0` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IFEQ

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.ifge(Label)

```java
default CodeBuilder ifge(Label target)
```

Generates an instruction to branch if int comparison
with zero `>= 0` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IFGE

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.ifgt(Label)

```java
default CodeBuilder ifgt(Label target)
```

Generates an instruction to branch if int comparison
with zero `> 0` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IFGT

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.ifle(Label)

```java
default CodeBuilder ifle(Label target)
```

Generates an instruction to branch if int comparison
with zero `<= 0` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IFLE

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.iflt(Label)

```java
default CodeBuilder iflt(Label target)
```

Generates an instruction to branch if int comparison
with zero `< 0` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IFLT

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.ifne(Label)

```java
default CodeBuilder ifne(Label target)
```

Generates an instruction to branch if int comparison
with zero `!= 0` succeeds.

This may generate multiple instructions to accomplish the same effect if
`ClassFile.ShortJumpsOption.FIX_SHORT_JUMPS` is set and `target` cannot be encoded as a BCI offset in `[-32768, 32767]`.

Parameters:

- `target`: the branch target

**Returns:** this builder

**See also:** Opcode#IFNE

**See also:** #branch(Opcode, Label)

**See also:** BranchInstruction

## CodeBuilder.iinc(int, int)

```java
default CodeBuilder iinc(int slot, int val)
```

Generates an instruction to increment an int local
variable by a constant.

This may also generate wide iinc instructions if
`slot` exceeds `255` or `val` exceeds the range of
byte.

Parameters:

- `slot`: the local variable slot
- `val`: the increment value

**Returns:** this builder

**See also:** Opcode#IINC

**See also:** IncrementInstruction

Throws:

- `IllegalArgumentException`: if `slot` or `val` is out of range

## CodeBuilder.iload(int)

```java
default CodeBuilder iload(int slot)
```

Generates an instruction to load an int from a local
variable.

This may also generate iload_<N> and wide iload instructions.

Parameters:

- `slot`: the local variable slot

**Returns:** this builder

**See also:** Opcode#ILOAD

**See also:** #loadLocal(TypeKind, int)

**See also:** LoadInstruction

Throws:

- `IllegalArgumentException`: if `slot` is out of range
