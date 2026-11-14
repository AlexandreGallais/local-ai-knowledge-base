# FileAttribute interface (java.nio.file.attribute)

```java
public interface FileAttribute<T>
```

An object that encapsulates the value of a file attribute that can be set
atomically when creating a new file or directory by invoking the {@link
java.nio.file.Files#createFile createFile} or {@link
java.nio.file.Files#createDirectory createDirectory} methods.

@param <T> The type of the file attribute value

@since 1.7
@see PosixFilePermissions#asFileAttribute

## FileAttribute.name()

```java
String name()
```

Returns the attribute name.

@return The attribute name

## FileAttribute.value()

```java
T value()
```

Returns the attribute value.

@return The attribute value