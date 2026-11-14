---
title: "Provider class (java.security) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Provider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Provider class (java.security)

```java
public abstract class Provider extends Properties
```

This class represents a "provider" for the
Java Security API, where a provider implements some or all parts of
Java Security. Services that a provider may implement include:

- Algorithms (such as DSA, RSA, or SHA-256).

- Key <example-value>, conversion, and management facilities (such as for
algorithm-specific keys).

Some provider implementations may encounter unrecoverable internal
errors during their operation, for example a failure to communicate with a
security token. A `ProviderException` should be used to indicate
such errors.

Please note that a provider can be used to implement any security
service in Java that uses a pluggable architecture with a choice
of implementations that fit underneath.

The service type `Provider` is reserved for use by the
security framework. Services of this type cannot be added, removed,
or modified by applications.
The following attributes are automatically placed in each Provider object:

**Attributes Automatically Placed in a Provider Object**

NameValue

`Provider.id name`
    `String.valueOf(provider.getName())`
`Provider.id version`
    `String.valueOf(provider.getVersionStr())`
`Provider.id info`
    `String.valueOf(provider.getInfo())`
`Provider.id className`
    `provider.getClass().getName()`

Each provider has a name and a version string. A provider normally
identifies itself with a file named `java.security.Provider`
in the resource directory `META-INF/services`.
Security providers are looked up via the `ServiceLoader` mechanism
using the application class loader.

Providers may be configured such that they are automatically
installed and made available at runtime via the
Security.getProviders() method.
The mechanism for configuring and installing security providers is
implementation-specific.

**Implementation note:** The JDK implementation supports static registration of the security
providers via the `conf/security/java.security` file in the Java
installation directory. These providers are automatically installed by
the JDK runtime, see
in the Java Cryptography Architecture (JCA) Reference Guide
for information about how a particular type of provider, the cryptographic
service provider, works and is installed.

**Since:** 1.1

## Provider.Provider(String, double, String)

```java
protected Provider(String name, double version, String info)
```

Constructs a `Provider` with the specified name, version number,
and information. Calling this constructor is equivalent to call the
String, String) with `name`
name, `Double.toString(version)`, and `info`.

Parameters:

- `name`: the provider name.
- `version`: the provider version number.
- `info`: a description of the provider and its services.

**Deprecated:** use String, String) instead.

## Provider.Provider(String, String, String)

```java
protected Provider(String name, String versionStr, String info)
```

Constructs a `Provider` with the specified name, version string,
and information.

The version string contains a version number optionally followed
by other information separated by one of the characters of '+', '-'.

The format for the version number is:

```java
    ^[0-9]+(\.[0-9]+)*
```

In order to return the version number in a double, when there are
more than two components (separated by '.' as defined above), only
the first two components are retained. The resulting string is then
passed to `Double.valueOf(String)` to generate version number,
i.e. `getVersion`.

If the conversion failed, value 0 will be used.

Parameters:

- `name`: the provider name.
- `versionStr`: the provider version string.
- `info`: a description of the provider and its services.

**Since:** 9

## Provider.configure(String)

```java
public Provider configure(String configArg)
```

Apply the supplied configuration argument to this `Provider`
instance and return the configured `Provider`. Note that if
this `Provider` cannot be configured in-place, a new
`Provider` will be created and returned. Therefore,
callers should always use the returned `Provider`.

Parameters:

- `configArg`: the configuration information for configuring this provider.

**Implementation requirements:** The default implementation throws `UnsupportedOperationException`.
Subclasses should override this method only if a configuration argument
is supported.

**Returns:** a `Provider` configured with the supplied configuration
        argument.

**Since:** 9

Throws:

- `UnsupportedOperationException`: if a configuration argument is not supported.
- `NullPointerException`: if the supplied configuration argument is `null`.
- `InvalidParameterException`: if the supplied configuration argument is invalid.

## Provider.isConfigured()

```java
public boolean isConfigured()
```

Check if this `Provider` instance has been configured.

**Implementation requirements:** The default implementation returns `true`.
Subclasses should override this method if the `Provider` requires
an explicit `configure` call after being constructed.

**Returns:** `true` if no further configuration is needed,
`false` otherwise.

**Since:** 9

## Provider.getName()

```java
public String getName()
```

