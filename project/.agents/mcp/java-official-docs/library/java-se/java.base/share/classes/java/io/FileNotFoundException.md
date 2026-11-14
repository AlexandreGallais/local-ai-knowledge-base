# FileNotFoundException class (java.io)

```java
public class FileNotFoundException extends IOException
```

Signals that an attempt to open the file denoted by a specified pathname
has failed.

<p> This exception will be thrown by the {@link FileInputStream}, {@link
FileOutputStream}, and {@link RandomAccessFile} constructors when a file
with the specified pathname does not exist.  It will also be thrown by these
constructors if the file does exist but for some reason is inaccessible, for
example when an attempt is made to open a read-only file for writing.

@since   1.0

## FileNotFoundException.FileNotFoundException()

```java
public FileNotFoundException()
```

Constructs a {@code FileNotFoundException} with
{@code null} as its error detail message.

## FileNotFoundException.FileNotFoundException(String)

```java
public FileNotFoundException(String s)
```

Constructs a {@code FileNotFoundException} with the
specified detail message. The string {@code s} can be
retrieved later by the
{@link java.lang.Throwable#getMessage}
method of class {@code java.lang.Throwable}.

@param   s   the detail message.