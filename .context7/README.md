# AstroLiana Context Documentation

This directory contains the MCP (Model Context Protocol) server configuration and comprehensive project documentation.

## 📚 Documentation Index

### Getting Started

- **[Quick Start Guide](quick-start.md)** - Start here! Quick setup and common tasks
- **[MCP Usage Guide](mcp-usage.md)** - How to use the MCP server effectively

### Project Information

- **[Project Overview](overview.md)** - Vision, goals, and project description
- **[Architecture](architecture.md)** - Technical architecture and patterns
- **[Design System](design-system.md)** - Colors, typography, animations, components
- **[Coding Standards](coding-standards.md)** - Best practices and conventions

### Configuration

- **[config.json](config.json)** - Main MCP configuration file (do not edit manually unless necessary)

## 🚀 Quick Links

### Start Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start MCP server
npm run mcp:dev
```

### Key Information

**Tech Stack:**
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + Framer Motion
- Forms: React Hook Form + Zod
- Integrations: Resend, Telegram, PostHog, Plausible, Mapbox

**Design System:**
- Primary: `#2D2B55` (mystical purple)
- Background: `#F9F6EE` (warm beige)
- Accent: `#D4AF37` (golden)
- Headings: Cormorant Garamond
- Body: Inter

**Standards:**
- Accessibility: WCAG 2.2 Level AA
- Performance: Lighthouse ≥ 95
- Code Style: TypeScript strict mode, functional components

## 📖 Documentation by Topic

### For New Developers

1. Read [Quick Start Guide](quick-start.md) - Set up your environment
2. Review [Overview](overview.md) - Understand project goals
3. Study [Architecture](architecture.md) - Learn the structure
4. Check [Coding Standards](coding-standards.md) - Follow best practices

### For Designers

1. Review [Design System](design-system.md) - Colors, typography, components
2. Check [Overview](overview.md) - Design philosophy and principles

### For DevOps/Infrastructure

1. Check main [README.md](../README.md) - Deployment instructions
2. Review [Architecture](architecture.md) - Infrastructure requirements

### For Product/Business

1. Read [Overview](overview.md) - Product vision and roadmap
2. Check [CHANGELOG.md](../CHANGELOG.md) - What's been built

## 🔧 MCP Server

The MCP server provides contextual information about the project.

### Start Server

```bash
npm run mcp:dev
```

### Query Context

```javascript
// Get all context
getContext()

// Get specific info
getContext('project.name')              // "AstroLiana"
getContext('techStack.framework')       // "Next.js 14"
getContext('designSystem.colors.primary') // "#2D2B55"
```

### Use Cases

- AI-assisted development
- Developer onboarding
- Documentation generation
- Code quality checks
- Consistency enforcement

Full details in [MCP Usage Guide](mcp-usage.md)

## 📝 Updating Documentation

### When to Update

Update documentation when you:
- Change architecture patterns
- Add/remove technologies
- Update design system
- Modify coding standards
- Add new features

### How to Update

1. Edit relevant `.md` files or `config.json`
2. Update `CHANGELOG.md` with changes
3. Commit with descriptive message: `docs: update design system colors`
4. Restart MCP server if config changed

### Documentation Standards

- Use clear, concise language
- Include code examples
- Keep information current
- Link between related docs
- Use proper Markdown formatting

## 🔍 Finding Information

### Quick Search

Use grep to search documentation:

```bash
# Find all mentions of "TypeScript"
grep -r "TypeScript" .context7/

# Find color definitions
grep -r "#2D2B55" .context7/

# Find API information
grep -r "API" .context7/
```

### MCP Query

Use MCP server to query structured information:

```javascript
// Find framework
getContext('techStack.framework')

// Find colors
getContext('designSystem.colors')

// Find standards
getContext('codingStandards')
```

## 📋 Documentation Structure

```
.context7/
├── README.md              # This file - Documentation index
├── config.json            # MCP configuration (structured data)
├── overview.md            # Project vision and goals
├── architecture.md        # Technical architecture
├── design-system.md       # Design system guide
├── coding-standards.md    # Coding best practices
├── quick-start.md         # Getting started guide
└── mcp-usage.md          # MCP server usage guide
```

## 🎯 Documentation Goals

1. **Onboarding** - New developers productive quickly
2. **Consistency** - Everyone follows same standards
3. **Knowledge Sharing** - Collective team knowledge documented
4. **AI Integration** - Machine-readable project context
5. **Quality** - Maintain high code and design quality

## 🤝 Contributing to Documentation

### Before Making Changes

1. Check existing documentation
2. Understand current standards
3. Discuss major changes with team

### Making Changes

1. Edit relevant files
2. Follow existing format
3. Include examples
4. Update related documentation
5. Test MCP server if config changed

### Review Process

1. Create pull request
2. Request documentation review
3. Address feedback
4. Merge and update CHANGELOG

## 📞 Getting Help

### Documentation Questions

1. Check this README for overview
2. Search specific documentation files
3. Query MCP server for structured info
4. Ask team members

### Technical Questions

1. Review [Coding Standards](coding-standards.md)
2. Check [Architecture](architecture.md)
3. Query MCP for specific information
4. Consult team lead

### Design Questions

1. Review [Design System](design-system.md)
2. Check Figma/design files (if available)
3. Consult design team

## 🔗 External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## ✅ Documentation Checklist

When starting a new task:
- [ ] Read relevant documentation
- [ ] Query MCP for context
- [ ] Follow coding standards
- [ ] Apply design system
- [ ] Update docs if needed

## 📊 Documentation Metrics

We maintain documentation quality by ensuring:
- ✅ All major features documented
- ✅ Code examples included
- ✅ Up-to-date with current implementation
- ✅ Clear and concise writing
- ✅ Proper structure and navigation

---

**Last Updated:** 2024-10-23

**Documentation Version:** 1.0.0

**Maintained by:** AstroLiana Development Team

For questions or suggestions about documentation, please contact the team lead.
