---
title: "CodeBuilder interface (java.lang.classfile) (part 3 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/CodeBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodeBuilder interface (java.lang.classfile) (part 3 of 6)

## CodeBuilder.bastore()

```java
default CodeBuilder bastore()
```

Generates an instruction to store into a byte or
boolean array.

**Returns:** this builder

**See also:** Opcode#BASTORE

**See also:** #arrayStore(TypeKind)

**See also:** ArrayStoreInstruction

## CodeBuilder.bipush(int)

```java
default CodeBuilder bipush(int b)
```

Generates an instruction pushing an int in the range
of byte (`[-128, 127]`) onto the operand
stack.

Parameters:

- `b`: the int in the range of byte

**Returns:** this builder

**See also:** Opcode#BIPUSH

**See also:** #loadConstant(int)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

Throws:

- `IllegalArgumentException`: if `b` is out of range of byte

## CodeBuilder.caload()

```java
default CodeBuilder caload()
```

Generates an instruction to load from a char array.

**Returns:** this builder

**See also:** Opcode#CALOAD

**See also:** #arrayLoad(TypeKind)

**See also:** ArrayLoadInstruction

## CodeBuilder.castore()

```java
default CodeBuilder castore()
```

Generates an instruction to store into a char array.

**Returns:** this builder

**See also:** Opcode#CASTORE

**See also:** #arrayStore(TypeKind)

**See also:** ArrayStoreInstruction

## CodeBuilder.checkcast(ClassEntry)

```java
default CodeBuilder checkcast(ClassEntry type)
```

Generates an instruction to check whether an object is of the given type,
throwing a `ClassCastException` if the check fails.

Parameters:

- `type`: the object type

**Returns:** this builder

**See also:** Opcode#CHECKCAST

**See also:** TypeCheckInstruction

## CodeBuilder.checkcast(ClassDesc)

```java
default CodeBuilder checkcast(ClassDesc type)
```

Generates an instruction to check whether an object is of the given type,
throwing a `ClassCastException` if the check fails.

Parameters:

- `type`: the object type

**Returns:** this builder

**See also:** Opcode#CHECKCAST

**See also:** TypeCheckInstruction

Throws:

- `IllegalArgumentException`: if `type` represents a primitive type

## CodeBuilder.d2f()

```java
default CodeBuilder d2f()
```

Generates an instruction to convert a double into
a float.

**Returns:** this builder

**See also:** Opcode#D2F

**See also:** ConvertInstruction

## CodeBuilder.d2i()

```java
default CodeBuilder d2i()
```

Generates an instruction to convert a double into
an int.

**Returns:** this builder

**See also:** Opcode#D2I

**See also:** ConvertInstruction

## CodeBuilder.d2l()

```java
default CodeBuilder d2l()
```

Generates an instruction to convert a double into
a long.

**Returns:** this builder

**See also:** Opcode#D2L

**See also:** ConvertInstruction

## CodeBuilder.dadd()

```java
default CodeBuilder dadd()
```

Generates an instruction to add two doubles.

**Returns:** this builder

**See also:** Opcode#DADD

**See also:** OperatorInstruction

## CodeBuilder.daload()

```java
default CodeBuilder daload()
```

Generates an instruction to load from a double
array.

**Returns:** this builder

**See also:** Opcode#DALOAD

**See also:** #arrayLoad(TypeKind)

**See also:** ArrayLoadInstruction

## CodeBuilder.dastore()

```java
default CodeBuilder dastore()
```

Generates an instruction to store into a double
array.

**Returns:** this builder

**See also:** Opcode#DASTORE

**See also:** #arrayStore(TypeKind)

**See also:** ArrayStoreInstruction

## CodeBuilder.dcmpg()

```java
default CodeBuilder dcmpg()
```

Generates an instruction to compare two doubles,
producing `1` if any operand is NaN.

**Returns:** this builder

**See also:** Opcode#DCMPG

**See also:** OperatorInstruction

## CodeBuilder.dcmpl()

```java
default CodeBuilder dcmpl()
```

Generates an instruction to compare two doubles,
producing `-1` if any operand is NaN.

**Returns:** this builder

**See also:** Opcode#DCMPL

**See also:** OperatorInstruction

## CodeBuilder.dconst_0()

```java
default CodeBuilder dconst_0()
```

Generates an instruction pushing double constant
0 onto the operand stack.

**Returns:** this builder

**See also:** Opcode#DCONST_0

**See also:** #loadConstant(double)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.dconst_1()

```java
default CodeBuilder dconst_1()
```

Generates an instruction pushing double constant
1 onto the operand stack.

**Returns:** this builder

**See also:** Opcode#DCONST_1

**See also:** #loadConstant(double)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.ddiv()

```java
default CodeBuilder ddiv()
```

Generates an instruction to divide doubles.

**Returns:** this builder

**See also:** Opcode#DDIV

**See also:** OperatorInstruction

## CodeBuilder.dload(int)

```java
default CodeBuilder dload(int slot)
```

