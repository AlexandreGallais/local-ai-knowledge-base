# Utf8Entry interface (java.lang.classfile.constantpool)

```java
public sealed interface Utf8Entry extends CharSequence, AnnotationConstantValueEntry permits AbstractPoolEntry.Utf8EntryImpl
```

Models a {@code CONSTANT_UTF8_info} constant, representing strings, in the
constant pool of a {@code class} file.  This describes strings in the
{@linkplain DataInput##modified-utf-8 Modified UTF-8} format.
<p>
The use of a {@code Utf8Entry} is represented by a {@link String}.
Conversions are through {@link ConstantPoolBuilder#utf8Entry(String)} and
{@link #stringValue()}.
<p>
Some uses of {@code Utf8Entry} represent field or method {@linkplain
TypeDescriptor#descriptorString() descriptor strings}, symbolically
represented as {@link ClassDesc} or {@link MethodTypeDesc}, depending on
where a {@code Utf8Entry} appear.  Entries representing such uses are created
with {@link ConstantPoolBuilder#utf8Entry(ClassDesc)} and {@link
ConstantPoolBuilder#utf8Entry(MethodTypeDesc)}, and they can be converted to
symbolic descriptors on a per-use-site basis, such as in {@link
AnnotationValue.OfClass#classSymbol()} and {@link MethodModel#methodTypeSymbol()}.
<p>
Unlike most constant pool entries, a UTF-8 entry is of flexible length: it is
represented as an array structure, with an {@code u2} for the data length in
bytes, followed by that number of bytes of Modified UTF-8 data.  It can
represent at most 65535 bytes of data due to the physical restrictions.

@jvms 4.4.7 The {@code CONSTANT_Utf8_info} Structure
@see DataInput##modified-utf-8 Modified UTF-8
@since 24

## Utf8Entry.stringValue()

```java
String stringValue()
```

{@return the string value for this entry}

@apiNote
A {@code Utf8Entry} can be used directly as a {@link CharSequence} if
{@code String} functionalities are not strictly desired.  If only string
equivalence is desired, {@link #equalsString(String) equalsString} should
be used.  Reduction of string processing can significantly improve {@code
class} file reading performance.

@see ConstantPoolBuilder#utf8Entry(String)

## Utf8Entry.equalsString(String)

```java
boolean equalsString(String s)
```

{@return whether this entry describes the same string as the provided string}

@param s the string to compare to

## Utf8Entry.isFieldType(ClassDesc)

```java
boolean isFieldType(ClassDesc desc)
```

{@return whether this entry describes the descriptor string of this
field type}

@param desc the field type
@since 25

## Utf8Entry.isMethodType(MethodTypeDesc)

```java
boolean isMethodType(MethodTypeDesc desc)
```

{@return whether this entry describes the descriptor string of this
method type}

@param desc the method type
@since 25