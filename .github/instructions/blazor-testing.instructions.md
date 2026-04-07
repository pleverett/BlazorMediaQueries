---
description: Guidelines for testing Blazor components with bUnit and xUnit. Use when creating or modifying test files for Blazor components.
applyTo: '**/*Tests.cs,**/Tests/**/*.cs,**/*.Tests/**/*.cs'
version: 1.0.0
---

# Blazor Testing with bUnit

Testing guidelines for Blazor components in this project using bUnit and xUnit.

## Test Project Setup

### Required Packages
```xml
<PackageReference Include="bUnit" Version="1.30.3" />
<PackageReference Include="xunit" Version="2.9.0" />
<PackageReference Include="xunit.runner.visualstudio" Version="2.8.2" />
<PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.11.0" />
```

### Test Project Structure
```
BlazorMediaQueries.Tests/
├── Components/
│   ├── Pages/
│   │   ├── CounterTests.cs
│   │   ├── WeatherTests.cs
│   │   └── HomeTests.cs
│   └── Layout/
│       ├── NavMenuTests.cs
│       └── MainLayoutTests.cs
├── TestHelpers/
│   └── TestContextExtensions.cs
└── BlazorMediaQueries.Tests.csproj
```

## Testing Conventions

### Test Naming Pattern
Follow the pattern: `MethodName_Condition_ExpectedResult()`

```csharp
[Fact]
public void Counter_InitialRender_ShowsZero()
{
    // Test implementation
}

[Fact]
public void Counter_ClickButton_IncrementsCount()
{
    // Test implementation
}

[Fact]
public void Weather_OnInitialized_LoadsForecastData()
{
    // Test implementation
}
```

### Test Class Structure

```csharp
using Bunit;
using Xunit;

namespace BlazorMediaQueries.Tests.Components.Pages;

public class CounterTests : TestContext
{
    [Fact]
    public void Counter_InitialRender_ShowsZero()
    {
        // Arrange
        var cut = RenderComponent<Counter>();

        // Act
        var paragraph = cut.Find("p[role='status']");

        // Assert
        paragraph.MarkupMatches("<p role=\"status\">Current count: 0</p>");
    }

    [Fact]
    public void Counter_ClickButton_IncrementsCount()
    {
        // Arrange
        var cut = RenderComponent<Counter>();
        var button = cut.Find("button");

        // Act
        button.Click();

        // Assert
        var paragraph = cut.Find("p[role='status']");
        paragraph.MarkupMatches("<p role=\"status\">Current count: 1</p>");
    }

    [Fact]
    public void Counter_MultipleClicks_IncrementsMultipleTimes()
    {
        // Arrange
        var cut = RenderComponent<Counter>();
        var button = cut.Find("button");

        // Act
        button.Click();
        button.Click();
        button.Click();

        // Assert
        var paragraph = cut.Find("p[role='status']");
        paragraph.MarkupMatches("<p role=\"status\">Current count: 3</p>");
    }
}
```

## Common Testing Patterns

### 1. Testing Component Rendering

```csharp
[Fact]
public void Home_InitialRender_DisplaysWelcomeMessage()
{
    // Arrange
    var cut = RenderComponent<Home>();

    // Act
    var heading = cut.Find("h1");

    // Assert
    Assert.Equal("Hello, world!", heading.TextContent);
}
```

### 2. Testing User Interactions

```csharp
[Fact]
public void NavMenu_ClickToggle_TogglesMenu()
{
    // Arrange
    var cut = RenderComponent<NavMenu>();
    var checkbox = cut.Find("input[type='checkbox']");

    // Act
    checkbox.Change(true);

    // Assert
    Assert.True(checkbox.IsChecked());
}
```

### 3. Testing Async Initialization

```csharp
[Fact]
public async Task Weather_OnInitialized_LoadsForecastData()
{
    // Arrange
    var cut = RenderComponent<Weather>();

    // Act - Wait for async OnInitializedAsync to complete
    await cut.InvokeAsync(() => { });

    // Assert
    var rows = cut.FindAll("table tbody tr");
    Assert.Equal(5, rows.Count);
}
```

### 4. Testing Conditional Rendering

```csharp
[Fact]
public void Weather_BeforeInitialization_ShowsLoadingMessage()
{
    // Arrange & Act
    var cut = RenderComponent<Weather>();

    // Assert
    var loading = cut.Find("p em");
    Assert.Contains("Loading", loading.TextContent);
}

[Fact]
public async Task Weather_AfterInitialization_HidesLoadingMessage()
{
    // Arrange
    var cut = RenderComponent<Weather>();

    // Act
    await cut.InvokeAsync(() => { });

    // Assert
    Assert.Throws<ElementNotFoundException>(() => cut.Find("p em"));
}
```

### 5. Testing with Parameters

```csharp
[Fact]
public void Component_WithParameter_RendersCorrectly()
{
    // Arrange & Act
    var cut = RenderComponent<MyComponent>(parameters => parameters
        .Add(p => p.Title, "Test Title")
        .Add(p => p.Count, 5));

    // Assert
    var title = cut.Find("h2");
    Assert.Equal("Test Title", title.TextContent);
}
```

