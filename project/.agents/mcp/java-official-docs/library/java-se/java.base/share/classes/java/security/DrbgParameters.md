---
title: "DrbgParameters class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/DrbgParameters.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DrbgParameters class (java.security)

```java
public final class DrbgParameters
```

This class specifies the parameters used by a DRBG (Deterministic
Random Bit Generator).

According to

NIST Special Publication 800-90A Revision 1, Recommendation for Random
Number Generation Using Deterministic Random Bit Generators (800-90Ar1),

A DRBG is based on a DRBG mechanism as specified in this Recommendation
and includes a source of randomness. A DRBG mechanism uses an algorithm
(i.e., a DRBG algorithm) that produces a sequence of bits from an initial
value that is determined by a seed that is determined from the output of
the randomness source."

The 800-90Ar1 specification allows for a variety of DRBG implementation
choices, such as:

-  an entropy source,

-  a DRBG mechanism (for example, Hash_DRBG),

-  a DRBG algorithm (for example, SHA-256 for Hash_DRBG and AES-256
for CTR_DRBG. Please note that it is not the algorithm used in
`SecureRandom.getInstance`, which we will call a
*SecureRandom algorithm* below),

-  optional features, including prediction resistance
and reseeding supports,

-  highest security strength.

These choices are set in each implementation and are not directly
managed by the `SecureRandom` API.  Check your DRBG provider's
documentation to find an appropriate implementation for the situation.

On the other hand, the 800-90Ar1 specification does have some configurable
options, such as:

-  required security strength,

-  if prediction resistance is required,

-  personalization string and additional input.

A DRBG instance can be instantiated with parameters from an
`DrbgParameters.Instantiation` object and other information
(for example, the nonce, which is not managed by this API). This maps
to the `Instantiate_function` defined in NIST SP 800-90Ar1.

A DRBG instance can be reseeded with parameters from a
`DrbgParameters.Reseed` object. This maps to the
`Reseed_function` defined in NIST SP 800-90Ar1. Calling
`SecureRandom.reseed()` is equivalent to calling
`SecureRandom.reseed(SecureRandomParameters)` with the effective
instantiated prediction resistance flag (as returned by
`SecureRandom.getParameters()`) with no additional input.

A DRBG instance generates data with additional parameters from a
`DrbgParameters.NextBytes` object. This maps to the
`Generate_function` defined in NIST SP 800-90Ar1. Calling
`SecureRandom.nextBytes(byte[])` is equivalent to calling
SecureRandomParameters)
with the effective instantiated strength and prediction resistance flag
(as returned by `SecureRandom.getParameters()`) with no
additional input.

A DRBG should be implemented as a subclass of `SecureRandomSpi`.
It is recommended that the implementation contain the 1-arg
constructor
that takes a `DrbgParameters.Instantiation` argument. If implemented
this way, this implementation can be chosen by any
`SecureRandom.getInstance()` method. If it is chosen by a
`SecureRandom.getInstance()` with a `SecureRandomParameters`
parameter, the parameter is passed into this constructor. If it is chosen
by a `SecureRandom.getInstance()` without a
`SecureRandomParameters` parameter, the constructor is called with
a `null` argument and the implementation should choose its own
parameters. Its `SecureRandom.getParameters()` must always return a
non-null effective `DrbgParameters.Instantiation` object that reflects
how the DRBG is actually instantiated. A caller can use this information
to determine whether a `SecureRandom` object is a DRBG and what
features it supports. Please note that the returned value does not
necessarily equal to the `DrbgParameters.Instantiation` object passed
into the `SecureRandom.getInstance()` call. For example,
the requested capability can be `DrbgParameters.Capability.NONE`
but the effective value can be `DrbgParameters.Capability.RESEED_ONLY`
if the implementation supports reseeding. The implementation must implement
the SecureRandomParameters)
method which takes a `DrbgParameters.NextBytes` parameter. Unless
the result of `SecureRandom.getParameters()` has its
capability being
NONE, it must implement
`SecureRandomSpi.engineReseed(SecureRandomParameters)` which takes
a `DrbgParameters.Reseed` parameter.

