# InvokeDynamicInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface InvokeDynamicInstruction extends Instruction permits AbstractInstruction.BoundInvokeDynamicInstruction, AbstractInstruction.UnboundInvokeDynamicInstruction
```

Models a dynamically-computed call site invocation instruction in the
{@code code} array of a {@code Code} attribute.  The corresponding opcode is
{@link Opcode#INVOKEDYNAMIC invokedynamic}.  Delivered as a {@link
CodeElement} when traversing the elements of a {@link CodeModel}.
<p>
A dynamically-computed call site invocation instruction is composite:
{@snippet lang=text :
// @link substring="InvokeDynamicInstruction" target="#of" :
InvokeDynamicInstruction(InvokeDynamicEntry invokedynamic) // @link substring="invokedynamic" target="#invokedynamic()"
}

@see Opcode.Kind#INVOKE_DYNAMIC
@see CodeBuilder#invokedynamic CodeBuilder::invokedynamic
@jvms 6.5.invokedynamic <em>invokedynamic</em>
@since 24

## InvokeDynamicInstruction.invokedynamic()

```java
InvokeDynamicEntry invokedynamic()
```

{@return an {@link InvokeDynamicEntry} describing the call site}

## InvokeDynamicInstruction.name()

```java
default Utf8Entry name()
```

{@return the invocation name of the call site}

## InvokeDynamicInstruction.type()

```java
default Utf8Entry type()
```

{@return the invocation type of the call site}

@apiNote
A symbolic descriptor for the invocation typeis available through {@link
#typeSymbol() typeSymbol()}.

## InvokeDynamicInstruction.typeSymbol()

```java
default MethodTypeDesc typeSymbol()
```

{@return the invocation type of the call site, as a symbolic descriptor}

## InvokeDynamicInstruction.bootstrapMethod()

```java
default DirectMethodHandleDesc bootstrapMethod()
```

{@return the bootstrap method of the call site}

## InvokeDynamicInstruction.bootstrapArgs()

```java
default List<ConstantDesc> bootstrapArgs()
```

{@return the bootstrap arguments of the call site}

## InvokeDynamicInstruction.of(InvokeDynamicEntry)

```java
static InvokeDynamicInstruction of(InvokeDynamicEntry invokedynamic)
```

{@return an invokedynamic instruction}

@param invokedynamic the constant pool entry describing the call site