---
title: "CertStore class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertStore.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertStore class (java.security.cert)

```java
public class CertStore
```

A class for retrieving `Certificate`s and `CRL`s
from a repository.

This class uses a provider-based architecture.
To create a `CertStore`, call one of the static
`getInstance` methods, passing in the type of
`CertStore` desired, any applicable initialization parameters
and optionally the name of the provider desired.

Once the `CertStore` has been created, it can be used to
retrieve `Certificate`s and `CRL`s by calling its
selector) getCertificates and
selector) getCRLs methods.

Unlike a KeyStore, which provides access
to a cache of private keys and trusted certificates, a
`CertStore` is designed to provide access to a potentially
vast repository of untrusted certificates and CRLs. For example, an LDAP
implementation of `CertStore` provides access to certificates
and CRLs stored in one or more directories using the LDAP protocol and the
schema as defined in the RFC service attribute.

 Every implementation of the Java platform is required to support the
following standard `CertStore` type:

- `Collection`

This type is described in the
CertStore section of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other types are supported.

**Concurrent Access**

All public methods of `CertStore` objects must be thread-safe.
That is, multiple threads may concurrently invoke these methods on a
single `CertStore` object (or more than one) with no
ill effects. This allows a `CertPathBuilder` to search for a
CRL while simultaneously searching for further certificates, for instance.

The static methods of this class are also guaranteed to be thread-safe.
Multiple threads may concurrently invoke the static methods defined in
this class with no ill effects.

**Since:** 1.4

## CertStore.CertStore(CertStoreSpi, Provider, String, CertStoreParameters)

```java
protected CertStore(CertStoreSpi storeSpi, Provider provider, String type, CertStoreParameters params)
```

Creates a `CertStore` object of the given type, and
encapsulates the given provider implementation (SPI object) in it.

Parameters:

- `storeSpi`: the provider implementation
- `provider`: the provider
- `type`: the type
- `params`: the initialization parameters (may be `null`)

## CertStore.getCertificates(CertSelector)

```java
public final Collection<? extends Certificate> getCertificates (CertSelector selector) throws CertStoreException
```

Returns a `Collection` of `Certificate`s that
match the specified selector. If no `Certificate`s
match the selector, an empty `Collection` will be returned.

For some `CertStore` types, the resulting
`Collection` may not contain **all** of the
`Certificate`s that match the selector. For instance,
an LDAP `CertStore` may not search all entries in the
directory. Instead, it may just search entries that are likely to
contain the `Certificate`s it is looking for.

Some `CertStore` implementations (especially LDAP
`CertStore`s) may throw a `CertStoreException`
unless a non-null `CertSelector` is provided that
includes specific criteria that can be used to find the certificates.
Issuer and/or subject names are especially useful criteria.

Parameters:

- `selector`: A `CertSelector` used to select which `Certificate`s should be returned. Specify `null` to return all `Certificate`s (if supported).

**Returns:** A `Collection` of `Certificate`s that
        match the specified selector (never `null`)

Throws:

- `CertStoreException`: if an exception occurs

## CertStore.getCRLs(CRLSelector)

```java
public final Collection<? extends CRL> getCRLs(CRLSelector selector) throws CertStoreException
```

Returns a `Collection` of `CRL`s that
match the specified selector. If no `CRL`s
match the selector, an empty `Collection` will be returned.

For some `CertStore` types, the resulting
`Collection` may not contain **all** of the
`CRL`s that match the selector. For instance,
an LDAP `CertStore` may not search all entries in the
directory. Instead, it may just search entries that are likely to
contain the `CRL`s it is looking for.

Some `CertStore` implementations (especially LDAP
`CertStore`s) may throw a `CertStoreException`
unless a non-null `CRLSelector` is provided that
includes specific criteria that can be used to find the CRLs.
Issuer names and/or the certificate to be checked are especially useful.

Parameters:

- `selector`: A `CRLSelector` used to select which `CRL`s should be returned. Specify `null` to return all `CRL`s (if supported).

**Returns:** A `Collection` of `CRL`s that
        match the specified selector (never `null`)

Throws:

- `CertStoreException`: if an exception occurs

## CertStore.getInstance(String, CertStoreParameters)

```java
public static CertStore getInstance(String type, CertStoreParameters params) throws InvalidAlgorithmParameterException, NoSuchAlgorithmException
```

Returns a `CertStore` object that implements the specified
`CertStore` type and is initialized with the specified
parameters.

 This method traverses the list of registered security Providers,
starting with the most preferred Provider.
A new CertStore object encapsulating the
CertStoreSpi implementation from the first
Provider that supports the specified type is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

