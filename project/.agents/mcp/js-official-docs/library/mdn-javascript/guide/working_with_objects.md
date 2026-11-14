---
title: "Working with objects (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/working_with_objects/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Working with objects

JavaScript is designed on an object-based paradigm. An object is a collection of properties, and a property is an association between a name (or _key_) and a value. A property's value can be a function, in which case the property is known as a method.

Objects in JavaScript, just as in many other programming languages, can be compared to objects in real life. In JavaScript, an object is a standalone entity, with properties and type. Compare it with a cup, for example. A cup is an object with properties. A cup has a color, a design, weight, a material it is made of, etc. In the same way, JavaScript objects can have properties, which define their characteristics.

In addition to objects that are predefined in the browser, you can define your own objects. This chapter describes how to use objects, properties, and methods, and how to create your own objects.

## Creating new objects

You can create an object using an object initializer. Alternatively, you can first create a constructor function and then instantiate an object by invoking that function with the `new` operator.

### Using object initializers

Object initializers are also called _object literals_. "Object initializer" is consistent with the terminology used by C++.

The syntax for an object using an object initializer is:

```js
const obj = {
  property1: value1, // property name may be an identifier
  2: value2, // or a number
  "property n": value3, // or a string
};
```

Each property name before the colon is either an identifier, a number literal, or a string literal, and each `valueN` is an expression whose value is assigned to the property name. The property name can also be an expression; computed keys need to be wrapped in square brackets. The object initializer reference contains a more detailed explanation of the syntax.

In this example, the newly created object is assigned to a variable `obj` — this is optional. If you do not need to refer to this object elsewhere, you do not need to assign it to a variable. (Note that you may need to wrap the object literal in parentheses if the object appears where a statement is expected, so as not to have the literal be confused with a block statement.)

Object initializers are expressions, and each object initializer results in a new object being created whenever the statement in which it appears is executed. Identical object initializers create distinct objects that do not compare to each other as equal.

The following statement creates an object and assigns it to the variable `x` if and only if the expression `cond` is true:

```js
let x;
if (cond) {
  x = { greeting: "hi there" };
}
```

The following example creates `myHonda` with three properties. Note that the `engine` property is also an object with its own properties.

```js
const myHonda = {
  color: "red",
  wheels: 4,
  engine: { cylinders: 4, size: 2.2 },
};
```

Objects created with initializers are called _plain objects_, because they are instances of `Object`, but not any other object type. Some object types have special initializer syntaxes — for example, array initializers and regex literals.

### Using a constructor function

Alternatively, you can create an object with these two steps:

1. Define the object type by writing a constructor function. There is a strong convention, with good reason, to use a capital initial letter.
2. Create an instance of the object with `new`.

