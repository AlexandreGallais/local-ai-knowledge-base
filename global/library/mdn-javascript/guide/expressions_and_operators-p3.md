---
title: "Expressions and operators (part 3 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/expressions_and_operators/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Expressions and operators (part 3 of 3)

## BigInt operators

Most operators that can be used between numbers can be used between `BigInt` values as well.

```js
// BigInt addition
const a = 1n + 2n; // 3n
// Division with BigInts round towards zero
const b = 1n / 2n; // 0n
// Bitwise operations with BigInts do not truncate either side
const c = 40000000000000000n >> 2n; // 10000000000000000n
```

One exception is unsigned right shift (`>>>`), which is not defined for BigInt values. This is because a BigInt does not have a fixed width, so technically it does not have a "highest bit".

```js
const d = 8n >>> 2n; // TypeError: BigInts have no unsigned right shift, use >> instead
```

BigInts and numbers are not mutually replaceable — you cannot mix them in calculations.

```js
const a = 1n + 2; // TypeError: Cannot mix BigInt and other types
```

This is because BigInt is neither a subset nor a superset of numbers. BigInts have higher precision than numbers when representing large integers, but cannot represent decimals, so implicit conversion on either side might lose precision. Use explicit conversion to signal whether you wish the operation to be a number operation or a BigInt one.

```js
const a = Number(1n) + 2; // 3
const b = 1n + BigInt(2); // 3n
```

You can compare BigInts with numbers.

```js
const a = 1n > 2; // false
const b = 3 > 2n; // true
```

## String operators

In addition to the comparison operators, which can be used on string values, the concatenation operator (+) concatenates two string values together, returning another string that is the union of the two operand strings.

For example,

```js
console.log("my " + "string"); // console logs the string "my string".
```

The shorthand assignment operator `+=` can also be used to concatenate strings.

For example,

```js
let myString = "alpha";
myString += "bet"; // evaluates to "alphabet" and assigns this value to myString.
```

## Conditional (ternary) operator

The conditional operator
is the only JavaScript operator that takes three operands.
The operator can have one of two values based on a condition.
The syntax is:

```js
condition ? val1 : val2
```

If `condition` is true, the operator has the value of `val1`.
Otherwise it has the value of `val2`. You can use the conditional operator anywhere you would use a standard operator.

For example,

```js
const status = age >= 18 ? "adult" : "minor";
```

This statement assigns the value "adult" to the variable `status` if
`age` is eighteen or more. Otherwise, it assigns the value "minor" to
`status`.

## Comma operator

The comma operator (`,`)
evaluates both of its operands and returns the value of the last operand.
This operator is primarily used inside a `for` loop, to allow multiple variables to be updated each time through the loop.
It is regarded bad style to use it elsewhere, when it is not necessary.
Often two separate statements can and should be used instead.

For example, if `a` is a 2-dimensional array with 10 elements on a side, the following code uses the comma operator to update two variables at once.
The code prints the values of the diagonal elements in the array:

```js
const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const a = [x, x, x, x, x];

for (let i = 0, j = 9; i <= j; i++, j--) {
  //                              ^
  console.log(`a[${i}][${j}]= ${a[i][j]}`);
}
```

## Unary operators

A unary operation is an operation with only one operand.

### delete

The `delete` operator deletes an object's property.
The syntax is:

```js
delete object.property;
delete object[propertyKey];
delete objectName[index];
```

where `object` is the name of an object, `property` is an existing property, and `propertyKey` is a string or symbol referring to an existing property.

If the `delete` operator succeeds, it removes the property from the object.
Trying to access it afterwards will yield `undefined`.
The `delete` operator returns `true` if the operation is possible; it returns `false` if the operation is not possible.

```js
delete Math.PI; // returns false (cannot delete non-configurable properties)

const myObj = { h: 4 };
delete myObj.h; // returns true (can delete user-defined properties)
```

#### Deleting array elements

Since arrays are just objects, it's technically possible to `delete` elements from them.
This is, however, regarded as a bad practice — try to avoid it.
When you delete an array property, the array length is not affected and other elements are not re-indexed.
To achieve that behavior, it is much better to just overwrite the element with the value `undefined`.
To actually manipulate the array, use the various array methods such as `splice`.

### typeof

The `typeof` operator returns a string indicating the type of the unevaluated operand.
`operand` is the string, variable, keyword, or object for which the type is to be returned.
The parentheses are optional.

Suppose you define the following variables:

```js
const myFun = () => 5 + 2;
const shape = "round";
const size = 1;
const foo = ["Apple", "Mango", "Orange"];
const today = new Date();
```

The `typeof` operator returns the following results for these variables:

```js
typeof myFun; // returns "function"
typeof shape; // returns "string"
typeof size; // returns "number"
typeof foo; // returns "object"
typeof today; // returns "object"
typeof doesntExist; // returns "undefined"
```

For the keywords `true` and `null`, the `typeof`
operator returns the following results:

```js
typeof true; // returns "boolean"
typeof null; // returns "object"
```

