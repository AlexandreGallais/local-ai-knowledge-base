---
title: "KeyStore class (java.security) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyStore.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyStore class (java.security) (part 4 of 4)

## KeyStore.newInstance(File, ProtectionParameter)

```java
public static Builder newInstance(File file, ProtectionParameter protection)
```

Returns a new `Builder` object.

The first call to the `getKeyStore` method on the returned
builder will create a `KeyStore` using `file` to detect
the keystore type and then call its load()
method.
It uses the same algorithm to determine the keystore type as
described in LoadStoreParameter).
The `inputStream` argument is constructed from `file`.
If `protection` is a `PasswordProtection`, the password
is obtained by calling the `getPassword` method.
Otherwise, if `protection` is a
`CallbackHandlerProtection`,
the password is obtained by invoking the CallbackHandler.

Subsequent calls to `getKeyStore` return the same object
as the initial call. If the initial call failed with a
`KeyStoreException`, subsequent calls also throw a
`KeyStoreException`.

Calls to getProtectionParameter()
will return a PasswordProtection
object encapsulating the password that was used to invoke the
`load` method.

Parameters:

- `file`: the File that contains the `KeyStore` data
- `protection`: the `ProtectionParameter` securing the `KeyStore` data

**Returns:** a new `Builder` object

**Since:** 9

Throws:

- `NullPointerException`: if file or protection is `null`
- `IllegalArgumentException`: if protection is not an instance of either PasswordProtection or CallbackHandlerProtection; or if file does not exist or does not refer to a normal file

## KeyStore.newInstance(String, Provider, ProtectionParameter)

```java
public static Builder newInstance(final String type, final Provider provider, final ProtectionParameter protection)
```

Returns a new `Builder` object.

Each call to the `getKeyStore` method on the returned
builder will return a new `KeyStore` object of type
`type`.
Its load()
method is invoked using a
`LoadStoreParameter` that encapsulates
`protection`.

The `KeyStore` is instantiated from `provider` if
non-null. Otherwise, all installed providers are searched.

Calls to getProtectionParameter()
will return `protection`.

Parameters:

- `type`: the type of `KeyStore` to be constructed
- `provider`: the provider from which the `KeyStore` is to be instantiated (or `null`)
- `protection`: the `ProtectionParameter` securing the `Keystore`

**Returns:** a new `Builder` object

Throws:

- `NullPointerException`: if type or protection is `null`
