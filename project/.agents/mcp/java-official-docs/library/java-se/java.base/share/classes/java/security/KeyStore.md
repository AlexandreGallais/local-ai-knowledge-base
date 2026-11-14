# KeyStore class (java.security)

```java
public class KeyStore
```

This class represents a storage facility for cryptographic
keys and certificates.

<p> A {@code KeyStore} manages different types of entries.
Each type of entry implements the {@code KeyStore.Entry} interface.
Three basic {@code KeyStore.Entry} implementations are provided:

<ul>
<li><b>KeyStore.PrivateKeyEntry</b>
<p> This type of entry holds a cryptographic {@code PrivateKey},
which is optionally stored in a protected format to prevent
unauthorized access.  It is also accompanied by a certificate chain
for the corresponding public key.

<p> Private keys and certificate chains are used by a given entity for
self-authentication. Applications for this authentication include software
distribution organizations which sign JAR files as part of releasing
and/or licensing software.

<li><b>KeyStore.SecretKeyEntry</b>
<p> This type of entry holds a cryptographic {@code SecretKey},
which is optionally stored in a protected format to prevent
unauthorized access.

<li><b>KeyStore.TrustedCertificateEntry</b>
<p> This type of entry contains a single public key {@code Certificate}
belonging to another party. It is called a <i>trusted certificate</i>
because the keystore owner trusts that the public key in the certificate
indeed belongs to the identity identified by the <i>subject</i> (owner)
of the certificate.

<p>This type of entry can be used to authenticate other parties.
</ul>

<p> Each entry in a keystore is identified by an "alias" string. In the
case of private keys and their associated certificate chains, these strings
distinguish among the different ways in which the entity may authenticate
itself. For example, the entity may authenticate itself using different
certificate authorities, or using different public key algorithms.

<p> Whether aliases are case-sensitive is implementation dependent. In order
to avoid problems, it is recommended not to use aliases in a KeyStore that
only differ in case.

<p> Whether keystores are persistent, and the mechanisms used by the
keystore if it is persistent, are not specified here. This allows
use of a variety of techniques for protecting sensitive (e.g., private or
secret) keys. Smart cards or other integrated cryptographic engines
(SafeKeyper) are one option, and simpler mechanisms such as files may also
be used (in a variety of formats).

<p> Typical ways to request a {@code KeyStore} object include
specifying an existing keystore file,
relying on the default type and providing a specific keystore type.

<ul>
<li>To specify an existing keystore file:
<pre>
   // get keystore password
   char[] password = getPassword();

   // probe the keystore file and load the keystore entries
   KeyStore ks = KeyStore.getInstance(new File("keyStoreName"), password);
</pre>
The system will probe the specified file to determine its keystore type
and return a keystore implementation with its entries already loaded.
When this approach is used there is no need to call the keystore's
{@link #load(java.io.InputStream, char[]) load} method.

<li>To rely on the default type:
<pre>
   KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());
</pre>
The system will return a keystore implementation for the default type.

<li>To provide a specific keystore type:
<pre>
     KeyStore ks = KeyStore.getInstance("JKS");
</pre>
The system will return the most preferred implementation of the
specified keystore type available in the environment.
</ul>

<p> Before a keystore can be accessed, it must be
{@link #load(java.io.InputStream, char[]) loaded}
(unless it was already loaded during instantiation).
<pre>
   KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());

   // get user password and file input stream
   char[] password = getPassword();

   try (FileInputStream fis = new FileInputStream("keyStoreName")) {
       ks.load(fis, password);
   }
</pre>

To create an empty keystore using the above {@code load} method,
pass {@code null} as the {@code InputStream} argument.

<p> Once the keystore has been loaded, it is possible
to read existing entries from the keystore, or to write new entries
into the keystore:
<pre>
   KeyStore.PasswordProtection protParam =
       new KeyStore.PasswordProtection(password);
   try (FileOutputStream fos = new FileOutputStream("newKeyStoreName")) {
       // get my private key
       KeyStore.PrivateKeyEntry pkEntry = (KeyStore.PrivateKeyEntry)
           ks.getEntry("privateKeyAlias", protParam);
       PrivateKey myPrivateKey = pkEntry.getPrivateKey();

       // save my secret key
       javax.crypto.SecretKey mySecretKey;
       KeyStore.SecretKeyEntry skEntry =
           new KeyStore.SecretKeyEntry(mySecretKey);
       ks.setEntry("secretKeyAlias", skEntry, protParam);

       // store away the keystore
       ks.store(fos, password);
   } finally {
       protParam.destroy();
   }
</pre>

Note that although the same password may be used to
load the keystore, to protect the private key entry,
to protect the secret key entry, and to store the keystore
(as is shown in the sample code above),
different passwords or other protection parameters
may also be used.

<p> Every implementation of the Java platform is required to support
the following standard {@code KeyStore} type:
<ul>
<li>{@code PKCS12}</li>
</ul>
This type is described in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keystore-types">
KeyStore section</a> of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other types are supported.

@spec security/standard-names.html Java Security Standard Algorithm Names
@author Jan Luehe

@see java.security.PrivateKey
@see javax.crypto.SecretKey
@see java.security.cert.Certificate

@since 1.2

## KeyStore.PasswordProtection(char[])

```java
public PasswordProtection(char[] password)
```

Creates a password parameter.

<p> The specified {@code password} is cloned before it is stored
in the new {@code PasswordProtection} object.

@param password the password, which may be {@code null}

## KeyStore.PasswordProtection(char[], String, AlgorithmParameterSpec)

