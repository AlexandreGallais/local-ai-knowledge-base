# DeprecatedAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface DeprecatedAttribute extends Attribute<DeprecatedAttribute>, ClassElement, MethodElement, FieldElement permits BoundAttribute.BoundDeprecatedAttribute, UnboundAttribute.UnboundDeprecatedAttribute
```

Models the {@link Attributes#deprecated() Deprecated} attribute (JVMS {@jvms
4.7.15}), which indicates this structure has been superseded.
<p>
This attribute can appear on classes, methods, and fields, and permits
{@linkplain AttributeMapper#allowMultiple multiple instances} in a structure.
It has {@linkplain AttributeStability#STATELESS no data dependency}.
<p>
This attribute was introduced in the Java SE Platform version 1.1, major
version {@value ClassFile#JAVA_1_VERSION}.

@apiNote
When this attribute is present, the {@link Deprecated} annotation should
also be present in the {@link RuntimeVisibleAnnotationsAttribute
RuntimeVisibleAnnotations} attribute to provide more obvious alerts.
The reference implementation of the system Java compiler emits this attribute
without the annotation when a {@code @deprecated} tag is present in the
documentation comments without the annotation.

@see Attributes#deprecated()
@see Deprecated
@jvms 4.7.15 The {@code Deprecated} Attribute
@since 24

## DeprecatedAttribute.of()

```java
static DeprecatedAttribute of()
```

{@return a {@code Deprecated} attribute}