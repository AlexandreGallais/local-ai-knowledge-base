# AnnotationElement interface (java.lang.classfile)

```java
public sealed interface AnnotationElement permits AnnotationImpl.AnnotationElementImpl
```

Models an element-value pair in the {@code element_value_pairs}
table in the {@code annotation} structure defined in JVMS
{@jvms 4.7.16} or the {@code type_annotation} structure defined
in JVMS {@jvms 4.7.20}.
<p>
Two {@code AnnotationElement} objects should be compared using the
{@link Object#equals(Object) equals} method.

@see Annotation
@see java.lang.reflect.AnnotatedElement Annotations in core reflection
@jvms 4.7.16.1 The {@code element_value} structure
@since 24

## AnnotationElement.name()

```java
Utf8Entry name()
```

{@return the element name}

@apiNote
In Java source code, by convention, the name of the sole element in a
single-element annotation interface is {@code value}. (JLS {@jls 9.6.1})
This is the case for single-element annotations (JLS {@jls 9.7.3}) and
container annotations for multiple annotations (JLS {@jls 9.6.3}).

## AnnotationElement.value()

```java
AnnotationValue value()
```

{@return the element value}

## AnnotationElement.of(Utf8Entry, AnnotationValue)

```java
static AnnotationElement of(Utf8Entry name, AnnotationValue value)
```

{@return an element-value pair}
@param name the name of the key
@param value the associated value

## AnnotationElement.of(String, AnnotationValue)

```java
static AnnotationElement of(String name, AnnotationValue value)
```

{@return an element-value pair}
@param name the name of the key
@param value the associated value

## AnnotationElement.ofClass(String, ClassDesc)

```java
static AnnotationElement ofClass(String name, ClassDesc value)
```

{@return an element-value pair for a class-valued element}
@param name the name of the key
@param value the associated value
@see AnnotationValue#ofClass(ClassDesc) AnnotationValue::ofClass

## AnnotationElement.ofString(String, String)

```java
static AnnotationElement ofString(String name, String value)
```

{@return an element-value pair for a string-valued element}
@param name the name of the key
@param value the associated value
@see AnnotationValue#ofString(String) AnnotationValue::ofString

## AnnotationElement.ofLong(String, long)

```java
static AnnotationElement ofLong(String name, long value)
```

{@return an element-value pair for a long-valued element}
@param name the name of the key
@param value the associated value
@see AnnotationValue#ofLong(long) AnnotationValue::ofLong

## AnnotationElement.ofInt(String, int)

```java
static AnnotationElement ofInt(String name, int value)
```

{@return an element-value pair for an int-valued element}
@param name the name of the key
@param value the associated value
@see AnnotationValue#ofInt(int) AnnotationValue::ofInt

## AnnotationElement.ofChar(String, char)

```java
static AnnotationElement ofChar(String name, char value)
```

{@return an element-value pair for a char-valued element}
@param name the name of the key
@param value the associated value
@see AnnotationValue#ofChar(char) AnnotationValue::ofChar

## AnnotationElement.ofShort(String, short)

```java
static AnnotationElement ofShort(String name, short value)
```

{@return an element-value pair for a short-valued element}
@param name the name of the key
@param value the associated value
@see AnnotationValue#ofShort(short) AnnotationValue::ofShort

## AnnotationElement.ofByte(String, byte)

```java
static AnnotationElement ofByte(String name, byte value)
```

{@return an element-value pair for a byte-valued element}
@param name the name of the key
@param value the associated value
@see AnnotationValue#ofByte(byte) AnnotationValue::ofByte

## AnnotationElement.ofBoolean(String, boolean)

```java
static AnnotationElement ofBoolean(String name, boolean value)
```

{@return an element-value pair for a boolean-valued element}
@param name the name of the key
@param value the associated value
@see AnnotationValue#ofBoolean(boolean) AnnotationValue::ofBoolean

## AnnotationElement.ofDouble(String, double)

```java
static AnnotationElement ofDouble(String name, double value)
```

{@return an element-value pair for a double-valued element}
@param name the name of the key
@param value the associated value
@see AnnotationValue#ofDouble(double) AnnotationValue::ofDouble

## AnnotationElement.ofFloat(String, float)

```java
static AnnotationElement ofFloat(String name, float value)
```

{@return an element-value pair for a float-valued element}
@param name the name of the key
@param value the associated value
@see AnnotationValue#ofFloat(float) AnnotationValue::ofFloat

## AnnotationElement.ofAnnotation(String, Annotation)

```java
static AnnotationElement ofAnnotation(String name, Annotation value)
```

{@return an element-value pair for an annotation-valued element}
@param name the name of the key
@param value the associated value
@see AnnotationValue#ofAnnotation AnnotationValue::ofAnnotation

## AnnotationElement.ofArray(String, AnnotationValue...)

```java
static AnnotationElement ofArray(String name, AnnotationValue... values)
```

{@return an element-value pair for an array-valued element}
@param name the name of the key
@param values the associated values
@see AnnotationValue#ofArray(AnnotationValue...) AnnotationValue::ofArray