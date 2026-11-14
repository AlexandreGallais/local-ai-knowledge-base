---
title: "ResourceBundle class (java.util) (part 4 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/ResourceBundle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ResourceBundle class (java.util) (part 4 of 5)

## ResourceBundle.getCandidateLocales(String, Locale)

```java
public List<Locale> getCandidateLocales(String baseName, Locale locale)
```

Returns a `List` of `Locale`s as candidate
locales for `baseName` and `locale`. This
method is called by the `ResourceBundle.getBundle`
factory method each time the factory method tries finding a
resource bundle for a target `Locale`.

The sequence of the candidate locales also corresponds to the
runtime resource lookup path (also known as the *parent
chain*), if the corresponding resource bundles for the
candidate locales exist and their parents are not defined by
loaded resource bundles themselves.  The last element of the list
must be a root locale if it is desired to
have the base bundle as the terminal of the parent chain.

If the given locale is equal to `Locale.ROOT` (the
root locale), a `List` containing only the root
`Locale` must be returned. In this case, the
`ResourceBundle.getBundle` factory method loads only
the base bundle as the resulting resource bundle.

It is not a requirement to return an immutable (unmodifiable)
`List`. However, the returned `List` must not
be mutated after it has been returned by
`getCandidateLocales`.

The default implementation returns a `List` containing
`Locale`s using the rules described below.  In the
description below, *L*, *S*, *C* and *V*
respectively represent non-empty language, script, country, and
variant.  For example, [*L*, *C*] represents a
`Locale` that has non-empty values only for language and
country.  The form *L*("xx") represents the (non-empty)
language value is "xx".  For all cases, `Locale`s whose
final component values are empty strings are omitted.

- For an input `Locale` with an empty script value,
append candidate `Locale`s by omitting the final component
one by one as below:

-  [*L*, *C*, *V*]

-  [*L*, *C*]

-  [*L*]

-  `Locale.ROOT`

- For an input `Locale` with a non-empty script value,
append candidate `Locale`s by omitting the final component
up to language, then append candidates generated from the
`Locale` with country and variant restored:

-  [*L*, *S*, *C*, *V*]

-  [*L*, *S*, *C*]

-  [*L*, *S*]

-  [*L*, *C*, *V*]

-  [*L*, *C*]

-  [*L*]

-  `Locale.ROOT`

- For an input `Locale` with a variant value consisting
of multiple subtags separated by underscore, generate candidate
`Locale`s by omitting the variant subtags one by one, then
insert them after every occurrence of `Locale`s with the
full variant value in the original list.  For example, if
the variant consists of two subtags *V1* and *V2*:

-  [*L*, *S*, *C*, *V1*, *V2*]

-  [*L*, *S*, *C*, *V1*]

-  [*L*, *S*, *C*]

-  [*L*, *S*]

-  [*L*, *C*, *V1*, *V2*]

-  [*L*, *C*, *V1*]

-  [*L*, *C*]

-  [*L*]

-  `Locale.ROOT`

- Special cases for Chinese.  When an input `Locale` has the
language "zh" (Chinese) and an empty script value, either "Hans" (Simplified) or
"Hant" (Traditional) might be supplied, depending on the country.
When the country is "CN" (China) or "SG" (Singapore), "Hans" is supplied.
When the country is "HK" (Hong Kong SAR China), "MO" (Macau SAR China),
or "TW" (Taiwan), "Hant" is supplied.  For all other countries or when the country
is empty, no script is supplied.  For example, for `Locale("zh", "CN")
`, the candidate list will be:

-  [*L*("zh"), *S*("Hans"), *C*("CN")]

-  [*L*("zh"), *S*("Hans")]

-  [*L*("zh"), *C*("CN")]

-  [*L*("zh")]

-  `Locale.ROOT`

For `Locale("zh", "TW")`, the candidate list will be:

-  [*L*("zh"), *S*("Hant"), *C*("TW")]

-  [*L*("zh"), *S*("Hant")]

-  [*L*("zh"), *C*("TW")]

-  [*L*("zh")]

-  `Locale.ROOT`

- Special cases for Norwegian.  Both `Locale("no", "NO", "NY")` and `Locale("nn", "NO")` represent Norwegian
Nynorsk.  When a locale's language is "nn", the standard candidate
list is generated up to [*L*("nn")], and then the following
candidates are added:

-  [*L*("no"), *C*("NO"), *V*("NY")]

-  [*L*("no"), *C*("NO")]

-  [*L*("no")]

-  `Locale.ROOT`

If the locale is exactly `Locale("no", "NO", "NY")`, it is first
converted to `Locale("nn", "NO")` and then the above procedure is
followed.

