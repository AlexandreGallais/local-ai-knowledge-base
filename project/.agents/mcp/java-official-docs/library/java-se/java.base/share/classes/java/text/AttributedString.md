---
title: "AttributedString class (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/AttributedString.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AttributedString class (java.text)

```java
public class AttributedString
```

An AttributedString holds text and related attribute information. It
may be used as the actual data storage in some cases where a text
reader wants to access attributed text through the AttributedCharacterIterator
interface.

An attribute is a key/value pair, identified by the key.  No two
attributes on a given character can have the same key.

The values for an attribute are immutable, or must not be mutated
by clients or storage.  They are always passed by reference, and not
cloned.

**See also:** AttributedCharacterIterator

**See also:** Annotation

**Since:** 1.2

## AttributedString.AttributedString(String)

```java
public AttributedString(String text)
```

Constructs an AttributedString instance with the given text.

Parameters:

- `text`: The text for this attributed string.

Throws:

- `NullPointerException`: if `text` is null.

## AttributedString.AttributedString(String, Map<? extends Attribute, ?>)

```java
public AttributedString(String text, Map<? extends Attribute, ?> attributes)
```

Constructs an AttributedString instance with the given text and attributes.

Parameters:

- `text`: The text for this attributed string.
- `attributes`: The attributes that apply to the entire string.

Throws:

- `NullPointerException`: if `text` or `attributes` is null.
- `IllegalArgumentException`: if the text has length 0 and the attributes parameter is not an empty Map (attributes cannot be applied to a 0-length range).

## AttributedString.AttributedString(AttributedCharacterIterator)

```java
public AttributedString(AttributedCharacterIterator text)
```

Constructs an AttributedString instance with the given attributed
text represented by AttributedCharacterIterator.

Parameters:

- `text`: The text for this attributed string.

Throws:

- `NullPointerException`: if `text` is null.

## AttributedString.AttributedString(AttributedCharacterIterator, int, int)

```java
public AttributedString(AttributedCharacterIterator text, int beginIndex, int endIndex)
```

Constructs an AttributedString instance with the subrange of
the given attributed text represented by
AttributedCharacterIterator. If the given range produces an
empty text, all attributes will be discarded.  Note that any
attributes wrapped by an Annotation object are discarded for a
subrange of the original attribute range.

Parameters:

- `text`: The text for this attributed string.
- `beginIndex`: Index of the first character of the range.
- `endIndex`: Index of the character following the last character of the range.

**See also:** java.text.Annotation

Throws:

- `NullPointerException`: if `text` is null.
- `IllegalArgumentException`: if the subrange given by beginIndex and endIndex is out of the text range.

## AttributedString.AttributedString(AttributedCharacterIterator, int, int, Attribute[])

```java
public AttributedString(AttributedCharacterIterator text, int beginIndex, int endIndex, Attribute[] attributes)
```

Constructs an AttributedString instance with the subrange of
the given attributed text represented by
AttributedCharacterIterator.  Only attributes that match the
given attributes will be incorporated into the instance. If the
given range produces an empty text, all attributes will be
discarded. Note that any attributes wrapped by an Annotation
object are discarded for a subrange of the original attribute
range.

Parameters:

- `text`: The text for this attributed string.
- `beginIndex`: Index of the first character of the range.
- `endIndex`: Index of the character following the last character of the range.
- `attributes`: Specifies attributes to be extracted from the text. If null is specified, all available attributes will be used.

**See also:** java.text.Annotation

Throws:

- `NullPointerException`: if `text` is null.
- `IllegalArgumentException`: if the subrange given by beginIndex and endIndex is out of the text range.

## AttributedString.addAttribute(Attribute, Object)

```java
public void addAttribute(Attribute attribute, Object value)
```

Adds an attribute to the entire string.

Parameters:

- `attribute`: the attribute key
- `value`: the value of the attribute; may be null

Throws:

- `NullPointerException`: if `attribute` is null.
- `IllegalArgumentException`: if the AttributedString has length 0 (attributes cannot be applied to a 0-length range).

## AttributedString.addAttribute(Attribute, Object, int, int)

```java
public void addAttribute(Attribute attribute, Object value, int beginIndex, int endIndex)
```

Adds an attribute to a subrange of the string.

Parameters:

- `attribute`: the attribute key
- `value`: The value of the attribute. May be null.
- `beginIndex`: Index of the first character of the range.
- `endIndex`: Index of the character following the last character of the range.

Throws:

- `NullPointerException`: if `attribute` is null.
- `IllegalArgumentException`: if beginIndex is less than 0, endIndex is greater than the length of the string, or beginIndex and endIndex together don't define a non-empty subrange of the string.

## AttributedString.addAttributes(Map<? extends Attribute, ?>, int, int)

```java
public void addAttributes(Map<? extends Attribute, ?> attributes, int beginIndex, int endIndex)
```

Adds a set of attributes to a subrange of the string.

Parameters:

- `attributes`: The attributes to be added to the string.
- `beginIndex`: Index of the first character of the range.
- `endIndex`: Index of the character following the last character of the range.

Throws:

- `NullPointerException`: if `attributes` is null.
- `IllegalArgumentException`: if beginIndex is less than 0, endIndex is greater than the length of the string, or beginIndex and endIndex together don't define a non-empty subrange of the string and the attributes parameter is not an empty Map.

## AttributedString.getIterator()

```java
public AttributedCharacterIterator getIterator()
```

Creates an AttributedCharacterIterator instance that provides access to the entire contents of
this string.

**Returns:** An iterator providing access to the text and its attributes.

## AttributedString.getIterator(Attribute[])

```java
public AttributedCharacterIterator getIterator(Attribute[] attributes)
```

Creates an AttributedCharacterIterator instance that provides access to
selected contents of this string.
Information about attributes not listed in attributes that the
implementor may have need not be made accessible through the iterator.
If the list is null, all available attribute information should be made
accessible.

Parameters:

- `attributes`: a list of attributes that the client is interested in

**Returns:** an iterator providing access to the entire text and its selected attributes

## AttributedString.getIterator(Attribute[], int, int)

```java
public AttributedCharacterIterator getIterator(Attribute[] attributes, int beginIndex, int endIndex)
```

Creates an AttributedCharacterIterator instance that provides access to
selected contents of this string.
Information about attributes not listed in attributes that the
implementor may have need not be made accessible through the iterator.
If the list is null, all available attribute information should be made
accessible.

Parameters:

- `attributes`: a list of attributes that the client is interested in
- `beginIndex`: the index of the first character
- `endIndex`: the index of the character following the last character

**Returns:** an iterator providing access to the text and its attributes

Throws:

- `IllegalArgumentException`: if beginIndex is less than 0, endIndex is greater than the length of the string, or beginIndex is greater than endIndex.
