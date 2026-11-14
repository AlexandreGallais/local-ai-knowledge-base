---
title: "KeyStore class (java.security) (part 1 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyStore.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyStore class (java.security)

```java
public class KeyStore
```

This class represents a storage facility for cryptographic
keys and certificates.

 A `KeyStore` manages different types of entries.
Each type of entry implements the `KeyStore.Entry` interface.
Three basic `KeyStore.Entry` implementations are provided:

- **KeyStore.PrivateKeyEntry**

 This type of entry holds a cryptographic `PrivateKey`,
which is optionally stored in a protected format to prevent
unauthorized access.  It is also accompanied by a certificate chain
for the corresponding public key.

 Private keys and certificate chains are used by a given entity for
self-authentication. Applications for this authentication include software
distribution organizations which sign JAR files as part of releasing
and/or licensing software.

- **KeyStore.SecretKeyEntry**

 This type of entry holds a cryptographic `SecretKey`,
which is optionally stored in a protected format to prevent
unauthorized access.

- **KeyStore.TrustedCertificateEntry**

 This type of entry contains a single public key `Certificate`
belonging to another party. It is called a *trusted certificate*
because the keystore owner trusts that the public key in the certificate
indeed belongs to the identity identified by the *subject* (owner)
of the certificate.

This type of entry can be used to authenticate other parties.

 Each entry in a keystore is identified by an "alias" string. In the
case of private keys and their associated certificate chains, these strings
distinguish among the different ways in which the entity may authenticate
itself. For example, the entity may authenticate itself using different
certificate authorities, or using different public key algorithms.

 Whether aliases are case-sensitive is implementation dependent. In order
to avoid problems, it is recommended not to use aliases in a KeyStore that
only differ in case.

 Whether keystores are persistent, and the mechanisms used by the
keystore if it is persistent, are not specified here. This allows
use of a variety of techniques for protecting sensitive (e.g., private or
secret) keys. Smart cards or other integrated cryptographic engines
(SafeKeyper) are one option, and simpler mechanisms such as files may also
be used (in a variety of formats).

 Typical ways to request a `KeyStore` object include
specifying an existing keystore file,
relying on the default type and providing a specific keystore type.

- To specify an existing keystore file:

```java
   // get keystore password
   char[] password = getPassword();

   // probe the keystore file and load the keystore entries
   KeyStore ks = KeyStore.getInstance(new File("<example-value>"), password);
```

The system will probe the specified file to determine its keystore type
and return a keystore implementation with its entries already loaded.
When this approach is used there is no need to call the keystore's
char[]) load method.

- To rely on the default type:

```java
   KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());
```

The system will return a keystore implementation for the default type.

- To provide a specific keystore type:

```java
     KeyStore ks = KeyStore.getInstance("JKS");
```

The system will return the most preferred implementation of the
specified keystore type available in the environment.

 Before a keystore can be accessed, it must be
char[]) loaded
(unless it was already loaded during instantiation).

```java
   KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());

   // get user password and file input stream
   char[] password = getPassword();

   try (FileInputStream fis = new FileInputStream("keyStoreName")) {
       ks.load(fis, password);
```

To create an empty keystore using the above `load` method,
pass `null` as the `InputStream` argument.

 Once the keystore has been loaded, it is possible
to read existing entries from the keystore, or to write new entries
into the keystore:

```java
   KeyStore.PasswordProtection protParam =
       new KeyStore.PasswordProtection(password);
   try (FileOutputStream fos = new FileOutputStream("newKeyStoreName")) {
       // get my private key
       KeyStore.PrivateKeyEntry pkEntry = (KeyStore.PrivateKeyEntry)
           ks.getEntry("privateKeyAlias", protParam);
       PrivateKey <example-value> = pkEntry.getPrivateKey();

       // save my secret key
       javax.crypto.SecretKey <example-value>;
       KeyStore.SecretKeyEntry skEntry =
           new KeyStore.SecretKeyEntry(mySecretKey);
       ks.setEntry("<example-value>", skEntry, protParam);

       // store away the keystore
       ks.store(fos, password);
   } finally {
       protParam.destroy();
```

Note that although the same password may be used to
load the keystore, to protect the private key entry,
to protect the secret key entry, and to store the keystore
(as is shown in the sample code above),
different passwords or other protection parameters
may also be used.

 Every implementation of the Java platform is required to support
the following standard `KeyStore` type:

- `PKCS12`

This type is described in the
KeyStore section of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other types are supported.

**See also:** java.security.PrivateKey

**See also:** javax.crypto.SecretKey

**See also:** java.security.cert.Certificate

**Since:** 1.2

## KeyStore.PasswordProtection(char[])

```java
public PasswordProtection(char[] password)
```

