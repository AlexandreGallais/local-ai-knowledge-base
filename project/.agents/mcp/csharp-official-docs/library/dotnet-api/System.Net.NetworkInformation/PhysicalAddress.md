---
title: "PhysicalAddress class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/PhysicalAddress.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PhysicalAddress class

Namespace: `System.Net.NetworkInformation`

```csharp
public class PhysicalAddress
```

Provides the Media Access Control (MAC) address for a network interface (adapter).

#### Remarks
The MAC address, or physical address, is a hardware address that uniquely identifies each node, such as a computer or printer, on a network.

Instances of this class are returned by the `NetworkInterface.GetPhysicalAddress` method.

#### Examples
The following code example displays the physical addresses of all interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/PhysicalAddress/Overview/physaddresstester.cs._
## PhysicalAddress.PhysicalAddress(Byte[]) constructor

```csharp
public PhysicalAddress (byte[] address);
```

Initializes a new instance of the `PhysicalAddress` class.

Parameters:

- `address`: A `Byte` array containing the address.

#### Remarks
In common scenarios, applications do not need to call this constructor; instances of this class are returned by the `NetworkInterface.GetPhysicalAddress` method.

Note that you can also use the `PhysicalAddress.Parse` method to create a new instance of `PhysicalAddress`.

#### Examples
The following code example creates a new `PhysicalAddress` object.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/PhysicalAddress/Overview/physaddresstester.cs._
## PhysicalAddress.Equals(Object) method

```csharp
public override bool Equals (object? comparand);
```

Compares two `PhysicalAddress` instances.

Parameters:

- `comparand`: The `PhysicalAddress` to compare to the current instance.

Returns: `true` if this instance and the specified instance contain the same address; otherwise `false`.

#### Examples
The following code example compares two `PhysicalAddress` instances.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/PhysicalAddress/Overview/physaddresstester.cs._
## PhysicalAddress.GetAddressBytes() method

```csharp
public byte[] GetAddressBytes ();
```

Returns the address of the current instance.

Returns: A `Byte` array containing the address.

#### Examples
The following code example calls this method to retrieve the address of a `PhysicalAddress` and formats the address for display.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/PhysicalAddress/Overview/physaddresstester.cs._
## PhysicalAddress.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash value of a physical address.

Returns: An integer hash value.

To be added.

## PhysicalAddress.Parse(Char>) method

```csharp
public static System.Net.NetworkInformation.PhysicalAddress Parse (ReadOnlySpan<char> address);
```

Parses the specified span and stores its contents as the address bytes of the `PhysicalAddress` returned by this method.

Parameters:

- `address`: A span containing the address that will be used to initialize the `PhysicalAddress` instance returned by this method.

Returns: A `PhysicalAddress` instance with the specified address.

Exceptions:

- `FormatException`: `address` contains an illegal hardware address or contains a string in the incorrect format.

#### Remarks
The `address` parameter must contain a string that can only consist of numbers and letters as hexadecimal digits. Some examples of string formats that are acceptable are as follows:

`001122334455`

`00-11-22-33-44-55`

`0011.2233.4455`

`00:11:22:33:44:55`

`F0-E1-D2-C3-B4-A5`

`f0-e1-d2-c3-b4-a5`

Use the `PhysicalAddress.GetAddressBytes` method to retrieve the address from an existing `PhysicalAddress` instance.

#### Examples
The following code example creates a `PhysicalAddress` instance by calling the `PhysicalAddress.Parse` method.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/PhysicalAddress/Overview/physaddresstester.cs._
## PhysicalAddress.Parse(String) method

```csharp
public static System.Net.NetworkInformation.PhysicalAddress Parse (string? address);
```

Parses the specified `String` and stores its contents as the address bytes of the `PhysicalAddress` returned by this method.

Parameters:

- `address`: A `String` containing the address that will be used to initialize the `PhysicalAddress` instance returned by this method.

Returns: A `PhysicalAddress` instance with the specified address.

Exceptions:

