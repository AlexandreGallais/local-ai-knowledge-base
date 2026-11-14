# CompilationIDAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface CompilationIDAttribute extends Attribute<CompilationIDAttribute>, ClassElement permits BoundAttribute.BoundCompilationIDAttribute, UnboundAttribute.UnboundCompilationIDAttribute
```

Models the {@link Attributes#compilationId() CompilationID} attribute, which
records the compilation time of the {@code class} file.
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
This attribute is not predefined in the Java SE Platform.  This is a
JDK-specific nonstandard attribute produced by the reference implementation
of the system Java compiler, defined by the {@code jdk.compiler} module.

@see Attributes#compilationId()
@see CharacterRangeTableAttribute
@see SourceIDAttribute
@since 24

## CompilationIDAttribute.compilationId()

```java
Utf8Entry compilationId()
```

{@return the compilation ID}  The compilation ID is the string value of
{@link System#currentTimeMillis()} when the {@code class} file is generated.

## CompilationIDAttribute.of(Utf8Entry)

```java
static CompilationIDAttribute of(Utf8Entry id)
```

{@return a {@code CompilationID} attribute}
@param id the compilation ID

## CompilationIDAttribute.of(String)

```java
static CompilationIDAttribute of(String id)
```

{@return a {@code CompilationID} attribute}
@param id the compilation ID