On the other hand, if a DRBG implementation does not contain a constructor
that has an `DrbgParameters.Instantiation` argument (not recommended),
it can only be chosen by a `SecureRandom.getInstance()` without
a `SecureRandomParameters` parameter, but will not be chosen if
a `getInstance` method with a `SecureRandomParameters` parameter
is called. If implemented this way, its `SecureRandom.getParameters()`
must return `null`, and it does not need to implement either
SecureRandomParameters)
or `SecureRandomSpi.engineReseed(SecureRandomParameters)`.

A DRBG might reseed itself automatically if the seed period is bigger
than the maximum seed life defined by the DRBG mechanism.

A DRBG implementation should support serialization and deserialization
by retaining the configuration and effective parameters, but the internal
state must not be serialized and the deserialized object must be
reinstantiated.

Examples:

```java
SecureRandom drbg;
byte[] buffer = new byte[32];

// Any DRBG is OK
drbg = SecureRandom.getInstance("DRBG");
drbg.nextBytes(buffer);

SecureRandomParameters params = drbg.getParameters();
if (params instanceof DrbgParameters.Instantiation) {
    DrbgParameters.Instantiation ins = (DrbgParameters.Instantiation) params;
    if (ins.getCapability().supportsReseeding()) {
        drbg.reseed();
    }
}

// The following call requests a weak DRBG instance. It is only
// guaranteed to support 112 bits of security strength.
drbg = SecureRandom.getInstance("DRBG",
        DrbgParameters.instantiation(112, NONE, null));

// Both the next two calls will likely fail, because drbg could be
// instantiated with a smaller strength with no prediction resistance
// support.
drbg.nextBytes(buffer,
        DrbgParameters.nextBytes(256, false, "more".getBytes()));
drbg.nextBytes(buffer,
        DrbgParameters.nextBytes(112, true, "more".getBytes()));

// The following call requests a strong DRBG instance, with a
// personalization string. If it successfully returns an instance,
// that instance is guaranteed to support 256 bits of security strength
// with prediction resistance available.
drbg = SecureRandom.getInstance("DRBG", DrbgParameters.instantiation(
        256, PR_AND_RESEED, "hello".getBytes()));

// Prediction resistance is not requested in this single call,
// but an additional input is used.
drbg.nextBytes(buffer,
        DrbgParameters.nextBytes(-1, false, "more".getBytes()));

// Same for this call.
drbg.reseed(DrbgParameters.reseed(false, "extra".getBytes()));
```

**Implementation requirements:** By convention, a provider should name its primary DRBG implementation
with the
standard `SecureRandom` algorithm name "DRBG".

**Implementation note:** The following notes apply to the "DRBG" implementation in the SUN provider
of the JDK reference implementation.

This implementation supports the Hash_DRBG and HMAC_DRBG mechanisms with
DRBG algorithm SHA-224, SHA-512/224, SHA-256, SHA-512/256, SHA-384 and
SHA-512, and CTR_DRBG (both using derivation function and not using
derivation function) with DRBG algorithm AES-128, AES-192 and AES-256.

The mechanism name and DRBG algorithm name are determined by the
security property
`securerandom.drbg.config`. The default choice is Hash_DRBG
with SHA-256.

For each combination, the security strength can be requested from 112
up to the highest strength it supports. Both reseeding and prediction
resistance are supported.

Personalization string is supported through the
`DrbgParameters.Instantiation` class and additional input is supported
through the `DrbgParameters.NextBytes` and
`DrbgParameters.Reseed` classes.

If a DRBG is not instantiated with a `DrbgParameters.Instantiation`
object explicitly, this implementation instantiates it with a default
requested strength of 128 bits, no prediction resistance request, and
no personalization string. These default instantiation parameters can also
be customized with the `securerandom.drbg.config` security property.

This implementation reads fresh entropy from the system default entropy
source determined by the security property `securerandom.source`.

Calling `SecureRandom.generateSeed(int)` will directly read
from this system default entropy source.

**Since:** 9

## DrbgParameters.supportsReseeding()

