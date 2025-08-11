# Admin Components

This directory contains shared components and utilities for the admin panel.

## Structure

```
src/components/admin/
├── constants.ts          # Shared constants, messages, and CSS classes
├── utils.ts              # Utility functions for error handling and formatting
├── FormComponents.tsx    # Reusable form components (FormField, ActionButtons, etc.)
└── FileUploadField.tsx   # Specialized file upload component
```

## Components

### FormComponents.tsx

- **FormField**: Generic form field with label and error message
- **ActionButtons**: Standardized edit/delete button pair
- **TagManager**: Interactive tag management interface
- **SubmitButton**: Context-aware submit button for forms

### FileUploadField.tsx

- **FileUploadField**: File upload component with proper typing

### constants.ts

Contains all shared constants to avoid duplication:
- **ADMIN_CONSTANTS**: Session duration, storage keys
- **MESSAGES**: Success, error, and validation messages  
- **CSS_CLASSES**: Standardized CSS class names

### utils.ts

Utility functions for common operations:
- **showErrorToast/showSuccessToast**: Consistent toast notifications
- **formatDateForInput**: Date formatting for HTML inputs
- **createErrorHandler**: Factory for error handling functions

## Usage

```tsx
import { FormField, SubmitButton } from "../../components/admin/FormComponents";
import { showSuccessToast, createErrorHandler } from "../../components/admin/utils";
import { MESSAGES, CSS_CLASSES } from "../../components/admin/constants";

// Use in forms
<FormField name="title" label="Title" type="text" />
<SubmitButton isEditing={!!editingItem} />

// Use for error handling
const handleError = createErrorHandler(MESSAGES.ERROR.LOAD_DATA);
```

## Benefits

1. **Consistency**: All admin pages use the same UI components and styling
2. **Maintainability**: Changes to common functionality only need to be made in one place
3. **Type Safety**: Full TypeScript support with proper typing
4. **Error Handling**: Standardized error messages and toast notifications
5. **Reduced Code Duplication**: Common patterns are abstracted into reusable components