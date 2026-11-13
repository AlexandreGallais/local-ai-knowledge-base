---
title: "Using the Web Animations API (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_animations_api/using_the_web_animations_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Web Animations API (part 3 of 3)

## Getting information out of animations

Imagine other ways we could use playbackRate, such as improving accessibility for users with vestibular disorders by letting them slow down animations across an entire site. That's impossible to do with CSS without recalculating durations in every CSS rule, but with the Web Animations API, we could use the `Document.getAnimations` method to loop over each animation on the page and halve their `playbackRate`s, like so:

```js
document.getAnimations().forEach((animation) => {
  animation.updatePlaybackRate(animation.playbackRate * 0.5);
});
```

With the Web Animations API, all you need to change is just one little property!

Another thing that's tough to do with CSS Animations alone is creating dependencies on values provided by other animations. For instance, in the Growing and Shrinking Alice game example, you might have noticed something odd about the cake's duration:

```js
document.getElementById("eat-me-sprite").animate([], {
  duration: aliceChange.effect.getComputedTiming().duration / 2,
});
```

To understand what's happening here, let's take a look at Alice's animation:

```js
const aliceChange = document
  .getElementById("alice")
  .animate(
    [
      { transform: "translate(-50%, -50%) scale(.5)" },
      { transform: "translate(-50%, -50%) scale(2)" },
    ],
    {
      duration: 8000,
      easing: "ease-in-out",
      fill: "both",
    },
  );
```

Alice's animation has her going from half her size to twice her size over 8 seconds. Then we pause her:

```js
aliceChange.pause();
```

If we had left her paused at the beginning of her animation, she'd start at half her full size, as if she'd drunk the entire bottle already! We want to set her animation's "playhead" in the middle, so she's already halfway done. We could do that by setting her `Animation.currentTime` to 4 seconds, like so:

```js
aliceChange.currentTime = 4000;
```

But while working on this animation, we might change Alice's duration a lot. Wouldn't it be better if we set her `currentTime` dynamically, so we don't have to make two updates at a time? We can, in fact, do so by referencing aliceChange's `Animation.effect` property, which returns an object containing all the details of the effect(s) active on Alice:

```js
aliceChange.currentTime = aliceChange.effect.getComputedTiming().duration / 2;
```

`effect` lets us access the animation's keyframes and timing properties — `aliceChange.effect.getComputedTiming()` points to Alice's timing object — this contains her `duration`. We can divide her duration in half to get the midpoint for her animation's timeline, setting her to be normal height. Now we can reverse and play her animation in either direction to make her grow smaller or larger!

And we can do the same thing when setting the cake and bottle durations:

```js
const drinking = document
  .getElementById("liquid")
  .animate([{ height: "100%" }, { height: "0" }], {
    fill: "forwards",
    duration: aliceChange.effect.getComputedTiming().duration / 2,
  });
drinking.pause();
```

Now all three animations are linked to just one duration, which we can change easily from one place.

We can also use the Web Animations API to figure out the animation's current time. The game ends when you run out of cake to eat or empty the bottle. Which vignette players are presented with depends on how far along Alice was in her animation, whether she grew too big and can't get in the tiny door anymore or too small and cannot reach the key to open the door. We can figure out whether she's on the large end or small end of her animation by getting her animation's `currentTime` and dividing it by her `activeDuration`:

```js
const endGame = () => {
  // get Alice's timeline's playhead location
  const alicePlayhead = aliceChange.currentTime;
  const aliceTimeline = aliceChange.effect.getComputedTiming().activeDuration;

  // stops Alice's and other animations
  stopPlayingAlice();

  // depending on which third it falls into
  const aliceHeight = alicePlayhead / aliceTimeline;

  if (aliceHeight <= 0.333) {
    // Alice got smaller!
    // …
  } else if (aliceHeight >= 0.666) {
    // Alice got bigger!
    // …
  } else {
    // Alice didn't change significantly
    // …
  }
};
```

## Callbacks and promises

CSS Animations and Transitions have their own event listeners, and these are also possible with the Web Animations API:

- `onfinish` is the event handler for the `finish` event and can be triggered manually with `finish()`.
- `oncancel` is the event handler for the `cancel` event and can be triggers with `cancel()`.

Here we set the callbacks for the cake, bottle, and Alice to fire the `endGame` function:

```js
// When the cake or bottle runs out
nommingCake.onfinish = endGame;
drinking.onfinish = endGame;

// Alice reaches the end of her animation
aliceChange.onfinish = endGame;
```

Better still, the Web Animations API also provides a `finished` promise that will resolve when the animation finishes, or reject if it is canceled.

## Conclusion

These are the basic <example-value> of the Web Animations API. By now you should be ready to "jump down the rabbit hole" of animating in the browser and ready to write your own animation experiments!

## See also

- The full suite of Alice in Wonderland demos on CodePen for you to play with, fork, and share.
- Animating like you just don't care with Element.animate (2016) Explains the background of the Web Animations API and why it is more performant than other web animation methods.
