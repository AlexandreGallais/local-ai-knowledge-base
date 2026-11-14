---
title: "Locale class (java.util) (part 4 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Locale.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Locale class (java.util) (part 4 of 6)

## Locale.caseFoldLanguageTag(String)

```java
public static String caseFoldLanguageTag(String languageTag)
```

This method formats a language tag into one with case convention
that adheres to section 2.1.1. Formatting of Language Tags of RFC5646.
This format is defined as: *All subtags, including extension and private
use subtags, use lowercase letters with two exceptions: two-letter
and four-letter subtags that neither appear at the start of the tag
nor occur after singletons. Such two-letter subtags are all
uppercase (as in the tags "en-CA-x-ca" or "sgn-BE-FR") and four-
letter subtags are titlecase (as in the tag "az-Latn-x-latn").* As
legacy tags, (defined as "grandfathered" in RFC5646) are not always well-formed, this method
will simply case fold a legacy tag to match the exact case convention
for the particular tag specified in the respective
Legacy tags table.

**Special Exceptions**

To maintain consistency with variant
which is case-sensitive, this method will neither case fold variant
subtags nor case fold private use subtags prefixed by `lvariant`.

For example,

Excluding case folding, this method makes no modifications to the tag itself.
Case convention of language tags does not carry meaning, and is simply
recommended as it corresponds with various ISO standards, including:
ISO639-1, ISO15924, and ISO3166-1.

As the formatting of the case convention is dependent on the
positioning of certain subtags, callers of this method should ensure
that the language tag is well-formed, (conforming to section 2.1. Syntax
of RFC5646).

Parameters:

- `languageTag`: the IETF BCP 47 language tag.

**Since:** 21

Throws:

- `IllformedLocaleException`: if `languageTag` is not well-formed
- `NullPointerException`: if `languageTag` is `null`

## Locale.forLanguageTag(String)

```java
public static Locale forLanguageTag(String languageTag)
```

Returns a locale for the specified IETF BCP 47 language tag string.

If the specified language tag contains any ill-formed subtags,
the first such subtag and all following subtags are ignored.  Compare
to `Locale.Builder.setLanguageTag(String)` which throws an exception
in this case.

The following conversions** are performed:

- The language code "und" is mapped to language "".

- The language codes "iw", "ji", and "in" are mapped to "he",
"yi", and "id" respectively. (This is the same canonicalization
that's done in Locale's constructors.) See
Legacy language codes
for more information.

- The portion of a private use subtag prefixed by "lvariant",
if any, is removed and appended to the variant field in the
result locale (without case normalization).  If it is then
empty, the private use subtag is discarded:

-  BCP 47 language tags permit up to three extlang subtags. However,
the second and third extlang subtags are always ignored. As such,
the first extlang subtag in `languageTag` is used as the language,
and the primary language subtag and other extlang subtags are ignored.
Language tags that exceed three extlang subtags are considered
ill-formed starting at the offending extlang subtag.

- Case is normalized except for variant tags, which are left
unchanged.  Language is normalized to lower case, script to
title case, country to upper case, and extensions to lower
case.

- If, after processing, the locale would exactly match either
ja_JP_JP or th_TH_TH with no extensions, the appropriate
extensions are added as though the constructor had been called:

This implements the 'Language-Tag' production of BCP47, and
so supports legacy (regular and irregular, referred to as
"Type: grandfathered" in BCP47) as well as
private use language tags.  Stand alone private use tags are
represented as empty language and extension 'x-whatever',
and legacy tags are converted to their canonical replacements
where they exist.

Legacy tags with canonical replacements are as follows:

Legacy tags with canonical replacements

legacy tagmodern replacement

art-lojbanjbo
i-amiami
i-bnnbnn
i-hakhak
i-klingontlh
i-luxlb
i-navajonv
i-pwnpwn
i-taotao
i-taytay
i-tsutsu
no-boknb
no-nynnn
sgn-BE-FRsfb
sgn-BE-NLvgt
sgn-CH-DEsgg
zh-guoyucmn
zh-hakkahak
zh-min-nannan
zh-xianghsn

Legacy tags with no modern replacement will be
converted as follows:

Legacy tags with no modern replacement

legacy tagconverts to

cel-gaulishxtg-x-cel-gaulish
en-GB-oeden-GB-x-oed
i-defaulten-x-i-default
i-enochianund-x-i-enochian
i-mingosee-x-i-mingo
zh-minnan-x-zh-min

For a list of all legacy tags, see the
IANA Language Subtag Registry (search for "Type: grandfathered").

**Note**: there is no guarantee that `toLanguageTag`
and `forLanguageTag` will round-trip.

