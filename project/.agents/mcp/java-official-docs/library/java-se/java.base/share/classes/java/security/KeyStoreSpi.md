---
title: "KeyStoreSpi class (java.security) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyStoreSpi.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyStoreSpi class (java.security)

```java
public abstract class KeyStoreSpi
```

This class defines the *Service Provider Interface* (**SPI**)
for the `KeyStore` class.
All the abstract methods in this class must be implemented by each
cryptographic service provider who wishes to supply the implementation
of a keystore for a particular keystore type.

**See also:** KeyStore

**Since:** 1.2

## KeyStoreSpi.KeyStoreSpi()

```java
public KeyStoreSpi()
```

Constructor for subclasses to call.

## KeyStoreSpi.engineGetKey(String, char[])

```java
public abstract Key engineGetKey(String alias, char[] password) throws NoSuchAlgorithmException, UnrecoverableKeyException
```

Returns the key <example-value> with the given alias, using the given
password to recover it.  The key must have been associated with
the alias by a call to `setKeyEntry`,
or by a call to `setEntry` with a
`PrivateKeyEntry` or `SecretKeyEntry`.

Parameters:

- `alias`: the alias name
- `password`: the password for recovering the key

**Returns:** the requested key, or `null` if the given alias
does not exist or does not identify a key-related entry.

Throws:

- `NoSuchAlgorithmException`: if the algorithm for recovering the key <example-value> be found
- `UnrecoverableKeyException`: if the key <example-value> be recovered (e.g., the given password is wrong).

## KeyStoreSpi.engineGetCertificateChain(String)

```java
public abstract Certificate[] engineGetCertificateChain(String alias)
```

Returns the certificate chain associated with the given alias.
The certificate chain must have been associated with the alias
by a call to `setKeyEntry`,
or by a call to `setEntry` with a
`PrivateKeyEntry`.

Parameters:

- `alias`: the alias name

**Returns:** the certificate chain (ordered with the user's certificate first
and the root certificate authority last), or `null` if the
given alias * does not exist or does not contain a certificate chain

## KeyStoreSpi.engineGetCertificate(String)

```java
public abstract Certificate engineGetCertificate(String alias)
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
(if a chain exists) is returned.

Parameters:

- `alias`: the alias name

**Returns:** the certificate, or `null` if the given alias does not
exist or does not contain a certificate.

## KeyStoreSpi.engineGetCreationDate(String)

```java
public abstract Date engineGetCreationDate(String alias)
```

Returns the creation date of the entry identified by the given alias.

Parameters:

- `alias`: the alias name

**Returns:** the creation date of this entry, or `null`
if the given alias does not exist

## KeyStoreSpi.engineSetKeyEntry(String, Key, char[], Certificate[])

```java
public abstract void engineSetKeyEntry(String alias, Key key, char[] password, Certificate[] chain) throws KeyStoreException
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

- `KeyStoreException`: if the given key <example-value> be protected, or this operation fails for some other reason

## KeyStoreSpi.engineSetKeyEntry(String, byte[], Certificate[])

```java
public abstract void engineSetKeyEntry(String alias, byte[] key, Certificate[] chain) throws KeyStoreException
```

Assigns the given key (that has already been protected) to the given
alias.

If the protected key is of type
`java.security.PrivateKey`,
it must be accompanied by a certificate chain certifying the
corresponding public key.

If the given alias already exists, the keystore information
associated with it is overridden by the given key (and possibly
certificate chain).

Parameters:

- `alias`: the alias name
- `key`: the key (in protected format) to be associated with the alias
- `chain`: the certificate chain for the corresponding public key (only useful if the protected key is of type `java.security.PrivateKey`).

Throws:

- `KeyStoreException`: if this operation fails.

## KeyStoreSpi.engineSetCertificateEntry(String, Certificate)

```java
public abstract void engineSetCertificateEntry(String alias, Certificate cert) throws KeyStoreException
```

Assigns the given certificate to the given alias.

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

- `KeyStoreException`: if the given alias already exists and does not identify an entry containing a trusted certificate, or this operation fails for some other reason.

## KeyStoreSpi.engineDeleteEntry(String)

```java
public abstract void engineDeleteEntry(String alias) throws KeyStoreException
```

Deletes the entry identified by the given alias from this keystore.

Parameters:

- `alias`: the alias name

Throws:

- `KeyStoreException`: if the entry cannot be removed.

## KeyStoreSpi.engineAliases()

```java
public abstract Enumeration<String> engineAliases()
```

Lists all the alias names of this keystore.

**Returns:** enumeration of the alias names

## KeyStoreSpi.engineContainsAlias(String)

```java
public abstract boolean engineContainsAlias(String alias)
```

Checks if the given alias exists in this keystore.

Parameters:

- `alias`: the alias name

**Returns:** `true` if the alias exists, `false` otherwise

## KeyStoreSpi.engineSize()

```java
public abstract int engineSize()
```

Retrieves the number of entries in this keystore.

**Returns:** the number of entries in this keystore

## KeyStoreSpi.engineIsKeyEntry(String)

```java
public abstract boolean engineIsKeyEntry(String alias)
```

Returns `true` if the entry identified by the given alias
was created by a call to `setKeyEntry`,
or created by a call to `setEntry` with a
`PrivateKeyEntry` or a `SecretKeyEntry`.

Parameters:

- `alias`: the alias for the keystore entry to be checked

**Returns:** `true` if the entry identified by the given alias is a
key-related, `false` otherwise.

## KeyStoreSpi.engineIsCertificateEntry(String)

