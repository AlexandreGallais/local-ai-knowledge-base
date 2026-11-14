# MethodElement interface (java.lang.classfile)

```java
public sealed interface MethodElement extends ClassFileElement permits AccessFlags, CodeModel, CustomAttribute, AnnotationDefaultAttribute, DeprecatedAttribute, ExceptionsAttribute, MethodParametersAttribute, RuntimeInvisibleAnnotationsAttribute, RuntimeInvisibleParameterAnnotationsAttribute, RuntimeInvisibleTypeAnnotationsAttribute, RuntimeVisibleAnnotationsAttribute, RuntimeVisibleParameterAnnotationsAttribute, RuntimeVisibleTypeAnnotationsAttribute, SignatureAttribute, SyntheticAttribute, UnknownAttribute
```

Marker interface for a member element of a {@link MethodModel}.  Such an
element can appear when traversing a {@link MethodModel} unless otherwise
specified, be supplied to a {@link MethodBuilder}, and be processed by a
{@link MethodTransform}.
<p>
{@link AccessFlags} is the only member element of a method that appear
exactly once during the traversal of a {@link MethodModel}.

@see ClassFileElement##membership Membership Elements
@see ClassElement
@see FieldElement
@see CodeElement
@sealedGraph
@since 24