---
title: "BreakIterator class (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/BreakIterator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BreakIterator class (java.text)

```java
public abstract class BreakIterator implements Cloneable
```

The `BreakIterator` class implements methods for finding
the location of boundaries in text. Instances of `BreakIterator`
maintain a current position and scan over text
returning the index of characters where boundaries occur.
Internally, `BreakIterator` scans text using a
`CharacterIterator`, and is thus able to scan text held
by any object implementing that protocol. A `StringCharacterIterator`
is used to scan `String` objects passed to `setText`.

You use the factory methods provided by this class to create
instances of various types of break iterators. In particular,
use `getWordInstance`, `getLineInstance`,
`getSentenceInstance`, and `getCharacterInstance`
to create `BreakIterator`s that perform
word, line, sentence, and character boundary analysis respectively.
A single `BreakIterator` can work only on one unit
(word, line, sentence, and so on). You must use a different iterator
for each unit boundary analysis you wish to perform.

Line boundary analysis determines where a text string can be
broken when line-wrapping. The mechanism correctly handles
punctuation and hyphenated words. Actual line breaking needs
to also consider the available line width and is handled by
higher-level software.

Sentence boundary analysis allows selection with correct interpretation
of periods within numbers and abbreviations, and trailing punctuation
marks such as quotation marks and parentheses.

Word boundary analysis is used by search and replace functions, as
well as within text editing applications that allow the user to
select words with a double click. Word selection provides correct
interpretation of punctuation marks within and following
words. Characters that are not part of a word, such as symbols
or punctuation marks, have word-breaks on both sides.

Character boundary analysis allows users to interact with characters
as they expect to, for example, when moving the cursor through a text
string. Character boundary analysis provides correct navigation
through character strings, regardless of how the character is stored.
The boundaries returned may be those of supplementary characters,
combining character sequences, or ligature clusters.
For example, an accented character might be stored as a base character
and a diacritical mark. What users consider to be a character can
differ between languages.

**Implementation requirements:** The default implementation of the character boundary analysis
conforms to the Unicode Consortium's Extended Grapheme Cluster breaks.
For more detail, refer to

Grapheme Cluster Boundaries section in the Unicode Standard Annex #29.

**Implementation note:** The default implementations of `BreakIterator` will perform the equivalent
of calling `setText("")` if the text hasn't been set by either
`setText(String)` or `setText(CharacterIterator)`
and a boundary searching operation is called by the `BreakIterator` instance.
The `BreakIterator` instances returned by the factory methods
of this class are intended for use with natural languages only, not for
programming language text. It is however possible to define subclasses
that tokenize a programming language.

**Examples**:

Creating and using text boundaries:

Print each element in order:

Print each element in reverse order:

Print first element:

Print last element:

Print the element at a specified position:

Find the next word:

