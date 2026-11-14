# LookupSwitchInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface LookupSwitchInstruction extends Instruction permits AbstractInstruction.BoundLookupSwitchInstruction, AbstractInstruction.UnboundLookupSwitchInstruction
```

Models a {@link Opcode#LOOKUPSWITCH lookupswitch} instruction in the {@code
code} array of a {@code Code} attribute.  Delivered as a {@link CodeElement}
when traversing the elements of a {@link CodeModel}.
<p>
A lookup switch instruction is composite:
{@snippet lang=text :
// @link substring="LookupSwitchInstruction" target="#of" :
LookupSwitchInstruction(
    Label defaultTarget, // @link substring="defaultTarget" target="#defaultTarget"
    List<SwitchCase> cases // @link substring="cases" target="#cases()"
)
}
If elements in {@code cases} are not sorted ascending by their {@link
SwitchCase#caseValue caseValue}, a sorted version of the {@code cases} list
will be written instead.

@see Opcode.Kind#LOOKUP_SWITCH
@see CodeBuilder#lookupswitch CodeBuilder::lookupswitch
@jvms 6.5.lookupswitch <em>lookupswitch</em>
@since 24

## LookupSwitchInstruction.defaultTarget()

```java
Label defaultTarget()
```

{@return the target of the default case}

## LookupSwitchInstruction.cases()

```java
List<SwitchCase> cases()
```

{@return the cases of the switch}

## LookupSwitchInstruction.of(Label, List<SwitchCase>)

```java
static LookupSwitchInstruction of(Label defaultTarget, List<SwitchCase> cases)
```

{@return a lookup switch instruction}

@param defaultTarget the default target of the switch
@param cases the cases of the switch