---
title: "Using the Web Animations API (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_animations_api/using_the_web_animations_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Web Animations API (part 2 of 3)

## Controlling playback with play(), pause(), reverse(), and updatePlaybackRate()

While we can write CSS Animations with the Web Animations API, where the API really comes in handy is manipulating the animation's playback. The Web Animations API provides several useful methods for controlling playback. Let's take a look at pausing and playing animations in the Follow the White Rabbit example:

In this example, the white rabbit has an animation that causes it to go down a rabbit hole. It's only triggered when the user clicks on it.

```html
<div class="wrapper">
  <div class="page">
    <div class="background"></div>
    <div id="rabbit">Click the rabbit's ears!</div>
    <div class="foreground"></div>
    <p>
      She was just in time to see him pop down a hole between a great tree's
      roots.
    </p>
  </div>
</div>
```

```css
#rabbit {
  background: url("/shared-assets/images/examples/web-animations/park5_rabbit.png")
    0 0 / 100% 100%;
  cursor: pointer;
  position: absolute;
  top: 15%;
  left: 60%;
  width: 14.64844%;
  padding-top: 31.00586%;
}

body {
  background: black;
}
.wrapper {
  max-width: 133.33vh;
  margin: 0 auto;
}
.page {
  background: #431236;
  height: 0;
  overflow: hidden;
  padding-top: 75%;
  position: relative;
  text-indent: 100%;
  white-space: nowrap;
}

.foreground {
  height: 100%;
  background: url("/shared-assets/images/examples/web-animations/bg_park5_2.png")
    no-repeat 100% 100% / 100% auto;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.background {
  background: url("/shared-assets/images/examples/web-animations/bg_park5_1.png")
    no-repeat 0 0 / 100% auto;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
```

### Pausing and playing animations

We can animate the rabbit using the `animate()` method as usual:

```js
const whiteRabbit = document.getElementById("rabbit");

const rabbitDownAnimation = whiteRabbit.animate(
  [{ transform: "translateY(0%)" }, { transform: "translateY(100%)" }],
  { duration: 3000, fill: "forwards" },
);
```

The `Element.animate()` method will immediately run after it is called. To prevent the cake from eating itself up before the user has had the chance to click on it, we call `Animation.pause()` on it immediately after it is defined, like so:

```js
rabbitDownAnimation.pause();
```

> **Note:**
> Alternatively, you can define `rabbitDownAnimation` using the `Animation()` constructor instead, which doesn't start playing until you call `play()`.

We can now use the `Animation.play()` method to run it whenever we're ready. Specifically, we want to link it to a clicking action. We can achieve this via the following:

```js
whiteRabbit.addEventListener("click", downHeGoes);
whiteRabbit.addEventListener("touchstart", downHeGoes);

function downHeGoes(event) {
  whiteRabbit.removeEventListener("click", downHeGoes);
  whiteRabbit.removeEventListener("touchstart", downHeGoes);

  rabbitDownAnimation.play();
}
```

When a user clicks or presses their finger on the rabbit, we can now call `downHeGoes` to make all the animations play.

### Other useful methods

In addition to pausing and playing, we can use the following Animation methods:

- `Animation.finish()` skips to the end of the animation.
- `Animation.cancel()` aborts the animation and removes its effects.
- `Animation.reverse()` sets the animation's playback rate (`Animation.playbackRate`) to a negative value so it runs backward.

Let's take a look at `playbackRate` first — a negative `playbackRate` will cause an animation to run in reverse.
In Through the Looking-Glass, Alice travels to a world where she must run to stay in place — and run twice as fast to move forward! In the Red Queen's Race example, Alice and the Red Queen are running to stay in place:

