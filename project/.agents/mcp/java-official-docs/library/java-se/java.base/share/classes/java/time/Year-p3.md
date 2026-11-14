---
title: "Year class (java.time) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/Year.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Year class (java.time) (part 3 of 3)

## Year.isAfter(Year)

```java
public boolean isAfter(Year other)
```

Checks if this year is after the specified year.

Parameters:

- `other`: the other year to compare to, not null

**Returns:** true if this is after the specified year

## Year.isBefore(Year)

```java
public boolean isBefore(Year other)
```

Checks if this year is before the specified year.

Parameters:

- `other`: the other year to compare to, not null

**Returns:** true if this point is before the specified year

## Year.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this year is equal to another year.

The comparison is based on the time-line position of the years.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other year

## Year.hashCode()

```java
public int hashCode()
```

A hash code for this year.

**Returns:** a suitable hash code

## Year.toString()

```java
public String toString()
```

Outputs this year as a `String`.

**Returns:** a string representation of this year, not null
