---
title: "LingerOption class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/LingerOption.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LingerOption class

Namespace: `System.Net.Sockets`

```csharp
public class LingerOption
```

Specifies whether a `Socket` will remain connected after a call to the `Socket.Close` or `TcpClient.Close` methods and the length of time it will remain connected, if data remains to be sent.

#### Remarks
There may still be data available in the outgoing network buffer after an application calls the `Socket` or `TcpClient` method. If you want to specify the amount of time that the `Socket` will attempt to transmit unsent data after closing, create a `LingerOption` with the `enable` parameter set to `true`, and the `seconds` parameter set to the desired amount of time. The `seconds` parameter is used to indicate how long you would like the `Socket` to remain connected before timing out. If you do not want the `Socket` to stay connected for any length of time after closing, create a `LingerOption` instance with the `enable` parameter set to `true` and the `seconds` parameter set to zero. In this case, the `Socket` will close immediately and any unsent data will be lost. Once created, pass the `LingerOption` to the `Socket.SetSocketOption` method. If you are sending and receiving data with a `TcpClient`, then set the `LingerOption` instance in the `LingerState` property.

The IP stack computes the default IP protocol time-out period to use based on the round trip time of the connection. In most cases, the time-out computed by the stack is more relevant than one defined by an application. This is the default behavior for a `Socket` when the `LingerState` property is not set and for a `TcpClient` when the `LingerState` property is not set.

#### Examples
The following example sets a previously created `Socket` to linger one second after calling the `Socket.Close` method.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/Overview/source.cs._

## LingerOption.LingerOption(Boolean, Int32) constructor

```csharp
public LingerOption (bool enable, int seconds);
```

Initializes a new instance of the `LingerOption` class.

Parameters:

- `enable`: `true` to remain connected after the `Socket.Close` method is called; otherwise, `false`.
- `seconds`: The number of seconds to remain connected after the `Socket.Close` method is called.

#### Remarks
There may still be data available in the outgoing network buffer after you close the `Socket`. Use the `enable` parameter to specify whether you would like the `Socket` to continue transmitting unsent data after the close method is called. Use the `seconds` parameter to indicate how long you would like the `Socket` to attempt transferring unsent data before timing out. If you specify `true` for the `enable` parameter and 0 for the `seconds` parameter, the `Socket` will attempt to send data until there is no data left in the outgoing network buffer. If you specify `false` for the `enable` parameter, the `Socket` will close immediately and any unsent data will be lost.

The following table describes the behavior on the `Socket.Close` and `TcpClient.Close` methods based on the possible values of the `enable` and `seconds` parameters when an T:System.Net.Sockets.LingerOption instance is created and set in the `Socket.LingerState` or `LingerState` property.

|`enable`|`seconds`|Behavior|
|--------------|---------------|--------------|
|`false` (disabled), the default value|The time-out is not applicable, (default).|Attempts to send pending data for a connection-oriented socket (TCP, for example) until the default IP protocol time-out expires.|
|`true` (enabled)|A nonzero time-out|Attempts to send pending data until the specified time-out expires, and if the attempt fails, then Winsock resets the connection.|
|`true` (enabled)|A zero timeout.|Discards any pending data. For connection-oriented socket (TCP, for example), Winsock resets the connection.|

The IP stack computes the default IP protocol time-out period to use based on the round trip time of the connection. In most cases, the time-out computed by the stack is more relevant than one defined by an application. This is the default behavior for a socket when the `LingerState` property is not set.

When the `LingerTime` property stored in the `LingerState` property is set greater than the default IP protocol time-out, the default IP protocol time-out will still apply and override.

#### Examples
The following example sets a previously created `Socket` to linger one second after calling the `Socket.Close` method.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/Overview/source.cs._

## LingerOption.Enabled property

```csharp
public bool Enabled { get; set; }
```

Gets or sets a value that indicates whether to linger after the `Socket` is closed.

Returns: `true` if the `Socket` should linger after `Socket.Close` is called; otherwise, `false`.

#### Remarks
You can use the `Enabled` property to determine whether the `Socket` will linger after closing. Change this value to `true` or `false` and pass the altered `LingerOption` to the `Socket.SetSocketOption` method or set the `TcpClient.LingerState` or `LingerState` property.to disable or enable lingering.

The following table describes the behavior for the possible values of the `Enabled` property and the `LingerTime` property stored in the `LingerState` property.

|`enable`|`seconds`|Behavior|
|--------------|---------------|--------------|
|`false` (disabled), the default value|The time-out is not applicable, (default).|Attempts to send pending data for a connection-oriented socket (TCP, for example) until the default IP protocol time-out expires.|
|`true` (enabled)|A nonzero time-out|Attempts to send pending data until the specified time-out expires, and if the attempt fails, then Winsock resets the connection.|
|`true` (enabled)|A zero timeout.|Discards any pending data. For connection-oriented socket (TCP, for example), Winsock resets the connection.|

The IP stack computes the default IP protocol time-out period to use based on the round trip time of the connection. In most cases, the time-out computed by the stack is more relevant than one defined by an application. This is the default behavior for a socket when the `LingerState` property is not set.

When the `LingerTime` property stored in the `LingerState` property is set greater than the default IP protocol time-out, the default IP protocol time-out will still apply and override.

## LingerOption.LingerTime property

```csharp
public int LingerTime { get; set; }
```

Gets or sets the amount of time to remain connected after calling the `Socket.Close` method if data remains to be sent.

Returns: The amount of time, in seconds, to remain connected after calling `Socket.Close`.

#### Remarks
Use this value if you want to determine how long a closed `Socket` will attempt to transfer unsent data before timing out. You can also set this value to the desired time-out period, in seconds.

If the `Enabled` property is `true`, and you set `LingerOption.LingerTime` to 0, the `Socket` discards any pending data to send in the outgoing network buffer. If you change this value, you must pass the altered `LingerOption` instance to the `Socket.SetSocketOption` method or set the `TcpClient.LingerState` or `LingerState` property.

The following table describes the behavior for the possible values of the `Enabled` property and the `LingerTime` property stored in the `LingerState` property.

|`enable`|`seconds`|Behavior|
|--------------|---------------|--------------|
|`false` (disabled), the default value|The time-out is not applicable, (default).|Attempts to send pending data for a connection-oriented socket (TCP, for example) until the default IP protocol time-out expires.|
|`true` (enabled)|A nonzero time-out|Attempts to send pending data until the specified time-out expires, and if the attempt fails, then Winsock resets the connection.|
|`true` (enabled)|A zero timeout.|Discards any pending data. For connection-oriented socket (TCP, for example), Winsock resets the connection.|

The IP stack computes the default IP protocol time-out period to use based on the round trip time of the connection. In most cases, the time-out computed by the stack is more relevant than one defined by an application. This is the default behavior for a socket when the `LingerState` property is not set.

When the `LingerTime` property stored in the `LingerState` property is set greater than the default IP protocol time-out, the default IP protocol time-out will still apply and override.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## LingerOption.Equals(Object) method

```csharp
public override bool Equals (object? comparand);
```

Determines whether the specified object is equal to the current `LingerOption` instance.

Parameters:

- `comparand`: The object to compare with the current `LingerOption` instance.

Returns: `true` if the specified object is equal to the current `LingerOption` instance; otherwise, `false`.

To be added.

## LingerOption.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash value for a `LingerOption` instance.

Returns: An integer hash value.

To be added.