```html
<div class="wrapper">
  <div class="sky"></div>
  <div class="earth">
    <div id="red-queen-and-alice">
      <img
        id="red-queen-and-alice-sprite"
        src="/shared-assets/images/examples/web-animations/sprite_running-alice-queen_small.png"
        srcset="
          /shared-assets/images/examples/web-animations/sprite_running-alice-queen.png 2x
        "
        alt="Alice and the Red Queen running to stay in place." />
    </div>
  </div>
  <div class="scenery" id="foreground1">
    <img
      id="palm3"
      src="/shared-assets/images/examples/web-animations/palm3_small.png"
      srcset="/shared-assets/images/examples/web-animations/palm3.png 2x"
      alt="" />
  </div>
  <div class="scenery" id="foreground2">
    <img
      id="bush"
      src="/shared-assets/images/examples/web-animations/bush_small.png"
      srcset="/shared-assets/images/examples/web-animations/bush.png 2x"
      alt="" />
    <img
      id="w_rook_upright"
      src="/shared-assets/images/examples/web-animations/w_rook_upright_small.png"
      srcset="
        /shared-assets/images/examples/web-animations/w_rook_upright.png 2x
      "
      alt="" />
  </div>
  <div class="scenery" id="background1">
    <img
      id="r_pawn_upright"
      src="/shared-assets/images/examples/web-animations/r_pawn_upright_small.png"
      srcset="
        /shared-assets/images/examples/web-animations/r_pawn_upright.png 2x
      "
      alt="" />
    <img
      id="w_rook"
      src="/shared-assets/images/examples/web-animations/w_rook_small.png"
      srcset="/shared-assets/images/examples/web-animations/w_rook.png 2x"
      alt="" />
    <img
      id="palm1"
      src="/shared-assets/images/examples/web-animations/palm1_small.png"
      srcset="/shared-assets/images/examples/web-animations/palm1.png 2x"
      alt="" />
  </div>
  <div class="scenery" id="background2">
    <img
      id="r_pawn"
      src="/shared-assets/images/examples/web-animations/r_pawn_small.png"
      srcset="/shared-assets/images/examples/web-animations/r_pawn.png 2x"
      alt="" />

    <img
      id="r_knight"
      src="/shared-assets/images/examples/web-animations/r_knight_small.png"
      srcset="/shared-assets/images/examples/web-animations/r_knight.png 2x"
      alt="" />
    <img
      id="palm2"
      src="/shared-assets/images/examples/web-animations/palm2_small.png"
      srcset="/shared-assets/images/examples/web-animations/palm2.png 2x"
      alt="" />
  </div>
</div>
```

```css
* {
  user-select: none;
}

img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.scenery {
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  left: 0;
}

#foreground1,
#foreground2 {
  z-index: 1;
}

#foreground2,
#background2 {
  transform: translateX(100%);
}

#palm3 {
  top: 0;
  left: 10%;
}

#w_rook_upright {
  top: 30%;
  left: 75%;
}

#r_pawn {
  top: 10%;
  left: 15%;
}

#w_rook {
  top: 10%;
  left: 80%;
}

#r_pawn_upright {
  top: 5%;
  left: 30%;
}

#r_knight {
  top: 0;
  left: 70%;
}

#palm2 {
  top: -15%;
  left: 90%;
}

#palm1 {
  top: -15%;
  left: 40%;
}

#bush {
  top: 55%;
  left: 20%;
}

#red-queen-and-alice {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  width: 80%;
  max-width: 450px;
  z-index: 1;
}

#red-queen-and-alice::before {
  content: " ";
  display: block;
  padding-top: 87%;
}

#red-queen-and-alice img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.sky,
.earth {
  position: absolute;
  left: 0;
  height: 50vh;
  width: 100%;
}

.earth {
  background: #eb125d
    url("/shared-assets/images/examples/web-animations/bg_earth.jpg") repeat-x 0
    0 / 100% auto;
  bottom: 0;
}

.sky {
  background: #246e89
    url("/shared-assets/images/examples/web-animations/bg_sky.jpg") repeat-x
    100% 100% / auto 100%;
  top: 0;
}

html,
body {
  width: 100%;
  height: 100%;
}

.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
```

```js
const background1 = document.getElementById("background1");
const background2 = document.getElementById("background2");

const foreground1 = document.getElementById("foreground1");
const foreground2 = document.getElementById("foreground2");

const redQueenAliceSprite = document.getElementById(
  "red-queen-and-alice-sprite",
);

/* Background animations */
const sceneryFrames = [
  { transform: "translateX(100%)" },
  { transform: "translateX(-100%)" },
];

const sceneryTimingBackground = {
  duration: 36000,
  iterations: Infinity,
};

const sceneryTimingForeground = {
  duration: 12000,
  iterations: Infinity,
};

const background1Movement = background1.animate(
  sceneryFrames,
  sceneryTimingBackground,
);
background1Movement.currentTime =
  background1Movement.effect.getComputedTiming().duration / 2;

const background2Movement = background2.animate(
  sceneryFrames,
  sceneryTimingBackground,
);

const foreground1Movement = foreground1.animate(
  sceneryFrames,
  sceneryTimingForeground,
);
foreground1Movement.currentTime =
  foreground1Movement.effect.getComputedTiming().duration / 2;

const foreground2Movement = foreground2.animate(
  sceneryFrames,
  sceneryTimingForeground,
);

const spriteFrames = [
  { transform: "translateY(0)" },
  { transform: "translateY(-100%)" },
];

const redQueenAlice = redQueenAliceSprite.animate(spriteFrames, {
  easing: "steps(7, end)",
  direction: "reverse",
  duration: 600,
  playbackRate: 1,
  iterations: Infinity,
});
```

