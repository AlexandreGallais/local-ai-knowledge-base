# ThrowInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface ThrowInstruction extends Instruction permits AbstractInstruction.UnboundThrowInstruction
```

Models an {@link Opcode#ATHROW athrow} instruction in the {@code code} array of a
{@code Code} attribute.  Delivered as a {@link CodeElement} when traversing
the elements of a {@link CodeModel}.
<p>
A throw instruction has no visible state.

@see Opcode.Kind#THROW_EXCEPTION
@see CodeBuilder#athrow CodeBuiler::athrow
@since 24

## ThrowInstruction.of()

```java
static ThrowInstruction of()
```

{@return a throw instruction}