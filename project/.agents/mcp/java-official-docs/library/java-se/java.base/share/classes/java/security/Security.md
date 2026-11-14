# Security class (java.security)

```java
public final class Security
```

<p>This class centralizes all security properties and common security
methods. One of its primary uses is to manage providers.

<p>The default values of security properties are read from an
implementation-specific location, which is typically the properties file
{@code conf/security/java.security} in the Java installation directory.

@implNote If the properties file fails to load, the JDK implementation will
throw an unspecified error when initializing the {@code Security} class.

@author Benjamin Renaud
@since 1.1

## Security.getAlgorithmProperty(String, String)

```java
public static String getAlgorithmProperty(String algName, String propName)
```

Gets a specified property for an algorithm. The algorithm name
should be a standard name. See the <a href=
"{@docRoot}/../specs/security/standard-names.html">
Java Security Standard Algorithm Names Specification</a>
for information about standard algorithm names.

One possible use is by specialized algorithm parsers, which may map
classes to algorithms which they understand (much like Key parsers
do).

@param algName the algorithm name.

@param propName the name of the property to get.

@return the value of the specified property.

@spec security/standard-names.html Java Security Standard Algorithm Names
@deprecated This method used to return the value of a proprietary
property in the master file of the "SUN" Cryptographic Service
Provider in order to determine how to parse algorithm-specific
parameters. Use the new provider-based and algorithm-independent
{@code AlgorithmParameters} and {@code KeyFactory} engine
classes (introduced in the J2SE version 1.2 platform) instead.

## Security.insertProviderAt(Provider, int)

```java
public static synchronized int insertProviderAt(Provider provider, int position)
```

Adds a new provider, at a specified position. The position is
the preference order in which providers are searched for
requested algorithms.  The position is 1-based, that is,
1 is most preferred, followed by 2, and so on.  If the position
is less than 1 or greater than n, where n is the number of installed
providers, the provider (if not already installed) is inserted at
the end of the list, or at the n + 1 position.

<p>If the given provider is installed at the requested position,
the provider that used to be at that position, and all providers
with a position greater than {@code position}, are shifted up
one position (towards the end of the list of installed providers).

<p>A provider cannot be added if it is already installed.

@param provider the provider to be added.

@param position the preference position that the caller would
like for this provider.

@return the actual preference position in which the provider was
added, or -1 if the provider was not added because it is
already installed.

@throws  NullPointerException if provider is {@code null}

@see #getProvider
@see #removeProvider

## Security.addProvider(Provider)

```java
public static int addProvider(Provider provider)
```

Adds a provider to the next position available.

@param provider the provider to be added.

@return the preference position in which the provider was
added, or -1 if the provider was not added because it is
already installed.

@throws  NullPointerException if provider is {@code null}

@see #getProvider
@see #removeProvider

## Security.removeProvider(String)

```java
public static synchronized void removeProvider(String name)
```

Removes the provider with the specified name.

<p>When the specified provider is removed, all providers located
at a position greater than where the specified provider was are shifted
down one position (towards the head of the list of installed
providers).

<p>This method returns silently if the provider is not installed or
if name is {@code null}.

@param name the name of the provider to remove.

@see #getProvider
@see #addProvider

## Security.getProviders()

```java
public static Provider[] getProviders()
```

Returns an array containing all the installed providers. The order of
the providers in the array is their preference order.

@return an array of all the installed providers.

## Security.getProvider(String)

```java
public static Provider getProvider(String name)
```

Returns the provider installed with the specified name, if
any. Returns {@code null} if no provider with the specified name is
installed or if name is {@code null}.

@param name the name of the provider to get.

@return the provider of the specified name.

@see #removeProvider
@see #addProvider

## Security.getProviders(String)

```java
public static Provider[] getProviders(String filter)
```

