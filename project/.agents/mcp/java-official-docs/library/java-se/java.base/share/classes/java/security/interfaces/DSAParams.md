# DSAParams interface (java.security.interfaces)

```java
public interface DSAParams extends AlgorithmParameterSpec
```

Interface to a DSA-specific set of key parameters, which defines a
DSA <em>key family</em>. DSA (Digital Signature Algorithm) is defined
in NIST's FIPS-186.

@see DSAKey
@see java.security.Key
@see java.security.Signature

@author Benjamin Renaud
@author Josh Bloch
@since 1.1

## DSAParams.getP()

```java
BigInteger getP()
```

Returns the prime, {@code p}.

@return the prime, {@code p}.

## DSAParams.getQ()

```java
BigInteger getQ()
```

Returns the subprime, {@code q}.

@return the subprime, {@code q}.

## DSAParams.getG()

```java
BigInteger getG()
```

Returns the base, {@code g}.

@return the base, {@code g}.