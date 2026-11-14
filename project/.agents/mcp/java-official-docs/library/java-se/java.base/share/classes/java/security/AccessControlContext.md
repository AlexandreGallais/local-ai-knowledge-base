# AccessControlContext class (java.security)

```java
public final class AccessControlContext
```

{@code AccessControlContext} was used with the Security Manager for access
control decisions based on context that it encapsulated. This feature no
longer exists.

@author Roland Schemers
@since 1.2
@deprecated This class was only useful in conjunction with the {@linkplain
      SecurityManager the Security Manager}, which is no longer supported.
      There is no replacement for the Security Manager or this class.

## AccessControlContext.AccessControlContext(ProtectionDomain[])

```java
public AccessControlContext(ProtectionDomain[] context)
```

Create an {@code AccessControlContext} with the given array of
{@code ProtectionDomain} objects.
Context must not be {@code null}. Duplicate domains will be removed
from the context.

@param context the {@code ProtectionDomain} objects associated with this
context. The non-duplicate domains are copied from the array. Subsequent
changes to the array will not affect this {@code AccessControlContext}.
@throws NullPointerException if {@code context} is {@code null}

## AccessControlContext.AccessControlContext(AccessControlContext, DomainCombiner)

```java
public AccessControlContext(AccessControlContext acc, DomainCombiner combiner)
```

Create a new {@code AccessControlContext} with the given
{@code AccessControlContext} and {@code DomainCombiner}.
This constructor associates the provided
{@code DomainCombiner} with the provided
{@code AccessControlContext}.

@param acc the {@code AccessControlContext} associated
         with the provided {@code DomainCombiner}.

@param combiner the {@code DomainCombiner} to be associated
         with the provided {@code AccessControlContext}.

@throws    NullPointerException if the provided
         {@code context} is {@code null}.

@since 1.3

## AccessControlContext.getDomainCombiner()

```java
public DomainCombiner getDomainCombiner()
```

Get the {@code DomainCombiner} associated with this
{@code AccessControlContext}.

@return the {@code DomainCombiner} associated with this
         {@code AccessControlContext}, or {@code null}
         if there is none.

@since 1.3

## AccessControlContext.checkPermission(Permission)

```java
public void checkPermission(Permission perm) throws AccessControlException
```

Throws {@code AccessControlException}.

@param perm ignored
@throws    AccessControlException always

## AccessControlContext.equals(Object)

```java
public boolean equals(Object obj)
```

Checks two {@code AccessControlContext} objects for equality.
Checks that {@code obj} is
an {@code AccessControlContext} and has the same set of
{@code ProtectionDomain} objects as this context.

@param obj the object we are testing for equality with this object.
@return {@code true} if {@code obj} is an {@code AccessControlContext},
and has the same set of {@code ProtectionDomain} objects as this context,
{@code false} otherwise.

## AccessControlContext.hashCode()

```java
public int hashCode()
```

{@return the hash code value for this context}
The hash code is computed by exclusive or-ing the hash code of all the
protection domains in the context together.