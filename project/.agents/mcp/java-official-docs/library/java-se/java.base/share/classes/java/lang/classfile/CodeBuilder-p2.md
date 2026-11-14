---
title: "CodeBuilder interface (java.lang.classfile) (part 2 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/CodeBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodeBuilder interface (java.lang.classfile) (part 2 of 6)

## CodeBuilder.invoke(Opcode, MemberRefEntry)

```java
default CodeBuilder invoke(Opcode opcode, MemberRefEntry ref)
```

Generates an instruction to invoke a method.

Parameters:

- `opcode`: the invoke opcode
- `ref`: the interface method or method reference

**Returns:** this builder

**See also:** InvokeInstruction

Throws:

- `IllegalArgumentException`: if `opcode` is not of `Opcode.Kind.INVOKE`

## CodeBuilder.invoke(Opcode, ClassDesc, String, MethodTypeDesc, boolean)

```java
default CodeBuilder invoke(Opcode opcode, ClassDesc owner, String name, MethodTypeDesc desc, boolean isInterface)
```

Generates an instruction to invoke a method.

Parameters:

- `opcode`: the invoke opcode
- `owner`: the class
- `name`: the method name
- `desc`: the method type
- `isInterface`: whether the owner class is an interface

**Returns:** this builder

**See also:** InvokeInstruction

Throws:

- `IllegalArgumentException`: if `opcode` is not of `Opcode.Kind.INVOKE`, or `owner` is primitive

## CodeBuilder.arrayLoad(TypeKind)

```java
default CodeBuilder arrayLoad(TypeKind tk)
```

Generates an instruction to load from an array.

Parameters:

- `tk`: the array element type

**Returns:** this builder

**See also:** ArrayLoadInstruction

Throws:

- `IllegalArgumentException`: if `tk` is void

## CodeBuilder.arrayStore(TypeKind)

```java
default CodeBuilder arrayStore(TypeKind tk)
```

Generates an instruction to store into an array.

Parameters:

- `tk`: the array element type

**Returns:** this builder

**See also:** ArrayStoreInstruction

Throws:

- `IllegalArgumentException`: if `tk` is void

## CodeBuilder.conversion(TypeKind, TypeKind)

```java
default CodeBuilder conversion(TypeKind fromType, TypeKind toType)
```

Generates instruction(s) to convert `fromType` to `toType`.

Parameters:

- `fromType`: the source type
- `toType`: the target type

**Returns:** this builder

**See also:** ConvertInstruction

Throws:

- `IllegalArgumentException`: for conversions of void or reference

## CodeBuilder.loadConstant(ConstantDesc)

```java
default CodeBuilder loadConstant(ConstantDesc value)
```

Generates an instruction pushing a constant onto the operand stack.

Parameters:

- `value`: the constant value, may be `null`

**Returns:** this builder

**See also:** ConstantInstruction

## CodeBuilder.loadConstant(int)

```java
default CodeBuilder loadConstant(int value)
```

Generates an instruction pushing a constant int
value onto the operand stack.  This is equivalent to loadConstant(Integer.valueOf(value)).

Parameters:

- `value`: the int value

**Returns:** this builder

**See also:** ConstantInstruction

## CodeBuilder.loadConstant(long)

```java
default CodeBuilder loadConstant(long value)
```

Generates an instruction pushing a constant long
value onto the operand stack.  This is equivalent to loadConstant(Long.valueOf(value)).

Parameters:

- `value`: the long value

**Returns:** this builder

**See also:** ConstantInstruction

## CodeBuilder.loadConstant(float)

```java
default CodeBuilder loadConstant(float value)
```

Generates an instruction pushing a constant float
value onto the operand stack.  This is equivalent to loadConstant(Float.valueOf(value)).

All NaN values of the `float` may or may not be collapsed
into a single "canonical" NaN value.

Parameters:

- `value`: the float value

**Returns:** this builder

**See also:** ConstantInstruction

## CodeBuilder.loadConstant(double)

```java
default CodeBuilder loadConstant(double value)
```

Generates an instruction pushing a constant double
value onto the operand stack.  This is equivalent to loadConstant(Double.valueOf(value)).

All NaN values of the `double` may or may not be collapsed
into a single "canonical" NaN value.

Parameters:

- `value`: the double value

**Returns:** this builder

**See also:** ConstantInstruction

## CodeBuilder.nop()

```java
default CodeBuilder nop()
```

Generates a do-nothing instruction.

**Returns:** this builder

**See also:** NopInstruction

## CodeBuilder.newBoundLabel()

```java
default Label newBoundLabel()
```

Creates a new label bound at the current position.

**Returns:** this builder

**See also:** #newLabel()

**See also:** #labelBinding

## CodeBuilder.labelBinding(Label)

```java
default CodeBuilder labelBinding(Label label)
```

Binds a label to the current position.

Parameters:

- `label`: the label

**API note:** The label to bind does not have to be from this builder; it can be from another parsed `CodeModel`.

**Returns:** this builder

**See also:** LabelTarget

## CodeBuilder.lineNumber(int)

