---
title: "BreakIteratorProvider class (java.text.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/spi/BreakIteratorProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BreakIteratorProvider class (java.text.spi)

```java
public abstract class BreakIteratorProvider extends LocaleServiceProvider
```

An abstract class for service providers that
provide concrete implementations of the
BreakIterator class.

**Since:** 1.6

## BreakIteratorProvider.BreakIteratorProvider()

```java
protected BreakIteratorProvider()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## BreakIteratorProvider.getWordInstance(Locale)

```java
public abstract BreakIterator getWordInstance(Locale locale)
```

Returns a new `BreakIterator` instance
for word breaks
for the given locale.

Parameters:

- `locale`: the desired locale

**Returns:** A break iterator for word breaks

**See also:** java.text.BreakIterator#getWordInstance(java.util.Locale)

Throws:

- `NullPointerException`: if `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().

## BreakIteratorProvider.getLineInstance(Locale)

```java
public abstract BreakIterator getLineInstance(Locale locale)
```

Returns a new `BreakIterator` instance
for line breaks
for the given locale.

Parameters:

- `locale`: the desired locale

**Returns:** A break iterator for line breaks

**See also:** java.text.BreakIterator#getLineInstance(java.util.Locale)

Throws:

- `NullPointerException`: if `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().

## BreakIteratorProvider.getCharacterInstance(Locale)

```java
public abstract BreakIterator getCharacterInstance(Locale locale)
```

Returns a new `BreakIterator` instance
for character breaks
for the given locale.

Parameters:

- `locale`: the desired locale

**Returns:** A break iterator for character breaks

**See also:** java.text.BreakIterator#getCharacterInstance(java.util.Locale)

Throws:

- `NullPointerException`: if `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().

## BreakIteratorProvider.getSentenceInstance(Locale)

```java
public abstract BreakIterator getSentenceInstance(Locale locale)
```

Returns a new `BreakIterator` instance
for sentence breaks
for the given locale.

Parameters:

- `locale`: the desired locale

**Returns:** A break iterator for sentence breaks

**See also:** java.text.BreakIterator#getSentenceInstance(java.util.Locale)

Throws:

- `NullPointerException`: if `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().
