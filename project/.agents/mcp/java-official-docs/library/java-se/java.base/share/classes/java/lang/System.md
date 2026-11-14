---
title: "System class (java.lang) (part 1 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/System.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# System class (java.lang)

```java
public final class System
```

The `System` class contains several useful class fields
and methods. It cannot be instantiated.

Among the facilities provided by the `System` class
are standard input, standard output, and error output streams;
access to externally defined properties and environment
variables; a means of loading files and libraries; and a utility
method for quickly copying a portion of an array.

**Since:** 1.0

## System.in

```java
public static final InputStream in
```

The "standard" input stream. This stream is already
open and ready to supply input data. This stream
corresponds to keyboard input or another input source specified by
the host environment or user. Applications should use the encoding
specified by the stdin.encoding property
to convert input bytes to character data.

**API note:** The typical approach to read character data is to wrap `System.in`
within the object that handles character encoding. After this is done,
subsequent reading should use only the wrapper object; continuing to
operate directly on `System.in` results in unspecified behavior.

Here are two common examples. Using an InputStreamReader:

Or using a Scanner:

For handling interactive input, consider using `Console`.

**See also:** Console

**See also:** ##stdin.encoding stdin.encoding

## System.out

```java
public static final PrintStream out
```

The "standard" output stream. This stream is already
open and ready to accept output data. Typically this stream
corresponds to display output or another output destination
specified by the host environment or user. The encoding used
in the conversion from characters to bytes is equivalent to
stdout.encoding.

For simple stand-alone Java applications, a typical way to write
a line of output data is:

```java
    System.out.println(data)
```

See the `println` methods in class `PrintStream`.

**See also:** java.io.PrintStream#println()

**See also:** java.io.PrintStream#println(boolean)

**See also:** java.io.PrintStream#println(char)

**See also:** java.io.PrintStream#println(char[])

**See also:** java.io.PrintStream#println(double)

**See also:** java.io.PrintStream#println(float)

**See also:** java.io.PrintStream#println(int)

**See also:** java.io.PrintStream#println(long)

**See also:** java.io.PrintStream#println(java.lang.Object)

**See also:** java.io.PrintStream#println(java.lang.String)

**See also:** ##stdout.encoding stdout.encoding

## System.err

```java
public static final PrintStream err
```

The "standard" error output stream. This stream is already
open and ready to accept output data.

Typically this stream corresponds to display output or another
output destination specified by the host environment or user. By
convention, this output stream is used to display error messages
or other information that should come to the immediate attention
of a user even if the principal output stream, the value of the
variable `out`, has been redirected to a file or other
destination that is typically not continuously monitored.
The encoding used in the conversion from characters to bytes is
equivalent to stderr.encoding.

**See also:** ##stderr.encoding stderr.encoding

## System.setIn(InputStream)

```java
public static void setIn(InputStream in)
```

Reassigns the "standard" input stream.

Parameters:

- `in`: the new standard input stream.

**Since:** 1.1

## System.setOut(PrintStream)

```java
public static void setOut(PrintStream out)
```

Reassigns the "standard" output stream.

Parameters:

- `out`: the new standard output stream

**Since:** 1.1

## System.setErr(PrintStream)

```java
public static void setErr(PrintStream err)
```

Reassigns the "standard" error output stream.

Parameters:

- `err`: the new standard error output stream.

**Since:** 1.1

## System.console()

```java
public static Console console()
```

Returns the unique Console object associated
with the current Java virtual machine, if any.

**Returns:** The system console, if any, otherwise `null`.

**Since:** 1.6

## System.inheritedChannel()

```java
public static Channel inheritedChannel() throws IOException
```

Returns the channel inherited from the entity that created this
Java virtual machine.

This method returns the channel obtained by invoking the
inheritedChannel method of the system-wide default
`java.nio.channels.spi.SelectorProvider` object.

 In addition to the network-oriented channels described in
inheritedChannel, this method may return other kinds of
channels in the future.

**Returns:** The inherited channel, if any, otherwise `null`.

**Since:** 1.5

Throws:

- `IOException`: If an I/O error occurs

## System.setSecurityManager(SecurityManager)

```java
public static void setSecurityManager( SecurityManager sm)
```

Throws `UnsupportedOperationException`. Setting a security manager
is not supported.

Parameters:

- `sm`: ignored

**See also:** #getSecurityManager

**Deprecated:** This method originally set
      the system-wide Security Manager.
      Setting a Security Manager is no longer supported. There is no
      replacement for the Security Manager or this method.

Throws:

- `UnsupportedOperationException`: always

## System.getSecurityManager()

```java
public static SecurityManager getSecurityManager()
```

Returns `null`. Setting a security manager is not supported.

**Returns:** `null`

**See also:** #setSecurityManager

**Deprecated:** This method originally returned
      the system-wide Security Manager.
      Setting a Security Manager is no longer supported. There is no
      replacement for the Security Manager or this method.

## System.currentTimeMillis()

```java
public static native long currentTimeMillis()
```

Returns the current time in milliseconds.  Note that
while the unit of time of the return value is a millisecond,
the granularity of the value depends on the underlying
operating system and may be larger.  For example, many
operating systems measure time in units of tens of
milliseconds.

 See the description of the class `Date` for
