# MCP Server Usage Guide

## What is MCP?

MCP (Model Context Protocol) is a system that provides contextual information about your project to AI assistants, development tools, and other services. The MCP server for AstroLiana contains comprehensive information about:

- Project structure and architecture
- Technology stack and tools
- Design system (colors, typography, animations)
- Coding standards and best practices
- Accessibility and performance requirements
- Development workflows

## Starting the MCP Server

```bash
npm run mcp:dev
# or
yarn mcp:dev
# or directly
node mcp-server.js
```

## Querying Context

The MCP server provides a global `getContext()` function that you can use to retrieve project information.

### Get All Context

```javascript
getContext()
```

Returns the complete context object with all project information.

### Get Specific Sections

```javascript
// Project information
getContext('project')
getContext('project.name')          // "AstroLiana"
getContext('project.framework')     // "Next.js 14"

// Technology stack
getContext('techStack')
getContext('techStack.framework')   // "Next.js 14"
getContext('techStack.language')    // "TypeScript"
getContext('techStack.styling')     // { primary: "Tailwind CSS", animations: "Framer Motion" }

// Design system
getContext('designSystem')
getContext('designSystem.colors')
getContext('designSystem.colors.primary')      // "#2D2B55"
getContext('designSystem.colors.background')   // "#F9F6EE"
getContext('designSystem.colors.accent')       // "#D4AF37"

getContext('designSystem.typography')
getContext('designSystem.typography.headings') // { fontFamily: "Cormorant Garamond", ... }

// Architecture
getContext('architecture')
getContext('architecture.pattern')             // "Feature-based modular architecture"
getContext('architecture.componentStructure')  // Component hierarchy info

// Coding standards
getContext('codingStandards')
getContext('codingStandards.react')
getContext('codingStandards.naming')
getContext('codingStandards.typescript')

// Accessibility
getContext('accessibility')
getContext('accessibility.standard')           // "WCAG 2.2 Level AA"

// Performance
getContext('performance')
getContext('performance.targets')
```

## Context Structure

### Project Section

```json
{
  "name": "AstroLiana",
  "description": "Astrology consultation and services platform",
  "version": "1.0.0",
  "type": "web-application",
  "framework": "Next.js 14",
  "router": "App Router"
}
```

### Tech Stack Section

```json
{
  "framework": "Next.js 14",
  "router": "App Router",
  "language": "TypeScript",
  "styling": {
    "primary": "Tailwind CSS",
    "animations": "Framer Motion"
  },
  "forms": {
    "library": "React Hook Form",
    "validation": "Zod"
  },
  "integrations": {
    "email": "Resend",
    "messaging": "Telegram Bot API",
    "analytics": ["PostHog", "Plausible"],
    "maps": "Mapbox Geocoding"
  }
}
```

### Design System Section

```json
{
  "colors": {
    "primary": "#2D2B55",
    "background": "#F9F6EE",
    "accent": "#D4AF37"
  },
  "typography": {
    "headings": {
      "fontFamily": "Cormorant Garamond",
      "weights": [400, 600, 700]
    },
    "body": {
      "fontFamily": "Inter",
      "weights": [400, 500, 600, 700]
    }
  },
  "animations": {
    "library": "Framer Motion",
    "timing": {
      "fast": "150ms",
      "normal": "300ms",
      "slow": "500ms"
    }
  }
}
```

## Use Cases

### 1. AI-Assisted Development

When working with AI coding assistants, reference the MCP server:

"Use the project context from MCP to create a new component following our design system."

The AI can query:
- Design system colors and typography
- Component patterns and structure
- Coding standards and naming conventions

### 2. Onboarding New Developers

New team members can quickly understand:

```javascript
// What framework are we using?
getContext('techStack.framework')

// What are our color codes?
getContext('designSystem.colors')

// What's our component naming convention?
getContext('codingStandards.naming.components')

// What accessibility standard do we follow?
getContext('accessibility.standard')
```

### 3. Documentation Generation

Generate documentation from context:

```javascript
const colors = getContext('designSystem.colors');
// Generate color palette documentation

const techStack = getContext('techStack');
// Generate tech stack documentation
```

### 4. Code Quality Checks

Validate code against standards:

```javascript
const standards = getContext('codingStandards');
// Check if code follows naming conventions
// Verify component structure
// Validate accessibility requirements
```

## Example Workflows

### Creating a New Component

