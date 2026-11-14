# Opcode enum (java.lang.classfile)

```java
public enum Opcode
```

Describes the opcodes of the JVM instruction set, as described in JVMS {@jvms 6.5}.
This includes a few pseudo-opcodes modified by {@link #isWide() wide}.
<p>
An opcode describes the operation of an instruction.

@apiNote
The enum constants are named after the opcodes' mnemonics in uppercase.
Wide pseudo-opcodes are named with the original opcodes' mnemonic plus
a {@code _W} suffix. However, {@link #LDC_W ldc_w}, {@link #LDC2_W ldc2_w},
{@link #GOTO_W goto_w}, and {@link #JSR_W jsr_w} are legitimate opcodes
instead of wide pseudo-opcodes.

@see Instruction
@jvms 6.5 Instructions
@since 24

## Opcode.bytecode()

```java
public int bytecode()
```

{@return the opcode value} For {@linkplain #isWide() wide} pseudo-opcodes, returns the
first 2 bytes of the instruction, which are the wide opcode {@code 196} ({@code 0xC4})
and the functional opcode, as a U2 value.

## Opcode.isWide()

```java
public boolean isWide()
```

{@return true if this is a pseudo-opcode modified by wide opcode}
<p>
{@code wide} extends local variable index by additional bytes.

@jvms 6.5.wide <em>wide</em>
@see #ILOAD_W
@see #LLOAD_W
@see #FLOAD_W
@see #DLOAD_W
@see #ALOAD_W
@see #ISTORE_W
@see #LSTORE_W
@see #FSTORE_W
@see #DSTORE_W
@see #ASTORE_W
@see #RET_W
@see #IINC_W

## Opcode.sizeIfFixed()

```java
public int sizeIfFixed()
```

{@return size of the instruction in bytes if fixed, or -1 otherwise} This size includes
the opcode itself.

@see Instruction#sizeInBytes() Instruction::sizeInBytes

## Opcode.kind()

```java
public Kind kind()
```

{@return operation kind}  Each kind of operation has its own modeling
interface to model instructions belonging to that kind.