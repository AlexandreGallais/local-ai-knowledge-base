# FieldInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface FieldInstruction extends Instruction permits AbstractInstruction.BoundFieldInstruction, AbstractInstruction.UnboundFieldInstruction
```

Models a field access instruction in the {@code code} array of a {@code Code}
attribute.  Corresponding opcodes have a {@linkplain Opcode#kind() kind}
of {@link Opcode.Kind#FIELD_ACCESS}.  Delivered as a {@link CodeElement} when
traversing the elements of a {@link CodeModel}.
<p>
A field access instruction is composite:
{@snippet lang=text :
// @link substring="FieldInstruction" target="#of(Opcode, FieldRefEntry)" :
FieldInstruction(
    Opcode opcode, // @link substring="opcode" target="#opcode()"
    FieldRefEntry field, // @link substring="field" target="#field()"
)
}

@see Opcode.Kind#FIELD_ACCESS
@see CodeBuilder#fieldAccess CodeBuilder::fieldAccess
@since 24

## FieldInstruction.field()

```java
FieldRefEntry field()
```

{@return the {@link FieldRefEntry} constant described by this instruction}

## FieldInstruction.owner()

```java
default ClassEntry owner()
```

{@return the class holding the field}

## FieldInstruction.name()

```java
default Utf8Entry name()
```

{@return the name of the field}

## FieldInstruction.type()

```java
default Utf8Entry type()
```

{@return the field descriptor string of the field}

@apiNote
A symbolic descriptor for the type of the field is available through
{@link #typeSymbol() typeSymbol()}.

## FieldInstruction.typeSymbol()

```java
default ClassDesc typeSymbol()
```

{@return a symbolic descriptor for the type of the field}

## FieldInstruction.of(Opcode, FieldRefEntry)

```java
static FieldInstruction of(Opcode op, FieldRefEntry field)
```

{@return a field access instruction}

@param op the opcode for the specific type of field access instruction,
          which must be of kind {@link Opcode.Kind#FIELD_ACCESS}
@param field a constant pool entry describing the field
@throws IllegalArgumentException if the opcode kind is not
        {@link Opcode.Kind#FIELD_ACCESS}.

## FieldInstruction.of(Opcode, ClassEntry, Utf8Entry, Utf8Entry)

```java
static FieldInstruction of(Opcode op, ClassEntry owner, Utf8Entry name, Utf8Entry type)
```

{@return a field access instruction}

@param op the opcode for the specific type of field access instruction,
          which must be of kind {@link Opcode.Kind#FIELD_ACCESS}
@param owner the class holding the field
@param name the name of the field
@param type the field descriptor
@throws IllegalArgumentException if the opcode kind is not
        {@link Opcode.Kind#FIELD_ACCESS}.

## FieldInstruction.of(Opcode, ClassEntry, NameAndTypeEntry)

```java
static FieldInstruction of(Opcode op, ClassEntry owner, NameAndTypeEntry nameAndType)
```

{@return a field access instruction}

@param op the opcode for the specific type of field access instruction,
          which must be of kind {@link Opcode.Kind#FIELD_ACCESS}
@param owner the class holding the field
@param nameAndType the name and field descriptor of the field
@throws IllegalArgumentException if the opcode kind is not
        {@link Opcode.Kind#FIELD_ACCESS}.