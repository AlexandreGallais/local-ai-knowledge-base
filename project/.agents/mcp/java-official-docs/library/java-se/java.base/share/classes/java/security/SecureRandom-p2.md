---
title: "SecureRandom class (java.security) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/SecureRandom.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SecureRandom class (java.security) (part 2 of 2)

## SecureRandom.toString()

```java
public String toString()
```

Returns a Human-readable string representation of this
`SecureRandom`.

**Returns:** the string representation

## SecureRandom.getParameters()

```java
public SecureRandomParameters getParameters()
```

Returns the effective `SecureRandomParameters` for this
`SecureRandom` instance.

The returned value can be different from the
`SecureRandomParameters` object passed into a `getInstance`
method, but it cannot change during the lifetime of this
`SecureRandom` object.

A caller can use the returned value to find out what features this
`SecureRandom` supports.

**Returns:** the effective `SecureRandomParameters` parameters,
or `null` if no parameters were used.

**Since:** 9

**See also:** SecureRandomSpi

## SecureRandom.setSeed(byte[])

```java
public void setSeed(byte[] seed)
```

Reseeds this random object with the given seed. The seed supplements,
rather than replaces, the existing seed. Thus, repeated calls are
guaranteed never to reduce randomness.

A PRNG `SecureRandom` will not seed itself automatically if
`setSeed` is called before any `nextBytes` or `reseed`
calls. The caller should make sure that the `seed` argument
contains enough entropy for the security of this `SecureRandom`.

Parameters:

- `seed`: the seed.

**See also:** #getSeed

Throws:

- `NullPointerException`: if `seed` is `null`

## SecureRandom.setSeed(long)

```java
public void setSeed(long seed)
```

Reseeds this random object, using the eight bytes contained
in the given `long seed`. The given seed supplements,
rather than replaces, the existing seed. Thus, repeated calls
are guaranteed never to reduce randomness.

A PRNG `SecureRandom` will not seed itself automatically if
`setSeed` is called before any `nextBytes` or `reseed`
calls. The caller should make sure that the `seed` argument
contains enough entropy for the security of this `SecureRandom`.

This method is defined for compatibility with
`java.util.Random`.

Parameters:

- `seed`: the seed.

**See also:** #getSeed

## SecureRandom.nextBytes(byte[])

```java
public void nextBytes(byte[] bytes)
```

Generates a user-specified number of random bytes.

Parameters:

- `bytes`: the array to be filled in with random bytes.

Throws:

- `NullPointerException`: if `bytes` is `null`

## SecureRandom.nextBytes(byte[], SecureRandomParameters)

```java
public void nextBytes(byte[] bytes, SecureRandomParameters params)
```

Generates a user-specified number of random bytes with
additional parameters.

Parameters:

- `bytes`: the array to be filled in with random bytes
- `params`: additional parameters

**Since:** 9

Throws:

- `NullPointerException`: if `bytes` is `null`
- `UnsupportedOperationException`: if the underlying provider implementation has not overridden this method
- `IllegalArgumentException`: if `params` is `null`, illegal or unsupported by this `SecureRandom`

## SecureRandom.next(int)

```java
protected final int next(int numBits)
```

Generates an integer containing the user-specified number of
pseudo-random bits (right justified, with leading zeros).  This
method overrides a `java.util.Random` method, and serves
to provide a source of random bits to all the methods inherited
from that class (for example, `nextInt`,
`nextLong`, and `nextFloat`).

Parameters:

- `numBits`: number of pseudo-random bits to be generated, where `0 <= numBits <= 32`.

**Returns:** an `int` containing the user-specified number
of pseudo-random bits (right justified, with leading zeros).

## SecureRandom.getSeed(int)

```java
public static byte[] getSeed(int numBytes)
```

Returns the given number of seed bytes, computed using the seed
generation algorithm that this class uses to seed itself.  This
call may be used to seed other random number generators.

This method is only included for backwards compatibility.
The caller is encouraged to use one of the alternative
`getInstance` methods to obtain a `SecureRandom` object, and
then call the `generateSeed` method to obtain seed bytes
from that object.

Parameters:

- `numBytes`: the number of seed bytes to generate.

**Returns:** the seed bytes.

**See also:** #setSeed

Throws:

- `IllegalArgumentException`: if `numBytes` is negative

## SecureRandom.generateSeed(int)

```java
public byte[] generateSeed(int numBytes)
```

Returns the given number of seed bytes, computed using the seed
generation algorithm that this class uses to seed itself.  This
call may be used to seed other random number generators.

Parameters:

- `numBytes`: the number of seed bytes to generate.

**Returns:** the seed bytes.

Throws:

- `IllegalArgumentException`: if `numBytes` is negative

## SecureRandom.getInstanceStrong()

```java
public static SecureRandom getInstanceStrong() throws NoSuchAlgorithmException
```

Returns a `SecureRandom` object that was selected by using
the algorithms/providers specified in the `securerandom.strongAlgorithms` `Security` property.

Some situations require strong random values, such as when
creating high-value/long-lived secrets like RSA public/private
keys.  To help guide applications in selecting a suitable strong
`SecureRandom` implementation, Java distributions
include a list of known strong `SecureRandom`
implementations in the `securerandom.strongAlgorithms`
Security property.

Every implementation of the Java platform is required to
support at least one strong `SecureRandom` implementation.

**Returns:** a strong `SecureRandom` implementation as indicated
by the `securerandom.strongAlgorithms` Security property

**See also:** Security#getProperty(String)

**Since:** 1.8

Throws:

- `NoSuchAlgorithmException`: if no algorithm is available

## SecureRandom.reseed()

```java
public void reseed()
```

Reseeds this `SecureRandom` with entropy input read from its
entropy source.

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the underlying provider implementation has not overridden this method.

## SecureRandom.reseed(SecureRandomParameters)

```java
public void reseed(SecureRandomParameters params)
```

Reseeds this `SecureRandom` with entropy input read from its
entropy source with additional parameters.

Note that entropy is obtained from an entropy source. While
some data in `params` may contain entropy, its main usage is to
provide diversity.

Parameters:

- `params`: extra parameters

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the underlying provider implementation has not overridden this method.
- `IllegalArgumentException`: if `params` is `null`, illegal or unsupported by this `SecureRandom`
