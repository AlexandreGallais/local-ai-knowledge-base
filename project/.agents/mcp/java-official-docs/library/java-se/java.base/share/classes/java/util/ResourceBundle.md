---
title: "ResourceBundle class (java.util) (part 1 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/ResourceBundle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ResourceBundle class (java.util)

```java
public abstract class ResourceBundle
```

Resource bundles contain locale-specific objects.  When your program needs a
locale-specific resource, a `String` for example, your program can
load it from the resource bundle that is appropriate for the current user's
locale. In this way, you can write program code that is largely independent
of the user's locale isolating most, if not all, of the locale-specific
information in resource bundles.

This allows you to write programs that can:

-  be easily localized, or translated, into different languages

-  handle multiple locales at once

-  be easily modified later to support even more locales

Resource bundles belong to families whose members share a common base
name, but whose names also have additional components that identify
their locales. For example, the base name of a family of resource
bundles might be "MyResources". The family should have a default
resource bundle which simply has the same name as its family -
"MyResources" - and will be used as the bundle of last resort if a
specific locale is not supported. The family can then provide as
many locale-specific members as needed, for example a German one
named "MyResources_de".

Each resource bundle in a family contains the same items, but the items have
been translated for the locale represented by that resource bundle.
For example, both "MyResources" and "MyResources_de" may have a
`String` that's used on a button for canceling operations.
In "MyResources" the `String` may contain "Cancel" and in
"MyResources_de" it may contain "Abbrechen".

If there are different resources for different countries, you
can make specializations: for example, "MyResources_de_CH" contains objects for
the German language (de) in Switzerland (CH). If you want to only
modify some of the resources
in the specialization, you can do so.

When your program needs a locale-specific object, it loads
the `ResourceBundle` class using the
java.util.Locale) getBundle
method:

Resource bundles contain key/value pairs. The keys uniquely
identify a locale-specific object in the bundle. Here's an
example of a `ListResourceBundle` that contains
two key/value pairs:

Keys are always `String`s.
In this example, the keys are "OkKey" and "CancelKey".
In the above example, the values
are also `String`s--"OK" and "Cancel"--but
they don't have to be. The values can be any type of object.

You retrieve an object from resource bundle using the appropriate
getter method. Because "OkKey" and "CancelKey"
are both strings, you would use `getString` to retrieve them:

The getter methods all require the key as an argument and return
the object if found. If the object is not found, the getter method
throws a `MissingResourceException`.

Besides `getString`, `ResourceBundle` also provides
a method for getting string arrays, `getStringArray`,
as well as a generic `getObject` method for any other
type of object. When using `getObject`, you'll
have to cast the result to the appropriate type. For example:

The Java Platform provides two subclasses of `ResourceBundle`,
`ListResourceBundle` and `PropertyResourceBundle`,
that provide a fairly simple way to create resources.
As you saw briefly in a previous example, `ListResourceBundle`
manages its resource as a list of key/value pairs.
`PropertyResourceBundle` uses a properties file to manage
its resources.

If `ListResourceBundle` or `PropertyResourceBundle`
do not suit your needs, you can write your own `ResourceBundle`
subclass.  Your subclasses must override two methods: `handleGetObject`
and `getKeys()`.

The implementation of a `ResourceBundle` subclass must be thread-safe
if it's simultaneously used by multiple threads. The default implementations
of the non-abstract methods in this class, and the methods in the direct
known concrete subclasses `ListResourceBundle` and
`PropertyResourceBundle` are thread-safe.

#### Resource Bundles and Named Modules

Resource bundles can be deployed in modules in the following ways:

#### Resource bundles together with an application

Resource bundles can be deployed together with an application in the same
module.  In that case, the resource bundles are loaded
by code in the module by calling the `getBundle(String)`
or Locale) method.

#### Resource bundles as service providers

