---
title: "LDAPCertStoreParameters class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/LDAPCertStoreParameters.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LDAPCertStoreParameters class (java.security.cert)

```java
public class LDAPCertStoreParameters implements CertStoreParameters
```

Parameters used as input for the LDAP `CertStore` algorithm.

This class is used to provide necessary configuration parameters (server
name and port number) to implementations of the LDAP `CertStore`
algorithm. However, if you are retrieving certificates or CRLs from
an ldap URI as specified by RFC 5280, use the
URICertStoreParameters
instead, as the URI may contain additional information such as the
distinguished name that will help the LDAP CertStore find the specific
certificates and CRLs.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**Since:** 1.4

**See also:** CertStore

## LDAPCertStoreParameters.LDAPCertStoreParameters(String, int)

```java
public LDAPCertStoreParameters(String serverName, int port)
```

Creates an instance of `LDAPCertStoreParameters` with the
specified parameter values.

Parameters:

- `serverName`: the DNS name of the LDAP server
- `port`: the port number of the LDAP server

Throws:

- `NullPointerException`: if `serverName` is `null`

## LDAPCertStoreParameters.LDAPCertStoreParameters(String)

```java
public LDAPCertStoreParameters(String serverName)
```

Creates an instance of `LDAPCertStoreParameters` with the
specified server name and a default port of 389.

Parameters:

- `serverName`: the DNS name of the LDAP server

Throws:

- `NullPointerException`: if `serverName` is `null`

## LDAPCertStoreParameters.LDAPCertStoreParameters()

```java
public LDAPCertStoreParameters()
```

Creates an instance of `LDAPCertStoreParameters` with the
default parameter values (server name "localhost", port 389).

## LDAPCertStoreParameters.getServerName()

```java
public String getServerName()
```

Returns the DNS name of the LDAP server.

**Returns:** the name (not `null`)

## LDAPCertStoreParameters.getPort()

```java
public int getPort()
```

Returns the port number of the LDAP server.

**Returns:** the port number

## LDAPCertStoreParameters.clone()

```java
public Object clone()
```

Returns a copy of this object. Changes to the copy will not affect
the original and vice versa.

Note: this method currently performs a shallow copy of the object
(simply calls `Object.clone()`). This may be changed in a
future revision to perform a deep copy if new parameters are added
that should not be shared.

**Returns:** the copy

## LDAPCertStoreParameters.toString()

```java
public String toString()
```

Returns a formatted string describing the parameters.

**Returns:** a formatted string describing the parameters
