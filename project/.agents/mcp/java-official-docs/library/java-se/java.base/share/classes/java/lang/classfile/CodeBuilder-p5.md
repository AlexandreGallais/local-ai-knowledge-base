---
title: "CodeBuilder interface (java.lang.classfile) (part 5 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/CodeBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodeBuilder interface (java.lang.classfile) (part 5 of 6)

## CodeBuilder.imul()

```java
default CodeBuilder imul()
```

Generates an instruction to multiply ints.

**Returns:** this builder

**See also:** Opcode#IMUL

**See also:** OperatorInstruction

## CodeBuilder.ineg()

```java
default CodeBuilder ineg()
```

Generates an instruction to negate an int.

**Returns:** this builder

**See also:** Opcode#INEG

**See also:** OperatorInstruction

## CodeBuilder.instanceOf(ClassEntry)

```java
default CodeBuilder instanceOf(ClassEntry target)
```

Generates an instruction to determine if an object is of the given type,
producing a boolean result on the operand stack.

Parameters:

- `target`: the target type

**API note:** The instruction's name is `instanceof`, which coincides with a
reserved keyword of the Java programming language, thus this method is
named with camel case instead.

**Returns:** this builder

**See also:** Opcode#INSTANCEOF

**See also:** TypeCheckInstruction

## CodeBuilder.instanceOf(ClassDesc)

```java
default CodeBuilder instanceOf(ClassDesc target)
```

Generates an instruction to determine if an object is of the given type,
producing a boolean result on the operand stack.

Parameters:

- `target`: the target type

**API note:** The instruction's name is `instanceof`, which coincides with a
reserved keyword of the Java programming language, thus this method is
named with camel case instead.

**Returns:** this builder

**See also:** Opcode#INSTANCEOF

**See also:** TypeCheckInstruction

Throws:

- `IllegalArgumentException`: if `target` represents a primitive type

## CodeBuilder.invokedynamic(InvokeDynamicEntry)

```java
default CodeBuilder invokedynamic(InvokeDynamicEntry ref)
```

Generates an instruction to invoke a dynamically-computed call site.

Parameters:

- `ref`: the dynamic call site

**Returns:** this builder

**See also:** Opcode#INVOKEDYNAMIC

**See also:** InvokeDynamicInstruction

## CodeBuilder.invokedynamic(DynamicCallSiteDesc)

```java
default CodeBuilder invokedynamic(DynamicCallSiteDesc ref)
```

Generates an instruction to invoke a dynamically-computed call site.

Parameters:

- `ref`: the dynamic call site

**Returns:** this builder

**See also:** Opcode#INVOKEDYNAMIC

**See also:** InvokeDynamicInstruction

## CodeBuilder.invokeinterface(InterfaceMethodRefEntry)

```java
default CodeBuilder invokeinterface(InterfaceMethodRefEntry ref)
```

Generates an instruction to invoke an interface method.

Parameters:

- `ref`: the interface method reference

**Returns:** this builder

**See also:** Opcode#INVOKEINTERFACE

**See also:** #invoke(Opcode, MemberRefEntry)

**See also:** InvokeInstruction

## CodeBuilder.invokeinterface(ClassDesc, String, MethodTypeDesc)

```java
default CodeBuilder invokeinterface(ClassDesc owner, String name, MethodTypeDesc type)
```

Generates an instruction to invoke an interface method.

Parameters:

- `owner`: the owner interface
- `name`: the method name
- `type`: the method type

**Returns:** this builder

**See also:** Opcode#INVOKEINTERFACE

**See also:** #invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)

**See also:** InvokeInstruction

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type

## CodeBuilder.invokespecial(InterfaceMethodRefEntry)

```java
default CodeBuilder invokespecial(InterfaceMethodRefEntry ref)
```

Generates an instruction to invoke an instance method in an interface;
direct invocation of methods of the current class and its supertypes.

Parameters:

- `ref`: the interface method reference

**Returns:** this builder

**See also:** Opcode#INVOKESPECIAL

**See also:** #invoke(Opcode, MemberRefEntry)

**See also:** InvokeInstruction

## CodeBuilder.invokespecial(MethodRefEntry)

```java
default CodeBuilder invokespecial(MethodRefEntry ref)
```

Generates an instruction to invoke an instance method in a class; direct
invocation of instance initialization methods and methods of the current
class and its supertypes.

Parameters:

- `ref`: the method reference

**Returns:** this builder

**See also:** Opcode#INVOKESPECIAL

**See also:** #invoke(Opcode, MemberRefEntry)

**See also:** InvokeInstruction

## CodeBuilder.invokespecial(ClassDesc, String, MethodTypeDesc)

```java
default CodeBuilder invokespecial(ClassDesc owner, String name, MethodTypeDesc type)
```

Generates an instruction to invoke an instance method in a class; direct
invocation of instance initialization methods and methods of the current
class and its supertypes.

Parameters:

- `owner`: the owner class, must not be an interface
- `name`: the method name
- `type`: the method type

**Returns:** this builder

