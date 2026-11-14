# DateFormatProvider class (java.text.spi)

```java
public abstract class DateFormatProvider extends LocaleServiceProvider
```

An abstract class for service providers that
provide concrete implementations of the
{@link java.text.DateFormat DateFormat} class.

@since        1.6

## DateFormatProvider.DateFormatProvider()

```java
protected DateFormatProvider()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## DateFormatProvider.getTimeInstance(int, Locale)

```java
public abstract DateFormat getTimeInstance(int style, Locale locale)
```

Returns a new {@code DateFormat} instance which formats time
with the given formatting style for the specified locale.
@param style the given formatting style.  Either one of
    {@link java.text.DateFormat#SHORT DateFormat.SHORT},
    {@link java.text.DateFormat#MEDIUM DateFormat.MEDIUM},
    {@link java.text.DateFormat#LONG DateFormat.LONG}, or
    {@link java.text.DateFormat#FULL DateFormat.FULL}.
@param locale the desired locale.
@throws    IllegalArgumentException if {@code style} is invalid,
    or if {@code locale} isn't
    one of the locales returned from
    {@link java.util.spi.LocaleServiceProvider#getAvailableLocales()
    getAvailableLocales()}.
@throws    NullPointerException if {@code locale} is null
@return a time formatter.
@see java.text.DateFormat#getTimeInstance(int, java.util.Locale)

## DateFormatProvider.getDateInstance(int, Locale)

```java
public abstract DateFormat getDateInstance(int style, Locale locale)
```

Returns a new {@code DateFormat} instance which formats date
with the given formatting style for the specified locale.
@param style the given formatting style.  Either one of
    {@link java.text.DateFormat#SHORT DateFormat.SHORT},
    {@link java.text.DateFormat#MEDIUM DateFormat.MEDIUM},
    {@link java.text.DateFormat#LONG DateFormat.LONG}, or
    {@link java.text.DateFormat#FULL DateFormat.FULL}.
@param locale the desired locale.
@throws    IllegalArgumentException if {@code style} is invalid,
    or if {@code locale} isn't
    one of the locales returned from
    {@link java.util.spi.LocaleServiceProvider#getAvailableLocales()
    getAvailableLocales()}.
@throws    NullPointerException if {@code locale} is null
@return a date formatter.
@see java.text.DateFormat#getDateInstance(int, java.util.Locale)

## DateFormatProvider.getDateTimeInstance(int, int, Locale)

```java
public abstract DateFormat getDateTimeInstance(int dateStyle, int timeStyle, Locale locale)
```

Returns a new {@code DateFormat} instance which formats date and time
with the given formatting style for the specified locale.
@param dateStyle the given date formatting style.  Either one of
    {@link java.text.DateFormat#SHORT DateFormat.SHORT},
    {@link java.text.DateFormat#MEDIUM DateFormat.MEDIUM},
    {@link java.text.DateFormat#LONG DateFormat.LONG}, or
    {@link java.text.DateFormat#FULL DateFormat.FULL}.
@param timeStyle the given time formatting style.  Either one of
    {@link java.text.DateFormat#SHORT DateFormat.SHORT},
    {@link java.text.DateFormat#MEDIUM DateFormat.MEDIUM},
    {@link java.text.DateFormat#LONG DateFormat.LONG}, or
    {@link java.text.DateFormat#FULL DateFormat.FULL}.
@param locale the desired locale.
@throws    IllegalArgumentException if {@code dateStyle} or
    {@code timeStyle} is invalid,
    or if {@code locale} isn't
    one of the locales returned from
    {@link java.util.spi.LocaleServiceProvider#getAvailableLocales()
    getAvailableLocales()}.
@throws    NullPointerException if {@code locale} is null
@return a date/time formatter.
@see java.text.DateFormat#getDateTimeInstance(int, int, java.util.Locale)