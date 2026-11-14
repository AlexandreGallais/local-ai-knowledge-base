---
title: "KeyStoreSpi class (java.security) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyStoreSpi.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyStoreSpi class (java.security) (part 2 of 2)

## KeyStoreSpi.engineGetEntry(String, KeyStore.ProtectionParameter)

```java
public KeyStore.Entry engineGetEntry(String alias, KeyStore.ProtectionParameter protParam) throws KeyStoreException, NoSuchAlgorithmException, UnrecoverableEntryException
```

Gets a `KeyStore.Entry` for the specified alias
with the specified protection parameter.

Parameters:

- `alias`: get the `KeyStore.Entry` for this alias
- `protParam`: the `ProtectionParameter` used to protect the `Entry`, which may be `null`

**Returns:** the `KeyStore.Entry` for the specified alias,
         or `null` if there is no such entry

**Since:** 1.5

Throws:

- `KeyStoreException`: if the operation failed
- `NoSuchAlgorithmException`: if the algorithm for recovering the entry cannot be found
- `UnrecoverableEntryException`: if the specified `protParam` were insufficient or invalid
- `UnrecoverableKeyException`: if the entry is a `PrivateKeyEntry` or `SecretKeyEntry` and the specified `protParam` does not contain the information needed to recover the key (e.g. wrong password)

## KeyStoreSpi.engineSetEntry(String, KeyStore.Entry, KeyStore.ProtectionParameter)

```java
public void engineSetEntry(String alias, KeyStore.Entry entry, KeyStore.ProtectionParameter protParam) throws KeyStoreException
```

Saves a `KeyStore.Entry` under the specified alias.
The specified protection parameter is used to protect the
`Entry`.

 If an entry already exists for the specified alias,
it is overridden.

Parameters:

- `alias`: save the `KeyStore.Entry` under this alias
- `entry`: the `Entry` to save
- `protParam`: the `ProtectionParameter` used to protect the `Entry`, which may be `null`

**Since:** 1.5

Throws:

- `KeyStoreException`: if this operation fails

## KeyStoreSpi.engineEntryInstanceOf(String, Class<? extends KeyStore.Entry>)

```java
public boolean engineEntryInstanceOf(String alias, Class<? extends KeyStore.Entry> entryClass)
```

Determines if the keystore `Entry` for the specified
`alias` is an instance or subclass of the specified
`entryClass`.

Parameters:

- `alias`: the alias name
- `entryClass`: the entry class

**Returns:** `true` if the keystore `Entry` for the specified
         `alias` is an instance or subclass of the
         specified `entryClass`, false otherwise

**Since:** 1.5

## KeyStoreSpi.engineProbe(InputStream)

```java
public boolean engineProbe(InputStream stream) throws IOException
```

Probes the specified input stream to determine whether it contains a
keystore that is supported by this implementation, or not.

Parameters:

- `stream`: the keystore data to be probed

**Implementation requirements:** This method returns `false` by default. Keystore implementations
should override this method to peek at the data stream directly or
to use other content detection mechanisms.

**Returns:** `true` if the keystore data is supported,
otherwise `false`

**Since:** 9

Throws:

- `IOException`: if there is an I/O problem with the keystore data.
- `NullPointerException`: if stream is `null`.