Returns the name of this `Provider`.

**Returns:** the name of this `Provider`.

## Provider.getVersion()

```java
public double getVersion()
```

Returns the version number for this `Provider`.

**Returns:** the version number for this `Provider`.

**Deprecated:** use `getVersionStr` instead.

## Provider.getVersionStr()

```java
public String getVersionStr()
```

Returns the version string for this `Provider`.

**Returns:** the version string for this `Provider`.

**Since:** 9

## Provider.getInfo()

```java
public String getInfo()
```

Returns a human-readable description of the `Provider` and its
services.  This may return an HTML page, with relevant links.

**Returns:** a description of the `Provider` and its services.

## Provider.toString()

```java
public String toString()
```

Returns a string with the name and the version string
of this `Provider`.

**Returns:** the string with the name and the version string
for this `Provider`.

## Provider.clear()

```java
public synchronized void clear()
```

Clears this `Provider` so that it no longer contains the properties
used to look up facilities implemented by the `Provider`.

**Since:** 1.2

## Provider.load(InputStream)

```java
public synchronized void load(InputStream inStream) throws IOException
```

Reads a property list (key and element pairs) from the input stream.

Parameters:

- `inStream`: the input stream.

**See also:** java.util.Properties#load

Throws:

- `IOException`: if an error occurred when reading from the input stream.

## Provider.putAll(Map<?,?>)

```java
public synchronized void putAll(Map<?,?> t)
```

Copies all the mappings from the specified Map to this `Provider`.
These mappings will replace any properties that this `Provider` had
for any of the keys currently in the specified Map.

**Since:** 1.2

## Provider.entrySet()

```java
public synchronized Set<Map.Entry<Object,Object>> entrySet()
```

Returns an unmodifiable Set view of the property entries contained
in this `Provider`.

**See also:** java.util.Map.Entry

**Since:** 1.2

## Provider.keySet()

```java
public Set<Object> keySet()
```

Returns an unmodifiable Set view of the property keys contained in
this `Provider`.

**Since:** 1.2

## Provider.values()

```java
public Collection<Object> values()
```

Returns an unmodifiable Collection view of the property values
contained in this `Provider`.

**Since:** 1.2

## Provider.put(Object, Object)

```java
public synchronized Object put(Object key, Object value)
```

Sets the `key` property to have the specified
`value`.

**Since:** 1.2

## Provider.putIfAbsent(Object, Object)

```java
public synchronized Object putIfAbsent(Object key, Object value)
```

If the specified key is not already associated with a value (or is mapped
to `null`) associates it with the given value and returns
`null`, else returns the current value.

**Since:** 1.8

## Provider.remove(Object)

```java
public synchronized Object remove(Object key)
```

Removes the `key` property (and its corresponding
`value`).

**Since:** 1.2

## Provider.remove(Object, Object)

```java
public synchronized boolean remove(Object key, Object value)
```

Removes the entry for the specified key only if it is currently
mapped to the specified value.

**Since:** 1.8

## Provider.replace(Object, Object, Object)

```java
public synchronized boolean replace(Object key, Object oldValue, Object newValue)
```

Replaces the entry for the specified key only if currently
mapped to the specified value.

**Since:** 1.8

## Provider.replace(Object, Object)

```java
public synchronized Object replace(Object key, Object value)
```

Replaces the entry for the specified key only if it is
currently mapped to some value.

**Since:** 1.8

## Provider.replaceAll(BiFunction<? super Object, ? super Object, ? extends Object>)

```java
public synchronized void replaceAll(BiFunction<? super Object, ? super Object, ? extends Object> function)
```

Replaces each entry's value with the result of invoking the given
function on that entry, in the order entries are returned by an entry
set iterator, until all entries have been processed or the function
throws an exception.

**Since:** 1.8

## Provider.compute(Object, BiFunction<? super Object, ? super Object, ? extends Object>)

```java
public synchronized Object compute(Object key, BiFunction<? super Object, ? super Object, ? extends Object> remappingFunction)
```

Attempts to compute a mapping for the specified key and its
current mapped value (or `null` if there is no current
mapping).

**Since:** 1.8

## Provider.computeIfAbsent(Object, Function<? super Object, ? extends Object>)

