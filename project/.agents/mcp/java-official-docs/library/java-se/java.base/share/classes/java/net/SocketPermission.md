---
title: "SocketPermission class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/SocketPermission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SocketPermission class (java.net)

```java
public final class SocketPermission extends Permission implements java.io.Serializable
```

This class represents access to a network via sockets.
A SocketPermission consists of a
host specification and a set of "actions" specifying ways to
connect to that host. The host is specified as

```java
   host = (hostname | IPv4address | iPv6reference) [:portrange]
   portrange = portnumber | -portnumber | portnumber-[portnumber]
```

The host is expressed as a DNS name, as a numerical IP address,
or as "localhost" (for the local machine).
The wildcard "*" may be included once in a DNS name host
specification. If it is included, it must be in the leftmost
position, as in "*.example.com".

The format of the IPv6reference should follow that specified in *RFC 2732: Format
for Literal IPv6 Addresses in URLs*:

```java
   ipv6reference = "[" IPv6address "]"
```

For example, you can construct a SocketPermission instance
as the following:

```java
   String hostAddress = inetaddress.getHostAddress();
   if (inetaddress instanceof Inet6Address) {
       sp = new SocketPermission("[" + hostAddress + "]:" + port, action);
   } else {
       sp = new SocketPermission(hostAddress + ":" + port, action);
```

or

```java
   String host = url.getHost();
   sp = new SocketPermission(host + ":" + port, action);
```

The full uncompressed form of
an IPv6 literal address is also valid.

The port or portrange is optional. A port specification of the
form "N-", where *N* is a port number, signifies all ports
numbered *N* and above, while a specification of the
form "-N" indicates all ports numbered *N* and below.
The special port value `0` refers to the entire *ephemeral*
port range. This is a fixed range of ports a system may use to
allocate dynamic ports from. The actual range may be system dependent.

The possible ways to connect to the host are

```java
accept
connect
listen
resolve
```

The "listen" action is only meaningful when used with "localhost" and
means the ability to bind to a specified port.
The "resolve" action is implied when any of the other actions are present.
The action "resolve" refers to host/ip name service lookups.

The actions string is converted to lowercase before processing.

**API note:** This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

**See also:** java.security.Permissions

**See also:** SocketPermission

**Since:** 1.2

## SocketPermission.SocketPermission(String, String)

```java
public SocketPermission(String host, String action)
```

Creates a new SocketPermission object with the specified actions.
The host is expressed as a DNS name, or as a numerical IP address.
Optionally, a port or a portrange may be supplied (separated
from the DNS name or IP address by a colon).

To specify the local machine, use "localhost" as the *host*.
Also note: An empty *host* String ("") is equivalent to "localhost".

The *actions* parameter contains a comma-separated list of the
actions granted for the specified host (and port(s)). Possible actions are
"connect", "listen", "accept", "resolve", or
any combination of those. "resolve" is automatically added
when any of the other three are specified.

Examples of SocketPermission instantiation are the following:

```java
   nr = new SocketPermission("www.example.com", "connect");
   nr = new SocketPermission("www.example.com:80", "connect");
   nr = new SocketPermission("*.example.com", "connect");
   nr = new SocketPermission("*.edu", "resolve");
   nr = new SocketPermission("204.160.241.0", "connect");
   nr = new SocketPermission("localhost:1024-65535", "listen");
   nr = new SocketPermission("204.160.241.0:1024-65535", "connect");
```

Parameters:

- `host`: the hostname or IP address of the computer, optionally including a colon followed by a port or port range.
- `action`: the action string.

Throws:

- `NullPointerException`: if any parameters are null
- `IllegalArgumentException`: if the format of `host` is invalid, or if the `action` string is empty, malformed, or contains an action other than the specified possible actions

## SocketPermission.implies(Permission)

```java
public boolean implies(Permission p)
```

Checks if this socket permission object "implies" the
specified permission.

More specifically, this method first ensures that all of the following
are true (and returns false if any of them are not):

-  *p* is an instanceof SocketPermission,

-  *p*'s actions are a proper subset of this
object's actions, and

-  *p*'s port range is included in this port range. Note:
port range is ignored when p only contains the action, 'resolve'.

Then `implies` checks each of the following, in order,
and for each returns true if the stated condition is true:

-  If this object was initialized with a single IP address and one of *p*'s
IP addresses is equal to this object's IP address.

- If this object is a wildcard domain (such as *.example.com), and
*p*'s canonical name (the name without any preceding *)
ends with this object's canonical host name. For example, *.example.com
implies *.foo.example.com.

- If this object was not initialized with a single IP address, and one of this
object's IP addresses equals one of *p*'s IP addresses.

- If this canonical name equals *p*'s canonical name.

If none of the above are true, `implies` returns false.

Parameters:

- `p`: the permission to check against.

**Returns:** true if the specified permission is implied by this object,
false if not.

## SocketPermission.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two SocketPermission objects for equality.

Parameters:

- `obj`: the object to test for equality with this object.

**Returns:** true if *obj* is a SocketPermission, and has the
 same hostname, port range, and actions as this
 SocketPermission object. However, port range will be ignored
 in the comparison if *obj* only contains the action, 'resolve'.

## SocketPermission.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this object.

**Returns:** a hash code value for this object.

## SocketPermission.getActions()

```java
public String getActions()
```

Returns the canonical string representation of the actions.
Always returns present actions in the following order:
connect, listen, accept, resolve.

**Returns:** the canonical string representation of the actions.

## SocketPermission.newPermissionCollection()

```java
public PermissionCollection newPermissionCollection()
```

Returns a new PermissionCollection object for storing SocketPermission
objects.

SocketPermission objects must be stored in a manner that allows them
to be inserted into the collection in any order, but that also enables the
PermissionCollection `implies`
method to be implemented in an efficient (and consistent) manner.

**Returns:** a new PermissionCollection object suitable for storing SocketPermissions.

## SocketPermission.SocketPermissionCollection()

```java
public SocketPermissionCollection()
```

Create an empty SocketPermissionCollection object.

## SocketPermission.add(Permission)

```java
public void add(Permission permission)
```

Adds a permission to the SocketPermissions. The key for the hash is
the name in the case of wildcards, or all the IP addresses.

Parameters:

- `permission`: the Permission object to add.

Throws:

- `IllegalArgumentException`: if the permission is not a SocketPermission
- `SecurityException`: if this SocketPermissionCollection object has been marked readonly

## SocketPermission.implies(Permission)

```java
public boolean implies(Permission permission)
```

Check and see if this collection of permissions implies the permissions
expressed in "permission".

Parameters:

- `permission`: the Permission object to compare

**Returns:** true if "permission" is a proper subset of a permission in
the collection, false if not.

## SocketPermission.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the SocketPermission objects in the
container.

**Returns:** an enumeration of all the SocketPermission objects.
