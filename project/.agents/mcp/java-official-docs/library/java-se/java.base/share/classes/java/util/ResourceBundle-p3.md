---
title: "ResourceBundle class (java.util) (part 3 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/ResourceBundle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ResourceBundle class (java.util) (part 3 of 5)

## ResourceBundle.getBundle(String, Locale, ClassLoader, Control)

```java
public static ResourceBundle getBundle(String baseName, Locale targetLocale, ClassLoader loader, Control control)
```

Returns a resource bundle using the specified base name, target
locale, class loader and control. Unlike the Locale, ClassLoader) getBundle
factory methods with no `control` argument, the given
`control` specifies how to locate and instantiate resource
bundles. Conceptually, the bundle loading process with the given
`control` is performed in the following steps.

- This factory method looks up the resource bundle in the cache for
the specified `baseName`, `targetLocale` and
`loader`.  If the requested resource bundle instance is
found in the cache and the time-to-live periods of the instance and
all of its parent instances have not expired, the instance is returned
to the caller. Otherwise, this factory method proceeds with the
loading process below.

- The control.getFormats method is called to get resource bundle formats
to produce bundle or resource names. The strings
`"java.class"` and `"java.properties"`
designate class-based and property-based resource bundles, respectively. Other strings
starting with `"java."` are reserved for future extensions
and must not be used for application-defined formats. Other strings
designate application-defined formats.

- The Locale) control.getCandidateLocales method is called with the target
locale to get a list of *candidate `Locale`s* for
which resource bundles are searched.

- The Locale, String, ClassLoader, boolean) control.newBundle method is called to
instantiate a `ResourceBundle` for the base bundle name, a
candidate locale, and a format. (Refer to the note on the cache
lookup below.) This step is iterated over all combinations of the
candidate locales and formats until the `newBundle` method
returns a `ResourceBundle` instance or the iteration has
used up all the combinations. For example, if the candidate locales
are `Locale("de", "DE")`, `Locale("de")` and
`Locale("")` and the formats are `"java.class"`
and `"java.properties"`, then the following is the
sequence of locale-format combinations to be used to call
`control.newBundle`.

locale-format combinations for newBundle

Index
`Locale`
`format`

1
`Locale("de", "DE")`
`java.class`

2
`Locale("de", "DE")`
`java.properties`

3
`Locale("de")`
`java.class`

4
`Locale("de")`
`java.properties`

5
`Locale("")`
`java.class`

6
`Locale("")`
`java.properties`

- If the previous step has found no resource bundle, proceed to
Step 6. If a bundle has been found that is a base bundle (a bundle
for `Locale("")`), and the candidate locale list only contained
`Locale("")`, return the bundle to the caller. If a bundle
has been found that is a base bundle, but the candidate locale list
contained locales other than Locale(""), put the bundle on hold and
proceed to Step 6. If a bundle has been found that is not a base
bundle, proceed to Step 7.

- The Locale) control.getFallbackLocale method is called to get a fallback
locale (alternative to the current target locale) to try further
finding a resource bundle. If the method returns a non-null locale,
it becomes the next target locale and the loading process starts over
from Step 3. Otherwise, if a base bundle was found and put on hold in
a previous Step 5, it is returned to the caller now. Otherwise, a
MissingResourceException is thrown.

- At this point, we have found a resource bundle that's not the
base bundle. If this bundle set its parent during its instantiation,
it is returned to the caller. Otherwise, its parent chain is
instantiated based on the list of candidate locales from which it was
found. Finally, the bundle is returned to the caller.

During the resource bundle loading process above, this factory
method looks up the cache before calling the Locale, String, ClassLoader, boolean) control.newBundle method.  If the time-to-live period of the
resource bundle found in the cache has expired, the factory method
calls the Locale, String, ClassLoader, ResourceBundle, long) control.needsReload
method to determine whether the resource bundle needs to be reloaded.
If reloading is required, the factory method calls
`control.newBundle` to reload the resource bundle.  If
`control.newBundle` returns `null`, the factory
method puts a dummy resource bundle in the cache as a mark of
nonexistent resource bundles in order to avoid lookup overhead for
subsequent requests. Such dummy resource bundles are under the same
expiration control as specified by `control`.

All resource bundles loaded are cached by default. Refer to
control.getTimeToLive for details.

The following is an example of the bundle loading process with the
default `ResourceBundle.Control` implementation.

Conditions:

- Base bundle name: `foo.bar.Messages`

