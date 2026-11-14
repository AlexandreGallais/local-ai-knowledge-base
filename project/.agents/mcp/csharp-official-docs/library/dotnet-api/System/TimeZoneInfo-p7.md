---
title: "TimeZoneInfo class (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeZoneInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeZoneInfo class (part 7 of 7)

## TimeZoneInfo.IsInvalidTime(DateTime) method

```csharp
public bool IsInvalidTime (DateTime dateTime);
```

Indicates whether a particular date and time is invalid.

Parameters:

- `dateTime`: A date and time value.

Returns: `true` if `dateTime` is invalid; otherwise, `false`.

#### Remarks
An invalid time falls within a range of times for the current time zone that cannot be mapped to Coordinated Universal Time (UTC) due to the application of an adjustment rule. Typically, invalid times occur when the time moves ahead for daylight saving time. See the Example section for an illustration.

The value of the `Kind` property of the `dateTime` parameter affects whether `dateTime` represents an invalid time, as the following table shows.

|DateTime.Kind property|TimeZoneInfo object (if applicable)|Behavior|
|----------------------------|-------------------------------------------|--------------|
|`Local`|`TimeZoneInfo.Local`|Determines whether the time is invalid.|
|`Local`|`TimeZoneInfo.Utc` or a non-local time zone.|Converts `dateTime` to the time of the `TimeZoneInfo` object and returns `false`.|
|`Unspecified`|Not applicable.|Assumes `dateTime` is the time of the `TimeZoneInfo` object and determines whether it is invalid.|
|`Utc`|Not applicable.|Returns `false`.|

#### Examples
In the Pacific Time zone, daylight saving time begins at 2:00 A.M. on April 2, 2006. The following code passes the time at one-minute intervals from 1:59 A.M. on April 2, 2006, to 3:01 A.M. on April 2, 2006, to the `TimeZoneInfo.IsInvalidTime` method of a `TimeZoneInfo` object that represents the Pacific Time zone. The console output indicates that all times from 2:00 A.M. on April 2, 2006, to 2:59 A.M. on April 2, 2006, are invalid.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/BaseUtcOffset/TimeZone2_Examples.cs._

## TimeZoneInfo.System.Runtime.Serialization.IDeserializationCallback.OnDeserialization(Object) method

```csharp
void IDeserializationCallback.OnDeserialization (object sender);
```

Runs when the deserialization of an object has been completed.

Parameters:

- `sender`: The object that initiated the callback. The functionality for this parameter is not currently implemented.

Exceptions:

- `SerializationException`: The `TimeZoneInfo` object contains invalid or corrupted data.

To be added.

## TimeZoneInfo.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data needed to serialize the current `TimeZoneInfo` object.

Parameters:

- `info`: The `SerializationInfo` object to populate with data.
- `context`: The destination for this serialization (see `StreamingContext`).

Exceptions:

- `ArgumentNullException`: The `info` parameter is `null`.

To be added.

## TimeZoneInfo.ToSerializedString() method

```csharp
public string ToSerializedString ();
```

Converts the current `TimeZoneInfo` object to a serialized string.

Returns: A string that represents the current `TimeZoneInfo` object.

#### Remarks
Applications that rely on time zones that are not typically defined in the registry of Windows systems or the ICU Library on Linux and macOScan can use the `TimeZoneInfo.CreateCustomTimeZone` method to instantiate the necessary time zones as `TimeZoneInfo` objects. The application can then call the `TimeZoneInfo.ToSerializedString` method to convert the time zone object to a string.

The `TimeZoneInfo` object should also be stored in a location where the application can retrieve it when needed. Possible locations include:

- The registry on Windows systems.

- An application resource file.

- An external file, such as a text file.

#### Examples
The following example tries to retrieve the Antarctica/South Pole time zone from the local system. If it fails, the code tries to retrieve information about the time zone from a text file in the application directory. If this attempt fails, the code creates the time zone and writes information about it to the text file.

_Code sample not included: ~/snippets/csharp/System/TimeZoneInfo/CreateCustomTimeZone/System.TimeZone2.CreateTimeZone.cs._

## TimeZoneInfo.ToString() method

```csharp
public override string ToString ();
```

