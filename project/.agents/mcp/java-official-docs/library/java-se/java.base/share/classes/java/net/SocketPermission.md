# SocketPermission class (java.net)

```java
public final class SocketPermission extends Permission implements java.io.Serializable
```

This class represents access to a network via sockets.
A SocketPermission consists of a
host specification and a set of "actions" specifying ways to
connect to that host. The host is specified as
<pre>
   host = (hostname | IPv4address | iPv6reference) [:portrange]
   portrange = portnumber | -portnumber | portnumber-[portnumber]
</pre>
The host is expressed as a DNS name, as a numerical IP address,
or as "localhost" (for the local machine).
The wildcard "*" may be included once in a DNS name host
specification. If it is included, it must be in the leftmost
position, as in "*.example.com".
<p>
The format of the IPv6reference should follow that specified in <a
href="http://www.ietf.org/rfc/rfc2732.txt"><i>RFC&nbsp;2732: Format
for Literal IPv6 Addresses in URLs</i></a>:
<pre>
   ipv6reference = "[" IPv6address "]"
</pre>
For example, you can construct a SocketPermission instance
as the following:
<pre>
   String hostAddress = inetaddress.getHostAddress();
   if (inetaddress instanceof Inet6Address) {
       sp = new SocketPermission("[" + hostAddress + "]:" + port, action);
   } else {
       sp = new SocketPermission(hostAddress + ":" + port, action);
   }
</pre>
or
<pre>
   String host = url.getHost();
   sp = new SocketPermission(host + ":" + port, action);
</pre>
<p>
The <A HREF="Inet6Address.html#lform">full uncompressed form</A> of
an IPv6 literal address is also valid.
<p>
The port or portrange is optional. A port specification of the
form "N-", where <i>N</i> is a port number, signifies all ports
numbered <i>N</i> and above, while a specification of the
form "-N" indicates all ports numbered <i>N</i> and below.
The special port value {@code 0} refers to the entire <i>ephemeral</i>
port range. This is a fixed range of ports a system may use to
allocate dynamic ports from. The actual range may be system dependent.
<p>
The possible ways to connect to the host are
<pre>
accept
connect
listen
resolve
</pre>
The "listen" action is only meaningful when used with "localhost" and
means the ability to bind to a specified port.
The "resolve" action is implied when any of the other actions are present.
The action "resolve" refers to host/ip name service lookups.
<P>
The actions string is converted to lowercase before processing.

@apiNote
This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.

@spec https://www.rfc-editor.org/info/rfc2732
     RFC 2732: Format for Literal IPv6 Addresses in URL's
@see java.security.Permissions
@see SocketPermission


@author Marianne Mueller
@author Roland Schemers
@since 1.2

@serial exclude

## SocketPermission.SocketPermission(String, String)

```java
public SocketPermission(String host, String action)
```

Creates a new SocketPermission object with the specified actions.
The host is expressed as a DNS name, or as a numerical IP address.
Optionally, a port or a portrange may be supplied (separated
from the DNS name or IP address by a colon).
<p>
To specify the local machine, use "localhost" as the <i>host</i>.
Also note: An empty <i>host</i> String ("") is equivalent to "localhost".
<p>
The <i>actions</i> parameter contains a comma-separated list of the
actions granted for the specified host (and port(s)). Possible actions are
"connect", "listen", "accept", "resolve", or
any combination of those. "resolve" is automatically added
when any of the other three are specified.
<p>
Examples of SocketPermission instantiation are the following:
<pre>
   nr = new SocketPermission("www.example.com", "connect");
   nr = new SocketPermission("www.example.com:80", "connect");
   nr = new SocketPermission("*.example.com", "connect");
   nr = new SocketPermission("*.edu", "resolve");
   nr = new SocketPermission("204.160.241.0", "connect");
   nr = new SocketPermission("localhost:1024-65535", "listen");
   nr = new SocketPermission("204.160.241.0:1024-65535", "connect");
</pre>

@param host the hostname or IP address of the computer, optionally
including a colon followed by a port or port range.
@param action the action string.

@throws NullPointerException if any parameters are null
@throws IllegalArgumentException if the format of {@code host} is
        invalid, or if the {@code action} string is empty, malformed, or
        contains an action other than the specified possible actions

## SocketPermission.implies(Permission)

```java
public boolean implies(Permission p)
```

Checks if this socket permission object "implies" the
specified permission.
<P>
More specifically, this method first ensures that all of the following
are true (and returns false if any of them are not):
<ul>
<li> <i>p</i> is an instanceof SocketPermission,
<li> <i>p</i>'s actions are a proper subset of this
object's actions, and
<li> <i>p</i>'s port range is included in this port range. Note:
port range is ignored when p only contains the action, 'resolve'.
</ul>

Then {@code implies} checks each of the following, in order,
and for each returns true if the stated condition is true:
<ul>
<li> If this object was initialized with a single IP address and one of <i>p</i>'s
IP addresses is equal to this object's IP address.
<li>If this object is a wildcard domain (such as *.example.com), and
<i>p</i>'s canonical name (the name without any preceding *)
ends with this object's canonical host name. For example, *.example.com
implies *.foo.example.com.
<li>If this object was not initialized with a single IP address, and one of this
object's IP addresses equals one of <i>p</i>'s IP addresses.
<li>If this canonical name equals <i>p</i>'s canonical name.
</ul>

If none of the above are true, {@code implies} returns false.
@param p the permission to check against.

@return true if the specified permission is implied by this object,
false if not.

## SocketPermission.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two SocketPermission objects for equality.

@param obj the object to test for equality with this object.

@return true if <i>obj</i> is a SocketPermission, and has the
 same hostname, port range, and actions as this
 SocketPermission object. However, port range will be ignored
 in the comparison if <i>obj</i> only contains the action, 'resolve'.

## SocketPermission.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this object.

@return a hash code value for this object.

## SocketPermission.getActions()

```java
public String getActions()
```

Returns the canonical string representation of the actions.
Always returns present actions in the following order:
connect, listen, accept, resolve.

@return the canonical string representation of the actions.

## SocketPermission.newPermissionCollection()

```java
public PermissionCollection newPermissionCollection()
```

Returns a new PermissionCollection object for storing SocketPermission
objects.
<p>
SocketPermission objects must be stored in a manner that allows them
to be inserted into the collection in any order, but that also enables the
PermissionCollection {@code implies}
method to be implemented in an efficient (and consistent) manner.

@return a new PermissionCollection object suitable for storing SocketPermissions.

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

@param permission the Permission object to add.

@throws    IllegalArgumentException   if the permission is not a
                                      SocketPermission

@throws    SecurityException   if this SocketPermissionCollection object
                               has been marked readonly

## SocketPermission.implies(Permission)

```java
public boolean implies(Permission permission)
```

Check and see if this collection of permissions implies the permissions
expressed in "permission".

@param permission the Permission object to compare

@return true if "permission" is a proper subset of a permission in
the collection, false if not.

## SocketPermission.elements()

```java
public Enumeration<Permission> elements()
```

Returns an enumeration of all the SocketPermission objects in the
container.

@return an enumeration of all the SocketPermission objects.