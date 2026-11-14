---
title: "Locale class (java.util) (part 5 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Locale.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Locale class (java.util) (part 5 of 6)

## Locale.setLanguageTag(String)

```java
public Builder setLanguageTag(String languageTag)
```

Resets the Builder to match the provided IETF BCP 47
language tag.  Discards the existing state.  Null and the
empty string cause the builder to be reset, like `clear`.  Legacy tags (see `Locale.forLanguageTag(String)`) are converted to their canonical
form before being processed.  Otherwise, the language tag
must be well-formed (see `Locale`) or an exception is
thrown (unlike `Locale.forLanguageTag`, which
just discards ill-formed and following portions of the
tag).

See converions for a full list
of conversions that are performed on `languageTag`.

Parameters:

- `languageTag`: the language tag

**Returns:** This builder.

**See also:** Locale#forLanguageTag(String)

Throws:

- `IllformedLocaleException`: if `languageTag` is ill-formed

## Locale.setLanguage(String)

```java
public Builder setLanguage(String language)
```

Sets the language.  If `language` is the empty string or
null, the language in this `Builder` is removed.  Otherwise,
the language must be well-formed
or an exception is thrown.

The typical language value is a two or three-letter language
code as defined in ISO639.

Parameters:

- `language`: the language

**Returns:** This builder.

Throws:

- `IllformedLocaleException`: if `language` is ill-formed

## Locale.setScript(String)

```java
public Builder setScript(String script)
```

Sets the script. If `script` is null or the empty string,
the script in this `Builder` is removed.
Otherwise, the script must be well-formed or an
exception is thrown.

The typical script value is a four-letter script code as defined by ISO 15924.

Parameters:

- `script`: the script

**Returns:** This builder.

Throws:

- `IllformedLocaleException`: if `script` is ill-formed

## Locale.setRegion(String)

```java
public Builder setRegion(String region)
```

Sets the region.  If region is null or the empty string, the region
in this `Builder` is removed.  Otherwise,
the region must be well-formed or an
exception is thrown.

The typical region value is a two-letter ISO 3166 code or a
three-digit UN M.49 area code.

The country value in the `Locale` obtained from a
`Builder` is always normalized to upper case.

Parameters:

- `region`: the region

**Returns:** This builder.

Throws:

- `IllformedLocaleException`: if `region` is ill-formed

## Locale.setVariant(String)

```java
public Builder setVariant(String variant)
```

Sets the variant.  If variant is null or the empty string, the
variant in this `Builder` is removed.  Otherwise, it
must consist of one or more well-formed
subtags, or an exception is thrown.

**Note:** This method checks if `variant`
satisfies the IETF BCP 47 variant subtag's syntax requirements,
and normalizes the value to lowercase letters.  However,
the `Locale` class does not impose any syntactic
restriction on variant, and the variant value in
`Locale` is case sensitive.  To set such a variant,
use String, String).

Parameters:

- `variant`: the variant

**Returns:** This builder.

**See also:** Locale#of(String, String, String)

Throws:

- `IllformedLocaleException`: if `variant` is ill-formed

## Locale.setExtension(char, String)

```java
public Builder setExtension(char key, String value)
```

Sets the extension for the given key. If the value is null or the
empty string, the extension is removed.  Otherwise, the extension
must be well-formed or an exception
is thrown.

**Note:** The key <example-value> ('u') is used for the Unicode locale extension.
Setting a value for this key <example-value> any existing Unicode locale key/type
pairs with those defined in the extension.

**Note:** The key <example-value> ('x') is used for the private use code. To be
well-formed, the value for this key needs only to have subtags of one to
eight alphanumeric characters, not two to eight as in the general case.

Parameters:

- `key`: the extension key
- `value`: the extension value

**Returns:** This builder.

**See also:** #setUnicodeLocaleKeyword(String, String)

Throws:

- `IllformedLocaleException`: if `key` is illegal or `value` is ill-formed

## Locale.setUnicodeLocaleKeyword(String, String)

```java
public Builder setUnicodeLocaleKeyword(String key, String type)
```

Sets the Unicode locale keyword type for the given key.  If the type
is null, the Unicode keyword is removed.  Otherwise, the key must be
non-null and both key and type must be well-formed or an exception is thrown.

Keys and types are converted to lower case.

**Note**:Setting the 'u' extension via String)
replaces all Unicode locale keywords with those defined in the
extension.

Parameters:

- `key`: the Unicode locale key
- `type`: the Unicode locale type

**Returns:** This builder.

