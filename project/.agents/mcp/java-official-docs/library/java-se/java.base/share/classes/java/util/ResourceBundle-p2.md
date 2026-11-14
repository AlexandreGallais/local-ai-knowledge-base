---
title: "ResourceBundle class (java.util) (part 2 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/ResourceBundle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ResourceBundle class (java.util) (part 2 of 5)

## ResourceBundle.getBundle(String, Control)

```java
public static final ResourceBundle getBundle(String baseName, Control control)
```

Returns a resource bundle using the specified base name, the
default locale and the specified control. Calling this method
is equivalent to calling

except that `getClassLoader()` is run with the security
privileges of `ResourceBundle`.  See Locale, ClassLoader, Control) getBundle for the
complete description of the resource bundle loading process with a
`ResourceBundle.Control`.

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name
- `control`: the control which gives information for the resource bundle loading process

**Returns:** a resource bundle for the given base name and the default locale

**Since:** 1.6

Throws:

- `NullPointerException`: if `baseName` or `control` is `null`
- `MissingResourceException`: if no resource bundle for the specified base name can be found
- `IllegalArgumentException`: if the given `control` doesn't perform properly (e.g., `control.getCandidateLocales` returns null.) Note that validation of `control` is performed as needed.
- `UnsupportedOperationException`: if this method is called in a named module

## ResourceBundle.getBundle(String, Locale)

```java
public static final ResourceBundle getBundle(String baseName, Locale locale)
```

Gets a resource bundle using the specified base name and locale,
and the caller module. Calling this method is equivalent to calling

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name
- `locale`: the locale for which a resource bundle is desired

**Returns:** a resource bundle for the given base name and locale

**See also:** Resource Bundle Search and Loading Strategy

**See also:** Resource Bundles and Named Modules

Throws:

- `NullPointerException`: if `baseName` or `locale` is `null`
- `MissingResourceException`: if no resource bundle for the specified base name can be found

## ResourceBundle.getBundle(String, Module)

```java
public static ResourceBundle getBundle(String baseName, Module module)
```

Gets a resource bundle using the specified base name and the default locale
on behalf of the specified module. This method is equivalent to calling

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name
- `module`: the module for which the resource bundle is searched

**Returns:** a resource bundle for the given base name and the default locale

**Since:** 9

**See also:** ResourceBundleProvider

**See also:** Resource Bundle Search and Loading Strategy

**See also:** Resource Bundles and Named Modules

Throws:

- `NullPointerException`: if `baseName` or `module` is `null`
- `MissingResourceException`: if no resource bundle for the specified base name can be found in the specified module

## ResourceBundle.getBundle(String, Locale, Module)

```java
public static ResourceBundle getBundle(String baseName, Locale targetLocale, Module module)
```

Gets a resource bundle using the specified base name and locale
on behalf of the specified module.

 Resource bundles in named modules may be encapsulated.  When
the resource bundle is loaded from a
service provider, the caller module
must have an appropriate *uses* clause in its *module descriptor*
to declare that the module uses of `ResourceBundleProvider`
for the named resource bundle.
Otherwise, it will load the resource bundles that are local in the
given module as if calling `Module.getResourceAsStream(String)`
or that are visible to the class loader of the given module
as if calling `ClassLoader.getResourceAsStream(String)`.
When the resource bundle is loaded from the specified module, it is
subject to the encapsulation rules specified by
Module.getResourceAsStream.

If the given `module` is an unnamed module, then this method is
equivalent to calling Locale, ClassLoader) getBundle(baseName, targetLocale, module.getClassLoader() to load
resource bundles that are visible to the class loader of the given
unnamed module. Custom `java.util.spi.ResourceBundleControlProvider`
implementations, if present, will only be invoked if the specified
module is an unnamed module.

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name
- `targetLocale`: the locale for which a resource bundle is desired
- `module`: the module for which the resource bundle is searched

**Returns:** a resource bundle for the given base name and locale in the module

**Since:** 9

**See also:** Resource Bundle Search and Loading Strategy

**See also:** Resource Bundles and Named Modules

Throws:

- `NullPointerException`: if `baseName`, `targetLocale`, or `module` is `null`
- `MissingResourceException`: if no resource bundle for the specified base name and locale can be found in the specified `module`

## ResourceBundle.getBundle(String, Locale, Control)

```java
public static final ResourceBundle getBundle(String baseName, Locale targetLocale, Control control)
```

Returns a resource bundle using the specified base name, target
locale and control, and the caller's class loader. Calling this
method is equivalent to calling

except that `getClassLoader()` is run with the security
privileges of `ResourceBundle`.  See Locale, ClassLoader, Control) getBundle for the
complete description of the resource bundle loading process with a
`ResourceBundle.Control`.

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name
- `targetLocale`: the locale for which a resource bundle is desired
- `control`: the control which gives information for the resource bundle loading process

