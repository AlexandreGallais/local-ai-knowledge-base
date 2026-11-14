---
title: "Working with objects (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/working_with_objects/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Working with objects (part 2 of 2)

## Defining methods

A _method_ is a function associated with an object, or, put differently, a method is a property of an object that is a function. Methods are defined the way normal functions are defined, except that they have to be assigned as the property of an object. See also method definitions for more details. An example is:

```js
objectName.methodName = functionName;

const myObj = {
  myMethod: function (params) {
    // do something
  },

  // this works too!
  myOtherMethod(params) {
    // do something else
  },
};
```

where `objectName` is an existing object, `methodName` is the name you are assigning to the method, and `functionName` is the name of the function.

You can then call the method in the context of the object as follows:

```js
objectName.methodName(params);
```

Methods are typically defined on the `prototype` object of the constructor, so that all objects of the same type share the same method. For example, you can define a function that formats and displays the properties of the previously-defined `Car` objects.

```js
Car.prototype.displayCar = function () {
  const result = `A Beautiful ${this.year} ${this.make} ${this.model}`;
  console.log(result);
};
```

Notice the use of `this` to refer to the object to which the method belongs. Then you can call the `displayCar` method for each of the objects as follows:

```js
car1.displayCar();
car2.displayCar();
```

### Using this for object references

JavaScript has a special keyword, `this`, that you can use within a method to refer to the current object. For example, suppose you have 2 objects, `manager` and `intern`. Each object has its own `name`, `age` and `job`. In the function `sayHi()`, notice the use of `this.name`. When added to the 2 objects, the same function will print the message with the name of the respective object it's attached to.

```js
const manager = {
  name: "Karina",
  age: 27,
  job: "Software Engineer",
};
const intern = {
  name: "Tyrone",
  age: 21,
  job: "Software Engineer Intern",
};

function sayHi() {
  console.log(`Hello, my name is ${this.name}`);
}

// Add sayHi function to both objects
manager.sayHi = sayHi;
intern.sayHi = sayHi;

manager.sayHi(); // Hello, my name is Karina
intern.sayHi(); // Hello, my name is Tyrone
```

`this` is a "hidden parameter" of a function call that's passed in by specifying the object before the function that was called. For example, in `manager.sayHi()`, `this` is the `manager` object, because `manager` comes before the function `sayHi()`. If you access the same function from another object, `this` will change as well. If you use other methods to call the function, like `Function.prototype.call()` or `Reflect.apply()`, you can explicitly pass the value of `this` as an argument.

## Defining getters and setters

A getter is a function associated with a property that gets the value of a specific property. A setter is a function associated with a property that sets the value of a specific property. Together, they can indirectly represent the value of a property.

Getters and setters can be either

- defined within object initializers, or
- added later to any existing object.

Within object initializers, getters and setters are defined like regular methods, but prefixed with the keywords `get` or `set`. The getter method must not expect a parameter, while the setter method expects exactly one parameter (the new value to set). For instance:

```js
const myObj = {
  a: 7,
  get b() {
    return this.a + 1;
  },
  set c(x) {
    this.a = x / 2;
  },
};

console.log(myObj.a); // 7
console.log(myObj.b); // 8, returned from the get b() method
myObj.c = 50; // Calls the set c(x) method
console.log(myObj.a); // 25
```

The `myObj` object's properties are:

- `myObj.a` — a number
- `myObj.b` — a getter that returns `myObj.a` plus 1
- `myObj.c` — a setter that sets the value of `myObj.a` to half of the value `myObj.c` is being set to

Getters and setters can also be added to an object at any time after creation using the `Object.defineProperties()` method. This method's first parameter is the object on which you want to define the getter or setter. The second parameter is an object whose property names are the getter or setter names, and whose property values are objects for defining the getter or setter functions. Here's an example that defines the same getter and setter used in the previous example:

```js
const myObj = { a: 0 };

Object.defineProperties(myObj, {
  b: {
    get() {
      return this.a + 1;
    },
  },
  c: {
    set(x) {
      this.a = x / 2;
    },
  },
});

myObj.c = 10; // Runs the setter, which assigns 10 / 2 (5) to the 'a' property
console.log(myObj.b); // Runs the getter, which yields a + 1 or 6
```

Which of the two forms to choose depends on your programming style and task at hand. If you can change the definition of the original object, you will probably define getters and setters through the original initializer. This form is more compact and natural. However, if you need to add getters and setters later — maybe because you did not write the particular object — then the second form is the only possible form. The second form better represents the dynamic nature of JavaScript, but it can make the code hard to read and understand.

## Comparing objects

In JavaScript, objects are a reference type. Two distinct objects are never equal, even if they have the same properties. Only comparing the same object reference with itself yields true.

```js
// Two variables, two distinct objects with the same properties
const fruit = { name: "apple" };
const anotherFruit = { name: "apple" };

fruit == anotherFruit; // return false
fruit === anotherFruit; // return false
```

```js
// Two variables, a single object
const fruit = { name: "apple" };
const anotherFruit = fruit; // Assign fruit object reference to anotherFruit

// Here fruit and anotherFruit are pointing to same object
fruit == anotherFruit; // return true
fruit === anotherFruit; // return true

fruit.name = "grape";
console.log(anotherFruit); // { name: "grape" }; not { name: "apple" }
```

For more information about comparison operators, see equality operators.

## See also

- Inheritance and the prototype chain
- Classes
