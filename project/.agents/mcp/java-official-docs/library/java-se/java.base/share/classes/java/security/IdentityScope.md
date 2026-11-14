# IdentityScope class (java.security)

```java
public abstract class IdentityScope extends Identity
```

<p>This class represents a scope for identities. It is an Identity
itself, and therefore has a name and can have a scope. It can also
optionally have a public key and associated certificates.

<p>An {@code IdentityScope} can contain {@code Identity} objects of all
kinds, including signers. All types of {@code Identity} objects can be
retrieved, added, and removed using the same methods. Note that it is
possible, and in fact expected, that different types of identity scopes will
apply different policies for their various operations on the
various types of Identities.

<p>There is a one-to-one mapping between keys and identities, and
there can only be one copy of one key per scope. For example, suppose
<b>Acme Software, Inc</b> is a software publisher known to a user.
Suppose it is an Identity, that is, it has a public key, and a set of
associated certificates. It is named in the scope using the name
"Acme Software". No other named Identity in the scope has the same
public  key. Of course, none has the same name as well.

@see Identity
@see Signer
@see Principal
@see Key

@author Benjamin Renaud
@since 1.1

@deprecated This class is deprecated and subject to removal in a future
    version of Java SE. It has been replaced by
    {@code java.security.KeyStore}, the {@code java.security.cert} package,
    and {@code java.security.Principal}.

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

@param name the scope name.

## IdentityScope.IdentityScope(String, IdentityScope)

```java
public IdentityScope(String name, IdentityScope scope) throws KeyManagementException
```

Constructs a new identity scope with the specified name and scope.

@param name the scope name.
@param scope the scope for the new identity scope.

@throws    KeyManagementException if there is already an {@code Identity}
with the same name in the scope.

## IdentityScope.getSystemScope()

```java
public static IdentityScope getSystemScope()
```

Returns the system's identity scope.

@return the system's identity scope, or {@code null} if none has been
        set.

@see #setSystemScope

## IdentityScope.setSystemScope(IdentityScope)

```java
protected static void setSystemScope(IdentityScope scope)
```

Sets the system's identity scope.

@param scope the scope to set.

@see #getSystemScope

## IdentityScope.size()

```java
public abstract int size()
```

Returns the number of identities within this identity scope.

@return the number of identities within this identity scope.

## IdentityScope.getIdentity(String)

```java
public abstract Identity getIdentity(String name)
```

Returns the {@code Identity} in this scope with the specified
name (if any).

@param name the name of the {@code Identity} to be retrieved.

@return the {@code Identity} named {@code name}, or {@code null}
if there are no identities named {@code name} in this scope.

## IdentityScope.getIdentity(Principal)

```java
public Identity getIdentity(Principal principal)
```

Retrieves the {@code Identity} whose name is the same as that of the
specified principal. (Note: {@code Identity} implements
{@code Principal}.)

@param principal the principal corresponding to the {@code Identity}
to be retrieved.

@return the {@code Identity} whose name is the same as that of the
principal, or {@code null} if there are no identities of the same name
in this scope.

## IdentityScope.getIdentity(PublicKey)

```java
public abstract Identity getIdentity(PublicKey key)
```

Retrieves the {@code identity} with the specified public key.

@param key the public key for the identity to be returned.

@return the identity with the given key, or {@code null} if there are
no identities in this scope with that key.

## IdentityScope.addIdentity(Identity)

```java
public abstract void addIdentity(Identity identity) throws KeyManagementException
```

Adds an {@code Identity} to this identity scope.

@param identity the {@code Identity} to be added.

@throws    KeyManagementException if the identity is not
valid, a name conflict occurs, another identity has the same
public key as the identity being added, or another exception
occurs.

## IdentityScope.removeIdentity(Identity)

```java
public abstract void removeIdentity(Identity identity) throws KeyManagementException
```

Removes an {@code Identity} from this identity scope.

@param identity the {@code Identity} to be removed.

@throws    KeyManagementException if the identity is missing,
or another exception occurs.

## IdentityScope.identities()

```java
public abstract Enumeration<Identity> identities()
```

Returns an enumeration of all identities in this identity scope.

@return an enumeration of all identities in this identity scope.

## IdentityScope.toString()

```java
public String toString()
```

Returns a string representation of this identity scope, including
its name, its scope name, and the number of identities in this
identity scope.

@return a string representation of this identity scope.