Creates a password parameter.

 The specified `password` is cloned before it is stored
in the new `PasswordProtection` object.

Parameters:

- `password`: the password, which may be `null`

## KeyStore.PasswordProtection(char[], String, AlgorithmParameterSpec)

```java
public PasswordProtection(char[] password, String protectionAlgorithm, AlgorithmParameterSpec protectionParameters)
```

Creates a password <example-value> and specifies the protection algorithm
and associated parameters to use when encrypting a keystore entry.

The specified `password` is cloned before it is stored in the
new `PasswordProtection` object.

Parameters:

- `password`: the password, which may be `null`
- `protectionAlgorithm`: the encryption algorithm name, for example, `PBEWithHmacSHA256AndAES_256`. See the Cipher section in the  Java Security Standard Algorithm Names Specification for information about standard encryption algorithm names.
- `protectionParameters`: the encryption algorithm parameter specification, which may be `null`

**Since:** 1.8

Throws:

- `NullPointerException`: if `protectionAlgorithm` is `null`

## KeyStore.getProtectionAlgorithm()

```java
public String getProtectionAlgorithm()
```

Gets the name of the protection algorithm.
If none was set then the keystore provider will use its default
protection algorithm.

**Returns:** the algorithm name, or `null` if none was set

**Since:** 1.8

## KeyStore.getProtectionParameters()

```java
public AlgorithmParameterSpec getProtectionParameters()
```

Gets the parameters supplied for the protection algorithm.

**Returns:** the algorithm parameter specification, or `null`,
    if none was set

**Since:** 1.8

## KeyStore.getPassword()

```java
public synchronized char[] getPassword()
```

Gets the password.

Note that this method returns a reference to the password.
If a clone of the array is created it is the caller's
responsibility to zero out the password <example-value>
after it is no longer needed.

**See also:** #destroy()

**Returns:** the password, which may be `null`

Throws:

- `IllegalStateException`: if the password has been cleared (destroyed)

## KeyStore.destroy()

```java
public synchronized void destroy() throws DestroyFailedException
```

Clears the password.

Throws:

- `DestroyFailedException`: if this method was unable to clear the password

## KeyStore.isDestroyed()

```java
public synchronized boolean isDestroyed()
```

Determines if password has been cleared.

**Returns:** `true` if the password has been cleared,
`false` otherwise

## KeyStore.CallbackHandlerProtection(CallbackHandler)

```java
public CallbackHandlerProtection(CallbackHandler handler)
```

Constructs a new CallbackHandlerProtection from a
CallbackHandler.

Parameters:

- `handler`: the CallbackHandler

Throws:

- `NullPointerException`: if handler is `null`

## KeyStore.getCallbackHandler()

```java
public CallbackHandler getCallbackHandler()
```

Returns the CallbackHandler.

**Returns:** the CallbackHandler.

## KeyStore.PrivateKeyEntry(PrivateKey, Certificate[])

```java
public PrivateKeyEntry(PrivateKey <example-value>, Certificate[] chain)
```

Constructs a `PrivateKeyEntry` with a
`PrivateKey` and corresponding certificate chain.

 The specified `chain` is cloned before it is stored
in the new `PrivateKeyEntry` object.

Parameters:

- `privateKey`: the `PrivateKey`
- `chain`: an array of `Certificate`s representing the certificate chain. The chain must be ordered and contain a `Certificate` at index 0 corresponding to the private key.

Throws:

- `NullPointerException`: if `privateKey` or `chain` is `null`
- `IllegalArgumentException`: if the specified chain has a length of 0, if the specified chain does not contain `Certificate`s of the same type, or if the `PrivateKey` algorithm does not match the algorithm of the `PublicKey` in the end entity `Certificate` (at index 0)

## KeyStore.PrivateKeyEntry(PrivateKey, Certificate[], Set<Attribute>)

```java
public PrivateKeyEntry(PrivateKey <example-value>, Certificate[] chain, Set<Attribute> attributes)
```

Constructs a `PrivateKeyEntry` with a `PrivateKey` and
corresponding certificate chain and associated entry attributes.

 The specified `chain` and `attributes` are cloned
before they are stored in the new `PrivateKeyEntry` object.

Parameters:

- `privateKey`: the `PrivateKey`
- `chain`: an array of `Certificate`s representing the certificate chain. The chain must be ordered and contain a `Certificate` at index 0 corresponding to the private key.
- `attributes`: the attributes

**Since:** 1.8

Throws:

- `NullPointerException`: if `privateKey`, `chain` or `attributes` is `null`
- `IllegalArgumentException`: if the specified chain has a length of 0, if the specified chain does not contain `Certificate`s of the same type, or if the `PrivateKey` algorithm does not match the algorithm of the `PublicKey` in the end entity `Certificate` (at index 0)

