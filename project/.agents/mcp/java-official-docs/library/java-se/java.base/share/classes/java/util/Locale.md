# Locale class (java.util)

```java
public final class Locale implements Cloneable, Serializable
```

A {@code Locale} represents a specific geographical, political,
or cultural region. An API that requires a {@code Locale} to perform
its task is <dfn>{@index "locale-sensitive"}</dfn> and uses the {@code Locale}
to tailor information for the user. These <em>locale-sensitive</em> APIs
are principally in the <i>java.text</i> and <i>java.util</i> packages.
For example, displaying a number is a <em>locale-sensitive</em> operation&mdash;
the number should be formatted according to the customs and conventions of the
user's native country, region, or culture.

<p>The {@code Locale} class implements IETF BCP 47 which is composed of
<a href="https://tools.ietf.org/html/rfc4647">RFC 4647 "Matching of Language
Tags"</a> and <a href="https://tools.ietf.org/html/rfc5646">RFC 5646 "Tags
for Identifying Languages"</a> with support for the LDML (UTS#35, "Unicode
Locale Data Markup Language") BCP 47-compatible extensions for locale data
exchange. Each {@code Locale} is associated with locale data which is provided
by the Java runtime environment or any deployed {@link
java.util.spi.LocaleServiceProvider LocaleServiceProvider} implementations.
The locale data provided by the Java runtime environment may vary by release.