- `FormatException`: `address` contains an illegal hardware address or contains a string in the incorrect format.

#### Remarks
The `address` parameter must contain a string that can only consist of numbers and letters as hexadecimal digits. Some examples of string formats that are acceptable are as follows:

`001122334455`
`00-11-22-33-44-55`
`0011.2233.4455`
`00:11:22:33:44:55`
`F0-E1-D2-C3-B4-A5`
`f0-e1-d2-c3-b4-a5`

Use the `PhysicalAddress.GetAddressBytes` method to retrieve the address from an existing `PhysicalAddress` instance.

#### Examples
The following code example creates a `PhysicalAddress` instance by calling the `PhysicalAddress.Parse` method.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/PhysicalAddress/Overview/physaddresstester.cs._
## PhysicalAddress.ToString() method

```csharp
public override string ToString ();
```

Returns the `String` representation of the address of this instance.

Returns: A `String` containing the address contained in this instance.

#### Examples
The following code example demonstrates displaying the address in a `PhysicalAddress` instance.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/PhysicalAddress/Overview/physaddresstester.cs._
## PhysicalAddress.TryParse(Char>, PhysicalAddress) method

```csharp
public static bool TryParse (ReadOnlySpan<char> address, out System.Net.NetworkInformation.PhysicalAddress? value);
```

Tries to convert the span representation of a hardware address to a `PhysicalAddress` instance. A return value indicates whether the conversion succeeded.

Parameters:

- `address`: A span containing the address that will be used to initialize the `PhysicalAddress` instance returned by this method.
- `value`: When this method returns, contains the `PhysicalAddress` instance equivalent of the address contained in `address`, if the conversion succeeded, or `null` if the conversion failed. This parameter is passed uninitialized; any value originally supplied in `value` will be overwritten.

Returns: `true` if `address` was converted successfully; otherwise, `false`.

#### Remarks
The `address` parameter must contain a string that can only consist of numbers and letters as hexadecimal digits. Some examples of string formats that are acceptable are as follows:

`001122334455`

`00-11-22-33-44-55`

`0011.2233.4455`

`00:11:22:33:44:55`

`F0-E1-D2-C3-B4-A5`

`f0-e1-d2-c3-b4-a5`

Use the `PhysicalAddress.GetAddressBytes` method to retrieve the address from an existing `PhysicalAddress` instance.

## PhysicalAddress.TryParse(String, PhysicalAddress) method

```csharp
public static bool TryParse (string? address, out System.Net.NetworkInformation.PhysicalAddress? value);
```

Tries to convert the string representation of a hardware address to a `PhysicalAddress` instance. A return value indicates whether the conversion succeeded.

Parameters:

- `address`: A string containing the address that will be used to initialize the `PhysicalAddress` instance returned by this method.
- `value`: When this method returns, contains the `PhysicalAddress` instance equivalent of the address contained in `address`, if the conversion succeeded, or `null` if the conversion failed. If the `address` is `null` it contains `None`. This parameter is passed uninitialized; any value originally supplied in `value` will be overwritten.

Returns: `true` if `address` was converted successfully; otherwise, `false`.

#### Remarks
The `address` parameter must contain a string that can only consist of numbers and letters as hexadecimal digits. Some examples of string formats that are acceptable are as follows:

`001122334455`

`00-11-22-33-44-55`

`0011.2233.4455`

`00:11:22:33:44:55`

`F0-E1-D2-C3-B4-A5`

`f0-e1-d2-c3-b4-a5`

Use the `PhysicalAddress.GetAddressBytes` method to retrieve the address from an existing `PhysicalAddress` instance.

## PhysicalAddress.None field

```csharp
public static readonly System.Net.NetworkInformation.PhysicalAddress None;
```

Returns a new `PhysicalAddress` instance with a zero length address. This field is read-only.

#### Remarks
The `PhysicalAddress.Parse` method returns `None` if you specify `null` address.

#### Examples
The following code example demonstrates using this field to test the result of parsing an address.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/PhysicalAddress/Overview/physaddresstester.cs._
