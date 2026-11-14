# PathMatcher interface (java.nio.file)

```java
public interface PathMatcher
```

An interface that is implemented by objects that perform match operations on
paths.

@since 1.7

@see FileSystem#getPathMatcher
@see Files#newDirectoryStream(Path,String)

## PathMatcher.matches(Path)

```java
boolean matches(Path path)
```

Tells if given path matches this matcher's pattern.

@param   path
         the path to match

@return  {@code true} if, and only if, the path matches this
         matcher's pattern