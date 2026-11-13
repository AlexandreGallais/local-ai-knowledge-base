---
title: "Breaking change: Culture creation and case mapping in globalization-invariant mode"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/globalization/6.0/culture-creation-invariant-mode.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Culture creation and case mapping in globalization-invariant mode

This breaking change affects *globalization-invariant mode* in two ways:

- Previously, .NET allowed any culture to be created in globalization-invariant mode, as long as the culture name conformed to BCP-47. However, the invariant culture data was used instead of the real culture data. Starting in .NET 6, an exception is thrown if you create any culture other than the invariant culture in globalization-invariant mode.
- Previously, globalization-invariant mode only supported case mapping for ASCII characters. Starting in .NET 6, globalization-invariant mode provides full case-mapping support for all Unicode-defined characters. Case mapping is used in operations such as string comparisons, string searches, and upper or lower casing strings.

Globalization-invariant mode is used for apps that don't require any globalization support. That is, the app runs without access to culture-specific data and behavior. Globalization-invariant mode is enabled by default on some Docker containers, for example, Alpine containers.

## Old behavior

In previous .NET versions when globalization-invariant mode is enabled:

- If an app creates a culture that's not the invariant culture, the operation succeeds but the returned culture always use the invariant culture data instead of the real culture data.
- Case mapping was performed only for ASCII characters. For example:

  ```csharp
  if ("Á".Equals("á", StringComparison.CurrentCultureIgnoreCase)) // Evaluates to false.
  ```

## New behavior

Starting in .NET 6 when globalization-invariant mode is enabled:

- If an app attempts to create a culture that's not the invariant culture, a `System.Globalization.CultureNotFoundException` exception is thrown.
- Case mapping is performed for all Unicode-defined characters. For example:

  ```csharp
  if ("Á".Equals("á", StringComparison.CurrentCultureIgnoreCase)) // Evaluates to true.
  ```

## Version introduced

.NET 6

## Reason for change

The culture-creation change was introduced to more easily diagnose culture-related problems. Some users are unaware that their apps are running in an environment where globalization-invariant mode is enabled. They may experience unexpected behavior and don't make the association with globalization-invariant mode, so it's hard to diagnose the issue.

The full case-mapping support was introduced for better usability and experience in globalization-invariant mode.

## Recommended action

In most cases, no action is needed. However, if you desire the previous culture-creation behavior, you can set a runtime configuration option to allow creation of any culture in globalization-invariant mode. For more information, see Predefined cultures.

## Affected APIs

- `System.Globalization.CultureInfo.#ctor*`
- `System.Globalization.CultureInfo.CreateSpecificCulture(System.String)`
- `System.Globalization.CultureInfo.GetCultureInfo*`
- `System.Globalization.RegionInfo.#ctor*`
- Any APIs that perform string casing, comparison, or searching

## See also

- .NET globalization invariant mode
- Invariant, neutral, and specific cultures
