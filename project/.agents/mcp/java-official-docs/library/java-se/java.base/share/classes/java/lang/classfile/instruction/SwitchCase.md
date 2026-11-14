# SwitchCase interface (java.lang.classfile.instruction)

```java
public sealed interface SwitchCase permits AbstractInstruction.SwitchCaseImpl
```

Models a single case in a {@link LookupSwitchInstruction lookupswitch} or
{@link TableSwitchInstruction tableswitch} instruction.
<p>
A switch case is composite:
{@snippet lang=text :
// @link substring="SwitchCase" target="#of" :
SwitchCase(
    int caseValue, // @link substring="caseValue" target="#caseValue"
    Label target // @link substring="target" target="#target"
)
}

@see LookupSwitchInstruction
@see TableSwitchInstruction
@since 24

## SwitchCase.caseValue()

```java
int caseValue()
```

{@return the integer value corresponding to this case}

## SwitchCase.target()

```java
Label target()
```

{@return the branch target corresponding to this case}

## SwitchCase.of(int, Label)

```java
static SwitchCase of(int caseValue, Label target)
```

{@return a new switch case}

@param caseValue the integer value for the case
@param target the branch target for the case