Parameters:

- `languageTag`: the language tag

**Returns:** The locale that best represents the language tag.

**See also:** #toLanguageTag()

**See also:** java.util.Locale.Builder#setLanguageTag(String)

**Since:** 1.7

Throws:

- `NullPointerException`: if `languageTag` is `null`

## Locale.getISO3Language()

```java
public String getISO3Language() throws MissingResourceException
```

If the language matches an ISO 639-1 two-letter code, the
corresponding ISO 639-2/T three-letter lowercase code is
returned.  The ISO 639-2 language codes can be found on-line,
see "Codes for the Representation of Names of Languages Part 2:
Alpha-3 Code".  If the locale specifies a three-letter
language, the language is returned as is.  If the locale does
not specify a language the empty string is returned.

Throws:

- `MissingResourceException`: Throws MissingResourceException if three-letter language abbreviation is not available for this locale.

## Locale.getISO3Country()

```java
public String getISO3Country() throws MissingResourceException
```

If the country matches an ISO 3166-1 alpha-2 code, the
corresponding ISO 3166-1 alpha-3 uppercase code is returned.
If the locale doesn't specify a country, this will be the empty
string.

The ISO 3166-1 codes can be found on-line.

Throws:

- `MissingResourceException`: Throws MissingResourceException if the three-letter country abbreviation is not available for this locale.

## Locale.getDisplayLanguage()

```java
public final String getDisplayLanguage()
```

Returns a name for the locale's language that is appropriate for display to the
user.
If possible, the name returned will be localized for the default
DISPLAY locale.
For example, if the locale is fr_FR and the default
DISPLAY locale
is en_US, getDisplayLanguage() will return "French"; if the locale is en_US and
the default DISPLAY locale is fr_FR,
getDisplayLanguage() will return "anglais".
If the name returned cannot be localized for the default
DISPLAY locale,
this function falls back on the English name, and uses the ISO code as a last-resort
value.  If the locale doesn't specify a language, this function returns the empty string.

**Returns:** The name of the display language.

## Locale.getDisplayLanguage(Locale)

```java
public String getDisplayLanguage(Locale inLocale)
```

Returns a name for the locale's language that is appropriate for display to the
user.
If possible, the name returned will be localized according to inLocale.
For example, if the locale is fr_FR and inLocale
is en_US, getDisplayLanguage() will return "French"; if the locale is en_US and
inLocale is fr_FR, getDisplayLanguage() will return "anglais".
If the name returned cannot be localized according to inLocale,
this function falls back on the English name, and finally
on the ISO code as a last-resort value.  If the locale doesn't specify a language,
this function returns the empty string.

Parameters:

- `inLocale`: The locale for which to retrieve the display language.

**Returns:** The name of the display language appropriate to the given locale.

Throws:

- `NullPointerException`: if `inLocale` is `null`

## Locale.getDisplayScript()

```java
public String getDisplayScript()
```

Returns a name for the locale's script that is appropriate for display to
the user. If possible, the name will be localized for the default
DISPLAY locale.  Returns
the empty string if this locale doesn't specify a script code.

**Returns:** the display name of the script code for the current default
    DISPLAY locale

**Since:** 1.7

## Locale.getDisplayScript(Locale)

```java
public String getDisplayScript(Locale inLocale)
```

Returns a name for the locale's script that is appropriate
for display to the user. If possible, the name will be
localized for the given locale. Returns the empty string if
this locale doesn't specify a script code.

Parameters:

- `inLocale`: The locale for which to retrieve the display script.

**Returns:** the display name of the script code for the current default
DISPLAY locale

**Since:** 1.7

Throws:

- `NullPointerException`: if `inLocale` is `null`

## Locale.getDisplayCountry()

```java
public final String getDisplayCountry()
```

Returns a name for the locale's country that is appropriate for display to the
user.
If possible, the name returned will be localized for the default
DISPLAY locale.
For example, if the locale is fr_FR and the default
DISPLAY locale
is en_US, getDisplayCountry() will return "France"; if the locale is en_US and
the default DISPLAY locale is fr_FR,
getDisplayCountry() will return "Etats-Unis".
If the name returned cannot be localized for the default
DISPLAY locale,
this function falls back on the English name, and uses the ISO code as a last-resort
value.  If the locale doesn't specify a country, this function returns the empty string.

**Returns:** The name of the country appropriate to the locale.

## Locale.getDisplayCountry(Locale)

```java
public String getDisplayCountry(Locale inLocale)
```

