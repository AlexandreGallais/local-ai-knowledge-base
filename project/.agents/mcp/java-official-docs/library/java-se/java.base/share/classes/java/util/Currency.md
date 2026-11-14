# Currency class (java.util)

```java
public final class Currency implements Serializable
```

Represents a currency. Currencies are identified by their ISO 4217 currency
codes. Visit the <a href="http://www.iso.org/iso/home/standards/currency_codes.htm">
ISO web site</a> for more information.
<p>
The class is designed so that there's never more than one
{@code Currency} instance for any given currency. Therefore, there's
no public constructor. You obtain a {@code Currency} instance using
the {@code getInstance} methods.
<p>
Users can supersede the Java runtime currency data by means of the system
property {@systemProperty java.util.currency.data}. If this system property is
defined then its value is the location of a properties file, the contents of
which are key/value pairs of the ISO 3166 country codes and the ISO 4217
currency data respectively.  The value part consists of three ISO 4217 values
of a currency, i.e., an alphabetic code, a numeric code, and a minor unit.
Those three ISO 4217 values are separated by commas.
The lines which start with '#'s are considered comment lines. An optional UTC
timestamp may be specified per currency entry if users need to specify a
cutover date indicating when the new data comes into effect. The timestamp is
appended to the end of the currency properties and uses a comma as a separator.
If a UTC datestamp is present and valid, the JRE will only use the new currency
properties if the current UTC date is later than the date specified at class
loading time. The format of the timestamp must be of ISO 8601 format :
{@code 'yyyy-MM-dd'T'HH:mm:ss'}. For example,
<p>
<code>
#Sample currency properties<br>
JP=JPZ,999,0
</code>
<p>
will supersede the currency data for Japan. If JPZ is one of the existing
ISO 4217 currency code referred by other countries, the existing
JPZ currency data is updated with the given numeric code and minor
unit value.

<p>
<code>
#Sample currency properties with cutover date<br>
JP=JPZ,999,0,2014-01-01T00:00:00
</code>
<p>
will supersede the currency data for Japan if {@code Currency} class is loaded after
1st January 2014 00:00:00 GMT.
<p>
Where syntactically malformed entries are encountered, the entry is ignored
and the remainder of entries in file are processed. For instances where duplicate
country code entries exist, the behavior of the Currency information for that
{@code Currency} is undefined and the remainder of entries in file are processed.
<p>
If multiple property entries with same currency code but different numeric code
and/or minor unit are encountered, those entries are ignored and the remainder
of entries in file are processed.

@apiNote
It is recommended to use the {@link java.math.BigDecimal} class while dealing
with {@code Currency} or monetary values as it provides better handling of floating
point numbers and their operations.

@spec https://www.iso.org/iso-4217-currency-codes.html ISO - ISO 4217 - Currency codes
@see java.math.BigDecimal
@since 1.4

## Currency.getInstance(String)

```java
public static Currency getInstance(String currencyCode)
```

Returns the {@code Currency} instance for the given currency code.

@param currencyCode the ISO 4217 code of the currency
@return the {@code Currency} instance for the given currency code
@throws    NullPointerException if {@code currencyCode} is null
@throws    IllegalArgumentException if {@code currencyCode} is not
a supported ISO 4217 code.

## Currency.getInstance(Locale)

```java
public static Currency getInstance(Locale locale)
```

