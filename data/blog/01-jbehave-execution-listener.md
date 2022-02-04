---
date: '2019-10-13'
title: JBehave Execution Listener
category: Java
tags:
  - bdd
  - jbehave
  - listener
---

### JBehaveExecution

Get information about the current Story, Scenario, Step, Examples in a thread-safe manner using [JBehaveExecution](https://github.com/EverWhimsical/jbehave-extras/blob/develop/src/main/java/com/everwhimsical/jbehave/execution/JBehaveExecution.java)

Add the [ExecutionModelReporter](https://github.com/EverWhimsical/jbehave-extras/blob/develop/src/main/java/com/everwhimsical/jbehave/execution/ExecutionModelReporter.java) to your configuration as below and use the methods in JBehaveExecution.

```java
    @Override
    public Configuration configuration() {
        return new MostUsefulConfiguration()
            .useStoryPathResolver(embeddableClass -> "com/everwhimsical/jbehave/Simple.story")
            .useStoryReporterBuilder(
                new StoryReporterBuilder()
                    .withDefaultFormats()
                    .withReporters(new ExecutionModelReporter())
                    .withFormats(Format.CONSOLE));
    }
```

To get information about entities, use the below methods

- Execution -> [JBehaveExecution.getExecution](https://github.com/EverWhimsical/jbehave-extras/blob/develop/src/main/java/com/everwhimsical/jbehave/execution/JBehaveExecution.java#L31)
- Story -> [JBehaveExecution.getStory](https://github.com/EverWhimsical/jbehave-extras/blob/develop/src/main/java/com/everwhimsical/jbehave/execution/JBehaveExecution.java#L57)
- Scenario -> [JBehaveExecution.getScenario](https://github.com/EverWhimsical/jbehave-extras/blob/develop/src/main/java/com/everwhimsical/jbehave/execution/JBehaveExecution.java#L87)
- Step -> [JBehaveExecution.getStep](https://github.com/EverWhimsical/jbehave-extras/blob/develop/src/main/java/com/everwhimsical/jbehave/execution/JBehaveExecution.java#L117)

Using these entities build your custom reporter with ease.
