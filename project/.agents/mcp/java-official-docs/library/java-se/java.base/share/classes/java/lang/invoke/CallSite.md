# CallSite class (java.lang.invoke)

```java
public abstract sealed class CallSite permits ConstantCallSite, MutableCallSite, VolatileCallSite
```

A {@code CallSite} is a holder for a variable {@link MethodHandle},
which is called its {@code target}.
An {@code invokedynamic} instruction linked to a {@code CallSite} delegates
all calls to the site's current target.
A {@code CallSite} may be associated with several {@code invokedynamic}
instructions, or it may be "free floating", associated with none.
In any case, it may be invoked through an associated method handle
called its {@linkplain #dynamicInvoker dynamic invoker}.
<p>
{@code CallSite} is an abstract sealed class which does not allow
direct subclassing by users.  It has three immediate,
concrete non-sealed subclasses that may be either instantiated or subclassed.
<ul>
<li>If a mutable target is not required, an {@code invokedynamic} instruction
may be permanently bound by means of a {@linkplain ConstantCallSite constant call site}.
<li>If a mutable target is required which has volatile variable semantics,
because updates to the target must be immediately and reliably witnessed by other threads,
a {@linkplain VolatileCallSite volatile call site} may be used.
<li>Otherwise, if a mutable target is required,
a {@linkplain MutableCallSite mutable call site} may be used.
</ul>
<p>
A non-constant call site may be <em>relinked</em> by changing its target.
The new target must have the same {@linkplain MethodHandle#type() type}
as the previous target.
Thus, though a call site can be relinked to a series of
successive targets, it cannot change its type.
<p>
Here is a sample use of call sites and bootstrap methods which links every
dynamic call site to print its arguments:
<blockquote><pre>{@code
static void test() throws Throwable {
    // THE FOLLOWING LINE IS PSEUDOCODE FOR A JVM INSTRUCTION
    InvokeDynamic[#bootstrapDynamic].baz("baz arg", 2, 3.14);
}
private static void printArgs(Object... args) {
  System.out.println(java.util.Arrays.deepToString(args));
}
private static final MethodHandle printArgs;
static {
  MethodHandles.Lookup lookup = MethodHandles.lookup();
  Class thisClass = lookup.lookupClass();  // (who am I?)
  printArgs = lookup.findStatic(thisClass,
      "printArgs", MethodType.methodType(void.class, Object[].class));
}
private static CallSite bootstrapDynamic(MethodHandles.Lookup caller, String name, MethodType type) {
  // ignore caller and name, but match the type:
  return new ConstantCallSite(printArgs.asType(type));
}
}</pre></blockquote>
@author John Rose, JSR 292 EG
@since 1.7
@sealedGraph

## CallSite.type()

```java
public MethodType type()
```

Returns the type of this call site's target.
Although targets may change, any call site's type is permanent, and can never change to an unequal type.
The {@code setTarget} method enforces this invariant by refusing any new target that does
not have the previous target's type.
@return the type of the current target, which is also the type of any future target

## CallSite.getTarget()

```java
public abstract MethodHandle getTarget()
```

Returns the target method of the call site, according to the
behavior defined by this call site's specific class.
The immediate subclasses of {@code CallSite} document the
class-specific behaviors of this method.

@return the current linkage state of the call site, its target method handle
@see ConstantCallSite
@see VolatileCallSite
@see #setTarget
@see ConstantCallSite#getTarget
@see MutableCallSite#getTarget
@see VolatileCallSite#getTarget

## CallSite.setTarget(MethodHandle)

```java
public abstract void setTarget(MethodHandle newTarget)
```

Updates the target method of this call site, according to the
behavior defined by this call site's specific class.
The immediate subclasses of {@code CallSite} document the
class-specific behaviors of this method.
<p>
The type of the new target must be {@linkplain MethodType#equals equal to}
the type of the old target.

@param newTarget the new target
@throws NullPointerException if the proposed new target is null
@throws WrongMethodTypeException if the proposed new target
        has a method type that differs from the previous target
@see CallSite#getTarget
@see ConstantCallSite#setTarget
@see MutableCallSite#setTarget
@see VolatileCallSite#setTarget

## CallSite.dynamicInvoker()

```java
public abstract MethodHandle dynamicInvoker()
```

Produces a method handle equivalent to an invokedynamic instruction
which has been linked to this call site.
<p>
This method is equivalent to the following code:
<blockquote><pre>{@code
MethodHandle getTarget, invoker, result;
getTarget = MethodHandles.publicLookup().bind(this, "getTarget", MethodType.methodType(MethodHandle.class));
invoker = MethodHandles.exactInvoker(this.type());
result = MethodHandles.foldArguments(invoker, getTarget)
}</pre></blockquote>

@return a method handle which always invokes this call site's current target