---
title: "AlgorithmConstraints interface (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/AlgorithmConstraints.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AlgorithmConstraints interface (java.security)

```java
public interface AlgorithmConstraints
```

This interface specifies constraints for cryptographic algorithms,
keys (key sizes), and other algorithm parameters.

`AlgorithmConstraints` objects are immutable.  An implementation
of this interface should not provide methods that can change the state
of an instance once it has been created.

Note that `AlgorithmConstraints` can be used to represent the
restrictions described by the security properties
`jdk.certpath.disabledAlgorithms` and
`jdk.tls.disabledAlgorithms`, or could be used by a
concrete `PKIXCertPathChecker` to check whether a specified
certificate in the certification path contains the required algorithm
constraints.

**See also:** javax.net.ssl.SSLParameters#getAlgorithmConstraints

**See also:** javax.net.ssl.SSLParameters#setAlgorithmConstraints(AlgorithmConstraints)

**Since:** 1.7

## AlgorithmConstraints.permits(Set<CryptoPrimitive>, String, AlgorithmParameters)

```java
boolean permits(Set<CryptoPrimitive> primitives, String algorithm, AlgorithmParameters parameters)
```

Determines whether an algorithm is granted permission for the
specified cryptographic primitives.

Parameters:

- `primitives`: a set of cryptographic primitives
- `algorithm`: the algorithm name
- `parameters`: the algorithm parameters, or `null` if no additional parameters

**Returns:** `true` if the algorithm is permitted and can be used for
    all the specified cryptographic primitives

Throws:

- `IllegalArgumentException`: if primitives or algorithm is `null` or empty

## AlgorithmConstraints.permits(Set<CryptoPrimitive>, Key)

```java
boolean permits(Set<CryptoPrimitive> primitives, Key key)
```

Determines whether a key is granted permission for the specified
cryptographic primitives.

This method is usually used to check key size and key usage.

Parameters:

- `primitives`: a set of cryptographic primitives
- `key`: the key

**Returns:** `true` if the key can be used for all the specified
    cryptographic primitives

Throws:

- `IllegalArgumentException`: if primitives is `null` or empty, or the key is `null`

## AlgorithmConstraints.permits(Set<CryptoPrimitive>, String, Key, AlgorithmParameters)

```java
boolean permits(Set<CryptoPrimitive> primitives, String algorithm, Key key, AlgorithmParameters parameters)
```

Determines whether an algorithm and the corresponding key are granted
permission for the specified cryptographic primitives.

Parameters:

- `primitives`: a set of cryptographic primitives
- `algorithm`: the algorithm name
- `key`: the key
- `parameters`: the algorithm parameters, or `null` if no additional parameters

**Returns:** `true` if the key and the algorithm can be used for all the
    specified cryptographic primitives

Throws:

- `IllegalArgumentException`: if primitives or algorithm is `null` or empty, or the key is `null`