Also, Java treats the language "no" as a synonym of Norwegian
Bokmål "nb".  Except for the single case `Locale("no", "NO", "NY")` (handled above), when an input `Locale`
has language "no" or "nb", candidate `Locale`s with
language code "no" and "nb" are interleaved, first using the
requested language, then using its synonym. For example,
`Locale("nb", "NO", "POSIX")` generates the following
candidate list:

-  [*L*("nb"), *C*("NO"), *V*("POSIX")]

-  [*L*("no"), *C*("NO"), *V*("POSIX")]

-  [*L*("nb"), *C*("NO")]

-  [*L*("no"), *C*("NO")]

-  [*L*("nb")]

-  [*L*("no")]

-  `Locale.ROOT`

`Locale("no", "NO", "POSIX")` would generate the same list
except that locales with "no" would appear before the corresponding
locales with "nb".

The default implementation uses an `ArrayList` that
overriding implementations may modify before returning it to the
caller. However, a subclass must not modify it after it has
been returned by `getCandidateLocales`.

For example, if the given `baseName` is "Messages"
and the given `locale` is
`Locale("ja", "", "XX")`, then a
`List` of `Locale`s:

```java
    Locale("ja", "", "XX")
    Locale("ja")
    Locale.ROOT
```

is returned. And if the resource bundles for the "ja" and
"" `Locale`s are found, then the runtime resource
lookup path (parent chain) is:

```java
    Messages_ja -> Messages
```

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name
- `locale`: the locale for which a resource bundle is desired

**Returns:** a `List` of candidate
       `Locale`s for the given `locale`

Throws:

- `NullPointerException`: if `baseName` or `locale` is `null`

## ResourceBundle.getFallbackLocale(String, Locale)

```java
public Locale getFallbackLocale(String baseName, Locale locale)
```

Returns a `Locale` to be used as a fallback locale for
further resource bundle searches by the
`ResourceBundle.getBundle` factory method. This method
is called from the factory method every time when no resulting
resource bundle has been found for `baseName` and
`locale`, where locale is either the parameter for
`ResourceBundle.getBundle` or the previous fallback
locale returned by this method.

The method returns `null` if no further fallback
search is desired.

The default implementation returns the default {@code Locale} if the given
`locale` isn't the default one.  Otherwise,
`null` is returned.

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name for which `ResourceBundle.getBundle` has been unable to find any resource bundles (except for the base bundle)
- `locale`: the `Locale` for which `ResourceBundle.getBundle` has been unable to find any resource bundles (except for the base bundle)

**Returns:** a `Locale` for the fallback search,
       or `null` if no further fallback search
       is desired.

Throws:

- `NullPointerException`: if `baseName` or `locale` is `null`

## ResourceBundle.newBundle(String, Locale, String, ClassLoader, boolean)

```java
public ResourceBundle newBundle(String baseName, Locale locale, String format, ClassLoader loader, boolean reload) throws IllegalAccessException, InstantiationException, IOException
```

Instantiates a resource bundle for the given bundle name of the
given format and locale, using the given class loader if
necessary. This method returns `null` if there is no
resource bundle available for the given parameters. If a resource
bundle can't be instantiated due to an unexpected error, the
error must be reported by throwing an `Error` or
`Exception` rather than simply returning
`null`.

If the `reload` flag is `true`, it
indicates that this method is being called because the previously
loaded resource bundle has expired.

Parameters:

- `baseName`: the base bundle name of the resource bundle, a fully qualified class name
- `locale`: the locale for which the resource bundle should be instantiated
- `format`: the resource bundle format to be loaded
- `loader`: the `ClassLoader` to use to load the bundle
- `reload`: the flag to indicate bundle reloading; `true` if reloading an expired resource bundle, `false` otherwise

**Implementation requirements:** Resource bundles in named modules are subject to the encapsulation
rules specified by Module.getResourceAsStream.
A resource bundle in a named module visible to the given class loader
is accessible when the package of the resource file corresponding
to the resource bundle is open unconditionally.

The default implementation instantiates a
`ResourceBundle` as follows.

- The bundle name is obtained by calling Locale) toBundleName(baseName, locale).

- If `format` is `"java.class"`, the
`Class` specified by the bundle name is loaded with the
given class loader. If the `Class` is found and accessible
then the `ResourceBundle` is instantiated.  The
resource bundle is accessible if the package of the bundle class file
is open unconditionally; otherwise, `IllegalAccessException`
will be thrown.
Note that the `reload` flag is ignored for loading
class-based resource bundles in this default implementation.

- If `format` is `"java.properties"`,
String) toResourceName(bundlename, "properties") is called to get the resource name.
If `reload` is `true`, load.getResource is called
to get a `URL` for creating a `URLConnection`. This `URLConnection` is used to
disable the caches of the underlying resource loading layers,
and to get an {@code InputStream}.
Otherwise, loader.getResourceAsStream is called to get an `InputStream`. Then, a `PropertyResourceBundle` is constructed with the
`InputStream`.

