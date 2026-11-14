# AclEntry class (java.nio.file.attribute)

```java
public final class AclEntry
```

An entry in an access control list (ACL).

<p> The ACL entry represented by this class is based on the ACL model
specified in <a href="http://www.ietf.org/rfc/rfc3530.txt"><i>RFC&nbsp;3530:
Network File System (NFS) version 4 Protocol</i></a>. Each entry has four
components as follows:

<ol>
   <li><p> The {@link #type() type} component determines if the entry
   grants or denies access. </p></li>

   <li><p> The {@link #principal() principal} component, sometimes called the
   "who" component, is a {@link UserPrincipal} corresponding to the identity
   that the entry grants or denies access
   </p></li>

   <li><p> The {@link #permissions permissions} component is a set of
   {@link AclEntryPermission permissions}
   </p></li>

   <li><p> The {@link #flags() flags} component is a set of {@link AclEntryFlag
   flags} to indicate how entries are inherited and propagated </p></li>
</ol>

<p> ACL entries are created using an associated {@link Builder} object by
invoking its {@link Builder#build build} method.

<p> ACL entries are immutable and are safe for use by multiple concurrent
threads.

@spec https://www.rfc-editor.org/info/rfc3530
     RFC 3530: Network File System (NFS) version 4 Protocol
@since 1.7

## AclEntry.build()

```java
public AclEntry build()
```

Constructs an {@link AclEntry} from the components of this builder.
The type and who components are required to have been set in order
to construct an {@code AclEntry}.

@return  a new ACL entry

@throws  IllegalStateException
         if the type or who component have not been set

## AclEntry.setType(AclEntryType)

```java
public Builder setType(AclEntryType type)
```

Sets the type component of this builder.

@param   type  the component type
@return  this builder

## AclEntry.setPrincipal(UserPrincipal)

```java
public Builder setPrincipal(UserPrincipal who)
```

Sets the principal component of this builder.

@param   who  the principal component
@return  this builder

## AclEntry.setPermissions(Set<AclEntryPermission>)

```java
public Builder setPermissions(Set<AclEntryPermission> perms)
```

Sets the permissions component of this builder. On return, the
permissions component of this builder is a copy of the given set.

@param   perms  the permissions component
@return  this builder

@throws  ClassCastException
         if the set contains elements that are not of type {@code
         AclEntryPermission}

## AclEntry.setPermissions(AclEntryPermission...)

```java
public Builder setPermissions(AclEntryPermission... perms)
```

Sets the permissions component of this builder. On return, the
permissions component of this builder is a copy of the permissions in
the given array.

@param   perms  the permissions component
@return  this builder

## AclEntry.setFlags(Set<AclEntryFlag>)

```java
public Builder setFlags(Set<AclEntryFlag> flags)
```

Sets the flags component of this builder. On return, the flags
component of this builder is a copy of the given set.

@param   flags  the flags component
@return  this builder

@throws  ClassCastException
         if the set contains elements that are not of type {@code
         AclEntryFlag}

## AclEntry.setFlags(AclEntryFlag...)

```java
public Builder setFlags(AclEntryFlag... flags)
```

Sets the flags component of this builder. On return, the flags
component of this builder is a copy of the flags in the given
array.

@param   flags  the flags component
@return  this builder

## AclEntry.newBuilder()

```java
public static Builder newBuilder()
```

Constructs a new builder. The initial value of the type and who
components is {@code null}. The initial value of the permissions and
flags components is the empty set.

@return  a new builder

## AclEntry.newBuilder(AclEntry)

```java
public static Builder newBuilder(AclEntry entry)
```

Constructs a new builder with the components of an existing ACL entry.

@param   entry  an ACL entry
@return  a new builder

## AclEntry.type()

```java
public AclEntryType type()
```

Returns the ACL entry type.

@return the ACL entry type

## AclEntry.principal()

```java
public UserPrincipal principal()
```

Returns the principal component.

@return the principal component

## AclEntry.permissions()

```java
public Set<AclEntryPermission> permissions()
```

Returns a copy of the permissions component.

<p> The returned set is a modifiable copy of the permissions.

@return the permissions component

## AclEntry.flags()

```java
public Set<AclEntryFlag> flags()
```

Returns a copy of the flags component.

<p> The returned set is a modifiable copy of the flags.

@return the flags component

## AclEntry.equals(Object)

```java
public boolean equals(Object ob)
```

Compares the specified object with this ACL entry for equality.

<p> If the given object is not an {@code AclEntry} then this method
immediately returns {@code false}.

<p> For two ACL entries to be considered equals requires that they are
both the same type, their who components are equal, their permissions
components are equal, and their flags components are equal.

<p> This method satisfies the general contract of the {@link
java.lang.Object#equals(Object) Object.equals} method. </p>

@param   ob   the object to which this object is to be compared

@return  {@code true} if, and only if, the given object is an AclEntry that
         is identical to this AclEntry

## AclEntry.hashCode()

```java
public int hashCode()
```

Returns the hash-code value for this ACL entry.

<p> This method satisfies the general contract of the {@link
Object#hashCode} method.

## AclEntry.toString()

```java
public String toString()
```

Returns the string representation of this ACL entry.

@return  the string representation of this entry