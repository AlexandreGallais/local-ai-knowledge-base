---
title: "AbstractResourceBundleProvider class (java.util.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/spi/AbstractResourceBundleProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractResourceBundleProvider class (java.util.spi)

```java
public abstract class AbstractResourceBundleProvider implements ResourceBundleProvider
```

`AbstractResourceBundleProvider` is an abstract class that provides
the basic <example-value> for a provider implementation class for
`ResourceBundleProvider`.

Resource bundles can be packaged in one or more
named modules, *service provider modules*.  The *consumer* of the
resource bundle is the one calling `ResourceBundle.getBundle(String)`.
In order for the consumer module to load a resource bundle
"`com.example.app.MyResources`" provided by another module,
it will use the service loader
mechanism.  A service interface named "`com.example.app.spi.MyResourcesProvider`"
must be defined and a *service provider module* will provide an
implementation class of "`com.example.app.spi.MyResourcesProvider`"
as follows:

```java
import com.example.app.spi.MyResourcesProvider;
class MyResourcesProviderImpl extends AbstractResourceBundleProvider
    implements MyResourcesProvider
{
    public MyResourcesProviderImpl() {
        super("java.properties");
    }
    // this provider maps the resource bundle to per-language package
    protected String toBundleName(String baseName, Locale locale) {
        return "p." + locale.getLanguage() + "." + baseName;
    }

    public ResourceBundle getBundle(String baseName, Locale locale) {
        // this module only provides bundles in French
        if (locale.equals(Locale.FRENCH)) {
             return super.getBundle(baseName, locale);
        }
        // otherwise return null
        return null;
    }
}
```

Refer to `ResourceBundleProvider` for details.

**See also:** ResourceBundle##resource-bundle-modules Resource Bundles and Named Modules

**Since:** 9

## AbstractResourceBundleProvider.AbstractResourceBundleProvider()

```java
protected AbstractResourceBundleProvider()
```

Constructs an `AbstractResourceBundleProvider` with the
"java.properties" format. This constructor is equivalent to
`AbstractResourceBundleProvider("java.properties")`.

## AbstractResourceBundleProvider.AbstractResourceBundleProvider(String...)

```java
protected AbstractResourceBundleProvider(String... formats)
```

Constructs an `AbstractResourceBundleProvider` with the specified
`formats`. The Locale) method looks up
resource bundles for the given `formats`. `formats` must
be "java.class" or "java.properties".

Parameters:

- `formats`: the formats to be used for loading resource bundles

Throws:

- `NullPointerException`: if the given `formats` is null
- `IllegalArgumentException`: if the given `formats` is not "java.class" or "java.properties".

## AbstractResourceBundleProvider.toBundleName(String, Locale)

```java
protected String toBundleName(String baseName, Locale locale)
```

Returns the bundle name for the given `baseName` and `locale` that this provider provides.

Parameters:

- `baseName`: the base name of the resource bundle, a fully qualified class name
- `locale`: the locale for which a resource bundle should be loaded

**API note:** A resource bundle provider may package its resource bundles in the
same package as the base name of the resource bundle if the package
is not split among other named modules.  If there are more than one
bundle providers providing the resource bundle of a given base name,
the resource bundles can be packaged with per-language grouping
or per-region grouping to eliminate the split packages.

For example, if `baseName` is `"p.resources.Bundle"` then
the resource bundle name of `"p.resources.Bundle"` of
Locale("ja", "", "XX")
and `Locale("en")` could be
"p.resources.ja.Bundle_ja_&thinsp;_XX" and
`"p.resources.Bundle_en"` respectively.

 This method is called from the default implementation of the
Locale) method.

**Implementation note:** The default implementation of this method is the same as the
implementation of
Locale).

**Returns:** the bundle name for the resource bundle

## AbstractResourceBundleProvider.getBundle(String, Locale)

```java
public ResourceBundle getBundle(String baseName, Locale locale)
```

Returns a `ResourceBundle` for the given `baseName` and
`locale`.

Parameters:

- `baseName`: the base bundle name of the resource bundle, a fully qualified class name.
- `locale`: the locale for which the resource bundle should be instantiated

**Implementation note:** The default implementation of this method calls the
Locale) toBundleName method to get the
bundle name for the `baseName` and `locale` and finds the
resource bundle of the bundle name local in the module of this provider.
It will only search the formats specified when this provider was
constructed.

**Returns:** `ResourceBundle` of the given `baseName` and
        `locale`, or `null` if no resource bundle is found

Throws:

- `NullPointerException`: if `baseName` or `locale` is `null`
- `UncheckedIOException`: if any IO exception occurred during resource bundle loading
