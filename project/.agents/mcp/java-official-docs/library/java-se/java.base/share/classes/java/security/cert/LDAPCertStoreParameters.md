# LDAPCertStoreParameters class (java.security.cert)

```java
public class LDAPCertStoreParameters implements CertStoreParameters
```

Parameters used as input for the LDAP {@code CertStore} algorithm.
<p>
This class is used to provide necessary configuration parameters (server
name and port number) to implementations of the LDAP {@code CertStore}
algorithm. However, if you are retrieving certificates or CRLs from
an ldap URI as specified by RFC 5280, use the
{@link java.security.cert.URICertStoreParameters URICertStoreParameters}
instead, as the URI may contain additional information such as the
distinguished name that will help the LDAP CertStore find the specific
certificates and CRLs.
<p>
<b>Concurrent Access</b>
<p>
Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

@since       1.4
@author      Steve Hanna
@see         CertStore

## LDAPCertStoreParameters.LDAPCertStoreParameters(String, int)

```java
public LDAPCertStoreParameters(String serverName, int port)
```

Creates an instance of {@code LDAPCertStoreParameters} with the
specified parameter values.

@param serverName the DNS name of the LDAP server
@param port the port number of the LDAP server
@throws    NullPointerException if {@code serverName} is
{@code null}

## LDAPCertStoreParameters.LDAPCertStoreParameters(String)

```java
public LDAPCertStoreParameters(String serverName)
```

Creates an instance of {@code LDAPCertStoreParameters} with the
specified server name and a default port of 389.

@param serverName the DNS name of the LDAP server
@throws    NullPointerException if {@code serverName} is
{@code null}

## LDAPCertStoreParameters.LDAPCertStoreParameters()

```java
public LDAPCertStoreParameters()
```

Creates an instance of {@code LDAPCertStoreParameters} with the
default parameter values (server name "localhost", port 389).

## LDAPCertStoreParameters.getServerName()

```java
public String getServerName()
```

Returns the DNS name of the LDAP server.

@return the name (not {@code null})

## LDAPCertStoreParameters.getPort()

```java
public int getPort()
```

Returns the port number of the LDAP server.

@return the port number

## LDAPCertStoreParameters.clone()

```java
public Object clone()
```

Returns a copy of this object. Changes to the copy will not affect
the original and vice versa.
<p>
Note: this method currently performs a shallow copy of the object
(simply calls {@code Object.clone()}). This may be changed in a
future revision to perform a deep copy if new parameters are added
that should not be shared.

@return the copy

## LDAPCertStoreParameters.toString()

```java
public String toString()
```

Returns a formatted string describing the parameters.

@return a formatted string describing the parameters