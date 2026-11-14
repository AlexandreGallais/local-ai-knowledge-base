---
title: "SecureRandomSpi class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/SecureRandomSpi.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SecureRandomSpi class (java.security)

```java
public abstract class SecureRandomSpi implements java.io.Serializable
```

This class defines the *Service Provider Interface* (**SPI**)
for the `SecureRandom` class.

All the abstract methods in this class must be implemented by each
service provider who wishes to supply the implementation
of a cryptographically strong pseudo-random number generator.

**Implementation requirements:** If the `SecureRandomSpi(SecureRandomParameters)`
constructor is overridden in an implementation, it will always be called
whenever a `SecureRandom` is instantiated. Precisely, if an object is
instantiated with one of `SecureRandom`'s `getInstance` methods
*without* a `SecureRandomParameters` parameter,
the constructor will be called with a `null` argument and the
implementation is responsible for creating its own
`SecureRandomParameters` parameter for use when
`engineGetParameters()` is called. If an object
is instantiated with one of `SecureRandom`'s `getInstance`
methods *with* a `SecureRandomParameters` argument,
the constructor will be called with that argument. The
`engineGetParameters()` method must not return `null`.

Otherwise, if the `SecureRandomSpi(SecureRandomParameters)`
constructor is not overridden in an implementation, the
`SecureRandomSpi()` constructor must be overridden, and it will be
called if an object is instantiated with one of `SecureRandom`'s
`getInstance` methods *without* a
`SecureRandomParameters` argument. Calling one of
`SecureRandom`'s `getInstance` methods *with*
a `SecureRandomParameters` argument will never
return an instance of this implementation. The
`engineGetParameters()` method must return `null`.

See `SecureRandom` for additional details on thread safety. By
default, a `SecureRandomSpi` implementation is considered to be
not safe for use by multiple concurrent threads and `SecureRandom`
will synchronize access to each of the applicable engine methods
(see `SecureRandom` for the list of methods). However, if a
`SecureRandomSpi` implementation is thread-safe, the
service provider attribute "ThreadSafe" should be set to "true" during
its registration, as follows:

```java
put("SecureRandom.AlgName ThreadSafe", "true");
```

or

```java
putService(new Service(this, "SecureRandom", "AlgName", className,
         null, Map.of("ThreadSafe", "true")));
```

`SecureRandom` will call the applicable engine methods
without any synchronization.

**Since:** 1.2

## SecureRandomSpi.SecureRandomSpi()

```java
public SecureRandomSpi()
```

Constructor without a parameter.

## SecureRandomSpi.SecureRandomSpi(SecureRandomParameters)

```java
protected SecureRandomSpi(SecureRandomParameters params)
```

Constructor with a parameter.

Parameters:

- `params`: the `SecureRandomParameters` object. This argument can be `null`.

**Since:** 9

Throws:

- `IllegalArgumentException`: if `params` is unrecognizable or unsupported by this `SecureRandom`

## SecureRandomSpi.engineSetSeed(byte[])

```java
protected abstract void engineSetSeed(byte[] seed)
```

Reseeds this random object with the given seed. The seed supplements,
rather than replaces, the existing seed. Thus, repeated calls
are guaranteed never to reduce randomness.

Parameters:

- `seed`: the seed.

## SecureRandomSpi.engineNextBytes(byte[])

```java
protected abstract void engineNextBytes(byte[] bytes)
```

Generates a user-specified number of random bytes.

Some random number generators can only generate a limited amount
of random bytes per invocation. If the size of `bytes`
is greater than this limit, the implementation should invoke
its generation process multiple times to completely fill the
buffer before returning from this method.

Parameters:

- `bytes`: the array to be filled in with random bytes.

## SecureRandomSpi.engineNextBytes(byte[], SecureRandomParameters)

```java
protected void engineNextBytes( byte[] bytes, SecureRandomParameters params)
```

Generates a user-specified number of random bytes with
additional parameters.

Some random number generators can only generate a limited amount
of random bytes per invocation. If the size of `bytes`
is greater than this limit, the implementation should invoke
its generation process multiple times to completely fill the
buffer before returning from this method.

Parameters:

- `bytes`: the array to be filled in with random bytes
- `params`: additional parameters

**Implementation requirements:** The default implementation throws
an `UnsupportedOperationException`.

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the implementation has not overridden this method
- `IllegalArgumentException`: if `params` is `null`, illegal or unsupported by this `SecureRandom`

## SecureRandomSpi.engineGenerateSeed(int)

```java
protected abstract byte[] engineGenerateSeed(int numBytes)
```

Returns the given number of seed bytes.  This call may be used to
seed other random number generators.

Parameters:

- `numBytes`: the number of seed bytes to generate.

**Returns:** the seed bytes.

## SecureRandomSpi.engineReseed(SecureRandomParameters)

```java
protected void engineReseed(SecureRandomParameters params)
```

Reseeds this random object with entropy input read from its
entropy source with additional parameters.

If this method is called by `SecureRandom.reseed()`,
`params` will be `null`.

Do not override this method if the implementation does not
support reseeding.

Parameters:

- `params`: extra parameters, can be `null`.

**Implementation requirements:** The default implementation throws
          an `UnsupportedOperationException`.

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the implementation has not overridden this method
- `IllegalArgumentException`: if `params` is illegal or unsupported by this `SecureRandom`

## SecureRandomSpi.engineGetParameters()

```java
protected SecureRandomParameters engineGetParameters()
```

Returns the effective `SecureRandomParameters` for this
`SecureRandom` instance.

**Implementation requirements:** The default implementation returns `null`.

**Returns:** the effective `SecureRandomParameters` parameters,
or `null` if no parameters were used.

**Since:** 9

## SecureRandomSpi.toString()

```java
public String toString()
```

Returns a Human-readable string representation of this
`SecureRandom`.

**Returns:** the string representation
