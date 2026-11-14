---
title: "Security class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Security.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Security class (java.security)

```java
public final class Security
```

This class centralizes all security properties and common security
methods. One of its primary uses is to manage providers.

The default values of security properties are read from an
implementation-specific location, which is typically the properties file
`conf/security/java.security` in the Java installation directory.

**Implementation note:** If the properties file fails to load, the JDK implementation will
throw an unspecified error when initializing the `Security` class.

**Since:** 1.1

## Security.getAlgorithmProperty(String, String)

```java
public static String getAlgorithmProperty(String algName, String propName)
```

Gets a specified property for an algorithm. The algorithm name
should be a standard name. See the
Java Security Standard Algorithm Names Specification
for information about standard algorithm names.

One possible use is by specialized algorithm parsers, which may map
classes to algorithms which they understand (much like Key <example-value>
do).

Parameters:

- `algName`: the algorithm name.
- `propName`: the name of the property to get.

**Returns:** the value of the specified property.

**Deprecated:** This method used to return the value of a proprietary
property in the master file of the "SUN" Cryptographic Service
Provider in order to determine how to parse algorithm-specific
parameters. Use the new provider-based and algorithm-independent
`AlgorithmParameters` and `KeyFactory` engine
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

If the given provider is installed at the requested position,
the provider that used to be at that position, and all providers
with a position greater than `position`, are shifted up
one position (towards the end of the list of installed providers).

A provider cannot be added if it is already installed.

Parameters:

- `provider`: the provider to be added.
- `position`: the preference position that the caller would like for this provider.

**Returns:** the actual preference position in which the provider was
added, or -1 if the provider was not added because it is
already installed.

**See also:** #getProvider

**See also:** #removeProvider

Throws:

- `NullPointerException`: if provider is `null`

## Security.addProvider(Provider)

```java
public static int addProvider(Provider provider)
```

Adds a provider to the next position available.

Parameters:

- `provider`: the provider to be added.

**Returns:** the preference position in which the provider was
added, or -1 if the provider was not added because it is
already installed.

**See also:** #getProvider

**See also:** #removeProvider

Throws:

- `NullPointerException`: if provider is `null`

## Security.removeProvider(String)

```java
public static synchronized void removeProvider(String name)
```

Removes the provider with the specified name.

When the specified provider is removed, all providers located
at a position greater than where the specified provider was are shifted
down one position (towards the head of the list of installed
providers).

This method returns silently if the provider is not installed or
if name is `null`.

Parameters:

- `name`: the name of the provider to remove.

**See also:** #getProvider

**See also:** #addProvider

## Security.getProviders()

```java
public static Provider[] getProviders()
```

Returns an array containing all the installed providers. The order of
the providers in the array is their preference order.

**Returns:** an array of all the installed providers.

## Security.getProvider(String)

```java
public static Provider getProvider(String name)
```

Returns the provider installed with the specified name, if
any. Returns `null` if no provider with the specified name is
installed or if name is `null`.

Parameters:

- `name`: the name of the provider to get.

**Returns:** the provider of the specified name.

**See also:** #removeProvider

**See also:** #addProvider

## Security.getProviders(String)

```java
public static Provider[] getProviders(String filter)
```

Returns an array containing all installed providers that satisfy the
specified selection criterion, or `null` if no such providers
have been installed. The returned providers are ordered
according to their
int) preference order.

 A cryptographic service is always associated with a particular
algorithm or type. For example, a digital signature service is
always associated with a particular algorithm (e.g., DSA),
and a CertificateFactory service is always associated with
a particular certificate type (e.g., X.509).

The selection criterion must be specified in one of the following two
formats:

-  *.*

 The cryptographic service name must not contain any dots.

 A
provider satisfies the specified selection criterion iff the provider
implements the
specified algorithm or type for the specified cryptographic service.

 For example, "CertificateFactory.X.509"
would be satisfied by any provider that supplied
a CertificateFactory implementation for X.509 certificates.

-  *. :*

 The cryptographic service name must not contain any dots. There
must be one or more space characters between the
** and the
**.

 A provider satisfies this selection criterion iff the