- Requested `Locale`: `Locale.ITALY`

- Default `Locale`: `Locale.FRENCH`

- Available resource bundles:
`foo/bar/Messages_fr.properties` and
`foo/bar/Messages.properties`

First, `getBundle` tries loading a resource bundle in
the following sequence.

- class `foo.bar.Messages_it_IT`

- file `foo/bar/Messages_it_IT.properties`

- class `foo.bar.Messages_it`

- file `foo/bar/Messages_it.properties`

- class `foo.bar.Messages`

- file `foo/bar/Messages.properties`

At this point, `getBundle` finds
`foo/bar/Messages.properties`, which is put on hold
because it's the base bundle.  `getBundle` calls Locale) control.getFallbackLocale("foo.bar.Messages", Locale.ITALY) which
returns `Locale.FRENCH`. Next, `getBundle`
tries loading a bundle in the following sequence.

- class `foo.bar.Messages_fr`

- file `foo/bar/Messages_fr.properties`

- class `foo.bar.Messages`

- file `foo/bar/Messages.properties`

`getBundle` finds
`foo/bar/Messages_fr.properties` and creates a
`ResourceBundle` instance. Then, `getBundle`
sets up its parent chain from the list of the candidate locales.  Only
`foo/bar/Messages.properties` is found in the list and
`getBundle` creates a `ResourceBundle` instance
that becomes the parent of the instance for
`foo/bar/Messages_fr.properties`.

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name
- `targetLocale`: the locale for which a resource bundle is desired
- `loader`: the class loader from which to load the resource bundle
- `control`: the control which gives information for the resource bundle loading process

**Returns:** a resource bundle for the given base name and locale

**Since:** 1.6

Throws:

- `NullPointerException`: if `baseName`, `targetLocale`, `loader`, or `control` is `null`
- `MissingResourceException`: if no resource bundle for the specified base name can be found
- `IllegalArgumentException`: if the given `control` doesn't perform properly (e.g., `control.getCandidateLocales` returns null.) Note that validation of `control` is performed as needed.
- `UnsupportedOperationException`: if this method is called in a named module

## ResourceBundle.clearCache()

```java
public static final void clearCache()
```

Removes all resource bundles from the cache that have been loaded
by the caller's module.

**Since:** 1.6

**See also:** ResourceBundle.Control#getTimeToLive(String,Locale)

## ResourceBundle.clearCache(ClassLoader)

```java
public static final void clearCache(ClassLoader loader)
```

Removes all resource bundles from the cache that have been loaded
by the given class loader.

Parameters:

- `loader`: the class loader

**Since:** 1.6

**See also:** ResourceBundle.Control#getTimeToLive(String,Locale)

Throws:

- `NullPointerException`: if `loader` is null

## ResourceBundle.handleGetObject(String)

```java
protected abstract Object handleGetObject(String key)
```

Gets an object for the given key from this resource bundle.
Returns null if this resource bundle does not contain an
object for the given key.

Parameters:

- `key`: the key for the desired object

**Returns:** the object for the given key, or null

Throws:

- `NullPointerException`: if `key` is `null`

## ResourceBundle.getKeys()

```java
public abstract Enumeration<String> getKeys()
```

Returns an enumeration of the keys.

**Returns:** an `Enumeration` of the keys contained in
        this `ResourceBundle` and its parent bundles.

## ResourceBundle.containsKey(String)

```java
public boolean containsKey(String key)
```

Determines whether the given `key` is contained in
this `ResourceBundle` or its parent bundles.

Parameters:

- `key`: the resource `key`

**Returns:** `true` if the given `key` is
       contained in this `ResourceBundle` or its
       parent bundles; `false` otherwise.

**Since:** 1.6

Throws:

- `NullPointerException`: if `key` is `null`

## ResourceBundle.keySet()

```java
public Set<String> keySet()
```

Returns a `Set` of all keys contained in this
`ResourceBundle` and its parent bundles.

**Returns:** a `Set` of all keys contained in this
        `ResourceBundle` and its parent bundles.

**Since:** 1.6

## ResourceBundle.handleKeySet()

```java
protected Set<String> handleKeySet()
```

Returns a `Set` of the keys contained *only*
in this `ResourceBundle`.

The default implementation returns a `Set` of the
keys returned by the getKeys method except
for the ones for which the handleGetObject method returns `null`. Once the
`Set` has been created, the value is kept in this
`ResourceBundle` in order to avoid producing the
same `Set` in subsequent calls. Subclasses can
override this method for faster handling.