```java
public PasswordProtection(char[] password, String protectionAlgorithm, AlgorithmParameterSpec protectionParameters)
```

Creates a password parameter and specifies the protection algorithm
and associated parameters to use when encrypting a keystore entry.
<p>
The specified {@code password} is cloned before it is stored in the
new {@code PasswordProtection} object.

@param password the password, which may be {@code null}
@param protectionAlgorithm the encryption algorithm name, for
    example, {@code PBEWithHmacSHA256AndAES_256}.
    See the Cipher section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#cipher-algorithms">
Java Security Standard Algorithm Names Specification</a>
    for information about standard encryption algorithm names.
@param protectionParameters the encryption algorithm parameter
    specification, which may be {@code null}
@throws    NullPointerException if {@code protectionAlgorithm} is
    {@code null}

@spec security/standard-names.html Java Security Standard Algorithm Names
@since 1.8

## KeyStore.getProtectionAlgorithm()

```java
public String getProtectionAlgorithm()
```

Gets the name of the protection algorithm.
If none was set then the keystore provider will use its default
protection algorithm.

@return the algorithm name, or {@code null} if none was set

@since 1.8

## KeyStore.getProtectionParameters()

```java
public AlgorithmParameterSpec getProtectionParameters()
```

Gets the parameters supplied for the protection algorithm.

@return the algorithm parameter specification, or {@code  null},
    if none was set

@since 1.8

## KeyStore.getPassword()

```java
public synchronized char[] getPassword()
```

Gets the password.

<p>Note that this method returns a reference to the password.
If a clone of the array is created it is the caller's
responsibility to zero out the password information
after it is no longer needed.

@see #destroy()
@return the password, which may be {@code null}
@throws    IllegalStateException if the password has
             been cleared (destroyed)

## KeyStore.destroy()

```java
public synchronized void destroy() throws DestroyFailedException
```

Clears the password.

@throws    DestroyFailedException if this method was unable
     to clear the password

## KeyStore.isDestroyed()

```java
public synchronized boolean isDestroyed()
```

Determines if password has been cleared.

@return {@code true} if the password has been cleared,
{@code false} otherwise

## KeyStore.CallbackHandlerProtection(CallbackHandler)

```java
public CallbackHandlerProtection(CallbackHandler handler)
```

Constructs a new CallbackHandlerProtection from a
CallbackHandler.

@param handler the CallbackHandler
@throws    NullPointerException if handler is {@code null}

## KeyStore.getCallbackHandler()

```java
public CallbackHandler getCallbackHandler()
```

Returns the CallbackHandler.

@return the CallbackHandler.

## KeyStore.PrivateKeyEntry(PrivateKey, Certificate[])

```java
public PrivateKeyEntry(PrivateKey privateKey, Certificate[] chain)
```

Constructs a {@code PrivateKeyEntry} with a
{@code PrivateKey} and corresponding certificate chain.

<p> The specified {@code chain} is cloned before it is stored
in the new {@code PrivateKeyEntry} object.

@param privateKey the {@code PrivateKey}
@param chain an array of {@code Certificate}s
     representing the certificate chain.
     The chain must be ordered and contain a
     {@code Certificate} at index 0
     corresponding to the private key.

@throws    NullPointerException if
     {@code privateKey} or {@code chain}
     is {@code null}
@throws    IllegalArgumentException if the specified chain has a
     length of 0, if the specified chain does not contain
     {@code Certificate}s of the same type,
     or if the {@code PrivateKey} algorithm
     does not match the algorithm of the {@code PublicKey}
     in the end entity {@code Certificate} (at index 0)

## KeyStore.PrivateKeyEntry(PrivateKey, Certificate[], Set<Attribute>)

```java
public PrivateKeyEntry(PrivateKey privateKey, Certificate[] chain, Set<Attribute> attributes)
```

Constructs a {@code PrivateKeyEntry} with a {@code PrivateKey} and
corresponding certificate chain and associated entry attributes.

<p> The specified {@code chain} and {@code attributes} are cloned
before they are stored in the new {@code PrivateKeyEntry} object.

@param privateKey the {@code PrivateKey}
@param chain an array of {@code Certificate}s
     representing the certificate chain.
     The chain must be ordered and contain a
     {@code Certificate} at index 0
     corresponding to the private key.
@param attributes the attributes

@throws    NullPointerException if {@code privateKey}, {@code chain}
     or {@code attributes} is {@code null}
@throws    IllegalArgumentException if the specified chain has a
     length of 0, if the specified chain does not contain
     {@code Certificate}s of the same type,
     or if the {@code PrivateKey} algorithm
     does not match the algorithm of the {@code PublicKey}
     in the end entity {@code Certificate} (at index 0)

@since 1.8

## KeyStore.getPrivateKey()

```java
public PrivateKey getPrivateKey()
```

Gets the {@code PrivateKey} from this entry.

@return the {@code PrivateKey} from this entry

## KeyStore.getCertificateChain()

```java
public Certificate[] getCertificateChain()
```

Gets the {@code Certificate} chain from this entry.

<p> The stored chain is cloned before being returned.

@return an array of {@code Certificate}s corresponding
     to the certificate chain for the public key.
     If the certificates are of type X.509,
     the runtime type of the returned array is
     {@code X509Certificate[]}.

## KeyStore.getCertificate()

```java
public Certificate getCertificate()
```

Gets the end entity {@code Certificate}
from the certificate chain in this entry.

