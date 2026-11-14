---
title: "DecimalFormatSymbols class (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/DecimalFormatSymbols.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DecimalFormatSymbols class (java.text)

```java
public class DecimalFormatSymbols implements Cloneable, Serializable
```

This class represents the set of symbols (such as the decimal separator,
the grouping separator, and so on) needed by `DecimalFormat`
to format numbers. `DecimalFormat` creates for itself an instance of
`DecimalFormatSymbols` from its locale data.  If you need to change any
of these symbols, you can get the `DecimalFormatSymbols` object from
your `DecimalFormat` and modify it.

If the locale contains "rg" (region override)
Unicode extension,
the symbols are overridden for the designated region.

**See also:** java.util.Locale

**See also:** DecimalFormat

**Since:** 1.1

## DecimalFormatSymbols.DecimalFormatSymbols()

```java
public DecimalFormatSymbols()
```

Create a DecimalFormatSymbols object for the default
FORMAT locale.
This constructor can only construct instances for the locales
supported by the Java runtime environment, not for those
supported by installed
DecimalFormatSymbolsProvider
implementations. For full locale coverage, use the
getInstance method.

This is equivalent to calling
DecimalFormatSymbols(Locale.getDefault(Locale.Category.FORMAT)).

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

## DecimalFormatSymbols.DecimalFormatSymbols(Locale)

```java
public DecimalFormatSymbols( Locale locale )
```

Create a DecimalFormatSymbols object for the given locale.
This constructor can only construct instances for the locales
supported by the Java runtime environment, not for those
supported by installed
DecimalFormatSymbolsProvider
implementations. For full locale coverage, use the
getInstance method.
If the specified locale contains the `java.util.Locale.UNICODE_LOCALE_EXTENSION`
for the numbering system, the instance is initialized with the specified numbering
system if the JRE implementation supports it. For example,

```java
NumberFormat.getNumberInstance(Locale.forLanguageTag("th-TH-u-nu-thai"))
```

This may return a `NumberFormat` instance with the Thai numbering system,
instead of the Latin numbering system.

Parameters:

- `locale`: the desired locale

Throws:

- `NullPointerException`: if `locale` is null

## DecimalFormatSymbols.getAvailableLocales()

```java
public static Locale[] getAvailableLocales()
```

Returns an array of all locales for which the
`getInstance` methods of this class can return
localized instances.
The returned array represents the union of locales supported by the Java
runtime and by installed
DecimalFormatSymbolsProvider
implementations. At a minimum, the returned array must contain a
`Locale` instance equal to Locale.ROOT and
a `Locale` instance equal to Locale.US.

**Returns:** an array of locales for which localized
        `DecimalFormatSymbols` instances are available.

**Since:** 1.6

## DecimalFormatSymbols.getInstance()

```java
public static final DecimalFormatSymbols getInstance()
```

Gets the `DecimalFormatSymbols` instance for the default
locale.  This method provides access to `DecimalFormatSymbols`
instances for locales supported by the Java runtime itself as well
as for those supported by installed
DecimalFormatSymbolsProvider implementations.

This is equivalent to calling
getInstance(Locale.getDefault(Locale.Category.FORMAT)).

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

**Returns:** a `DecimalFormatSymbols` instance.

**Since:** 1.6

## DecimalFormatSymbols.getInstance(Locale)

```java
public static final DecimalFormatSymbols getInstance(Locale locale)
```

Gets the `DecimalFormatSymbols` instance for the specified
locale.  This method provides access to `DecimalFormatSymbols`
instances for locales supported by the Java runtime itself as well
as for those supported by installed
DecimalFormatSymbolsProvider implementations.
If the specified locale contains the `java.util.Locale.UNICODE_LOCALE_EXTENSION`
for the numbering system, the instance is initialized with the specified numbering
system if the JRE implementation supports it. For example,

```java
NumberFormat.getNumberInstance(Locale.forLanguageTag("th-TH-u-nu-thai"))
```

This may return a `NumberFormat` instance with the Thai numbering system,
instead of the Latin numbering system.

Parameters:

- `locale`: the desired locale.

**Returns:** a `DecimalFormatSymbols` instance.

**Since:** 1.6

Throws:

- `NullPointerException`: if `locale` is null

## DecimalFormatSymbols.getLocale()

```java
public Locale getLocale()
```

**Since:** 19

## DecimalFormatSymbols.getZeroDigit()

```java
public char getZeroDigit()
```

Gets the character used for zero. Different for Arabic, etc.

**Returns:** the character used for zero

## DecimalFormatSymbols.setZeroDigit(char)

```java
public void setZeroDigit(char zeroDigit)
```

Sets the character used for zero. Different for Arabic, etc.

