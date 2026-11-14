---
title: "Principal interface (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/Principal.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Principal interface (java.security)

```java
public interface Principal
```

This interface represents the abstract notion of a `Principal`, which
can be used to represent any entity, such as an individual, a
corporation, and a login id.

**See also:** java.security.cert.X509Certificate

**Since:** 1.1

## Principal.equals(Object)

```java
boolean equals(Object another)
```

Compares this `Principal` to the specified object.
Returns `true`
if the object passed in matches the `Principal` represented by
the implementation of this interface.

Parameters:

- `another`: `Principal` to compare with.

**Returns:** `true` if the `Principal` passed in is the same as
that encapsulated by this `Principal`, and `false` otherwise.

## Principal.toString()

```java
String toString()
```

Returns a string representation of this `Principal`.

**Returns:** a string representation of this `Principal`.

## Principal.hashCode()

```java
int hashCode()
```

## Principal.getName()

```java
String getName()
```

Returns the name of this `Principal`.

**Returns:** the name of this `Principal`.

## Principal.implies(Subject)

```java
default boolean implies(Subject subject)
```

Returns `true` if the specified subject is implied by this
`Principal`.

Parameters:

- `subject`: the `Subject`

**Implementation requirements:** The default implementation of this method returns `true` if
`subject` is non-null and contains at least one
`Principal` that is equal to this `Principal`.

Subclasses may override this with a different implementation, if
necessary.

**Returns:** `true` if `subject` is non-null and is
             implied by this `Principal`, or false otherwise.

**Since:** 1.8