@return the end entity {@code Certificate} (at index 0)
     from the certificate chain in this entry.
     If the certificate is of type X.509,
     the runtime type of the returned certificate is
     {@code X509Certificate}.

## KeyStore.getAttributes()

```java
public Set<Attribute> getAttributes()
```

Retrieves the attributes associated with an entry.

@return an unmodifiable {@code Set} of attributes, possibly empty

@since 1.8

## KeyStore.toString()

```java
public String toString()
```

Returns a string representation of this PrivateKeyEntry.
@return a string representation of this PrivateKeyEntry.

## KeyStore.SecretKeyEntry(SecretKey)

```java
public SecretKeyEntry(SecretKey secretKey)
```

Constructs a {@code SecretKeyEntry} with a
{@code SecretKey}.

@param secretKey the {@code SecretKey}

@throws    NullPointerException if {@code secretKey}
     is {@code null}

## KeyStore.SecretKeyEntry(SecretKey, Set<Attribute>)

```java
public SecretKeyEntry(SecretKey secretKey, Set<Attribute> attributes)
```

Constructs a {@code SecretKeyEntry} with a {@code SecretKey} and
associated entry attributes.

<p> The specified {@code attributes} is cloned before it is stored
in the new {@code SecretKeyEntry} object.

@param secretKey the {@code SecretKey}
@param attributes the attributes

@throws    NullPointerException if {@code secretKey} or
    {@code attributes} is {@code null}

@since 1.8

## KeyStore.getSecretKey()

```java
public SecretKey getSecretKey()
```

Gets the {@code SecretKey} from this entry.

@return the {@code SecretKey} from this entry

## KeyStore.getAttributes()

```java
public Set<Attribute> getAttributes()
```

Retrieves the attributes associated with an entry.

@return an unmodifiable {@code Set} of attributes, possibly empty

@since 1.8

## KeyStore.toString()

```java
public String toString()
```

Returns a string representation of this SecretKeyEntry.
@return a string representation of this SecretKeyEntry.

## KeyStore.TrustedCertificateEntry(Certificate)

```java
public TrustedCertificateEntry(Certificate trustedCert)
```

Constructs a {@code TrustedCertificateEntry} with a
trusted {@code Certificate}.

@param trustedCert the trusted {@code Certificate}

@throws    NullPointerException if
     {@code trustedCert} is {@code null}

## KeyStore.TrustedCertificateEntry(Certificate, Set<Attribute>)

```java
public TrustedCertificateEntry(Certificate trustedCert, Set<Attribute> attributes)
```

Constructs a {@code TrustedCertificateEntry} with a
trusted {@code Certificate} and associated entry attributes.

<p> The specified {@code attributes} is cloned before it is stored
in the new {@code TrustedCertificateEntry} object.

@param trustedCert the trusted {@code Certificate}
@param attributes the attributes

@throws    NullPointerException if {@code trustedCert} or
    {@code attributes} is {@code null}

@since 1.8

## KeyStore.getTrustedCertificate()

```java
public Certificate getTrustedCertificate()
```

Gets the trusted {@code Certificate} from this entry.

@return the trusted {@code Certificate} from this entry

## KeyStore.getAttributes()

```java
public Set<Attribute> getAttributes()
```

Retrieves the attributes associated with an entry.

@return an unmodifiable {@code Set} of attributes, possibly empty

@since 1.8

## KeyStore.toString()

```java
public String toString()
```

Returns a string representation of this TrustedCertificateEntry.
@return a string representation of this TrustedCertificateEntry.

## KeyStore.KeyStore(KeyStoreSpi, Provider, String)

```java
protected KeyStore(KeyStoreSpi keyStoreSpi, Provider provider, String type)
```

Creates a {@code KeyStore} object of the given type, and encapsulates
the given provider implementation (SPI object) in it.

@param keyStoreSpi the provider implementation.
@param provider the provider.
@param type the keystore type.

## KeyStore.getInstance(String)

```java
public static KeyStore getInstance(String type) throws KeyStoreException
```

Returns a {@code KeyStore} object of the specified type.

