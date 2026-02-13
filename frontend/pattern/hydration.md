
# Hydration

## Definition

it’s the process which JavaScript executes, reconciles, and makes interactive the HTML that is already in the DOM via server-side rendering (SSR).

## Process

```mermaid
sequenceDiagram
    participant Server
    participant Browser
    participant Framework
    
    Server->>Browser: 1. Static HTML content
    Browser->>Browser: 2. Display static content
    Browser->>Browser: 3. Download JS bundle
    Framework->>Browser: 4. Parse component tree
    Framework->>Browser: 5. Attach event listeners
    Framework->>Browser: 6. Reconcile state
    Browser->>Browser: 7. App becomes interactive
    
    Note over Browser: Time to Interactive (TTI)
```

## Strategies

```mermaid
graph TD
    A[Hydration Strategies] --> B[Full Hydration]
    A --> C[Partial Hydration]
    A --> D[Progressive Hydration]
    
    B --> B1[Hydrate entire app]
    B --> B2[React, Vue default]
    
    C --> C1[Hydrate specific components]
    C --> C2[Astro, Fresh]
    
    D --> D1[Hydrate based on viewport]
    D --> D2[Lazy hydration]
```

```ts
// Progressive Hydration with Intersection Observer
import { lazy, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function ProgressiveHydration() {
    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    });
    
    return (
        <div ref={ref}>
            {inView ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <HeavyComponent />
                </Suspense>
            ) : (
                <div>Placeholder content</div>
            )}
        </div>
    );
}
```