The `CertStore` that is returned is initialized with the
specified `CertStoreParameters`. The type of parameters
needed may vary between different types of `CertStore`s.
Note that the specified `CertStoreParameters` object is
cloned.

Parameters:

- `type`: the name of the requested `CertStore` type. See the CertStore section in the  Java Security Standard Algorithm Names Specification for information about standard types.
- `params`: the initialization parameters (may be `null`).

**Implementation note:** The JDK Reference Implementation additionally uses the
`jdk.security.provider.preferred`
Security property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
Security.getProviders().

**Returns:** a `CertStore` object that implements the specified
         `CertStore` type

**See also:** java.security.Provider

Throws:

- `InvalidAlgorithmParameterException`: if the specified initialization parameters are inappropriate for this `CertStore`
- `NoSuchAlgorithmException`: if no `Provider` supports a `CertStoreSpi` implementation for the specified type
- `NullPointerException`: if `type` is `null`

## CertStore.getInstance(String, CertStoreParameters, String)

```java
public static CertStore getInstance(String type, CertStoreParameters params, String provider) throws InvalidAlgorithmParameterException, NoSuchAlgorithmException, NoSuchProviderException
```

Returns a `CertStore` object that implements the specified
`CertStore` type.

 A new CertStore object encapsulating the
CertStoreSpi implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

The `CertStore` that is returned is initialized with the
specified `CertStoreParameters`. The type of parameters
needed may vary between different types of `CertStore`s.
Note that the specified `CertStoreParameters` object is
cloned.

Parameters:

- `type`: the requested `CertStore` type. See the CertStore section in the  Java Security Standard Algorithm Names Specification for information about standard types.
- `params`: the initialization parameters (may be `null`).
- `provider`: the name of the provider.

**Returns:** a `CertStore` object that implements the
         specified type

**See also:** java.security.Provider

Throws:

- `IllegalArgumentException`: if the `provider` is `null` or empty
- `InvalidAlgorithmParameterException`: if the specified initialization parameters are inappropriate for this `CertStore`
- `NoSuchAlgorithmException`: if a `CertStoreSpi` implementation for the specified type is not available from the specified provider
- `NoSuchProviderException`: if the specified provider is not registered in the security provider list
- `NullPointerException`: if `type` is `null`

## CertStore.getInstance(String, CertStoreParameters, Provider)

```java
public static CertStore getInstance(String type, CertStoreParameters params, Provider provider) throws NoSuchAlgorithmException, InvalidAlgorithmParameterException
```

Returns a `CertStore` object that implements the specified
`CertStore` type.

 A new CertStore object encapsulating the
CertStoreSpi implementation from the specified Provider
object is returned.  Note that the specified Provider object
does not have to be registered in the provider list.

The `CertStore` that is returned is initialized with the
specified `CertStoreParameters`. The type of parameters
needed may vary between different types of `CertStore`s.
Note that the specified `CertStoreParameters` object is
cloned.

Parameters:

- `type`: the requested `CertStore` type. See the CertStore section in the  Java Security Standard Algorithm Names Specification for information about standard types.
- `params`: the initialization parameters (may be `null`).
- `provider`: the provider.

**Returns:** a `CertStore` object that implements the
         specified type

**See also:** java.security.Provider

Throws:

- `IllegalArgumentException`: if the `provider` is null
- `InvalidAlgorithmParameterException`: if the specified initialization parameters are inappropriate for this `CertStore`
- `NoSuchAlgorithmException`: if a `CertStoreSpi` implementation for the specified type is not available from the specified Provider object
- `NullPointerException`: if `type` is `null`

## CertStore.getCertStoreParameters()

```java
public final CertStoreParameters getCertStoreParameters()
```

Returns the parameters used to initialize this `CertStore`.
Note that the `CertStoreParameters` object is cloned before
it is returned.

**Returns:** the parameters used to initialize this `CertStore`
(may be `null`)

## CertStore.getType()

```java
public final String getType()
```

Returns the type of this `CertStore`.

**Returns:** the type of this `CertStore`

## CertStore.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this `CertStore`.

**Returns:** the provider of this `CertStore`

## CertStore.getDefaultType()

```java
public static final String getDefaultType()
```

Returns the default `CertStore` type as specified by the
`certstore.type` security property, or the string
 if no such property exists.

The default `CertStore` type can be used by applications
that do not want to use a hard-coded type when calling one of the
`getInstance` methods, and want to provide a default
`CertStore` type in case a user does not specify its own.

The default `CertStore` type can be changed by setting
the value of the `certstore.type` security property to the
desired type.

**See also:** java.security.Security security properties

**Returns:** the default `CertStore` type as specified by the
`certstore.type` security property, or the string
 if no such property exists.
