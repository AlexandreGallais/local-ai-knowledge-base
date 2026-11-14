# ArrayLoadInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface ArrayLoadInstruction extends Instruction permits AbstractInstruction.UnboundArrayLoadInstruction
```

Models an array load instruction in the {@code code} array of a {@code Code}
attribute.  Corresponding opcodes have a {@linkplain Opcode#kind() kind}
of {@link Opcode.Kind#ARRAY_LOAD}.  Delivered as a {@link CodeElement} when
traversing the elements of a {@link CodeModel}.
<p>
An array load instruction is composite:
{@snippet lang=text :
// @link substring="ArrayLoadInstruction" target="CodeBuilder#arrayLoad(TypeKind)" :
ArrayLoadInstruction(TypeKind typeKind) // @link substring="typeKind" target="#typeKind"
}
where {@code typeKind} is not {@link TypeKind#VOID void}, and {@link
TypeKind#BOOLEAN boolean} is converted to {@link TypeKind#BYTE byte}.

@see Opcode.Kind#ARRAY_LOAD
@see CodeBuilder#arrayLoad CodeBuilder::arrayLoad
@since 24

## ArrayLoadInstruction.typeKind()

```java
TypeKind typeKind()
```

{@return the component type of the array}  The {@link TypeKind#BYTE byte}
type load instruction {@link Opcode#BALOAD baload} also operates on
{@link TypeKind#BOOLEAN boolean} arrays, so this never returns
{@code boolean}.

## ArrayLoadInstruction.of(Opcode)

```java
static ArrayLoadInstruction of(Opcode op)
```

{@return an array load instruction}

@param op the opcode for the specific type of array load instruction,
          which must be of kind {@link Opcode.Kind#ARRAY_LOAD}
@throws IllegalArgumentException if the opcode kind is not
        {@link Opcode.Kind#ARRAY_LOAD}