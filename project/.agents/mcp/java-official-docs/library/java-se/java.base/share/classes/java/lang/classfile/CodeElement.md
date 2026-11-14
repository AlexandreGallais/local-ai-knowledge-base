# CodeElement interface (java.lang.classfile)

```java
public sealed interface CodeElement extends ClassFileElement permits Instruction, PseudoInstruction, CustomAttribute, RuntimeVisibleTypeAnnotationsAttribute, RuntimeInvisibleTypeAnnotationsAttribute, StackMapTableAttribute, UnknownAttribute
```

Marker interface for a member element of a {@link CodeModel}.  Such an
element can appear when traversing a {@link CodeModel} unless otherwise
specified, be supplied to a {@link CodeBuilder}, and be processed by a
{@link CodeTransform}.
<p>
Code elements can be categorized into {@link Instruction}, {@link
PseudoInstruction}, and {@link Attribute}.  Unlike in other {@link
CompoundElement}, the order of elements for all {@link Instruction}s and some
{@link PseudoInstruction}s is significant.

@see ClassFileElement##membership Membership Elements
@see ClassElement
@see MethodElement
@see FieldElement
@sealedGraph
@since 24