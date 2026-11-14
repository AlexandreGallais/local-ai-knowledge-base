# FileNameMap interface (java.net)

```java
public interface FileNameMap
```

A simple interface which provides a mechanism to map
between a file name and a MIME type string.

@author  Steven B. Byrne
@since   1.1

## FileNameMap.getContentTypeFor(String)

```java
public String getContentTypeFor(String fileName)
```

Gets the MIME type for the specified file name.
@param fileName the specified file name
@return a {@code String} indicating the MIME
type for the specified file name.