---
title: "Authenticator class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/Authenticator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Authenticator class (java.net)

```java
public abstract class Authenticator
```

The class Authenticator represents an object that knows how to obtain
authentication for a network connection.  Usually, it will do this
by prompting the user for information.

Applications use this class by overriding `getPasswordAuthentication()` in a sub-class. This method will
typically use the various getXXX() accessor methods to get information
about the entity requesting authentication. It must then acquire a
username and password <example-value> by interacting with the user or through
some other non-interactive means. The credentials are then returned
as a `PasswordAuthentication` return value.

An instance of this concrete sub-class is then registered
with the system by calling `setDefault(Authenticator)`.
When authentication is required, the system will invoke one of the
requestPasswordAuthentication() methods which in turn will call the
getPasswordAuthentication() method of the registered object.

All methods that request authentication have a default implementation
that fails.

**See also:** java.net.Authenticator#setDefault(java.net.Authenticator)

**See also:** java.net.Authenticator#getPasswordAuthentication()

**Since:** 1.2

## Authenticator.Authenticator()

```java
public Authenticator()
```

Constructor for subclasses to call.

## Authenticator.setDefault(Authenticator)

```java
public static synchronized void setDefault(Authenticator a)
```

Sets the authenticator that will be used by the networking code
when a proxy or an HTTP server asks for authentication.

Parameters:

- `a`: The authenticator to be set. If a is `null` then any previously set authenticator is removed.

## Authenticator.getDefault()

```java
public static Authenticator getDefault()
```

Gets the default authenticator.

**Returns:** The default authenticator, if set, `null` otherwise.

**Since:** 9

## Authenticator.requestPasswordAuthentication(InetAddress, int, String, String, String)

```java
public static PasswordAuthentication requestPasswordAuthentication( InetAddress addr, int port, String protocol, String prompt, String scheme)
```

Ask the authenticator that has been registered with the system
for a password.

Parameters:

- `addr`: The InetAddress of the site requesting authorization, or null if not known.
- `port`: the port for the requested connection
- `protocol`: The protocol that's requesting the connection (`java.net.Authenticator.getRequestingProtocol()`)
- `prompt`: A prompt string for the user
- `scheme`: The authentication scheme

**Returns:** The username/password, or null if one can't be gotten.

## Authenticator.requestPasswordAuthentication(String, InetAddress, int, String, String, String)

```java
public static PasswordAuthentication requestPasswordAuthentication( String host, InetAddress addr, int port, String protocol, String prompt, String scheme)
```

Ask the authenticator that has been registered with the system
for a password. This is the preferred method for requesting a password
because the hostname can be provided in cases where the InetAddress
is not available.

Parameters:

- `host`: The hostname of the site requesting authentication.
- `addr`: The InetAddress of the site requesting authentication, or null if not known.
- `port`: the port for the requested connection.
- `protocol`: The protocol that's requesting the connection (`java.net.Authenticator.getRequestingProtocol()`)
- `prompt`: A prompt string for the user which identifies the authentication realm.
- `scheme`: The authentication scheme

**Returns:** The username/password, or null if one can't be gotten.

**Since:** 1.4

## Authenticator.requestPasswordAuthentication(String, InetAddress, int, String, String, String, URL, RequestorType)

```java
public static PasswordAuthentication requestPasswordAuthentication( String host, InetAddress addr, int port, String protocol, String prompt, String scheme, URL url, RequestorType reqType)
```

Ask the authenticator that has been registered with the system
for a password.

Parameters:

- `host`: The hostname of the site requesting authentication.
- `addr`: The InetAddress of the site requesting authorization, or null if not known.
- `port`: the port for the requested connection
- `protocol`: The protocol that's requesting the connection (`java.net.Authenticator.getRequestingProtocol()`)
- `prompt`: A prompt string for the user
- `scheme`: The authentication scheme
- `url`: The requesting URL that caused the authentication
- `reqType`: The type (server or proxy) of the entity requesting authentication.

**Returns:** The username/password, or null if one can't be gotten.

**Since:** 1.5

## Authenticator.requestPasswordAuthentication(Authenticator, String, InetAddress, int, String, String, String, URL, RequestorType)