Parameters:

- `zeroDigit`: the character used for zero

## DecimalFormatSymbols.getGroupingSeparator()

```java
public char getGroupingSeparator()
```

Gets the character used for grouping separator. Different for French, etc.

**Returns:** the grouping separator

## DecimalFormatSymbols.setGroupingSeparator(char)

```java
public void setGroupingSeparator(char groupingSeparator)
```

Sets the character used for grouping separator. Different for French, etc.

Parameters:

- `groupingSeparator`: the grouping separator

## DecimalFormatSymbols.getDecimalSeparator()

```java
public char getDecimalSeparator()
```

Gets the character used for decimal sign. Different for French, etc.

**Returns:** the character used for decimal sign

## DecimalFormatSymbols.setDecimalSeparator(char)

```java
public void setDecimalSeparator(char decimalSeparator)
```

Sets the character used for decimal sign. Different for French, etc.

Parameters:

- `decimalSeparator`: the character used for decimal sign

## DecimalFormatSymbols.getPerMill()

```java
public char getPerMill()
```

Gets the character used for per mille sign. Different for Arabic, etc.

**Returns:** the character used for per mille sign

## DecimalFormatSymbols.setPerMill(char)

```java
public void setPerMill(char perMill)
```

Sets the character used for per mille sign. Different for Arabic, etc.

Parameters:

- `perMill`: the character used for per mille sign

## DecimalFormatSymbols.getPercent()

```java
public char getPercent()
```

Gets the character used for percent sign. Different for Arabic, etc.

**Returns:** the character used for percent sign

## DecimalFormatSymbols.setPercent(char)

```java
public void setPercent(char percent)
```

Sets the character used for percent sign. Different for Arabic, etc.

Parameters:

- `percent`: the character used for percent sign

## DecimalFormatSymbols.getDigit()

```java
public char getDigit()
```

Gets the character used for a digit in a pattern.

**Returns:** the character used for a digit in a pattern

## DecimalFormatSymbols.setDigit(char)

```java
public void setDigit(char digit)
```

Sets the character used for a digit in a pattern.

Parameters:

- `digit`: the character used for a digit in a pattern

## DecimalFormatSymbols.getPatternSeparator()

```java
public char getPatternSeparator()
```

Gets the character used to separate positive and negative subpatterns
in a pattern.

**Returns:** the pattern separator

## DecimalFormatSymbols.setPatternSeparator(char)

```java
public void setPatternSeparator(char patternSeparator)
```

Sets the character used to separate positive and negative subpatterns
in a pattern.

Parameters:

- `patternSeparator`: the pattern separator

## DecimalFormatSymbols.getInfinity()

```java
public String getInfinity()
```

Gets the string used to represent infinity. Almost always left
unchanged.

**Returns:** the string representing infinity

## DecimalFormatSymbols.setInfinity(String)

```java
public void setInfinity(String infinity)
```

Sets the string used to represent infinity. Almost always left
unchanged.

Parameters:

- `infinity`: the string representing infinity

Throws:

- `NullPointerException`: if `infinity` is `null`

## DecimalFormatSymbols.getNaN()

```java
public String getNaN()
```

Gets the string used to represent "not a number". Almost always left
unchanged.

**Returns:** the string representing "not a number"

## DecimalFormatSymbols.setNaN(String)

```java
public void setNaN(String NaN)
```

Sets the string used to represent "not a number". Almost always left
unchanged.

Parameters:

- `NaN`: the string representing "not a number"

Throws:

- `NullPointerException`: if `NaN` is `null`

## DecimalFormatSymbols.getMinusSign()

```java
public char getMinusSign()
```

Gets the character used to represent minus sign. If no explicit
negative format is specified, one is formed by prefixing
minusSign to the positive format.

**Returns:** the character representing minus sign

## DecimalFormatSymbols.setMinusSign(char)

```java
public void setMinusSign(char minusSign)
```

Sets the character used to represent minus sign. If no explicit
negative format is specified, one is formed by prefixing
minusSign to the positive format.

Parameters:

- `minusSign`: the character representing minus sign

## DecimalFormatSymbols.getCurrencySymbol()

```java
public String getCurrencySymbol()
```

Returns the currency symbol for the currency of these
DecimalFormatSymbols in their locale.

**Returns:** the currency symbol

**Since:** 1.2

## DecimalFormatSymbols.setCurrencySymbol(String)

```java
public void setCurrencySymbol(String currency)
```

Sets the currency symbol for the currency of this
`DecimalFormatSymbols` in their locale. Unlike `setInternationalCurrencySymbol(String)`, this method does not update
the currency attribute nor the international currency symbol attribute.