```java
public boolean supportsReseeding()
```

Returns whether this capability supports reseeding.

**Returns:** `true` for `PR_AND_RESEED` and
     `RESEED_ONLY`, and `false` for `NONE`

## DrbgParameters.supportsPredictionResistance()

```java
public boolean supportsPredictionResistance()
```

Returns whether this capability supports prediction resistance.

**Returns:** `true` for `PR_AND_RESEED`, and `false`
     for `RESEED_ONLY` and `NONE`

## DrbgParameters.getStrength()

```java
public int getStrength()
```

Returns the security strength in bits.

**Returns:** If used in `getInstance`, returns the minimum strength
requested, or -1 if there is no specific request on the strength.
If used in `getParameters`, returns the effective strength.
The effective strength must be greater than or equal to the minimum
strength requested.

## DrbgParameters.getCapability()

```java
public Capability getCapability()
```

Returns the capability.

**Returns:** If used in `getInstance`, returns the minimum
capability requested. If used in `getParameters`, returns
information on the effective prediction resistance flag and
whether it supports reseeding.

## DrbgParameters.getPersonalizationString()

```java
public byte[] getPersonalizationString()
```

Returns the personalization string as a byte array.

**Returns:** If used in `getInstance`, returns the requested
personalization string as a newly allocated array, or `null`
if no personalization string is requested. The same string should
be returned in `getParameters` as a new copy, or `null`
if no personalization string is requested in `getInstance`.

## DrbgParameters.toString()

```java
public String toString()
```

Returns a Human-readable string representation of this
`Instantiation`.

**Returns:** the string representation

## DrbgParameters.getStrength()

```java
public int getStrength()
```

Returns the security strength requested in bits.

**Returns:** the strength requested, or -1 if the effective strength
     should be used.

## DrbgParameters.getPredictionResistance()

```java
public boolean getPredictionResistance()
```

Returns whether prediction resistance is requested.

**Returns:** whether prediction resistance is requested

## DrbgParameters.getAdditionalInput()

```java
public byte[] getAdditionalInput()
```

Returns the requested additional input.

**Returns:** the requested additional input, `null` if not
requested. A new byte array is returned each time this method
is called.

## DrbgParameters.getPredictionResistance()

```java
public boolean getPredictionResistance()
```

Returns whether prediction resistance is requested.

**Returns:** whether prediction resistance is requested

## DrbgParameters.getAdditionalInput()

```java
public byte[] getAdditionalInput()
```

Returns the requested additional input.

**Returns:** the requested additional input, or `null` if
not requested. A new byte array is returned each time this method
is called.

## DrbgParameters.instantiation(int, Capability, byte[])

```java
public static Instantiation instantiation(int strength, Capability capability, byte[] personalizationString)
```

Generates a `DrbgParameters.Instantiation` object.

Parameters:

- `strength`: security strength in bits, -1 for default strength if used in `getInstance`.
- `capability`: capability
- `personalizationString`: personalization string as a byte array, can be `null`. The content of this byte array will be copied.

**Returns:** a new `Instantiation` object

Throws:

- `NullPointerException`: if `capability` is `null`
- `IllegalArgumentException`: if `strength` is less than -1

## DrbgParameters.nextBytes(int, boolean, byte[])

```java
public static NextBytes nextBytes(int strength, boolean predictionResistance, byte[] additionalInput)
```

Generates a `NextBytes` object.

Parameters:

- `strength`: requested security strength in bits. If set to -1, the effective strength will be used.
- `predictionResistance`: prediction resistance requested
- `additionalInput`: additional input, can be `null`. The content of this byte array will be copied.

**Returns:** a new `NextBytes` object

Throws:

- `IllegalArgumentException`: if `strength` is less than -1

## DrbgParameters.reseed(boolean, byte[])

```java
public static Reseed reseed( boolean predictionResistance, byte[] additionalInput)
```

Generates a `Reseed` object.

Parameters:

- `predictionResistance`: prediction resistance requested
- `additionalInput`: additional input, can be `null`. The content of this byte array will be copied.

**Returns:** a new `Reseed` object
