---
title: "Subscriber"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/subscriber/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Subscriber

The **`Subscriber`** interface of the Observable API represents a subscription to a stream of observable values, and contains methods to manage the lifecycle of that subscription.

## Instance properties

- `active` (experimental)
    A boolean value that indicates whether the subscription is active or not.
- `signal` (experimental)
    An internally created `AbortSignal` that is aborted when the subscription completes, errors, or all observers unsubscribe.

## Instance methods

- `addTeardown()` (experimental)
    Registers a callback to clean up resources when the subscription completes, errors, or all observers unsubscribe.
- `complete()` (experimental)
    Closes the subscription and notifies observers that the stream has completed successfully.
- `error()` (experimental)
    Closes the subscription and notifies observers of an error.
- `next()` (experimental)
    Sends a value to the observers of the subscription.

## Description

A `Subscriber` object is passed to the callback supplied to the `Observable()` constructor when the first observer subscribes. Additional observers share this `Subscriber` while it is active. After the subscription completes, errors, or all observers unsubscribe, the next subscription invokes the callback with a new `Subscriber`. You cannot construct a `Subscriber` directly.

> **Note:**
> This shared-subscription behavior may change. A proposal to give each observer its own `Subscriber` would make each subscription start a separate execution instead of reusing an active subscription.

The producer calls `Subscriber.next()`, `Subscriber.error()`, and `Subscriber.complete()` to send values and notifications to observers. The observers define how to handle these notifications through the corresponding callbacks passed to `Observable.subscribe()`. The producer can also register cleanup callbacks with `Subscriber.addTeardown()`.

## Examples

For additional examples, see Creating custom observables.

### Basic `Observable()` example

In this example, we print the numbers 1 to 10 to the page. When the producer completes the subscription, the teardown callback clears the interval, and then the observer's `complete` callback displays a completion message.

#### HTML

The markup includes a single `` element to display the count, and a `` to start the count.

```html
<button>Start count</button>
<p></p>
```

#### JavaScript

In the JavaScript, we first grab a reference to the `` and `` elements, then register an event listener on the `` so that the count will start when it is clicked:

```js
const outputElem = document.querySelector("p");
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  btn.disabled = true;
  const observable = new Observable((subscriber) => {
    let i = 1;
    const interval = setInterval(() => {
      if (i === 11) {
        subscriber.complete();
      } else {
        subscriber.next(i);
      }
      i++;
    }, 500);
    subscriber.addTeardown(() => {
      if (btn.textContent === "Start count") {
        btn.textContent = "Restart count";
      }
      clearInterval(interval);
      btn.disabled = false;
    });
  });

  observable.subscribe({
    next(value) {
      outputElem.textContent = value;
    },
    complete() {
      outputElem.textContent = "Count complete";
    },
  });
});
```

Inside the `click` event handler function:

- We disable the button so that another click cannot start an overlapping count. We then use the `Observable()` constructor to create a new observable. Inside its callback function, we declare a variable `i` with a value of `1`. We then use a `Window.setInterval()` call to check the value of `i` every 500 milliseconds. If the value has reached `11`, we call the `complete()` method to complete the subscription. If not, we call `next()` to send the current count to the observer.
- At the end of the interval, `i` is incremented by 1.
- We also register a teardown callback using `addTeardown()`. Inside it, we change the text on the `` to "Restart count" if it doesn't already say that — this is more suitable if the count has already been run. And more importantly, we clear the interval (via `Window.clearInterval()`) when the subscription ends and re-enable the button for the next count.
- Finally, we subscribe to the observable by calling `Observable.subscribe()`. Inside the `subscribe()` method's argument, we define the observer callbacks invoked by the `Subscriber` methods in the previous block — the `next()` callback prints the value passed to it to the `` element (`i`, in the code above that calls it), and the `complete()` callback prints "Count complete" to the `` element.

#### Result

The example renders like so:

Press the button. Every 500 milliseconds, the current count is printed to the page. After displaying `10`, the next interval callback completes the subscription and displays "Count complete".

The teardown callback changes the button text to "Restart count" and re-enables it before the observer's `complete()` callback runs.

## See also

- Creating custom observables
- Observable explainer
