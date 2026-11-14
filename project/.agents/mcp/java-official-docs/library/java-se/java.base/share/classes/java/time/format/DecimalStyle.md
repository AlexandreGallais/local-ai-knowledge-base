---
title: "DecimalStyle class (java.time.format)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/DecimalStyle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DecimalStyle class (java.time.format)

```java
public final class DecimalStyle
```

Localized decimal style used in date and time formatting.

A significant part of dealing with dates and times is the localization.
This class acts as a central point for accessing the information.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## DecimalStyle.STANDARD

```java
public static final DecimalStyle STANDARD
```

The standard set of non-localized decimal style symbols.

This uses standard ASCII characters for zero, positive, negative and a dot for the decimal point.

## DecimalStyle.getAvailableLocales()

```java
public static Set<Locale> getAvailableLocales()
```

Lists all the locales that are supported.

At a minimum, the returned `Set` must contain a `Locale` instance equal to
Locale.ROOT and a `Locale` instance equal to
Locale.US.

**Returns:** a Set of Locales for which localization is supported

## DecimalStyle.ofDefaultLocale()

```java
public static DecimalStyle ofDefaultLocale()
```

Obtains the DecimalStyle for the default
FORMAT locale.

This method provides access to locale sensitive decimal style symbols.

This is equivalent to calling
of(Locale.getDefault(Locale.Category.FORMAT)).

**See also:** java.util.Locale.Category#FORMAT

**Returns:** the decimal style, not null

## DecimalStyle.of(Locale)

```java
public static DecimalStyle of(Locale locale)
```

Obtains the DecimalStyle for the specified locale.

This method provides access to locale sensitive decimal style symbols.
If the locale contains "nu" (Numbering System) and/or "rg"
(Region Override)
Unicode extensions, returned instance will reflect the values specified with
those extensions. If both "nu" and "rg" are specified, the value from
the "nu" extension supersedes the implicit one from the "rg" extension.

Parameters:

- `locale`: the locale, not null

**Returns:** the decimal style, not null

## DecimalStyle.getZeroDigit()

```java
public char getZeroDigit()
```

Gets the character that represents zero.

The character used to represent digits may vary by culture.
This method specifies the zero character to use, which implies the characters for one to nine.

**Returns:** the character for zero

## DecimalStyle.withZeroDigit(char)

```java
public DecimalStyle withZeroDigit(char zeroDigit)
```

Returns a copy of the info with a new character that represents zero.

The character used to represent digits may vary by culture.
This method specifies the zero character to use, which implies the characters for one to nine.

Parameters:

- `zeroDigit`: the character for zero

**Returns:** a copy with a new character that represents zero, not null

## DecimalStyle.getPositiveSign()

```java
public char getPositiveSign()
```

Gets the character that represents the positive sign.

The character used to represent a positive number may vary by culture.
This method specifies the character to use.

**Returns:** the character for the positive sign

## DecimalStyle.withPositiveSign(char)

```java
public DecimalStyle withPositiveSign(char positiveSign)
```

Returns a copy of the info with a new character that represents the positive sign.

The character used to represent a positive number may vary by culture.
This method specifies the character to use.

Parameters:

- `positiveSign`: the character for the positive sign

**Returns:** a copy with a new character that represents the positive sign, not null

## DecimalStyle.getNegativeSign()

```java
public char getNegativeSign()
```

Gets the character that represents the negative sign.

The character used to represent a negative number may vary by culture.
This method specifies the character to use.

**Returns:** the character for the negative sign

## DecimalStyle.withNegativeSign(char)

```java
public DecimalStyle withNegativeSign(char negativeSign)
```

Returns a copy of the info with a new character that represents the negative sign.

The character used to represent a negative number may vary by culture.
This method specifies the character to use.

Parameters:

- `negativeSign`: the character for the negative sign

**Returns:** a copy with a new character that represents the negative sign, not null

## DecimalStyle.getDecimalSeparator()

```java
public char getDecimalSeparator()
```

Gets the character that represents the decimal point.

The character used to represent a decimal point may vary by culture.
This method specifies the character to use.

**Returns:** the character for the decimal point

## DecimalStyle.withDecimalSeparator(char)

```java
public DecimalStyle withDecimalSeparator(char decimalSeparator)
```

Returns a copy of the info with a new character that represents the decimal point.

The character used to represent a decimal point may vary by culture.
This method specifies the character to use.

Parameters:

- `decimalSeparator`: the character for the decimal point

**Returns:** a copy with a new character that represents the decimal point, not null

## DecimalStyle.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this DecimalStyle is equal to another DecimalStyle.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other date

## DecimalStyle.hashCode()

```java
public int hashCode()
```

A hash code for this DecimalStyle.

**Returns:** a suitable hash code

## DecimalStyle.toString()

```java
public String toString()
```

Returns a string describing this DecimalStyle.

**Returns:** a string description, not null
