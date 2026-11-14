# CustomAttribute class (java.lang.classfile)

```java
public abstract non-sealed class CustomAttribute<T extends CustomAttribute<T>> implements Attribute<T>, CodeElement, ClassElement, MethodElement, FieldElement
```

Models a user-defined attribute in a {@code class} file.  API models for
user-defined attributes should extend this class.  A user-defined attribute
should also have an {@link AttributeMapper} defined, which will be returned
by {@link #attributeMapper}, and registered to the {@link
ClassFile.AttributeMapperOption} so the user-defined attributes can be read.
<p>
Accessor methods on user-defined attributes read from {@code class} files
may throw {@link IllegalArgumentException} if the attribute model is lazily
evaluated, and the evaluation encounters malformed {@code class} file format
for the attribute.

@param <T> the custom attribute type
@see java.lang.classfile.attribute
@since 24

## CustomAttribute.CustomAttribute(AttributeMapper<T>)

```java
protected CustomAttribute(AttributeMapper<T> mapper)
```

Constructor for subclasses to call.

@param mapper the attribute mapper

## CustomAttribute.attributeName()

```java
public Utf8Entry attributeName()
```

{@inheritDoc}

@implSpec
The default implementation returns a {@code Utf8Entry} suitable for
writing only, which may be {@linkplain PoolEntry##unbound unbound}.
Subclasses representing attributes read from {@code class} files must
override this method.

@see AttributeMapper#readAttribute