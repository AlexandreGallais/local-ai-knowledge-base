---
title: "CSS animation triggers"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/animation_triggers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS animation triggers

The **CSS animation triggers** module provides functionality to trigger standard time-based CSS animations when a specific timeline trigger occurs.

**Scroll-triggered animations** allow you to control when a regular time-based animation starts, pauses, or stops based on when a trigger activates or deactivates, without using JavaScript. This could include when a scrolling element enters or leaves a timeline range.

These ranges normally come from view progress timelines, enabling, for example, an animation to start when an element enters a scrollport and pause when it leaves the scrollport. Properties let you change the timeline range and control the active and activation ranges. Triggers can specify different actions when entering versus exiting the timeline range, allowing control over animation playback.

The animation triggers module also defines **event triggers**. When supported, these will activate timeline-based animations when specific DOM events occur.

## Animation triggers in action

This example demonstrates scroll-triggered animations. Scroll the box up and down — the appearance of the "bouncer" text will trigger the ball's animation, and its disappearance will trigger the same animation in reverse. Scroll further, and the same process will repeat when the "another bouncer" text appears and then disappears from the scrollport.

```html
<section>
  <div>
    <p>scroll down</p>
    <p id="trigger">bouncer</p>
    <p>keep scrolling</p>
    <p>keep scrolling</p>
    <p>keep scrolling</p>
    <p id="trigger2">another bouncer</p>
    <p>scroll up</p>
  </div>
</section>

<span id="ball"><span></span></span>
```

```css
#ball,
#ball span {
  animation:
    move-right 2s 1 ease-out both,
    move-right 2s 1 ease-out forwards;
  animation-trigger:
    --t play-forwards play-backwards,
    --t2 play-forwards play-backwards;
}
#ball span {
  animation-name: bounce, bounce;
}

#trigger {
  timeline-trigger-name: --t;
  timeline-trigger-source: view();
}
#trigger2 {
  timeline-trigger-name: --t2;
  timeline-trigger-source: view();
}

html {
  font-family: sans-serif;
  font-size: 1.3rem;
}

* {
  box-sizing: border-box;
}

@layer scroller {
  section {
    border: solid;
    width: 200px;
    height: 250px;
    margin-top: 50px;
    overflow: scroll;
  }
  p {
    text-align: center;
    font-size: 1.5rem;
    margin: 100% 0;
  }
  #trigger,
  #trigger2 {
    padding: 0;
    color: red;
  }
}

@layer animation-setup {
  #ball {
    position: fixed;
    top: 96vh;
  }
  #ball span {
    background: red;
    border-radius: 50%;
    height: 5vw;
    display: block;
    aspect-ratio: 1/1;
  }

  @keyframes move-right {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(90vw);
    }
  }

  @keyframes bounce {
    9%,
    24%,
    35%,
    44%,
    51%,
    58%,
    63%,
    68%,
    72%,
    76%,
    100% {
      transform: translateY(0);
      animation-timing-function: ease-out;
    }
    0%,
    17%,
    30%,
    40%,
    48%,
    55%,
    61%,
    66%,
    70%,
    74% {
      animation-timing-function: ease-in;
    }
    0% {
      transform: translateY(-96vh);
    }
    17% {
      transform: translateY(-57.6vh);
    }
    30% {
      transform: translateY(-34.56vh);
    }
    40% {
      transform: translateY(-20.74vh);
    }
    48% {
      transform: translateY(-12.44vh);
    }
    55% {
      transform: translateY(-7.46vh);
    }
    61% {
      transform: translateY(-4.48vh);
    }
    66% {
      transform: translateY(-2.69vh);
    }
    70% {
      transform: translateY(-1.61vh);
    }
    74% {
      transform: translateY(-0.97vh);
    }
  }
}
```

```css
@supports not (timeline-trigger-source: view()) {
  body::before {
    content: "Your browser does not support scroll-triggered animations.";
    background-color: wheat;
    text-align: center;
    padding: 1rem 0;

    z-index: 1;
    position: fixed;
    inset: 40% 0 auto;
  }
}
```

We defined the animation triggers by specifying a `timeline-trigger-name` and `timeline-trigger-source` on the "bouncer" elements. The ball has a bouncing `animation` set on it twice. It also has an `animation-trigger` property set: this references the names of both triggers and the actions to perform when the animations are activated and deactivated. Activation and deactivation are caused by the "bouncer" elements coming into and out of view.

## Reference

### Properties

- `animation-trigger`
- `timeline-trigger` shorthand
- `timeline-trigger-activation-range` shorthand
  - `timeline-trigger-activation-range-end`
  - `timeline-trigger-activation-range-start`
- `timeline-trigger-active-range` shorthand
  - `timeline-trigger-active-range-end`
  - `timeline-trigger-active-range-start`
- `timeline-trigger-name`
- `timeline-trigger-source`
- `trigger-scope`

The CSS animation triggers module also introduces the `event-trigger`, `event-trigger-name`, and `event-trigger-source` properties. Currently, no browsers support these features.

### Data types and values

- `<animation-action>`

## Guides

- Using CSS scroll-triggered animations
    An introduction to implementing CSS scroll-triggered animations.
- Timeline range names
    The `timeline-range-name` data type: Understanding the various timeline range names.
- Understanding timeline insets
    Understanding the animation attachment range syntax used to inset scroll-driven and scroll-triggered animations.

## Related concepts

- CSS animations module
  - `animation-timeline`
  - `@keyframes` at-rule
  - `<keyframe-selector>`
- CSS scroll-driven animations module
  - `animation-range` shorthand
    - `animation-range-end`
    - `animation-range-start`
  - `scroll-timeline` shorthand
    - `scroll-timeline-axis`
    - `scroll-timeline-name`
  - `timeline-scope`
  - `view-timeline` shorthand
    - `view-timeline-axis`
    - `view-timeline-inset`
    - `view-timeline-name`

## See also

- Using CSS animations
- Using scroll driven animations
- CSS scroll-driven animation timelines
- CSS scroll-triggered animations are coming! on developer.chrome.com (2025)
