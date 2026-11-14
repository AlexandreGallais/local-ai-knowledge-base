---
title: "DecimalFormatSymbolsProvider class (java.text.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/spi/DecimalFormatSymbolsProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DecimalFormatSymbolsProvider class (java.text.spi)

```java
public abstract class DecimalFormatSymbolsProvider extends LocaleServiceProvider
```

An abstract class for service providers that
provide instances of the
DecimalFormatSymbols class.

The requested `Locale` may contain an  extension for
specifying the desired numbering system. For example, `"ar-u-nu-arab"`
(in the BCP 47 language tag form) specifies Arabic with the Arabic-Indic
digits and symbols, while `"ar-u-nu-latn"` specifies Arabic with the
Latin digits and symbols. Refer to the *Unicode Locale Data Markup
Language (LDML)* specification for numbering systems.

**Since:** 1.6

**See also:** Locale#forLanguageTag(String)

**See also:** Locale#getExtension(char)

## DecimalFormatSymbolsProvider.DecimalFormatSymbolsProvider()

```java
protected DecimalFormatSymbolsProvider()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## DecimalFormatSymbolsProvider.getInstance(Locale)

```java
public abstract DecimalFormatSymbols getInstance(Locale locale)
```

Returns a new `DecimalFormatSymbols` instance for the
specified locale.

Parameters:

- `locale`: the desired locale

**Returns:** a `DecimalFormatSymbols` instance.

**See also:** java.text.DecimalFormatSymbols#getInstance(java.util.Locale)

Throws:

- `NullPointerException`: if `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().
