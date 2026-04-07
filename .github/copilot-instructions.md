# BlazorMediaQueries - Workspace Instructions

A .NET 10.0 Blazor Server application demonstrating responsive design patterns with media queries and interactive components.

## Build and Test

```powershell
# Build the project
dotnet build

# Run the application
dotnet run --project BlazorMediaQueries

# Application URLs
# - HTTPS: https://localhost:7182
# - HTTP: http://localhost:5109

# Restore dependencies
dotnet restore
```

## Architecture

### Render Mode
- **Interactive Server**: All components use Blazor Server with WebSocket-based bi-directional communication
- Configured in `Program.cs`: `AddRazorComponents().AddInteractiveServerComponents()`
- `App.razor` specifies `@rendermode="InteractiveServer"`

### Component Organization
```
Components/
├── _Imports.razor          # Global usings and component registration
├── App.razor              # Root component with render mode
├── Routes.razor           # Routing configuration
├── Layout/                # Layout and navigation components
│   ├── MainLayout.razor   # Main layout with sidebar pattern
│   ├── NavMenu.razor      # Bootstrap navbar navigation
│   └── ReconnectModal.razor # Blazor circuit reconnection handling
└── Pages/                 # Routable page components with @page directive
    ├── Home.razor
    ├── Counter.razor
    ├── Weather.razor
    ├── Error.razor
    └── NotFound.razor
```

## Code Conventions

### File Organization
- **Co-located CSS**: Component and corresponding `.razor.css` in same directory (e.g., `MainLayout.razor` + `MainLayout.razor.css`)
- **Co-located JavaScript**: Module-scoped `.razor.js` files for JavaScript interop (e.g., `ReconnectModal.razor.js`)
- **Scoped CSS**: Compiled into `BlazorMediaQueries.styles.css` bundle automatically
- **Page components**: Decorated with `@page` directive and placed in `Pages/` folder
- **Layout components**: In `Layout/` subfolder, inherit from `LayoutComponentBase`

### Naming Conventions
- **Components**: PascalCase (e.g., `Counter.razor`, `MainLayout.razor`, `NavMenu.razor`)
- **CSS classes**: kebab-case (e.g., `.navbar-toggler`, `.desktop-only`, `.content`)
- **C# properties/methods**: PascalCase (e.g., `TemperatureC`, `IncrementCount()`)

### Responsive Design Patterns
- **Mobile-first approach**: Default styles target mobile, enhancements for larger screens
- **Breakpoint**: Media query at `min-width: 641px` for tablet/desktop layouts
- **Responsive classes**: Use `.desktop-only` pattern to hide elements on small screens
- **Example**: `Weather.razor.css` demonstrates hiding table columns on mobile

### Component Patterns
- **Stateful components**: Private fields with event handlers (see `Counter.razor`)
- **Async initialization**: Use `OnInitializedAsync()` for data loading (see `Weather.razor`)
- **Conditional rendering**: `@if` directives for loading states and null checks
- **Layout inheritance**: `@inherits LayoutComponentBase` for layout components
- **Error handling**: Cascaded `HttpContext` for request tracking (see `Error.razor`)

### JavaScript Interop
- **Module-scoped JS**: Use `.razor.js` files for component-specific JavaScript
- **Blazor APIs**: Use `Blazor.reconnect()` and `Blazor.resumeCircuit()` for circuit management
- **Event handling**: Listen to `components-reconnect-state-changed` custom events
- **Dialog API**: Prefer HTML5 `<dialog>` element with `showModal()` and `close()` methods

### .NET Features
- **Nullable reference types**: Enabled project-wide (`#nullable enable`)
- **Implicit usings**: Common namespaces auto-imported (System, System.Linq, etc.)
- **Target framework**: .NET 10.0 (`net10.0`)
- **Static assets**: Use `@Assets["path"]` helper for cache-busted asset references

## Security and Production

- **HSTS**: Configured for production (30-day default)
- **Antiforgery**: Enabled via `app.UseAntiforgery()`
- **Exception handling**: App-level error page at `/Error` route
- **Status codes**: 404s re-executed to `/not-found` route
- **HTTPS redirection**: Automatic in production

## Related Instructions

This workspace has additional file-scoped instructions:
- **DDD & Architecture**: See [dotnet-architecture-good-practices.instructions.md](.github/instructions/dotnet-architecture-good-practices.instructions.md) - applies to all .cs, .csproj, .razor files
- **Best Practices Skill**: `/dotnet-best-practices` skill available for comprehensive code reviews

---

**Note**: This application has no external database or services—all data is synthesized locally. Focus on UI/UX patterns, component design, and responsive behavior.
