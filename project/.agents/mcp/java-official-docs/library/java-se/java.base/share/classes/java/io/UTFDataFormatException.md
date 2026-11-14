# UTFDataFormatException class (java.io)

```java
public class UTFDataFormatException extends IOException
```

Signals that a malformed string in
<a href="DataInput.html#modified-utf-8">modified UTF-8</a>
format has been read in a data
input stream or by any class that implements the data input
interface.
See the
<a href="DataInput.html#modified-utf-8">{@code DataInput}</a>
class description for the format in
which modified UTF-8 strings are read and written.

@author  Frank Yellin
@see     java.io.DataInput
@see     java.io.DataInputStream#readUTF(java.io.DataInput)
@see     java.io.IOException
@since   1.0

## UTFDataFormatException.UTFDataFormatException()

```java
public UTFDataFormatException()
```

Constructs a {@code UTFDataFormatException} with
{@code null} as its error detail message.

## UTFDataFormatException.UTFDataFormatException(String)

```java
public UTFDataFormatException(String s)
```

Constructs a {@code UTFDataFormatException} with the
specified detail message. The string {@code s} can be
retrieved later by the
{@link java.lang.Throwable#getMessage}
method of class {@code java.lang.Throwable}.

@param   s   the detail message.