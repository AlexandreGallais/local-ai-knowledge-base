---
title: "Nullable reference type warnings (part 2 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/nullable-warnings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Nullable reference type warnings (part 2 of 3)

## Possible dereference of null

This set of warnings alerts you that you're dereferencing a variable whose *null-state* is *maybe-null*. These warnings are:

- **CS8602** - *Dereference of a possibly null reference.*
- **CS8670** - *Object or collection initializer implicitly dereferences possibly null member.*

The following code demonstrates one example of each of the preceding warnings:

```csharp
class Container
{
    public List<string>? States { get; set; }
}

internal void PossibleDereferenceNullExamples(string? message)
{
    Console.WriteLine(message.Length); // CS8602

    var c = new Container { States = { "Red", "Yellow", "Green" } }; // CS8670
}
```
In the preceding example, the warning is because the `Container`, `c`, might have a null value for the `States` property. Assigning new states to a collection that might be null causes the warning.

To remove these warnings, you need to add code to change that variable's *null-state* to *not-null* before dereferencing it. The collection initializer warning can be harder to spot. The compiler detects that the collection *maybe-null* when the initializer adds elements to it.

In many instances, you can fix these warnings by checking that a variable isn't null before dereferencing it. Consider the following example that adds a null check before dereferencing the `message` parameter:

```csharp
void WriteMessageLength(string? message)
{
    if (message is not null)
    {
        Console.WriteLine(message.Length);
    }
    
}
```
The following example initializes the backing storage for the `States` and removes the `set` accessor. Consumers of the class can modify the contents of the collection, and the storage for the collection is never `null`:

```csharp
class Container
{
    public List<string> States { get; } = new();
}
```
Other instances when you get these warnings might be false positive. You might have a private utility method that tests for null. The compiler doesn't know that the method provides a null check. Consider the following example that uses a private utility method, `IsNotNull`:

```csharp
public void WriteMessage(string? message)
{
    if (IsNotNull(message))
        Console.WriteLine(message.Length);
}
```
The compiler warns that you might be dereferencing null when you write the property `message.Length` because its static analysis determines that `message` might be `null`. You know that `IsNotNull` provides a null check, and when it returns `true`, the *null-state* of `message` should be *not-null*. You must tell the compiler those facts. One way is to use the null forgiving operator, `!`. You can change the `WriteLine` statement to match the following code:

```csharp
Console.WriteLine(message!.Length);
```

The null forgiving operator makes the expression *not-null* even if it was *maybe-null* without the `!` applied. In this example, a better solution is to add an attribute to the signature of `IsNotNull`:

```csharp
private static bool IsNotNull([NotNullWhen(true)] object? obj) => obj != null;
```
The `System.Diagnostics.CodeAnalysis.NotNullWhenAttribute` informs the compiler that the argument used for the `obj` parameter is *not-null* when the method returns `true`. When the method returns `false`, the argument has the same *null-state* it had before the method was called.

> **Tip:**
> There's a rich set of attributes you can use to describe how your methods and properties affect *null-state*. You can learn about them in the language reference article on Nullable static analysis attributes.

Fixing a warning for dereferencing a *maybe-null* variable involves one of three techniques:

- Add a missing null check.
- Add null analysis attributes on APIs to affect the compiler's *null-state* static analysis. These attributes inform the compiler when a return value or argument should be *maybe-null* or *not-null* after calling the method.
- Apply the null forgiving operator `!` to the expression which forces the state to *not-null*.

## Possible null assigned to a nonnullable reference

This set of warnings alerts you that you're assigning a variable whose type is nonnullable to an expression whose *null-state* is *maybe-null*. These warnings are:

- **CS8597** - *Thrown value may be null.*
- **CS8600** - *Converting null literal or possible null value to non-nullable type.*
- **CS8601** - *Possible null reference assignment.*
- **CS8603** - *Possible null reference return.*
- **CS8604** - *Possible null reference argument for parameter.*
- **CS8605** - *Unboxing a possibly null value.*
- **CS8625** - *Cannot convert null literal to non-nullable reference type.*
- **CS8629** - *Nullable value type may be null.*

The compiler emits these warnings when you attempt to assign an expression that is *maybe-null* to a variable that is nonnullable. For example:

```csharp
string? TryGetMessage(int id) => "";

string msg = TryGetMessage(42);  // Possible null assignment.
```
The different warnings indicate provide details about the code, such as assignment, unboxing assignment, return statements, arguments to methods, and throw expressions.