- If `format` is neither `"java.class"`
nor `"java.properties"`, an
`IllegalArgumentException` is thrown.

- If the `locale`'s language is one of the
Legacy language
codes, either old or new, then repeat the loading process
if needed, with the bundle name with the other language.
For example, "iw" for "he" and vice versa.

**Returns:** the resource bundle instance,
       or `null` if none could be found.

**See also:** java.util.spi.ResourceBundleProvider#getBundle(String, Locale)

Throws:

- `NullPointerException`: if `bundleName`, `locale`, `format`, or `loader` is `null`, or if `null` is returned by Locale) toBundleName
- `IllegalArgumentException`: if `format` is unknown, or if the resource found for the given parameters contains malformed data.
- `ClassCastException`: if the loaded class cannot be cast to `ResourceBundle`
- `IllegalAccessException`: if the class or its nullary constructor is not accessible.
- `InstantiationException`: if the instantiation of a class fails for some other reason.
- `ExceptionInInitializerError`: if the initialization provoked by this method fails.
- `IOException`: if an error occurred when reading resources using any I/O operations

## ResourceBundle.getTimeToLive(String, Locale)

```java
public long getTimeToLive(String baseName, Locale locale)
```

Returns the time-to-live (TTL) value for resource bundles that
are loaded under this
`ResourceBundle.Control`. Positive time-to-live values
specify the number of milliseconds a bundle can remain in the
cache without being validated against the source data from which
it was constructed. The value 0 indicates that a bundle must be
validated each time it is retrieved from the cache. `TTL_DONT_CACHE` specifies that loaded resource bundles are not
put in the cache. `TTL_NO_EXPIRATION_CONTROL` specifies
that loaded resource bundles are put in the cache with no
expiration control.

The expiration affects only the bundle loading process by the
`ResourceBundle.getBundle` factory method.  That is,
if the factory method finds a resource bundle in the cache that
has expired, the factory method calls the Locale, String, ClassLoader, ResourceBundle, long) needsReload method to determine whether the resource
bundle needs to be reloaded. If `needsReload` returns
`true`, the cached resource bundle instance is removed
from the cache. Otherwise, the instance stays in the cache,
updated with the new TTL value returned by this method.

All cached resource bundles are subject to removal from the
cache due to memory constraints of the runtime environment.
Returning a large positive value doesn't mean to lock loaded
resource bundles in the cache.

The default implementation returns `TTL_NO_EXPIRATION_CONTROL`.

Parameters:

- `baseName`: the base name of the resource bundle for which the expiration value is specified.
- `locale`: the locale of the resource bundle for which the expiration value is specified.

**Returns:** the time (0 or a positive millisecond offset from the
       cached time) to get loaded bundles expired in the cache,
       `TTL_NO_EXPIRATION_CONTROL` to disable the
       expiration control, or `TTL_DONT_CACHE` to disable
       caching.

Throws:

- `NullPointerException`: if `baseName` or `locale` is `null`

## ResourceBundle.needsReload(String, Locale, String, ClassLoader, ResourceBundle, long)

```java
public boolean needsReload(String baseName, Locale locale, String format, ClassLoader loader, ResourceBundle bundle, long loadTime)
```

Determines if the expired `bundle` in the cache needs
to be reloaded based on the loading time given by
`loadTime` or some other criteria. The method returns
`true` if reloading is required; `false`
otherwise. `loadTime` is a millisecond offset since
the  `Calendar`
Epoch.

The calling `ResourceBundle.getBundle` factory method
calls this method on the `ResourceBundle.Control`
instance used for its current invocation, not on the instance
used in the invocation that originally loaded the resource
bundle.

The default implementation compares `loadTime` and
the last modified time of the source data of the resource
bundle. If it's determined that the source data has been modified
since `loadTime`, `true` is
returned. Otherwise, `false` is returned. This
implementation assumes that the given `format` is the
same string as its file suffix if it's not one of the default
formats, `"java.class"` or
`"java.properties"`.

Parameters:

- `baseName`: the base bundle name of the resource bundle, a fully qualified class name
- `locale`: the locale for which the resource bundle should be instantiated
- `format`: the resource bundle format to be loaded
- `loader`: the `ClassLoader` to use to load the bundle
- `bundle`: the resource bundle instance that has been expired in the cache
- `loadTime`: the time when `bundle` was loaded and put in the cache

**Returns:** `true` if the expired bundle needs to be
       reloaded; `false` otherwise.

Throws:

- `NullPointerException`: if `baseName`, `locale`, `format`, `loader`, or `bundle` is `null`
