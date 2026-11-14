---
title: "SymbolLookup interface (java.lang.foreign)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/SymbolLookup.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SymbolLookup interface (java.lang.foreign)

```java
public interface SymbolLookup
```

A *symbol lookup* retrieves the address of a symbol in one or more libraries.
A symbol is a named entity, such as a function or a global variable.

A symbol lookup is created with respect to a particular library (or libraries).
Subsequently, the `SymbolLookup.find(String)` method takes the name of a symbol
and returns the address of the symbol in that library.

The address of a symbol is modeled as a zero-length
memory segment. The segment can be used in different ways:

- It can be passed to a `Linker` to create a downcall method handle, which
        can then be used to call the foreign function at the segment's address.

- It can be passed to an existing
        Linker.Option...) downcall method handle,
        as an argument to the underlying foreign function.

- It can be long, MemorySegment) stored
        inside another memory segment.

- It can be used to access the region of memory backing a global variable
        (this requires resizing
        the segment first).

#### Obtaining a symbol lookup

The factory methods Arena) and
Arena) create a symbol lookup for a library known to
the operating system. The library is specified by either its name or a path.
The library is loaded if not already loaded. The symbol lookup, which is known as a
*library lookup*, and its lifetime is controlled by an arena.
For instance, if the provided arena is a confined arena, the library associated with
the symbol lookup is unloaded when the confined arena is closed:

If a library was previously loaded through JNI, i.e., by `System.load(String)`
or `System.loadLibrary(String)`, then the library was also associated with
a particular class loader. The factory method `loaderLookup()` creates
a symbol lookup for all the libraries associated with the caller's class loader:

This symbol lookup, which is known as a *loader lookup*, is dynamic with
respect to the libraries associated with the class loader. If other libraries are
subsequently loaded through JNI and associated with the class loader, then the loader
lookup will expose their symbols automatically.

Note that a loader lookup only exposes symbols in libraries that were previously
loaded through JNI, i.e., by `System.load(String)` or `System.loadLibrary(String)`.
A loader lookup does not expose symbols in libraries that were loaded in the course
of creating a library lookup:

Note also that a library lookup for library `L` exposes symbols in `L`
even if `L` was previously loaded through JNI (the association with
a class loader is immaterial to the library lookup):

Finally, each `Linker` provides a symbol lookup for libraries that are commonly
used on the OS and processor combination supported by that `Linker`. This
symbol lookup, which is known as a *default lookup*, helps clients to quickly
find addresses of well-known symbols. For example, a `Linker` for Linux/x64
might choose to expose symbols in `libc` through the default lookup:

**Since:** 22

## SymbolLookup.find(String)

```java
Optional<MemorySegment> find(String name)
```

Returns the address of the symbol with the given name.

Parameters:

- `name`: the symbol name

**Returns:** a zero-length memory segment whose address indicates the address of
        the symbol, if found

**See also:** #findOrThrow(String)

## SymbolLookup.findOrThrow(String)

```java
default MemorySegment findOrThrow(String name)
```

Returns the address of the symbol with the given name or throws an exception.

This is equivalent to the following code, but is more efficient:
to:

Parameters:

- `name`: the symbol name

**Returns:** a zero-length memory segment whose address indicates the address of
        the symbol

**See also:** #find(String)

**Since:** 23

Throws:

- `NoSuchElementException`: if no symbol address can be found for the given name

## SymbolLookup.or(SymbolLookup)

```java
default SymbolLookup or(SymbolLookup other)
```

Parameters:

- `other`: the symbol lookup that should be used to look for symbols not found in this lookup

**API note:** This method could be used to chain multiple symbol lookups together,
         e.g. so that symbols could be retrieved, in order, from multiple
         libraries:

The above code creates a symbol lookup that first searches for symbols in
the "foo" library. If no symbol is found in "foo" then "bar" is searched.
Finally, if a symbol is neither found in "foo" nor in "bar", the
loader lookup is used.

## SymbolLookup.loaderLookup()

```java
static SymbolLookup loaderLookup()
```

Returns a symbol lookup for symbols in the libraries associated with the caller's
class loader.

A library is associated with a class loader `CL` when the library is loaded
via an invocation of `System.load(String)` or
`System.loadLibrary(String)` from code in a class defined by `CL`.
If that code makes further invocations of `System.load(String)` or
`System.loadLibrary(String)` then more libraries are loaded and associated
with `CL`. The symbol lookup returned by this method is always current: it
reflects all the libraries associated with the relevant class loader, even if they
were loaded after this method returned.

Libraries associated with a class loader are unloaded when the class loader becomes
unreachable. The
symbol lookup returned by this method is associated with an automatic
scope which keeps the caller's class loader
reachable. Therefore, libraries associated with the caller's class loader are
kept loaded (and their symbols available) as long as a loader lookup for that
class loader, or any of the segments obtained by it, is reachable.

In cases where this method is called from a context where there is no caller
frame on the stack (e.g. when called directly from a JNI attached thread), the
caller's class loader defaults to the
system class loader.

**Returns:** a symbol lookup for symbols in the libraries associated with
        the caller's class loader

**See also:** System#load(String)

**See also:** System#loadLibrary(String)

## SymbolLookup.libraryLookup(String, Arena)

```java
static SymbolLookup libraryLookup(String name, Arena arena)
```

Loads a library with the given name (if not already loaded) and creates a symbol
lookup for symbols in that library. The lifetime of the returned library lookup
is controlled by the provided arena. For instance, if the provided arena is a
confined arena, the library associated with the returned lookup will be unloaded
when the provided confined arena is closed.

Parameters:

- `name`: the name of the library in which symbols should be looked up
- `arena`: the arena associated with symbols obtained from the returned lookup

**Implementation note:** The process of resolving a library name is OS-specific. For instance,
          in a POSIX-compliant OS, the library name is resolved according to the
          specification of the `dlopen` function for that OS. In Windows,
          the library name is resolved according to the specification of the
          `LoadLibrary` function.

**Returns:** a new symbol lookup suitable to find symbols in a library with the
        given name

Throws:

- `IllegalStateException`: if `arena.scope().isAlive() == false`
- `WrongThreadException`: if `arena` is a confined arena, and this method is called from a thread `T`, other than the arena's owner thread
- `IllegalArgumentException`: if `name` does not identify a valid library
- `IllegalCallerException`: if the caller is in a module that does not have native access enabled

## SymbolLookup.libraryLookup(Path, Arena)

```java
static SymbolLookup libraryLookup(Path path, Arena arena)
```

Loads a library from the given path (if not already loaded) and creates a symbol
lookup for symbols in that library. The lifetime of the returned library lookup
is controlled by the provided arena. For instance, if the provided arena is a
confined arena, the library associated with the returned lookup will be unloaded
when the provided confined arena is closed.

Parameters:

- `path`: the path of the library in which symbols should be looked up
- `arena`: the arena associated with symbols obtained from the returned lookup

**Implementation note:** On Linux, the functionalities provided by this factory method and the
          returned symbol lookup are implemented using the `dlopen`,
          `dlsym` and `dlclose` functions.

**Returns:** a new symbol lookup suitable to find symbols in a library with the given
        path

Throws:

- `IllegalStateException`: if `arena.scope().isAlive() == false`
- `WrongThreadException`: if `arena` is a confined arena, and this method is called from a thread `T`, other than the arena's owner thread
- `IllegalArgumentException`: if `path` does not point to a valid library in the default file system
- `IllegalCallerException`: if the caller is in a module that does not have native access enabled
