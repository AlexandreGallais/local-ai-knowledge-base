# LabelTarget interface (java.lang.classfile.instruction)

```java
public sealed interface LabelTarget extends PseudoInstruction permits LabelImpl
```

A pseudo-instruction which indicates that the specified label corresponds to
the current position in the {@code Code} attribute.  Delivered as a {@link
CodeElement} during traversal of the elements of a {@link CodeModel}.
<p>
This can be used to inspect the target position of labels across {@linkplain
CodeTransform transformations}, as {@linkplain CodeAttribute#labelToBci bci}
is not stable.
<p>
When passed to a {@link CodeBuilder}, this pseudo-instruction sets the
specified label to be bound at the current position in the builder.
<p>
By design, {@code LabelTarget} cannot be created by users and can only be
read from a code model.  Use {@link CodeBuilder#labelBinding
CodeBuilder::labelBinding} to bind arbitrary labels to a {@code CodeBuilder}.
<p>
For a {@code CodeBuilder cob}, a {@code LabelTarget lt}, these two calls are
equivalent:
{@snippet lang=java :
cob.with(lt); // @link substring="with" target="CodeBuilder#with"
// @link substring="labelBinding" target="CodeBuilder#labelBinding" :
cob.labelBinding(lt.label()); // @link regex="label(?=\()" target="#label"
}

@see Label
@see CodeBuilder#labelBinding CodeBuilder::labelBinding
@since 24

## LabelTarget.label()

```java
Label label()
```

{@return the label corresponding to this target}