```java
default CodeBuilder lineNumber(int line)
```

Declares a source line number beginning at the current position.

This call may be ignored according to `ClassFile.LineNumbersOption`.

Parameters:

- `line`: the line number

**Returns:** this builder

**See also:** LineNumber

## CodeBuilder.exceptionCatch(Label, Label, Label, ClassEntry)

```java
default CodeBuilder exceptionCatch(Label start, Label end, Label handler, ClassEntry catchType)
```

Declares an exception table entry.

This call may be ignored if any of the argument labels is not bound and `ClassFile.DeadLabelsOption.DROP_DEAD_LABELS`
is set.

Parameters:

- `start`: the try block start
- `end`: the try block end
- `handler`: the exception handler start
- `catchType`: the catch type, may be `null` to catch all exceptions and errors

**Returns:** this builder

**See also:** ExceptionCatch

**See also:** CodeBuilder#trying

## CodeBuilder.exceptionCatch(Label, Label, Label, Optional<ClassEntry>)

```java
default CodeBuilder exceptionCatch(Label start, Label end, Label handler, Optional<ClassEntry> catchType)
```

Declares an exception table entry.

This call may be ignored if any of the argument labels is not bound and `ClassFile.DeadLabelsOption.DROP_DEAD_LABELS`
is set.

Parameters:

- `start`: the try block start
- `end`: the try block end
- `handler`: the exception handler start
- `catchType`: the optional catch type, empty to catch all exceptions and errors

**Returns:** this builder

**See also:** ExceptionCatch

**See also:** CodeBuilder#trying

## CodeBuilder.exceptionCatch(Label, Label, Label, ClassDesc)

```java
default CodeBuilder exceptionCatch(Label start, Label end, Label handler, ClassDesc catchType)
```

Declares an exception table entry.

This call may be ignored if any of the argument labels is not bound and `ClassFile.DeadLabelsOption.DROP_DEAD_LABELS`
is set.

Parameters:

- `start`: the try block start
- `end`: the try block end
- `handler`: the exception handler start
- `catchType`: the catch type

**Returns:** this builder

**See also:** ExceptionCatch

**See also:** CodeBuilder#trying

Throws:

- `IllegalArgumentException`: if `catchType` is primitive

## CodeBuilder.exceptionCatchAll(Label, Label, Label)

```java
default CodeBuilder exceptionCatchAll(Label start, Label end, Label handler)
```

Declares an exception table entry catching all exceptions and errors.

This call may be ignored if any of the argument labels is not bound and `ClassFile.DeadLabelsOption.DROP_DEAD_LABELS`
is set.

Parameters:

- `start`: the try block start
- `end`: the try block end
- `handler`: the exception handler start

**Returns:** this builder

**See also:** ExceptionCatch

**See also:** CodeBuilder#trying

## CodeBuilder.characterRange(Label, Label, int, int, int)

```java
default CodeBuilder characterRange(Label startScope, Label endScope, int characterRangeStart, int characterRangeEnd, int flags)
```

Declares a character range entry.

This call may be ignored if `ClassFile.DebugElementsOption.DROP_DEBUG`
is set, or if any of the argument labels is not bound and `ClassFile.DeadLabelsOption.DROP_DEAD_LABELS` is set.

Parameters:

- `startScope`: the start scope of the character range
- `endScope`: the end scope of the character range
- `characterRangeStart`: the encoded start of the character range region (inclusive)
- `characterRangeEnd`: the encoded end of the character range region (exclusive)
- `flags`: the flags word, indicating the kind of range

**Returns:** this builder

**See also:** CharacterRange

## CodeBuilder.localVariable(int, Utf8Entry, Utf8Entry, Label, Label)

```java
default CodeBuilder localVariable(int slot, Utf8Entry nameEntry, Utf8Entry descriptorEntry, Label startScope, Label endScope)
```

Declares a local variable entry.

This call may be ignored if `ClassFile.DebugElementsOption.DROP_DEBUG`
is set, or if any of the argument labels is not bound and `ClassFile.DeadLabelsOption.DROP_DEAD_LABELS` is set.

Parameters:

- `slot`: the local variable slot
- `nameEntry`: the variable name
- `descriptorEntry`: the variable descriptor
- `startScope`: the start scope of the variable
- `endScope`: the end scope of the variable

**Returns:** this builder

**See also:** LocalVariable

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.localVariable(int, String, ClassDesc, Label, Label)

```java
default CodeBuilder localVariable(int slot, String name, ClassDesc descriptor, Label startScope, Label endScope)
```

Declares a local variable entry.

This call may be ignored if `ClassFile.DebugElementsOption.DROP_DEBUG`
is set, or if any of the argument labels is not bound and `ClassFile.DeadLabelsOption.DROP_DEAD_LABELS` is set.

Parameters:

- `slot`: the local variable slot
- `name`: the variable name
- `descriptor`: the variable descriptor
- `startScope`: the start scope of the variable
- `endScope`: the end scope of the variable

**Returns:** this builder

