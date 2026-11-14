# InnerClassesAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface InnerClassesAttribute extends Attribute<InnerClassesAttribute>, ClassElement permits BoundAttribute.BoundInnerClassesAttribute, UnboundAttribute.UnboundInnerClassesAttribute
```

Models the {@link Attributes#innerClasses() InnerClasses} attribute (JVMS
{@jvms 4.7.6}), which records which classes referenced by this {@code class}
file are nested classes.
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
The attribute was introduced in the Java SE Platform version 1.1, major
version {@value ClassFile#JAVA_1_VERSION}.

@see Attributes#innerClasses()
@jvms 4.7.6 The {@code InnerClasses} Attribute
@since 24

## InnerClassesAttribute.classes()

```java
List<InnerClassInfo> classes()
```

{@return the nested classes used by this {@code class} file}

## InnerClassesAttribute.of(List<InnerClassInfo>)

```java
static InnerClassesAttribute of(List<InnerClassInfo> innerClasses)
```

{@return an {@code InnerClasses} attribute}
@param innerClasses descriptions of the nested classes

## InnerClassesAttribute.of(InnerClassInfo...)

```java
static InnerClassesAttribute of(InnerClassInfo... innerClasses)
```

{@return an {@code InnerClasses} attribute}
@param innerClasses descriptions of the nested classes