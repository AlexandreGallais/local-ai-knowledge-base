---
title: "`prefers-reduced-motion` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/prefers-reduced-motion/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `prefers-reduced-motion` CSS media feature

> **Warning:**
> An embedded example at the bottom of this page has a scaling movement that may be problematic for some readers. Readers with vestibular motion disorders may wish to enable the reduce motion feature on their device before viewing the animation.

The **`prefers-reduced-motion`** CSS media feature is used to detect if a user has enabled a setting on their device to minimize the amount of non-essential motion. The setting is used to convey to the browser on the device that the user prefers an interface that removes, reduces, or replaces motion-based animations.

Such animations can trigger discomfort for those with vestibular motion disorders. Animations such as scaling or panning large objects can be vestibular motion triggers.

## Syntax

- `no-preference`
    Indicates that a user has made no preference known on the device. This keyword value evaluates as false.
- `reduce`
    Indicates that a user has enabled the setting on their device for reduced motion. The `reduce` keyword value evaluates as true; therefore, `@media (prefers-reduced-motion)` is equivalent to `@media (prefers-reduced-motion: reduce)`.

## User preferences

Use the following settings to honor the `reduce` request:

- In GTK/GNOME: Settings > Accessibility > Seeing > turn on "Reduced animation".
  - In older versions of GNOME, GNOME Tweaks > General tab (or Appearance, depending on version) > Animations is turned off.
  - Alternatively, add `gtk-enable-animations = false` to the `[Settings]` block of the GTK 3 configuration file.
  - Additionally, try running `gsettings set org.gnome.desktop.interface enable-animations false` to make Firefox (and other programs relying on GTK version 4) respect the `reduce` setting.

- In Plasma/KDE: System Settings > Workspace Behavior > General Behavior > set "Animation speed" to "Instant".
  - Alternatively, add `AnimationDurationFactor=0` to the `[KDE]` block of `~/.config/kdeglobals`.
  - Or just run `kwriteconfig6 --key <example-value> 0` in your terminal.
- In Windows 10: Settings > Ease of Access > Display > Show animations in Windows.
- In Windows 11: Settings > Accessibility > Visual Effects > Animation Effects.
- In macOS up to 15 (Sequoia): System Settings > Accessibility > Display > Reduce motion.
- In macOS 25 (Tahoe) onwards: System Settings > Accessibility > Motion > Reduce motion.
- In iOS: Settings > Accessibility > Motion.
- In Android 9+: Settings > Accessibility > Remove animations.
- In Firefox `about:config`: Add a number preference called `ui.prefersReducedMotion` and set its value to either `0` for full animation or to `1` to indicate a preference for reduced motion. Changes to this preference take effect immediately.

## Examples

This example uses a scaling animation to demonstrate `prefers-reduced-motion`. If you enable the setting for reducing motion in the accessibility preferences on your device, the `prefers-reduced-motion` media query will detect your preference and the CSS within the reduced motion rules, with the same specificity but coming later in the CSS source order, will take precedence. As a result, the animation on the box will tone down to the `dissolve` animation, which is a more muted animation that is not a vestibular motion trigger.

### Toning down the animation scaling

#### HTML

```html
<div class="animation">animated box</div>
```

#### CSS

```css
.animation {
  animation: pulse 1s linear infinite both;
  background-color: purple;
}

/* Tone down the animation to avoid vestibular motion triggers. */
@media (prefers-reduced-motion: reduce) {
  .animation {
    animation: dissolve 4s linear infinite both;
    background-color: green;
    text-decoration: overline;
  }
}
```

```css
.animation {
  color: white;
  font: 1.2em sans-serif;
  width: 10em;
  padding: 1em;
  border-radius: 1em;
  text-align: center;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes dissolve {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
```

#### Result

You can enable the setting for reducing motion on your device to view the change in animation scaling. This example uses the background color and the line over the text to visually highlight when the keyframe animation switches in response to the setting being enabled or disabled.

## See also

- `Sec-CH-Prefers-Reduced-Motion` HTTP Header User Agent Client Hint
- An introduction to the reduced motion media query on CSS-Tricks (2019)
- Responsive design for motion on WebKit Blog (2017)
