---
title: "Locale class (java.util) (part 1 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Locale.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Locale class (java.util)

```java
public final class Locale implements Cloneable, Serializable
```

A `Locale` represents a specific geographical, political,
or cultural region. An API that requires a `Locale` to perform
its task is  and uses the `Locale`
to tailor information for the user. These *locale-sensitive* APIs
are principally in the *java.text* and *java.util* packages.
For example, displaying a number is a *locale-sensitive* operation—
the number should be formatted according to the customs and conventions of the
user's native country, region, or culture.

The `Locale` class implements IETF BCP 47 which is composed of
RFC 4647 "Matching of Language
Tags" and RFC 5646 "Tags
for Identifying Languages" with support for the LDML (UTS#35, "Unicode
Locale Data Markup Language") BCP 47-compatible extensions for locale data
exchange. Each `Locale` is associated with locale data which is provided
by the Java runtime environment or any deployed LocaleServiceProvider implementations.
The locale data provided by the Java runtime environment may vary by release.

#### Locale Composition

 A `Locale` is composed of the bolded fields described below; note that a
`Locale` need not have all such fields. For example, Locale.ENGLISH is only comprised of the *language* field.
In contrast, a `Locale` such as the one returned by `Locale.forLanguageTag("en-Latn-US-POSIX-u-nu-latn")` would be comprised of all
the fields below. This particular `Locale` would represent English in
the United States using the Latin script and numerics for use in POSIX
environments.

`Locale` implements IETF BCP 47 and any deviations should be observed
by the comments prefixed by *"BCP 47 deviation:"*.
RFC 5646
combines subtags from various ISO (639, 3166, 15924) standards which are also
included in the composition of `Locale`.
Additionally, the full list of valid codes for each field can be found in the

IANA Language Subtag Registry (e.g. search for "Type: region").

  **language**
   ISO 639 alpha-2/alpha-3 language code or a registered
  language subtag up to 8 alpha letters (for future enhancements).
  When a language has both an alpha-2 code and an alpha-3 code, the
  alpha-2 code must be used.

   *Case convention:* `language` is case insensitive, but
  `Locale` always canonicalizes to lower case.

   *Syntax:* Well-formed `language` values have the form `[a-zA-Z]{2,8}`.
   * BCP 47 deviation:* this is not the full BCP 47 language production, since it excludes
  extlang
  (as modern three-letter language codes are preferred).

   *Example:* "en" (English), "ja" (Japanese), "kok" (Konkani)

  **script**

   ISO 15924 alpha-4 script code.

   *Case convention:* `script` is case insensitive, but
  `Locale` always canonicalizes to title case (the first
  letter is upper case and the rest of the letters are lower
  case).

   *Syntax:* Well-formed `script` values have the form `[a-zA-Z]{4}`

   *Example:* "Latn" (Latin), "Cyrl" (Cyrillic)

  **country (region)**

   ISO 3166 alpha-2 country code or UN M.49 numeric-3 area code.

   *Case convention:* `country (region)` is case insensitive, but
  `Locale` always canonicalizes to upper case.

   *Syntax:* Well-formed `country (region)` values have the form `[a-zA-Z]{2} | [0-9]{3}`

   *Example:* "US" (United States), "FR" (France), "029"
  (Caribbean)

  **variant**

   Any arbitrary value used to indicate a variation of a
  `Locale`. When multiple variants exist, they should be separated by
  `('_'|'-')`. Variants of higher importance should precede the others.
   *BCP 47 deviation:* BCP 47 subtags are strictly used to indicate
  additional variations that define a language or its dialects that
  are not covered by any combinations of language, script and
  region subtags. However, the variant field in `Locale` has
  historically been used for any kind of variation, not just
  language variations.  For example, some supported variants
  available in Java SE Runtime Environments indicate alternative
  cultural behaviors such as calendar type or number script.  In
  BCP 47, this kind of information which does not identify the
  language, is supported by extension subtags or private use
  subtags.

   *Case convention:* `variant` is case sensitive. BCP 47
  deviation: BCP 47 treats the variant field as case insensitive.

   *Syntax:* Well-formed `variant` values have the form `SUBTAG (('_'|'-') SUBTAG)*` where `SUBTAG = 0-9{3} | [0-9a-zA-Z]{5,8}`.
   *BCP 47 deviation:* BCP 47 only
  uses hyphen ('-') as a delimiter, `Locale` is more lenient.

   *Example:* "polyton" (Polytonic Greek), "POSIX"

  **extensions**

   A map from single character keys to string values, indicating
  extensions apart from language identification.
   * BCP 47 deviation:* The `extensions` in `Locale` implement the semantics and syntax of BCP 47
  extension subtags *and* private use subtags. The `extensions`
  field cannot have empty values.

   *Case convention:* `extensions` are
  case insensitive, but `Locale` canonicalizes all
  extension keys and values to lower case.

   *Syntax:* Well-formed keys are single characters from the set
  `[0-9a-zA-Z]`.  Well-formed values have the form
  `SUBTAG ('-' SUBTAG)*` where for the key 'x'
  `SUBTAG = [0-9a-zA-Z]{1,8}` and for other keys
  `SUBTAG = [0-9a-zA-Z]{2,8}` (that is, 'x' allows
  single-character subtags).

   *Example:* key="u"/value="ca-japanese" (Japanese Calendar),
  key="x"/value="java-1-7"

