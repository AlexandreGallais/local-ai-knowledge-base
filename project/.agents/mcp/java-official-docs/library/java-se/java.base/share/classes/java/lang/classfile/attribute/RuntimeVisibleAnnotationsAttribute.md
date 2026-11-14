# RuntimeVisibleAnnotationsAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface RuntimeVisibleAnnotationsAttribute extends Attribute<RuntimeVisibleAnnotationsAttribute>, ClassElement, MethodElement, FieldElement permits BoundAttribute.BoundRuntimeVisibleAnnotationsAttribute, UnboundAttribute.UnboundRuntimeVisibleAnnotationsAttribute
```

Models the {@link Attributes#runtimeVisibleAnnotations()
RuntimeVisibleAnnotations} attribute (JVMS {@jvms 4.7.16}), which stores
declaration annotations on this structure that are visible to both
{@code class} file consumers and {@linkplain AnnotatedElement core reflection}.
<p>
This attribute appears on classes, fields, methods, and record components,
and does not permit {@linkplain AttributeMapper#allowMultiple multiple
instances} in one structure.  It has a data dependency on the {@linkplain
AttributeStability#CP_REFS constant pool}.
<p>
The attribute was introduced in the Java SE Platform version 5.0, major
version {@value ClassFile#JAVA_5_VERSION}.

@see Attributes#runtimeVisibleAnnotations()
@see java.compiler/javax.lang.model.element.Element
@see AnnotatedElement
@see ElementType
@see RetentionPolicy#RUNTIME
@jvms 4.7.16 The {@code RuntimeVisibleAnnotations} Attribute
@since 24

## RuntimeVisibleAnnotationsAttribute.annotations()

```java
List<Annotation> annotations()
```

{@return the run-time visible declaration annotations on this structure}

## RuntimeVisibleAnnotationsAttribute.of(List<Annotation>)

```java
static RuntimeVisibleAnnotationsAttribute of(List<Annotation> annotations)
```

{@return a {@code RuntimeVisibleAnnotations} attribute}
@param annotations the annotations

## RuntimeVisibleAnnotationsAttribute.of(Annotation...)

```java
static RuntimeVisibleAnnotationsAttribute of(Annotation... annotations)
```

{@return a {@code RuntimeVisibleAnnotations} attribute}
@param annotations the annotations