---
title: "FieldPosition class (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/FieldPosition.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FieldPosition class (java.text)

```java
public class FieldPosition
```

`FieldPosition` is a simple class used by `Format`
and its subclasses to identify fields in formatted output. Fields can
be identified in two ways:

- By an integer constant, whose names typically end with
     `_FIELD`. The constants are defined in the various
     subclasses of `Format`.

- By a `Format.Field` constant, see `ERA_FIELD`
     and its friends in `DateFormat` for an example.

`FieldPosition` keeps track of the position of the
field within the formatted output with two indices: the index
of the first character of the field and the index of the last
character of the field.

One version of the `format` method in the various
`Format` classes requires a `FieldPosition`
object as an argument. You use this `format` method
to perform partial formatting or to get information about the
formatted output (such as the position of a field).

If you are interested in the positions of all attributes in the
formatted string use the `Format` method
`formatToCharacterIterator`.

**Since:** 1.1

**See also:** java.text.Format

## FieldPosition.FieldPosition(int)

```java
public FieldPosition(int field)
```

Creates a FieldPosition object for the given field.  Fields are
identified by constants, whose names typically end with _FIELD,
in the various subclasses of Format.

Parameters:

- `field`: the field identifier

**See also:** java.text.NumberFormat#INTEGER_FIELD

**See also:** java.text.NumberFormat#FRACTION_FIELD

**See also:** java.text.DateFormat#YEAR_FIELD

**See also:** java.text.DateFormat#MONTH_FIELD

## FieldPosition.FieldPosition(Format.Field)

```java
public FieldPosition(Format.Field attribute)
```

Creates a FieldPosition object for the given field constant. Fields are
identified by constants defined in the various `Format`
subclasses. This is equivalent to calling
`new FieldPosition(attribute, -1)`.

Parameters:

- `attribute`: Format.Field constant identifying a field

**Since:** 1.4

## FieldPosition.FieldPosition(Format.Field, int)

```java
public FieldPosition(Format.Field attribute, int fieldID)
```

Creates a `FieldPosition` object for the given field.
The field is identified by an attribute constant from one of the
`Field` subclasses as well as an integer field ID
defined by the `Format` subclasses. `Format`
subclasses that are aware of `Field` should give precedence
to `attribute` and ignore `fieldID` if
`attribute` is not null. However, older `Format`
subclasses may not be aware of `Field` and rely on
`fieldID`. If the field has no corresponding integer
constant, `fieldID` should be -1.

Parameters:

- `attribute`: Format.Field constant identifying a field
- `fieldID`: integer constant identifying a field

**Since:** 1.4

## FieldPosition.getFieldAttribute()

```java
public Format.Field getFieldAttribute()
```

Returns the field identifier as an attribute constant
from one of the `Field` subclasses. May return null if
the field is specified only by an integer field ID.

**Returns:** Identifier for the field

**Since:** 1.4

## FieldPosition.getField()

```java
public int getField()
```

Retrieves the field identifier.

**Returns:** the field identifier

## FieldPosition.getBeginIndex()

```java
public int getBeginIndex()
```

Retrieves the index of the first character in the requested field.

**Returns:** the begin index

## FieldPosition.getEndIndex()

```java
public int getEndIndex()
```

Retrieves the index of the character following the last character in the
requested field.

**Returns:** the end index

## FieldPosition.setBeginIndex(int)

```java
public void setBeginIndex(int bi)
```

Sets the begin index.  For use by subclasses of Format.

Parameters:

- `bi`: the begin index

**Since:** 1.2

## FieldPosition.setEndIndex(int)

```java
public void setEndIndex(int ei)
```

Sets the end index.  For use by subclasses of Format.

Parameters:

- `ei`: the end index

**Since:** 1.2

## FieldPosition.equals(Object)

```java
public boolean equals(Object obj)
```

Overrides equals

## FieldPosition.hashCode()

```java
public int hashCode()
```

## FieldPosition.toString()

```java
public String toString()
```

Return a string representation of this FieldPosition.

**Returns:** a string representation of this object
