# Identity class (java.security)

```java
public abstract class Identity implements Principal, Serializable
```

<p>This class represents identities: real-world objects such as people,
companies or organizations whose identities can be authenticated using
their public keys. Identities may also be more abstract (or concrete)
constructs, such as daemon threads or smart cards.

<p>All {@code Identity} objects have a name and a public key. Names are
immutable. Identities may also be scoped. That is, if an {@code Identity} is
specified to have a particular scope, then the name and public
key of the {@code Identity} are unique within that scope.

<p>An {@code Identity} also has a set of certificates (all certifying its own
public key). The Principal names specified in these certificates need
not be the same, only the key.

<p>An {@code Identity} can be subclassed, to include postal and email
addresses, telephone numbers, images of faces and logos, and so on.

@see IdentityScope
@see Signer
@see Principal

@author Benjamin Renaud
@since 1.1
@deprecated This class is deprecated and subject to removal in a future
    version of Java SE. It has been replaced by
    {@code java.security.KeyStore}, the {@code java.security.cert} package,
    and {@code java.security.Principal}.

## Identity.Identity()

```java
protected Identity()
```

Constructor for serialization only.

## Identity.Identity(String, IdentityScope)

```java
public Identity(String name, IdentityScope scope) throws KeyManagementException
```

Constructs an {@code Identity} with the specified name and scope.

@param name the {@code Identity} name.
@param scope the scope of the {@code Identity}.

@throws    KeyManagementException if there is already an {@code Identity}
with the same name in the scope.

## Identity.Identity(String)

```java
public Identity(String name)
```

Constructs an {@code Identity} with the specified name and no scope.

@param name the identity name.

## Identity.getName()

```java
public final String getName()
```

Returns this identity's name.

@return the name of this {@code Identity}.

## Identity.getScope()

```java
public final IdentityScope getScope()
```

Returns this identity's scope.

@return the scope of this {@code Identity}.

## Identity.getPublicKey()

```java
public PublicKey getPublicKey()
```

Returns this identity's public key.

@return the public key for this {@code Identity}.

@see #setPublicKey

## Identity.setPublicKey(PublicKey)

```java
/* Should we throw an exception if this is already set? */ public void setPublicKey(PublicKey key) throws KeyManagementException
```

Sets this identity's public key. The old key and all of this
identity's certificates are removed by this operation.

@param key the public key for this {@code Identity}.

@throws    KeyManagementException if another identity in the
identity's scope has the same public key, or if another exception occurs.

@see #getPublicKey

## Identity.setInfo(String)

```java
public void setInfo(String info)
```

Specifies a general information string for this {@code Identity}.

@param info the information string.

@see #getInfo

## Identity.getInfo()

```java
public String getInfo()
```

Returns general information previously specified for this {@code Identity}.

@return general information about this {@code Identity}.

@see #setInfo

## Identity.addCertificate(Certificate)

```java
public void addCertificate(Certificate certificate) throws KeyManagementException
```

Adds a certificate for this {@code Identity}. If the {@code Identity} has a public
key, the public key in the certificate must be the same, and if
the {@code Identity} does not have a public key, the identity's
public key is set to be that specified in the certificate.

@param certificate the certificate to be added.

@throws    KeyManagementException if the certificate is not valid,
if the public key in the certificate being added conflicts with
this identity's public key, or if another exception occurs.

## Identity.removeCertificate(Certificate)

```java
public void removeCertificate(Certificate certificate) throws KeyManagementException
```

Removes a certificate from this {@code Identity}.

@param certificate the certificate to be removed.

@throws    KeyManagementException if the certificate is
missing, or if another exception occurs.

## Identity.certificates()

```java
public Certificate[] certificates()
```

Returns a copy of all the certificates for this {@code Identity}.

@return a copy of all the certificates for this {@code Identity}.

## Identity.equals(Object)

```java
public final boolean equals(Object identity)
```

Tests for equality between the specified object and this
{@code Identity}.
This first tests to see if the entities actually refer to the same
object, in which case it returns {@code true}. Next, it checks to see if
the entities have the same name and the same scope. If they do,
the method returns {@code true}. Otherwise, it calls
{@link #identityEquals(Identity) identityEquals}, which subclasses should
override.

@param identity the object to test for equality with this
{@code Identity}.

@return {@code true} if the objects are considered equal,
{@code false} otherwise.

@see #identityEquals

## Identity.identityEquals(Identity)

```java
protected boolean identityEquals(Identity identity)
```

Tests for equality between the specified {@code Identity} and this
{@code Identity}.
This method should be overridden by subclasses to test for equality.
The default behavior is to return {@code true} if the names and public
keys are equal.

@param identity the identity to test for equality with this
{@code identity}.

@return {@code true} if the identities are considered equal,
{@code false} otherwise.

@see #equals

## Identity.toString()

```java
public String toString()
```

Returns a short string describing this {@code Identity}, telling its
name and its scope (if any).

@return information about this {@code Identity}, such as its name and the
name of its scope (if any).

## Identity.toString(boolean)

```java
public String toString(boolean detailed)
```

Returns a string representation of this {@code Identity}, with
optionally more details than that provided by the
{@code toString} method without any arguments.

@param detailed whether or not to provide detailed information.

@return information about this {@code Identity}. If {@code detailed}
is {@code true}, then this method returns more information than that
provided by the {@code toString} method without any arguments.

@see #toString

## Identity.hashCode()

```java
public int hashCode()
```

{@return the hashcode for this {@code Identity}}