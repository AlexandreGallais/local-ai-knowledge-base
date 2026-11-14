---
title: "Objects class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Objects.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Objects class (java.util)

```java
public final class Objects
```

This class consists of `static` utility methods for operating
on objects, or checking certain conditions before operation.  These utilities
include `null`-safe or `null`-tolerant methods for computing the
hash code of an object, returning a string for an object, comparing two
objects, and checking if indexes or sub-range values are out of bounds.

**Since:** 1.7

## Objects.equals(Object, Object)

```java
public static boolean equals(Object a, Object b)
```

Consequently, if both arguments are `null`, `true`
is returned.  Otherwise, if the first argument is not `null`, equality is determined by calling the equals method of the first argument with the
second argument of this method. Otherwise, `false` is
returned.

Parameters:

- `a`: an object
- `b`: an object to be compared with `a` for equality

**See also:** Object#equals(Object)

## Objects.deepEquals(Object, Object)

```java
public static boolean deepEquals(Object a, Object b)
```

Two `null` values are deeply equal.  If both arguments are
arrays, the algorithm in Object[]) Arrays.deepEquals is used to determine equality.
Otherwise, equality is determined by using the equals method of the first argument.

Parameters:

- `a`: an object
- `b`: an object to be compared with `a` for deep equality

**See also:** Arrays#deepEquals(Object[], Object[])

**See also:** Objects#equals(Object, Object)

## Objects.hashCode(Object)

```java
public static int hashCode(Object o)
```

Parameters:

- `o`: an object

**See also:** Object#hashCode

## Objects.hash(Object...)

```java
public static int hash(Object... values)
```

The hash
code is generated as if all the input values were placed into an
array, and that array were hashed by calling `Arrays.hashCode(Object[])`.

This method is useful for implementing `Object.hashCode()` on objects containing multiple fields. For
example, if an object that has three fields, `x`, `y`, and `z`, one could write:

```java
@Override public int hashCode() {
    return Objects.hash(x, y, z);
```

**Warning: When a single object reference is supplied, the returned
value does not equal the hash code of that object reference.** This
value can be computed by calling `hashCode(Object)`.

Parameters:

- `values`: the values to be hashed

**See also:** Arrays#hashCode(Object[])

**See also:** List#hashCode

## Objects.toString(Object)

```java
public static String toString(Object o)
```

Parameters:

- `o`: an object

**See also:** Object#toString

**See also:** String#valueOf(Object)

## Objects.toString(Object, String)

```java
public static String toString(Object o, String nullDefault)
```

Parameters:

- `o`: an object
- `nullDefault`: string to return if the first argument is `null`

**See also:** Objects#toString(Object)

## Objects.toIdentityString(Object)

```java
public static String toIdentityString(Object o)
```

Parameters:

- `o`: an object

**Implementation note:** This method constructs a string for an object without calling
any overridable methods of the object.

**Implementation requirements:** The method returns a string equivalent to:

`o.getClass().getName() + "@" + Integer.toHexString(System.identityHashCode(o))`

**See also:** Object#toString

**See also:** System#identityHashCode(Object)

**Since:** 19

Throws:

- `NullPointerException`: if the argument is null

## Objects.compare(T, T, Comparator<? super T>)

```java
public static <T> int compare(T a, T b, Comparator<? super T> c)
```

Consequently, if both arguments are `null` 0
is returned.

Note that if one of the arguments is `null`, a `NullPointerException` may or may not be thrown depending on
what ordering policy, if any, the Comparator
chooses to have for `null` values.

Parameters:

- `<T>`: the type of the objects being compared
- `a`: an object
- `b`: an object to be compared with `a`
- `c`: the `Comparator` to compare the first two arguments

**See also:** Comparable

**See also:** Comparator

## Objects.requireNonNull(T)

```java
public static <T> T requireNonNull(T obj)
```

Checks that the specified object reference is not `null`. This
method is designed primarily for doing parameter validation in methods
and constructors, as demonstrated below:

```java
public Foo(Bar bar) {
    this.bar = Objects.requireNonNull(bar);
```

