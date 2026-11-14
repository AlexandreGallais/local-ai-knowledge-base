# Signer class (java.security)

```java
public abstract class Signer extends Identity
```

This class is used to represent an Identity that can also digitally
sign data.

<p>The management of a signer's private keys is an important and
sensitive issue that should be handled by subclasses as appropriate
to their intended use.

@see Identity

@author Benjamin Renaud
@since 1.1

@deprecated This class is deprecated and subject to removal in a future
    version of Java SE. It has been replaced by
    {@code java.security.KeyStore}, the {@code java.security.cert} package,
    and {@code java.security.Principal}.

## Signer.Signer()

```java
protected Signer()
```

Creates a {@code Signer}. This constructor should only be used for
serialization.

## Signer.Signer(String)

```java
public Signer(String name)
```

Creates a {@code Signer} with the specified identity name.

@param name the identity name.

## Signer.Signer(String, IdentityScope)

```java
public Signer(String name, IdentityScope scope) throws KeyManagementException
```

Creates a {@code Signer} with the specified identity name and scope.

@param name the identity name.

@param scope the scope of the identity.

@throws    KeyManagementException if there is already an identity
with the same name in the scope.

## Signer.getPrivateKey()

```java
public PrivateKey getPrivateKey()
```

Returns this signer's private key.

@return this signer's private key, or {@code null} if the private key has
not yet been set.

## Signer.setKeyPair(KeyPair)

```java
public final void setKeyPair(KeyPair pair) throws InvalidParameterException, KeyException
```

Sets the key pair (public key and private key) for this {@code Signer}.

@param pair an initialized key pair.

@throws    InvalidParameterException if the key pair is not
properly initialized.
@throws    KeyException if the key pair cannot be set for any
other reason.

## Signer.toString()

```java
public String toString()
```

Returns a string of information about the {@code Signer}.

@return a string of information about the {@code Signer}.