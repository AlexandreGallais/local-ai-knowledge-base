# ParsePosition class (java.text)

```java
public class ParsePosition
```

{@code ParsePosition} is a simple class used by {@code Format}
and its subclasses to keep track of the current position during parsing.
The {@code parseObject} method in the various {@code Format}
classes requires a {@code ParsePosition} object as an argument.

<p>
By design, as you parse through a string with different formats,
you can use the same {@code ParsePosition}, since the index parameter
records the current position.

@author      Mark Davis
@since 1.1
@see         java.text.Format

## ParsePosition.getIndex()

```java
public int getIndex()
```

Retrieve the current parse position.  On input to a parse method, this
is the index of the character at which parsing will begin; on output, it
is the index of the character following the last character parsed.

@return the current parse position

## ParsePosition.setIndex(int)

```java
public void setIndex(int index)
```

Set the current parse position.

@param index the current parse position

## ParsePosition.ParsePosition(int)

```java
public ParsePosition(int index)
```

Create a new ParsePosition with the given initial index.

@param index initial index

## ParsePosition.setErrorIndex(int)

```java
public void setErrorIndex(int ei)
```

Set the index at which a parse error occurred.  Formatters
should set this before returning an error code from their
parseObject method.  The default value is -1 if this is not set.

@param ei the index at which an error occurred
@since 1.2

## ParsePosition.getErrorIndex()

```java
public int getErrorIndex()
```

Retrieve the index at which an error occurred, or -1 if the
error index has not been set.

@return the index at which an error occurred
@since 1.2

## ParsePosition.equals(Object)

```java
public boolean equals(Object obj)
```

Overrides equals

## ParsePosition.hashCode()

```java
public int hashCode()
```

{@return a hash code for this ParsePosition}

## ParsePosition.toString()

```java
public String toString()
```

Return a string representation of this ParsePosition.
@return  a string representation of this object