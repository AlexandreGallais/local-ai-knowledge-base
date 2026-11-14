# FieldModel interface (java.lang.classfile)

```java
public sealed interface FieldModel extends CompoundElement<FieldElement>, AttributedElement, ClassElement permits BufferedFieldBuilder.Model, FieldImpl
```

Models a field.  A field can be viewed as a {@linkplain CompoundElement
composition} of {@link FieldElement}s, or by random access via accessor
methods if only specific parts of the field is needed.
<p>
Fields can be obtained from {@link ClassModel#fields()}, or in the traversal
of member elements of a class.
<p>
{@link ClassBuilder#withField(String, ClassDesc, Consumer)} is the main way
to construct fields.  {@link ClassBuilder#transformField} allows creating a
new field by selectively processing the original field elements and directing
the results to a field builder.
<p>
All field attributes are accessible as member elements.

@see ClassModel#fields()
@see FieldTransform
@jvms 4.5 Fields
@since 24

## FieldModel.flags()

```java
AccessFlags flags()
```

{@return the access flags}

@see AccessFlag.Location#FIELD

## FieldModel.parent()

```java
Optional<ClassModel> parent()
```

{@return the class model this field is a member of, if known}

## FieldModel.fieldName()

```java
Utf8Entry fieldName()
```

{@return the name of this field}

## FieldModel.fieldType()

```java
Utf8Entry fieldType()
```

{@return the field descriptor string of this field}

## FieldModel.fieldTypeSymbol()

```java
default ClassDesc fieldTypeSymbol()
```

{@return the field type, as a symbolic descriptor}