```javascript
// 1. Get design system info
const colors = getContext('designSystem.colors');
const typography = getContext('designSystem.typography');

// 2. Check component standards
const componentStandards = getContext('codingStandards.react.components');

// 3. Create component following standards
// - Use functional components
// - Type all props
// - Follow naming conventions
// - Apply design system colors
```

### Setting Up a Form

```javascript
// 1. Get form requirements
const formConfig = getContext('techStack.forms');
// Returns: { library: "React Hook Form", validation: "Zod" }

// 2. Get validation standards
const validationStandards = getContext('codingStandards.errorHandling');

// 3. Implement form with React Hook Form + Zod
```

### Styling a Component

```javascript
// 1. Get color palette
const colors = getContext('designSystem.colors');
// primary: "#2D2B55", background: "#F9F6EE", accent: "#D4AF37"

// 2. Get typography
const fonts = getContext('designSystem.typography');
// headings: "Cormorant Garamond", body: "Inter"

// 3. Get animation timing
const timing = getContext('designSystem.animations.timing');
// fast: "150ms", normal: "300ms", slow: "500ms"

// 4. Apply in Tailwind classes
```

## Integration with IDEs

### VS Code

You can create custom VS Code tasks to query MCP:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Query MCP Context",
      "type": "shell",
      "command": "node mcp-server.js"
    }
  ]
}
```

### Custom Scripts

Create helper scripts to query context:

```javascript
// scripts/get-context.js
const MCPServer = require('./mcp-server');
const server = new MCPServer();

const query = process.argv[2];
const result = server.getContext(query);

console.log(JSON.stringify(result, null, 2));
```

Usage:
```bash
node scripts/get-context.js "designSystem.colors"
```

## Updating Context

### Modifying Configuration

Edit `.context7/config.json` to update project context:

```json
{
  "project": {
    "name": "AstroLiana",
    "version": "1.1.0"  // Update version
  }
}
```

### Adding New Sections

Add new top-level sections to config.json:

```json
{
  "deployment": {
    "platform": "Vercel",
    "environment": "production"
  }
}
```

### Restart Server

After changes, restart the MCP server:

```bash
# Stop server (Ctrl+C)
# Start again
npm run mcp:dev
```

## Best Practices

### 1. Keep Context Updated

Always update context when:
- Adding new technologies
- Changing design system
- Updating coding standards
- Modifying architecture

### 2. Document Changes

Add notes to CHANGELOG.md when updating context:

```markdown
### Changed
- Updated design system colors in MCP config
- Added new coding standards for forms
```

### 3. Query Before Creating

Before creating new components or features:
1. Query relevant context
2. Follow established patterns
3. Maintain consistency

### 4. Share Context with Team

Ensure team members know:
- How to start MCP server
- How to query context
- When to update context

## Troubleshooting

### Server Won't Start

```bash
# Check if config file exists
ls .context7/config.json

# Validate JSON syntax
node -e "require('./.context7/config.json')"
```

### Invalid Query

```javascript
// Returns null if path doesn't exist
getContext('nonexistent.path')  // null

// Always check result
const value = getContext('some.path');
if (value) {
  // Use value
} else {
  // Path doesn't exist
}
```

### Performance Issues

MCP server is lightweight and fast. If experiencing issues:
1. Check config.json size (should be < 1MB)
2. Restart server
3. Clear node_modules and reinstall

## Advanced Usage

### Programmatic Access

```javascript
const MCPServer = require('./mcp-server');
const server = new MCPServer();

// Get context in your own scripts
const colors = server.getContext('designSystem.colors');

// Use in build scripts, tests, etc.
```

### Context Validation

Create a validation script:

```javascript
// scripts/validate-context.js
const MCPServer = require('./mcp-server');
const server = new MCPServer();

const required = [
  'project.name',
  'techStack.framework',
  'designSystem.colors.primary',
];

required.forEach(path => {
  const value = server.getContext(path);
  if (!value) {
    console.error(`Missing required context: ${path}`);
    process.exit(1);
  }
});

console.log('Context validation passed!');
```

## Resources

- [Main Documentation](../README.md)
- [Architecture](.context7/architecture.md)
- [Design System](.context7/design-system.md)
- [Coding Standards](.context7/coding-standards.md)
- [Quick Start](.context7/quick-start.md)

## Support

For issues or questions about MCP server:
1. Check this documentation
2. Review config.json structure
3. Consult team lead
4. Check MCP server logs

---

The MCP server is a powerful tool for maintaining consistency and sharing knowledge across your development team. Use it actively to ensure everyone is aligned on project standards and best practices.