```java
public abstract boolean engineIsCertificateEntry(String alias)
```

Returns `true` if the entry identified by the given alias
was created by a call to `setCertificateEntry`,
or created by a call to `setEntry` with a
`TrustedCertificateEntry`.

Parameters:

- `alias`: the alias for the keystore entry to be checked

**Returns:** `true` if the entry identified by the given alias
contains a trusted certificate, `false` otherwise.

## KeyStoreSpi.engineGetCertificateAlias(Certificate)

```java
public abstract String engineGetCertificateAlias(Certificate cert)
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

**Returns:** the alias name of the first entry with matching certificate,
or `null` if no such entry exists in this keystore.

## KeyStoreSpi.engineStore(OutputStream, char[])

```java
public abstract void engineStore(OutputStream stream, char[] password) throws IOException, NoSuchAlgorithmException, CertificateException
```

Stores this keystore to the given output stream, and protects its
integrity with the given password.

Parameters:

- `stream`: the output stream to which this keystore is written.
- `password`: the password to generate the keystore integrity check. May be `null` if the keystore does not support or require an integrity check.

Throws:

- `IOException`: if there was an I/O problem with data
- `NoSuchAlgorithmException`: if the appropriate data integrity algorithm could not be found
- `CertificateException`: if any of the certificates included in the keystore data could not be stored

## KeyStoreSpi.engineStore(KeyStore.LoadStoreParameter)

```java
public void engineStore(KeyStore.LoadStoreParameter param) throws IOException, NoSuchAlgorithmException, CertificateException
```

Stores this keystore using the given
`KeyStore.LoadStoreParameter`.

Parameters:

- `param`: the `KeyStore.LoadStoreParameter` that specifies how to store the keystore, which may be `null`

**Implementation requirements:** The default implementation throws
         an `UnsupportedOperationException`.

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if the given `KeyStore.LoadStoreParameter` input is not recognized
- `IOException`: if there was an I/O problem with data
- `NoSuchAlgorithmException`: if the appropriate data integrity algorithm could not be found
- `CertificateException`: if any of the certificates included in the keystore data could not be stored
- `UnsupportedOperationException`: if the implementation does not support this operation

## KeyStoreSpi.engineLoad(InputStream, char[])

```java
public abstract void engineLoad(InputStream stream, char[] password) throws IOException, NoSuchAlgorithmException, CertificateException
```

Loads the keystore from the given input stream.

A password may be given to unlock the keystore
(e.g. the keystore resides on a hardware token <example-value>),
or to check the integrity of the keystore data.
If a password is not given for integrity checking,
then integrity checking is not performed.

Parameters:

- `stream`: the input stream from which the keystore is loaded, or `null`
- `password`: the password used to check the integrity of the keystore, the password used to unlock the keystore, or `null`

Throws:

- `IOException`: if there is an I/O or format problem with the keystore data, if a password is required but not given, or if the given password was incorrect. If the error is due to a wrong password, the cause of the `IOException` should be an `UnrecoverableKeyException`
- `NoSuchAlgorithmException`: if the algorithm used to check the integrity of the keystore cannot be found
- `CertificateException`: if any of the certificates in the keystore could not be loaded

## KeyStoreSpi.engineLoad(KeyStore.LoadStoreParameter)

```java
public void engineLoad(KeyStore.LoadStoreParameter param) throws IOException, NoSuchAlgorithmException, CertificateException
```

Loads the keystore using the given
`KeyStore.LoadStoreParameter`.

 Note that if this KeyStore has already been loaded, it is
reinitialized and loaded again from the given parameter.

Parameters:

- `param`: the `KeyStore.LoadStoreParameter` that specifies how to load the keystore, which may be `null`

**Implementation requirements:** The default implementation examines `KeyStore.LoadStoreParameter`
to extract its password and pass it to
char[]) along with a
`null` `InputStream`.

If `KeyStore.LoadStoreParameter` is `null` then
the password <example-value> will also be `null`.
Otherwise, the `KeyStore.ProtectionParameter` of
`KeyStore.LoadStoreParameter` must be either a
`KeyStore.PasswordProtection` or a
`KeyStore.CallbackHandlerProtection` that supports
`PasswordCallback` so that the password <example-value> can be
extracted. If the `KeyStore.ProtectionParameter` is neither
of those classes then a `NoSuchAlgorithmException` is thrown.

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if the given `KeyStore.LoadStoreParameter` input is not recognized
- `IOException`: if there is an I/O or format problem with the keystore data. If the error is due to an incorrect `ProtectionParameter` (e.g. wrong password) the cause of the `IOException` should be an `UnrecoverableKeyException`
- `NoSuchAlgorithmException`: if the algorithm used to check the integrity of the keystore cannot be found
- `CertificateException`: if any of the certificates in the keystore could not be loaded

## KeyStoreSpi.engineGetAttributes(String)

```java
public Set<Entry.Attribute> engineGetAttributes(String alias)
```

Retrieves the attributes associated with the given alias.

Parameters:

- `alias`: the alias name

**Implementation requirements:** The default implementation returns an empty `Set`.
`KeyStoreSpi` implementations that support attributes
should override this method.

**Returns:** an unmodifiable `Set` of attributes. This set is
     empty if the given alias does not exist or there are no
     attributes associated with the alias. This set may also be
     empty for `PrivateKeyEntry` or `SecretKeyEntry`
     entries that contain protected attributes. These protected
     attributes should be populated into the result returned by
     `engineGetEntry` and can be retrieved by calling
     the `Entry.getAttributes` method.

**Since:** 18
