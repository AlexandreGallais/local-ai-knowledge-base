---
title: "Breaking change: Support for empty environment variables"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/9.0/empty-env-variable.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Support for empty environment variables

Support was added to be able to set an environment variable to the empty string using `System.Environment.SetEnvironmentVariable(System.String,System.String)`. As part of this work, the behavior of setting the `System.Diagnostics.ProcessStartInfo.Environment` and `System.Diagnostics.ProcessStartInfo.EnvironmentVariables` properties was changed to be consistent with that of `System.Environment.SetEnvironmentVariable(System.String,System.String)`.

## Previous behavior

Previously:

- Both `Environment.SetEnvironmentVariable("TEST", string.Empty)` and `Environment.SetEnvironmentVariable("TEST", null)` deleted the environment variable.
- Both `ProcessStartInfo.Environment["TEST"] = string.Empty` and `ProcessStartInfo.Environment["TEST"] = null` set the environment variable in the child process to an empty value.

## New behavior

Starting in .NET 9:

- `Environment.SetEnvironmentVariable("TEST", string.Empty)` sets the environment variable value to an empty value. `Environment.SetEnvironmentVariable("TEST", null)` behavior is unchanged, that is, it still deletes the environment variable.
- `ProcessStartInfo.Environment["TEST"] = null` deletes the environment variable. `ProcessStartInfo.Environment["TEST"] = string.Empty` behavior is unchanged, that is, it still sets the environment variable to an empty value.

## Version introduced

.NET 9 Preview 6

## Type of breaking change

This change is a behavioral change.

## Reason for change

Before this change, it wasn't possible to use `System.Environment.SetEnvironmentVariable(System.String,System.String)` to set an environment variable to an empty value, which is a valid environment variable value on all supported platforms.

## Recommended action

To delete an environment variable using `System.Environment.SetEnvironmentVariable(System.String,System.String)`, change your code to pass `null` instead of `string.Empty` as the value argument.

To set the environment variable to an empty value using `System.Diagnostics.ProcessStartInfo.Environment` or `System.Diagnostics.ProcessStartInfo.EnvironmentVariables`, change your code to set these properties to `string.Empty` instead of to `null`.

## Affected APIs

- `System.Environment.SetEnvironmentVariable(System.String,System.String)`
- `System.Diagnostics.ProcessStartInfo.Environment`
- `System.Diagnostics.ProcessStartInfo.EnvironmentVariables`
