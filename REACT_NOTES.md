# React Notes — learning log for this project

This file explains every React concept used in the portfolio, with real snippets
from `frontend/src/`. Read it top to bottom once, then use it as a reference —
it'll grow as we add more to the site. Goal: you should be able to explain any
line of this codebase in an interview.

---

## 1. JSX — what `<div>...</div>` inside JS actually is

```jsx
function Footer() {
  return <footer className="border-t border-border px-6 py-8">Hi</footer>;
}
```

That HTML-looking syntax is **JSX**. It's not HTML — it compiles to plain
JS function calls (`React.createElement(...)`). Two rules that trip people up
coming from HTML:

- `class` → `className` (because `class` is a reserved word in JS).
- Every component must return **one** root element. That's why you'll see
  `<>...</>` (a "Fragment") wrapping multiple siblings — a Fragment groups
  elements without adding an extra `<div>` to the DOM. See `App.jsx`.

Anything inside `{ }` in JSX is plain JavaScript:

```jsx
<h1>Hi, I'm {profile.name.split(" ")[0]}</h1>
```

That's just `profile.name.split(" ")[0]` evaluated and dropped into the markup.

---

## 2. Components & props — functions that return UI

A component is just a function, PascalCase by convention, that returns JSX.
`props` is the single argument — an object of whatever the parent passed in.

```jsx
// SectionHeading.jsx
export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mb-12 text-center">
      <h2 className="font-heading text-3xl font-bold sm:text-4xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="mx-auto mt-3 max-w-xl text-sm text-text-dim">{subtitle}</p>}
    </Reveal>
  );
}
```

`{ eyebrow, title, subtitle }` is **destructuring** the props object right in
the function signature. Used like:

```jsx
<SectionHeading eyebrow="Get to know me" title="About" />
```

`subtitle` wasn't passed here, so inside the component it's `undefined`, and
`{subtitle && <p>...}` (see §4) simply renders nothing.

---

## 3. Composition — passing components as `children`

`children` is a special prop: whatever you put *between* a component's open
and close tags.

```jsx
// Reveal.jsx
export default function Reveal({ children, delay = 0, y = 24, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

```jsx
<Reveal delay={0.1}>
  <p>This fades and slides up when it scrolls into view.</p>
</Reveal>
```

`Reveal` doesn't know or care what's inside it — that's the point. It's a
reusable "behavior wrapper." Every scroll animation on the site reuses this
one component instead of repeating the same `motion.div` config everywhere.

`delay = 0` and `y = 24` are **default parameter values** — used only if the
caller doesn't pass that prop.

---

## 4. Conditional rendering

Three patterns show up in this codebase:

**`&&` — render something or nothing:**
```jsx
{status === "success" && (
  <p className="flex items-center gap-2 text-sm text-neon-green">
    Message sent — I'll get back to you soon.
  </p>
)}
```
If the left side is `false`, React renders nothing. If it's truthy, it renders
the right side. (Gotcha to know for interviews: `{0 && <X/>}` would render the
literal `0`, since `0` is falsy but not `false`/`null`/`undefined`. Not an
issue here since we're always comparing strings, but it's a classic React bug.)

**Ternary — render one of two things:**
```jsx
{status === "submitting" ? (
  <> <Loader2 className="animate-spin" /> Sending… </>
) : (
  <> <Send /> Send Message </>
)}
```

**Multiple exclusive states**, as in `Contact.jsx`'s `status` (`idle | submitting
| success | error`) — a single `useState` string, checked with `===` in a few
places, is simpler than four separate booleans that could contradict each other.

---

## 5. Lists & `key`

```jsx
{skillGroups.map((group) => (
  <div key={group.label}>
    ...
    {group.skills.map((skill) => (
      <span key={skill} className="glass rounded-full ...">{skill}</span>
    ))}
  </div>
))}
```

Every element produced by `.map()` needs a **stable, unique** `key` prop.
React uses it to match array items across re-renders (so it can reorder/update
the right DOM node instead of tearing everything down and rebuilding it). Use
real IDs when you have them; array `index` as a key is a last resort (breaks
if items get reordered or removed).

---

## 6. State — `useState`

```jsx
const [status, setStatus] = useState("idle");
```

`useState("idle")` returns a pair: the current value (`status`) and a setter
function (`setStatus`). Calling `setStatus("submitting")` does two things:
updates the value for the *next* render, and tells React to re-render this
component. You never mutate state directly (`status = "submitting"` would do
nothing visible) — always go through the setter.

`Navbar.jsx` has two: `open` (mobile menu) and `scrolled` (navbar background).
Each `useState` call is independent — React doesn't care how many you have.

---

## 7. Effects — `useEffect`

```jsx
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 8);
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

