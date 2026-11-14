---
title: "FileTime class (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/FileTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileTime class (java.nio.file.attribute)

```java
public final class FileTime implements Comparable<FileTime>
```

Represents the value of a file's time stamp attribute. For example, it may
represent the time that the file was last
modified,
accessed,
or created.

 Instances of this class are immutable.

**Since:** 1.7

**See also:** java.nio.file.Files#setLastModifiedTime

**See also:** java.nio.file.Files#getLastModifiedTime

## FileTime.from(long, TimeUnit)

```java
public static FileTime from(long value, TimeUnit unit)
```

Returns a `FileTime` representing a value at the given unit of
granularity.

Parameters:

- `value`: the value since the epoch (1970-01-01T00:00:00Z); can be negative
- `unit`: the unit of granularity to interpret the value

**Returns:** a `FileTime` representing the given value

## FileTime.fromMillis(long)

```java
public static FileTime fromMillis(long value)
```

Returns a `FileTime` representing the given value in milliseconds.

Parameters:

- `value`: the value, in milliseconds, since the epoch (1970-01-01T00:00:00Z); can be negative

**Returns:** a `FileTime` representing the given value

## FileTime.from(Instant)

```java
public static FileTime from(Instant instant)
```

Returns a `FileTime` representing the same point of time value
on the time-line as the provided `Instant` object.

Parameters:

- `instant`: the instant to convert

**Returns:** a `FileTime` representing the same point on the time-line
         as the provided instant

**Since:** 1.8

## FileTime.to(TimeUnit)

```java
public long to(TimeUnit unit)
```

Returns the value at the given unit of granularity.

 Conversion from a coarser granularity that would numerically overflow
saturate to `Long.MIN_VALUE` if negative or `Long.MAX_VALUE`
if positive.

Parameters:

- `unit`: the unit of granularity for the return value

**Returns:** value in the given unit of granularity, since the epoch
         since the epoch (1970-01-01T00:00:00Z); can be negative

## FileTime.toMillis()

```java
public long toMillis()
```

Returns the value in milliseconds.

 Conversion from a coarser granularity that would numerically overflow
saturate to `Long.MIN_VALUE` if negative or `Long.MAX_VALUE`
if positive.

**Returns:** the value in milliseconds, since the epoch (1970-01-01T00:00:00Z)

## FileTime.toInstant()

```java
public Instant toInstant()
```

Converts this `FileTime` object to an `Instant`.

 The conversion creates an `Instant` that represents the
same point on the time-line as this `FileTime`.

 `FileTime` can store points on the time-line further in the
future and further in the past than `Instant`. Conversion
from such further time points saturates to `Instant.MIN` if
earlier than `Instant.MIN` or `Instant.MAX` if later
than `Instant.MAX`.

**Returns:** an instant representing the same point on the time-line as
         this `FileTime` object

**Since:** 1.8

## FileTime.equals(Object)

```java
public boolean equals(Object obj)
```

Tests this `FileTime` for equality with the given object.

 The result is `true` if and only if the argument is not `null` and is a `FileTime` that represents the same time. This
method satisfies the general contract of the `Object.equals` method.

Parameters:

- `obj`: the object to compare with

**Returns:** `true` if, and only if, the given object is a `FileTime` that represents the same time

## FileTime.hashCode()

```java
public int hashCode()
```

Computes a hash code for this file time.

 The hash code is based upon the value represented, and satisfies the
general contract of the `Object.hashCode` method.

**Returns:** the hash-code value

## FileTime.compareTo(FileTime)

```java
public int compareTo(FileTime other)
```

Compares the value of two `FileTime` objects for order.

Parameters:

- `other`: the other `FileTime` to be compared

**Returns:** `0` if this `FileTime` is equal to `other`, a
         value less than 0 if this `FileTime` represents a time
         that is before `other`, and a value greater than 0 if this
         `FileTime` represents a time that is after `other`

## FileTime.toString()

```java
public String toString()
```

Returns the string representation of this `FileTime`. The string
is returned in the ISO 8601 format:

```java
    YYYY-MM-DDThh:mm:ss[.s+]Z
```

where "`[.s+]`" represents a dot followed by one of more digits
for the decimal fraction of a second. It is only present when the decimal
fraction of a second is not zero. For example, `FileTime.fromMillis(1234567890000L).toString()` yields `"2009-02-13T23:31:30Z"`, and `FileTime.fromMillis(1234567890123L).toString()`
yields `"2009-02-13T23:31:30.123Z"`.

 A `FileTime` is primarily intended to represent the value of a
file's time stamp. Where used to represent *extreme values*, where
the year is less than "`0001`" or greater than "`9999`" then
this method deviates from ISO 8601 in the same manner as the
XML Schema
language. That is, the year may be expanded to more than four digits
and may be negative-signed. If more than four digits then leading zeros
are not present. The year before "`0001`" is "`-0001`".

**Returns:** the string representation of this file time
