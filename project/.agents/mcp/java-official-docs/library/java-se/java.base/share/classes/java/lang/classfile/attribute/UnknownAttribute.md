# UnknownAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface UnknownAttribute extends Attribute<UnknownAttribute>, ClassElement, MethodElement, FieldElement, CodeElement permits BoundAttribute.BoundUnknownAttribute
```

Models an unknown attribute read from a {@code class} file.  An attribute is
unknown if it is not recognized by one of the mappers in {@link Attributes}
and is not recognized by the {@link ClassFile.AttributesProcessingOption}.
<p>
An unknown attribute may appear anywhere where an attribute may appear, and
has an {@linkplain AttributeStability#UNKNOWN unknown} data dependency.

@see CustomAttribute
@since 24

## UnknownAttribute.contents()

```java
byte[] contents()
```

{@return the uninterpreted contents of the attribute payload}