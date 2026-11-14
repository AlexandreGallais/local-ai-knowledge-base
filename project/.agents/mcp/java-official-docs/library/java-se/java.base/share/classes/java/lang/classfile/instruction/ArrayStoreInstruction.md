# ArrayStoreInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface ArrayStoreInstruction extends Instruction permits AbstractInstruction.UnboundArrayStoreInstruction
```

Models an array store instruction in the {@code code} array of a {@code Code}
attribute.  Corresponding opcodes have a {@linkplain Opcode#kind() kind}
of {@link Opcode.Kind#ARRAY_STORE}.  Delivered as a {@link CodeElement} when
traversing the elements of a {@link CodeModel}.
<p>
An array store instruction is composite:
{@snippet lang=text :
// @link substring="ArrayStoreInstruction" target="CodeBuilder#arrayStore(TypeKind)" :
ArrayStoreInstruction(TypeKind typeKind) // @link substring="typeKind" target="#typeKind"
}
where {@code typeKind} is not {@link TypeKind#VOID void}, and {@link
TypeKind#BOOLEAN boolean} is converted to {@link TypeKind#BYTE byte}.

@see Opcode.Kind#ARRAY_STORE
@see CodeBuilder#arrayStore CodeBuilder::arrayStore
@since 24

## ArrayStoreInstruction.typeKind()

```java
TypeKind typeKind()
```

{@return the component type of the array}  The {@link TypeKind#BYTE byte}
type store instruction {@link Opcode#BASTORE bastore} also operates on
{@link TypeKind#BOOLEAN boolean} arrays, so this never returns
{@code boolean}.

## ArrayStoreInstruction.of(Opcode)

```java
static ArrayStoreInstruction of(Opcode op)
```

{@return an array store instruction}

@param op the opcode for the specific type of array store instruction,
          which must be of kind {@link Opcode.Kind#ARRAY_STORE}
@throws IllegalArgumentException if the opcode kind is not
        {@link Opcode.Kind#ARRAY_STORE}