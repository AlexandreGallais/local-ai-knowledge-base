# ConstantValueAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ConstantValueAttribute extends Attribute<ConstantValueAttribute>, FieldElement permits BoundAttribute.BoundConstantValueAttribute, UnboundAttribute.UnboundConstantValueAttribute
```

Models the {@link Attributes#constantValue() ConstantValue} attribute (JVMS
{@jvms 4.7.2}), which indicates this field's value is a constant and that
constant value.
<p>
This attribute only appears on fields, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a field.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
This attribute was introduced in the Java Platform version 1.0.2, major
version {@value ClassFile#JAVA_1_VERSION}.

@see Attributes#constantValue()
@jvms 4.7.2 The {@code ConstantValue} Attribute
@since 24

## ConstantValueAttribute.constant()

```java
ConstantValueEntry constant()
```

{@return the constant value of the field}

## ConstantValueAttribute.of(ConstantValueEntry)

```java
static ConstantValueAttribute of(ConstantValueEntry value)
```

{@return a {@code ConstantValue} attribute}
@param value the constant value

## ConstantValueAttribute.of(ConstantDesc)

```java
static ConstantValueAttribute of(ConstantDesc value)
```

{@return a {@code ConstantValue} attribute}
@param value the constant value