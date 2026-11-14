# KeyStoreSpi class (java.security)

```java
public abstract class KeyStoreSpi
```

This class defines the <i>Service Provider Interface</i> (<b>SPI</b>)
for the {@code KeyStore} class.
All the abstract methods in this class must be implemented by each
cryptographic service provider who wishes to supply the implementation
of a keystore for a particular keystore type.

@author Jan Luehe


@see KeyStore

@since 1.2

## KeyStoreSpi.KeyStoreSpi()

```java
public KeyStoreSpi()
```

Constructor for subclasses to call.

## KeyStoreSpi.engineGetKey(String, char[])

```java
public abstract Key engineGetKey(String alias, char[] password) throws NoSuchAlgorithmException, UnrecoverableKeyException
```

Returns the key associated with the given alias, using the given
password to recover it.  The key must have been associated with
the alias by a call to {@code setKeyEntry},
or by a call to {@code setEntry} with a
{@code PrivateKeyEntry} or {@code SecretKeyEntry}.

@param alias the alias name
@param password the password for recovering the key

@return the requested key, or {@code null} if the given alias
does not exist or does not identify a key-related entry.

@throws    NoSuchAlgorithmException if the algorithm for recovering the
key cannot be found
@throws    UnrecoverableKeyException if the key cannot be recovered
(e.g., the given password is wrong).

## KeyStoreSpi.engineGetCertificateChain(String)

```java
public abstract Certificate[] engineGetCertificateChain(String alias)
```

Returns the certificate chain associated with the given alias.
The certificate chain must have been associated with the alias
by a call to {@code setKeyEntry},
or by a call to {@code setEntry} with a
{@code PrivateKeyEntry}.

@param alias the alias name

@return the certificate chain (ordered with the user's certificate first
and the root certificate authority last), or {@code null} if the
given alias * does not exist or does not contain a certificate chain

## KeyStoreSpi.engineGetCertificate(String)

```java
public abstract Certificate engineGetCertificate(String alias)
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
(if a chain exists) is returned.

@param alias the alias name

@return the certificate, or {@code null} if the given alias does not
exist or does not contain a certificate.

## KeyStoreSpi.engineGetCreationDate(String)

```java
public abstract Date engineGetCreationDate(String alias)
```

Returns the creation date of the entry identified by the given alias.

@param alias the alias name

@return the creation date of this entry, or {@code null}
if the given alias does not exist

## KeyStoreSpi.engineSetKeyEntry(String, Key, char[], Certificate[])

```java
public abstract void engineSetKeyEntry(String alias, Key key, char[] password, Certificate[] chain) throws KeyStoreException
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

@throws    KeyStoreException if the given key cannot be protected, or
this operation fails for some other reason

## KeyStoreSpi.engineSetKeyEntry(String, byte[], Certificate[])

```java
public abstract void engineSetKeyEntry(String alias, byte[] key, Certificate[] chain) throws KeyStoreException
```

Assigns the given key (that has already been protected) to the given
alias.

<p>If the protected key is of type
{@code java.security.PrivateKey},
it must be accompanied by a certificate chain certifying the
corresponding public key.

<p>If the given alias already exists, the keystore information
associated with it is overridden by the given key (and possibly
certificate chain).

@param alias the alias name
@param key the key (in protected format) to be associated with the alias
@param chain the certificate chain for the corresponding public
key (only useful if the protected key is of type
{@code java.security.PrivateKey}).

@throws    KeyStoreException if this operation fails.

## KeyStoreSpi.engineSetCertificateEntry(String, Certificate)

```java
public abstract void engineSetCertificateEntry(String alias, Certificate cert) throws KeyStoreException
```

Assigns the given certificate to the given alias.

<p> If the given alias identifies an existing entry
created by a call to {@code setCertificateEntry},
or created by a call to {@code setEntry} with a
{@code TrustedCertificateEntry},
the trusted certificate in the existing entry
is overridden by the given certificate.

@param alias the alias name
@param cert the certificate

@throws    KeyStoreException if the given alias already exists and does
not identify an entry containing a trusted certificate,
or this operation fails for some other reason.

## KeyStoreSpi.engineDeleteEntry(String)

```java
public abstract void engineDeleteEntry(String alias) throws KeyStoreException
```

Deletes the entry identified by the given alias from this keystore.

@param alias the alias name

@throws    KeyStoreException if the entry cannot be removed.

## KeyStoreSpi.engineAliases()

```java
public abstract Enumeration<String> engineAliases()
```

