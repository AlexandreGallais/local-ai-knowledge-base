# RecordAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface RecordAttribute extends Attribute<RecordAttribute>, ClassElement permits BoundAttribute.BoundRecordAttribute, UnboundAttribute.UnboundRecordAttribute
```

Models the {@link Attributes#record() Record} attribute (JVMS {@jvms 4.7.30}),
which indicates that this class is a record class and the record
components.
<p>
This attribute only appears on classes, and does not permit {@linkplain
AttributeMapper#allowMultiple multiple instances} in a class.  It has a
data dependency on the {@linkplain AttributeStability#CP_REFS constant pool}.
<p>
The attribute was introduced in the Java SE Platform version 16, major
version {@value ClassFile#JAVA_16_VERSION}.

@see Attributes#record()
@see Class#isRecord()
@see Class#getRecordComponents()
@jvms 4.7.30 The {@code Record} Attribute
@since 24

## RecordAttribute.components()

```java
List<RecordComponentInfo> components()
```

{@return the components of this record class}

@see Class#getRecordComponents()

## RecordAttribute.of(List<RecordComponentInfo>)

```java
static RecordAttribute of(List<RecordComponentInfo> components)
```

{@return a {@code Record} attribute}

@param components the record components

## RecordAttribute.of(RecordComponentInfo...)

```java
static RecordAttribute of(RecordComponentInfo... components)
```

{@return a {@code Record} attribute}

@param components the record components