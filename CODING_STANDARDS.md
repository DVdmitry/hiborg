# Typelessity — Coding Standards

## Философия

```
ПРОСТОТА > АБСТРАКЦИЯ
ЧИТАЕМОСТЬ > КРАТКОСТЬ
ЯВНОЕ > НЕЯВНОЕ
РАБОТАЮЩЕЕ > ИДЕАЛЬНОЕ
```

---

## 0. Linting & Code Quality (ОБЯЗАТЕЛЬНО)

ESLint настроен с жёсткими ограничениями для поддержания качества кода.

### Запуск

```bash
pnpm lint        # Проверка
pnpm lint:fix    # Автоисправление
```

### Ограничения по сложности

| Правило | Лимит | Описание |
|---------|-------|----------|
| `complexity` | 10 | Макс. цикломатическая сложность функции |
| `max-depth` | 4 | Макс. вложенность блоков (if/for/while) |
| `max-params` | 4 | Макс. параметров в функции |
| `max-statements` | 20 | Макс. statements в функции |
| `max-nested-callbacks` | 3 | Макс. вложенность callbacks |

### Ограничения по размеру

| Правило | Лимит | Описание |
|---------|-------|----------|
| `max-lines` | 300 | Макс. строк в файле (без пустых/комментов) |
| `max-lines-per-function` | 50 | Макс. строк в функции |

### Правила качества

| Правило | Значение |
|---------|----------|
| `@typescript-eslint/no-explicit-any` | error — запрещён `any` |
| `@typescript-eslint/explicit-function-return-type` | warn — явные return types |
| `eqeqeq` | error — только `===` и `!==` |
| `prefer-const` | error — const вместо let где можно |
| `no-var` | error — запрещён var |
| `no-magic-numbers` | warn — выносить числа в константы |
| `curly` | error — обязательные `{}` для if/for/while |

### Исключения

- **Тесты** (`*.test.ts`, `*.spec.ts`): ослаблены `max-lines`, `max-statements`, `no-magic-numbers`
- **Конфиги** (`*.config.ts`, `*.config.js`): ослаблены `no-magic-numbers`, `no-explicit-any`

### Пример нарушений

```typescript
// BAD — слишком сложная функция (complexity > 10)
function process(data) {
  if (a) { if (b) { if (c) { if (d) { /* depth > 4 */ } } } }
  // ... 25 statements
}

// GOOD — разбить на части
function process(data) {
  const validated = validate(data);
  const transformed = transform(validated);
  return save(transformed);
}
```

```typescript
// BAD — magic numbers
if (retries > 3) { setTimeout(fn, 5000); }

// GOOD — константы
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;
if (retries > MAX_RETRIES) { setTimeout(fn, RETRY_DELAY_MS); }
```

---

## 1. Общие принципы

### SOLID

| Принцип | Применение |
|---------|-----------|
| **S** — Single Responsibility | Один файл = одна ответственность. `session.service.ts` не знает про UI. |
| **O** — Open/Closed | Расширяй через композицию, не правь существующий код. |
| **L** — Liskov Substitution | `BaseRepository<T>` работает с любым `T extends Entity`. |
| **I** — Interface Segregation | Маленькие интерфейсы: `Readable`, `Writable`, не `CRUDable`. |
| **D** — Dependency Inversion | Сервисы зависят от интерфейсов, не от реализаций. |

### DRY (Don't Repeat Yourself)

```typescript
// BAD — дублирование
function createSession() { const id = `ses_${crypto.randomUUID()}`; ... }
function createConfig() { const id = `cfg_${crypto.randomUUID()}`; ... }

// GOOD — вынести в utility
function generateId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}
```

### KISS (Keep It Simple, Stupid)

```typescript
// BAD — overengineering
class SessionStateManagerFactoryBuilder {
  private strategies: Map<State, StateTransitionStrategy>;
  ...
}

// GOOD — простой reducer
function sessionReducer(session: Session, event: Event): Session {
  switch (session.state) {
    case 'COLLECTING':
      return handleCollecting(session, event);
    ...
  }
}
```

### YAGNI (You Aren't Gonna Need It)

```typescript
// BAD — фичи "на будущее"
interface Session {
  ...
  webhookUrl?: string;      // "потом добавим"
  customTheme?: ThemeConfig; // "может понадобится"
}

// GOOD — только то что нужно сейчас
interface Session {
  id: string;
  state: State;
  extractedData: Record<string, unknown>;
}
```

---

## 2. TypeScript Standards

### Strict Mode — ОБЯЗАТЕЛЕН

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Типизация

```typescript
// BAD
function processData(data: any) { ... }
const items = [] as any[];

// GOOD
function processData(data: ExtractedData): ProcessResult { ... }
const items: BookingField[] = [];
```

### Discriminated Unions для Events

```typescript
// GOOD — exhaustive type checking
type Event =
  | { type: 'USER_MESSAGE'; text: string; requestId: string }
  | { type: 'AI_EXTRACTED'; requestId: string; data: Record<string, unknown> }
  | { type: 'USER_CONFIRMED' }
  | { type: 'INTEGRATION_SUCCESS'; bookingId: string };

function handleEvent(event: Event): void {
  switch (event.type) {
    case 'USER_MESSAGE':
      // TypeScript знает что event.text существует
      break;
    case 'AI_EXTRACTED':
      // TypeScript знает что event.data существует
      break;
    // Если забудешь case — ошибка компиляции
  }
}
```

