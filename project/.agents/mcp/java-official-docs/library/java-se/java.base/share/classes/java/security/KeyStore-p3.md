---
title: "KeyStore class (java.security) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyStore.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyStore class (java.security) (part 3 of 4)

## KeyStore.store(OutputStream, char[])

```java
public final void store(OutputStream stream, char[] password) throws KeyStoreException, IOException, NoSuchAlgorithmException, CertificateException
```

Stores this keystore to the given output stream, and protects its
integrity with the given password.

Parameters:

- `stream`: the output stream to which this keystore is written.
- `password`: the password to generate the keystore integrity check. May be `null` if the keystore does not support or require an integrity check.

Throws:

- `KeyStoreException`: if the keystore has not been initialized (loaded).
- `IOException`: if there was an I/O problem with data
- `NoSuchAlgorithmException`: if the appropriate data integrity algorithm could not be found
- `CertificateException`: if any of the certificates included in the keystore data could not be stored

## KeyStore.store(LoadStoreParameter)

```java
public final void store(LoadStoreParameter param) throws KeyStoreException, IOException, NoSuchAlgorithmException, CertificateException
```

Stores this keystore using the given `LoadStoreParameter`.

Parameters:

- `param`: the `LoadStoreParameter` that specifies how to store the keystore, which may be `null`

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if the given `LoadStoreParameter` input is not recognized
- `KeyStoreException`: if the keystore has not been initialized (loaded)
- `IOException`: if there was an I/O problem with data
- `NoSuchAlgorithmException`: if the appropriate data integrity algorithm could not be found
- `CertificateException`: if any of the certificates included in the keystore data could not be stored
- `UnsupportedOperationException`: if this operation is not supported

## KeyStore.load(InputStream, char[])

```java
public final void load(InputStream stream, char[] password) throws IOException, NoSuchAlgorithmException, CertificateException
```

Loads this keystore from the given input stream.

A password may be given to unlock the keystore
(e.g. the keystore resides on a hardware token <example-value>),
or to check the integrity of the keystore data.
If a password is not given for integrity checking,
then integrity checking is not performed.

In order to create an empty keystore, or if the keystore cannot
be initialized from a stream, pass `null`
as the `stream` argument.

 Note that if this keystore has already been loaded, it is
reinitialized and loaded again from the given input stream.

Parameters:

- `stream`: the input stream from which the keystore is loaded, or `null`
- `password`: the password used to check the integrity of the keystore, the password used to unlock the keystore, or `null`

Throws:

- `IOException`: if there is an I/O or format problem with the keystore data, if a password is required but not given, or if the given password was incorrect. If the error is due to a wrong password, the cause of the `IOException` should be an `UnrecoverableKeyException`
- `NoSuchAlgorithmException`: if the algorithm used to check the integrity of the keystore cannot be found
- `CertificateException`: if any of the certificates in the keystore could not be loaded

## KeyStore.load(LoadStoreParameter)

```java
public final void load(LoadStoreParameter param) throws IOException, NoSuchAlgorithmException, CertificateException
```

Loads this keystore using the given `LoadStoreParameter`.

 Note that if this `KeyStore` has already been loaded, it is
reinitialized and loaded again from the given parameter.

Parameters:

- `param`: the `LoadStoreParameter` that specifies how to load the keystore, which may be `null`

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if the given `LoadStoreParameter` input is not recognized
- `IOException`: if there is an I/O or format problem with the keystore data. If the error is due to an incorrect `ProtectionParameter` (e.g. wrong password) the cause of the `IOException` should be an `UnrecoverableKeyException`
- `NoSuchAlgorithmException`: if the algorithm used to check the integrity of the keystore cannot be found
- `CertificateException`: if any of the certificates in the keystore could not be loaded

## KeyStore.getEntry(String, ProtectionParameter)

```java
public final Entry getEntry(String alias, ProtectionParameter protParam) throws NoSuchAlgorithmException, UnrecoverableEntryException, KeyStoreException
```

Gets a keystore `Entry` for the specified alias
with the specified protection parameter.

Parameters:

- `alias`: get the keystore `Entry` for this alias
- `protParam`: the `ProtectionParameter` used to protect the `Entry`, which may be `null`

**Returns:** the keystore `Entry` for the specified alias,
         or `null` if there is no such entry

**See also:** #setEntry(String, KeyStore.Entry, KeyStore.ProtectionParameter)

**Since:** 1.5

