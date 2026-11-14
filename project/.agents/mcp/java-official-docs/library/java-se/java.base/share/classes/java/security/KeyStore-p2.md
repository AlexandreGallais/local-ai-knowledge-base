---
title: "KeyStore class (java.security) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyStore.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyStore class (java.security) (part 2 of 4)

## KeyStore.getInstance(String)

```java
public static KeyStore getInstance(String type) throws KeyStoreException
```

Returns a `KeyStore` object of the specified type.

 This method traverses the list of registered security providers,
starting with the most preferred provider.
A new `KeyStore` object encapsulating the
`KeyStoreSpi` implementation from the first
provider that supports the specified type is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `type`: the type of keystore. See the KeyStore section in the  Java Security Standard Algorithm Names Specification for information about standard keystore types.

**Implementation note:** The JDK Reference Implementation additionally uses the
`jdk.security.provider.preferred`
Security property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
Security.getProviders().

**Returns:** a keystore object of the specified type

**See also:** Provider

Throws:

- `KeyStoreException`: if no provider supports a `KeyStoreSpi` implementation for the specified type
- `NullPointerException`: if `type` is `null`

## KeyStore.getInstance(String, String)

```java
public static KeyStore getInstance(String type, String provider) throws KeyStoreException, NoSuchProviderException
```

Returns a `KeyStore` object of the specified type.

 A new `KeyStore` object encapsulating the
`KeyStoreSpi` implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `type`: the type of keystore. See the KeyStore section in the  Java Security Standard Algorithm Names Specification for information about standard keystore types.
- `provider`: the name of the provider.

**Returns:** a keystore object of the specified type

**See also:** Provider

Throws:

- `IllegalArgumentException`: if the provider name is `null` or empty
- `KeyStoreException`: if a `KeyStoreSpi` implementation for the specified type is not available from the specified provider
- `NoSuchProviderException`: if the specified provider is not registered in the security provider list
- `NullPointerException`: if `type` is `null`

## KeyStore.getInstance(String, Provider)

```java
public static KeyStore getInstance(String type, Provider provider) throws KeyStoreException
```

Returns a `KeyStore` object of the specified type.

 A new `KeyStore` object encapsulating the
`KeyStoreSpi` implementation from the specified provider
object is returned.  Note that the specified provider object
does not have to be registered in the provider list.

Parameters:

- `type`: the type of keystore. See the KeyStore section in the  Java Security Standard Algorithm Names Specification for information about standard keystore types.
- `provider`: the provider.

**Returns:** a keystore object of the specified type

**See also:** Provider

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if the specified provider is `null`
- `KeyStoreException`: if `KeyStoreSpi` implementation for the specified type is not available from the specified `Provider` object
- `NullPointerException`: if `type` is `null`

## KeyStore.getDefaultType()

```java
public static final String getDefaultType()
```

Returns the default keystore type as specified by the
`keystore.type` security property, or the string
 if no such property exists.

The default keystore type can be used by applications that do not
want to use a hard-coded keystore type when calling one of the
`getInstance` methods, and want to provide a default keystore
type in case a user does not specify its own.

The default keystore type can be changed by setting the value of the
`keystore.type` security property to the desired keystore type.

**Returns:** the default keystore type as specified by the
`keystore.type` security property, or the string
if no such property exists.

**See also:** java.security.Security security properties

## KeyStore.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this keystore.

**Returns:** the provider of this keystore.

## KeyStore.getType()

```java
public final String getType()
```

Returns the type of this keystore.

**Returns:** the type of this keystore.

## KeyStore.getAttributes(String)

```java
public final Set<Entry.Attribute> getAttributes(String alias) throws KeyStoreException
```

Retrieves the attributes associated with the given alias.

Parameters:

- `alias`: the alias name

