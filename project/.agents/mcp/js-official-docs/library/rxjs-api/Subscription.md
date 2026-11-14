# src/internal/Subscription

## Subscription

```ts
export class Subscription implements SubscriptionLike
```

Represents a disposable resource, such as the execution of an Observable. A
Subscription has one important method, `unsubscribe`, that takes no argument
and just disposes the resource held by the subscription.

Additionally, subscriptions may be grouped together through the `add()`
method, which will attach a child Subscription to the current Subscription.
When a Subscription is unsubscribed, all its children (and its grandchildren)
will be unsubscribed as well.

## Subscription.closed

```ts
public closed = false
```

A flag to indicate whether this Subscription has already been unsubscribed.

## Subscription.constructor

```ts
constructor(private initialTeardown?: ()
```

@param initialTeardown A function executed first as part of the finalization
process that is kicked off when {@link #unsubscribe} is called.

## Subscription.unsubscribe

```ts
unsubscribe(): void
```

Disposes the resources held by the subscription. May, for instance, cancel
an ongoing Observable execution or cancel any other type of work that
started when the Subscription was created.

## Subscription.add

```ts
add(teardown: TeardownLogic): void
```

Adds a finalizer to this subscription, so that finalization will be unsubscribed/called
when this subscription is unsubscribed. If this subscription is already {@link #closed},
because it has already been unsubscribed, then whatever finalizer is passed to it
will automatically be executed (unless the finalizer itself is also a closed subscription).

Closed Subscriptions cannot be added as finalizers to any subscription. Adding a closed
subscription to a any subscription will result in no operation. (A noop).

Adding a subscription to itself, or adding `null` or `undefined` will not perform any
operation at all. (A noop).

`Subscription` instances that are added to this instance will automatically remove themselves
if they are unsubscribed. Functions and {@link Unsubscribable} objects that you wish to remove
will need to be removed manually with {@link #remove}

@param teardown The finalization logic to add to this subscription.

## Subscription.remove

```ts
remove(teardown: Exclude<TeardownLogic, void>): void
```

Removes a finalizer from this subscription that was previously added with the {@link #add} method.

Note that `Subscription` instances, when unsubscribed, will automatically remove themselves
from every other `Subscription` they have been added to. This means that using the `remove` method
is not a common thing and should be used thoughtfully.

If you add the same finalizer instance of a function or an unsubscribable object to a `Subscription` instance
more than once, you will need to call `remove` the same number of times to remove all instances.

All finalizer instances are removed to free up memory upon unsubscription.

@param teardown The finalizer to remove from this subscription