---
title: "Extension members (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/programming-guide/classes-and-structs/extension-methods.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Extension members (C# Programming Guide)

Extension members enable you to "add" methods to existing types without creating a new derived type, recompiling, or otherwise modifying the original type.

Beginning with C# 14, there are two syntaxes you use to define extension methods. C# 14 adds `extension` blocks, where you define multiple extension members for a type or an instance of a type. Before C# 14, you add the `this` modifier to the first parameter of a static method to indicate that the method appears as a member of an instance of the parameter type.

Extension blocks support multiple member types: methods, properties, and operators. With extension blocks, you can define both instance extensions and static extensions. Instance extensions extend an instance of the type; static extensions extend the type itself. The form of extension methods declared with the `this` modifier supports instance extension methods.

Extension methods are static methods, but they're called as if they were instance methods on the extended type. For client code written in C#, F# and Visual Basic, there's no apparent difference between calling an extension method and the methods defined in a type. Both forms of extension methods are compiled to the same IL (Intermediate Language). Consumers of extension members don't need to know which syntax was used to define extension methods.

The most common extension members are the LINQ standard query operators that add query functionality to the existing `System.Collections.IEnumerable` and `System.Collections.Generic.IEnumerable`1` types. To use the standard query operators, first bring them into scope with a `using System.Linq` directive. Then any type that implements `System.Collections.Generic.IEnumerable`1` appears to have instance methods such as `System.Linq.Enumerable.GroupBy*`, `System.Linq.Enumerable.OrderBy*`, `System.Linq.Enumerable.Average*`, and so on. You can see these extra methods in IntelliSense statement completion when you type "dot" after an instance of an `System.Collections.Generic.IEnumerable`1` type such as `System.Collections.Generic.List`1` or `System.Array`.

### OrderBy example

The following example shows how to call the standard query operator `OrderBy` method on an array of integers. The expression in parentheses is a lambda expression. Many standard query operators take lambda expressions as parameters. For more information, see Lambda Expressions.

```csharp
int[] numbers = [10, 45, 15, 39, 21, 26];
IOrderedEnumerable<int> result = numbers.OrderBy(g => g);
foreach (int i in result)
{
    Console.Write(i + " ");
}
//Output: 10 15 21 26 39 45
```
Extension methods are defined as static methods but are called by using instance method syntax. Their first parameter specifies which type the method operates on. The parameter follows the this modifier. Extension methods are only in scope when you explicitly import the namespace into your source code with a `using` directive.

### Declare extension members

Beginning with C# 14, you can declare *extension blocks*. An extension block is a block in a non-nested, nongeneric, static class that contains extension members for a type or an instance of that type. The following code example defines an extension block for the `string` type. The extension block contains one member: a method that counts the words in the string:

```csharp
namespace CustomExtensionMembers;

public static class MyExtensions
{
    extension(string str)
    {
        public int WordCount() =>
            str.Split([' ', '.', '?'], StringSplitOptions.RemoveEmptyEntries).Length;
    }
}
```
Extension members in an extension block can use open or closed generics. The type parameters can include constraints:

```csharp
public static class MyGenericExtensions
{
    extension<T>(IEnumerable<T> source)
        where T : IEquatable<T>
    {
        public IEnumerable<T> ValuesEqualTo(T threshold)
            => source.Where(x => x.Equals(threshold));
    }
}
```
Before C# 14, you declare an extension method by adding the `this` modifier to the first parameter:

```csharp
namespace CustomExtensionMethods;

public static class MyExtensions
{
    public static int WordCount(this string str) =>
        str.Split([' ', '.', '?'], StringSplitOptions.RemoveEmptyEntries).Length;
}
```
Both forms of extensions must be defined inside a non-nested, nongeneric static class.

And it can be called from an application by using the syntax for accessing instance members:

```csharp
string s = "Hello Extension Methods";
int i = s.WordCount();
```
While extension members add new capabilities to an existing type, extension members don't violate the principle of encapsulation. The access declarations for all members of the extended type apply to extension members.

Both the `MyExtensions` class and the `WordCount` method are `static`, and it can be accessed like all other `static` members. The `WordCount` method can be invoked like other `static` methods as follows:

```csharp
string s = "Hello Extension Methods";
int i = MyExtensions.WordCount(s);
```
The preceding C# code applies to both the extension block and `this` syntax for extension members. The preceding code:

- Declares and assigns a new `string` named `s` with a value of `"Hello Extension Methods"`.
- Calls `MyExtensions.WordCount` given argument `s`.

For more information, see How to implement and call a custom  extension method.

In general, you probably call extension members far more often than you implement them. Because extension members are called as though they're declared as members of the extended class, no special knowledge is required to use them from client code. To enable extension members for a particular type, just add a `using` directive for the namespace in which the methods are defined. For example, to use the standard query operators, add this `using` directive to your code:

```csharp
using System.Linq;
```

## Binding extension members at compile time

You can use extension members to extend a class or interface, but not to override behavior defined in a class. An extension member with the same name and signature as an interface or class members are never called. At compile time, extension members always have lower priority than instance (or static) members defined in the type itself. In other words, if a type has a method named `Process(int i)`, and you have an extension method with the same signature, the compiler always binds to the member method. When the compiler encounters a member invocation, it first looks for a match in the type's members. If no match is found, it searches for any extension members that are defined for the type. It binds to the first extension member that it finds. The following example demonstrates the rules that the C# compiler follows in determining whether to bind to an instance member on the type, or to an extension member. The static class `Extensions` contains extension members defined for any type that implements `IMyInterface`:

```csharp
public interface IMyInterface
{
    void MethodB();
}

// Define extension methods for IMyInterface.

// The following extension methods can be accessed by instances of any
// class that implements IMyInterface.
public static class Extension
{
    public static void MethodA(this IMyInterface myInterface, int i) =>
        Console.WriteLine("Extension.MethodA(this IMyInterface myInterface, int i)");

    public static void MethodA(this IMyInterface myInterface, string s) =>
        Console.WriteLine("Extension.MethodA(this IMyInterface myInterface, string s)");

    // This method is never called in ExtensionMethodsDemo1, because each
    // of the three classes A, B, and C implements a method named MethodB
    // that has a matching signature.
    public static void MethodB(this IMyInterface myInterface) =>
        Console.WriteLine("Extension.MethodB(this IMyInterface myInterface)");
}
```
The equivalent extensions can be declared using the C# 14 extension member syntax:

```csharp
public static class Extension
{
    extension(IMyInterface myInterface)
    {
        public void MethodA(int i) =>
            Console.WriteLine("Extension.MethodA(this IMyInterface myInterface, int i)");

        public void MethodA(string s) =>
            Console.WriteLine("Extension.MethodA(this IMyInterface myInterface, string s)");

        // This method is never called in ExtensionMethodsDemo1, because each
        // of the three classes A, B, and C implements a method named MethodB
        // that has a matching signature.
        public void MethodB() =>
            Console.WriteLine("Extension.MethodB(this IMyInterface myInterface)");
    }
}
```
Classes `A`, `B`, and `C` all implement the interface:

```csharp
// Define three classes that implement IMyInterface, and then use them to test
// the extension methods.
class A : IMyInterface
{
    public void MethodB() { Console.WriteLine("A.MethodB()"); }
}

class B : IMyInterface
{
    public void MethodB() { Console.WriteLine("B.MethodB()"); }
    public void MethodA(int i) { Console.WriteLine("B.MethodA(int i)"); }
}

class C : IMyInterface
{
    public void MethodB() { Console.WriteLine("C.MethodB()"); }
    public void MethodA(object obj)
    {
        Console.WriteLine("C.MethodA(object obj)");
    }
}
```
The `MethodB` extension method is never called because its name and signature exactly match methods already implemented by the classes. When the compiler can't find an instance method with a matching signature, it binds to a matching extension method if one exists.

```csharp
// Declare an instance of class A, class B, and class C.
A a = new A();
B b = new B();
C c = new C();

// For a, b, and c, call the following methods:
//      -- MethodA with an int argument
//      -- MethodA with a string argument
//      -- MethodB with no argument.

// A contains no MethodA, so each call to MethodA resolves to
// the extension method that has a matching signature.
a.MethodA(1);           // Extension.MethodA(IMyInterface, int)
a.MethodA("hello");     // Extension.MethodA(IMyInterface, string)

// A has a method that matches the signature of the following call
// to MethodB.
a.MethodB();            // A.MethodB()

// B has methods that match the signatures of the following
// method calls.
b.MethodA(1);           // B.MethodA(int)
b.MethodB();            // B.MethodB()

// B has no matching method for the following call, but
// class Extension does.
b.MethodA("hello");     // Extension.MethodA(IMyInterface, string)

// C contains an instance method that matches each of the following
// method calls.
c.MethodA(1);           // C.MethodA(object)
c.MethodA("hello");     // C.MethodA(object)
c.MethodB();            // C.MethodB()
/* Output:
    Extension.MethodA(this IMyInterface myInterface, int i)
    Extension.MethodA(this IMyInterface myInterface, string s)
    A.MethodB()
    B.MethodA(int i)
    B.MethodB()
    Extension.MethodA(this IMyInterface myInterface, string s)
    C.MethodA(object obj)
    C.MethodA(object obj)
    C.MethodB()
 */
```