**See also:** Opcode#INVOKESPECIAL

**See also:** #invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)

**See also:** InvokeInstruction

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type

## CodeBuilder.invokespecial(ClassDesc, String, MethodTypeDesc, boolean)

```java
default CodeBuilder invokespecial(ClassDesc owner, String name, MethodTypeDesc type, boolean isInterface)
```

Generates an instruction to invoke an instance method; direct invocation
of instance initialization methods and methods of the current class and
its supertypes.

Parameters:

- `owner`: the owner class or interface
- `name`: the method name
- `type`: the method type
- `isInterface`: whether the owner is an interface

**Returns:** this builder

**See also:** Opcode#INVOKESPECIAL

**See also:** #invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)

**See also:** InvokeInstruction

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type

## CodeBuilder.invokestatic(InterfaceMethodRefEntry)

```java
default CodeBuilder invokestatic(InterfaceMethodRefEntry ref)
```

Generates an instruction to invoke a class (static) method of an interface.

Parameters:

- `ref`: the interface method reference

**Returns:** this builder

**See also:** Opcode#INVOKESTATIC

**See also:** #invoke(Opcode, MemberRefEntry)

**See also:** InvokeInstruction

## CodeBuilder.invokestatic(MethodRefEntry)

```java
default CodeBuilder invokestatic(MethodRefEntry ref)
```

Generates an instruction to invoke a class (static) method of a class.

Parameters:

- `ref`: the method reference

**Returns:** this builder

**See also:** Opcode#INVOKESTATIC

**See also:** #invoke(Opcode, MemberRefEntry)

**See also:** InvokeInstruction

## CodeBuilder.invokestatic(ClassDesc, String, MethodTypeDesc)

```java
default CodeBuilder invokestatic(ClassDesc owner, String name, MethodTypeDesc type)
```

Generates an instruction to invoke a class (static) method of a class.

Parameters:

- `owner`: the owner class, must not be an interface
- `name`: the method name
- `type`: the method type

**Returns:** this builder

**See also:** Opcode#INVOKESTATIC

**See also:** #invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)

**See also:** InvokeInstruction

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type

## CodeBuilder.invokestatic(ClassDesc, String, MethodTypeDesc, boolean)

```java
default CodeBuilder invokestatic(ClassDesc owner, String name, MethodTypeDesc type, boolean isInterface)
```

Generates an instruction to invoke a class (static) method.

Parameters:

- `owner`: the owner class or interface
- `name`: the method name
- `type`: the method type
- `isInterface`: whether the owner is an interface

**Returns:** this builder

**See also:** Opcode#INVOKESTATIC

**See also:** #invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)

**See also:** InvokeInstruction

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type

## CodeBuilder.invokevirtual(MethodRefEntry)

```java
default CodeBuilder invokevirtual(MethodRefEntry ref)
```

Generates an instruction to invoke an instance method; dispatch based on class.

Parameters:

- `ref`: the method reference

**Returns:** this builder

**See also:** Opcode#INVOKEVIRTUAL

**See also:** #invoke(Opcode, MemberRefEntry)

**See also:** InvokeInstruction

## CodeBuilder.invokevirtual(ClassDesc, String, MethodTypeDesc)

```java
default CodeBuilder invokevirtual(ClassDesc owner, String name, MethodTypeDesc type)
```

Generates an instruction to invoke an instance method; dispatch based on class.

Parameters:

- `owner`: the owner class, must not be an interface
- `name`: the method name
- `type`: the method type

**Returns:** this builder

**See also:** Opcode#INVOKEVIRTUAL

**See also:** #invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)

**See also:** InvokeInstruction

Throws:

- `IllegalArgumentException`: if `owner` represents a primitive type

## CodeBuilder.ior()

```java
default CodeBuilder ior()
```

Generates an instruction to calculate bitwise OR of ints, also used for boolean OR.

**Returns:** this builder

**See also:** Opcode#IOR

**See also:** OperatorInstruction

## CodeBuilder.irem()

```java
default CodeBuilder irem()
```

Generates an instruction to calculate ints remainder.

**Returns:** this builder

**See also:** Opcode#IREM

**See also:** OperatorInstruction

## CodeBuilder.ireturn()

```java
default CodeBuilder ireturn()
```

Generates an instruction to return an int from this
method.

**Returns:** this builder

**See also:** Opcode#IRETURN

**See also:** #return_(TypeKind)

**See also:** ReturnInstruction

## CodeBuilder.ishl()

```java
default CodeBuilder ishl()
```

Generates an instruction to shift an int left.

**Returns:** this builder

**See also:** Opcode#ISHL

**See also:** OperatorInstruction

## CodeBuilder.ishr()

```java
default CodeBuilder ishr()
```

Generates an instruction to shift an int right.
This carries the sign bit to the vacated most significant bits, as
opposed to `iushr()` that fills vacated most significant bits with
`0`.

**Returns:** this builder

**See also:** Opcode#ISHR

**See also:** OperatorInstruction

## CodeBuilder.istore(int)

