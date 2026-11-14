# MonitorInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface MonitorInstruction extends Instruction permits AbstractInstruction.UnboundMonitorInstruction
```

Models a {@link Opcode#MONITORENTER monitorenter} or {@link Opcode#MONITOREXIT
monitorexit} instruction in the {@code code} array of a {@code Code} attribute.
Corresponding opcodes have a {@linkplain Opcode#kind() kind} of {@link
Opcode.Kind#MONITOR}.  Delivered as a {@link CodeElement} when traversing the
elements of a {@link CodeModel}.
<p>
A monitor instruction is composite:
{@snippet lang=text :
// @link substring="MonitorInstruction" target="#of(Opcode)" :
MonitorInstruction(Opcode opcode) // @link substring="opcode" target="#opcode"
}

@since 24

## MonitorInstruction.of(Opcode)

```java
static MonitorInstruction of(Opcode op)
```

{@return a monitor instruction}

@param op the opcode for the specific type of monitor instruction,
          which must be of kind {@link Opcode.Kind#MONITOR}
@throws IllegalArgumentException if the opcode kind is not
        {@link Opcode.Kind#MONITOR}.