```java
public static PasswordAuthentication requestPasswordAuthentication( Authenticator authenticator, String host, InetAddress addr, int port, String protocol, String prompt, String scheme, URL url, RequestorType reqType)
```

Ask the given `authenticator` for a password. If the given
`authenticator` is null, the authenticator, if any, that has been
registered with the system using setDefault is used.

Parameters:

- `authenticator`: the authenticator, or `null`.
- `host`: The hostname of the site requesting authentication.
- `addr`: The InetAddress of the site requesting authorization, or null if not known.
- `port`: the port for the requested connection
- `protocol`: The protocol that's requesting the connection (`java.net.Authenticator.getRequestingProtocol()`)
- `prompt`: A prompt string for the user
- `scheme`: The authentication scheme
- `url`: The requesting URL that caused the authentication
- `reqType`: The type (server or proxy) of the entity requesting authentication.

**Returns:** The username/password, or `null` if one can't be gotten.

**Since:** 9

## Authenticator.requestPasswordAuthenticationInstance(String, InetAddress, int, String, String, String, URL, RequestorType)

```java
public PasswordAuthentication requestPasswordAuthenticationInstance(String host, InetAddress addr, int port, String protocol, String prompt, String scheme, URL url, RequestorType reqType)
```

Ask this authenticator for a password.

Parameters:

- `host`: The hostname of the site requesting authentication.
- `addr`: The InetAddress of the site requesting authorization, or null if not known.
- `port`: the port for the requested connection
- `protocol`: The protocol that's requesting the connection (`java.net.Authenticator.getRequestingProtocol()`)
- `prompt`: A prompt string for the user
- `scheme`: The authentication scheme
- `url`: The requesting URL that caused the authentication
- `reqType`: The type (server or proxy) of the entity requesting authentication.

**Returns:** The username/password, or null if one can't be gotten

**Since:** 9

## Authenticator.getRequestingHost()

```java
protected final String getRequestingHost()
```

Gets the `hostname` of the
site or proxy requesting authentication, or `null`
if not available.

**Returns:** the hostname of the connection requiring authentication, or null
         if it's not available.

**Since:** 1.4

## Authenticator.getRequestingSite()

```java
protected final InetAddress getRequestingSite()
```

Gets the `InetAddress` of the
site requesting authorization, or `null`
if not available.

**Returns:** the InetAddress of the site requesting authorization, or null
         if it's not available.

## Authenticator.getRequestingPort()

```java
protected final int getRequestingPort()
```

Gets the port number for the requested connection.

**Returns:** an `int` indicating the
port for the requested connection.

## Authenticator.getRequestingProtocol()

```java
protected final String getRequestingProtocol()
```

Give the protocol that's requesting the connection.  Often this
will be based on a URL, but in a future JDK it could be, for
example, "SOCKS" for a password-protected SOCKS5 firewall.

**Returns:** the protocol, optionally followed by "/version", where
         version is a version number.

**See also:** java.net.URL#getProtocol()

## Authenticator.getRequestingPrompt()

```java
protected final String getRequestingPrompt()
```

Gets the prompt string given by the requestor.

**Returns:** the prompt string given by the requestor (realm for
         http requests)

## Authenticator.getRequestingScheme()

```java
protected final String getRequestingScheme()
```

Gets the scheme of the requestor (the HTTP scheme
for an HTTP firewall, for example).

**Returns:** the scheme of the requestor

## Authenticator.getPasswordAuthentication()

```java
protected PasswordAuthentication getPasswordAuthentication()
```

Called when password <example-value> is needed.  Subclasses should
override the default implementation, which returns null.

**Returns:** The PasswordAuthentication collected from the
         user, or null if none is provided.

## Authenticator.getRequestingURL()

```java
protected URL getRequestingURL ()
```

Returns the URL that resulted in this request for authentication.
If the corresponding request does not specify a URL, this method returns null.

**Since:** 1.5

**Returns:** the requesting URL, or null if not available.

## Authenticator.getRequestorType()

```java
protected RequestorType getRequestorType ()
```

Returns whether the requestor is a Proxy or a Server.

**Since:** 1.5

**Returns:** the authentication type of the requestor