### Naming Conventions

| Что | Формат | Пример |
|-----|--------|--------|
| Интерфейсы | PascalCase | `WidgetConfig`, `Session` |
| Types | PascalCase | `State`, `EventType` |
| Enums | PascalCase + UPPER_CASE values | `State.COLLECTING` |
| Functions | camelCase | `isComplete()`, `generateId()` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES`, `DEFAULT_TIMEOUT` |
| Files | kebab-case | `widget-config.ts`, `session.service.ts` |
| Folders | kebab-case | `state-machine/`, `api-client/` |

### Избегай Magic Numbers/Strings

```typescript
// BAD
if (retryCount >= 3) { ... }
if (status === 'ses_') { ... }

// GOOD
const MAX_RETRIES = 3;
const SESSION_PREFIX = 'ses_';

if (retryCount >= MAX_RETRIES) { ... }
if (status.startsWith(SESSION_PREFIX)) { ... }
```

---

## 3. Lit 3.x (Widget)

### ОБЯЗАТЕЛЬНЫЕ современные фичи Lit 3.x

| Фича | Использовать | НЕ использовать |
|------|--------------|-----------------|
| Decorators | `@customElement`, `@property`, `@state` | `static properties` |
| Reactive Controllers | Для переиспользуемой логики | Mixins |
| Private Fields | `#privateField` | `_privateField` |
| Task | `@lit/task` для async | Manual loading states |
| Context | `@lit/context` для DI | Global singletons |
| Directives | Built-in (`classMap`, `styleMap`, `when`) | Manual conditionals |

---

### Component Structure

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Task } from '@lit/task';

@customElement('typelessity-widget')
export class TypelessityWidget extends LitElement {
  // 1. Static styles
  static styles = css`...`;

  // 2. Public properties (reflected to attributes)
  @property({ type: String, attribute: 'config-id' })
  configId = '';

  @property({ type: Boolean, reflect: true })
  open = false;

  // 3. Private state (internal, triggers re-render)
  @state() private session: Session | null = null;
  @state() private messages: ChatMessage[] = [];

  // 4. Private fields (no reactivity, no re-render)
  #apiService = new ApiService();
  #abortController: AbortController | null = null;

  // 5. Reactive Controllers
  #sessionController = new SessionController(this);

  // 6. Tasks for async operations
  #configTask = new Task(this, {
    args: () => [this.configId] as const,
    task: async ([id], { signal }) => {
      return this.#apiService.getConfig(id, { signal });
    },
  });

  // 7. Lifecycle
  connectedCallback() {
    super.connectedCallback();
    this.#init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#cleanup();
  }

  // 8. Public API
  async sendMessage(text: string): Promise<void> { ... }
  reset(): void { ... }

  // 9. Event handlers (arrow functions for binding)
  #handleSubmit = (e: Event) => { ... }
  #handleInput = (e: InputEvent) => { ... }

  // 10. Private methods
  #init(): void { ... }
  #cleanup(): void { ... }

  // 11. Render (always last)
  render() {
    return html`
      ${this.#configTask.render({
        pending: () => html`<div class="loading">Loading...</div>`,
        complete: (config) => this.#renderWidget(config),
        error: (err) => html`<div class="error">${err.message}</div>`,
      })}
    `;
  }

  #renderWidget(config: WidgetConfig) { ... }
  #renderMessages() { ... }
  #renderInput() { ... }
}
```

### Task для Async Operations

```typescript
import { Task } from '@lit/task';

@customElement('typelessity-widget')
export class TypelessityWidget extends LitElement {
  @property() configId = '';

  // Task автоматически:
  // - Отменяет предыдущий запрос при изменении args
  // - Предоставляет состояния pending/complete/error
  // - Перезапускается при изменении зависимостей
  #loadConfig = new Task(this, {
    args: () => [this.configId] as const,
    task: async ([configId], { signal }) => {
      const response = await fetch(`/api/config/${configId}`, { signal });
      if (!response.ok) throw new Error('Failed to load config');
      return response.json() as Promise<WidgetConfig>;
    },
  });

  render() {
    return this.#loadConfig.render({
      initial: () => html`<p>Enter config ID</p>`,
      pending: () => html`<app-spinner></app-spinner>`,
      complete: (config) => html`
        <div class="widget">
          <h1>${config.ui.brandName}</h1>
          <!-- ... -->
        </div>
      `,
      error: (e) => html`<p class="error">Error: ${e.message}</p>`,
    });
  }
}
```

### Reactive Controllers

```typescript
// controllers/session.controller.ts
import { ReactiveController, ReactiveControllerHost } from 'lit';

export class SessionController implements ReactiveController {
  #host: ReactiveControllerHost;
  #session: Session | null = null;
  #timer: number | null = null;

  get session() { return this.#session; }
  get isActive() { return this.#session?.state !== 'EXPIRED'; }

  constructor(host: ReactiveControllerHost) {
    this.#host = host;
    host.addController(this);
  }

  hostConnected() {
    this.#startTimeoutTimer();
  }

  hostDisconnected() {
    this.#stopTimeoutTimer();
  }

  async start(configId: string): Promise<void> {
    this.#session = await api.createSession(configId);
    this.#host.requestUpdate();
  }

  #startTimeoutTimer() {
    this.#timer = window.setInterval(() => {
      if (this.#isSessionExpired()) {
        this.#handleExpiry();
      }
    }, 60000);
  }

  // ...
}

