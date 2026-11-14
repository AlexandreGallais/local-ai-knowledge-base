# DSAPublicKey interface (java.security.interfaces)

```java
public interface DSAPublicKey extends DSAKey, java.security.PublicKey
```

The interface to a DSA public key. DSA (Digital Signature Algorithm)
is defined in NIST's FIPS-186.

@see java.security.Key
@see java.security.Signature
@see DSAKey
@see DSAPrivateKey

@author Benjamin Renaud
@since 1.1

## DSAPublicKey.serialVersionUID

```java
long serialVersionUID
```

The class fingerprint that is set to indicate
serialization compatibility with a previous
version of the class.

@deprecated A {@code serialVersionUID} field in an interface is
ineffectual. Do not use; no replacement.

## DSAPublicKey.getY()

```java
BigInteger getY()
```

Returns the value of the public key, {@code y}.

@return the value of the public key, {@code y}.

## DSAPublicKey.getParams()

```java
default DSAParams getParams()
```

{@inheritDoc java.security.AsymmetricKey}

@implSpec
The default implementation returns {@code null}.

@return {@inheritDoc java.security.AsymmetricKey}