provider implements the specified algorithm or type for the specified
cryptographic service and its implementation meets the
constraint expressed by the specified attribute name/value pair.

 For example, "Signature.SHA1withDSA KeySize:1024" would be
satisfied by any provider that implemented
the SHA1withDSA signature algorithm with a keysize of 1024 (or larger).

 See the
Java Security Standard Algorithm Names Specification
for information about standard cryptographic service names, standard
algorithm names and standard attribute names.

Parameters:

- `filter`: the criterion for selecting providers. The filter is case-insensitive.

**Returns:** all the installed providers that satisfy the selection
criterion, or `null` if no such providers have been installed.

**See also:** #getProviders(java.util.Map)

**Since:** 1.3

Throws:

- `InvalidParameterException`: if the filter is not in the required format
- `NullPointerException`: if filter is `null`

## Security.getProviders(Map<String,String>)

```java
public static Provider[] getProviders(Map<String,String> filter)
```

Returns an array containing all installed providers that satisfy the
specified selection criteria, or `null` if no such providers have
been installed. The returned providers are ordered
according to their
int) preference order.

The selection criteria are represented by a map.
Each map entry represents a selection criterion.
A provider is selected iff it satisfies all selection
criteria. The key for any entry in such a map must be in one of the
following two formats:

-  *.*

 The cryptographic service name must not contain any dots.

 The value associated with the key must be an empty string.

 A provider
satisfies this selection criterion iff the provider implements the
specified algorithm or type for the specified cryptographic service.

-   *.
 *

 The cryptographic service name must not contain any dots. There
must be one or more space characters between the
**
and the **.

 The value associated with the key must be a non-empty string.
A provider satisfies this selection criterion iff the
provider implements the specified algorithm or type for the specified
cryptographic service and its implementation meets the
constraint expressed by the specified attribute name/value pair.

 See the
Java Security Standard Algorithm Names Specification
for information about standard cryptographic service names, standard
algorithm names and standard attribute names.

Parameters:

- `filter`: the criteria for selecting providers. The filter is case-insensitive.

**Returns:** all the installed providers that satisfy the selection
criteria, or `null` if no such providers have been installed.

**See also:** #getProviders(java.lang.String)

**Since:** 1.3

Throws:

- `InvalidParameterException`: if the filter is not in the required format
- `NullPointerException`: if filter is `null`

## Security.getProperty(String)

```java
public static String getProperty(String key)
```

Gets a security property value.

Parameters:

- `key`: the key of the property being retrieved.

**Returns:** the value of the security property, or `null` if there
         is no property with that key.

**See also:** #setProperty

Throws:

- `NullPointerException`: if key is `null`
- `IllegalArgumentException`: if key is reserved and cannot be used as a Security property name. Reserved keys are: "include".

## Security.setProperty(String, String)

```java
public static void setProperty(String key, String datum)
```

Sets a security property value.

Parameters:

- `key`: the name of the property to be set.
- `datum`: the value of the property to be set.

**See also:** #getProperty

Throws:

- `NullPointerException`: if key or datum is `null`
- `IllegalArgumentException`: if key is reserved and cannot be used as a Security property name. Reserved keys are: "include".

## Security.getAlgorithms(String)

```java
public static Set<String> getAlgorithms(String serviceName)
```

Returns a Set of `String` objects containing the names of all
available algorithms or types for the specified Java cryptographic
service (e.g., `Signature`, `MessageDigest`, `Cipher`,
`Mac`, `KeyStore`).
Returns an empty set if there is no provider that supports the
specified service or if `serviceName` is `null`.
For a complete list of Java cryptographic services, please see the
.
Note: the returned set is immutable.

Parameters:

- `serviceName`: the name of the Java cryptographic service (e.g., `Signature`, `MessageDigest`, `Cipher`, `Mac`, `KeyStore`). Note: this parameter is case-insensitive.

**Returns:** a Set of `String` objects containing the names of all
available algorithms or types for the specified Java cryptographic
service or an empty set if no provider supports the specified service.

**Since:** 1.4