```java
default CodeBuilder istore(int slot)
```

Generates an instruction to store an int into a
local variable.

This may also generate istore_<N> and
wide istore instructions.

Parameters:

- `slot`: the local variable slot

**Returns:** this builder

**See also:** Opcode#ISTORE

**See also:** #storeLocal(TypeKind, int)

**See also:** StoreInstruction

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.isub()

```java
default CodeBuilder isub()
```

Generates an instruction to subtract ints.

**Returns:** this builder

**See also:** Opcode#ISUB

**See also:** OperatorInstruction

## CodeBuilder.iushr()

```java
default CodeBuilder iushr()
```

Generates an instruction to logical shift an int
right.  This fills vacated most significant bits with `0`, as
opposed to `ishr()` that carries the sign bit to the vacated most
significant bits.

**Returns:** this builder

**See also:** Opcode#IUSHR

**See also:** OperatorInstruction

## CodeBuilder.ixor()

```java
default CodeBuilder ixor()
```

Generates an instruction to calculate bitwise XOR of ints.  This can also be used for boolean XOR.

**Returns:** this builder

**See also:** Opcode#IXOR

**See also:** OperatorInstruction

## CodeBuilder.lookupswitch(Label, List<SwitchCase>)

```java
default CodeBuilder lookupswitch(Label defaultTarget, List<SwitchCase> cases)
```

Generates an instruction to access a jump table by key match and jump.

Parameters:

- `defaultTarget`: the default jump target
- `cases`: the switch cases

**Returns:** this builder

**See also:** Opcode#LOOKUPSWITCH

**See also:** LookupSwitchInstruction

## CodeBuilder.l2d()

```java
default CodeBuilder l2d()
```

Generates an instruction to convert a long into a
double.

**Returns:** this builder

**See also:** Opcode#L2D

**See also:** OperatorInstruction

## CodeBuilder.l2f()

```java
default CodeBuilder l2f()
```

Generates an instruction to convert a long into a
float.

**Returns:** this builder

**See also:** Opcode#L2F

**See also:** OperatorInstruction

## CodeBuilder.l2i()

```java
default CodeBuilder l2i()
```

Generates an instruction to convert a long into an
int.

**Returns:** this builder

**See also:** Opcode#L2I

**See also:** OperatorInstruction

## CodeBuilder.ladd()

```java
default CodeBuilder ladd()
```

Generates an instruction to add two longs.

**Returns:** this builder

**See also:** Opcode#LADD

**See also:** OperatorInstruction

## CodeBuilder.laload()

```java
default CodeBuilder laload()
```

Generates an instruction to load from a long array.

**Returns:** this builder

**See also:** Opcode#LALOAD

**See also:** #arrayLoad(TypeKind)

**See also:** ArrayLoadInstruction

## CodeBuilder.land()

```java
default CodeBuilder land()
```

Generates an instruction to calculate bitwise AND of longs.

**Returns:** this builder

**See also:** Opcode#LAND

**See also:** OperatorInstruction

## CodeBuilder.lastore()

```java
default CodeBuilder lastore()
```

Generates an instruction to store into a long array.

**Returns:** this builder

**See also:** Opcode#LASTORE

**See also:** #arrayStore(TypeKind)

**See also:** ArrayStoreInstruction

## CodeBuilder.lcmp()

```java
default CodeBuilder lcmp()
```

Generates an instruction to compare longs.

**Returns:** this builder

**See also:** Opcode#LCMP

**See also:** OperatorInstruction

## CodeBuilder.lconst_0()

```java
default CodeBuilder lconst_0()
```

Generates an instruction pushing long constant 0
onto the operand stack.

**Returns:** this builder

**See also:** Opcode#LCONST_0

**See also:** #loadConstant(long)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.lconst_1()

```java
default CodeBuilder lconst_1()
```

Generates an instruction pushing long constant 1
onto the operand stack.

**Returns:** this builder

**See also:** Opcode#LCONST_1

**See also:** #loadConstant(long)

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.ldc(ConstantDesc)

```java
default CodeBuilder ldc(ConstantDesc value)
```

Generates an instruction pushing an item from the run-time constant pool
onto the operand stack.

This may also generate ldc_w and ldc2_w instructions.

Parameters:

- `value`: the constant value

**API note:** loadConstant generates more optimal
instructions and should be used for general constants if an `ldc`
instruction is not strictly required.

**Returns:** this builder

**See also:** Opcode#LDC

**See also:** #loadConstant(ConstantDesc)

**See also:** ConstantInstruction.LoadConstantInstruction

## CodeBuilder.ldc(LoadableConstantEntry)

```java
default CodeBuilder ldc(LoadableConstantEntry entry)
```

Generates an instruction pushing an item from the run-time constant pool
onto the operand stack.

This may also generate ldc_w and ldc2_w instructions.

Parameters:

- `entry`: the constant value

**Returns:** this builder

**See also:** Opcode#LDC

**See also:** #loadConstant(ConstantDesc)

**See also:** ConstantInstruction.LoadConstantInstruction