**Returns:** an unmodifiable `Set` of attributes. This set is
     empty if the `KeyStoreSpi` implementation has not overridden
     `KeyStoreSpi.engineGetAttributes(String)`, or the given
     alias does not exist, or there are no attributes associated
     with the alias. This set may also be empty for
     `PrivateKeyEntry` or `SecretKeyEntry`
     entries that contain protected attributes and are only available
     through the `Entry.getAttributes` method after the entry
     is extracted.

**Since:** 18

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded).
- `NullPointerException`: if `alias` is `null`

## KeyStore.getKey(String, char[])

```java
public final Key getKey(String alias, char[] password) throws KeyStoreException, NoSuchAlgorithmException, UnrecoverableKeyException
```

Returns the key <example-value> with the given alias, using the given
password to recover it.  The key must have been associated with
the alias by a call to `setKeyEntry`,
or by a call to `setEntry` with a
`PrivateKeyEntry` or `SecretKeyEntry`.

Parameters:

- `alias`: the alias name
- `password`: the password for recovering the key

**Returns:** the requested key, or `null` if the given alias does
not exist or does not identify a key-related entry.

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded).
- `NoSuchAlgorithmException`: if the algorithm for recovering the key <example-value> be found
- `UnrecoverableKeyException`: if the key <example-value> be recovered (e.g., the given password is wrong).

## KeyStore.getCertificateChain(String)

```java
public final Certificate[] getCertificateChain(String alias) throws KeyStoreException
```

Returns the certificate chain associated with the given alias.
The certificate chain must have been associated with the alias
by a call to `setKeyEntry`,
or by a call to `setEntry` with a
`PrivateKeyEntry`.

Parameters:

- `alias`: the alias name

**Returns:** the certificate chain (ordered with the user's certificate first
followed by zero or more certificate authorities), or `null`
if the given alias does not exist or does not contain a certificate chain

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded).

## KeyStore.getCertificate(String)

```java
public final Certificate getCertificate(String alias) throws KeyStoreException
```

Returns the certificate associated with the given alias.

 If the given alias name identifies an entry
created by a call to `setCertificateEntry`,
or created by a call to `setEntry` with a
`TrustedCertificateEntry`,
then the trusted certificate contained in that entry is returned.

 If the given alias name identifies an entry
created by a call to `setKeyEntry`,
or created by a call to `setEntry` with a
`PrivateKeyEntry`,
then the first element of the certificate chain in that entry
is returned.

Parameters:

- `alias`: the alias name

**Returns:** the certificate, or `null` if the given alias does not
exist or does not contain a certificate.

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded).

## KeyStore.getCreationDate(String)

```java
public final Date getCreationDate(String alias) throws KeyStoreException
```

Returns the creation date of the entry identified by the given alias.

Parameters:

- `alias`: the alias name

**Returns:** the creation date of this entry, or `null` if the given
alias does not exist

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded).

## KeyStore.setKeyEntry(String, Key, char[], Certificate[])

```java
public final void setKeyEntry(String alias, Key key, char[] password, Certificate[] chain) throws KeyStoreException
```

Assigns the given key to the given alias, protecting it with the given
password.

If the given key is of type `java.security.PrivateKey`,
it must be accompanied by a certificate chain certifying the
corresponding public key.

If the given alias already exists, the keystore information
associated with it is overridden by the given key (and possibly
certificate chain).

Parameters:

- `alias`: the alias name
- `key`: the key to be associated with the alias
- `password`: the password to protect the key
- `chain`: the certificate chain for the corresponding public key (only required if the given key is of type `java.security.PrivateKey`).

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded), the given key <example-value> be protected, or this operation fails for some other reason

## KeyStore.setKeyEntry(String, byte[], Certificate[])

```java
public final void setKeyEntry(String alias, byte[] key, Certificate[] chain) throws KeyStoreException
```

Assigns the given key (that has already been protected) to the given
alias.

If the protected key is of type
`java.security.PrivateKey`, it must be accompanied by a
certificate chain certifying the corresponding public key. If the
underlying keystore implementation is of type `jks`,
`key` must be encoded as an
`EncryptedPrivateKeyInfo` as defined in the PKCS #8 standard.

