---
title: "DomainLoadStoreParameter class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/DomainLoadStoreParameter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DomainLoadStoreParameter class (java.security)

```java
public final class DomainLoadStoreParameter implements LoadStoreParameter
```

Configuration data that specifies the keystores in a keystore domain.
A keystore domain is a collection of keystores that are presented as a
single logical keystore. The configuration data is used during
`KeyStore`
load and
store operations.

The following syntax is supported for configuration data:

```java
    domain <domainName> [<property> ...] {
        keystore <keystoreName> [<property> ...] ;
        ...
    };
    ...
```

where `domainName` and `keystoreName` are identifiers
and `property` is a key/value pairing. The key and value are
separated by an 'equals' symbol and the value is enclosed in double
quotes. A property value may be either a printable string or a binary
string of colon-separated pairs of hexadecimal digits. Multivalued
properties are represented as a comma-separated list of values,
enclosed in square brackets.
See `Arrays.toString(java.lang.Object[])`.

To ensure that keystore entries are uniquely identified, each
entry's alias is prefixed by its `keystoreName` followed
by the entry name separator and each `keystoreName` must be
unique within its domain. Entry name prefixes are omitted when
storing a keystore.

Properties are context-sensitive: properties that apply to
all the keystores in a domain are located in the domain clause,
and properties that apply only to a specific keystore are located
in that keystore's clause.
Unless otherwise specified, a property in a keystore clause overrides
a property of the same name in the domain clause. All property names
are case-insensitive. The following properties are supported:

 `keystoreType="<type>"`
     The keystore type.
 `keystoreURI="<url>"`
     The keystore location.
 `keystoreProviderName="<name>"`
     The name of the keystore's JCE provider.
 `keystorePasswordEnv="<example-value>"`
     The environment variable that stores a keystore password.
         Alternatively, passwords may be supplied to the constructor
         method in a `Map<String, ProtectionParameter>`.
 `entryNameSeparator="<separator>"`
     The separator between a keystore name prefix and an entry name.
         When specified, it applies to all the entries in a domain.
         Its default value is a space.

For example, configuration data for a simple keystore domain
comprising three keystores is shown below:

```java
domain app1 {
    keystore app1-truststore
        keystoreURI="file:///app1/etc/truststore.jks";

    keystore system-truststore
        keystoreURI="${java.home}/lib/security/cacerts";

    keystore app1-keystore
        keystoreType="PKCS12"
        keystoreURI="file:///app1/etc/keystore.p12";
};
```

**Since:** 1.8

## DomainLoadStoreParameter.DomainLoadStoreParameter(URI, Map<String,ProtectionParameter>)

```java
public DomainLoadStoreParameter(URI configuration, Map<String,ProtectionParameter> protectionParams)
```

Constructs a `DomainLoadStoreParameter` for a keystore domain with
the parameters used to protect keystore data.

Parameters:

- `configuration`: identifier for the domain configuration data. The name of the target domain should be specified in the `java.net.URI` fragment component when it is necessary to distinguish between several domain configurations at the same location.
- `protectionParams`: the map from keystore name to the parameter used to protect keystore data. A `java.util.Collections.EMPTY_MAP` should be used when protection parameters are not required or when they have been specified by properties in the domain configuration data. It is cloned to prevent subsequent modification.

Throws:

- `NullPointerException`: if `configuration` or `protectionParams` is `null`

## DomainLoadStoreParameter.getConfiguration()

```java
public URI getConfiguration()
```

Gets the identifier for the domain configuration data.

**Returns:** the identifier for the configuration data

## DomainLoadStoreParameter.getProtectionParams()

```java
public Map<String,ProtectionParameter> getProtectionParams()
```

Gets the keystore protection parameters for keystores in this
domain.

**Returns:** an unmodifiable map of keystore names to protection
    parameters

## DomainLoadStoreParameter.getProtectionParameter()

```java
public KeyStore.ProtectionParameter getProtectionParameter()
```

Gets the keystore protection parameters for this domain.
Keystore domains do not support a protection parameter.

**Returns:** always returns `null`
