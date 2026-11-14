---
title: "Runtime class (java.lang) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Runtime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Runtime class (java.lang) (part 3 of 3)

## Runtime.pre()

```java
public Optional<String> pre()
```

Returns the optional pre-release information.

**Returns:** The optional pre-release information as a String

## Runtime.build()

```java
public Optional<Integer> build()
```

Returns the build number.

**Returns:** The optional build number.

## Runtime.optional()

```java
public Optional<String> optional()
```

Returns optional additional identifying build
information.

**Returns:** Additional build information as a String

## Runtime.compareTo(Version)

```java
public int compareTo(Version obj)
```

Compares this version to another.

 Each of the components in the version is
compared in the following order of precedence: version numbers,
pre-release identifiers, build numbers, optional build information.

 Comparison begins by examining the sequence of version numbers.
If one sequence is shorter than another, then the missing elements
of the shorter sequence are considered to be less than the
corresponding elements of the longer sequence.

 A version with a pre-release identifier is always considered to
be less than a version without one.  Pre-release identifiers are
compared numerically when they consist only of digits, and
lexicographically otherwise.  Numeric identifiers are considered to
be less than non-numeric identifiers.

 A version without a build number is always less than one with a
build number; otherwise build numbers are compared numerically.

 The optional build information is compared lexicographically.
During this comparison, a version with optional build information is
considered to be greater than a version without one.

Parameters:

- `obj`: The object to be compared

**Returns:** A negative integer, zero, or a positive integer if this
         `Version` is less than, equal to, or greater than the
         given `Version`

Throws:

- `NullPointerException`: If the given object is `null`

## Runtime.compareToIgnoreOptional(Version)

```java
public int compareToIgnoreOptional(Version obj)
```

Compares this version to another disregarding optional build
information.

 Two versions are compared by examining the version string as
described in `compareTo(Version)` with the exception that the
optional build information is always ignored.

 This method provides ordering which is consistent with
`equalsIgnoreOptional()`.

Parameters:

- `obj`: The object to be compared

**Returns:** A negative integer, zero, or a positive integer if this
         `Version` is less than, equal to, or greater than the
         given `Version`

Throws:

- `NullPointerException`: If the given object is `null`

## Runtime.toString()

```java
public String toString()
```

Returns a string representation of this version.

**Returns:** The version string

## Runtime.equals(Object)

```java
public boolean equals(Object obj)
```

Determines whether this `Version` is equal to another object.

 Two `Version`s are equal if and only if they represent the
same version string.

Parameters:

- `obj`: The object to which this `Version` is to be compared

**Returns:** `true` if, and only if, the given object is a `Version` that is identical to this `Version`

## Runtime.equalsIgnoreOptional(Object)

```java
public boolean equalsIgnoreOptional(Object obj)
```

Determines whether this `Version` is equal to another
disregarding optional build information.

 Two `Version`s are equal if and only if they represent the
same version string disregarding the optional build information.

Parameters:

- `obj`: The object to which this `Version` is to be compared

**Returns:** `true` if, and only if, the given object is a `Version` that is identical to this `Version`
         ignoring the optional build information

## Runtime.hashCode()

```java
public int hashCode()
```

Returns the hash code of this version.

**Returns:** The hashcode of this version
