# NewPrimitiveArrayInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface NewPrimitiveArrayInstruction extends Instruction permits AbstractInstruction.BoundNewPrimitiveArrayInstruction, AbstractInstruction.UnboundNewPrimitiveArrayInstruction
```

Models a {@link Opcode#NEWARRAY newarray} instruction in the {@code code}
array of a {@code Code} attribute.  Delivered as a {@link CodeElement}
when traversing the elements of a {@link CodeModel}.
<p>
A new primitive array instruction is composite:
{@snippet lang=text :
// @link substring="NewPrimitiveArrayInstruction" target="#of" :
NewPrimitiveArrayInstruction(TypeKind typeKind) // @link substring="typeKind" target="#typeKind"
}
where {@code typeKind} is primitive and not {@code void}.

@see Opcode.Kind#NEW_PRIMITIVE_ARRAY
@see CodeBuilder#newarray CodeBuilder::newarray
@jvms 6.5.newarray <em>newarray</em>
@since 24

## NewPrimitiveArrayInstruction.typeKind()

```java
TypeKind typeKind()
```

{@return the component type of the array}

@apiNote
The backing array code for this instruction is available through
{@link TypeKind#newarrayCode() typeKind().newarrayCode()}.

## NewPrimitiveArrayInstruction.of(TypeKind)

```java
static NewPrimitiveArrayInstruction of(TypeKind typeKind)
```

{@return a new primitive array instruction}

@param typeKind the component type of the array
@throws IllegalArgumentException when {@code typeKind} is not primitive
        or is {@code void}
@see TypeKind#fromNewarrayCode(int) TypeKind::fromNewarrayCode