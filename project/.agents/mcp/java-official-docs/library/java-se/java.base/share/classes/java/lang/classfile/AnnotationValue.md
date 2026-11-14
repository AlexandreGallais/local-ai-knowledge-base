---
title: "AnnotationValue interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/AnnotationValue.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AnnotationValue interface (java.lang.classfile)

```java
public sealed interface AnnotationValue
```

Models an `element_value` structure, or a value of an element-value
pair of an annotation, as defined in JVMS .

Two `AnnotationValue` objects should be compared using the equals method.

**See also:** Annotation

**See also:** AnnotationElement

**See also:** java.lang.reflect.AnnotatedElement Annotations in core reflection

**sealedGraph:**

**Since:** 24

## AnnotationValue.annotation()

```java
Annotation annotation()
```

## AnnotationValue.values()

```java
List<AnnotationValue> values()
```

**API note:** All array elements derived from Java source code have the same type,
which must not be an array type. (JLS ) If such elements are
annotations, they have the same annotation interface; if such elements
are enum, they belong to the same enum class.

## AnnotationValue.constant()

```java
AnnotationConstantValueEntry constant()
```

**API note:** Different types of constant values may share the same type of entry
because they have the same computational type.
For example, `OfInt` and `OfChar` are both
backed by `IntegerEntry`. Use resolvedValue() for a value of accurate type.

## AnnotationValue.resolvedValue()

```java
Constable resolvedValue()
```

The type of
the returned value may be a wrapper class or `String`.

**API note:** The returned object, despite being `Constable`, may not
describe the right constant
for encoding the annotation value in a class file. For example,
`Character` returned by `OfChar` describes itself as a
`DynamicConstantPoolEntry`, but it is actually backed by
`IntegerEntry` in annotation format.
Use constant() for a correct constant pool representation.

## AnnotationValue.constant()

```java
Utf8Entry constant()
```

## AnnotationValue.stringValue()

```java
String stringValue()
```

## AnnotationValue.resolvedValue()

```java
default String resolvedValue()
```

**Implementation requirements:** This method returns the same as `stringValue()`.

## AnnotationValue.constant()

```java
DoubleEntry constant()
```

## AnnotationValue.doubleValue()

```java
double doubleValue()
```

## AnnotationValue.resolvedValue()

```java
default Double resolvedValue()
```

**Implementation requirements:** This method returns the same as `doubleValue()`.

## AnnotationValue.constant()

```java
FloatEntry constant()
```

## AnnotationValue.floatValue()

```java
float floatValue()
```

## AnnotationValue.resolvedValue()

```java
default Float resolvedValue()
```

**Implementation requirements:** This method returns the same as `floatValue()`.

## AnnotationValue.constant()

```java
LongEntry constant()
```

## AnnotationValue.longValue()

```java
long longValue()
```

## AnnotationValue.resolvedValue()

```java
default Long resolvedValue()
```

**Implementation requirements:** This method returns the same as `longValue()`.

## AnnotationValue.constant()

```java
IntegerEntry constant()
```

## AnnotationValue.intValue()

```java
int intValue()
```

## AnnotationValue.resolvedValue()

```java
default Integer resolvedValue()
```

**Implementation requirements:** This method returns the same as `intValue()`.

## AnnotationValue.constant()

```java
IntegerEntry constant()
```

## AnnotationValue.shortValue()

```java
short shortValue()
```

**jvms:** 2.11.1 Types and the Java Virtual Machine

## AnnotationValue.resolvedValue()

```java
default Short resolvedValue()
```

**Implementation requirements:** This method returns the same as `shortValue()`.

## AnnotationValue.constant()

```java
IntegerEntry constant()
```

## AnnotationValue.charValue()

```java
char charValue()
```

**jvms:** 2.11.1 Types and the Java Virtual Machine

## AnnotationValue.resolvedValue()

```java
default Character resolvedValue()
```

**Implementation requirements:** This method returns the same as `charValue()`.

