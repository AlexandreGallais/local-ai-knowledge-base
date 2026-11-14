# TableSwitchInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface TableSwitchInstruction extends Instruction permits AbstractInstruction.BoundTableSwitchInstruction, AbstractInstruction.UnboundTableSwitchInstruction
```

Models a {@link Opcode#TABLESWITCH tableswitch} instruction in the {@code code} array of a
{@code Code} attribute.  Delivered as a {@link CodeElement} when traversing
the elements of a {@link CodeModel}.
<p>
A table switch instruction is composite:
{@snippet lang=text :
// @link substring="TableSwitchInstruction" target="#of" :
TableSwitchInstruction(
    int lowValue, // @link substring="int lowValue" target="#lowValue"
    int highValue, // @link substring="int highValue" target="#highValue"
    Label defaultTarget, // @link substring="defaultTarget" target="#defaultTarget"
    List<SwitchCase> cases // @link substring="cases" target="#cases()"
)
}
<p>
When read from {@code class} files, the {@code cases} may omit cases that
duplicate the default target.  The list is sorted ascending by the {@link
SwitchCase#caseValue() caseValue}.
<p>
When writing to {@code class} file, the order in the {@code cases} list does
not matter, as there is only one valid order in the physical representation
of table switch entries.  Treatment of elements in {@code cases} whose value
is less than {@code lowValue} or greater than {@code highValue}, and elements
whose value duplicates that of another, is not specified.

@see Opcode.Kind#TABLE_SWITCH
@see CodeBuilder#tableswitch CodeBuilder::tableswitch
@jvms 6.5.tableswitch <em>tableswitch</em>
@since 24

## TableSwitchInstruction.lowValue()

```java
int lowValue()
```

{@return the low value of the switch target range, inclusive}

## TableSwitchInstruction.highValue()

```java
int highValue()
```

{@return the high value of the switch target range, inclusive}

## TableSwitchInstruction.defaultTarget()

```java
Label defaultTarget()
```

{@return the default target of the switch}

## TableSwitchInstruction.cases()

```java
List<SwitchCase> cases()
```

{@return the cases of the switch}

## TableSwitchInstruction.of(int, int, Label, List<SwitchCase>)

```java
static TableSwitchInstruction of(int lowValue, int highValue, Label defaultTarget, List<SwitchCase> cases)
```

{@return a table switch instruction}

@param lowValue the low value of the switch target range, inclusive
@param highValue the high value of the switch target range, inclusive
@param defaultTarget the default target of the switch
@param cases the cases of the switch; duplicate or out of bound case
             handling is not specified