**Returns:** a resource bundle for the given base name and a
        `Locale` in `locales`

**Since:** 1.6

Throws:

- `NullPointerException`: if `baseName`, `locales` or `control` is `null`
- `MissingResourceException`: if no resource bundle for the specified base name in any of the `locales` can be found.
- `IllegalArgumentException`: if the given `control` doesn't perform properly (e.g., `control.getCandidateLocales` returns null.) Note that validation of `control` is performed as needed.
- `UnsupportedOperationException`: if this method is called in a named module

## ResourceBundle.getBundle(String, Locale, ClassLoader)

```java
public static ResourceBundle getBundle(String baseName, Locale locale, ClassLoader loader)
```

Gets a resource bundle using the specified base name, locale, and class
loader.

When this method is called from a named module and the given
loader is the class loader of the caller module, this is equivalent
to calling:

otherwise, this is equivalent to calling:

where `control` is the default instance of `Control` unless
a `Control` instance is provided by
`ResourceBundleControlProvider` SPI.  Refer to the
description of modifying the default
behavior. The following describes the default behavior.

**Resource Bundle Search and Loading Strategy**

`getBundle` uses the base name, the specified locale, and
the default locale (obtained from Locale.getDefault) to generate a sequence of *candidate bundle names*.  If the specified
locale's language, script, country, and variant are all empty strings,
then the base name is the only candidate bundle name.  Otherwise, a list
of candidate locales is generated from the attribute values of the
specified locale (language, script, country and variant) and appended to
the base name.  Typically, this will look like the following:

```java
    baseName + "_" + language + "_" + script + "_" + country + "_" + variant
    baseName + "_" + language + "_" + script + "_" + country
    baseName + "_" + language + "_" + script
    baseName + "_" + language + "_" + country + "_" + variant
    baseName + "_" + language + "_" + country
    baseName + "_" + language
```

Candidate bundle names where the final component is an empty string
are omitted, along with the underscore.  For example, if country is an
empty string, the second and the fifth candidate bundle names above
would be omitted.  Also, if script is an empty string, the candidate names
including script are omitted.  For example, a locale with language "de"
and variant "JAVA" will produce candidate names with base name
"MyResource" below.

```java
    MyResource_de__JAVA
    MyResource_de
```

In the case that the variant contains one or more underscores ('_'), a
sequence of bundle names generated by truncating the last underscore and
the part following it is inserted after a candidate bundle name with the
original variant.  For example, for a locale with language "en", script
"Latn, country "US" and variant "WINDOWS_VISTA", and bundle base name
"MyResource", the list of candidate bundle names below is generated:

```java
MyResource_en_Latn_US_WINDOWS_VISTA
MyResource_en_Latn_US_WINDOWS
MyResource_en_Latn_US
MyResource_en_Latn
MyResource_en_US_WINDOWS_VISTA
MyResource_en_US_WINDOWS
MyResource_en_US
MyResource_en
```

**Note:** For some `Locale`s, the list of
candidate bundle names contains extra names, or the order of bundle names
is slightly modified.  See the description of the default implementation
of Locale) getCandidateLocales for details.

`getBundle` then iterates over the candidate bundle names
to find the first one for which it can *instantiate* an actual
resource bundle. It uses the default controls' getFormats method, which generates two bundle names for each generated
name, the first a class name and the second a properties file name. For
each candidate bundle name, it attempts to create a resource bundle:

