---
title: "Arrays class (java.util) (part 10 of 19)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Arrays.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Arrays class (java.util) (part 10 of 19)

## Arrays.hashCode(long[])

```java
public static int hashCode(long[] a)
```

Returns a hash code based on the contents of the specified array.
For any two `long` arrays `a` and `b`
such that `Arrays.equals(a, b)`, it is also the case that
`Arrays.hashCode(a) == Arrays.hashCode(b)`.

The value returned by this method is the same value that would be
obtained by invoking the hashCode
method on a `List` containing a sequence of `Long`
instances representing the elements of `a` in the same order.
If `a` is `null`, this method returns 0.

Parameters:

- `a`: the array whose hash value to compute

**Returns:** a content-based hash code for `a`

**Since:** 1.5

## Arrays.hashCode(int[])

```java
public static int hashCode(int[] a)
```

Returns a hash code based on the contents of the specified array.
For any two non-null `int` arrays `a` and `b`
such that `Arrays.equals(a, b)`, it is also the case that
`Arrays.hashCode(a) == Arrays.hashCode(b)`.

The value returned by this method is the same value that would be
obtained by invoking the hashCode
method on a `List` containing a sequence of `Integer`
instances representing the elements of `a` in the same order.
If `a` is `null`, this method returns 0.

Parameters:

- `a`: the array whose hash value to compute

**Returns:** a content-based hash code for `a`

**Since:** 1.5

## Arrays.hashCode(short[])

```java
public static int hashCode(short[] a)
```

Returns a hash code based on the contents of the specified array.
For any two `short` arrays `a` and `b`
such that `Arrays.equals(a, b)`, it is also the case that
`Arrays.hashCode(a) == Arrays.hashCode(b)`.

The value returned by this method is the same value that would be
obtained by invoking the hashCode
method on a `List` containing a sequence of `Short`
instances representing the elements of `a` in the same order.
If `a` is `null`, this method returns 0.

Parameters:

- `a`: the array whose hash value to compute

**Returns:** a content-based hash code for `a`

**Since:** 1.5

## Arrays.hashCode(char[])

```java
public static int hashCode(char[] a)
```

Returns a hash code based on the contents of the specified array.
For any two `char` arrays `a` and `b`
such that `Arrays.equals(a, b)`, it is also the case that
`Arrays.hashCode(a) == Arrays.hashCode(b)`.

The value returned by this method is the same value that would be
obtained by invoking the hashCode
method on a `List` containing a sequence of `Character`
instances representing the elements of `a` in the same order.
If `a` is `null`, this method returns 0.

Parameters:

- `a`: the array whose hash value to compute

**Returns:** a content-based hash code for `a`

**Since:** 1.5

## Arrays.hashCode(byte[])

```java
public static int hashCode(byte[] a)
```

Returns a hash code based on the contents of the specified array.
For any two `byte` arrays `a` and `b`
such that `Arrays.equals(a, b)`, it is also the case that
`Arrays.hashCode(a) == Arrays.hashCode(b)`.

The value returned by this method is the same value that would be
obtained by invoking the hashCode
method on a `List` containing a sequence of `Byte`
instances representing the elements of `a` in the same order.
If `a` is `null`, this method returns 0.

Parameters:

- `a`: the array whose hash value to compute

**Returns:** a content-based hash code for `a`

**Since:** 1.5

## Arrays.hashCode(boolean[])

```java
public static int hashCode(boolean[] a)
```

Returns a hash code based on the contents of the specified array.
For any two `boolean` arrays `a` and `b`
such that `Arrays.equals(a, b)`, it is also the case that
`Arrays.hashCode(a) == Arrays.hashCode(b)`.

The value returned by this method is the same value that would be
obtained by invoking the hashCode
method on a `List` containing a sequence of `Boolean`
instances representing the elements of `a` in the same order.
If `a` is `null`, this method returns 0.

Parameters:

- `a`: the array whose hash value to compute

**Returns:** a content-based hash code for `a`

**Since:** 1.5

## Arrays.hashCode(float[])

```java
public static int hashCode(float[] a)
```

Returns a hash code based on the contents of the specified array.
For any two `float` arrays `a` and `b`
such that `Arrays.equals(a, b)`, it is also the case that
`Arrays.hashCode(a) == Arrays.hashCode(b)`.

The value returned by this method is the same value that would be
obtained by invoking the hashCode
method on a `List` containing a sequence of `Float`
instances representing the elements of `a` in the same order.
If `a` is `null`, this method returns 0.

