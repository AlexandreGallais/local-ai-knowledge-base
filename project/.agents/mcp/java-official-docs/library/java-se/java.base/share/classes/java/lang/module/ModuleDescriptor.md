# ModuleDescriptor class (java.lang.module)

```java
public final class ModuleDescriptor implements Comparable<ModuleDescriptor>
```

A module descriptor.

<p> A module descriptor describes a named module and defines methods to
obtain each of its components. The module descriptor for a named module
in the Java virtual machine is obtained by invoking the {@link
java.lang.Module Module}'s {@link java.lang.Module#getDescriptor
getDescriptor} method. Module descriptors can also be created using the
{@link ModuleDescriptor.Builder} class or by reading the binary form of a
module declaration ({@code module-info.class}) using the {@link
#read(InputStream,Supplier) read} methods defined here. </p>

<p> A module descriptor describes a <em>normal</em>, open, or automatic
module. <em>Normal</em> modules and open modules describe their {@linkplain
#requires() dependences}, {@link #exports() exported-packages}, the services
that they {@linkplain #uses() use} or {@linkplain #provides() provide}, and other
components. <em>Normal</em> modules may {@linkplain #opens() open} specific
packages. The module descriptor for an open module does not declare any
open packages (its {@code opens} method returns an empty set) but when
instantiated in the Java virtual machine then it is treated as if all
packages are open. The module descriptor for an automatic module does not
declare any dependences (except for the mandatory dependency on {@code
java.base}), and does not declare any exported or open packages. Automatic
modules receive special treatment during resolution so that they read all
other modules in the configuration. When an automatic module is instantiated
in the Java virtual machine then it reads every unnamed module and is
treated as if all packages are exported and open. </p>

<p> {@code ModuleDescriptor} objects are immutable and safe for use by
multiple concurrent threads.</p>

@see java.lang.Module
@since 9

## ModuleDescriptor.modifiers()

```java
public Set<Modifier> modifiers()
```

Returns the set of modifiers.

@return A possibly-empty unmodifiable set of modifiers

## ModuleDescriptor.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

Returns the set of the module {@linkplain AccessFlag
requires flags}.

@return A possibly-empty unmodifiable set of requires flags
@see #modifiers()
@jvms 4.7.25 The Module Attribute
@since 20

## ModuleDescriptor.name()

```java
public String name()
```

Return the module name.

@return The module name

## ModuleDescriptor.compiledVersion()

```java
public Optional<Version> compiledVersion()
```

Returns the version of the module if recorded at compile-time.

@return The version of the module if recorded at compile-time,
        or an empty {@code Optional} if no version was recorded or
        the version string recorded is {@linkplain Version#parse(String)
        unparseable}

## ModuleDescriptor.rawCompiledVersion()

```java
public Optional<String> rawCompiledVersion()
```

Returns the string with the possibly-unparseable version of the module
if recorded at compile-time.

@return The string containing the version of the module if recorded
        at compile-time, or an empty {@code Optional} if no version
        was recorded

@see #compiledVersion()

## ModuleDescriptor.compareTo(Requires)

```java
public int compareTo(Requires that)
```

Compares this module dependence to another.

<p> Two {@code Requires} objects are compared by comparing their
module names lexicographically. Where the module names are equal
then the sets of modifiers are compared in the same way that
module modifiers are compared (see {@link ModuleDescriptor#compareTo
ModuleDescriptor.compareTo}). Where the module names are equal and
the set of modifiers are equal then the version of the modules
recorded at compile-time are compared. When comparing the versions
recorded at compile-time then a dependence that has a recorded
version is considered to succeed a dependence that does not have a
recorded version. If both recorded versions are {@linkplain
Version#parse(String) unparseable} then the {@linkplain
#rawCompiledVersion() raw version strings} are compared
lexicographically. </p>

@param  that
        The module dependence to compare

@return A negative integer, zero, or a positive integer if this module
        dependence is less than, equal to, or greater than the given
        module dependence

## ModuleDescriptor.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this module dependence for equality with the given object.

<p> If the given object is not a {@code Requires} then this method
returns {@code false}. Two module dependence objects are equal if
the module names are equal, set of modifiers are equal, and the
compiled version of both modules is equal or not recorded for
both modules. </p>

<p> This method satisfies the general contract of the {@link
java.lang.Object#equals(Object) Object.equals} method. </p>

@param   ob
         the object to which this object is to be compared

@return  {@code true} if, and only if, the given object is a module
         dependence that is equal to this module dependence

## ModuleDescriptor.hashCode()

```java
public int hashCode()
```

Computes a hash code for this module dependence.

<p> The hash code is based upon the module name, modifiers, and the
module version if recorded at compile time. It satisfies the general
contract of the {@link Object#hashCode Object.hashCode} method. </p>

@return The hash-code value for this module dependence

## ModuleDescriptor.toString()

```java
public String toString()
```

Returns a string describing this module dependence.

@return A string describing this module dependence

## ModuleDescriptor.modifiers()

```java
public Set<Modifier> modifiers()
```

Returns the set of modifiers.

@return A possibly-empty unmodifiable set of modifiers

## ModuleDescriptor.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

Returns the set of the module {@linkplain AccessFlag
export flags} for this module descriptor.

@return A possibly-empty unmodifiable set of export flags
@see #modifiers()
@jvms 4.7.25 The Module Attribute
@since 20

## ModuleDescriptor.isQualified()

```java
public boolean isQualified()
```

Returns {@code true} if this is a qualified export.

@return {@code true} if this is a qualified export

## ModuleDescriptor.source()

```java
public String source()
```

Returns the package name.

@return The package name

## ModuleDescriptor.targets()

```java
public Set<String> targets()
```

For a qualified export, returns the non-empty and immutable set
of the module names to which the package is exported. For an
unqualified export, returns an empty set.

@return The set of target module names or for an unqualified
        export, an empty set

## ModuleDescriptor.compareTo(Exports)

```java
public int compareTo(Exports that)
```

Compares this module export to another.

<p> Two {@code Exports} objects are compared by comparing the package
names lexicographically. Where the packages names are equal then the
sets of modifiers are compared in the same way that module modifiers
are compared (see {@link ModuleDescriptor#compareTo
ModuleDescriptor.compareTo}). Where the package names are equal and
the set of modifiers are equal then the set of target modules are
compared. This is done by sorting the names of the target modules
in ascending order, and according to their natural ordering, and then
comparing the corresponding elements lexicographically. Where the
sets differ in size, and the larger set contains all elements of the
smaller set, then the larger set is considered to succeed the smaller
set. </p>

@param  that
        The module export to compare

@return A negative integer, zero, or a positive integer if this module
        export is less than, equal to, or greater than the given
        export dependence

## ModuleDescriptor.hashCode()

```java
public int hashCode()
```

Computes a hash code for this module export.

<p> The hash code is based upon the modifiers, the package name,
and for a qualified export, the set of modules names to which the
package is exported. It satisfies the general contract of the
{@link Object#hashCode Object.hashCode} method.

@return The hash-code value for this module export

## ModuleDescriptor.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this module export for equality with the given object.

<p> If the given object is not an {@code Exports} then this method
returns {@code false}. Two module exports objects are equal if their
set of modifiers is equal, the package names are equal and the set
of target module names is equal. </p>

<p> This method satisfies the general contract of the {@link
java.lang.Object#equals(Object) Object.equals} method. </p>

@param   ob
         the object to which this object is to be compared

@return  {@code true} if, and only if, the given object is a module
         dependence that is equal to this module dependence

## ModuleDescriptor.toString()

```java
public String toString()
```

Returns a string describing the exported package.

@return A string describing the exported package

## ModuleDescriptor.modifiers()

```java
public Set<Modifier> modifiers()
```

Returns the set of modifiers.

@return A possibly-empty unmodifiable set of modifiers

## ModuleDescriptor.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

Returns the set of the module {@linkplain AccessFlag opens
flags}.

@return A possibly-empty unmodifiable set of opens flags
@see #modifiers()
@jvms 4.7.25 The Module Attribute
@since 20

## ModuleDescriptor.isQualified()

```java
public boolean isQualified()
```

Returns {@code true} if this is a qualified {@code Opens}.

@return {@code true} if this is a qualified {@code Opens}

## ModuleDescriptor.source()

```java
public String source()
```

Returns the package name.

@return The package name

## ModuleDescriptor.targets()

```java
public Set<String> targets()
```

For a qualified {@code Opens}, returns the non-empty and immutable set
of the module names to which the package is open. For an
unqualified {@code Opens}, returns an empty set.

@return The set of target module names or for an unqualified
        {@code Opens}, an empty set

## ModuleDescriptor.compareTo(Opens)

```java
public int compareTo(Opens that)
```

Compares this module {@code Opens} to another.

<p> Two {@code Opens} objects are compared by comparing the package
names lexicographically. Where the packages names are equal then the
sets of modifiers are compared in the same way that module modifiers
are compared (see {@link ModuleDescriptor#compareTo
ModuleDescriptor.compareTo}). Where the package names are equal and
the set of modifiers are equal then the set of target modules are
compared. This is done by sorting the names of the target modules
in ascending order, and according to their natural ordering, and then
comparing the corresponding elements lexicographically. Where the
sets differ in size, and the larger set contains all elements of the
smaller set, then the larger set is considered to succeed the smaller
set. </p>

@param  that
        The module {@code Opens} to compare

@return A negative integer, zero, or a positive integer if this module
        {@code Opens} is less than, equal to, or greater than the given
        module {@code Opens}

## ModuleDescriptor.hashCode()

```java
public int hashCode()
```

Computes a hash code for this module {@code Opens}.

<p> The hash code is based upon the modifiers, the package name,
and for a qualified {@code Opens}, the set of modules names to which the
package is opened. It satisfies the general contract of the
{@link Object#hashCode Object.hashCode} method.

@return The hash-code value for this module {@code Opens}

## ModuleDescriptor.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this module {@code Opens} for equality with the given object.

<p> If the given object is not an {@code Opens} then this method
returns {@code false}. Two {@code Opens} objects are equal if their
set of modifiers is equal, the package names are equal and the set
of target module names is equal. </p>

<p> This method satisfies the general contract of the {@link
java.lang.Object#equals(Object) Object.equals} method. </p>

@param   ob
         the object to which this object is to be compared

@return  {@code true} if, and only if, the given object is a module
         dependence that is equal to this module dependence

## ModuleDescriptor.toString()

```java
public String toString()
```

Returns a string describing the open package.

@return A string describing the open package

## ModuleDescriptor.service()

```java
public String service()
```

{@return the {@linkplain ClassLoader##binary-name binary name} of the service type}

## ModuleDescriptor.providers()

```java
public List<String> providers()
```

Returns the list of the {@linkplain ClassLoader##binary-name binary names}
of the providers or provider factories.

@return A non-empty and unmodifiable list of the {@linkplain ClassLoader##binary-name
        binary names} of the providers or provider factories

## ModuleDescriptor.compareTo(Provides)

```java
public int compareTo(Provides that)
```

Compares this {@code Provides} to another.

<p> Two {@code Provides} objects are compared by comparing the
{@linkplain ClassLoader##binary-name binary name}
of the service type lexicographically. Where the
class names are equal then the list of the provider class names are
compared by comparing the corresponding elements of both lists
lexicographically and in sequence. Where the lists differ in size,
{@code N} is the size of the shorter list, and the first {@code N}
corresponding elements are equal, then the longer list is considered
to succeed the shorter list. </p>

@param  that
        The {@code Provides} to compare

@return A negative integer, zero, or a positive integer if this
        {@code Provides} is less than, equal to, or greater than
        the given {@code Provides}

## ModuleDescriptor.hashCode()

```java
public int hashCode()
```

Computes a hash code for this {@code Provides}.

<p> The hash code is based upon the service type and the set of
providers. It satisfies the general contract of the {@link
Object#hashCode Object.hashCode} method. </p>

@return The hash-code value for this module provides

## ModuleDescriptor.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this {@code Provides} for equality with the given object.

<p> If the given object is not a {@code Provides} then this method
returns {@code false}. Two {@code Provides} objects are equal if the
service type is equal and the list of providers is equal. </p>

<p> This method satisfies the general contract of the {@link
java.lang.Object#equals(Object) Object.equals} method. </p>

@param   ob
         the object to which this object is to be compared

@return  {@code true} if, and only if, the given object is a
         {@code Provides} that is equal to this {@code Provides}

## ModuleDescriptor.toString()

```java
public String toString()
```

Returns a string describing this {@code Provides}.

@return A string describing this {@code Provides}

## ModuleDescriptor.parse(String)

```java
public static Version parse(String v)
```

Parses the given string as a version string.

@param  v
        The string to parse

@return The resulting {@code Version}

@throws IllegalArgumentException
        If {@code v} is {@code null}, an empty string, or cannot be
        parsed as a version string

## ModuleDescriptor.compareTo(Version)

```java
public int compareTo(Version that)
```

Compares this module version to another module version. Module
versions are compared as described in the class description.

@param that
       The module version to compare

@return A negative integer, zero, or a positive integer as this
        module version is less than, equal to, or greater than the
        given module version

## ModuleDescriptor.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this module version for equality with the given object.

<p> If the given object is not a {@code Version} then this method
returns {@code false}. Two module version are equal if their
corresponding components are equal. </p>

<p> This method satisfies the general contract of the {@link
java.lang.Object#equals(Object) Object.equals} method. </p>

@param   ob
         the object to which this object is to be compared

@return  {@code true} if, and only if, the given object is a module
         reference that is equal to this module reference

## ModuleDescriptor.hashCode()

```java
public int hashCode()
```

Computes a hash code for this module version.

<p> The hash code is based upon the components of the version and
satisfies the general contract of the {@link Object#hashCode
Object.hashCode} method. </p>

@return The hash-code value for this module version

## ModuleDescriptor.toString()

```java
public String toString()
```

Returns the string from which this version was parsed.

@return The string from which this version was parsed.

## ModuleDescriptor.name()

```java
public String name()
```

<p> Returns the module name. </p>

@return The module name

## ModuleDescriptor.modifiers()

```java
public Set<Modifier> modifiers()
```

<p> Returns the set of module modifiers. </p>

@return A possibly-empty unmodifiable set of modifiers

## ModuleDescriptor.accessFlags()

```java
public Set<AccessFlag> accessFlags()
```

Returns the set of the {@linkplain AccessFlag module flags}.

@return A possibly-empty unmodifiable set of module flags
@see #modifiers()
@jvms 4.7.25 The Module Attribute
@since 20

## ModuleDescriptor.isOpen()

```java
public boolean isOpen()
```

<p> Returns {@code true} if this is an open module. </p>

<p> This method is equivalent to testing if the set of {@link #modifiers()
modifiers} contains the {@link Modifier#OPEN OPEN} modifier. </p>

@return  {@code true} if this is an open module

## ModuleDescriptor.isAutomatic()

```java
public boolean isAutomatic()
```

<p> Returns {@code true} if this is an automatic module. </p>

<p> This method is equivalent to testing if the set of {@link #modifiers()
modifiers} contains the {@link Modifier#AUTOMATIC AUTOMATIC} modifier. </p>

@return  {@code true} if this is an automatic module

## ModuleDescriptor.requires()

```java
public Set<Requires> requires()
```

<p> Returns the set of {@code Requires} objects representing the module
dependences. </p>

<p> The set includes a dependency on "{@code java.base}" when this
module is not named "{@code java.base}". If this module is an automatic
module then it does not have a dependency on any module other than
"{@code java.base}". </p>

@return  A possibly-empty unmodifiable set of {@link Requires} objects

## ModuleDescriptor.exports()

```java
public Set<Exports> exports()
```

<p> Returns the set of {@code Exports} objects representing the exported
packages. </p>

<p> If this module is an automatic module then the set of exports
is empty. </p>

@return  A possibly-empty unmodifiable set of exported packages

## ModuleDescriptor.opens()

```java
public Set<Opens> opens()
```

<p> Returns the set of {@code Opens} objects representing the open
packages. </p>

<p> If this module is an open module or an automatic module then the
set of open packages is empty. </p>

@return  A possibly-empty unmodifiable set of open packages

## ModuleDescriptor.uses()

```java
public Set<String> uses()
```

<p> Returns the set of service dependences. </p>

<p> If this module is an automatic module then the set of service
dependences is empty. </p>

@return  A possibly-empty unmodifiable set of the {@linkplain ClassLoader##binary-name
         binary names} of the service types used

## ModuleDescriptor.provides()

```java
public Set<Provides> provides()
```

<p> Returns the set of {@code Provides} objects representing the
services that the module provides. </p>

@return The possibly-empty unmodifiable set of the services that this
        module provides

## ModuleDescriptor.version()

```java
public Optional<Version> version()
```

<p> Returns the module version. </p>

@return This module's version, or an empty {@code Optional} if the
        module does not have a version or the version is
        {@linkplain Version#parse(String) unparseable}

## ModuleDescriptor.rawVersion()

```java
public Optional<String> rawVersion()
```

<p> Returns the string with the possibly-unparseable version of the
module. </p>

@return The string containing the version of the module or an empty
        {@code Optional} if the module does not have a version

@see #version()

## ModuleDescriptor.toNameAndVersion()

```java
public String toNameAndVersion()
```

<p> Returns a string containing the module name and, if present, its
version. </p>

@return A string containing the module name and, if present, its
        version

## ModuleDescriptor.mainClass()

```java
public Optional<String> mainClass()
```

<p> Returns the module main class. </p>

@return The {@linkplain ClassLoader##binary-name binary name} of the module's main class

## ModuleDescriptor.packages()

```java
public Set<String> packages()
```

Returns the set of packages in the module.

<p> The set of packages includes all exported and open packages, as well
as the packages of any service providers, and the package for the main
class. </p>

@return A possibly-empty unmodifiable set of the packages in the module

## ModuleDescriptor.requires(Requires)

```java
public Builder requires(Requires req)
```

Adds a dependence on a module.

@param  req
        The dependence

@return This builder

@throws IllegalArgumentException
        If the dependence is on the module that this builder was
        initialized to build
@throws IllegalStateException
        If the dependence on the module has already been declared
        or this builder is for an automatic module

## ModuleDescriptor.requires(Set<Requires.Modifier>, String, Version)

```java
public Builder requires(Set<Requires.Modifier> ms, String mn, Version compiledVersion)
```

Adds a dependence on a module with the given (and possibly empty)
set of modifiers. The dependence includes the version of the
module that was recorded at compile-time.

@param  ms
        The set of modifiers
@param  mn
        The module name
@param  compiledVersion
        The version of the module recorded at compile-time

@return This builder

@throws IllegalArgumentException
        If the module name is {@code null}, is not a legal module
        name, or is equal to the module name that this builder
        was initialized to build
@throws IllegalStateException
        If the dependence on the module has already been declared
        or this builder is for an automatic module

## ModuleDescriptor.requires(Set<Requires.Modifier>, String)

```java
public Builder requires(Set<Requires.Modifier> ms, String mn)
```

Adds a dependence on a module with the given (and possibly empty)
set of modifiers.

@param  ms
        The set of modifiers
@param  mn
        The module name

@return This builder

@throws IllegalArgumentException
        If the module name is {@code null}, is not a legal module
        name, or is equal to the module name that this builder
        was initialized to build
@throws IllegalStateException
        If the dependence on the module has already been declared
        or this builder is for an automatic module

## ModuleDescriptor.requires(String)

```java
public Builder requires(String mn)
```

Adds a dependence on a module with an empty set of modifiers.

@param  mn
        The module name

@return This builder

@throws IllegalArgumentException
        If the module name is {@code null}, is not a legal module
        name, or is equal to the module name that this builder
        was initialized to build
@throws IllegalStateException
        If the dependence on the module has already been declared
        or this builder is for an automatic module

## ModuleDescriptor.exports(Exports)

```java
public Builder exports(Exports e)
```

Adds an exported package.

@param  e
        The export

@return This builder

@throws IllegalStateException
        If the {@link Exports#source() package} is already declared as
        exported or this builder is for an automatic module

## ModuleDescriptor.exports(Set<Exports.Modifier>, String, Set<String>)

```java
public Builder exports(Set<Exports.Modifier> ms, String pn, Set<String> targets)
```

Adds an exported package with the given (and possibly empty) set of
modifiers. The package is exported to a set of target modules.

@param  ms
        The set of modifiers
@param  pn
        The package name
@param  targets
        The set of target modules names

@return This builder

@throws IllegalArgumentException
        If the package name is {@code null} or is not a legal
        package name, the set of target modules is empty, or the set
        of target modules contains a name that is not a legal module
        name
@throws IllegalStateException
        If the package is already declared as exported
        or this builder is for an automatic module

## ModuleDescriptor.exports(Set<Exports.Modifier>, String)

```java
public Builder exports(Set<Exports.Modifier> ms, String pn)
```

Adds an exported package with the given (and possibly empty) set of
modifiers. The package is exported to all modules.

@param  ms
        The set of modifiers
@param  pn
        The package name

@return This builder

@throws IllegalArgumentException
        If the package name is {@code null} or is not a legal
        package name
@throws IllegalStateException
        If the package is already declared as exported
        or this builder is for an automatic module

## ModuleDescriptor.exports(String, Set<String>)

```java
public Builder exports(String pn, Set<String> targets)
```

Adds an exported package. The package is exported to a set of target
modules.

@param  pn
        The package name
@param  targets
        The set of target modules names

@return This builder

@throws IllegalArgumentException
        If the package name is {@code null} or is not a legal
        package name, the set of target modules is empty, or the set
        of target modules contains a name that is not a legal module
        name
@throws IllegalStateException
        If the package is already declared as exported
        or this builder is for an automatic module

## ModuleDescriptor.exports(String)

```java
public Builder exports(String pn)
```

Adds an exported package. The package is exported to all modules.

@param  pn
        The package name

@return This builder

@throws IllegalArgumentException
        If the package name is {@code null} or is not a legal
        package name
@throws IllegalStateException
        If the package is already declared as exported
        or this builder is for an automatic module

## ModuleDescriptor.opens(Opens)

```java
public Builder opens(Opens obj)
```

Adds an open package.

@param  obj
        The {@code Opens} object

@return This builder

@throws IllegalStateException
        If the package is already declared as open, or this is a
        builder for an open module or automatic module

## ModuleDescriptor.opens(Set<Opens.Modifier>, String, Set<String>)

```java
public Builder opens(Set<Opens.Modifier> ms, String pn, Set<String> targets)
```

Adds an open package with the given (and possibly empty) set of
modifiers. The package is open to a set of target modules.

@param  ms
        The set of modifiers
@param  pn
        The package name
@param  targets
        The set of target modules names

@return This builder

@throws IllegalArgumentException
        If the package name is {@code null} or is not a legal
        package name, the set of target modules is empty, or the set
        of target modules contains a name that is not a legal module
        name
@throws IllegalStateException
        If the package is already declared as open, or this is a
        builder for an open module or automatic module

## ModuleDescriptor.opens(Set<Opens.Modifier>, String)

```java
public Builder opens(Set<Opens.Modifier> ms, String pn)
```

Adds an open package with the given (and possibly empty) set of
modifiers. The package is open to all modules.

@param  ms
        The set of modifiers
@param  pn
        The package name

@return This builder

@throws IllegalArgumentException
        If the package name is {@code null} or is not a legal
        package name
@throws IllegalStateException
        If the package is already declared as open, or this is a
        builder for an open module or automatic module

## ModuleDescriptor.opens(String, Set<String>)

```java
public Builder opens(String pn, Set<String> targets)
```

Adds an open package. The package is open to a set of target modules.

@param  pn
        The package name
@param  targets
        The set of target modules names

@return This builder

@throws IllegalArgumentException
        If the package name is {@code null} or is not a legal
        package name, the set of target modules is empty, or the set
        of target modules contains a name that is not a legal module
        name
@throws IllegalStateException
        If the package is already declared as open, or this is a
        builder for an open module or automatic module

## ModuleDescriptor.opens(String)

```java
public Builder opens(String pn)
```

Adds an open package. The package is open to all modules.

@param  pn
        The package name

@return This builder

@throws IllegalArgumentException
        If the package name is {@code null} or is not a legal
        package name
@throws IllegalStateException
        If the package is already declared as open, or this is a
        builder for an open module or automatic module

## ModuleDescriptor.uses(String)

```java
public Builder uses(String service)
```

Adds a service dependence.

@param  service
        The service type

@return This builder

@throws IllegalArgumentException
        If the service type is {@code null} or not a qualified name of
        a class in a named package
@throws IllegalStateException
        If a dependency on the service type has already been declared
        or this is a builder for an automatic module

## ModuleDescriptor.provides(Provides)

```java
public Builder provides(Provides p)
```

Provides a service with one or more implementations. The package for
each {@link Provides#providers() provider} (or provider factory) is
added to the module if not already added.

@param  p
        The provides

@return This builder

@throws IllegalStateException
        If the providers for the service type have already been
        declared

## ModuleDescriptor.provides(String, List<String>)

```java
public Builder provides(String service, List<String> providers)
```

Provides implementations of a service. The package for each provider
(or provider factory) is added to the module if not already added.

@param  service
        The service type
@param  providers
        The list of provider or provider factory class names

@return This builder

@throws IllegalArgumentException
        If the service type or any of the provider class names is
        {@code null} or not a qualified name of a class in a named
        package, or the list of provider class names is empty
@throws IllegalStateException
        If the providers for the service type have already been
        declared

## ModuleDescriptor.packages(Set<String>)

```java
public Builder packages(Set<String> pns)
```

Adds packages to the module. All packages in the set of package names
that are not in the module are added to module.

@param  pns
        The (possibly empty) set of package names

@return This builder

@throws IllegalArgumentException
        If any of the package names is {@code null} or is not a
        legal package name

## ModuleDescriptor.version(Version)

```java
public Builder version(Version v)
```

Sets the module version.

@param  v
        The version

@return This builder

## ModuleDescriptor.version(String)

```java
public Builder version(String vs)
```

Sets the module version.

@param  vs
        The version string to parse

@return This builder

@throws IllegalArgumentException
        If {@code vs} is {@code null} or cannot be parsed as a
        version string

@see Version#parse(String)

## ModuleDescriptor.mainClass(String)

```java
public Builder mainClass(String mc)
```

Sets the module main class. The package for the main class is added
to the module if not already added. In other words, this method is
equivalent to first invoking this builder's {@link #packages(Set)
packages} method to add the package name of the main class.

@param  mc
        The module main class

@return This builder

@throws IllegalArgumentException
        If {@code mainClass} is {@code null} or not a qualified
        name of a class in a named package

## ModuleDescriptor.build()

```java
public ModuleDescriptor build()
```

Builds and returns a {@code ModuleDescriptor} from its components.

<p> The module will require "{@code java.base}" even if the dependence
has not been declared (the exception is when building a module named
"{@code java.base}" as it cannot require itself). The dependence on
"{@code java.base}" will have the {@link
java.lang.module.ModuleDescriptor.Requires.Modifier#MANDATED MANDATED}
modifier if the dependence was not declared. </p>

@return The module descriptor

## ModuleDescriptor.compareTo(ModuleDescriptor)

```java
public int compareTo(ModuleDescriptor that)
```

Compares this module descriptor to another.

<p> Two {@code ModuleDescriptor} objects are compared by comparing their
module names lexicographically. Where the module names are equal then the
module versions are compared. When comparing the module versions then a
module descriptor with a version is considered to succeed a module
descriptor that does not have a version. If both versions are {@linkplain
Version#parse(String) unparseable} then the {@linkplain #rawVersion()
raw version strings} are compared lexicographically. Where the module names
are equal and the versions are equal (or not present in both), then the
set of modifiers are compared. Sets of modifiers are compared by comparing
a <em>binary value</em> computed for each set. If a modifier is present
in the set then the bit at the position of its ordinal is {@code 1}
in the binary value, otherwise {@code 0}. If the two set of modifiers
are also equal then the other components of the module descriptors are
compared in a manner that is consistent with {@code equals}. </p>

@param  that
        The module descriptor to compare

@return A negative integer, zero, or a positive integer if this module
        descriptor is less than, equal to, or greater than the given
        module descriptor

## ModuleDescriptor.equals(Object)

```java
public boolean equals(Object ob)
```

Tests this module descriptor for equality with the given object.

<p> If the given object is not a {@code ModuleDescriptor} then this
method returns {@code false}. Two module descriptors are equal if each
of their corresponding components is equal. </p>

<p> This method satisfies the general contract of the {@link
java.lang.Object#equals(Object) Object.equals} method. </p>

@param   ob
         the object to which this object is to be compared

@return  {@code true} if, and only if, the given object is a module
         descriptor that is equal to this module descriptor

## ModuleDescriptor.hashCode()

```java
public int hashCode()
```

Computes a hash code for this module descriptor.

<p> The hash code is based upon the components of the module descriptor,
and satisfies the general contract of the {@link Object#hashCode
Object.hashCode} method. </p>

@return The hash-code value for this module descriptor

## ModuleDescriptor.toString()

```java
public String toString()
```

<p> Returns a string describing the module. </p>

@return A string describing the module

## ModuleDescriptor.newModule(String, Set<Modifier>)

```java
public static Builder newModule(String name, Set<Modifier> ms)
```

Instantiates a builder to build a module descriptor.

@param  name
        The module name
@param  ms
        The set of module modifiers

@return A new builder

@throws IllegalArgumentException
        If the module name is {@code null} or is not a legal module
        name, or the set of modifiers contains {@link
        Modifier#AUTOMATIC AUTOMATIC} with other modifiers

## ModuleDescriptor.newModule(String)

```java
public static Builder newModule(String name)
```

Instantiates a builder to build a module descriptor for a <em>normal</em>
module. This method is equivalent to invoking {@link #newModule(String,Set)
newModule} with an empty set of {@link ModuleDescriptor.Modifier modifiers}.

@param  name
        The module name

@return A new builder

@throws IllegalArgumentException
        If the module name is {@code null} or is not a legal module
        name

## ModuleDescriptor.newOpenModule(String)

```java
public static Builder newOpenModule(String name)
```

Instantiates a builder to build a module descriptor for an open module.
This method is equivalent to invoking {@link #newModule(String,Set)
newModule} with the {@link ModuleDescriptor.Modifier#OPEN OPEN} modifier.

<p> The builder for an open module cannot be used to declare any open
packages. </p>

@param  name
        The module name

@return A new builder that builds an open module

@throws IllegalArgumentException
        If the module name is {@code null} or is not a legal module
        name

## ModuleDescriptor.newAutomaticModule(String)

```java
public static Builder newAutomaticModule(String name)
```

Instantiates a builder to build a module descriptor for an automatic
module. This method is equivalent to invoking {@link #newModule(String,Set)
newModule} with the {@link ModuleDescriptor.Modifier#AUTOMATIC AUTOMATIC}
modifier.

<p> The builder for an automatic module cannot be used to declare module
or service dependences. It also cannot be used to declare any exported
or open packages. </p>

@param  name
        The module name

@return A new builder that builds an automatic module

@throws IllegalArgumentException
        If the module name is {@code null} or is not a legal module
        name

@see ModuleFinder#of(Path[])

## ModuleDescriptor.read(InputStream, Supplier<Set<String>>)

```java
public static ModuleDescriptor read(InputStream in, Supplier<Set<String>> packageFinder) throws IOException
```

Reads the binary form of a module declaration from an input stream
as a module descriptor.

<p> If the descriptor encoded in the input stream does not indicate a
set of packages in the module then the {@code packageFinder} will be
invoked. The set of packages that the {@code packageFinder} returns
must include all the packages that the module exports, opens, as well
as the packages of the service implementations that the module provides,
and the package of the main class (if the module has a main class). If
the {@code packageFinder} throws an {@link UncheckedIOException} then
{@link IOException} cause will be re-thrown. </p>

<p> If there are bytes following the module descriptor then it is
implementation specific as to whether those bytes are read, ignored,
or reported as an {@code InvalidModuleDescriptorException}. If this
method fails with an {@code InvalidModuleDescriptorException} or {@code
IOException} then it may do so after some, but not all, bytes have
been read from the input stream. It is strongly recommended that the
stream be promptly closed and discarded if an exception occurs. </p>

@apiNote The {@code packageFinder} parameter is for use when reading
module descriptors from legacy module-artifact formats that do not
record the set of packages in the descriptor itself.

@param  in
        The input stream
@param  packageFinder
        A supplier that can produce the set of packages

@return The module descriptor

@throws InvalidModuleDescriptorException
        If an invalid module descriptor is detected or the set of
        packages returned by the {@code packageFinder} does not include
        all of the packages obtained from the module descriptor
@throws IOException
        If an I/O error occurs reading from the input stream or {@code
        UncheckedIOException} is thrown by the package finder

## ModuleDescriptor.read(InputStream)

```java
public static ModuleDescriptor read(InputStream in) throws IOException
```

Reads the binary form of a module declaration from an input stream as a
module descriptor. This method works exactly as specified by the 2-arg
{@link #read(InputStream,Supplier) read} method with the exception that
a package finder is not used to find additional packages when the
module descriptor read from the stream does not indicate the set of
packages.

@param  in
        The input stream

@return The module descriptor

@throws InvalidModuleDescriptorException
        If an invalid module descriptor is detected
@throws IOException
        If an I/O error occurs reading from the input stream

## ModuleDescriptor.read(ByteBuffer, Supplier<Set<String>>)

```java
public static ModuleDescriptor read(ByteBuffer bb, Supplier<Set<String>> packageFinder)
```

Reads the binary form of a module declaration from a byte buffer
as a module descriptor.

<p> If the descriptor encoded in the byte buffer does not indicate a
set of packages in the module then the {@code packageFinder} will be
invoked. The set of packages that the {@code packageFinder} returns
must include all the packages that the module exports, opens, as well
as the packages of the service implementations that the module provides,
and the package of the main class (if the module has a main class). If
the {@code packageFinder} throws an {@link UncheckedIOException} then
{@link IOException} cause will be re-thrown. </p>

<p> The module descriptor is read from the buffer starting at index
{@code p}, where {@code p} is the buffer's {@link ByteBuffer#position()
position} when this method is invoked. Upon return the buffer's position
will be equal to {@code p + n} where {@code n} is the number of bytes
read from the buffer. </p>

<p> If there are bytes following the module descriptor then it is
implementation specific as to whether those bytes are read, ignored,
or reported as an {@code InvalidModuleDescriptorException}. If this
method fails with an {@code InvalidModuleDescriptorException} then it
may do so after some, but not all, bytes have been read. </p>

@apiNote The {@code packageFinder} parameter is for use when reading
module descriptors from legacy module-artifact formats that do not
record the set of packages in the descriptor itself.

@param  bb
        The byte buffer
@param  packageFinder
        A supplier that can produce the set of packages

@return The module descriptor

@throws InvalidModuleDescriptorException
        If an invalid module descriptor is detected or the set of
        packages returned by the {@code packageFinder} does not include
        all of the packages obtained from the module descriptor

## ModuleDescriptor.read(ByteBuffer)

```java
public static ModuleDescriptor read(ByteBuffer bb)
```

Reads the binary form of a module declaration from a byte buffer as a
module descriptor. This method works exactly as specified by the 2-arg
{@link #read(ByteBuffer,Supplier) read} method with the exception that a
package finder is not used to find additional packages when the module
descriptor encoded in the buffer does not indicate the set of packages.

@param  bb
        The byte buffer

@return The module descriptor

@throws InvalidModuleDescriptorException
        If an invalid module descriptor is detected