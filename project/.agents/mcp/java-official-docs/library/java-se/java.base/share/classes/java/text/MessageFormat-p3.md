---
title: "MessageFormat class (java.text) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/MessageFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MessageFormat class (java.text) (part 3 of 3)

## MessageFormat.parseObject(String, ParsePosition)

```java
public Object parseObject(String source, ParsePosition pos)
```

Parses text from a string to produce an object array.

The method attempts to parse text starting at the index given by
`pos`.
If parsing succeeds, then the index of `pos` is updated
to the index after the last character used (parsing does not necessarily
use all characters up to the end of the string), and the parsed
object array is returned. The updated `pos` can be used to
indicate the starting point for the next call to this method.
If an error occurs, then the index of `pos` is not
changed, the error index of `pos` is set to the index of
the character where the error occurred, and null is returned.

See the ParsePosition) method for more information
on message parsing.

Parameters:

- `source`: A `String`, part of which should be parsed.
- `pos`: A `ParsePosition` object with index and error index information as described above.

**Returns:** An `Object` array parsed from the string. In case of
        error, returns null.

Throws:

- `NullPointerException`: if `pos` is null.

## MessageFormat.clone()

```java
public Object clone()
```

Creates and returns a copy of this object.

**Returns:** a clone of this instance.

## MessageFormat.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this `MessageFormat` for equality.
Returns true if the object is also a `MessageFormat` and the
two formats would format any value the same.

Parameters:

- `obj`: object to be compared for equality

**Implementation requirements:** This method performs an equality check with a notion of class
identity based on `getClass()`, rather than `instanceof`.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.

**Returns:** `true` if the specified object is equal to this `MessageFormat`

**See also:** Object#equals(Object)

## MessageFormat.hashCode()

```java
public int hashCode()
```

**Implementation requirements:** This method calculates the hash code value using the value returned by
`toPattern()`.

**See also:** Object#hashCode()

## MessageFormat.toString()

```java
public String toString()
```

## MessageFormat.Field(String)

```java
protected Field(String name)
```

Creates a Field with the specified name.

Parameters:

- `name`: Name of the attribute

## MessageFormat.readResolve()

```java
protected Object readResolve() throws InvalidObjectException
```

Resolves instances being deserialized to the predefined constants.

**Returns:** resolved MessageFormat.Field constant

Throws:

- `InvalidObjectException`: if the constant could not be resolved.

## MessageFormat.ARGUMENT

```java
public static final Field ARGUMENT
```

Constant identifying a portion of a message that was generated
from an argument passed into `formatToCharacterIterator`.
The value associated with the key will be an `Integer`
indicating the index in the `arguments` array of the
argument from which the text was generated.