Parameters:

- `a`: the array whose hash value to compute

**Returns:** a content-based hash code for `a`

**Since:** 1.5

## Arrays.hashCode(double[])

```java
public static int hashCode(double[] a)
```

Returns a hash code based on the contents of the specified array.
For any two `double` arrays `a` and `b`
such that `Arrays.equals(a, b)`, it is also the case that
`Arrays.hashCode(a) == Arrays.hashCode(b)`.

The value returned by this method is the same value that would be
obtained by invoking the hashCode
method on a `List` containing a sequence of `Double`
instances representing the elements of `a` in the same order.
If `a` is `null`, this method returns 0.

Parameters:

- `a`: the array whose hash value to compute

**Returns:** a content-based hash code for `a`

**Since:** 1.5

## Arrays.hashCode(Object[])

```java
public static int hashCode(Object[] a)
```

Returns a hash code based on the contents of the specified array.  If
the array contains other arrays as elements, the hash code is based on
their identities rather than their contents.  It is therefore
acceptable to invoke this method on an array that contains itself as an
element,  either directly or indirectly through one or more levels of
arrays.

For any two arrays `a` and `b` such that
`Arrays.equals(a, b)`, it is also the case that
`Arrays.hashCode(a) == Arrays.hashCode(b)`.

The value returned by this method is equal to the value that would
be returned by `Arrays.asList(a).hashCode()`, unless `a`
is `null`, in which case `0` is returned.

Parameters:

- `a`: the array whose content-based hash code to compute

**Returns:** a content-based hash code for `a`

**See also:** #deepHashCode(Object[])

**Since:** 1.5

## Arrays.deepHashCode(Object[])

```java
public static int deepHashCode(Object[] a)
```

Returns a hash code based on the "deep contents" of the specified
array.  If the array contains other arrays as elements, the
hash code is based on their contents and so on, ad infinitum.
It is therefore unacceptable to invoke this method on an array that
contains itself as an element, either directly or indirectly through
one or more levels of arrays.  The behavior of such an invocation is
undefined.

For any two arrays `a` and `b` such that
`Arrays.deepEquals(a, b)`, it is also the case that
`Arrays.deepHashCode(a) == Arrays.deepHashCode(b)`.

The computation of the value returned by this method is similar to
that of the value returned by `List.hashCode()` on a list
containing the same elements as `a` in the same order, with one
difference: If an element `e` of `a` is itself an array,
its hash code is computed not by calling `e.hashCode()`, but as
by calling the appropriate overloading of `Arrays.hashCode(e)`
if `e` is an array of a primitive type, or as by calling
`Arrays.deepHashCode(e)` recursively if `e` is an array
of a reference type.  If `a` is `null`, this method
returns 0.

Parameters:

- `a`: the array whose deep-content-based hash code to compute

**Returns:** a deep-content-based hash code for `a`

**See also:** #hashCode(Object[])

**Since:** 1.5

## Arrays.deepEquals(Object[], Object[])

```java
public static boolean deepEquals(Object[] a1, Object[] a2)
```

Returns `true` if the two specified arrays are *deeply
equal* to one another.  Unlike the `equals(Object[],Object[])`
method, this method is appropriate for use with nested arrays of
arbitrary depth.

Two array references are considered deeply equal if both
are `null`, or if they refer to arrays that contain the same
number of elements and all corresponding pairs of elements in the two
arrays are deeply equal.

Two possibly `null` elements `e1` and `e2` are
deeply equal if any of the following conditions hold:

-  `e1` and `e2` are both arrays of object reference
        types, and `Arrays.deepEquals(e1, e2) would return true`

-  `e1` and `e2` are arrays of the same primitive
        type, and the appropriate overloading of
        `Arrays.equals(e1, e2)` would return true.

-  `e1 == e2`

-  `e1.equals(e2)` would return true.

Note that this definition permits `null` elements at any depth.

If either of the specified arrays contain themselves as elements
either directly or indirectly through one or more levels of arrays,
the behavior of this method is undefined.

Parameters:

- `a1`: one array to be tested for equality
- `a2`: the other array to be tested for equality

**Returns:** `true` if the two arrays are equal

**See also:** #equals(Object[],Object[])

**See also:** Objects#deepEquals(Object, Object)

**Since:** 1.5

## Arrays.toString(long[])

```java
public static String toString(long[] a)
```

