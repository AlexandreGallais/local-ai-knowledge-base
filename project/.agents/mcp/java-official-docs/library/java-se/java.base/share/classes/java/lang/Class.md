# Class class (java.lang)

```java
public final class Class<T> implements java.io.Serializable, GenericDeclaration, Type, AnnotatedElement, TypeDescriptor.OfField<Class<?>>, Constable
```

Instances of the class {@code Class} represent classes and
interfaces in a running Java application. An enum class and a record
class are kinds of class; an annotation interface is a kind of
interface. Every array also belongs to a class that is reflected as
a {@code Class} object that is shared by all arrays with the same
element type and number of dimensions.  The primitive Java types
({@code boolean}, {@code byte}, {@code char}, {@code short}, {@code
int}, {@code long}, {@code float}, and {@code double}), and the
keyword {@code void} are also represented as {@code Class} objects.

<p> {@code Class} has no public constructor. Instead a {@code Class}
object is constructed automatically by the Java Virtual Machine when
a class is derived from the bytes of a {@code class} file through
the invocation of one of the following methods:
<ul>
<li> {@link ClassLoader#defineClass(String, byte[], int, int) ClassLoader::defineClass}
<li> {@link java.lang.invoke.MethodHandles.Lookup#defineClass(byte[])
     java.lang.invoke.MethodHandles.Lookup::defineClass}
<li> {@link java.lang.invoke.MethodHandles.Lookup#defineHiddenClass(byte[], boolean, MethodHandles.Lookup.ClassOption...)
     java.lang.invoke.MethodHandles.Lookup::defineHiddenClass}
</ul>

<p> The methods of class {@code Class} expose many characteristics of a
class or interface. Most characteristics are derived from the {@code class}
file that the class loader passed to the Java Virtual Machine or
from the {@code class} file passed to {@code Lookup::defineClass}
or {@code Lookup::defineHiddenClass}.
A few characteristics are determined by the class loading environment
at run time, such as the module returned by {@link #getModule() getModule()}.

<p> The following example uses a {@code Class} object to print the
class name of an object:

{@snippet lang="java" :
void printClassName(Object obj) {
    System.out.println("The class of " + obj +
                       " is " + obj.getClass().getName());
}}

It is also possible to get the {@code Class} object for a named
class or interface (or for {@code void}) using a <dfn>class literal</dfn>
(JLS {@jls 15.8.2}).
For example:

{@snippet lang="java" :
System.out.println("The name of class Foo is: " + Foo.class.getName()); // @highlight substring="Foo.class"
}

<p> Some methods of class {@code Class} expose whether the declaration of
a class or interface in Java source code was <em>enclosed</em> within
another declaration. Other methods describe how a class or interface
is situated in a <dfn>{@index "nest"}</dfn>. A nest is a set of
classes and interfaces, in the same run-time package, that
allow mutual access to their {@code private} members.
The classes and interfaces are known as <dfn>{@index "nestmates"}</dfn>
(JVMS {@jvms 4.7.29}).
One nestmate acts as the
<dfn>nest host</dfn> (JVMS {@jvms 4.7.28}), and enumerates the other nestmates which
belong to the nest; each of them in turn records it as the nest host.
The classes and interfaces which belong to a nest, including its host, are
determined when
{@code class} files are generated, for example, a Java compiler
will typically record a top-level class as the host of a nest where the
other members are the classes and interfaces whose declarations are
enclosed within the top-level class declaration.

<h2><a id=hiddenClasses>Hidden Classes</a></h2>
A class or interface created by the invocation of
{@link java.lang.invoke.MethodHandles.Lookup#defineHiddenClass(byte[], boolean, MethodHandles.Lookup.ClassOption...)
Lookup::defineHiddenClass} is a {@linkplain Class#isHidden() <dfn>hidden</dfn>}
class or interface.
All kinds of class, including enum classes and record classes, may be
hidden classes; all kinds of interface, including annotation interfaces,
may be hidden interfaces.

The {@linkplain #getName() name of a hidden class or interface} is
not a {@linkplain ClassLoader##binary-name binary name},
which means the following:
<ul>
<li>A hidden class or interface cannot be referenced by the constant pools
    of other classes and interfaces.
<li>A hidden class or interface cannot be described in
    {@linkplain java.lang.constant.ConstantDesc <em>nominal form</em>} by
    {@link #describeConstable() Class::describeConstable},
    {@link ClassDesc#of(String) ClassDesc::of}, or
    {@link ClassDesc#ofDescriptor(String) ClassDesc::ofDescriptor}.
<li>A hidden class or interface cannot be discovered by {@link #forName Class::forName}
    or {@link ClassLoader#loadClass(String, boolean) ClassLoader::loadClass}.
</ul>

A hidden class or interface is never an array class, but may be
the element type of an array. In all other respects, the fact that
a class or interface is hidden has no bearing on the characteristics
exposed by the methods of class {@code Class}.

<h2><a id=implicitClasses>Implicitly Declared Classes</a></h2>

Conventionally, a Java compiler, starting from a source file for an
implicitly declared class, say {@code HelloWorld.java}, creates a
similarly-named {@code class} file, {@code HelloWorld.class}, where
the class stored in that {@code class} file is named {@code
"HelloWorld"}, matching the base names of the source and {@code
class} files.

For the {@code Class} object of an implicitly declared class {@code
HelloWorld}, the methods to get the {@linkplain #getName name} and
{@linkplain #getTypeName type name} return results
equal to {@code "HelloWorld"}. The {@linkplain #getSimpleName
simple name} of such an implicitly declared class is {@code "HelloWorld"} and
the {@linkplain #getCanonicalName canonical name} is {@code "HelloWorld"}.

@param <T> the type of the class modeled by this {@code Class}
object.  For example, the type of {@code String.class} is {@code
Class<String>}.  Use {@code Class<?>} if the class being modeled is
unknown.

@see     java.lang.ClassLoader#defineClass(byte[], int, int)
@since   1.0

## Class.toString()

```java
public String toString()
```

Converts the object to a string. The string representation is the
string "class" or "interface", followed by a space, and then by the
name of the class in the format returned by {@code getName}.
If this {@code Class} object represents a primitive type,
this method returns the name of the primitive type.  If
this {@code Class} object represents void this method returns
"void". If this {@code Class} object represents an array type,
this method returns "class " followed by {@code getName}.

@return a string representation of this {@code Class} object.

## Class.toGenericString()

```java
public String toGenericString()
```

Returns a string describing this {@code Class}, including
information about modifiers, {@link #isSealed() sealed}/{@code
non-sealed} status, and type parameters.

The string is formatted as a list of type modifiers, if any,
followed by the kind of type (empty string for primitive types
and {@code class}, {@code enum}, {@code interface},
{@code @interface}, or {@code record} as appropriate), followed
by the type's name, followed by an angle-bracketed
comma-separated list of the type's type parameters, if any,
including informative bounds on the type parameters, if any.

A space is used to separate modifiers from one another and to
separate any modifiers from the kind of type. The modifiers
occur in canonical order. If there are no type parameters, the
type parameter list is elided.

For an array type, the string starts with the type name,
followed by an angle-bracketed comma-separated list of the
type's type parameters, if any, followed by a sequence of
{@code []} characters, one set of brackets per dimension of
the array.

<p>Note that since information about the runtime representation
of a type is being generated, modifiers not present on the
originating source code or illegal on the originating source
code may be present.

@return a string describing this {@code Class}, including
information about modifiers and type parameters

@since 1.8

## Class.forName(String)

```java
public static Class<?> forName(String className) throws ClassNotFoundException
```

Returns the {@code Class} object associated with the class or
interface with the given string name.  Invoking this method is
equivalent to:

{@snippet lang="java" :
Class.forName(className, true, currentLoader)
}

where {@code currentLoader} denotes the defining class loader of
the current class.

<p> For example, the following code fragment returns the
runtime {@code Class} object for the class named
{@code java.lang.Thread}:

{@snippet lang="java" :
Class<?> t = Class.forName("java.lang.Thread");
}
<p>
A call to {@code forName("X")} causes the class named
{@code X} to be initialized.

<p>
In cases where this method is called from a context where there is no
caller frame on the stack (e.g. when called directly from a JNI
attached thread), the system class loader is used.

@param     className the {@linkplain ClassLoader##binary-name binary name}
                     of the class or the string representing an array type
@return    the {@code Class} object for the class with the
           specified name.
@throws    LinkageError if the linkage fails
@throws    ExceptionInInitializerError if the initialization provoked
           by this method fails
@throws    ClassNotFoundException if the class cannot be located

@jls 12.2 Loading of Classes and Interfaces
@jls 12.3 Linking of Classes and Interfaces
@jls 12.4 Initialization of Classes and Interfaces

## Class.forName(String, boolean, ClassLoader)

```java
public static Class<?> forName(String name, boolean initialize, ClassLoader loader) throws ClassNotFoundException
```

Returns the {@code Class} object associated with the class or
interface with the given string name, using the given class loader.
Given the {@linkplain ClassLoader##binary-name binary name} for a class or interface,
this method attempts to locate and load the class or interface. The specified
class loader is used to load the class or interface.  If the parameter
{@code loader} is {@code null}, the class is loaded through the bootstrap
class loader.  The class is initialized only if the
{@code initialize} parameter is {@code true} and if it has
not been initialized earlier.

<p> This method cannot be used to obtain any of the {@code Class} objects
representing primitive types or void, hidden classes or interfaces,
or array classes whose element type is a hidden class or interface.
If {@code name} denotes a primitive type or void, for example {@code I},
an attempt will be made to locate a user-defined class in the unnamed package
whose name is {@code I} instead.
To obtain a {@code Class} object for a named primitive type
such as {@code int} or {@code long} use {@link
#forPrimitiveName(String)}.

<p> To obtain the {@code Class} object associated with an array class,
the name consists of one or more {@code '['} representing the depth
of the array nesting, followed by the element type as encoded in
{@linkplain ##nameFormat the table} specified in {@code Class.getName()}.

<p> Examples:
{@snippet lang="java" :
Class<?> threadClass = Class.forName("java.lang.Thread", false, currentLoader);
Class<?> stringArrayClass = Class.forName("[Ljava.lang.String;", false, currentLoader);
Class<?> intArrayClass = Class.forName("[[[I", false, currentLoader);   // Class of int[][][]
Class<?> nestedClass = Class.forName("java.lang.Character$UnicodeBlock", false, currentLoader);
Class<?> fooClass = Class.forName("Foo", true, currentLoader);
}

<p> A call to {@code getName()} on the {@code Class} object returned
from {@code forName(}<i>N</i>{@code )} returns <i>N</i>.

<p> A call to {@code forName("[L}<i>N</i>{@code ;")} causes the element type
named <i>N</i> to be loaded but not initialized regardless of the value
of the {@code initialize} parameter.

@apiNote
This method throws errors related to loading, linking or initializing
as specified in Sections {@jls 12.2}, {@jls 12.3}, and {@jls 12.4} of
<cite>The Java Language Specification</cite>.
In addition, this method does not check whether the requested class
is accessible to its caller.

@param name       the {@linkplain ClassLoader##binary-name binary name}
                  of the class or the string representing an array class

@param initialize if {@code true} the class will be initialized
                  (which implies linking). See Section {@jls
                  12.4} of <cite>The Java Language
                  Specification</cite>.
@param loader     class loader from which the class must be loaded
@return           class object representing the desired class

@throws    LinkageError if the linkage fails
@throws    ExceptionInInitializerError if the initialization provoked
           by this method fails
@throws    ClassNotFoundException if the class cannot be located by
           the specified class loader

@see       java.lang.Class#forName(String)
@see       java.lang.ClassLoader

@jls 12.2 Loading of Classes and Interfaces
@jls 12.3 Linking of Classes and Interfaces
@jls 12.4 Initialization of Classes and Interfaces
@jls 13.1 The Form of a Binary
@since     1.2

## Class.forName(Module, String)

```java
public static Class<?> forName(Module module, String name)
```

Returns the {@code Class} with the given {@linkplain ClassLoader##binary-name
binary name} in the given module.

<p> This method attempts to locate and load the class or interface.
It does not link the class, and does not run the class initializer.
If the class is not found, this method returns {@code null}. </p>

<p> If the class loader of the given module defines other modules and
the given name is a class defined in a different module, this method
returns {@code null} after the class is loaded. </p>

<p> This method does not check whether the requested class is
accessible to its caller. </p>

@apiNote
This method does not support loading of array types, unlike
{@link #forName(String, boolean, ClassLoader)}. The class name must be
a binary name.  This method returns {@code null} on failure rather than
throwing a {@link ClassNotFoundException}, as is done by
the {@link #forName(String, boolean, ClassLoader)} method.

@param  module   A module
@param  name     The {@linkplain ClassLoader##binary-name binary name}
                 of the class
@return {@code Class} object of the given name defined in the given module;
        {@code null} if not found.

@throws NullPointerException if the given module or name is {@code null}

@throws LinkageError if the linkage fails

@jls 12.2 Loading of Classes and Interfaces
@jls 12.3 Linking of Classes and Interfaces
@since 9

## Class.forPrimitiveName(String)

```java
public static Class<?> forPrimitiveName(String primitiveName)
```

{@return the {@code Class} object associated with the
{@linkplain #isPrimitive() primitive type} of the given name}
If the argument is not the name of a primitive type, {@code
null} is returned.

@param primitiveName the name of the primitive type to find

@throws NullPointerException if the argument is {@code null}

@jls 4.2 Primitive Types and Values
@jls 15.8.2 Class Literals
@since 22

## Class.newInstance()

```java
public T newInstance() throws InstantiationException, IllegalAccessException
```

Creates a new instance of the class represented by this {@code Class}
object.  The class is instantiated as if by a {@code new}
expression with an empty argument list.  The class is initialized if it
has not already been initialized.

@deprecated This method propagates any exception thrown by the
nullary constructor, including a checked exception.  Use of
this method effectively bypasses the compile-time exception
checking that would otherwise be performed by the compiler.
The {@link
java.lang.reflect.Constructor#newInstance(java.lang.Object...)
Constructor.newInstance} method avoids this problem by wrapping
any exception thrown by the constructor in a (checked) {@link
java.lang.reflect.InvocationTargetException}.

<p>The call

{@snippet lang="java" :
clazz.newInstance()
}

can be replaced by

{@snippet lang="java" :
clazz.getDeclaredConstructor().newInstance()
}

The latter sequence of calls is inferred to be able to throw
the additional exception types {@link
InvocationTargetException} and {@link
NoSuchMethodException}. Both of these exception types are
subclasses of {@link ReflectiveOperationException}.

@return  a newly allocated instance of the class represented by this
         object.
@throws  IllegalAccessException  if the class or its nullary
         constructor is not accessible.
@throws  InstantiationException
         if this {@code Class} represents an abstract class,
         an interface, an array class, a primitive type, or void;
         or if the class has no nullary constructor;
         or if the instantiation fails for some other reason.
@throws  ExceptionInInitializerError if the initialization
         provoked by this method fails.

## Class.isInstance(Object)

```java
public native boolean isInstance(Object obj)
```

Determines if the specified {@code Object} is assignment-compatible
with the object represented by this {@code Class}.  This method is
the dynamic equivalent of the Java language {@code instanceof}
operator. The method returns {@code true} if the specified
{@code Object} argument is non-null and can be cast to the
reference type represented by this {@code Class} object without
raising a {@code ClassCastException.} It returns {@code false}
otherwise.

<p> Specifically, if this {@code Class} object represents a
declared class, this method returns {@code true} if the specified
{@code Object} argument is an instance of the represented class (or
of any of its subclasses); it returns {@code false} otherwise. If
this {@code Class} object represents an array class, this method
returns {@code true} if the specified {@code Object} argument
can be converted to an object of the array class by an identity
conversion or by a widening reference conversion; it returns
{@code false} otherwise. If this {@code Class} object
represents an interface, this method returns {@code true} if the
class or any superclass of the specified {@code Object} argument
implements this interface; it returns {@code false} otherwise. If
this {@code Class} object represents a primitive type, this method
returns {@code false}.

@param   obj the object to check
@return  true if {@code obj} is an instance of this class

@since 1.1

## Class.isAssignableFrom(Class<?>)

```java
public native boolean isAssignableFrom(Class<?> cls)
```

Determines if the class or interface represented by this
{@code Class} object is either the same as, or is a superclass or
superinterface of, the class or interface represented by the specified
{@code Class} parameter. It returns {@code true} if so;
otherwise it returns {@code false}. If this {@code Class}
object represents a primitive type, this method returns
{@code true} if the specified {@code Class} parameter is
exactly this {@code Class} object; otherwise it returns
{@code false}.

<p> Specifically, this method tests whether the type represented by the
specified {@code Class} parameter can be converted to the type
represented by this {@code Class} object via an identity conversion
or via a widening reference conversion. See <cite>The Java Language
Specification</cite>, sections {@jls 5.1.1} and {@jls 5.1.4},
for details.

@param     cls the {@code Class} object to be checked
@return    the {@code boolean} value indicating whether objects of the
           type {@code cls} can be assigned to objects of this class
@throws    NullPointerException if the specified Class parameter is
           null.
@since     1.1

## Class.isInterface()

```java
public boolean isInterface()
```

Determines if this {@code Class} object represents an
interface type.

@return  {@code true} if this {@code Class} object represents an interface;
         {@code false} otherwise.

## Class.isArray()

```java
public boolean isArray()
```

Determines if this {@code Class} object represents an array class.

@return  {@code true} if this {@code Class} object represents an array class;
         {@code false} otherwise.
@since   1.1

## Class.isPrimitive()

```java
public boolean isPrimitive()
```

Determines if this {@code Class} object represents a primitive
type or void.

<p> There are nine predefined {@code Class} objects to
represent the eight primitive types and void.  These are
created by the Java Virtual Machine, and have the same
{@linkplain #getName() names} as the primitive types that they
represent, namely {@code boolean}, {@code byte}, {@code char},
{@code short}, {@code int}, {@code long}, {@code float}, and
{@code double}.

<p>No other class objects are considered primitive.

@apiNote
A {@code Class} object represented by a primitive type can be
accessed via the {@code TYPE} public static final variables
defined in the primitive wrapper classes such as {@link
java.lang.Integer#TYPE Integer.TYPE}. In the Java programming
language, the objects may be referred to by a class literal
expression such as {@code int.class}.  The {@code Class} object
for void can be expressed as {@code void.class} or {@link
java.lang.Void#TYPE Void.TYPE}.

@return true if and only if this class represents a primitive type

@see     java.lang.Boolean#TYPE
@see     java.lang.Character#TYPE
@see     java.lang.Byte#TYPE
@see     java.lang.Short#TYPE
@see     java.lang.Integer#TYPE
@see     java.lang.Long#TYPE
@see     java.lang.Float#TYPE
@see     java.lang.Double#TYPE
@see     java.lang.Void#TYPE
@since 1.1
@jls 15.8.2 Class Literals

## Class.isAnnotation()

```java
public boolean isAnnotation()
```

Returns true if this {@code Class} object represents an annotation
interface.  Note that if this method returns true, {@link #isInterface()}
would also return true, as all annotation interfaces are also interfaces.

@return {@code true} if this {@code Class} object represents an annotation
     interface; {@code false} otherwise
@since 1.5

## Class.isSynthetic()

```java
public boolean isSynthetic()
```

{@return {@code true} if and only if this class has the synthetic modifier
bit set}

@jls 13.1 The Form of a Binary
@jvms 4.1 The {@code ClassFile} Structure
@see <a
href="{@docRoot}/java.base/java/lang/reflect/package-summary.html#LanguageJvmModel">Java
programming language and JVM modeling in core reflection</a>
@since 1.5

## Class.getName()

```java
public String getName()
```

Returns the  name of the entity (class, interface, array class,
primitive type, or void) represented by this {@code Class} object.

<p> If this {@code Class} object represents a class or interface,
not an array class, then:
<ul>
<li> If the class or interface is not {@linkplain #isHidden() hidden},
     then the {@linkplain ClassLoader##binary-name binary name}
     of the class or interface is returned.
<li> If the class or interface is hidden, then the result is a string
     of the form: {@code N + '/' + <suffix>}
     where {@code N} is the {@linkplain ClassLoader##binary-name binary name}
     indicated by the {@code class} file passed to
     {@link java.lang.invoke.MethodHandles.Lookup#defineHiddenClass(byte[], boolean, MethodHandles.Lookup.ClassOption...)
     Lookup::defineHiddenClass}, and {@code <suffix>} is an unqualified name.
</ul>

<p> If this {@code Class} object represents an array class, then
the result is a string consisting of one or more '{@code [}' characters
representing the depth of the array nesting, followed by the element
type as encoded using the following table:

<blockquote><table class="striped" id="nameFormat">
<caption style="display:none">Element types and encodings</caption>
<thead>
<tr><th scope="col"> Element Type <th scope="col"> Encoding
</thead>
<tbody style="text-align:left">
<tr><th scope="row"> {@code boolean} <td style="text-align:center"> {@code Z}
<tr><th scope="row"> {@code byte}    <td style="text-align:center"> {@code B}
<tr><th scope="row"> {@code char}    <td style="text-align:center"> {@code C}
<tr><th scope="row"> class or interface with {@linkplain ClassLoader##binary-name binary name} <i>N</i>
                                     <td style="text-align:center"> {@code L}<em>N</em>{@code ;}
<tr><th scope="row"> {@code double}  <td style="text-align:center"> {@code D}
<tr><th scope="row"> {@code float}   <td style="text-align:center"> {@code F}
<tr><th scope="row"> {@code int}     <td style="text-align:center"> {@code I}
<tr><th scope="row"> {@code long}    <td style="text-align:center"> {@code J}
<tr><th scope="row"> {@code short}   <td style="text-align:center"> {@code S}
</tbody>
</table></blockquote>

<p> If this {@code Class} object represents a primitive type or {@code void},
then the result is a string with the same spelling as the Java language
keyword which corresponds to the primitive type or {@code void}.

<p> Examples:
<blockquote><pre>
String.class.getName()
    returns "java.lang.String"
Character.UnicodeBlock.class.getName()
    returns "java.lang.Character$UnicodeBlock"
byte.class.getName()
    returns "byte"
(new Object[3]).getClass().getName()
    returns "[Ljava.lang.Object;"
(new int[3][4][5][6][7][8][9]).getClass().getName()
    returns "[[[[[[[I"
</pre></blockquote>

@apiNote
Distinct class objects can have the same name but different class loaders.

@return  the name of the class, interface, or other entity
         represented by this {@code Class} object.
@jls 13.1 The Form of a Binary

## Class.getClassLoader()

```java
public ClassLoader getClassLoader()
```

Returns the class loader for the class.  Some implementations may use
null to represent the bootstrap class loader. This method will return
null in such implementations if this class was loaded by the bootstrap
class loader.

<p>If this {@code Class} object
represents a primitive type or void, null is returned.

@return  the class loader that loaded the class or interface
         represented by this {@code Class} object.
@see java.lang.ClassLoader

## Class.getModule()

```java
public Module getModule()
```

Returns the module that this class or interface is a member of.

If this class represents an array type then this method returns the
{@code Module} for the element type. If this class represents a
primitive type or void, then the {@code Module} object for the
{@code java.base} module is returned.

If this class is in an unnamed module then the {@linkplain
ClassLoader#getUnnamedModule() unnamed} {@code Module} of the class
loader for this class is returned.

@return the module that this class or interface is a member of

@since 9

## Class.getTypeParameters()

```java
public TypeVariable<Class<T>>[] getTypeParameters()
```

Returns an array of {@code TypeVariable} objects that represent the
type variables declared by the generic declaration represented by this
{@code GenericDeclaration} object, in declaration order.  Returns an
array of length 0 if the underlying generic declaration declares no type
variables.

@return an array of {@code TypeVariable} objects that represent
    the type variables declared by this generic declaration
@throws java.lang.reflect.GenericSignatureFormatError if the generic
    signature of this generic declaration does not conform to
    the format specified in section {@jvms 4.7.9} of
    <cite>The Java Virtual Machine Specification</cite>
@since 1.5

## Class.getSuperclass()

```java
public native Class<? super T> getSuperclass()
```

Returns the {@code Class} representing the direct superclass of the
entity (class, interface, primitive type or void) represented by
this {@code Class}.  If this {@code Class} represents either the
{@code Object} class, an interface, a primitive type, or void, then
null is returned.  If this {@code Class} object represents an array class
then the {@code Class} object representing the {@code Object} class is
returned.

@return the direct superclass of the class represented by this {@code Class} object

## Class.getGenericSuperclass()

```java
public Type getGenericSuperclass()
```

Returns the {@code Type} representing the direct superclass of
the entity (class, interface, primitive type or void) represented by
this {@code Class} object.

<p>If the superclass is a parameterized type, the {@code Type}
object returned must accurately reflect the actual type
arguments used in the source code. The parameterized type
representing the superclass is created if it had not been
created before. See the declaration of {@link
java.lang.reflect.ParameterizedType ParameterizedType} for the
semantics of the creation process for parameterized types.  If
this {@code Class} object represents either the {@code Object}
class, an interface, a primitive type, or void, then null is
returned.  If this {@code Class} object represents an array class
then the {@code Class} object representing the {@code Object} class is
returned.

@throws java.lang.reflect.GenericSignatureFormatError if the generic
    class signature does not conform to the format specified in
    section {@jvms 4.7.9} of <cite>The Java Virtual
    Machine Specification</cite>
@throws TypeNotPresentException if the generic superclass
    refers to a non-existent type declaration
@throws java.lang.reflect.MalformedParameterizedTypeException if the
    generic superclass refers to a parameterized type that cannot be
    instantiated  for any reason
@return the direct superclass of the class represented by this {@code Class} object
@since 1.5

## Class.getPackage()

```java
public Package getPackage()
```

Gets the package of this class.

<p>If this class represents an array type, a primitive type or void,
this method returns {@code null}.

@return the package of this class.

## Class.getPackageName()

```java
public String getPackageName()
```

Returns the fully qualified package name.

<p> If this class is a top level class, then this method returns the fully
qualified name of the package that the class is a member of, or the
empty string if the class is in an unnamed package.

<p> If this class is a member class, then this method is equivalent to
invoking {@code getPackageName()} on the {@linkplain #getEnclosingClass
enclosing class}.

<p> If this class is a {@linkplain #isLocalClass local class} or an {@linkplain
#isAnonymousClass() anonymous class}, then this method is equivalent to
invoking {@code getPackageName()} on the {@linkplain #getDeclaringClass
declaring class} of the {@linkplain #getEnclosingMethod enclosing method} or
{@linkplain #getEnclosingConstructor enclosing constructor}.

<p> If this class represents an array type then this method returns the
package name of the element type. If this class represents a primitive
type or void then the package name "{@code java.lang}" is returned.

@return the fully qualified package name

@since 9
@jls 6.7 Fully Qualified Names and Canonical Names

## Class.getInterfaces()

```java
public Class<?>[] getInterfaces()
```

Returns the interfaces directly implemented by the class or interface
represented by this {@code Class} object.

<p>If this {@code Class} object represents a class, the return value is an array
containing objects representing all interfaces directly implemented by
the class.  The order of the interface objects in the array corresponds
to the order of the interface names in the {@code implements} clause of
the declaration of the class represented by this {@code Class} object.  For example,
given the declaration:
<blockquote>
{@code class Shimmer implements FloorWax, DessertTopping { ... }}
</blockquote>
suppose the value of {@code s} is an instance of
{@code Shimmer}; the value of the expression:
<blockquote>
{@code s.getClass().getInterfaces()[0]}
</blockquote>
is the {@code Class} object that represents interface
{@code FloorWax}; and the value of:
<blockquote>
{@code s.getClass().getInterfaces()[1]}
</blockquote>
is the {@code Class} object that represents interface
{@code DessertTopping}.

<p>If this {@code Class} object represents an interface, the array contains objects
representing all interfaces directly extended by the interface.  The
order of the interface objects in the array corresponds to the order of
the interface names in the {@code extends} clause of the declaration of
the interface represented by this {@code Class} object.

<p>If this {@code Class} object represents a class or interface that implements no
interfaces, the method returns an array of length 0.

<p>If this {@code Class} object represents a primitive type or void, the method
returns an array of length 0.

<p>If this {@code Class} object represents an array type, the
interfaces {@code Cloneable} and {@code java.io.Serializable} are
returned in that order.

@return an array of interfaces directly implemented by this class

## Class.getGenericInterfaces()

```java
public Type[] getGenericInterfaces()
```

Returns the {@code Type}s representing the interfaces
directly implemented by the class or interface represented by
this {@code Class} object.

<p>If a superinterface is a parameterized type, the
{@code Type} object returned for it must accurately reflect
the actual type arguments used in the source code. The
parameterized type representing each superinterface is created
if it had not been created before. See the declaration of
{@link java.lang.reflect.ParameterizedType ParameterizedType}
for the semantics of the creation process for parameterized
types.

<p>If this {@code Class} object represents a class, the return value is an array
containing objects representing all interfaces directly implemented by
the class.  The order of the interface objects in the array corresponds
to the order of the interface names in the {@code implements} clause of
the declaration of the class represented by this {@code Class} object.

<p>If this {@code Class} object represents an interface, the array contains objects
representing all interfaces directly extended by the interface.  The
order of the interface objects in the array corresponds to the order of
the interface names in the {@code extends} clause of the declaration of
the interface represented by this {@code Class} object.

<p>If this {@code Class} object represents a class or interface that implements no
interfaces, the method returns an array of length 0.

<p>If this {@code Class} object represents a primitive type or void, the method
returns an array of length 0.

<p>If this {@code Class} object represents an array type, the
interfaces {@code Cloneable} and {@code java.io.Serializable} are
returned in that order.

@throws java.lang.reflect.GenericSignatureFormatError
    if the generic class signature does not conform to the
    format specified in section {@jvms 4.7.9} of <cite>The
    Java Virtual Machine Specification</cite>
@throws TypeNotPresentException if any of the generic
    superinterfaces refers to a non-existent type declaration
@throws java.lang.reflect.MalformedParameterizedTypeException
    if any of the generic superinterfaces refer to a parameterized
    type that cannot be instantiated for any reason
@return an array of interfaces directly implemented by this class
@since 1.5

## Class.getComponentType()

```java
public Class<?> getComponentType()
```

Returns the {@code Class} representing the component type of an
array.  If this class does not represent an array class this method
returns null.

@return the {@code Class} representing the component type of this
class if this class is an array
@see     java.lang.reflect.Array
@since 1.1

## Class.getModifiers()

```java
public int getModifiers()
```

Returns the Java language modifiers for this class or interface, encoded
in an integer. The modifiers consist of the Java Virtual Machine's
constants for {@code public}, {@code protected},
{@code private}, {@code final}, {@code static},
{@code abstract} and {@code interface}; they should be decoded
using the methods of class {@code Modifier}.

<p> If the underlying class is an array class:
<ul>
<li> its {@code public}, {@code private} and {@code protected}
     modifiers are the same as those of its component type
<li> its {@code abstract} and {@code final} modifiers are always
     {@code true}
<li> its interface modifier is always {@code false}, even when
     the component type is an interface
</ul>
If this {@code Class} object represents a primitive type or
void, its {@code public}, {@code abstract}, and {@code final}
modifiers are always {@code true}.
For {@code Class} objects representing void, primitive types, and
arrays, the values of other modifiers are {@code false} other
than as specified above.

<p> The modifier encodings are defined in section {@jvms 4.1}
of <cite>The Java Virtual Machine Specification</cite>.

@return the {@code int} representing the modifiers for this class
@see     java.lang.reflect.Modifier
@see #accessFlags()
@see <a
href="{@docRoot}/java.base/java/lang/reflect/package-summary.html#LanguageJvmModel">Java
programming language and JVM modeling in core reflection</a>
@since 1.1
@jls 8.1.1 Class Modifiers
@jls 9.1.1 Interface Modifiers
@jvms 4.1 The {@code ClassFile} Structure

## Class.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

{@return an unmodifiable set of the {@linkplain AccessFlag access
flags} for this class, possibly empty}

<p> If the underlying class is an array class:
<ul>
<li> its {@code PUBLIC}, {@code PRIVATE} and {@code PROTECTED}
     access flags are the same as those of its component type
<li> its {@code ABSTRACT} and {@code FINAL} flags are present
<li> its {@code INTERFACE} flag is absent, even when the
     component type is an interface
</ul>
If this {@code Class} object represents a primitive type or
void, the flags are {@code PUBLIC}, {@code ABSTRACT}, and
{@code FINAL}.
For {@code Class} objects representing void, primitive types, and
arrays, access flags are absent other than as specified above.

@see #getModifiers()
@jvms 4.1 The ClassFile Structure
@jvms 4.7.6 The InnerClasses Attribute
@since 20

## Class.getSigners()

```java
public Object[] getSigners()
```

Gets the signers of this class.

@return  the signers of this class, or null if there are no signers.  In
         particular, this method returns null if this {@code Class} object represents
         a primitive type or void.
@since   1.1

## Class.getEnclosingMethod()

```java
public Method getEnclosingMethod()
```

If this {@code Class} object represents a local or anonymous
class within a method, returns a {@link
java.lang.reflect.Method Method} object representing the
immediately enclosing method of the underlying class. Returns
{@code null} otherwise.

In particular, this method returns {@code null} if the underlying
class is a local or anonymous class immediately enclosed by a class or
interface declaration, instance initializer or static initializer.

@return the immediately enclosing method of the underlying class, if
    that class is a local or anonymous class; otherwise {@code null}.

@since 1.5

## Class.getEnclosingConstructor()

```java
public Constructor<?> getEnclosingConstructor()
```

If this {@code Class} object represents a local or anonymous
class within a constructor, returns a {@link
java.lang.reflect.Constructor Constructor} object representing
the immediately enclosing constructor of the underlying
class. Returns {@code null} otherwise.  In particular, this
method returns {@code null} if the underlying class is a local
or anonymous class immediately enclosed by a class or
interface declaration, instance initializer or static initializer.

@return the immediately enclosing constructor of the underlying class, if
    that class is a local or anonymous class; otherwise {@code null}.

@since 1.5

## Class.getDeclaringClass()

```java
public Class<?> getDeclaringClass()
```

If the class or interface represented by this {@code Class} object
is a member of another class, returns the {@code Class} object
representing the class in which it was declared.  This method returns
null if this class or interface is not a member of any other class.  If
this {@code Class} object represents an array class, a primitive
type, or void, then this method returns null.

@return the declaring class for this class
@since 1.1

## Class.getEnclosingClass()

```java
public Class<?> getEnclosingClass()
```

Returns the immediately enclosing class of the underlying
class.  If the underlying class is a top level class this
method returns {@code null}.
@return the immediately enclosing class of the underlying class
@since 1.5

## Class.getSimpleName()

```java
public String getSimpleName()
```

Returns the simple name of the underlying class as given in the
source code. An empty string is returned if the underlying class is
{@linkplain #isAnonymousClass() anonymous}.
A {@linkplain #isSynthetic() synthetic class}, one not present
in source code, can have a non-empty name including special
characters, such as "{@code $}".

<p>The simple name of an {@linkplain #isArray() array class} is the simple name of the
component type with "[]" appended.  In particular the simple
name of an array class whose component type is anonymous is "[]".

@return the simple name of the underlying class
@since 1.5

## Class.getTypeName()

```java
public String getTypeName()
```

Return an informative string for the name of this class or interface.

@return an informative string for the name of this class or interface
@since 1.8

## Class.getCanonicalName()

```java
public String getCanonicalName()
```

Returns the canonical name of the underlying class as
defined by <cite>The Java Language Specification</cite>.
Returns {@code null} if the underlying class does not have a canonical
name. Classes without canonical names include:
<ul>
<li>a {@linkplain #isLocalClass() local class}
<li>a {@linkplain #isAnonymousClass() anonymous class}
<li>a {@linkplain #isHidden() hidden class}
<li>an array whose component type does not have a canonical name</li>
</ul>

The canonical name for a primitive class is the keyword for the
corresponding primitive type ({@code byte}, {@code short},
{@code char}, {@code int}, and so on).

<p>An array type has a canonical name if and only if its
component type has a canonical name. When an array type has a
canonical name, it is equal to the canonical name of the
component type followed by "{@code []}".

@return the canonical name of the underlying class if it exists, and
{@code null} otherwise.
@jls 6.7 Fully Qualified Names and Canonical Names
@since 1.5

## Class.isAnonymousClass()

```java
public boolean isAnonymousClass()
```

Returns {@code true} if and only if the underlying class
is an anonymous class.

@apiNote
An anonymous class is not a {@linkplain #isHidden() hidden class}.

@return {@code true} if and only if this class is an anonymous class.
@since 1.5
@jls 15.9.5 Anonymous Class Declarations

## Class.isLocalClass()

```java
public boolean isLocalClass()
```

Returns {@code true} if and only if the underlying class
is a local class.

@return {@code true} if and only if this class is a local class.
@since 1.5
@jls 14.3 Local Class and Interface Declarations

## Class.isMemberClass()

```java
public boolean isMemberClass()
```

Returns {@code true} if and only if the underlying class
is a member class.

@return {@code true} if and only if this class is a member class.
@since 1.5
@jls 8.5 Member Class and Interface Declarations

## Class.getClasses()

```java
public Class<?>[] getClasses()
```

Returns an array containing {@code Class} objects representing all
the public classes and interfaces that are members of the class
represented by this {@code Class} object.  This includes public
class and interface members inherited from superclasses and public class
and interface members declared by the class.  This method returns an
array of length 0 if this {@code Class} object has no public member
classes or interfaces.  This method also returns an array of length 0 if
this {@code Class} object represents a primitive type, an array
class, or void.

@return the array of {@code Class} objects representing the public
        members of this class
@since 1.1

## Class.getFields()

```java
public Field[] getFields()
```

Returns an array containing {@code Field} objects reflecting all
the accessible public fields of the class or interface represented by
this {@code Class} object.

<p> If this {@code Class} object represents a class or interface with
no accessible public fields, then this method returns an array of length
0.

<p> If this {@code Class} object represents a class, then this method
returns the public fields of the class and of all its superclasses and
superinterfaces.

<p> If this {@code Class} object represents an interface, then this
method returns the fields of the interface and of all its
superinterfaces.

<p> If this {@code Class} object represents an array type, a primitive
type, or void, then this method returns an array of length 0.

<p> The elements in the returned array are not sorted and are not in any
particular order.

@return the array of {@code Field} objects representing the
        public fields

@since 1.1
@jls 8.2 Class Members
@jls 8.3 Field Declarations

## Class.getMethods()

```java
public Method[] getMethods()
```

Returns an array containing {@code Method} objects reflecting all the
public methods of the class or interface represented by this {@code
Class} object, including those declared by the class or interface and
those inherited from superclasses and superinterfaces.

<p> If this {@code Class} object represents an array type, then the
returned array has a {@code Method} object for each of the public
methods inherited by the array type from {@code Object}. It does not
contain a {@code Method} object for {@code clone()}.

<p> If this {@code Class} object represents an interface then the
returned array does not contain any implicitly declared methods from
{@code Object}. Therefore, if no methods are explicitly declared in
this interface or any of its superinterfaces then the returned array
has length 0. (Note that a {@code Class} object which represents a class
always has public methods, inherited from {@code Object}.)

<p> The returned array never contains methods with names {@value
ConstantDescs#INIT_NAME} or {@value ConstantDescs#CLASS_INIT_NAME}.

<p> The elements in the returned array are not sorted and are not in any
particular order.

<p> Generally, the result is computed as with the following 4 step algorithm.
Let C be the class or interface represented by this {@code Class} object:
<ol>
<li> A union of methods is composed of:
  <ol type="a">
  <li> C's declared public instance and static methods as returned by
       {@link #getDeclaredMethods()} and filtered to include only public
       methods.</li>
  <li> If C is a class other than {@code Object}, then include the result
       of invoking this algorithm recursively on the superclass of C.</li>
  <li> Include the results of invoking this algorithm recursively on all
       direct superinterfaces of C, but include only instance methods.</li>
  </ol></li>
<li> Union from step 1 is partitioned into subsets of methods with same
     signature (name, parameter types) and return type.</li>
<li> Within each such subset only the most specific methods are selected.
     Let method M be a method from a set of methods with same signature
     and return type. M is most specific if there is no such method
     N != M from the same set, such that N is more specific than M.
     N is more specific than M if:
  <ol type="a">
  <li> N is declared by a class and M is declared by an interface; or</li>
  <li> N and M are both declared by classes or both by interfaces and
       N's declaring type is the same as or a subtype of M's declaring type
       (clearly, if M's and N's declaring types are the same type, then
       M and N are the same method).</li>
  </ol></li>
<li> The result of this algorithm is the union of all selected methods from
     step 3.</li>
</ol>

@apiNote There may be more than one method with a particular name
and parameter types in a class because while the Java language forbids a
class to declare multiple methods with the same signature but different
return types, the Java virtual machine does not.  This
increased flexibility in the virtual machine can be used to
implement various language features.  For example, covariant
returns can be implemented with {@linkplain
java.lang.reflect.Method#isBridge bridge methods}; the bridge
method and the overriding method would have the same
signature but different return types.

@return the array of {@code Method} objects representing the
        public methods of this class

@jls 8.2 Class Members
@jls 8.4 Method Declarations
@since 1.1

## Class.getConstructors()

```java
public Constructor<?>[] getConstructors()
```

Returns an array containing {@code Constructor} objects reflecting
all the public constructors of the class represented by this
{@code Class} object.  An array of length 0 is returned if the
class has no public constructors, or if the class is an array class, or
if the class reflects a primitive type or void.

@apiNote
While this method returns an array of {@code
Constructor<T>} objects (that is an array of constructors from
this class), the return type of this method is {@code
Constructor<?>[]} and <em>not</em> {@code Constructor<T>[]} as
might be expected.  This less informative return type is
necessary since after being returned from this method, the
array could be modified to hold {@code Constructor} objects for
different classes, which would violate the type guarantees of
{@code Constructor<T>[]}.

@return the array of {@code Constructor} objects representing the
        public constructors of this class

@see #getDeclaredConstructors()
@since 1.1

## Class.getField(String)

```java
public Field getField(String name) throws NoSuchFieldException
```

Returns a {@code Field} object that reflects the specified public member
field of the class or interface represented by this {@code Class}
object. The {@code name} parameter is a {@code String} specifying the
simple name of the desired field.

<p> The field to be reflected is determined by the algorithm that
follows.  Let C be the class or interface represented by this {@code Class} object:

<OL>
<LI> If C declares a public field with the name specified, that is the
     field to be reflected.</LI>
<LI> If no field was found in step 1 above, this algorithm is applied
     recursively to each direct superinterface of C. The direct
     superinterfaces are searched in the order they were declared.</LI>
<LI> If no field was found in steps 1 and 2 above, and C has a
     superclass S, then this algorithm is invoked recursively upon S.
     If C has no superclass, then a {@code NoSuchFieldException}
     is thrown.</LI>
</OL>

<p> If this {@code Class} object represents an array type, then this
method does not find the {@code length} field of the array type.

@param name the field name
@return the {@code Field} object of this class specified by
        {@code name}
@throws NoSuchFieldException if a field with the specified name is
        not found.
@throws NullPointerException if {@code name} is {@code null}

@since 1.1
@jls 8.2 Class Members
@jls 8.3 Field Declarations

## Class.getMethod(String, Class<?>...)

```java
public Method getMethod(String name, Class<?>... parameterTypes) throws NoSuchMethodException
```

Returns a {@code Method} object that reflects the specified public
member method of the class or interface represented by this
{@code Class} object. The {@code name} parameter is a
{@code String} specifying the simple name of the desired method. The
{@code parameterTypes} parameter is an array of {@code Class}
objects that identify the method's formal parameter types, in declared
order. If {@code parameterTypes} is {@code null}, it is
treated as if it were an empty array.

<p> If this {@code Class} object represents an array type, then this
method finds any public method inherited by the array type from
{@code Object} except method {@code clone()}.

<p> If this {@code Class} object represents an interface then this
method does not find any implicitly declared method from
{@code Object}. Therefore, if no methods are explicitly declared in
this interface or any of its superinterfaces, then this method does not
find any method.

<p> This method does not find any method with name {@value
ConstantDescs#INIT_NAME} or {@value ConstantDescs#CLASS_INIT_NAME}.

<p> Generally, the method to be reflected is determined by the 4 step
algorithm that follows.
Let C be the class or interface represented by this {@code Class} object:
<ol>
<li> A union of methods is composed of:
  <ol type="a">
  <li> C's declared public instance and static methods as returned by
       {@link #getDeclaredMethods()} and filtered to include only public
       methods that match given {@code name} and {@code parameterTypes}</li>
  <li> If C is a class other than {@code Object}, then include the result
       of invoking this algorithm recursively on the superclass of C.</li>
  <li> Include the results of invoking this algorithm recursively on all
       direct superinterfaces of C, but include only instance methods.</li>
  </ol></li>
<li> This union is partitioned into subsets of methods with same
     return type (the selection of methods from step 1 also guarantees that
     they have the same method name and parameter types).</li>
<li> Within each such subset only the most specific methods are selected.
     Let method M be a method from a set of methods with same VM
     signature (return type, name, parameter types).
     M is most specific if there is no such method N != M from the same
     set, such that N is more specific than M. N is more specific than M
     if:
  <ol type="a">
  <li> N is declared by a class and M is declared by an interface; or</li>
  <li> N and M are both declared by classes or both by interfaces and
       N's declaring type is the same as or a subtype of M's declaring type
       (clearly, if M's and N's declaring types are the same type, then
       M and N are the same method).</li>
  </ol></li>
<li> The result of this algorithm is chosen arbitrarily from the methods
     with most specific return type among all selected methods from step 3.
     Let R be a return type of a method M from the set of all selected methods
     from step 3. M is a method with most specific return type if there is
     no such method N != M from the same set, having return type S != R,
     such that S is a subtype of R as determined by
     R.class.{@link #isAssignableFrom}(S.class).
</ol>

@apiNote There may be more than one method with matching name and
parameter types in a class because while the Java language forbids a
class to declare multiple methods with the same signature but different
return types, the Java virtual machine does not.  This
increased flexibility in the virtual machine can be used to
implement various language features.  For example, covariant
returns can be implemented with {@linkplain
java.lang.reflect.Method#isBridge bridge methods}; the bridge
method and the overriding method would have the same
signature but different return types. This method would return the
overriding method as it would have a more specific return type.

@param name the name of the method
@param parameterTypes the list of parameters
@return the {@code Method} object that matches the specified
        {@code name} and {@code parameterTypes}
@throws NoSuchMethodException if a matching method is not found
        or if the name is {@value ConstantDescs#INIT_NAME} or
        {@value ConstantDescs#CLASS_INIT_NAME}.
@throws NullPointerException if {@code name} is {@code null}

@jls 8.2 Class Members
@jls 8.4 Method Declarations
@since 1.1

## Class.getConstructor(Class<?>...)

```java
public Constructor<T> getConstructor(Class<?>... parameterTypes) throws NoSuchMethodException
```

Returns a {@code Constructor} object that reflects the specified
public constructor of the class represented by this {@code Class}
object. The {@code parameterTypes} parameter is an array of
{@code Class} objects that identify the constructor's formal
parameter types, in declared order.

If this {@code Class} object represents an inner class
declared in a non-static context, the formal parameter types
include the explicit enclosing instance as the first parameter.

<p> The constructor to reflect is the public constructor of the class
represented by this {@code Class} object whose formal parameter
types match those specified by {@code parameterTypes}.

@param parameterTypes the parameter array
@return the {@code Constructor} object of the public constructor that
        matches the specified {@code parameterTypes}
@throws NoSuchMethodException if a matching constructor is not found,
        including when this {@code Class} object represents
        an interface, a primitive type, an array class, or void.

@see #getDeclaredConstructor(Class[])
@since 1.1

## Class.getDeclaredClasses()

```java
public Class<?>[] getDeclaredClasses()
```

Returns an array of {@code Class} objects reflecting all the
classes and interfaces declared as members of the class represented by
this {@code Class} object. This includes public, protected, default
(package) access, and private classes and interfaces declared by the
class, but excludes inherited classes and interfaces.  This method
returns an array of length 0 if the class declares no classes or
interfaces as members, or if this {@code Class} object represents a
primitive type, an array class, or void.

@return the array of {@code Class} objects representing all the
        declared members of this class

@since 1.1
@jls 8.5 Member Class and Interface Declarations

## Class.getDeclaredFields()

```java
public Field[] getDeclaredFields()
```

Returns an array of {@code Field} objects reflecting all the fields
declared by the class or interface represented by this
{@code Class} object. This includes public, protected, default
(package) access, and private fields, but excludes inherited fields.

<p> If this {@code Class} object represents a class or interface with no
declared fields, then this method returns an array of length 0.

<p> If this {@code Class} object represents an array type, a primitive
type, or void, then this method returns an array of length 0.

<p> The elements in the returned array are not sorted and are not in any
particular order.

@return  the array of {@code Field} objects representing all the
         declared fields of this class

@since 1.1
@jls 8.2 Class Members
@jls 8.3 Field Declarations

## Class.getRecordComponents()

```java
public RecordComponent[] getRecordComponents()
```

Returns an array of {@code RecordComponent} objects representing all the
record components of this record class, or {@code null} if this class is
not a record class.

<p> The components are returned in the same order that they are declared
in the record header. The array is empty if this record class has no
components. If the class is not a record class, that is {@link
#isRecord()} returns {@code false}, then this method returns {@code null}.
Conversely, if {@link #isRecord()} returns {@code true}, then this method
returns a non-null value.

@apiNote
<p> The following method can be used to find the record canonical constructor:

{@snippet lang="java" :
static <T extends Record> Constructor<T> getCanonicalConstructor(Class<T> cls)
    throws NoSuchMethodException {
  Class<?>[] paramTypes =
    Arrays.stream(cls.getRecordComponents())
          .map(RecordComponent::getType)
          .toArray(Class<?>[]::new);
  return cls.getDeclaredConstructor(paramTypes);
}}

@return  An array of {@code RecordComponent} objects representing all the
         record components of this record class, or {@code null} if this
         class is not a record class

@jls 8.10 Record Classes
@since 16

## Class.getDeclaredMethods()

```java
public Method[] getDeclaredMethods()
```

Returns an array containing {@code Method} objects reflecting all the
declared methods of the class or interface represented by this {@code
Class} object, including public, protected, default (package)
access, and private methods, but excluding inherited methods.
The declared methods may include methods <em>not</em> in the
source of the class or interface, including {@linkplain
Method#isBridge bridge methods} and other {@linkplain
Executable#isSynthetic synthetic} methods added by compilers.

<p> If this {@code Class} object represents a class or interface that
has multiple declared methods with the same name and parameter types,
but different return types, then the returned array has a {@code Method}
object for each such method.

<p> If this {@code Class} object represents a class or interface that
has a class initialization method {@value ConstantDescs#CLASS_INIT_NAME},
then the returned array does <em>not</em> have a corresponding {@code
Method} object.

<p> If this {@code Class} object represents a class or interface with no
declared methods, then the returned array has length 0.

<p> If this {@code Class} object represents an array type, a primitive
type, or void, then the returned array has length 0.

<p> The elements in the returned array are not sorted and are not in any
particular order.

@return  the array of {@code Method} objects representing all the
         declared methods of this class

@jls 8.2 Class Members
@jls 8.4 Method Declarations
@see <a
href="{@docRoot}/java.base/java/lang/reflect/package-summary.html#LanguageJvmModel">Java
programming language and JVM modeling in core reflection</a>
@since 1.1

## Class.getDeclaredConstructors()

```java
public Constructor<?>[] getDeclaredConstructors()
```

Returns an array of {@code Constructor} objects reflecting all the
constructors implicitly or explicitly declared by the class represented by this
{@code Class} object. These are public, protected, default
(package) access, and private constructors.  The elements in the array
returned are not sorted and are not in any particular order.  If the
class has a default constructor (JLS {@jls 8.8.9}), it is included in the returned array.
If a record class has a canonical constructor (JLS {@jls
8.10.4.1}, {@jls 8.10.4.2}), it is included in the returned array.

This method returns an array of length 0 if this {@code Class}
object represents an interface, a primitive type, an array class, or
void.

@return  the array of {@code Constructor} objects representing all the
         declared constructors of this class

@since 1.1
@see #getConstructors()
@jls 8.8 Constructor Declarations

## Class.getDeclaredField(String)

```java
public Field getDeclaredField(String name) throws NoSuchFieldException
```

Returns a {@code Field} object that reflects the specified declared
field of the class or interface represented by this {@code Class}
object. The {@code name} parameter is a {@code String} that specifies
the simple name of the desired field.

<p> If this {@code Class} object represents an array type, then this
method does not find the {@code length} field of the array type.

@param name the name of the field
@return  the {@code Field} object for the specified field in this
         class
@throws  NoSuchFieldException if a field with the specified name is
         not found.
@throws  NullPointerException if {@code name} is {@code null}

@since 1.1
@jls 8.2 Class Members
@jls 8.3 Field Declarations

## Class.getDeclaredMethod(String, Class<?>...)

```java
public Method getDeclaredMethod(String name, Class<?>... parameterTypes) throws NoSuchMethodException
```

Returns a {@code Method} object that reflects the specified
declared method of the class or interface represented by this
{@code Class} object. The {@code name} parameter is a
{@code String} that specifies the simple name of the desired
method, and the {@code parameterTypes} parameter is an array of
{@code Class} objects that identify the method's formal parameter
types, in declared order.  If more than one method with the same
parameter types is declared in a class, and one of these methods has a
return type that is more specific than any of the others, that method is
returned; otherwise one of the methods is chosen arbitrarily.  If the
name is {@value ConstantDescs#INIT_NAME} or {@value
ConstantDescs#CLASS_INIT_NAME} a {@code NoSuchMethodException}
is raised.

<p> If this {@code Class} object represents an array type, then this
method does not find the {@code clone()} method.

@param name the name of the method
@param parameterTypes the parameter array
@return  the {@code Method} object for the method of this class
         matching the specified name and parameters
@throws  NoSuchMethodException if a matching method is not found.
@throws  NullPointerException if {@code name} is {@code null}

@jls 8.2 Class Members
@jls 8.4 Method Declarations
@since 1.1

## Class.getDeclaredConstructor(Class<?>...)

```java
public Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes) throws NoSuchMethodException
```

Returns a {@code Constructor} object that reflects the specified
constructor of the class represented by this
{@code Class} object.  The {@code parameterTypes} parameter is
an array of {@code Class} objects that identify the constructor's
formal parameter types, in declared order.

If this {@code Class} object represents an inner class
declared in a non-static context, the formal parameter types
include the explicit enclosing instance as the first parameter.

@param parameterTypes the parameter array
@return  The {@code Constructor} object for the constructor with the
         specified parameter list
@throws  NoSuchMethodException if a matching constructor is not found,
         including when this {@code Class} object represents
         an interface, a primitive type, an array class, or void.

@see #getConstructor(Class[])
@since 1.1

## Class.getResourceAsStream(String)

```java
public InputStream getResourceAsStream(String name)
```

Finds a resource with a given name.

<p> If this class is in a named {@link Module Module} then this method
will attempt to find the resource in the module. This is done by
delegating to the module's class loader {@link
ClassLoader#findResource(String,String) findResource(String,String)}
method, invoking it with the module name and the absolute name of the
resource. Resources in named modules are subject to the rules for
encapsulation specified in the {@code Module} {@link
Module#getResourceAsStream getResourceAsStream} method and so this
method returns {@code null} when the resource is a
non-"{@code .class}" resource in a package that is not open to the
caller's module.

<p> Otherwise, if this class is not in a named module then the rules for
searching resources associated with a given class are implemented by the
defining {@linkplain ClassLoader class loader} of the class.  This method
delegates to this {@code Class} object's class loader.
If this {@code Class} object was loaded by the bootstrap class loader,
the method delegates to {@link ClassLoader#getSystemResourceAsStream}.

<p> Before delegation, an absolute resource name is constructed from the
given resource name using this algorithm:

<ul>

<li> If the {@code name} begins with a {@code '/'}
(<code>'&#92;u002f'</code>), then the absolute name of the resource is the
portion of the {@code name} following the {@code '/'}.

<li> Otherwise, the absolute name is of the following form:

<blockquote>
  {@code modified_package_name/name}
</blockquote>

<p> Where the {@code modified_package_name} is the package name of this
object with {@code '/'} substituted for {@code '.'}
(<code>'&#92;u002e'</code>).

</ul>

@param  name name of the desired resource
@return  A {@link java.io.InputStream} object; {@code null} if no
         resource with this name is found, or the resource is in a package
         that is not {@linkplain Module#isOpen(String, Module) open} to at
         least the caller module.
@throws  NullPointerException If {@code name} is {@code null}

@see Module#getResourceAsStream(String)
@since  1.1

## Class.getResource(String)

```java
public URL getResource(String name)
```

Finds a resource with a given name.

<p> If this class is in a named {@link Module Module} then this method
will attempt to find the resource in the module. This is done by
delegating to the module's class loader {@link
ClassLoader#findResource(String,String) findResource(String,String)}
method, invoking it with the module name and the absolute name of the
resource. Resources in named modules are subject to the rules for
encapsulation specified in the {@code Module} {@link
Module#getResourceAsStream getResourceAsStream} method and so this
method returns {@code null} when the resource is a
non-"{@code .class}" resource in a package that is not open to the
caller's module.

<p> Otherwise, if this class is not in a named module then the rules for
searching resources associated with a given class are implemented by the
defining {@linkplain ClassLoader class loader} of the class.  This method
delegates to this {@code Class} object's class loader.
If this {@code Class} object was loaded by the bootstrap class loader,
the method delegates to {@link ClassLoader#getSystemResource}.

<p> Before delegation, an absolute resource name is constructed from the
given resource name using this algorithm:

<ul>

<li> If the {@code name} begins with a {@code '/'}
(<code>'&#92;u002f'</code>), then the absolute name of the resource is the
portion of the {@code name} following the {@code '/'}.

<li> Otherwise, the absolute name is of the following form:

<blockquote>
  {@code modified_package_name/name}
</blockquote>

<p> Where the {@code modified_package_name} is the package name of this
object with {@code '/'} substituted for {@code '.'}
(<code>'&#92;u002e'</code>).

</ul>

@param  name name of the desired resource
@return A {@link java.net.URL} object; {@code null} if no resource with
        this name is found, the resource cannot be located by a URL, or the
        resource is in a package that is not
        {@linkplain Module#isOpen(String, Module) open} to at least the caller
        module.
@throws NullPointerException If {@code name} is {@code null}
@since  1.1

## Class.getProtectionDomain()

```java
public ProtectionDomain getProtectionDomain()
```

Returns the {@code ProtectionDomain} of this class.

@return the ProtectionDomain of this class

@see java.security.ProtectionDomain
@since 1.2

## Class.desiredAssertionStatus()

```java
public boolean desiredAssertionStatus()
```

Returns the assertion status that would be assigned to this
class if it were to be initialized at the time this method is invoked.
If this class has had its assertion status set, the most recent
setting will be returned; otherwise, if any package default assertion
status pertains to this class, the most recent setting for the most
specific pertinent package default assertion status is returned;
otherwise, if this class is not a system class (i.e., it has a
class loader) its class loader's default assertion status is returned;
otherwise, the system class default assertion status is returned.

@apiNote
Few programmers will have any need for this method; it is provided
for the benefit of the JDK itself.  (It allows a class to determine at
the time that it is initialized whether assertions should be enabled.)
Note that this method is not guaranteed to return the actual
assertion status that was (or will be) associated with the specified
class when it was (or will be) initialized.

@return the desired assertion status of the specified class.
@see    java.lang.ClassLoader#setClassAssertionStatus
@see    java.lang.ClassLoader#setPackageAssertionStatus
@see    java.lang.ClassLoader#setDefaultAssertionStatus
@since  1.4

## Class.isEnum()

```java
public boolean isEnum()
```

Returns true if and only if this class was declared as an enum in the
source code.

Note that {@link java.lang.Enum} is not itself an enum class.

Also note that if an enum constant is declared with a class body,
the class of that enum constant object is an anonymous class
and <em>not</em> the class of the declaring enum class. The
{@link Enum#getDeclaringClass} method of an enum constant can
be used to get the class of the enum class declaring the
constant.

@return true if and only if this class was declared as an enum in the
    source code
@since 1.5
@jls 8.9.1 Enum Constants

## Class.isRecord()

```java
public boolean isRecord()
```

Returns {@code true} if and only if this class is a record class.

<p> The {@linkplain #getSuperclass() direct superclass} of a record
class is {@code java.lang.Record}. A record class is {@linkplain
Modifier#FINAL final}. A record class has (possibly zero) record
components; {@link #getRecordComponents()} returns a non-null but
possibly empty value for a record.

<p> Note that class {@link Record} is not a record class and thus
invoking this method on class {@code Record} returns {@code false}.

@return true if and only if this class is a record class, otherwise false
@jls 8.10 Record Classes
@since 16

## Class.getEnumConstants()

```java
public T[] getEnumConstants()
```

Returns the elements of this enum class or null if this
Class object does not represent an enum class.

@return an array containing the values comprising the enum class
    represented by this {@code Class} object in the order they're
    declared, or null if this {@code Class} object does not
    represent an enum class
@since 1.5
@jls 8.9.1 Enum Constants

## Class.cast(Object)

```java
public T cast(Object obj)
```

Casts an object to the class or interface represented
by this {@code Class} object.

@param obj the object to be cast
@return the object after casting, or null if obj is null

@throws ClassCastException if the object is not
null and is not assignable to the type T.

@since 1.5

## Class.asSubclass(Class<U>)

```java
public <U> Class<? extends U> asSubclass(Class<U> clazz)
```

Casts this {@code Class} object to represent a subclass of the class
represented by the specified class object.  Checks that the cast
is valid, and throws a {@code ClassCastException} if it is not.  If
this method succeeds, it always returns a reference to this {@code Class} object.

<p>This method is useful when a client needs to "narrow" the type of
a {@code Class} object to pass it to an API that restricts the
{@code Class} objects that it is willing to accept.  A cast would
generate a compile-time warning, as the correctness of the cast
could not be checked at runtime (because generic types are implemented
by erasure).

@param <U> the type to cast this {@code Class} object to
@param clazz the class of the type to cast this {@code Class} object to
@return this {@code Class} object, cast to represent a subclass of
   the specified class object.
@throws ClassCastException if this {@code Class} object does not
   represent a subclass of the specified class (here "subclass" includes
   the class itself).
@since 1.5

## Class.getAnnotation(Class<A>)

```java
public <A extends Annotation> A getAnnotation(Class<A> annotationClass)
```

{@inheritDoc}
<p>Note that any annotation returned by this method is a
declaration annotation.

@throws NullPointerException {@inheritDoc}
@since 1.5

## Class.isAnnotationPresent(Class<? extends Annotation>)

```java
public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass)
```

{@inheritDoc}
@throws NullPointerException {@inheritDoc}
@since 1.5

## Class.getAnnotationsByType(Class<A>)

```java
public <A extends Annotation> A[] getAnnotationsByType(Class<A> annotationClass)
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.

@throws NullPointerException {@inheritDoc}
@since 1.8

## Class.getAnnotations()

```java
public Annotation[] getAnnotations()
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.

@since 1.5

## Class.getDeclaredAnnotation(Class<A>)

```java
public <A extends Annotation> A getDeclaredAnnotation(Class<A> annotationClass)
```

{@inheritDoc}
<p>Note that any annotation returned by this method is a
declaration annotation.

@throws NullPointerException {@inheritDoc}
@since 1.8

## Class.getDeclaredAnnotationsByType(Class<A>)

```java
public <A extends Annotation> A[] getDeclaredAnnotationsByType(Class<A> annotationClass)
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.

@throws NullPointerException {@inheritDoc}
@since 1.8

## Class.getDeclaredAnnotations()

```java
public Annotation[] getDeclaredAnnotations()
```

{@inheritDoc}
<p>Note that any annotations returned by this method are
declaration annotations.

@since 1.5

## Class.getAnnotatedSuperclass()

```java
public AnnotatedType getAnnotatedSuperclass()
```

Returns an {@code AnnotatedType} object that represents the use of a
type to specify the superclass of the entity represented by this {@code
Class} object. (The <em>use</em> of type Foo to specify the superclass
in '...  extends Foo' is distinct from the <em>declaration</em> of class
Foo.)

<p> If this {@code Class} object represents a class whose declaration
does not explicitly indicate an annotated superclass, then the return
value is an {@code AnnotatedType} object representing an element with no
annotations.

<p> If this {@code Class} represents either the {@code Object} class, an
interface type, an array type, a primitive type, or void, the return
value is {@code null}.

@return an object representing the superclass
@since 1.8

## Class.getAnnotatedInterfaces()

```java
public AnnotatedType[] getAnnotatedInterfaces()
```

Returns an array of {@code AnnotatedType} objects that represent the use
of types to specify superinterfaces of the entity represented by this
{@code Class} object. (The <em>use</em> of type Foo to specify a
superinterface in '... implements Foo' is distinct from the
<em>declaration</em> of interface Foo.)

<p> If this {@code Class} object represents a class, the return value is
an array containing objects representing the uses of interface types to
specify interfaces implemented by the class. The order of the objects in
the array corresponds to the order of the interface types used in the
'implements' clause of the declaration of this {@code Class} object.

<p> If this {@code Class} object represents an interface, the return
value is an array containing objects representing the uses of interface
types to specify interfaces directly extended by the interface. The
order of the objects in the array corresponds to the order of the
interface types used in the 'extends' clause of the declaration of this
{@code Class} object.

<p> If this {@code Class} object represents a class or interface whose
declaration does not explicitly indicate any annotated superinterfaces,
the return value is an array of length 0.

<p> If this {@code Class} object represents either the {@code Object}
class, an array type, a primitive type, or void, the return value is an
array of length 0.

@return an array representing the superinterfaces
@since 1.8

## Class.getNestHost()

```java
public Class<?> getNestHost()
```

Returns the nest host of the <a href=#nest>nest</a> to which the class
or interface represented by this {@code Class} object belongs.
Every class and interface belongs to exactly one nest.

If the nest host of this class or interface has previously
been determined, then this method returns the nest host.
If the nest host of this class or interface has
not previously been determined, then this method determines the nest
host using the algorithm of JVMS 5.4.4, and returns it.

Often, a class or interface belongs to a nest consisting only of itself,
in which case this method returns {@code this} to indicate that the class
or interface is the nest host.

<p>If this {@code Class} object represents a primitive type, an array type,
or {@code void}, then this method returns {@code this},
indicating that the represented entity belongs to the nest consisting only of
itself, and is the nest host.

@return the nest host of this class or interface

@since 11
@jvms 4.7.28 The {@code NestHost} Attribute
@jvms 4.7.29 The {@code NestMembers} Attribute
@jvms 5.4.4 Access Control

## Class.isNestmateOf(Class<?>)

```java
public boolean isNestmateOf(Class<?> c)
```

Determines if the given {@code Class} is a nestmate of the
class or interface represented by this {@code Class} object.
Two classes or interfaces are nestmates
if they have the same {@linkplain #getNestHost() nest host}.

@param c the class to check
@return {@code true} if this class and {@code c} are members of
the same nest; and {@code false} otherwise.

@since 11

## Class.getNestMembers()

```java
public Class<?>[] getNestMembers()
```

Returns an array containing {@code Class} objects representing all the
classes and interfaces that are members of the nest to which the class
or interface represented by this {@code Class} object belongs.

First, this method obtains the {@linkplain #getNestHost() nest host},
{@code H}, of the nest to which the class or interface represented by
this {@code Class} object belongs. The zeroth element of the returned
array is {@code H}.

Then, for each class or interface {@code C} which is recorded by {@code H}
as being a member of its nest, this method attempts to obtain the {@code Class}
object for {@code C} (using {@linkplain #getClassLoader() the defining class
loader} of the current {@code Class} object), and then obtains the
{@linkplain #getNestHost() nest host} of the nest to which {@code C} belongs.
The classes and interfaces which are recorded by {@code H} as being members
of its nest, and for which {@code H} can be determined as their nest host,
are indicated by subsequent elements of the returned array. The order of
such elements is unspecified. Duplicates are permitted.

<p>If this {@code Class} object represents a primitive type, an array type,
or {@code void}, then this method returns a single-element array containing
{@code this}.

@apiNote
The returned array includes only the nest members recorded in the {@code NestMembers}
attribute, and not any hidden classes that were added to the nest via
{@link MethodHandles.Lookup#defineHiddenClass(byte[], boolean, MethodHandles.Lookup.ClassOption...)
Lookup::defineHiddenClass}.

@return an array of all classes and interfaces in the same nest as
this class or interface

@since 11
@see #getNestHost()
@jvms 4.7.28 The {@code NestHost} Attribute
@jvms 4.7.29 The {@code NestMembers} Attribute

## Class.descriptorString()

```java
public String descriptorString()
```

Returns the descriptor string of the entity (class, interface, array class,
primitive type, or {@code void}) represented by this {@code Class} object.

<p> If this {@code Class} object represents a class or interface,
not an array class, then:
<ul>
<li> If the class or interface is not {@linkplain Class#isHidden() hidden},
     then the result is a field descriptor (JVMS {@jvms 4.3.2})
     for the class or interface. Calling
     {@link ClassDesc#ofDescriptor(String) ClassDesc::ofDescriptor}
     with the result descriptor string produces a {@link ClassDesc ClassDesc}
     describing this class or interface.
<li> If the class or interface is {@linkplain Class#isHidden() hidden},
     then the result is a string of the form:
     <blockquote>
     {@code "L" +} <em>N</em> {@code + "." + <suffix> + ";"}
     </blockquote>
     where <em>N</em> is the {@linkplain ClassLoader##binary-name binary name}
     encoded in internal form indicated by the {@code class} file passed to
     {@link MethodHandles.Lookup#defineHiddenClass(byte[], boolean, MethodHandles.Lookup.ClassOption...)
     Lookup::defineHiddenClass}, and {@code <suffix>} is an unqualified name.
     A hidden class or interface has no {@linkplain ClassDesc nominal descriptor}.
     The result string is not a type descriptor.
</ul>

<p> If this {@code Class} object represents an array class, then
the result is a string consisting of one or more '{@code [}' characters
representing the depth of the array nesting, followed by the
descriptor string of the element type.
<ul>
<li> If the element type is not a {@linkplain Class#isHidden() hidden} class
or interface, then this array class can be described nominally.
Calling {@link ClassDesc#ofDescriptor(String) ClassDesc::ofDescriptor}
with the result descriptor string produces a {@link ClassDesc ClassDesc}
describing this array class.
<li> If the element type is a {@linkplain Class#isHidden() hidden} class or
interface, then this array class cannot be described nominally.
The result string is not a type descriptor.
</ul>

<p> If this {@code Class} object represents a primitive type or
{@code void}, then the result is a field descriptor string which
is a one-letter code corresponding to a primitive type or {@code void}
({@code "B", "C", "D", "F", "I", "J", "S", "Z", "V"}) (JVMS {@jvms 4.3.2}).

@return the descriptor string for this {@code Class} object
@jvms 4.3.2 Field Descriptors
@since 12

## Class.componentType()

```java
public Class<?> componentType()
```

Returns the component type of this {@code Class}, if it describes
an array type, or {@code null} otherwise.

@implSpec
Equivalent to {@link Class#getComponentType()}.

@return a {@code Class} describing the component type, or {@code null}
if this {@code Class} does not describe an array type
@since 12

## Class.arrayType()

```java
public Class<?> arrayType()
```

Returns a {@code Class} for an array type whose component type
is described by this {@linkplain Class}.

@throws UnsupportedOperationException if this component type is {@linkplain
        Void#TYPE void} or if the number of dimensions of the resulting array
        type would exceed 255.
@return a {@code Class} describing the array type
@jvms 4.3.2 Field Descriptors
@jvms 4.4.1 The {@code CONSTANT_Class_info} Structure
@since 12

## Class.describeConstable()

```java
public Optional<ClassDesc> describeConstable()
```

Returns a nominal descriptor for this instance, if one can be
constructed, or an empty {@link Optional} if one cannot be.

@return An {@link Optional} containing the resulting nominal descriptor,
or an empty {@link Optional} if one cannot be constructed.
@since 12

## Class.isHidden()

```java
public native boolean isHidden()
```

Returns {@code true} if and only if the underlying class is a hidden class.

@return {@code true} if and only if this class is a hidden class.

@since 15
@see MethodHandles.Lookup#defineHiddenClass
@see Class##hiddenClasses Hidden Classes

## Class.getPermittedSubclasses()

```java
public Class<?>[] getPermittedSubclasses()
```

Returns an array containing {@code Class} objects representing the
direct subinterfaces or subclasses permitted to extend or
implement this class or interface if it is sealed.  The order of such elements
is unspecified. The array is empty if this sealed class or interface has no
permitted subclass. If this {@code Class} object represents a primitive type,
{@code void}, an array type, or a class or interface that is not sealed,
that is {@link #isSealed()} returns {@code false}, then this method returns {@code null}.
Conversely, if {@link #isSealed()} returns {@code true}, then this method
returns a non-null value.

For each class or interface {@code C} which is recorded as a permitted
direct subinterface or subclass of this class or interface,
this method attempts to obtain the {@code Class}
object for {@code C} (using {@linkplain #getClassLoader() the defining class
loader} of the current {@code Class} object).
The {@code Class} objects which can be obtained and which are direct
subinterfaces or subclasses of this class or interface,
are indicated by elements of the returned array. If a {@code Class} object
cannot be obtained, it is silently ignored, and not included in the result
array.

@return an array of {@code Class} objects of the permitted subclasses of this class
        or interface, or {@code null} if this class or interface is not sealed.

@jls 8.1 Class Declarations
@jls 9.1 Interface Declarations
@since 17

## Class.isSealed()

```java
public boolean isSealed()
```

Returns {@code true} if and only if this {@code Class} object represents
a sealed class or interface. If this {@code Class} object represents a
primitive type, {@code void}, or an array type, this method returns
{@code false}. A sealed class or interface has (possibly zero) permitted
subclasses; {@link #getPermittedSubclasses()} returns a non-null but
possibly empty value for a sealed class or interface.

@return {@code true} if and only if this {@code Class} object represents
a sealed class or interface.

@jls 8.1 Class Declarations
@jls 9.1 Interface Declarations
@since 17