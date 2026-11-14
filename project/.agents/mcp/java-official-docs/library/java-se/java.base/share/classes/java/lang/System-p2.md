---
title: "System class (java.lang) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/System.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# System class (java.lang) (part 2 of 4)

## System.getProperties()

```java
public static Properties getProperties()
```

Determines the current system properties.

The current set of system properties for use by the
`getProperty(String)` method is returned as a
`Properties` object. If there is no current set of
system properties, a set of system properties is first created and
initialized. This set of system properties includes a value
for each of the following keys unless the description of the associated
value indicates that the value is optional.

Shows property keys and associated values

Key
    Description of Associated Value

`java.version`
    Java Runtime Environment version, which may be interpreted
    as a `Runtime.Version`
`java.version.date`
    Java Runtime Environment version date, in ISO-8601 YYYY-MM-DD
    format, which may be interpreted as a `java.time.LocalDate`
`java.vendor`
    Java Runtime Environment vendor
`java.vendor.url`
    Java vendor URL
`java.vendor.version`
    Java vendor version *(optional)*
`java.home`
    Java installation directory
`java.vm.specification.version`
    Java Virtual Machine specification version, whose value is the
    feature element of the
    runtime version
`java.vm.specification.vendor`
    Java Virtual Machine specification vendor
`java.vm.specification.name`
    Java Virtual Machine specification name
`java.vm.version`
    Java Virtual Machine implementation version which may be
    interpreted as a `Runtime.Version`
`java.vm.vendor`
    Java Virtual Machine implementation vendor
`java.vm.name`
    Java Virtual Machine implementation name
`java.specification.version`
    Java Runtime Environment specification version, whose value is
    the feature element of the
    runtime version
`java.specification.maintenance.version`
    Java Runtime Environment specification maintenance version,
    may be interpreted as a positive integer *(optional, see below)*
`java.specification.vendor`
    Java Runtime Environment specification  vendor
`java.specification.name`
    Java Runtime Environment specification  name
`java.class.version`
    Latest
    Java class file format version recognized by the Java runtime as `"MAJOR.MINOR"`
    where MAJOR and `MINOR`
    are both formatted as decimal integers
`java.class.path`
    Java class path  (refer to
       `ClassLoader.getSystemClassLoader()` for details)
`java.library.path`
    List of paths to search when loading libraries
`java.io.tmpdir`
    Default temp file path
`os.name`
    Operating system name
`os.arch`
    Operating system architecture
`os.version`
    Operating system version
`file.separator`
    File separator ("/" on UNIX)
`path.separator`
    Path separator (":" on UNIX)
`line.separator`
    Line separator ("\n" on UNIX)
`user.name`
    User's account name
`user.home`
    User's home directory
`user.dir`
    User's current working directory
`native.encoding`
    Character encoding name derived from the host environment and
    the user's settings. Setting this system property on the command line
    has no effect.
`stdin.encoding`
    Character encoding name for System.in.
    The Java runtime can be started with the system property set to `UTF-8`.
    Starting it with the property set to another value results in unspecified behavior.
`stdout.encoding`
    Character encoding name for System.out and
    System.console().
    The Java runtime can be started with the system property set to `UTF-8`.
    Starting it with the property set to another value results in unspecified behavior.
`stderr.encoding`
    Character encoding name for System.err.
    The Java runtime can be started with the system property set to `UTF-8`.
    Starting it with the property set to another value results in unspecified behavior.

The `java.specification.maintenance.version` property is
defined if the specification implemented by this runtime at the
time of its construction had undergone a maintenance
release. When defined, its value identifies that
maintenance release. To indicate the first maintenance release
this property will have the value `"1"`, to indicate the
second maintenance release this property will have the value
`"2"`, and so on.

Multiple paths in a system property value are separated by the path
separator character of the platform.

Additional locale-related system properties defined by the
Default Locale section in the `Locale`
class description may also be obtained with this method.

**API note:** **Changing a standard system property may have unpredictable results
unless otherwise specified.**
Property values may be cached during initialization or on first use.
Setting a standard property after initialization using `getProperties()`,
`setProperties(Properties)`, String), or
`clearProperty(String)` may not have the desired effect.

