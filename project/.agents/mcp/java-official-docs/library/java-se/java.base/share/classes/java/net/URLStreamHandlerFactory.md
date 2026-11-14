# URLStreamHandlerFactory interface (java.net)

```java
public interface URLStreamHandlerFactory
```

This interface defines a factory for {@code URL} stream
protocol handlers.

<p> A URL stream handler factory is used as specified in the
{@linkplain java.net.URL#URL(String,String,int,String) URL constructor}.

@author  Arthur van Hoff
@see     java.net.URL
@see     java.net.URLStreamHandler
@since   1.0

## URLStreamHandlerFactory.createURLStreamHandler(String)

```java
URLStreamHandler createURLStreamHandler(String protocol)
```

Creates a new {@code URLStreamHandler} instance with the specified
protocol.

@param   protocol   the protocol ("{@code ftp}",
                    "{@code http}", "{@code nntp}", etc.).
@return  a {@code URLStreamHandler} for the specific protocol, or {@code
         null} if this factory cannot create a handler for the specific
         protocol
@see     java.net.URLStreamHandler