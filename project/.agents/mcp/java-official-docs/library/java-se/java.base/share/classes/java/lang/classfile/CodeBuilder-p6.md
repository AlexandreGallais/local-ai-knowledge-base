---
title: "CodeBuilder interface (java.lang.classfile) (part 6 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/CodeBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodeBuilder interface (java.lang.classfile) (part 6 of 6)

## CodeBuilder.ldiv()

```java
default CodeBuilder ldiv()
```

Generates an instruction to divide longs.

**Returns:** this builder

**See also:** Opcode#LDIV

**See also:** OperatorInstruction

## CodeBuilder.lload(int)

```java
default CodeBuilder lload(int slot)
```

Generates an instruction to load a long from a
local variable.

This may also generate lload_<N> and wide lload instructions.

Parameters:

- `slot`: the local variable slot

**Returns:** this builder

**See also:** Opcode#LLOAD

**See also:** #loadLocal(TypeKind, int)

**See also:** LoadInstruction

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.lmul()

```java
default CodeBuilder lmul()
```

Generates an instruction to multiply longs.

**Returns:** this builder

**See also:** Opcode#LMUL

**See also:** OperatorInstruction

## CodeBuilder.lneg()

```java
default CodeBuilder lneg()
```

Generates an instruction to negate a long.

**Returns:** this builder

**See also:** Opcode#LNEG

**See also:** OperatorInstruction

## CodeBuilder.lor()

```java
default CodeBuilder lor()
```

Generates an instruction to calculate bitwise OR of longs.

**Returns:** this builder

**See also:** Opcode#LOR

**See also:** OperatorInstruction

## CodeBuilder.lrem()

```java
default CodeBuilder lrem()
```

Generates an instruction to calculate longs
remainder.

**Returns:** this builder

**See also:** Opcode#LREM

**See also:** OperatorInstruction

## CodeBuilder.lreturn()

```java
default CodeBuilder lreturn()
```

Generates an instruction to return a long from this
method.

**Returns:** this builder

**See also:** Opcode#LRETURN

**See also:** #return_(TypeKind)

**See also:** ReturnInstruction

## CodeBuilder.lshl()

```java
default CodeBuilder lshl()
```

Generates an instruction to shift a long left.

**Returns:** this builder

**See also:** Opcode#LSHL

**See also:** OperatorInstruction

## CodeBuilder.lshr()

```java
default CodeBuilder lshr()
```

Generates an instruction to shift a long right.
This carries the sign bit to the vacated most significant bits, as
opposed to `lushr()` that fills vacated most significant bits with
`0`.

**Returns:** this builder

**See also:** Opcode#LSHR

**See also:** OperatorInstruction

## CodeBuilder.lstore(int)

```java
default CodeBuilder lstore(int slot)
```

Generates an instruction to store a long into a
local variable.

This may also generate lstore_<N> and
wide lstore instructions.

Parameters:

- `slot`: the local variable slot

**Returns:** this builder

**See also:** Opcode#LSTORE

**See also:** #storeLocal(TypeKind, int)

**See also:** StoreInstruction

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.lsub()

```java
default CodeBuilder lsub()
```

Generates an instruction to subtract longs.

**Returns:** this builder

**See also:** Opcode#LSUB

**See also:** OperatorInstruction

## CodeBuilder.lushr()

```java
default CodeBuilder lushr()
```

Generates an instruction to logical shift a long
right.  This fills vacated most significant bits with `0`, as
opposed to `lshr()` that carries the sign bit to the vacated most
significant bits.

**Returns:** this builder

**See also:** Opcode#LUSHR

**See also:** OperatorInstruction

## CodeBuilder.lxor()

```java
default CodeBuilder lxor()
```

Generates an instruction to calculate bitwise XOR of longs.

**Returns:** this builder

**See also:** Opcode#LXOR

**See also:** OperatorInstruction

## CodeBuilder.monitorenter()