// Использование в компоненте
@customElement('typelessity-widget')
export class TypelessityWidget extends LitElement {
  #session = new SessionController(this);

  render() {
    return html`
      @if (this.#session.session) {
        <div>State: ${this.#session.session.state}</div>
      }
    `;
  }
}
```

### Context API для Dependency Injection

```typescript
// context/api.context.ts
import { createContext } from '@lit/context';

export interface ApiContext {
  baseUrl: string;
  fetch: typeof fetch;
}

export const apiContext = createContext<ApiContext>('api');

// Provider component
@customElement('typelessity-provider')
export class TypelessityProvider extends LitElement {
  @property() baseUrl = 'https://api.typelessity.com';

  #apiContext: ApiContext = {
    baseUrl: this.baseUrl,
    fetch: window.fetch.bind(window),
  };

  render() {
    return html`
      <context-provider .context=${apiContext} .value=${this.#apiContext}>
        <slot></slot>
      </context-provider>
    `;
  }
}

// Consumer component
@customElement('typelessity-widget')
export class TypelessityWidget extends LitElement {
  @consume({ context: apiContext })
  @state()
  api!: ApiContext;

  async #loadConfig() {
    const response = await this.api.fetch(`${this.api.baseUrl}/config/...`);
    // ...
  }
}
```

### Directives

```typescript
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';
import { repeat } from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';

render() {
  return html`
    <!-- classMap для условных классов -->
    <button class=${classMap({
      'btn': true,
      'btn-primary': this.variant === 'primary',
      'btn-loading': this.isLoading,
      'btn-disabled': this.disabled,
    })}>
      ${this.label}
    </button>

    <!-- styleMap для динамических стилей -->
    <div style=${styleMap({
      '--primary-color': this.primaryColor,
      'opacity': this.isVisible ? '1' : '0',
    })}>
      Content
    </div>

    <!-- when для условного рендера -->
    ${when(
      this.isLoggedIn,
      () => html`<app-dashboard></app-dashboard>`,
      () => html`<app-login></app-login>`
    )}

    <!-- repeat для списков с ключами -->
    <ul>
      ${repeat(
        this.messages,
        (msg) => msg.id,  // key function
        (msg, index) => html`
          <li class="message">${msg.content}</li>
        `
      )}
    </ul>

    <!-- ifDefined для опциональных атрибутов -->
    <input
      type="text"
      placeholder=${ifDefined(this.placeholder)}
      maxlength=${ifDefined(this.maxLength)}
    />
  `;
}
```

### Private Fields (ES2022)

```typescript
@customElement('typelessity-widget')
export class TypelessityWidget extends LitElement {
  // BAD — underscore convention
  private _session: Session | null = null;
  private _handleClick() { ... }

  // GOOD — native private fields
  #session: Session | null = null;
  #abortController: AbortController | null = null;

  #handleClick = () => { ... }
  #processMessage(text: string) { ... }
}
```

### Event Handling

```typescript
// BAD — inline arrow functions (create new objects each render)
render() {
  return html`
    <button @click=${() => this.handleClick()}>Click</button>
    <input @input=${(e) => this.handleInput(e)}>
  `;
}

// GOOD — class field arrow functions (stable references)
#handleClick = () => {
  this.dispatchEvent(new CustomEvent('widget-click'));
}

#handleInput = (e: InputEvent) => {
  const target = e.target as HTMLInputElement;
  this.inputValue = target.value;
}

render() {
  return html`
    <button @click=${this.#handleClick}>Click</button>
    <input @input=${this.#handleInput}>
  `;
}
```

### Custom Events (Typed)

```typescript
// types/events.ts
export interface WidgetEventMap {
  'widget-open': CustomEvent<void>;
  'widget-close': CustomEvent<void>;
  'message-sent': CustomEvent<{ text: string; timestamp: Date }>;
  'booking-complete': CustomEvent<{ sessionId: string; data: BookingData }>;
  'booking-error': CustomEvent<{ code: string; message: string }>;
}

// Component
@customElement('typelessity-widget')
export class TypelessityWidget extends LitElement {
  #dispatchBookingComplete(session: Session) {
    this.dispatchEvent(new CustomEvent('booking-complete', {
      detail: {
        sessionId: session.id,
        data: session.extractedData,
      },
      bubbles: true,
      composed: true,  // Escapes shadow DOM
    }));
  }
}

// Type-safe event listener
declare global {
  interface HTMLElementEventMap extends WidgetEventMap {}
}
```

### CSS Isolation & Theming

```typescript
static styles = css`
  :host {
    /* CSS Custom Properties for theming */
    --tw-primary: #6C5CE7;
    --tw-primary-hover: #5B4ED1;
    --tw-radius-sm: 8px;
    --tw-radius-md: 16px;
    --tw-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    display: block;
    contain: content;  /* Performance */
    font-family: system-ui, sans-serif;
  }

  :host([hidden]) {
    display: none;
  }

  :host([open]) .widget {
    transform: translateY(0);
    opacity: 1;
  }

  /* Theming via CSS variables (user can override) */
  .button-primary {
    background: var(--tw-primary);
    border-radius: var(--tw-radius-sm);
  }

  .button-primary:hover {
    background: var(--tw-primary-hover);
  }

  /* Slotted content styling */
  ::slotted(h1) {
    margin: 0;
  }

  /* Part for external styling */
  .header {
    /* Can be styled externally via ::part(header) */
  }
`;

