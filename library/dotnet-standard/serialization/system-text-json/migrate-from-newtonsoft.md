---
title: "Migrate from Newtonsoft.Json to System.Text.Json - .NET (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/migrate-from-newtonsoft.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Migrate from Newtonsoft.Json to System.Text.Json

This article shows how to migrate from Newtonsoft.Json to `System.Text.Json`.

The `System.Text.Json` namespace provides functionality for serializing to and deserializing from JavaScript Object Notation (JSON). The `System.Text.Json` library is included in the runtime for .NET Core 3.1 and later versions. For other target frameworks, install the System.Text.Json NuGet package. The package supports:

* .NET Standard 2.0 and later versions
* .NET Framework 4.6.2 and later versions
* .NET Core 2.0, 2.1, and 2.2

> **Tip:**
> You can use AI assistance to migrate from `Newtonsoft.Json`.

`System.Text.Json` focuses primarily on performance, security, and standards compliance. It has some key differences in default behavior and doesn't aim to have feature parity with `Newtonsoft.Json`. For some scenarios, `System.Text.Json` currently has no built-in functionality, but there are recommended workarounds. For other scenarios, workarounds are impractical.

The `System.Text.Json` team is investing in adding the features that are most often requested. If your application depends on a missing feature, consider filing an issue in the dotnet/runtime GitHub repository to find out if support for your scenario can be added.

Most of this article is about how to use the `System.Text.Json.JsonSerializer` API, but it also includes guidance on how to use the `System.Text.Json.JsonDocument` (which represents the Document Object Model or DOM), `System.Text.Json.Utf8JsonReader`, and `System.Text.Json.Utf8JsonWriter` types.

In Visual Basic, you can't use `System.Text.Json.Utf8JsonReader`, which also means you can't write custom converters. Most of the workarounds presented here require that you write custom converters. You can write a custom converter in C# and register it in a Visual Basic project. For more information, see Visual Basic support.

## Table of differences

The following table lists `Newtonsoft.Json` features and `System.Text.Json` equivalents. The equivalents fall into the following categories:

* ✔️ Supported by built-in functionality. Getting similar behavior from `System.Text.Json` might require the use of an attribute or global option.
* ⚠️ Not supported, but workaround is possible. The workarounds are custom converters, which might not provide complete parity with `Newtonsoft.Json` functionality. For some of these, sample code is provided as examples. If you rely on these `Newtonsoft.Json` features, migration will require modifications to your .NET object models or other code changes.
* ❌ Not supported, and workaround is not practical or possible. If you rely on these `Newtonsoft.Json` features, migration will not be possible without significant changes.

| Newtonsoft.Json feature                               | System.Text.Json equivalent |
|-------------------------------------------------------|-----------------------------|
| Case-insensitive deserialization by default           | ✔️ PropertyNameCaseInsensitive global setting |
| Camel-case property names                             | ✔️ PropertyNamingPolicy global setting |
| Snake-case property names                             | ✔️ Snake case naming policy|
| Minimal character escaping                            | ✔️ Strict character escaping, configurable |
| `NullValueHandling.Ignore` global setting             | ✔️ DefaultIgnoreCondition global option |
| Allow comments                                        | ✔️ ReadCommentHandling global setting |
| Allow trailing commas                                 | ✔️ AllowTrailingCommas global setting |
| Custom converter registration                         | ✔️ Order of precedence differs |
| Default maximum depth 64, configurable                | ✔️ Default maximum depth 64, configurable |
| `PreserveReferencesHandling` global setting           | ✔️ ReferenceHandling global setting |
| Serialize or deserialize numbers in quotes            | ✔️ NumberHandling global setting, [JsonNumberHandling] attribute |
| Deserialize to immutable classes and structs          | ✔️ JsonConstructor, C# 9 Records |
| Support for fields                                    | ✔️ IncludeFields global setting, [JsonInclude] attribute |
| `DefaultValueHandling` global setting                 | ✔️ DefaultIgnoreCondition global setting |
| `NullValueHandling` setting on `[JsonProperty]`       | ✔️ JsonIgnore attribute  |
| `DefaultValueHandling` setting on `[JsonProperty]`    | ✔️ JsonIgnore attribute  |
| Deserialize `Dictionary` with non-string key          | ✔️ Supported |
| Support for non-public property setters and getters   | ✔️ JsonInclude attribute |
| `[JsonConstructor]` attribute                         | ✔️ [JsonConstructor] attribute |
| `ReferenceLoopHandling` global setting                | ✔️ ReferenceHandling global setting |
| Callbacks                                             | ✔️ Callbacks |
| NaN, Infinity, -Infinity                              | ✔️ Supported |
| `Required` setting on `[JsonProperty]` attribute      | ✔️ [JsonRequired] attribute and C# required modifier |
| `DefaultContractResolver` to ignore properties        | ✔️ DefaultJsonTypeInfoResolver class |
| Polymorphic serialization                             | ✔️ [JsonDerivedType] attribute |
| Polymorphic deserialization                           | ✔️ Type discriminator on [JsonDerivedType] attribute |
| Deserialize string enum value                         | ✔️ Deserialize string enum values |
| `MissingMemberHandling` global setting                | ✔️ Handle missing members |
| Populate properties without setters                   | ✔️ Populate properties without setters |
| `ObjectCreationHandling` global setting               | ✔️ Reuse rather than replace properties |
| Support for a broad range of types                    | ⚠️ Some types require custom converters |
| Deserialize inferred type to `object` properties      | ⚠️ Not supported, workaround, sample |
| Deserialize JSON `null` literal to non-nullable value types | ⚠️ Not supported, workaround, sample |
| `DateTimeZoneHandling`, `DateFormatString` settings   | ⚠️ Not supported, workaround, sample |
| `JsonConvert.PopulateObject` method                   | ⚠️ Not supported, workaround |
| Support for `System.Runtime.Serialization` attributes | ⚠️ Not supported, workaround, sample |
| `JsonObjectAttribute`                                 | ⚠️ Not supported, workaround |
| Allow property names without quotes                   | ❌ Not supported by design |
| Allow single quotes around string values              | ❌ Not supported by design |
| Allow non-string JSON values for string properties    | ❌ Not supported by design |
| `TypeNameHandling.All` global setting                 | ❌ Not supported by design |
| Support for `JsonPath` queries                        | ❌ Not supported |
| Configurable limits                                   | ❌ Not supported |

