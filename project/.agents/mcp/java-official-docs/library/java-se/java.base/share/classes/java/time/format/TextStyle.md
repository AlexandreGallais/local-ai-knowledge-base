# TextStyle enum (java.time.format)

```java
public enum TextStyle
```

Enumeration of the style of text formatting and parsing.
<p>
Text styles define three sizes for the formatted text - 'full', 'short' and 'narrow'.
Each of these three sizes is available in both 'standard' and 'stand-alone' variations.
<p>
The difference between the three sizes is obvious in most languages.
For example, in English the 'full' month is 'January', the 'short' month is 'Jan'
and the 'narrow' month is 'J'. Note that the narrow size is often not unique.
For example, 'January', 'June' and 'July' all have the 'narrow' text 'J'.
<p>
The difference between the 'standard' and 'stand-alone' forms is trickier to describe
as there is no difference in English. However, in other languages there is a difference
in the word used when the text is used alone, as opposed to in a complete date.
For example, the word used for a month when used alone in a date picker is different
to the word used for month in association with a day and year in a date.

@implSpec
This is an immutable and thread-safe enum.

@since 1.8

## TextStyle.isStandalone()

```java
public boolean isStandalone()
```

Returns true if the Style is a stand-alone style.
@return true if the style is a stand-alone style.

## TextStyle.asStandalone()

```java
public TextStyle asStandalone()
```

{@return the stand-alone style with the same size}

## TextStyle.asNormal()

```java
public TextStyle asNormal()
```

Returns the normal style with the same size.

@return the normal style with the same size