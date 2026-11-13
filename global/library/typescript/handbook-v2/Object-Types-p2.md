---
title: "Object Types (part 2 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/handbook-v2/Object Types.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# Object Types (part 2 of 3)

## Extending Types

It's pretty common to have types that might be more specific versions of other types.
For example, we might have a `BasicAddress` type that describes the fields necessary for sending letters and packages in the U.S.

```ts
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

In some situations that's enough, but addresses often have a unit number associated with them if the building at an address has multiple units.
We can then describe an `AddressWithUnit`.

```ts
interface AddressWithUnit {
  name?: string;
  unit: string;
//^^^^^^^^^^^^^
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

This does the job, but the downside here is that we had to repeat all the other fields from `BasicAddress` when our changes were purely additive.
Instead, we can extend the original `BasicAddress` type and just add the new fields that are unique to `AddressWithUnit`.

```ts
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

The `extends` keyword on an `interface` allows us to effectively copy members from other named types, and add whatever new members we want.
This can be useful for cutting down the amount of type declaration boilerplate we have to write, and for signaling intent that several different declarations of the same property might be related.
For example, `AddressWithUnit` didn't need to repeat the `street` property, and because `street` originates from `BasicAddress`, a reader will know that those two types are related in some way.

`interface`s can also extend from multiple types.

```ts
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

## Intersection Types

`interface`s allowed us to build up new types from other types by extending them.
TypeScript provides another construct called _intersection types_ that is mainly used to combine existing object types.

An intersection type is defined using the `&` operator.

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

Here, we've intersected `Colorful` and `Circle` to produce a new type that has all the members of `Colorful` _and_ `Circle`.

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });

// oops
draw({ color: "red", raidus: 42 });
```

## Interface Extension vs. Intersection

We just looked at two ways to combine types which are similar, but are actually subtly different.
With interfaces, we could use an `extends` clause to extend from other types, and we were able to do something similar with intersections and name the result with a type alias.
The principal difference between the two is how conflicts are handled, and that difference is typically one of the main reasons why you'd pick one over the other between an interface and a type alias of an intersection type.

If interfaces are defined with the same name, TypeScript will attempt to merge them if the properties are compatible. If the properties are not compatible (i.e., they have the same property name but different types), TypeScript will raise an error.

In the case of intersection types, properties with different types will be merged automatically. When the type is used later, TypeScript will expect the property to satisfy both types simultaneously, which may produce unexpected results.

For example, the following code will throw an error because the properties are incompatible:

```ts
interface Person {
  name: string;
}

interface Person {
  name: number;
}
```

In contrast, the following code will compile, but it results in a `never` type:

```ts
interface Person1 {
  name: string;
}

interface Person2 {
  name: number;
}

type Staff = Person1 & Person2

declare const staffer: Staff;
staffer.name;
```
In this case, Staff would require the name property to be both a string and a number, which results in property being of type `never`.
