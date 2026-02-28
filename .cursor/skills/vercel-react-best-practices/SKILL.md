---
name: vercel-react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns. Triggers on tasks involving React components, Next.js pages, data fetching, bundle optimization, or performance improvements.
---

# Vercel React Best Practices

Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Contains 45 rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.

## When to Apply

Reference these guidelines when:
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## Quick Reference

### 1. Eliminating Waterfalls (CRITICAL)

- `async-defer-await` - Move await into branches where actually used
- `async-parallel` - Use Promise.all() for independent operations
- `async-dependencies` - Use better-all for partial dependencies
- `async-api-routes` - Start promises early, await late in API routes
- `async-suspense-boundaries` - Use Suspense to stream content

### 2. Bundle Size Optimization (CRITICAL)

- `bundle-barrel-imports` - Import directly, avoid barrel files
- `bundle-dynamic-imports` - Use next/dynamic for heavy components
- `bundle-defer-third-party` - Load analytics/logging after hydration
- `bundle-conditional` - Load modules only when feature is activated
- `bundle-preload` - Preload on hover/focus for perceived speed

### 3. Server-Side Performance (HIGH)

- `server-cache-react` - Use React.cache() for per-request deduplication
- `server-cache-lru` - Use LRU cache for cross-request caching
- `server-serialization` - Minimize data passed to client components
- `server-parallel-fetching` - Restructure components to parallelize fetches
- `server-after-nonblocking` - Use after() for non-blocking operations

### 4. Client-Side Data Fetching (MEDIUM-HIGH)

- `client-swr-dedup` - Use SWR for automatic request deduplication
- `client-event-listeners` - Deduplicate global event listeners

### 5. Re-render Optimization (MEDIUM)

- `rerender-defer-reads` - Don't subscribe to state only used in callbacks
- `rerender-memo` - Extract expensive work into memoized components
- `rerender-dependencies` - Use primitive dependencies in effects
- `rerender-derived-state` - Subscribe to derived booleans, not raw values
- `rerender-functional-setstate` - Use functional setState for stable callbacks
- `rerender-lazy-state-init` - Pass function to useState for expensive values
- `rerender-transitions` - Use startTransition for non-urgent updates

### 6. Rendering Performance (MEDIUM)

- `rendering-animate-svg-wrapper` - Animate div wrapper, not SVG element
- `rendering-content-visibility` - Use content-visibility for long lists
- `rendering-hoist-jsx` - Extract static JSX outside components
- `rendering-svg-precision` - Reduce SVG coordinate precision
- `rendering-hydration-no-flicker` - Use inline script for client-only data
- `rendering-activity` - Use Activity component for show/hide
- `rendering-conditional-render` - Use ternary, not && for conditionals

### 7. JavaScript Performance (LOW-MEDIUM)

- `js-batch-dom-css` - Group CSS changes via classes or cssText
- `js-index-maps` - Build Map for repeated lookups
- `js-cache-property-access` - Cache object properties in loops
- `js-cache-function-results` - Cache function results in module-level Map
- `js-cache-storage` - Cache localStorage/sessionStorage reads
- `js-combine-iterations` - Combine multiple filter/map into one loop
- `js-length-check-first` - Check array length before expensive comparison
- `js-early-exit` - Return early from functions
- `js-hoist-regexp` - Hoist RegExp creation outside loops
- `js-min-max-loop` - Use loop for min/max instead of sort
- `js-set-map-lookups` - Use Set/Map for O(1) lookups
- `js-tosorted-immutable` - Use toSorted() for immutability

### 8. Advanced Patterns (LOW)

- `advanced-event-handler-refs` - Store event handlers in refs
- `advanced-use-latest` - useLatest for stable callback refs

## Implementation Guidelines

### Priority-Based Application

When reviewing or refactoring code, apply rules in priority order:

1. **First**: Address CRITICAL issues (waterfalls, bundle size)
2. **Second**: Optimize HIGH impact areas (server-side performance)
3. **Third**: Improve MEDIUM impact patterns (re-renders, rendering)
4. **Last**: Fine-tune LOW impact optimizations (JS performance, advanced patterns)

### Common Patterns

#### Eliminating Waterfalls

```jsx
// ❌ Bad: Sequential awaits create waterfall
async function Component() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  const comments = await fetchComments(posts[0].id);
  return <div>...</div>;
}

// ✅ Good: Parallel independent operations
async function Component() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
  return <div>...</div>;
}
```

#### Bundle Optimization

```jsx
// ❌ Bad: Barrel imports pull in entire module
import { Button, Card, Modal } from '@/components';

// ✅ Good: Direct imports
import Button from '@/components/Button';
import Card from '@/components/Card';
import Modal from '@/components/Modal';

// ✅ Good: Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

#### Re-render Optimization

```jsx
// ❌ Bad: Unnecessary re-renders
function Component({ items }) {
  const [filter, setFilter] = useState('');
  const filtered = items.filter(item => item.name.includes(filter));
  
  return (
    <div>
      {filtered.map(item => <ExpensiveItem key={item.id} data={item} />)}
    </div>
  );
}

// ✅ Good: Memoize expensive work
const ExpensiveList = memo(function ExpensiveList({ items }) {
  return items.map(item => <ExpensiveItem key={item.id} data={item} />);
});

function Component({ items }) {
  const [filter, setFilter] = useState('');
  const filtered = useMemo(
    () => items.filter(item => item.name.includes(filter)),
    [items, filter]
  );
  
  return <ExpensiveList items={filtered} />;
}
```

#### Server-Side Caching

```jsx
// ✅ Good: Use React.cache() for request deduplication
import { cache } from 'react';

const fetchUser = cache(async (id) => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
});

// Multiple calls in same request are deduplicated
async function Page() {
  const user1 = await fetchUser(1); // Fetches
  const user2 = await fetchUser(1); // Uses cache
  return <div>...</div>;
}
```

## Code Review Checklist

When reviewing React/Next.js code, check:

- [ ] No sequential awaits for independent operations
- [ ] Direct imports instead of barrel imports
- [ ] Heavy components use dynamic imports
- [ ] Server components use React.cache() for deduplication
- [ ] Expensive computations are memoized
- [ ] State subscriptions are minimal (only what's needed)
- [ ] Conditional rendering uses ternary, not &&
- [ ] Event listeners are deduplicated
- [ ] Third-party scripts load after hydration

## Additional Resources

For detailed rule explanations and examples:
- Individual rule files: `rules/[rule-name].md`
- Complete guide: `AGENTS.md`
- Vercel Engineering Blog: https://vercel.com/blog
