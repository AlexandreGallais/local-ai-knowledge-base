---
title: "CharsetProvider class (java.nio.charset.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/charset/spi/CharsetProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CharsetProvider class (java.nio.charset.spi)

```java
public abstract class CharsetProvider
```

Charset service-provider class.

 A charset provider is a concrete subclass of this class that has a
zero-argument constructor and some number of associated `Charset`
implementation classes.  Charset providers are deployed on the application
module path or the application class path. In order to be looked up, charset
providers must be visible to the system class loader. See Deploying Service Providers for further detail on deploying a charset
provider as a module or on the class path.

 For a charset provider deployed in a module, the *provides*
directive must be specified in the module declaration. The provides directive
specifies both the service and the service provider. In this case, the service
is `java.nio.charset.spi.CharsetProvider`.

 As an example, a charset provider deployed as a module might specify the
following directive:

```java
    provides java.nio.charset.spi.CharsetProvider with com.example.ExternalCharsetProvider;
```

 For a charset provider deployed on the class path, it identifies itself
with a provider-configuration file named `java.nio.charset.spi.CharsetProvider` in the resource directory
`META-INF/services`.  The file should contain a list of
fully-qualified concrete charset-provider class names, one per line.  A line
is terminated by any one of a line feed (`'\n'`), a carriage return
(`'\r'`), or a carriage return followed immediately by a line feed.
Space and tab characters surrounding each name, as well as blank lines, are
ignored.  The comment character is `'#'` (`'\u0023'`); on
each line all characters following the first comment character are ignored.
The file must be encoded in UTF-8.

 If a particular concrete charset provider class is named in more than
one configuration file, or is named in the same configuration file more than
once, then the duplicates will be ignored.  The configuration file naming a
particular provider need not be in the same jar file or other distribution
unit as the provider itself.  The provider must be accessible from the same
class loader that was initially queried to locate the configuration file;
this is not necessarily the class loader that loaded the file.

**Since:** 1.4

**See also:** java.nio.charset.Charset

## CharsetProvider.CharsetProvider()

```java
protected CharsetProvider()
```

Initializes a new charset provider.

## CharsetProvider.charsets()

```java
public abstract Iterator<Charset> charsets()
```

Creates an iterator that iterates over the charsets supported by this
provider.  This method is used in the implementation of the Charset.availableCharsets
method.

**Returns:** The new iterator

## CharsetProvider.charsetForName(String)

```java
public abstract Charset charsetForName(String charsetName)
```

Retrieves a charset for the given charset name.

Parameters:

- `charsetName`: The name of the requested charset; may be either a canonical name or an alias

**Returns:** A charset object for the named charset,
         or `null` if the named charset
         is not supported by this provider
