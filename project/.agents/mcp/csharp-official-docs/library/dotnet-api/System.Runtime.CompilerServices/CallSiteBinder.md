---
title: "CallSiteBinder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CallSiteBinder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CallSiteBinder class

Namespace: `System.Runtime.CompilerServices`

```csharp
public abstract class CallSiteBinder
```

Class responsible for runtime binding of the dynamic operations on the dynamic call site.

To be added.

## CallSiteBinder.CallSiteBinder() constructor

```csharp
protected CallSiteBinder ();
```

Initializes a new instance of the `CallSiteBinder` class.

To be added.

## CallSiteBinder.UpdateLabel property

```csharp
public static System.Linq.Expressions.LabelTarget UpdateLabel { get; }
```

Gets a label that can be used to cause the binding to be updated. It indicates that the expression's binding is no longer valid. This is typically used when the "version" of a dynamic object has changed.

Returns: The `LabelTarget` object representing a label that can be used to trigger the binding update.

To be added.

## CallSiteBinder.Bind(Object[], ParameterExpression>, LabelTarget) method

```csharp
public abstract System.Linq.Expressions.Expression Bind (object[] args, System.Collections.ObjectModel.ReadOnlyCollection<System.Linq.Expressions.ParameterExpression> parameters, System.Linq.Expressions.LabelTarget returnLabel);
```

Performs the runtime binding of the dynamic operation on a set of arguments.

Parameters:

- `args`: An array of arguments to the dynamic operation.
- `parameters`: The array of `ParameterExpression` instances that represent the parameters of the call site in the binding process.
- `returnLabel`: A LabelTarget used to return the result of the dynamic binding.

Returns: An Expression that performs tests on the dynamic operation arguments, and performs the dynamic operation if the tests are valid. If the tests fail on subsequent occurrences of the dynamic operation, Bind will be called again to produce a new `Expression` for the new argument types.

To be added.

## CallSiteBinder.BindDelegate<T>(CallSite<T>, Object[]) method

```csharp
public virtual T? BindDelegate<T> (System.Runtime.CompilerServices.CallSite<T> site, object[] args) where T : class;
```

Provides low-level runtime binding support. Classes can override this and provide a direct delegate for the implementation of rule. This can enable saving rules to disk, having specialized rules available at runtime, or providing a different caching policy.

Parameters:

- `T`: The target type of the CallSite.
- `site`: The CallSite the bind is being performed for.
- `args`: The arguments for the binder.

Returns: A new delegate that replaces the CallSite Target.

To be added.

## CallSiteBinder.CacheTarget<T>(T) method

```csharp
protected void CacheTarget<T> (T target) where T : class;
```

Adds a target to the cache of known targets. The cached targets will be scanned before calling BindDelegate to produce the new rule.

Parameters:

- `T`: The type of target being added.
- `target`: The target delegate to be added to the cache.

To be added.
