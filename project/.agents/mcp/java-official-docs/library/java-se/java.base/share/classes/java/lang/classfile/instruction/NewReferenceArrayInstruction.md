# NewReferenceArrayInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface NewReferenceArrayInstruction extends Instruction permits AbstractInstruction.BoundNewReferenceArrayInstruction, AbstractInstruction.UnboundNewReferenceArrayInstruction
```

Models a {@link Opcode#ANEWARRAY anewarray} instruction in the {@code code}
array of a {@code Code} attribute.  Delivered as a {@link CodeElement}
when traversing the elements of a {@link CodeModel}.
<p>
A new reference array instruction is composite:
{@snippet lang=text :
// @link substring="NewReferenceArrayInstruction" target="#of" :
NewReferenceArrayInstruction(ClassEntry componentType) // @link substring="componentType" target="#componentType"
}

@see Opcode.Kind#NEW_REF_ARRAY
@see CodeBuilder#newarray CodeBuilder::anewarray
@jvms 6.5.anewarray <em>anewarray</em>
@since 24

## NewReferenceArrayInstruction.componentType()

```java
ClassEntry componentType()
```

{@return the component type of the array}

## NewReferenceArrayInstruction.of(ClassEntry)

```java
static NewReferenceArrayInstruction of(ClassEntry componentType)
```

{@return a new reference array instruction}

@param componentType the component type of the array