To define an object type, create a function for the object type that specifies its name, properties, and methods. For example, suppose you want to create an object type for cars. You want this type of object to be called `Car`, and you want it to have properties for make, model, and year. To do this, you would write the following function:

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
```

Notice the use of `this` to assign values to the object's properties based on the values passed to the function.

Now you can create an object called `myCar` as follows:

```js
const myCar = new Car("Eagle", "Talon TSi", 1993);
```

This statement creates `myCar` and assigns it the specified values for its properties. Then the value of `myCar.make` is the string `"Eagle"`, `myCar.model` is the string `"Talon TSi"`, `myCar.year` is the integer `1993`, and so on. The order of arguments and parameters should be the same.

You can create any number of `Car` objects by calls to `new`. For example,

```js
const randCar = new Car("Nissan", "300ZX", 1992);
const kenCar = new Car("Mazda", "Miata", 1990);
```

An object can have a property that is itself another object. For example, suppose you define an object called `Person` as follows:

```js
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}
```

and then instantiate two new `Person` objects as follows:

```js
const rand = new Person("Rand McKinnon", 33, "M");
const ken = new Person("Ken Jones", 39, "M");
```

Then, you can rewrite the definition of `Car` to include an `owner` property that takes a `Person` object, as follows:

```js
function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}
```

To instantiate the new objects, you then use the following:

```js
const car1 = new Car("Eagle", "Talon TSi", 1993, rand);
const car2 = new Car("Nissan", "300ZX", 1992, ken);
```

Notice that instead of passing a literal string or integer value when creating the new objects, the above statements pass the objects `rand` and `ken` as the arguments for the owners. Then if you want to find out the name of the owner of `car2`, you can access the following property:

```js
car2.owner.name;
```

You can always add a property to a previously defined object. For example, the statement

```js
car1.color = "black";
```

adds a property `color` to `car1`, and assigns it a value of `"black"`. However, this does not affect any other objects. To add the new property to all objects of the same type, you have to add the property to the definition of the `Car` object type.

You can also use the `class` syntax instead of the `function` syntax to define a constructor function. For more information, see the class guide.

### Using the Object.create() method

Objects can also be created using the `Object.create()` method. This method can be very useful, because it allows you to choose the prototype object for the object you want to create, without having to define a constructor function.

```js
// Animal properties and method encapsulation
const animalProto = {
  type: "Invertebrates", // Default value of properties
  displayType() {
    // Method which will display the type of animal
    console.log(this.type);
  },
};

// Create a new animal type called `animal`
const animal = Object.create(animalProto);
animal.displayType(); // Logs: Invertebrates

// Create a new animal type called fish
const fish = Object.create(animalProto);
fish.type = "Fishes";
fish.displayType(); // Logs: Fishes
```

## Objects and properties

A JavaScript object has properties associated with it. Object properties are basically the same as variables, except that they are associated with objects, not scopes. The properties of an object define the characteristics of the object.

For example, this example creates an object named `myCar`, with properties named `make`, `model`, and `year`, with their values set to `"Ford"`, `"Mustang"`, and `1969`:

```js
const myCar = {
  make: "Ford",
  model: "Mustang",
  year: 1969,
};
```

Like JavaScript variables, property names are case sensitive. Property names can only be strings or Symbols — all keys are converted to strings unless they are Symbols. Array indices are, in fact, properties with string keys that contain integers.

### Accessing properties

You can access a property of an object by its property name. Property accessors come in two syntaxes: _dot notation_ and _bracket notation_. For example, you could access the properties of the `myCar` object as follows:

```js
// Dot notation
myCar.make = "Ford";
myCar.model = "Mustang";
myCar.year = 1969;

// Bracket notation
myCar["make"] = "Ford";
myCar["model"] = "Mustang";
myCar["year"] = 1969;
```

An object property name can be any JavaScript string or symbol, including an empty string. However, you cannot use dot notation to access a property whose name is not a valid JavaScript identifier. For example, a property name that has a space or a hyphen, that starts with a number, or that is held inside a variable can only be accessed using the bracket notation. This notation is also very useful when property names are to be dynamically determined, i.e., not determinable until runtime. Examples are as follows:

```js
const myObj = {};
const str = "myString";
const rand = Math.random();
const anotherObj = {};

// Create additional properties on myObj
myObj.type = "Dot syntax for a key named type";
myObj["date created"] = "This key has a space";
myObj[str] = "This key is in variable str";
myObj[rand] = "A random number is the key here";
myObj[anotherObj] = "This key is object anotherObj";
myObj[""] = "This key is an empty string";

console.log(myObj);
// {
//   type: 'Dot syntax for a key named type',
//   'date created': 'This key has a space',
//   myString: 'This key is in variable str',
//   '0.6398914448618778': 'A random number is the key here',
//   '[object Object]': 'This key is object anotherObj',
//   '': 'This key is an empty string'
// }
console.log(myObj.myString); // 'This key is in variable str'
```

In the above code, the key `anotherObj` is an object, which is neither a string nor a symbol. When it is added to the `myObj`, JavaScript calls the `toString()` method of `anotherObj`, and use the resulting string as the new key.

You can also access properties with a string value stored in a variable. The variable must be passed in bracket notation. In the example above, the variable `str` held `"myString"` and it is `"myString"` that is the property name. Therefore, `myObj.str` will return as undefined.

```js
str = "myString";
myObj[str] = "This key is in variable str";

