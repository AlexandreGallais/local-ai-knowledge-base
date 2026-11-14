---
title: "LocaleNameProvider class (java.util.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/spi/LocaleNameProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocaleNameProvider class (java.util.spi)

```java
public abstract class LocaleNameProvider extends LocaleServiceProvider
```

An abstract class for service providers that
provide localized names for the
Locale class.

**Since:** 1.6

## LocaleNameProvider.LocaleNameProvider()

```java
protected LocaleNameProvider()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## LocaleNameProvider.getDisplayLanguage(String, Locale)

```java
public abstract String getDisplayLanguage(String languageCode, Locale locale)
```

Returns a localized name for the given
IETF BCP47 language code and the given locale that is appropriate for
display to the user.
For example, if `languageCode` is "fr" and `locale`
is en_US, getDisplayLanguage() will return "French"; if `languageCode`
is "en" and `locale` is fr_FR, getDisplayLanguage() will return "anglais".
If the name returned cannot be localized according to `locale`,
(say, the provider does not have a Japanese name for Croatian),
this method returns null.

Parameters:

- `languageCode`: the language code string in the form of two to eight lower-case letters between 'a' (U+0061) and 'z' (U+007A)
- `locale`: the desired locale

**Returns:** the name of the given language code for the specified locale, or null if it's not
    available.

**See also:** java.util.Locale#getDisplayLanguage(java.util.Locale)

Throws:

- `NullPointerException`: if `languageCode` or `locale` is null
- `IllegalArgumentException`: if `languageCode` is not in the form of two or three lower-case letters, or `locale` isn't one of the locales returned from getAvailableLocales().

## LocaleNameProvider.getDisplayScript(String, Locale)

```java
public String getDisplayScript(String scriptCode, Locale locale)
```

Returns a localized name for the given
IETF BCP47 script code and the given locale that is appropriate for
display to the user.
For example, if `scriptCode` is "Latn" and `locale`
is en_US, getDisplayScript() will return "Latin"; if `scriptCode`
is "Cyrl" and `locale` is fr_FR, getDisplayScript() will return "cyrillique".
If the name returned cannot be localized according to `locale`,
(say, the provider does not have a Japanese name for Cyrillic),
this method returns null. The default implementation returns null.

Parameters:

- `scriptCode`: the four letter script code string in the form of title-case letters (the first letter is upper-case character between 'A' (U+0041) and 'Z' (U+005A) followed by three lower-case character between 'a' (U+0061) and 'z' (U+007A)).
- `locale`: the desired locale

**Returns:** the name of the given script code for the specified locale, or null if it's not
    available.

**See also:** java.util.Locale#getDisplayScript(java.util.Locale)

**Since:** 1.7

Throws:

- `NullPointerException`: if `scriptCode` or `locale` is null
- `IllegalArgumentException`: if `scriptCode` is not in the form of four title case letters, or `locale` isn't one of the locales returned from getAvailableLocales().

## LocaleNameProvider.getDisplayCountry(String, Locale)

```java
public abstract String getDisplayCountry(String countryCode, Locale locale)
```

Returns a localized name for the given
IETF BCP47 region code (either ISO 3166 country code or UN M.49 area
codes) and the given locale that is appropriate for display to the user.
For example, if `countryCode` is "FR" and `locale`
is en_US, getDisplayCountry() will return "France"; if `countryCode`
is "US" and `locale` is fr_FR, getDisplayCountry() will return "Etats-Unis".
If the name returned cannot be localized according to `locale`,
(say, the provider does not have a Japanese name for Croatia),
this method returns null.

Parameters:

- `countryCode`: the country(region) code string in the form of two upper-case letters between 'A' (U+0041) and 'Z' (U+005A) or the UN M.49 area code in the form of three digit letters between '0' (U+0030) and '9' (U+0039).
- `locale`: the desired locale

**Returns:** the name of the given country code for the specified locale, or null if it's not
    available.

**See also:** java.util.Locale#getDisplayCountry(java.util.Locale)

Throws:

- `NullPointerException`: if `countryCode` or `locale` is null
- `IllegalArgumentException`: if `countryCode` is not in the form of two upper-case letters or three digit letters, or `locale` isn't one of the locales returned from getAvailableLocales().

## LocaleNameProvider.getDisplayVariant(String, Locale)

```java
public abstract String getDisplayVariant(String variant, Locale locale)
```

Returns a localized name for the given variant code and the given locale that
is appropriate for display to the user.
If the name returned cannot be localized according to `locale`,
this method returns null.

Parameters:

- `variant`: the variant string
- `locale`: the desired locale

**Returns:** the name of the given variant string for the specified locale, or null if it's not
    available.

**See also:** java.util.Locale#getDisplayVariant(java.util.Locale)

Throws:

- `NullPointerException`: if `variant` or `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().

## LocaleNameProvider.getDisplayUnicodeExtensionKey(String, Locale)

```java
public String getDisplayUnicodeExtensionKey(String key, Locale locale)
```

Returns a localized name for the given
Unicode extension key,
and the given locale that is appropriate for display to the user.
If the name returned cannot be localized according to `locale`,
this method returns null.

Parameters:

- `key`: the Unicode Extension key, not null.
- `locale`: the desired locale, not null.

**Implementation requirements:** the default implementation returns `null`.

**Returns:** the name of the given key <example-value> for the specified locale,
 or null if it's not available.

**Since:** 10

Throws:

- `NullPointerException`: if `key` or `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().

## LocaleNameProvider.getDisplayUnicodeExtensionType(String, String, Locale)

```java
public String getDisplayUnicodeExtensionType(String type, String key, Locale locale)
```

Returns a localized name for the given
Unicode extension type,
and the given locale that is appropriate for display to the user.
If the name returned cannot be localized according to `locale`,
this method returns null.

Parameters:

- `type`: the Unicode Extension type, not null.
- `key`: the Unicode Extension key for this `type`, not null.
- `locale`: the desired locale, not null.

**Implementation requirements:** the default implementation returns `null`.

**Returns:** the name of the given type string for the specified locale,
 or null if it's not available.

**Since:** 10

Throws:

- `NullPointerException`: if `key`, `type` or `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().
