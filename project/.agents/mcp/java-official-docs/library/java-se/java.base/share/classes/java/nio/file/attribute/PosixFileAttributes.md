# PosixFileAttributes interface (java.nio.file.attribute)

```java
public interface PosixFileAttributes extends BasicFileAttributes
```

File attributes associated with files on file systems used by operating systems
that implement the Portable Operating System Interface (POSIX) family of
standards.

<p> The POSIX attributes of a file are retrieved using a {@link
PosixFileAttributeView} by invoking its {@link
PosixFileAttributeView#readAttributes readAttributes} method.

@since 1.7

## PosixFileAttributes.owner()

```java
UserPrincipal owner()
```

Returns the owner of the file.

@return  the file owner

@see PosixFileAttributeView#setOwner

## PosixFileAttributes.group()

```java
GroupPrincipal group()
```

Returns the group owner of the file.

@return  the file group owner

@see PosixFileAttributeView#setGroup

## PosixFileAttributes.permissions()

```java
Set<PosixFilePermission> permissions()
```

Returns the permissions of the file. The file permissions are returned
as a set of {@link PosixFilePermission} elements. The returned set is a
copy of the file permissions and is modifiable. This allows the result
to be modified and passed to the {@link PosixFileAttributeView#setPermissions
setPermissions} method to update the file's permissions.

@return  the file permissions

@see PosixFileAttributeView#setPermissions