Generates an instruction to load a double from a
local variable.

This may also generate dload_<N> and wide dload instructions.

Parameters:

- `slot`: the local variable slot

**Returns:** this builder

**See also:** Opcode#DLOAD

**See also:** #loadLocal(TypeKind, int)

**See also:** LoadInstruction

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.dmul()

```java
default CodeBuilder dmul()
```

Generates an instruction to multiply doubles.

**Returns:** this builder

**See also:** Opcode#DMUL

**See also:** OperatorInstruction

## CodeBuilder.dneg()

```java
default CodeBuilder dneg()
```

Generates an instruction to negate a double.

**Returns:** this builder

**See also:** Opcode#DNEG

**See also:** OperatorInstruction

## CodeBuilder.drem()

```java
default CodeBuilder drem()
```

Generates an instruction to calculate double
remainder.

**Returns:** this builder

**See also:** Opcode#DREM

**See also:** OperatorInstruction

## CodeBuilder.dreturn()

```java
default CodeBuilder dreturn()
```

Generates an instruction to return a double from
this method.

**Returns:** this builder

**See also:** Opcode#DRETURN

**See also:** #return_(TypeKind)

**See also:** ReturnInstruction

## CodeBuilder.dstore(int)

```java
default CodeBuilder dstore(int slot)
```

Generates an instruction to store a double into a
local variable.

This may also generate dstore_<N> and
wide dstore instructions.

Parameters:

- `slot`: the local variable slot

**Returns:** this builder

**See also:** Opcode#DSTORE

**See also:** #storeLocal(TypeKind, int)

**See also:** StoreInstruction

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.dsub()

```java
default CodeBuilder dsub()
```

Generates an instruction to subtract doubles.

**Returns:** this builder

**See also:** Opcode#DSUB

**See also:** OperatorInstruction

## CodeBuilder.dup()

```java
default CodeBuilder dup()
```

Generates an instruction to duplicate the top operand stack value.

**Returns:** this builder

**See also:** Opcode#DUP

**See also:** StackInstruction

## CodeBuilder.dup2()

```java
default CodeBuilder dup2()
```

Generates an instruction to duplicate the top one or two operand stack
value.

**Returns:** this builder

**See also:** Opcode#DUP2

**See also:** StackInstruction

## CodeBuilder.dup2_x1()

```java
default CodeBuilder dup2_x1()
```

Generates an instruction to duplicate the top one or two operand stack
values and insert two or three values down.

**Returns:** this builder

**See also:** Opcode#DUP2_X1

**See also:** StackInstruction

## CodeBuilder.dup2_x2()

```java
default CodeBuilder dup2_x2()
```

Generates an instruction to duplicate the top one or two operand stack
values and insert two, three, or four values down.

**Returns:** this builder

**See also:** Opcode#DUP2_X2

**See also:** StackInstruction

## CodeBuilder.dup_x1()

```java
default CodeBuilder dup_x1()
```

Generates an instruction to duplicate the top operand stack value and
insert two values down.

**Returns:** this builder

**See also:** Opcode#DUP_X1

**See also:** StackInstruction

## CodeBuilder.dup_x2()

```java
default CodeBuilder dup_x2()
```

Generates an instruction to duplicate the top operand stack value and
insert two or three values down.

**Returns:** this builder

**See also:** Opcode#DUP_X2

**See also:** StackInstruction

## CodeBuilder.f2d()

```java
default CodeBuilder f2d()
```

Generates an instruction to convert a float into a
double.

**Returns:** this builder

**See also:** Opcode#F2D

**See also:** ConvertInstruction

## CodeBuilder.f2i()

```java
default CodeBuilder f2i()
```

Generates an instruction to convert a float into
an int.

**Returns:** this builder

**See also:** Opcode#F2I

**See also:** ConvertInstruction

## CodeBuilder.f2l()

```java
default CodeBuilder f2l()
```

Generates an instruction to convert a float into a
long.

**Returns:** this builder

**See also:** Opcode#F2L

**See also:** ConvertInstruction

## CodeBuilder.fadd()

```java
default CodeBuilder fadd()
```

Generates an instruction to add two floats.

**Returns:** this builder

**See also:** Opcode#FADD

**See also:** OperatorInstruction

## CodeBuilder.faload()

```java
default CodeBuilder faload()
```

Generates an instruction to load from a float
array.

**Returns:** this builder

**See also:** Opcode#FALOAD

**See also:** #arrayLoad(TypeKind)

**See also:** ArrayLoadInstruction

## CodeBuilder.fastore()

```java
default CodeBuilder fastore()
```

Generates an instruction to store into a float
array.

**Returns:** this builder

**See also:** Opcode#FASTORE

**See also:** #arrayStore(TypeKind)

**See also:** ArrayStoreInstruction

## CodeBuilder.fcmpg()

```java
default CodeBuilder fcmpg()
```

Generates an instruction to compare floats,
producing `1` if any operand is NaN.

**Returns:** this builder

