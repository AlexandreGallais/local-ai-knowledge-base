# DiscontinuedInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface DiscontinuedInstruction extends Instruction
```

Marker interface for instruction discontinued from the {@code code} array of
a {@code Code} attribute.  Delivered as a {@link CodeElement} when traversing
the elements of a {@link CodeModel}.

@apiNote
While most instructions have convenience factory methods in {@link
CodeBuilder}, discontinued instructions can only be supplied to code builders
explicitly with {@link CodeBuilder#with CodeBuilder::with} to discourage
their use.

@jvms 4.9.1 Static Constraints
@sealedGraph
@since 24

## DiscontinuedInstruction.target()

```java
Label target()
```

{@return the target of the jump subroutine instruction}

## DiscontinuedInstruction.of(Opcode, Label)

```java
static JsrInstruction of(Opcode op, Label target)
```

{@return a jump subroutine instruction}

@apiNote
The explicit {@code op} argument allows creating {@link Opcode#JSR_W
jsr_w} instructions to avoid short jumps.

@param op the opcode for the specific type of jump subroutine instruction,
          which must be of kind {@link Opcode.Kind#DISCONTINUED_JSR}
@param target target label of the subroutine
@throws IllegalArgumentException if the opcode kind is not
        {@link Opcode.Kind#DISCONTINUED_JSR}.

## DiscontinuedInstruction.of(Label)

```java
static JsrInstruction of(Label target)
```

{@return a jump subroutine instruction}

@param target target label of the subroutine

## DiscontinuedInstruction.slot()

```java
int slot()
```

{@return the local variable slot with return address}
The value is within {@code [0, 65535]}.

## DiscontinuedInstruction.of(Opcode, int)

```java
static RetInstruction of(Opcode op, int slot)
```

{@return a return from subroutine instruction}
<p>
{@code slot} must be in the closed range of {@code [0, 255]} for
{@link Opcode#RET ret}, or within {@code [0, 65535]} for {@link
Opcode#RET_W wide ret}.

@apiNote
The explicit {@code op} argument allows creating {@code wide ret}
instructions with {@code slot} in the range of regular {@code ret}
instructions.

@param op the opcode for the specific type of return from subroutine instruction,
          which must be of kind {@link Opcode.Kind#DISCONTINUED_RET}
@param slot the local variable slot to load return address from
@throws IllegalArgumentException if the opcode kind is not
        {@link Opcode.Kind#DISCONTINUED_RET} or if {@code slot} is out of range

## DiscontinuedInstruction.of(int)

```java
static RetInstruction of(int slot)
```

{@return a return from subroutine instruction}
<p>
{@code slot} must be within {@code [0, 65535]}.

@param slot the local variable slot to load return address from
@throws IllegalArgumentException if {@code slot} is out of range