You can take one of three actions to address these warnings. One is to add the `?` annotation to make the variable a nullable reference type. That change can cause other warnings. Changing a variable from a non-nullable reference to a nullable reference changes its default *null-state* from *not-null* to *maybe-null*. The compiler's static analysis finds instances where you dereference a variable that is *maybe-null*.

The other actions instruct the compiler that the right-hand-side of the assignment is *not-null*. The expression on the right-hand-side could be null-checked before assignment, as shown in the following example:

```csharp
string notNullMsg = TryGetMessage(42) ?? "Unknown message id: 42";
```
The previous examples demonstrate assignment of the return value of a method. You annotate the method (or property) to indicate when a method returns a not-null value. The `System.Diagnostics.CodeAnalysis.NotNullIfNotNullAttribute` often specifies that a return value is *not-null* when an input argument is *not-null*. Another alternative is to add the null forgiving operator, `!` to the right-hand side:

```csharp
string msg = TryGetMessage(42)!;
```

Fixing a warning for assigning a *maybe-null* expression to a *not-null* variable involves one of four techniques:

- Change the left side of the assignment to a nullable type. This action can introduce new warnings when you dereference that variable.
- Provide a null-check before the assignment.
- Annotate the API that produces the right-hand side of the assignment.
- Add the null forgiving operator to the right-hand side of the assignment.

## Nonnullable reference not initialized

This set of warnings alerts you that you're assigning a variable whose type is non-nullable to an expression whose *null-state* is *maybe-null*. These warnings are:

- **CS8618** - *Non-nullable variable must contain a non-null value when exiting constructor. Consider declaring it as nullable.*
- **CS8762** - *Parameter  must have a non-null value when exiting.*

Consider the following class as an example:

```csharp
public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
}
```
Neither `FirstName` nor `LastName` are guaranteed initialized. If this code is new, consider changing the public interface. The preceding example could be updated as follows:

```csharp
public class Person
{
    public Person(string first, string last)
    {
        FirstName = first;
        LastName = last;
    }

    public string FirstName { get; set; }
    public string LastName { get; set; }
}
```
If you require creating a `Person` object before setting the name, you can initialize the properties using a default non-null value:

```csharp
public class Person
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
}
```
Another alternative is to change those members to nullable reference types. The `Person` class could be defined as follows if `null` should be allowed for the name:

```csharp
public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
```
Existing code sometimes require other changes to inform the compiler about the null semantics for those members. It might have multiple constructors, and your class has a private helper method that initializes one or more members. You can move the initialization code into a single constructor and ensure all constructors call the one with the common initialization code. Or, you can use the `System.Diagnostics.CodeAnalysis.MemberNotNullAttribute` and `System.Diagnostics.CodeAnalysis.MemberNotNullWhenAttribute` attributes. These attributes inform the compiler that a member is *not-null* after the method returns. The following code shows an example of each. The `Person` class uses a common constructor called by all other constructors. The `Student` class has a helper method annotated with the `System.Diagnostics.CodeAnalysis.MemberNotNullAttribute` attribute:

```csharp

using System.Diagnostics.CodeAnalysis;

public class Person
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public Person(string firstName, string lastName)
    {
        FirstName = firstName;
        LastName = lastName;
    }

    public Person() : this("John", "Doe") { }
}

public class Student : Person
{
    public string Major { get; set; }

    public Student(string firstName, string lastName, string major)
        : base(firstName, lastName)
    {
        SetMajor(major);
    }

    public Student(string firstName, string lastName) :
        base(firstName, lastName)
    {
        SetMajor();
    }

    public Student()
    {
        SetMajor();
    }

    [MemberNotNull(nameof(Major))]
    private void SetMajor(string? major = default)
    {
        Major = major ?? "Undeclared";
    }
}
```
Finally, you can use the null forgiving operator to indicate that a member is initialized in other code. For another example, consider the following classes representing an Entity Framework Core model:

```csharp
public class TodoItem
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
}

public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options)
    {
    }

    public DbSet<TodoItem> TodoItems { get; set; } = null!;
}
```
The `DbSet` property is initialized to `null!`. That tells the compiler that the property is set to a *not-null* value. In fact, the base `DbContext` performs the initialization of the set. The compiler's static analysis doesn't pick that up. For more information on working with nullable reference types and Entity Framework Core, see the article on Working with Nullable Reference Types in EF Core.

Fixing a warning for not initializing a nonnullable member involves one of four techniques:

- Change the constructors or field initializers to ensure all nonnullable members are initialized.
- Change one or more members to be nullable types.
- Annotate any helper methods to indicate which members are assigned.
- Add an initializer to `null!` to indicate that the member is initialized in other code.