## KeyStore.getPrivateKey()

```java
public PrivateKey getPrivateKey()
```

Gets the `PrivateKey` from this entry.

**Returns:** the `PrivateKey` from this entry

## KeyStore.getCertificateChain()

```java
public Certificate[] getCertificateChain()
```

Gets the `Certificate` chain from this entry.

 The stored chain is cloned before being returned.

**Returns:** an array of `Certificate`s corresponding
     to the certificate chain for the public key.
     If the certificates are of type X.509,
     the runtime type of the returned array is
     `X509Certificate[]`.

## KeyStore.getCertificate()

```java
public Certificate getCertificate()
```

Gets the end entity `Certificate`
from the certificate chain in this entry.

**Returns:** the end entity `Certificate` (at index 0)
     from the certificate chain in this entry.
     If the certificate is of type X.509,
     the runtime type of the returned certificate is
     `X509Certificate`.

## KeyStore.getAttributes()

```java
public Set<Attribute> getAttributes()
```

Retrieves the attributes associated with an entry.

**Returns:** an unmodifiable `Set` of attributes, possibly empty

**Since:** 1.8

## KeyStore.toString()

```java
public String toString()
```

Returns a string representation of this PrivateKeyEntry.

**Returns:** a string representation of this PrivateKeyEntry.

## KeyStore.SecretKeyEntry(SecretKey)

```java
public SecretKeyEntry(SecretKey <example-value>)
```

Constructs a `SecretKeyEntry` with a
`SecretKey`.

Parameters:

- `secretKey`: the `SecretKey`

Throws:

- `NullPointerException`: if `secretKey` is `null`

## KeyStore.SecretKeyEntry(SecretKey, Set<Attribute>)

```java
public SecretKeyEntry(SecretKey <example-value>, Set<Attribute> attributes)
```

Constructs a `SecretKeyEntry` with a `SecretKey` and
associated entry attributes.

 The specified `attributes` is cloned before it is stored
in the new `SecretKeyEntry` object.

Parameters:

- `secretKey`: the `SecretKey`
- `attributes`: the attributes

**Since:** 1.8

Throws:

- `NullPointerException`: if `secretKey` or `attributes` is `null`

## KeyStore.getSecretKey()

```java
public SecretKey getSecretKey()
```

Gets the `SecretKey` from this entry.

**Returns:** the `SecretKey` from this entry

## KeyStore.getAttributes()

```java
public Set<Attribute> getAttributes()
```

Retrieves the attributes associated with an entry.

**Returns:** an unmodifiable `Set` of attributes, possibly empty

**Since:** 1.8

## KeyStore.toString()

```java
public String toString()
```

Returns a string representation of this SecretKeyEntry.

**Returns:** a string representation of this SecretKeyEntry.

## KeyStore.TrustedCertificateEntry(Certificate)

```java
public TrustedCertificateEntry(Certificate trustedCert)
```

Constructs a `TrustedCertificateEntry` with a
trusted `Certificate`.

Parameters:

- `trustedCert`: the trusted `Certificate`

Throws:

- `NullPointerException`: if `trustedCert` is `null`

## KeyStore.TrustedCertificateEntry(Certificate, Set<Attribute>)

```java
public TrustedCertificateEntry(Certificate trustedCert, Set<Attribute> attributes)
```

Constructs a `TrustedCertificateEntry` with a
trusted `Certificate` and associated entry attributes.

 The specified `attributes` is cloned before it is stored
in the new `TrustedCertificateEntry` object.

Parameters:

- `trustedCert`: the trusted `Certificate`
- `attributes`: the attributes

**Since:** 1.8

Throws:

- `NullPointerException`: if `trustedCert` or `attributes` is `null`

## KeyStore.getTrustedCertificate()

```java
public Certificate getTrustedCertificate()
```

Gets the trusted `Certificate` from this entry.

**Returns:** the trusted `Certificate` from this entry

## KeyStore.getAttributes()

```java
public Set<Attribute> getAttributes()
```

Retrieves the attributes associated with an entry.

**Returns:** an unmodifiable `Set` of attributes, possibly empty

**Since:** 1.8

## KeyStore.toString()

```java
public String toString()
```

Returns a string representation of this TrustedCertificateEntry.

**Returns:** a string representation of this TrustedCertificateEntry.

## KeyStore.KeyStore(KeyStoreSpi, Provider, String)

```java
protected KeyStore(KeyStoreSpi keyStoreSpi, Provider provider, String type)
```

Creates a `KeyStore` object of the given type, and encapsulates
the given provider implementation (SPI object) in it.

Parameters:

- `keyStoreSpi`: the provider implementation.
- `provider`: the provider.
- `type`: the keystore type.
