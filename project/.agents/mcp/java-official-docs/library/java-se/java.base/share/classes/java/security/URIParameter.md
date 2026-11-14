---
title: "URIParameter class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/URIParameter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URIParameter class (java.security)

```java
public class URIParameter implements Policy.Parameters, javax.security.auth.login.Configuration.Parameters
```

A parameter that contains a URI pointing to data intended for a
PolicySpi or ConfigurationSpi implementation.

**Since:** 1.6

## URIParameter.URIParameter(java.net.URI)

```java
public URIParameter(java.net.URI uri)
```

Constructs a `URIParameter` with the URI pointing to
data intended for an SPI implementation.

Parameters:

- `uri`: the URI pointing to the data.

Throws:

- `NullPointerException`: if the specified URI is `null`.

## URIParameter.getURI()

```java
public java.net.URI getURI()
```

Returns the URI.

**Returns:** uri the URI.