**See also:** #setExtension(char, String)

Throws:

- `IllformedLocaleException`: if `key` or `type` is ill-formed
- `NullPointerException`: if `key` is null

## Locale.addUnicodeLocaleAttribute(String)

```java
public Builder addUnicodeLocaleAttribute(String attribute)
```

Adds a unicode locale attribute, if not already present, otherwise
has no effect. The attribute must not be null and must be
well-formed or an exception
is thrown.

Parameters:

- `attribute`: the attribute

**Returns:** This builder.

**See also:** #setExtension(char, String)

Throws:

- `NullPointerException`: if `attribute` is null
- `IllformedLocaleException`: if `attribute` is ill-formed

## Locale.removeUnicodeLocaleAttribute(String)

```java
public Builder removeUnicodeLocaleAttribute(String attribute)
```

Removes a unicode locale attribute, if present, otherwise has no
effect.  The attribute must not be null and must be
well-formed or an exception
is thrown.

Attribute comparison for removal is case-insensitive.

Parameters:

- `attribute`: the attribute

**Returns:** This builder.

**See also:** #setExtension(char, String)

Throws:

- `NullPointerException`: if `attribute` is null
- `IllformedLocaleException`: if `attribute` is ill-formed

## Locale.clear()

```java
public Builder clear()
```

Resets the builder to its initial, empty state.

**Returns:** This builder.

## Locale.clearExtensions()

```java
public Builder clearExtensions()
```

Resets the extensions to their initial, empty state.
Language, script, region and variant are unchanged.

**Returns:** This builder.

**See also:** #setExtension(char, String)

## Locale.build()

```java
public Locale build()
```

Returns an instance of `Locale` obtained from the fields set
on this builder.

This applies the conversions listed in `forLanguageTag(String)`
when constructing a Locale. (Legacy tags are handled in
`setLanguageTag(String)`.)

**Returns:** A Locale.

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

Constructs a `LanguageRange` using the given `range`.
Note that no validation is done against the IANA Language Subtag
Registry at time of construction.

This is equivalent to `LanguageRange(range, MAX_WEIGHT)`.

Parameters:

- `range`: a language range

Throws:

- `NullPointerException`: if the given `range` is `null`
- `IllegalArgumentException`: if the given `range` does not comply with the syntax of the language range mentioned in RFC 4647

## Locale.LanguageRange(String, double)

```java
public LanguageRange(String range, double weight)
```

Constructs a `LanguageRange` using the given `range` and
`weight`. Note that no validation is done against the IANA
Language Subtag Registry at time of construction.

Parameters:

- `range`: a language range
- `weight`: a weight value between `MIN_WEIGHT` and `MAX_WEIGHT`

Throws:

- `NullPointerException`: if the given `range` is `null`
- `IllegalArgumentException`: if the given `range` does not comply with the syntax of the language range mentioned in RFC 4647 or if the given `weight` is less than `MIN_WEIGHT` or greater than `MAX_WEIGHT`

## Locale.getRange()

```java
public String getRange()
```

Returns the language range of this `LanguageRange`.

**Returns:** the language range.

## Locale.getWeight()

```java
public double getWeight()
```

Returns the weight of this `LanguageRange`.

**Returns:** the weight value.

## Locale.parse(String)

```java
public static List<LanguageRange> parse(String ranges)
```

Parses the given `ranges` to generate a Language Priority List.

This method performs a syntactic check for each language range in
the given `ranges` but doesn't do validation using the IANA
Language Subtag Registry.

The `ranges` to be given can take one of the following
forms:

```java
  "Accept-Language: ja,en;q=0.4"  (weighted list with Accept-Language prefix)
  "ja,en;q=0.4"                   (weighted list)
  "ja,en"                         (prioritized list)
```

In a weighted list, each language range is given a weight value.
The weight value is identical to the "quality value" in
RFC 2616, and it
expresses how much the user prefers  the language. A weight value is
specified after a corresponding language range followed by
`";q="`, and the default weight value is `MAX_WEIGHT`
when it is omitted.

Unlike a weighted list, language ranges in a prioritized list
are sorted in the descending order based on its priority. The first
language range has the highest priority and meets the user's
preference most.

In either case, language ranges are sorted in descending order in
the Language Priority List based on priority or weight. If a
language range appears in the given `ranges` more than once,
only the first one is included on the Language Priority List.

The returned list consists of language ranges from the given
`ranges` and their equivalents found in the IANA Language
Subtag Registry. For example, if the given `ranges` is
`"Accept-Language: iw,en-us;q=0.7,en;q=0.3"`, the elements in
the list to be returned are:

```java
 <b>Range</b>                                   <b>Weight</b>
   "iw" (older tag for Hebrew)             1.0
   "he" (new preferred code for Hebrew)    1.0
   "en-us" (English, United States)        0.7
   "en" (English)                          0.3
```

Two language ranges, `"iw"` and `"he"`, have the same
highest priority in the list. By adding `"he"` to the user's
Language Priority List, locale-matching method can find Hebrew as a
matching locale (or language tag) even if the application or system
offers only `"he"` as a supported locale (or language tag).

Parameters:

- `ranges`: a list of comma-separated language ranges or a list of language ranges in the form of the "Accept-Language" header defined in RFC 2616

**Returns:** a Language Priority List consisting of language ranges
    included in the given `ranges` and their equivalent
    language ranges if available. The list is modifiable.

Throws:

- `NullPointerException`: if `ranges` is null
- `IllegalArgumentException`: if a language range or a weight found in the given `ranges` is ill-formed

## Locale.parse(String, Map<String, List<String>>)

```java
public static List<LanguageRange> parse(String ranges, Map<String, List<String>> map)
```

Parses the given `ranges` to generate a Language Priority
List, and then customizes the list using the given `map`.
This method is equivalent to
`mapEquivalents(parse(ranges), map)`.

Parameters:

- `ranges`: a list of comma-separated language ranges or a list of language ranges in the form of the "Accept-Language" header defined in RFC 2616
- `map`: a map containing information to customize language ranges

**Returns:** a Language Priority List with customization. The list is
    modifiable.

**See also:** #parse(String)

**See also:** #mapEquivalents(List, Map)

Throws:

- `NullPointerException`: if `ranges` is null
- `IllegalArgumentException`: if a language range or a weight found in the given `ranges` is ill-formed

## Locale.mapEquivalents(List<LanguageRange>priorityList, Map<String, List<String>>)

```java
public static List<LanguageRange> mapEquivalents( List<LanguageRange>priorityList, Map<String, List<String>> map)
```

Generates a new customized Language Priority List using the given
`priorityList` and `map`. If the given `map` is
empty, this method returns a copy of the given `priorityList`.

In the map, a key <example-value> a language range whereas a value is
a list of equivalents of it. `'*'` cannot be used in the map.
Each equivalent language range has the same weight value as its
original language range.

```java
 An example of map:
   <b>Key</b>                            <b>Value</b>
     "zh" (Chinese)                 "zh",
                                    "zh-Hans"(Simplified Chinese)
     "zh-HK" (Chinese, Hong Kong)   "zh-HK"
     "zh-TW" (Chinese, Taiwan)      "zh-TW"
```

The customization is performed after modification using the IANA
Language Subtag Registry.

For example, if a user's Language Priority List consists of five
language ranges (`"zh"`, `"zh-CN"`, `"en"`,
`"zh-TW"`, and `"zh-HK"`), the newly generated Language
Priority List which is customized using the above map example will
consists of `"zh"`, `"zh-Hans"`, `"zh-CN"`,
`"zh-Hans-CN"`, `"en"`, `"zh-TW"`, and
`"zh-HK"`.

`"zh-HK"` and `"zh-TW"` aren't converted to
`"zh-Hans-HK"` nor `"zh-Hans-TW"` even if they are
included in the Language Priority List. In this example, mapping
is used to clearly distinguish Simplified Chinese and Traditional
Chinese.

If the `"zh"`-to-`"zh"` mapping isn't included in the
map, a simple replacement will be performed and the customized list
won't include `"zh"` and `"zh-CN"`.

Parameters:

- `priorityList`: user's Language Priority List
- `map`: a map containing information to customize language ranges

**Returns:** a new Language Priority List with customization. The list is
    modifiable.

**See also:** #parse(String, Map)

Throws:

- `NullPointerException`: if `priorityList` is `null`

## Locale.hashCode()

```java
public int hashCode()
```

## Locale.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object to the specified object. The result is true if
and only if the argument is not `null` and is a
`LanguageRange` object that contains the same `range`
and `weight` values as this object.

Parameters:

- `obj`: the object to compare with

**Returns:** `true` if this object's `range` and
    `weight` are the same as the `obj`'s; `false`
    otherwise.

## Locale.toString()

```java
public String toString()
```

Returns an informative string representation of this `LanguageRange`
object, consisting of language range and weight if the range is
weighted and the weight is less than the max weight.

**Returns:** a string representation of this `LanguageRange` object.