```java
default CodeBuilder monitorenter()
```

Generates an instruction to enter monitor for an object.

**Returns:** this builder

**See also:** Opcode#MONITORENTER

**See also:** MonitorInstruction

## CodeBuilder.monitorexit()

```java
default CodeBuilder monitorexit()
```

Generates an instruction to exit monitor for an object.

**Returns:** this builder

**See also:** Opcode#MONITOREXIT

**See also:** MonitorInstruction

## CodeBuilder.multianewarray(ClassEntry, int)

```java
default CodeBuilder multianewarray(ClassEntry array, int dims)
```

Generates an instruction to create a new multidimensional array.

Parameters:

- `array`: the array type
- `dims`: the number of dimensions

**Returns:** this builder

**See also:** Opcode#MULTIANEWARRAY

**See also:** NewMultiArrayInstruction

Throws:

- `IllegalArgumentException`: if `dims` is out of range

## CodeBuilder.multianewarray(ClassDesc, int)

```java
default CodeBuilder multianewarray(ClassDesc array, int dims)
```

Generates an instruction to create a new multidimensional array.

Parameters:

- `array`: the array type
- `dims`: the number of dimensions

**Returns:** this builder

**See also:** Opcode#MULTIANEWARRAY

**See also:** NewMultiArrayInstruction

Throws:

- `IllegalArgumentException`: if `array` represents a primitive type or if `dims` is out of range

## CodeBuilder.new_(ClassEntry)

```java
default CodeBuilder new_(ClassEntry clazz)
```

Generates an instruction to create a new object.

Parameters:

- `clazz`: the new class type

**API note:** The instruction's name is `new`, which coincides with a reserved
keyword of the Java programming language, thus this method is named with
an extra `_` suffix instead.

**Returns:** this builder

**See also:** Opcode#NEW

**See also:** NewObjectInstruction

## CodeBuilder.new_(ClassDesc)

```java
default CodeBuilder new_(ClassDesc clazz)
```

Generates an instruction to create a new object.

Parameters:

- `clazz`: the new class type

**API note:** The instruction's name is `new`, which coincides with a reserved
keyword of the Java programming language, thus this method is named with
an extra `_` suffix instead.

**Returns:** this builder

**See also:** Opcode#NEW

**See also:** NewObjectInstruction

Throws:

- `IllegalArgumentException`: if `clazz` represents a primitive type

## CodeBuilder.newarray(TypeKind)

```java
default CodeBuilder newarray(TypeKind typeKind)
```

Generates an instruction to create a new array of a primitive type.

Parameters:

- `typeKind`: the primitive array type

**Returns:** this builder

**See also:** Opcode#NEWARRAY

**See also:** NewPrimitiveArrayInstruction

Throws:

- `IllegalArgumentException`: when the `typeKind` is not a legal primitive array component type

## CodeBuilder.pop()

```java
default CodeBuilder pop()
```

Generates an instruction to pop the top operand stack value.

**Returns:** this builder

**See also:** Opcode#POP

**See also:** StackInstruction

## CodeBuilder.pop2()

```java
default CodeBuilder pop2()
```

Generates an instruction to pop the top one or two operand stack values.

**Returns:** this builder

**See also:** Opcode#POP2

**See also:** StackInstruction

## CodeBuilder.putfield(FieldRefEntry)

```java
default CodeBuilder putfield(FieldRefEntry ref)
```

Generates an instruction to set field in an object.

Parameters:

- `ref`: the field reference

**Returns:** this builder

**See also:** Opcode#PUTFIELD

**See also:** #fieldAccess(Opcode, FieldRefEntry)

**See also:** FieldInstruction

## CodeBuilder.putfield(ClassDesc, String, ClassDesc)

```java
default CodeBuilder putfield(ClassDesc owner, String name, ClassDesc type)
```

Generates an instruction to set field in an object.

Parameters:

