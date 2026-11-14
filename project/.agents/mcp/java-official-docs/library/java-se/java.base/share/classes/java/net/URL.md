# URL class (java.net)

```java
public final class URL implements java.io.Serializable
```

Class {@code URL} represents a Uniform Resource
Locator, a pointer to a "resource" on the World
Wide Web. A resource can be something as simple as a file or a
directory, or it can be a reference to a more complicated object,
such as a query to a database or to a search engine. More
information on the types of URLs and their formats can be found at:
<a href=
"http://web.archive.org/web/20051219043731/http://archive.ncsa.uiuc.edu/SDG/Software/Mosaic/Demo/url-primer.html">
<i>Types of URL</i></a>
<p>
In general, a URL can be broken into several parts. Consider the
following example:
<blockquote><pre>
    http://www.example.com/docs/resource1.html
</pre></blockquote>
<p>
The URL above indicates that the protocol to use is
{@code http} (HyperText Transfer Protocol) and that the
information resides on a host machine named
{@code www.example.com}. The information on that host
machine is named {@code /docs/resource1.html}. The exact
meaning of this name on the host machine is both protocol
dependent and host dependent. The information normally resides in
a file, but it could be generated on the fly. This component of
the URL is called the <i>path</i> component.
<p>
A URL can optionally specify a "port", which is the
port number to which the TCP connection is made on the remote host
machine. If the port is not specified, the default port for
the protocol is used instead. For example, the default port for
{@code http} is {@code 80}. An alternative port could be
specified as:
<blockquote><pre>
    http://www.example.com:1080/docs/resource1.html
</pre></blockquote>
<p>
The syntax of {@code URL} is defined by  <a
href="http://www.ietf.org/rfc/rfc2396.txt"><i>RFC&nbsp;2396: Uniform
Resource Identifiers (URI): Generic Syntax</i></a>, amended by <a
href="http://www.ietf.org/rfc/rfc2732.txt"><i>RFC&nbsp;2732: Format for
Literal IPv6 Addresses in URLs</i></a>. The Literal IPv6 address format
also supports scope_ids. The syntax and usage of scope_ids is described
<a href="Inet6Address.html#scoped">here</a>.
<p>
A URL may have appended to it a "fragment", also known
as a "ref" or a "reference". The fragment is indicated by the sharp
sign character "#" followed by more characters. For example,
<blockquote><pre>
    http://www.example.com/index.html#chapter1
</pre></blockquote>
<p>
This fragment is not technically part of the URL. Rather, it
indicates that after the specified resource is retrieved, the
application is specifically interested in that part of the
document that has the tag {@code chapter1} attached to it. The
meaning of a tag is resource specific.
<p>
An application can also specify a "relative URL",
which contains only enough information to reach the resource
relative to another URL. Relative URLs are frequently used within
HTML pages. For example, if the contents of the URL:
<blockquote><pre>
    http://www.example.com/index.html
</pre></blockquote>
contained within it the relative URL:
<blockquote><pre>
    FAQ.html
</pre></blockquote>
it would be a shorthand for:
<blockquote><pre>
    http://www.example.com/FAQ.html
</pre></blockquote>
<p>
The relative URL need not specify all the components of a URL. If
the protocol, host name, or port number is missing, the value is
inherited from the fully specified URL. The file component must be
specified. The optional fragment is not inherited.

<h2><a id="constructor-deprecation"></a>Constructing instances of {@code URL}</h2>

