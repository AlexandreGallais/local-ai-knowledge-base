---
title: "SwitchCase interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/SwitchCase.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SwitchCase interface (java.lang.classfile.instruction)

```java
public sealed interface SwitchCase permits AbstractInstruction.SwitchCaseImpl
```

Models a single case in a lookupswitch or
tableswitch instruction.

A switch case is composite:

**See also:** LookupSwitchInstruction

**See also:** TableSwitchInstruction

**Since:** 24

## SwitchCase.caseValue()

```java
int caseValue()
```

## SwitchCase.target()

```java
Label target()
```

## SwitchCase.of(int, Label)

```java
static SwitchCase of(int caseValue, Label target)
```

Parameters:

- `caseValue`: the integer value for the case
- `target`: the branch target for the case
