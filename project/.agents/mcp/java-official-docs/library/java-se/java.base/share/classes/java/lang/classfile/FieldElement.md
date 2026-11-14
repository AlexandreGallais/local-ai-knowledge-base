# FieldElement interface (java.lang.classfile)

```java
public sealed interface FieldElement extends ClassFileElement permits AccessFlags, CustomAttribute, ConstantValueAttribute, DeprecatedAttribute, RuntimeInvisibleAnnotationsAttribute, RuntimeInvisibleTypeAnnotationsAttribute, RuntimeVisibleAnnotationsAttribute, RuntimeVisibleTypeAnnotationsAttribute, SignatureAttribute, SyntheticAttribute, UnknownAttribute
```

Marker interface for a member element of a {@link FieldModel}.  Such an
element can appear when traversing a {@link FieldModel} unless otherwise
specified, be supplied to a {@link FieldBuilder}, and be processed by a
{@link FieldTransform}.
<p>
{@link AccessFlags} is the only member element of a field that appear exactly
once during the traversal of a {@link FieldModel}.

@see ClassFileElement##membership Membership Elements
@see ClassElement
@see MethodElement
@see CodeElement
@sealedGraph
@since 24