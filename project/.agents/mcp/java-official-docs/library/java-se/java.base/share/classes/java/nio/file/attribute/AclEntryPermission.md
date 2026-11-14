# AclEntryPermission enum (java.nio.file.attribute)

```java
public enum AclEntryPermission
```

Defines the permissions for use with the permissions component of an ACL
{@link AclEntry entry}.

@since 1.7

## AclEntryPermission.LIST_DIRECTORY

```java
public static final AclEntryPermission LIST_DIRECTORY
```

Permission to list the entries of a directory (equal to {@link #READ_DATA})

## AclEntryPermission.ADD_FILE

```java
public static final AclEntryPermission ADD_FILE
```

Permission to add a new file to a directory (equal to {@link #WRITE_DATA})

## AclEntryPermission.ADD_SUBDIRECTORY

```java
public static final AclEntryPermission ADD_SUBDIRECTORY
```

Permission to create a subdirectory to a directory (equal to {@link #APPEND_DATA})