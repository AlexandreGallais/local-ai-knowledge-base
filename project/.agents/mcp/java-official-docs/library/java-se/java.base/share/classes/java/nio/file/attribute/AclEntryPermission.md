---
title: "AclEntryPermission enum (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/AclEntryPermission.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AclEntryPermission enum (java.nio.file.attribute)

```java
public enum AclEntryPermission
```

Defines the permissions for use with the permissions component of an ACL
entry.

**Since:** 1.7

## AclEntryPermission.LIST_DIRECTORY

```java
public static final AclEntryPermission LIST_DIRECTORY
```

Permission to list the entries of a directory (equal to `READ_DATA`)

## AclEntryPermission.ADD_FILE

```java
public static final AclEntryPermission ADD_FILE
```

Permission to add a new file to a directory (equal to `WRITE_DATA`)

## AclEntryPermission.ADD_SUBDIRECTORY

```java
public static final AclEntryPermission ADD_SUBDIRECTORY
```

Permission to create a subdirectory to a directory (equal to `APPEND_DATA`)
