---
title: "TextStyle enum (java.time.format)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/TextStyle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TextStyle enum (java.time.format)

```java
public enum TextStyle
```

Enumeration of the style of text formatting and parsing.

Text styles define three sizes for the formatted text - 'full', 'short' and 'narrow'.
Each of these three sizes is available in both 'standard' and 'stand-alone' variations.

The difference between the three sizes is obvious in most languages.
For example, in English the 'full' month is 'January', the 'short' month is 'Jan'
and the 'narrow' month is 'J'. Note that the narrow size is often not unique.
For example, 'January', 'June' and 'July' all have the 'narrow' text 'J'.

The difference between the 'standard' and 'stand-alone' forms is trickier to describe
as there is no difference in English. However, in other languages there is a difference
in the word used when the text is used alone, as opposed to in a complete date.
For example, the word used for a month when used alone in a date picker is different
to the word used for month in association with a day and year in a date.

**Implementation requirements:** This is an immutable and thread-safe enum.

**Since:** 1.8

## TextStyle.isStandalone()

```java
public boolean isStandalone()
```

Returns true if the Style is a stand-alone style.

**Returns:** true if the style is a stand-alone style.

## TextStyle.asStandalone()

```java
public TextStyle asStandalone()
```

## TextStyle.asNormal()

```java
public TextStyle asNormal()
```

Returns the normal style with the same size.

**Returns:** the normal style with the same size