**BCP 47 deviation:** Although BCP 47 requires field values to be registered
in the IANA Language Subtag Registry, the `Locale` class
does not validate this requirement. For example, the variant code *"foobar"*
is well-formed since it is composed of 5 to 8 alphanumerics, but is not defined
the IANA Language Subtag Registry. The `Builder`
only checks if an individual field satisfies the syntactic
requirement (is well-formed), but does not validate the value
itself. Conversely, String, String) Locale::of and its
overloads do not make any syntactic checks on the input.

#### Unicode BCP 47 U Extension

UTS#35, "Unicode Locale Data Markup Language" defines optional
attributes and keywords to override or refine the default behavior
associated with a locale.  A keyword is represented by a pair of
key and type.  For example, "nu-thai" indicates that Thai local
digits (value:"thai") should be used for formatting numbers
(key:"nu").

The keywords are mapped to a BCP 47 extension value using the
extension key 'u' (`UNICODE_LOCALE_EXTENSION`).  The above
example, "nu-thai", becomes the extension "u-nu-thai".

Thus, when a `Locale` object contains Unicode locale
attributes and keywords,
`getExtension(UNICODE_LOCALE_EXTENSION)` will return a
String representing this information, for example, "nu-thai".  The
`Locale` class also provides `getUnicodeLocaleAttributes`, `getUnicodeLocaleKeys`, and
`getUnicodeLocaleType(String)` which provides access to the Unicode
locale attributes and key/type pairs directly.  When represented as
a string, the Unicode Locale Extension lists attributes
alphabetically, followed by key/type sequences with keys listed
alphabetically (the order of subtags comprising a key's type is
fixed when the type is defined)

A well-formed locale key has the form
`[0-9a-zA-Z]{2}`.  A well-formed locale type has the
form `"" | [0-9a-zA-Z]{3,8} ('-' [0-9a-zA-Z]{3,8})*` (it
can be empty, or a series of subtags 3-8 alphanums in length).  A
well-formed locale attribute has the form
`[0-9a-zA-Z]{3,8}` (it is a single subtag with the same
form as a locale type subtag).

The Unicode locale extension specifies optional behavior in
locale-sensitive services.  Although the LDML specification defines
various keys and values, actual locale-sensitive service
implementations in a Java Runtime Environment might not support any
particular Unicode locale attributes or key/type pairs.

#### Default Locale

The default Locale is provided for any *locale-sensitive* methods if no
`Locale` is explicitly specified as an argument, such as
`NumberFormat.getInstance()`. The default Locale is determined at startup
of the Java runtime and established in the following three phases:

- The locale-related system properties listed below are established from the
host environment. Some system properties (except for `user.language`) may
not have values from the host environment.

Shows property keys and associated values

Locale-related System Properties Key
    Description

`user.language`
    language for the default Locale,
    such as "en" (English)
`user.script`
    script for the default Locale,
    such as "Latn" (Latin)
`user.country`
    country for the default Locale,
    such as "US" (United States)
`user.variant`
    variant for the default Locale,
    such as "POSIX"
`user.extensions`
    extensions for the default Locale,
    such as "u-ca-japanese" (Japanese Calendar)

- The values of these system properties can be overridden by values designated
at startup time. If the overriding value of the `user.extensions` property
is unparsable, it is ignored. The overriding values of other properties are not
checked for syntax or validity and are used directly in the default Locale.
(Typically, system property values can be provided using the `-D` command-line
option of a launcher. For example, specifying `-Duser.extensions=foobarbaz`
results in a default Locale with no extensions, while specifying
`-Duser.language=foobarbaz` results in a default Locale whose language is
"foobarbaz".)

