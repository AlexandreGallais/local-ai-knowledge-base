# Proxy class (java.lang.reflect)

```java
public class Proxy implements java.io.Serializable
```

{@code Proxy} provides static methods for creating objects that act like instances
of interfaces but allow for customized method invocation.
To create a proxy instance for some interface {@code Foo}:
<pre>{@code
    InvocationHandler handler = new MyInvocationHandler(...);
    Foo f = (Foo) Proxy.newProxyInstance(Foo.class.getClassLoader(),
                                         new Class<?>[] { Foo.class },
                                         handler);
}</pre>

<p>
A <em>proxy class</em> is a class created at runtime that implements a specified
list of interfaces, known as <em>proxy interfaces</em>. A <em>proxy instance</em>
is an instance of a proxy class.

Each proxy instance has an associated <i>invocation handler</i>
object, which implements the interface {@link InvocationHandler}.
A method invocation on a proxy instance through one of its proxy
interfaces will be dispatched to the {@link InvocationHandler#invoke
invoke} method of the instance's invocation handler, passing the proxy
instance, a {@code java.lang.reflect.Method} object identifying
the method that was invoked, and an array of type {@code Object}
containing the arguments.  The invocation handler processes the
encoded method invocation as appropriate and the result that it
returns will be returned as the result of the method invocation on
the proxy instance.

<p>A proxy class has the following properties:

<ul>
<li>The unqualified name of a proxy class is unspecified.  The space
of class names that begin with the string {@code "$Proxy"}
should be, however, reserved for proxy classes.

<li>The package and module in which a proxy class is defined is specified
<a href="#membership">below</a>.

<li>A proxy class is <em>final and non-abstract</em>.

<li>A proxy class extends {@code java.lang.reflect.Proxy}.