For a number or string, the `typeof` operator returns the following results:

```js
typeof 62; // returns "number"
typeof "Hello world"; // returns "string"
```

For property values, the `typeof` operator returns the type of value the
property contains:

```js
typeof document.lastModified; // returns "string"
typeof window.length; // returns "number"
typeof Math.LN2; // returns "number"
```

For methods and functions, the `typeof` operator returns results as follows:

```js
typeof blur; // returns "function"
typeof parseInt; // returns "function"
typeof shape.split; // returns "function"
```

For predefined objects, the `typeof` operator returns results as follows:

```js
typeof Date; // returns "function"
typeof Function; // returns "function"
typeof Math; // returns "object"
typeof Option; // returns "function"
typeof String; // returns "function"
```

### void

The `void` operator specifies an expression to be evaluated without returning a value. `expression` is a JavaScript expression to evaluate.
The parentheses surrounding the expression are optional, but it is good style to use them to avoid precedence issues.

## Relational operators

A relational operator compares its operands and returns a Boolean value based on whether the comparison is true.

### in

The `in` operator returns `true` if the specified property is in the specified object.
The syntax is:

```js
propNameOrNumber in objectName
```

where `propNameOrNumber` is a string, numeric, or symbol expression representing a property name or array index, and `objectName` is the name of an object.

The following examples show some uses of the `in` operator.

```js
// Arrays
const trees = ["redwood", "bay", "cedar", "oak", "maple"];
0 in trees; // returns true
3 in trees; // returns true
6 in trees; // returns false
"bay" in trees; // returns false
// (you must specify the index number, not the value at that index)
"length" in trees; // returns true (length is an Array property)

// built-in objects
"PI" in Math; // returns true
const myString = new String("coral");
"length" in myString; // returns true

// Custom objects
const myCar = { make: "Honda", model: "Accord", year: 1998 };
"make" in myCar; // returns true
"model" in myCar; // returns true
```

### instanceof

The `instanceof` operator returns `true`
if the specified object is of the specified object type. The syntax is:

```js
object instanceof objectType
```

where `object` is the object to test against `objectType`, and `objectType` is a constructor representing a type, such as `Map` or `Array`.

Use `instanceof` when you need to confirm the type of an object at runtime.
For example, when catching exceptions, you can branch to different exception-handling code depending on the type of exception thrown.

For example, the following code uses `instanceof` to determine whether `obj` is a `Map` object. Because `obj` is a `Map` object, the statements inside the `if` block execute.

```js
const obj = new Map();
if (obj instanceof Map) {
  // statements to execute
}
```

## Basic <example-value>

All operators eventually operate on one or more basic expressions. These basic <example-value> include identifiers and literals, but there are a few other kinds as well. They are briefly introduced below, and their semantics are described in detail in their respective reference sections.

### this

The `this` keyword is usually used within a function. In general, when the function is attached to an object as a method, `this` refers to the object that the method is called on. It functions like a hidden parameter that is passed to the function. `this` is an expression that evaluates to the object, so you can use all the object operations we introduced.

```js
this["propertyName"];
this.propertyName;
doSomething(this);
```

For example, suppose a function is defined as follows:

```js
function getFullName() {
  return `${this.firstName} ${this.lastName}`;
}
```

We can now attach this function to an object, and it will use the properties of that object when called:

```js
const person1 = {
  firstName: "Chris",
  lastName: "Martin",
};

const person2 = {
  firstName: "Chester",
  lastName: "Bennington",
};

// Attach the same function
person1.getFullName = getFullName;
person2.getFullName = getFullName;

console.log(person1.getFullName()); // "Chris Martin"
console.log(person2.getFullName()); // "Chester Bennington"
```

### Grouping operator

The grouping operator `( )` controls the precedence of evaluation in
expressions. For example, you can override multiplication and division first, then
addition and subtraction to evaluate addition first.

```js
const a = 1;
const b = 2;
const c = 3;

// default precedence
a + b * c; // 7
// evaluated by default like this
a + (b * c); // 7

// now overriding precedence
// addition before multiplication
(a + b) * c; // 9

// which is equivalent to
a * c + b * c; // 9
```

### Property accessor

The property accessor syntax gets property values on objects, using either dot notation or bracket notation.

```js
object.property;
object["property"];
```

The working with objects guide goes into more details about object properties.

### Optional chaining

The optional chaining syntax (`?.`) performs the chained operation on an object if it is defined and non-`null`, and otherwise short-circuits the operation and returns `undefined`.
This allows you to operate on a value that may be `null` or `undefined` without causing a `TypeError`.

```js
maybeObject?.property;
maybeObject?.[property];
maybeFunction?.();
```

### new

You can use the `new` operator to create an instance of a user-defined object type or of one of the built-in object types. Use `new` as follows:

```js
const objectName = new ObjectType(param1, param2, /* …, */ paramN);
```

### super

The `super` keyword is used to call functions on an object's parent.
It is useful with classes to call the parent constructor, for example.

```js
super(args); // calls the parent constructor.
super.functionOnParent(args);
```
