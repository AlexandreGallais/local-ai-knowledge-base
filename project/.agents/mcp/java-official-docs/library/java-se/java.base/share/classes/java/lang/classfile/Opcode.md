---
title: "Opcode enum (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/Opcode.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Opcode enum (java.lang.classfile)

```java
public enum Opcode
```

Describes the opcodes of the JVM instruction set, as described in JVMS .
This includes a few pseudo-opcodes modified by wide.

An opcode describes the operation of an instruction.

**API note:** The enum constants are named after the opcodes' mnemonics in uppercase.
Wide pseudo-opcodes are named with the original opcodes' mnemonic plus
a `_W` suffix. However, ldc_w, ldc2_w,
goto_w, and jsr_w are legitimate opcodes
instead of wide pseudo-opcodes.

**See also:** Instruction

**jvms:** 6.5 Instructions

**Since:** 24

## Opcode.bytecode()

```java
public int bytecode()
```

For wide pseudo-opcodes, returns the
first 2 bytes of the instruction, which are the wide opcode `196` (`0xC4`)
and the functional opcode, as a U2 value.

## Opcode.isWide()

```java
public boolean isWide()
```

`wide` extends local variable index by additional bytes.

**jvms:** 6.5.wide *wide*

**See also:** #ILOAD_W

**See also:** #LLOAD_W

**See also:** #FLOAD_W

**See also:** #DLOAD_W

**See also:** #ALOAD_W

**See also:** #ISTORE_W

**See also:** #LSTORE_W

**See also:** #FSTORE_W

**See also:** #DSTORE_W

**See also:** #ASTORE_W

**See also:** #RET_W

**See also:** #IINC_W

## Opcode.sizeIfFixed()

```java
public int sizeIfFixed()
```

This size includes
the opcode itself.

**See also:** Instruction#sizeInBytes() Instruction::sizeInBytes

## Opcode.kind()

```java
public Kind kind()
```

Each kind of operation has its own modeling
interface to model instructions belonging to that kind.
