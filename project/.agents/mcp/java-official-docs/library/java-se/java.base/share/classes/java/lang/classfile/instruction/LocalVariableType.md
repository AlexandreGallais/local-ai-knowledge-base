# LocalVariableType interface (java.lang.classfile.instruction)

```java
public sealed interface LocalVariableType extends PseudoInstruction permits AbstractPseudoInstruction.UnboundLocalVariableType, BoundLocalVariableType
```

A pseudo-instruction which models a single entry in the {@link
LocalVariableTypeTableAttribute LocalVariableTypeTable} attribute.  Delivered
as a {@link CodeElement} during traversal of the elements of a {@link CodeModel},
according to the setting of the {@link ClassFile.DebugElementsOption} option.
<p>
A local variable type entry is composite:
{@snippet lang=text :
// @link substring="LocalVariableType" target="#of(int, String, Signature, Label, Label)" :
LocalVariableType(
    int slot, // @link substring="slot" target="#slot"
    String name, // @link substring="name" target="#name"
    Signature signature, // @link substring="signature" target="#signatureSymbol"
    Label startScope, // @link substring="startScope" target="#startScope"
    Label endScope // @link substring="endScope" target="#endScope"
)
}
Where {@code slot} is within {@code [0, 65535]}.
<p>
Another model, {@link LocalVariableTypeInfo}, also models a local variable
type entry; it has no dependency on a {@code CodeModel} and represents of bci
values as {@code int}s instead of {@code Label}s, and is used as components
of a {@link LocalVariableTypeTableAttribute}.

@apiNote
{@code LocalVariableType} is used if a local variable has a parameterized
type, a type argument, or an array type of one of the previous types as its
type.  A {@link LocalVariable} with the erased type should still be created
for that local variable.

@see LocalVariableTypeInfo
@see CodeBuilder#localVariableType CodeBuilder::localVariableType
@see ClassFile.DebugElementsOption
@since 24

## LocalVariableType.slot()

```java
int slot()
```

{@return the local variable slot}
The value is within {@code [0, 65535]}.

## LocalVariableType.name()

```java
Utf8Entry name()
```

{@return the local variable name}

## LocalVariableType.signature()

```java
Utf8Entry signature()
```

{@return the local variable generic signature string}

@apiNote
A symbolic generic signature of the local variable is available
through {@link #signatureSymbol() signatureSymbol()}.

## LocalVariableType.signatureSymbol()

```java
default Signature signatureSymbol()
```

{@return the local variable generic signature}

## LocalVariableType.startScope()

```java
Label startScope()
```

{@return the start range of the local variable scope}

## LocalVariableType.endScope()

```java
Label endScope()
```

{@return the end range of the local variable scope}

## LocalVariableType.of(int, Utf8Entry, Utf8Entry, Label, Label)

```java
static LocalVariableType of(int slot, Utf8Entry nameEntry, Utf8Entry signatureEntry, Label startScope, Label endScope)
```

{@return a local variable type pseudo-instruction}
{@code slot} must be within {@code [0, 65535]}.

@param slot the local variable slot
@param nameEntry the local variable name
@param signatureEntry the local variable signature
@param startScope the start range of the local variable scope
@param endScope the end range of the local variable scope
@throws IllegalArgumentException if {@code slot} is out of range

## LocalVariableType.of(int, String, Signature, Label, Label)

```java
static LocalVariableType of(int slot, String name, Signature signature, Label startScope, Label endScope)
```

{@return a local variable type pseudo-instruction}
{@code slot} must be within {@code [0, 65535]}.

@param slot the local variable slot
@param name the local variable name
@param signature the local variable signature
@param startScope the start range of the local variable scope
@param endScope the end range of the local variable scope
@throws IllegalArgumentException if {@code slot} is out of range