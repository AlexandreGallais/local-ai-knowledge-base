---
title: "RecordComponentInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/RecordComponentInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RecordComponentInfo interface (java.lang.classfile.attribute)

```java
public sealed interface RecordComponentInfo extends AttributedElement permits BoundRecordComponentInfo, UnboundAttribute.UnboundRecordComponentInfo
```

Models a single record component in the `RecordAttribute`.

`SignatureAttribute`, `RuntimeVisibleAnnotationsAttribute`,
`RuntimeInvisibleAnnotationsAttribute`, `RuntimeVisibleTypeAnnotationsAttribute`, and `RuntimeInvisibleTypeAnnotationsAttribute` are the only predefined attributes
that may exist on record components.

**See also:** RecordAttribute#components()

**See also:** RecordComponent

**jvms:** 4.7.30 The `Record` Attribute

**Since:** 24

## RecordComponentInfo.name()

```java
Utf8Entry name()
```

**See also:** RecordComponent#getName()

## RecordComponentInfo.descriptor()

```java
Utf8Entry descriptor()
```

**API note:** A record component may have a generic type; this information is stored
in the Signature attribute in this component.

**See also:** RecordComponent#getType()

## RecordComponentInfo.descriptorSymbol()

```java
default ClassDesc descriptorSymbol()
```

**API note:** A record component may have a generic type; this information is stored
in the Signature attribute in this component.

**See also:** RecordComponent#getType()

## RecordComponentInfo.of(Utf8Entry, Utf8Entry, List<Attribute<?>>)

```java
static RecordComponentInfo of(Utf8Entry name, Utf8Entry descriptor, List<Attribute<?>> attributes)
```

Parameters:

- `name`: the component name
- `descriptor`: the component field descriptor string
- `attributes`: the component attributes

## RecordComponentInfo.of(Utf8Entry, Utf8Entry, Attribute<?>...)

```java
static RecordComponentInfo of(Utf8Entry name, Utf8Entry descriptor, Attribute<?>... attributes)
```

Parameters:

- `name`: the component name
- `descriptor`: the component field descriptor sting
- `attributes`: the component attributes

## RecordComponentInfo.of(String, ClassDesc, List<Attribute<?>>)

```java
static RecordComponentInfo of(String name, ClassDesc descriptor, List<Attribute<?>> attributes)
```

Parameters:

- `name`: the component name
- `descriptor`: the component symbolic field descriptor
- `attributes`: the component attributes

## RecordComponentInfo.of(String, ClassDesc, Attribute<?>...)

```java
static RecordComponentInfo of(String name, ClassDesc descriptor, Attribute<?>... attributes)
```

Parameters:

- `name`: the component name
- `descriptor`: the component symbolic field descriptor
- `attributes`: the component attributes
