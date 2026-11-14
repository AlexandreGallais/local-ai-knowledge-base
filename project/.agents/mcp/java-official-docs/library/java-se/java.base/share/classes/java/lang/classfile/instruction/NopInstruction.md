# NopInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface NopInstruction extends Instruction permits AbstractInstruction.UnboundNopInstruction
```

Models a {@link Opcode#NOP nop} instruction in the {@code code}
array of a {@code Code} attribute.  Delivered as a {@link CodeElement}
when traversing the elements of a {@link CodeModel}.
<p>
A no-op instruction has no visible state.

@see CodeBuilder#nop CodeBuilder::nop
@jvms 6.5.nop <em>nop</em>
@since 24

## NopInstruction.of()

```java
static NopInstruction of()
```

{@return a no-op instruction}