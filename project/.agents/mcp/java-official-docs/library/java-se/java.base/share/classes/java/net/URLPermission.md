# URLPermission class (java.net)

```java
public final class URLPermission extends Permission
```

Represents permission to access a resource or set of resources defined by a
given url, and for a given set of user-settable request methods
and request headers. The <i>name</i> of the permission is the url string.
The <i>actions</i> string is a concatenation of the request methods and headers.
The range of method and header names is not restricted by this class.
<p><b>The url</b><p>
The url string has the following expected structure.
<pre>
    scheme : // authority [ / path ] [ ignored-query-or-fragment ]
</pre>
<i>scheme</i> will typically be http or https, but is not restricted by this
class.
<i>authority</i> is specified as:
<pre>
    authority = [ userinfo @ ] hostrange [ : portrange ]
    portrange = portnumber | -portnumber | portnumber-[portnumber] | *
    hostrange = ([*.] dnsname) | IPv4address | IPv6address
</pre>
<i>dnsname</i> is a standard DNS host or domain name, i.e. one or more labels
separated by ".". <i>IPv4address</i> is a standard literal IPv4 address and
<i>IPv6address</i> is as defined in <a href="http://www.ietf.org/rfc/rfc2732.txt">
RFC 2732</a>. Literal IPv6 addresses must however, be enclosed in '[]' characters.
The <i>dnsname</i> specification can be preceded by "*." which means
the name will match any hostname whose right-most domain labels are the same as
this name. For example, "*.example.com" matches "foo.bar.example.com"
<p>
<i>portrange</i> is used to specify a port number, or a bounded or unbounded range of ports
that this permission applies to. If portrange is absent or invalid, then a default
port number is assumed if the scheme is {@code http} (default 80) or {@code https}
(default 443). No default is assumed for other schemes. A wildcard may be specified
which means all ports.
<p>
<i>userinfo</i> is optional. A userinfo component if present, is ignored when
creating a URLPermission, and has no effect on any other methods defined by this class.
<p>
The <i>path</i> component comprises a sequence of path segments,
separated by '/' characters. <i>path</i> may also be empty. The path is specified
in a similar way to the path in {@link java.io.FilePermission}. There are
three different ways as the following examples show:
<table class="striped">
<caption>URL Examples</caption>
<thead>
<tr><th scope="col">Example url</th><th scope="col">Description</th></tr>
</thead>
<tbody style="text-align:left">
<tr><th scope="row" style="white-space:nowrap;">http://www.example.com/a/b/c.html</th>
  <td>A url which identifies a specific (single) resource</td>
</tr>
<tr><th scope="row">http://www.example.com/a/b/*</th>
  <td>The '*' character refers to all resources in the same "directory" - in
      other words all resources with the same number of path components, and
      which only differ in the final path component, represented by the '*'.
  </td>
</tr>
<tr><th scope="row">http://www.example.com/a/b/-</th>
  <td>The '-' character refers to all resources recursively below the
      preceding path (e.g. http://www.example.com/a/b/c/d/e.html matches this
      example).
  </td>