Returns the current `TimeZoneInfo` object's display name.

Returns: The value of the `TimeZoneInfo.DisplayName` property of the current `TimeZoneInfo` object.

#### Remarks
When assigning a collection that contains `TimeZoneInfo` objects to a list control such as the `ListBox` control, the control automatically calls the `TimeZoneInfo.ToString` method to extract a string that describes each object to be represented in the list. As a result, you do not need to store a meaningful description of the object as a string, and the user does not need to use that string to extract the object from the collection. See How to: Enumerate Time Zones Present on a Computer for more detail.

## TimeZoneInfo.TryConvertIanaIdToWindowsId(String, String) method

```csharp
public static bool TryConvertIanaIdToWindowsId (string ianaId, out string? windowsId);
```

Tries to convert an IANA time zone ID to a Windows ID.

Parameters:

- `ianaId`: The IANA time zone ID.
- `windowsId`: When this method returns, contains the Windows ID that corresponds to the specified IANA ID.

Returns: `true` if the ID conversion succeeded, `false` otherwise.

#### Remarks

This API is supported only when the application utilizes the ICU library.
However, in .NET, the ICU library is not always used by default, particularly in the following scenarios:

- When the application runs on an operating system that does not have the ICU library, and the app does not utilize the app-local ICU feature.
- When the globalization invariant mode or NLS mode is enabled on Windows.

If the application is running on a Windows OS version that lacks the ICU library, it has the option to opt-in and enable the usage of the ICU library through the app-local ICU feature.

## TimeZoneInfo.TryConvertWindowsIdToIanaId(String, String) method

```csharp
public static bool TryConvertWindowsIdToIanaId (string windowsId, out string? ianaId);
```

Tries to convert a Windows time zone ID to an IANA ID.

Parameters:

- `windowsId`: The Windows time zone ID.
- `ianaId`: When this method returns, contains the IANA ID that corresponds to the specified Windows ID.

Returns: `true` if the ID conversion succeeded, `false` otherwise.

#### Remarks

This API is supported only when the application utilizes the ICU library; otherwise, the API fails.
However, in .NET, the ICU library is not always used by default, particularly in the following scenarios:

- When the application runs on an operating system that does not have the ICU library, and the app does not utilize the APP-Local ICU feature.
- When the Globalization Invariant Mode or NLS mode is enabled on Windows OS.

If the application is running on a Windows OS version that lacks the ICU library, it has the option to opt-in and enable the usage of the ICU library through the App-Local ICU feature.

## TimeZoneInfo.TryConvertWindowsIdToIanaId(String, String, String) method

```csharp
public static bool TryConvertWindowsIdToIanaId (string windowsId, string? region, out string? ianaId);
```

Tries to convert a Windows time zone ID to an IANA ID.

Parameters:

- `windowsId`: The Windows time zone ID.
- `region`: The ISO 3166 code for the country/region.
- `ianaId`: When this method returns, contains the IANA ID that corresponds to the specified Windows ID.

Returns: `true` if the ID conversion succeeded, `false` otherwise.

#### Remarks

This API is supported only when the application utilizes the ICU library; otherwise, the API fails.
However, in .NET, the ICU library is not always used by default, particularly in the following scenarios:

- When the application runs on an operating system that does not have the ICU library, and the app does not utilize the App-local ICU feature.
- When the Globalization Invariant Mode or NLS mode is enabled on Windows OS.

If the application is running on a Windows OS version that lacks the ICU library, it has the option to opt-in and enable the usage of the ICU library through the App-Local ICU feature.

## TimeZoneInfo.TryFindSystemTimeZoneById(String, TimeZoneInfo) method

```csharp
public static bool TryFindSystemTimeZoneById (string id, out TimeZoneInfo? timeZoneInfo);
```

Retrieves a `TimeZoneInfo` object by time zone name.

Parameters:

- `id`: The time zone name.
- `timeZoneInfo`: When this method returns, contains the retrieved `TimeZoneInfo` or `null` if no valid time zone was found.

Returns: `true` if the `TimeZoneInfo` object was successfully retrieved; otherwise, `false`.

This function wraps the logic necessary to keep the private SystemTimeZones cache in working order.
