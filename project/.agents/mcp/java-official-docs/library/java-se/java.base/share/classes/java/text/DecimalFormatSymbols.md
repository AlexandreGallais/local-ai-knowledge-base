# DecimalFormatSymbols class (java.text)

```java
public class DecimalFormatSymbols implements Cloneable, Serializable
```

This class represents the set of symbols (such as the decimal separator,
the grouping separator, and so on) needed by {@code DecimalFormat}
to format numbers. {@code DecimalFormat} creates for itself an instance of
{@code DecimalFormatSymbols} from its locale data.  If you need to change any
of these symbols, you can get the {@code DecimalFormatSymbols} object from
your {@code DecimalFormat} and modify it.

<p>If the locale contains "rg" (region override)
<a href="../util/Locale.html#def_locale_extension">Unicode extension</a>,
the symbols are overridden for the designated region.

@see          java.util.Locale
@see          DecimalFormat
@author       Mark Davis
@author       Alan Liu
@since 1.1

## DecimalFormatSymbols.DecimalFormatSymbols()

```java
public DecimalFormatSymbols()
```

Create a DecimalFormatSymbols object for the default
{@link java.util.Locale.Category#FORMAT FORMAT} locale.
This constructor can only construct instances for the locales
supported by the Java runtime environment, not for those
supported by installed
{@link java.text.spi.DecimalFormatSymbolsProvider DecimalFormatSymbolsProvider}
implementations. For full locale coverage, use the
{@link #getInstance(Locale) getInstance} method.
<p>This is equivalent to calling
{@link #DecimalFormatSymbols(Locale)
    DecimalFormatSymbols(Locale.getDefault(Locale.Category.FORMAT))}.
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT

## DecimalFormatSymbols.DecimalFormatSymbols(Locale)

```java
public DecimalFormatSymbols( Locale locale )
```

Create a DecimalFormatSymbols object for the given locale.
This constructor can only construct instances for the locales
supported by the Java runtime environment, not for those
supported by installed
{@link java.text.spi.DecimalFormatSymbolsProvider DecimalFormatSymbolsProvider}
implementations. For full locale coverage, use the
{@link #getInstance(Locale) getInstance} method.
If the specified locale contains the {@link java.util.Locale#UNICODE_LOCALE_EXTENSION}
for the numbering system, the instance is initialized with the specified numbering
system if the JRE implementation supports it. For example,
<pre>
NumberFormat.getNumberInstance(Locale.forLanguageTag("th-TH-u-nu-thai"))
</pre>
This may return a {@code NumberFormat} instance with the Thai numbering system,
instead of the Latin numbering system.

@param locale the desired locale
@throws    NullPointerException if {@code locale} is null

## DecimalFormatSymbols.getAvailableLocales()

```java
public static Locale[] getAvailableLocales()
```

Returns an array of all locales for which the
{@code getInstance} methods of this class can return
localized instances.
The returned array represents the union of locales supported by the Java
runtime and by installed
{@link java.text.spi.DecimalFormatSymbolsProvider DecimalFormatSymbolsProvider}
implementations. At a minimum, the returned array must contain a
{@code Locale} instance equal to {@link Locale#ROOT Locale.ROOT} and
a {@code Locale} instance equal to {@link Locale#US Locale.US}.

@return an array of locales for which localized
        {@code DecimalFormatSymbols} instances are available.
@since 1.6

## DecimalFormatSymbols.getInstance()

```java
public static final DecimalFormatSymbols getInstance()
```

Gets the {@code DecimalFormatSymbols} instance for the default
locale.  This method provides access to {@code DecimalFormatSymbols}
instances for locales supported by the Java runtime itself as well
as for those supported by installed
{@link java.text.spi.DecimalFormatSymbolsProvider
DecimalFormatSymbolsProvider} implementations.
<p>This is equivalent to calling
{@link #getInstance(Locale)
    getInstance(Locale.getDefault(Locale.Category.FORMAT))}.
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT
@return a {@code DecimalFormatSymbols} instance.
@since 1.6

## DecimalFormatSymbols.getInstance(Locale)

```java
public static final DecimalFormatSymbols getInstance(Locale locale)
```

Gets the {@code DecimalFormatSymbols} instance for the specified
locale.  This method provides access to {@code DecimalFormatSymbols}
instances for locales supported by the Java runtime itself as well
as for those supported by installed
{@link java.text.spi.DecimalFormatSymbolsProvider
DecimalFormatSymbolsProvider} implementations.
If the specified locale contains the {@link java.util.Locale#UNICODE_LOCALE_EXTENSION}
for the numbering system, the instance is initialized with the specified numbering
system if the JRE implementation supports it. For example,
<pre>
NumberFormat.getNumberInstance(Locale.forLanguageTag("th-TH-u-nu-thai"))
</pre>
This may return a {@code NumberFormat} instance with the Thai numbering system,
instead of the Latin numbering system.

@param locale the desired locale.
@return a {@code DecimalFormatSymbols} instance.
@throws    NullPointerException if {@code locale} is null
@since 1.6

## DecimalFormatSymbols.getLocale()

```java
public Locale getLocale()
```

{@return locale used to create this instance}

@since 19

## DecimalFormatSymbols.getZeroDigit()

```java
public char getZeroDigit()
```

Gets the character used for zero. Different for Arabic, etc.

@return the character used for zero

## DecimalFormatSymbols.setZeroDigit(char)

```java
public void setZeroDigit(char zeroDigit)
```

Sets the character used for zero. Different for Arabic, etc.

@param zeroDigit the character used for zero

## DecimalFormatSymbols.getGroupingSeparator()

```java
public char getGroupingSeparator()
```

Gets the character used for grouping separator. Different for French, etc.

@return the grouping separator

## DecimalFormatSymbols.setGroupingSeparator(char)

```java
public void setGroupingSeparator(char groupingSeparator)
```

Sets the character used for grouping separator. Different for French, etc.

@param groupingSeparator the grouping separator

## DecimalFormatSymbols.getDecimalSeparator()

```java
public char getDecimalSeparator()
```

Gets the character used for decimal sign. Different for French, etc.

@return the character used for decimal sign

## DecimalFormatSymbols.setDecimalSeparator(char)

```java
public void setDecimalSeparator(char decimalSeparator)
```

Sets the character used for decimal sign. Different for French, etc.

@param decimalSeparator the character used for decimal sign

## DecimalFormatSymbols.getPerMill()

```java
public char getPerMill()
```

Gets the character used for per mille sign. Different for Arabic, etc.

@return the character used for per mille sign

## DecimalFormatSymbols.setPerMill(char)

```java
public void setPerMill(char perMill)
```

Sets the character used for per mille sign. Different for Arabic, etc.

@param perMill the character used for per mille sign

## DecimalFormatSymbols.getPercent()

```java
public char getPercent()
```

Gets the character used for percent sign. Different for Arabic, etc.

@return the character used for percent sign

## DecimalFormatSymbols.setPercent(char)

```java
public void setPercent(char percent)
```

Sets the character used for percent sign. Different for Arabic, etc.

@param percent the character used for percent sign

## DecimalFormatSymbols.getDigit()

```java
public char getDigit()
```

Gets the character used for a digit in a pattern.

@return the character used for a digit in a pattern

## DecimalFormatSymbols.setDigit(char)

```java
public void setDigit(char digit)
```

Sets the character used for a digit in a pattern.

@param digit the character used for a digit in a pattern

## DecimalFormatSymbols.getPatternSeparator()

```java
public char getPatternSeparator()
```

Gets the character used to separate positive and negative subpatterns
in a pattern.

@return the pattern separator

## DecimalFormatSymbols.setPatternSeparator(char)

```java
public void setPatternSeparator(char patternSeparator)
```

Sets the character used to separate positive and negative subpatterns
in a pattern.

@param patternSeparator the pattern separator

## DecimalFormatSymbols.getInfinity()

```java
public String getInfinity()
```

Gets the string used to represent infinity. Almost always left
unchanged.

@return the string representing infinity

## DecimalFormatSymbols.setInfinity(String)

```java
public void setInfinity(String infinity)
```

Sets the string used to represent infinity. Almost always left
unchanged.

@param infinity the string representing infinity
@throws NullPointerException if {@code infinity} is {@code null}

## DecimalFormatSymbols.getNaN()

```java
public String getNaN()
```

Gets the string used to represent "not a number". Almost always left
unchanged.

@return the string representing "not a number"

## DecimalFormatSymbols.setNaN(String)

```java
public void setNaN(String NaN)
```

Sets the string used to represent "not a number". Almost always left
unchanged.

@param NaN the string representing "not a number"
@throws NullPointerException if {@code NaN} is {@code null}

## DecimalFormatSymbols.getMinusSign()

```java
public char getMinusSign()
```

Gets the character used to represent minus sign. If no explicit
negative format is specified, one is formed by prefixing
minusSign to the positive format.

@return the character representing minus sign

## DecimalFormatSymbols.setMinusSign(char)

```java
public void setMinusSign(char minusSign)
```

Sets the character used to represent minus sign. If no explicit
negative format is specified, one is formed by prefixing
minusSign to the positive format.

@param minusSign the character representing minus sign

## DecimalFormatSymbols.getCurrencySymbol()

```java
public String getCurrencySymbol()
```

Returns the currency symbol for the currency of these
DecimalFormatSymbols in their locale.

@return the currency symbol
@since 1.2

## DecimalFormatSymbols.setCurrencySymbol(String)

```java
public void setCurrencySymbol(String currency)
```

Sets the currency symbol for the currency of this
{@code DecimalFormatSymbols} in their locale. Unlike {@link
#setInternationalCurrencySymbol(String)}, this method does not update
the currency attribute nor the international currency symbol attribute.

@param currency the currency symbol
@throws NullPointerException if {@code currency} is {@code null}
@since 1.2

## DecimalFormatSymbols.getInternationalCurrencySymbol()

```java
public String getInternationalCurrencySymbol()
```

Returns the ISO 4217 currency code of the currency of these
DecimalFormatSymbols.

@return the currency code
@since 1.2

## DecimalFormatSymbols.setInternationalCurrencySymbol(String)

```java
public void setInternationalCurrencySymbol(String currencyCode)
```

Sets the ISO 4217 currency code of the currency of these
DecimalFormatSymbols.
If the currency code is valid (as defined by
{@link java.util.Currency#getInstance(java.lang.String) Currency.getInstance}),
this also sets the currency attribute to the corresponding Currency
instance and the currency symbol attribute to the currency's symbol
in the DecimalFormatSymbols' locale. If the currency code is not valid,
then the currency attribute and the currency symbol attribute are not modified.

@param currencyCode the currency code
@throws NullPointerException if {@code currencyCode} is {@code null}
@see #setCurrency
@see #setCurrencySymbol
@since 1.2

## DecimalFormatSymbols.getCurrency()

```java
public Currency getCurrency()
```

{@return the {@code Currency} of this {@code DecimalFormatSymbols}}
@since 1.4

## DecimalFormatSymbols.setCurrency(Currency)

```java
public void setCurrency(Currency currency)
```

Sets the currency of this {@code DecimalFormatSymbols}.
This also sets the currency symbol attribute to the currency's symbol
in the DecimalFormatSymbols' locale, and the international currency
symbol attribute to the currency's ISO 4217 currency code.

@param currency the new currency to be used
@throws    NullPointerException if {@code currency} is null
@since 1.4
@see #setCurrencySymbol
@see #setInternationalCurrencySymbol

## DecimalFormatSymbols.getMonetaryDecimalSeparator()

```java
public char getMonetaryDecimalSeparator()
```

Returns the monetary decimal separator.

@return the monetary decimal separator
@since 1.2

## DecimalFormatSymbols.setMonetaryDecimalSeparator(char)

```java
public void setMonetaryDecimalSeparator(char sep)
```

Sets the monetary decimal separator.

@param sep the monetary decimal separator
@since 1.2

## DecimalFormatSymbols.getExponentSeparator()

```java
public String getExponentSeparator()
```

Returns the string used to separate the mantissa from the exponent.
Examples: "x10^" for 1.23x10^4, "E" for 1.23E4.

@return the exponent separator string
@see #setExponentSeparator(java.lang.String)
@since 1.6

## DecimalFormatSymbols.setExponentSeparator(String)

```java
public void setExponentSeparator(String exp)
```

Sets the string used to separate the mantissa from the exponent.
Examples: "x10^" for 1.23x10^4, "E" for 1.23E4.

@param exp the exponent separator string
@throws    NullPointerException if {@code exp} is null
@see #getExponentSeparator()
@since 1.6

## DecimalFormatSymbols.getMonetaryGroupingSeparator()

```java
public char getMonetaryGroupingSeparator()
```

Gets the character used for grouping separator for currencies.
May be different from {@code grouping separator} in some locales,
e.g, German in Austria.

@return the monetary grouping separator
@since 15

## DecimalFormatSymbols.setMonetaryGroupingSeparator(char)

```java
public void setMonetaryGroupingSeparator(char monetaryGroupingSeparator)
```

Sets the character used for grouping separator for currencies.
Invocation of this method will not affect the normal
{@code grouping separator}.

@param monetaryGroupingSeparator the monetary grouping separator
@see #setGroupingSeparator(char)
@since 15

## DecimalFormatSymbols.clone()

```java
public Object clone()
```

Standard override.

## DecimalFormatSymbols.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this {@code DecimalFormatSymbols} for equality.
Returns true if the object is also a {@code DecimalFormatSymbols} and the two
{@code DecimalFormatSymbols} objects represent the same set of symbols.

@implSpec This method performs an equality check with a notion of class
identity based on {@code getClass()}, rather than {@code instanceof}.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.
@param  obj object to be compared for equality
@return {@code true} if the specified object is equal to this {@code DecimalFormatSymbols}
@see Object#equals(Object)

## DecimalFormatSymbols.hashCode()

```java
public int hashCode()
```

{@return the hash code for this {@code DecimalFormatSymbols}}

@implSpec Non-transient instance fields of this class are used to calculate
a hash code value which adheres to the contract defined in {@link Objects#hashCode}.
@see Object#hashCode()