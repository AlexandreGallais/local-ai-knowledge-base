---
title: "JarURLConnection class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/JarURLConnection.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# JarURLConnection class (java.net)

```java
public abstract class JarURLConnection extends URLConnection
```

A URL Connection to a Java ARchive (JAR) file or an entry in a JAR
file.

The syntax of a JAR URL is:

```java
jar:<url>!/{entry
```

for example:

`jar:http://www.foo.com/bar/baz.jar!/COM/foo/Quux.class`

Jar URLs should be used to refer to a JAR file or entries in
a JAR file. The example above is a JAR URL which refers to a JAR
entry. If the entry name is omitted, the URL refers to the whole
JAR file:

`jar:http://www.foo.com/bar/baz.jar!/`

Users should cast the generic URLConnection to a
JarURLConnection when they know that the URL they created is a JAR
URL, and they need JAR-specific functionality. For example:

```java
URL url = new URL("jar:file:/home/duke/duke.jar!/");
JarURLConnection jarConnection = (JarURLConnection)url.openConnection();
Manifest manifest = jarConnection.getManifest();
```

JarURLConnection instances can only be used to read from JAR files.
It is not possible to get a `java.io.OutputStream` to modify or write
to the underlying JAR file using this class.

Examples:

A Jar entry
`jar:http://www.foo.com/bar/baz.jar!/COM/foo/Quux.class`

A Jar file
`jar:http://www.foo.com/bar/baz.jar!/`

A Jar directory
`jar:http://www.foo.com/bar/baz.jar!/COM/foo/`

`!/` is referred to as the *separator*.

When constructing a JAR url via `new URL(context, spec)`,
the following rules apply:

- if there is no context URL and the specification passed to the
URL constructor doesn't contain a separator, the URL is considered
to refer to a JarFile.

- if there is a context URL, the context URL is assumed to refer
to a JAR file or a Jar directory.

- if the specification begins with a '/', the Jar directory is
ignored, and the spec is considered to be at the root of the Jar
file.

Examples:

context: **jar:http://www.foo.com/bar/jar.jar!/**,
spec:**baz/entry.txt**

url:**jar:http://www.foo.com/bar/jar.jar!/baz/entry.txt**

context: **jar:http://www.foo.com/bar/jar.jar!/baz**,
spec:**entry.txt**

url:**jar:http://www.foo.com/bar/jar.jar!/baz/entry.txt**

context: **jar:http://www.foo.com/bar/jar.jar!/baz**,
spec:**/entry.txt**

url:**jar:http://www.foo.com/bar/jar.jar!/entry.txt**

**See also:** java.net.URL

**See also:** java.net.URLConnection

**See also:** java.util.jar.JarFile

**See also:** java.util.jar.JarInputStream

**See also:** java.util.jar.Manifest

**See also:** java.util.zip.ZipEntry

**Since:** 1.2

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

Parameters:

- `url`: the URL

Throws:

- `MalformedURLException`: if no legal protocol could be found in a specification string or the string could not be parsed.

## JarURLConnection.getJarFileURL()

```java
public URL getJarFileURL()
```

Returns the URL for the Jar file for this connection.

**Returns:** the URL for the Jar file for this connection.

## JarURLConnection.getEntryName()

```java
public String getEntryName()
```

Return the entry name for this connection. This method
returns null if the JAR file URL corresponding to this
connection points to a JAR file and not a JAR file entry.

**Returns:** the entry name for this connection, if any.

## JarURLConnection.getJarFile()

```java
public abstract JarFile getJarFile() throws IOException
```

Return the JAR file for this connection.

**Returns:** the JAR file for this connection. If the connection is
a connection to an entry of a JAR file, the JAR file object is
returned

**See also:** #connect

Throws:

- `IOException`: if an IOException occurs while trying to connect to the JAR file for this connection.

## JarURLConnection.getManifest()

```java
public Manifest getManifest() throws IOException
```

Returns the Manifest for this connection, or null if none.

**Returns:** the manifest object corresponding to the JAR file object
for this connection.

**See also:** #getJarFile

Throws:

- `IOException`: if getting the JAR file for this connection causes an IOException to be thrown.

## JarURLConnection.getJarEntry()

```java
public JarEntry getJarEntry() throws IOException
```

Return the JAR entry object for this connection, if any. This
method returns null if the JAR file URL corresponding to this
connection points to a JAR file and not a JAR file entry.

**Returns:** the JAR entry object for this connection, or null if
the JAR URL for this connection points to a JAR file.

**See also:** #getJarFile

**See also:** #getJarEntry

Throws:

- `IOException`: if getting the JAR file for this connection causes an IOException to be thrown.

## JarURLConnection.getAttributes()

```java
public Attributes getAttributes() throws IOException
```

Return the Attributes object for this connection if the URL
for it points to a JAR file entry, null otherwise.

**Returns:** the Attributes object for this connection if the URL
for it points to a JAR file entry, null otherwise.

**See also:** #getJarEntry

Throws:

- `IOException`: if getting the JAR entry causes an IOException to be thrown.

## JarURLConnection.getMainAttributes()

```java
public Attributes getMainAttributes() throws IOException
```

Returns the main Attributes for the JAR file for this
connection.

**Returns:** the main Attributes for the JAR file for this
connection.

**See also:** #getJarFile

**See also:** #getManifest

Throws:

- `IOException`: if getting the manifest causes an IOException to be thrown.

## JarURLConnection.getCertificates()

```java
public java.security.cert.Certificate[] getCertificates() throws IOException
```

Returns the Certificate objects for this connection if the URL
for it points to a JAR file entry, null otherwise. This method
can only be called once
the connection has been completely verified by reading
from the input stream until the end of the stream has been
reached. Otherwise, this method will return `null`.

The returned certificate array comprises all the signer certificates
that were used to verify this entry. Each signer certificate is
followed by its supporting certificate chain (which may be empty).
Each signer certificate and its supporting certificate chain are ordered
bottom-to-top (i.e., with the signer certificate first and the (root)
certificate authority last).

**API note:** The verification process does not include validating or establishing
trust in the code signers. A caller should perform additional checks,
such as using a `java.security.cert.CertPathValidator` to
validate each signer's certificate chain, and determining whether
to trust the entry signed by the signers.

**Returns:** the Certificate objects for this connection if the URL
for it points to a JAR file entry, null otherwise.

**See also:** #getJarEntry

Throws:

- `IOException`: if getting the JAR entry causes an IOException to be thrown.
