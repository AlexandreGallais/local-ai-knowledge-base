# AnnotationDefaultAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface AnnotationDefaultAttribute extends Attribute<AnnotationDefaultAttribute>, MethodElement permits BoundAttribute.BoundAnnotationDefaultAttr, UnboundAttribute.UnboundAnnotationDefaultAttribute
```

Models the {@link Attributes#annotationDefault() AnnotationDefault} attribute
(JVMS {@jvms 4.7.22}), which records the default value (JLS {@jls 9.6.2}) for
the annotation interface element defined by this method.
<p>
This attribute only appears on methods, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a method.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
This attribute was introduced in the Java SE Platform version 5.0, major
version {@value ClassFile#JAVA_5_VERSION}.

@see Attributes#annotationDefault()
@jls 9.6.2 Defaults for Annotation Interface Elements
@jvms 4.7.22 The {@code AnnotationDefault} Attribute
@since 24

## AnnotationDefaultAttribute.defaultValue()

```java
AnnotationValue defaultValue()
```

{@return the default value of the annotation interface element defined by
the enclosing method}

@see Method#getDefaultValue()

## AnnotationDefaultAttribute.of(AnnotationValue)

```java
static AnnotationDefaultAttribute of(AnnotationValue annotationDefault)
```

{@return an {@code AnnotationDefault} attribute}
@param annotationDefault the default value of the annotation interface element