console.log(myObj.str); // undefined

console.log(myObj[str]); // 'This key is in variable str'
console.log(myObj.myString); // 'This key is in variable str'
```

This allows accessing any property as determined at runtime:

```js
let propertyName = "make";
myCar[propertyName] = "Ford";

// access different properties by changing the contents of the variable
propertyName = "model";
myCar[propertyName] = "Mustang";

console.log(myCar); // { make: 'Ford', model: 'Mustang' }
```

However, beware of using square brackets to access properties whose names are given by external input. This may make your code susceptible to object injection attacks.

Nonexistent properties of an object have the value `undefined` (and not `null`).

```js
myCar.nonexistentProperty; // undefined
```

### Enumerating properties

There are three native ways to list/traverse object properties:

- `for...in` loops. This method traverses all of the enumerable string properties of an object as well as its prototype chain.
- `Object.keys()`. This method returns an array with only the enumerable own string property names ("keys") in the object `myObj`, but not those in the prototype chain.
- `Object.getOwnPropertyNames()`. This method returns an array containing all the own string property names in the object `myObj`, regardless of if they are enumerable or not.

You can use the bracket notation with `for...in` to iterate over all the enumerable properties of an object. To illustrate how this works, the following function displays the properties of the object when you pass the object and the object's name as arguments to the function:

```js
function showProps(obj, objName) {
  let result = "";
  for (const i in obj) {
    // Object.hasOwn() is used to exclude properties from the object's
    // prototype chain and only show "own properties"
    if (Object.hasOwn(obj, i)) {
      result += `${objName}.${i} = ${obj[i]}\n`;
    }
  }
  console.log(result);
}
```

The term "own property" refers to the properties of the object, but excluding those of the prototype chain. So, the function call `showProps(myCar, 'myCar')` would print the following:

```plain
myCar.make = Ford
myCar.model = Mustang
myCar.year = 1969
```

The above is equivalent to:

```js
function showProps(obj, objName) {
  let result = "";
  Object.keys(obj).forEach((i) => {
    result += `${objName}.${i} = ${obj[i]}\n`;
  });
  console.log(result);
}
```

There is no native way to list all inherited properties, including non-enumerable ones. However, this can be achieved with the following function:

```js
function listAllProperties(myObj) {
  let objectToInspect = myObj;
  let result = [];

  while (objectToInspect !== null) {
    result = result.concat(Object.getOwnPropertyNames(objectToInspect));
    objectToInspect = Object.getPrototypeOf(objectToInspect);
  }

  return result;
}
```

For more information, see Enumerability and ownership of properties.

### Deleting properties

You can remove a non-inherited property using the `delete` operator. The following code shows how to remove a property.

```js
// Creates a new object, myObj, with two properties, a and b.
const myObj = { a: 5, b: 12 };

// Removes the a property, leaving myObj with only the b property.
delete myObj.a;
console.log("a" in myObj); // false
```

## Inheritance

All objects in JavaScript inherit from at least one other object. The object being inherited from is known as the prototype, and the inherited properties can be found in the `prototype` object of the constructor. See Inheritance and the prototype chain for more information.

### Defining properties for all objects of one type

You can add a property to all objects created through a certain constructor using the `prototype` property. This defines a property that is shared by all objects of the specified type, rather than by just one instance of the object. The following code adds a `color` property to all objects of type `Car`, and then reads the property's value from an instance `car1`.

```js
Car.prototype.color = "red";
console.log(car1.color); // "red"
```
