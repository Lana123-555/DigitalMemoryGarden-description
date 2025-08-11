import { Field, ErrorMessage } from "formik";
import { CSS_CLASSES } from "./constants";

interface FormFieldProps {
  name: string;
  label: string;
  type?: "text" | "number" | "date" | "checkbox";
  as?: "select";
  children?: React.ReactNode;
  placeholder?: string;
}

export function FormField({
  name,
  label,
  type = "text",
  as,
  children,
  placeholder,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className={CSS_CLASSES.LABEL}>
        {label}
      </label>
      <Field
        type={type}
        name={name}
        as={as}
        placeholder={placeholder}
        className={
          type === "checkbox" ? "p-2 border rounded" : CSS_CLASSES.INPUT
        }
      >
        {children}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className={CSS_CLASSES.ERROR_MESSAGE}
      />
    </div>
  );
}

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  editLabel?: string;
  deleteLabel?: string;
}

export function ActionButtons({
  onEdit,
  onDelete,
  editLabel = "Редагувати",
  deleteLabel = "Видалити",
}: ActionButtonsProps) {
  return (
    <div>
      <button
        onClick={onEdit}
        className={CSS_CLASSES.BUTTON_WARNING}
        type="button"
      >
        {editLabel}
      </button>
      <button
        onClick={onDelete}
        className={CSS_CLASSES.BUTTON_DANGER}
        type="button"
      >
        {deleteLabel}
      </button>
    </div>
  );
}

interface TagManagerProps {
  tags: string[];
  newTag: string;
  onNewTagChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (index: number) => void;
  addButtonLabel?: string;
  placeholder?: string;
}

export function TagManager({
  tags,
  newTag,
  onNewTagChange,
  onAddTag,
  onRemoveTag,
  addButtonLabel = "Додати",
  placeholder = "Новий тег",
}: TagManagerProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => onNewTagChange(e.target.value)}
          placeholder={placeholder}
          className={CSS_CLASSES.INPUT}
        />
        <button
          type="button"
          onClick={onAddTag}
          className={CSS_CLASSES.BUTTON_ADD_TAG}
        >
          {addButtonLabel}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <div key={index} className={CSS_CLASSES.TAG}>
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => onRemoveTag(index)}
              className={CSS_CLASSES.TAG_REMOVE}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SubmitButtonProps {
  isEditing: boolean;
  addLabel?: string;
  updateLabel?: string;
}

export function SubmitButton({
  isEditing,
  addLabel = "Додати",
  updateLabel = "Оновити",
}: SubmitButtonProps) {
  return (
    <button type="submit" className={CSS_CLASSES.FORM_SUBMIT}>
      {isEditing ? updateLabel : addLabel}
    </button>
  );
}

interface FormButtonsProps {
  isEditing: boolean;
  onCancel: () => void;
  addLabel?: string;
  updateLabel?: string;
}

export function FormButtons({
  isEditing,
  onCancel,
  addLabel = "Додати",
  updateLabel = "Оновити",
}: FormButtonsProps) {
  return (
    <div className="flex gap-2">
      <button type="submit" className={CSS_CLASSES.BUTTON_PRIMARY}>
        {isEditing ? updateLabel : addLabel}
      </button>
      {isEditing && (
        <button
          type="button"
          onClick={onCancel}
          className={CSS_CLASSES.BUTTON_SECONDARY}
        >
          Скасувати
        </button>
      )}
    </div>
  );
}
