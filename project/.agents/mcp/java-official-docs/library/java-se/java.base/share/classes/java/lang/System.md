# System class (java.lang)

```java
public final class System
```

The {@code System} class contains several useful class fields
and methods. It cannot be instantiated.

Among the facilities provided by the {@code System} class
are standard input, standard output, and error output streams;
access to externally defined properties and environment
variables; a means of loading files and libraries; and a utility
method for quickly copying a portion of an array.

@since   1.0

## System.in

```java
public static final InputStream in
```

The "standard" input stream. This stream is already
open and ready to supply input data. This stream
corresponds to keyboard input or another input source specified by
the host environment or user. Applications should use the encoding
specified by the {@link ##stdin.encoding stdin.encoding} property
to convert input bytes to character data.

@apiNote
The typical approach to read character data is to wrap {@code System.in}
within the object that handles character encoding. After this is done,
subsequent reading should use only the wrapper object; continuing to
operate directly on {@code System.in} results in unspecified behavior.
<p>
Here are two common examples. Using an {@link java.io.InputStreamReader
InputStreamReader}:
{@snippet lang=java :
    new InputStreamReader(System.in, System.getProperty("stdin.encoding"));
}
Or using a {@link java.util.Scanner Scanner}:
{@snippet lang=java :
    new Scanner(System.in, System.getProperty("stdin.encoding"));
}
<p>
For handling interactive input, consider using {@link Console}.

@see Console
@see ##stdin.encoding stdin.encoding

## System.out

```java
public static final PrintStream out
```

The "standard" output stream. This stream is already
open and ready to accept output data. Typically this stream
corresponds to display output or another output destination
specified by the host environment or user. The encoding used
in the conversion from characters to bytes is equivalent to
{@link ##stdout.encoding stdout.encoding}.
<p>
For simple stand-alone Java applications, a typical way to write
a line of output data is:
<blockquote><pre>
    System.out.println(data)
</pre></blockquote>
<p>
See the {@code println} methods in class {@code PrintStream}.

@see     java.io.PrintStream#println()
@see     java.io.PrintStream#println(boolean)
@see     java.io.PrintStream#println(char)
@see     java.io.PrintStream#println(char[])
@see     java.io.PrintStream#println(double)
@see     java.io.PrintStream#println(float)
@see     java.io.PrintStream#println(int)
@see     java.io.PrintStream#println(long)
@see     java.io.PrintStream#println(java.lang.Object)
@see     java.io.PrintStream#println(java.lang.String)
@see     ##stdout.encoding stdout.encoding

## System.err

```java
public static final PrintStream err
```

The "standard" error output stream. This stream is already
open and ready to accept output data.
<p>
Typically this stream corresponds to display output or another
output destination specified by the host environment or user. By
convention, this output stream is used to display error messages
or other information that should come to the immediate attention
of a user even if the principal output stream, the value of the
variable {@code out}, has been redirected to a file or other
destination that is typically not continuously monitored.
The encoding used in the conversion from characters to bytes is
equivalent to {@link ##stderr.encoding stderr.encoding}.

@see     ##stderr.encoding stderr.encoding

## System.setIn(InputStream)

```java
public static void setIn(InputStream in)
```

Reassigns the "standard" input stream.

@param in the new standard input stream.

@since   1.1

## System.setOut(PrintStream)

```java
public static void setOut(PrintStream out)
```

Reassigns the "standard" output stream.

@param out the new standard output stream

@since   1.1

## System.setErr(PrintStream)

```java
public static void setErr(PrintStream err)
```

Reassigns the "standard" error output stream.

@param err the new standard error output stream.

@since   1.1

## System.console()

```java
public static Console console()
```

Returns the unique {@link java.io.Console Console} object associated
with the current Java virtual machine, if any.

@return  The system console, if any, otherwise {@code null}.

@since   1.6

## System.inheritedChannel()

```java
public static Channel inheritedChannel() throws IOException
```

Returns the channel inherited from the entity that created this
Java virtual machine.

This method returns the channel obtained by invoking the
{@link java.nio.channels.spi.SelectorProvider#inheritedChannel
inheritedChannel} method of the system-wide default
{@link java.nio.channels.spi.SelectorProvider} object.

<p> In addition to the network-oriented channels described in
{@link java.nio.channels.spi.SelectorProvider#inheritedChannel
inheritedChannel}, this method may return other kinds of
channels in the future.

@return  The inherited channel, if any, otherwise {@code null}.

@throws  IOException
         If an I/O error occurs

@since 1.5

## System.setSecurityManager(SecurityManager)

```java
public static void setSecurityManager( SecurityManager sm)
```

Throws {@code UnsupportedOperationException}. Setting a security manager
is not supported.

@param  sm ignored
@throws UnsupportedOperationException always
@see #getSecurityManager
@deprecated This method originally set
      {@linkplain SecurityManager the system-wide Security Manager}.
      Setting a Security Manager is no longer supported. There is no
      replacement for the Security Manager or this method.

## System.getSecurityManager()

```java
public static SecurityManager getSecurityManager()
```

Returns {@code null}. Setting a security manager is not supported.

@return  {@code null}
@see     #setSecurityManager
@deprecated This method originally returned
      {@linkplain SecurityManager the system-wide Security Manager}.
      Setting a Security Manager is no longer supported. There is no
      replacement for the Security Manager or this method.

## System.currentTimeMillis()

```java
public static native long currentTimeMillis()
```

Returns the current time in milliseconds.  Note that
while the unit of time of the return value is a millisecond,
the granularity of the value depends on the underlying
operating system and may be larger.  For example, many
operating systems measure time in units of tens of
milliseconds.

<p> See the description of the class {@code Date} for
a discussion of slight discrepancies that may arise between
"computer time" and coordinated universal time (UTC).

@return  the difference, measured in milliseconds, between
         the current time and midnight, January 1, 1970 UTC.
@see     java.util.Date

## System.nanoTime()

```java
public static native long nanoTime()
```

Returns the current value of the running Java Virtual Machine's
high-resolution time source, in nanoseconds.

This method can only be used to measure elapsed time and is
not related to any other notion of system or wall-clock time.
The value returned represents nanoseconds since some fixed but
arbitrary <i>origin</i> time (perhaps in the future, so values
may be negative).  The same origin is used by all invocations of
this method in an instance of a Java virtual machine; other
virtual machine instances are likely to use a different origin.

<p>This method provides nanosecond precision, but not necessarily
nanosecond resolution (that is, how frequently the value changes)
- no guarantees are made except that the resolution is at least as
good as that of {@link #currentTimeMillis()}.

<p>Differences in successive calls that span greater than
approximately 292 years (2<sup>63</sup> nanoseconds) will not
correctly compute elapsed time due to numerical overflow.

<p>The values returned by this method become meaningful only when
the difference between two such values, obtained within the same
instance of a Java virtual machine, is computed.

<p>For example, to measure how long some code takes to execute:
<pre> {@code
long startTime = System.nanoTime();
// ... the code being measured ...
long elapsedNanos = System.nanoTime() - startTime;}</pre>

<p>To compare elapsed time against a timeout, use <pre> {@code
if (System.nanoTime() - startTime >= timeoutNanos) ...}</pre>
instead of <pre> {@code
if (System.nanoTime() >= startTime + timeoutNanos) ...}</pre>
because of the possibility of numerical overflow.

@return the current value of the running Java Virtual Machine's
        high-resolution time source, in nanoseconds
@since 1.5

## System.arraycopy(Object, int, Object, int, int)

```java
public static native void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)
```

Copies an array from the specified source array, beginning at the
specified position, to the specified position of the destination array.
A subsequence of array components are copied from the source
array referenced by {@code src} to the destination array
referenced by {@code dest}. The number of components copied is
equal to the {@code length} argument. The components at
positions {@code srcPos} through
{@code srcPos+length-1} in the source array are copied into
positions {@code destPos} through
{@code destPos+length-1}, respectively, of the destination
array.
<p>
If the {@code src} and {@code dest} arguments refer to the
same array object, then the copying is performed as if the
components at positions {@code srcPos} through
{@code srcPos+length-1} were first copied to a temporary
array with {@code length} components and then the contents of
the temporary array were copied into positions
{@code destPos} through {@code destPos+length-1} of the
destination array.
<p>
If {@code dest} is {@code null}, then a
{@code NullPointerException} is thrown.
<p>
If {@code src} is {@code null}, then a
{@code NullPointerException} is thrown and the destination
array is not modified.
<p>
Otherwise, if any of the following is true, an
{@code ArrayStoreException} is thrown and the destination is
not modified:
<ul>
<li>The {@code src} argument refers to an object that is not an
    array.
<li>The {@code dest} argument refers to an object that is not an
    array.
<li>The {@code src} argument and {@code dest} argument refer
    to arrays whose component types are different primitive types.
<li>The {@code src} argument refers to an array with a primitive
   component type and the {@code dest} argument refers to an array
    with a reference component type.
<li>The {@code src} argument refers to an array with a reference
   component type and the {@code dest} argument refers to an array
    with a primitive component type.
</ul>
<p>
Otherwise, if any of the following is true, an
{@code IndexOutOfBoundsException} is
thrown and the destination is not modified:
<ul>
<li>The {@code srcPos} argument is negative.
<li>The {@code destPos} argument is negative.
<li>The {@code length} argument is negative.
<li>{@code srcPos+length} is greater than
    {@code src.length}, the length of the source array.
<li>{@code destPos+length} is greater than
    {@code dest.length}, the length of the destination array.
</ul>
<p>
Otherwise, if any actual component of the source array from
position {@code srcPos} through
{@code srcPos+length-1} cannot be converted to the component
type of the destination array by assignment conversion, an
{@code ArrayStoreException} is thrown. In this case, let
<b><i>k</i></b> be the smallest nonnegative integer less than
length such that {@code src[srcPos+}<i>k</i>{@code ]}
cannot be converted to the component type of the destination
array; when the exception is thrown, source array components from
positions {@code srcPos} through
{@code srcPos+}<i>k</i>{@code -1}
will already have been copied to destination array positions
{@code destPos} through
{@code destPos+}<i>k</I>{@code -1} and no other
positions of the destination array will have been modified.
(Because of the restrictions already itemized, this
paragraph effectively applies only to the situation where both
arrays have component types that are reference types.)

@param      src      the source array.
@param      srcPos   starting position in the source array.
@param      dest     the destination array.
@param      destPos  starting position in the destination data.
@param      length   the number of array elements to be copied.
@throws     IndexOutOfBoundsException  if copying would cause
            access of data outside array bounds.
@throws     ArrayStoreException  if an element in the {@code src}
            array could not be stored into the {@code dest} array
            because of a type mismatch.
@throws     NullPointerException if either {@code src} or
            {@code dest} is {@code null}.

## System.identityHashCode(Object)

```java
public static native int identityHashCode(Object x)
```

Returns the same hash code for the given object as
would be returned by the default method hashCode(),
whether or not the given object's class overrides
hashCode().
The hash code for the null reference is zero.

@param x object for which the hashCode is to be calculated
@return  the hashCode
@since   1.1
@see Object#hashCode
@see java.util.Objects#hashCode(Object)

## System.getProperties()

```java
public static Properties getProperties()
```

Determines the current system properties.
<p>
The current set of system properties for use by the
{@link #getProperty(String)} method is returned as a
{@code Properties} object. If there is no current set of
system properties, a set of system properties is first created and
initialized. This set of system properties includes a value
for each of the following keys unless the description of the associated
value indicates that the value is optional.
<table class="striped" style="text-align:left">
<caption style="display:none">Shows property keys and associated values</caption>
<thead>
<tr><th scope="col">Key</th>
    <th scope="col">Description of Associated Value</th></tr>
</thead>
<tbody>
<tr><th scope="row">{@systemProperty java.version}</th>
    <td>Java Runtime Environment version, which may be interpreted
    as a {@link Runtime.Version}</td></tr>
<tr><th scope="row">{@systemProperty java.version.date}</th>
    <td>Java Runtime Environment version date, in ISO-8601 YYYY-MM-DD
    format, which may be interpreted as a {@link
    java.time.LocalDate}</td></tr>
<tr><th scope="row">{@systemProperty java.vendor}</th>
    <td>Java Runtime Environment vendor</td></tr>
<tr><th scope="row">{@systemProperty java.vendor.url}</th>
    <td>Java vendor URL</td></tr>
<tr><th scope="row">{@systemProperty java.vendor.version}</th>
    <td>Java vendor version <em>(optional)</em> </td></tr>
<tr><th scope="row">{@systemProperty java.home}</th>
    <td>Java installation directory</td></tr>
<tr><th scope="row">{@systemProperty java.vm.specification.version}</th>
    <td>Java Virtual Machine specification version, whose value is the
    {@linkplain Runtime.Version#feature feature} element of the
    {@linkplain Runtime#version() runtime version}</td></tr>
<tr><th scope="row">{@systemProperty java.vm.specification.vendor}</th>
    <td>Java Virtual Machine specification vendor</td></tr>
<tr><th scope="row">{@systemProperty java.vm.specification.name}</th>
    <td>Java Virtual Machine specification name</td></tr>
<tr><th scope="row">{@systemProperty java.vm.version}</th>
    <td>Java Virtual Machine implementation version which may be
    interpreted as a {@link Runtime.Version}</td></tr>
<tr><th scope="row">{@systemProperty java.vm.vendor}</th>
    <td>Java Virtual Machine implementation vendor</td></tr>
<tr><th scope="row">{@systemProperty java.vm.name}</th>
    <td>Java Virtual Machine implementation name</td></tr>
<tr><th scope="row">{@systemProperty java.specification.version}</th>
    <td>Java Runtime Environment specification version, whose value is
    the {@linkplain Runtime.Version#feature feature} element of the
    {@linkplain Runtime#version() runtime version}</td></tr>
<tr><th scope="row">{@systemProperty java.specification.maintenance.version}</th>
    <td>Java Runtime Environment specification maintenance version,
    may be interpreted as a positive integer <em>(optional, see below)</em></td></tr>
<tr><th scope="row">{@systemProperty java.specification.vendor}</th>
    <td>Java Runtime Environment specification  vendor</td></tr>
<tr><th scope="row">{@systemProperty java.specification.name}</th>
    <td>Java Runtime Environment specification  name</td></tr>
<tr><th scope="row">{@systemProperty java.class.version}</th>
    <td>{@linkplain java.lang.reflect.ClassFileFormatVersion#latest() Latest}
    Java class file format version recognized by the Java runtime as {@code "MAJOR.MINOR"}
    where {@link java.lang.reflect.ClassFileFormatVersion#major() MAJOR} and {@code MINOR}
    are both formatted as decimal integers</td></tr>
<tr><th scope="row">{@systemProperty java.class.path}</th>
    <td>Java class path  (refer to
       {@link ClassLoader#getSystemClassLoader()} for details)</td></tr>
<tr><th scope="row">{@systemProperty java.library.path}</th>
    <td>List of paths to search when loading libraries</td></tr>
<tr><th scope="row">{@systemProperty java.io.tmpdir}</th>
    <td>Default temp file path</td></tr>
<tr><th scope="row">{@systemProperty os.name}</th>
    <td>Operating system name</td></tr>
<tr><th scope="row">{@systemProperty os.arch}</th>
    <td>Operating system architecture</td></tr>
<tr><th scope="row">{@systemProperty os.version}</th>
    <td>Operating system version</td></tr>
<tr><th scope="row">{@systemProperty file.separator}</th>
    <td>File separator ("/" on UNIX)</td></tr>
<tr><th scope="row">{@systemProperty path.separator}</th>
    <td>Path separator (":" on UNIX)</td></tr>
<tr><th scope="row">{@systemProperty line.separator}</th>
    <td>Line separator ("\n" on UNIX)</td></tr>
<tr><th scope="row">{@systemProperty user.name}</th>
    <td>User's account name</td></tr>
<tr><th scope="row">{@systemProperty user.home}</th>
    <td>User's home directory</td></tr>
<tr><th scope="row">{@systemProperty user.dir}</th>
    <td>User's current working directory</td></tr>
<tr><th scope="row">{@systemProperty native.encoding}</th>
    <td>Character encoding name derived from the host environment and
    the user's settings. Setting this system property on the command line
    has no effect.</td></tr>
<tr><th scope="row">{@systemProperty stdin.encoding}</th>
    <td>Character encoding name for {@link System#in System.in}.
    The Java runtime can be started with the system property set to {@code UTF-8}.
    Starting it with the property set to another value results in unspecified behavior.
<tr><th scope="row">{@systemProperty stdout.encoding}</th>
    <td>Character encoding name for {@link System#out System.out} and
    {@link System#console() System.console()}.
    The Java runtime can be started with the system property set to {@code UTF-8}.
    Starting it with the property set to another value results in unspecified behavior.
<tr><th scope="row">{@systemProperty stderr.encoding}</th>
    <td>Character encoding name for {@link System#err System.err}.
    The Java runtime can be started with the system property set to {@code UTF-8}.
    Starting it with the property set to another value results in unspecified behavior.
</tbody>
</table>
<p>
The {@code java.specification.maintenance.version} property is
defined if the specification implemented by this runtime at the
time of its construction had undergone a <a
href="https://jcp.org/en/procedures/jcp2#3.6.4">maintenance
release</a>. When defined, its value identifies that
maintenance release. To indicate the first maintenance release
this property will have the value {@code "1"}, to indicate the
second maintenance release this property will have the value
{@code "2"}, and so on.
<p>
Multiple paths in a system property value are separated by the path
separator character of the platform.
<p>
Additional locale-related system properties defined by the
{@link Locale##default_locale Default Locale} section in the {@code Locale}
class description may also be obtained with this method.

@apiNote
<strong>Changing a standard system property may have unpredictable results
unless otherwise specified.</strong>
Property values may be cached during initialization or on first use.
Setting a standard property after initialization using {@link #getProperties()},
{@link #setProperties(Properties)}, {@link #setProperty(String, String)}, or
{@link #clearProperty(String)} may not have the desired effect.

@implNote
In addition to the standard system properties, the system
properties may include the following keys:
<table class="striped">
<caption style="display:none">Shows property keys and associated values</caption>
<thead>
<tr><th scope="col">Key</th>
    <th scope="col">Description of Associated Value</th></tr>
</thead>
<tbody>
<tr><th scope="row">{@systemProperty jdk.module.path}</th>
    <td>The application module path</td></tr>
<tr><th scope="row">{@systemProperty jdk.module.upgrade.path}</th>
    <td>The upgrade module path</td></tr>
<tr><th scope="row">{@systemProperty jdk.module.main}</th>
    <td>The module name of the initial/main module</td></tr>
<tr><th scope="row">{@systemProperty jdk.module.main.class}</th>
    <td>The main class name of the initial module</td></tr>
<tr><th scope="row">{@systemProperty file.encoding}</th>
    <td>The name of the default charset, defaults to {@code UTF-8}.
    The property may be set on the command line to the value
    {@code UTF-8} or {@code COMPAT}. If set on the command line to
    the value {@code COMPAT} then the value is replaced with the
    value of the {@code native.encoding} property during startup.
    Setting the property to a value other than {@code UTF-8} or
    {@code COMPAT} results in unspecified behavior.
    </td></tr>
</tbody>
</table>

@return     the system properties
@see        #setProperties
@see        java.util.Properties

## System.lineSeparator()

```java
public static String lineSeparator()
```

Returns the system-dependent line separator string.  It always
returns the same value - the initial value of the {@linkplain
#getProperty(String) system property} {@code line.separator}.

<p>On UNIX systems, it returns {@code "\n"}; on Microsoft
Windows systems it returns {@code "\r\n"}.

@return the system-dependent line separator string
@since 1.7

## System.setProperties(Properties)

```java
public static void setProperties(Properties props)
```

Sets the system properties to the {@code Properties} argument.
<p>
The argument becomes the current set of system properties for use
by the {@link #getProperty(String)} method. If the argument is
{@code null}, then the current set of system properties is
forgotten.

@apiNote
<strong>Changing a standard system property may have unpredictable results
unless otherwise specified</strong>.
See {@linkplain #getProperties getProperties} for details.

@param      props   the new system properties.
@see        #getProperties
@see        java.util.Properties

## System.getProperty(String)

```java
public static String getProperty(String key)
```

Gets the system property indicated by the specified key.
<p>
If there is no current set of system properties, a set of system
properties is first created and initialized in the same manner as
for the {@code getProperties} method.

@apiNote
<strong>Changing a standard system property may have unpredictable results
unless otherwise specified</strong>.
See {@linkplain #getProperties getProperties} for details.

@param      key   the name of the system property.
@return     the string value of the system property,
            or {@code null} if there is no property with that key.

@throws     NullPointerException if {@code key} is {@code null}.
@throws     IllegalArgumentException if {@code key} is empty.
@see        #setProperty
@see        java.lang.System#getProperties()

## System.getProperty(String, String)

```java
public static String getProperty(String key, String def)
```

Gets the system property indicated by the specified key.
<p>
If there is no current set of system properties, a set of system
properties is first created and initialized in the same manner as
for the {@code getProperties} method.

@param      key   the name of the system property.
@param      def   a default value.
@return     the string value of the system property,
            or the default value if there is no property with that key.

@throws     NullPointerException if {@code key} is {@code null}.
@throws     IllegalArgumentException if {@code key} is empty.
@see        #setProperty
@see        java.lang.System#getProperties()

## System.setProperty(String, String)

```java
public static String setProperty(String key, String value)
```

Sets the system property indicated by the specified key.

@apiNote
<strong>Changing a standard system property may have unpredictable results
unless otherwise specified</strong>.
See {@linkplain #getProperties getProperties} for details.

@param      key   the name of the system property.
@param      value the value of the system property.
@return     the previous value of the system property,
            or {@code null} if it did not have one.

@throws     NullPointerException if {@code key} or
            {@code value} is {@code null}.
@throws     IllegalArgumentException if {@code key} is empty.
@see        #getProperty
@see        java.lang.System#getProperty(java.lang.String)
@see        java.lang.System#getProperty(java.lang.String, java.lang.String)
@since      1.2

## System.clearProperty(String)

```java
public static String clearProperty(String key)
```

Removes the system property indicated by the specified key.

@apiNote
<strong>Changing a standard system property may have unpredictable results
unless otherwise specified</strong>.
See {@linkplain #getProperties getProperties} method for details.

@param      key   the name of the system property to be removed.
@return     the previous string value of the system property,
            or {@code null} if there was no property with that key.

@throws     NullPointerException if {@code key} is {@code null}.
@throws     IllegalArgumentException if {@code key} is empty.
@see        #getProperty
@see        #setProperty
@see        java.util.Properties
@since 1.5

## System.getenv(String)

```java
public static String getenv(String name)
```

Gets the value of the specified environment variable. An
environment variable is a system-dependent external named
value.

<p><a id="EnvironmentVSSystemProperties"><i>System
properties</i> and <i>environment variables</i></a> are both
conceptually mappings between names and values.  Both
mechanisms can be used to pass user-defined information to a
Java process.  Environment variables have a more global effect,
because they are visible to all descendants of the process
which defines them, not just the immediate Java subprocess.
They can have subtly different semantics, such as case
insensitivity, on different operating systems.  For these
reasons, environment variables are more likely to have
unintended side effects.  It is best to use system properties
where possible.  Environment variables should be used when a
global effect is desired, or when an external system interface
requires an environment variable (such as {@code PATH}).

<p>On UNIX systems the alphabetic case of {@code name} is
typically significant, while on Microsoft Windows systems it is
typically not.  For example, the expression
{@code System.getenv("FOO").equals(System.getenv("foo"))}
is likely to be true on Microsoft Windows.

@param  name the name of the environment variable
@return the string value of the variable, or {@code null}
        if the variable is not defined in the system environment
@throws NullPointerException if {@code name} is {@code null}
@see    #getenv()
@see    ProcessBuilder#environment()

## System.getenv()

```java
public static java.util.Map<String,String> getenv()
```

Returns an unmodifiable string map view of the current system environment.
The environment is a system-dependent mapping from names to
values which is passed from parent to child processes.

<p>If the system does not support environment variables, an
empty map is returned.

<p>The returned map will never contain null keys or values.
Attempting to query the presence of a null key or value will
throw a {@link NullPointerException}.  Attempting to query
the presence of a key or value which is not of type
{@link String} will throw a {@link ClassCastException}.

<p>The returned map and its collection views may not obey the
general contract of the {@link Object#equals} and
{@link Object#hashCode} methods.

<p>The returned map is typically case-sensitive on all platforms.

<p>When passing information to a Java subprocess,
<a href=#EnvironmentVSSystemProperties>system properties</a>
are generally preferred over environment variables.

@return the environment as a map of variable names to values
@see    #getenv(String)
@see    ProcessBuilder#environment()
@since  1.5

## System.getName()

```java
public final String getName()
```

Returns the name of this level.
@return this level {@linkplain #name()}.

## System.getSeverity()

```java
public final int getSeverity()
```

Returns the severity of this level.
A higher severity means a more severe condition.
@return this level severity.

## System.getName()

```java
public String getName()
```

Returns the name of this logger.

@return the logger name.

## System.isLoggable(Level)

```java
public boolean isLoggable(Level level)
```

Checks if a message of the given level would be logged by
this logger.

@param level the log message level.
@return {@code true} if the given log message level is currently
        being logged.

@throws NullPointerException if {@code level} is {@code null}.

## System.log(Level, String)

```java
public default void log(Level level, String msg)
```

Logs a message.

@implSpec The default implementation for this method calls
{@code this.log(level, (ResourceBundle)null, msg, (Object[])null);}

@param level the log message level.
@param msg the string message (or a key in the message catalog, if
this logger is a {@link
LoggerFinder#getLocalizedLogger(java.lang.String,
java.util.ResourceBundle, java.lang.Module) localized logger});
can be {@code null}.

@throws NullPointerException if {@code level} is {@code null}.

## System.log(Level, Supplier<String>)

```java
public default void log(Level level, Supplier<String> msgSupplier)
```

Logs a lazily supplied message.

If the logger is currently enabled for the given log message level
then a message is logged that is the result produced by the
given supplier function.  Otherwise, the supplier is not operated on.

@implSpec When logging is enabled for the given level, the default
implementation for this method calls
{@code this.log(level, (ResourceBundle)null, msgSupplier.get(), (Object[])null);}

@param level the log message level.
@param msgSupplier a supplier function that produces a message.

@throws NullPointerException if {@code level} is {@code null},
        or {@code msgSupplier} is {@code null}.

## System.log(Level, Object)

```java
public default void log(Level level, Object obj)
```

Logs a message produced from the given object.

If the logger is currently enabled for the given log message level then
a message is logged that, by default, is the result produced from
calling  toString on the given object.
Otherwise, the object is not operated on.

@implSpec When logging is enabled for the given level, the default
implementation for this method calls
{@code this.log(level, (ResourceBundle)null, obj.toString(), (Object[])null);}

@param level the log message level.
@param obj the object to log.

@throws NullPointerException if {@code level} is {@code null}, or
        {@code obj} is {@code null}.

## System.log(Level, String, Throwable)

```java
public default void log(Level level, String msg, Throwable thrown)
```

Logs a message associated with a given throwable.

@implSpec The default implementation for this method calls
{@code this.log(level, (ResourceBundle)null, msg, thrown);}

@param level the log message level.
@param msg the string message (or a key in the message catalog, if
this logger is a {@link
LoggerFinder#getLocalizedLogger(java.lang.String,
java.util.ResourceBundle, java.lang.Module) localized logger});
can be {@code null}.
@param thrown a {@code Throwable} associated with the log message;
       can be {@code null}.

@throws NullPointerException if {@code level} is {@code null}.

## System.log(Level, Supplier<String>, Throwable)

```java
public default void log(Level level, Supplier<String> msgSupplier, Throwable thrown)
```

Logs a lazily supplied message associated with a given throwable.

If the logger is currently enabled for the given log message level
then a message is logged that is the result produced by the
given supplier function.  Otherwise, the supplier is not operated on.

@implSpec When logging is enabled for the given level, the default
implementation for this method calls
{@code this.log(level, (ResourceBundle)null, msgSupplier.get(), thrown);}

@param level one of the log message level identifiers.
@param msgSupplier a supplier function that produces a message.
@param thrown a {@code Throwable} associated with log message;
              can be {@code null}.

@throws NullPointerException if {@code level} is {@code null}, or
                              {@code msgSupplier} is {@code null}.

## System.log(Level, String, Object...)

```java
public default void log(Level level, String format, Object... params)
```

Logs a message with an optional list of parameters.

@implSpec The default implementation for this method calls
{@code this.log(level, (ResourceBundle)null, format, params);}

@param level one of the log message level identifiers.
@param format the string message format in {@link
java.text.MessageFormat} format, (or a key in the message
catalog, if this logger is a {@link
LoggerFinder#getLocalizedLogger(java.lang.String,
java.util.ResourceBundle, java.lang.Module) localized logger});
can be {@code null}.
@param params an optional list of parameters to the message (may be
none).

@throws NullPointerException if {@code level} is {@code null}.

## System.log(Level, ResourceBundle, String, Throwable)

```java
public void log(Level level, ResourceBundle bundle, String msg, Throwable thrown)
```

Logs a localized message associated with a given throwable.

If the given resource bundle is non-{@code null},  the {@code msg}
string is localized using the given resource bundle.
Otherwise the {@code msg} string is not localized.

@param level the log message level.
@param bundle a resource bundle to localize {@code msg}; can be
{@code null}.
@param msg the string message (or a key in the message catalog,
           if {@code bundle} is not {@code null}); can be {@code null}.
@param thrown a {@code Throwable} associated with the log message;
       can be {@code null}.

@throws NullPointerException if {@code level} is {@code null}.

## System.log(Level, ResourceBundle, String, Object...)

```java
public void log(Level level, ResourceBundle bundle, String format, Object... params)
```

Logs a message with resource bundle and an optional list of
parameters.

If the given resource bundle is non-{@code null},  the {@code format}
string is localized using the given resource bundle.
Otherwise the {@code format} string is not localized.

@param level the log message level.
@param bundle a resource bundle to localize {@code format}; can be
{@code null}.
@param format the string message format in {@link
java.text.MessageFormat} format, (or a key in the message
catalog if {@code bundle} is not {@code null}); can be {@code null}.
@param params an optional list of parameters to the message (may be
none).

@throws NullPointerException if {@code level} is {@code null}.

## System.LoggerFinder()

```java
protected LoggerFinder()
```

Creates a new instance of {@code LoggerFinder}.

@implNote It is recommended that a {@code LoggerFinder} service
  implementation does not perform any heavy initialization in its
  constructor, in order to avoid possible risks of deadlock or class
  loading cycles during the instantiation of the service provider.

## System.getLogger(String, Module)

```java
public abstract Logger getLogger(String name, Module module)
```

Returns an instance of {@link Logger Logger}
for the given {@code module}.

@param name the name of the logger.
@param module the module for which the logger is being requested.

@return a {@link Logger logger} suitable for use within the given
        module.
@throws NullPointerException if {@code name} is {@code null} or
       {@code module} is {@code null}.

## System.getLocalizedLogger(String, ResourceBundle, Module)

```java
public Logger getLocalizedLogger(String name, ResourceBundle bundle, Module module)
```

Returns a localizable instance of {@link Logger Logger}
for the given {@code module}.
The returned logger will use the provided resource bundle for
message localization.

@implSpec By default, this method calls {@link
#getLogger(java.lang.String, java.lang.Module)
this.getLogger(name, module)} to obtain a logger, then wraps that
logger in a {@link Logger} instance where all methods that do not
take a {@link ResourceBundle} as parameter are redirected to one
which does - passing the given {@code bundle} for
localization. So for instance, a call to {@link
Logger#log(Logger.Level, String) Logger.log(Level.INFO, msg)}
will end up as a call to {@link
Logger#log(Logger.Level, ResourceBundle, String, Object...)
Logger.log(Level.INFO, bundle, msg, (Object[])null)} on the wrapped
logger instance.
Note however that by default, string messages returned by {@link
java.util.function.Supplier Supplier&lt;String&gt;} will not be
localized, as it is assumed that such strings are messages which are
already constructed, rather than keys in a resource bundle.
<p>
An implementation of {@code LoggerFinder} may override this method,
for example, when the underlying logging backend provides its own
mechanism for localizing log messages, then such a
{@code LoggerFinder} would be free to return a logger
that makes direct use of the mechanism provided by the backend.

@param name    the name of the logger.
@param bundle  a resource bundle; can be {@code null}.
@param module  the module for which the logger is being requested.
@return an instance of {@link Logger Logger}  which will use the
provided resource bundle for message localization.

@throws NullPointerException if {@code name} is {@code null} or
        {@code module} is {@code null}.

## System.getLoggerFinder()

```java
public static LoggerFinder getLoggerFinder()
```

Returns the {@code LoggerFinder} instance. There is one
single system-wide {@code LoggerFinder} instance in
the Java Runtime.  See the class specification of how the
{@link LoggerFinder LoggerFinder} implementation is located and
loaded.

@return the {@link LoggerFinder LoggerFinder} instance.

## System.getLogger(String)

```java
public static Logger getLogger(String name)
```

Returns an instance of {@link Logger Logger} for the caller's
use.

@implSpec
Instances returned by this method route messages to loggers
obtained by calling {@link LoggerFinder#getLogger(java.lang.String,
java.lang.Module) LoggerFinder.getLogger(name, module)}, where
{@code module} is the caller's module.
In cases where {@code System.getLogger} is called from a context where
there is no caller frame on the stack (e.g when called directly
from a JNI attached thread), {@code IllegalCallerException} is thrown.
To obtain a logger in such a context, use an auxiliary class that will
implicitly be identified as the caller, or use the system {@link
LoggerFinder#getLoggerFinder() LoggerFinder} to obtain a logger instead.
Note that doing the latter may eagerly initialize the underlying
logging system.

@apiNote
This method may defer calling the {@link
LoggerFinder#getLogger(java.lang.String, java.lang.Module)
LoggerFinder.getLogger} method to create an actual logger supplied by
the logging backend, for instance, to allow loggers to be obtained during
the system initialization time.

@param name the name of the logger.
@return an instance of {@link Logger} that can be used by the calling
        class.
@throws NullPointerException if {@code name} is {@code null}.
@throws IllegalCallerException if there is no Java caller frame on the
        stack.

@since 9

## System.getLogger(String, ResourceBundle)

```java
public static Logger getLogger(String name, ResourceBundle bundle)
```

Returns a localizable instance of {@link Logger
Logger} for the caller's use.
The returned logger will use the provided resource bundle for message
localization.

@implSpec
The returned logger will perform message localization as specified
by {@link LoggerFinder#getLocalizedLogger(java.lang.String,
java.util.ResourceBundle, java.lang.Module)
LoggerFinder.getLocalizedLogger(name, bundle, module)}, where
{@code module} is the caller's module.
In cases where {@code System.getLogger} is called from a context where
there is no caller frame on the stack (e.g when called directly
from a JNI attached thread), {@code IllegalCallerException} is thrown.
To obtain a logger in such a context, use an auxiliary class that
will implicitly be identified as the caller, or use the system {@link
LoggerFinder#getLoggerFinder() LoggerFinder} to obtain a logger instead.
Note that doing the latter may eagerly initialize the underlying
logging system.

@apiNote
This method is intended to be used after the system is fully initialized.
This method may trigger the immediate loading and initialization
of the {@link LoggerFinder} service, which may cause issues if the
Java Runtime is not ready to initialize the concrete service
implementation yet.
System classes which may be loaded early in the boot sequence and
need to log localized messages should create a logger using
{@link #getLogger(java.lang.String)} and then use the log methods that
take a resource bundle as parameter.

@param name    the name of the logger.
@param bundle  a resource bundle.
@return an instance of {@link Logger} which will use the provided
resource bundle for message localization.
@throws NullPointerException if {@code name} is {@code null} or
        {@code bundle} is {@code null}.
@throws IllegalCallerException if there is no Java caller frame on the
        stack.

@since 9

## System.exit(int)

```java
public static void exit(int status)
```

Initiates the {@linkplain Runtime##shutdown shutdown sequence} of the Java Virtual
Machine. This method initiates the shutdown sequence (if it is not already initiated)
and then blocks indefinitely. This method neither returns nor throws an exception;
that is, it does not complete either normally or abruptly.
<p>
The argument serves as a status code. By convention, a nonzero status code
indicates abnormal termination.
<p>
The call {@code System.exit(n)} is effectively equivalent to the call:
{@snippet :
    Runtime.getRuntime().exit(n)
}

@implNote
The initiation of the shutdown sequence is logged by {@link Runtime#exit(int)}.

@param  status exit status.
@see    java.lang.Runtime#exit(int)

## System.gc()

```java
public static void gc()
```

Runs the garbage collector in the Java Virtual Machine.
<p>
Calling the {@code gc} method suggests that the Java Virtual Machine
expend effort toward recycling unused objects in order to
make the memory they currently occupy available for reuse
by the Java Virtual Machine.
When control returns from the method call, the Java Virtual Machine
has made a best effort to reclaim space from all unused objects.
There is no guarantee that this effort will recycle any particular
number of unused objects, reclaim any particular amount of space, or
complete at any particular time, if at all, before the method returns or ever.
There is also no guarantee that this effort will determine
the change of reachability in any particular number of objects,
or that any particular number of {@link java.lang.ref.Reference Reference}
objects will be cleared and enqueued.

<p>
The call {@code System.gc()} is effectively equivalent to the
call:
<blockquote><pre>
Runtime.getRuntime().gc()
</pre></blockquote>

@see     java.lang.Runtime#gc()

## System.runFinalization()

```java
public static void runFinalization()
```

Runs the finalization methods of any objects pending finalization.

Calling this method suggests that the Java Virtual Machine expend
effort toward running the {@code finalize} methods of objects
that have been found to be discarded but whose {@code finalize}
methods have not yet been run. When control returns from the
method call, the Java Virtual Machine has made a best effort to
complete all outstanding finalizations.
<p>
The call {@code System.runFinalization()} is effectively
equivalent to the call:
<blockquote><pre>
Runtime.getRuntime().runFinalization()
</pre></blockquote>

@deprecated Finalization has been deprecated for removal.  See
{@link java.lang.Object#finalize} for background information and details
about migration options.
<p>
When running in a JVM in which finalization has been disabled or removed,
no objects will be pending finalization, so this method does nothing.

@see     java.lang.Runtime#runFinalization()
@jls 12.6 Finalization of Class Instances

## System.load(String)

```java
public static void load(String filename)
```

Loads the native library specified by the filename argument.  The filename
argument must be an absolute path name.

If the filename argument, when stripped of any platform-specific library
prefix, path, and file extension, indicates a library whose name is,
for example, L, and a native library called L is statically linked
with the VM, then the JNI_OnLoad_L function exported by the library
is invoked rather than attempting to load a dynamic library.
A filename matching the argument does not have to exist in the
file system.
See the <a href="{@docRoot}/../specs/jni/index.html"> JNI Specification</a>
for more details.

Otherwise, the filename argument is mapped to a native library image in
an implementation-dependent manner.

<p>
The call {@code System.load(name)} is effectively equivalent
to the call:
<blockquote><pre>
Runtime.getRuntime().load(name)
</pre></blockquote>

@param      filename   the file to load.
@throws     UnsatisfiedLinkError  if either the filename is not an
            absolute path name, the native library is not statically
            linked with the VM, or the library cannot be mapped to
            a native library image by the host system.
@throws     NullPointerException if {@code filename} is {@code null}
@throws     IllegalCallerException if the caller is in a module that
            does not have native access enabled.

@spec jni/index.html Java Native Interface Specification
@see        java.lang.Runtime#load(java.lang.String)

## System.loadLibrary(String)

```java
public static void loadLibrary(String libname)
```

Loads the native library specified by the {@code libname}
argument.  The {@code libname} argument must not contain any platform
specific prefix, file extension or path. If a native library
called {@code libname} is statically linked with the VM, then the
JNI_OnLoad_{@code libname} function exported by the library is invoked.
See the <a href="{@docRoot}/../specs/jni/index.html"> JNI Specification</a>
for more details.

Otherwise, the libname argument is loaded from a system library
location and mapped to a native library image in an
implementation-dependent manner.
<p>
The call {@code System.loadLibrary(name)} is effectively
equivalent to the call
<blockquote><pre>
Runtime.getRuntime().loadLibrary(name)
</pre></blockquote>

@param      libname   the name of the library.
@throws     UnsatisfiedLinkError if either the libname argument
            contains a file path, the native library is not statically
            linked with the VM,  or the library cannot be mapped to a
            native library image by the host system.
@throws     NullPointerException if {@code libname} is {@code null}
@throws     IllegalCallerException if the caller is in a module that
            does not have native access enabled.

@spec jni/index.html Java Native Interface Specification
@see        java.lang.Runtime#loadLibrary(java.lang.String)

## System.mapLibraryName(String)

```java
public static native String mapLibraryName(String libname)
```

Maps a library name into a platform-specific string representing
a native library.

@param      libname the name of the library.
@return     a platform-dependent native library name.
@throws     NullPointerException if {@code libname} is {@code null}
@see        java.lang.System#loadLibrary(java.lang.String)
@see        java.lang.ClassLoader#findLibrary(java.lang.String)
@since      1.2