Returns a name for the locale's country that is appropriate for display to the
user.
If possible, the name returned will be localized according to inLocale.
For example, if the locale is fr_FR and inLocale
is en_US, getDisplayCountry() will return "France"; if the locale is en_US and
inLocale is fr_FR, getDisplayCountry() will return "Etats-Unis".
If the name returned cannot be localized according to inLocale,
this function falls back on the English name, and finally
on the ISO code as a last-resort value.  If the locale doesn't specify a country,
this function returns the empty string.

Parameters:

- `inLocale`: The locale for which to retrieve the display country.

**Returns:** The name of the country appropriate to the given locale.

Throws:

- `NullPointerException`: if `inLocale` is `null`

## Locale.getDisplayVariant()

```java
public final String getDisplayVariant()
```

Returns a name for the locale's variant code that is appropriate for display to the
user.  If possible, the name will be localized for the default
DISPLAY locale.  If the locale
doesn't specify a variant code, this function returns the empty string.

**Returns:** The name of the display variant code appropriate to the locale.

## Locale.getDisplayVariant(Locale)

```java
public String getDisplayVariant(Locale inLocale)
```

Returns a name for the locale's variant code that is appropriate for display to the
user.  If possible, the name will be localized for inLocale.  If the locale
doesn't specify a variant code, this function returns the empty string.

Parameters:

- `inLocale`: The locale for which to retrieve the display variant code.

**Returns:** The name of the display variant code appropriate to the given locale.

Throws:

- `NullPointerException`: if `inLocale` is `null`

## Locale.getDisplayName()

```java
public final String getDisplayName()
```

Returns a name for the locale that is appropriate for display to the
user. This will be the values returned by getDisplayLanguage(),
getDisplayScript(), getDisplayCountry(), getDisplayVariant() and
optional Unicode extensions
assembled into a single string. The non-empty values are used in order, with
the second and subsequent names in parentheses.  For example:

language (script, country, variant(, extension)*)

language (country(, extension)*)

language (variant(, extension)*)

script (country(, extension)*)

country (extension)*

depending on which fields are specified in the locale. The field
separator in the above parentheses, denoted as a comma character, may
be localized depending on the locale. If the language, script, country,
and variant fields are all empty, this function returns the empty string.

**Returns:** The name of the locale appropriate to display.

## Locale.getDisplayName(Locale)

```java
public String getDisplayName(Locale inLocale)
```

Returns a name for the locale that is appropriate for display
to the user.  This will be the values returned by
getDisplayLanguage(), getDisplayScript(), getDisplayCountry(),
getDisplayVariant(), and optional Unicode extensions assembled into a single string. The non-empty
values are used in order, with the second and subsequent names in
parentheses.  For example:

language (script, country, variant(, extension)*)

language (country(, extension)*)

language (variant(, extension)*)

script (country(, extension)*)

country (extension)*

depending on which fields are specified in the locale. The field
separator in the above parentheses, denoted as a comma character, may
be localized depending on the locale. If the language, script, country,
and variant fields are all empty, this function returns the empty string.

Parameters:

- `inLocale`: The locale for which to retrieve the display name.

**Returns:** The name of the locale appropriate to display.

Throws:

- `NullPointerException`: if `inLocale` is `null`

## Locale.clone()

```java
public Object clone()
```

Overrides Cloneable.

## Locale.hashCode()

```java
public int hashCode()
```

Override hashCode.
Since Locales are often used in hashtables, caches the value
for speed.

## Locale.equals(Object)

```java
public boolean equals(Object obj)
```

Returns true if this Locale is equal to another object.  A Locale is
deemed equal to another Locale with identical language, script, country,
variant and extensions, and unequal to all other objects.

**Returns:** true if this Locale is equal to the specified object.

## Locale.Builder()

```java
public Builder()
```

Constructs an empty Builder. The default value of all
fields, extensions, and private use information is the
empty string.

## Locale.setLocale(Locale)

```java
public Builder setLocale(Locale locale)
```

Resets the `Builder` to match the provided
`locale`.  Existing state is discarded.

All fields of the locale must be well-formed, see `Locale`.

Locales with any ill-formed fields cause
`IllformedLocaleException` to be thrown, except for the
following three cases which are accepted for compatibility
reasons:

- Locale("ja", "JP", "JP") is treated as "ja-JP-u-ca-japanese"

- Locale("th", "TH", "TH") is treated as "th-TH-u-nu-thai"

- Locale("no", "NO", "NY") is treated as "nn-NO"

Parameters:

- `locale`: the locale

**Returns:** This builder.

Throws:

- `IllformedLocaleException`: if `locale` has any ill-formed fields.
- `NullPointerException`: if `locale` is null.
