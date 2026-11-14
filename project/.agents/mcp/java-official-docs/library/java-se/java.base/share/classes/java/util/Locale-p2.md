---
title: "Locale class (java.util) (part 2 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Locale.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Locale class (java.util) (part 2 of 6)

The lookup operation returns the best matching language tags. It is
defined in RFC 4647 as follows:
"By contrast with filtering, each language range represents the most
specific tag that is an acceptable match.  The first matching tag found,
according to the user's priority, is considered the closest match and is the
item returned."

For example, if a Language Priority List consists of two language ranges,
`"zh-Hant-TW"` and `"en-US"`, in prioritized order, lookup
method progressively searches the language tags below in order to find the
best matching language tag.

```java
   1. zh-Hant-TW
   2. zh-Hant
   3. zh
   4. en-US
   5. en
```

If there is a language tag which matches completely to a language range
above, the language tag is returned.

`"*"` is the special language range, and it is ignored in lookup.

If multiple language tags match as a result of the subtag `'*'`
included in a language range, the first matching language tag returned by
an `Iterator` over a `Collection` of language tags is treated as
the best matching one.

#### Serialization

During serialization, writeObject writes all fields to the output
stream, including extensions.

During deserialization, readResolve adds extensions as described
in Special Cases, only
for the two cases th_TH_TH and ja_JP_JP.

**Implementation note:** #### Compatibility

 The following commentary is provided for apps that want to ensure
interoperability with older releases of `Locale` provided by the
reference implementation.

#### Locale Behavior

In order to maintain compatibility, Locale's (deprecated) constructors,
String, String), and its overloads retain their behavior prior to the Java Runtime
Environment version 1.7. That is, a length constraint is not imposed on any of
the input parameters. Similarly, the same preservation of past behavior is largely true
for the `toString()` method.
Apps that previously parsed the output of `toString()` into language,
country, and variant fields can continue to do so (although this is strongly
discouraged). A caveat is that the variant field will have additional
information in it if script or extensions are present.

In addition, BCP 47 imposes syntax restrictions that are not
imposed by Locale's constructors. This means that conversions
between some Locales and BCP 47 language tags cannot be made without
losing information. Thus `toLanguageTag` cannot
represent the state of locales whose language, country, or variant
do not conform to BCP 47.

Because of these issues, it is recommended that apps migrate
away from constructing non-conforming locales and use the
`forLanguageTag(String)` and `Locale.Builder` APIs instead.
Apps desiring a string representation of the complete locale can
then always rely on `toLanguageTag` for this purpose.

#### Special cases

For compatibility reasons, two
non-conforming locales are treated as special cases.  These are
**`ja_JP_JP`** and **`th_TH_TH`**. These are ill-formed
in BCP 47 since the variants are too short. To ease migration to BCP 47,
these are treated specially during construction.  These two cases (and only
these) cause a constructor to generate an extension, all other values behave
exactly as they did prior to Java 7.

Java has used `ja_JP_JP` to represent Japanese as used in
Japan together with the Japanese Imperial calendar. This is now
representable using a Unicode locale extension, by specifying the
Unicode locale key `ca` (for "calendar") and type
`japanese`. When the Locale constructor is called with the
arguments "ja", "JP", "JP", the extension "u-ca-japanese" is
automatically added.

Java has used `th_TH_TH` to represent Thai as used in
Thailand together with Thai digits. This is also now representable using
a Unicode locale extension, by specifying the Unicode locale key
`nu` (for "number") and value `thai`. When the Locale
constructor is called with the arguments "th", "TH", "TH", the
extension "u-nu-thai" is automatically added.

#### Legacy language codes

Locale's constructors have always converted three language codes to
their earlier, obsoleted forms: `he` maps to `iw`,
`yi` maps to `ji`, and `id` maps to
`in`. Since Java SE 17, this is no longer the case. Each
language maps to its new form; `iw` maps to `he`, `ji`
maps to `yi`, and `in` maps to `id`.

For backwards compatible behavior, the system property
`java.locale.useOldISOCodes` reverts the behavior
back to that of before Java SE 17. If the system property is set to
`true`, those three current language codes are mapped to their
backward compatible forms. The property is only read at Java runtime
startup and subsequent calls to `System.setProperty()` will
have no effect. **As of Java SE 25, the use of the
`java.locale.useOldISOCodes` system property is deprecated.
This backwards compatible behavior will be removed in a future release
of the JDK.**

