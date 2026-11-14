# DecimalStyle class (java.time.format)

```java
public final class DecimalStyle
```

Localized decimal style used in date and time formatting.
<p>
A significant part of dealing with dates and times is the localization.
This class acts as a central point for accessing the information.

@implSpec
This class is immutable and thread-safe.

@since 1.8

## DecimalStyle.STANDARD

```java
public static final DecimalStyle STANDARD
```

The standard set of non-localized decimal style symbols.
<p>
This uses standard ASCII characters for zero, positive, negative and a dot for the decimal point.

## DecimalStyle.getAvailableLocales()

```java
public static Set<Locale> getAvailableLocales()
```

Lists all the locales that are supported.
<p>
At a minimum, the returned {@code Set} must contain a {@code Locale} instance equal to
{@link Locale#ROOT Locale.ROOT} and a {@code Locale} instance equal to
{@link Locale#US Locale.US}.

@return a Set of Locales for which localization is supported

## DecimalStyle.ofDefaultLocale()

```java
public static DecimalStyle ofDefaultLocale()
```

Obtains the DecimalStyle for the default
{@link java.util.Locale.Category#FORMAT FORMAT} locale.
<p>
This method provides access to locale sensitive decimal style symbols.
<p>
This is equivalent to calling
{@link #of(Locale)
    of(Locale.getDefault(Locale.Category.FORMAT))}.

@see java.util.Locale.Category#FORMAT
@return the decimal style, not null

## DecimalStyle.of(Locale)

```java
public static DecimalStyle of(Locale locale)
```

Obtains the DecimalStyle for the specified locale.
<p>
This method provides access to locale sensitive decimal style symbols.
If the locale contains "nu" (Numbering System) and/or "rg"
(Region Override) <a href="../../util/Locale.html#def_locale_extension">
Unicode extensions</a>, returned instance will reflect the values specified with
those extensions. If both "nu" and "rg" are specified, the value from
the "nu" extension supersedes the implicit one from the "rg" extension.

@param locale  the locale, not null
@return the decimal style, not null

## DecimalStyle.getZeroDigit()

```java
public char getZeroDigit()
```

Gets the character that represents zero.
<p>
The character used to represent digits may vary by culture.
This method specifies the zero character to use, which implies the characters for one to nine.

@return the character for zero

## DecimalStyle.withZeroDigit(char)

```java
public DecimalStyle withZeroDigit(char zeroDigit)
```

Returns a copy of the info with a new character that represents zero.
<p>
The character used to represent digits may vary by culture.
This method specifies the zero character to use, which implies the characters for one to nine.

@param zeroDigit  the character for zero
@return  a copy with a new character that represents zero, not null

## DecimalStyle.getPositiveSign()

```java
public char getPositiveSign()
```

Gets the character that represents the positive sign.
<p>
The character used to represent a positive number may vary by culture.
This method specifies the character to use.

@return the character for the positive sign

## DecimalStyle.withPositiveSign(char)

```java
public DecimalStyle withPositiveSign(char positiveSign)
```

Returns a copy of the info with a new character that represents the positive sign.
<p>
The character used to represent a positive number may vary by culture.
This method specifies the character to use.

@param positiveSign  the character for the positive sign
@return  a copy with a new character that represents the positive sign, not null

## DecimalStyle.getNegativeSign()

```java
public char getNegativeSign()
```

Gets the character that represents the negative sign.
<p>
The character used to represent a negative number may vary by culture.
This method specifies the character to use.

@return the character for the negative sign

## DecimalStyle.withNegativeSign(char)

```java
public DecimalStyle withNegativeSign(char negativeSign)
```

Returns a copy of the info with a new character that represents the negative sign.
<p>
The character used to represent a negative number may vary by culture.
This method specifies the character to use.

@param negativeSign  the character for the negative sign
@return  a copy with a new character that represents the negative sign, not null

## DecimalStyle.getDecimalSeparator()

```java
public char getDecimalSeparator()
```

Gets the character that represents the decimal point.
<p>
The character used to represent a decimal point may vary by culture.
This method specifies the character to use.

@return the character for the decimal point

## DecimalStyle.withDecimalSeparator(char)

```java
public DecimalStyle withDecimalSeparator(char decimalSeparator)
```

Returns a copy of the info with a new character that represents the decimal point.
<p>
The character used to represent a decimal point may vary by culture.
This method specifies the character to use.

@param decimalSeparator  the character for the decimal point
@return  a copy with a new character that represents the decimal point, not null

## DecimalStyle.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this DecimalStyle is equal to another DecimalStyle.

@param obj  the object to check, null returns false
@return true if this is equal to the other date

## DecimalStyle.hashCode()

```java
public int hashCode()
```

A hash code for this DecimalStyle.

@return a suitable hash code

## DecimalStyle.toString()

```java
public String toString()
```

Returns a string describing this DecimalStyle.

@return a string description, not null