- The default `Locale` instance is constructed from the values of these
system properties.

Altering the system property values with `System.setProperties(Properties)`/
String) has no effect on the default Locale.

Once the default Locale is established, applications can query the default
Locale with `getDefault()` and change it with `setDefault(Locale)`.
If the default Locale is changed with `setDefault(Locale)`, the corresponding
system properties are not altered. It is not recommended that applications read
these system properties and parse or interpret them as their values may be out of date.

#### Locale Category

There are finer-grained default Locales specific for each `Locale.Category`.
These category specific default Locales can be queried by `getDefault(Category)`,
and set by Locale). Construction of these category
specific default Locales are determined by the corresponding system properties,
which consist of the base system properties as listed above, suffixed by either
`".display"` or `".format"` depending on the category. For example,
the value of the `user.language.display` system property will be used in the
`language` part of the default Locale for the `Locale.Category.DISPLAY`
category. In the absence of category specific system properties, the "category-less"
system properties are used, such as `user.language` in the previous example.

#### Obtaining a Locale

There are several ways to obtain a `Locale` object.
It is advised against using the deprecated `Locale` constructors.

 **Locale Constants**
 A number of convenient constants are provided that return `Locale`
 objects for commonly used locales. For example, Locale.US is the
 `Locale` object for the United States.
 **Factory Methods**
 String, String) Locale::of and its overloads obtain a
 `Locale` object from the given `language`, `country`,
 and/or `variant`. `forLanguageTag(String)` obtains a `Locale`
 object for a well-formed BCP 47 language tag.
 **Builder**
 `Builder` is used to construct a `Locale` object that conforms
 to BCP 47 syntax. Use a builder to enforce syntactic restrictions on the input.

The following invocations produce Locale objects that are all equivalent:

#### Usage Examples

Once a `Locale` is obtained,
it can be queried for information about itself. For example, use `getCountry` to get the country (or region) code and `getLanguage` to
get the language. `getDisplayCountry` can be used to get the
name of the country suitable for displaying to the user. Similarly,
use `getDisplayLanguage()` to get the name of
the language suitable for displaying to the user. The `getDisplayXXX`
methods are themselves *locale-sensitive* and have two variants; one with an explicit
locale parameter, and one without. The latter uses the default DISPLAY locale, so the following are equivalent :

The Java Platform provides a number of classes that perform locale-sensitive
operations. For example, the `NumberFormat` class formats
numbers, currency, and percentages in a *locale-sensitive* manner. Classes such
as `NumberFormat` have several factory methods for creating a default object
of that type. These methods generally have two variants; one with an explicit
locale parameter, and one without. The latter uses the default FORMAT locale, so the following are equivalent :

The following example demonstrates *locale-sensitive* currency and
date related operations under different locales :

#### Locale Matching

If an application is internationalized and provides localized
resources for multiple locales, it sometimes needs to find one or more
locales (or language tags) which meet each user's specific preferences. Note
that the term "" is used interchangeably
with "locale" in the following locale matching documentation.

In order to match a user's preferred locales to a set of language
tags, RFC 4647 Matching of
Language Tags defines two mechanisms: filtering and lookup.
*Filtering* is used to get all matching locales, whereas
*lookup* is to select the best matching locale.
Matching is done case-insensitively. These matching mechanisms are described
in the following sections.

A user's preference is called a *Language Priority List* and is
expressed as a list of language ranges. There are syntactically two types of
language ranges: basic and extended. See
Locale.LanguageRange for details.

#### Filtering

The filtering operation returns all matching language tags. It is defined
in RFC 4647 as follows:
"In filtering, each language range represents the least specific language
tag (that is, the language tag with the fewest number of subtags) that is an
acceptable match. All the language tags in the matching set of tags will
have an equal or greater number of subtags than the language range. Every
non-wildcard subtag in the language range will appear in every one of the
matching language tags."

There are two types of filtering: filtering for basic <example-value> ranges
(called "basic <example-value>") and filtering for extended language ranges
(called "extended filtering"). They may return different results by what
kind of language ranges are included in the given Language Priority List.
`Locale.FilteringMode` is a parameter to specify how filtering should
be done.

#### Lookup