Lists all the alias names of this keystore.

@return enumeration of the alias names

## KeyStoreSpi.engineContainsAlias(String)

```java
public abstract boolean engineContainsAlias(String alias)
```

Checks if the given alias exists in this keystore.

@param alias the alias name

@return {@code true} if the alias exists, {@code false} otherwise

## KeyStoreSpi.engineSize()

```java
public abstract int engineSize()
```

Retrieves the number of entries in this keystore.

@return the number of entries in this keystore

## KeyStoreSpi.engineIsKeyEntry(String)

```java
public abstract boolean engineIsKeyEntry(String alias)
```

Returns {@code true} if the entry identified by the given alias
was created by a call to {@code setKeyEntry},
or created by a call to {@code setEntry} with a
{@code PrivateKeyEntry} or a {@code SecretKeyEntry}.

@param alias the alias for the keystore entry to be checked

@return {@code true} if the entry identified by the given alias is a
key-related, {@code false} otherwise.

## KeyStoreSpi.engineIsCertificateEntry(String)

```java
public abstract boolean engineIsCertificateEntry(String alias)
```

Returns {@code true} if the entry identified by the given alias
was created by a call to {@code setCertificateEntry},
or created by a call to {@code setEntry} with a
{@code TrustedCertificateEntry}.

@param alias the alias for the keystore entry to be checked

@return {@code true} if the entry identified by the given alias
contains a trusted certificate, {@code false} otherwise.

## KeyStoreSpi.engineGetCertificateAlias(Certificate)

```java
public abstract String engineGetCertificateAlias(Certificate cert)
```

Returns the (alias) name of the first keystore entry whose certificate
matches the given certificate.

<p>This method attempts to match the given certificate with each
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

@return the alias name of the first entry with matching certificate,
or {@code null} if no such entry exists in this keystore.

## KeyStoreSpi.engineStore(OutputStream, char[])

```java
public abstract void engineStore(OutputStream stream, char[] password) throws IOException, NoSuchAlgorithmException, CertificateException
```

Stores this keystore to the given output stream, and protects its
integrity with the given password.

@param stream the output stream to which this keystore is written.
@param password the password to generate the keystore integrity check.
                May be {@code null} if the keystore does not support
                or require an integrity check.

@throws    IOException if there was an I/O problem with data
@throws    NoSuchAlgorithmException if the appropriate data integrity
algorithm could not be found
@throws    CertificateException if any of the certificates included in
the keystore data could not be stored

## KeyStoreSpi.engineStore(KeyStore.LoadStoreParameter)

```java
public void engineStore(KeyStore.LoadStoreParameter param) throws IOException, NoSuchAlgorithmException, CertificateException
```

Stores this keystore using the given
{@code KeyStore.LoadStoreParameter}.

@implSpec The default implementation throws
         an {@link UnsupportedOperationException}.

@param param the {@code KeyStore.LoadStoreParameter}
         that specifies how to store the keystore,
         which may be {@code null}

@throws    IllegalArgumentException if the given
         {@code KeyStore.LoadStoreParameter}
         input is not recognized
@throws    IOException if there was an I/O problem with data
@throws    NoSuchAlgorithmException if the appropriate data integrity
         algorithm could not be found
@throws    CertificateException if any of the certificates included in
         the keystore data could not be stored
@throws    UnsupportedOperationException if the implementation does
         not support this operation

@since 1.5

## KeyStoreSpi.engineLoad(InputStream, char[])

```java
public abstract void engineLoad(InputStream stream, char[] password) throws IOException, NoSuchAlgorithmException, CertificateException
```

Loads the keystore from the given input stream.

<p>A password may be given to unlock the keystore
(e.g. the keystore resides on a hardware token device),
or to check the integrity of the keystore data.
If a password is not given for integrity checking,
then integrity checking is not performed.

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

## KeyStoreSpi.engineLoad(KeyStore.LoadStoreParameter)

```java
public void engineLoad(KeyStore.LoadStoreParameter param) throws IOException, NoSuchAlgorithmException, CertificateException
```

Loads the keystore using the given
{@code KeyStore.LoadStoreParameter}.

<p> Note that if this KeyStore has already been loaded, it is
reinitialized and loaded again from the given parameter.

@param param the {@code KeyStore.LoadStoreParameter}
         that specifies how to load the keystore,
         which may be {@code null}

