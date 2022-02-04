---
date: '2019-10-13'
title: JBehave Duplicate Steps
category: Java
tags:
  - bdd
  - jbehave
---

# JBehave Extras

### JBehaveStepScanner

Easily get all steps and duplicate steps in your project by using [JBehaveStepScanner](https://github.com/EverWhimsical/jbehave-extras/blob/develop/src/main/java/com/everwhimsical/jbehave/step/JBehaveStepScanner.java)

We can process the result as per the requirement.

```java
    @org.junit.Before
    public void verifySteps() {
        JBehaveStepScanner jBehaveStepScanner = new JBehaveStepScanner(
                    "com.everwhimsical.jbehave.step.classes.clean",
                    "com.everwhimsical.jbehave.step.classes.duplicate");
        List<JBehaveStepInfo> allSteps = jBehaveStepScanner.getAllSteps();
        allSteps.forEach(System.out::println);
    }
```

By default, `Given`, `When`, `Then` annotations are scanned. To include scanning of `@Alias` and `@Aliases` annotations, set the following attribute.

```
jBehaveStepScanner.setAliasScan(true);
```

#### Duplicate Steps

Using the duplicate result list, it can be used to fail the execution before executing stories.

```java
    @org.junit.Before
    public void verifySteps() {
        JBehaveStepScanner jBehaveStepScanner = new JBehaveStepScanner(
                    "com.everwhimsical.jbehave.step.classes.clean",
                    "com.everwhimsical.jbehave.step.classes.duplicate");
        List<DuplicateJBehaveStepInfo> duplicateSteps = jBehaveStepScanner.getDuplicateSteps();
        duplicateSteps.forEach(System.out::println);
        if (duplicateSteps.size() > 0) {
            Assert.fail("Duplicate steps found");
        }
    }
```

#### Duplicate Condition

- A step is considered duplicate if the annotation and step name is present more than once.
- If alias scanning is included, steps are considered duplicate if step name is present more than once.

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
