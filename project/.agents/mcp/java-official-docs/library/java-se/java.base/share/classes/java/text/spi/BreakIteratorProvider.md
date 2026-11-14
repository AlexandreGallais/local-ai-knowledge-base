# BreakIteratorProvider class (java.text.spi)

```java
public abstract class BreakIteratorProvider extends LocaleServiceProvider
```

An abstract class for service providers that
provide concrete implementations of the
{@link java.text.BreakIterator BreakIterator} class.

@since        1.6

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

Returns a new {@code BreakIterator} instance
for <a href="../BreakIterator.html#word">word breaks</a>
for the given locale.
@param locale the desired locale
@return A break iterator for word breaks
@throws    NullPointerException if {@code locale} is null
@throws    IllegalArgumentException if {@code locale} isn't
    one of the locales returned from
    {@link java.util.spi.LocaleServiceProvider#getAvailableLocales()
    getAvailableLocales()}.
@see java.text.BreakIterator#getWordInstance(java.util.Locale)

## BreakIteratorProvider.getLineInstance(Locale)

```java
public abstract BreakIterator getLineInstance(Locale locale)
```

Returns a new {@code BreakIterator} instance
for <a href="../BreakIterator.html#line">line breaks</a>
for the given locale.
@param locale the desired locale
@return A break iterator for line breaks
@throws    NullPointerException if {@code locale} is null
@throws    IllegalArgumentException if {@code locale} isn't
    one of the locales returned from
    {@link java.util.spi.LocaleServiceProvider#getAvailableLocales()
    getAvailableLocales()}.
@see java.text.BreakIterator#getLineInstance(java.util.Locale)

## BreakIteratorProvider.getCharacterInstance(Locale)

```java
public abstract BreakIterator getCharacterInstance(Locale locale)
```

Returns a new {@code BreakIterator} instance
for <a href="../BreakIterator.html#character">character breaks</a>
for the given locale.
@param locale the desired locale
@return A break iterator for character breaks
@throws    NullPointerException if {@code locale} is null
@throws    IllegalArgumentException if {@code locale} isn't
    one of the locales returned from
    {@link java.util.spi.LocaleServiceProvider#getAvailableLocales()
    getAvailableLocales()}.
@see java.text.BreakIterator#getCharacterInstance(java.util.Locale)

## BreakIteratorProvider.getSentenceInstance(Locale)

```java
public abstract BreakIterator getSentenceInstance(Locale locale)
```

Returns a new {@code BreakIterator} instance
for <a href="../BreakIterator.html#sentence">sentence breaks</a>
for the given locale.
@param locale the desired locale
@return A break iterator for sentence breaks
@throws    NullPointerException if {@code locale} is null
@throws    IllegalArgumentException if {@code locale} isn't
    one of the locales returned from
    {@link java.util.spi.LocaleServiceProvider#getAvailableLocales()
    getAvailableLocales()}.
@see java.text.BreakIterator#getSentenceInstance(java.util.Locale)