## AnnotationValue.constant()

```java
IntegerEntry constant()
```

## AnnotationValue.byteValue()

```java
byte byteValue()
```

**jvms:** 2.11.1 Types and the Java Virtual Machine

## AnnotationValue.resolvedValue()

```java
default Byte resolvedValue()
```

**Implementation requirements:** This method returns the same as `byteValue()`.

## AnnotationValue.constant()

```java
IntegerEntry constant()
```

## AnnotationValue.booleanValue()

```java
boolean booleanValue()
```

**jvms:** 2.3.4 The *boolean* Type

## AnnotationValue.resolvedValue()

```java
default Boolean resolvedValue()
```

**Implementation requirements:** This method returns the same as `booleanValue()`.

## AnnotationValue.className()

```java
Utf8Entry className()
```

## AnnotationValue.classSymbol()

```java
default ClassDesc classSymbol()
```

## AnnotationValue.className()

```java
Utf8Entry className()
```

## AnnotationValue.classSymbol()

```java
default ClassDesc classSymbol()
```

## AnnotationValue.constantName()

```java
Utf8Entry constantName()
```

## AnnotationValue.TAG_BYTE

```java
int TAG_BYTE
```

The tag indicating the value of an element-value pair is `OfByte`.

## AnnotationValue.TAG_CHAR

```java
int TAG_CHAR
```

The tag indicating the value of an element-value pair is `OfChar`.

## AnnotationValue.TAG_DOUBLE

```java
int TAG_DOUBLE
```

The tag indicating the value of an element-value pair is `OfDouble`.

## AnnotationValue.TAG_FLOAT

```java
int TAG_FLOAT
```

The tag indicating the value of an element-value pair is `OfFloat`.

## AnnotationValue.TAG_INT

```java
int TAG_INT
```

The tag indicating the value of an element-value pair is `OfInt`.

## AnnotationValue.TAG_LONG

```java
int TAG_LONG
```

The tag indicating the value of an element-value pair is `OfLong`.

## AnnotationValue.TAG_SHORT

```java
int TAG_SHORT
```

The tag indicating the value of an element-value pair is `OfShort`.

## AnnotationValue.TAG_BOOLEAN

```java
int TAG_BOOLEAN
```

The tag indicating the value of an element-value pair is `OfBoolean`.

## AnnotationValue.TAG_STRING

```java
int TAG_STRING
```

The tag indicating the value of an element-value pair is `OfString`.

## AnnotationValue.TAG_ENUM

```java
int TAG_ENUM
```

The tag indicating the value of an element-value pair is `OfEnum`.

## AnnotationValue.TAG_CLASS

```java
int TAG_CLASS
```

The tag indicating the value of an element-value pair is `OfClass`.

## AnnotationValue.TAG_ANNOTATION

```java
int TAG_ANNOTATION
```

The tag indicating the value of an element-value pair is `OfAnnotation`.

## AnnotationValue.TAG_ARRAY

```java
int TAG_ARRAY
```

The tag indicating the value of an element-value pair is `OfArray`.

## AnnotationValue.tag()

```java
int tag()
```

The tag characters have a one-to-one mapping to the types of annotation element values.

**API note:** `TAG_`-prefixed constants in this class, such as `TAG_INT`,
describe the possible return values of this method.  The return type is
`int` for consistency with union indicator items in other union
structures in the `class` file format.

## AnnotationValue.ofEnum(Utf8Entry, Utf8Entry)

```java
static OfEnum ofEnum(Utf8Entry className, Utf8Entry constantName)
```

Parameters:

- `className`: the descriptor string of the enum class
- `constantName`: the name of the enum constant

## AnnotationValue.ofEnum(ClassDesc, String)

```java
static OfEnum ofEnum(ClassDesc className, String constantName)
```

Parameters:

- `className`: the descriptor of the enum class
- `constantName`: the name of the enum constant

## AnnotationValue.ofClass(Utf8Entry)

```java
static OfClass ofClass(Utf8Entry className)
```