This is not an exhaustive list of `Newtonsoft.Json` features. The list includes many of the scenarios that have been requested in GitHub issues or StackOverflow posts. If you implement a workaround for one of the scenarios listed here that doesn't currently have sample code, and if you want to share your solution, select **This page** in the **Feedback** section at the bottom of this page. That creates an issue in this documentation's GitHub repo and lists it in the **Feedback** section on this page too.

## Differences in default behavior

`System.Text.Json` is strict by default and avoids any guessing or interpretation on the caller's behalf, emphasizing deterministic behavior. The library is intentionally designed this way for performance and security. `Newtonsoft.Json` is flexible by default. This fundamental difference in design is behind many of the following specific differences in default behavior.

### Case-insensitive deserialization

During deserialization, `Newtonsoft.Json` does case-insensitive property name matching by default. The `System.Text.Json` default is case-sensitive, which gives better performance since it's doing an exact match. For information about how to do case-insensitive matching, see Case-insensitive property matching.

If you're using `System.Text.Json` indirectly by using ASP.NET Core, you don't need to do anything to get behavior like `Newtonsoft.Json`. ASP.NET Core specifies the settings for camel-casing property names and case-insensitive matching when it uses `System.Text.Json`.

ASP.NET Core also enables deserializing quoted numbers by default.

### Minimal character escaping

During serialization, `Newtonsoft.Json` is relatively permissive about letting characters through without escaping them. That is, it doesn't replace them with `\uxxxx` where `xxxx` is the character's code point. Where it does escape them, it does so by emitting a `\` before the character (for example, `"` becomes `\"`). `System.Text.Json` escapes more characters by default to provide defense-in-depth protections against cross-site scripting (XSS) or information-disclosure attacks and does so by using the six-character sequence. `System.Text.Json` escapes all non-ASCII characters by default, so you don't need to do anything if you're using `StringEscapeHandling.EscapeNonAscii` in `Newtonsoft.Json`. `System.Text.Json` also escapes HTML-sensitive characters, by default. For information about how to override the default `System.Text.Json` behavior, see Customize character encoding.

### Comments

During deserialization, `Newtonsoft.Json` ignores comments in the JSON by default. The `System.Text.Json` default is to throw exceptions for comments because the RFC 8259 specification doesn't include them. For information about how to allow comments, see Allow comments and trailing commas.

### Trailing commas

During deserialization, `Newtonsoft.Json` ignores trailing commas by default. It also ignores multiple trailing commas (for example, `[{"Color":"Red"},{"Color":"Green"},,]`). The `System.Text.Json` default is to throw exceptions for trailing commas because the RFC 8259 specification doesn't allow them. For information about how to make `System.Text.Json` accept them, see Allow comments and trailing commas. There's no way to allow multiple trailing commas.

### Converter registration precedence

The `Newtonsoft.Json` registration precedence for custom converters is as follows:

* Attribute on property
* Attribute on type
* Converters collection

This order means that a custom converter in the `Converters` collection is overridden by a converter that is registered by applying an attribute at the type level. Both of those registrations are overridden by an attribute at the property level.

The `System.Text.Json` registration precedence for custom converters is different:

* Attribute on property
* `System.Text.Json.JsonSerializerOptions.Converters` collection
* Attribute on type

The difference here is that a custom converter in the `Converters` collection overrides an attribute at the type level. The intention behind this order of precedence is to make runtime changes override design-time choices. There's no way to change the precedence.

For more information about custom converter registration, see Register a custom converter.

### Maximum depth

The latest version of `Newtonsoft.Json` has a maximum depth limit of 64 by default. `System.Text.Json` also has a default limit of 64, and it's configurable by setting `System.Text.Json.JsonSerializerOptions.MaxDepth`.

If you're using `System.Text.Json` indirectly by using ASP.NET Core, the default maximum depth limit is 32. The default value is the same as for model binding and is set in the JsonOptions class.

### JSON strings (property names and string values)

During deserialization, `Newtonsoft.Json` accepts property names surrounded by double quotes, single quotes, or without quotes. It accepts string values surrounded by double quotes or single quotes. For example, `Newtonsoft.Json` accepts the following JSON:

```json
{
  "name1": "value",
  'name2': "value",
  name3: 'value'
}
```

`System.Text.Json` only accepts property names and string values in double quotes because that format is required by the RFC 8259 specification and is the only format considered valid JSON.

A value enclosed in single quotes results in a JsonException with the following message:

```output
''' is an invalid start of a value.
```

### Non-string values for string properties

`Newtonsoft.Json` accepts non-string values, such as a number or the literals `true` and `false`, for deserialization to properties of type string. Here's an example of JSON that `Newtonsoft.Json` successfully deserializes to the following class:

```json
{
  "String1": 1,
  "String2": true,
  "String3": false
}
```

```csharp
public class ExampleClass
{
    public string String1 { get; set; }
    public string String2 { get; set; }
    public string String3 { get; set; }
}
```

`System.Text.Json` doesn't deserialize non-string values into string properties. A non-string value received for a string field results in a JsonException with the following message:

```output
The JSON value could not be converted to System.String.
```
