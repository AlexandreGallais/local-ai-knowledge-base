# AbstractResourceBundleProvider class (java.util.spi)

```java
public abstract class AbstractResourceBundleProvider implements ResourceBundleProvider
```

{@code AbstractResourceBundleProvider} is an abstract class that provides
the basic support for a provider implementation class for
{@link ResourceBundleProvider}.

<p>
Resource bundles can be packaged in one or more
named modules, <em>service provider modules</em>.  The <em>consumer</em> of the
resource bundle is the one calling {@link ResourceBundle#getBundle(String)}.
In order for the consumer module to load a resource bundle
"{@code com.example.app.MyResources}" provided by another module,
it will use the {@linkplain java.util.ServiceLoader service loader}
mechanism.  A service interface named "{@code com.example.app.spi.MyResourcesProvider}"
must be defined and a <em>service provider module</em> will provide an
implementation class of "{@code com.example.app.spi.MyResourcesProvider}"
as follows:

<blockquote><pre>
{@code import com.example.app.spi.MyResourcesProvider;
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
}}</pre></blockquote>
<p>
Refer to {@link ResourceBundleProvider} for details.

@see ResourceBundle##resource-bundle-modules Resource Bundles and Named Modules
@since 9

## AbstractResourceBundleProvider.AbstractResourceBundleProvider()

```java
protected AbstractResourceBundleProvider()
```

Constructs an {@code AbstractResourceBundleProvider} with the
"java.properties" format. This constructor is equivalent to
{@code AbstractResourceBundleProvider("java.properties")}.

## AbstractResourceBundleProvider.AbstractResourceBundleProvider(String...)

```java
protected AbstractResourceBundleProvider(String... formats)
```

Constructs an {@code AbstractResourceBundleProvider} with the specified
{@code formats}. The {@link #getBundle(String, Locale)} method looks up
resource bundles for the given {@code formats}. {@code formats} must
be "java.class" or "java.properties".

@param formats the formats to be used for loading resource bundles
@throws NullPointerException if the given {@code formats} is null
@throws IllegalArgumentException if the given {@code formats} is not
        "java.class" or "java.properties".

## AbstractResourceBundleProvider.toBundleName(String, Locale)

```java
protected String toBundleName(String baseName, Locale locale)
```

Returns the bundle name for the given {@code baseName} and {@code
locale} that this provider provides.

@apiNote
A resource bundle provider may package its resource bundles in the
same package as the base name of the resource bundle if the package
is not split among other named modules.  If there are more than one
bundle providers providing the resource bundle of a given base name,
the resource bundles can be packaged with per-language grouping
or per-region grouping to eliminate the split packages.

<p>For example, if {@code baseName} is {@code "p.resources.Bundle"} then
the resource bundle name of {@code "p.resources.Bundle"} of
<code style="white-space:nowrap">Locale("ja", "", "XX")</code>
and {@code Locale("en")} could be <code style="white-space:nowrap">
"p.resources.ja.Bundle_ja_&thinsp;_XX"</code> and
{@code "p.resources.Bundle_en"} respectively.

<p> This method is called from the default implementation of the
{@link #getBundle(String, Locale)} method.

@implNote The default implementation of this method is the same as the
implementation of
{@link java.util.ResourceBundle.Control#toBundleName(String, Locale)}.

@param baseName the base name of the resource bundle, a fully qualified
                class name
@param locale   the locale for which a resource bundle should be loaded
@return the bundle name for the resource bundle

## AbstractResourceBundleProvider.getBundle(String, Locale)

```java
public ResourceBundle getBundle(String baseName, Locale locale)
```

Returns a {@code ResourceBundle} for the given {@code baseName} and
{@code locale}.

@implNote
The default implementation of this method calls the
{@link #toBundleName(String, Locale) toBundleName} method to get the
bundle name for the {@code baseName} and {@code locale} and finds the
resource bundle of the bundle name local in the module of this provider.
It will only search the formats specified when this provider was
constructed.

@param baseName the base bundle name of the resource bundle, a fully
                qualified class name.
@param locale the locale for which the resource bundle should be instantiated
@return {@code ResourceBundle} of the given {@code baseName} and
        {@code locale}, or {@code null} if no resource bundle is found
@throws NullPointerException if {@code baseName} or {@code locale} is
        {@code null}
@throws UncheckedIOException if any IO exception occurred during resource
        bundle loading