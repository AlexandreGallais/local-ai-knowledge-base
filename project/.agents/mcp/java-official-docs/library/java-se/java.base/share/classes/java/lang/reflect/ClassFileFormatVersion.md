# ClassFileFormatVersion enum (java.lang.reflect)

```java
public enum ClassFileFormatVersion
```

Class file format versions of the Java virtual machine.

See the appropriate edition of <cite>The Java Virtual Machine
Specification</cite> for information about a particular class file
format version.

<p>Note that additional class file format version constants will be
added to model future releases of the Java Virtual Machine
Specification.

@apiNote
The complete version used in a class file includes a major version
and a minor version; this enum only models the major version. A
Java virtual machine implementation is required to support a range
of major versions; see the corresponding edition of the <cite>The
Java Virtual Machine Specification</cite> for details.

@since 20
@see System#getProperties System property {@code java.class.version}
@see java.compiler/javax.lang.model.SourceVersion

## ClassFileFormatVersion.latest()

```java
public static ClassFileFormatVersion latest()
```

{@return the latest class file format version}

## ClassFileFormatVersion.major()

```java
public int major()
```

{@return the major class file version as an integer}
@jvms 4.1 The {@code ClassFile} Structure

## ClassFileFormatVersion.valueOf(Runtime.Version)

```java
public static ClassFileFormatVersion valueOf(Runtime.Version rv)
```

{@return the latest class file format version that is usable
under the runtime version argument} If the runtime version's
{@linkplain Runtime.Version#feature() feature} is greater than
the feature of the {@linkplain #runtimeVersion() runtime
version} of the {@linkplain #latest() latest class file format
version}, an {@code IllegalArgumentException} is thrown.

<p>Because the class file format versions of the Java platform
have so far followed a linear progression, only the feature
component of a runtime version is queried to determine the
mapping to a class file format version. If that linearity
changes in the future, other components of the runtime version
may influence the result.

@apiNote
An expression to convert from a string value, for example
{@code "17"}, to the corresponding class file format version,
{@code RELEASE_17}, is:

{@snippet lang="java" :
ClassFileFormatVersion.valueOf(Runtime.Version.parse("17"))}

@param rv runtime version to map to a class file format version
@throws IllegalArgumentException if the feature of version
argument is greater than the feature of the platform version.

## ClassFileFormatVersion.runtimeVersion()

```java
public Runtime.Version runtimeVersion()
```

{@return the least runtime version that supports this class
file format version; otherwise {@code null}} The returned
runtime version has a {@linkplain Runtime.Version#feature()
feature} large enough to support this class file format version
and has no other elements set.

Class file format versions greater than or equal to {@link
RELEASE_6} have non-{@code null} results.

## ClassFileFormatVersion.fromMajor(int)

```java
public static ClassFileFormatVersion fromMajor(int major)
```

{@return the latest class file format version whose major class
file version matches the argument}
@param major the major class file version as an integer
@throws IllegalArgumentException if the argument is outside of
the range of major class file versions