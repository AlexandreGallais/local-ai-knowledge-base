# ReturnInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface ReturnInstruction extends Instruction permits AbstractInstruction.UnboundReturnInstruction
```

Models a return-from-method instruction in the {@code code} array of a
{@code Code} attribute.  Corresponding opcodes have a {@linkplain Opcode#kind() kind} of
{@link Opcode.Kind#RETURN}.  Delivered as a {@link CodeElement} when
traversing the elements of a {@link CodeModel}.
<p>
A return-from-method instruction is composite:
{@snippet lang=text :
// @link substring="ReturnInstruction" target="#of(TypeKind)" :
ReturnInstruction(TypeKind typeKind) // @link substring="typeKind" target="#typeKind()"
}
where {@code typeKind} is {@linkplain TypeKind##computational-type
computational} or {@link TypeKind#VOID void}.

@see Opcode.Kind#RETURN
@see CodeBuilder#return_(TypeKind) CodeBuilder::return_
@since 24

## ReturnInstruction.typeKind()

```java
TypeKind typeKind()
```

{@return the {@linkplain TypeKind##computational-type computational type}, including
{@link TypeKind#VOID void}, of the return instruction}

## ReturnInstruction.of(TypeKind)

```java
static ReturnInstruction of(TypeKind typeKind)
```

{@return a return instruction}
{@code typeKind} is {@linkplain TypeKind#asLoadable() converted} to its
computational type.

@param typeKind the type of the return instruction

## ReturnInstruction.of(Opcode)

```java
static ReturnInstruction of(Opcode op)
```

{@return a return instruction}

@param op the opcode for the specific type of return instruction,
          which must be of kind {@link Opcode.Kind#RETURN}
@throws IllegalArgumentException if the opcode kind is not
        {@link Opcode.Kind#RETURN}.