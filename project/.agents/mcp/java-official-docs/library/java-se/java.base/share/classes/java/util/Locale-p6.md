---
title: "Locale class (java.util) (part 6 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Locale.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Locale class (java.util) (part 6 of 6)

## Locale.filter(List<LanguageRange>, Collection<Locale>, FilteringMode)

```java
public static List<Locale> filter(List<LanguageRange> priorityList, Collection<Locale> locales, FilteringMode mode)
```

Returns a list of matching `Locale` instances using the filtering
mechanism defined in RFC 4647.

This filter operation on the given `locales` ensures that only
unique matching locale(s) are returned.

Parameters:

- `priorityList`: user's Language Priority List in which each language tag is sorted in descending order based on priority or weight
- `locales`: `Locale` instances used for matching
- `mode`: filtering mode

**Returns:** a list of `Locale` instances for matching language tags
    sorted in descending order based on priority or weight, or an empty
    list if nothing matches. The list is modifiable.

**Since:** 1.8

Throws:

- `NullPointerException`: if `priorityList` or `locales` is `null`
- `IllegalArgumentException`: if one or more extended language ranges are included in the given list when `FilteringMode.REJECT_EXTENDED_RANGES` is specified

## Locale.filter(List<LanguageRange>, Collection<Locale>)

```java
public static List<Locale> filter(List<LanguageRange> priorityList, Collection<Locale> locales)
```

Returns a list of matching `Locale` instances using the filtering
mechanism defined in RFC 4647. This is equivalent to
Collection, FilteringMode) when `mode` is
`FilteringMode.AUTOSELECT_FILTERING`.

This filter operation on the given `locales` ensures that only
unique matching locale(s) are returned.

Parameters:

- `priorityList`: user's Language Priority List in which each language tag is sorted in descending order based on priority or weight
- `locales`: `Locale` instances used for matching

**Returns:** a list of `Locale` instances for matching language tags
    sorted in descending order based on priority or weight, or an empty
    list if nothing matches. The list is modifiable.

**Since:** 1.8

Throws:

- `NullPointerException`: if `priorityList` or `locales` is `null`

## Locale.filterTags(List<LanguageRange>, Collection<String>, FilteringMode)

```java
public static List<String> filterTags(List<LanguageRange> priorityList, Collection<String> tags, FilteringMode mode)
```

Returns a list of matching languages tags using the basic <example-value>
mechanism defined in RFC 4647.

This filter operation on the given `tags` ensures that only
unique matching tag(s) are returned with preserved case. In case of
duplicate matching tags with the case difference, the first matching
tag with preserved case is returned.
For example, "de-ch" is returned out of the duplicate matching tags
"de-ch" and "de-CH", if "de-ch" is checked first for matching in the
given `tags`. Note that if the given `tags` is an unordered
`Collection`, the returned matching tag out of duplicate tags is
subject to change, depending on the implementation of the
`Collection`.

Parameters:

- `priorityList`: user's Language Priority List in which each language tag is sorted in descending order based on priority or weight
- `tags`: language tags
- `mode`: filtering mode

**Returns:** a list of matching language tags sorted in descending order
    based on priority or weight, or an empty list if nothing matches.
    The list is modifiable.

**Since:** 1.8

Throws:

- `NullPointerException`: if `priorityList` or `tags` is `null`
- `IllegalArgumentException`: if one or more extended language ranges are included in the given list when `FilteringMode.REJECT_EXTENDED_RANGES` is specified

## Locale.filterTags(List<LanguageRange>, Collection<String>)

```java
public static List<String> filterTags(List<LanguageRange> priorityList, Collection<String> tags)
```

Returns a list of matching languages tags using the basic <example-value>
mechanism defined in RFC 4647. This is equivalent to
Collection, FilteringMode) when `mode`
is `FilteringMode.AUTOSELECT_FILTERING`.

This filter operation on the given `tags` ensures that only
unique matching tag(s) are returned with preserved case. In case of
duplicate matching tags with the case difference, the first matching
tag with preserved case is returned.
For example, "de-ch" is returned out of the duplicate matching tags
"de-ch" and "de-CH", if "de-ch" is checked first for matching in the
given `tags`. Note that if the given `tags` is an unordered
`Collection`, the returned matching tag out of duplicate tags is
subject to change, depending on the implementation of the
`Collection`.

Parameters:

- `priorityList`: user's Language Priority List in which each language tag is sorted in descending order based on priority or weight
- `tags`: language tags

**Returns:** a list of matching language tags sorted in descending order
    based on priority or weight, or an empty list if nothing matches.
    The list is modifiable.

**Since:** 1.8

Throws:

- `NullPointerException`: if `priorityList` or `tags` is `null`

## Locale.lookup(List<LanguageRange>, Collection<Locale>)

```java
public static Locale lookup(List<LanguageRange> priorityList, Collection<Locale> locales)
```

Returns a `Locale` instance for the best-matching language
tag using the lookup mechanism defined in RFC 4647.

Parameters:

- `priorityList`: user's Language Priority List in which each language tag is sorted in descending order based on priority or weight
- `locales`: `Locale` instances used for matching

**Returns:** the best matching `Locale` instance chosen based on
    priority or weight, or `null` if nothing matches.

**Since:** 1.8

Throws:

- `NullPointerException`: if `priorityList` or `locales` is `null`

## Locale.lookupTag(List<LanguageRange>, Collection<String>)

```java
public static String lookupTag(List<LanguageRange> priorityList, Collection<String> tags)
```

Returns the best-matching language tag using the lookup mechanism
defined in RFC 4647.

This lookup operation on the given `tags` ensures that the
first matching tag with preserved case is returned.

Parameters:

- `priorityList`: user's Language Priority List in which each language tag is sorted in descending order based on priority or weight
- `tags`: language tags used for matching

**Returns:** the best matching language tag chosen based on priority or
    weight, or `null` if nothing matches.

**Since:** 1.8

Throws:

- `NullPointerException`: if `priorityList` or `tags` is `null`