(The iterator returned by BreakIterator.getWordInstance() is unique in that
the break positions it returns don't represent both the start and end of the
thing being iterated over.  That is, a sentence-break iterator returns breaks
that each represent the end of one sentence and the beginning of the next.
With the word-break iterator, the characters between two boundaries might be a
word, or they might be the punctuation or whitespace between two words.  The
above code uses a simple heuristic to determine which boundary is the beginning
of a word: If the characters between this boundary and the next boundary
include at least one letter (this can be an alphabetical letter, a CJK ideograph,
a Hangul syllable, a Kana character, etc.), then the text between this boundary
and the next is a word; otherwise, it's the material between words.)

**Since:** 1.1

**See also:** CharacterIterator

## BreakIterator.BreakIterator()

```java
protected BreakIterator()
```

Constructor. BreakIterator is stateless and has no default behavior.

## BreakIterator.clone()

```java
public Object clone()
```

Create a copy of this iterator

**Returns:** A copy of this

## BreakIterator.DONE

```java
public static final int DONE
```

DONE is returned by previous(), next(), next(int), preceding(int)
and following(int) when either the first or last text boundary has been
reached.

## BreakIterator.first()

```java
public abstract int first()
```

Returns the first boundary. The iterator's current position is set
to the first text boundary.

**Returns:** The character index of the first text boundary.

## BreakIterator.last()

```java
public abstract int last()
```

Returns the last boundary. The iterator's current position is set
to the last text boundary.

**Returns:** The character index of the last text boundary.

## BreakIterator.next(int)

```java
public abstract int next(int n)
```

Returns the nth boundary from the current boundary. If either
the first or last text boundary has been reached, it returns
`BreakIterator.DONE` and the current position is set to either
the first or last text boundary depending on which one is reached. Otherwise,
the iterator's current position is set to the new boundary.
For example, if the iterator's current position is the mth text boundary
and three more boundaries exist from the current boundary to the last text
boundary, the next(2) call will return m + 2. The new text position is set
to the (m + 2)th text boundary. A next(4) call would return
`BreakIterator.DONE` and the last text boundary would become the
new text position.

Parameters:

- `n`: which boundary to return. A value of 0 does nothing. Negative values move to previous boundaries and positive values move to later boundaries.

**Returns:** The character index of the nth boundary from the current position
or `BreakIterator.DONE` if either first or last text boundary
has been reached.

## BreakIterator.next()

```java
public abstract int next()
```

Returns the boundary following the current boundary. If the current boundary
is the last text boundary, it returns `BreakIterator.DONE` and
the iterator's current position is unchanged. Otherwise, the iterator's
current position is set to the boundary following the current boundary.

**Returns:** The character index of the next text boundary or
`BreakIterator.DONE` if the current boundary is the last text
boundary.
Equivalent to next(1).

**See also:** #next(int)

## BreakIterator.previous()

```java
public abstract int previous()
```

Returns the boundary preceding the current boundary. If the current boundary
is the first text boundary, it returns `BreakIterator.DONE` and
the iterator's current position is unchanged. Otherwise, the iterator's
current position is set to the boundary preceding the current boundary.

**Returns:** The character index of the previous text boundary or
`BreakIterator.DONE` if the current boundary is the first text
boundary.

## BreakIterator.following(int)

```java
public abstract int following(int offset)
```

Returns the first boundary following the specified character offset. If the
specified offset is equal to the last text boundary, it returns
`BreakIterator.DONE` and the iterator's current position is unchanged.
Otherwise, the iterator's current position is set to the returned boundary.
The value returned is always greater than the offset or the value
`BreakIterator.DONE`.

Parameters:

- `offset`: the character offset to begin scanning.

**Returns:** The first boundary after the specified offset or
`BreakIterator.DONE` if the last text boundary is passed in
as the offset.

Throws:

- `IllegalArgumentException`: if the specified offset is less than the first text boundary or greater than the last text boundary.

## BreakIterator.preceding(int)

```java
public int preceding(int offset)
```

Returns the last boundary preceding the specified character offset. If the
specified offset is equal to the first text boundary, it returns
`BreakIterator.DONE` and the iterator's current position is unchanged.
Otherwise, the iterator's current position is set to the returned boundary.
The value returned is always less than the offset or the value
`BreakIterator.DONE`.

Parameters:

- `offset`: the character offset to begin scanning.

**Returns:** The last boundary before the specified offset or
`BreakIterator.DONE` if the first text boundary is passed in
as the offset.

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if the specified offset is less than the first text boundary or greater than the last text boundary.

## BreakIterator.isBoundary(int)

```java
public boolean isBoundary(int offset)
```

Returns true if the specified character offset is a text boundary.

Parameters:

- `offset`: the character offset to check.

**Returns:** `true` if "offset" is a boundary position,
`false` otherwise.

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if the specified offset is less than the first text boundary or greater than the last text boundary.

## BreakIterator.current()

```java
public abstract int current()
```

Returns character index of the text boundary that was most
recently returned by next(), next(int), previous(), first(), last(),
following(int) or preceding(int). If any of these methods returns
`BreakIterator.DONE` because either first or last text boundary
has been reached, it returns the first or last text boundary depending on
which one is reached.

**Returns:** The text boundary returned from the above methods, first or last
text boundary.

**See also:** #next()

**See also:** #next(int)

**See also:** #previous()

**See also:** #first()

**See also:** #last()

**See also:** #following(int)

**See also:** #preceding(int)

## BreakIterator.getText()

```java
public abstract CharacterIterator getText()
```

Get the text being scanned

**Returns:** the text being scanned

## BreakIterator.setText(String)

```java
public void setText(String newText)
```

Set a new text string to be scanned.  The current scan
position is reset to first().

Parameters:

- `newText`: new text to scan.

## BreakIterator.setText(CharacterIterator)

```java
public abstract void setText(CharacterIterator newText)
```

Set a new text for scanning.  The current scan
position is reset to first().

Parameters:

- `newText`: new text to scan.

## BreakIterator.getWordInstance()

```java
public static BreakIterator getWordInstance()
```

Returns a new `BreakIterator` instance
for word breaks
for the default locale.

**Returns:** A break iterator for word breaks

## BreakIterator.getWordInstance(Locale)

```java
public static BreakIterator getWordInstance(Locale locale)
```

Returns a new `BreakIterator` instance
for word breaks
for the given locale.

Parameters:

- `locale`: the desired locale

**Returns:** A break iterator for word breaks

Throws:

- `NullPointerException`: if `locale` is null

## BreakIterator.getLineInstance()

```java
public static BreakIterator getLineInstance()
```

Returns a new `BreakIterator` instance
for line breaks
for the default locale.

**Returns:** A break iterator for line breaks

## BreakIterator.getLineInstance(Locale)

```java
public static BreakIterator getLineInstance(Locale locale)
```

Returns a new `BreakIterator` instance
for line breaks
for the given locale.

Parameters:

- `locale`: the desired locale

**Returns:** A break iterator for line breaks

Throws:

- `NullPointerException`: if `locale` is null

## BreakIterator.getCharacterInstance()

```java
public static BreakIterator getCharacterInstance()
```

Returns a new `BreakIterator` instance
for character breaks
for the default locale.

**Returns:** A break iterator for character breaks

## BreakIterator.getCharacterInstance(Locale)

```java
public static BreakIterator getCharacterInstance(Locale locale)
```

Returns a new `BreakIterator` instance
for character breaks
for the given locale.

Parameters:

- `locale`: the desired locale

**Returns:** A break iterator for character breaks

Throws:

- `NullPointerException`: if `locale` is null

## BreakIterator.getSentenceInstance()

```java
public static BreakIterator getSentenceInstance()
```

Returns a new `BreakIterator` instance
for sentence breaks
for the default locale.

**Returns:** A break iterator for sentence breaks

## BreakIterator.getSentenceInstance(Locale)

```java
public static BreakIterator getSentenceInstance(Locale locale)
```

Returns a new `BreakIterator` instance
for sentence breaks
for the given locale.

Parameters:

- `locale`: the desired locale

**Returns:** A break iterator for sentence breaks

Throws:

- `NullPointerException`: if `locale` is null

## BreakIterator.getAvailableLocales()

```java
public static synchronized Locale[] getAvailableLocales()
```

Returns an array of all locales for which the
`get*Instance` methods of this class can return
localized instances.
The returned array represents the union of locales supported by the Java
runtime and by installed
BreakIteratorProvider implementations.
At a minimum, the returned array must contain a `Locale` instance equal to
Locale.ROOT and a `Locale` instance equal to
Locale.US.

**Returns:** An array of locales for which localized
        `BreakIterator` instances are available.
