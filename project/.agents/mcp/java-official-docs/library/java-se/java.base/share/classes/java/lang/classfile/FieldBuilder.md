# FieldBuilder interface (java.lang.classfile)

```java
public sealed interface FieldBuilder extends ClassFileBuilder<FieldElement, FieldBuilder> permits TerminalFieldBuilder, ChainedFieldBuilder
```

A builder for fields.  The main way to obtain a field builder is via {@link
ClassBuilder#withField(String, ClassDesc, Consumer)}.  The {@linkplain
ClassBuilder#withField(String, ClassDesc, int) access flag overload} is
useful if no attribute needs to be configured, skipping the handler.
<p>
Refer to {@link ClassFileBuilder} for general guidance and caution around
the use of builders for structures in the {@code class} file format.

@see ClassBuilder#withField(String, ClassDesc, Consumer)
@see FieldModel
@see FieldTransform
@since 24

## FieldBuilder.withFlags(int)

```java
default FieldBuilder withFlags(int flags)
```

Sets the field access flags.

@param flags the access flags, as a bit mask
@return this builder
@see AccessFlags
@see AccessFlag.Location#FIELD
@see ClassBuilder#withField(String, ClassDesc, int)

## FieldBuilder.withFlags(AccessFlag...)

```java
default FieldBuilder withFlags(AccessFlag... flags)
```

Sets the field access flags.

@param flags the access flags, as a bit mask
@return this builder
@see AccessFlags
@see AccessFlag.Location#FIELD
@see ClassBuilder#withField(String, ClassDesc, int)