Throws:

- `NullPointerException`: if `alias` is `null`
- `NoSuchAlgorithmException`: if the algorithm for recovering the entry cannot be found
- `UnrecoverableEntryException`: if the specified `protParam` were insufficient or invalid
- `UnrecoverableKeyException`: if the entry is a `PrivateKeyEntry` or `SecretKeyEntry` and the specified `protParam` does not contain the information needed to recover the key (e.g. wrong password)
- `KeyStoreException`: if the keystore has not been initialized (loaded).

## KeyStore.setEntry(String, Entry, ProtectionParameter)

```java
public final void setEntry(String alias, Entry entry, ProtectionParameter protParam) throws KeyStoreException
```

Saves a keystore `Entry` under the specified alias.
The protection parameter is used to protect the
`Entry`.

 If an entry already exists for the specified alias,
it is overridden.

Parameters:

- `alias`: save the keystore `Entry` under this alias
- `entry`: the `Entry` to save
- `protParam`: the `ProtectionParameter` used to protect the `Entry`, which may be `null`

**See also:** #getEntry(String, KeyStore.ProtectionParameter)

**Since:** 1.5

Throws:

- `NullPointerException`: if `alias` or `entry` is `null`
- `KeyStoreException`: if the keystore has not been initialized (loaded), or if this operation fails for some other reason

## KeyStore.entryInstanceOf(String, Class<? extends KeyStore.Entry>)

```java
public final boolean entryInstanceOf(String alias, Class<? extends KeyStore.Entry> entryClass) throws KeyStoreException
```

Determines if the keystore `Entry` for the specified
`alias` is an instance or subclass of the specified
`entryClass`.

Parameters:

- `alias`: the alias name
- `entryClass`: the entry class

**Returns:** `true` if the keystore `Entry` for the specified
         `alias` is an instance or subclass of the
         specified `entryClass`, `false` otherwise

**Since:** 1.5

Throws:

- `NullPointerException`: if `alias` or `entryClass` is `null`
- `KeyStoreException`: if the keystore has not been initialized (loaded)

## KeyStore.getInstance(File, char[])

```java
public static final KeyStore getInstance(File file, char[] password) throws KeyStoreException, IOException, NoSuchAlgorithmException, CertificateException
```

Returns a loaded keystore object of the appropriate keystore type.
First the keystore type is determined by probing the specified file.
Then a keystore object is instantiated and loaded using the data from
that file.

A password may be given to unlock the keystore
(e.g. the keystore resides on a hardware token <example-value>),
or to check the integrity of the keystore data.
If a password is not given for integrity checking,
then integrity checking is not performed.

This method traverses the list of registered security
providers, starting with the most
preferred provider.
For each `KeyStoreSpi` implementation supported by a
provider, it invokes the engineProbe method to
determine if it supports the specified keystore.
A new `KeyStore` object is returned that encapsulates the
`KeyStoreSpi`
implementation from the first provider that supports the specified file.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `file`: the keystore file
- `password`: the keystore password, which may be `null`

**Returns:** a keystore object loaded with keystore data

**See also:** Provider

**Since:** 9

Throws:

- `KeyStoreException`: if no provider supports a `KeyStoreSpi` implementation for the specified keystore file.
- `IOException`: if there is an I/O or format problem with the keystore data, if a password is required but not given, or if the given password was incorrect. If the error is due to a wrong password, the cause of the `IOException` should be an `UnrecoverableKeyException`.
- `NoSuchAlgorithmException`: if the algorithm used to check the integrity of the keystore cannot be found.
- `CertificateException`: if any of the certificates in the keystore could not be loaded.
- `IllegalArgumentException`: if file does not exist or does not refer to a normal file.
- `NullPointerException`: if file is `null`.

## KeyStore.getInstance(File, LoadStoreParameter)

```java
public static final KeyStore getInstance(File file, LoadStoreParameter param) throws KeyStoreException, IOException, NoSuchAlgorithmException, CertificateException
```

Returns a loaded keystore object of the appropriate keystore type.
First the keystore type is determined by probing the specified file.
Then a keystore object is instantiated and loaded using the data from
that file.
A `LoadStoreParameter` may be supplied which specifies how to
unlock the keystore data or perform an integrity check.

