---
title: "Mock APIs (part 1 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/mock.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

## Introduction

Web APIs are usually implemented as HTTP endpoints. Playwright provides APIs to **mock** and **modify** network traffic, both HTTP and HTTPS. Any requests that a page does, including XHRs and
fetch requests, can be tracked, modified and mocked. With Playwright you can also mock using HAR files that contain multiple network requests made by the page.

## Mock API requests

The following code will intercept all the calls to `*/**/api/v1/fruits` and will return a custom response instead. No requests to the API will be made. The test goes to the URL that uses the mocked route and asserts that mock data is present on the page.

```js
test("mocks a fruit and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const json = [{ name: 'Strawberry', id: 21 }];
    await route.fulfill({ json });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText('Strawberry')).toBeVisible();
});
```

```python
async def test_mock_the_fruit_api(page: Page):
    async def handle(route: Route):
        json = [{"name": "Strawberry", "id": 21}]
        # fulfill the route with the mock data
        await route.fulfill(json=json)

    # Intercept the route to the fruit API
    await page.route("*/**/api/v1/fruits", handle)

    # Go to the page
    await page.goto("https://demo.playwright.dev/api-mocking")

    # Assert that the Strawberry fruit is visible
    await expect(page.get_by_text("Strawberry")).to_be_visible()
```

```python
def test_mock_the_fruit_api(page: Page):
    def handle(route: Route):
        json = [{"name": "Strawberry", "id": 21}]
        # fulfill the route with the mock data
        route.fulfill(json=json)

    # Intercept the route to the fruit API
    page.route("*/**/api/v1/fruits", handle)

    # Go to the page
    page.goto("https://demo.playwright.dev/api-mocking")

    # Assert that the Strawberry fruit is visible
    expect(page.get_by_text("Strawberry")).to_be_visible()
```

```csharp
// Intercept the route to the fruit API
await page.RouteAsync("*/**/api/v1/fruits", async route => {
  var json = new[] { new { name = "Strawberry", id = 21 } };
  // fulfill the route with the mock data
  await route.FulfillAsync(new()
  {
    Json = json
  });
});

// Go to the page
await page.GotoAsync("https://demo.playwright.dev/api-mocking");

// Assert that the Strawberry fruit is visible
await Expect(page.GetByText("Strawberry")).ToBeVisibleAsync();
```

```java
// Intercept the route to the fruit API
page.route("*/**/api/v1/fruits", route -> {
    List<Dictionary<String, Object>> data = new ArrayList<Dictionary<String, Object>>();
    Hashtable<String, Object> dict = new Hashtable<String, Object>();
    dict.put("name", "Strawberry");
    dict.put("id", 21);
    data.add(dict);
  // fulfill the route with the mock data
  route.fulfill(RequestOptions.create().setData(data));
});

// Go to the page
page.navigate("https://demo.playwright.dev/api-mocking");

// Assert that the Strawberry fruit is visible
assertThat(page.getByText("Strawberry")).isVisible();
```

You can see from the trace of the example test that the API was never called, it was however fulfilled with the mock data.

Read more about advanced networking.

## Modify API responses

Sometimes, it is essential to make an API request, but the response needs to be patched to
allow for reproducible testing. In that case, instead of mocking the request, one
can perform the request and fulfill it with the modified response.

In the example below we intercept the call to the fruit API and add a new fruit called 'Loquat', to the data. We then go to the url and assert that this data is there:

```js
test('gets the json from api and adds a new fruit', async ({ page }) => {
  // Get the response and add to it
  await page.route('*/**/api/v1/fruits', async route => {
    const response = await route.fetch();
    const json = await response.json();
    json.push({ name: 'Loquat', id: 100 });
    // Fulfill using the original response, while patching the response body
    // with the given JSON object.
    await route.fulfill({ response, json });
  });

  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the new fruit is visible
  await expect(page.getByText('Loquat', { exact: true })).toBeVisible();
});
```

```python
async def test_gets_the_json_from_api_and_adds_a_new_fruit(page: Page):
    async def handle(route: Route):
        response = await route.fetch()
        json = await response.json()
        json.append({ "name": "Loquat", "id": 100})
        # Fulfill using the original response, while patching the response body
        # with the given JSON object.
        await route.fulfill(response=response, json=json)

    await page.route("https://demo.playwright.dev/api-mocking/api/v1/fruits", handle)

    # Go to the page
    await page.goto("https://demo.playwright.dev/api-mocking")

    # Assert that the new fruit is visible
    await expect(page.get_by_text("Loquat", exact=True)).to_be_visible()
```

```python
def test_gets_the_json_from_api_and_adds_a_new_fruit(page: Page):
    def handle(route: Route):
        response = route.fetch()
        json = response.json()
        json.append({ "name": "Loquat", "id": 100})
        # Fulfill using the original response, while patching the response body
        # with the given JSON object.
        route.fulfill(response=response, json=json)

    page.route("https://demo.playwright.dev/api-mocking/api/v1/fruits", handle)

    # Go to the page
    page.goto("https://demo.playwright.dev/api-mocking")

    # Assert that the new fruit is visible
    expect(page.get_by_text("Loquat", exact=True)).to_be_visible()
```

```csharp
await page.RouteAsync("*/**/api/v1/fruits", async (route) => {
    var response = await route.FetchAsync();
    var fruits = await response.JsonAsync<Fruit[]>();
    fruits.Add(new Fruit() { Name = "Loquat", Id = 100 });
    // Fulfill using the original response, while patching the response body
    // with the given JSON object.
    await route.FulfillAsync(new ()
    {
      Response = response,
      Json = fruits
    });
  }
);
// Go to the page
await page.GotoAsync("https://demo.playwright.dev/api-mocking");

// Assert that the Loquat fruit is visible
await Expect(page.GetByText("Loquat", new () { Exact = true })).ToBeVisibleAsync();
```

```java
page.route("*/**/api/v1/fruits", route -> {
  Response response = route.fetch();
  byte[] json = response.body();
  JsonObject parsed = new Gson().fromJson(new String(json), JsonObject.class);
  parsed.add(new JsonObject().add("name", "Loquat").add("id", 100));
  // Fulfill using the original response, while patching the response body
  // with the given JSON object.
  route.fulfill(new Route.FulfillOptions().setResponse(response).setBody(parsed.toString()));
});

// Go to the page
page.navigate("https://demo.playwright.dev/api-mocking");

// Assert that the Loquat fruit is visible
assertThat(page.getByText("Loquat", new Page.GetByTextOptions().setExact(true))).isVisible();
```

In the trace of our test we can see that the API was called and the response was modified.

By inspecting the response we can see that our new fruit was added to the list.

Read more about advanced networking.
