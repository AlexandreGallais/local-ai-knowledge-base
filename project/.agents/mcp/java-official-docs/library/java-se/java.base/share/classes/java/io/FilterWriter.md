# FilterWriter class (java.io)

```java
public abstract class FilterWriter extends Writer
```

Abstract class for writing filtered character streams.
The abstract class {@code FilterWriter} itself
provides default methods that pass all requests to the
contained stream. Subclasses of {@code FilterWriter}
should override some of these methods and may also
provide additional methods and fields.

@author      Mark Reinhold
@since       1.1

## FilterWriter.out

```java
protected Writer out
```

The underlying character-output stream.

## FilterWriter.FilterWriter(Writer)

```java
protected FilterWriter(Writer out)
```

Create a new filtered writer.

@param out  a Writer object to provide the underlying stream.
@throws NullPointerException if {@code out} is {@code null}

## FilterWriter.write(int)

```java
public void write(int c) throws IOException
```

Writes a single character.

@throws     IOException  If an I/O error occurs

## FilterWriter.write(char[], int, int)

```java
public void write(char[] cbuf, int off, int len) throws IOException
```

Writes a portion of an array of characters.

@param  cbuf  Buffer of characters to be written
@param  off   Offset from which to start reading characters
@param  len   Number of characters to be written

@throws  IndexOutOfBoundsException
         If the values of the {@code off} and {@code len} parameters
         cause the corresponding method of the underlying {@code Writer}
         to throw an {@code IndexOutOfBoundsException}

@throws  IOException  If an I/O error occurs

## FilterWriter.write(String, int, int)

```java
public void write(String str, int off, int len) throws IOException
```

Writes a portion of a string.

@param  str  String to be written
@param  off  Offset from which to start reading characters
@param  len  Number of characters to be written

@throws  IndexOutOfBoundsException
         If the values of the {@code off} and {@code len} parameters
         cause the corresponding method of the underlying {@code Writer}
         to throw an {@code IndexOutOfBoundsException}

@throws  IOException  If an I/O error occurs

## FilterWriter.flush()

```java
public void flush() throws IOException
```

Flushes the stream.

@throws     IOException  If an I/O error occurs