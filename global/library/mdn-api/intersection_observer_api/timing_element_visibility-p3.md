---
title: "Timing element visibility with the Intersection Observer API (part 3 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersection_observer_api/timing_element_visibility/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Timing element visibility with the Intersection Observer API (part 3 of 4)

### Tying it together with JavaScript

That brings us to the JavaScript code which makes everything work. Let's start with the global variables:

```js
const contentBox = document.querySelector("main");

let nextArticleID = 1;
let visibleAds = new Set();
let previouslyVisibleAds = null;
```

These are used as follows:

- `contentBox`
    A reference to the `` element's `HTMLElement` object in the DOM. This is where we'll insert the articles and ads.
- `nextArticleID`
    Each article is given a unique ID number; this variable tracks the next ID to use, starting with 1.
- `visibleAds`
    A `Set` which we'll use to track the ads currently visible on the screen.
- `previouslyVisibleAds`
    Used to temporarily store the list of visible ads while the document is not visible (for example, if the user has tabbed to another page).

#### Setting up

To set things up, we run the following code when the page loads:

```js
document.addEventListener("visibilitychange", handleVisibilityChange);

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: [0.0, 0.75],
};
const adObserver = new IntersectionObserver(
  intersectionCallback,
  observerOptions,
);
const refreshIntervalID = setInterval(handleRefreshInterval, 1000);

const loremIpsum =
  "<p>Lorem ipsum dolor sit amet, consectetur adipiscing" +
  " elit. Cras at sem diam. Vestibulum venenatis massa in tincidunt" +
  " egestas. Morbi eu lorem vel est sodales auctor hendrerit placerat" +
  " risus. Etiam rutrum faucibus sem, vitae mattis ipsum ullamcorper" +
  " eu. Donec nec imperdiet nibh, nec vehicula libero. Phasellus vel" +
  " malesuada nulla. Aliquam sed magna aliquam, vestibulum nisi at," +
  " cursus nunc.</p>";

buildContents();
```

First, we set up an event listener for the `visibilitychange` event. This event is sent when the document becomes hidden or visible, such as when the user switches tabs in their browser. The Intersection Observer API doesn't take this into account when detecting intersection, since intersection isn't affected by page visibility. Therefore, we need to pause our timers while the page is tabbed out; hence this event listener.

Next we set up the options for the `IntersectionObserver` which will monitor target elements (ads, in our case) for intersection changes relative to the document. The options are configured to watch for intersections with the document's viewport (by setting `root` to `null`). We have no margins to extend or contract the intersection root's rectangle; we want to match the boundaries of the document's viewport exactly for intersection purposes. And the `threshold` is set to an array containing the values 0.0 and 0.75; this will cause our callback to execute whenever a targeted element becomes completely obscured or first starts to become unobscured (intersection ratio 0.0) or passes through 75% visible in either direction (intersection ratio 0.75).

The observer, `adObserver`, is created by calling `IntersectionObserver`'s constructor, passing in the callback function, `intersectionCallback`, and our options.

The variable `loremIpsum` contains the text we'll use for the body of all of our articles. Obviously in the real world, you'd have some code to pull articles from a database or the like, but this does the job for our purposes. Every article uses the same text; you could of course change that easily enough.

We then call a function `buildContents()`, which we'll define later to actually generate and insert into the document the articles and ads we want to present.

Finally, we set up an interval which triggers once a second to handle any necessary refreshing. We need a one second refresh since we're displaying timers in all visible ads for the purposes of this example. You may not need an interval at all, or you might do it differently or using a different time interval.

#### Handling document visibility changes

Let's take a look at the handler for the `visibilitychange` event. Our script receives this event when the document itself becomes visible or invisible. The most important scenario here is when the user switches tabs. Since Intersection Observer only cares about the intersection between the targeted elements and the intersection root, and not the tab's visibility (which is a different issue entirely), we need to use the Page Visibility API to detect these tab switches and disable our timers for the duration.

```js
function handleVisibilityChange() {
  if (document.hidden) {
    if (!previouslyVisibleAds) {
      previouslyVisibleAds = visibleAds;
      visibleAds = new Set();
      previouslyVisibleAds.forEach((adBox) => {
        updateAdTimer(adBox);
        adBox.dataset.lastViewStarted = 0;
      });
    }
  } else {
    previouslyVisibleAds.forEach((adBox) => {
      adBox.dataset.lastViewStarted = performance.now();
    });
    visibleAds = previouslyVisibleAds;
    previouslyVisibleAds = null;
  }
}
```

