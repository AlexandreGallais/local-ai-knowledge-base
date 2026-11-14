---
title: "Field class (java.lang.reflect) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/Field.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Field class (java.lang.reflect) (part 2 of 2)

## Field.getDouble(Object)

```java
public double getDouble(Object obj) throws IllegalArgumentException, IllegalAccessException
```

Gets the value of a static or instance field of type
`double` or of another primitive type convertible to
type `double` via a widening conversion.

Parameters:

- `obj`: the object to extract the `double` value from

**Returns:** the value of the field converted to type `double`

**See also:** Field#get

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is inaccessible.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if the field value cannot be converted to the type `double` by a widening conversion.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.set(Object, Object)

```java
public void set(Object obj, Object value) throws IllegalArgumentException, IllegalAccessException
```

Sets the field represented by this `Field` object on the
specified object argument to the specified new value. The new
value is automatically unwrapped if the underlying field has a
primitive type.

The operation proceeds as follows:

If the underlying field is static, the `obj` argument is
ignored; it may be null.

Otherwise the underlying field is an instance field.  If the
specified object argument is null, the method throws a
`NullPointerException`.  If the specified object argument is not
an instance of the class or interface declaring the underlying
field, the method throws an `IllegalArgumentException`.

If this `Field` object is enforcing Java language access control, and
the underlying field is inaccessible, the method throws an
`IllegalAccessException`.

If the underlying field is final, this `Field` object has
*write* access if and only if the following conditions are met:

- setAccessible(true) has succeeded for
    this `Field` object;

- the field is non-static; and

- the field's declaring class is not a hidden class; and

- the field's declaring class is not a record class.

If any of the above checks is not met, this method throws an
`IllegalAccessException`.

 Setting a final field in this way
is meaningful only during deserialization or reconstruction of
instances of classes with blank final fields, before they are
made available for access by other parts of a program. Use in
any other context may have unpredictable effects, including cases
in which other parts of a program continue to use the original
value of this field.

If the underlying field is of a primitive type, an unwrapping
conversion is attempted to convert the new value to a value of
a primitive type.  If this attempt fails, the method throws an
`IllegalArgumentException`.

If, after possible unwrapping, the new value cannot be
converted to the type of the underlying field by an identity or
widening conversion, the method throws an
`IllegalArgumentException`.

If the underlying field is static, the class that declared the
field is initialized if it has not already been initialized.

The field is set to the possibly unwrapped and widened new value.

If the field is hidden in the type of `obj`,
the field's value is set according to the preceding rules.

Parameters:

- `obj`: the object whose field should be modified
- `value`: the new value for the field of `obj` being modified

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is inaccessible or final; or if this `Field` object has no write access.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if an unwrapping conversion fails.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.setBoolean(Object, boolean)

```java
public void setBoolean(Object obj, boolean z) throws IllegalArgumentException, IllegalAccessException
```

Sets the value of a field as a `boolean` on the specified object.
This method is equivalent to
`set(obj, zObj)`,
where `zObj` is a `Boolean` object and
`zObj.booleanValue() == z`.

Parameters:

- `obj`: the object whose field should be modified
- `z`: the new value for the field of `obj` being modified

**See also:** Field#set

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is either inaccessible or final; or if this `Field` object has no write access.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if an unwrapping conversion fails.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.setByte(Object, byte)

```java
public void setByte(Object obj, byte b) throws IllegalArgumentException, IllegalAccessException
```

Sets the value of a field as a `byte` on the specified object.
This method is equivalent to
`set(obj, bObj)`,
where `bObj` is a `Byte` object and
`bObj.byteValue() == b`.

Parameters:

- `obj`: the object whose field should be modified
- `b`: the new value for the field of `obj` being modified

**See also:** Field#set

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is either inaccessible or final; or if this `Field` object has no write access.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if an unwrapping conversion fails.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.setChar(Object, char)

```java
public void setChar(Object obj, char c) throws IllegalArgumentException, IllegalAccessException
```

Sets the value of a field as a `char` on the specified object.
This method is equivalent to
`set(obj, cObj)`,
where `cObj` is a `Character` object and
`cObj.charValue() == c`.