Returns the {@code Currency} instance for the country of the
given locale. The language and variant components of the locale
are ignored. The result may vary over time, as countries change their
currencies. For example, for the original member countries of the
European Monetary Union, the method returns the old national currencies
until December 31, 2001, and the Euro from January 1, 2002, local time
of the respective countries.
<p>
If the specified {@code locale} contains "cu" and/or "rg"
{@linkplain Locale##def_locale_extension Unicode extensions},
the instance returned from this method reflects
the values specified with those extensions. If both "cu" and "rg" are
specified, the currency from the "cu" extension supersedes the implicit one
from the "rg" extension.
<p>
The method returns {@code null} for territories that don't
have a currency, such as Antarctica.

@param locale the locale for whose country a {@code Currency}
instance is needed
@return the {@code Currency} instance for the country of the given
locale, or {@code null}
@throws    NullPointerException if {@code locale}
is {@code null}
@throws    IllegalArgumentException if the country of the given {@code locale}
is not a supported ISO 3166 country code.

## Currency.getAvailableCurrencies()

```java
public static Set<Currency> getAvailableCurrencies()
```

{@return a set of available currencies} The returned set of currencies
contains all the available currencies, which may include currencies
that represent obsolete ISO 4217 codes. If there is no currency available
in the runtime, the returned set is empty. The set can be modified
without affecting the available currencies in the runtime.

@apiNote Consider using {@link #availableCurrencies()} which returns
a stream of the available currencies.
@see #availableCurrencies()
@since 1.7

## Currency.availableCurrencies()

```java
public static Stream<Currency> availableCurrencies()
```

{@return a stream of available currencies} The returned stream of currencies
contains all the available currencies, which may include currencies
that represent obsolete ISO 4217 codes. If there is no currency
available in the runtime, the returned stream is empty.

@implNote Unlike {@link #getAvailableCurrencies()}, this method does
not create a defensive copy of the {@code Currency} set.
@see #getAvailableCurrencies()
@since 25

## Currency.getCurrencyCode()

```java
public String getCurrencyCode()
```

Gets the ISO 4217 currency code of this currency.

@return the ISO 4217 currency code of this currency.

## Currency.getSymbol()

```java
public String getSymbol()
```

Gets the symbol of this currency for the default
{@link Locale.Category#DISPLAY DISPLAY} locale.
For example, for the US Dollar, the symbol is "$" if the default
locale is the US, while for other locales it may be "US$". If no
symbol can be determined, the ISO 4217 currency code is returned.
<p>
If the default {@link Locale.Category#DISPLAY DISPLAY} locale
contains "rg" (region override)
{@linkplain Locale##def_locale_extension Unicode extensions},
the symbol returned from this method reflects
the value specified with that extension.

@implSpec
This is equivalent to calling
{@link #getSymbol(Locale)
    getSymbol(Locale.getDefault(Locale.Category.DISPLAY))}.

@return the symbol of this currency for the default
    {@link Locale.Category#DISPLAY DISPLAY} locale

## Currency.getSymbol(Locale)

```java
public String getSymbol(Locale locale)
```

Gets the symbol of this currency for the specified locale.
For example, for the US Dollar, the symbol is "$" if the specified
locale is the US, while for other locales it may be "US$". If no
symbol can be determined, the ISO 4217 currency code is returned.
<p>
If the specified {@code locale} contains "rg" (region override)
{@linkplain Locale##def_locale_extension Unicode extensions},
the symbol returned from this method reflects
the value specified with that extension.

@param locale the locale for which a display name for this currency is
needed
@return the symbol of this currency for the specified locale
@throws    NullPointerException if {@code locale} is null

## Currency.getDefaultFractionDigits()

```java
public int getDefaultFractionDigits()
```

Gets the default number of fraction digits used with this currency.
Note that the number of fraction digits is the same as ISO 4217's
minor unit for the currency.
For example, the default number of fraction digits for the Euro is 2,
while for the Japanese Yen it's 0.
In the case of pseudo-currencies, such as IMF Special Drawing Rights,
-1 is returned.

@return the default number of fraction digits used with this currency

## Currency.getNumericCode()

```java
public int getNumericCode()
```

Returns the ISO 4217 numeric code of this currency.

@return the ISO 4217 numeric code of this currency
@since 1.7

## Currency.getNumericCodeAsString()

```java
public String getNumericCodeAsString()
```

Returns the 3 digit ISO 4217 numeric code of this currency as a {@code String}.
Unlike {@link #getNumericCode()}, which returns the numeric code as {@code int},
this method always returns the numeric code as a 3 digit string.
e.g. a numeric value of 32 would be returned as "032",
and a numeric value of 6 would be returned as "006".

@return the 3 digit ISO 4217 numeric code of this currency as a {@code String}
@since 9

## Currency.getDisplayName()

```java
public String getDisplayName()
```

Gets the name that is suitable for displaying this currency for
the default {@link Locale.Category#DISPLAY DISPLAY} locale.
If there is no suitable display name found
for the default locale, the ISO 4217 currency code is returned.

@implSpec
This is equivalent to calling
{@link #getDisplayName(Locale)
    getDisplayName(Locale.getDefault(Locale.Category.DISPLAY))}.

@return the display name of this currency for the default
    {@link Locale.Category#DISPLAY DISPLAY} locale
@since 1.7

## Currency.getDisplayName(Locale)

```java
public String getDisplayName(Locale locale)
```

Gets the name that is suitable for displaying this currency for
the specified locale.  If there is no suitable display name found
for the specified locale, the ISO 4217 currency code is returned.

@param locale the locale for which a display name for this currency is
needed
@return the display name of this currency for the specified locale
@throws    NullPointerException if {@code locale} is null
@since 1.7

## Currency.toString()

```java
public String toString()
```

Returns the ISO 4217 currency code of this currency.

@return the ISO 4217 currency code of this currency