Resource bundles can be deployed in one or more *service provider modules*
and they can be located using `ServiceLoader`.
A service interface or class must be
defined. The caller module declares that it uses the service, the service
provider modules declare that they provide implementations of the service.
Refer to `ResourceBundleProvider` for developing resource bundle
services and deploying resource bundle providers.
The module obtaining the resource bundle can be a resource bundle
provider itself; in which case this module only locates the resource bundle
via service provider mechanism.

A resource bundle provider can
provide resource bundles in any format such XML which replaces the need
of ResourceBundle.Control.

#### Resource bundles in other modules and class path

Resource bundles in a named module may be *encapsulated* so that
it cannot be located by code in other modules.  Resource bundles
in unnamed modules and class path are open for any module to access.
Resource bundle follows the resource encapsulation rules as specified
in `Module.getResourceAsStream(String)`.

The `getBundle` factory methods with no `Control` parameter
locate and load resource bundles from
service providers.
It may continue the search as if calling `Module.getResourceAsStream(String)`
to find the named resource from a given module and calling
`ClassLoader.getResourceAsStream(String)`; refer to
the specification of the `getBundle` method for details.
Only non-encapsulated resource bundles of "`java.class`"
or "`java.properties`" format are searched.

If the caller module is a resource bundle provider, it does not fall back to the class loader search.

In cases where the `getBundle` factory method is called from a context
where there is no caller frame on the stack (e.g. when called directly from
a JNI attached thread), the caller module is default to the unnamed module for the
system class loader.

#### Resource bundles in automatic modules

A common format of resource bundles is in .properties file format.  Typically `.properties` resource bundles
are packaged in a JAR file.  Resource bundle only JAR file can be readily
deployed as an automatic module.  For example, if the JAR file contains the
entry "`p/q/Foo_ja.properties`" and no `.class` entry,
when resolved and defined as an automatic module, no package is derived
for this module.  This allows resource bundles in `.properties`
format packaged in one or more JAR files that may contain entries
in the same directory and can be resolved successfully as
automatic modules.

#### ResourceBundle.Control

The `ResourceBundle.Control` class provides information necessary
to perform the bundle loading process by the `getBundle`
factory methods that take a `ResourceBundle.Control`
instance. You can implement your own subclass in order to enable
non-standard resource bundle formats, change the search strategy, or
define caching parameters. Refer to the descriptions of the class and the
Locale, ClassLoader, Control) getBundle
factory method for details.

 `ResourceBundle.Control` is designed for an application deployed
in an unnamed module, for example to support resource bundles in
non-standard formats or package localized resources in a non-traditional
convention. `ResourceBundleProvider` is the replacement for
`ResourceBundle.Control` when migrating to modules.
`UnsupportedOperationException` will be thrown when a factory
method that takes the `ResourceBundle.Control` parameter is called.

For the `getBundle` factory
methods that take no `Control` instance, their  default behavior of resource bundle loading
can be modified with custom `ResourceBundleControlProvider` implementations.
If any of the
providers provides a `Control` for the given base name, that `Control` will be used instead of the default `Control`. If there is
more than one service provider for supporting the same base name,
the first one returned from `ServiceLoader` will be used.
A custom `Control` implementation is ignored by named modules.

#### Cache Management

Resource bundle instances created by the `getBundle` factory
methods are cached by default, and the factory methods return the same
resource bundle instance multiple times if it has been
cached. `getBundle` clients may clear the cache, manage the
lifetime of cached resource bundle instances using time-to-live values,
or specify not to cache resource bundle instances. Refer to the
descriptions of the Locale, ClassLoader, Control) {@code getBundle} factory method, clearCache, Locale) ResourceBundle.Control.getTimeToLive, and Locale, String, ClassLoader, ResourceBundle, long) ResourceBundle.Control.needsReload for details.

#### Example

The following is a very simple example of a `ResourceBundle`
subclass, `MyResources`, that manages two resources (for a larger number of
resources you would probably use a `Map`).
Notice that you don't need to supply a value if
a "parent-level" `ResourceBundle` handles the same
key with the same value (as for the okKey below).

