# JarURLConnection class (java.net)

```java
public abstract class JarURLConnection extends URLConnection
```

A URL Connection to a Java ARchive (JAR) file or an entry in a JAR
file.

<p>The syntax of a JAR URL is:

<pre>
jar:&lt;url&gt;!/{entry}
</pre>

<p>for example:

<p>{@code jar:http://www.foo.com/bar/baz.jar!/COM/foo/Quux.class}

<p>Jar URLs should be used to refer to a JAR file or entries in
a JAR file. The example above is a JAR URL which refers to a JAR
entry. If the entry name is omitted, the URL refers to the whole
JAR file:

{@code jar:http://www.foo.com/bar/baz.jar!/}

<p>Users should cast the generic URLConnection to a
JarURLConnection when they know that the URL they created is a JAR
URL, and they need JAR-specific functionality. For example:

<pre>
URL url = new URL("jar:file:/home/duke/duke.jar!/");
JarURLConnection jarConnection = (JarURLConnection)url.openConnection();
Manifest manifest = jarConnection.getManifest();
</pre>

<p>JarURLConnection instances can only be used to read from JAR files.
It is not possible to get a {@link java.io.OutputStream} to modify or write
to the underlying JAR file using this class.
<p>Examples:

<dl>

<dt>A Jar entry
<dd>{@code jar:http://www.foo.com/bar/baz.jar!/COM/foo/Quux.class}

<dt>A Jar file
<dd>{@code jar:http://www.foo.com/bar/baz.jar!/}

<dt>A Jar directory
<dd>{@code jar:http://www.foo.com/bar/baz.jar!/COM/foo/}

</dl>

<p>{@code !/} is referred to as the <em>separator</em>.

<p>When constructing a JAR url via {@code new URL(context, spec)},
the following rules apply:

<ul>

<li>if there is no context URL and the specification passed to the
URL constructor doesn't contain a separator, the URL is considered
to refer to a JarFile.

<li>if there is a context URL, the context URL is assumed to refer
to a JAR file or a Jar directory.

<li>if the specification begins with a '/', the Jar directory is
ignored, and the spec is considered to be at the root of the Jar
file.

<p>Examples:

<dl>

<dt>context: <b>jar:http://www.foo.com/bar/jar.jar!/</b>,
spec:<b>baz/entry.txt</b>

<dd>url:<b>jar:http://www.foo.com/bar/jar.jar!/baz/entry.txt</b>

<dt>context: <b>jar:http://www.foo.com/bar/jar.jar!/baz</b>,
spec:<b>entry.txt</b>

<dd>url:<b>jar:http://www.foo.com/bar/jar.jar!/baz/entry.txt</b>

<dt>context: <b>jar:http://www.foo.com/bar/jar.jar!/baz</b>,
spec:<b>/entry.txt</b>

<dd>url:<b>jar:http://www.foo.com/bar/jar.jar!/entry.txt</b>

</dl>

</ul>

@see java.net.URL
@see java.net.URLConnection

@see java.util.jar.JarFile
@see java.util.jar.JarInputStream
@see java.util.jar.Manifest
@see java.util.zip.ZipEntry

@author Benjamin Renaud
@since 1.2

## JarURLConnection.jarFileURLConnection

```java
protected URLConnection jarFileURLConnection
```

The connection to the JAR file URL, if the connection has been
initiated. This should be set by connect.

## JarURLConnection.JarURLConnection(URL)

```java
protected JarURLConnection(URL url) throws MalformedURLException
```

Creates the new JarURLConnection to the specified URL.
@param url the URL
@throws MalformedURLException if no legal protocol
could be found in a specification string or the
string could not be parsed.

## JarURLConnection.getJarFileURL()

```java
public URL getJarFileURL()
```

Returns the URL for the Jar file for this connection.

@return the URL for the Jar file for this connection.

## JarURLConnection.getEntryName()

```java
public String getEntryName()
```

Return the entry name for this connection. This method
returns null if the JAR file URL corresponding to this
connection points to a JAR file and not a JAR file entry.

@return the entry name for this connection, if any.

## JarURLConnection.getJarFile()

```java
public abstract JarFile getJarFile() throws IOException
```

Return the JAR file for this connection.

@return the JAR file for this connection. If the connection is
a connection to an entry of a JAR file, the JAR file object is
returned

@throws    IOException if an IOException occurs while trying to
connect to the JAR file for this connection.

@see #connect

## JarURLConnection.getManifest()

```java
public Manifest getManifest() throws IOException
```

Returns the Manifest for this connection, or null if none.

@return the manifest object corresponding to the JAR file object
for this connection.

@throws    IOException if getting the JAR file for this
connection causes an IOException to be thrown.

@see #getJarFile

## JarURLConnection.getJarEntry()

```java
public JarEntry getJarEntry() throws IOException
```

Return the JAR entry object for this connection, if any. This
method returns null if the JAR file URL corresponding to this
connection points to a JAR file and not a JAR file entry.

@return the JAR entry object for this connection, or null if
the JAR URL for this connection points to a JAR file.

@throws    IOException if getting the JAR file for this
connection causes an IOException to be thrown.

@see #getJarFile
@see #getJarEntry

## JarURLConnection.getAttributes()

```java
public Attributes getAttributes() throws IOException
```

Return the Attributes object for this connection if the URL
for it points to a JAR file entry, null otherwise.

@return the Attributes object for this connection if the URL
for it points to a JAR file entry, null otherwise.

@throws    IOException if getting the JAR entry causes an
IOException to be thrown.

@see #getJarEntry

## JarURLConnection.getMainAttributes()

```java
public Attributes getMainAttributes() throws IOException
```

Returns the main Attributes for the JAR file for this
connection.

@return the main Attributes for the JAR file for this
connection.

@throws    IOException if getting the manifest causes an
IOException to be thrown.

@see #getJarFile
@see #getManifest

## JarURLConnection.getCertificates()

```java
public java.security.cert.Certificate[] getCertificates() throws IOException
```

Returns the Certificate objects for this connection if the URL
for it points to a JAR file entry, null otherwise. This method
can only be called once
the connection has been completely verified by reading
from the input stream until the end of the stream has been
reached. Otherwise, this method will return {@code null}.

<p>The returned certificate array comprises all the signer certificates
that were used to verify this entry. Each signer certificate is
followed by its supporting certificate chain (which may be empty).
Each signer certificate and its supporting certificate chain are ordered
bottom-to-top (i.e., with the signer certificate first and the (root)
certificate authority last).

@apiNote
The verification process does not include validating or establishing
trust in the code signers. A caller should perform additional checks,
such as using a {@link java.security.cert.CertPathValidator} to
validate each signer's certificate chain, and determining whether
to trust the entry signed by the signers.

@return the Certificate objects for this connection if the URL
for it points to a JAR file entry, null otherwise.

@throws    IOException if getting the JAR entry causes an
IOException to be thrown.

@see #getJarEntry