**Implementation note:** In addition to the standard system properties, the system
properties may include the following keys:

Shows property keys and associated values

Key
    Description of Associated Value

`jdk.module.path`
    The application module path
`jdk.module.upgrade.path`
    The upgrade module path
`jdk.module.main`
    The module name of the initial/main module
`jdk.module.main.class`
    The main class name of the initial module
`file.encoding`
    The name of the default charset, defaults to `UTF-8`.
    The property may be set on the command line to the value
    `UTF-8` or `COMPAT`. If set on the command line to
    the value `COMPAT` then the value is replaced with the
    value of the `native.encoding` property during startup.
    Setting the property to a value other than `UTF-8` or
    `COMPAT` results in unspecified behavior.

**Returns:** the system properties

**See also:** #setProperties

**See also:** java.util.Properties

## System.lineSeparator()

```java
public static String lineSeparator()
```

Returns the system-dependent line separator string.  It always
returns the same value - the initial value of the system property `line.separator`.

On UNIX systems, it returns `"\n"`; on Microsoft
Windows systems it returns `"\r\n"`.

**Returns:** the system-dependent line separator string

**Since:** 1.7

## System.setProperties(Properties)

```java
public static void setProperties(Properties props)
```

Sets the system properties to the `Properties` argument.

The argument becomes the current set of system properties for use
by the `getProperty(String)` method. If the argument is
`null`, then the current set of system properties is
forgotten.

Parameters:

- `props`: the new system properties.

**API note:** **Changing a standard system property may have unpredictable results
unless otherwise specified**.
See getProperties for details.

**See also:** #getProperties

**See also:** java.util.Properties

## System.getProperty(String)

```java
public static String getProperty(String key)
```

Gets the system property indicated by the specified key.

If there is no current set of system properties, a set of system
properties is first created and initialized in the same manner as
for the `getProperties` method.

Parameters:

- `key`: the name of the system property.

**API note:** **Changing a standard system property may have unpredictable results
unless otherwise specified**.
See getProperties for details.

**Returns:** the string value of the system property,
            or `null` if there is no property with that key.

**See also:** #setProperty

**See also:** java.lang.System#getProperties()

Throws:

- `NullPointerException`: if `key` is `null`.
- `IllegalArgumentException`: if `key` is empty.

## System.getProperty(String, String)

```java
public static String getProperty(String key, String def)
```

Gets the system property indicated by the specified key.

If there is no current set of system properties, a set of system
properties is first created and initialized in the same manner as
for the `getProperties` method.

Parameters:

- `key`: the name of the system property.
- `def`: a default value.

**Returns:** the string value of the system property,
            or the default value if there is no property with that key.

**See also:** #setProperty

**See also:** java.lang.System#getProperties()

Throws:

- `NullPointerException`: if `key` is `null`.
- `IllegalArgumentException`: if `key` is empty.

## System.setProperty(String, String)

```java
public static String setProperty(String key, String value)
```

Sets the system property indicated by the specified key.

Parameters:

- `key`: the name of the system property.
- `value`: the value of the system property.

**API note:** **Changing a standard system property may have unpredictable results
unless otherwise specified**.
See getProperties for details.

**Returns:** the previous value of the system property,
            or `null` if it did not have one.

**See also:** #getProperty

**See also:** java.lang.System#getProperty(java.lang.String)

**See also:** java.lang.System#getProperty(java.lang.String, java.lang.String)

**Since:** 1.2

Throws:

- `NullPointerException`: if `key` or `value` is `null`.
- `IllegalArgumentException`: if `key` is empty.

## System.clearProperty(String)

```java
public static String clearProperty(String key)
```

Removes the system property indicated by the specified key.

Parameters:

- `key`: the name of the system property to be removed.

**API note:** **Changing a standard system property may have unpredictable results
unless otherwise specified**.
See getProperties method for details.

**Returns:** the previous string value of the system property,
            or `null` if there was no property with that key.

**See also:** #getProperty

