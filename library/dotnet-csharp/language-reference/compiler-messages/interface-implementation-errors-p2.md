---
title: "Resolve errors and warnings related to interface implementation. (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/interface-implementation-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to interface implementation. (part 2 of 2)

## Ambiguous and conflicting implementations

The following errors occur when the compiler can't determine which interface implementation to use:

- **CS0473**: *Explicit interface implementation 'method name' matches more than one interface member. Which interface member is actually chosen is implementation-dependent. Consider using a non-explicit implementation instead.*
- **CS8646**: *'member' is explicitly implemented more than once.*
- **CS8705**: *Interface member 'member' does not have a most specific implementation. Neither is most specific.*

You can correct these errors using the following techniques:

- Eliminate the explicit interface implementation and instead use a single implicit public implementation for both interface methods (**CS0473**). When a generic method acquires the same signature as a non-generic method (such as when implementing `ITest<int>` where both `TestMethod(int)` and `TestMethod(T)` become identical), the common language infrastructure metadata system can't unambiguously determine which interface member binds to which implementation slot, so using implicit implementation allows the single method to satisfy both interface requirements.
- Remove the duplicate explicit interface implementation for the same interface member (**CS8646**). A type can explicitly implement an interface member only once, so keep the implementation that should satisfy the interface contract and delete the duplicate declaration.
- Provide an explicit implementation in the implementing class or struct that resolves the ambiguity between multiple default implementations (**CS8705**). This error typically occurs with diamond inheritance patterns where a class implements multiple interfaces that each provide default implementations for the same member. The compiler needs you to explicitly specify which implementation to use, or provide your own implementation.
- Restructure the interface hierarchy to avoid diamond inheritance conflicts where multiple interfaces provide default implementations for the same member (**CS8705**). By redesigning the interface relationships or consolidating the default implementations into a single interface, you can eliminate the ambiguity that prevents the compiler from determining the most specific implementation.

For more information, see Interfaces and Default Interface Methods.

## Special implementation restrictions

The following error occurs when using special parameter types that aren't compatible with interface implementation:

- **CS0630**: *Member cannot implement interface member because it has an __arglist parameter.*

You can correct this error using the following techniques:

- Remove the `__arglist` parameter from the implementing method (**CS0630**). The `__arglist` keyword allows methods to accept variable numbers of arguments in an unmanaged way, but this feature is incompatible with interface implementation because interface contracts require predictable, type-safe signatures that can be verified at compile time.
- Replace the `__arglist` parameter with a `params` array parameter for variable-length argument lists (**CS0630**). Unlike `__arglist`, the `params` keyword provides a type-safe mechanism for accepting variable numbers of arguments that is fully compatible with interface implementation and maintains the compile-time type safety that interfaces require.

For more information, see Interfaces and params keyword.
