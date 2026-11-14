---
title: "NumberFormatProvider class (java.text.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/spi/NumberFormatProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NumberFormatProvider class (java.text.spi)

```java
public abstract class NumberFormatProvider extends LocaleServiceProvider
```

An abstract class for service providers that
provide concrete implementations of the
NumberFormat class.

**Since:** 1.6

## NumberFormatProvider.NumberFormatProvider()

```java
protected NumberFormatProvider()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## NumberFormatProvider.getCurrencyInstance(Locale)

```java
public abstract NumberFormat getCurrencyInstance(Locale locale)
```

Returns a new `NumberFormat` instance which formats
monetary values for the specified locale.

Parameters:

- `locale`: the desired locale.

**Returns:** a currency formatter

**See also:** java.text.NumberFormat#getCurrencyInstance(java.util.Locale)

Throws:

- `NullPointerException`: if `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().

## NumberFormatProvider.getIntegerInstance(Locale)

```java
public abstract NumberFormat getIntegerInstance(Locale locale)
```

Returns a new `NumberFormat` instance which formats
integer values for the specified locale.
The returned number format is configured to
round floating point numbers to the nearest integer using
half-even rounding (see HALF_EVEN)
for formatting, and to parse only the integer part of
an input string (see isParseIntegerOnly).

Parameters:

- `locale`: the desired locale

**Returns:** a number format for integer values

**See also:** java.text.NumberFormat#getIntegerInstance(java.util.Locale)

Throws:

- `NullPointerException`: if `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().

## NumberFormatProvider.getNumberInstance(Locale)

```java
public abstract NumberFormat getNumberInstance(Locale locale)
```

Returns a new general-purpose `NumberFormat` instance for
the specified locale.

Parameters:

- `locale`: the desired locale

**Returns:** a general-purpose number formatter

**See also:** java.text.NumberFormat#getNumberInstance(java.util.Locale)

Throws:

- `NullPointerException`: if `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().

## NumberFormatProvider.getPercentInstance(Locale)

```java
public abstract NumberFormat getPercentInstance(Locale locale)
```

Returns a new `NumberFormat` instance which formats
percentage values for the specified locale.

Parameters:

- `locale`: the desired locale

**Returns:** a percent formatter

**See also:** java.text.NumberFormat#getPercentInstance(java.util.Locale)

Throws:

- `NullPointerException`: if `locale` is null
- `IllegalArgumentException`: if `locale` isn't one of the locales returned from getAvailableLocales().

## NumberFormatProvider.getCompactNumberInstance(Locale, NumberFormat.Style)

```java
public NumberFormat getCompactNumberInstance(Locale locale, NumberFormat.Style formatStyle)
```

Returns a new `NumberFormat` instance which formats
a number in its compact form for the specified
`locale` and `formatStyle`.

Parameters:

- `locale`: the desired locale
- `formatStyle`: the style for formatting a number

**Implementation requirements:** The default implementation of this method throws
UnsupportedOperationException. Overriding the implementation
of this method returns the compact number formatter instance
of the given `locale` with specified `formatStyle`.

**Returns:** a compact number formatter

**See also:** java.text.NumberFormat#getCompactNumberInstance(Locale,
                     NumberFormat.Style)

**Since:** 12

Throws:

- `NullPointerException`: if `locale` or `formatStyle` is `null`
- `IllegalArgumentException`: if `locale` is not one of the locales returned from getAvailableLocales().
- `UnsupportedOperationException`: if the implementation does not support this method