You do not have to restrict yourself to using a single family of
`ResourceBundle`s. For example, you could have a set of bundles for
exception messages, `ExceptionResources`
(`ExceptionResources_fr`, `ExceptionResources_de`, ...),
and one for widgets, `WidgetResource` (`WidgetResources_fr`,
`WidgetResources_de`, ...); breaking up the resources however you like.

**See also:** ListResourceBundle

**See also:** PropertyResourceBundle

**See also:** MissingResourceException

**See also:** ResourceBundleProvider

**Since:** 1.1

## ResourceBundle.getBaseBundleName()

```java
public String getBaseBundleName()
```

Returns the base name of this bundle, if known, or `null` if unknown.

If not null, then this is the value of the `baseName` parameter
that was passed to the `ResourceBundle.getBundle(...)` method
when the resource bundle was loaded.

**Returns:** The base name of the resource bundle, as provided to and expected
by the `ResourceBundle.getBundle(...)` methods.

**See also:** #getBundle(java.lang.String, java.util.Locale, java.lang.ClassLoader)

**Since:** 1.8

## ResourceBundle.parent

```java
protected ResourceBundle parent
```

The parent bundle of this bundle.
The parent bundle is searched by getObject
when this bundle does not contain a particular resource.

## ResourceBundle.ResourceBundle()

```java
public ResourceBundle()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## ResourceBundle.getString(String)

```java
public final String getString(String key)
```

Gets a string for the given key from this resource bundle or one of its parents.
Calling this method is equivalent to calling

Parameters:

- `key`: the key for the desired string

**Returns:** the string for the given key

Throws:

- `NullPointerException`: if `key` is `null`
- `MissingResourceException`: if no object for the given key can be found
- `ClassCastException`: if the object found for the given key is not a string

## ResourceBundle.getStringArray(String)

```java
public final String[] getStringArray(String key)
```

Gets a string array for the given key from this resource bundle or one of its parents.
Calling this method is equivalent to calling

Parameters:

- `key`: the key for the desired string array

**Returns:** the string array for the given key

Throws:

- `NullPointerException`: if `key` is `null`
- `MissingResourceException`: if no object for the given key can be found
- `ClassCastException`: if the object found for the given key is not a string array

## ResourceBundle.getObject(String)

```java
public final Object getObject(String key)
```

Gets an object for the given key from this resource bundle or one of its parents.
This method first tries to obtain the object from this resource bundle using
handleGetObject.
If not successful, and the parent resource bundle is not null,
it calls the parent's `getObject` method.
If still not successful, it throws a MissingResourceException.

Parameters:

- `key`: the key for the desired object

**Returns:** the object for the given key

Throws:

- `NullPointerException`: if `key` is `null`
- `MissingResourceException`: if no object for the given key can be found

## ResourceBundle.getLocale()

```java
public Locale getLocale()
```

Returns the locale of this resource bundle. This method can be used after a
call to getBundle() to determine whether the resource bundle returned really
corresponds to the requested locale or is a fallback.

**Returns:** the locale of this resource bundle

## ResourceBundle.setParent(ResourceBundle)

```java
protected void setParent(ResourceBundle parent)
```

Sets the parent bundle of this bundle.
The parent bundle is searched by getObject
when this bundle does not contain a particular resource.

Parameters:

- `parent`: this bundle's parent bundle.

## ResourceBundle.getBundle(String)

```java
public static final ResourceBundle getBundle(String baseName)
```

Gets a resource bundle using the specified base name, the default locale,
and the caller module. Calling this method is equivalent to calling

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name

**Returns:** a resource bundle for the given base name and the default locale

**See also:** Resource Bundle Search and Loading Strategy

**See also:** Resource Bundles and Named Modules

Throws:

- `java.lang.NullPointerException`: if `baseName` is `null`
- `MissingResourceException`: if no resource bundle for the specified base name can be found
