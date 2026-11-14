---
title: "TableSwitchInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/TableSwitchInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TableSwitchInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface TableSwitchInstruction extends Instruction permits AbstractInstruction.BoundTableSwitchInstruction, AbstractInstruction.UnboundTableSwitchInstruction
```

Models a tableswitch instruction in the `code` array of a
`Code` attribute.  Delivered as a `CodeElement` when traversing
the elements of a `CodeModel`.

A table switch instruction is composite:

When read from `class` files, the `cases` may omit cases that
duplicate the default target.  The list is sorted ascending by the caseValue.

When writing to `class` file, the order in the `cases` list does
not matter, as there is only one valid order in the physical representation
of table switch entries.  Treatment of elements in `cases` whose value
is less than `lowValue` or greater than `highValue`, and elements
whose value duplicates that of another, is not specified.

**See also:** Opcode.Kind#TABLE_SWITCH

**See also:** CodeBuilder#tableswitch CodeBuilder::tableswitch

**jvms:** 6.5.tableswitch *tableswitch*

**Since:** 24

## TableSwitchInstruction.lowValue()

```java
int lowValue()
```

## TableSwitchInstruction.highValue()

```java
int highValue()
```

## TableSwitchInstruction.defaultTarget()

```java
Label defaultTarget()
```

## TableSwitchInstruction.cases()

```java
List<SwitchCase> cases()
```

## TableSwitchInstruction.of(int, int, Label, List<SwitchCase>)

```java
static TableSwitchInstruction of(int lowValue, int highValue, Label defaultTarget, List<SwitchCase> cases)
```

Parameters:

- `lowValue`: the low value of the switch target range, inclusive
- `highValue`: the high value of the switch target range, inclusive
- `defaultTarget`: the default target of the switch
- `cases`: the cases of the switch; duplicate or out of bound case handling is not specified