**See also:** Opcode#FCMPG

**See also:** OperatorInstruction

## CodeBuilder.fcmpl()

```java
default CodeBuilder fcmpl()
```

Generates an instruction to compare floats,
producing `-1` if any operand is NaN.

**Returns:** this builder

**See also:** Opcode#FCMPL

**See also:** OperatorInstruction

## CodeBuilder.fconst_0()

```java
default CodeBuilder fconst_0()
```

Generates an instruction pushing float constant 0
onto the operand stack.

**Returns:** this builder

**See also:** Opcode#FCONST_0

**See also:** #loadConstant(float)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.fconst_1()

```java
default CodeBuilder fconst_1()
```

Generates an instruction pushing float constant 1
onto the operand stack.

**Returns:** this builder

**See also:** Opcode#FCONST_1

**See also:** #loadConstant(float)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.fconst_2()

```java
default CodeBuilder fconst_2()
```

Generates an instruction pushing float constant 2
onto the operand stack.

**Returns:** this builder

**See also:** Opcode#FCONST_2

**See also:** #loadConstant(float)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.fdiv()

```java
default CodeBuilder fdiv()
```

Generates an instruction to divide floats.

**Returns:** this builder

**See also:** Opcode#FDIV

**See also:** OperatorInstruction

## CodeBuilder.fload(int)

```java
default CodeBuilder fload(int slot)
```

Generates an instruction to load a float from a
local variable.

This may also generate fload_<N> and wide fload instructions.

Parameters:

- `slot`: the local variable slot

**Returns:** this builder

**See also:** Opcode#FLOAD

**See also:** #loadLocal(TypeKind, int)

**See also:** LoadInstruction

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.fmul()

```java
default CodeBuilder fmul()
```

Generates an instruction to multiply floats.

**Returns:** this builder

**See also:** Opcode#FMUL

**See also:** OperatorInstruction

## CodeBuilder.fneg()

```java
default CodeBuilder fneg()
```

Generates an instruction to negate a float.

**Returns:** this builder

**See also:** Opcode#FNEG

**See also:** OperatorInstruction

## CodeBuilder.frem()

```java
default CodeBuilder frem()
```

Generates an instruction to calculate floats
remainder.

**Returns:** this builder

**See also:** Opcode#FREM

**See also:** OperatorInstruction

## CodeBuilder.freturn()

```java
default CodeBuilder freturn()
```

Generates an instruction to return a float from
this method.

**Returns:** this builder

**See also:** Opcode#FRETURN

**See also:** #return_(TypeKind)

**See also:** ReturnInstruction

## CodeBuilder.fstore(int)

```java
default CodeBuilder fstore(int slot)
```

Generates an instruction to store a float into a
local variable.

This may also generate fstore_<N> and
wide fstore instructions.

Parameters:

- `slot`: the local variable slot

**Returns:** this builder

**See also:** Opcode#FSTORE

**See also:** #storeLocal(TypeKind, int)

**See also:** StoreInstruction

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.fsub()

```java
default CodeBuilder fsub()
```

Generates an instruction to subtract floats.

**Returns:** this builder

**See also:** Opcode#FSUB

**See also:** OperatorInstruction

## CodeBuilder.getfield(FieldRefEntry)

```java
default CodeBuilder getfield(FieldRefEntry ref)
```

Generates an instruction to fetch field from an object.

Parameters:

- `ref`: the field reference

**Returns:** this builder

**See also:** Opcode#GETFIELD

**See also:** #fieldAccess(Opcode, FieldRefEntry)

**See also:** FieldInstruction

## CodeBuilder.getfield(ClassDesc, String, ClassDesc)

```java
default CodeBuilder getfield(ClassDesc owner, String name, ClassDesc type)
```

Generates an instruction to fetch field from an object.

Parameters:

- `owner`: the owner class
- `name`: the field name
- `type`: the field type

**Returns:** this builder

**See also:** Opcode#GETFIELD

**See also:** #fieldAccess(Opcode, ClassDesc, String, ClassDesc)

**See also:** FieldInstruction

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type

## CodeBuilder.getstatic(FieldRefEntry)

```java
default CodeBuilder getstatic(FieldRefEntry ref)
```

Generates an instruction to get static field from a class or interface.

Parameters:

- `ref`: the field reference

**Returns:** this builder

**See also:** Opcode#GETSTATIC

**See also:** #fieldAccess(Opcode, FieldRefEntry)

**See also:** FieldInstruction

## CodeBuilder.getstatic(ClassDesc, String, ClassDesc)

```java
default CodeBuilder getstatic(ClassDesc owner, String name, ClassDesc type)
```

Generates an instruction to get static field from a class or interface.

Parameters:

- `owner`: the owner class
- `name`: the field name
- `type`: the field type

**Returns:** this builder

**See also:** Opcode#GETSTATIC

**See also:** #fieldAccess(Opcode, ClassDesc, String, ClassDesc)

**See also:** FieldInstruction

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type
