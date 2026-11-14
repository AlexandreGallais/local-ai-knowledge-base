# LineNumber interface (java.lang.classfile.instruction)

```java
public sealed interface LineNumber extends PseudoInstruction permits LineNumberImpl
```

A pseudo-instruction which indicates the code for a given line number starts
after the current position in a {@link CodeAttribute Code} attribute.  This
models a single entry in the {@link LineNumberTableAttribute LineNumberTable}
attribute.  Delivered as a {@link CodeElement} during traversal of the
elements of a {@link CodeModel}, according to the setting of the {@link
ClassFile.LineNumbersOption} option.
<p>
A line number entry is composite:
{@snippet lang=text :
// @link substring="LineNumber" target="#of" :
LineNumber(int line) // @link substring="int line" target="#line"
}
<p>
Another model, {@link LineNumberInfo}, also models a line number entry; it
has no dependency on a {@code CodeModel} and represents of bci values as
{@code int}s instead of order of pseudo-instructions in the elements of a
{@code CodeModel}, and is used as components of a {@link LineNumberTableAttribute}.

@apiNote
Line numbers are represented with custom pseudo-instructions to avoid using
labels, which usually indicate branching targets for the control flow.

@see LineNumberInfo
@see CodeBuilder#lineNumber CodeBuilder::lineNumber
@see ClassFile.LineNumbersOption
@since 24

## LineNumber.line()

```java
int line()
```

{@return the line number}

## LineNumber.of(int)

```java
static LineNumber of(int line)
```

{@return a line number pseudo-instruction}

@param line the line number