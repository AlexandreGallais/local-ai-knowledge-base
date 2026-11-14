# InputStreamReader class (java.io)

```java
public class InputStreamReader extends Reader
```

An InputStreamReader is a bridge from byte streams to character streams: It
reads bytes and decodes them into characters using a specified {@link
Charset charset}.  The charset that it uses
may be specified by name or may be given explicitly, or the
{@link Charset#defaultCharset() default charset} may be used.

<p> Each invocation of one of an InputStreamReader's read() methods may
cause one or more bytes to be read from the underlying byte-input stream.
To enable the efficient conversion of bytes to characters, more bytes may
be read ahead from the underlying stream than are necessary to satisfy the
current read operation.

<p> For top efficiency, consider wrapping an InputStreamReader within a
BufferedReader.  For example:

{@snippet lang=java :
    BufferedReader in = new BufferedReader(new InputStreamReader(anInputStream));
}

<P>To read from {@link System#in}, use the system property value
{@link System##stdin.encoding stdin.encoding} as the {@code Charset}:

{@snippet lang=java :
    new InputStreamReader(System.in, System.getProperty("stdin.encoding"));
}

@see BufferedReader
@see InputStream
@see Charset
@see System##stdin.encoding stdin.encoding

@author      Mark Reinhold
@since       1.1

## InputStreamReader.InputStreamReader(InputStream)

```java
public InputStreamReader(InputStream in)
```

Creates an InputStreamReader that uses the
{@link Charset#defaultCharset() default charset}.

@param  in   An InputStream

@see Charset#defaultCharset()

## InputStreamReader.InputStreamReader(InputStream, String)

```java
public InputStreamReader(InputStream in, String charsetName) throws UnsupportedEncodingException
```

Creates an InputStreamReader that uses the named charset.

@param  in
        An InputStream

@param  charsetName
        The name of a supported {@link Charset charset}

@throws     UnsupportedEncodingException
            If the named charset is not supported

## InputStreamReader.InputStreamReader(InputStream, Charset)

```java
public InputStreamReader(InputStream in, Charset cs)
```

Creates an InputStreamReader that uses the given charset.

@param  in       An InputStream
@param  cs       A charset

@since 1.4

## InputStreamReader.InputStreamReader(InputStream, CharsetDecoder)

```java
public InputStreamReader(InputStream in, CharsetDecoder dec)
```

Creates an InputStreamReader that uses the given charset decoder.

@param  in       An InputStream
@param  dec      A charset decoder

@since 1.4

## InputStreamReader.getEncoding()

```java
public String getEncoding()
```

Returns the name of the character encoding being used by this stream.

<p> If the encoding has an historical name then that name is returned;
otherwise the encoding's canonical name is returned.

<p> If this instance was created with the {@link
#InputStreamReader(InputStream, String)} constructor then the returned
name, being unique for the encoding, may differ from the name passed to
the constructor. This method will return {@code null} if the
stream has been closed.
</p>
@return The historical name of this encoding, or
        {@code null} if the stream has been closed

@see Charset

## InputStreamReader.read()

```java
public int read() throws IOException
```

Reads a single character.

@return The character read, or -1 if the end of the stream has been
        reached

@throws     IOException  If an I/O error occurs

## InputStreamReader.read(char[], int, int)

```java
public int read(char[] cbuf, int off, int len) throws IOException
```

{@inheritDoc}
@throws     IndexOutOfBoundsException  {@inheritDoc}

## InputStreamReader.ready()

```java
public boolean ready() throws IOException
```

Tells whether this stream is ready to be read.  An InputStreamReader is
ready if its input buffer is not empty, or if bytes are available to be
read from the underlying byte stream.

@throws     IOException  If an I/O error occurs