# CollatorProvider class (java.text.spi)

```java
public abstract class CollatorProvider extends LocaleServiceProvider
```

An abstract class for service providers that
provide concrete implementations of the
{@link java.text.Collator Collator} class.

@since        1.6

## CollatorProvider.CollatorProvider()

```java
protected CollatorProvider()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## CollatorProvider.getInstance(Locale)

```java
public abstract Collator getInstance(Locale locale)
```

Returns a new {@code Collator} instance for the specified locale.
@param locale the desired locale.
@return the {@code Collator} for the desired locale.
@throws    NullPointerException if
{@code locale} is null
@throws    IllegalArgumentException if {@code locale} isn't
    one of the locales returned from
    {@link java.util.spi.LocaleServiceProvider#getAvailableLocales()
    getAvailableLocales()}.
@see java.text.Collator#getInstance(java.util.Locale)