The APIs added in Java SE 7 map between the old and new language codes,
maintaining the mapped codes internal to Locale (so that
`getLanguage` and `toString` reflect the mapped
code, which depends on the `java.locale.useOldISOCodes` system
property), but using the new codes in the BCP 47 language tag APIs (so
that `toLanguageTag` reflects the new one). This
preserves the equivalence between Locales no matter which code or
API is used to construct them. Java's default resource bundle
lookup mechanism also implements this mapping, so that resources
can be named using either convention, see `ResourceBundle.Control`.

**See also:** Builder

**See also:** ResourceBundle

**See also:** java.text.Format

**See also:** java.text.NumberFormat

**See also:** java.text.Collator

**Since:** 1.1

## Locale.ENGLISH

```java
public static final Locale ENGLISH
```

Useful constant for language.

## Locale.FRENCH

```java
public static final Locale FRENCH
```

Useful constant for language.

## Locale.GERMAN

```java
public static final Locale GERMAN
```

Useful constant for language.

## Locale.ITALIAN

```java
public static final Locale ITALIAN
```

Useful constant for language.

## Locale.JAPANESE

```java
public static final Locale JAPANESE
```

Useful constant for language.

## Locale.KOREAN

```java
public static final Locale KOREAN
```

Useful constant for language.

## Locale.CHINESE

```java
public static final Locale CHINESE
```

Useful constant for language.

## Locale.SIMPLIFIED_CHINESE

```java
public static final Locale SIMPLIFIED_CHINESE
```

Useful constant for language.

## Locale.TRADITIONAL_CHINESE

```java
public static final Locale TRADITIONAL_CHINESE
```

Useful constant for language.

## Locale.FRANCE

```java
public static final Locale FRANCE
```

Useful constant for country.

## Locale.GERMANY

```java
public static final Locale GERMANY
```

Useful constant for country.

## Locale.ITALY

```java
public static final Locale ITALY
```

Useful constant for country.

## Locale.JAPAN

```java
public static final Locale JAPAN
```

Useful constant for country.

## Locale.KOREA

```java
public static final Locale KOREA
```

Useful constant for country.

## Locale.UK

```java
public static final Locale UK
```

Useful constant for country.

## Locale.US

```java
public static final Locale US
```

Useful constant for country.

## Locale.CANADA

```java
public static final Locale CANADA
```

Useful constant for country.

## Locale.CANADA_FRENCH

```java
public static final Locale CANADA_FRENCH
```

Useful constant for country.

## Locale.ROOT

```java
public static final Locale ROOT
```

Useful constant for the root locale.  The root locale is the locale whose
language, country, and variant are empty ("") strings.  This is regarded
as the base locale of all locales, and is used as the language/country
neutral locale for the locale sensitive operations.

**Since:** 1.6

## Locale.CHINA

```java
public static final Locale CHINA
```

Useful constant for country.

## Locale.PRC

```java
public static final Locale PRC
```

Useful constant for country.

## Locale.TAIWAN

```java
public static final Locale TAIWAN
```

Useful constant for country.

## Locale.PRIVATE_USE_EXTENSION

```java
public static final char PRIVATE_USE_EXTENSION
```

The key for the private use extension ('x').

**See also:** #getExtension(char)

**See also:** Builder#setExtension(char, String)

**Since:** 1.7

## Locale.UNICODE_LOCALE_EXTENSION

```java
public static final char UNICODE_LOCALE_EXTENSION
```

The key for Unicode locale extension ('u').

**See also:** #getExtension(char)

**See also:** Builder#setExtension(char, String)

**Since:** 1.7

## Locale.Locale(String, String, String)

```java
public Locale(String language, String country, String variant)
```

Construct a locale from language, country and variant.
This constructor normalizes the language value to lowercase and
the country value to uppercase.

Parameters:

- `language`: An ISO 639 alpha-2 or alpha-3 language code, or a language subtag up to 8 characters in length. See the `Locale` class description about valid language values.
- `country`: An ISO 3166 alpha-2 country code or a UN M.49 numeric-3 area code. See the `Locale` class description about valid country values.
- `variant`: Any arbitrary value used to indicate a variation of a `Locale`. See the `Locale` class description for the details.

**Implementation note:** - Obsolete ISO 639 codes ("iw", "ji", and "in") are mapped to
their current forms. See Legacy language codes for more information.

- For backward compatibility reasons, this constructor does not make
any syntactic checks on the input.

