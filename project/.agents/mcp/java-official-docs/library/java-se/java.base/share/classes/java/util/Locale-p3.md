---
title: "Locale class (java.util) (part 3 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Locale.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Locale class (java.util) (part 3 of 6)

## Locale.getDefault(Locale.Category)

```java
public static Locale getDefault(Locale.Category category)
```

Gets the current value of the default locale for
the specified Category for this instance of the Java Virtual Machine.

The Java Virtual Machine sets the default locale during startup based
on the host environment. It is used by many locale-sensitive methods
if no locale is explicitly specified. It can be changed using the
Locale) method.

Parameters:

- `category`: the specified category to get the default locale

**Returns:** the default locale for the specified Category for this instance
    of the Java Virtual Machine

**See also:** #setDefault(Locale.Category, Locale)

**Since:** 1.7

Throws:

- `NullPointerException`: if category is null

## Locale.setDefault(Locale)

```java
public static synchronized void setDefault(Locale newLocale)
```

Sets the default locale for
this instance of the Java Virtual Machine. This does not affect the
host locale.

The Java Virtual Machine sets the default locale during startup
based on the host environment. It is used by many locale-sensitive
methods if no locale is explicitly specified.

Since changing the default locale may affect many different areas
of functionality, this method should only be used if the caller
is prepared to reinitialize locale-sensitive code running
within the same Java Virtual Machine.

By setting the default locale with this method, all of the default
locales for each Category are also set to the specified default locale.

Parameters:

- `newLocale`: the new default locale

Throws:

- `NullPointerException`: if `newLocale` is null

## Locale.setDefault(Locale.Category, Locale)

```java
public static synchronized void setDefault(Locale.Category category, Locale newLocale)
```

Sets the default locale for the specified
Category for this instance of the Java Virtual Machine. This does
not affect the host locale.

The Java Virtual Machine sets the default locale during startup based
on the host environment. It is used by many locale-sensitive methods
if no locale is explicitly specified.

Since changing the default locale may affect many different areas of
functionality, this method should only be used if the caller is
prepared to reinitialize locale-sensitive code running within the
same Java Virtual Machine.

Parameters:

- `category`: the specified category to set the default locale
- `newLocale`: the new default locale

**See also:** #getDefault(Locale.Category)

**Since:** 1.7

Throws:

- `NullPointerException`: if category and/or newLocale is null

## Locale.getAvailableLocales()

```java
public static Locale[] getAvailableLocales()
```

The returned array represents the union of locales supported
by the Java runtime environment and by deployed
LocaleServiceProvider
implementations. At a minimum, the returned array must contain a
`Locale` instance equal to Locale.ROOT and
a `Locale` instance equal to Locale.US.

## Locale.availableLocales()

```java
public static Stream<Locale> availableLocales()
```

The returned stream represents the union of locales supported
by the Java runtime environment and by deployed
LocaleServiceProvider
implementations. At a minimum, the returned stream must contain a
`Locale` instance equal to Locale.ROOT and
a `Locale` instance equal to Locale.US.

**Implementation note:** Unlike `getAvailableLocales()`, this method does
not create a defensive copy of the Locale array.

**Since:** 21

## Locale.getISOCountries()

```java
public static String[] getISOCountries()
```

Returns a list of all 2-letter country codes defined in ISO 3166.
Can be used to obtain Locales.
This method is equivalent to type)
with `type`  `IsoCountryCode.PART1_ALPHA2`.

**Note:** The `Locale` class also supports other codes for
country (region), such as 3-letter numeric UN M.49 area codes.
Therefore, the list returned by this method does not contain ALL valid
codes that can be used to obtain Locales.

Note that this method does not return obsolete 2-letter country codes.
ISO3166-3 codes which designate country codes for those obsolete codes,
can be retrieved from type) with
`type`  `IsoCountryCode.PART3`.

**Returns:** An array of ISO 3166 two-letter country codes.

## Locale.getISOCountries(IsoCountryCode)

```java
public static Set<String> getISOCountries(IsoCountryCode type)
```

Parameters:

- `type`: `Locale.IsoCountryCode` specified ISO code type.

**See also:** java.util.Locale.IsoCountryCode