The {@code java.net.URL} constructors are deprecated.
Developers are encouraged to use {@link URI java.net.URI} to parse
or construct a {@code URL}. In cases where an instance of {@code
java.net.URL} is needed to open a connection, {@link URI} can be used
to construct or parse the URL string, possibly calling {@link
URI#parseServerAuthority()} to validate that the authority component
can be parsed as a server-based authority, and then calling
{@link URI#toURL()} to create the {@code URL} instance.
<p>
The URL constructors are specified to throw
{@link MalformedURLException} but the actual parsing/validation
that is performed is implementation dependent. Some parsing/validation
may be delayed until later, when the underlying {@linkplain
URLStreamHandler stream handler's implementation} is called.
Being able to construct an instance of {@code URL} doesn't
provide any guarantee about its conformance to the URL
syntax specification.
<p>
The URL class does not itself encode or decode any URL components
according to the escaping mechanism defined in RFC2396. It is the
responsibility of the caller to encode any fields, which need to be
escaped prior to calling URL, and also to decode any escaped fields,
that are returned from URL. Furthermore, because URL has no knowledge
of URL escaping, it does not recognise equivalence between the encoded
or decoded form of the same URL. For example, the two URLs:<br>
<pre>    http://foo.com/hello world/ and http://foo.com/hello%20world</pre>
would be considered not equal to each other.
<p>
Note, the {@link java.net.URI} class does perform escaping of its
component fields in certain circumstances. The recommended way
to manage the encoding and decoding of URLs is to use {@link java.net.URI},
and to convert between these two classes using {@link #toURI()} and
{@link URI#toURL()}.
<p>
The {@link URLEncoder} and {@link URLDecoder} classes can also be
used, but only for HTML form encoding, which is not the same
as the encoding scheme defined in RFC2396.

@apiNote

<a id="integrity"></a>
Applications working with file paths and file URIs should take great
care to use the appropriate methods to convert between the two.
The {@link Path#of(URI)} factory method and the {@link File#File(URI)}
constructor can be used to create {@link Path} or {@link File}
objects from a file URI. {@link Path#toUri()} and {@link File#toURI()}
can be used to create a {@link URI} from a file path, which can be
converted to URL using {@link URI#toURL()}.
Applications should never try to {@linkplain #URL(String, String, String)
construct} or {@linkplain #URL(String) parse} a {@code URL}
from the direct string representation of a {@code File} or {@code Path}
instance.
<p>
Before constructing a {@code URL} from a {@code URI}, and depending
on the protocol involved, applications should consider validating
whether the URI authority {@linkplain URI#parseServerAuthority()
can be parsed as server-based}.
<p>
Some components of a URL or URI, such as <i>userinfo</i>, may
be abused to construct misleading URLs or URIs. Applications
that deal with URLs or URIs should take into account
the recommendations advised in <a
href="https://tools.ietf.org/html/rfc3986#section-7">RFC3986,
Section 7, Security Considerations</a>.
<p>
All {@code URL} constructors may throw {@link MalformedURLException}.
In particular, if the underlying {@link URLStreamHandler}
implementation rejects, or is known to reject, any of the parameters,
{@link MalformedURLException} may be thrown.
Typically, a constructor that calls the stream handler's {@linkplain
URLStreamHandler#parseURL(URL, String, int, int) parseURL method} may
throw {@code MalformedURLException} if the underlying stream handler
implementation of that method throws {@code IllegalArgumentException}.
However, which checks are performed, or not, by the stream handlers
is implementation dependent, and callers should not rely on such
checks for full URL validation.

@spec https://www.rfc-editor.org/info/rfc2396
     RFC 2396: Uniform Resource Identifiers (URI): Generic Syntax
@spec https://www.rfc-editor.org/info/rfc2732
     RFC 2732: Format for Literal IPv6 Addresses in URL's
@spec https://www.rfc-editor.org/info/rfc3986
     RFC 3986: Uniform Resource Identifier (URI): Generic Syntax
@author  James Gosling
@since 1.0

## URL.URL(String, String, int, String)

```java
public URL(String protocol, String host, int port, String file) throws MalformedURLException
```

Creates a {@code URL} object from the specified
{@code protocol}, {@code host}, {@code port}
number, and {@code file}.<p>

{@code host} can be expressed as a host name or a literal
IP address. If IPv6 literal address is used, it should be
enclosed in square brackets ({@code '['} and {@code ']'}), as
specified by <a
href="http://www.ietf.org/rfc/rfc2732.txt">RFC&nbsp;2732</a>;
However, the literal IPv6 address format defined in <a
href="http://www.ietf.org/rfc/rfc2373.txt"><i>RFC&nbsp;2373: IP
Version 6 Addressing Architecture</i></a> is also accepted.<p>

Specifying a {@code port} number of {@code -1}
indicates that the URL should use the default port for the
protocol.<p>

If this is the first URL object being created with the specified
protocol, a <i>stream protocol handler</i> object, an instance of
class {@code URLStreamHandler}, is created for that protocol:
<ol>
<li>If the application has previously set up an instance of
    {@code URLStreamHandlerFactory} as the stream handler factory,
    then the {@code createURLStreamHandler} method of that instance
    is called with the protocol string as an argument to create the
    stream protocol handler.
<li>If no {@code URLStreamHandlerFactory} has yet been set up,
    or if the factory's {@code createURLStreamHandler} method
    returns {@code null}, then the {@linkplain java.util.ServiceLoader
    ServiceLoader} mechanism is used to locate {@linkplain
    java.net.spi.URLStreamHandlerProvider URLStreamHandlerProvider}
    implementations using the system class
    loader. The order that providers are located is implementation
    specific, and an implementation is free to cache the located
    providers. A {@linkplain java.util.ServiceConfigurationError
    ServiceConfigurationError}, {@code Error} or {@code RuntimeException}
    thrown from the {@code createURLStreamHandler}, if encountered, will
    be propagated to the calling thread. The {@code
    createURLStreamHandler} method of each provider, if instantiated, is
    invoked, with the protocol string, until a provider returns non-null,
    or all providers have been exhausted.
<li>If the previous step fails to find a protocol handler, the
    constructor reads the value of the system property:
    <blockquote>{@systemProperty
        java.protocol.handler.pkgs
    }</blockquote>
    If the value of that system property is not {@code null},
    it is interpreted as a list of packages separated by a vertical
    slash character '{@code |}'. The constructor tries to load
    the class named:
    <blockquote>{@code
        <package>.<protocol>.Handler
    }</blockquote>
    where {@code <package>} is replaced by the name of the package
    and {@code <protocol>} is replaced by the name of the protocol.
    If this class does not exist, or if the class exists but it is not
    a subclass of {@code URLStreamHandler}, then the next package
    in the list is tried.
<li>If the previous step fails to find a protocol handler, then the
    constructor tries to load a built-in protocol handler.
    If this class does not exist, or if the class exists but it is not a
    subclass of {@code URLStreamHandler}, then a
    {@code MalformedURLException} is thrown.
</ol>

<p>Protocol handlers for the following protocols are guaranteed
to exist on the search path:
<ul>
<li>{@code http}</li>
<li>{@code https}</li>
<li>{@code file}</li>
<li>{@code jar}</li>
</ul>
Protocol handlers for additional protocols may also be  available.
Some protocol handlers, for example those used for loading platform
classes or classes on the class path, may not be overridden. The details
of such restrictions, and when those restrictions apply (during
initialization of the runtime for example), are implementation specific
and therefore not specified

<p>No validation of the inputs is performed by this constructor.

@param      protocol   the name of the protocol to use.
@param      host       the name of the host.
@param      port       the port number on the host.
@param      file       the file on the host
@throws     MalformedURLException  if an unknown protocol or the port
                 is a negative number other than -1, or if the
                 underlying stream handler implementation rejects,
                 or is known to reject, the {@code URL}
@spec https://www.rfc-editor.org/info/rfc2373 RFC 2373: IP Version 6 Addressing Architecture
@spec https://www.rfc-editor.org/info/rfc2732 RFC 2732: Format for Literal IPv6 Addresses in URL's
@see        java.lang.System#getProperty(java.lang.String)
@see        java.net.URL#setURLStreamHandlerFactory(
                 java.net.URLStreamHandlerFactory)
@see        java.net.URLStreamHandler
@see        java.net.URLStreamHandlerFactory#createURLStreamHandler(
                 java.lang.String)
@deprecated Use {@link URI#toURL()} to construct an instance of URL. See the note on
<a href="#constructor-deprecation">constructor deprecation</a> for more
details.

## URL.URL(String, String, String)

```java
public URL(String protocol, String host, String file) throws MalformedURLException
```

Creates a URL from the specified {@code protocol}
name, {@code host} name, and {@code file} name. The
default port for the specified protocol is used.
<p>
This constructor is equivalent to the four-argument
constructor with the only difference of using the
default port for the specified protocol.

No validation of the inputs is performed by this constructor.

@param      protocol   the name of the protocol to use.
@param      host       the name of the host.
@param      file       the file on the host.
@throws     MalformedURLException  if an unknown protocol is specified,
                       or if the underlying stream handler implementation
                       rejects, or is known to reject, the {@code URL}
@see        java.net.URL#URL(java.lang.String, java.lang.String,
                 int, java.lang.String)
@deprecated Use {@link URI#toURL()} to construct an instance of URL. See the note on
<a href="#constructor-deprecation">constructor deprecation</a> for more
details.

## URL.URL(String, String, int, String, URLStreamHandler)

```java
public URL(String protocol, String host, int port, String file, URLStreamHandler handler) throws MalformedURLException
```

Creates a {@code URL} object from the specified
{@code protocol}, {@code host}, {@code port}
number, {@code file}, and {@code handler}. Specifying
a {@code port} number of {@code -1} indicates that
the URL should use the default port for the protocol. Specifying
a {@code handler} of {@code null} indicates that the URL
should use a default stream handler for the protocol, as outlined
for:
    {@link java.net.URL#URL(java.lang.String, java.lang.String, int,
                     java.lang.String)}

No validation of the inputs is performed by this constructor.

@param      protocol   the name of the protocol to use.
@param      host       the name of the host.
@param      port       the port number on the host.
@param      file       the file on the host
@param      handler    the stream handler for the URL.
@throws     MalformedURLException  if an unknown protocol or the port
                   is a negative number other than -1,
                   or if the underlying stream handler implementation
                   rejects, or is known to reject, the {@code URL}
@see        java.lang.System#getProperty(java.lang.String)
@see        java.net.URL#setURLStreamHandlerFactory(
                 java.net.URLStreamHandlerFactory)
@see        java.net.URLStreamHandler
@see        java.net.URLStreamHandlerFactory#createURLStreamHandler(
                 java.lang.String)
@deprecated
Use {@link #of(URI, URLStreamHandler)} to construct an instance of URL
associated with a custom protocol handler.
See the note on <a href="#constructor-deprecation">constructor deprecation</a>
for more details.

## URL.URL(String)

```java
public URL(String spec) throws MalformedURLException
```

Creates a {@code URL} object from the {@code String}
representation.
<p>
This constructor is equivalent to a call to the two-argument
constructor with a {@code null} first argument.

@param      spec   the {@code String} to parse as a URL.
@throws     MalformedURLException  if no protocol is specified, or an
              unknown protocol is found, or {@code spec} is {@code null},
              or the parsed URL fails to comply with the specific syntax
              of the associated protocol, or the
              underlying stream handler's {@linkplain
              URLStreamHandler#parseURL parseURL method} throws
              {@code IllegalArgumentException}
@see        java.net.URL#URL(java.net.URL, java.lang.String)
@deprecated Use {@link URI#toURL()} to construct an instance of URL. See the note on
<a href="#constructor-deprecation">constructor deprecation</a> for more
details.

## URL.URL(URL, String)

```java
public URL(URL context, String spec) throws MalformedURLException
```

Creates a URL by parsing the given spec within a specified context.

The new URL is created from the given context URL and the spec
argument as described in
RFC2396 &quot;Uniform Resource Identifiers : Generic Syntax&quot; :
<blockquote><pre>
         &lt;scheme&gt;://&lt;authority&gt;&lt;path&gt;?&lt;query&gt;#&lt;fragment&gt;
</pre></blockquote>
The reference is parsed into the scheme, authority, path, query and
fragment parts. If the path component is empty and the scheme,
authority, and query components are undefined, then the new URL is a
reference to the current document. Otherwise, the fragment and query
parts present in the spec are used in the new URL.
<p>
If the scheme component is defined in the given spec and does not match
the scheme of the context, then the new URL is created as an absolute
URL based on the spec alone. Otherwise the scheme component is inherited
from the context URL.
<p>
If the authority component is present in the spec then the spec is
treated as absolute and the spec authority and path will replace the
context authority and path. If the authority component is absent in the
spec then the authority of the new URL will be inherited from the
context.
<p>
If the spec's path component begins with a slash character
&quot;/&quot; then the
path is treated as absolute and the spec path replaces the context path.
<p>
Otherwise, the path is treated as a relative path and is appended to the
context path, as described in RFC2396. Also, in this case,
the path is canonicalized through the removal of directory
changes made by occurrences of &quot;..&quot; and &quot;.&quot;.
<p>
For a more detailed description of URL parsing, refer to RFC2396.

@implSpec Parsing the URL includes calling the {@link
URLStreamHandler#parseURL(URL, String, int, int) parseURL} method on the
selected handler.

@param      context   the context in which to parse the specification.
@param      spec      the {@code String} to parse as a URL.
@throws     MalformedURLException  if no protocol is specified, or an
              unknown protocol is found, or {@code spec} is {@code null},
              or the parsed URL fails to comply with the specific syntax
              of the associated protocol, or the
              underlying stream handler's {@linkplain
              URLStreamHandler#parseURL parseURL method} throws
              {@code IllegalArgumentException}
@see        java.net.URL#URL(java.lang.String, java.lang.String,
                 int, java.lang.String)
@see        java.net.URLStreamHandler
@see        java.net.URLStreamHandler#parseURL(java.net.URL,
                 java.lang.String, int, int)
@deprecated Use {@link URI#toURL()} to construct an instance of URL. See the note on
<a href="#constructor-deprecation">constructor deprecation</a> for more
details.

## URL.URL(URL, String, URLStreamHandler)

```java
public URL(URL context, String spec, URLStreamHandler handler) throws MalformedURLException
```

Creates a URL by parsing the given spec with the specified handler
within a specified context. If the handler is null, the parsing
occurs as with the two argument constructor.

@implSpec Parsing the URL includes calling the {@link
URLStreamHandler#parseURL(URL, String, int, int) parseURL} method on the
selected handler.

@param      context   the context in which to parse the specification.
@param      spec      the {@code String} to parse as a URL.
@param      handler   the stream handler for the URL.
@throws     MalformedURLException  if no protocol is specified, or an
              unknown protocol is found, or {@code spec} is {@code null},
              or the parsed URL fails to comply with the specific syntax
              of the associated protocol, or the
              underlying stream handler's {@linkplain
              URLStreamHandler#parseURL(URL, String, int, int)
              parseURL method} throws {@code IllegalArgumentException}
@see        java.net.URL#URL(java.lang.String, java.lang.String,
                 int, java.lang.String)
@see        java.net.URLStreamHandler
@see        java.net.URLStreamHandler#parseURL(java.net.URL,
                 java.lang.String, int, int)
@deprecated
Use {@link #of(URI, URLStreamHandler)} to construct an instance of URL
associated with a custom protocol handler.
See the note on <a href="#constructor-deprecation">constructor deprecation</a>
for more details.

## URL.of(URI, URLStreamHandler)

```java
public static URL of(URI uri, URLStreamHandler handler) throws MalformedURLException
```

Creates a URL from a URI, as if by invoking {@code uri.toURL()}, but
associating it with the given {@code URLStreamHandler}, if allowed.

@apiNote
Applications should consider performing additional integrity
checks before constructing a {@code URL} and opening a connection.
See the <a href=#integrity>API note</a> in the class level API
documentation.

@implSpec The implementation of this method includes calling the {@link
URLStreamHandler#parseURL(URL, String, int, int) parseURL} method on the
selected handler.

@param uri the {@code URI} from which the returned {@code URL} should
          be built
@param handler a custom protocol stream handler for
                     the returned {@code URL}. Can be {@code null},
                     in which case the default stream handler for
                     the protocol if any, will be used.

@return a new {@code URL} instance created from the given {@code URI}
  and associated with the given {@code URLStreamHandler}, if any

@throws NullPointerException if {@code uri} is {@code null}

@throws IllegalArgumentException if no protocol is specified
        (the {@linkplain URI#getScheme() uri scheme} is {@code null}), or
        if the {@code URLStreamHandler} is not {@code null} and can not be
        set for the given protocol

@throws  MalformedURLException if an unknown protocol is found,
         or the given URI fails to comply with the specific
         syntax of the associated protocol, or the
         underlying stream handler's {@linkplain
         URLStreamHandler#parseURL(URL, String, int, int)
         parseURL method} throws {@code IllegalArgumentException}

@see java.net.URI#toURL()

@since 20

## URL.getQuery()

```java
public String getQuery()
```

Gets the query part of this {@code URL}.

@return  the query part of this {@code URL},
or <CODE>null</CODE> if one does not exist
@since 1.3

## URL.getPath()

```java
public String getPath()
```

Gets the path part of this {@code URL}.

@return  the path part of this {@code URL}, or an
empty string if one does not exist
@since 1.3

## URL.getUserInfo()

```java
public String getUserInfo()
```

Gets the userInfo part of this {@code URL}.

@return  the userInfo part of this {@code URL}, or
<CODE>null</CODE> if one does not exist
@since 1.3

## URL.getAuthority()

```java
public String getAuthority()
```

Gets the authority part of this {@code URL}.

@return  the authority part of this {@code URL}
@since 1.3

## URL.getPort()

```java
public int getPort()
```

Gets the port number of this {@code URL}.

@return  the port number, or -1 if the port is not set

## URL.getDefaultPort()

```java
public int getDefaultPort()
```

Gets the default port number of the protocol associated
with this {@code URL}. If the URL scheme or the URLStreamHandler
for the URL do not define a default port number,
then -1 is returned.

@return  the port number
@since 1.4

## URL.getProtocol()

```java
public String getProtocol()
```

Gets the protocol name of this {@code URL}.

@return  the protocol of this {@code URL}.

## URL.getHost()

```java
public String getHost()
```

Gets the host name of this {@code URL}, if applicable.
The format of the host conforms to RFC 2732, i.e. for a
literal IPv6 address, this method will return the IPv6 address
enclosed in square brackets ({@code '['} and {@code ']'}).

@return  the host name of this {@code URL}.

## URL.getFile()

```java
public String getFile()
```

Gets the file name of this {@code URL}.
The returned file portion will be
the same as <CODE>getPath()</CODE>, plus the concatenation of
the value of <CODE>getQuery()</CODE>, if any. If there is
no query portion, this method and <CODE>getPath()</CODE> will
return identical results.

@return  the file name of this {@code URL},
or an empty string if one does not exist

## URL.getRef()

```java
public String getRef()
```

Gets the anchor (also known as the "reference") of this
{@code URL}.

@return  the anchor (also known as the "reference") of this
         {@code URL}, or <CODE>null</CODE> if one does not exist

## URL.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this URL for equality with another object.<p>

If the given object is not a URL then this method immediately returns
{@code false}.<p>

Two URL objects are equal if they have the same protocol, reference
equivalent hosts, have the same port number on the host, and the same
file and fragment of the file.<p>

Two hosts are considered equivalent if both host names can be resolved
into the same IP addresses; else if either host name can't be
resolved, the host names must be equal without regard to case; or both
host names equal to null.<p>

Since hosts comparison requires name resolution, this operation is a
blocking operation. <p>

Note: The defined behavior for {@code equals} is known to
be inconsistent with virtual hosting in HTTP.

@param   obj   the URL to compare against.
@return  {@code true} if the objects are the same;
         {@code false} otherwise.

## URL.hashCode()

```java
public synchronized int hashCode()
```

Creates an integer suitable for hash table indexing.<p>

The hash code is based upon all the URL components relevant for URL
comparison. As such, this operation is a blocking operation.

@return  a hash code for this {@code URL}.

## URL.sameFile(URL)

```java
public boolean sameFile(URL other)
```

Compares two URLs, excluding the fragment component.<p>

Returns {@code true} if this {@code URL} and the
{@code other} argument are equal without taking the
fragment component into consideration.

@param   other   the {@code URL} to compare against.
@return  {@code true} if they reference the same remote object;
         {@code false} otherwise.

## URL.toString()

```java
public String toString()
```

Constructs a string representation of this {@code URL}. The
string is created by calling the {@code toExternalForm}
method of the stream protocol handler for this object.

@return  a string representation of this object.
@see     java.net.URL#URL(java.lang.String, java.lang.String, int,
                 java.lang.String)
@see     java.net.URLStreamHandler#toExternalForm(java.net.URL)

## URL.toExternalForm()

```java
public String toExternalForm()
```

Constructs a string representation of this {@code URL}. The
string is created by calling the {@code toExternalForm}
method of the stream protocol handler for this object.

@return  a string representation of this object.
@see     java.net.URL#URL(java.lang.String, java.lang.String,
                 int, java.lang.String)
@see     java.net.URLStreamHandler#toExternalForm(java.net.URL)

## URL.toURI()

```java
public URI toURI() throws URISyntaxException
```

Returns a {@link java.net.URI} equivalent to this URL.
This method functions in the same way as {@code new URI (this.toString())}.
<p>Note, any URL instance that complies with RFC 2396 can be converted
to a URI. However, some URLs that are not strictly in compliance
can not be converted to a URI.

@throws    URISyntaxException if this URL is not formatted strictly according to
           RFC2396 and cannot be converted to a URI.

@return    a URI instance equivalent to this URL.
@since 1.5

## URL.openConnection()

```java
public URLConnection openConnection() throws java.io.IOException
```

Returns a {@link java.net.URLConnection URLConnection} instance that
represents a connection to the remote object referred to by the
{@code URL}.

<P>A new instance of {@linkplain java.net.URLConnection URLConnection} is
created every time when invoking the
{@linkplain java.net.URLStreamHandler#openConnection(URL)
URLStreamHandler.openConnection(URL)} method of the protocol handler for
this URL.</P>

<P>It should be noted that a URLConnection instance does not establish
the actual network connection on creation. This will happen only when
calling {@linkplain java.net.URLConnection#connect() URLConnection.connect()}.</P>

<P>If for the URL's protocol (such as HTTP or JAR), there
exists a public, specialized URLConnection subclass belonging
to one of the following packages or one of their subpackages:
java.lang, java.io, java.util, java.net, the connection
returned will be of that subclass. For example, for HTTP an
HttpURLConnection will be returned, and for JAR a
JarURLConnection will be returned.</P>

@return     a {@link java.net.URLConnection URLConnection} linking
            to the URL.
@throws     IOException  if an I/O exception occurs.
@see        java.net.URL#URL(java.lang.String, java.lang.String,
            int, java.lang.String)

## URL.openConnection(Proxy)

```java
public URLConnection openConnection(Proxy proxy) throws java.io.IOException
```

Same as {@link #openConnection()}, except that the connection will be
made through the specified proxy; Protocol handlers that do not
support proxying will ignore the proxy parameter and make a
normal connection.

Invoking this method preempts the system's default
{@link java.net.ProxySelector ProxySelector} settings.

@param      proxy the Proxy through which this connection
            will be made. If direct connection is desired,
            Proxy.NO_PROXY should be specified.
@return     a {@code URLConnection} to the URL.
@throws     IOException  if an I/O exception occurs.
@throws     IllegalArgumentException will be thrown if proxy is null,
            or proxy has the wrong type
@throws     UnsupportedOperationException if the subclass that
            implements the protocol handler doesn't support
            this method.
@see        java.net.URL#URL(java.lang.String, java.lang.String,
            int, java.lang.String)
@see        java.net.URLConnection
@see        java.net.URLStreamHandler#openConnection(java.net.URL,
            java.net.Proxy)
@since      1.5

## URL.openStream()

```java
public final InputStream openStream() throws java.io.IOException
```

Opens a connection to this {@code URL} and returns an
{@code InputStream} for reading from that connection. This
method is a shorthand for:
<blockquote><pre>
    openConnection().getInputStream()
</pre></blockquote>

@return     an input stream for reading from the URL connection.
@throws     IOException  if an I/O exception occurs.
@see        java.net.URL#openConnection()
@see        java.net.URLConnection#getInputStream()

## URL.getContent()

```java
public final Object getContent() throws java.io.IOException
```

Gets the contents of this URL. This method is a shorthand for:
<blockquote><pre>
    openConnection().getContent()
</pre></blockquote>

@return     the contents of this URL.
@throws     IOException  if an I/O exception occurs.
@see        java.net.URLConnection#getContent()

## URL.getContent(Class<?>[])

```java
public final Object getContent(Class<?>[] classes) throws java.io.IOException
```

Gets the contents of this URL. This method is a shorthand for:
<blockquote><pre>
    openConnection().getContent(classes)
</pre></blockquote>

@param classes an array of Java types
@return     the content object of this URL that is the first match of
              the types specified in the classes array.
              null if none of the requested types are supported.
@throws     IOException  if an I/O exception occurs.
@see        java.net.URLConnection#getContent(Class[])
@since 1.3

## URL.setURLStreamHandlerFactory(URLStreamHandlerFactory)

```java
public static void setURLStreamHandlerFactory(URLStreamHandlerFactory fac)
```

Sets an application's {@code URLStreamHandlerFactory}.
This method can be called at most once in a given Java Virtual
Machine.

<p> The {@code URLStreamHandlerFactory} instance is used to
construct a stream protocol handler from a protocol name.

@param      fac   the desired factory.
@throws     Error  if the application has already set a factory.
@see        java.net.URL#URL(java.lang.String, java.lang.String,
            int, java.lang.String)
@see        java.net.URLStreamHandlerFactory