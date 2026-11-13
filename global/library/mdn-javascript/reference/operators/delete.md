---
title: "delete"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# delete

The **`delete`** operator removes a property from an object. If the property's value is an object and there are no more references to the object, the object held by that property is eventually released automatically.

```js
const employee = {
  firstName: "Maria",
  lastName: "Sanchez",
};

console.log(employee.firstName);
// Expected output: "Maria"

delete employee.firstName;

console.log(employee.firstName);
// Expected output: undefined
```

## Syntax

```js
delete object.property
delete object[property]
```

> **Note:**
> The syntax allows a wider range of expressions following the `delete` operator, but only the above forms lead to meaningful behaviors.

### Parameters

- `object`
    The name of an object, or an expression evaluating to an object.
- `property`
    The property to delete.

### Return value

`true` for all cases except when the property is an own non-configurable property, in which case `false` is returned in non-strict mode.

### Exceptions

- `TypeError`
    Thrown in strict mode if the property is an own non-configurable property.
- `ReferenceError`
    Thrown if `object` is `super`.

## Description

The `delete` operator has the same precedence as other unary operators like `typeof`. Therefore, it accepts any expression formed by higher-precedence operators. However, the following forms lead to early syntax errors in strict mode:

```js
delete identifier;
delete object.#privateProperty;
```

Because classes are automatically in strict mode, and private elements can only be legally referenced in class bodies, this means private elements can never be deleted. While `delete identifier` may work if `identifier` refers to a configurable property of the global object, you should avoid this form and prefix it with `globalThis` instead.

While other expressions are accepted, they don't lead to meaningful behaviors:

```js
delete console.log(1);
// Logs 1, returns true, but nothing deleted
```

The `delete` operator removes a given property from an object. On successful deletion, it will return `true`, else `false` will be returned. Unlike what common belief suggests (perhaps due to other programming languages like delete in C++), the `delete` operator has **nothing** to do with directly freeing memory. Memory management is done indirectly via breaking references. See the memory management page for more details.

It is important to consider the following scenarios:

- If the property which you are trying to delete does not exist, `delete` will not have any effect and will return `true`.
- `delete` only has an effect on own properties. If a property with the same name exists on the object's prototype chain, then after deletion, the object will use the property from the prototype chain.
- Non-configurable properties cannot be removed. This includes properties of built-in objects like `Math`, `Array`, `Object` and properties that are created as non-configurable with methods like `Object.defineProperty()`.
- Deleting variables, including function parameters, never works. `delete variable` will throw a `SyntaxError` in strict mode, and will have no effect in non-strict mode.
  - Any variable declared with `var` cannot be deleted from the global scope or from a function's scope, because while they may be attached to the global object, they are not configurable.
  - Any variable declared with `let` or `const` cannot be deleted from the scope within which they were defined, because they are not attached to an object.

## Examples

### Using delete

> **Note:**
> The following example uses non-strict-mode only features, like implicitly creating global variables and deleting identifiers, which are forbidden in strict mode.

```js
// Creates the property empCount on the global scope.
// Since we are using var, this is marked as non-configurable.
var empCount = 43;

// Creates the property EmployeeDetails on the global scope.
// Since it was defined without "var", it is marked configurable.
EmployeeDetails = {
  name: "xyz",
  age: 5,
  designation: "Developer",
};

// delete can be used to remove properties from objects.
delete EmployeeDetails.name; // returns true

// Even when the property does not exist, delete returns "true".
delete EmployeeDetails.salary; // returns true

// EmployeeDetails is a property of the global scope.
delete EmployeeDetails; // returns true

// On the contrary, empCount is not configurable
// since var was used.
delete empCount; // returns false

// delete also does not affect built-in static properties
// that are non-configurable.
delete Math.PI; // returns false

function f() {
  var z = 44;

  // delete doesn't affect local variable names
  delete z; // returns false
}
```

### delete and the prototype chain

In the following example, we delete an own property of an object while a property with the same name is available on the prototype chain:

```js
function Foo() {
  this.bar = 10;
}

Foo.prototype.bar = 42;

const foo = new Foo();

// foo.bar is associated with the
// own property.
console.log(foo.bar); // 10

// Delete the own property within the
// foo object.
delete foo.bar; // returns true

// foo.bar is still available in the
// prototype chain.
console.log(foo.bar); // 42

// Delete the property on the prototype.
delete Foo.prototype.bar; // returns true

// The "bar" property can no longer be
// inherited from Foo since it has been
// deleted.
console.log(foo.bar); // undefined
```

### Deleting array elements

When you delete an array element, the array `length` is not affected. This holds even if you delete the last element of the array.

When the `delete` operator removes an array element, that element is no longer in the array. In the following example, `trees[3]` is removed with `delete`.

```js
const trees = ["redwood", "bay", "cedar", "oak", "maple"];
delete trees[3];
console.log(3 in trees); // false
```

This creates a sparse array with an empty slot. If you want an array element to exist but have an undefined value, use the `undefined` value instead of the `delete` operator. In the following example, `trees[3]` is assigned the value `undefined`, but the array element still exists:

```js
const trees = ["redwood", "bay", "cedar", "oak", "maple"];
trees[3] = undefined;
console.log(3 in trees); // true
```

If instead, you want to remove an array element by changing the contents of the array, use the `splice()` method. In the following example, `trees[3]` is removed from the array completely using `splice()`:

```js
const trees = ["redwood", "bay", "cedar", "oak", "maple"];
trees.splice(3, 1);
console.log(trees); // ["redwood", "bay", "cedar", "maple"]
```

### Deleting non-configurable properties

When a property is marked as non-configurable, `delete` won't have any effect, and will return `false`. In strict mode, this will raise a `TypeError`.

```js
const Employee = {};
Object.defineProperty(Employee, "name", { configurable: false });

console.log(delete Employee.name); // returns false
```

`var` creates non-configurable properties that cannot be deleted with the `delete` operator:

```js
// Since "nameOther" is added using with the
// var keyword, it is marked as non-configurable
var nameOther = "XYZ";

// We can access this global property using:
Object.getOwnPropertyDescriptor(globalThis, "nameOther");
// {
//   value: "XYZ",
//   writable: true,
//   enumerable: true,
//   configurable: false
// }

delete globalThis.nameOther; // return false
```

In strict mode, this would raise an exception.

### Deleting global properties

If a global property is configurable (for example, via direct property assignment), it can be deleted, and subsequent references to them as global variables will produce a `ReferenceError`.

```js
globalThis.globalVar = 1;
console.log(globalVar); // 1
// In non-strict mode, you can use `delete globalVar` as well
delete globalThis.globalVar;
console.log(globalVar); // ReferenceError: globalVar is not defined
```

## See also

- `Reflect.deleteProperty()`
- `Map.prototype.delete()`
