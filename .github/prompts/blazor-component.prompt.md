---
name: create-blazor-component
description: Scaffold a new Blazor component with proper structure, co-located CSS, optional JavaScript interop, and responsive design patterns
version: 1.0.0
---

# Create Blazor Component

Generate a new Blazor component following project conventions with co-located assets and responsive design.

## Parameters

- **Component Name** (required): Name of the component (PascalCase)
- **Type** (required): `page` (routable with @page) or `layout` (inherits LayoutComponentBase) or `component` (reusable)
- **Features**: Select one or more:
  - `stateful` - Include private fields and event handlers
  - `async` - Include OnInitializedAsync() lifecycle method
  - `responsive` - Include co-located CSS with mobile-first media queries
  - `js-interop` - Include co-located .razor.js module
- **Route** (for page type): URL path (e.g., `/products`)

## Instructions

1. **Gather Parameters**
   - Ask user for component name, type, and desired features
   - Validate component name is PascalCase
   - For page type, confirm route path

2. **Determine Location**
   - Pages: `Components/Pages/{ComponentName}.razor`
   - Layouts: `Components/Layout/{ComponentName}.razor`
   - Components: `Components/{ComponentName}.razor`

3. **Generate Component File**
   - Add `@page` directive with route (pages only)
   - Add `@inherits LayoutComponentBase` (layouts only)
   - Use `@rendermode="InteractiveServer"` (pages and components)
   - Include `<PageTitle>` for pages
   - Add proper structure based on selected features

4. **Create Co-located CSS** (if responsive feature selected)
   - Create `{ComponentName}.razor.css` in same directory
   - Use mobile-first approach with default mobile styles
   - Add media query at `min-width: 641px` for desktop
   - Include `.desktop-only` class if needed

5. **Create JavaScript Module** (if js-interop feature selected)
   - Create `{ComponentName}.razor.js` in same directory
   - Export functions that the Razor component can call
   - Follow pattern from `ReconnectModal.razor.js`

6. **Update Imports** (if needed)
   - Verify `_Imports.razor` includes necessary namespaces

## Example Output

### Stateful Page Component with Responsive Design

**File**: `Components/Pages/Products.razor`
```razor
@page "/products"
@rendermode InteractiveServer

<PageTitle>Products</PageTitle>

<h1>Products</h1>

<button class="btn btn-primary" @onclick="LoadProducts">Load Products</button>

@if (products == null)
{
    <p><em>Click the button to load products...</em></p>
}
else if (products.Length == 0)
{
    <p><em>No products found.</em></p>
}
else
{
    <div class="products-grid">
        @foreach (var product in products)
        {
            <div class="product-card">
                <h3>@product.Name</h3>
                <p class="price">@product.Price.ToString("C")</p>
                <p class="desktop-only">@product.Description</p>
            </div>
        }
    </div>
}

@code {
    private Product[]? products;

    private void LoadProducts()
    {
        products = Enumerable.Range(1, 10).Select(index => new Product
        {
            Name = $"Product {index}",
            Price = Random.Shared.Next(10, 100),
            Description = $"Description for product {index}"
        }).ToArray();
    }

    private class Product
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
```

**File**: `Components/Pages/Products.razor.css`
```css
/* Mobile-first styles */
.products-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;
}

.product-card {
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
    padding: 1rem;
}

.price {
    font-size: 1.25rem;
    font-weight: bold;
    color: #0d6efd;
}

.desktop-only {
    display: none;
}

/* Desktop and tablet styles */
@media (min-width: 641px) {
    .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
    
    .desktop-only {
        display: block;
    }
}
```

## Validation

- Confirm file locations follow project structure
- Verify PascalCase for component name, kebab-case for CSS classes
- Check nullable reference types (`?` for nullable references)
- For pages, ensure route is unique and properly formatted
- Test responsive CSS at 640px and 641px breakpoints