**Since:** 9

Throws:

- `NullPointerException`: if type is null

## Locale.getISOLanguages()

```java
public static String[] getISOLanguages()
```

Returns a list of all 2-letter language codes defined in ISO 639.
Can be used to obtain Locales.

**Note:**

- ISO 639 is not a stable standard— some languages' codes have changed.
The list this function returns includes both the new and the old codes for the
languages whose codes have changed.

- The `Locale` class also supports language codes up to
8 characters in length.  Therefore, the list returned by this method does
not contain ALL valid codes that can be used to obtain Locales.

**Returns:** An array of ISO 639 two-letter language codes.

## Locale.getLanguage()

```java
public String getLanguage()
```

Returns the language code of this Locale.

**Implementation note:** This method returns the new forms for the obsolete ISO 639
codes ("iw", "ji", and "in"). See Legacy language codes for more information.

**Returns:** The language code, or the empty string if none is defined.

**See also:** #getDisplayLanguage

## Locale.getScript()

```java
public String getScript()
```

Returns the script for this locale, which should
either be the empty string or an ISO 15924 4-letter script
code. The first letter is uppercase and the rest are
lowercase, for example, 'Latn', 'Cyrl'.

**Returns:** The script code, or the empty string if none is defined.

**See also:** #getDisplayScript

**Since:** 1.7

## Locale.getCountry()

```java
public String getCountry()
```

Returns the country/region code for this locale, which should
either be the empty string, an uppercase ISO 3166 2-letter code,
or a UN M.49 3-digit code.

**Returns:** The country/region code, or the empty string if none is defined.

**See also:** #getDisplayCountry

## Locale.getVariant()

```java
public String getVariant()
```

Returns the variant code for this locale.

**Returns:** The variant code, or the empty string if none is defined.

**See also:** #getDisplayVariant

## Locale.hasExtensions()

```java
public boolean hasExtensions()
```

Returns `true` if this `Locale` has any extensions.

**Returns:** `true` if this `Locale` has any extensions

**Since:** 1.8

## Locale.stripExtensions()

```java
public Locale stripExtensions()
```

Returns a copy of this `Locale` with no extensions. If this `Locale` has no extensions, this `Locale`
is returned.

**Returns:** a copy of this `Locale` with no extensions, or `this`
        if `this` has no extensions

**Since:** 1.8

## Locale.getExtension(char)

```java
public String getExtension(char key)
```

Returns the extension (or private use) value associated with
the specified key, or null if there is no extension
associated with the key. To be well-formed, the key must be one
of `[0-9A-Za-z]`. Keys are case-insensitive, so
for example 'z' and 'Z' represent the same extension.

Parameters:

- `key`: the extension key

**Returns:** The extension, or null if this locale defines no
extension for the specified key.

**See also:** #PRIVATE_USE_EXTENSION

**See also:** #UNICODE_LOCALE_EXTENSION

**Since:** 1.7

Throws:

- `IllegalArgumentException`: if key is not well-formed

## Locale.getExtensionKeys()

```java
public Set<Character> getExtensionKeys()
```

Returns the set of extension keys associated with this locale, or the
empty set if it has no extensions. The returned set is unmodifiable.
The keys will all be lower-case.

**Returns:** The set of extension keys, or the empty set if this locale has
no extensions.

**Since:** 1.7

## Locale.getUnicodeLocaleAttributes()

```java
public Set<String> getUnicodeLocaleAttributes()
```

Returns the set of unicode locale attributes associated with
this locale, or the empty set if it has no attributes. The
returned set is unmodifiable.

**Returns:** The set of attributes.

**Since:** 1.7

## Locale.getUnicodeLocaleType(String)

```java
public String getUnicodeLocaleType(String key)
```

Returns the Unicode locale type associated with the specified Unicode locale key
for this locale. Returns the empty string for keys that are defined with no type.
Returns null if the key is not defined. Keys are case-insensitive. The key must
be two alphanumeric characters ([0-9a-zA-Z]), or an IllegalArgumentException is
thrown.

Parameters:

- `key`: the Unicode locale key

**Returns:** The Unicode locale type associated with the key, or null if the
locale does not define the key.