<li>A proxy class implements exactly the interfaces specified at its
creation, in the same order. Invoking {@link Class#getInterfaces() getInterfaces}
on its {@code Class} object will return an array containing the same
list of interfaces (in the order specified at its creation), invoking
{@link Class#getMethods getMethods} on its {@code Class} object will return
an array of {@code Method} objects that include all of the
methods in those interfaces, and invoking {@code getMethod} will
find methods in the proxy interfaces as would be expected.

<li>The {@link java.security.ProtectionDomain} of a proxy class
is the same as that of system classes loaded by the bootstrap class
loader, such as {@code java.lang.Object}.

<li>The {@link Proxy#isProxyClass Proxy.isProxyClass} method can be used
to determine if a given class is a proxy class.
</ul>

<p>A proxy instance has the following properties:

<ul>
<li>Given a proxy instance {@code proxy} and one of the
interfaces, {@code Foo}, implemented by its proxy class, the
following expression will return true:
<pre>
    {@code proxy instanceof Foo}
</pre>
and the following cast operation will succeed (rather than throwing
a {@code ClassCastException}):
<pre>
    {@code (Foo) proxy}
</pre>

<li>Each proxy instance has an associated invocation handler, the one
that was passed to its constructor.  The static
{@link Proxy#getInvocationHandler Proxy.getInvocationHandler} method
will return the invocation handler associated with the proxy instance
passed as its argument.

<li>An interface method invocation on a proxy instance will be
encoded and dispatched to the invocation handler's {@link
InvocationHandler#invoke invoke} method as described in the
documentation for that method.

<li>A proxy interface may define a default method or inherit
a default method from its superinterface directly or indirectly.
An invocation handler can invoke a default method of a proxy interface
by calling {@link InvocationHandler#invokeDefault(Object, Method, Object...)
InvocationHandler::invokeDefault}.

<li>An invocation of the {@code hashCode},
{@code equals}, or {@code toString} methods declared in
{@code java.lang.Object} on a proxy instance will be encoded and
dispatched to the invocation handler's {@code invoke} method in
the same manner as interface method invocations are encoded and
dispatched, as described above.  The declaring class of the
{@code Method} object passed to {@code invoke} will be
{@code java.lang.Object}.  Other public methods of a proxy
instance inherited from {@code java.lang.Object} are not
overridden by a proxy class, so invocations of those methods behave
like they do for instances of {@code java.lang.Object}.
</ul>

<h2><a id="membership">Package and Module Membership of Proxy Class</a></h2>

The package and module to which a proxy class belongs are chosen such that
the accessibility of the proxy class is in line with the accessibility of
the proxy interfaces. Specifically, the package and the module membership
of a proxy class defined via the
{@link Proxy#getProxyClass(ClassLoader, Class[])} or
{@link Proxy#newProxyInstance(ClassLoader, Class[], InvocationHandler)}
methods is specified as follows:

<ol>
<li>If all the proxy interfaces are in <em>exported</em> or <em>open</em>
    packages:
<ol type="a">
<li>if all the proxy interfaces are <em>public</em>, then the proxy class is
    <em>public</em> in an unconditionally exported but non-open package.
    The name of the package and the module are unspecified.</li>

<li>if at least one of all the proxy interfaces is <em>non-public</em>, then
    the proxy class is <em>non-public</em> in the package and module of the
    non-public interfaces. All the non-public interfaces must be in the same
    package and module; otherwise, proxying them is
    <a href="#restrictions">not possible</a>.</li>
</ol>
</li>
<li>If at least one proxy interface is in a package that is
    <em>non-exported</em> and <em>non-open</em>:
<ol type="a">
<li>if all the proxy interfaces are <em>public</em>, then the proxy class is
    <em>public</em> in a <em>non-exported</em>, <em>non-open</em> package of
    <a href="#dynamicmodule"><em>dynamic module</em>.</a>
    The names of the package and the module are unspecified.</li>

<li>if at least one of all the proxy interfaces is <em>non-public</em>, then
    the proxy class is <em>non-public</em> in the package and module of the
    non-public interfaces. All the non-public interfaces must be in the same
    package and module; otherwise, proxying them is
    <a href="#restrictions">not possible</a>.</li>
</ol>
</li>
</ol>

<p>
Note that if proxy interfaces with a mix of accessibilities -- for example,
an exported public interface and a non-exported non-public interface -- are
proxied by the same instance, then the proxy class's accessibility is
governed by the least accessible proxy interface.
<p>
Note that it is possible for arbitrary code to obtain access to a proxy class
in an open package with {@link AccessibleObject#setAccessible setAccessible},
whereas a proxy class in a non-open package is never accessible to
code outside the module of the proxy class.

<p>
Throughout this specification, a "non-exported package" refers to a package
that is not exported to all modules, and a "non-open package" refers to
a package that is not open to all modules.  Specifically, these terms refer to
a package that either is not exported/open by its containing module or is
exported/open in a qualified fashion by its containing module.

<h3><a id="dynamicmodule">Dynamic Modules</a></h3>
<p>
A dynamic module is a named module generated at runtime. A proxy class
defined in a dynamic module is encapsulated and not accessible to any module.
Calling {@link Constructor#newInstance(Object...)} on a proxy class in
a dynamic module will throw {@code IllegalAccessException};
{@code Proxy.newProxyInstance} method should be used instead.

<p>
A dynamic module can read the modules of all of the superinterfaces of a proxy
class and the modules of the classes and interfaces referenced by
all public method signatures of a proxy class.  If a superinterface or
a referenced class or interface, say {@code T}, is in a non-exported package,
the {@linkplain Module module} of {@code T} is updated to export the
package of {@code T} to the dynamic module.

<h3>Methods Duplicated in Multiple Proxy Interfaces</h3>

<p>When two or more proxy interfaces contain a method with
the same name and parameter signature, the order of the proxy class's
interfaces becomes significant.  When such a <i>duplicate method</i>
is invoked on a proxy instance, the {@code Method} object passed
to the invocation handler will not necessarily be the one whose
declaring class is assignable from the reference type of the interface
that the proxy's method was invoked through.  This limitation exists
because the corresponding method implementation in the generated proxy
class cannot determine which interface it was invoked through.
Therefore, when a duplicate method is invoked on a proxy instance,
the {@code Method} object for the method in the foremost interface
that contains the method (either directly or inherited through a
superinterface) in the proxy class's list of interfaces is passed to
the invocation handler's {@code invoke} method, regardless of the
reference type through which the method invocation occurred.

<p>If a proxy interface contains a method with the same name and
parameter signature as the {@code hashCode}, {@code equals},
or {@code toString} methods of {@code java.lang.Object},
when such a method is invoked on a proxy instance, the
{@code Method} object passed to the invocation handler will have
{@code java.lang.Object} as its declaring class.  In other words,
the public, non-final methods of {@code java.lang.Object}
logically precede all of the proxy interfaces for the determination of
which {@code Method} object to pass to the invocation handler.

<p>Note also that when a duplicate method is dispatched to an
invocation handler, the {@code invoke} method may only throw
checked exception types that are assignable to one of the exception
types in the {@code throws} clause of the method in <i>all</i> of
the proxy interfaces that it can be invoked through.  If the
{@code invoke} method throws a checked exception that is not
assignable to any of the exception types declared by the method in one
of the proxy interfaces that it can be invoked through, then an
unchecked {@code UndeclaredThrowableException} will be thrown by
the invocation on the proxy instance.  This restriction means that not
all of the exception types returned by invoking
{@code getExceptionTypes} on the {@code Method} object
passed to the {@code invoke} method can necessarily be thrown
successfully by the {@code invoke} method.

@author      Peter Jones
@see         InvocationHandler
@since       1.3

## Proxy.h

```java
protected InvocationHandler h
```

the invocation handler for this proxy instance.
@serial

## Proxy.Proxy(InvocationHandler)

```java
protected Proxy(InvocationHandler h)
```

Constructs a new {@code Proxy} instance from a subclass
(typically, a dynamic proxy class) with the specified value
for its invocation handler.

@param  h the invocation handler for this proxy instance

@throws NullPointerException if the given invocation handler, {@code h},
        is {@code null}.

## Proxy.getProxyClass(ClassLoader, Class<?>...)

```java
public static Class<?> getProxyClass(ClassLoader loader, Class<?>... interfaces) throws IllegalArgumentException
```

Returns the {@code java.lang.Class} object for a proxy class
given a class loader and an array of interfaces.  The proxy class
will be defined by the specified class loader and will implement
all of the supplied interfaces.  If any of the given interfaces
is non-public, the proxy class will be non-public. If a proxy class
for the same permutation of interfaces has already been defined by the
class loader, then the existing proxy class will be returned; otherwise,
a proxy class for those interfaces will be generated dynamically
and defined by the class loader.

@param   loader the class loader to define the proxy class
@param   interfaces the list of interfaces for the proxy class
         to implement
@return  a proxy class that is defined in the specified class loader
         and that implements the specified interfaces
@throws  IllegalArgumentException if any of the <a href="#restrictions">
         restrictions</a> on the parameters are violated
@throws  NullPointerException if the {@code interfaces} array
         argument or any of its elements are {@code null}

@deprecated Proxy classes generated in a named module are encapsulated
     and not accessible to code outside its module.
     {@link Constructor#newInstance(Object...) Constructor.newInstance}
     will throw {@code IllegalAccessException} when it is called on
     an inaccessible proxy class.
     Use {@link #newProxyInstance(ClassLoader, Class[], InvocationHandler)}
     to create a proxy instance instead.

@see <a href="#membership">Package and Module Membership of Proxy Class</a>

## Proxy.newProxyInstance(ClassLoader, Class<?>[], InvocationHandler)

```java
public static Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h)
```

Returns a proxy instance for the specified interfaces
that dispatches method invocations to the specified invocation
handler.
<p>
<a id="restrictions">{@code IllegalArgumentException} will be thrown
if any of the following restrictions is violated:</a>
<ul>
<li>All of {@code Class} objects in the given {@code interfaces} array
must represent {@linkplain Class#isHidden() non-hidden} and
{@linkplain Class#isSealed() non-sealed} interfaces,
not classes or primitive types.

<li>No two elements in the {@code interfaces} array may
refer to identical {@code Class} objects.

<li>All of the interface types must be visible by name through the
specified class loader. In other words, for class loader
{@code cl} and every interface {@code i}, the following
expression must be true:<p>
{@code Class.forName(i.getName(), false, cl) == i}

<li>All of the types referenced by all
public method signatures of the specified interfaces
and those inherited by their superinterfaces
must be visible by name through the specified class loader.

<li>All non-public interfaces must be in the same package
and module, defined by the specified class loader and
the module of the non-public interfaces can access all of
the interface types; otherwise, it would not be possible for
the proxy class to implement all of the interfaces,
regardless of what package it is defined in.

<li>For any set of member methods of the specified interfaces
that have the same signature:
<ul>
<li>If the return type of any of the methods is a primitive
type or void, then all of the methods must have that same
return type.
<li>Otherwise, one of the methods must have a return type that
is assignable to all of the return types of the rest of the
methods.
</ul>

<li>The resulting proxy class must not exceed any limits imposed
on classes by the virtual machine.  For example, the VM may limit
the number of interfaces that a class may implement to 65535; in
that case, the size of the {@code interfaces} array must not
exceed 65535.
</ul>

<p>Note that the order of the specified proxy interfaces is
significant: two requests for a proxy class with the same combination
of interfaces but in a different order will result in two distinct
proxy classes.

@param   loader the class loader to define the proxy class
@param   interfaces the list of interfaces for the proxy class
         to implement
@param   h the invocation handler to dispatch method invocations to
@return  a proxy instance with the specified invocation handler of a
         proxy class that is defined by the specified class loader
         and that implements the specified interfaces
@throws  IllegalArgumentException if any of the <a href="#restrictions">
         restrictions</a> on the parameters are violated
@throws  NullPointerException if the {@code interfaces} array
         argument or any of its elements are {@code null}, or
         if the invocation handler, {@code h}, is
         {@code null}

@see <a href="#membership">Package and Module Membership of Proxy Class</a>

## Proxy.isProxyClass(Class<?>)

```java
public static boolean isProxyClass(Class<?> cl)
```

Returns true if the given class is a proxy class.

@implNote The reliability of this method is important for the ability
to use it to make security decisions, so its implementation should
not just test if the class in question extends {@code Proxy}.

@param   cl the class to test
@return  {@code true} if the class is a proxy class and
         {@code false} otherwise
@throws  NullPointerException if {@code cl} is {@code null}

## Proxy.getInvocationHandler(Object)

```java
public static InvocationHandler getInvocationHandler(Object proxy) throws IllegalArgumentException
```

Returns the invocation handler for the specified proxy instance.

@param   proxy the proxy instance to return the invocation handler for
@return  the invocation handler for the proxy instance
@throws  IllegalArgumentException if the argument is not a
         proxy instance
@throws  NullPointerException if {@code proxy} is {@code null}