Parameters:

- `obj`: the object reference to check for nullity
- `<T>`: the type of the reference

**Returns:** `obj` if not `null`

Throws:

- `NullPointerException`: if `obj` is `null`

## Objects.requireNonNull(T, String)

```java
public static <T> T requireNonNull(T obj, String message)
```

Checks that the specified object reference is not `null` and
throws a customized `NullPointerException` if it is. This method
is designed primarily for doing parameter validation in methods and
constructors with multiple parameters, as demonstrated below:

```java
public Foo(Bar bar, Baz baz) {
    this.bar = Objects.requireNonNull(bar, "bar must not be null");
    this.baz = Objects.requireNonNull(baz, "baz must not be null");
```

Parameters:

- `obj`: the object reference to check for nullity
- `message`: detail message to be used in the event that a `NullPointerException` is thrown
- `<T>`: the type of the reference

**Returns:** `obj` if not `null`

Throws:

- `NullPointerException`: if `obj` is `null`

## Objects.isNull(Object)

```java
public static boolean isNull(Object obj)
```

Parameters:

- `obj`: a reference to be checked against `null`

**API note:** This method exists to be used as a
`java.util.function.Predicate`, `filter(Objects::isNull)`

**See also:** java.util.function.Predicate

**Since:** 1.8

## Objects.nonNull(Object)

```java
public static boolean nonNull(Object obj)
```

Parameters:

- `obj`: a reference to be checked against `null`

**API note:** This method exists to be used as a
`java.util.function.Predicate`, `filter(Objects::nonNull)`

**See also:** java.util.function.Predicate

**Since:** 1.8

## Objects.requireNonNullElse(T, T)

```java
public static <T> T requireNonNullElse(T obj, T defaultObj)
```

Parameters:

- `obj`: an object
- `defaultObj`: a non-`null` object to return if the first argument is `null`
- `<T>`: the type of the reference

**Since:** 9

Throws:

- `NullPointerException`: if both `obj` is null and `defaultObj` is `null`

## Objects.requireNonNullElseGet(T, Supplier<? extends T>)

```java
public static <T> T requireNonNullElseGet(T obj, Supplier<? extends T> supplier)
```

Parameters:

- `obj`: an object
- `supplier`: of a non-`null` object to return if the first argument is `null`
- `<T>`: the type of the first argument and return type

**Since:** 9

Throws:

- `NullPointerException`: if both `obj` is null and either the `supplier` is `null` or the `supplier.get()` value is `null`

## Objects.requireNonNull(T, Supplier<String>)

```java
public static <T> T requireNonNull(T obj, Supplier<String> messageSupplier)
```

Checks that the specified object reference is not `null` and
throws a customized `NullPointerException` if it is.

Unlike the method String),
this method allows creation of the message to be deferred until
after the null check is made. While this may confer a
performance advantage in the non-null case, when deciding to
call this method care should be taken that the costs of
creating the message supplier are less than the cost of just
creating the string message directly.

Parameters:

- `obj`: the object reference to check for nullity
- `messageSupplier`: supplier of the detail message to be used in the event that a `NullPointerException` is thrown
- `<T>`: the type of the reference

**Returns:** `obj` if not `null`

**Since:** 1.8

Throws:

- `NullPointerException`: if `obj` is `null`

## Objects.checkIndex(int, int)

```java
public static int checkIndex(int index, int length)
```

Checks if the `index` is within the bounds of the range from
`0` (inclusive) to `length` (exclusive).

The `index` is defined to be out of bounds if any of the
following inequalities is true:

- `index < 0`

- `index >= length`

- `length < 0`, which is implied from the former inequalities

Parameters:

- `index`: the index
- `length`: the upper-bound (exclusive) of the range

**Returns:** `index` if it is within bounds of the range

**Since:** 9

Throws:

- `IndexOutOfBoundsException`: if the `index` is out of bounds

## Objects.checkFromToIndex(int, int, int)

```java
public static int checkFromToIndex(int fromIndex, int toIndex, int length)
```

