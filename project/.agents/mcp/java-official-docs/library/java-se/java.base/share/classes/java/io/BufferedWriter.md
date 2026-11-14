# BufferedWriter class (java.io)

```java
public class BufferedWriter extends Writer
```

Writes text to a character-output stream, buffering characters so as to
provide for the efficient writing of single characters, arrays, and strings.

<p> The buffer size may be specified, or the default size may be accepted.
The default is large enough for most purposes.

<p> A {@code newLine()} method is provided, which uses the platform's own
notion of line separator as defined by the system property
{@linkplain System#lineSeparator() line.separator}. Not all platforms use the newline character ('\n')
to terminate lines. Calling this method to terminate each output line is
therefore preferred to writing a newline character directly.

<p> In general, a {@code Writer} sends its output immediately to the
underlying character or byte stream.  Unless prompt output is required, it
is advisable to wrap a {@code BufferedWriter} around any {@code Writer} whose
{@code write()} operations may be costly, such as {@code FileWriter}s and
{@code OutputStreamWriter}s.  For example,

{@snippet lang=java :
    PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("foo.out")));
}

will buffer the {@code PrintWriter}'s output to the file.  Without buffering,
each invocation of a {@code print()} method would cause characters to be
converted into bytes that would then be written immediately to the file,
which can be very inefficient.

@apiNote
Once wrapped in a {@code BufferedWriter}, the underlying
{@code Writer} should not be used directly nor wrapped with
another writer.

@see PrintWriter
@see FileWriter
@see OutputStreamWriter
@see java.nio.file.Files#newBufferedWriter

@author      Mark Reinhold
@since       1.1

## BufferedWriter.BufferedWriter(Writer)

```java
public BufferedWriter(Writer out)
```

Creates a buffered character-output stream that uses a default-sized
output buffer.

@param  out  A Writer

## BufferedWriter.BufferedWriter(Writer, int)

```java
public BufferedWriter(Writer out, int sz)
```

Creates a new buffered character-output stream that uses an output
buffer of the given size.

@param  out  A Writer
@param  sz   Output-buffer size, a positive integer

@throws     IllegalArgumentException  If {@code sz <= 0}

## BufferedWriter.write(int)

```java
public void write(int c) throws IOException
```

Writes a single character.

@throws     IOException  If an I/O error occurs

## BufferedWriter.write(char[], int, int)

```java
public void write(char[] cbuf, int off, int len) throws IOException
```

Writes a portion of an array of characters.

<p> Ordinarily this method stores characters from the given array into
this stream's buffer, flushing the buffer to the underlying stream as
needed.  If the requested length is at least as large as the buffer,
however, then this method will flush the buffer and write the characters
directly to the underlying stream.  Thus redundant
{@code BufferedWriter}s will not copy data unnecessarily.

@param  cbuf  A character array
@param  off   Offset from which to start reading characters
@param  len   Number of characters to write

@throws  IndexOutOfBoundsException
         If {@code off} is negative, or {@code len} is negative,
         or {@code off + len} is negative or greater than the length
         of the given array

@throws  IOException  If an I/O error occurs

## BufferedWriter.write(String, int, int)

```java
public void write(String s, int off, int len) throws IOException
```

Writes a portion of a String.

@implSpec
While the specification of this method in the
{@linkplain java.io.Writer#write(java.lang.String,int,int) superclass}
recommends that an {@link IndexOutOfBoundsException} be thrown
if {@code len} is negative or {@code off + len} is negative,
the implementation in this class does not throw such an exception in
these cases but instead simply writes no characters.

@param  s     String to be written
@param  off   Offset from which to start reading characters
@param  len   Number of characters to be written

@throws  IndexOutOfBoundsException
         If {@code off} is negative,
         or {@code off + len} is greater than the length
         of the given string

@throws  IOException  If an I/O error occurs

## BufferedWriter.newLine()

```java
public void newLine() throws IOException
```

Writes a line separator.  The line separator string is defined by the
system property {@code line.separator}, and is not necessarily a single
newline ('\n') character.

@throws     IOException  If an I/O error occurs

## BufferedWriter.flush()

```java
public void flush() throws IOException
```

Flushes the stream.

@throws     IOException  If an I/O error occurs