<h2 id="loc_comp">Locale Composition</h2>
<p> A {@code Locale} is composed of the bolded fields described below; note that a
{@code Locale} need not have all such fields. For example, {@link
Locale#ENGLISH Locale.ENGLISH} is only comprised of the <em>language</em> field.
In contrast, a {@code Locale} such as the one returned by {@code
Locale.forLanguageTag("en-Latn-US-POSIX-u-nu-latn")} would be comprised of all
the fields below. This particular {@code Locale} would represent English in
the United States using the Latin script and numerics for use in POSIX
environments.
<p>
{@code Locale} implements IETF BCP 47 and any deviations should be observed
by the comments prefixed by <em>"BCP 47 deviation:"</em>.
<a href="https://tools.ietf.org/html/rfc5646">RFC 5646</a>
combines subtags from various ISO (639, 3166, 15924) standards which are also
included in the composition of {@code Locale}.
Additionally, the full list of valid codes for each field can be found in the
<a href="https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry">
IANA Language Subtag Registry</a> (e.g. search for "Type: region").

<dl>
  <dt><a id="def_language"><b>language</b></a></dt>
  <dd> ISO 639 alpha-2/alpha-3 language code or a registered
  language subtag up to 8 alpha letters (for future enhancements).
  When a language has both an alpha-2 code and an alpha-3 code, the
  alpha-2 code must be used.</dd>

  <dd> <em>Case convention:</em> {@code language} is case insensitive, but
  {@code Locale} always canonicalizes to lower case.</dd>

  <dd> <em>Syntax:</em> Well-formed {@code language} values have the form {@code [a-zA-Z]{2,8}}.</dd>
  <dd> <em> BCP 47 deviation:</em> this is not the full BCP 47 language production, since it excludes
  <a href="https://datatracker.ietf.org/doc/html/rfc5646#section-2.2.2">extlang</a>
  (as modern three-letter language codes are preferred).</dd>

  <dd> <em>Example:</em> "en" (English), "ja" (Japanese), "kok" (Konkani)</dd>

  <dt><a id="def_script"><b>script</b></a></dt>

  <dd> ISO 15924 alpha-4 script code.</dd>

  <dd> <em>Case convention:</em> {@code script} is case insensitive, but
  {@code Locale} always canonicalizes to title case (the first
  letter is upper case and the rest of the letters are lower
  case).</dd>

  <dd> <em>Syntax:</em> Well-formed {@code script} values have the form {@code
  [a-zA-Z]{4}}</dd>

  <dd> <em>Example:</em> "Latn" (Latin), "Cyrl" (Cyrillic)</dd>

  <dt><a id="def_region"><b>country (region)</b></a></dt>

  <dd> ISO 3166 alpha-2 country code or UN M.49 numeric-3 area code.</dd>

  <dd> <em>Case convention:</em> {@code country (region)} is case insensitive, but
  {@code Locale} always canonicalizes to upper case.</dd>

  <dd> <em>Syntax:</em> Well-formed {@code country (region)} values have the form {@code
  [a-zA-Z]{2} | [0-9]{3}}</dd>

  <dd> <em>Example:</em> "US" (United States), "FR" (France), "029"
  (Caribbean)</dd>

  <dt><a id="def_variant"><b>variant</b></a></dt>

  <dd> Any arbitrary value used to indicate a variation of a
  {@code Locale}. When multiple variants exist, they should be separated by
  {@code ('_'|'-')}. Variants of higher importance should precede the others.</dd>
  <dd> <em>BCP 47 deviation:</em> BCP 47 subtags are strictly used to indicate
  additional variations that define a language or its dialects that
  are not covered by any combinations of language, script and
  region subtags. However, the variant field in {@code Locale} has
  historically been used for any kind of variation, not just
  language variations.  For example, some supported variants
  available in Java SE Runtime Environments indicate alternative
  cultural behaviors such as calendar type or number script.  In
  BCP 47, this kind of information which does not identify the
  language, is supported by extension subtags or private use
  subtags.</dd>

  <dd> <em>Case convention:</em> {@code variant} is case sensitive. BCP 47
  deviation: BCP 47 treats the variant field as case insensitive.</dd>

  <dd> <em>Syntax:</em> Well-formed {@code variant} values have the form {@code
  SUBTAG (('_'|'-') SUBTAG)*} where {@code SUBTAG =
  [0-9][0-9a-zA-Z]{3} | [0-9a-zA-Z]{5,8}}.</dd>
  <dd> <em>BCP 47 deviation:</em> BCP 47 only
  uses hyphen ('-') as a delimiter, {@code Locale} is more lenient.</dd>

  <dd> <em>Example:</em> "polyton" (Polytonic Greek), "POSIX"</dd>

  <dt><a id="def_extensions"><b>extensions</b></a></dt>

  <dd> A map from single character keys to string values, indicating
  extensions apart from language identification.</dd>
  <dd> <em> BCP 47 deviation:</em> The {@code
  extensions} in {@code Locale} implement the semantics and syntax of BCP 47
  extension subtags <em>and</em> private use subtags. The {@code extensions}
  field cannot have empty values. </dd>

  <dd> <em>Case convention:</em> {@code extensions} are
  case insensitive, but {@code Locale} canonicalizes all
  extension keys and values to lower case.</dd>

  <dd> <em>Syntax:</em> Well-formed keys are single characters from the set
  {@code [0-9a-zA-Z]}.  Well-formed values have the form
  {@code SUBTAG ('-' SUBTAG)*} where for the key 'x'
  {@code SUBTAG = [0-9a-zA-Z]{1,8}} and for other keys
  {@code SUBTAG = [0-9a-zA-Z]{2,8}} (that is, 'x' allows
  single-character subtags).</dd>

  <dd> <em>Example:</em> key="u"/value="ca-japanese" (Japanese Calendar),
  key="x"/value="java-1-7"</dd>
</dl>

<b>BCP 47 deviation:</b> Although BCP 47 requires field values to be registered
in the IANA Language Subtag Registry, the {@code Locale} class
does not validate this requirement. For example, the variant code <em>"foobar"</em>
is well-formed since it is composed of 5 to 8 alphanumerics, but is not defined
the IANA Language Subtag Registry. The {@link Builder}
only checks if an individual field satisfies the syntactic
requirement (is well-formed), but does not validate the value
itself. Conversely, {@link #of(String, String, String) Locale::of} and its
overloads do not make any syntactic checks on the input.

<h3><a id="def_locale_extension">Unicode BCP 47 U Extension</a></h3>

<p>UTS#35, "Unicode Locale Data Markup Language" defines optional
attributes and keywords to override or refine the default behavior
associated with a locale.  A keyword is represented by a pair of
key and type.  For example, "nu-thai" indicates that Thai local
digits (value:"thai") should be used for formatting numbers
(key:"nu").

<p>The keywords are mapped to a BCP 47 extension value using the
extension key 'u' ({@link #UNICODE_LOCALE_EXTENSION}).  The above
example, "nu-thai", becomes the extension "u-nu-thai".

<p>Thus, when a {@code Locale} object contains Unicode locale
attributes and keywords,
{@code getExtension(UNICODE_LOCALE_EXTENSION)} will return a
String representing this information, for example, "nu-thai".  The
{@code Locale} class also provides {@link
#getUnicodeLocaleAttributes}, {@link #getUnicodeLocaleKeys}, and
{@link #getUnicodeLocaleType(String)} which provides access to the Unicode
locale attributes and key/type pairs directly.  When represented as
a string, the Unicode Locale Extension lists attributes
alphabetically, followed by key/type sequences with keys listed
alphabetically (the order of subtags comprising a key's type is
fixed when the type is defined)

<p>A well-formed locale key has the form
{@code [0-9a-zA-Z]{2}}.  A well-formed locale type has the
form {@code "" | [0-9a-zA-Z]{3,8} ('-' [0-9a-zA-Z]{3,8})*} (it
can be empty, or a series of subtags 3-8 alphanums in length).  A
well-formed locale attribute has the form
{@code [0-9a-zA-Z]{3,8}} (it is a single subtag with the same
form as a locale type subtag).

<p>The Unicode locale extension specifies optional behavior in
locale-sensitive services.  Although the LDML specification defines
various keys and values, actual locale-sensitive service
implementations in a Java Runtime Environment might not support any
particular Unicode locale attributes or key/type pairs.

<h2><a id="default_locale">Default Locale</a></h2>

<p>The default Locale is provided for any <em>locale-sensitive</em> methods if no
{@code Locale} is explicitly specified as an argument, such as
{@link NumberFormat#getInstance()}. The default Locale is determined at startup
of the Java runtime and established in the following three phases:
<ol>
<li>The locale-related system properties listed below are established from the
host environment. Some system properties (except for {@code user.language}) may
not have values from the host environment.
<table class="striped">
<caption style="display:none">Shows property keys and associated values</caption>
<thead>
<tr><th scope="col">Locale-related System Properties Key</th>
    <th scope="col">Description</th></tr>
</thead>
<tbody>
<tr><th scope="row">{@systemProperty user.language}</th>
    <td>{@link ##def_language language} for the default Locale,
    such as "en" (English)</td></tr>
<tr><th scope="row">{@systemProperty user.script}</th>
    <td>{@link ##def_script script} for the default Locale,
    such as "Latn" (Latin)</td></tr>
<tr><th scope="row">{@systemProperty user.country}</th>
    <td>{@link ##def_region country} for the default Locale,
    such as "US" (United States)</td></tr>
<tr><th scope="row">{@systemProperty user.variant}</th>
    <td>{@link ##def_variant variant} for the default Locale,
    such as "POSIX"</td></tr>
<tr><th scope="row">{@systemProperty user.extensions}</th>
    <td>{@link ##def_extensions extensions} for the default Locale,
    such as "u-ca-japanese" (Japanese Calendar)</td></tr>
</tbody>
</table>
</li>
<li>The values of these system properties can be overridden by values designated
at startup time. If the overriding value of the {@code user.extensions} property
is unparsable, it is ignored. The overriding values of other properties are not
checked for syntax or validity and are used directly in the default Locale.
(Typically, system property values can be provided using the {@code -D} command-line
option of a launcher. For example, specifying {@code -Duser.extensions=foobarbaz}
results in a default Locale with no extensions, while specifying
{@code -Duser.language=foobarbaz} results in a default Locale whose language is
"foobarbaz".)
</li>
<li>The default {@code Locale} instance is constructed from the values of these
system properties.
</li>
</ol>
<p>Altering the system property values with {@link System#setProperties(Properties)}/
{@link System#setProperty(String, String)} has no effect on the default Locale.
<p>Once the default Locale is established, applications can query the default
Locale with {@link #getDefault()} and change it with {@link #setDefault(Locale)}.
If the default Locale is changed with {@link #setDefault(Locale)}, the corresponding
system properties are not altered. It is not recommended that applications read
these system properties and parse or interpret them as their values may be out of date.

<h3>Locale Category</h3>
<p>There are finer-grained default Locales specific for each {@link Locale.Category}.
These category specific default Locales can be queried by {@link #getDefault(Category)},
and set by {@link #setDefault(Category, Locale)}. Construction of these category
specific default Locales are determined by the corresponding system properties,
which consist of the base system properties as listed above, suffixed by either
{@code ".display"} or {@code ".format"} depending on the category. For example,
the value of the {@code user.language.display} system property will be used in the
{@code language} part of the default Locale for the {@link Locale.Category#DISPLAY}
category. In the absence of category specific system properties, the "category-less"
system properties are used, such as {@code user.language} in the previous example.

<h2><a id="ObtainingLocale">Obtaining a Locale</a></h2>

<p>There are several ways to obtain a {@code Locale} object.
It is advised against using the deprecated {@code Locale} constructors.

<dl>
 <dt><b>Locale Constants</b></dt>
 <dd>A number of convenient constants are provided that return {@code Locale}
 objects for commonly used locales. For example, {@link #US Locale.US} is the
 {@code Locale} object for the United States.</dd>
 <dt><b>Factory Methods</b></dt>
 <dd>{@link #of(String, String, String) Locale::of} and its overloads obtain a
 {@code Locale} object from the given {@code language}, {@code country},
 and/or {@code variant}. {@link #forLanguageTag(String)} obtains a {@code Locale}
 object for a well-formed BCP 47 language tag.</dd>
 <dt><b>Builder</b></dt>
 <dd>{@link Builder} is used to construct a {@code Locale} object that conforms
 to BCP 47 syntax. Use a builder to enforce syntactic restrictions on the input.</dd>
</dl>
<p>The following invocations produce Locale objects that are all equivalent:
{@snippet lang=java :
    Locale.US;
    Locale.of("en", "US");
    Locale.forLanguageTag("en-US");
    new Locale.Builder().setLanguage("en").setRegion("US").build();
}

<h2>Usage Examples</h2>

<p>Once a {@code Locale} is {@linkplain ##ObtainingLocale obtained},
it can be queried for information about itself. For example, use {@link
#getCountry} to get the country (or region) code and {@link #getLanguage} to
get the language. {@link #getDisplayCountry} can be used to get the
name of the country suitable for displaying to the user. Similarly,
use {@link #getDisplayLanguage()} to get the name of
the language suitable for displaying to the user. The {@code getDisplayXXX}
methods are themselves <em>locale-sensitive</em> and have two variants; one with an explicit
locale parameter, and one without. The latter uses the default {@link
Locale.Category#DISPLAY DISPLAY} locale, so the following are equivalent :
{@snippet lang=java :
    Locale.getDefault().getDisplayCountry();
    Locale.getDefault().getDisplayCountry(Locale.getDefault(Locale.Category.DISPLAY));
}

<p>The Java Platform provides a number of classes that perform locale-sensitive
operations. For example, the {@code NumberFormat} class formats
numbers, currency, and percentages in a <em>locale-sensitive</em> manner. Classes such
as {@code NumberFormat} have several factory methods for creating a default object
of that type. These methods generally have two variants; one with an explicit
locale parameter, and one without. The latter uses the default {@link
Locale.Category#FORMAT FORMAT} locale, so the following are equivalent :
{@snippet lang=java :
    NumberFormat.getCurrencyInstance();
    NumberFormat.getCurrencyInstance(Locale.getDefault(Locale.Category.FORMAT));
}

<p>
The following example demonstrates <em>locale-sensitive</em> currency and
date related operations under different locales :
{@snippet lang = java:
    var number = 1000;
    NumberFormat.getCurrencyInstance(Locale.US).format(number); // returns "$1,000.00"
    NumberFormat.getCurrencyInstance(Locale.JAPAN).format(number); // returns "¥1,000""
    var date = LocalDate.of(2024, 1, 1);
    DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG).localizedBy(Locale.US).format(date); // returns "January 1, 2024"
    DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG).localizedBy(Locale.JAPAN).format(date); // returns "2024年1月1日"
}

<h2><a id="LocaleMatching">Locale Matching</a></h2>

<p>If an application is internationalized and provides localized
resources for multiple locales, it sometimes needs to find one or more
locales (or language tags) which meet each user's specific preferences. Note
that the term "<dfn>{@index "language tag"}</dfn>" is used interchangeably
with "locale" in the following locale matching documentation.

<p>In order to match a user's preferred locales to a set of language
tags, <a href="https://tools.ietf.org/html/rfc4647">RFC 4647 Matching of
Language Tags</a> defines two mechanisms: filtering and lookup.
<em>Filtering</em> is used to get all matching locales, whereas
<em>lookup</em> is to select the best matching locale.
Matching is done case-insensitively. These matching mechanisms are described
in the following sections.

<p>A user's preference is called a <em>Language Priority List</em> and is
expressed as a list of language ranges. There are syntactically two types of
language ranges: basic and extended. See
{@link Locale.LanguageRange Locale.LanguageRange} for details.


<h3>Filtering</h3>

<p>The filtering operation returns all matching language tags. It is defined
in RFC 4647 as follows:
"In filtering, each language range represents the least specific language
tag (that is, the language tag with the fewest number of subtags) that is an
acceptable match. All the language tags in the matching set of tags will
have an equal or greater number of subtags than the language range. Every
non-wildcard subtag in the language range will appear in every one of the
matching language tags."

<p>There are two types of filtering: filtering for basic language ranges
(called "basic filtering") and filtering for extended language ranges
(called "extended filtering"). They may return different results by what
kind of language ranges are included in the given Language Priority List.
{@link Locale.FilteringMode} is a parameter to specify how filtering should
be done.

<h3>Lookup</h3>

<p>The lookup operation returns the best matching language tags. It is
defined in RFC 4647 as follows:
"By contrast with filtering, each language range represents the most
specific tag that is an acceptable match.  The first matching tag found,
according to the user's priority, is considered the closest match and is the
item returned."

<p>For example, if a Language Priority List consists of two language ranges,
{@code "zh-Hant-TW"} and {@code "en-US"}, in prioritized order, lookup
method progressively searches the language tags below in order to find the
best matching language tag.
<blockquote>
<pre>
   1. zh-Hant-TW
   2. zh-Hant
   3. zh
   4. en-US
   5. en
</pre>
</blockquote>
If there is a language tag which matches completely to a language range
above, the language tag is returned.

<p>{@code "*"} is the special language range, and it is ignored in lookup.

<p>If multiple language tags match as a result of the subtag {@code '*'}
included in a language range, the first matching language tag returned by
an {@link Iterator} over a {@link Collection} of language tags is treated as
the best matching one.

<h3>Serialization</h3>

<p>During serialization, writeObject writes all fields to the output
stream, including extensions.

<p>During deserialization, readResolve adds extensions as described
in {@linkplain ##special_cases_constructor Special Cases}, only
for the two cases th_TH_TH and ja_JP_JP.

@implNote
<h2>Compatibility</h2>
<p> The following commentary is provided for apps that want to ensure
interoperability with older releases of {@code Locale} provided by the
reference implementation.
<h3><a id="locale_behavior">Locale Behavior</a></h3>
In order to maintain compatibility, Locale's (deprecated) constructors,
{@link #of(String, String, String)}, and its overloads retain their behavior prior to the Java Runtime
Environment version 1.7. That is, a length constraint is not imposed on any of
the input parameters. Similarly, the same preservation of past behavior is largely true
for the {@link #toString()} method.
Apps that previously parsed the output of {@link #toString()} into language,
country, and variant fields can continue to do so (although this is strongly
discouraged). A caveat is that the variant field will have additional
information in it if script or extensions are present.

<p>In addition, BCP 47 imposes syntax restrictions that are not
imposed by Locale's constructors. This means that conversions
between some Locales and BCP 47 language tags cannot be made without
losing information. Thus {@link #toLanguageTag} cannot
represent the state of locales whose language, country, or variant
do not conform to BCP 47.

<p>Because of these issues, it is recommended that apps migrate
away from constructing non-conforming locales and use the
{@link #forLanguageTag(String)} and {@link Locale.Builder} APIs instead.
Apps desiring a string representation of the complete locale can
then always rely on {@link #toLanguageTag} for this purpose.

<h3><a id="special_cases_constructor">Special cases</a></h3>

<p>For compatibility reasons, two
non-conforming locales are treated as special cases.  These are
<b>{@code ja_JP_JP}</b> and <b>{@code th_TH_TH}</b>. These are ill-formed
in BCP 47 since the {@linkplain ##def_variant variants} are too short. To ease migration to BCP 47,
these are treated specially during construction.  These two cases (and only
these) cause a constructor to generate an extension, all other values behave
exactly as they did prior to Java 7.

<p>Java has used {@code ja_JP_JP} to represent Japanese as used in
Japan together with the Japanese Imperial calendar. This is now
representable using a Unicode locale extension, by specifying the
Unicode locale key {@code ca} (for "calendar") and type
{@code japanese}. When the Locale constructor is called with the
arguments "ja", "JP", "JP", the extension "u-ca-japanese" is
automatically added.

<p>Java has used {@code th_TH_TH} to represent Thai as used in
Thailand together with Thai digits. This is also now representable using
a Unicode locale extension, by specifying the Unicode locale key
{@code nu} (for "number") and value {@code thai}. When the Locale
constructor is called with the arguments "th", "TH", "TH", the
extension "u-nu-thai" is automatically added.

<h3><a id="legacy_language_codes">Legacy language codes</a></h3>

<p>Locale's constructors have always converted three language codes to
their earlier, obsoleted forms: {@code he} maps to {@code iw},
{@code yi} maps to {@code ji}, and {@code id} maps to
{@code in}. Since Java SE 17, this is no longer the case. Each
language maps to its new form; {@code iw} maps to {@code he}, {@code ji}
maps to {@code yi}, and {@code in} maps to {@code id}.

<p>For backwards compatible behavior, the system property
{@systemProperty java.locale.useOldISOCodes} reverts the behavior
back to that of before Java SE 17. If the system property is set to
{@code true}, those three current language codes are mapped to their
backward compatible forms. The property is only read at Java runtime
startup and subsequent calls to {@code System.setProperty()} will
have no effect. <b>As of Java SE 25, the use of the
{@code java.locale.useOldISOCodes} system property is deprecated.
This backwards compatible behavior will be removed in a future release
of the JDK.</b>

<p>The APIs added in Java SE 7 map between the old and new language codes,
maintaining the mapped codes internal to Locale (so that
{@code getLanguage} and {@code toString} reflect the mapped
code, which depends on the {@code java.locale.useOldISOCodes} system
property), but using the new codes in the BCP 47 language tag APIs (so
that {@code toLanguageTag} reflects the new one). This
preserves the equivalence between Locales no matter which code or
API is used to construct them. Java's default resource bundle
lookup mechanism also implements this mapping, so that resources
can be named using either convention, see {@link ResourceBundle.Control}.

@spec https://www.rfc-editor.org/info/rfc4647
     RFC 4647: Matching of Language Tags
@spec https://www.rfc-editor.org/info/rfc5646
     RFC 5646: Tags for Identifying Languages
@spec https://unicode.org/reports/tr35/
     Unicode Locale Data Markup Language
@see Builder
@see ResourceBundle
@see java.text.Format
@see java.text.NumberFormat
@see java.text.Collator
@author Mark Davis
@since 1.1

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

@since 1.6

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

@see #getExtension(char)
@see Builder#setExtension(char, String)
@since 1.7

## Locale.UNICODE_LOCALE_EXTENSION

```java
public static final char UNICODE_LOCALE_EXTENSION
```

The key for Unicode locale extension ('u').

@see #getExtension(char)
@see Builder#setExtension(char, String)
@since 1.7

## Locale.Locale(String, String, String)

```java
public Locale(String language, String country, String variant)
```

Construct a locale from language, country and variant.
This constructor normalizes the language value to lowercase and
the country value to uppercase.
@implNote
<ul>
<li>Obsolete ISO 639 codes ("iw", "ji", and "in") are mapped to
their current forms. See {@linkplain ##legacy_language_codes Legacy language
codes} for more information.
<li>For backward compatibility reasons, this constructor does not make
any syntactic checks on the input.
<li>The two cases ("ja", "JP", "JP") and ("th", "TH", "TH") are handled specially,
see {@linkplain ##special_cases_constructor Special Cases} for more information.
</ul>

@deprecated Locale constructors have been deprecated. See {@linkplain ##ObtainingLocale
Obtaining a Locale} for other options.

@param language An ISO 639 alpha-2 or alpha-3 language code, or a language subtag
up to 8 characters in length.  See the {@code Locale} class description about
valid language values.
@param country An ISO 3166 alpha-2 country code or a UN M.49 numeric-3 area code.
See the {@code Locale} class description about valid country values.
@param variant Any arbitrary value used to indicate a variation of a {@code Locale}.
See the {@code Locale} class description for the details.
@throws    NullPointerException thrown if any argument is null.

## Locale.Locale(String, String)

```java
public Locale(String language, String country)
```

Construct a locale from language and country.
This constructor normalizes the language value to lowercase and
the country value to uppercase.
@implNote
<ul>
<li>Obsolete ISO 639 codes ("iw", "ji", and "in") are mapped to
their current forms. See {@linkplain ##legacy_language_codes Legacy language
codes} for more information.
<li>For backward compatibility reasons, this constructor does not make
any syntactic checks on the input.
</ul>

@deprecated Locale constructors have been deprecated. See {@linkplain
##ObtainingLocale Obtaining a Locale} for other options.

@param language An ISO 639 alpha-2 or alpha-3 language code, or a language subtag
up to 8 characters in length.  See the {@code Locale} class description about
valid language values.
@param country An ISO 3166 alpha-2 country code or a UN M.49 numeric-3 area code.
See the {@code Locale} class description about valid country values.
@throws    NullPointerException thrown if either argument is null.

## Locale.Locale(String)

```java
public Locale(String language)
```

Construct a locale from a language code.
This constructor normalizes the language value to lowercase.
@implNote
<ul>
<li>Obsolete ISO 639 codes ("iw", "ji", and "in") are mapped to
their current forms. See {@linkplain ##legacy_language_codes Legacy language
codes} for more information.
<li>For backward compatibility reasons, this constructor does not make
any syntactic checks on the input.
</ul>

@deprecated Locale constructors have been deprecated. See {@linkplain
##ObtainingLocale Obtaining a Locale} for other options.

@param language An ISO 639 alpha-2 or alpha-3 language code, or a language subtag
up to 8 characters in length.  See the {@code Locale} class description about
valid language values.
@throws    NullPointerException thrown if argument is null.
@since 1.4

## Locale.of(String, String, String)

```java
public static Locale of(String language, String country, String variant)
```

Obtains a locale from language, country and variant.
This method normalizes the language value to lowercase and
the country value to uppercase.
@implNote
<ul>
<li>This method does not make any syntactic checks on the input.
Use {@link Locale.Builder} for full syntactic checks with BCP47.
<li>The two cases ("ja", "JP", "JP") and ("th", "TH", "TH") are handled specially,
see {@linkplain ##special_cases_constructor Special Cases} for more information.
<li>Obsolete ISO 639 codes ("iw", "ji", and "in") are mapped to
their current forms. See {@linkplain ##legacy_language_codes Legacy language
codes} for more information.
</ul>

@param language A language code. See the {@code Locale} class description of
{@linkplain ##def_language language} values.
@param country A country code. See the {@code Locale} class description of
{@linkplain ##def_region country} values.
@param variant Any arbitrary value used to indicate a variation of a {@code Locale}.
See the {@code Locale} class description of {@linkplain ##def_variant
variant} values.
@throws    NullPointerException thrown if any argument is null.
@return A {@code Locale} object
@since 19

## Locale.of(String, String)

```java
public static Locale of(String language, String country)
```

Obtains a locale from language and country.
This method normalizes the language value to lowercase and
the country value to uppercase.
@implNote
<ul>
<li>This method does not make any syntactic checks on the input.
Use {@link Locale.Builder} for full syntactic checks with BCP47.
<li>Obsolete ISO 639 codes ("iw", "ji", and "in") are mapped to
their current forms. See {@linkplain ##legacy_language_codes Legacy language
codes} for more information.
</ul>

@param language A language code. See the {@code Locale} class description of
{@linkplain ##def_language language} values.
@param country A country code. See the {@code Locale} class description of
{@linkplain ##def_region country} values.
@throws    NullPointerException thrown if either argument is null.
@return A {@code Locale} object
@since 19

## Locale.of(String)

```java
public static Locale of(String language)
```

Obtains a locale from a language code.
This method normalizes the language value to lowercase.
@implNote
<ul>
<li>This method does not make any syntactic checks on the input.
Use {@link Locale.Builder} for full syntactic checks with BCP47.
<li>Obsolete ISO 639 codes ("iw", "ji", and "in") are mapped to
their current forms. See {@linkplain ##legacy_language_codes Legacy language
codes} for more information.
</ul>

@param language A language code. See the {@code Locale} class description of
{@linkplain ##def_language language} values.
@throws    NullPointerException thrown if argument is null.
@return A {@code Locale} object
@since 19

## Locale.getDefault()

```java
public static Locale getDefault()
```

Gets the current value of the {@link ##default_locale default locale} for
this instance of the Java Virtual Machine.
<p>
The Java Virtual Machine sets the default locale during startup
based on the host environment. It is used by many locale-sensitive
methods if no locale is explicitly specified.
It can be changed using the
{@link #setDefault(Locale)} method.

@return the default locale for this instance of the Java Virtual Machine

## Locale.getDefault(Locale.Category)

```java
public static Locale getDefault(Locale.Category category)
```

Gets the current value of the {@link ##default_locale default locale} for
the specified Category for this instance of the Java Virtual Machine.
<p>
The Java Virtual Machine sets the default locale during startup based
on the host environment. It is used by many locale-sensitive methods
if no locale is explicitly specified. It can be changed using the
{@link #setDefault(Locale.Category, Locale)} method.

@param category the specified category to get the default locale
@throws NullPointerException if category is null
@return the default locale for the specified Category for this instance
    of the Java Virtual Machine
@see #setDefault(Locale.Category, Locale)
@since 1.7

## Locale.setDefault(Locale)

```java
public static synchronized void setDefault(Locale newLocale)
```

Sets the {@link ##default_locale default locale} for
this instance of the Java Virtual Machine. This does not affect the
host locale.
<p>
The Java Virtual Machine sets the default locale during startup
based on the host environment. It is used by many locale-sensitive
methods if no locale is explicitly specified.
<p>
Since changing the default locale may affect many different areas
of functionality, this method should only be used if the caller
is prepared to reinitialize locale-sensitive code running
within the same Java Virtual Machine.
<p>
By setting the default locale with this method, all of the default
locales for each Category are also set to the specified default locale.

@throws NullPointerException if {@code newLocale} is null
@param newLocale the new default locale

## Locale.setDefault(Locale.Category, Locale)

```java
public static synchronized void setDefault(Locale.Category category, Locale newLocale)
```

Sets the {@link ##default_locale default locale} for the specified
Category for this instance of the Java Virtual Machine. This does
not affect the host locale.
<p>
The Java Virtual Machine sets the default locale during startup based
on the host environment. It is used by many locale-sensitive methods
if no locale is explicitly specified.
<p>
Since changing the default locale may affect many different areas of
functionality, this method should only be used if the caller is
prepared to reinitialize locale-sensitive code running within the
same Java Virtual Machine.

@param category the specified category to set the default locale
@param newLocale the new default locale
@throws NullPointerException if category and/or newLocale is null
@see #getDefault(Locale.Category)
@since 1.7

## Locale.getAvailableLocales()

```java
public static Locale[] getAvailableLocales()
```

{@return an array of available locales}

The returned array represents the union of locales supported
by the Java runtime environment and by deployed
{@link java.util.spi.LocaleServiceProvider LocaleServiceProvider}
implementations. At a minimum, the returned array must contain a
{@code Locale} instance equal to {@link #ROOT Locale.ROOT} and
a {@code Locale} instance equal to {@link #US Locale.US}.

## Locale.availableLocales()

```java
public static Stream<Locale> availableLocales()
```

{@return a stream of available locales}

The returned stream represents the union of locales supported
by the Java runtime environment and by deployed
{@link java.util.spi.LocaleServiceProvider LocaleServiceProvider}
implementations. At a minimum, the returned stream must contain a
{@code Locale} instance equal to {@link #ROOT Locale.ROOT} and
a {@code Locale} instance equal to {@link #US Locale.US}.

@implNote Unlike {@code getAvailableLocales()}, this method does
not create a defensive copy of the Locale array.
@since 21

## Locale.getISOCountries()

```java
public static String[] getISOCountries()
```

Returns a list of all 2-letter country codes defined in ISO 3166.
Can be used to obtain Locales.
This method is equivalent to {@link #getISOCountries(Locale.IsoCountryCode type)}
with {@code type}  {@link IsoCountryCode#PART1_ALPHA2}.
<p>
<b>Note:</b> The {@code Locale} class also supports other codes for
country (region), such as 3-letter numeric UN M.49 area codes.
Therefore, the list returned by this method does not contain ALL valid
codes that can be used to obtain Locales.
<p>
Note that this method does not return obsolete 2-letter country codes.
ISO3166-3 codes which designate country codes for those obsolete codes,
can be retrieved from {@link #getISOCountries(Locale.IsoCountryCode type)} with
{@code type}  {@link IsoCountryCode#PART3}.
@return An array of ISO 3166 two-letter country codes.

## Locale.getISOCountries(IsoCountryCode)

```java
public static Set<String> getISOCountries(IsoCountryCode type)
```

{@return an unmodifiable {@code Set} of ISO3166 country codes for the specified type}

@param type {@link Locale.IsoCountryCode} specified ISO code type.
@see java.util.Locale.IsoCountryCode
@throws NullPointerException if type is null
@since 9

## Locale.getISOLanguages()

```java
public static String[] getISOLanguages()
```

Returns a list of all 2-letter language codes defined in ISO 639.
Can be used to obtain Locales.
<p>
<b>Note:</b>
<ul>
<li>ISO 639 is not a stable standard&mdash; some languages' codes have changed.
The list this function returns includes both the new and the old codes for the
languages whose codes have changed.
<li>The {@code Locale} class also supports language codes up to
8 characters in length.  Therefore, the list returned by this method does
not contain ALL valid codes that can be used to obtain Locales.
</ul>

@return An array of ISO 639 two-letter language codes.

## Locale.getLanguage()

```java
public String getLanguage()
```

Returns the language code of this Locale.

@implNote This method returns the new forms for the obsolete ISO 639
codes ("iw", "ji", and "in"). See {@linkplain ##legacy_language_codes
Legacy language codes} for more information.

@return The language code, or the empty string if none is defined.
@see #getDisplayLanguage

## Locale.getScript()

```java
public String getScript()
```

Returns the script for this locale, which should
either be the empty string or an ISO 15924 4-letter script
code. The first letter is uppercase and the rest are
lowercase, for example, 'Latn', 'Cyrl'.

@return The script code, or the empty string if none is defined.
@see #getDisplayScript
@since 1.7

## Locale.getCountry()

```java
public String getCountry()
```

Returns the country/region code for this locale, which should
either be the empty string, an uppercase ISO 3166 2-letter code,
or a UN M.49 3-digit code.

@return The country/region code, or the empty string if none is defined.
@see #getDisplayCountry

## Locale.getVariant()

```java
public String getVariant()
```

Returns the variant code for this locale.

@return The variant code, or the empty string if none is defined.
@see #getDisplayVariant

## Locale.hasExtensions()

```java
public boolean hasExtensions()
```

Returns {@code true} if this {@code Locale} has any {@linkplain ##def_extensions
extensions}.

@return {@code true} if this {@code Locale} has any extensions
@since 1.8

## Locale.stripExtensions()

```java
public Locale stripExtensions()
```

Returns a copy of this {@code Locale} with no {@linkplain ##def_extensions
extensions}. If this {@code Locale} has no extensions, this {@code Locale}
is returned.

@return a copy of this {@code Locale} with no extensions, or {@code this}
        if {@code this} has no extensions
@since 1.8

## Locale.getExtension(char)

```java
public String getExtension(char key)
```

Returns the extension (or private use) value associated with
the specified key, or null if there is no extension
associated with the key. To be well-formed, the key must be one
of {@code [0-9A-Za-z]}. Keys are case-insensitive, so
for example 'z' and 'Z' represent the same extension.

@param key the extension key
@return The extension, or null if this locale defines no
extension for the specified key.
@throws IllegalArgumentException if key is not well-formed
@see #PRIVATE_USE_EXTENSION
@see #UNICODE_LOCALE_EXTENSION
@since 1.7

## Locale.getExtensionKeys()

```java
public Set<Character> getExtensionKeys()
```

Returns the set of extension keys associated with this locale, or the
empty set if it has no extensions. The returned set is unmodifiable.
The keys will all be lower-case.

@return The set of extension keys, or the empty set if this locale has
no extensions.
@since 1.7

## Locale.getUnicodeLocaleAttributes()

```java
public Set<String> getUnicodeLocaleAttributes()
```

Returns the set of unicode locale attributes associated with
this locale, or the empty set if it has no attributes. The
returned set is unmodifiable.

@return The set of attributes.
@since 1.7

## Locale.getUnicodeLocaleType(String)

```java
public String getUnicodeLocaleType(String key)
```

Returns the Unicode locale type associated with the specified Unicode locale key
for this locale. Returns the empty string for keys that are defined with no type.
Returns null if the key is not defined. Keys are case-insensitive. The key must
be two alphanumeric characters ([0-9a-zA-Z]), or an IllegalArgumentException is
thrown.

@param key the Unicode locale key
@return The Unicode locale type associated with the key, or null if the
locale does not define the key.
@throws IllegalArgumentException if the key is not well-formed
@throws NullPointerException if {@code key} is null
@since 1.7

## Locale.getUnicodeLocaleKeys()

```java
public Set<String> getUnicodeLocaleKeys()
```

Returns the set of Unicode locale keys defined by this locale, or the empty set if
this locale has none.  The returned set is immutable.  Keys are all lower case.

@return The set of Unicode locale keys, or the empty set if this locale has
no Unicode locale keywords.
@since 1.7

## Locale.toString()

```java
public final String toString()
```

Returns a string representation of this {@code Locale}
object, consisting of language, country, variant, script,
and extensions as below:
<blockquote>
language + "_" + country + "_" + (variant + "_#" | "#") + script + "_" + extensions
</blockquote>

Language is always lower case, country is always upper case, script is always title
case, and extensions are always lower case.  Extensions and private use subtags
will be in canonical order as explained in {@link #toLanguageTag}.

<p>When the locale has neither script nor extensions, the result is the same as in
Java 6 and prior.

<p>If both the language and country fields are missing, this function will return
the empty string, even if the variant, script, or extensions field is present
(a locale with just a variant is not allowed, the variant must accompany a well-formed
language or country code).

<p>If script or extensions are present and variant is missing, no underscore is
added before the "#".

<p>This behavior is designed to support debugging and to be compatible with
previous uses of {@code toString} that expected language, country, and variant
fields only.  To represent a Locale as a String for interchange purposes, use
{@link #toLanguageTag}.

<p>Examples: <ul>
<li>{@code en}</li>
<li>{@code de_DE}</li>
<li>{@code _GB}</li>
<li>{@code en_US_WIN}</li>
<li>{@code de__POSIX}</li>
<li>{@code zh_CN_#Hans}</li>
<li>{@code zh_TW_#Hant_x-java}</li>
<li>{@code th_TH_TH_#u-nu-thai}</li></ul>

@return A string representation of the Locale, for debugging.
@see #getDisplayName
@see #toLanguageTag

## Locale.toLanguageTag()

```java
public String toLanguageTag()
```

Returns a well-formed IETF BCP 47 language tag representing
this locale.

<p>If this {@code Locale} has a language, country, or
variant that does not satisfy the IETF BCP 47 language tag
syntax requirements, this method handles these fields as
described below:

<p><b>Language:</b> If language is empty, or not
{@linkplain ##def_language well-formed} (for example "a" or
"e2"), it will be emitted as "und" (Undetermined).

<p><b>Country:</b> If country is not {@linkplain ##def_region well-formed}
(for example "12" or "USA"), it will be omitted.

<p><b>Variant:</b> If variant <b>is</b> {@linkplain ##def_variant
well-formed}, each sub-segment
(delimited by '-' or '_') is emitted as a subtag.  Otherwise:
<ul>

<li>if all sub-segments match {@code [0-9a-zA-Z]{1,8}}
(for example "WIN" or "Oracle_JDK_Standard_Edition"), the first
ill-formed sub-segment and all following will be appended to
the private use subtag.  The first appended subtag will be
"lvariant", followed by the sub-segments in order, separated by
hyphen. For example, "x-lvariant-WIN",
"Oracle-x-lvariant-JDK-Standard-Edition".

<li>if any sub-segment does not match
{@code [0-9a-zA-Z]{1,8}}, the variant will be truncated
and the problematic sub-segment and all following sub-segments
will be omitted.  If the remainder is non-empty, it will be
emitted as a private use subtag as above (even if the remainder
turns out to be well-formed).  For example,
"Solaris_isjustthecoolestthing" is emitted as
"x-lvariant-Solaris", not as "solaris".</li></ul>

<p><b>Special Conversions:</b> Java supports some old locale
representations, including deprecated ISO language codes,
for compatibility. This method performs the following
conversions:
<ul>

<li>Deprecated ISO language codes "iw", "ji", and "in" are
converted to "he", "yi", and "id", respectively.

<li>A locale with language "no", country "NO", and variant
"NY", representing Norwegian Nynorsk (Norway), is converted
to a language tag "nn-NO".</li></ul>

<p><b>Note:</b> Although the language tag obtained by this
method is well-formed (satisfies the syntax requirements
defined by the IETF BCP 47 specification), it is not
necessarily a valid BCP 47 language tag.  For example,
{@snippet lang=java :
  Locale.forLanguageTag("xx-YY").toLanguageTag();
}

will return "xx-YY", but the language subtag "xx" and the
region subtag "YY" are invalid because they are not registered
in the IANA Language Subtag Registry.

@return a BCP47 language tag representing the locale
@see #forLanguageTag(String)
@since 1.7

## Locale.caseFoldLanguageTag(String)

```java
public static String caseFoldLanguageTag(String languageTag)
```

{@return a case folded IETF BCP 47 language tag}

<p>This method formats a language tag into one with case convention
that adheres to section 2.1.1. Formatting of Language Tags of RFC5646.
This format is defined as: <i>All subtags, including extension and private
use subtags, use lowercase letters with two exceptions: two-letter
and four-letter subtags that neither appear at the start of the tag
nor occur after singletons. Such two-letter subtags are all
uppercase (as in the tags "en-CA-x-ca" or "sgn-BE-FR") and four-
letter subtags are titlecase (as in the tag "az-Latn-x-latn").</i> As
legacy tags, (defined as "grandfathered" in RFC5646) are not always well-formed, this method
will simply case fold a legacy tag to match the exact case convention
for the particular tag specified in the respective
{@link ##legacy_tags Legacy tags} table.

<p><b>Special Exceptions</b>
<p>To maintain consistency with {@link ##def_variant variant}
which is case-sensitive, this method will neither case fold variant
subtags nor case fold private use subtags prefixed by {@code lvariant}.

<p>For example,
{@snippet lang=java :
String tag = "ja-kana-jp-x-lvariant-Oracle-JDK-Standard-Edition";
Locale.caseFoldLanguageTag(tag); // returns "ja-Kana-JP-x-lvariant-Oracle-JDK-Standard-Edition"
String tag2 = "ja-kana-jp-x-Oracle-JDK-Standard-Edition";
Locale.caseFoldLanguageTag(tag2); // returns "ja-Kana-JP-x-oracle-jdk-standard-edition"
}

<p>Excluding case folding, this method makes no modifications to the tag itself.
Case convention of language tags does not carry meaning, and is simply
recommended as it corresponds with various ISO standards, including:
ISO639-1, ISO15924, and ISO3166-1.

<p>As the formatting of the case convention is dependent on the
positioning of certain subtags, callers of this method should ensure
that the language tag is well-formed, (conforming to section 2.1. Syntax
of RFC5646).

@param languageTag the IETF BCP 47 language tag.
@throws IllformedLocaleException if {@code languageTag} is not well-formed
@throws NullPointerException if {@code languageTag} is {@code null}
@spec https://www.rfc-editor.org/rfc/rfc5646.html#section-2.1
      RFC5646 2.1. Syntax
@spec https://www.rfc-editor.org/rfc/rfc5646#section-2.1.1
      RFC5646 2.1.1. Formatting of Language Tags
@since 21

## Locale.forLanguageTag(String)

```java
public static Locale forLanguageTag(String languageTag)
```

Returns a locale for the specified IETF BCP 47 language tag string.

<p>If the specified language tag contains any ill-formed subtags,
the first such subtag and all following subtags are ignored.  Compare
to {@link Locale.Builder#setLanguageTag(String)} which throws an exception
in this case.

<p>The following <b id="langtag_conversions">conversions</b> are performed:<ul>

<li>The language code "und" is mapped to language "".

<li>The language codes "iw", "ji", and "in" are mapped to "he",
"yi", and "id" respectively. (This is the same canonicalization
that's done in Locale's constructors.) See
{@linkplain ##legacy_language_codes Legacy language codes}
for more information.

<li>The portion of a private use subtag prefixed by "lvariant",
if any, is removed and appended to the variant field in the
result locale (without case normalization).  If it is then
empty, the private use subtag is discarded:

{@snippet lang=java :
    Locale loc;
    loc = Locale.forLanguageTag("en-US-x-lvariant-POSIX");
    loc.getVariant(); // returns "POSIX"
    loc.getExtension('x'); // returns null

    loc = Locale.forLanguageTag("de-POSIX-x-URP-lvariant-Abc-Def");
    loc.getVariant(); // returns "POSIX_Abc_Def"
    loc.getExtension('x'); // returns "urp"
}

<li> BCP 47 language tags permit up to three extlang subtags. However,
the second and third extlang subtags are always ignored. As such,
the first extlang subtag in {@code languageTag} is used as the language,
and the primary language subtag and other extlang subtags are ignored.
Language tags that exceed three extlang subtags are considered
ill-formed starting at the offending extlang subtag.

{@snippet lang=java :
    Locale.forLanguageTag("ar-aao").getLanguage(); // returns "aao"
    Locale.forLanguageTag("en-abc-def-us").toString(); // returns "abc_US"
    Locale.forLanguageTag("zh-yue-gan-cmn-czh-CN").toString();
    // returns "yue"; "czh" exceeds the extlang limit, and subsequent
    // subtags are considered ill-formed
}

<li>Case is normalized except for variant tags, which are left
unchanged.  Language is normalized to lower case, script to
title case, country to upper case, and extensions to lower
case.

<li>If, after processing, the locale would exactly match either
ja_JP_JP or th_TH_TH with no extensions, the appropriate
extensions are added as though the constructor had been called:

{@snippet lang=java :
   Locale.forLanguageTag("ja-JP-x-lvariant-JP").toLanguageTag();
   // returns "ja-JP-u-ca-japanese-x-lvariant-JP"
   Locale.forLanguageTag("th-TH-x-lvariant-TH").toLanguageTag();
   // returns "th-TH-u-nu-thai-x-lvariant-TH"
}</ul>

<p id="legacy_tags">This implements the 'Language-Tag' production of BCP47, and
so supports legacy (regular and irregular, referred to as
"Type: grandfathered" in BCP47) as well as
private use language tags.  Stand alone private use tags are
represented as empty language and extension 'x-whatever',
and legacy tags are converted to their canonical replacements
where they exist.

<p>Legacy tags with canonical replacements are as follows:

<table class="striped">
<caption style="display:none">Legacy tags with canonical replacements</caption>
<thead style="text-align:center">
<tr><th scope="col" style="padding: 0 2px">legacy tag</th><th scope="col" style="padding: 0 2px">modern replacement</th></tr>
</thead>
<tbody style="text-align:center">
<tr><th scope="row">art-lojban</th><td>jbo</td></tr>
<tr><th scope="row">i-ami</th><td>ami</td></tr>
<tr><th scope="row">i-bnn</th><td>bnn</td></tr>
<tr><th scope="row">i-hak</th><td>hak</td></tr>
<tr><th scope="row">i-klingon</th><td>tlh</td></tr>
<tr><th scope="row">i-lux</th><td>lb</td></tr>
<tr><th scope="row">i-navajo</th><td>nv</td></tr>
<tr><th scope="row">i-pwn</th><td>pwn</td></tr>
<tr><th scope="row">i-tao</th><td>tao</td></tr>
<tr><th scope="row">i-tay</th><td>tay</td></tr>
<tr><th scope="row">i-tsu</th><td>tsu</td></tr>
<tr><th scope="row">no-bok</th><td>nb</td></tr>
<tr><th scope="row">no-nyn</th><td>nn</td></tr>
<tr><th scope="row">sgn-BE-FR</th><td>sfb</td></tr>
<tr><th scope="row">sgn-BE-NL</th><td>vgt</td></tr>
<tr><th scope="row">sgn-CH-DE</th><td>sgg</td></tr>
<tr><th scope="row">zh-guoyu</th><td>cmn</td></tr>
<tr><th scope="row">zh-hakka</th><td>hak</td></tr>
<tr><th scope="row">zh-min-nan</th><td>nan</td></tr>
<tr><th scope="row">zh-xiang</th><td>hsn</td></tr>
</tbody>
</table>

<p>Legacy tags with no modern replacement will be
converted as follows:

<table class="striped">
<caption style="display:none">Legacy tags with no modern replacement</caption>
<thead style="text-align:center">
<tr><th scope="col" style="padding: 0 2px">legacy tag</th><th scope="col" style="padding: 0 2px">converts to</th></tr>
</thead>
<tbody style="text-align:center">
<tr><th scope="row">cel-gaulish</th><td>xtg-x-cel-gaulish</td></tr>
<tr><th scope="row">en-GB-oed</th><td>en-GB-x-oed</td></tr>
<tr><th scope="row">i-default</th><td>en-x-i-default</td></tr>
<tr><th scope="row">i-enochian</th><td>und-x-i-enochian</td></tr>
<tr><th scope="row">i-mingo</th><td>see-x-i-mingo</td></tr>
<tr><th scope="row">zh-min</th><td>nan-x-zh-min</td></tr>
</tbody>
</table>

<p>For a list of all legacy tags, see the
IANA Language Subtag Registry (search for "Type: grandfathered").

<p><b>Note</b>: there is no guarantee that {@code toLanguageTag}
and {@code forLanguageTag} will round-trip.

@param languageTag the language tag
@return The locale that best represents the language tag.
@throws NullPointerException if {@code languageTag} is {@code null}
@see #toLanguageTag()
@see java.util.Locale.Builder#setLanguageTag(String)
@since 1.7

## Locale.getISO3Language()

```java
public String getISO3Language() throws MissingResourceException
```

{@return a three-letter abbreviation of this locale's language}

If the language matches an ISO 639-1 two-letter code, the
corresponding ISO 639-2/T three-letter lowercase code is
returned.  The ISO 639-2 language codes can be found on-line,
see "Codes for the Representation of Names of Languages Part 2:
Alpha-3 Code".  If the locale specifies a three-letter
language, the language is returned as is.  If the locale does
not specify a language the empty string is returned.

@throws    MissingResourceException Throws MissingResourceException if
three-letter language abbreviation is not available for this locale.

## Locale.getISO3Country()

```java
public String getISO3Country() throws MissingResourceException
```

{@return a three-letter abbreviation of this locale's country}

If the country matches an ISO 3166-1 alpha-2 code, the
corresponding ISO 3166-1 alpha-3 uppercase code is returned.
If the locale doesn't specify a country, this will be the empty
string.

<p>The ISO 3166-1 codes can be found on-line.

@throws    MissingResourceException Throws MissingResourceException if the
three-letter country abbreviation is not available for this locale.

## Locale.getDisplayLanguage()

```java
public final String getDisplayLanguage()
```

Returns a name for the locale's language that is appropriate for display to the
user.
If possible, the name returned will be localized for the default
{@link Locale.Category#DISPLAY DISPLAY} locale.
For example, if the locale is fr_FR and the default
{@link Locale.Category#DISPLAY DISPLAY} locale
is en_US, getDisplayLanguage() will return "French"; if the locale is en_US and
the default {@link Locale.Category#DISPLAY DISPLAY} locale is fr_FR,
getDisplayLanguage() will return "anglais".
If the name returned cannot be localized for the default
{@link Locale.Category#DISPLAY DISPLAY} locale,
this function falls back on the English name, and uses the ISO code as a last-resort
value.  If the locale doesn't specify a language, this function returns the empty string.

@return The name of the display language.

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

@param inLocale The locale for which to retrieve the display language.
@return The name of the display language appropriate to the given locale.
@throws    NullPointerException if {@code inLocale} is {@code null}

## Locale.getDisplayScript()

```java
public String getDisplayScript()
```

Returns a name for the locale's script that is appropriate for display to
the user. If possible, the name will be localized for the default
{@link Locale.Category#DISPLAY DISPLAY} locale.  Returns
the empty string if this locale doesn't specify a script code.

@return the display name of the script code for the current default
    {@link Locale.Category#DISPLAY DISPLAY} locale
@since 1.7

## Locale.getDisplayScript(Locale)

```java
public String getDisplayScript(Locale inLocale)
```

Returns a name for the locale's script that is appropriate
for display to the user. If possible, the name will be
localized for the given locale. Returns the empty string if
this locale doesn't specify a script code.

@param inLocale The locale for which to retrieve the display script.
@return the display name of the script code for the current default
{@link Locale.Category#DISPLAY DISPLAY} locale
@throws NullPointerException if {@code inLocale} is {@code null}
@since 1.7

## Locale.getDisplayCountry()

```java
public final String getDisplayCountry()
```

Returns a name for the locale's country that is appropriate for display to the
user.
If possible, the name returned will be localized for the default
{@link Locale.Category#DISPLAY DISPLAY} locale.
For example, if the locale is fr_FR and the default
{@link Locale.Category#DISPLAY DISPLAY} locale
is en_US, getDisplayCountry() will return "France"; if the locale is en_US and
the default {@link Locale.Category#DISPLAY DISPLAY} locale is fr_FR,
getDisplayCountry() will return "Etats-Unis".
If the name returned cannot be localized for the default
{@link Locale.Category#DISPLAY DISPLAY} locale,
this function falls back on the English name, and uses the ISO code as a last-resort
value.  If the locale doesn't specify a country, this function returns the empty string.

@return The name of the country appropriate to the locale.

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

@param inLocale The locale for which to retrieve the display country.
@return The name of the country appropriate to the given locale.
@throws    NullPointerException if {@code inLocale} is {@code null}

## Locale.getDisplayVariant()

```java
public final String getDisplayVariant()
```

Returns a name for the locale's variant code that is appropriate for display to the
user.  If possible, the name will be localized for the default
{@link Locale.Category#DISPLAY DISPLAY} locale.  If the locale
doesn't specify a variant code, this function returns the empty string.

@return The name of the display variant code appropriate to the locale.

## Locale.getDisplayVariant(Locale)

```java
public String getDisplayVariant(Locale inLocale)
```

Returns a name for the locale's variant code that is appropriate for display to the
user.  If possible, the name will be localized for inLocale.  If the locale
doesn't specify a variant code, this function returns the empty string.

@param inLocale The locale for which to retrieve the display variant code.
@return The name of the display variant code appropriate to the given locale.
@throws    NullPointerException if {@code inLocale} is {@code null}

## Locale.getDisplayName()

```java
public final String getDisplayName()
```

Returns a name for the locale that is appropriate for display to the
user. This will be the values returned by getDisplayLanguage(),
getDisplayScript(), getDisplayCountry(), getDisplayVariant() and
optional {@linkplain ##def_locale_extension Unicode extensions}
assembled into a single string. The non-empty values are used in order, with
the second and subsequent names in parentheses.  For example:
<blockquote>
language (script, country, variant(, extension)*)<br>
language (country(, extension)*)<br>
language (variant(, extension)*)<br>
script (country(, extension)*)<br>
country (extension)*<br>
</blockquote>
depending on which fields are specified in the locale. The field
separator in the above parentheses, denoted as a comma character, may
be localized depending on the locale. If the language, script, country,
and variant fields are all empty, this function returns the empty string.

@return The name of the locale appropriate to display.

## Locale.getDisplayName(Locale)

```java
public String getDisplayName(Locale inLocale)
```

Returns a name for the locale that is appropriate for display
to the user.  This will be the values returned by
getDisplayLanguage(), getDisplayScript(), getDisplayCountry(),
getDisplayVariant(), and optional {@linkplain ##def_locale_extension
Unicode extensions} assembled into a single string. The non-empty
values are used in order, with the second and subsequent names in
parentheses.  For example:
<blockquote>
language (script, country, variant(, extension)*)<br>
language (country(, extension)*)<br>
language (variant(, extension)*)<br>
script (country(, extension)*)<br>
country (extension)*<br>
</blockquote>
depending on which fields are specified in the locale. The field
separator in the above parentheses, denoted as a comma character, may
be localized depending on the locale. If the language, script, country,
and variant fields are all empty, this function returns the empty string.

@param inLocale The locale for which to retrieve the display name.
@return The name of the locale appropriate to display.
@throws NullPointerException if {@code inLocale} is {@code null}

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

@return true if this Locale is equal to the specified object.

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

Resets the {@code Builder} to match the provided
{@code locale}.  Existing state is discarded.

<p>All fields of the locale must be well-formed, see {@link Locale}.

<p>Locales with any ill-formed fields cause
{@code IllformedLocaleException} to be thrown, except for the
following three cases which are accepted for compatibility
reasons:<ul>
<li>Locale("ja", "JP", "JP") is treated as "ja-JP-u-ca-japanese"
<li>Locale("th", "TH", "TH") is treated as "th-TH-u-nu-thai"
<li>Locale("no", "NO", "NY") is treated as "nn-NO"</ul>

@param locale the locale
@return This builder.
@throws IllformedLocaleException if {@code locale} has
any ill-formed fields.
@throws NullPointerException if {@code locale} is null.

## Locale.setLanguageTag(String)

```java
public Builder setLanguageTag(String languageTag)
```

Resets the Builder to match the provided IETF BCP 47
language tag.  Discards the existing state.  Null and the
empty string cause the builder to be reset, like {@link
#clear}.  Legacy tags (see {@link
Locale#forLanguageTag(String)}) are converted to their canonical
form before being processed.  Otherwise, the language tag
must be well-formed (see {@link Locale}) or an exception is
thrown (unlike {@code Locale.forLanguageTag}, which
just discards ill-formed and following portions of the
tag).

<p>See {@link Locale##langtag_conversions converions} for a full list
of conversions that are performed on {@code languageTag}.

@param languageTag the language tag
@return This builder.
@throws IllformedLocaleException if {@code languageTag} is ill-formed
@see Locale#forLanguageTag(String)

## Locale.setLanguage(String)

```java
public Builder setLanguage(String language)
```

Sets the language.  If {@code language} is the empty string or
null, the language in this {@code Builder} is removed.  Otherwise,
the language must be {@linkplain Locale##def_language well-formed}
or an exception is thrown.

<p>The typical language value is a two or three-letter language
code as defined in ISO639.

@param language the language
@return This builder.
@throws IllformedLocaleException if {@code language} is ill-formed

## Locale.setScript(String)

```java
public Builder setScript(String script)
```

Sets the script. If {@code script} is null or the empty string,
the script in this {@code Builder} is removed.
Otherwise, the script must be {@linkplain Locale##def_script well-formed} or an
exception is thrown.

<p>The typical script value is a four-letter script code as defined by ISO 15924.

@param script the script
@return This builder.
@throws IllformedLocaleException if {@code script} is ill-formed

## Locale.setRegion(String)

```java
public Builder setRegion(String region)
```

Sets the region.  If region is null or the empty string, the region
in this {@code Builder} is removed.  Otherwise,
the region must be {@linkplain Locale##def_region well-formed} or an
exception is thrown.

<p>The typical region value is a two-letter ISO 3166 code or a
three-digit UN M.49 area code.

<p>The country value in the {@code Locale} obtained from a
{@code Builder} is always normalized to upper case.

@param region the region
@return This builder.
@throws IllformedLocaleException if {@code region} is ill-formed

## Locale.setVariant(String)

```java
public Builder setVariant(String variant)
```

Sets the variant.  If variant is null or the empty string, the
variant in this {@code Builder} is removed.  Otherwise, it
must consist of one or more {@linkplain Locale##def_variant well-formed}
subtags, or an exception is thrown.

<p><b>Note:</b> This method checks if {@code variant}
satisfies the IETF BCP 47 variant subtag's syntax requirements,
and normalizes the value to lowercase letters.  However,
the {@code Locale} class does not impose any syntactic
restriction on variant, and the variant value in
{@code Locale} is case sensitive.  To set such a variant,
use {@link #of(String, String, String)}.

@param variant the variant
@return This builder.
@throws IllformedLocaleException if {@code variant} is ill-formed
@see Locale#of(String, String, String)

## Locale.setExtension(char, String)

```java
public Builder setExtension(char key, String value)
```

Sets the extension for the given key. If the value is null or the
empty string, the extension is removed.  Otherwise, the extension
must be {@linkplain Locale##def_extensions well-formed} or an exception
is thrown.

<p><b>Note:</b> The key {@link #UNICODE_LOCALE_EXTENSION
UNICODE_LOCALE_EXTENSION} ('u') is used for the Unicode locale extension.
Setting a value for this key replaces any existing Unicode locale key/type
pairs with those defined in the extension.

<p><b>Note:</b> The key {@link #PRIVATE_USE_EXTENSION
PRIVATE_USE_EXTENSION} ('x') is used for the private use code. To be
well-formed, the value for this key needs only to have subtags of one to
eight alphanumeric characters, not two to eight as in the general case.

@param key the extension key
@param value the extension value
@return This builder.
@throws IllformedLocaleException if {@code key} is illegal
or {@code value} is ill-formed
@see #setUnicodeLocaleKeyword(String, String)

## Locale.setUnicodeLocaleKeyword(String, String)

```java
public Builder setUnicodeLocaleKeyword(String key, String type)
```

Sets the Unicode locale keyword type for the given key.  If the type
is null, the Unicode keyword is removed.  Otherwise, the key must be
non-null and both key and type must be {@linkplain
Locale##def_locale_extension well-formed} or an exception is thrown.

<p>Keys and types are converted to lower case.

<p><b>Note</b>:Setting the 'u' extension via {@link #setExtension(char, String)}
replaces all Unicode locale keywords with those defined in the
extension.

@param key the Unicode locale key
@param type the Unicode locale type
@return This builder.
@throws IllformedLocaleException if {@code key} or {@code type}
is ill-formed
@throws NullPointerException if {@code key} is null
@see #setExtension(char, String)

## Locale.addUnicodeLocaleAttribute(String)

```java
public Builder addUnicodeLocaleAttribute(String attribute)
```

Adds a unicode locale attribute, if not already present, otherwise
has no effect. The attribute must not be null and must be
{@linkplain Locale##def_locale_extension well-formed} or an exception
is thrown.

@param attribute the attribute
@return This builder.
@throws NullPointerException if {@code attribute} is null
@throws IllformedLocaleException if {@code attribute} is ill-formed
@see #setExtension(char, String)

## Locale.removeUnicodeLocaleAttribute(String)

```java
public Builder removeUnicodeLocaleAttribute(String attribute)
```

Removes a unicode locale attribute, if present, otherwise has no
effect.  The attribute must not be null and must be
{@linkplain Locale##def_locale_extension well-formed} or an exception
is thrown.

<p>Attribute comparison for removal is case-insensitive.

@param attribute the attribute
@return This builder.
@throws NullPointerException if {@code attribute} is null
@throws IllformedLocaleException if {@code attribute} is ill-formed
@see #setExtension(char, String)

## Locale.clear()

```java
public Builder clear()
```

Resets the builder to its initial, empty state.

@return This builder.

## Locale.clearExtensions()

```java
public Builder clearExtensions()
```

Resets the extensions to their initial, empty state.
Language, script, region and variant are unchanged.

@return This builder.
@see #setExtension(char, String)

## Locale.build()

```java
public Locale build()
```

Returns an instance of {@code Locale} obtained from the fields set
on this builder.

<p>This applies the conversions listed in {@link #forLanguageTag(String)}
when constructing a Locale. (Legacy tags are handled in
{@link #setLanguageTag(String)}.)

@return A Locale.

## Locale.MAX_WEIGHT

```java
public static final double MAX_WEIGHT
```

A constant holding the maximum value of weight, 1.0, which indicates
that the language range is a good fit for the user.

## Locale.MIN_WEIGHT

```java
public static final double MIN_WEIGHT
```

A constant holding the minimum value of weight, 0.0, which indicates
that the language range is not a good fit for the user.

## Locale.LanguageRange(String)

```java
public LanguageRange(String range)
```

Constructs a {@code LanguageRange} using the given {@code range}.
Note that no validation is done against the IANA Language Subtag
Registry at time of construction.

<p>This is equivalent to {@code LanguageRange(range, MAX_WEIGHT)}.

@param range a language range
@throws NullPointerException if the given {@code range} is
    {@code null}
@throws IllegalArgumentException if the given {@code range} does not
comply with the syntax of the language range mentioned in RFC 4647

## Locale.LanguageRange(String, double)

```java
public LanguageRange(String range, double weight)
```

Constructs a {@code LanguageRange} using the given {@code range} and
{@code weight}. Note that no validation is done against the IANA
Language Subtag Registry at time of construction.

@param range  a language range
@param weight a weight value between {@code MIN_WEIGHT} and
    {@code MAX_WEIGHT}
@throws NullPointerException if the given {@code range} is
    {@code null}
@throws IllegalArgumentException if the given {@code range} does not
comply with the syntax of the language range mentioned in RFC 4647
or if the given {@code weight} is less than {@code MIN_WEIGHT}
or greater than {@code MAX_WEIGHT}

## Locale.getRange()

```java
public String getRange()
```

Returns the language range of this {@code LanguageRange}.

@return the language range.

## Locale.getWeight()

```java
public double getWeight()
```

Returns the weight of this {@code LanguageRange}.

@return the weight value.

## Locale.parse(String)

```java
public static List<LanguageRange> parse(String ranges)
```

Parses the given {@code ranges} to generate a Language Priority List.

<p>This method performs a syntactic check for each language range in
the given {@code ranges} but doesn't do validation using the IANA
Language Subtag Registry.

<p>The {@code ranges} to be given can take one of the following
forms:

<pre>
  "Accept-Language: ja,en;q=0.4"  (weighted list with Accept-Language prefix)
  "ja,en;q=0.4"                   (weighted list)
  "ja,en"                         (prioritized list)
</pre>

In a weighted list, each language range is given a weight value.
The weight value is identical to the "quality value" in
<a href="https://tools.ietf.org/html/rfc2616">RFC 2616</a>, and it
expresses how much the user prefers  the language. A weight value is
specified after a corresponding language range followed by
{@code ";q="}, and the default weight value is {@code MAX_WEIGHT}
when it is omitted.

<p>Unlike a weighted list, language ranges in a prioritized list
are sorted in the descending order based on its priority. The first
language range has the highest priority and meets the user's
preference most.

<p>In either case, language ranges are sorted in descending order in
the Language Priority List based on priority or weight. If a
language range appears in the given {@code ranges} more than once,
only the first one is included on the Language Priority List.

<p>The returned list consists of language ranges from the given
{@code ranges} and their equivalents found in the IANA Language
Subtag Registry. For example, if the given {@code ranges} is
{@code "Accept-Language: iw,en-us;q=0.7,en;q=0.3"}, the elements in
the list to be returned are:

<pre>
 <b>Range</b>                                   <b>Weight</b>
   "iw" (older tag for Hebrew)             1.0
   "he" (new preferred code for Hebrew)    1.0
   "en-us" (English, United States)        0.7
   "en" (English)                          0.3
</pre>

Two language ranges, {@code "iw"} and {@code "he"}, have the same
highest priority in the list. By adding {@code "he"} to the user's
Language Priority List, locale-matching method can find Hebrew as a
matching locale (or language tag) even if the application or system
offers only {@code "he"} as a supported locale (or language tag).

@param ranges a list of comma-separated language ranges or a list of
    language ranges in the form of the "Accept-Language" header
    defined in <a href="https://tools.ietf.org/html/rfc2616">RFC
    2616</a>
@return a Language Priority List consisting of language ranges
    included in the given {@code ranges} and their equivalent
    language ranges if available. The list is modifiable.
@throws NullPointerException if {@code ranges} is null
@throws IllegalArgumentException if a language range or a weight
    found in the given {@code ranges} is ill-formed
@spec https://www.rfc-editor.org/info/rfc2616 RFC 2616: Hypertext Transfer Protocol -- HTTP/1.1

## Locale.parse(String, Map<String, List<String>>)

```java
public static List<LanguageRange> parse(String ranges, Map<String, List<String>> map)
```

Parses the given {@code ranges} to generate a Language Priority
List, and then customizes the list using the given {@code map}.
This method is equivalent to
{@code mapEquivalents(parse(ranges), map)}.

@param ranges a list of comma-separated language ranges or a list
    of language ranges in the form of the "Accept-Language" header
    defined in <a href="https://tools.ietf.org/html/rfc2616">RFC
    2616</a>
@param map a map containing information to customize language ranges
@return a Language Priority List with customization. The list is
    modifiable.
@throws NullPointerException if {@code ranges} is null
@throws IllegalArgumentException if a language range or a weight
    found in the given {@code ranges} is ill-formed
@spec https://www.rfc-editor.org/info/rfc2616 RFC 2616: Hypertext Transfer Protocol -- HTTP/1.1
@see #parse(String)
@see #mapEquivalents(List, Map)

## Locale.mapEquivalents(List<LanguageRange>priorityList, Map<String, List<String>>)

```java
public static List<LanguageRange> mapEquivalents( List<LanguageRange>priorityList, Map<String, List<String>> map)
```

Generates a new customized Language Priority List using the given
{@code priorityList} and {@code map}. If the given {@code map} is
empty, this method returns a copy of the given {@code priorityList}.

<p>In the map, a key represents a language range whereas a value is
a list of equivalents of it. {@code '*'} cannot be used in the map.
Each equivalent language range has the same weight value as its
original language range.

<pre>
 An example of map:
   <b>Key</b>                            <b>Value</b>
     "zh" (Chinese)                 "zh",
                                    "zh-Hans"(Simplified Chinese)
     "zh-HK" (Chinese, Hong Kong)   "zh-HK"
     "zh-TW" (Chinese, Taiwan)      "zh-TW"
</pre>

The customization is performed after modification using the IANA
Language Subtag Registry.

<p>For example, if a user's Language Priority List consists of five
language ranges ({@code "zh"}, {@code "zh-CN"}, {@code "en"},
{@code "zh-TW"}, and {@code "zh-HK"}), the newly generated Language
Priority List which is customized using the above map example will
consists of {@code "zh"}, {@code "zh-Hans"}, {@code "zh-CN"},
{@code "zh-Hans-CN"}, {@code "en"}, {@code "zh-TW"}, and
{@code "zh-HK"}.

<p>{@code "zh-HK"} and {@code "zh-TW"} aren't converted to
{@code "zh-Hans-HK"} nor {@code "zh-Hans-TW"} even if they are
included in the Language Priority List. In this example, mapping
is used to clearly distinguish Simplified Chinese and Traditional
Chinese.

<p>If the {@code "zh"}-to-{@code "zh"} mapping isn't included in the
map, a simple replacement will be performed and the customized list
won't include {@code "zh"} and {@code "zh-CN"}.

@param priorityList user's Language Priority List
@param map a map containing information to customize language ranges
@return a new Language Priority List with customization. The list is
    modifiable.
@throws NullPointerException if {@code priorityList} is {@code null}
@see #parse(String, Map)

## Locale.hashCode()

```java
public int hashCode()
```

{@return a hash code value for this object}

## Locale.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object to the specified object. The result is true if
and only if the argument is not {@code null} and is a
{@code LanguageRange} object that contains the same {@code range}
and {@code weight} values as this object.

@param obj the object to compare with
@return  {@code true} if this object's {@code range} and
    {@code weight} are the same as the {@code obj}'s; {@code false}
    otherwise.

## Locale.toString()

```java
public String toString()
```

Returns an informative string representation of this {@code LanguageRange}
object, consisting of language range and weight if the range is
weighted and the weight is less than the max weight.

@return a string representation of this {@code LanguageRange} object.

## Locale.filter(List<LanguageRange>, Collection<Locale>, FilteringMode)

```java
public static List<Locale> filter(List<LanguageRange> priorityList, Collection<Locale> locales, FilteringMode mode)
```

Returns a list of matching {@code Locale} instances using the filtering
mechanism defined in RFC 4647.

This filter operation on the given {@code locales} ensures that only
unique matching locale(s) are returned.

@param priorityList user's Language Priority List in which each language
    tag is sorted in descending order based on priority or weight
@param locales {@code Locale} instances used for matching
@param mode filtering mode
@return a list of {@code Locale} instances for matching language tags
    sorted in descending order based on priority or weight, or an empty
    list if nothing matches. The list is modifiable.
@throws NullPointerException if {@code priorityList} or {@code locales}
    is {@code null}
@throws IllegalArgumentException if one or more extended language ranges
    are included in the given list when
    {@link FilteringMode#REJECT_EXTENDED_RANGES} is specified

@since 1.8

## Locale.filter(List<LanguageRange>, Collection<Locale>)

```java
public static List<Locale> filter(List<LanguageRange> priorityList, Collection<Locale> locales)
```

Returns a list of matching {@code Locale} instances using the filtering
mechanism defined in RFC 4647. This is equivalent to
{@link #filter(List, Collection, FilteringMode)} when {@code mode} is
{@link FilteringMode#AUTOSELECT_FILTERING}.

This filter operation on the given {@code locales} ensures that only
unique matching locale(s) are returned.

@param priorityList user's Language Priority List in which each language
    tag is sorted in descending order based on priority or weight
@param locales {@code Locale} instances used for matching
@return a list of {@code Locale} instances for matching language tags
    sorted in descending order based on priority or weight, or an empty
    list if nothing matches. The list is modifiable.
@throws NullPointerException if {@code priorityList} or {@code locales}
    is {@code null}

@since 1.8

## Locale.filterTags(List<LanguageRange>, Collection<String>, FilteringMode)

```java
public static List<String> filterTags(List<LanguageRange> priorityList, Collection<String> tags, FilteringMode mode)
```

Returns a list of matching languages tags using the basic filtering
mechanism defined in RFC 4647.

This filter operation on the given {@code tags} ensures that only
unique matching tag(s) are returned with preserved case. In case of
duplicate matching tags with the case difference, the first matching
tag with preserved case is returned.
For example, "de-ch" is returned out of the duplicate matching tags
"de-ch" and "de-CH", if "de-ch" is checked first for matching in the
given {@code tags}. Note that if the given {@code tags} is an unordered
{@code Collection}, the returned matching tag out of duplicate tags is
subject to change, depending on the implementation of the
{@code Collection}.

@param priorityList user's Language Priority List in which each language
    tag is sorted in descending order based on priority or weight
@param tags language tags
@param mode filtering mode
@return a list of matching language tags sorted in descending order
    based on priority or weight, or an empty list if nothing matches.
    The list is modifiable.
@throws NullPointerException if {@code priorityList} or {@code tags} is
    {@code null}
@throws IllegalArgumentException if one or more extended language ranges
    are included in the given list when
    {@link FilteringMode#REJECT_EXTENDED_RANGES} is specified

@since 1.8

## Locale.filterTags(List<LanguageRange>, Collection<String>)

```java
public static List<String> filterTags(List<LanguageRange> priorityList, Collection<String> tags)
```

Returns a list of matching languages tags using the basic filtering
mechanism defined in RFC 4647. This is equivalent to
{@link #filterTags(List, Collection, FilteringMode)} when {@code mode}
is {@link FilteringMode#AUTOSELECT_FILTERING}.

This filter operation on the given {@code tags} ensures that only
unique matching tag(s) are returned with preserved case. In case of
duplicate matching tags with the case difference, the first matching
tag with preserved case is returned.
For example, "de-ch" is returned out of the duplicate matching tags
"de-ch" and "de-CH", if "de-ch" is checked first for matching in the
given {@code tags}. Note that if the given {@code tags} is an unordered
{@code Collection}, the returned matching tag out of duplicate tags is
subject to change, depending on the implementation of the
{@code Collection}.

@param priorityList user's Language Priority List in which each language
    tag is sorted in descending order based on priority or weight
@param tags language tags
@return a list of matching language tags sorted in descending order
    based on priority or weight, or an empty list if nothing matches.
    The list is modifiable.
@throws NullPointerException if {@code priorityList} or {@code tags} is
    {@code null}

@since 1.8

## Locale.lookup(List<LanguageRange>, Collection<Locale>)

```java
public static Locale lookup(List<LanguageRange> priorityList, Collection<Locale> locales)
```

Returns a {@code Locale} instance for the best-matching language
tag using the lookup mechanism defined in RFC 4647.

@param priorityList user's Language Priority List in which each language
    tag is sorted in descending order based on priority or weight
@param locales {@code Locale} instances used for matching
@return the best matching {@code Locale} instance chosen based on
    priority or weight, or {@code null} if nothing matches.
@throws NullPointerException if {@code priorityList} or {@code locales} is
    {@code null}

@since 1.8

## Locale.lookupTag(List<LanguageRange>, Collection<String>)

```java
public static String lookupTag(List<LanguageRange> priorityList, Collection<String> tags)
```

Returns the best-matching language tag using the lookup mechanism
defined in RFC 4647.

This lookup operation on the given {@code tags} ensures that the
first matching tag with preserved case is returned.

@param priorityList user's Language Priority List in which each language
    tag is sorted in descending order based on priority or weight
@param tags language tags used for matching
@return the best matching language tag chosen based on priority or
    weight, or {@code null} if nothing matches.
@throws NullPointerException if {@code priorityList} or {@code tags} is
    {@code null}

@since 1.8