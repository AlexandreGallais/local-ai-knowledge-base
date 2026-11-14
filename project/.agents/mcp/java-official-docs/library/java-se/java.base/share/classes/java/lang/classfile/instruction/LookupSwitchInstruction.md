---
title: "LookupSwitchInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/LookupSwitchInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LookupSwitchInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface LookupSwitchInstruction extends Instruction permits AbstractInstruction.BoundLookupSwitchInstruction, AbstractInstruction.UnboundLookupSwitchInstruction
```

Models a lookupswitch instruction in the `code` array of a `Code` attribute.  Delivered as a `CodeElement`
when traversing the elements of a `CodeModel`.

A lookup switch instruction is composite:

If elements in `cases` are not sorted ascending by their caseValue, a sorted version of the `cases` list
will be written instead.

**See also:** Opcode.Kind#LOOKUP_SWITCH

**See also:** CodeBuilder#lookupswitch CodeBuilder::lookupswitch

**jvms:** 6.5.lookupswitch *lookupswitch*

**Since:** 24

## LookupSwitchInstruction.defaultTarget()

```java
Label defaultTarget()
```

## LookupSwitchInstruction.cases()

```java
List<SwitchCase> cases()
```

## LookupSwitchInstruction.of(Label, List<SwitchCase>)

```java
static LookupSwitchInstruction of(Label defaultTarget, List<SwitchCase> cases)
```

Parameters:

- `defaultTarget`: the default target of the switch
- `cases`: the cases of the switch
