---
title: "AnnotationElement interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/AnnotationElement.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AnnotationElement interface (java.lang.classfile)

```java
public sealed interface AnnotationElement permits AnnotationImpl.AnnotationElementImpl
```

Models an element-value pair in the `element_value_pairs`
table in the `annotation` structure defined in JVMS
 or the `type_annotation` structure defined
in JVMS .

Two `AnnotationElement` objects should be compared using the
equals method.

**See also:** Annotation

**See also:** java.lang.reflect.AnnotatedElement Annotations in core reflection

**jvms:** 4.7.16.1 The `element_value` structure

**Since:** 24

## AnnotationElement.name()

```java
Utf8Entry name()
```

**API note:** In Java source code, by convention, the name of the sole element in a
single-element annotation interface is `value`. (JLS )
This is the case for single-element annotations (JLS ) and
container annotations for multiple annotations (JLS ).

## AnnotationElement.value()

```java
AnnotationValue value()
```

## AnnotationElement.of(Utf8Entry, AnnotationValue)

```java
static AnnotationElement of(Utf8Entry name, AnnotationValue value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

## AnnotationElement.of(String, AnnotationValue)

```java
static AnnotationElement of(String name, AnnotationValue value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

## AnnotationElement.ofClass(String, ClassDesc)

```java
static AnnotationElement ofClass(String name, ClassDesc value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

**See also:** AnnotationValue#ofClass(ClassDesc) AnnotationValue::ofClass

## AnnotationElement.ofString(String, String)

```java
static AnnotationElement ofString(String name, String value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

**See also:** AnnotationValue#ofString(String) AnnotationValue::ofString

## AnnotationElement.ofLong(String, long)

```java
static AnnotationElement ofLong(String name, long value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

**See also:** AnnotationValue#ofLong(long) AnnotationValue::ofLong

## AnnotationElement.ofInt(String, int)

```java
static AnnotationElement ofInt(String name, int value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

**See also:** AnnotationValue#ofInt(int) AnnotationValue::ofInt

## AnnotationElement.ofChar(String, char)

```java
static AnnotationElement ofChar(String name, char value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

**See also:** AnnotationValue#ofChar(char) AnnotationValue::ofChar

## AnnotationElement.ofShort(String, short)

```java
static AnnotationElement ofShort(String name, short value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

**See also:** AnnotationValue#ofShort(short) AnnotationValue::ofShort

## AnnotationElement.ofByte(String, byte)

```java
static AnnotationElement ofByte(String name, byte value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

**See also:** AnnotationValue#ofByte(byte) AnnotationValue::ofByte

## AnnotationElement.ofBoolean(String, boolean)

```java
static AnnotationElement ofBoolean(String name, boolean value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

**See also:** AnnotationValue#ofBoolean(boolean) AnnotationValue::ofBoolean

## AnnotationElement.ofDouble(String, double)

```java
static AnnotationElement ofDouble(String name, double value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

**See also:** AnnotationValue#ofDouble(double) AnnotationValue::ofDouble

## AnnotationElement.ofFloat(String, float)

```java
static AnnotationElement ofFloat(String name, float value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

**See also:** AnnotationValue#ofFloat(float) AnnotationValue::ofFloat

## AnnotationElement.ofAnnotation(String, Annotation)

```java
static AnnotationElement ofAnnotation(String name, Annotation value)
```

Parameters:

- `name`: the name of the key
- `value`: the associated value

**See also:** AnnotationValue#ofAnnotation AnnotationValue::ofAnnotation

## AnnotationElement.ofArray(String, AnnotationValue...)

```java
static AnnotationElement ofArray(String name, AnnotationValue... values)
```

Parameters:

- `name`: the name of the key
- `values`: the associated values

**See also:** AnnotationValue#ofArray(AnnotationValue...) AnnotationValue::ofArray
