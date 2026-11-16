import { isPlaceholder } from '../../data/profile'

// Renders real values normally and placeholder values ("[...]") in a
// dashed style so it is obvious what still needs to be filled in.
export default function EditableText({ value, className = '', as: Tag = 'span' }) {
  if (isPlaceholder(value)) {
    return (
      <Tag
        className={`rounded-md border border-dashed border-muted/50 px-1.5 py-0.5 italic text-muted ${className}`}
        title="Placeholder: edit this in src/data/"
      >
        {value}
      </Tag>
    )
  }
  return <Tag className={className}>{value}</Tag>
}