<p> This method traverses the list of registered security providers,
starting with the most preferred provider.
A new {@code KeyStore} object encapsulating the
{@code KeyStoreSpi} implementation from the first
provider that supports the specified type is returned.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@implNote
The JDK Reference Implementation additionally uses the
{@code jdk.security.provider.preferred}
{@link Security#getProperty(String) Security} property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
{@link Security#getProviders() Security.getProviders()}.

@param type the type of keystore.
See the KeyStore section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keystore-types">
Java Security Standard Algorithm Names Specification</a>
for information about standard keystore types.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return a keystore object of the specified type

@throws KeyStoreException if no provider supports a
        {@code KeyStoreSpi} implementation for the
        specified type

@throws NullPointerException if {@code type} is {@code null}

@see Provider

## KeyStore.getInstance(String, String)

```java
public static KeyStore getInstance(String type, String provider) throws KeyStoreException, NoSuchProviderException
```

Returns a {@code KeyStore} object of the specified type.

<p> A new {@code KeyStore} object encapsulating the
{@code KeyStoreSpi} implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param type the type of keystore.
See the KeyStore section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keystore-types">
Java Security Standard Algorithm Names Specification</a>
for information about standard keystore types.

@param provider the name of the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return a keystore object of the specified type

@throws IllegalArgumentException if the provider name is {@code null}
        or empty

@throws KeyStoreException if a {@code KeyStoreSpi}
        implementation for the specified type is not
        available from the specified provider

@throws NoSuchProviderException if the specified provider is not
        registered in the security provider list

@throws NullPointerException if {@code type} is {@code null}

@see Provider

## KeyStore.getInstance(String, Provider)

```java
public static KeyStore getInstance(String type, Provider provider) throws KeyStoreException
```

Returns a {@code KeyStore} object of the specified type.

<p> A new {@code KeyStore} object encapsulating the
{@code KeyStoreSpi} implementation from the specified provider
object is returned.  Note that the specified provider object
does not have to be registered in the provider list.

@param type the type of keystore.
See the KeyStore section in the <a href=
"{@docRoot}/../specs/security/standard-names.html#keystore-types">
Java Security Standard Algorithm Names Specification</a>
for information about standard keystore types.

@param provider the provider.

@spec security/standard-names.html Java Security Standard Algorithm Names
@return a keystore object of the specified type

@throws IllegalArgumentException if the specified provider is
        {@code null}

@throws KeyStoreException if {@code KeyStoreSpi}
        implementation for the specified type is not available
        from the specified {@code Provider} object

@throws NullPointerException if {@code type} is {@code null}

@see Provider

@since 1.4

## KeyStore.getDefaultType()

```java
public static final String getDefaultType()
```

Returns the default keystore type as specified by the
{@code keystore.type} security property, or the string
{@literal "pkcs12"} if no such property exists.

<p>The default keystore type can be used by applications that do not
want to use a hard-coded keystore type when calling one of the
{@code getInstance} methods, and want to provide a default keystore
type in case a user does not specify its own.

<p>The default keystore type can be changed by setting the value of the
{@code keystore.type} security property to the desired keystore type.

@return the default keystore type as specified by the
{@code keystore.type} security property, or the string {@literal "pkcs12"}
if no such property exists.
@see java.security.Security security properties

## KeyStore.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this keystore.

@return the provider of this keystore.

## KeyStore.getType()

```java
public final String getType()
```

Returns the type of this keystore.

@return the type of this keystore.

## KeyStore.getAttributes(String)

```java
public final Set<Entry.Attribute> getAttributes(String alias) throws KeyStoreException
```

Retrieves the attributes associated with the given alias.

@param alias the alias name
@return an unmodifiable {@code Set} of attributes. This set is
     empty if the {@code KeyStoreSpi} implementation has not overridden
     {@link KeyStoreSpi#engineGetAttributes(String)}, or the given
     alias does not exist, or there are no attributes associated
     with the alias. This set may also be empty for
     {@code PrivateKeyEntry} or {@code SecretKeyEntry}
     entries that contain protected attributes and are only available
     through the {@link Entry#getAttributes} method after the entry
     is extracted.

@throws KeyStoreException if the keystore has not been initialized
(loaded).
@throws NullPointerException if {@code alias} is {@code null}

@since 18

## KeyStore.getKey(String, char[])

```java
public final Key getKey(String alias, char[] password) throws KeyStoreException, NoSuchAlgorithmException, UnrecoverableKeyException
```

Returns the key associated with the given alias, using the given
password to recover it.  The key must have been associated with
the alias by a call to {@code setKeyEntry},
or by a call to {@code setEntry} with a
{@code PrivateKeyEntry} or {@code SecretKeyEntry}.

@param alias the alias name
@param password the password for recovering the key

@return the requested key, or {@code null} if the given alias does
not exist or does not identify a key-related entry.

@throws    KeyStoreException if the keystore has not been initialized
(loaded).
@throws    NoSuchAlgorithmException if the algorithm for recovering the
key cannot be found
@throws    UnrecoverableKeyException if the key cannot be recovered
(e.g., the given password is wrong).

## KeyStore.getCertificateChain(String)

```java
public final Certificate[] getCertificateChain(String alias) throws KeyStoreException
```

Returns the certificate chain associated with the given alias.
The certificate chain must have been associated with the alias
by a call to {@code setKeyEntry},
or by a call to {@code setEntry} with a
{@code PrivateKeyEntry}.

@param alias the alias name

@return the certificate chain (ordered with the user's certificate first
followed by zero or more certificate authorities), or {@code null}
if the given alias does not exist or does not contain a certificate chain

@throws    KeyStoreException if the keystore has not been initialized
(loaded).

## KeyStore.getCertificate(String)

```java
public final Certificate getCertificate(String alias) throws KeyStoreException
```

Returns the certificate associated with the given alias.

<p> If the given alias name identifies an entry
created by a call to {@code setCertificateEntry},
or created by a call to {@code setEntry} with a
{@code TrustedCertificateEntry},
then the trusted certificate contained in that entry is returned.

<p> If the given alias name identifies an entry
created by a call to {@code setKeyEntry},
or created by a call to {@code setEntry} with a
{@code PrivateKeyEntry},
then the first element of the certificate chain in that entry
is returned.

@param alias the alias name

@return the certificate, or {@code null} if the given alias does not
exist or does not contain a certificate.

@throws    KeyStoreException if the keystore has not been initialized
(loaded).

## KeyStore.getCreationDate(String)

```java
public final Date getCreationDate(String alias) throws KeyStoreException
```

Returns the creation date of the entry identified by the given alias.

@param alias the alias name

@return the creation date of this entry, or {@code null} if the given
alias does not exist

@throws    KeyStoreException if the keystore has not been initialized
(loaded).

## KeyStore.setKeyEntry(String, Key, char[], Certificate[])

```java
public final void setKeyEntry(String alias, Key key, char[] password, Certificate[] chain) throws KeyStoreException
```

Assigns the given key to the given alias, protecting it with the given
password.

<p>If the given key is of type {@code java.security.PrivateKey},
it must be accompanied by a certificate chain certifying the
corresponding public key.

<p>If the given alias already exists, the keystore information
associated with it is overridden by the given key (and possibly
certificate chain).

@param alias the alias name
@param key the key to be associated with the alias
@param password the password to protect the key
@param chain the certificate chain for the corresponding public
key (only required if the given key is of type
{@code java.security.PrivateKey}).

@throws    KeyStoreException if the keystore has not been initialized
(loaded), the given key cannot be protected, or this operation fails
for some other reason

## KeyStore.setKeyEntry(String, byte[], Certificate[])

```java
public final void setKeyEntry(String alias, byte[] key, Certificate[] chain) throws KeyStoreException
```

Assigns the given key (that has already been protected) to the given
alias.

<p>If the protected key is of type
{@code java.security.PrivateKey}, it must be accompanied by a
certificate chain certifying the corresponding public key. If the
underlying keystore implementation is of type {@code jks},
{@code key} must be encoded as an
{@code EncryptedPrivateKeyInfo} as defined in the PKCS #8 standard.

<p>If the given alias already exists, the keystore information
associated with it is overridden by the given key (and possibly
certificate chain).

@param alias the alias name
@param key the key (in protected format) to be associated with the alias
@param chain the certificate chain for the corresponding public
         key (only useful if the protected key is of type
         {@code java.security.PrivateKey}).

@throws    KeyStoreException if the keystore has not been initialized
(loaded), or if this operation fails for some other reason.

## KeyStore.setCertificateEntry(String, Certificate)

```java
public final void setCertificateEntry(String alias, Certificate cert) throws KeyStoreException
```

Assigns the given trusted certificate to the given alias.

<p> If the given alias identifies an existing entry
created by a call to {@code setCertificateEntry},
or created by a call to {@code setEntry} with a
{@code TrustedCertificateEntry},
the trusted certificate in the existing entry
is overridden by the given certificate.

@param alias the alias name
@param cert the certificate

@throws    KeyStoreException if the keystore has not been initialized,
or the given alias already exists and does not identify an
entry containing a trusted certificate,
or this operation fails for some other reason.

## KeyStore.deleteEntry(String)

```java
public final void deleteEntry(String alias) throws KeyStoreException
```

Deletes the entry identified by the given alias from this keystore.

@param alias the alias name

@throws    KeyStoreException if the keystore has not been initialized,
or if the entry cannot be removed.

## KeyStore.aliases()

```java
public final Enumeration<String> aliases() throws KeyStoreException
```

Lists all the alias names of this keystore.

@return enumeration of the alias names

@throws    KeyStoreException if the keystore has not been initialized
(loaded).

## KeyStore.containsAlias(String)

```java
public final boolean containsAlias(String alias) throws KeyStoreException
```

Checks if the given alias exists in this keystore.

@param alias the alias name

@return {@code true} if the alias exists, {@code false} otherwise

@throws    KeyStoreException if the keystore has not been initialized
(loaded).

## KeyStore.size()

```java
public final int size() throws KeyStoreException
```

Retrieves the number of entries in this keystore.

@return the number of entries in this keystore

@throws    KeyStoreException if the keystore has not been initialized
(loaded).

## KeyStore.isKeyEntry(String)

```java
public final boolean isKeyEntry(String alias) throws KeyStoreException
```

Returns {@code true} if the entry identified by the given alias
was created by a call to {@code setKeyEntry},
or created by a call to {@code setEntry} with a
{@code PrivateKeyEntry} or a {@code SecretKeyEntry}.

@param alias the alias for the keystore entry to be checked

@return {@code true} if the entry identified by the given alias is a
key-related entry, {@code false} otherwise.

@throws    KeyStoreException if the keystore has not been initialized
(loaded).

## KeyStore.isCertificateEntry(String)

```java
public final boolean isCertificateEntry(String alias) throws KeyStoreException
```

Returns {@code true} if the entry identified by the given alias
was created by a call to {@code setCertificateEntry},
or created by a call to {@code setEntry} with a
{@code TrustedCertificateEntry}.

@param alias the alias for the keystore entry to be checked

@return {@code true} if the entry identified by the given alias
contains a trusted certificate, {@code false} otherwise.

@throws    KeyStoreException if the keystore has not been initialized
(loaded).

## KeyStore.getCertificateAlias(Certificate)

```java
public final String getCertificateAlias(Certificate cert) throws KeyStoreException
```

Returns the (alias) name of the first keystore entry whose certificate
matches the given certificate.

<p> This method attempts to match the given certificate with each
keystore entry. If the entry being considered was
created by a call to {@code setCertificateEntry},
or created by a call to {@code setEntry} with a
{@code TrustedCertificateEntry},
then the given certificate is compared to that entry's certificate.

<p> If the entry being considered was
created by a call to {@code setKeyEntry},
or created by a call to {@code setEntry} with a
{@code PrivateKeyEntry},
then the given certificate is compared to the first
element of that entry's certificate chain.

@param cert the certificate to match with.

@return the alias name of the first entry with a matching certificate,
or {@code null} if no such entry exists in this keystore.

@throws    KeyStoreException if the keystore has not been initialized
(loaded).

## KeyStore.store(OutputStream, char[])

```java
public final void store(OutputStream stream, char[] password) throws KeyStoreException, IOException, NoSuchAlgorithmException, CertificateException
```

Stores this keystore to the given output stream, and protects its
integrity with the given password.

@param stream the output stream to which this keystore is written.
@param password the password to generate the keystore integrity check.
                May be {@code null} if the keystore does not support
                or require an integrity check.

@throws    KeyStoreException if the keystore has not been initialized
(loaded).
@throws    IOException if there was an I/O problem with data
@throws    NoSuchAlgorithmException if the appropriate data integrity
algorithm could not be found
@throws    CertificateException if any of the certificates included in
the keystore data could not be stored

## KeyStore.store(LoadStoreParameter)

```java
public final void store(LoadStoreParameter param) throws KeyStoreException, IOException, NoSuchAlgorithmException, CertificateException
```

Stores this keystore using the given {@code LoadStoreParameter}.

@param param the {@code LoadStoreParameter}
         that specifies how to store the keystore,
         which may be {@code null}

@throws    IllegalArgumentException if the given
         {@code LoadStoreParameter}
         input is not recognized
@throws    KeyStoreException if the keystore has not been initialized
         (loaded)
@throws    IOException if there was an I/O problem with data
@throws    NoSuchAlgorithmException if the appropriate data integrity
         algorithm could not be found
@throws    CertificateException if any of the certificates included in
         the keystore data could not be stored
@throws    UnsupportedOperationException if this operation is not supported

@since 1.5

## KeyStore.load(InputStream, char[])

```java
public final void load(InputStream stream, char[] password) throws IOException, NoSuchAlgorithmException, CertificateException
```

Loads this keystore from the given input stream.

<p>A password may be given to unlock the keystore
(e.g. the keystore resides on a hardware token device),
or to check the integrity of the keystore data.
If a password is not given for integrity checking,
then integrity checking is not performed.

<p>In order to create an empty keystore, or if the keystore cannot
be initialized from a stream, pass {@code null}
as the {@code stream} argument.

<p> Note that if this keystore has already been loaded, it is
reinitialized and loaded again from the given input stream.

@param stream the input stream from which the keystore is loaded,
or {@code null}
@param password the password used to check the integrity of
the keystore, the password used to unlock the keystore,
or {@code null}

@throws    IOException if there is an I/O or format problem with the
keystore data, if a password is required but not given,
or if the given password was incorrect. If the error is due to a
wrong password, the {@link Throwable#getCause cause} of the
{@code IOException} should be an
{@code UnrecoverableKeyException}
@throws    NoSuchAlgorithmException if the algorithm used to check
the integrity of the keystore cannot be found
@throws    CertificateException if any of the certificates in the
keystore could not be loaded

## KeyStore.load(LoadStoreParameter)

```java
public final void load(LoadStoreParameter param) throws IOException, NoSuchAlgorithmException, CertificateException
```

Loads this keystore using the given {@code LoadStoreParameter}.

<p> Note that if this {@code KeyStore} has already been loaded, it is
reinitialized and loaded again from the given parameter.

@param param the {@code LoadStoreParameter}
         that specifies how to load the keystore,
         which may be {@code null}

@throws    IllegalArgumentException if the given
         {@code LoadStoreParameter}
         input is not recognized
@throws    IOException if there is an I/O or format problem with the
         keystore data. If the error is due to an incorrect
        {@code ProtectionParameter} (e.g. wrong password)
        the {@link Throwable#getCause cause} of the
        {@code IOException} should be an
        {@code UnrecoverableKeyException}
@throws    NoSuchAlgorithmException if the algorithm used to check
         the integrity of the keystore cannot be found
@throws    CertificateException if any of the certificates in the
         keystore could not be loaded

@since 1.5

## KeyStore.getEntry(String, ProtectionParameter)

```java
public final Entry getEntry(String alias, ProtectionParameter protParam) throws NoSuchAlgorithmException, UnrecoverableEntryException, KeyStoreException
```

Gets a keystore {@code Entry} for the specified alias
with the specified protection parameter.

@param alias get the keystore {@code Entry} for this alias
@param protParam the {@code ProtectionParameter}
         used to protect the {@code Entry},
         which may be {@code null}

@return the keystore {@code Entry} for the specified alias,
         or {@code null} if there is no such entry

@throws    NullPointerException if
         {@code alias} is {@code null}
@throws    NoSuchAlgorithmException if the algorithm for recovering the
         entry cannot be found
@throws    UnrecoverableEntryException if the specified
         {@code protParam} were insufficient or invalid
@throws    UnrecoverableKeyException if the entry is a
         {@code PrivateKeyEntry} or {@code SecretKeyEntry}
         and the specified {@code protParam} does not contain
         the information needed to recover the key (e.g. wrong password)
@throws    KeyStoreException if the keystore has not been initialized
         (loaded).
@see #setEntry(String, KeyStore.Entry, KeyStore.ProtectionParameter)

@since 1.5

## KeyStore.setEntry(String, Entry, ProtectionParameter)

```java
public final void setEntry(String alias, Entry entry, ProtectionParameter protParam) throws KeyStoreException
```

Saves a keystore {@code Entry} under the specified alias.
The protection parameter is used to protect the
{@code Entry}.

<p> If an entry already exists for the specified alias,
it is overridden.

@param alias save the keystore {@code Entry} under this alias
@param entry the {@code Entry} to save
@param protParam the {@code ProtectionParameter}
         used to protect the {@code Entry},
         which may be {@code null}

@throws    NullPointerException if
         {@code alias} or {@code entry}
         is {@code null}
@throws    KeyStoreException if the keystore has not been initialized
         (loaded), or if this operation fails for some other reason

@see #getEntry(String, KeyStore.ProtectionParameter)

@since 1.5

## KeyStore.entryInstanceOf(String, Class<? extends KeyStore.Entry>)

```java
public final boolean entryInstanceOf(String alias, Class<? extends KeyStore.Entry> entryClass) throws KeyStoreException
```

Determines if the keystore {@code Entry} for the specified
{@code alias} is an instance or subclass of the specified
{@code entryClass}.

@param alias the alias name
@param entryClass the entry class

@return {@code true} if the keystore {@code Entry} for the specified
         {@code alias} is an instance or subclass of the
         specified {@code entryClass}, {@code false} otherwise

@throws    NullPointerException if
         {@code alias} or {@code entryClass}
         is {@code null}
@throws    KeyStoreException if the keystore has not been
         initialized (loaded)

@since 1.5

## KeyStore.getInstance(File, char[])

```java
public static final KeyStore getInstance(File file, char[] password) throws KeyStoreException, IOException, NoSuchAlgorithmException, CertificateException
```

Returns a loaded keystore object of the appropriate keystore type.
First the keystore type is determined by probing the specified file.
Then a keystore object is instantiated and loaded using the data from
that file.

<p>
A password may be given to unlock the keystore
(e.g. the keystore resides on a hardware token device),
or to check the integrity of the keystore data.
If a password is not given for integrity checking,
then integrity checking is not performed.

<p>
This method traverses the list of registered security
{@linkplain Provider providers}, starting with the most
preferred provider.
For each {@link KeyStoreSpi} implementation supported by a
provider, it invokes the {@link
KeyStoreSpi#engineProbe(InputStream) engineProbe} method to
determine if it supports the specified keystore.
A new {@code KeyStore} object is returned that encapsulates the
{@code KeyStoreSpi}
implementation from the first provider that supports the specified file.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param  file the keystore file
@param  password the keystore password, which may be {@code null}

@return a keystore object loaded with keystore data

@throws KeyStoreException if no provider supports a {@code KeyStoreSpi}
            implementation for the specified keystore file.
@throws IOException if there is an I/O or format problem with the
            keystore data, if a password is required but not given,
            or if the given password was incorrect. If the error is
            due to a wrong password, the {@link Throwable#getCause cause}
            of the {@code IOException} should be an
            {@code UnrecoverableKeyException}.
@throws NoSuchAlgorithmException if the algorithm used to check the
            integrity of the keystore cannot be found.
@throws CertificateException if any of the certificates in the
            keystore could not be loaded.
@throws IllegalArgumentException if file does not exist or does not
            refer to a normal file.
@throws NullPointerException if file is {@code null}.

@see Provider

@since 9

## KeyStore.getInstance(File, LoadStoreParameter)

```java
public static final KeyStore getInstance(File file, LoadStoreParameter param) throws KeyStoreException, IOException, NoSuchAlgorithmException, CertificateException
```

Returns a loaded keystore object of the appropriate keystore type.
First the keystore type is determined by probing the specified file.
Then a keystore object is instantiated and loaded using the data from
that file.
A {@code LoadStoreParameter} may be supplied which specifies how to
unlock the keystore data or perform an integrity check.

<p>
This method traverses the list of registered security {@linkplain
Provider providers}, starting with the most preferred provider.
For each {@link KeyStoreSpi} implementation supported by a
provider, it invokes the {@link
KeyStoreSpi#engineProbe(InputStream) engineProbe} method to
determine if it supports the specified keystore.
A new {@code KeyStore} object is returned that encapsulates the
{@code KeyStoreSpi}
implementation from the first provider that supports the specified file.

<p> Note that the list of registered providers may be retrieved via
the {@link Security#getProviders() Security.getProviders()} method.

@param  file the keystore file
@param  param the {@code LoadStoreParameter} that specifies how to load
            the keystore, which may be {@code null}

@return a keystore object loaded with keystore data

@throws KeyStoreException if no provider supports a {@code KeyStoreSpi}
            implementation for the specified keystore file.
@throws IOException if there is an I/O or format problem with the
            keystore data. If the error is due to an incorrect
            {@code ProtectionParameter} (e.g. wrong password)
            the {@link Throwable#getCause cause} of the
            {@code IOException} should be an
            {@code UnrecoverableKeyException}.
@throws NoSuchAlgorithmException if the algorithm used to check the
            integrity of the keystore cannot be found.
@throws CertificateException if any of the certificates in the
            keystore could not be loaded.
@throws IllegalArgumentException if file does not exist or does not
            refer to a normal file, or if param is not recognized.
@throws NullPointerException if file is {@code null}.

@see Provider

@since 9

## KeyStore.Builder()

```java
protected Builder()
```

Construct a new {@code Builder}.

## KeyStore.getKeyStore()

```java
public abstract KeyStore getKeyStore() throws KeyStoreException
```

Returns the {@code KeyStore} described by this object.

@return the {@code KeyStore} described by this object
@throws    KeyStoreException if an error occurred during the
  operation, for example if the {@code KeyStore} could not be
  instantiated or loaded

## KeyStore.getProtectionParameter(String)

```java
public abstract ProtectionParameter getProtectionParameter(String alias) throws KeyStoreException
```

Returns the {@code ProtectionParameter} that should be used to obtain
the {@link KeyStore.Entry Entry} with the given alias.
The {@code getKeyStore} method must be invoked before this
method may be called.

@return the {@code ProtectionParameter} that should be used to obtain
  the {@link KeyStore.Entry Entry} with the given alias.
@param alias the alias of the {@code KeyStore} entry
@throws NullPointerException if alias is {@code null}
@throws KeyStoreException if an error occurred during the
  operation
@throws IllegalStateException if the {@code getKeyStore} method has
  not been invoked prior to calling this method

## KeyStore.newInstance(KeyStore, ProtectionParameter)

```java
public static Builder newInstance(final KeyStore keyStore, final ProtectionParameter protectionParameter)
```

Returns a new {@code Builder} that encapsulates the given
{@code KeyStore}.
The {@linkplain #getKeyStore} method of the returned object
will return {@code keyStore}, the {@linkplain
#getProtectionParameter getProtectionParameter()} method will
return {@code protectionParameters}.

<p> This is useful if an existing {@code KeyStore} object needs to be
used with builder-based APIs.

@return a new {@code Builder} object
@param keyStore the {@code KeyStore} to be encapsulated
@param protectionParameter the {@code ProtectionParameter} used to
  protect the {@code KeyStore} entries
@throws NullPointerException if {@code keyStore} or
  {@code protectionParameter} is {@code null}
@throws IllegalArgumentException if the {@code keyStore} has not been
  initialized

## KeyStore.newInstance(String, Provider, File, ProtectionParameter)

```java
public static Builder newInstance(String type, Provider provider, File file, ProtectionParameter protection)
```

Returns a new {@code Builder} object.

<p>The first call to the {@link #getKeyStore} method on the returned
builder will create a {@code KeyStore} of type {@code type} and call
its {@link KeyStore#load load()} method.
The {@code inputStream} argument is constructed from
{@code file}.
If {@code protection} is a
{@code PasswordProtection}, the password is obtained by
calling the {@code getPassword} method.
Otherwise, if {@code protection} is a
{@code CallbackHandlerProtection}, the password is obtained
by invoking the CallbackHandler.

<p>Subsequent calls to {@link #getKeyStore} return the same object
as the initial call. If the initial call failed with a
{@code KeyStoreException}, subsequent calls also throw a
{@code KeyStoreException}.

<p>The {@code KeyStore} is instantiated from {@code provider} if
non-null. Otherwise, all installed providers are searched.

<p>Calls to {@link #getProtectionParameter getProtectionParameter()}
will return a {@link KeyStore.PasswordProtection PasswordProtection}
object encapsulating the password that was used to invoke the
{@code load} method.

@return a new {@code Builder} object
@param type the type of {@code KeyStore} to be constructed
@param provider the provider from which the {@code KeyStore} is to
  be instantiated (or {@code null})
@param file the File that contains the {@code KeyStore} data
@param protection the {@code ProtectionParameter} securing the
{@code KeyStore} data
@throws NullPointerException if type, file or protection is
{@code null}
@throws IllegalArgumentException if protection is not an instance
  of either PasswordProtection or CallbackHandlerProtection; or
  if file does not exist or does not refer to a normal file

## KeyStore.newInstance(File, ProtectionParameter)

```java
public static Builder newInstance(File file, ProtectionParameter protection)
```

Returns a new {@code Builder} object.

<p>The first call to the {@link #getKeyStore} method on the returned
builder will create a {@code KeyStore} using {@code file} to detect
the keystore type and then call its {@link KeyStore#load load()}
method.
It uses the same algorithm to determine the keystore type as
described in {@link KeyStore#getInstance(File, LoadStoreParameter)}.
The {@code inputStream} argument is constructed from {@code file}.
If {@code protection} is a {@code PasswordProtection}, the password
is obtained by calling the {@code getPassword} method.
Otherwise, if {@code protection} is a
{@code CallbackHandlerProtection},
the password is obtained by invoking the CallbackHandler.

<p>Subsequent calls to {@link #getKeyStore} return the same object
as the initial call. If the initial call failed with a
{@code KeyStoreException}, subsequent calls also throw a
{@code KeyStoreException}.

<p>Calls to {@link #getProtectionParameter getProtectionParameter()}
will return a {@link KeyStore.PasswordProtection PasswordProtection}
object encapsulating the password that was used to invoke the
{@code load} method.

@return a new {@code Builder} object
@param file the File that contains the {@code KeyStore} data
@param protection the {@code ProtectionParameter} securing the
{@code KeyStore} data
@throws NullPointerException if file or protection is {@code null}
@throws IllegalArgumentException if protection is not an instance
  of either PasswordProtection or CallbackHandlerProtection; or
  if file does not exist or does not refer to a normal file

@since 9

## KeyStore.newInstance(String, Provider, ProtectionParameter)

```java
public static Builder newInstance(final String type, final Provider provider, final ProtectionParameter protection)
```

Returns a new {@code Builder} object.

<p>Each call to the {@link #getKeyStore} method on the returned
builder will return a new {@code KeyStore} object of type
{@code type}.
Its {@link KeyStore#load(KeyStore.LoadStoreParameter) load()}
method is invoked using a
{@code LoadStoreParameter} that encapsulates
{@code protection}.

<p>The {@code KeyStore} is instantiated from {@code provider} if
non-null. Otherwise, all installed providers are searched.

<p>Calls to {@link #getProtectionParameter getProtectionParameter()}
will return {@code protection}.

@return a new {@code Builder} object
@param type the type of {@code KeyStore} to be constructed
@param provider the provider from which the {@code KeyStore} is to
  be instantiated (or {@code null})
@param protection the {@code ProtectionParameter} securing the
{@code Keystore}
@throws NullPointerException if type or protection is {@code null}