**Returns:** a `Set` of the keys contained only in this
       `ResourceBundle`

**Since:** 1.6

## ResourceBundle.FORMAT_DEFAULT

```java
public static final List<String> FORMAT_DEFAULT
```

The default format `List`, which contains the strings
`"java.class"` and `"java.properties"`, in
this order. This `List` is unmodifiable.

**See also:** #getFormats(String)

## ResourceBundle.FORMAT_CLASS

```java
public static final List<String> FORMAT_CLASS
```

The class-only format `List` containing
`"java.class"`. This `List` is unmodifiable.

**See also:** #getFormats(String)

## ResourceBundle.FORMAT_PROPERTIES

```java
public static final List<String> FORMAT_PROPERTIES
```

The properties-only format `List` containing
`"java.properties"`. This `List` is unmodifiable.

**See also:** #getFormats(String)

## ResourceBundle.TTL_DONT_CACHE

```java
public static final long TTL_DONT_CACHE
```

The time-to-live constant for not caching loaded resource bundle
instances.

**See also:** #getTimeToLive(String, Locale)

## ResourceBundle.TTL_NO_EXPIRATION_CONTROL

```java
public static final long TTL_NO_EXPIRATION_CONTROL
```

The time-to-live constant for disabling the expiration control
for loaded resource bundle instances in the cache.

**See also:** #getTimeToLive(String, Locale)

## ResourceBundle.Control()

```java
protected Control()
```

Sole constructor. (For invocation by subclass constructors,
typically implicit.)

## ResourceBundle.getControl(List<String>)

```java
public static final Control getControl(List<String> formats)
```

Returns a `ResourceBundle.Control` in which the getFormats method returns the specified
`formats`. The `formats` must be equal to
one of `Control.FORMAT_PROPERTIES`, `Control.FORMAT_CLASS` or `Control.FORMAT_DEFAULT`. `ResourceBundle.Control`
instances returned by this method are singletons and thread-safe.

Specifying `Control.FORMAT_DEFAULT` is equivalent to
instantiating the `ResourceBundle.Control` class,
except that this method returns a singleton.

Parameters:

- `formats`: the formats to be returned by the `ResourceBundle.Control.getFormats` method

**Returns:** a `ResourceBundle.Control` supporting the
       specified `formats`

Throws:

- `NullPointerException`: if `formats` is `null`
- `IllegalArgumentException`: if `formats` is unknown

## ResourceBundle.getNoFallbackControl(List<String>)

```java
public static final Control getNoFallbackControl(List<String> formats)
```

Returns a `ResourceBundle.Control` in which the getFormats method returns the specified
`formats` and the Locale) getFallbackLocale
method returns `null`. The `formats` must
be equal to one of `Control.FORMAT_PROPERTIES`, `Control.FORMAT_CLASS` or `Control.FORMAT_DEFAULT`.
`ResourceBundle.Control` instances returned by this
method are singletons and thread-safe.

Parameters:

- `formats`: the formats to be returned by the `ResourceBundle.Control.getFormats` method

**Returns:** a `ResourceBundle.Control` supporting the
       specified `formats` with no fallback
       `Locale` support

Throws:

- `NullPointerException`: if `formats` is `null`
- `IllegalArgumentException`: if `formats` is unknown

## ResourceBundle.getFormats(String)

```java
public List<String> getFormats(String baseName)
```

Returns a `List` of `String`s containing
formats to be used to load resource bundles for the given
`baseName`. The `ResourceBundle.getBundle`
factory method tries to load resource bundles with formats in the
order specified by the list. The list returned by this method
must have at least one `String`. The predefined
formats are `"java.class"` for class-based resource
bundles and `"java.properties"` for properties-based ones. Strings starting
with `"java."` are reserved for future extensions and
must not be used by application-defined formats.

It is not a requirement to return an immutable (unmodifiable)
`List`.  However, the returned `List` must
not be mutated after it has been returned by
`getFormats`.

The default implementation returns `FORMAT_DEFAULT` so
that the `ResourceBundle.getBundle` factory method
looks up first class-based resource bundles, then
properties-based ones.

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name

**Returns:** a `List` of `String`s containing
       formats for loading resource bundles.

**See also:** #FORMAT_DEFAULT

**See also:** #FORMAT_CLASS

**See also:** #FORMAT_PROPERTIES

Throws:

- `NullPointerException`: if `baseName` is null
