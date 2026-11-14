---
title: "Array class (java.lang.reflect) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/Array.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Array class (java.lang.reflect)

```java
public final class Array
```

The `Array` class provides static methods to dynamically create and
access Java arrays.

`Array` permits widening conversions to occur during a get or set
operation, but throws an `IllegalArgumentException` if a narrowing
conversion would occur.

**Since:** 1.1

## Array.newInstance(Class<?>, int)

```java
public static Object newInstance(Class<?> componentType, int length) throws NegativeArraySizeException
```

Creates a new array with the specified component type and
length.

Parameters:

- `componentType`: the `Class` object representing the component type of the new array
- `length`: the length of the new array

**Implementation requirements:** Invoking this method is equivalent to creating an array
as follows:

`Array.newInstance(componentType, new int[]{length});`

The number of dimensions of the new array must not
exceed 255.

**Returns:** the new array

Throws:

- `NullPointerException`: if the specified `componentType` parameter is null
- `IllegalArgumentException`: if componentType is `Void.TYPE` or if the number of dimensions of the requested array instance exceed 255.
- `NegativeArraySizeException`: if the specified `length` is negative

## Array.newInstance(Class<?>, int...)

```java
public static Object newInstance(Class<?> componentType, int... dimensions) throws IllegalArgumentException, NegativeArraySizeException
```

Creates a new array
with the specified component type and dimensions.
If `componentType`
represents a non-array class or interface, the new array
has `dimensions.length` dimensions and
`componentType` as its component type. If
`componentType` represents an array class, the
number of dimensions of the new array is equal to the sum
of `dimensions.length` and the number of
dimensions of `componentType`. In this case, the
component type of the new array is the component type of
`componentType`.

The number of dimensions of the new array must not
exceed 255.

Parameters:

- `componentType`: the `Class` object representing the component type of the new array
- `dimensions`: an array of `int` representing the dimensions of the new array

**Returns:** the new array

Throws:

- `NullPointerException`: if the specified `componentType` argument is null
- `IllegalArgumentException`: if the specified `dimensions` argument is a zero-dimensional array, if componentType is `Void.TYPE`, or if the number of dimensions of the requested array instance exceed 255.
- `NegativeArraySizeException`: if any of the components in the specified `dimensions` argument is negative.

## Array.getLength(Object)

```java
public static native int getLength(Object array) throws IllegalArgumentException
```

Returns the length of the specified array object, as an `int`.

Parameters:

- `array`: the array

**Returns:** the length of the array

Throws:

- `IllegalArgumentException`: if the object argument is not an array

## Array.get(Object, int)

```java
public static native Object get(Object array, int index) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Returns the value of the indexed component in the specified
array object.  The value is automatically wrapped in an object
if it has a primitive type.

Parameters:

- `array`: the array
- `index`: the index

**Returns:** the (possibly wrapped) value of the indexed component in
the specified array

Throws:

- `NullPointerException`: If the specified object is null
- `IllegalArgumentException`: If the specified object is not an array
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.getBoolean(Object, int)

```java
public static native boolean getBoolean(Object array, int index) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Returns the value of the indexed component in the specified
array object, as a `boolean`.

Parameters:

- `array`: the array
- `index`: the index

**Returns:** the value of the indexed component in the specified array

**See also:** Array#get

Throws:

- `NullPointerException`: If the specified object is null
- `IllegalArgumentException`: If the specified object is not an array, or if the indexed element cannot be converted to the return type by an identity or widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.getByte(Object, int)

```java
public static native byte getByte(Object array, int index) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Returns the value of the indexed component in the specified
array object, as a `byte`.

Parameters:

- `array`: the array
- `index`: the index

**Returns:** the value of the indexed component in the specified array

**See also:** Array#get

Throws:

- `NullPointerException`: If the specified object is null
- `IllegalArgumentException`: If the specified object is not an array, or if the indexed element cannot be converted to the return type by an identity or widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.getChar(Object, int)

```java
public static native char getChar(Object array, int index) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Returns the value of the indexed component in the specified
array object, as a `char`.

Parameters:

- `array`: the array
- `index`: the index

**Returns:** the value of the indexed component in the specified array

**See also:** Array#get

Throws:

- `NullPointerException`: If the specified object is null
- `IllegalArgumentException`: If the specified object is not an array, or if the indexed element cannot be converted to the return type by an identity or widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.getShort(Object, int)