### 6. Testing Cascading Parameters

```csharp
[Fact]
public void Component_WithCascadingValue_ReceivesValue()
{
    // Arrange
    var cut = RenderComponent<CascadingValue<string>>(parameters => parameters
        .Add(p => p.Value, "Cascaded Value")
        .AddChildContent<MyComponent>());

    // Act
    var component = cut.FindComponent<MyComponent>();

    // Assert
    // Verify component received the cascaded value
}
```

### 7. Testing JavaScript Interop

```csharp
[Fact]
public void Component_CallsJavaScript_WithCorrectParameters()
{
    // Arrange
    var jsRuntimeMock = Services.AddMockJSRuntime();
    var cut = RenderComponent<MyComponent>();

    // Setup expected JS invocation
    jsRuntimeMock.Setup<string>("myFunction", "arg1", "arg2");

    // Act
    cut.Find("button").Click();

    // Assert
    var invocations = jsRuntimeMock.Invocations["myFunction"];
    Assert.Single(invocations);
}
```

## Testing Layout Components

### Testing MainLayout

```csharp
[Fact]
public void MainLayout_Render_ContainsNavMenu()
{
    // Arrange & Act
    var cut = RenderComponent<MainLayout>(parameters => parameters
        .AddChildContent("<div>Test Content</div>"));

    // Assert
    cut.FindComponent<NavMenu>();
}

[Fact]
public void MainLayout_Render_RendersBodyContent()
{
    // Arrange & Act
    var cut = RenderComponent<MainLayout>(parameters => parameters
        .AddChildContent("<div id='test'>Test Content</div>"));

    // Assert
    var content = cut.Find("#test");
    Assert.Equal("Test Content", content.TextContent);
}
```

## Assertions Best Practices

### Use Semantic Assertions

```csharp
// Good - Semantic
var button = cut.Find("button.btn-primary");
Assert.Equal("Click me", button.TextContent);

// Avoid - Brittle markup matching
cut.MarkupMatches("<button class='btn btn-primary'>Click me</button>");
```

### Test Behavior, Not Implementation

```csharp
// Good - Tests behavior
[Fact]
public void Counter_IncrementButton_IncreasesDisplayedCount()
{
    var cut = RenderComponent<Counter>();
    var initialCount = int.Parse(cut.Find("p").TextContent.Split(':')[1].Trim());
    
    cut.Find("button").Click();
    
    var newCount = int.Parse(cut.Find("p").TextContent.Split(':')[1].Trim());
    Assert.Equal(initialCount + 1, newCount);
}

// Avoid - Tests internal state
[Fact]
public void Counter_IncrementButton_IncreasesPrivateField()
{
    // Don't test private fields directly
}
```

### Check Accessibility

```csharp
[Fact]
public void Counter_Render_HasAccessibleStatus()
{
    // Arrange & Act
    var cut = RenderComponent<Counter>();

    // Assert
    var status = cut.Find("p[role='status']");
    Assert.NotNull(status);
}
```

## Running Tests

```powershell
# Run all tests
dotnet test

# Run tests with detailed output
dotnet test --logger "console;verbosity=detailed"

# Run specific test class
dotnet test --filter "FullyQualifiedName~CounterTests"

# Run tests with coverage (requires coverlet)
dotnet test /p:CollectCoverage=true /p:CoverageReportsFormat=html
```

## Common Pitfalls

### ❌ Not waiting for async operations
```csharp
// Wrong
var cut = RenderComponent<Weather>();
var table = cut.Find("table"); // Fails - data not loaded yet
```

```csharp
// Correct
var cut = RenderComponent<Weather>();
await cut.InvokeAsync(() => { }); // Wait for async operations
var table = cut.Find("table"); // Now succeeds
```

### ❌ Testing scoped CSS selectors
```csharp
// Wrong - Scoped CSS classes have unique identifiers
var element = cut.Find(".desktop-only");
```

```csharp
// Correct - Use semantic HTML or data attributes
var element = cut.Find("[data-desktop-only]");
// Or check computed styles if necessary
```

### ❌ Relying on exact markup
```csharp
// Brittle
cut.MarkupMatches("<div class=\"container\"><p>Text</p></div>");
```

```csharp
// Better - Test semantic content
Assert.Contains("Text", cut.Find(".container").TextContent);
```

## Integration with CI/CD

Tests should be part of the build pipeline:

```yaml
# .github/workflows/test.yml
- name: Run Tests
  run: dotnet test --no-build --verbosity normal
```

## Additional Resources

- [bUnit Documentation](https://bunit.dev/)
- [xUnit Documentation](https://xunit.net/)
- [Blazor Testing Best Practices](https://learn.microsoft.com/aspnet/core/blazor/test)

---

Remember: Good tests are fast, isolated, repeatable, and test behavior over implementation details.