- First, it attempts to load a class using the generated class name.
If such a class can be found and loaded using the specified class
loader, is assignment compatible with ResourceBundle, is accessible from
ResourceBundle, and can be instantiated, `getBundle` creates a
new instance of this class and uses it as the *result resource
bundle*.

- Otherwise, `getBundle` attempts to locate a property
resource file using the generated properties file name.  It generates a
path name from the candidate bundle name by replacing all "." characters
with "/" and appending the string ".properties".  It attempts to find a
"resource" with this name using ClassLoader.getResource.  (Note that a "resource" in the sense of
`getResource` has nothing to do with the contents of a
resource bundle, it is just a container of data, such as a file.)  If it
finds a "resource", it attempts to create a new `PropertyResourceBundle` instance from its contents.  If successful, this
instance becomes the *result resource bundle*.

This continues until a result resource bundle is instantiated or the
list of candidate bundle names is exhausted.  If no matching resource
bundle is found, the default control's getFallbackLocale method is called, which returns the current default
locale.  A new sequence of candidate locale names is generated using this
locale and searched again, as above.

If still no result bundle is found, the base name alone is looked up. If
this still fails, a `MissingResourceException` is thrown.

 Once a result resource bundle has been found,
its *parent chain* is instantiated.  If the result bundle already
has a parent (perhaps because it was returned from a cache) the chain is
complete.

Otherwise, `getBundle` examines the remainder of the
candidate locale list that was used during the pass that generated the
result resource bundle.  (As before, candidate bundle names where the
final component is an empty string are omitted.)  When it comes to the
end of the candidate list, it tries the plain bundle name.  With each of the
candidate bundle names it attempts to instantiate a resource bundle (first
looking for a class and then a properties file, as described above).

Whenever it succeeds, it calls the previously instantiated resource
bundle's setParent method
with the new resource bundle.  This continues until the list of names
is exhausted or the current bundle already has a non-null parent.

Once the parent chain is complete, the bundle is returned.

**Note:** `getBundle` caches instantiated resource
bundles and might return the same resource bundle instance multiple times.

**Note:**The `baseName` argument should be a fully
qualified class name. However, for compatibility with earlier versions,
Java SE Runtime Environments do not verify this, and so it is
possible to access `PropertyResourceBundle`s by specifying a
path name (using "/") instead of a fully qualified class name (using
".").

**Example:**

The following class and property files are provided:

- MyResources.class

- MyResources.properties

- MyResources_fr.properties

- MyResources_fr_CH.class

- MyResources_fr_CH.properties

- MyResources_en.properties

- MyResources_es_ES.class

The contents of all files are valid (that is, public non-abstract
subclasses of `ResourceBundle` for the ".class" files,
syntactically correct ".properties" files).  The default locale is
`Locale("en", "GB")`.

Calling `getBundle` with the locale arguments below will
instantiate resource bundles as follows:

getBundle() locale to resource bundle mapping

LocaleResource bundle

Locale("fr", "CH")MyResources_fr_CH.class, parent MyResources_fr.properties, parent MyResources.class
Locale("fr", "FR")MyResources_fr.properties, parent MyResources.class
Locale("de", "DE")MyResources_en.properties, parent MyResources.class
Locale("en", "US")MyResources_en.properties, parent MyResources.class
Locale("es", "ES")MyResources_es_ES.class, parent MyResources.class

The file MyResources_fr_CH.properties is never used because it is
hidden by the MyResources_fr_CH.class. Likewise, MyResources.properties
is also hidden by MyResources.class.

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name
- `locale`: the locale for which a resource bundle is desired
- `loader`: the class loader from which to load the resource bundle

**API note:** If the caller module is a named module and the given
`loader` is the caller module's class loader, this method is
equivalent to `getBundle(baseName, locale)`; otherwise, it may not
find resource bundles from named modules.
Use Locale, Module) to load resource bundles
on behalf on a specific module instead.

**Returns:** a resource bundle for the given base name and locale

**Since:** 1.2

**See also:** Resource Bundles and Named Modules

Throws:

- `java.lang.NullPointerException`: if `baseName`, `locale`, or `loader` is `null`
- `MissingResourceException`: if no resource bundle for the specified base name can be found