**See also:** LocalVariable

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.localVariableType(int, Utf8Entry, Utf8Entry, Label, Label)

```java
default CodeBuilder localVariableType(int slot, Utf8Entry nameEntry, Utf8Entry signatureEntry, Label startScope, Label endScope)
```

Declares a local variable type entry.

This call may be ignored if `ClassFile.DebugElementsOption.DROP_DEBUG`
is set, or if any of the argument labels is not bound and `ClassFile.DeadLabelsOption.DROP_DEAD_LABELS` is set.

Parameters:

- `slot`: the local variable slot
- `nameEntry`: the variable name
- `signatureEntry`: the variable signature
- `startScope`: the start scope of the variable
- `endScope`: the end scope of the variable

**API note:** When a local variable type entry is declared, a local variable entry with
the descriptor derived from erasure (JLS ) of the signature
should be declared as well.

**Returns:** this builder

**See also:** LocalVariableType

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.localVariableType(int, String, Signature, Label, Label)

```java
default CodeBuilder localVariableType(int slot, String name, Signature signature, Label startScope, Label endScope)
```

Declares a local variable type entry.

This call may be ignored if `ClassFile.DebugElementsOption.DROP_DEBUG`
is set, or if any of the argument labels is not bound and `ClassFile.DeadLabelsOption.DROP_DEAD_LABELS` is set.

Parameters:

- `slot`: the local variable slot
- `name`: the variable name
- `signature`: the variable signature
- `startScope`: the start scope of the variable
- `endScope`: the end scope of the variable

**API note:** When a local variable type entry is declared, a local variable entry with
the descriptor derived from erasure (JLS ) of the signature
should be declared as well.

**Returns:** this builder

**See also:** LocalVariableType

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.aconst_null()

```java
default CodeBuilder aconst_null()
```

Generates an instruction pushing the null object reference onto the operand stack.

**Returns:** this builder

**See also:** Opcode#ACONST_NULL

**See also:** ConstantInstruction.IntrinsicConstantInstruction

## CodeBuilder.aaload()

```java
default CodeBuilder aaload()
```

Generates an instruction to load from a reference array.

**Returns:** this builder

**See also:** Opcode#AALOAD

**See also:** #arrayLoad(TypeKind)

**See also:** ArrayLoadInstruction

## CodeBuilder.aastore()

```java
default CodeBuilder aastore()
```

Generates an instruction to store into a reference array.

**Returns:** this builder

**See also:** Opcode#AASTORE

**See also:** #arrayStore(TypeKind)

**See also:** ArrayStoreInstruction

## CodeBuilder.aload(int)

```java
default CodeBuilder aload(int slot)
```

Generates an instruction to load a reference
from a local variable.

This may also generate aload_<N> and wide aload instructions.

Parameters:

- `slot`: the local variable slot

**Returns:** this builder

**See also:** Opcode#ALOAD

**See also:** #loadLocal

**See also:** LoadInstruction

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.anewarray(ClassEntry)

```java
default CodeBuilder anewarray(ClassEntry classEntry)
```

Generates an instruction to create a new array of reference.

Parameters:

- `classEntry`: the component type

**Returns:** this builder

**See also:** Opcode#ANEWARRAY

**See also:** NewReferenceArrayInstruction

## CodeBuilder.anewarray(ClassDesc)

```java
default CodeBuilder anewarray(ClassDesc className)
```

Generates an instruction to create a new array of reference.

Parameters:

- `className`: the component type

**Returns:** this builder

**See also:** Opcode#ANEWARRAY

**See also:** NewReferenceArrayInstruction

Throws:

- `IllegalArgumentException`: if `className` represents a primitive type

## CodeBuilder.areturn()

```java
default CodeBuilder areturn()
```

Generates an instruction to return a reference
from this method.

**Returns:** this builder

**See also:** Opcode#ARETURN

**See also:** #return_(TypeKind)

**See also:** ReturnInstruction

## CodeBuilder.arraylength()

```java
default CodeBuilder arraylength()
```

Generates an instruction to get the length of an array.

**Returns:** this builder

**See also:** Opcode#ARRAYLENGTH

**See also:** OperatorInstruction

## CodeBuilder.astore(int)

```java
default CodeBuilder astore(int slot)
```

Generates an instruction to store a reference
into a local variable.  Such an instruction can also store a returnAddress.

This may also generate astore_<N> and
wide astore instructions.

Parameters:

- `slot`: the local variable slot

**Returns:** this builder

**See also:** Opcode#ASTORE

**See also:** #storeLocal

**See also:** StoreInstruction

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## CodeBuilder.athrow()

```java
default CodeBuilder athrow()
```

Generates an instruction to throw an exception or error.

**Returns:** this builder

**See also:** Opcode#ATHROW

**See also:** ThrowInstruction

## CodeBuilder.baload()

```java
default CodeBuilder baload()
```

Generates an instruction to load from a byte or
boolean array.

**Returns:** this builder

**See also:** Opcode#BALOAD

**See also:** #arrayLoad(TypeKind)

**See also:** ArrayLoadInstruction
