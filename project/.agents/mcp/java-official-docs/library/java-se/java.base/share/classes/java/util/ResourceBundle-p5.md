---
title: "ResourceBundle class (java.util) (part 5 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/ResourceBundle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ResourceBundle class (java.util) (part 5 of 5)

## ResourceBundle.toBundleName(String, Locale)

```java
public String toBundleName(String baseName, Locale locale)
```

Converts the given `baseName` and `locale`
to the bundle name. This method is called from the default
implementation of the Locale, String, ClassLoader, boolean) newBundle and Locale, String, ClassLoader, ResourceBundle, long) needsReload
methods.

This implementation returns the following value:

```java
    baseName + "_" + language + "_" + script + "_" + country + "_" + variant
```

where `language`, `script`, `country`,
and `variant` are the language, script, country, and variant
values of `locale`, respectively. Final component values that
are empty Strings are omitted along with the preceding '_'.  When the
script is empty, the script value is omitted along with the preceding '_'.
If all of the values are empty strings, then `baseName`
is returned.

For example, if `baseName` is
`"baseName"` and `locale` is
`Locale("ja", "", "XX")`, then
`"baseName_ja_&thinsp;_XX"` is returned. If the given
locale is `Locale("en")`, then
`"baseName_en"` is returned.

Overriding this method allows applications to use different
conventions in the organization and packaging of localized
resources.

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name
- `locale`: the locale for which a resource bundle should be loaded

**Returns:** the bundle name for the resource bundle

**See also:** java.util.spi.AbstractResourceBundleProvider#toBundleName(String, Locale)

Throws:

- `NullPointerException`: if `baseName` or `locale` is `null`

## ResourceBundle.toResourceName(String, String)

```java
public final String toResourceName(String bundleName, String suffix)
```

Converts the given `bundleName` to the form required
by the ClassLoader.getResource
method by replacing all occurrences of `'.'` in
`bundleName` with `'/'` and appending a
`'.'` and the given file `suffix`. For
example, if `bundleName` is
`"foo.bar.MyResources_ja_JP"` and `suffix`
is `"properties"`, then
`"foo/bar/MyResources_ja_JP.properties"` is returned.

Parameters:

- `bundleName`: the bundle name
- `suffix`: the file type suffix

**Returns:** the converted resource name

Throws:

- `NullPointerException`: if `bundleName` or `suffix` is `null`