@implSpec
The default implementation examines {@code KeyStore.LoadStoreParameter}
to extract its password and pass it to
{@link KeyStoreSpi#engineLoad(InputStream, char[])} along with a
{@code null} {@code InputStream}.
<p>
If {@code KeyStore.LoadStoreParameter} is {@code null} then
the password parameter will also be {@code null}.
Otherwise, the {@code KeyStore.ProtectionParameter} of
{@code KeyStore.LoadStoreParameter} must be either a
{@code KeyStore.PasswordProtection} or a
{@code KeyStore.CallbackHandlerProtection} that supports
{@code PasswordCallback} so that the password parameter can be
extracted. If the {@code KeyStore.ProtectionParameter} is neither
of those classes then a {@code NoSuchAlgorithmException} is thrown.

@throws    IllegalArgumentException if the given
         {@code KeyStore.LoadStoreParameter}
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

## KeyStoreSpi.engineGetAttributes(String)

```java
public Set<Entry.Attribute> engineGetAttributes(String alias)
```

Retrieves the attributes associated with the given alias.

@implSpec
The default implementation returns an empty {@code Set}.
{@code KeyStoreSpi} implementations that support attributes
should override this method.

@param alias the alias name
@return an unmodifiable {@code Set} of attributes. This set is
     empty if the given alias does not exist or there are no
     attributes associated with the alias. This set may also be
     empty for {@code PrivateKeyEntry} or {@code SecretKeyEntry}
     entries that contain protected attributes. These protected
     attributes should be populated into the result returned by
     {@link #engineGetEntry} and can be retrieved by calling
     the {@link Entry#getAttributes} method.

@since 18

## KeyStoreSpi.engineGetEntry(String, KeyStore.ProtectionParameter)

```java
public KeyStore.Entry engineGetEntry(String alias, KeyStore.ProtectionParameter protParam) throws KeyStoreException, NoSuchAlgorithmException, UnrecoverableEntryException
```

Gets a {@code KeyStore.Entry} for the specified alias
with the specified protection parameter.

@param alias get the {@code KeyStore.Entry} for this alias
@param protParam the {@code ProtectionParameter}
         used to protect the {@code Entry},
         which may be {@code null}

@return the {@code KeyStore.Entry} for the specified alias,
         or {@code null} if there is no such entry

@throws    KeyStoreException if the operation failed
@throws    NoSuchAlgorithmException if the algorithm for recovering the
         entry cannot be found
@throws    UnrecoverableEntryException if the specified
         {@code protParam} were insufficient or invalid
@throws    UnrecoverableKeyException if the entry is a
         {@code PrivateKeyEntry} or {@code SecretKeyEntry}
         and the specified {@code protParam} does not contain
         the information needed to recover the key (e.g. wrong password)

@since 1.5

## KeyStoreSpi.engineSetEntry(String, KeyStore.Entry, KeyStore.ProtectionParameter)

```java
public void engineSetEntry(String alias, KeyStore.Entry entry, KeyStore.ProtectionParameter protParam) throws KeyStoreException
```

Saves a {@code KeyStore.Entry} under the specified alias.
The specified protection parameter is used to protect the
{@code Entry}.

<p> If an entry already exists for the specified alias,
it is overridden.

@param alias save the {@code KeyStore.Entry} under this alias
@param entry the {@code Entry} to save
@param protParam the {@code ProtectionParameter}
         used to protect the {@code Entry},
         which may be {@code null}

@throws    KeyStoreException if this operation fails

@since 1.5

## KeyStoreSpi.engineEntryInstanceOf(String, Class<? extends KeyStore.Entry>)

```java
public boolean engineEntryInstanceOf(String alias, Class<? extends KeyStore.Entry> entryClass)
```

Determines if the keystore {@code Entry} for the specified
{@code alias} is an instance or subclass of the specified
{@code entryClass}.

@param alias the alias name
@param entryClass the entry class

@return {@code true} if the keystore {@code Entry} for the specified
         {@code alias} is an instance or subclass of the
         specified {@code entryClass}, false otherwise

@since 1.5

## KeyStoreSpi.engineProbe(InputStream)

```java
public boolean engineProbe(InputStream stream) throws IOException
```

Probes the specified input stream to determine whether it contains a
keystore that is supported by this implementation, or not.

@implSpec
This method returns {@code false} by default. Keystore implementations
should override this method to peek at the data stream directly or
to use other content detection mechanisms.

@param  stream the keystore data to be probed

@return {@code true} if the keystore data is supported,
otherwise {@code false}

@throws IOException if there is an I/O problem with the keystore data.
@throws NullPointerException if stream is {@code null}.

@since 9