**Since:** 1.7

Throws:

- `IllegalArgumentException`: if the key is not well-formed
- `NullPointerException`: if `key` is null

## Locale.getUnicodeLocaleKeys()

```java
public Set<String> getUnicodeLocaleKeys()
```

Returns the set of Unicode locale keys defined by this locale, or the empty set if
this locale has none.  The returned set is immutable.  Keys are all lower case.

**Returns:** The set of Unicode locale keys, or the empty set if this locale has
no Unicode locale keywords.

**Since:** 1.7

## Locale.toString()

```java
public final String toString()
```

Returns a string representation of this `Locale`
object, consisting of language, country, variant, script,
and extensions as below:

language + "_" + country + "_" + (variant + "_#" | "#") + script + "_" + extensions

Language is always lower case, country is always upper case, script is always title
case, and extensions are always lower case.  Extensions and private use subtags
will be in canonical order as explained in `toLanguageTag`.

When the locale has neither script nor extensions, the result is the same as in
Java 6 and prior.

If both the language and country fields are missing, this function will return
the empty string, even if the variant, script, or extensions field is present
(a locale with just a variant is not allowed, the variant must accompany a well-formed
language or country code).

If script or extensions are present and variant is missing, no underscore is
added before the "#".

This behavior is designed to support debugging and to be compatible with
previous uses of `toString` that expected language, country, and variant
fields only.  To represent a Locale as a String for interchange purposes, use
`toLanguageTag`.

Examples:

- `en`

- `de_DE`

- `_GB`

- `en_US_WIN`

- `de__POSIX`

- `zh_CN_#Hans`

- `zh_TW_#Hant_x-java`

- `th_TH_TH_#u-nu-thai`

**Returns:** A string representation of the Locale, for debugging.

**See also:** #getDisplayName

**See also:** #toLanguageTag

## Locale.toLanguageTag()

```java
public String toLanguageTag()
```

Returns a well-formed IETF BCP 47 language tag representing
this locale.

If this `Locale` has a language, country, or
variant that does not satisfy the IETF BCP 47 language tag
syntax requirements, this method handles these fields as
described below:

**Language:** If language is empty, or not
well-formed (for example "a" or
"e2"), it will be emitted as "und" (Undetermined).

**Country:** If country is not well-formed
(for example "12" or "USA"), it will be omitted.

**Variant:** If variant **is** well-formed, each sub-segment
(delimited by '-' or '_') is emitted as a subtag.  Otherwise:

- if all sub-segments match `[0-9a-zA-Z]{1,8}`
(for example "WIN" or "Oracle_JDK_Standard_Edition"), the first
ill-formed sub-segment and all following will be appended to
the private use subtag.  The first appended subtag will be
"lvariant", followed by the sub-segments in order, separated by
hyphen. For example, "x-lvariant-WIN",
"Oracle-x-lvariant-JDK-Standard-Edition".

- if any sub-segment does not match
`[0-9a-zA-Z]{1,8}`, the variant will be truncated
and the problematic sub-segment and all following sub-segments
will be omitted.  If the remainder is non-empty, it will be
emitted as a private use subtag as above (even if the remainder
turns out to be well-formed).  For example,
"Solaris_isjustthecoolestthing" is emitted as
"x-lvariant-Solaris", not as "solaris".

**Special Conversions:** Java supports some old locale
representations, including deprecated ISO language codes,
for compatibility. This method performs the following
conversions:

- Deprecated ISO language codes "iw", "ji", and "in" are
converted to "he", "yi", and "id", respectively.

- A locale with language "no", country "NO", and variant
"NY", representing Norwegian Nynorsk (Norway), is converted
to a language tag "nn-NO".

**Note:** Although the language tag obtained by this
method is well-formed (satisfies the syntax requirements
defined by the IETF BCP 47 specification), it is not
necessarily a valid BCP 47 language tag.  For example,

will return "xx-YY", but the language subtag "xx" and the
region subtag "YY" are invalid because they are not registered
in the IANA Language Subtag Registry.

**Returns:** a BCP47 language tag representing the locale

**See also:** #forLanguageTag(String)

**Since:** 1.7