**See also:** #setProperty

**See also:** java.util.Properties

**Since:** 1.5

Throws:

- `NullPointerException`: if `key` is `null`.
- `IllegalArgumentException`: if `key` is empty.

## System.getenv(String)

```java
public static String getenv(String name)
```

Gets the value of the specified environment variable. An
environment variable is a system-dependent external named
value.

*System
properties* and *environment variables* are both
conceptually mappings between names and values.  Both
mechanisms can be used to pass <example-value> information to a
Java process.  Environment variables have a more global effect,
because they are visible to all descendants of the process
which defines them, not just the immediate Java subprocess.
They can have subtly different semantics, such as case
insensitivity, on different operating systems.  For these
reasons, environment variables are more likely to have
unintended side effects.  It is best to use system properties
where possible.  Environment variables should be used when a
global effect is desired, or when an external system interface
requires an environment variable (such as `PATH`).

On UNIX systems the alphabetic case of `name` is
typically significant, while on Microsoft Windows systems it is
typically not.  For example, the expression
`System.getenv("FOO").equals(System.getenv("foo"))`
is likely to be true on Microsoft Windows.

Parameters:

- `name`: the name of the environment variable

**Returns:** the string value of the variable, or `null`
        if the variable is not defined in the system environment

**See also:** #getenv()

**See also:** ProcessBuilder#environment()

Throws:

- `NullPointerException`: if `name` is `null`

## System.getenv()

```java
public static java.util.Map<String,String> getenv()
```

Returns an unmodifiable string map view of the current system environment.
The environment is a system-dependent mapping from names to
values which is passed from parent to child processes.

If the system does not support environment variables, an
empty map is returned.

The returned map will never contain null keys or values.
Attempting to query the presence of a null key or value will
throw a `NullPointerException`.  Attempting to query
the presence of a key or value which is not of type
`String` will throw a `ClassCastException`.

The returned map and its collection views may not obey the
general contract of the `Object.equals` and
`Object.hashCode` methods.

The returned map is typically case-sensitive on all platforms.

When passing information to a Java subprocess,
system properties
are generally preferred over environment variables.

**Returns:** the environment as a map of variable names to values

**See also:** #getenv(String)

**See also:** ProcessBuilder#environment()

**Since:** 1.5

## System.getName()

```java
public final String getName()
```

Returns the name of this level.

**Returns:** this level `name()`.

## System.getSeverity()

```java
public final int getSeverity()
```

Returns the severity of this level.
A higher severity means a more severe condition.

**Returns:** this level severity.

## System.getName()

```java
public String getName()
```

Returns the name of this logger.

**Returns:** the logger name.

## System.isLoggable(Level)

```java
public boolean isLoggable(Level level)
```

Checks if a message of the given level would be logged by
this logger.

Parameters:

- `level`: the log message level.

**Returns:** `true` if the given log message level is currently
        being logged.

Throws:

- `NullPointerException`: if `level` is `null`.

## System.log(Level, String)

```java
public default void log(Level level, String msg)
```

Logs a message.

Parameters:

- `level`: the log message level.
- `msg`: the string message (or a key in the message catalog, if this logger is a java.util.ResourceBundle, java.lang.Module) localized logger); can be `null`.

**Implementation requirements:** The default implementation for this method calls
`this.log(level, (ResourceBundle)null, msg, (Object[])null);`

Throws:

- `NullPointerException`: if `level` is `null`.

## System.log(Level, Supplier<String>)

```java
public default void log(Level level, Supplier<String> msgSupplier)
```

Logs a lazily supplied message.

If the logger is currently enabled for the given log message level
then a message is logged that is the result produced by the
given supplier function.  Otherwise, the supplier is not operated on.

Parameters:

- `level`: the log message level.
- `msgSupplier`: a supplier function that produces a message.

**Implementation requirements:** When logging is enabled for the given level, the default
implementation for this method calls
`this.log(level, (ResourceBundle)null, msgSupplier.get(), (Object[])null);`

Throws:

- `NullPointerException`: if `level` is `null`, or `msgSupplier` is `null`.