Returns an array containing all installed providers that satisfy the
specified selection criterion, or {@code null} if no such providers
have been installed. The returned providers are ordered
according to their
{@linkplain #insertProviderAt(java.security.Provider, int) preference order}.

<p> A cryptographic service is always associated with a particular
algorithm or type. For example, a digital signature service is
always associated with a particular algorithm (e.g., DSA),
and a CertificateFactory service is always associated with
a particular certificate type (e.g., X.509).

<p>The selection criterion must be specified in one of the following two
formats:
<ul>
<li> <i>{@literal <crypto_service>.<algorithm_or_type>}</i>
<p> The cryptographic service name must not contain any dots.
<p> A
provider satisfies the specified selection criterion iff the provider
implements the
specified algorithm or type for the specified cryptographic service.
<p> For example, "CertificateFactory.X.509"
would be satisfied by any provider that supplied
a CertificateFactory implementation for X.509 certificates.
<li> <i>{@literal <crypto_service>.<algorithm_or_type>
<attribute_name>:<attribute_value>}</i>
<p> The cryptographic service name must not contain any dots. There
must be one or more space characters between the
<i>{@literal <algorithm_or_type>}</i> and the
<i>{@literal <attribute_name>}</i>.
 <p> A provider satisfies this selection criterion iff the
provider implements the specified algorithm or type for the specified
cryptographic service and its implementation meets the
constraint expressed by the specified attribute name/value pair.
<p> For example, "Signature.SHA1withDSA KeySize:1024" would be
satisfied by any provider that implemented
the SHA1withDSA signature algorithm with a keysize of 1024 (or larger).

</ul>

<p> See the <a href=
"{@docRoot}/../specs/security/standard-names.html">
Java Security Standard Algorithm Names Specification</a>
for information about standard cryptographic service names, standard
algorithm names and standard attribute names.

@param filter the criterion for selecting
providers. The filter is case-insensitive.

@return all the installed providers that satisfy the selection
criterion, or {@code null} if no such providers have been installed.

@throws InvalidParameterException
        if the filter is not in the required format
@throws NullPointerException if filter is {@code null}

@spec security/standard-names.html Java Security Standard Algorithm Names
@see #getProviders(java.util.Map)
@since 1.3

## Security.getProviders(Map<String,String>)

```java
public static Provider[] getProviders(Map<String,String> filter)
```

Returns an array containing all installed providers that satisfy the
specified selection criteria, or {@code null} if no such providers have
been installed. The returned providers are ordered
according to their
{@linkplain #insertProviderAt(java.security.Provider, int)
preference order}.

<p>The selection criteria are represented by a map.
Each map entry represents a selection criterion.
A provider is selected iff it satisfies all selection
criteria. The key for any entry in such a map must be in one of the
following two formats:
<ul>
<li> <i>{@literal <crypto_service>.<algorithm_or_type>}</i>
<p> The cryptographic service name must not contain any dots.
<p> The value associated with the key must be an empty string.
<p> A provider
satisfies this selection criterion iff the provider implements the
specified algorithm or type for the specified cryptographic service.
<li>  <i>{@literal <crypto_service>}.
{@literal <algorithm_or_type> <attribute_name>}</i>
<p> The cryptographic service name must not contain any dots. There
must be one or more space characters between the
<i>{@literal <algorithm_or_type>}</i>
and the <i>{@literal <attribute_name>}</i>.
<p> The value associated with the key must be a non-empty string.
A provider satisfies this selection criterion iff the
provider implements the specified algorithm or type for the specified
cryptographic service and its implementation meets the
constraint expressed by the specified attribute name/value pair.
</ul>

<p> See the <a href=
"{@docRoot}/../specs/security/standard-names.html">
Java Security Standard Algorithm Names Specification</a>
for information about standard cryptographic service names, standard
algorithm names and standard attribute names.

@param filter the criteria for selecting
providers. The filter is case-insensitive.

@return all the installed providers that satisfy the selection
criteria, or {@code null} if no such providers have been installed.

@throws InvalidParameterException
        if the filter is not in the required format
@throws NullPointerException if filter is {@code null}

@spec security/standard-names.html Java Security Standard Algorithm Names
@see #getProviders(java.lang.String)
@since 1.3

## Security.getProperty(String)

```java
public static String getProperty(String key)
```

Gets a security property value.

@param key the key of the property being retrieved.

@return the value of the security property, or {@code null} if there
         is no property with that key.

@throws  NullPointerException if key is {@code null}
@throws  IllegalArgumentException if key is reserved and cannot be
         used as a Security property name. Reserved keys are:
         "include".

@see #setProperty

## Security.setProperty(String, String)

```java
public static void setProperty(String key, String datum)
```

Sets a security property value.

@param key the name of the property to be set.

@param datum the value of the property to be set.

@throws  NullPointerException if key or datum is {@code null}
@throws  IllegalArgumentException if key is reserved and cannot be
         used as a Security property name. Reserved keys are:
         "include".

@see #getProperty

## Security.getAlgorithms(String)

```java
public static Set<String> getAlgorithms(String serviceName)
```

Returns a Set of {@code String} objects containing the names of all
available algorithms or types for the specified Java cryptographic
service (e.g., {@code Signature}, {@code MessageDigest}, {@code Cipher},
{@code Mac}, {@code KeyStore}).
Returns an empty set if there is no provider that supports the
specified service or if {@code serviceName} is {@code null}.
For a complete list of Java cryptographic services, please see the
{@extLink security_guide_jca
Java Cryptography Architecture (JCA) Reference Guide}.
Note: the returned set is immutable.

@param serviceName the name of the Java cryptographic
service (e.g., {@code Signature}, {@code MessageDigest}, {@code Cipher},
{@code Mac}, {@code KeyStore}).
Note: this parameter is case-insensitive.

@return a Set of {@code String} objects containing the names of all
available algorithms or types for the specified Java cryptographic
service or an empty set if no provider supports the specified service.

@since 1.4