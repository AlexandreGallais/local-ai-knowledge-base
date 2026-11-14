# ClassFileVersion interface (java.lang.classfile)

```java
public sealed interface ClassFileVersion extends ClassElement permits ClassFileVersionImpl
```

Models the minor and major version numbers of a {@code class} file (JVMS
{@jvms 4.1}).  The {@code class} file version appears exactly once in each
class, and is set to an unspecified default value if not explicitly provided.
<p>
The major versions of {@code class} file format begins at {@value
ClassFile#JAVA_1_VERSION} for Java Platform version 1.0.2, and is continuous
up to {@link ClassFile#latestMajorVersion()}.  In general, each major version
defines a new supported {@code class} file format, modeled by {@link
ClassFileFormatVersion}, and supports all previous formats.
<p>
For major versions up to {@value ClassFile#JAVA_11_VERSION} for Java SE
Platform 11, the minor version of any value is supported.  For major versions
{@value ClassFile#JAVA_12_VERSION} for Java SE Platform version 12 and above,
the minor version must be {@code 0} or {@value ClassFile#PREVIEW_MINOR_VERSION}.
The minor version {@code 0} is always supported, and represents the format
modeled by {@link ClassFileFormatVersion}.  The minor version {@code 65535}
indicates the {@code class} file uses preview features of the Java SE
Platform release represented by the major version.  A Java Virtual Machine
can only load such a {@code class} file if it has the same Java SE Platform
version and the JVM has preview features enabled.

@see ClassModel#majorVersion()
@see ClassModel#minorVersion()
@see ClassFileFormatVersion
@jvms 4.1 The {@code ClassFile} Structure
@since 24

## ClassFileVersion.majorVersion()

```java
int majorVersion()
```

{@return the major version}  It is in the range of unsigned short, {@code
[0, 65535]}.

@apiNote
Constants in {@link ClassFile} named {@code Java_#_VERSION}, where # is
a release number, such as {@link ClassFile#JAVA_21_VERSION}, describe the
class major versions of the Java Platform SE.

## ClassFileVersion.minorVersion()

```java
int minorVersion()
```

{@return the minor version}  It is in the range of unsigned short, {@code
[0, 65535]}.

## ClassFileVersion.of(int, int)

```java
static ClassFileVersion of(int majorVersion, int minorVersion)
```

{@return a {@link ClassFileVersion} element}
@param majorVersion the major version
@param minorVersion the minor version