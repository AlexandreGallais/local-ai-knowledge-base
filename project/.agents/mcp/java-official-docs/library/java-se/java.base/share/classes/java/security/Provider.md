# Provider class (java.security)

```java
public abstract class Provider extends Properties
```

This class represents a "provider" for the
Java Security API, where a provider implements some or all parts of
Java Security. Services that a provider may implement include:

<ul>

<li>Algorithms (such as DSA, RSA, or SHA-256).

<li>Key generation, conversion, and management facilities (such as for
algorithm-specific keys).

</ul>

<p>Some provider implementations may encounter unrecoverable internal
errors during their operation, for example a failure to communicate with a
security token. A {@link ProviderException} should be used to indicate
such errors.

<p>Please note that a provider can be used to implement any security
service in Java that uses a pluggable architecture with a choice
of implementations that fit underneath.

<p>The service type {@code Provider} is reserved for use by the
security framework. Services of this type cannot be added, removed,
or modified by applications.
The following attributes are automatically placed in each Provider object:
<table class="striped">
<caption><b>Attributes Automatically Placed in a Provider Object</b></caption>
<thead>
<tr><th scope="col">Name</th><th scope="col">Value</th>
</thead>
<tbody style="text-align:left">
<tr><th scope="row">{@code Provider.id name}</th>
    <td>{@code String.valueOf(provider.getName())}</td>
<tr><th scope="row">{@code Provider.id version}</th>
    <td>{@code String.valueOf(provider.getVersionStr())}</td>
<tr><th scope="row">{@code Provider.id info}</th>
    <td>{@code String.valueOf(provider.getInfo())}</td>
<tr><th scope="row">{@code Provider.id className}</th>
    <td>{@code provider.getClass().getName()}</td>
</tbody>
</table>

