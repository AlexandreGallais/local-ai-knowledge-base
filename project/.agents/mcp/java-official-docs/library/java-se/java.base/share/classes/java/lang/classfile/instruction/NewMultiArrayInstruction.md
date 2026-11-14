# NewMultiArrayInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface NewMultiArrayInstruction extends Instruction permits AbstractInstruction.BoundNewMultidimensionalArrayInstruction, AbstractInstruction.UnboundNewMultidimensionalArrayInstruction
```

Models a {@link Opcode#MULTIANEWARRAY multianewarray} instruction in the {@code code}
array of a {@code Code} attribute.  Delivered as a {@link CodeElement}
when traversing the elements of a {@link CodeModel}.
<p>
A new multi-dimensional array instruction is composite:
{@snippet lang=text :
// @link substring="NewMultiArrayInstruction" target="#of" :
NewMultiArrayInstruction(
    ClassEntry arrayType, // @link substring="arrayType" target="#arrayType"
    int dimensions // @link substring="dimensions" target="#dimensions"
)
}
where the {@code arrayType} is an array class.

@see Opcode.Kind#NEW_MULTI_ARRAY
@see CodeBuilder#multianewarray CodeBuilder::multianewarray
@jvms 6.5.multianewarray <em>multianewarray</em>
@since 24

## NewMultiArrayInstruction.arrayType()

```java
ClassEntry arrayType()
```

{@return the type of the array}

## NewMultiArrayInstruction.dimensions()

```java
int dimensions()
```

{@return the number of dimensions of the array}

## NewMultiArrayInstruction.of(ClassEntry, int)

```java
static NewMultiArrayInstruction of(ClassEntry arrayTypeEntry, int dimensions)
```

{@return a new multi-dimensional array instruction}

@param arrayTypeEntry the type of the array
@param dimensions the number of dimensions of the array
@throws IllegalArgumentException if {@code dimensions} is out of range