Since the event itself doesn't state whether the document has switched from visible to invisible or vice versa, the `document.hidden` property is checked to see if the document is not currently visible. Since it's theoretically possible to get called multiple times, we only proceed if we haven't already paused the timers and saved the visibility states of the existing ads.

To pause the timers, all we need to do is remove the ads from the set of visible ads (`visibleAds`) and mark them as inactive. To do so, we begin by saving the set of visible ads into a variable known as `previouslyVisibleAds` to be sure we can restore them when the user tabs back into the document, and we then empty the `visibleAds` set so they won't be treated as visible. Then, for each of the ads that are being suspended, we call our `updateAdTimer()` function, which handles updating the ad's total visible time counter, then we set their `dataset.lastViewStarted` property to 0, which indicates that the tab's timer isn't running.

If the document has just become visible, we reverse this process: first we go through `previouslyVisibleAds` and set each one's `dataset.lastViewStarted` to the current document's time (in milliseconds since the document was created) using the `performance.now()` method. Then we set `visibleAds` back to `previouslyVisibleAds` and set the latter to `null`. Now the ads are all restarted, and configured to know that they became visible at the current time, so that they will not add up the duration of time the page was tabbed away the next time they're updated.

#### Handling intersection changes

Once per pass <example-value> the browser's event loop, each `IntersectionObserver` checks to see if any of its target elements have passed through any of the observer's intersection ratio thresholds. For each observer, a list of targets that have done so is compiled, and sent to the observer's callback as an array of `IntersectionObserverEntry` objects. Our callback, `intersectionCallback()`, looks like this:

```js
function intersectionCallback(entries) {
  entries.forEach((entry) => {
    const adBox = entry.target;

    if (entry.isIntersecting) {
      if (entry.intersectionRatio >= 0.75) {
        adBox.dataset.lastViewStarted = entry.time;
        visibleAds.add(adBox);
      }
    } else {
      visibleAds.delete(adBox);
      if (
        entry.intersectionRatio === 0.0 &&
        adBox.dataset.totalViewTime >= 60000
      ) {
        replaceAd(adBox);
      }
    }
  });
}
```

As previously mentioned, the `IntersectionObserver` callback receives as input an array of all of the observer's targeted elements which have become either more or less visible than one of the intersection observer ratios. We iterate over each of those entries—which are of type `IntersectionObserverEntry`. If the target element is intersecting with the root, we know it has just transitioned from the obscured state to the visible state. If it's become at least 75% visible, then we consider the ad visible and we start the timer by setting the ad's `dataset.lastViewStarted` attribute to the transition time in `entry.time`, then add the ad to the set `visibleAds` so we know to process it as time goes by.

If the ad has transitioned to the not-intersecting state, we remove the ad from the set of visible ads. Then we have one special behavior: we look to see if `entry.intersectionRatio` is 0.0; if it is, that means the element has become totally obscured. If that's the case, and the ad has been visible for at least a minute total, we call a function we'll create called `replaceAd()` to replace the existing ad with a new one. This way, the user sees a variety of ads over time, but the ads are only replaced while they can't be seen, resulting in a smooth experience.

#### Handling periodic actions

Our interval handler, `handleRefreshInterval()`, is called about once per second courtesy of the call to `setInterval()` made in the `startup()` function described above. Its main job is to update the timers every second and schedule a redraw to update the timers we'll be drawing within each ad.

```js
function handleRefreshInterval() {
  const redrawList = [];

  visibleAds.forEach((adBox) => {
    const previousTime = adBox.dataset.totalViewTime;
    updateAdTimer(adBox);

    if (previousTime !== adBox.dataset.totalViewTime) {
      redrawList.push(adBox);
    }
  });

  if (redrawList.length) {
    window.requestAnimationFrame((time) => {
      redrawList.forEach((adBox) => {
        drawAdTimer(adBox);
      });
    });
  }
}
```

The array `redrawList` will be used to keep a list of all the ads which need to be redrawn during this refresh cycle, since it may not be exactly the same as the elapsed time due to system activity or because you've set the interval to something other than every 1000 milliseconds.