- `owner`: the owner class
- `name`: the field name
- `type`: the field type

**Returns:** this builder

**See also:** Opcode#PUTFIELD

**See also:** #fieldAccess(Opcode, ClassDesc, String, ClassDesc)

**See also:** FieldInstruction

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type

## CodeBuilder.putstatic(FieldRefEntry)

```java
default CodeBuilder putstatic(FieldRefEntry ref)
```

Generates an instruction to set static field in a class.

Parameters:

- `ref`: the field reference

**Returns:** this builder

**See also:** Opcode#PUTSTATIC

**See also:** #fieldAccess(Opcode, FieldRefEntry)

**See also:** FieldInstruction

## CodeBuilder.putstatic(ClassDesc, String, ClassDesc)

```java
default CodeBuilder putstatic(ClassDesc owner, String name, ClassDesc type)
```

Generates an instruction to set static field in a class.

Parameters:

- `owner`: the owner class or interface
- `name`: the field name
- `type`: the field type

**Returns:** this builder

**See also:** Opcode#PUTSTATIC

**See also:** #fieldAccess(Opcode, ClassDesc, String, ClassDesc)

**See also:** FieldInstruction

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type

## CodeBuilder.return_()

```java
default CodeBuilder return_()
```

Generates an instruction to return void from this
method.

**API note:** The instruction's name is `return`, which coincides with a reserved
keyword of the Java programming language, thus this method is named with
an extra `_` suffix instead.

**Returns:** this builder

**See also:** Opcode#RETURN

**See also:** #return_(TypeKind)

**See also:** ReturnInstruction

## CodeBuilder.saload()

```java
default CodeBuilder saload()
```

Generates an instruction to load from a short
array.

**Returns:** this builder

**See also:** Opcode#SALOAD

**See also:** #arrayLoad(TypeKind)

**See also:** ArrayLoadInstruction

## CodeBuilder.sastore()

```java
default CodeBuilder sastore()
```

Generates an instruction to store into a short
array.

**Returns:** this builder

**See also:** Opcode#SASTORE

**See also:** #arrayStore(TypeKind)

**See also:** ArrayStoreInstruction

## CodeBuilder.sipush(int)

```java
default CodeBuilder sipush(int s)
```

Generates an instruction pushing an int in the range
of short, `[-32768, 32767]`, onto the
operand stack.

Parameters:

- `s`: the int in the range of short

**Returns:** this builder

**See also:** Opcode#SIPUSH

**See also:** #loadConstant(int)

**See also:** ConstantInstruction.ArgumentConstantInstruction

Throws:

- `IllegalArgumentException`: if `s` is out of range of short

## CodeBuilder.swap()

```java
default CodeBuilder swap()
```

Generates an instruction to swap the top two operand stack values.

**Returns:** this builder

**See also:** Opcode#SWAP

**See also:** StackInstruction

## CodeBuilder.tableswitch(int, int, Label, List<SwitchCase>)

```java
default CodeBuilder tableswitch(int low, int high, Label defaultTarget, List<SwitchCase> cases)
```

Generates an instruction to access a jump table by index and jump.

Parameters:

- `low`: the minimum key, inclusive
- `high`: the maximum key, inclusive
- `defaultTarget`: the default jump target
- `cases`: the switch cases

**Returns:** this builder

**See also:** Opcode#TABLESWITCH

**See also:** TableSwitchInstruction

## CodeBuilder.tableswitch(Label, List<SwitchCase>)

```java
default CodeBuilder tableswitch(Label defaultTarget, List<SwitchCase> cases)
```

Generates an instruction to access a jump table by index and jump.
Computes the minimum and maximum keys from the `cases`.

Parameters:

- `defaultTarget`: the default jump target
- `cases`: the switch cases

**Returns:** this builder

**See also:** Opcode#TABLESWITCH

**See also:** #tableswitch(int, int, Label, List)

**See also:** TableSwitchInstruction