<p>Each provider has a name and a version string. A provider normally
identifies itself with a file named {@code java.security.Provider}
in the resource directory {@code META-INF/services}.
Security providers are looked up via the {@link ServiceLoader} mechanism
using the {@link ClassLoader#getSystemClassLoader application class loader}.

<p>Providers may be configured such that they are automatically
installed and made available at runtime via the
{@link Security#getProviders() Security.getProviders()} method.
The mechanism for configuring and installing security providers is
implementation-specific.

@implNote
The JDK implementation supports static registration of the security
providers via the {@code conf/security/java.security} file in the Java
installation directory. These providers are automatically installed by
the JDK runtime, see {@extLink security_guide_jca_provider
The Provider Class}
in the Java Cryptography Architecture (JCA) Reference Guide
for information about how a particular type of provider, the cryptographic
service provider, works and is installed.

@author Benjamin Renaud
@author Andreas Sterbenz
@since 1.1

## Provider.Provider(String, double, String)

```java
protected Provider(String name, double version, String info)
```

Constructs a {@code Provider} with the specified name, version number,
and information. Calling this constructor is equivalent to call the
{@link #Provider(String, String, String)} with {@code name}
name, {@code Double.toString(version)}, and {@code info}.

@param name the provider name.

@param version the provider version number.

@param info a description of the provider and its services.

@deprecated use {@link #Provider(String, String, String)} instead.

## Provider.Provider(String, String, String)

```java
protected Provider(String name, String versionStr, String info)
```

Constructs a {@code Provider} with the specified name, version string,
and information.

<p>The version string contains a version number optionally followed
by other information separated by one of the characters of '+', '-'.

The format for the version number is:

<blockquote><pre>
    ^[0-9]+(\.[0-9]+)*
</pre></blockquote>

<p>In order to return the version number in a double, when there are
more than two components (separated by '.' as defined above), only
the first two components are retained. The resulting string is then
passed to {@link Double#valueOf(String)} to generate version number,
i.e. {@link #getVersion}.
<p>If the conversion failed, value 0 will be used.

@param name the provider name.

@param versionStr the provider version string.

@param info a description of the provider and its services.

@since 9

## Provider.configure(String)

```java
public Provider configure(String configArg)
```

Apply the supplied configuration argument to this {@code Provider}
instance and return the configured {@code Provider}. Note that if
this {@code Provider} cannot be configured in-place, a new
{@code Provider} will be created and returned. Therefore,
callers should always use the returned {@code Provider}.

@implSpec
The default implementation throws {@code UnsupportedOperationException}.
Subclasses should override this method only if a configuration argument
is supported.

@param configArg the configuration information for configuring this
        provider.

@throws UnsupportedOperationException if a configuration argument is
        not supported.
@throws NullPointerException if the supplied configuration argument is
        {@code null}.
@throws InvalidParameterException if the supplied configuration argument
        is invalid.
@return a {@code Provider} configured with the supplied configuration
        argument.

@since 9

## Provider.isConfigured()

```java
public boolean isConfigured()
```

Check if this {@code Provider} instance has been configured.

@implSpec
The default implementation returns {@code true}.
Subclasses should override this method if the {@code Provider} requires
an explicit {@code configure} call after being constructed.

@return {@code true} if no further configuration is needed,
{@code false} otherwise.

@since 9

## Provider.getName()

```java
public String getName()
```

Returns the name of this {@code Provider}.

@return the name of this {@code Provider}.

## Provider.getVersion()

```java
public double getVersion()
```

Returns the version number for this {@code Provider}.

@return the version number for this {@code Provider}.

@deprecated use {@link #getVersionStr} instead.

## Provider.getVersionStr()

```java
public String getVersionStr()
```

Returns the version string for this {@code Provider}.

@return the version string for this {@code Provider}.

@since 9

## Provider.getInfo()

```java
public String getInfo()
```

Returns a human-readable description of the {@code Provider} and its
services.  This may return an HTML page, with relevant links.

@return a description of the {@code Provider} and its services.

## Provider.toString()

```java
public String toString()
```

Returns a string with the name and the version string
of this {@code Provider}.

@return the string with the name and the version string
for this {@code Provider}.

## Provider.clear()

```java
public synchronized void clear()
```

Clears this {@code Provider} so that it no longer contains the properties
used to look up facilities implemented by the {@code Provider}.

@since 1.2

## Provider.load(InputStream)

```java
public synchronized void load(InputStream inStream) throws IOException
```

Reads a property list (key and element pairs) from the input stream.

@param inStream the input stream.
@throws    IOException if an error occurred when reading from the
              input stream.
@see java.util.Properties#load

## Provider.putAll(Map<?,?>)

```java
public synchronized void putAll(Map<?,?> t)
```

Copies all the mappings from the specified Map to this {@code Provider}.
These mappings will replace any properties that this {@code Provider} had
for any of the keys currently in the specified Map.

@since 1.2

## Provider.entrySet()

```java
public synchronized Set<Map.Entry<Object,Object>> entrySet()
```

Returns an unmodifiable Set view of the property entries contained
in this {@code Provider}.

@see   java.util.Map.Entry
@since 1.2

## Provider.keySet()

```java
public Set<Object> keySet()
```

Returns an unmodifiable Set view of the property keys contained in
this {@code Provider}.

@since 1.2

## Provider.values()

```java
public Collection<Object> values()
```

Returns an unmodifiable Collection view of the property values
contained in this {@code Provider}.

@since 1.2

## Provider.put(Object, Object)

```java
public synchronized Object put(Object key, Object value)
```

Sets the {@code key} property to have the specified
{@code value}.

@since 1.2

## Provider.putIfAbsent(Object, Object)

```java
public synchronized Object putIfAbsent(Object key, Object value)
```

If the specified key is not already associated with a value (or is mapped
to {@code null}) associates it with the given value and returns
{@code null}, else returns the current value.

@since 1.8

## Provider.remove(Object)

```java
public synchronized Object remove(Object key)
```

Removes the {@code key} property (and its corresponding
{@code value}).

@since 1.2

## Provider.remove(Object, Object)

```java
public synchronized boolean remove(Object key, Object value)
```

Removes the entry for the specified key only if it is currently
mapped to the specified value.

@since 1.8

## Provider.replace(Object, Object, Object)

```java
public synchronized boolean replace(Object key, Object oldValue, Object newValue)
```

Replaces the entry for the specified key only if currently
mapped to the specified value.

@since 1.8

## Provider.replace(Object, Object)

```java
public synchronized Object replace(Object key, Object value)
```

Replaces the entry for the specified key only if it is
currently mapped to some value.

@since 1.8

## Provider.replaceAll(BiFunction<? super Object, ? super Object, ? extends Object>)

```java
public synchronized void replaceAll(BiFunction<? super Object, ? super Object, ? extends Object> function)
```

Replaces each entry's value with the result of invoking the given
function on that entry, in the order entries are returned by an entry
set iterator, until all entries have been processed or the function
throws an exception.

@since 1.8

## Provider.compute(Object, BiFunction<? super Object, ? super Object, ? extends Object>)

```java
public synchronized Object compute(Object key, BiFunction<? super Object, ? super Object, ? extends Object> remappingFunction)
```

Attempts to compute a mapping for the specified key and its
current mapped value (or {@code null} if there is no current
mapping).

@since 1.8

## Provider.computeIfAbsent(Object, Function<? super Object, ? extends Object>)

```java
public synchronized Object computeIfAbsent(Object key, Function<? super Object, ? extends Object> mappingFunction)
```

If the specified key is not already associated with a value (or
is mapped to {@code null}), attempts to compute its value using
the given mapping function and enters it into this map unless
{@code null}.

@since 1.8

## Provider.computeIfPresent(Object, BiFunction<? super Object, ? super Object, ? extends Object>)

```java
public synchronized Object computeIfPresent(Object key, BiFunction<? super Object, ? super Object, ? extends Object> remappingFunction)
```

If the value for the specified key is present and non-null, attempts to
compute a new mapping given the key and its current mapped value.

@since 1.8

## Provider.merge(Object, Object, BiFunction<? super Object, ? super Object, ? extends Object>)

```java
public synchronized Object merge(Object key, Object value, BiFunction<? super Object, ? super Object, ? extends Object> remappingFunction)
```

If the specified key is not already associated with a value or is
associated with {@code null}, associates it with the given value.
Otherwise, replaces the value with the results of the given remapping
function, or removes if the result is {@code null}. This method may be
of use when combining multiple mapped values for a key.

@since 1.8

## Provider.getOrDefault(Object, Object)

```java
public synchronized Object getOrDefault(Object key, Object defaultValue)
```

@since 1.8

## Provider.forEach(BiConsumer<? super Object, ? super Object>)

```java
public synchronized void forEach(BiConsumer<? super Object, ? super Object> action)
```

@since 1.8

## Provider.getService(String, String)

```java
public Service getService(String type, String algorithm)
```

Get the service describing this Provider's implementation of the
specified type of this algorithm or alias. If no such
implementation exists, this method returns {@code null}. If there are two
matching services, one added to this provider using
{@link #putService putService()} and one added via {@link #put put()},
the service added via {@link #putService putService()} is returned.

@param type the type of {@link Service service} requested
(for example, {@code MessageDigest})
@param algorithm the case-insensitive algorithm name (or alternate
alias) of the service requested (for example, {@code SHA-1})

@return the service describing this Provider's matching service
or {@code null} if no such service exists

@throws NullPointerException if type or algorithm is {@code null}

@since 1.5

## Provider.getServices()

```java
public Set<Service> getServices()
```

Get an unmodifiable Set of all services supported by
this {@code Provider}.

@return an unmodifiable Set of all services supported by
this {@code Provider}

@since 1.5

## Provider.putService(Service)

```java
protected void putService(Service s)
```

Add a service. If a service of the same type with the same algorithm
name exists, and it was added using {@link #putService putService()},
it is replaced by the new service.
This method also places information about this service
in the provider's Hashtable values in the format described in the
{@extLink security_guide_jca
Java Cryptography Architecture (JCA) Reference Guide}.

@param s the Service to add

@throws NullPointerException if s is {@code null}

@since 1.5

## Provider.removeService(Service)

```java
protected void removeService(Service s)
```

Remove a service previously added using
{@link #putService putService()}. The specified service is removed from
this {@code Provider}. It will no longer be returned by
{@link #getService getService()} and its information will be removed
from this provider's Hashtable.

@param s the Service to be removed

@throws NullPointerException if s is {@code null}

@since 1.5

## Provider.Service(Provider, String, String, String, List<String>, Map<String,String>)

```java
public Service(Provider provider, String type, String algorithm, String className, List<String> aliases, Map<String,String> attributes)
```

Construct a new service.

@param provider the provider that offers this service
@param type the type of this service
@param algorithm the algorithm name
@param className the name of the class implementing this service
@param aliases List of aliases or {@code null} if algorithm has no
                  aliases
@param attributes Map of attributes or {@code null} if this
                  implementation has no attributes

@throws NullPointerException if provider, type, algorithm, or
className is {@code null}

## Provider.getType()

```java
public final String getType()
```

Get the type of this service. For example, {@code MessageDigest}.

@return the type of this service

## Provider.getAlgorithm()

```java
public final String getAlgorithm()
```

Return the name of the algorithm of this service. For example,
{@code SHA-1}.

@return the algorithm of this service

## Provider.getProvider()

```java
public final Provider getProvider()
```

Return the Provider of this service.

@return the Provider of this service

## Provider.getClassName()

```java
public final String getClassName()
```

Return the name of the class implementing this service.

@return the name of the class implementing this service

## Provider.getAttribute(String)

```java
public final String getAttribute(String name)
```

Return the value of the specified attribute or {@code null} if this
attribute is not set for this Service.

@param name the name of the requested attribute

@return the value of the specified attribute or {@code null} if the
        attribute is not present

@throws NullPointerException if name is {@code null}

## Provider.newInstance(Object)

```java
public Object newInstance(Object constructorParameter) throws NoSuchAlgorithmException
```

Return a new instance of the implementation described by this
service. The security provider framework uses this method to
construct implementations. Applications will typically not need
to call it.

<p>The default implementation uses reflection to invoke the
standard constructor for this type of service.
Security providers can override this method to implement
instantiation in a different way.
For details and the values of constructorParameter that are
valid for the various types of services see the
{@extLink security_guide_jca
Java Cryptography Architecture (JCA) Reference Guide}.

@param constructorParameter the value to pass to the constructor,
or {@code null} if this type of service does not use a
constructorParameter.

@return a new implementation of this service

@throws InvalidParameterException if the value of
constructorParameter is invalid for this type of service.
@throws NoSuchAlgorithmException if instantiation failed for
any other reason.

## Provider.supportsParameter(Object)

```java
public boolean supportsParameter(Object parameter)
```

Test whether this Service can use the specified parameter.
Returns {@code false} if this service cannot use the parameter.
Returns {@code true} if this service can use the parameter,
if a fast test is infeasible, or if the status is unknown.

<p>The security provider framework uses this method with
some types of services to quickly exclude non-matching
implementations for consideration.
Applications will typically not need to call it.

<p>For details and the values of parameter that are valid for the
various types of services see the top of this class and the
{@extLink security_guide_jca
Java Cryptography Architecture (JCA) Reference Guide}.
Security providers can override it to implement their own test.

@param parameter the parameter to test

@return {@code false} if this service cannot use the specified
parameter; {@code true} if it can possibly use the parameter

@throws InvalidParameterException if the value of parameter is
invalid for this type of service or if this method cannot be
used with this type of service

## Provider.toString()

```java
public String toString()
```

Return a {@code String} representation of this service.

@return a {@code String} representation of this service.