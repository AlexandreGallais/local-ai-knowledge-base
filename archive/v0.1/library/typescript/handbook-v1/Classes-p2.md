---
title: "Classes (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/handbook-v1/Classes.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Classes (part 2 of 2)

## Abstract Classes

Abstract classes are base classes from which other classes may be derived.
They may not be instantiated directly.
Unlike an interface, an abstract class may contain implementation details for its members.
The `abstract` keyword is used to define abstract classes as well as abstract methods within an abstract class.

```ts
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("roaming the earth...");
  }
}
```

Methods within an abstract class that are marked as abstract do not contain an implementation and must be implemented in derived classes.
Abstract methods share a similar syntax to interface methods.
Both define the signature of a method without including a method body.
However, abstract methods must include the `abstract` keyword and may optionally include access modifiers.

```ts
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing"); // constructors in derived classes must call super()
  }

  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }

  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}

let department: Department; // ok to create a reference to an abstract type
department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.generateReports(); // error: department is not of type AccountingDepartment, cannot access generateReports
```

## Constructor functions

When you declare a class in TypeScript, you are actually creating multiple declarations at the same time.
The first is the type of the _instance_ of the class.

```ts
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet()); // "Hello, world"
```

Here, when we say `let greeter: Greeter`, we're using `Greeter` as the type of instances of the class `Greeter`.
This is almost second nature to programmers from other object-oriented languages.

We're also creating another value that we call the _constructor function_.
This is the function that is called when we `new` up instances of the class.
To see what this looks like in practice, let's take a look at the JavaScript created by the above example:

```ts
let Greeter = (function () {
  function Greeter(message) {
    this.greeting = message;
  }

  Greeter.prototype.greet = function () {
    return "Hello, " + this.greeting;
  };

  return Greeter;
})();

let greeter;
greeter = new Greeter("world");
console.log(greeter.greet()); // "Hello, world"
```

Here, `let Greeter` is going to be assigned the constructor function.
When we call `new` and run this function, we get an instance of the class.
The constructor function also contains all of the static members of the class.
Another way to think of each class is that there is an _instance_ side and a _static_ side.

Let's modify the example a bit to show this difference:

```ts
class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
    if (this.greeting) {
      return "Hello, " + this.greeting;
    } else {
      return Greeter.standardGreeting;
    }
  }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet()); // "Hello, there"

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet()); // "Hey there!"

let greeter3: Greeter;
greeter3 = new Greeter();
console.log(greeter3.greet()); // "Hey there!"
```

In this example, `greeter1` works similarly to before.
We instantiate the `Greeter` class, and use this object.
This we have seen before.

Next, we then use the class directly.
Here we create a new variable called `greeterMaker`.
This variable will hold the class itself, or said another way its constructor function.
Here we use `typeof Greeter`, that is "give me the type of the `Greeter` class itself" rather than the instance type.
Or, more precisely, "give me the type of the symbol called `Greeter`," which is the type of the constructor function.
This type will contain all of the static members of Greeter along with the constructor that creates instances of the `Greeter` class.
We show this by using `new` on `greeterMaker`, creating new instances of `Greeter` and invoking them as before.
It is also good to mention that changing static property is frowned upon, here `greeter3` has `"Hey there!"` instead of `"Hello, there"` on `standardGreeting`.

## Using a class as an interface

As we said in the previous section, a class declaration creates two things: a type representing instances of the class and a constructor function.
Because classes create types, you can use them in the same places you would be able to use interfaces.

```ts
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
```
