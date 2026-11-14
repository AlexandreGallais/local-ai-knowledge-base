---
title: "EdDSAParameterSpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/EdDSAParameterSpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EdDSAParameterSpec class (java.security.spec)

```java
public class EdDSAParameterSpec implements AlgorithmParameterSpec
```

A class used to specify EdDSA signature and verification parameters. All
algorithm modes in RFC 8032:
Edwards-Curve Digital Signature Algorithm (EdDSA) can be specified using
combinations of the settings in this class.

- If prehash is true, then the mode is Ed25519ph or Ed448ph

- Otherwise, if a context is present, the mode is Ed25519ctx or Ed448

- Otherwise, the mode is Ed25519 or Ed448

**Since:** 15

## EdDSAParameterSpec.EdDSAParameterSpec(boolean)

```java
public EdDSAParameterSpec(boolean prehash)
```

Construct an `EdDSAParameterSpec` by specifying whether the prehash mode
is used. No context is provided so this constructor specifies a mode
in which the context is null. Note that this mode may be different
from the mode in which an empty array is used as the context.

Parameters:

- `prehash`: whether the prehash mode is specified.

## EdDSAParameterSpec.EdDSAParameterSpec(boolean, byte[])

```java
public EdDSAParameterSpec(boolean prehash, byte[] context)
```

Construct an `EdDSAParameterSpec` by specifying a context and whether the
prehash mode is used. The context may not be null, but it may be an
empty array. The mode used when the context is an empty array may not be
the same as the mode used when the context is absent.

Parameters:

- `prehash`: whether the prehash mode is specified.
- `context`: the context is copied and bound to the signature.

Throws:

- `NullPointerException`: if context is null.
- `InvalidParameterException`: if context length is greater than 255.

## EdDSAParameterSpec.isPrehash()

```java
public boolean isPrehash()
```

Get whether the prehash mode is specified.

**Returns:** whether the prehash mode is specified.

## EdDSAParameterSpec.getContext()

```java
public Optional<byte[]> getContext()
```

Get the context that the signature will use.

**Returns:** `Optional` contains a copy of the context or empty
if context is null.
