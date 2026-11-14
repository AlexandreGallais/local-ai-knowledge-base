# DSAParameterSpec class (java.security.spec)

```java
public class DSAParameterSpec implements AlgorithmParameterSpec, java.security.interfaces.DSAParams
```

This class specifies the set of parameters used with the DSA algorithm.

@author Jan Luehe


@see AlgorithmParameterSpec

@since 1.2

## DSAParameterSpec.DSAParameterSpec(BigInteger, BigInteger, BigInteger)

```java
public DSAParameterSpec(BigInteger p, BigInteger q, BigInteger g)
```

Creates a new DSAParameterSpec with the specified parameter values.

@param p the prime.

@param q the sub-prime.

@param g the base.

## DSAParameterSpec.getP()

```java
public BigInteger getP()
```

Returns the prime {@code p}.

@return the prime {@code p}.

## DSAParameterSpec.getQ()

```java
public BigInteger getQ()
```

Returns the sub-prime {@code q}.

@return the sub-prime {@code q}.

## DSAParameterSpec.getG()

```java
public BigInteger getG()
```

Returns the base {@code g}.

@return the base {@code g}.