</tr>
</tbody>
</table>
<p>
The '*' and '-' may only be specified in the final segment of a path and must be
the only character in that segment. Any query or fragment components of the
url are ignored when constructing URLPermissions.
<p>
As a special case, urls of the form, "scheme:*" are accepted to
mean any url of the given scheme.
<p>
The <i>scheme</i> and <i>authority</i> components of the url string are handled
without regard to case. This means {@link #equals(Object)},
{@link #hashCode()} and {@link #implies(Permission)} are case insensitive with respect
to these components. If the <i>authority</i> contains a literal IP address,
then the address is normalized for comparison. The path component is case sensitive.
<p>
<i>ignored-query-or-fragment</i> refers to any query or fragment which appears after the
path component, and which is ignored by the constructors of this class. It is defined as:
<pre>
    ignored-query-or-fragment = [ ? query ] [ # fragment ]
</pre>
where <i>query</i> and <i>fragment</i> are as defined in
<a href="http://www.ietf.org/rfc/rfc2296.txt">RFC2396</a>. {@link #getName() getName()} therefore returns
only the <i>scheme</i>, <i>authority</i> and <i>path</i> components of the url string that
the permission was created with.
<p><b>The actions string</b><p>
The actions string of a URLPermission is a concatenation of the <i>method list</i>
and the <i>request headers list</i>. These are lists of the permitted request
methods and permitted request headers of the permission (respectively). The two lists
are separated by a colon ':' character and elements of each list are comma separated.
Some examples are:
<ul>
<li>"POST,GET,DELETE"
<li>"GET:X-Foo-Request,X-Bar-Request"
<li>"POST,GET:Header1,Header2"
</ul>
<p>
The first example specifies the methods: POST, GET and DELETE, but no request headers.
The second example specifies one request method and two headers. The third
example specifies two request methods, and two headers.
<p>
The colon separator need not be present if the request headers list is empty.
No white-space is permitted in the actions string. The action strings supplied to
the URLPermission constructors are case-insensitive and are normalized by converting
method names to upper-case and header names to the form defines in RFC2616 (lower case
with initial letter of each word capitalized). Either list can contain a wild-card '*'
character which signifies all request methods or headers respectively.

@deprecated
This permission cannot be used for controlling access to resources
as the Security Manager is no longer supported.


@spec https://www.rfc-editor.org/info/rfc2296
     RFC 2296: HTTP Remote Variant Selection Algorithm -- RVSA/1.0
@spec https://www.rfc-editor.org/info/rfc2732
     RFC 2732: Format for Literal IPv6 Addresses in URL's
@since 1.8

## URLPermission.URLPermission(String, String)

```java
public URLPermission(String url, String actions)
```

Creates a new URLPermission from a url string and which permits the given
request methods and user-settable request headers.
The name of the permission is the url string it was created with. Only the scheme,
authority and path components of the url are used internally. Any fragment or query
components are ignored. The permissions action string is as specified above.

@param url the url string

@param actions the actions string

@throws    IllegalArgumentException if url is invalid or if actions contains white-space.

## URLPermission.URLPermission(String)

```java
public URLPermission(String url)
```

Creates a URLPermission with the given url string and unrestricted
methods and request headers by invoking the two argument
constructor as follows: URLPermission(url, "*:*")

@param url the url string

@throws    IllegalArgumentException if url does not result in a valid {@link URI}

## URLPermission.getActions()

```java
public String getActions()
```

Returns the normalized method list and request
header list, in the form:
<pre>
     "method-names : header-names"
</pre>
<p>
where method-names is the list of methods separated by commas
and header-names is the list of permitted headers separated by commas.
There is no white space in the returned String. If header-names is empty
then the colon separator may not be present.

## URLPermission.implies(Permission)

```java
public boolean implies(Permission p)
```

Checks if this URLPermission implies the given permission.
Specifically, the following checks are done as if in the
following sequence:
<ul>
<li>if 'p' is not an instance of URLPermission return false</li>
<li>if any of p's methods are not in this's method list, and if
    this's method list is not equal to "*", then return false.</li>
<li>if any of p's headers are not in this's request header list, and if
    this's request header list is not equal to "*", then return false.</li>
<li>if this's url scheme is not equal to p's url scheme return false</li>
<li>if the scheme specific part of this's url is '*' return true</li>
<li>if the set of hosts defined by p's url hostrange is not a subset of
    this's url hostrange then return false. For example, "*.foo.example.com"
    is a subset of "*.example.com". "foo.bar.example.com" is not
    a subset of "*.foo.example.com"</li>
<li>if the portrange defined by p's url is not a subset of the
    portrange defined by this's url then return false.
<li>if the path or paths specified by p's url are contained in the
    set of paths specified by this's url, then return true
<li>otherwise, return false</li>
</ul>
<p>Some examples of how paths are matched are shown below:
<table class="plain">
<caption>Examples of Path Matching</caption>
<thead>
<tr><th scope="col">this's path</th><th scope="col">p's path</th><th>match</th></tr>
</thead>
<tbody style="text-align:left">
<tr><th scope="row">/a/b</th><th scope="row">/a/b</th><td>yes</td></tr>
<tr><th scope="row" rowspan="3">/a/b/*</th><th scope="row">/a/b/c</th><td>yes</td></tr>
<tr>  <th scope="row">/a/b/c/d</th><td>no</td></tr>
<tr>  <th scope="row">/a/b/c/-</th><td>no</td></tr>
<tr><th scope="row" rowspan="3">/a/b/-</th><th scope="row">/a/b/c/d</th><td>yes</td></tr>
<tr>  <th scope="row">/a/b/c/d/e</th><td>yes</td></tr>
<tr>  <th scope="row">/a/b/c/*</th><td>yes</td></tr>
</tbody>
</table>

## URLPermission.equals(Object)

```java
public boolean equals(Object p)
```

Returns true if, this.getActions().equals(p.getActions())
and p's url equals this's url.  Returns false otherwise.

## URLPermission.hashCode()

```java
public int hashCode()
```

Returns a hashcode calculated from the hashcode of the
actions String and the url string.