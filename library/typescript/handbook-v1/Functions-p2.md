---
title: "Functions (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/handbook-v1/Functions.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Functions (part 2 of 2)

## `this`

Learning how to use `this` in JavaScript is something of a rite of passage.
Since TypeScript is a superset of JavaScript, TypeScript developers also need to learn how to use `this` and how to spot when it's not being used correctly.
Fortunately, TypeScript lets you catch incorrect uses of `this` with a couple of techniques.
If you need to learn how `this` works in JavaScript, though, first read Yehuda Katz's Understanding JavaScript Function Invocation and "this".
Yehuda's article explains the inner workings of `this` very well, so we'll just cover the basics here.

### `this` and arrow functions

In JavaScript, `this` is a variable that's set when a function is called.
This makes it a very powerful and flexible feature, but it comes at the cost of always having to know about the context that a function is executing in.
This is notoriously confusing, especially when returning a function or passing a function as an argument.

Let's look at an example:

```ts
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    return function () {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

Notice that `createCardPicker` is a function that itself returns a function.
If we tried to run the example, we would get an error instead of the expected alert box.
This is because the `this` being used in the function created by `createCardPicker` will be set to `window` instead of our `deck` object.
That's because we call `cardPicker()` on its own.
A top-level non-method syntax call like this will use `window` for `this`.
(Note: under strict mode, `this` will be `undefined` rather than `window`).

We can fix this by making sure the function is bound to the correct `this` before we return the function to be used later.
This way, regardless of how it's later used, it will still be able to see the original `deck` object.
To do this, we change the function expression to use the ECMAScript 6 arrow syntax.
Arrow functions capture the `this` where the function is created rather than where it is invoked:

```ts
let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function () {
    // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

Even better, TypeScript will warn you when you make this mistake if you pass the `noImplicitThis` flag to the compiler.
It will point out that `this` in `this.suits[pickedSuit]` is of type `any`.

### `this` parameters

Unfortunately, the type of `this.suits[pickedSuit]` is still `any`.
That's because `this` comes from the function expression inside the object literal.
To fix this, you can provide an explicit `this` parameter.
`this` parameters are fake parameters that come first in the parameter list of a function:

```ts
function f(this: void) {
  // make sure `this` is unusable in this standalone function
}
```

Let's add a couple of interfaces to our example above, `Card` and `Deck`, to make the types clearer and easier to reuse:

```ts
interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // NOTE: The function now explicitly specifies that its callee must be of type Deck
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

Now TypeScript knows that `createCardPicker` expects to be called on a `Deck` object.
That means that `this` is of type `Deck` now, not `any`, so `noImplicitThis` will not cause any errors.

#### `this` parameters in callbacks

You can also run into errors with `this` in callbacks, when you pass functions to a library that will later call them.
Because the library that calls your callback will call it like a normal function, `this` will be `undefined`.
With some work you can use `this` parameters to prevent errors with callbacks too.
First, the library author needs to annotate the callback type with `this`:

```ts
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
```

`this: void` means that `addClickListener` expects `onclick` to be a function that does not require a `this` type.
Second, annotate your calling code with `this`:

```ts
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
interface Event {
  message: string;
}
declare const uiElement: UIElement;
class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
    // oops, used `this` here. using this callback would crash at runtime
    this.info = e.message;
  }
}

let h = new Handler();
uiElement.addClickListener(h.onClickBad); // error!
```

With `this` annotated, you make it explicit that `onClickBad` must be called on an instance of `Handler`.
Then TypeScript will detect that `addClickListener` requires a function that has `this: void`.
To fix the error, change the type of `this`:

```ts
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
interface Event {
  message: string;
}
declare const uiElement: UIElement;
class Handler {
  info: string;
  onClickGood(this: void, e: Event) {
    // can't use `this` here because it's of type void!
    console.log("clicked!");
  }
}

let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```

Because `onClickGood` specifies its `this` type as `void`, it is legal to pass to `addClickListener`.
Of course, this also means that it can't use `this.info`.
If you want both then you'll have to use an arrow function:

```ts
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
interface Event {
  message: string;
}
declare const uiElement: UIElement;
class Handler {
  info: string;
  onClickGood = (e: Event) => {
    this.info = e.message;
  };
}
```

This works because arrow functions use the outer `this`, so you can always pass them to something that expects `this: void`.
The downside is that one arrow function is created per object of type Handler.
Methods, on the other hand, are only created once and attached to Handler's prototype.
They are shared between all objects of type Handler.

## Overloads

JavaScript is inherently a very dynamic language.
It's not uncommon for a single JavaScript function to return different types of objects based on the shape of the arguments passed in.

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];

let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

Here, the `pickCard` function will return two different things based on what the user has passed in.
If the users passes in an object that represents the deck, the function will pick the card.
If the user picks the card, we tell them which card they've picked.
But how do we describe this to the type system?

The answer is to supply multiple function types for the same function as a list of overloads.
This list is what the compiler will use to resolve function calls.
Let's create a list of overloads that describe what our `pickCard` accepts and what it returns.

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];

let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

With this change, the overloads now give us type checked calls to the `pickCard` function.

In order for the compiler to pick the correct type check, it follows a similar process to the underlying JavaScript.
It looks at the overload list and, proceeding with the first overload, attempts to call the function with the provided parameters.
If it finds a match, it picks this overload as the correct overload.
For this reason, it's customary to order overloads from most specific to least specific.

Note that the `function pickCard(x): any` piece is not part of the overload list, so it only has two overloads: one that takes an object and one that takes a number.
Calling `pickCard` with any other parameter types would cause an error.
