# OperatorInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface OperatorInstruction extends Instruction permits AbstractInstruction.UnboundOperatorInstruction
```

Models an arithmetic operator instruction in the {@code code} array of a
{@code Code} attribute.  Corresponding opcodes have a {@linkplain Opcode#kind() kind} of
{@link Opcode.Kind#OPERATOR}.  Delivered as a {@link CodeElement} when
traversing the elements of a {@link CodeModel}.
<p>
An operator instruction is composite:
{@snippet lang=text :
// @link substring="OperatorInstruction" target="#of" :
OperatorInstruction(Opcode opcode) // @link substring="opcode" target="#opcode()"
}

@see Opcode.Kind#OPERATOR
@since 24

## OperatorInstruction.typeKind()

```java
TypeKind typeKind()
```

{@return the operand type of the instruction}
This is derived from the {@link #opcode opcode}.

## OperatorInstruction.of(Opcode)

```java
static OperatorInstruction of(Opcode op)
```

{@return an operator instruction}

@param op the opcode for the specific type of operator instruction,
          which must be of kind {@link Opcode.Kind#OPERATOR}
@throws IllegalArgumentException if the opcode kind is not
        {@link Opcode.Kind#OPERATOR}.