```java
public static native short getShort(Object array, int index) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Returns the value of the indexed component in the specified
array object, as a `short`.

Parameters:

- `array`: the array
- `index`: the index

**Returns:** the value of the indexed component in the specified array

**See also:** Array#get

Throws:

- `NullPointerException`: If the specified object is null
- `IllegalArgumentException`: If the specified object is not an array, or if the indexed element cannot be converted to the return type by an identity or widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.getInt(Object, int)

```java
public static native int getInt(Object array, int index) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Returns the value of the indexed component in the specified
array object, as an `int`.

Parameters:

- `array`: the array
- `index`: the index

**Returns:** the value of the indexed component in the specified array

**See also:** Array#get

Throws:

- `NullPointerException`: If the specified object is null
- `IllegalArgumentException`: If the specified object is not an array, or if the indexed element cannot be converted to the return type by an identity or widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.getLong(Object, int)

```java
public static native long getLong(Object array, int index) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Returns the value of the indexed component in the specified
array object, as a `long`.

Parameters:

- `array`: the array
- `index`: the index

**Returns:** the value of the indexed component in the specified array

**See also:** Array#get

Throws:

- `NullPointerException`: If the specified object is null
- `IllegalArgumentException`: If the specified object is not an array, or if the indexed element cannot be converted to the return type by an identity or widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.getFloat(Object, int)

```java
public static native float getFloat(Object array, int index) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Returns the value of the indexed component in the specified
array object, as a `float`.

Parameters:

- `array`: the array
- `index`: the index

**Returns:** the value of the indexed component in the specified array

**See also:** Array#get

Throws:

- `NullPointerException`: If the specified object is null
- `IllegalArgumentException`: If the specified object is not an array, or if the indexed element cannot be converted to the return type by an identity or widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.getDouble(Object, int)

```java
public static native double getDouble(Object array, int index) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Returns the value of the indexed component in the specified
array object, as a `double`.

Parameters:

- `array`: the array
- `index`: the index

**Returns:** the value of the indexed component in the specified array

**See also:** Array#get

Throws:

- `NullPointerException`: If the specified object is null
- `IllegalArgumentException`: If the specified object is not an array, or if the indexed element cannot be converted to the return type by an identity or widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.set(Object, int, Object)

```java
public static native void set(Object array, int index, Object value) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Sets the value of the indexed component of the specified array
object to the specified new value.  The new value is first
automatically unwrapped if the array has a primitive component
type.

Parameters:

- `array`: the array
- `index`: the index into the array
- `value`: the new value of the indexed component

Throws:

- `NullPointerException`: If the specified object argument is null
- `IllegalArgumentException`: If the specified object argument is not an array, or if the array component type is primitive and an unwrapping conversion fails
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.setBoolean(Object, int, boolean)

```java
public static native void setBoolean(Object array, int index, boolean z) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Sets the value of the indexed component of the specified array
object to the specified `boolean` value.

Parameters:

- `array`: the array
- `index`: the index into the array
- `z`: the new value of the indexed component

**See also:** Array#set

Throws:

- `NullPointerException`: If the specified object argument is null
- `IllegalArgumentException`: If the specified object argument is not an array, or if the specified value cannot be converted to the underlying array's component type by an identity or a primitive widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.setByte(Object, int, byte)

```java
public static native void setByte(Object array, int index, byte b) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Sets the value of the indexed component of the specified array
object to the specified `byte` value.

Parameters:

- `array`: the array
- `index`: the index into the array
- `b`: the new value of the indexed component

**See also:** Array#set

Throws:

- `NullPointerException`: If the specified object argument is null
- `IllegalArgumentException`: If the specified object argument is not an array, or if the specified value cannot be converted to the underlying array's component type by an identity or a primitive widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.setChar(Object, int, char)

```java
public static native void setChar(Object array, int index, char c) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Sets the value of the indexed component of the specified array
object to the specified `char` value.

Parameters:

- `array`: the array
- `index`: the index into the array
- `c`: the new value of the indexed component

**See also:** Array#set

Throws:

- `NullPointerException`: If the specified object argument is null
- `IllegalArgumentException`: If the specified object argument is not an array, or if the specified value cannot be converted to the underlying array's component type by an identity or a primitive widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.setShort(Object, int, short)

```java
public static native void setShort(Object array, int index, short s) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Sets the value of the indexed component of the specified array
object to the specified `short` value.

Parameters:

- `array`: the array
- `index`: the index into the array
- `s`: the new value of the indexed component

**See also:** Array#set

Throws:

- `NullPointerException`: If the specified object argument is null
- `IllegalArgumentException`: If the specified object argument is not an array, or if the specified value cannot be converted to the underlying array's component type by an identity or a primitive widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array