- The two cases ("ja", "JP", "JP") and ("th", "TH", "TH") are handled specially,
see Special Cases for more information.

**Deprecated:** Locale constructors have been deprecated. See Obtaining a Locale for other options.

Throws:

- `NullPointerException`: thrown if any argument is null.

## Locale.Locale(String, String)

```java
public Locale(String language, String country)
```

Construct a locale from language and country.
This constructor normalizes the language value to lowercase and
the country value to uppercase.

Parameters:

- `language`: An ISO 639 alpha-2 or alpha-3 language code, or a language subtag up to 8 characters in length. See the `Locale` class description about valid language values.
- `country`: An ISO 3166 alpha-2 country code or a UN M.49 numeric-3 area code. See the `Locale` class description about valid country values.

**Implementation note:** - Obsolete ISO 639 codes ("iw", "ji", and "in") are mapped to
their current forms. See Legacy language codes for more information.

- For backward compatibility reasons, this constructor does not make
any syntactic checks on the input.

**Deprecated:** Locale constructors have been deprecated. See Obtaining a Locale for other options.

Throws:

- `NullPointerException`: thrown if either argument is null.

## Locale.Locale(String)

```java
public Locale(String language)
```

Construct a locale from a language code.
This constructor normalizes the language value to lowercase.

Parameters:

- `language`: An ISO 639 alpha-2 or alpha-3 language code, or a language subtag up to 8 characters in length. See the `Locale` class description about valid language values.

**Implementation note:** - Obsolete ISO 639 codes ("iw", "ji", and "in") are mapped to
their current forms. See Legacy language codes for more information.

- For backward compatibility reasons, this constructor does not make
any syntactic checks on the input.

**Deprecated:** Locale constructors have been deprecated. See Obtaining a Locale for other options.

**Since:** 1.4

Throws:

- `NullPointerException`: thrown if argument is null.

## Locale.of(String, String, String)

```java
public static Locale of(String language, String country, String variant)
```

Obtains a locale from language, country and variant.
This method normalizes the language value to lowercase and
the country value to uppercase.

Parameters:

- `language`: A language code. See the `Locale` class description of language values.
- `country`: A country code. See the `Locale` class description of country values.
- `variant`: Any arbitrary value used to indicate a variation of a `Locale`. See the `Locale` class description of variant values.

**Implementation note:** - This method does not make any syntactic checks on the input.
Use `Locale.Builder` for full syntactic checks with BCP47.

- The two cases ("ja", "JP", "JP") and ("th", "TH", "TH") are handled specially,
see Special Cases for more information.

- Obsolete ISO 639 codes ("iw", "ji", and "in") are mapped to
their current forms. See Legacy language codes for more information.

**Returns:** A `Locale` object

**Since:** 19

Throws:

- `NullPointerException`: thrown if any argument is null.

## Locale.of(String, String)

```java
public static Locale of(String language, String country)
```

Obtains a locale from language and country.
This method normalizes the language value to lowercase and
the country value to uppercase.

Parameters:

- `language`: A language code. See the `Locale` class description of language values.
- `country`: A country code. See the `Locale` class description of country values.

**Implementation note:** - This method does not make any syntactic checks on the input.
Use `Locale.Builder` for full syntactic checks with BCP47.

- Obsolete ISO 639 codes ("iw", "ji", and "in") are mapped to
their current forms. See Legacy language codes for more information.

**Returns:** A `Locale` object

**Since:** 19

Throws:

- `NullPointerException`: thrown if either argument is null.

## Locale.of(String)

```java
public static Locale of(String language)
```

Obtains a locale from a language code.
This method normalizes the language value to lowercase.

Parameters:

- `language`: A language code. See the `Locale` class description of language values.

**Implementation note:** - This method does not make any syntactic checks on the input.
Use `Locale.Builder` for full syntactic checks with BCP47.

- Obsolete ISO 639 codes ("iw", "ji", and "in") are mapped to
their current forms. See Legacy language codes for more information.

**Returns:** A `Locale` object

**Since:** 19

Throws:

- `NullPointerException`: thrown if argument is null.

## Locale.getDefault()

```java
public static Locale getDefault()
```

Gets the current value of the default locale for
this instance of the Java Virtual Machine.

The Java Virtual Machine sets the default locale during startup
based on the host environment. It is used by many locale-sensitive
methods if no locale is explicitly specified.
It can be changed using the
`setDefault(Locale)` method.

**Returns:** the default locale for this instance of the Java Virtual Machine
