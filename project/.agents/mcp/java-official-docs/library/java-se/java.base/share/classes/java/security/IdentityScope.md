---
title: "IdentityScope class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/IdentityScope.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IdentityScope class (java.security)

```java
public abstract class IdentityScope extends Identity
```

This class represents a scope for identities. It is an Identity
itself, and therefore has a name and can have a scope. It can also
optionally have a public key and associated certificates.

An `IdentityScope` can contain `Identity` objects of all
kinds, including signers. All types of `Identity` objects can be
retrieved, added, and removed using the same methods. Note that it is
possible, and in fact expected, that different types of identity scopes will
apply different policies for their various operations on the
various types of Identities.

There is a one-to-one mapping between keys and identities, and
there can only be one copy of one key per scope. For example, suppose
**Acme Software, Inc** is a software publisher known to a user.
Suppose it is an Identity, that is, it has a public key, and a set of
associated certificates. It is named in the scope using the name
"Acme Software". No other named Identity in the scope has the same
public  key. Of course, none has the same name as well.

**See also:** Identity

**See also:** Signer

**See also:** Principal

**See also:** Key

**Since:** 1.1

**Deprecated:** This class is deprecated and subject to removal in a future
    version of Java SE. It has been replaced by
    `java.security.KeyStore`, the `java.security.cert` package,
    and `java.security.Principal`.

## IdentityScope.IdentityScope()

```java
protected IdentityScope()
```

This constructor is used for serialization only and should not
be used by subclasses.

## IdentityScope.IdentityScope(String)

```java
public IdentityScope(String name)
```

Constructs a new identity scope with the specified name.

Parameters:

- `name`: the scope name.

## IdentityScope.IdentityScope(String, IdentityScope)

```java
public IdentityScope(String name, IdentityScope scope) throws KeyManagementException
```

Constructs a new identity scope with the specified name and scope.

Parameters:

- `name`: the scope name.
- `scope`: the scope for the new identity scope.

Throws:

- `KeyManagementException`: if there is already an `Identity` with the same name in the scope.

## IdentityScope.getSystemScope()

```java
public static IdentityScope getSystemScope()
```

Returns the system's identity scope.

**Returns:** the system's identity scope, or `null` if none has been
        set.

**See also:** #setSystemScope

## IdentityScope.setSystemScope(IdentityScope)

```java
protected static void setSystemScope(IdentityScope scope)
```

Sets the system's identity scope.

Parameters:

- `scope`: the scope to set.

**See also:** #getSystemScope

## IdentityScope.size()

```java
public abstract int size()
```

Returns the number of identities within this identity scope.

**Returns:** the number of identities within this identity scope.

## IdentityScope.getIdentity(String)

```java
public abstract Identity getIdentity(String name)
```

Returns the `Identity` in this scope with the specified
name (if any).

Parameters:

- `name`: the name of the `Identity` to be retrieved.

**Returns:** the `Identity` named `name`, or `null`
if there are no identities named `name` in this scope.

## IdentityScope.getIdentity(Principal)

```java
public Identity getIdentity(Principal principal)
```

Retrieves the `Identity` whose name is the same as that of the
specified principal. (Note: `Identity` implements
`Principal`.)

Parameters:

- `principal`: the principal corresponding to the `Identity` to be retrieved.

**Returns:** the `Identity` whose name is the same as that of the
principal, or `null` if there are no identities of the same name
in this scope.

## IdentityScope.getIdentity(PublicKey)

```java
public abstract Identity getIdentity(PublicKey key)
```

Retrieves the `identity` with the specified public key.

Parameters:

- `key`: the public key for the identity to be returned.

**Returns:** the identity with the given key, or `null` if there are
no identities in this scope with that key.

## IdentityScope.addIdentity(Identity)

```java
public abstract void addIdentity(Identity identity) throws KeyManagementException
```

Adds an `Identity` to this identity scope.

Parameters:

- `identity`: the `Identity` to be added.

Throws:

- `KeyManagementException`: if the identity is not valid, a name conflict occurs, another identity has the same public key as the identity being added, or another exception occurs.

## IdentityScope.removeIdentity(Identity)

```java
public abstract void removeIdentity(Identity identity) throws KeyManagementException
```

Removes an `Identity` from this identity scope.

Parameters:

- `identity`: the `Identity` to be removed.

Throws:

- `KeyManagementException`: if the identity is missing, or another exception occurs.

## IdentityScope.identities()

```java
public abstract Enumeration<Identity> identities()
```

Returns an enumeration of all identities in this identity scope.

**Returns:** an enumeration of all identities in this identity scope.

## IdentityScope.toString()

```java
public String toString()
```

Returns a string representation of this identity scope, including
its name, its scope name, and the number of identities in this
identity scope.

**Returns:** a string representation of this identity scope.
