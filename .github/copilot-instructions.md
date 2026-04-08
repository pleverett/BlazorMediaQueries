# BlazorMediaQueries - Workspace Instructions

A .NET 10.0 Blazor Server application demonstrating responsive design patterns with Tailwind CSS 3.4 + DaisyUI and interactive components.

## Build and Test

```powershell
# Navigate to project directory for npm commands
cd BlazorMediaQueries

# Build CSS (required before running the app)
npm run build:css

# Watch CSS during development (auto-rebuild on changes)
npm run watch:css

# Build the project (from repository root)
cd ..
dotnet build

# Run the application (from repository root)
dotnet run --project BlazorMediaQueries

# Application URLs
# - HTTPS: https://localhost:7182
# - HTTP: http://localhost:5109

# Restore dependencies
dotnet restore
cd BlazorMediaQueries; npm install  # For Tailwind CSS and DaisyUI
```

### CSS Build Process

- **Tailwind CSS 3.4 + DaisyUI**: Using npm-based build system inside project folder
- **Input**: `wwwroot/css/tailwind.input.css` (relative to BlazorMediaQueries/)
- **Output**: `wwwroot/css/tailwind.output.css` (git-ignored)
- **Config**: `tailwind.config.js` inside BlazorMediaQueries/ folder
- **npm files**: `package.json`, `package-lock.json`, `node_modules/` all inside BlazorMediaQueries/
- **VS Code Tasks**: Use Tasks > Run Task > "watch-css" for automatic rebuilds (auto-navigates to project folder)
- **Production**: Use `npm run build:css:prod` for minified output

**Important**: Always run `npm run build:css` before `dotnet run` to ensure CSS is up to date.

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
│   ├── MainLayout.razor   # Main layout with Tailwind gradient sidebar
│   ├── NavMenu.razor      # Navigation with Tailwind utilities
│   └── ReconnectModal.razor # Blazor circuit reconnection (Tailwind + minimal state CSS)
└── Pages/                 # Routable page components with @page directive
    ├── Home.razor
    ├── Counter.razor
    ├── Weather.razor
    ├── Error.razor
    └── NotFound.razor
```

## Code Conventions

### File Organization
- **Co-located CSS**: Minimal scoped `.razor.css` files (only ReconnectModal.razor.css for Blazor state logic)
- **Co-located JavaScript**: Module-scoped `.razor.js` files for JavaScript interop (e.g., `ReconnectModal.razor.js`)
- **Tailwind utilities**: Most styling uses Tailwind utility classes directly in components
- **Scoped CSS**: Compiled into `BlazorMediaQueries.styles.css` bundle automatically
- **Page components**: Decorated with `@page` directive and placed in `Pages/` folder
- **Layout components**: In `Layout/` subfolder, inherit from `LayoutComponentBase`

### Naming Conventions
- **Components**: PascalCase (e.g., `Counter.razor`, `MainLayout.razor`, `NavMenu.razor`)
- **Tailwind classes**: Use semantic utility classes (e.g., `flex`, `md:hidden`, `bg-gradient-to-b`)
- **DaisyUI components**: Use component classes (e.g., `btn btn-primary`, `table table-zebra`)
- **C# properties/methods**: PascalCase (e.g., `TemperatureC`, `IncrementCount()`)

### Responsive Design Patterns
- **Mobile-first approach**: Tailwind's default approach - base styles for mobile, responsive variants for larger screens
- **Breakpoint**: Tailwind `md:` breakpoint at `768px` for tablet/desktop layouts
- **Responsive utilities**: Use Tailwind responsive prefixes (e.g., `hidden md:table-cell`, `md:flex-row`)
- **Example**: `Weather.razor` uses `hidden md:table-cell` to hide Summary column on mobile
- **Custom animations**: Defined in `tailwind.config.js` for Blazor reconnection states

### Styling Approach
- **DaisyUI components**: Use for common UI patterns (buttons, tables, navigation)
- **Tailwind utilities**: Use for layout, spacing, colors, responsive design
- **Minimal CSS**: Only ReconnectModal.razor.css contains custom CSS for Blazor state management
- **No Bootstrap**: Migrated from Bootstrap 5.3.3 to Tailwind CSS 3.4 + DaisyUI 4.12.24

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