If the given alias already exists, the keystore information
associated with it is overridden by the given key (and possibly
certificate chain).

Parameters:

- `alias`: the alias name
- `key`: the key (in protected format) to be associated with the alias
- `chain`: the certificate chain for the corresponding public key (only useful if the protected key is of type `java.security.PrivateKey`).

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded), or if this operation fails for some other reason.

## KeyStore.setCertificateEntry(String, Certificate)

```java
public final void setCertificateEntry(String alias, Certificate cert) throws KeyStoreException
```

Assigns the given trusted certificate to the given alias.

 If the given alias identifies an existing entry
created by a call to `setCertificateEntry`,
or created by a call to `setEntry` with a
`TrustedCertificateEntry`,
the trusted certificate in the existing entry
is overridden by the given certificate.

Parameters:

- `alias`: the alias name
- `cert`: the certificate

Throws:

- `KeyStoreException`: if the keystore has not been initialized, or the given alias already exists and does not identify an entry containing a trusted certificate, or this operation fails for some other reason.

## KeyStore.deleteEntry(String)

```java
public final void deleteEntry(String alias) throws KeyStoreException
```

Deletes the entry identified by the given alias from this keystore.

Parameters:

- `alias`: the alias name

Throws:

- `KeyStoreException`: if the keystore has not been initialized, or if the entry cannot be removed.

## KeyStore.aliases()

```java
public final Enumeration<String> aliases() throws KeyStoreException
```

Lists all the alias names of this keystore.

**Returns:** enumeration of the alias names

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded).

## KeyStore.containsAlias(String)

```java
public final boolean containsAlias(String alias) throws KeyStoreException
```

Checks if the given alias exists in this keystore.

Parameters:

- `alias`: the alias name

**Returns:** `true` if the alias exists, `false` otherwise

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded).

## KeyStore.size()

```java
public final int size() throws KeyStoreException
```

Retrieves the number of entries in this keystore.

**Returns:** the number of entries in this keystore

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded).

## KeyStore.isKeyEntry(String)

```java
public final boolean isKeyEntry(String alias) throws KeyStoreException
```

Returns `true` if the entry identified by the given alias
was created by a call to `setKeyEntry`,
or created by a call to `setEntry` with a
`PrivateKeyEntry` or a `SecretKeyEntry`.

Parameters:

- `alias`: the alias for the keystore entry to be checked

**Returns:** `true` if the entry identified by the given alias is a
key-related entry, `false` otherwise.

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded).

## KeyStore.isCertificateEntry(String)

```java
public final boolean isCertificateEntry(String alias) throws KeyStoreException
```

Returns `true` if the entry identified by the given alias
was created by a call to `setCertificateEntry`,
or created by a call to `setEntry` with a
`TrustedCertificateEntry`.

Parameters:

- `alias`: the alias for the keystore entry to be checked

**Returns:** `true` if the entry identified by the given alias
contains a trusted certificate, `false` otherwise.

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded).

## KeyStore.getCertificateAlias(Certificate)

```java
public final String getCertificateAlias(Certificate cert) throws KeyStoreException
```

Returns the (alias) name of the first keystore entry whose certificate
matches the given certificate.

 This method attempts to match the given certificate with each
keystore entry. If the entry being considered was
created by a call to `setCertificateEntry`,
or created by a call to `setEntry` with a
`TrustedCertificateEntry`,
then the given certificate is compared to that entry's certificate.

 If the entry being considered was
created by a call to `setKeyEntry`,
or created by a call to `setEntry` with a
`PrivateKeyEntry`,
then the given certificate is compared to the first
element of that entry's certificate chain.

Parameters:

- `cert`: the certificate to match with.

**Returns:** the alias name of the first entry with a matching certificate,
or `null` if no such entry exists in this keystore.

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded).
