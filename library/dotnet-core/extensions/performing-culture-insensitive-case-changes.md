---
title: "Perform culture-insensitive case changes"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/performing-culture-insensitive-case-changes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Perform culture-insensitive case changes

The `System.String.ToUpper*`, `System.String.ToLower*`, `System.Char.ToUpper*`, and `System.Char.ToLower*` methods provide overloads that do not accept any parameters. By default, these overloads without parameters perform case changes based on the value of the `System.Globalization.CultureInfo.CurrentCulture`. This produces case-sensitive results that can vary by culture. To make it clear whether you want case changes to be culture-sensitive or culture-insensitive, you should use the overloads of these methods that require you to explicitly specify a `culture` parameter. For culture-sensitive case changes, specify `CultureInfo.CurrentCulture` for the `culture` parameter. For culture-insensitive case changes, specify `CultureInfo.InvariantCulture` for the `culture` parameter.

Often, strings are converted to a standard case to enable easier lookup later. When strings are used in this way, you should specify `CultureInfo.InvariantCulture` for the `culture` parameter, because the value of `System.Threading.Thread.CurrentCulture` can potentially change between the time that the case is changed and the time that the lookup occurs.

If a security decision is based on a case change operation, the operation should be culture-insensitive to ensure that the result is not affected by the value of `CultureInfo.CurrentCulture`. See the "String Comparisons that Use the Current Culture" section of the Best Practices for Using Strings article for an example that demonstrates how culture-sensitive string operations can produce inconsistent results.

## String.ToUpper and String.ToLower

For code clarity, it's recommended that you always use overloads of the `String.ToUpper` and `String.ToLower` methods that let you specify a culture explicitly. For example, the following code performs an identifier lookup. The `key.ToLower` operation is culture-sensitive by default, but this behavior is not clear from reading the code.

### Example

```vb
Shared Function LookupKey(key As String) As Object
   Return internalHashtable(key.ToLower())
End Function
```

```csharp
static object LookupKey(string key)
{
    return internalHashtable[key.ToLower()];
}
```

If you want the `key.ToLower` operation to be culture-insensitive, change the preceding example as follows to explicitly use `CultureInfo.InvariantCulture` when changing the case.

```vb
Shared Function LookupKey(key As String) As Object
    Return internalHashtable(key.ToLower(CultureInfo.InvariantCulture))
End Function
```

```csharp
static object LookupKey(string key)
{
    return internalHashtable[key.ToLower(CultureInfo.InvariantCulture)];
}
```

## Char.ToUpper and Char.ToLower

Although the `Char.ToUpper` and `Char.ToLower` methods have the same characteristics as the `String.ToUpper` and `String.ToLower` methods, the only cultures that are affected are Turkish (Türkiye) and Azerbaijani (Latin, Azerbaijan). These are the only two cultures with single-character casing differences. For more details about this unique case mapping, see the "Casing" section in the `System.String` class documentation. For code clarity and to ensure consistent results, it's recommended that you always use the overloads of these methods that accept a `System.Globalization.CultureInfo` parameter.

## See also

- `System.String.ToUpper*`
- `System.String.ToLower*`
- `System.Char.ToUpper*`
- `System.Char.ToLower*`
- CA1311: Specify a culture or use an invariant version
- Change case in .NET
- Perform culture-insensitive string operations
