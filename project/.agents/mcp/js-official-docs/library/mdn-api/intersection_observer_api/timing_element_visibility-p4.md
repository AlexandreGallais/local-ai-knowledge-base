---
title: "Timing element visibility with the Intersection Observer API (part 4 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/intersection_observer_api/timing_element_visibility/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Timing element visibility with the Intersection Observer API (part 4 of 4)

To create the `` element for an article (as well as all of its contents), we use the `createArticle()` function, which takes as input a string which is the full text of the article to add to the page.

```js
function createArticle(contents) {
  const articleElem = document.createElement("article");
  articleElem.id = nextArticleID;

  const titleElem = document.createElement("h2");
  titleElem.innerText = `Article ${nextArticleID} title`;
  articleElem.appendChild(titleElem);

  articleElem.innerHTML += contents;
  nextArticleID += 1;

  return articleElem;
}
```

First, the `` element is created and its ID is set to the unique value `nextArticleID` (which starts at 1 and goes up for each article). Then we create and append an `<h2>` element for the article title and then we append the HTML from `contents` to that. Finally, `nextArticleID` is incremented (so that the next element gets a new unique ID) and we return the new `` element to the caller.

#### Creating an ad

The `loadRandomAd()` function simulates loading an ad and adding it to the page. If you don't pass a value for `replaceBox`, a new element is created to contain the ad; the ad is then appended to the page. If you specify a `replaceBox`, that box is treated as an existing ad element; instead of creating a new one, the existing element is changed to contain the new ad's style, content, and other data. This avoids the risk of lengthy layout work being done when you update the ad, which could happen if you first delete the old element then insert a new one.

```js
function loadRandomAd(replaceBox) {
  const ads = [
    {
      bgcolor: "#cceecc",
      title: "Eat Green Beans",
      body: "Make your mother proud—they're good for you!",
    },
    {
      bgcolor: "aquamarine",
      title: "MillionsOfFreeBooks.whatever",
      body: "Read classic literature online free!",
    },
    {
      bgcolor: "lightgrey",
      title: "3.14 Shades of Gray: A novel",
      body: "Love really does make the world go round…",
    },
    {
      bgcolor: "#ffeeee",
      title: "Flexbox Florist",
      body: "When life's layout gets complicated, send flowers.",
    },
  ];
  let adBox, title, body, timerElem;

  const ad = ads[Math.floor(Math.random() * ads.length)];

  if (replaceBox) {
    adObserver.unobserve(replaceBox);
    adBox = replaceBox;
    title = replaceBox.querySelector(".title");
    body = replaceBox.querySelector(".body");
    timerElem = replaceBox.querySelector(".timer");
  } else {
    adBox = document.createElement("div");
    adBox.className = "ad";
    title = document.createElement("h2");
    body = document.createElement("p");
    timerElem = document.createElement("div");
    adBox.appendChild(title);
    adBox.appendChild(body);
    adBox.appendChild(timerElem);
  }

  adBox.style.backgroundColor = ad.bgcolor;

  title.className = "title";
  body.className = "body";
  title.innerText = ad.title;
  body.innerHTML = ad.body;

  adBox.dataset.totalViewTime = 0;
  adBox.dataset.lastViewStarted = 0;

  timerElem.className = "timer";
  timerElem.innerText = "0:00";

  if (!replaceBox) {
    contentBox.appendChild(adBox);
  }

  adObserver.observe(adBox);
}
```

First is the array `ads`. This array contains the data needed to create each ad. We have four here to choose from at random. In a real-world scenario, of course, the ads would come from a database or, more likely, an advertising service from which you fetch ads using an API. However, our needs are simple: each ad is represented by an object with three properties: a background color (`bgcolor`), a title (`title`), and a body text string (`body`).

Then we define several variables:

- `adBox`
    This will be set to the element that represents the ad. For new ads being appended to the page, this is created using `Document.createElement()`. When replacing an existing ad, this is set to the specified ad element (`replaceBox`).
- `title`
    Will hold the `<h2>` element representing the ad's title.
- `body`
    Will hold the `` representing the ad's body text.
- `timerElem`
    Will hold the `` element which contains the time the ad has been visible so far.

A random ad is selected by computing `Math.floor(Math.random() * ads.length)`; the result is a value between 0 and one less than the number of ads. The corresponding ad is now known as `adBox`.

If a value is specified for `replaceBox`, we use that as the ad element. To do so, we begin by ending observation of the element by calling `IntersectionObserver.unobserve()`. Then the local variables for each of the elements that comprise an ad: the ad box itself, the title, the body, and the timer box, are all set to the corresponding elements in the existing ad.

If no value is specified for replaceBox, we create a new ad element. The ad's new `` element is created and its properties established by setting its class name to `"ad"`. Next, the ad title element is created, along with the body and the visibility timer; these are an `<h2>`, a ``, and a `` element, respectively. These elements are appended to the `adBox` element.

After that, the code paths converge once again. The ad's background color is set to the value specified in the new ad's record, and elements' classes and contents are set appropriately as well.

Next, it's time to set up the custom data properties to track the ad's visibility data by setting `adBox.dataset.totalViewTime` and `adBox.dataset.lastViewStarted` to 0.

Finally, we set the ID of the `` which will show the timer we'll present in the ad to show how long it's been visible, giving it the class `"timer"`. The initial text is set to "0:00", to represent the starting time of 0 minutes and 0 seconds, and it's appended to the ad.

If we're not replacing an existing ad, we need to append the element to the content area of the page using `Document.appendChild()`. If we're replacing an ad, it's already there, with its contents replaced with the new ad's. Then we call the `observe()` method on our Intersection Observer, `adObserver`, to start watching the ad for changes to its intersection with the viewport. From now on, any time the ad becomes 100% obscured or even a single pixel becomes visible, or the ad passes through 75% visible in one way or another, the observer's callback is executed.

#### Replacing an existing ad

Our observer's callback keeps an eye out for ads which become 100% obscured and have a total visible time of at least one minute. When that happens, the `replaceAd()` function is called with that ad's element as an input, so that the old ad can be replaced with a new one.

```js
function replaceAd(adBox) {
  updateAdTimer(adBox);

  const visibleTime = adBox.dataset.totalViewTime;
  console.log(
    `Replacing ad: ${
      adBox.querySelector("h2").innerText
    } - visible for ${visibleTime}`,
  );

  loadRandomAd(adBox);
}
```

`replaceAd()` begins by calling `updateAdTimer()` on the existing ad, to ensure that its timer is up-to-date. This ensures that when we read its `totalViewTime`, we see the exact final value for how long the ad was visible to the user. We then report that data; in this case, by logging it to console, but in the real world, you'd submit the information to an ad service's API or save it into a database.

Then we load a new ad by calling `loadRandomAd()`, specifying the ad to be replaced as an input parameter. As we saw previously, `loadRandomAd()` will replace an existing ad with content and data corresponding to a new ad, if you specify an existing ad's element as an input parameter.

The new ad's element object is returned to the caller in case it's needed.

### Result

The resulting page looks like this. Try experimenting by scrolling up and down and notice how changes in the visibility affect the timers in each ad. Also note that each ad is replaced after one minute of visibility (but the ad must first be scrolled out of view and back again), and how the timers pause while the document is tabbed into the background. However, covering the browser with another window does not pause the timers.

## See also

- Intersection Observer API
- Page Visibility API