Parameters:

- `currency`: the currency symbol

**Since:** 1.2

Throws:

- `NullPointerException`: if `currency` is `null`

## DecimalFormatSymbols.getInternationalCurrencySymbol()

```java
public String getInternationalCurrencySymbol()
```

Returns the ISO 4217 currency code of the currency of these
DecimalFormatSymbols.

**Returns:** the currency code

**Since:** 1.2

## DecimalFormatSymbols.setInternationalCurrencySymbol(String)

```java
public void setInternationalCurrencySymbol(String currencyCode)
```

Sets the ISO 4217 currency code of the currency of these
DecimalFormatSymbols.
If the currency code is valid (as defined by
Currency.getInstance),
this also sets the currency attribute to the corresponding Currency
instance and the currency symbol attribute to the currency's symbol
in the DecimalFormatSymbols' locale. If the currency code is not valid,
then the currency attribute and the currency symbol attribute are not modified.

Parameters:

- `currencyCode`: the currency code

**See also:** #setCurrency

**See also:** #setCurrencySymbol

**Since:** 1.2

Throws:

- `NullPointerException`: if `currencyCode` is `null`

## DecimalFormatSymbols.getCurrency()

```java
public Currency getCurrency()
```

**Since:** 1.4

## DecimalFormatSymbols.setCurrency(Currency)

```java
public void setCurrency(Currency currency)
```

Sets the currency of this `DecimalFormatSymbols`.
This also sets the currency symbol attribute to the currency's symbol
in the DecimalFormatSymbols' locale, and the international currency
symbol attribute to the currency's ISO 4217 currency code.

Parameters:

- `currency`: the new currency to be used

**Since:** 1.4

**See also:** #setCurrencySymbol

**See also:** #setInternationalCurrencySymbol

Throws:

- `NullPointerException`: if `currency` is null

## DecimalFormatSymbols.getMonetaryDecimalSeparator()

```java
public char getMonetaryDecimalSeparator()
```

Returns the monetary decimal separator.

**Returns:** the monetary decimal separator

**Since:** 1.2

## DecimalFormatSymbols.setMonetaryDecimalSeparator(char)

```java
public void setMonetaryDecimalSeparator(char sep)
```

Sets the monetary decimal separator.

Parameters:

- `sep`: the monetary decimal separator

**Since:** 1.2

## DecimalFormatSymbols.getExponentSeparator()

```java
public String getExponentSeparator()
```

Returns the string used to separate the mantissa from the exponent.
Examples: "x10^" for 1.23x10^4, "E" for 1.23E4.

**Returns:** the exponent separator string

**See also:** #setExponentSeparator(java.lang.String)

**Since:** 1.6

## DecimalFormatSymbols.setExponentSeparator(String)

```java
public void setExponentSeparator(String exp)
```

Sets the string used to separate the mantissa from the exponent.
Examples: "x10^" for 1.23x10^4, "E" for 1.23E4.

Parameters:

- `exp`: the exponent separator string

**See also:** #getExponentSeparator()

**Since:** 1.6

Throws:

- `NullPointerException`: if `exp` is null

## DecimalFormatSymbols.getMonetaryGroupingSeparator()

```java
public char getMonetaryGroupingSeparator()
```

Gets the character used for grouping separator for currencies.
May be different from `grouping separator` in some locales,
e.g, German in Austria.

**Returns:** the monetary grouping separator

**Since:** 15

## DecimalFormatSymbols.setMonetaryGroupingSeparator(char)

```java
public void setMonetaryGroupingSeparator(char monetaryGroupingSeparator)
```

Sets the character used for grouping separator for currencies.
Invocation of this method will not affect the normal
`grouping separator`.

Parameters:

- `monetaryGroupingSeparator`: the monetary grouping separator

**See also:** #setGroupingSeparator(char)

**Since:** 15

## DecimalFormatSymbols.clone()

```java
public Object clone()
```

Standard override.

## DecimalFormatSymbols.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this `DecimalFormatSymbols` for equality.
Returns true if the object is also a `DecimalFormatSymbols` and the two
`DecimalFormatSymbols` objects represent the same set of symbols.

Parameters:

- `obj`: object to be compared for equality

**Implementation requirements:** This method performs an equality check with a notion of class
identity based on `getClass()`, rather than `instanceof`.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.

**Returns:** `true` if the specified object is equal to this `DecimalFormatSymbols`

**See also:** Object#equals(Object)

## DecimalFormatSymbols.hashCode()

```java
public int hashCode()
```

**Implementation requirements:** Non-transient instance fields of this class are used to calculate
a hash code value which adheres to the contract defined in `Objects.hashCode`.

**See also:** Object#hashCode()
