---
title: "DateFormatSymbolsProvider class (java.text.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/spi/DateFormatSymbolsProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateFormatSymbolsProvider class (java.text.spi)

```java
public abstract class DateFormatSymbolsProvider extends LocaleServiceProvider
```

An abstract class for service providers that
provide instances of the
DateFormatSymbols class.

**Since:** 1.6

## DateFormatSymbolsProvider.DateFormatSymbolsProvider()

```java
protected DateFormatSymbolsProvider()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## DateFormatSymbolsProvider.getInstance(Locale)

```java
public abstract DateFormatSymbols getInstance(Locale locale)
```

Returns a new `DateFormatSymbols` instance for the
specified locale.

Parameters:

- `locale`: the desired locale

**Returns:** a `DateFormatSymbols` instance.

**See also:** java.text.DateFormatSymbols#getInstance(java.util.Locale)

Throws:

- `NullPointerException`: if `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().
