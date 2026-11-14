---
title: "Field class (java.lang.reflect) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/Field.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Field class (java.lang.reflect)

```java
public final class Field extends AccessibleObject implements Member
```

A `Field` provides information about, and dynamic access to, a
single field of a class or an interface.  The reflected field may
be a class (static) field or an instance field.

A `Field` permits widening conversions to occur during a get or
set access operation, but throws an `IllegalArgumentException` if a
narrowing conversion would occur.

**See also:** Member

**See also:** java.lang.Class

**See also:** java.lang.Class#getFields()

**See also:** java.lang.Class#getField(String)

**See also:** java.lang.Class#getDeclaredFields()

**See also:** java.lang.Class#getDeclaredField(String)

**Since:** 1.1

## Field.setAccessible(boolean)

```java
public void setAccessible(boolean flag)
```

Throws:

- `InaccessibleObjectException`: (inherited documentation)

## Field.getDeclaringClass()

```java
public Class<?> getDeclaringClass()
```

Returns the `Class` object representing the class or interface
that declares the field represented by this `Field` object.

## Field.getName()

```java
public String getName()
```

Returns the name of the field represented by this `Field` object.

## Field.getModifiers()

```java
public int getModifiers()
```

Returns the Java language modifiers for the field represented
by this `Field` object, as an integer. The `Modifier` class should
be used to decode the modifiers.

**See also:** Modifier

**See also:** #accessFlags()

**JLS:** 8.3 Field Declarations

**JLS:** 9.3 Field (Constant) Declarations

## Field.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

**See also:** #getModifiers()

**jvms:** 4.5 Fields

**Since:** 20

## Field.isEnumConstant()

```java
public boolean isEnumConstant()
```

Returns `true` if this field represents an element of
an enumerated class; returns `false` otherwise.

**Returns:** `true` if and only if this field represents an element of
an enumerated class.

**Since:** 1.5

**JLS:** 8.9.1 Enum Constants

## Field.isSynthetic()

```java
public boolean isSynthetic()
```

Returns `true` if this field is a synthetic
field; returns `false` otherwise.

**Returns:** true if and only if this field is a synthetic
field as defined by the Java Language Specification.

**Since:** 1.5

**See also:** Java
programming language and JVM modeling in core reflection

## Field.getType()

```java
public Class<?> getType()
```

Returns a `Class` object that identifies the
declared type for the field represented by this
`Field` object.

**Returns:** a `Class` object identifying the declared
type of the field represented by this object

## Field.getGenericType()

```java
public Type getGenericType()
```

Returns a `Type` object that represents the declared type for
the field represented by this `Field` object.

If the declared type of the field is a parameterized type,
the `Type` object returned must accurately reflect the
actual type arguments used in the source code.

If the type of the underlying field is a type variable or a
parameterized type, it is created. Otherwise, it is resolved.

**Returns:** a `Type` object that represents the declared type for
    the field represented by this `Field` object

**Since:** 1.5

Throws:

- `GenericSignatureFormatError`: if the generic field signature does not conform to the format specified in *The Java Virtual Machine Specification*
- `TypeNotPresentException`: if the generic type signature of the underlying field refers to a non-existent class or interface declaration
- `MalformedParameterizedTypeException`: if the generic signature of the underlying field refers to a parameterized type that cannot be instantiated for any reason

## Field.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this `Field` against the specified object.  Returns
true if the objects are the same.  Two `Field` objects are the same if
they were declared by the same class and have the same name
and type.

## Field.hashCode()

```java
public int hashCode()
```

Returns a hashcode for this `Field`.  This is computed as the
exclusive-or of the hashcodes for the underlying field's
declaring class name and its name.

## Field.toString()

```java
public String toString()
```

Returns a string describing this `Field`.  The format is
the access modifiers for the field, if any, followed
by the field type, followed by a space, followed by
the fully-qualified name of the class declaring the field,
followed by a period, followed by the name of the field.
For example:

```java
   public static final int java.lang.Thread.MIN_PRIORITY
   private int java.io.FileDescriptor.fd
```

The modifiers are placed in canonical order as specified by
"The Java Language Specification".  This is `public`,
`protected` or `private` first, and then other
modifiers in the following order: `static`, `final`,
`transient`, `volatile`.

**Returns:** a string describing this `Field`

**JLS:** 8.3.1 Field Modifiers

## Field.toGenericString()

```java
public String toGenericString()
```

Returns a string describing this `Field`, including
its generic type.  The format is the access modifiers for the
field, if any, followed by the generic field type, followed by
a space, followed by the fully-qualified name of the class
declaring the field, followed by a period, followed by the name
of the field.

