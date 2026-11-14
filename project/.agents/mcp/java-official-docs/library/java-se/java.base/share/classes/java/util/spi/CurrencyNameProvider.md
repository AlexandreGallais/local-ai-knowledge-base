---
title: "CurrencyNameProvider class (java.util.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/spi/CurrencyNameProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CurrencyNameProvider class (java.util.spi)

```java
public abstract class CurrencyNameProvider extends LocaleServiceProvider
```

An abstract class for service providers that
provide localized currency symbols and display names for the
Currency class.
Note that currency symbols are considered names when determining
behaviors described in the
LocaleServiceProvider
specification.

**Since:** 1.6

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

Parameters:

- `currencyCode`: the ISO 4217 currency code, which consists of three upper-case letters between 'A' (U+0041) and 'Z' (U+005A)
- `locale`: the desired locale

**Returns:** the symbol of the given currency code for the specified locale, or null if
    the symbol is not available for the locale

**See also:** java.util.Currency#getSymbol(java.util.Locale)

Throws:

- `NullPointerException`: if `currencyCode` or `locale` is null
- `IllegalArgumentException`: if `currencyCode` is not in the form of three upper-case letters, or `locale` isn't one of the locales returned from getAvailableLocales().

## CurrencyNameProvider.getDisplayName(String, Locale)

```java
public String getDisplayName(String currencyCode, Locale locale)
```

Returns a name for the currency that is appropriate for display to the
user.  The default implementation returns null.

Parameters:

- `currencyCode`: the ISO 4217 currency code, which consists of three upper-case letters between 'A' (U+0041) and 'Z' (U+005A)
- `locale`: the desired locale

**Returns:** the name for the currency that is appropriate for display to the
    user, or null if the name is not available for the locale

**Since:** 1.7

Throws:

- `IllegalArgumentException`: if `currencyCode` is not in the form of three upper-case letters, or `locale` isn't one of the locales returned from getAvailableLocales().
- `NullPointerException`: if `currencyCode` or `locale` is `null`