render() {
  return html`
    <div class="widget" part="container">
      <header class="header" part="header">
        <slot name="title"></slot>
      </header>
    </div>
  `;
}
```

---

## 4. Angular 21 (Admin)

### ОБЯЗАТЕЛЬНЫЕ современные фичи Angular 21

| Фича | Использовать | НЕ использовать |
|------|--------------|-----------------|
| Control Flow | `@if`, `@for`, `@switch` | `*ngIf`, `*ngFor`, `*ngSwitch` |
| Inputs | `input()`, `input.required()` | `@Input()` decorator |
| Outputs | `output()` | `@Output()` + `EventEmitter` |
| State | `signal()`, `computed()` | RxJS `BehaviorSubject` |
| Forms | Signal Forms | Reactive Forms |
| DI | `inject()` | constructor injection |
| Components | Standalone | NgModules |
| Guards | Functional | Class-based |

---

### Control Flow Syntax (ОБЯЗАТЕЛЬНО)

```typescript
// BAD — старый синтаксис
<div *ngIf="isLoading; else content">Loading...</div>
<ng-template #content>
  <ul>
    <li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>
  </ul>
</ng-template>

// GOOD — новый control flow
@if (isLoading()) {
  <div>Loading...</div>
} @else {
  <ul>
    @for (item of items(); track item.id) {
      <li>{{ item.name }}</li>
    } @empty {
      <li>No items found</li>
    }
  </ul>
}

// Switch
@switch (status()) {
  @case ('pending') { <span class="badge-warning">Pending</span> }
  @case ('active') { <span class="badge-success">Active</span> }
  @case ('error') { <span class="badge-error">Error</span> }
  @default { <span>Unknown</span> }
}
```

### Defer для Lazy Loading

```typescript
// Lazy load heavy components
@defer (on viewport) {
  <app-analytics-chart [data]="chartData()" />
} @placeholder {
  <div class="skeleton-chart"></div>
} @loading (minimum 200ms) {
  <app-spinner />
} @error {
  <p>Failed to load chart</p>
}

// Defer с условием
@defer (when isExpanded()) {
  <app-widget-preview [config]="config()" />
}
```

### Signal Inputs & Outputs (ОБЯЗАТЕЛЬНО)

```typescript
// BAD — старые декораторы
@Component({ ... })
export class WidgetCardComponent {
  @Input({ required: true }) widget!: Widget;
  @Input() isSelected = false;
  @Output() delete = new EventEmitter<string>();
  @Output() select = new EventEmitter<Widget>();
}

// GOOD — signal-based inputs/outputs
@Component({ ... })
export class WidgetCardComponent {
  // Required input
  widget = input.required<Widget>();

  // Optional input with default
  isSelected = input(false);

  // Transform input
  widgetId = input('', { transform: (v: string) => v.trim() });

  // Outputs
  delete = output<string>();
  select = output<Widget>();

  // Computed from inputs
  isActive = computed(() => this.widget().isActive);

  onDelete() {
    this.delete.emit(this.widget().id);
  }
}
```

### Model Inputs (Two-Way Binding)

```typescript
// Component с two-way binding
@Component({
  selector: 'app-search-input',
  template: `
    <input
      [value]="value()"
      (input)="value.set($event.target.value)"
    />
  `
})
export class SearchInputComponent {
  value = model('');  // two-way bindable
}

// Использование
<app-search-input [(value)]="searchQuery" />
```

### Signal Forms (ОБЯЗАТЕЛЬНО для форм)

```typescript
// BAD — Reactive Forms
export class WidgetFormComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    isActive: new FormControl(false),
  });
}

// GOOD — Signal Forms (Angular 21)
import { FormBuilder } from '@angular/forms';

export class WidgetFormComponent {
  private readonly fb = inject(FormBuilder);

  // Signal-based form
  protected readonly form = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required] }),
    isActive: this.fb.control(false),
    fields: this.fb.array<BookingFieldForm>([]),
  });

  // Computed values from form
  isValid = computed(() => this.form.valid());
  nameValue = computed(() => this.form.controls.name.value());

  // LinkedSignal for derived state
  displayName = linkedSignal(() =>
    this.nameValue() || 'Untitled Widget'
  );

  addField() {
    this.form.controls.fields.push(
      this.fb.group({
        id: this.fb.control(generateId('fld')),
        label: this.fb.control(''),
        type: this.fb.control<FieldType>('text'),
        required: this.fb.control(false),
      })
    );
  }
}
```

### Resource API для Async Data

```typescript
// GOOD — resource() для HTTP calls
@Component({ ... })
export class WidgetListComponent {
  private readonly http = inject(HttpClient);

  // Resource automatically handles loading/error states
  widgetsResource = resource({
    loader: () => this.http.get<Widget[]>('/api/widgets').toPromise(),
  });

  // Access states
  widgets = computed(() => this.widgetsResource.value() ?? []);
  isLoading = computed(() => this.widgetsResource.status() === 'loading');
  error = computed(() => this.widgetsResource.error());