Checks if the sub-range from `fromIndex` (inclusive) to
`toIndex` (exclusive) is within the bounds of range from `0`
(inclusive) to `length` (exclusive).

The sub-range is defined to be out of bounds if any of the following
inequalities is true:

- `fromIndex < 0`

- `fromIndex > toIndex`

- `toIndex > length`

- `length < 0`, which is implied from the former inequalities

Parameters:

- `fromIndex`: the lower-bound (inclusive) of the sub-range
- `toIndex`: the upper-bound (exclusive) of the sub-range
- `length`: the upper-bound (exclusive) the range

**Returns:** `fromIndex` if the sub-range within bounds of the range

**Since:** 9

Throws:

- `IndexOutOfBoundsException`: if the sub-range is out of bounds

## Objects.checkFromIndexSize(int, int, int)

```java
public static int checkFromIndexSize(int fromIndex, int size, int length)
```

Checks if the sub-range from `fromIndex` (inclusive) to
`fromIndex + size` (exclusive) is within the bounds of range from
`0` (inclusive) to `length` (exclusive).

The sub-range is defined to be out of bounds if any of the following
inequalities is true:

- `fromIndex < 0`

- `size < 0`

- `fromIndex + size > length`, taking into account integer overflow

- `length < 0`, which is implied from the former inequalities

Parameters:

- `fromIndex`: the lower-bound (inclusive) of the sub-interval
- `size`: the size of the sub-range
- `length`: the upper-bound (exclusive) of the range

**Returns:** `fromIndex` if the sub-range within bounds of the range

**Since:** 9

Throws:

- `IndexOutOfBoundsException`: if the sub-range is out of bounds

## Objects.checkIndex(long, long)

```java
public static long checkIndex(long index, long length)
```

Checks if the `index` is within the bounds of the range from
`0` (inclusive) to `length` (exclusive).

The `index` is defined to be out of bounds if any of the
following inequalities is true:

- `index < 0`

- `index >= length`

- `length < 0`, which is implied from the former inequalities

Parameters:

- `index`: the index
- `length`: the upper-bound (exclusive) of the range

**Returns:** `index` if it is within bounds of the range

**Since:** 16

Throws:

- `IndexOutOfBoundsException`: if the `index` is out of bounds

## Objects.checkFromToIndex(long, long, long)

```java
public static long checkFromToIndex(long fromIndex, long toIndex, long length)
```

Checks if the sub-range from `fromIndex` (inclusive) to
`toIndex` (exclusive) is within the bounds of range from `0`
(inclusive) to `length` (exclusive).

The sub-range is defined to be out of bounds if any of the following
inequalities is true:

- `fromIndex < 0`

- `fromIndex > toIndex`

- `toIndex > length`

- `length < 0`, which is implied from the former inequalities

Parameters:

- `fromIndex`: the lower-bound (inclusive) of the sub-range
- `toIndex`: the upper-bound (exclusive) of the sub-range
- `length`: the upper-bound (exclusive) the range

**Returns:** `fromIndex` if the sub-range within bounds of the range

**Since:** 16

Throws:

- `IndexOutOfBoundsException`: if the sub-range is out of bounds

## Objects.checkFromIndexSize(long, long, long)

```java
public static long checkFromIndexSize(long fromIndex, long size, long length)
```

Checks if the sub-range from `fromIndex` (inclusive) to
`fromIndex + size` (exclusive) is within the bounds of range from
`0` (inclusive) to `length` (exclusive).

The sub-range is defined to be out of bounds if any of the following
inequalities is true:

- `fromIndex < 0`

- `size < 0`

- `fromIndex + size > length`, taking into account integer overflow

- `length < 0`, which is implied from the former inequalities

Parameters:

- `fromIndex`: the lower-bound (inclusive) of the sub-interval
- `size`: the size of the sub-range
- `length`: the upper-bound (exclusive) of the range

**Returns:** `fromIndex` if the sub-range within bounds of the range

**Since:** 16

Throws:

- `IndexOutOfBoundsException`: if the sub-range is out of bounds
