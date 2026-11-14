# CurrencyNameProvider class (java.util.spi)

```java
public abstract class CurrencyNameProvider extends LocaleServiceProvider
```

An abstract class for service providers that
provide localized currency symbols and display names for the
{@link java.util.Currency Currency} class.
Note that currency symbols are considered names when determining
behaviors described in the
{@link java.util.spi.LocaleServiceProvider LocaleServiceProvider}
specification.

@since        1.6

## CurrencyNameProvider.CurrencyNameProvider()

```java
protected CurrencyNameProvider()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## CurrencyNameProvider.getSymbol(String, Locale)

```java
public abstract String getSymbol(String currencyCode, Locale locale)
```

Gets the symbol of the given currency code for the specified locale.
For example, for "USD" (US Dollar), the symbol is "$" if the specified
locale is the US, while for other locales it may be "US$". If no
symbol can be determined, null should be returned.

@param currencyCode the ISO 4217 currency code, which
    consists of three upper-case letters between 'A' (U+0041) and
    'Z' (U+005A)
@param locale the desired locale
@return the symbol of the given currency code for the specified locale, or null if
    the symbol is not available for the locale
@throws    NullPointerException if {@code currencyCode} or
    {@code locale} is null
@throws    IllegalArgumentException if {@code currencyCode} is not in
    the form of three upper-case letters, or {@code locale} isn't
    one of the locales returned from
    {@link java.util.spi.LocaleServiceProvider#getAvailableLocales()
    getAvailableLocales()}.
@see java.util.Currency#getSymbol(java.util.Locale)

## CurrencyNameProvider.getDisplayName(String, Locale)

```java
public String getDisplayName(String currencyCode, Locale locale)
```

Returns a name for the currency that is appropriate for display to the
user.  The default implementation returns null.

@param currencyCode the ISO 4217 currency code, which
    consists of three upper-case letters between 'A' (U+0041) and
    'Z' (U+005A)
@param locale the desired locale
@return the name for the currency that is appropriate for display to the
    user, or null if the name is not available for the locale
@throws    IllegalArgumentException if {@code currencyCode} is not in
    the form of three upper-case letters, or {@code locale} isn't
    one of the locales returned from
    {@link java.util.spi.LocaleServiceProvider#getAvailableLocales()
    getAvailableLocales()}.
@throws    NullPointerException if {@code currencyCode} or
    {@code locale} is {@code null}
@since 1.7