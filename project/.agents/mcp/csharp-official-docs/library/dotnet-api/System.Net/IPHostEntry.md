---
title: "IPHostEntry class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/IPHostEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPHostEntry class

Namespace: `System.Net`

```csharp
public class IPHostEntry
```

Provides a container class for Internet host address information.

#### Remarks
The `IPHostEntry` class associates a Domain Name System (DNS) host name with an array of aliases and an array of matching IP addresses.

The `IPHostEntry` class is used as a helper class with the `Dns` class.

#### Examples
The following example queries the DNS database for information on the host `www.contoso.com` and returns the information in an `IPHostEntry` instance.

_Code sample not included: ~/snippets/csharp/System.Net/Dns/Overview/source.cs._

## IPHostEntry.IPHostEntry() constructor

```csharp
public IPHostEntry ();
```

Initializes a new instance of the `IPHostEntry` class.

To be added.

## IPHostEntry.AddressList property

```csharp
public System.Net.IPAddress[] AddressList { get; set; }
```

Gets or sets a list of IP addresses that are associated with a host.

Returns: An array of type `IPAddress` that contains IP addresses that resolve to the host names that are contained in the `IPHostEntry.Aliases` property.

#### Examples
The following example uses the `AddressList` property to access the IP addresses that are associated with the `IPHostEntry`.

_Code sample not included: ~/snippets/csharp/System.Net/IPHostEntry/AddressList/iphostentry_addresslist.cs._

## IPHostEntry.Aliases property

```csharp
public string[] Aliases { get; set; }
```

Gets or sets a list of aliases that are associated with a host.

Returns: An array of strings that contain DNS names that resolve to the IP addresses in the `IPHostEntry.AddressList` property.

To be added.

## IPHostEntry.HostName property

```csharp
public string HostName { get; set; }
```

Gets or sets the DNS name of the host.

Returns: A string that contains the primary host name for the server.

#### Remarks
The `HostName` property contains the primary host name for a server. If the DNS entry for the server defines additional aliases, they will be available in the `Aliases` property.

#### Examples
The following example uses the `HostName` property to retrieve the primary host name.

_Code sample not included: ~/snippets/csharp/System.Net/IPHostEntry/AddressList/iphostentry_addresslist.cs._
