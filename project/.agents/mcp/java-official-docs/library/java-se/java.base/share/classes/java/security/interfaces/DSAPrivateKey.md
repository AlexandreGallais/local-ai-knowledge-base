# DSAPrivateKey interface (java.security.interfaces)

```java
public interface DSAPrivateKey extends DSAKey, java.security.PrivateKey
```

The standard interface to a DSA private key. DSA (Digital Signature
Algorithm) is defined in NIST's FIPS-186.

@see java.security.Key
@see java.security.Signature
@see DSAKey
@see DSAPublicKey

@author Benjamin Renaud
@since 1.1

## DSAPrivateKey.serialVersionUID

```java
long serialVersionUID
```

The class fingerprint that is set to indicate
serialization compatibility with a previous
version of the class.

@deprecated A {@code serialVersionUID} field in an interface is
ineffectual. Do not use; no replacement.

## DSAPrivateKey.getX()

```java
BigInteger getX()
```

Returns the value of the private key, {@code x}.

@return the value of the private key, {@code x}.

## DSAPrivateKey.getParams()

```java
default DSAParams getParams()
```

{@inheritDoc java.security.AsymmetricKey}

@implSpec
The default implementation returns {@code null}.

@return {@inheritDoc java.security.AsymmetricKey}