This method traverses the list of registered security providers, starting with the most preferred provider.
For each `KeyStoreSpi` implementation supported by a
provider, it invokes the engineProbe method to
determine if it supports the specified keystore.
A new `KeyStore` object is returned that encapsulates the
`KeyStoreSpi`
implementation from the first provider that supports the specified file.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `file`: the keystore file
- `param`: the `LoadStoreParameter` that specifies how to load the keystore, which may be `null`

**Returns:** a keystore object loaded with keystore data

**See also:** Provider

**Since:** 9

Throws:

- `KeyStoreException`: if no provider supports a `KeyStoreSpi` implementation for the specified keystore file.
- `IOException`: if there is an I/O or format problem with the keystore data. If the error is due to an incorrect `ProtectionParameter` (e.g. wrong password) the cause of the `IOException` should be an `UnrecoverableKeyException`.
- `NoSuchAlgorithmException`: if the algorithm used to check the integrity of the keystore cannot be found.
- `CertificateException`: if any of the certificates in the keystore could not be loaded.
- `IllegalArgumentException`: if file does not exist or does not refer to a normal file, or if param is not recognized.
- `NullPointerException`: if file is `null`.

## KeyStore.Builder()

```java
protected Builder()
```

Construct a new `Builder`.

## KeyStore.getKeyStore()

```java
public abstract KeyStore getKeyStore() throws KeyStoreException
```

Returns the `KeyStore` described by this object.

**Returns:** the `KeyStore` described by this object

Throws:

- `KeyStoreException`: if an error occurred during the operation, for example if the `KeyStore` could not be instantiated or loaded

## KeyStore.getProtectionParameter(String)

```java
public abstract ProtectionParameter getProtectionParameter(String alias) throws KeyStoreException
```

Returns the `ProtectionParameter` that should be used to obtain
the Entry with the given alias.
The `getKeyStore` method must be invoked before this
method may be called.

Parameters:

- `alias`: the alias of the `KeyStore` entry

**Returns:** the `ProtectionParameter` that should be used to obtain
  the Entry with the given alias.

Throws:

- `NullPointerException`: if alias is `null`
- `KeyStoreException`: if an error occurred during the operation
- `IllegalStateException`: if the `getKeyStore` method has not been invoked prior to calling this method

## KeyStore.newInstance(KeyStore, ProtectionParameter)

```java
public static Builder newInstance(final KeyStore keyStore, final ProtectionParameter protectionParameter)
```

Returns a new `Builder` that encapsulates the given
`KeyStore`.
The `getKeyStore` method of the returned object
will return `keyStore`, the getProtectionParameter() method will
return `protectionParameters`.

 This is useful if an existing `KeyStore` object needs to be
used with builder-based APIs.

Parameters:

- `keyStore`: the `KeyStore` to be encapsulated
- `protectionParameter`: the `ProtectionParameter` used to protect the `KeyStore` entries

**Returns:** a new `Builder` object

Throws:

- `NullPointerException`: if `keyStore` or `protectionParameter` is `null`
- `IllegalArgumentException`: if the `keyStore` has not been initialized

## KeyStore.newInstance(String, Provider, File, ProtectionParameter)

```java
public static Builder newInstance(String type, Provider provider, File file, ProtectionParameter protection)
```

Returns a new `Builder` object.

The first call to the `getKeyStore` method on the returned
builder will create a `KeyStore` of type `type` and call
its load() method.
The `inputStream` argument is constructed from
`file`.
If `protection` is a
`PasswordProtection`, the password is obtained by
calling the `getPassword` method.
Otherwise, if `protection` is a
`CallbackHandlerProtection`, the password is obtained
by invoking the CallbackHandler.

Subsequent calls to `getKeyStore` return the same object
as the initial call. If the initial call failed with a
`KeyStoreException`, subsequent calls also throw a
`KeyStoreException`.

The `KeyStore` is instantiated from `provider` if
non-null. Otherwise, all installed providers are searched.

Calls to getProtectionParameter()
will return a PasswordProtection
object encapsulating the password that was used to invoke the
`load` method.

Parameters:

- `type`: the type of `KeyStore` to be constructed
- `provider`: the provider from which the `KeyStore` is to be instantiated (or `null`)
- `file`: the File that contains the `KeyStore` data
- `protection`: the `ProtectionParameter` securing the `KeyStore` data

**Returns:** a new `Builder` object

Throws:

- `NullPointerException`: if type, file or protection is `null`
- `IllegalArgumentException`: if protection is not an instance of either PasswordProtection or CallbackHandlerProtection; or if file does not exist or does not refer to a normal file
