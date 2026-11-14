# AnnotationValue interface (java.lang.classfile)

```java
public sealed interface AnnotationValue
```

Models an {@code element_value} structure, or a value of an element-value
pair of an annotation, as defined in JVMS {@jvms 4.7.16.1}.
<p>
Two {@code AnnotationValue} objects should be compared using the {@link
Object#equals(Object) equals} method.

@see Annotation
@see AnnotationElement
@see java.lang.reflect.AnnotatedElement Annotations in core reflection

@sealedGraph
@since 24

## AnnotationValue.annotation()

```java
Annotation annotation()
```

{@return the annotation value}

## AnnotationValue.values()

```java
List<AnnotationValue> values()
```

{@return the array elements of the array value}

@apiNote
All array elements derived from Java source code have the same type,
which must not be an array type. (JLS {@jls 9.6.1}) If such elements are
annotations, they have the same annotation interface; if such elements
are enum, they belong to the same enum class.

## AnnotationValue.constant()

```java
AnnotationConstantValueEntry constant()
```

{@return the constant pool entry backing this constant element}

@apiNote
Different types of constant values may share the same type of entry
because they have the same {@linkplain TypeKind##computational-type
computational type}.
For example, {@link OfInt} and {@link OfChar} are both
backed by {@link IntegerEntry}. Use {@link #resolvedValue
resolvedValue()} for a value of accurate type.

## AnnotationValue.resolvedValue()

```java
Constable resolvedValue()
```

{@return the resolved live constant value, as an object} The type of
the returned value may be a wrapper class or {@link String}.

@apiNote
The returned object, despite being {@link Constable}, may not
{@linkplain Constable#describeConstable() describe} the right constant
for encoding the annotation value in a class file. For example,
{@link Character} returned by {@link OfChar} describes itself as a
{@link DynamicConstantPoolEntry}, but it is actually backed by
{@link IntegerEntry} in annotation format.
Use {@link #constant constant()} for a correct constant pool representation.

## AnnotationValue.constant()

```java
Utf8Entry constant()
```

{@return the backing UTF8 entry}

## AnnotationValue.stringValue()

```java
String stringValue()
```

{@return the constant string value}

## AnnotationValue.resolvedValue()

```java
default String resolvedValue()
```

{@return the resolved string value}

@implSpec
This method returns the same as {@link #stringValue()}.

## AnnotationValue.constant()

```java
DoubleEntry constant()
```

{@return the backing double entry}

## AnnotationValue.doubleValue()

```java
double doubleValue()
```

{@return the constant double value}

## AnnotationValue.resolvedValue()

```java
default Double resolvedValue()
```

{@return the resolved double value}

@implSpec
This method returns the same as {@link #doubleValue()}.

## AnnotationValue.constant()

```java
FloatEntry constant()
```

{@return the backing float entry}

## AnnotationValue.floatValue()

```java
float floatValue()
```

{@return the constant float value}

## AnnotationValue.resolvedValue()

```java
default Float resolvedValue()
```

{@return the resolved float value}

@implSpec
This method returns the same as {@link #floatValue()}.

## AnnotationValue.constant()

```java
LongEntry constant()
```

{@return the backing long entry}

## AnnotationValue.longValue()

```java
long longValue()
```

{@return the constant long value}

## AnnotationValue.resolvedValue()

```java
default Long resolvedValue()
```

{@return the resolved long value}

@implSpec
This method returns the same as {@link #longValue()}.

## AnnotationValue.constant()

```java
IntegerEntry constant()
```

{@return the backing integer entry}

## AnnotationValue.intValue()

```java
int intValue()
```

{@return the constant int value}

## AnnotationValue.resolvedValue()

```java
default Integer resolvedValue()
```

{@return the resolved int value}

@implSpec
This method returns the same as {@link #intValue()}.

## AnnotationValue.constant()

```java
IntegerEntry constant()
```

{@return the backing integer entry}

## AnnotationValue.shortValue()

```java
short shortValue()
```

{@return the constant short value}
@jvms 2.11.1 Types and the Java Virtual Machine

## AnnotationValue.resolvedValue()

```java
default Short resolvedValue()
```

{@return the resolved short value}

@implSpec
This method returns the same as {@link #shortValue()}.

## AnnotationValue.constant()

```java
IntegerEntry constant()
```

{@return the backing integer entry}

## AnnotationValue.charValue()

```java
char charValue()
```

{@return the constant char value}
@jvms 2.11.1 Types and the Java Virtual Machine

## AnnotationValue.resolvedValue()

```java
default Character resolvedValue()
```

{@return the resolved char value}

@implSpec
This method returns the same as {@link #charValue()}.

## AnnotationValue.constant()

```java
IntegerEntry constant()
```

{@return the backing integer entry}

## AnnotationValue.byteValue()

```java
byte byteValue()
```

{@return the constant byte value}
@jvms 2.11.1 Types and the Java Virtual Machine

## AnnotationValue.resolvedValue()

```java
default Byte resolvedValue()
```

{@return the resolved byte value}

@implSpec
This method returns the same as {@link #byteValue()}.

## AnnotationValue.constant()

```java
IntegerEntry constant()
```

{@return the backing integer entry}

## AnnotationValue.booleanValue()

```java
boolean booleanValue()
```

{@return the constant boolean value}
@jvms 2.3.4 The <i>boolean</i> Type

## AnnotationValue.resolvedValue()

```java
default Boolean resolvedValue()
```

{@return the resolved boolean value}

@implSpec
This method returns the same as {@link #booleanValue()}.

## AnnotationValue.className()

```java
Utf8Entry className()
```

{@return the class descriptor string}

## AnnotationValue.classSymbol()

```java
default ClassDesc classSymbol()
```

{@return the class descriptor}

## AnnotationValue.className()

```java
Utf8Entry className()
```

{@return the enum class descriptor string}

## AnnotationValue.classSymbol()

```java
default ClassDesc classSymbol()
```

{@return the enum class descriptor}

## AnnotationValue.constantName()

```java
Utf8Entry constantName()
```

{@return the enum constant name}

## AnnotationValue.TAG_BYTE

```java
int TAG_BYTE
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfByte}.

## AnnotationValue.TAG_CHAR

```java
int TAG_CHAR
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfChar}.

## AnnotationValue.TAG_DOUBLE

```java
int TAG_DOUBLE
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfDouble}.

## AnnotationValue.TAG_FLOAT

```java
int TAG_FLOAT
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfFloat}.

## AnnotationValue.TAG_INT

```java
int TAG_INT
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfInt}.

## AnnotationValue.TAG_LONG

```java
int TAG_LONG
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfLong}.

## AnnotationValue.TAG_SHORT

```java
int TAG_SHORT
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfShort}.

## AnnotationValue.TAG_BOOLEAN

```java
int TAG_BOOLEAN
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfBoolean}.

## AnnotationValue.TAG_STRING

```java
int TAG_STRING
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfString}.

## AnnotationValue.TAG_ENUM

```java
int TAG_ENUM
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfEnum}.

## AnnotationValue.TAG_CLASS

```java
int TAG_CLASS
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfClass}.

## AnnotationValue.TAG_ANNOTATION

```java
int TAG_ANNOTATION
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfAnnotation}.

## AnnotationValue.TAG_ARRAY

```java
int TAG_ARRAY
```

The {@link #tag() tag} indicating the value of an element-value pair is {@link OfArray}.

## AnnotationValue.tag()

```java
int tag()
```

{@return the tag character for this value as per JVMS {@jvms 4.7.16.1}}
The tag characters have a one-to-one mapping to the types of annotation element values.

@apiNote
{@code TAG_}-prefixed constants in this class, such as {@link #TAG_INT},
describe the possible return values of this method.  The return type is
{@code int} for consistency with union indicator items in other union
structures in the {@code class} file format.

## AnnotationValue.ofEnum(Utf8Entry, Utf8Entry)

```java
static OfEnum ofEnum(Utf8Entry className, Utf8Entry constantName)
```

{@return an enum value for an element-value pair}
@param className the descriptor string of the enum class
@param constantName the name of the enum constant

## AnnotationValue.ofEnum(ClassDesc, String)

```java
static OfEnum ofEnum(ClassDesc className, String constantName)
```

{@return an enum value for an element-value pair}
@param className the descriptor of the enum class
@param constantName the name of the enum constant

## AnnotationValue.ofClass(Utf8Entry)

```java
static OfClass ofClass(Utf8Entry className)
```

{@return a class value for an element-value pair}
@param className the descriptor string of the class

## AnnotationValue.ofClass(ClassDesc)

```java
static OfClass ofClass(ClassDesc className)
```

{@return a class value for an element-value pair}
@param className the descriptor of the class

## AnnotationValue.ofString(Utf8Entry)

```java
static OfString ofString(Utf8Entry value)
```

{@return a string value for an element-value pair}
@param value the string

## AnnotationValue.ofString(String)

```java
static OfString ofString(String value)
```

{@return a string value for an element-value pair}
@param value the string

## AnnotationValue.ofDouble(DoubleEntry)

```java
static OfDouble ofDouble(DoubleEntry value)
```

{@return a double value for an element-value pair}
@param value the double value

## AnnotationValue.ofDouble(double)

```java
static OfDouble ofDouble(double value)
```

{@return a double value for an element-value pair}
@param value the double value

## AnnotationValue.ofFloat(FloatEntry)

```java
static OfFloat ofFloat(FloatEntry value)
```

{@return a float value for an element-value pair}
@param value the float value

## AnnotationValue.ofFloat(float)

```java
static OfFloat ofFloat(float value)
```

{@return a float value for an element-value pair}
@param value the float value

## AnnotationValue.ofLong(LongEntry)

```java
static OfLong ofLong(LongEntry value)
```

{@return a long value for an element-value pair}
@param value the long value

## AnnotationValue.ofLong(long)

```java
static OfLong ofLong(long value)
```

{@return a long value for an element-value pair}
@param value the long value

## AnnotationValue.ofInt(IntegerEntry)

```java
static OfInt ofInt(IntegerEntry value)
```

{@return an int value for an element-value pair}
@param value the int value

## AnnotationValue.ofInt(int)

```java
static OfInt ofInt(int value)
```

{@return an int value for an element-value pair}
@param value the int value

## AnnotationValue.ofShort(IntegerEntry)

```java
static OfShort ofShort(IntegerEntry value)
```

{@return a short value for an element-value pair}
@param value the short value

## AnnotationValue.ofShort(short)

```java
static OfShort ofShort(short value)
```

{@return a short value for an element-value pair}
@param value the short value

## AnnotationValue.ofChar(IntegerEntry)

```java
static OfChar ofChar(IntegerEntry value)
```

{@return a char value for an element-value pair}
@param value the char value

## AnnotationValue.ofChar(char)

```java
static OfChar ofChar(char value)
```

{@return a char value for an element-value pair}
@param value the char value

## AnnotationValue.ofByte(IntegerEntry)

```java
static OfByte ofByte(IntegerEntry value)
```

{@return a byte value for an element-value pair}
@param value the byte value

## AnnotationValue.ofByte(byte)

```java
static OfByte ofByte(byte value)
```

{@return a byte value for an element-value pair}
@param value the byte value

## AnnotationValue.ofBoolean(IntegerEntry)

```java
static OfBoolean ofBoolean(IntegerEntry value)
```

{@return a boolean value for an element-value pair}
@param value the boolean value

## AnnotationValue.ofBoolean(boolean)

```java
static OfBoolean ofBoolean(boolean value)
```

{@return a boolean value for an element-value pair}
@param value the boolean value

## AnnotationValue.ofAnnotation(Annotation)

```java
static OfAnnotation ofAnnotation(Annotation value)
```

{@return an annotation value for an element-value pair}
@param value the annotation

## AnnotationValue.ofArray(List<AnnotationValue>)

```java
static OfArray ofArray(List<AnnotationValue> values)
```

{@return an array value for an element-value pair}

@apiNote
See {@link AnnotationValue.OfArray#values() values()} for conventions
on array values derived from Java source code.

@param values the array elements

## AnnotationValue.ofArray(AnnotationValue...)

```java
static OfArray ofArray(AnnotationValue... values)
```

{@return an array value for an element-value pair}

@apiNote
See {@link AnnotationValue.OfArray#values() values()} for conventions
on array values derived from Java source code.

@param values the array elements

## AnnotationValue.of(Object)

```java
static AnnotationValue of(Object value)
```

{@return an annotation element}  The {@code value} parameter must be
a primitive, a wrapper of primitive, a String, a ClassDesc, an enum
constant, or an array of one of these.

@param value the annotation value
@throws IllegalArgumentException when the {@code value} parameter is not
        a primitive, a wrapper of primitive, a String, a ClassDesc,
        an enum constant, or an array of one of these.