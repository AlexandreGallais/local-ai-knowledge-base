# FieldPosition class (java.text)

```java
public class FieldPosition
```

{@code FieldPosition} is a simple class used by {@code Format}
and its subclasses to identify fields in formatted output. Fields can
be identified in two ways:
<ul>
 <li>By an integer constant, whose names typically end with
     {@code _FIELD}. The constants are defined in the various
     subclasses of {@code Format}.
 <li>By a {@code Format.Field} constant, see {@code ERA_FIELD}
     and its friends in {@code DateFormat} for an example.
</ul>
<p>
{@code FieldPosition} keeps track of the position of the
field within the formatted output with two indices: the index
of the first character of the field and the index of the last
character of the field.

<p>
One version of the {@code format} method in the various
{@code Format} classes requires a {@code FieldPosition}
object as an argument. You use this {@code format} method
to perform partial formatting or to get information about the
formatted output (such as the position of a field).

<p>
If you are interested in the positions of all attributes in the
formatted string use the {@code Format} method
{@code formatToCharacterIterator}.

@author      Mark Davis
@since 1.1
@see         java.text.Format

## FieldPosition.FieldPosition(int)

```java
public FieldPosition(int field)
```

Creates a FieldPosition object for the given field.  Fields are
identified by constants, whose names typically end with _FIELD,
in the various subclasses of Format.

@param field the field identifier
@see java.text.NumberFormat#INTEGER_FIELD
@see java.text.NumberFormat#FRACTION_FIELD
@see java.text.DateFormat#YEAR_FIELD
@see java.text.DateFormat#MONTH_FIELD

## FieldPosition.FieldPosition(Format.Field)

```java
public FieldPosition(Format.Field attribute)
```

Creates a FieldPosition object for the given field constant. Fields are
identified by constants defined in the various {@code Format}
subclasses. This is equivalent to calling
{@code new FieldPosition(attribute, -1)}.

@param attribute Format.Field constant identifying a field
@since 1.4

## FieldPosition.FieldPosition(Format.Field, int)

```java
public FieldPosition(Format.Field attribute, int fieldID)
```

Creates a {@code FieldPosition} object for the given field.
The field is identified by an attribute constant from one of the
{@code Field} subclasses as well as an integer field ID
defined by the {@code Format} subclasses. {@code Format}
subclasses that are aware of {@code Field} should give precedence
to {@code attribute} and ignore {@code fieldID} if
{@code attribute} is not null. However, older {@code Format}
subclasses may not be aware of {@code Field} and rely on
{@code fieldID}. If the field has no corresponding integer
constant, {@code fieldID} should be -1.

@param attribute Format.Field constant identifying a field
@param fieldID integer constant identifying a field
@since 1.4

## FieldPosition.getFieldAttribute()

```java
public Format.Field getFieldAttribute()
```

Returns the field identifier as an attribute constant
from one of the {@code Field} subclasses. May return null if
the field is specified only by an integer field ID.

@return Identifier for the field
@since 1.4

## FieldPosition.getField()

```java
public int getField()
```

Retrieves the field identifier.

@return the field identifier

## FieldPosition.getBeginIndex()

```java
public int getBeginIndex()
```

Retrieves the index of the first character in the requested field.

@return the begin index

## FieldPosition.getEndIndex()

```java
public int getEndIndex()
```

Retrieves the index of the character following the last character in the
requested field.

@return the end index

## FieldPosition.setBeginIndex(int)

```java
public void setBeginIndex(int bi)
```

Sets the begin index.  For use by subclasses of Format.

@param bi the begin index
@since 1.2

## FieldPosition.setEndIndex(int)

```java
public void setEndIndex(int ei)
```

Sets the end index.  For use by subclasses of Format.

@param ei the end index
@since 1.2

## FieldPosition.equals(Object)

```java
public boolean equals(Object obj)
```

Overrides equals

## FieldPosition.hashCode()

```java
public int hashCode()
```

{@return a hash code for this FieldPosition}

## FieldPosition.toString()

```java
public String toString()
```

Return a string representation of this FieldPosition.
@return  a string representation of this object