`useEffect` runs code that isn't about rendering JSX — subscribing to a
browser event, in this case. The **dependency array** (`[]` here) controls
when it re-runs:
- `[]` → run once, after the first render (mount).
- `[someVar]` → re-run whenever `someVar` changes.
- omitted entirely → runs after *every* render (rarely what you want).

The function returned from inside the effect (`return () => window.removeEventListener(...)`)
is the **cleanup function** — React calls it before the component unmounts
(or before re-running the effect again). Skipping cleanup here would leak a
new scroll listener every time the component mounted, which is a common real
bug in production React apps.

---

## 8. Refs — `useRef`

```jsx
const honeypotRef = useRef(null);
// ...
<input ref={honeypotRef} type="text" className="absolute -left-[9999px] ..." />
// ...
if (honeypotRef.current?.value) { /* bot detected */ }
```

`useRef` gives you a mutable box (`{ current: ... }`) that **doesn't trigger a
re-render** when it changes — unlike `useState`. Attaching it to a DOM element
via `ref={...}` lets you read that element directly (`honeypotRef.current.value`)
without React re-rendering on every keystroke. Used here for a spam-honeypot
field precisely because we don't want it wired into form validation state —
we just want to peek at it once, at submit time.

---

## 9. Forms — `react-hook-form` + `zod`

Doing this "by hand" with `useState` for every field gets messy fast. Instead:

```jsx
const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  organization: z.string().trim().optional(),
  purpose: z.string().trim().min(10, "Tell me a bit more (10+ characters)"),
});

const { register, handleSubmit, reset, formState: { errors } } = useForm({
  resolver: zodResolver(contactSchema),
});
```

- **zod** (`z.object({...})`) declares the *shape* data must have — a schema.
  `zodResolver` plugs that schema into react-hook-form as its validator.
- **`register("name")`** wires an `<input>` up to the form's internal state —
  spread it onto the element: `<input {...register("name")} />`. It returns
  the `name`, `onChange`, `onBlur`, `ref` props the input needs; you never
  write `onChange={...}` yourself for these fields.
- **`handleSubmit(onSubmit)`** wraps your submit handler: it runs zod
  validation first, and only calls `onSubmit(data)` with the *validated* data
  if everything passes. If not, it populates `errors` instead and your
  function never runs.
- **`errors.name?.message`** — the `?.` (optional chaining) avoids a crash
  when `errors.name` doesn't exist yet (no error on that field).
- **`reset()`** clears the form back to its default values — called after a
  successful submit.

This is the same pattern (schema + resolver + register) you'll see in most
production React forms — worth knowing cold for interviews.

---

## 10. Animation — Framer Motion

Two flavors used here:

**Animate once on mount** (`Hero.jsx`):
```jsx
<motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
```
`initial` = starting styles, `animate` = target styles, Framer tweens between
them automatically.

**Animate when scrolled into view** (`Reveal.jsx`, reused everywhere else):
```jsx
<motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
```
`whileInView` + `viewport={{ once: true }}` means: animate to this state the
first time 20% of the element (`amount: 0.2`) enters the viewport, then leave
it alone (don't replay on every scroll up/down).

**Exit animations** (`Navbar.jsx` mobile menu):
```jsx
<AnimatePresence>
  {open && (
    <motion.ul exit={{ height: 0, opacity: 0 }} ...>
```
Normally, when JSX stops rendering an element (`open` becomes `false`), React
removes it from the DOM instantly. `AnimatePresence` intercepts that removal,
plays the `exit` animation first, and *then* actually unmounts it.

---

## 11. Project structure conventions used here

```
src/
  components/    one file per UI component (PascalCase filenames)
  data/          resumeData.js — content, not code. Components import from
                 here instead of hardcoding text, so editing your resume
                 details never means touching JSX.
  lib/           small non-React helper functions (cn() for merging Tailwind classes)
```

`@/components/...` imports (e.g. in `App.jsx`) work because of the path alias
set up in `vite.config.js` (`'@': path.resolve(__dirname, './src')`) and mirrored
in `jsconfig.json` for editor autocomplete. `@/` always means `src/`.

---

## Glossary (quick lookups)

| Term | One-liner |
|---|---|
| Mount / unmount | A component appearing in / disappearing from the DOM for the first/last time |
| Re-render | React re-running a component function to compute new JSX after state/props change |
| Controlled input | An input whose value is driven by React state (react-hook-form manages this for us) |
| Prop drilling | Passing a prop through several layers of components just to reach a deep child — a smell; not really hit yet in this small a project |
| Hook | Any function starting with `use...` (`useState`, `useEffect`, `useRef`, `useForm`) — hooks can only be called at the top level of a component, never inside `if`/loops |
