# RecordComponentInfo interface (java.lang.classfile.attribute)

```java
public sealed interface RecordComponentInfo extends AttributedElement permits BoundRecordComponentInfo, UnboundAttribute.UnboundRecordComponentInfo
```

Models a single record component in the {@link RecordAttribute}.
<p>
{@link SignatureAttribute}, {@link RuntimeVisibleAnnotationsAttribute},
{@link RuntimeInvisibleAnnotationsAttribute}, {@link
RuntimeVisibleTypeAnnotationsAttribute}, and {@link
RuntimeInvisibleTypeAnnotationsAttribute} are the only predefined attributes
that may exist on record components.

@see RecordAttribute#components()
@see RecordComponent
@jvms 4.7.30 The {@code Record} Attribute
@since 24

## RecordComponentInfo.name()

```java
Utf8Entry name()
```

{@return the name of this component}

@see RecordComponent#getName()

## RecordComponentInfo.descriptor()

```java
Utf8Entry descriptor()
```

{@return the field descriptor string of this component}

@apiNote
A record component may have a generic type; this information is stored
in the {@link SignatureAttribute Signature} attribute in this component.

@see RecordComponent#getType()

## RecordComponentInfo.descriptorSymbol()

```java
default ClassDesc descriptorSymbol()
```

{@return the symbolic field descriptor of this component}

@apiNote
A record component may have a generic type; this information is stored
in the {@link SignatureAttribute Signature} attribute in this component.

@see RecordComponent#getType()

## RecordComponentInfo.of(Utf8Entry, Utf8Entry, List<Attribute<?>>)

```java
static RecordComponentInfo of(Utf8Entry name, Utf8Entry descriptor, List<Attribute<?>> attributes)
```

{@return a record component description}

@param name the component name
@param descriptor the component field descriptor string
@param attributes the component attributes

## RecordComponentInfo.of(Utf8Entry, Utf8Entry, Attribute<?>...)

```java
static RecordComponentInfo of(Utf8Entry name, Utf8Entry descriptor, Attribute<?>... attributes)
```

{@return a record component description}

@param name the component name
@param descriptor the component field descriptor sting
@param attributes the component attributes

## RecordComponentInfo.of(String, ClassDesc, List<Attribute<?>>)

```java
static RecordComponentInfo of(String name, ClassDesc descriptor, List<Attribute<?>> attributes)
```

{@return a record component description}

@param name the component name
@param descriptor the component symbolic field descriptor
@param attributes the component attributes

## RecordComponentInfo.of(String, ClassDesc, Attribute<?>...)

```java
static RecordComponentInfo of(String name, ClassDesc descriptor, Attribute<?>... attributes)
```

{@return a record component description}

@param name the component name
@param descriptor the component symbolic field descriptor
@param attributes the component attributes