---
name: react-file-organization
description: Personal React and Next.js file organization style for restructuring imports, component sections, and local formatting without changing behavior.
allowed-tools: Read, Write, Edit
version: 1.0
priority: OPTIONAL
---

# React File Organization

> **Optional personal skill** - Use this when the goal is to reorganize a React file according to a strict structural preference, without changing behavior.

---

## Goal

Organize a React file following the rules below.

**Do not change functionality.**
Only reorganize structure, imports, and presentation where the rules explicitly allow it.

This skill is intentionally opinionated and personal.
It is meant to make the file "feel right" for this specific organization style, not to enforce a universal best practice.

---

## Activation Behavior

If the user invokes this skill by name without clearly providing the target file:

- do not start reorganizing anything yet
- do not guess the file automatically
- confirm that the skill is ready
- ask which React file should be organized

Use a short response such as:

```md
Skill `react-file-organization` loaded.

I can reorganize a React file using this personal structure style without changing behavior.

Which file should I organize?
```

Only proceed after the user provides the target file or a clear file reference.

---

## Safe Operating Mode

Apply this skill only when all of the following are true:

- the target is clearly a React file (`.tsx`, `.jsx`, or a React component file)
- the file can be reorganized without changing runtime behavior
- hooks, requests, and local declarations are already at top level of the component body
- the requested change is organizational, not functional

If the file does **not** fit this structure:
- do **not** force the full pattern
- do **not** invent missing sections
- do **not** convert APIs or libraries
- do **not** move code in a way that changes execution order or semantics

If there is any real risk of behavioral change, stop and explain which part is unsafe to reorder.

---

## Applicability Rules

- If the file does not use `Formik`, skip the `Formik` section entirely.
- If the file does not use `React.useEffect`, do not invent one.
- If the file does not use API hooks or async access logic, skip request grouping.
- If the file does not use one specific icon library, preserve the current icon approach instead of forcing a replacement.
- If the file does not use `zustand`, context hooks, or external hooks, do not create fake hook groupings just to fit the pattern.
- If there are no multiline imports, do not create them artificially.
- If the file already follows another stable organization style and reorganizing it would create churn without benefit, keep the file mostly as-is.
- If the file uses `fetch`, route handlers, server actions, service calls, or request helpers instead of hook-based data access, group them under the same "data access / requests" concept without forcing a specific library pattern.

---

## Hard Safety Stops

Do **not** use this skill to:

- rewrite business logic
- rename functions, variables, or props unless strictly required for organization and clearly safe
- convert component style (`function` ↔ `const`)
- change hook dependencies
- move hooks across conditional logic
- move declarations in ways that can affect hoisting, closures, or side effects
- remove comments that carry important business or implementation context
- delete code unless it is clearly unused import noise or dead commented-out code with no project value

When in doubt, prefer partial organization over risky cleanup.

---

## 1. Import Structure

```typescript
import React from 'react' // always first

// mandatory blank line

// default imports (without {}) - smaller → larger by the imported identifier
import Input from '@/components/commons/input'
import CpfMask from '@/masks/cpf.mask'
import useUserStore from '@/zustand/user.store'
import getUserLabel from '@/lib/user-label'

// mandatory blank line

// named imports with {} - smaller → larger by the content inside the braces
import { api } from '@/trpc/react'
import { revalidatePath } from 'next/cache'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useFormik } from 'formik'
import { Eye, EyeOff, Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

// mandatory blank line

// multiline imports - each block separated by a blank line
import {
  Select,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

// mandatory blank line

import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'

// mandatory blank line

// imports with * or type - always last
import * as Yup from 'yup'
```

---

## 2. Internal Component Structure

```typescript
const Component: React.FC = () => {
  // 1. React local hooks
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState(false)

  // 2. external hooks / store hooks / context hooks
  const { modalState, setModal } = useModalStore()
  const { setLoading } = useLoadingStore()
  const { dbUser } = useUserStore()

  // 3. data hooks / requests / async access layer
  const { data: users } = api.user.getAll.useQuery()
  const { data: positions } = api.position.getAll.useQuery()
  const { mutateAsync: createUser } = api.user.create.useMutation()

  // 4. form state
  const formik = useFormik({ ... })

  // 5. derived values / custom functions / handlers
  const handleSubmit = React.useMemo(() => { ... }, [])

  // 6. effects
  React.useEffect(() => { ... }, [])

  // 7. return
  return (...)
}
```

---

## 3. Icon Rules

- Never place icons inside buttons for this organization style
- If the file already uses an icon library consistently, preserve it instead of forcing a replacement

```typescript
// preferred for this style
<Eye />

// avoid this pattern in this organization style
<button><Eye /></button>
```

---

## 4. General Rules

- Always respond in Portuguese
- Always keep spacing between import groups
- Remove unused imports when clearly safe
- Remove commented code only when it is clearly dead noise and not useful documentation
- If section comments are kept after reorganization, rename them to generic and readable labels
- Prefer labels such as `React Hooks`, `External Hooks`, `Data Access / Requests`, `Form State`, `Custom Functions`, `Effects`
- Do not change behavior, only organize
- Follow the order even when some sections do not exist
- If a section does not exist in the file, skip it naturally
- If a rule conflicts with file safety, preserve safety first
- Organize by structural role in the file, not by forcing one exact technology choice

---

## 5. Sorting Criteria

### Default Imports

Count the imported identifier before `from`:

```typescript
import Input from '@/components/commons/input'
import useModalStore from '@/zustand/modal.store'
import useLoadingStore from '@/zustand/loading.store'
```

### Named Imports

Count the content inside `{}`:

```typescript
import { api } from '@/trpc/react'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
```

---

## Validation After Reorganization

After reorganizing the file, run the lightest relevant validation available in the project.

Preferred order:

1. `typecheck`
2. `lint`
3. `check`

If these scripts exist in `package.json`, prefer them in that order.

Examples:

```bash
npm run typecheck
npm run lint
npm run check
```

Rules:

- choose the most relevant and least destructive validation first
- do not invent commands that the project does not have
- if no validation script exists, say that the file was reorganized but no automatic validation was available
- if validation fails, report the failure clearly instead of pretending the reorganization is complete
- if validation fails because of the reorganization pass, read the error, fix the issue, and validate again
- only auto-fix issues that were introduced by the reorganization itself
- do not expand into unrelated project cleanup just because validation exposed older problems
- if the remaining failure is pre-existing or not clearly caused by the reorganization, stop and explain it clearly

Goal:

- confirm that the organization pass did not break imports, types, or basic project rules

---

## Execution Prompt

Use this command when applying the skill:

**"Organize this React file following exactly all rules from the prompt above. Do not change behavior, only reorganize."**

If needed, you may also use this safer variant:

**"Organize this React file using the react-file-organization skill. Apply the style only where it is safe, skip missing sections naturally, and do not change behavior."**

---

## Notes

- This skill is intentionally opinionated.
- It is not a global Dev Booster rule.
- It should not be auto-loaded by any booster.
- Use it only when this exact organization style is desired.
- Prefer making the user happy over forcing mechanical symmetry.
