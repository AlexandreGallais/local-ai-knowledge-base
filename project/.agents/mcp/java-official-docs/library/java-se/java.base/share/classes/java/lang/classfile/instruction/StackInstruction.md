# StackInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface StackInstruction extends Instruction permits AbstractInstruction.UnboundStackInstruction
```

Models a stack manipulation instruction in the {@code code} array of a
{@code Code} attribute.  Corresponding opcodes have a {@linkplain Opcode#kind() kind} of
{@link Opcode.Kind#STACK}.  Delivered as a {@link CodeElement} when
traversing the elements of a {@link CodeModel}.
<p>
A stack manipulation instruction is composite:
{@snippet lang=text :
// @link substring="StackInstruction" target="#of" :
StackInstruction(Opcode opcode) // @link substring="opcode" target="#opcode()"
}

@see Opcode.Kind#STACK
@since 24

## StackInstruction.of(Opcode)

```java
static StackInstruction of(Opcode op)
```

{@return a stack manipulation instruction}

@param op the opcode for the specific type of stack instruction,
          which must be of kind {@link Opcode.Kind#STACK}
@throws IllegalArgumentException if the opcode kind is not
        {@link Opcode.Kind#STACK}.