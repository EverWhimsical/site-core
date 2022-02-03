---
date: '2022-02-03'
title: Understanding Selenium 4
category: Selenium
tags:
  - selenium
  - java
---

# Selenium 4

## What's new?

We have been waiting for Selenium 4 release whilst using Selenium 3.x for a long time.
Now that Selenium 4 is released, let's look at key changes.
Official [Upgrade Document](https://www.selenium.dev/documentation/webdriver/getting_started/upgrade_to_selenium_4/) captures the essentials and I did not face major challenges in it.

- W3C WebDriver standard capabilities
- Consolidation of FindElement methods
- TimeUnit to Duration in Java

## BiDi API

Selenium has introduced mechanisms for user to perform advanced browser actions. [BiDi API](https://www.selenium.dev/documentation/webdriver/bidirectional/) (BiDirectional API) let's user to control events of browser DOM. It is still in early stages and not all browsers have implemented per the [W3C spec](https://w3c.github.io/webdriver-bidi/)

### Register Basic Auth

We can handle basic auth of website easily using [HasAuthentication](https://www.selenium.dev/documentation/webdriver/bidirectional/bidi_api/#register-basic-auth)

```java
    Predicate<URI> uriPredicate = uri -> uri.getHost().contains("your-domain.com");
    ((HasAuthentication) driver).register(uriPredicate, UsernameAndPassword.of("admin", "password"));
    driver.get("https://your-domain.com/login");
```

After this, user does not have to append user name and password to the URL for basic auth resulting in password leaks.

### Mutation Observation

When there are DOM changes, we can now listen and interact on it. This is particularly helpful in validation and page load conditions.

```java
    AtomicReference<DomMutationEvent> seen = new AtomicReference<>();
    CountDownLatch latch = new CountDownLatch(1);
    EventType<Void> domMutation = domMutation(mutation -> {
      String id = mutation.getElement().getAttribute("id");
      if ("spchl".equals(id)) {
        seen.set(mutation);
        latch.countDown();
      }
    });
```

With a `DomMutationEvent`, we can fetch the element and operate on it. Though there may be multiple dom changes, we can search and filter as required.

### Network Interception

With the new [Network Interception](https://www.selenium.dev/documentation/webdriver/bidirectional/bidi_api/#network-interception) feature, we can let go of legacy Proxy approaches to inspect network traffic.
Earlier, we had to create a proxy server (BrowserMob Proxy) and route Selenium calls via proxy to capture network logs.

With `NetworkInterceptor`, we can tweak the application response and test various functional flows easily.

```java
    Routable routable = Route.matching(req -> req.getUri().contains("/main/home.jsp"))
        .to(() -> req -> new HttpResponse()
            .setStatus(200)
            .addHeader("Content-Type", MediaType.HTML_UTF_8.toString())
            .setContent(utf8String("Creamy, delicious cheese!")));
```

- A step is considered duplicate if the annotation and step name is present more than once.
- If alias scanning is included, steps are considered duplicate if step name is present more than once.

## DevTools

Selenium 4 provides direct access to the Chrome DevTools Protocol (CDP), but we should avoid using it directly. It is better to use WebDriver Bidi APIs as it will be stable across releases.

### Performance Metrics

Using [DevTools](https://www.selenium.dev/documentation/webdriver/bidirectional/bidi_api/#collect-performance-metrics), we can collect performance metrics during the execution and use it for validation.

```java
    WebDriver driver = new ChromeDriver();
    driver = new Augmenter().augment(driver);
    DevTools devTools = ((HasDevTools) driver).getDevTools();
    devTools.createSession();

    devTools.send(Performance.enable(Optional.empty()));
    List<Metric> metricList = devTools.send(Performance.getMetrics());

    driver.get("https://google.com");
    driver.quit();

    for (Metric m : metricList) {
      System.out.println(m.getName() + " = " + m.getValue());
    }
```

If a certain metric value is beyond threshold value, the test can be failed.

### Network Conditions

We can also emulate Network conditions to better test the application.

_Note: This feature involves Chrome's Emulation feature specific to browser version_

```java
    WebDriver driver = new ChromeDriver();
    driver = new Augmenter().augment(driver);
    DevTools devTools = ((HasDevTools) driver).getDevTools();
    devTools.createSession();

    devTools.send(Network.enable(Optional.of(1000000), Optional.empty(), Optional.empty()));
        devTools.send(
            emulateNetworkConditions(false, 100, 200000, 100000,
                Optional.of(ConnectionType.CELLULAR4G)));
    long startTime = System.currentTimeMillis();
    driver.navigate().to("https://www.google.com");

    long endTime = System.currentTimeMillis();

    System.out.println("Load time is " + (endTime - startTime));
```

### GeoLocation

We can tweak the user's geolocation via DevTools [GeoLocation](https://www.selenium.dev/documentation/webdriver/bidirectional/chrome_devtools/#emulate-geo-location) feature.

_Note: This feature involves Chrome's Emulation feature specific to browser version_

```java
    WebDriver driver = new ChromeDriver();
    driver.navigate().to("https://the-internet.herokuapp.com/");
    driver = new Augmenter().augment(driver);
    DevTools devTools = ((HasDevTools) driver).getDevTools();
    devTools.createSession();
    devTools.send(Emulation.setGeolocationOverride(Optional.of(52.5043),
        Optional.of(13.4501),
        Optional.of(1)));
    driver.get("https://my-location.org/");
```
