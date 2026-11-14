---
title: "DSAGenParameterSpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/DSAGenParameterSpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DSAGenParameterSpec class (java.security.spec)

```java
public final class DSAGenParameterSpec implements AlgorithmParameterSpec
```

This immutable class specifies the set of parameters used for
generating DSA parameters as specified in
FIPS 186-3 Digital Signature Standard (DSS).

**See also:** AlgorithmParameterSpec

**Since:** 1.8

## DSAGenParameterSpec.DSAGenParameterSpec(int, int)

```java
public DSAGenParameterSpec(int primePLen, int subprimeQLen)
```

Creates a domain parameter specification for DSA parameter
generation using `primePLen` and `subprimeQLen`.
The value of `subprimeQLen` is also used as the default
length of the domain parameter seed in bits.

Parameters:

- `primePLen`: the desired length of the prime P in bits.
- `subprimeQLen`: the desired length of the sub-prime Q in bits.

Throws:

- `IllegalArgumentException`: if `primePLen` or `subprimeQLen` is illegal per the specification of FIPS 186-3.

## DSAGenParameterSpec.DSAGenParameterSpec(int, int, int)

```java
public DSAGenParameterSpec(int primePLen, int subprimeQLen, int seedLen)
```

Creates a domain parameter specification for DSA parameter
generation using `primePLen`, `subprimeQLen`,
and `seedLen`.

Parameters:

- `primePLen`: the desired length of the prime P in bits.
- `subprimeQLen`: the desired length of the sub-prime Q in bits.
- `seedLen`: the desired length of the domain parameter seed in bits, shall be equal to or greater than `subprimeQLen`.

Throws:

- `IllegalArgumentException`: if `primePLenLen`, `subprimeQLen`, or `seedLen` is illegal per the specification of FIPS 186-3.

## DSAGenParameterSpec.getPrimePLength()

```java
public int getPrimePLength()
```

Returns the desired length of the prime P of the
to-be-generated DSA domain parameters in bits.

**Returns:** the length of the prime P.

## DSAGenParameterSpec.getSubprimeQLength()

```java
public int getSubprimeQLength()
```

Returns the desired length of the sub-prime Q of the
to-be-generated DSA domain parameters in bits.

**Returns:** the length of the sub-prime Q.

## DSAGenParameterSpec.getSeedLength()

```java
public int getSeedLength()
```

Returns the desired length of the domain parameter seed in bits.

**Returns:** the length of the domain parameter seed.