Parameters:

- `className`: the descriptor string of the class

## AnnotationValue.ofClass(ClassDesc)

```java
static OfClass ofClass(ClassDesc className)
```

Parameters:

- `className`: the descriptor of the class

## AnnotationValue.ofString(Utf8Entry)

```java
static OfString ofString(Utf8Entry value)
```

Parameters:

- `value`: the string

## AnnotationValue.ofString(String)

```java
static OfString ofString(String value)
```

Parameters:

- `value`: the string

## AnnotationValue.ofDouble(DoubleEntry)

```java
static OfDouble ofDouble(DoubleEntry value)
```

Parameters:

- `value`: the double value

## AnnotationValue.ofDouble(double)

```java
static OfDouble ofDouble(double value)
```

Parameters:

- `value`: the double value

## AnnotationValue.ofFloat(FloatEntry)

```java
static OfFloat ofFloat(FloatEntry value)
```

Parameters:

- `value`: the float value

## AnnotationValue.ofFloat(float)

```java
static OfFloat ofFloat(float value)
```

Parameters:

- `value`: the float value

## AnnotationValue.ofLong(LongEntry)

```java
static OfLong ofLong(LongEntry value)
```

Parameters:

- `value`: the long value

## AnnotationValue.ofLong(long)

```java
static OfLong ofLong(long value)
```

Parameters:

- `value`: the long value

## AnnotationValue.ofInt(IntegerEntry)

```java
static OfInt ofInt(IntegerEntry value)
```

Parameters:

- `value`: the int value

## AnnotationValue.ofInt(int)

```java
static OfInt ofInt(int value)
```

Parameters:

- `value`: the int value

## AnnotationValue.ofShort(IntegerEntry)

```java
static OfShort ofShort(IntegerEntry value)
```

Parameters:

- `value`: the short value

## AnnotationValue.ofShort(short)

```java
static OfShort ofShort(short value)
```

Parameters:

- `value`: the short value

## AnnotationValue.ofChar(IntegerEntry)

```java
static OfChar ofChar(IntegerEntry value)
```

Parameters:

- `value`: the char value

## AnnotationValue.ofChar(char)

```java
static OfChar ofChar(char value)
```

Parameters:

- `value`: the char value

## AnnotationValue.ofByte(IntegerEntry)

```java
static OfByte ofByte(IntegerEntry value)
```

Parameters:

- `value`: the byte value

## AnnotationValue.ofByte(byte)

```java
static OfByte ofByte(byte value)
```

Parameters:

- `value`: the byte value

## AnnotationValue.ofBoolean(IntegerEntry)

```java
static OfBoolean ofBoolean(IntegerEntry value)
```

Parameters:

- `value`: the boolean value

## AnnotationValue.ofBoolean(boolean)

```java
static OfBoolean ofBoolean(boolean value)
```

Parameters:

- `value`: the boolean value

## AnnotationValue.ofAnnotation(Annotation)

```java
static OfAnnotation ofAnnotation(Annotation value)
```

Parameters:

- `value`: the annotation

## AnnotationValue.ofArray(List<AnnotationValue>)

```java
static OfArray ofArray(List<AnnotationValue> values)
```

Parameters:

- `values`: the array elements

**API note:** See values() for conventions
on array values derived from Java source code.

## AnnotationValue.ofArray(AnnotationValue...)

```java
static OfArray ofArray(AnnotationValue... values)
```

Parameters:

- `values`: the array elements

**API note:** See values() for conventions
on array values derived from Java source code.

## AnnotationValue.of(Object)

```java
static AnnotationValue of(Object value)
```

The `value` parameter must be
a primitive, a wrapper of primitive, a String, a ClassDesc, an enum
constant, or an array of one of these.

Parameters:

- `value`: the annotation value

Throws:

- `IllegalArgumentException`: when the `value` parameter is not a primitive, a wrapper of primitive, a String, a ClassDesc, an enum constant, or an array of one of these.
