# Angular Patterns for Modern Applications

> **Purpose:** Provide practical defaults for modern Angular applications.
> **Primary official sources:** [Angular Overview](https://angular.dev/overview) · [Version Compatibility](https://angular.dev/reference/versions) · [Angular CLI](https://angular.dev/cli)

## Project Convention Decision Rule

Before applying this guidance, verify the installed versions, local rules, existing abstractions, configuration, and tests. Preserve a valid established project convention; do not replace it only because another documented approach is also valid. Use official sources to verify API behavior, compatibility, constraints, and migrations. Recommend a change only when the developer requests it or evidence shows the current approach is incompatible, unsafe, deprecated, broken, or responsible for a verified issue.

Practical defaults for current Angular applications. Prefer APIs documented at [angular.dev](https://angular.dev/) and verify framework, CLI, TypeScript, and RxJS support before an upgrade.

## Contents

- [1. Standalone composition and providers](#1-standalone-composition-and-providers)
- [2. Dependency injection scopes](#2-dependency-injection-scopes)
- [3. Signals and RxJS boundaries](#3-signals-and-rxjs-boundaries)
- [4. Templates and change detection](#4-templates-and-change-detection)
- [5. Reactive forms and validation](#5-reactive-forms-and-validation)
- [6. HTTP interceptors and errors](#6-http-interceptors-and-errors)
- [7. Lazy routes and guards](#7-lazy-routes-and-guards)
- [8. Version, CLI, and TypeScript alignment](#8-version-cli-and-typescript-alignment)

## 1. Standalone composition and providers

**Problem:** New features depend on large shared modules, making dependencies and lazy-loading boundaries unclear.

**Fix:** Use standalone components, directives, and pipes. Import only the template dependencies a component needs. Register application-wide services with `bootstrapApplication` and `ApplicationConfig`; register route-specific providers on the route when their lifetime should match that route subtree.

```ts
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
});

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `<a routerLink="/settings">Settings</a>`,
})
export class NavComponent {}
```

**Verify first:** Confirm that a provider is not already registered by a library or a parent injector. Duplicate registrations can create separate service instances.

Sources: [Components](https://angular.dev/guide/components), [Dependency Injection](https://angular.dev/guide/di), [Routing providers](https://angular.dev/guide/routing/define-routes).

## 2. Dependency injection scopes

**Symptom:** State unexpectedly resets, leaks across users of a feature, or differs between eagerly and lazily loaded views.

**Fix:** Choose scope intentionally.

| Need | Provider location |
| --- | --- |
| One instance for the application | `@Injectable({ providedIn: 'root' })` |
| One instance per component subtree | component `providers` |
| One instance for a route and its child routes | route `providers` |

Use `inject()` in an injection context when it makes dependencies clearer; use constructor injection where it improves the class API or compatibility with existing patterns. Avoid service locators and manually constructed services—Angular must create injected services to resolve their dependencies and lifecycle correctly.

Source: [Hierarchical injectors](https://angular.dev/guide/di/hierarchical-dependency-injection).

## 3. Signals and RxJS boundaries

**Problem:** UI state and asynchronous streams are represented interchangeably, causing duplicate subscriptions or unclear ownership.

**Fix:** Use signals for synchronous state consumed by templates or derived with `computed`. Keep RxJS for event streams, cancellation, timing, multicasting, and other asynchronous composition. Convert only at a clear boundary:

- Use `toSignal()` when a template or signal-based state needs an Observable value.
- Use `toObservable()` when signal changes need an Observable pipeline.
- Prefer the `async` pipe for Observable values used only in a template.

```ts
readonly query = signal('');
readonly normalizedQuery = computed(() => this.query().trim().toLowerCase());

readonly results = toSignal(
  this.search.search(this.normalizedQuery()),
  { initialValue: [] },
);
```

**Verify first:** `toSignal()` subscribes to its source. Do not call it repeatedly for the same stream, and provide an initial value unless the `undefined` state is explicitly valid. Model loading, empty, and error states rather than treating absence as an error.

Sources: [Signals](https://angular.dev/guide/signals), [RxJS interop](https://angular.dev/ecosystem/rxjs-interop).

## 4. Templates and change detection

**Fix:** Use built-in control flow for new templates when it improves readability. Track stable identity in repeated collections.

```html
@if (user(); as currentUser) {
  <h1>{{ currentUser.name }}</h1>
} @else {
  <p>Sign in to continue.</p>
}

@for (item of items(); track item.id) {
  <app-item [item]="item" />
} @empty {
  <p>No items.</p>
}
```

Signals read in an `OnPush` component template are tracked by Angular; when they change, Angular marks the component for update. Use `ChangeDetectionStrategy.OnPush` as a performance-oriented default for components with clear input and state boundaries. Do not mutate objects or arrays in place when consumers rely on reference changes; create updated values instead.

**Verify first:** If a view is stale, identify whether its state changes through a signal, an input reference, an event, or an Observable consumed with `async` before adding manual change-detection calls.

Sources: [Control flow](https://angular.dev/guide/templates/control-flow), [Signals in `OnPush` components](https://angular.dev/guide/signals#reading-signals-in-onpush-components), [Skipping component subtrees](https://angular.dev/best-practices/skipping-subtrees).

## 5. Reactive forms and validation

**Problem:** Validation is spread through templates, values are weakly typed, or submission accepts stale/invalid data.

**Fix:** Use reactive forms for non-trivial forms. Define validators with the controls, show errors after an interaction or submission attempt, and check the form state before submitting. Prefer typed controls and `NonNullableFormBuilder` when `null` is not a meaningful form value.

```ts
readonly form = this.formBuilder.nonNullable.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(12)]],
});

submit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
  this.accountService.register(this.form.getRawValue());
}
```

For server validation, map known field errors to the relevant control with `setErrors`; keep unexpected failures as form-level or page-level errors. Async validators must complete and should avoid issuing redundant requests.

Sources: [Reactive forms](https://angular.dev/guide/forms/reactive-forms), [Form validation](https://angular.dev/guide/forms/form-validation).

## 6. HTTP interceptors and errors

**Fix:** Configure `HttpClient` with functional interceptors. Keep interceptors narrow: add authentication or tracing headers, normalize a cross-cutting response concern, or apply a documented retry policy. Re-throw errors after any contextual handling so the caller can decide how to present recovery.

```ts
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).token();
  const authorized = token
    ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : request;

  return next(authorized).pipe(
    catchError((error: HttpErrorResponse) => {
      inject(ErrorReporter).report(error);
      return throwError(() => error);
    }),
  );
};
```

Register order deliberately: request processing follows interceptor order, while responses travel back through the chain. Handle request-specific messages near the calling feature; reserve interceptors for reusable transport policy. Do not retry non-idempotent requests without an explicit server-side safety guarantee.

Sources: [HTTP interceptors](https://angular.dev/guide/http/interceptors), [Making requests](https://angular.dev/guide/http/making-requests).

## 7. Lazy routes and guards

**Fix:** Lazy-load feature routes with `loadChildren` and standalone screens with `loadComponent`. Use functional guards for navigation policy and return a `UrlTree` or `RedirectCommand` for redirects rather than navigating imperatively from a guard.

```ts
export const routes: Routes = [
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.routes').then((m) => m.REPORT_ROUTES),
    canActivate: [() => inject(AuthService).isAuthenticated() || inject(Router).parseUrl('/login')],
  },
];
```

**Verify first:** Client-side guards are not authorization. Enforce access control on the server or API as well. Confirm the intended guard type: `canMatch` affects route matching, while `canActivate` controls activation after a route is selected.

Sources: [Define routes](https://angular.dev/guide/routing/define-routes), [Route guards](https://angular.dev/guide/routing/route-guards), [Lazy loading](https://angular.dev/guide/ngmodules/lazy-loading).

## 8. Version, CLI, and TypeScript alignment

**Problem:** An Angular update fails with peer-dependency or compiler errors, or a generated project differs from repository conventions.

**Verify first:** Check the official [version compatibility table](https://angular.dev/reference/versions) for the supported Node.js, TypeScript, and RxJS ranges of the target Angular version. Check the installed CLI with `ng version`; use the workspace’s package manager and lockfile rather than globally installed tooling as the source of truth.

**Fix:** Upgrade Angular packages and the Angular CLI using the official [Update Guide](https://angular.dev/update-guide), selecting the current and target versions. Make the required TypeScript and Node.js changes before addressing application-level migration output. Run the repository’s build, tests, and lint commands after each upgrade step.

Source: [Angular CLI](https://angular.dev/tools/cli), [Version compatibility](https://angular.dev/reference/versions), [Update Guide](https://angular.dev/update-guide).