Parameters:

- `obj`: the object whose field should be modified
- `c`: the new value for the field of `obj` being modified

**See also:** Field#set

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is either inaccessible or final; or if this `Field` object has no write access.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if an unwrapping conversion fails.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.setShort(Object, short)

```java
public void setShort(Object obj, short s) throws IllegalArgumentException, IllegalAccessException
```

Sets the value of a field as a `short` on the specified object.
This method is equivalent to
`set(obj, sObj)`,
where `sObj` is a `Short` object and
`sObj.shortValue() == s`.

Parameters:

- `obj`: the object whose field should be modified
- `s`: the new value for the field of `obj` being modified

**See also:** Field#set

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is either inaccessible or final; or if this `Field` object has no write access.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if an unwrapping conversion fails.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.setInt(Object, int)

```java
public void setInt(Object obj, int i) throws IllegalArgumentException, IllegalAccessException
```

Sets the value of a field as an `int` on the specified object.
This method is equivalent to
`set(obj, iObj)`,
where `iObj` is an `Integer` object and
`iObj.intValue() == i`.

Parameters:

- `obj`: the object whose field should be modified
- `i`: the new value for the field of `obj` being modified

**See also:** Field#set

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is either inaccessible or final; or if this `Field` object has no write access.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if an unwrapping conversion fails.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.setLong(Object, long)

```java
public void setLong(Object obj, long l) throws IllegalArgumentException, IllegalAccessException
```

Sets the value of a field as a `long` on the specified object.
This method is equivalent to
`set(obj, lObj)`,
where `lObj` is a `Long` object and
`lObj.longValue() == l`.

Parameters:

- `obj`: the object whose field should be modified
- `l`: the new value for the field of `obj` being modified

**See also:** Field#set

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is either inaccessible or final; or if this `Field` object has no write access.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if an unwrapping conversion fails.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.setFloat(Object, float)

```java
public void setFloat(Object obj, float f) throws IllegalArgumentException, IllegalAccessException
```

Sets the value of a field as a `float` on the specified object.
This method is equivalent to
`set(obj, fObj)`,
where `fObj` is a `Float` object and
`fObj.floatValue() == f`.

Parameters:

- `obj`: the object whose field should be modified
- `f`: the new value for the field of `obj` being modified

**See also:** Field#set

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is either inaccessible or final; or if this `Field` object has no write access.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if an unwrapping conversion fails.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.setDouble(Object, double)

```java
public void setDouble(Object obj, double d) throws IllegalArgumentException, IllegalAccessException
```

Sets the value of a field as a `double` on the specified object.
This method is equivalent to
`set(obj, dObj)`,
where `dObj` is a `Double` object and
`dObj.doubleValue() == d`.

Parameters:

- `obj`: the object whose field should be modified
- `d`: the new value for the field of `obj` being modified

**See also:** Field#set

Throws:

- `IllegalAccessException`: if this `Field` object is enforcing Java language access control and the underlying field is either inaccessible or final; or if this `Field` object has no write access.
- `IllegalArgumentException`: if the specified object is not an instance of the class or interface declaring the underlying field (or a subclass or implementor thereof), or if an unwrapping conversion fails.
- `NullPointerException`: if the specified object is null and the field is an instance field.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.

## Field.getAnnotation(Class<T>)

```java
public <T extends Annotation> T getAnnotation(Class<T> annotationClass)
```

(inherited documentation)

**Since:** 1.5

Throws:

- `NullPointerException`: (inherited documentation)

## Field.getAnnotationsByType(Class<T>)

```java
public <T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass)
```

(inherited documentation)

**Since:** 1.8

Throws:

- `NullPointerException`: (inherited documentation)

## Field.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

(inherited documentation)

## Field.getAnnotatedType()

```java
public AnnotatedType getAnnotatedType()
```

Returns an AnnotatedType object that represents the use of a type to specify
the declared type of the field represented by this Field.

**Returns:** an object representing the declared type of the field
represented by this Field

**Since:** 1.8
