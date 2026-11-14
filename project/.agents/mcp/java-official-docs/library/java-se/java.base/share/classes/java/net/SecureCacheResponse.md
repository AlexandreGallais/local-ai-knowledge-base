---
title: "SecureCacheResponse class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/SecureCacheResponse.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SecureCacheResponse class (java.net)

```java
public abstract class SecureCacheResponse extends CacheResponse
```

Represents a cache response originally retrieved through secure
means, such as TLS.

**Since:** 1.5

## SecureCacheResponse.SecureCacheResponse()

```java
public SecureCacheResponse()
```

Constructor for subclasses to call.

## SecureCacheResponse.getCipherSuite()

```java
public abstract String getCipherSuite()
```

Returns the cipher suite in use on the original connection that
retrieved the network resource.

**Returns:** a string representing the cipher suite

## SecureCacheResponse.getLocalCertificateChain()

```java
public abstract List<Certificate> getLocalCertificateChain()
```

Returns the certificate chain that were sent to the server during
handshaking of the original connection that retrieved the
network resource.  Note: This method is useful only
when using certificate-based cipher suites.

**Returns:** an immutable List of Certificate representing the
          certificate chain that was sent to the server. If no
          certificate chain was sent, null will be returned.

**See also:** #getLocalPrincipal()

## SecureCacheResponse.getServerCertificateChain()

```java
public abstract List<Certificate> getServerCertificateChain() throws SSLPeerUnverifiedException
```

Returns the server's certificate chain, which was established as
part of defining the session in the original connection that
retrieved the network resource, from cache.  Note: This method
can be used only when using certificate-based cipher suites;
using it with non-certificate-based cipher suites, such as
Kerberos, will throw an SSLPeerUnverifiedException.

**Returns:** an immutable List of Certificate representing the server's
        certificate chain.

**See also:** #getPeerPrincipal()

Throws:

- `SSLPeerUnverifiedException`: if the peer is not verified.

## SecureCacheResponse.getPeerPrincipal()

```java
public abstract Principal getPeerPrincipal() throws SSLPeerUnverifiedException
```

Returns the server's principal which was established as part of
defining the session during the original connection that
retrieved the network resource.

**Returns:** the server's principal. Returns an X500Principal of the
end-entity certificate for X509-based cipher suites, and
KerberosPrincipal for Kerberos cipher suites.

**See also:** #getServerCertificateChain()

**See also:** #getLocalPrincipal()

Throws:

- `SSLPeerUnverifiedException`: if the peer was not verified.

## SecureCacheResponse.getLocalPrincipal()

```java
public abstract Principal getLocalPrincipal()
```

Returns the principal that was sent to the server during
handshaking in the original connection that retrieved the
network resource.

**Returns:** the principal sent to the server. Returns an X500Principal
of the end-entity certificate for X509-based cipher suites, and
KerberosPrincipal for Kerberos cipher suites. If no principal was
sent, then null is returned.

**See also:** #getLocalCertificateChain()

**See also:** #getPeerPrincipal()

## SecureCacheResponse.getSSLSession()

```java
public Optional<SSLSession> getSSLSession()
```

Returns an `Optional` containing the `SSLSession` in
use on the original connection that retrieved the network resource.
Returns an empty `Optional` if the underlying implementation
does not support this method.

**Implementation requirements:** For compatibility, the default implementation of this
          method returns an empty `Optional`.  Subclasses
          should override this method with an appropriate
          implementation since an application may need to access
          additional parameters associated with the SSL session.

**Returns:** an `Optional` containing the `SSLSession` in
          use on the original connection

**See also:** SSLSession

**Since:** 12
