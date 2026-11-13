---
title: "MSTest code analysis (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/mstest-analyzers/overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTest code analysis (part 2 of 2)

## All rules (quick reference)

| Rule ID | Category | Title | Default Severity |
|---------|----------|-------|------------------|
| MSTEST0001 | Performance | Use Parallelize attribute | Info |
| MSTEST0002 | Usage | Test class should be valid | Warning |
| MSTEST0003 | Usage | Test method should be valid | Warning → Error* |
| MSTEST0004 | Design | Public types should be test classes | Info |
| MSTEST0005 | Usage | TestContext should be valid | Warning |
| MSTEST0006 | Design | Avoid ExpectedException attribute | Info |
| MSTEST0007 | Usage | Use attribute on test method | Warning |
| MSTEST0008 | Usage | TestInitialize should be valid | Warning |
| MSTEST0009 | Usage | TestCleanup should be valid | Warning |
| MSTEST0010 | Usage | ClassInitialize should be valid | Warning |
| MSTEST0011 | Usage | ClassCleanup should be valid | Warning |
| MSTEST0012 | Usage | AssemblyInitialize should be valid | Warning |
| MSTEST0013 | Usage | AssemblyCleanup should be valid | Warning |
| MSTEST0014 | Usage | DataRow should be valid | Warning |
| MSTEST0015 | Design | Test method should not be ignored | None (opt-in) |
| MSTEST0016 | Design | Test class should have test method | Info |
| MSTEST0017 | Usage | Assertion args should be passed in correct order | Info |
| MSTEST0018 | Usage | DynamicData should be valid | Warning |
| MSTEST0019 | Design | Prefer TestInitialize over constructors | None (opt-in) |
| MSTEST0020 | Design | Prefer constructors over TestInitialize | None (opt-in) |
| MSTEST0021 | Design | Prefer Dispose over TestCleanup | None (opt-in) |
| MSTEST0022 | Design | Prefer TestCleanup over Dispose | None (opt-in) |
| MSTEST0023 | Usage | Do not negate boolean assertion | Info |
| MSTEST0024 | Usage | Do not store static TestContext | Warning |
| MSTEST0025 | Design | Prefer Assert.Fail over always-false conditions | Info |
| MSTEST0026 | Usage | Assertion args should avoid conditional access | Info |
| MSTEST0027 | Suppression | Suppress async suffix for test methods | N/A |
| MSTEST0028 | Suppression | Suppress async suffix for test fixture methods | N/A |
| MSTEST0029 | Design | Public method should be test method | Info |
| MSTEST0030 | Usage | Type containing test method should be a test class | Warning |
| MSTEST0031 | Usage | Do not use System.ComponentModel.DescriptionAttribute | Info |
| MSTEST0032 | Usage | Review always-true assert condition | Info |
| MSTEST0033 | Suppression | Suppress non-nullable reference not initialized | N/A |
| MSTEST0034 | Usage | Use ClassCleanupBehavior.EndOfClass | Info |
| MSTEST0035 | Usage | Use DeploymentItem with test method or test class | Info |
| MSTEST0036 | Design | Do not use shadowing | Warning |
| MSTEST0037 | Usage | Use proper assert methods | Info |
| MSTEST0038 | Usage | Avoid Assert.AreSame with value types | Info |
| MSTEST0039 | Usage | Use newer Assert.Throws methods | Info |
| MSTEST0040 | Usage | Avoid using asserts in async void context | Warning |
| MSTEST0041 | Usage | Use condition-based attributes with test class | Warning |
| MSTEST0042 | Usage | Duplicate DataRow | Warning |
| MSTEST0043 | Usage | Use retry attribute on test method | Warning → Error* |
| MSTEST0044 | Design | Prefer TestMethod over DataTestMethod | Info |
| MSTEST0045 | Design | Use cooperative cancellation for timeout | Info |
| MSTEST0046 | Usage | Use Assert instead of StringAssert | Info |
| MSTEST0047 | Suppression | Suppress IDE0060 for the TestContext parameter | N/A |
| MSTEST0048 | Usage | TestContext property usage | Warning |
| MSTEST0049 | Usage | Flow TestContext CancellationToken | Info |
| MSTEST0050 | Usage | Global test fixture should be valid | Warning |
| MSTEST0051 | Usage | Assert.Throws should contain single statement | Info |
| MSTEST0052 | Usage | Avoid explicit DynamicDataSourceType | Info |
| MSTEST0053 | Usage | Avoid Assert format parameters | Info |
| MSTEST0054 | Usage | Use CancellationToken property | Info |
| MSTEST0055 | Usage | Do not ignore string method return value | Warning |
| MSTEST0056 | Usage | TestMethodAttribute should set DisplayName correctly | Info |
| MSTEST0057 | Usage | TestMethodAttribute should propagate source information | Warning |
| MSTEST0058 | Usage | Avoid asserts in catch blocks | Info |
| MSTEST0059 | Usage | Use Parallelize attribute correctly | Warning |
| MSTEST0060 | Usage | Duplicate TestMethodAttribute | Warning |
| MSTEST0061 | Usage | Use OSCondition attribute instead of runtime check | Info |
| MSTEST0062 | Usage | Avoid out/ref test method parameters | Warning |
| MSTEST0063 | Usage | Test class should have valid constructor | Warning |
| MSTEST0064 | Usage | Prefer async assertion methods | Info |
| MSTEST0065 | Usage | Avoid `Assert.AreEqual` on collection types | Warning |
| MSTEST0066 | Design | `[Ignore]` should specify a justification | Info |
| MSTEST0067 | Usage | Avoid synchronously blocking calls in test code | Info (disabled by default) |
| MSTEST0068 | Usage | Use `Assert` instead of `CollectionAssert` | Info |
| MSTEST0069 | Usage | Inherited `[TestClass]` is ignored by the MSTest source generator | Warning |
| MSTEST0070 | Usage | `[MemberCondition]` arguments should be valid | Warning |
| MSTEST0071 | Usage | Test method should not specify a display name equal to its name | Info |
| MSTEST0072 | Usage | `[AssemblyFixtureProvider]` isn't supported with ahead-of-time compilation | Warning |
| MSTEST0073 | Usage | Prefer a constant for the `[ResourceLock]` resource key | Info |
| MSTEST0074 | Usage | Test mutating process-global state should declare a resource lock | Info |
| MSTEST0075 | Usage | Avoid changing the current directory in a parallelized test | Info |
| MSTEST0076 | Usage | Avoid mutating process-wide culture in a parallelized test | Info |
| MSTEST0077 | Usage | Avoid hardcoded or shared filesystem paths in a parallelized test | Info |
| MSTEST0078 | Usage | `[DependsOn]` arguments should be valid | Warning |
| MSTEST0079 | Usage | Use ArchitectureCondition attribute instead of runtime checks | Info |
| MSTEST0080 | Usage | Use CICondition attribute instead of environment checks | Info |
| MSTEST0081 | Usage | `[TestFilterProvider]` should reference a valid test filter type | Warning |
| MSTEST0082 | Usage | A test class inherits a lifecycle or test method from a different MSTest version | Warning |
| MSTEST0083 | Usage | Use `[ExecutableCondition]` instead of `File.Exists` checks before `Process.Start` | Info |
| MSTEST0084 | Usage | Platform compatibility attributes should be consistent with `[OSCondition]` | Info |
| MSTEST0085 | Usage | `[TestClass]` should not be applied to abstract classes | Info |
| MSTEST0086 | Usage | Remove redundant test method attribute | Info |
| MSTEST0087 | Usage | Avoid duplicated `DataRow` display names | Warning |
| MSTEST0088 | Usage | MSTest host test-class injection is not supported by the selected build mode | Error |

\* Escalated to Error in `Recommended` and `All` modes.

## MSTESTEXP

Several APIs of MSTest are decorated with the `System.Diagnostics.CodeAnalysis.ExperimentalAttribute`. This attribute indicates that the API is experimental and may be removed or changed in future versions of MSTest. The attribute is used to identify APIs that aren't yet stable and may not be suitable for production use.

The MSTESTEXP diagnostic alerts you to use of an experimental API in your code. To suppress this diagnostic with the `SuppressMessageAttribute`, add the following code to your project:

```csharp
using System.Diagnostics.CodeAnalysis;

[assembly: SuppressMessage("MSTESTEXP", "Justification")]
```

Alternatively, you can suppress this diagnostic with preprocessor directive by adding the following code to your project:

```csharp
#pragma warning disable MSTESTEXP
        // API that is causing the warning.
#pragma warning restore MSTESTEXP
```