Returns a string representation of the contents of the specified array.
The string representation consists of a list of the array's elements,
enclosed in square brackets (`"[]"`).  Adjacent elements are
separated by the characters `", "` (a comma followed by a
space).  Elements are converted to strings as by
`String.valueOf(long)`.  Returns `"null"` if `a`
is `null`.

Parameters:

- `a`: the array whose string representation to return

**Returns:** a string representation of `a`

**Since:** 1.5

## Arrays.toString(int[])

```java
public static String toString(int[] a)
```

Returns a string representation of the contents of the specified array.
The string representation consists of a list of the array's elements,
enclosed in square brackets (`"[]"`).  Adjacent elements are
separated by the characters `", "` (a comma followed by a
space).  Elements are converted to strings as by
`String.valueOf(int)`.  Returns `"null"` if `a` is
`null`.

Parameters:

- `a`: the array whose string representation to return

**Returns:** a string representation of `a`

**Since:** 1.5

## Arrays.toString(short[])

```java
public static String toString(short[] a)
```

Returns a string representation of the contents of the specified array.
The string representation consists of a list of the array's elements,
enclosed in square brackets (`"[]"`).  Adjacent elements are
separated by the characters `", "` (a comma followed by a
space).  Elements are converted to strings as by
`String.valueOf(short)`.  Returns `"null"` if `a`
is `null`.

Parameters:

- `a`: the array whose string representation to return

**Returns:** a string representation of `a`

**Since:** 1.5

## Arrays.toString(char[])

```java
public static String toString(char[] a)
```

Returns a string representation of the contents of the specified array.
The string representation consists of a list of the array's elements,
enclosed in square brackets (`"[]"`).  Adjacent elements are
separated by the characters `", "` (a comma followed by a
space).  Elements are converted to strings as by
`String.valueOf(char)`.  Returns `"null"` if `a`
is `null`.

Parameters:

- `a`: the array whose string representation to return

**Returns:** a string representation of `a`

**Since:** 1.5

## Arrays.toString(byte[])

```java
public static String toString(byte[] a)
```

Returns a string representation of the contents of the specified array.
The string representation consists of a list of the array's elements,
enclosed in square brackets (`"[]"`).  Adjacent elements
are separated by the characters `", "` (a comma followed
by a space).  Elements are converted to strings as by
`String.valueOf(byte)`.  Returns `"null"` if
`a` is `null`.

Parameters:

- `a`: the array whose string representation to return

**Returns:** a string representation of `a`

**Since:** 1.5

## Arrays.toString(boolean[])

```java
public static String toString(boolean[] a)
```

Returns a string representation of the contents of the specified array.
The string representation consists of a list of the array's elements,
enclosed in square brackets (`"[]"`).  Adjacent elements are
separated by the characters `", "` (a comma followed by a
space).  Elements are converted to strings as by
`String.valueOf(boolean)`.  Returns `"null"` if
`a` is `null`.

Parameters:

- `a`: the array whose string representation to return

**Returns:** a string representation of `a`

**Since:** 1.5

## Arrays.toString(float[])

```java
public static String toString(float[] a)
```

Returns a string representation of the contents of the specified array.
The string representation consists of a list of the array's elements,
enclosed in square brackets (`"[]"`).  Adjacent elements are
separated by the characters `", "` (a comma followed by a
space).  Elements are converted to strings as by
`String.valueOf(float)`.  Returns `"null"` if `a`
is `null`.

Parameters:

- `a`: the array whose string representation to return

**Returns:** a string representation of `a`

**Since:** 1.5

## Arrays.toString(double[])

```java
public static String toString(double[] a)
```

Returns a string representation of the contents of the specified array.
The string representation consists of a list of the array's elements,
enclosed in square brackets (`"[]"`).  Adjacent elements are
separated by the characters `", "` (a comma followed by a
space).  Elements are converted to strings as by
`String.valueOf(double)`.  Returns `"null"` if `a`
is `null`.

Parameters:

- `a`: the array whose string representation to return

**Returns:** a string representation of `a`

**Since:** 1.5

## Arrays.toString(Object[])

```java
public static String toString(Object[] a)
```

Returns a string representation of the contents of the specified array.
If the array contains other arrays as elements, they are converted to
strings by the `Object.toString` method inherited from
`Object`, which describes their *identities* rather than
their contents.

The value returned by this method is equal to the value that would
be returned by `Arrays.asList(a).toString()`, unless `a`
is `null`, in which case `"null"` is returned.

Parameters:

- `a`: the array whose string representation to return

**Returns:** a string representation of `a`

**See also:** #deepToString(Object[])

**Since:** 1.5
