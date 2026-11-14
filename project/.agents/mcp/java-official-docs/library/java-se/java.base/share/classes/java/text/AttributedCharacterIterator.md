---
title: "AttributedCharacterIterator interface (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/AttributedCharacterIterator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AttributedCharacterIterator interface (java.text)

```java
public interface AttributedCharacterIterator extends CharacterIterator
```

An `AttributedCharacterIterator` allows iteration through both text and
related attribute information.

An attribute is a key/value pair, identified by the key.  No two
attributes on a given character can have the same key.

The values for an attribute are immutable, or must not be mutated
by clients or storage.  They are always passed by reference, and not
cloned.

A *run with respect to an attribute* is a maximum text range for
which:

- the attribute is undefined or `null` for the entire range, or

- the attribute value is defined and has the same non-`null` value for the
    entire range.

A *run with respect to a set of attributes* is a maximum text range for
which this condition is met for each member attribute.

When getting a run with no explicit attributes specified (i.e.,
calling `getRunStart()` and `getRunLimit()`), any
contiguous text segments having the same attributes (the same set
of attribute/value pairs) are treated as separate runs if the
attributes have been given to those text segments separately.

The returned indexes are limited to the range of the iterator.

The returned attribute information is limited to runs that contain
the current character.

Attribute keys are instances of `AttributedCharacterIterator.Attribute` and its
subclasses, such as `java.desktop/java.awt.font.TextAttribute`.

**See also:** AttributedCharacterIterator.Attribute

**See also:** java.desktop/java.awt.font.TextAttribute

**See also:** AttributedString

**See also:** Annotation

**Since:** 1.2

## AttributedCharacterIterator.Attribute(String)

```java
protected Attribute(String name)
```

Constructs an `Attribute` with the given name.

Parameters:

- `name`: the name of `Attribute`

## AttributedCharacterIterator.equals(Object)

```java
public final boolean equals(Object obj)
```

Compares two objects for equality. This version only returns true
for `x.equals(y)` if `x` and `y` refer
to the same object, and guarantees this for all subclasses.

## AttributedCharacterIterator.hashCode()

```java
public final int hashCode()
```

Returns a hash code value for the object. This version is identical to
the one in `Object`, but is also final.

## AttributedCharacterIterator.toString()

```java
public String toString()
```

Returns a string representation of the object. This version returns the
concatenation of class name, `"("`, a name identifying the attribute
and `")"`.

## AttributedCharacterIterator.getName()

```java
protected String getName()
```

Returns the name of the attribute.

**Returns:** the name of `Attribute`

## AttributedCharacterIterator.readResolve()

```java
protected Object readResolve() throws InvalidObjectException
```

Resolves instances being deserialized to the predefined constants.

**Returns:** the resolved `Attribute` object

Throws:

- `InvalidObjectException`: if the object to resolve is not an instance of `Attribute`

## AttributedCharacterIterator.LANGUAGE

```java
public static final Attribute LANGUAGE
```

Attribute key for the language of some text.

 Values are instances of Locale.

**See also:** java.util.Locale

## AttributedCharacterIterator.READING

```java
public static final Attribute READING
```

Attribute key for the reading of some text. In languages where the written form
and the pronunciation of a word are only loosely related (such as Japanese),
it is often necessary to store the reading (pronunciation) along with the
written form.

Values are instances of `Annotation` holding instances of `String`.

**See also:** Annotation

**See also:** java.lang.String

## AttributedCharacterIterator.INPUT_METHOD_SEGMENT

```java
public static final Attribute INPUT_METHOD_SEGMENT
```

Attribute key for input method segments. Input methods often break
up text into segments, which usually correspond to words.

Values are instances of `Annotation` holding a `null` reference.

**See also:** Annotation

## AttributedCharacterIterator.getRunStart()

```java
public int getRunStart()
```

Returns the index of the first character of the run
with respect to all attributes containing the current character.

Any contiguous text segments having the same attributes (the
same set of attribute/value pairs) are treated as separate runs
if the attributes have been given to those text segments separately.

**Returns:** the index of the first character of the run

## AttributedCharacterIterator.getRunStart(Attribute)

```java
public int getRunStart(Attribute attribute)
```

Returns the index of the first character of the run
with respect to the given `attribute` containing the current character.

Parameters:

- `attribute`: the desired attribute.

**Returns:** the index of the first character of the run

## AttributedCharacterIterator.getRunStart(Set<? extends Attribute>)

```java
public int getRunStart(Set<? extends Attribute> attributes)
```

Returns the index of the first character of the run
with respect to the given `attributes` containing the current character.

Parameters:

- `attributes`: a set of the desired attributes.

**Returns:** the index of the first character of the run

## AttributedCharacterIterator.getRunLimit()

```java
public int getRunLimit()
```

Returns the index of the first character following the run
with respect to all attributes containing the current character.

Any contiguous text segments having the same attributes (the
same set of attribute/value pairs) are treated as separate runs
if the attributes have been given to those text segments separately.

**Returns:** the index of the first character following the run

## AttributedCharacterIterator.getRunLimit(Attribute)

```java
public int getRunLimit(Attribute attribute)
```

Returns the index of the first character following the run
with respect to the given `attribute` containing the current character.

Parameters:

- `attribute`: the desired attribute

**Returns:** the index of the first character following the run

## AttributedCharacterIterator.getRunLimit(Set<? extends Attribute>)

```java
public int getRunLimit(Set<? extends Attribute> attributes)
```

Returns the index of the first character following the run
with respect to the given `attributes` containing the current character.

Parameters:

- `attributes`: a set of the desired attributes

**Returns:** the index of the first character following the run

## AttributedCharacterIterator.getAttributes()

```java
public Map<Attribute,Object> getAttributes()
```

Returns a map with the attributes defined on the current
character.

**Returns:** a map with the attributes defined on the current character

## AttributedCharacterIterator.getAttribute(Attribute)

```java
public Object getAttribute(Attribute attribute)
```

Returns the value of the named `attribute` for the current character.
Returns `null` if the `attribute` is not defined.

Parameters:

- `attribute`: the desired attribute

**Returns:** the value of the named `attribute` or `null`

## AttributedCharacterIterator.getAllAttributeKeys()

```java
public Set<Attribute> getAllAttributeKeys()
```

Returns the keys of all attributes defined on the
iterator's text range. The set is empty if no
attributes are defined.

**Returns:** the keys of all attributes