```java
public synchronized Object computeIfAbsent(Object key, Function<? super Object, ? extends Object> mappingFunction)
```

If the specified key is not already associated with a value (or
is mapped to `null`), attempts to compute its value using
the given mapping function and enters it into this map unless
`null`.

**Since:** 1.8

## Provider.computeIfPresent(Object, BiFunction<? super Object, ? super Object, ? extends Object>)

```java
public synchronized Object computeIfPresent(Object key, BiFunction<? super Object, ? super Object, ? extends Object> remappingFunction)
```

If the value for the specified key is present and non-null, attempts to
compute a new mapping given the key and its current mapped value.

**Since:** 1.8

## Provider.merge(Object, Object, BiFunction<? super Object, ? super Object, ? extends Object>)

```java
public synchronized Object merge(Object key, Object value, BiFunction<? super Object, ? super Object, ? extends Object> remappingFunction)
```

If the specified key is not already associated with a value or is
associated with `null`, associates it with the given value.
Otherwise, replaces the value with the results of the given remapping
function, or removes if the result is `null`. This method may be
of use when combining multiple mapped values for a key.

**Since:** 1.8

## Provider.getOrDefault(Object, Object)

```java
public synchronized Object getOrDefault(Object key, Object defaultValue)
```

**Since:** 1.8

## Provider.forEach(BiConsumer<? super Object, ? super Object>)

```java
public synchronized void forEach(BiConsumer<? super Object, ? super Object> action)
```

**Since:** 1.8

## Provider.getService(String, String)

```java
public Service getService(String type, String algorithm)
```

Get the service describing this Provider's implementation of the
specified type of this algorithm or alias. If no such
implementation exists, this method returns `null`. If there are two
matching services, one added to this provider using
putService() and one added via put(),
the service added via putService() is returned.

Parameters:

- `type`: the type of service requested (for example, `MessageDigest`)
- `algorithm`: the case-insensitive algorithm name (or alternate alias) of the service requested (for example, `SHA-1`)

**Returns:** the service describing this Provider's matching service
or `null` if no such service exists

**Since:** 1.5

Throws:

- `NullPointerException`: if type or algorithm is `null`

## Provider.getServices()

```java
public Set<Service> getServices()
```

Get an unmodifiable Set of all services supported by
this `Provider`.

**Returns:** an unmodifiable Set of all services supported by
this `Provider`

**Since:** 1.5

## Provider.putService(Service)

```java
protected void putService(Service s)
```

Add a service. If a service of the same type with the same algorithm
name exists, and it was added using putService(),
it is replaced by the new service.
This method also places information about this service
in the provider's Hashtable values in the format described in the
.

Parameters:

- `s`: the Service to add

**Since:** 1.5

Throws:

- `NullPointerException`: if s is `null`

## Provider.removeService(Service)

```java
protected void removeService(Service s)
```

Remove a service previously added using
putService(). The specified service is removed from
this `Provider`. It will no longer be returned by
getService() and its information will be removed
from this provider's Hashtable.

Parameters:

- `s`: the Service to be removed

**Since:** 1.5

Throws:

- `NullPointerException`: if s is `null`

## Provider.Service(Provider, String, String, String, List<String>, Map<String,String>)

```java
public Service(Provider provider, String type, String algorithm, String className, List<String> aliases, Map<String,String> attributes)
```

Construct a new service.

Parameters:

- `provider`: the provider that offers this service
- `type`: the type of this service
- `algorithm`: the algorithm name
- `className`: the name of the class implementing this service
- `aliases`: List of aliases or `null` if algorithm has no aliases
- `attributes`: Map of attributes or `null` if this implementation has no attributes

Throws:

- `NullPointerException`: if provider, type, algorithm, or className is `null`

## Provider.getType()

```java
public final String getType()
```

Get the type of this service. For example, `MessageDigest`.

**Returns:** the type of this service

## Provider.getAlgorithm()

```java
public final String getAlgorithm()
```

Return the name of the algorithm of this service. For example,
`SHA-1`.

**Returns:** the algorithm of this service

## Provider.getProvider()

```java
public final Provider getProvider()
```

Return the Provider of this service.

**Returns:** the Provider of this service

## Provider.getClassName()

```java
public final String getClassName()
```

Return the name of the class implementing this service.

**Returns:** the name of the class implementing this service
