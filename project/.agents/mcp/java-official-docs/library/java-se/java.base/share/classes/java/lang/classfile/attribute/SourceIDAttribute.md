# SourceIDAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface SourceIDAttribute extends Attribute<SourceIDAttribute>, ClassElement permits BoundAttribute.BoundSourceIDAttribute, UnboundAttribute.UnboundSourceIDAttribute
```

Models the {@link Attributes#sourceId() SourceID} attribute, which records
the last modified time of the source file from which this {@code class} file
was compiled.
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
This attribute is not predefined in the Java SE Platform.  This is a
JDK-specific nonstandard attribute produced by the reference implementation
of the system Java compiler, defined by the {@code jdk.compiler} module.

@see Attributes#sourceId()
@see CompilationIDAttribute
@see CharacterRangeTableAttribute
@since 24

## SourceIDAttribute.sourceId()

```java
Utf8Entry sourceId()
```

{@return the source id}  The source id is the last modified time of the
source file (as reported by the file system, in milliseconds) when this
{@code class} file is compiled.

## SourceIDAttribute.of(Utf8Entry)

```java
static SourceIDAttribute of(Utf8Entry sourceId)
```

{@return a {@code SourceID} attribute}

@param sourceId the source id

## SourceIDAttribute.of(String)

```java
static SourceIDAttribute of(String sourceId)
```

{@return a {@code SourceID} attribute}

@param sourceId the source id