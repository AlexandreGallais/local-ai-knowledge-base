# ResolvedModule class (java.lang.module)

```java
public final class ResolvedModule
```

A module in a graph of <em>resolved modules</em>.

<p> {@code ResolvedModule} defines the {@link #configuration configuration}
method to get the configuration that the resolved module is in. It defines
the {@link #reference() reference} method to get the reference to the
module's content.

@since 9
@see Configuration#modules()

## ResolvedModule.configuration()

```java
public Configuration configuration()
```

Returns the configuration that this resolved module is in.

@return The configuration that this resolved module is in

## ResolvedModule.reference()

```java
public ModuleReference reference()
```

Returns the reference to the module's content.

@return The reference to the module's content

## ResolvedModule.name()

```java
public String name()
```

Returns the module name.

This convenience method is the equivalent to invoking:
<pre> {@code
    reference().descriptor().name()
}</pre>

@return The module name

## ResolvedModule.reads()

```java
public Set<ResolvedModule> reads()
```

Returns the set of resolved modules that this resolved module reads.
The readability relation is reflexive (every module reads itself). The
set of resolved modules returned by this method does not include itself.

@return A possibly-empty unmodifiable set of resolved modules that
        this resolved module reads

## ResolvedModule.hashCode()

```java
public int hashCode()
```

Computes a hash code for this resolved module.

<p> The hash code is based upon the components of the resolved module
and satisfies the general contract of the {@link Object#hashCode
Object.hashCode} method. </p>

@return The hash-code value for this resolved module

## ResolvedModule.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this resolved module for equality with the given object.

<p> If the given object is not a {@code ResolvedModule} then this
method returns {@code false}. Two {@code ResolvedModule} objects are
equal if they are in the same configuration and have equal references
to the module content. </p>

<p> This method satisfies the general contract of the {@link
java.lang.Object#equals(Object) Object.equals} method. </p>

@param   ob
         the object to which this object is to be compared

@return  {@code true} if, and only if, the given object is a module
         reference that is equal to this module reference

## ResolvedModule.toString()

```java
public String toString()
```

Returns a string describing this resolved module.

@return A string describing this resolved module