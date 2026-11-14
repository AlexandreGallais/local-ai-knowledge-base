---
title: "Array class (java.lang.reflect) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/Array.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Array class (java.lang.reflect) (part 2 of 2)

## Array.setInt(Object, int, int)

```java
public static native void setInt(Object array, int index, int i) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Sets the value of the indexed component of the specified array
object to the specified `int` value.

Parameters:

- `array`: the array
- `index`: the index into the array
- `i`: the new value of the indexed component

**See also:** Array#set

Throws:

- `NullPointerException`: If the specified object argument is null
- `IllegalArgumentException`: If the specified object argument is not an array, or if the specified value cannot be converted to the underlying array's component type by an identity or a primitive widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.setLong(Object, int, long)

```java
public static native void setLong(Object array, int index, long l) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Sets the value of the indexed component of the specified array
object to the specified `long` value.

Parameters:

- `array`: the array
- `index`: the index into the array
- `l`: the new value of the indexed component

**See also:** Array#set

Throws:

- `NullPointerException`: If the specified object argument is null
- `IllegalArgumentException`: If the specified object argument is not an array, or if the specified value cannot be converted to the underlying array's component type by an identity or a primitive widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.setFloat(Object, int, float)

```java
public static native void setFloat(Object array, int index, float f) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Sets the value of the indexed component of the specified array
object to the specified `float` value.

Parameters:

- `array`: the array
- `index`: the index into the array
- `f`: the new value of the indexed component

**See also:** Array#set

Throws:

- `NullPointerException`: If the specified object argument is null
- `IllegalArgumentException`: If the specified object argument is not an array, or if the specified value cannot be converted to the underlying array's component type by an identity or a primitive widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array

## Array.setDouble(Object, int, double)

```java
public static native void setDouble(Object array, int index, double d) throws IllegalArgumentException, ArrayIndexOutOfBoundsException
```

Sets the value of the indexed component of the specified array
object to the specified `double` value.

Parameters:

- `array`: the array
- `index`: the index into the array
- `d`: the new value of the indexed component

**See also:** Array#set

Throws:

- `NullPointerException`: If the specified object argument is null
- `IllegalArgumentException`: If the specified object argument is not an array, or if the specified value cannot be converted to the underlying array's component type by an identity or a primitive widening conversion
- `ArrayIndexOutOfBoundsException`: If the specified `index` argument is negative, or if it is greater than or equal to the length of the specified array
