# AstroLiana Project Overview

## Project Description

AstroLiana is a modern web application for astrology consultations and services. The platform provides users with personalized astrological readings, birth chart calculations, and direct consultation booking with astrologers.

## Vision

Create an elegant, accessible, and high-performance platform that brings ancient astrological wisdom into the modern digital age with exceptional user experience.

## Target Audience

- Individuals interested in astrology and horoscopes
- People seeking personalized astrological consultations
- Users looking for birth chart analysis
- Spiritual and self-development enthusiasts

## Key Features

### Phase 1 (Current)
- Landing page with service information
- Contact form for consultation requests
- Birth chart calculator
- Service descriptions and pricing
- Blog/articles about astrology

### Phase 2 (Planned)
- User authentication and profiles
- Online booking system
- Payment integration
- Virtual consultation rooms
- Personalized user dashboard
- Subscription plans

### Phase 3 (Future)
- Mobile app (React Native)
- Advanced chart analysis tools
- Community features
- Marketplace for astrology products
- Multi-language support

## Technical Approach

### Server-First Architecture

Leveraging Next.js 14 App Router with Server Components as the default:
- Faster initial page loads
- Better SEO
- Reduced client-side JavaScript
- Direct database access without API layer

### Progressive Enhancement

- Works without JavaScript for core features
- Enhanced with client-side interactivity where beneficial
- Responsive design for all devices
- Offline capabilities (future)

### Performance First

- Target Lighthouse score: ≥ 95 across all metrics
- Image optimization with Next.js Image
- Font optimization with next/font
- Efficient caching strategies
- Code splitting and lazy loading

### Accessibility as Priority

- WCAG 2.2 Level AA compliance
- Semantic HTML throughout
- Full keyboard navigation
- Screen reader support
- High contrast ratios
- Respect user motion preferences

## Design Philosophy

### Visual Identity

**Mystical yet Modern**: Combining the mystical nature of astrology with clean, modern web design.

**Color Psychology**:
- **Primary (#2D2B55)**: Deep purple representing mystery, spirituality, and wisdom
- **Background (#F9F6EE)**: Warm beige creating a welcoming, comfortable atmosphere
- **Accent (#D4AF37)**: Gold highlighting premium quality and celestial themes

### Typography Hierarchy

- **Cormorant Garamond**: Elegant serif for headings, conveying sophistication
- **Inter**: Clean sans-serif for body text, ensuring readability

### Motion Design

Subtle animations that:
- Guide user attention
- Provide feedback
- Create smooth transitions
- Don't distract or overwhelm
- Respect accessibility (prefers-reduced-motion)

## Development Principles

### Code Quality

1. **Type Safety**: Strict TypeScript for catching errors early
2. **Component Reusability**: DRY principle, atomic design
3. **Testing**: Comprehensive test coverage
4. **Documentation**: Clear code comments and external docs

### Performance

1. **Bundle Size**: Monitor and minimize JavaScript payload
2. **Loading Speed**: Optimize all assets
3. **Runtime Performance**: Efficient rendering and updates
4. **Network Efficiency**: Minimize requests, effective caching

### Maintainability

1. **Consistent Structure**: Clear file organization
2. **Naming Conventions**: Predictable and descriptive
3. **Code Style**: Enforced with linters and formatters
4. **Git Workflow**: Clear branch strategy and commit messages

### User Experience

1. **Intuitive Navigation**: Users should never feel lost
2. **Fast Response**: Immediate feedback to user actions
3. **Error Handling**: Graceful failure with helpful messages
4. **Loading States**: Always show progress

## Integration Strategy

### Email (Resend)

Used for:
- Consultation request notifications
- Booking confirmations
- Newsletter delivery
- Transactional emails

### Telegram Bot

Used for:
- Quick consultation requests
- Admin notifications
- Customer support
- Automated reminders

### Analytics

**PostHog**: Product analytics
- User behavior tracking
- Feature usage analysis
- Funnel analysis
- A/B testing

**Plausible**: Web analytics
- Privacy-friendly
- GDPR compliant
- Page view tracking
- Traffic sources

### Mapbox Geocoding

Used for:
- Birth location input
- Coordinate conversion for chart calculations
- Location-based services

## Security Considerations

1. **Environment Variables**: All secrets in .env.local
2. **Input Validation**: Zod schemas for all user inputs
3. **CSRF Protection**: Built into Next.js Server Actions
4. **Rate Limiting**: Prevent abuse of API endpoints
5. **Content Security Policy**: XSS protection
6. **HTTPS Only**: Force secure connections in production

## Deployment Strategy

### Hosting

**Primary**: Vercel
- Optimal Next.js integration
- Automatic deployments
- Preview deployments for PRs
- Edge network for global performance

**Backup**: Self-hosted Docker containers

### CI/CD Pipeline

1. **Push to branch** → Runs linting and tests
2. **PR created** → Creates preview deployment
3. **Merge to main** → Deploys to production
4. **Post-deploy** → Runs smoke tests

### Environment Management

- **Development**: Local environment with hot reload
- **Staging**: Preview deployments on Vercel
- **Production**: Main branch on Vercel with custom domain

## Monitoring and Maintenance

### Error Tracking

- Client-side errors logged to error tracking service
- Server-side errors logged with context
- User-reported issues tracked in ticketing system

### Performance Monitoring

- Lighthouse CI for automated performance checks
- Real User Monitoring (RUM) with analytics
- Core Web Vitals tracking
- Bundle size monitoring

### Updates and Dependencies

- Weekly dependency updates
- Security patches applied immediately
- Major version upgrades planned and tested
- Changelog maintained for all releases

## Team Workflow

### Development Process

1. **Planning**: Feature definition and technical design
2. **Development**: Feature branch with regular commits
3. **Review**: Code review by peer developer
4. **Testing**: Manual and automated testing
5. **Deployment**: Merge to main and deploy
6. **Monitoring**: Watch for errors and performance issues

### Communication

- Stand-ups: Daily sync (if team)
- Retrospectives: Weekly/bi-weekly improvements
- Documentation: Keep all docs up to date
- Knowledge Sharing: Internal tech talks and docs

## Future Considerations

### Scalability

- Database optimization for growing user base
- CDN for static assets
- Edge computing for global performance
- Microservices for complex features (if needed)

### Feature Expansion

- Mobile native apps
- Real-time features (WebSocket)
- Advanced chart interpretation AI
- Social features and community
- Marketplace integration

### Internationalization

- Multi-language support
- Localized content
- Regional astrology systems
- Currency and timezone handling

## Success Metrics

### Technical Metrics

- Lighthouse scores ≥ 95
- Test coverage ≥ 80%
- Zero critical security vulnerabilities
- Deployment frequency: Multiple times per week
- Mean time to recovery (MTTR): < 1 hour

### Business Metrics

- User engagement rates
- Consultation booking conversions
- User retention rates
- Customer satisfaction scores
- Revenue growth

## Resources

- [Technical Architecture](.context7/architecture.md)
- [Design System](.context7/design-system.md)
- [Coding Standards](.context7/coding-standards.md)
- [Main README](../README.md)

---

This overview provides context for the entire AstroLiana project. For specific technical details, refer to the linked documentation files.
