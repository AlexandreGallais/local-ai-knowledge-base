---
title: "PKIXParameters class (java.security.cert) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/PKIXParameters.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PKIXParameters class (java.security.cert) (part 2 of 2)

## PKIXParameters.getCertPathCheckers()

```java
public List<PKIXCertPathChecker> getCertPathCheckers()
```

Returns the `List` of certification path checkers.
The returned `List` is immutable, and each
`PKIXCertPathChecker` in the `List` is cloned
to protect against subsequent modifications.

**Returns:** an immutable `List` of
`PKIXCertPathChecker`s (may be empty, but not
`null`)

**See also:** #setCertPathCheckers

## PKIXParameters.addCertPathChecker(PKIXCertPathChecker)

```java
public void addCertPathChecker(PKIXCertPathChecker checker)
```

Adds a `PKIXCertPathChecker` to the list of certification
path checkers. See the setCertPathCheckers
method for more details.

Note that the `PKIXCertPathChecker` is cloned to protect
against subsequent modifications.

Parameters:

- `checker`: a `PKIXCertPathChecker` to add to the list of checks. If `null`, the checker is ignored (not added to list).

## PKIXParameters.getSigProvider()

```java
public String getSigProvider()
```

Returns the signature provider's name, or `null`
if not set.

**Returns:** the signature provider's name (or `null`)

**See also:** #setSigProvider

## PKIXParameters.setSigProvider(String)

```java
public void setSigProvider(String sigProvider)
```

Sets the signature provider's name. The specified provider will be
preferred when creating Signature
objects. If `null` or not set, the first provider found
supporting the algorithm will be used.

Parameters:

- `sigProvider`: the signature provider's name (or `null`)

**See also:** #getSigProvider

## PKIXParameters.getTargetCertConstraints()

```java
public CertSelector getTargetCertConstraints()
```

Returns the required constraints on the target certificate.
The constraints are returned as an instance of `CertSelector`.
If `null`, no constraints are defined.

Note that the `CertSelector` returned is cloned
to protect against subsequent modifications.

**Returns:** a `CertSelector` specifying the constraints
on the target certificate (or `null`)

**See also:** #setTargetCertConstraints

## PKIXParameters.setTargetCertConstraints(CertSelector)

```java
public void setTargetCertConstraints(CertSelector selector)
```

Sets the required constraints on the target certificate.
The constraints are specified as an instance of
`CertSelector`. If `null`, no constraints are
defined.

Note that the `CertSelector` specified is cloned
to protect against subsequent modifications.

Parameters:

- `selector`: a `CertSelector` specifying the constraints on the target certificate (or `null`)

**See also:** #getTargetCertConstraints

## PKIXParameters.clone()

```java
public Object clone()
```

Makes a copy of this `PKIXParameters` object. Changes
to the copy will not affect the original and vice versa.

**Returns:** a copy of this `PKIXParameters` object

## PKIXParameters.toString()

```java
public String toString()
```

Returns a formatted string describing the parameters.

**Returns:** a formatted string describing the parameters.
