# Instruction interface (java.lang.classfile)

```java
public sealed interface Instruction extends CodeElement permits ArrayLoadInstruction, ArrayStoreInstruction, BranchInstruction, ConstantInstruction, ConvertInstruction, DiscontinuedInstruction, FieldInstruction, InvokeDynamicInstruction, InvokeInstruction, LoadInstruction, StoreInstruction, IncrementInstruction, LookupSwitchInstruction, MonitorInstruction, NewMultiArrayInstruction, NewObjectInstruction, NewPrimitiveArrayInstruction, NewReferenceArrayInstruction, NopInstruction, OperatorInstruction, ReturnInstruction, StackInstruction, TableSwitchInstruction, ThrowInstruction, TypeCheckInstruction, AbstractInstruction
```

Models an executable instruction in the {@code code} array of the {@link
CodeAttribute Code} attribute of a method.  The order of instructions in
a {@link CodeModel} is significant.
<p>
The {@link #opcode() opcode} identifies the operation of an instruction.
Each {@linkplain Opcode#kind() kind} of opcode has its own modeling interface
for instructions.

@see Opcode
@jvms 6.5 Instructions
@sealedGraph
@since 24

## Instruction.opcode()

```java
Opcode opcode()
```

{@return the operation of this instruction}

## Instruction.sizeInBytes()

```java
int sizeInBytes()
```

{@return the size in bytes of this instruction}
This value is equal to {@link Opcode#sizeIfFixed()
opcode().sizeIfFixed()} if it is not {@code -1}.