Because small children tire out easily, unlike automaton chess pieces, Alice is constantly slowing down. We can do this by setting a decay on her animation's `playbackRate`. We use `updatePlaybackRate()` instead of setting the `playbackRate` directly since that produces a smooth update:

```js
setInterval(() => {
  // Make sure the playback rate never falls below .4
  if (redQueenAlice.playbackRate > 0.4) {
    redQueenAlice.updatePlaybackRate(redQueenAlice.playbackRate * 0.9);
  }
  adjustBackgroundPlayback();
}, 1000);
```

But urging them on by clicking or tapping causes them to speed up by multiplying their `playbackRate`:

```js
function goFaster() {
  // But you can speed them up by giving the screen a click or a tap.
  redQueenAlice.updatePlaybackRate(redQueenAlice.playbackRate * 1.1);
  adjustBackgroundPlayback();
}

document.addEventListener("click", goFaster);
document.addEventListener("touchstart", goFaster);
```

The background elements also have `playbackRate`s that are impacted when you click or tap. Their playback rates are derived from Alice's, shown below. What happens when you make Alice and the Red Queen run twice as fast? What happens when you let them slow down?

```js
/* Alice tires so easily! 
  Every so many seconds, reduce their playback rate so they slow a little. 
*/
const sceneries = [
  foreground1Movement,
  foreground2Movement,
  background1Movement,
  background2Movement,
];

function adjustBackgroundPlayback() {
  // If Alice and the Red Queen are running at a speed of 0.8–1.2,
  // the background doesn't move.
  // But if they fall under 0.8, the background slides backwards
  if (redQueenAlice.playbackRate < 0.8) {
    sceneries.forEach((anim) => {
      anim.updatePlaybackRate(-redQueenAlice.playbackRate / 2);
    });
  } else if (redQueenAlice.playbackRate > 1.2) {
    sceneries.forEach((anim) => {
      anim.updatePlaybackRate(redQueenAlice.playbackRate / 2);
    });
  } else {
    sceneries.forEach((anim) => {
      anim.updatePlaybackRate(0);
    });
  }
}
adjustBackgroundPlayback();
```

## Persisting animation styles

When animating elements, a common use case is to persist the final state of the animation, after the animation has finished. One method sometimes used for this is to set the animation's fill mode to `forwards`. However, it is not recommended to use fill modes to persist the effect of an animation indefinitely, for two reasons:

- The browser has to maintain the state of the animation while it is still active, so the animation continues to consume resources even though it is no longer animating. Note that this is somewhat alleviated by the browser automatically removing filling animations.
- Styles applied by animations have a higher precedence in the cascade than specified styles, so it can be difficult to override them when needed.

A better approach is to use the `Animation.commitStyles()` method. This writes the computed values of the animation's current styles into its target element's `style` attribute, after which the element can be restyled normally.

## Automatically removing filling animations

It is possible to trigger a large number of animations on the same element. If they are indefinite (i.e., forwards-filling), this can result in a huge animations list, which could create a memory leak. For this reason, browsers automatically remove filling animations after they are replaced by newer animations, unless the developer explicitly specifies to keep them.

Animations are removed when all of the following are true:

- The animation is filling (its `fill` is `forwards` if it is playing forwards, `backwards` if it is playing backwards, or `both`).
- The animation is finished. (Note that because of the `fill` it will still be in effect.)
- The animation's timeline is monotonically increasing. (This is always true for `DocumentTimeline`; other timelines such as `scroll-timeline` can run backwards.)
- The animation is not being controlled by declarative markup such as CSS.
- Every styling effect of the animation's `AnimationEffect` is being overridden by another animation that also satisfies all the conditions above. (Typically, when two animations would set the same style property of the same element, the one created last overrides the other.)

The first four conditions ensure that, without intervention by JavaScript code, the animation's effect will never change or end. The last condition ensures that the animation will never actually affect the style of any element: it has been entirely replaced.

When the animation is automatically removed, the animation's `remove` event fires.

To prevent the browser from automatically removing animations, call the animation's `persist()` method.

The animation's `replaceState` property will be `removed` if the animation has been removed, `persisted` if you have called `persist()` on the animation, or `active` otherwise.
