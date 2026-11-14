---
title: "ContractHelper class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ContractHelper.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ContractHelper class

Namespace: `System.Runtime.CompilerServices`

```csharp
public static class ContractHelper
```

Provides methods that the binary rewriter uses to handle contract failures.

To be added.

## ContractHelper.RaiseContractFailedEvent(ContractFailureKind, String, String, Exception) method

```csharp
public static string? RaiseContractFailedEvent (System.Diagnostics.Contracts.ContractFailureKind failureKind, string? userMessage, string? conditionText, Exception? innerException);
```

Used by the binary rewriter to activate the default failure behavior.

Parameters:

- `failureKind`: One of the enumeration values that specifies the type of failure.
- `userMessage`: Additional user information.
- `conditionText`: The description of the condition that caused the failure.
- `innerException`: The inner exception that caused the current exception.

Returns: A null reference (`Nothing` in Visual Basic) if the event was handled and should not trigger a failure; otherwise, returns the localized failure message.

Exceptions:

- `ArgumentException`: `failureKind` is not a valid `ContractFailureKind` value.

#### Remarks
The binary rewriter calls this method to notify listeners about a contract failure. The `ContractHelper.RaiseContractFailedEvent` method does not perform the failure behavior (an assert or throw) itself. If the failure is handled by the listeners, the method returns `null`. If the failure is not handled by the listeners, a localized failure message is returned.

## ContractHelper.TriggerFailure(ContractFailureKind, String, String, String, Exception) method

```csharp
public static void TriggerFailure (System.Diagnostics.Contracts.ContractFailureKind kind, string? displayMessage, string? userMessage, string? conditionText, Exception? innerException);
```

Triggers the default failure behavior.

Parameters:

- `kind`: One of the enumeration values that specifies the type of failure.
- `displayMessage`: The message to display.
- `userMessage`: Additional user information.
- `conditionText`: The description of the condition that caused the failure.
- `innerException`: The inner exception that caused the current exception.

#### Remarks
The default failure behavior is to raise an `Debug.Assert`, which causes the **Assert** dialog box to be displayed. You can change that behavior to throw an exception instead of displaying the dialog box.
