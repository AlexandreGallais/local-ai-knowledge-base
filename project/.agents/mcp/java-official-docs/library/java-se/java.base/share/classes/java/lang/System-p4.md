---
title: "System class (java.lang) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/System.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# System class (java.lang) (part 4 of 4)

## System.loadLibrary(String)

```java
public static void loadLibrary(String libname)
```

Loads the native library specified by the `libname`
argument.  The `libname` argument must not contain any platform
specific prefix, file extension or path. If a native library
called `libname` is statically linked with the VM, then the
JNI_OnLoad_`libname` function exported by the library is invoked.
See the  JNI Specification
for more details.

Otherwise, the libname argument is loaded from a system library
location and mapped to a native library image in an
implementation-dependent manner.

The call `System.loadLibrary(name)` is effectively
equivalent to the call

```java
Runtime.getRuntime().loadLibrary(name)
```

Parameters:

- `libname`: the name of the library.

**See also:** java.lang.Runtime#loadLibrary(java.lang.String)

Throws:

- `UnsatisfiedLinkError`: if either the libname argument contains a file path, the native library is not statically linked with the VM, or the library cannot be mapped to a native library image by the host system.
- `NullPointerException`: if `libname` is `null`
- `IllegalCallerException`: if the caller is in a module that does not have native access enabled.

## System.mapLibraryName(String)

```java
public static native String mapLibraryName(String libname)
```

Maps a library name into a platform-specific string representing
a native library.

Parameters:

- `libname`: the name of the library.

**Returns:** a platform-dependent native library name.

**See also:** java.lang.System#loadLibrary(java.lang.String)

**See also:** java.lang.ClassLoader#findLibrary(java.lang.String)

**Since:** 1.2

Throws:

- `NullPointerException`: if `libname` is `null`
