# Layout System Documentation

## Overview

This project has been reconfigured to use a layout-based template system. All views now inherit from a main layout that includes common elements like header, sidebar, navbar, and footer.

## Directory Structure

```
views/
├── layouts/
│   └── main.ejs          # Main layout template
├── partials/
│   ├── navbar.ejs        # Top navigation bar
│   ├── sidebar.ejs       # Side navigation menu
│   └── footer.ejs        # Footer section
├── admin/
│   ├── index-new.ejs     # Example admin dashboard (using layout)
│   └── ...               # Other admin pages
└── example.ejs           # Example page using layout
```

## How to Use

### Creating a New Page with Layout

1. Create a new `.ejs` file in the `views` folder (or a subfolder like `admin/`)

2. At the top of your file, set page variables:
```ejs
<%
// Set page title (shown in browser tab and navbar)
var pageTitle = 'My Page Title';

// Set current page for sidebar highlighting
var currentPage = 'my-page';

// Optional: Add additional stylesheets
var additionalStyles = ['/css/custom.css'];

// Optional: Add additional scripts
var additionalScripts = ['/js/custom.js'];
%>
```

3. Add your content directly - the layout will automatically wrap it:
```ejs
<div class="row">
    <div class="col-12">
        <div class="bg-light rounded p-4">
            <h1>Welcome to My Page</h1>
            <p>Your content here...</p>
        </div>
    </div>
</div>
```

### Complete Example

```ejs
<%
var pageTitle = 'Dashboard';
var currentPage = 'dashboard';
%>

<div class="bg-light text-center rounded p-4">
    <h2>Dashboard</h2>
    <div class="row g-4 mt-4">
        <div class="col-sm-6 col-xl-3">
            <div class="bg-white rounded d-flex align-items-center justify-content-between p-4">
                <i class="fa fa-chart-line fa-3x text-primary"></i>
                <div class="ms-3">
                    <p class="mb-2">Today Sale</p>
                    <h6 class="mb-0">$1234</h6>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Available Layout Features

### Page Title
```ejs
<% var pageTitle = 'Page Title'; %>
```
Changes the browser tab title and can be used in navbar customization.

### Current Page Variable
```ejs
<% var currentPage = 'dashboard'; %>
```
Used to highlight the active menu item in the sidebar. Supported values:
- `'dashboard'` - Dashboard
- `'bien-tap-lich'` - Biên tập Lịch
- `'example'` - Example page

### Additional Stylesheets
```ejs
<% var additionalStyles = ['/css/custom.css', '/css/other.css']; %>
```
Include additional CSS files specific to your page.

### Additional Scripts
```ejs
<% var additionalScripts = ['/js/custom.js', '/js/other.js']; %>
```
Include additional JavaScript files specific to your page.

## Layout Components

### Main Layout (`layouts/main.ejs`)
- Contains the HTML structure (DOCTYPE, head, body)
- Includes all base stylesheets and scripts
- Integrates sidebar, navbar, and footer partials
- Displays the page content in the main container

### Sidebar (`partials/sidebar.ejs`)
- Left navigation menu
- User profile section
- Links to different sections
- Uses `currentPage` variable to highlight active link

### Navbar (`partials/navbar.ejs`)
- Top navigation bar
- Search functionality
- Message/Notification dropdowns
- User profile dropdown

### Footer (`partials/footer.ejs`)
- Footer copyright information
- Link attribution

## Default Variables

### User Information
Pass user data when rendering views:
```javascript
// In your route handler
reply.view('page', {
    user: {
        name: 'John Doe',
        role: 'Admin'
    },
    // ... other data
});
```

The sidebar will display the logged-in user's name and role.

## Migration from Old System

Old views that had complete HTML structure can be simplified:

### Before (Old System)
```ejs
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>My Page</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <!-- ... more links ... -->
</head>
<body>
    <div class="sidebar">
        <!-- sidebar code -->
    </div>
    <div class="content">
        <nav class="navbar">
            <!-- navbar code -->
        </nav>
        <!-- Your page content -->
    </div>
    <script src="/js/bootstrap.js"></script>
    <!-- ... more scripts ... -->
</body>
</html>
```

### After (New Layout System)
```ejs
<%
var pageTitle = 'My Page';
var currentPage = 'my-page';
%>

<!-- Just your content here -->
<div class="your-content">
    <!-- Your page content -->
</div>
```

## Modifying Partials

To customize sidebar links or navbar items:

1. **Edit Sidebar**: `views/partials/sidebar.ejs`
   - Modify navigation links
   - Update user profile section

2. **Edit Navbar**: `views/partials/navbar.ejs`
   - Customize dropdown menus
   - Add/remove icons

3. **Edit Footer**: `views/partials/footer.ejs`
   - Update copyright info
   - Add links

## Best Practices

1. **Keep it DRY**: Use partials for repeated components
2. **Page Variables**: Always set `pageTitle` and `currentPage` at the top
3. **Static Files**: Use `/` prefix for all CSS/JS file paths (e.g., `/css/style.css`)
4. **Organize Content**: Use Bootstrap's grid system for layout
5. **Data Passing**: Pass required data from routes to views

## Example Route Handler

```javascript
module.exports = async function(fastify, opts) {
    fastify.get('/my-page', async (request, reply) => {
        try {
            const data = await fetchSomeData();
            
            return reply.view('path/to/mypage.ejs', {
                pageTitle: 'My Page',
                currentPage: 'my-page',
                data: data,
                user: request.user // from auth
            });
        } catch (error) {
            reply.status(500).send('Error loading page');
        }
    });
};
```

## Troubleshooting

### Layout not applying
- Ensure your view file doesn't include `<!DOCTYPE html>` or `<html>` tags
- Check that `app.js` has the layout configured correctly

### Sidebar not highlighting
- Make sure `currentPage` variable matches one of the defined values

### Styles/Scripts not loading
- Verify paths start with `/` (e.g., `/css/style.css`)
- Check that static files are in the `public/` directory

### Partials not showing
- Verify include paths are relative to the view file location
- Check file names and extensions are correct
