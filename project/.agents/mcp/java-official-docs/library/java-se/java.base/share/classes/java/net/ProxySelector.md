---
title: "ProxySelector class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/ProxySelector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ProxySelector class (java.net)

```java
public abstract class ProxySelector
```

Selects the proxy server to use, if any, when connecting to the
network resource referenced by a URL. A proxy selector is a
concrete sub-class of this class and is registered by invoking the
setDefault method. The
currently registered proxy selector can be retrieved by calling
getDefault method.

 When a proxy selector is registered, for instance, a subclass
of URLConnection class should call the select
method for each URL request so that the proxy selector can decide
if a direct, or proxied connection should be used. The select method returns an iterator over a collection with
the preferred connection approach.

 If a connection cannot be established to a proxy (PROXY or
SOCKS) servers then the caller should call the proxy selector's
connectFailed method to notify the proxy
selector that the proxy server is unavailable.

The default proxy selector does enforce a
set of System Properties
related to proxy settings.

**Since:** 1.5

## ProxySelector.ProxySelector()

```java
public ProxySelector()
```

Constructor for subclasses to call.

## ProxySelector.getDefault()

```java
public static ProxySelector getDefault()
```

Gets the system-wide proxy selector.

**See also:** #setDefault(ProxySelector)

**Returns:** the system-wide `ProxySelector`

**Since:** 1.5

## ProxySelector.setDefault(ProxySelector)

```java
public static void setDefault(ProxySelector ps)
```

Sets (or unsets) the system-wide proxy selector.

Note: non-standard protocol handlers may ignore this setting.

Parameters:

- `ps`: The HTTP proxy selector, or `null` to unset the proxy selector.

**See also:** #getDefault()

**Since:** 1.5

## ProxySelector.select(URI)

```java
public abstract List<Proxy> select(URI uri)
```

Selects all the applicable proxies based on the protocol to
access the resource with and a destination address to access
the resource at.
The format of the URI is defined as follows:

- http URI for http connections

- https URI for https connections

- `socket://host:port`

    for tcp client sockets connections

Parameters:

- `uri`: The URI that a connection is required to

**Returns:** a List of Proxies. Each element in
         the List is of type
         Proxy;
         when no proxy is available, the list will
         contain one element of type
         Proxy
         that represents a direct connection.

Throws:

- `IllegalArgumentException`: if the argument is null or if the protocol or host cannot be determined from the provided `uri`

## ProxySelector.connectFailed(URI, SocketAddress, IOException)

```java
public abstract void connectFailed(URI uri, SocketAddress sa, IOException ioe)
```

Called to indicate that a connection could not be established
to a proxy/socks server. An implementation of this method can
temporarily remove the proxies or reorder the sequence of
proxies returned by `select(URI)`, using the address
and the IOException caught when trying to connect.

Parameters:

- `uri`: The URI that the proxy at sa failed to serve.
- `sa`: The socket address of the proxy/SOCKS server
- `ioe`: The I/O exception thrown when the connect failed.

Throws:

- `IllegalArgumentException`: if either argument is null

## ProxySelector.of(InetSocketAddress)

```java
public static ProxySelector of(InetSocketAddress proxyAddress)
```

Returns a ProxySelector which uses the given proxy address for all HTTP
and HTTPS requests. If `proxyAddress` is `null`
then proxying is disabled.

Parameters:

- `proxyAddress`: The address of the proxy

**Returns:** a ProxySelector

**Since:** 9
