---
title: "AclEntry class (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/AclEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AclEntry class (java.nio.file.attribute)

```java
public final class AclEntry
```

An entry in an access control list (ACL).

 The ACL entry represented by this class is based on the ACL model
specified in *RFC 3530:
Network File System (NFS) version 4 Protocol*. Each entry has four
components as follows:

-

 The type component determines if the entry
   grants or denies access.

-

 The principal component, sometimes called the
   "who" component, is a `UserPrincipal` corresponding to the identity
   that the entry grants or denies access

-

 The permissions component is a set of
   permissions

-

 The flags component is a set of flags to indicate how entries are inherited and propagated

 ACL entries are created using an associated `Builder` object by
invoking its build method.

 ACL entries are immutable and are safe for use by multiple concurrent
threads.

**Since:** 1.7

## AclEntry.build()

```java
public AclEntry build()
```

Constructs an `AclEntry` from the components of this builder.
The type and who components are required to have been set in order
to construct an `AclEntry`.

**Returns:** a new ACL entry

Throws:

- `IllegalStateException`: if the type or who component have not been set

## AclEntry.setType(AclEntryType)

```java
public Builder setType(AclEntryType type)
```

Sets the type component of this builder.

Parameters:

- `type`: the component type

**Returns:** this builder

## AclEntry.setPrincipal(UserPrincipal)

```java
public Builder setPrincipal(UserPrincipal who)
```

Sets the principal component of this builder.

Parameters:

- `who`: the principal component

**Returns:** this builder

## AclEntry.setPermissions(Set<AclEntryPermission>)

```java
public Builder setPermissions(Set<AclEntryPermission> perms)
```

Sets the permissions component of this builder. On return, the
permissions component of this builder is a copy of the given set.

Parameters:

- `perms`: the permissions component

**Returns:** this builder

Throws:

- `ClassCastException`: if the set contains elements that are not of type `AclEntryPermission`

## AclEntry.setPermissions(AclEntryPermission...)

```java
public Builder setPermissions(AclEntryPermission... perms)
```

Sets the permissions component of this builder. On return, the
permissions component of this builder is a copy of the permissions in
the given array.

Parameters:

- `perms`: the permissions component

**Returns:** this builder

## AclEntry.setFlags(Set<AclEntryFlag>)

```java
public Builder setFlags(Set<AclEntryFlag> flags)
```

Sets the flags component of this builder. On return, the flags
component of this builder is a copy of the given set.

Parameters:

- `flags`: the flags component

**Returns:** this builder

Throws:

- `ClassCastException`: if the set contains elements that are not of type `AclEntryFlag`

## AclEntry.setFlags(AclEntryFlag...)

```java
public Builder setFlags(AclEntryFlag... flags)
```

Sets the flags component of this builder. On return, the flags
component of this builder is a copy of the flags in the given
array.

Parameters:

- `flags`: the flags component

**Returns:** this builder

## AclEntry.newBuilder()

```java
public static Builder newBuilder()
```

Constructs a new builder. The initial value of the type and who
components is `null`. The initial value of the permissions and
flags components is the empty set.

**Returns:** a new builder

## AclEntry.newBuilder(AclEntry)

```java
public static Builder newBuilder(AclEntry entry)
```

Constructs a new builder with the components of an existing ACL entry.

Parameters:

- `entry`: an ACL entry

**Returns:** a new builder

## AclEntry.type()

```java
public AclEntryType type()
```

Returns the ACL entry type.

**Returns:** the ACL entry type

## AclEntry.principal()

```java
public UserPrincipal principal()
```

Returns the principal component.

**Returns:** the principal component

## AclEntry.permissions()

```java
public Set<AclEntryPermission> permissions()
```

Returns a copy of the permissions component.

 The returned set is a modifiable copy of the permissions.

**Returns:** the permissions component

## AclEntry.flags()

```java
public Set<AclEntryFlag> flags()
```

Returns a copy of the flags component.

 The returned set is a modifiable copy of the flags.

**Returns:** the flags component

## AclEntry.equals(Object)

```java
public boolean equals(Object ob)
```

Compares the specified object with this ACL entry for equality.

 If the given object is not an `AclEntry` then this method
immediately returns `false`.

 For two ACL entries to be considered equals requires that they are
both the same type, their who components are equal, their permissions
components are equal, and their flags components are equal.

 This method satisfies the general contract of the Object.equals method.

Parameters:

- `ob`: the object to which this object is to be compared

**Returns:** `true` if, and only if, the given object is an AclEntry that
         is identical to this AclEntry

## AclEntry.hashCode()

```java
public int hashCode()
```

Returns the hash-code value for this ACL entry.

 This method satisfies the general contract of the `Object.hashCode` method.

## AclEntry.toString()

```java
public String toString()
```

Returns the string representation of this ACL entry.

**Returns:** the string representation of this entry
