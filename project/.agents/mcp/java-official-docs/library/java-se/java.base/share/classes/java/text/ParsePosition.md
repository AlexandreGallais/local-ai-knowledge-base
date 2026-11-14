---
title: "ParsePosition class (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/ParsePosition.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ParsePosition class (java.text)

```java
public class ParsePosition
```

`ParsePosition` is a simple class used by `Format`
and its subclasses to keep track of the current position during parsing.
The `parseObject` method in the various `Format`
classes requires a `ParsePosition` object as an argument.

By design, as you parse through a string with different formats,
you can use the same `ParsePosition`, since the index parameter
records the current position.

**Since:** 1.1

**See also:** java.text.Format

## ParsePosition.getIndex()

```java
public int getIndex()
```

Retrieve the current parse position.  On input to a parse method, this
is the index of the character at which parsing will begin; on output, it
is the index of the character following the last character parsed.

**Returns:** the current parse position

## ParsePosition.setIndex(int)

```java
public void setIndex(int index)
```

Set the current parse position.

Parameters:

- `index`: the current parse position

## ParsePosition.ParsePosition(int)

```java
public ParsePosition(int index)
```

Create a new ParsePosition with the given initial index.

Parameters:

- `index`: initial index

## ParsePosition.setErrorIndex(int)

```java
public void setErrorIndex(int ei)
```

Set the index at which a parse error occurred.  Formatters
should set this before returning an error code from their
parseObject method.  The default value is -1 if this is not set.

Parameters:

- `ei`: the index at which an error occurred

**Since:** 1.2

## ParsePosition.getErrorIndex()

```java
public int getErrorIndex()
```

Retrieve the index at which an error occurred, or -1 if the
error index has not been set.

**Returns:** the index at which an error occurred

**Since:** 1.2

## ParsePosition.equals(Object)

```java
public boolean equals(Object obj)
```

Overrides equals

## ParsePosition.hashCode()

```java
public int hashCode()
```

## ParsePosition.toString()

```java
public String toString()
```

Return a string representation of this ParsePosition.

**Returns:** a string representation of this object