  // Reload
  refresh() {
    this.widgetsResource.reload();
  }
}

// С параметрами
@Component({ ... })
export class WidgetDetailComponent {
  widgetId = input.required<string>();

  widgetResource = resource({
    request: () => this.widgetId(),  // Reactive to input changes
    loader: ({ request: id }) =>
      this.http.get<Widget>(`/api/widgets/${id}`).toPromise(),
  });
}
```

### Functional Guards & Resolvers

```typescript
// BAD — class-based guard
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate() { return this.auth.isLoggedIn(); }
}

// GOOD — functional guard
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }
  return router.createUrlTree(['/login']);
};

// Functional resolver
export const widgetResolver: ResolveFn<Widget> = (route) => {
  const service = inject(WidgetService);
  const id = route.paramMap.get('id')!;
  return service.getById(id);
};

// Routes
export const routes: Routes = [
  {
    path: 'widgets/:id',
    component: WidgetDetailComponent,
    canActivate: [authGuard],
    resolve: { widget: widgetResolver },
  },
];
```

### Standalone Components (ОБЯЗАТЕЛЬНО)

```typescript
// GOOD — standalone with imports
@Component({
  standalone: true,
  selector: 'app-widget-editor',
  imports: [
    // Angular
    CommonModule,
    RouterLink,

    // NG-ZORRO
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSwitchModule,

    // Local
    WidgetPreviewComponent,
    FieldEditorComponent,
  ],
  template: `...`,
  styles: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetEditorComponent {
  // ...
}
```

### Signals для State (НЕ RxJS)

```typescript
// BAD — RxJS для state
export class DashboardComponent {
  private configsSubject = new BehaviorSubject<Widget[]>([]);
  configs$ = this.configsSubject.asObservable();

  loading$ = new BehaviorSubject(false);
}

// GOOD — Signals
export class DashboardComponent {
  // State
  configs = signal<Widget[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  filter = signal('');

  // Derived state
  filteredConfigs = computed(() => {
    const query = this.filter().toLowerCase();
    return this.configs().filter(c =>
      c.name.toLowerCase().includes(query)
    );
  });

  activeCount = computed(() =>
    this.configs().filter(c => c.isActive).length
  );

  // LinkedSignal for resettable state
  selectedId = linkedSignal<string | null>(() => null);

  // Effect for side effects (logging, localStorage, etc.)
  constructor() {
    effect(() => {
      localStorage.setItem('filter', this.filter());
    });
  }
}

// RxJS ТОЛЬКО для:
// 1. HTTP requests
// 2. WebSocket streams
// 3. Complex async orchestration (race, debounce, etc.)
```

### inject() > Constructor (ОБЯЗАТЕЛЬНО)

```typescript
// BAD — constructor injection
@Component({ ... })
export class WidgetService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly store: Store,
  ) {}
}

// GOOD — inject()
@Component({ ... })
export class WidgetService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly store = inject(Store);
}
```

### Component Structure (порядок)

```typescript
@Component({
  standalone: true,
  selector: 'app-widget-editor',
  imports: [...],
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetEditorComponent {
  // 1. Dependency injection
  private readonly service = inject(WidgetService);
  private readonly router = inject(Router);

  // 2. Inputs
  widgetId = input.required<string>();
  mode = input<'create' | 'edit'>('create');

  // 3. Outputs
  saved = output<Widget>();
  cancelled = output<void>();

  // 4. State signals
  widget = signal<Widget | null>(null);
  isLoading = signal(false);

  // 5. Computed
  isValid = computed(() => !!this.widget()?.name);
  canSave = computed(() => this.isValid() && !this.isLoading());

  // 6. Resources
  widgetResource = resource({ ... });

  // 7. Effects
  constructor() {
    effect(() => { ... });
  }

  // 8. Lifecycle hooks
  ngOnInit() { ... }

  // 9. Public methods
  save() { ... }
  cancel() { ... }

  // 10. Private methods
  private validate() { ... }
}

---

## 5. Next.js 15 (API)

### ОБЯЗАТЕЛЬНЫЕ современные фичи Next.js 15

| Фича | Использовать | НЕ использовать |
|------|--------------|-----------------|
| Router | App Router (`app/`) | Pages Router (`pages/`) |
| Components | Server Components by default | `'use client'` everywhere |
| Data Fetching | `fetch` with caching | `getServerSideProps` |
| Actions | Server Actions | API routes for mutations |
| Params | `await params` (async) | `params` sync access |
| Caching | Explicit `cache`, `revalidate` | Implicit caching |

---

### Route Handler Structure (Next.js 15)

```typescript
// app/api/session/[id]/message/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sessionService } from '@/services/session';

// 1. Validation schema
const messageSchema = z.object({
  text: z.string().min(1).max(5000),
});

// 2. Route segment config
export const runtime = 'nodejs';  // or 'edge'
export const dynamic = 'force-dynamic';  // no caching for mutations

// 3. Route handler — ВАЖНО: params теперь async в Next.js 15!
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // ← Promise!
) {
  try {
    // 4. Await params (NEW in Next.js 15)
    const { id } = await params;

    // 5. Parse & validate body
    const body = await request.json();
    const { text } = messageSchema.parse(body);

    // 6. Business logic
    const result = await sessionService.processMessage(id, text);

    // 7. Response
    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}
```

### Server Actions (для мутаций)

```typescript
// app/actions/session.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { sessionService } from '@/services/session';

const messageSchema = z.object({
  sessionId: z.string(),
  text: z.string().min(1).max(5000),
});

export async function sendMessage(formData: FormData) {
  const parsed = messageSchema.safeParse({
    sessionId: formData.get('sessionId'),
    text: formData.get('text'),
  });

  if (!parsed.success) {
    return { error: 'Invalid input', details: parsed.error.flatten() };
  }

  const { sessionId, text } = parsed.data;

  try {
    const result = await sessionService.processMessage(sessionId, text);
    revalidatePath(`/session/${sessionId}`);
    return { success: true, data: result };
  } catch (error) {
    return { error: 'Failed to send message' };
  }
}

// Использование в клиентском компоненте
'use client';

import { sendMessage } from '@/app/actions/session';
import { useActionState } from 'react';  // React 19

export function ChatForm({ sessionId }: { sessionId: string }) {
  const [state, action, isPending] = useActionState(sendMessage, null);

  return (
    <form action={action}>
      <input type="hidden" name="sessionId" value={sessionId} />
      <input type="text" name="text" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send'}
      </button>
      {state?.error && <p className="error">{state.error}</p>}
    </form>
  );
}
```

### Caching Strategy (Next.js 15)

```typescript
// Next.js 15: caching is OPT-IN, not default!

// NO caching (default in Next.js 15)
const data = await fetch('https://api.example.com/data');

// WITH caching (explicit)
const cachedData = await fetch('https://api.example.com/data', {
  cache: 'force-cache',  // Cache indefinitely
});

// Revalidate every 60 seconds
const revalidatedData = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 },
});

// Revalidate by tag
const taggedData = await fetch('https://api.example.com/configs', {
  next: { tags: ['configs'] },
});

// Revalidate tag on mutation
import { revalidateTag } from 'next/cache';

export async function updateConfig(id: string, data: ConfigData) {
  await db.update(configs).set(data).where(eq(configs.id, id));
  revalidateTag('configs');  // Invalidate all fetches with this tag
}
```

### Streaming & Suspense

```typescript
// app/session/[id]/page.tsx
import { Suspense } from 'react';
import { SessionChat } from './session-chat';
import { SessionSummary } from './session-summary';

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="session-layout">
      {/* Chat loads immediately */}
      <Suspense fallback={<ChatSkeleton />}>
        <SessionChat sessionId={id} />
      </Suspense>

      {/* Summary streams in later */}
      <Suspense fallback={<SummarySkeleton />}>
        <SessionSummary sessionId={id} />
      </Suspense>
    </div>
  );
}

// Компонент с async data fetching
async function SessionSummary({ sessionId }: { sessionId: string }) {
  // This fetch happens on the server, streams to client
  const summary = await fetchSessionSummary(sessionId);
  return <SummaryCard data={summary} />;
}
```

### Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Rate limiting header (for upstream)
  const configId = request.nextUrl.pathname.match(/\/api\/config\/([^/]+)/)?.[1];
  if (configId) {
    response.headers.set('X-Config-Id', configId);
  }

  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

### Service Layer Pattern

```typescript
// services/session.service.ts

import { db } from '@/db/client';
import { sessions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { generateId } from '@/lib/utils';
import { sessionReducer } from '@typelessity/shared';
import type { Session, Event } from '@typelessity/shared';

export class SessionService {
  async findById(id: string): Promise<Session | null> {
    const result = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async processMessage(sessionId: string, text: string) {
    // 1. Get session
    const session = await this.findById(sessionId);
    if (!session) {
      throw new NotFoundError('Session not found');
    }

    // 2. Generate request ID for AI correlation
    const requestId = generateId('req');

    // 3. Call AI extraction
    const extraction = await aiService.extract({
      config: session.config,
      messages: session.messages,
      newMessage: text,
    });

    // 4. Apply state machine
    const event: Event = {
      type: 'AI_EXTRACTED',
      requestId,
      data: extraction.data,
    };

    const nextSession = sessionReducer(session, event);

    // 5. Persist
    await db
      .update(sessions)
      .set({
        state: nextSession.state,
        extractedData: nextSession.extractedData,
        messages: [...session.messages, { role: 'user', content: text }],
        lastAiRequestId: requestId,
        updatedAt: new Date(),
      })
      .where(eq(sessions.id, sessionId));

    return {
      session: nextSession,
      reply: extraction.reply,
    };
  }
}

export const sessionService = new SessionService();
```

### Error Handling

```typescript
// lib/errors.ts

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 'NOT_FOUND', 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter: number) {
    super('Rate limit exceeded', 'RATE_LIMIT', 429, { retryAfter });
  }
}

// lib/error-handler.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

export function handleError(error: unknown): NextResponse {
  console.error('[API Error]', error);

  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message, code: error.code, details: error.details },
      { status: error.statusCode }
    );
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: error.flatten(),
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { error: 'Internal server error', code: 'INTERNAL_ERROR' },
    { status: 500 }
  );
}
```

### Environment Variables

```typescript
// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // OpenAI
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_MODEL: z.enum(['gpt-4o-mini', 'gpt-3.5-turbo']).default('gpt-4o-mini'),

  // App
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_BASE_URL: z.string().url(),
});

// Validate at startup
export const env = envSchema.parse(process.env);

// Type-safe access
// env.DATABASE_URL  ✓ typed as string
// env.OPENAI_MODEL  ✓ typed as 'gpt-4o-mini' | 'gpt-3.5-turbo'
```

---

## 6. Drizzle ORM

### Schema Definition

```typescript
// db/schema/sessions.ts

import { pgTable, text, jsonb, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { widgetConfigs } from './widget-configs';

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  configId: text('config_id').notNull().references(() => widgetConfigs.id),
  configVersion: integer('config_version').notNull(),
  state: text('state').notNull(),
  extractedData: jsonb('extracted_data').default({}).$type<Record<string, unknown>>(),
  messages: jsonb('messages').default([]).$type<ChatMessage[]>(),
  lastAiRequestId: text('last_ai_request_id'),
  retryCount: integer('retry_count').default(0),
  editMode: boolean('edit_mode').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Types inferred from schema
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
```

### Repository Pattern

```typescript
// repositories/session.repository.ts

import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { sessions, type Session, type NewSession } from '@/db/schema';

export class SessionRepository {
  async findById(id: string): Promise<Session | null> {
    const result = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async create(data: NewSession): Promise<Session> {
    const result = await db
      .insert(sessions)
      .values(data)
      .returning();
    return result[0];
  }

  async update(id: string, data: Partial<NewSession>): Promise<Session> {
    const result = await db
      .update(sessions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(sessions.id, id))
      .returning();
    return result[0];
  }
}

export const sessionRepository = new SessionRepository();
```

---

## 7. Testing Standards

### Test File Naming

```
src/
├── services/
│   ├── session.service.ts
│   └── session.service.test.ts    # Unit tests рядом с файлом
├── __tests__/
│   └── integration/
│       └── session-flow.test.ts   # Integration tests в отдельной папке
```

### Unit Test Structure (AAA Pattern)

```typescript
describe('SessionService', () => {
  describe('processMessage', () => {
    it('should transition to COLLECTING on first message', async () => {
      // Arrange
      const session = createMockSession({ state: 'INIT' });
      const mockRepo = { findById: vi.fn().mockResolvedValue(session) };
      const service = new SessionService(mockRepo, ...);

      // Act
      const result = await service.processMessage('ses_123', 'Hello');

      // Assert
      expect(result.session.state).toBe('COLLECTING');
      expect(mockRepo.update).toHaveBeenCalledWith('ses_123', expect.objectContaining({
        state: 'COLLECTING',
      }));
    });
  });
});
```

### State Machine Tests — MUST PASS

```typescript
describe('State Machine', () => {
  // Все сценарии из спецификации

  it('Happy path: INIT → COMPLETED', () => { ... });
  it('Clarification needed: loops in COLLECTING', () => { ... });
  it('Edit after confirmation', () => { ... });
  it('Stale AI response ignored', () => { ... });
  it('Retry flow', () => { ... });
  it('Timeout flow', () => { ... });
  it('Max retries exceeded', () => { ... });
  it('Session resume', () => { ... });
  it('Config version mismatch', () => { ... });
});
```

---

## 8. Git Conventions

### Branch Naming

```
main                    # Production
├── develop             # Integration
├── feature/widget-ui   # New features
├── fix/session-timeout # Bug fixes
├── refactor/api-layer  # Refactoring
└── chore/update-deps   # Maintenance
```

### Commit Messages (Conventional Commits)

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat` — новая фича
- `fix` — баг фикс
- `refactor` — рефакторинг без изменения поведения
- `docs` — документация
- `test` — тесты
- `chore` — билд, зависимости, CI

```
feat(widget): add voice input support
fix(api): handle session timeout correctly
refactor(state-machine): simplify guard functions
docs: update API documentation
test(session): add integration tests for retry flow
chore: upgrade Lit to 3.2.0
```

### PR Guidelines

1. **Один PR = одна задача**
2. **Описание обязательно** — что, зачем, как тестировать
3. **Все тесты проходят** перед merge
4. **Code review обязателен**

---

## 9. File Organization

### Shared Package

```
packages/shared/src/
├── types/
│   ├── widget-config.ts
│   ├── session.ts
│   ├── events.ts
│   └── index.ts
├── state-machine/
│   ├── states.ts
│   ├── events.ts
│   ├── guards.ts
│   ├── reducer.ts
│   └── index.ts
├── utils/
│   ├── id.ts
│   ├── validation.ts
│   └── completeness.ts
└── index.ts
```

### API Package

```
packages/api/src/
├── app/
│   └── api/
│       ├── config/[id]/route.ts
│       ├── session/route.ts
│       └── session/[id]/
│           ├── route.ts
│           ├── message/route.ts
│           └── confirm/route.ts
├── services/
│   ├── session.service.ts
│   ├── ai-extraction.service.ts
│   └── integration.service.ts
├── repositories/
│   ├── session.repository.ts
│   └── config.repository.ts
├── db/
│   ├── client.ts
│   └── schema/
│       ├── sessions.ts
│       ├── configs.ts
│       └── index.ts
├── lib/
│   ├── errors.ts
│   ├── error-handler.ts
│   └── validation.ts
└── middleware.ts
```

### Widget Package

```
packages/widget/src/
├── typelessity-widget.ts    # Main component
├── components/
│   ├── chat-area.ts
│   ├── summary-panel.ts
│   ├── input-bar.ts
│   └── trigger-button.ts
├── services/
│   ├── api.service.ts
│   ├── storage.service.ts
│   └── voice.service.ts
├── styles/
│   └── theme.ts
├── utils/
│   └── format.ts
└── index.ts
```

---

## 10. Performance Guidelines

### Widget

```typescript
// Lazy load heavy dependencies
const VoiceService = await import('./services/voice.service');

// Use will-change sparingly
.animating { will-change: transform, opacity; }

// Debounce input
private handleInput = debounce((text: string) => {
  this.processInput(text);
}, 300);
```

### API

```typescript
// Connection pooling
const pool = new Pool({ max: 10 });

// Query optimization
const result = await db
  .select({ id: sessions.id, state: sessions.state })  // Select only needed
  .from(sessions)
  .where(eq(sessions.configId, configId))
  .limit(100);  // Always limit

// Cache config (immutable + versioned)
const configCache = new LRUCache<string, WidgetConfig>({ max: 1000 });
```

---

## 11. Security Checklist

### ОБЯЗАТЕЛЬНО (Non-negotiable)

- [ ] **Encryption at rest** — API keys и другие секреты шифруются AES-256-GCM перед сохранением в БД
- [ ] **НИКОГДА** не храни секреты в plain text в базе данных
- [ ] **ENCRYPTION_KEY** — обязательная env переменная (32 bytes, base64)
- [ ] Input validation с Zod на всех endpoints
- [ ] Rate limiting по config-id и IP
- [ ] CORS настроен только для разрешённых origins
- [ ] API keys в environment variables (fallback)
- [ ] No secrets в коде или логах
- [ ] SQL injection prevention через Drizzle (parameterized queries)
- [ ] XSS prevention через Lit (автоматический escaping)

### Encryption Pattern

```typescript
// lib/encryption.ts — AES-256-GCM для секретов
import { encrypt, decrypt, isEncrypted } from '@/lib/encryption';

// ПЕРЕД сохранением в БД
const encryptedKey = encrypt(apiKey);
await db.insert(secrets).values({ openaiApiKey: encryptedKey });

// ПОСЛЕ чтения из БД
const decryptedKey = decrypt(row.openaiApiKey);
```

### Генерация ENCRYPTION_KEY

```bash
# Генерация ключа шифрования (32 bytes base64)
openssl rand -base64 32

# Добавить в .env.local
ENCRYPTION_KEY=сгенерированный_ключ
```

---

## Quick Reference

### TypeScript

| Правило | Значение |
|---------|----------|
| Strict mode | `strict: true`, `noImplicitAny: true` |
| No any | Используй `unknown` + type guards |
| Naming | camelCase functions, PascalCase types, kebab-case files |
| Private | ES2022 `#privateField` (Lit), `private` (Angular) |

### Angular 21

| Фича | ИСПОЛЬЗОВАТЬ | НЕ использовать |
|------|--------------|-----------------|
| Control Flow | `@if`, `@for`, `@switch`, `@defer` | `*ngIf`, `*ngFor` |
| Inputs | `input()`, `input.required()` | `@Input()` |
| Outputs | `output()` | `@Output()` + `EventEmitter` |
| State | `signal()`, `computed()`, `linkedSignal()` | RxJS `BehaviorSubject` |
| Forms | Signal Forms | Reactive Forms |
| DI | `inject()` | constructor injection |
| Async Data | `resource()` | manual loading states |
| Guards | Functional guards | Class-based guards |

### Lit 3.x

| Фича | ИСПОЛЬЗОВАТЬ | НЕ использовать |
|------|--------------|-----------------|
| Private | `#privateField` | `_underscore` |
| Async | `@lit/task` | manual loading states |
| Logic reuse | Reactive Controllers | Mixins |
| Context | `@lit/context` | Global singletons |
| Events | Arrow function handlers | Inline handlers in template |
| Conditionals | `classMap`, `when`, `repeat` | Manual ternaries |

### Next.js 15

| Фича | ИСПОЛЬЗОВАТЬ | НЕ использовать |
|------|--------------|-----------------|
| Router | App Router (`app/`) | Pages Router |
| Params | `await params` | Sync access |
| Mutations | Server Actions | API routes |
| Caching | Explicit `cache`, `revalidate` | Implicit |
| Data fetch | Server Components + Suspense | `useEffect` + `useState` |

### General Patterns

| Pattern | Применение |
|---------|------------|
| Service Layer | Бизнес-логика в services, не в route handlers |
| Repository | Вся работа с DB через repository classes |
| State Machine | Все переходы через reducer, guards |
| Error Handling | Custom `AppError` classes + centralized handler |
| Validation | Zod schemas на всех входных точках |

### Testing

| Правило | Детали |
|---------|--------|
| Structure | AAA (Arrange, Act, Assert) |
| State Machine | ВСЕ 9 сценариев из спецификации MUST PASS |
| Naming | `should X when Y` |
| Mocking | Только внешние зависимости (HTTP, DB) |

### Git

| Правило | Формат |
|---------|--------|
| Commits | Conventional: `feat(scope): description` |
| Branches | `feature/`, `fix/`, `refactor/`, `chore/` |
| PR | Один PR = одна задача, описание обязательно |