a discussion of slight discrepancies that may arise between
"computer time" and coordinated universal time (UTC).

**Returns:** the difference, measured in milliseconds, between
         the current time and midnight, January 1, 1970 UTC.

**See also:** java.util.Date

## System.nanoTime()

```java
public static native long nanoTime()
```

Returns the current value of the running Java Virtual Machine's
high-resolution time source, in nanoseconds.

This method can only be used to measure elapsed time and is
not related to any other notion of system or wall-clock time.
The value returned represents nanoseconds since some fixed but
arbitrary *origin* time (perhaps in the future, so values
may be negative).  The same origin is used by all invocations of
this method in an instance of a Java virtual machine; other
virtual machine instances are likely to use a different origin.

This method provides nanosecond precision, but not necessarily
nanosecond resolution (that is, how frequently the value changes)
- no guarantees are made except that the resolution is at least as
good as that of `currentTimeMillis()`.

Differences in successive calls that span greater than
approximately 292 years (263 nanoseconds) will not
correctly compute elapsed time due to numerical overflow.

The values returned by this method become meaningful only when
the difference between two such values, obtained within the same
instance of a Java virtual machine, is computed.

For example, to measure how long some code takes to execute:

```java
long startTime = System.nanoTime();
// ... the code being measured ...
long elapsedNanos = System.nanoTime() - startTime;
```

To compare elapsed time against a timeout, use

```java
if (System.nanoTime() - startTime >= timeoutNanos) ...
```

instead of

```java
if (System.nanoTime() >= startTime + timeoutNanos) ...
```

because of the possibility of numerical overflow.

**Returns:** the current value of the running Java Virtual Machine's
        high-resolution time source, in nanoseconds

**Since:** 1.5

## System.arraycopy(Object, int, Object, int, int)

```java
public static native void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)
```

Copies an array from the specified source array, beginning at the
specified position, to the specified position of the destination array.
A subsequence of array components are copied from the source
array referenced by `src` to the destination array
referenced by `dest`. The number of components copied is
equal to the `length` argument. The components at
positions `srcPos` through
`srcPos+length-1` in the source array are copied into
positions `destPos` through
`destPos+length-1`, respectively, of the destination
array.

If the `src` and `dest` arguments refer to the
same array object, then the copying is performed as if the
components at positions `srcPos` through
`srcPos+length-1` were first copied to a temporary
array with `length` components and then the contents of
the temporary array were copied into positions
`destPos` through `destPos+length-1` of the
destination array.

If `dest` is `null`, then a
`NullPointerException` is thrown.

If `src` is `null`, then a
`NullPointerException` is thrown and the destination
array is not modified.

Otherwise, if any of the following is true, an
`ArrayStoreException` is thrown and the destination is
not modified:

- The `src` argument refers to an object that is not an
    array.

- The `dest` argument refers to an object that is not an
    array.

- The `src` argument and `dest` argument refer
    to arrays whose component types are different primitive types.

- The `src` argument refers to an array with a primitive
   component type and the `dest` argument refers to an array
    with a reference component type.

- The `src` argument refers to an array with a reference
   component type and the `dest` argument refers to an array
    with a primitive component type.

Otherwise, if any of the following is true, an
`IndexOutOfBoundsException` is
thrown and the destination is not modified:

- The `srcPos` argument is negative.

- The `destPos` argument is negative.

- The `length` argument is negative.

- `srcPos+length` is greater than
    `src.length`, the length of the source array.

- `destPos+length` is greater than
    `dest.length`, the length of the destination array.

Otherwise, if any actual component of the source array from
position `srcPos` through
`srcPos+length-1` cannot be converted to the component
type of the destination array by assignment conversion, an
`ArrayStoreException` is thrown. In this case, let
***k*** be the smallest nonnegative integer less than
length such that `src[srcPos+`*k*`]`
cannot be converted to the component type of the destination
array; when the exception is thrown, source array components from
positions `srcPos` through
`srcPos+`*k*`-1`
will already have been copied to destination array positions
`destPos` through
`destPos+`*k*`-1` and no other
positions of the destination array will have been modified.
(Because of the restrictions already itemized, this
paragraph effectively applies only to the situation where both
arrays have component types that are reference types.)

Parameters:

- `src`: the source array.
- `srcPos`: starting position in the source array.
- `dest`: the destination array.
- `destPos`: starting position in the destination data.
- `length`: the number of array elements to be copied.

Throws:

- `IndexOutOfBoundsException`: if copying would cause access of data outside array bounds.
- `ArrayStoreException`: if an element in the `src` array could not be stored into the `dest` array because of a type mismatch.
- `NullPointerException`: if either `src` or `dest` is `null`.

## System.identityHashCode(Object)

```java
public static native int identityHashCode(Object x)
```

Returns the same hash code for the given object as
would be returned by the default method hashCode(),
whether or not the given object's class overrides
hashCode().
The hash code for the null reference is zero.

Parameters:

- `x`: object for which the hashCode is to be calculated

**Returns:** the hashCode

**Since:** 1.1

**See also:** Object#hashCode

**See also:** java.util.Objects#hashCode(Object)