The modifiers are placed in canonical order as specified by
"The Java Language Specification".  This is `public`,
`protected` or `private` first, and then other
modifiers in the following order: `static`, `final`,
`transient`, `volatile`.

**Returns:** a string describing this `Field`, including
its generic type

**Since:** 1.5

**JLS:** 8.3.1 Field Modifiers

## Field.get(Object)

```java
public Object get(Object obj) throws IllegalArgumentException, IllegalAccessException
```

Returns the value of the field represented by this `Field`, on
the specified object. The value is automatically wrapped in an
object if it has a primitive type.

The underlying field's value is obtained as follows:

If the underlying field is a static field, the `obj` argument
is ignored; it may be null.

Otherwise, the underlying field is an instance field.  If the
specified `obj` argument is null, the method throws a
`NullPointerException`. If the specified object is not an
instance of the class or interface declaring the underlying
field, the method throws an `IllegalArgumentException`.

If this `Field` object is enforcing Java language access control, and
the underlying field is inaccessible, the method throws an
`IllegalAccessException`.
If the underlying field is static, the class that declared the
field is initialized if it has not already been initialized.

Otherwise, the value is retrieved from the underlying instance
or static field.  If the field has a primitive type, the value
is wrapped in an object before being returned, otherwise it is
returned as is.

If the field is hidden in the type of `obj`,
the field's value is obtained according to the preceding rules.

Parameters:

- `obj`: object from which the represented field's value is to be extracted

**Returns:** the value of the represented field in object
`obj`; primitive values are wrapped in an appropriate
object before being returned

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is inaccessible.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof).
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.getBoolean(Object)

```java
public boolean getBoolean(Object obj) throws IllegalArgumentException, IllegalAccessException
```

Gets the value of a static or instance `boolean` field.

Parameters:

- `obj`: the object to extract the `boolean` value from

**Returns:** the value of the `boolean` field

**See also:** Field#get

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is inaccessible.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if the field value cannot be converted to the type `boolean` by a widening conversion.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.getByte(Object)

```java
public byte getByte(Object obj) throws IllegalArgumentException, IllegalAccessException
```

Gets the value of a static or instance `byte` field.

Parameters:

- `obj`: the object to extract the `byte` value from

**Returns:** the value of the `byte` field

**See also:** Field#get

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is inaccessible.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if the field value cannot be converted to the type `byte` by a widening conversion.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.getChar(Object)

```java
public char getChar(Object obj) throws IllegalArgumentException, IllegalAccessException
```

Gets the value of a static or instance field of type
`char` or of another primitive type convertible to
type `char` via a widening conversion.

Parameters:

- `obj`: the object to extract the `char` value from

**Returns:** the value of the field converted to type `char`

**See also:** Field#get

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is inaccessible.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if the field value cannot be converted to the type `char` by a widening conversion.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.getShort(Object)

```java
public short getShort(Object obj) throws IllegalArgumentException, IllegalAccessException
```

Gets the value of a static or instance field of type
`short` or of another primitive type convertible to
type `short` via a widening conversion.

Parameters:

- `obj`: the object to extract the `short` value from

**Returns:** the value of the field converted to type `short`

**See also:** Field#get

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is inaccessible.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if the field value cannot be converted to the type `short` by a widening conversion.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.getInt(Object)

```java
public int getInt(Object obj) throws IllegalArgumentException, IllegalAccessException
```

Gets the value of a static or instance field of type
`int` or of another primitive type convertible to
type `int` via a widening conversion.

Parameters:

- `obj`: the object to extract the `int` value from

**Returns:** the value of the field converted to type `int`

**See also:** Field#get

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is inaccessible.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if the field value cannot be converted to the type `int` by a widening conversion.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.getLong(Object)

```java
public long getLong(Object obj) throws IllegalArgumentException, IllegalAccessException
```

Gets the value of a static or instance field of type
`long` or of another primitive type convertible to
type `long` via a widening conversion.

Parameters:

- `obj`: the object to extract the `long` value from

**Returns:** the value of the field converted to type `long`

**See also:** Field#get

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is inaccessible.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if the field value cannot be converted to the type `long` by a widening conversion.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.getFloat(Object)

```java
public float getFloat(Object obj) throws IllegalArgumentException, IllegalAccessException
```

Gets the value of a static or instance field of type
`float` or of another primitive type convertible to
type `float` via a widening conversion.

Parameters:

- `obj`: the object to extract the `float` value from

**Returns:** the value of the field converted to type `float`

**See also:** Field#get

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is inaccessible.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if the field value cannot be converted to the type `float` by a widening conversion.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.
