# Playwright + TypeScript — Page Object Model Example

A minimal POM framework that demonstrates clean page objects, a shared `BasePage`, and a simple test suite.

---

## 📺 Video series

Watch the full **Playwright with TypeScript** playlist here →  
https://www.youtube.com/watch?v=Gxn0i76jIJI&list=PLfw_nI4u_6WOuClIHl4Wl5V--ufJGin71

---

## 🚀 Quick start

```bash
# 1. Install deps
npm i       

# 2. Scaffold Playwright config (if you don’t have one yet)
npx playwright@latest init
```

---

## 📂 Project structure

```text
playwright_pom/
├─ pages/
│  ├─ BasePage.ts
│  ├─ LoginPage.ts
│  ├─ SecurePage.ts
│  ├─ CheckboxesPage.ts
│  └─ PageManager.ts
└─ tests/
   ├─ login.spec.ts
   └─ checkboxes.spec.ts
```

---

## 👀 TypeScript visibility cheatsheet

| Keyword      | Accessible from…                              | Typical use                   |
|--------------|-----------------------------------------------|-------------------------------|
| `public`     | Everywhere (`page.method()` in tests, etc.)   | **Business actions** (`login()`, `addToCart()`) |
| `protected`  | Class itself **and subclasses**               | **Low-level helpers** (`basePageFill`, `basePageClick`) |
| `private`    | Declaring class only                          | Internal state you never expose |

### Example

```ts
abstract class BasePage {
  protected async basePageFill(sel: string | Locator, v: string) {
    await this.toLocator(sel).fill(v);
  }
}

class LoginPage extends BasePage {
  async login(u: string, p: string) {
    await this.basePageFill('#username', u);
    await this.basePageFill('#password', p);
  }
}

// ✅ inside LoginPage         → allowed
// ❌ inside a test file       → mp.loginPage.basePageFill(...)  // compiler error
```

### Why keep helpers `protected`?

1. **Encapsulation** – tests talk in *business language* (`login`, `open`) rather than raw clicks.
2. **Refactor-safety** – change the helper once; no tests break.
3. **Cleaner API** – page objects decide what to expose publicly.

> Need to call a helper from a test?  
> You *can* make it `public`, but you’ll leak low-level details and lose the abstraction that keeps tests readable.

---

Happy testing! 🚀