Then, for each of the visible ads, we save the value of `dataset.totalViewTime` (the total number of milliseconds the ad has currently been visible, as of the last time it was updated) and then call `updateAdTimer()` to update the time. If it's changed, then we push the ad onto the `redrawList` so we know it needs to be updated during the next animation frame.

Finally, if there's at least one element to redraw, we use `requestAnimationFrame()` to schedule a function that will redraw each element in the `redrawList` during the next animation frame.

#### Updating an ad's visibility timer

Previously (see Handling document visibility changes and Handling periodic actions), we've seen that when we need to update an ad's "total visible time" counter, we call a function named `updateAdTimer()` to do so. This function takes as an input an ad's `HTMLDivElement` object. Here it is:

```js
function updateAdTimer(adBox) {
  const lastStarted = adBox.dataset.lastViewStarted;
  const currentTime = performance.now();

  if (lastStarted) {
    const diff = currentTime - lastStarted;

    adBox.dataset.totalViewTime =
      parseFloat(adBox.dataset.totalViewTime) + diff;
  }

  adBox.dataset.lastViewStarted = currentTime;
}
```

To track an element's visible time, we use two custom data attributes (see `data-*`) on every ad:

- `lastViewStarted`
    The time in milliseconds, relative to the time at which the document was created, at which the ad's visibility count was last updated, or the ad last became visible. 0 if the ad was not visible as of the last time it was checked.
- `totalViewTime`
    The total number of milliseconds the ad has been visible.

These are accessed through each ad's `HTMLElement.dataset` attribute, which provides a `DOMStringMap` mapping each custom attribute's name to its value. The values are strings, but we can convert those to numbers easily enough—in fact, JavaScript generally does it automatically, although we'll have one instance where we have to do it ourselves.

We start by fetching the time at which the ad's previous visibility status check time (`adBox.dataset.lastViewStarted`) into a local variable named `lastStarted`. We also get the current time-since-creation value using `performance.now()` into `currentTime`.

If `lastStarted` is non-zero—meaning the timer is currently running, we compute the difference between the current time and the start time to determine the number of milliseconds the timer has been visible since the last time it became visible. This is added to the current value of the ad's `totalViewTime` to bring the total up to date. Note the use of `parseFloat()` here; because these values are strings, JavaScript tries to do a string concatenation instead of addition without it.

Finally, the last-viewed time for the ad is updated to the current time. This is done whether the ad was running when this function was called or not; this causes the ad's timer to always be running when this function returns. This makes sense because this function is only called if the ad is visible, even if it's just now become visible.

#### Drawing an ad's timer

Inside each ad, for demonstration purposes, we draw the current value of its `totalViewTime`, converted into minutes and seconds. This is handled by passing the ad's element into the `drawAdTimer()` function:

```js
function drawAdTimer(adBox) {
  const timerBox = adBox.querySelector(".timer");
  const totalSeconds = adBox.dataset.totalViewTime / 1000;
  const sec = Math.floor(totalSeconds % 60);
  const min = Math.floor(totalSeconds / 60);

  timerBox.innerText = `${min}:${sec.toString().padStart(2, "0")}`;
}
```

This code finds the ad's timer using its ID, `"timer"`, and computes the number of seconds elapsed by dividing the ad's `totalViewTime` by 1000. Then it calculates the number of minutes and seconds elapsed before setting the timer's `innerText` to a string representing that time in the form m:ss. The `String.padStart()` method is used to ensure that the number of seconds is padded out to two digits if it's less than 10.

#### Building the page contents

The `buildContents()` function is called by the startup code to select and insert into the document the articles and ads to be presented:

```js
function buildContents() {
  for (let i = 0; i < 5; i++) {
    contentBox.appendChild(createArticle(loremIpsum));

    if (!(i % 2)) {
      loadRandomAd();
    }
  }
}
```

`buildContents()` creates a page with five articles. Following every odd-numbered article, an ad is "loaded" and inserted into the page. Articles are inserted into the content box (that is, the `` element that contains all the site content) after being created using a method called `createArticle()`, which we'll look at next.

The ads are created using a function called `loadRandomAd()`, which both creates the ad and inserts it into the page. We'll see later that this same function can also replace an existing ad, but for now, we're appending ads to the existing content.

#### Creating an article
