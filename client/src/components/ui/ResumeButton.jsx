import { Download } from 'lucide-react'
import Button from './Button'
import { profile } from '../../data/profile'

// Downloads the real resume PDF from /public (see profile.resumeUrl).
export default function ResumeButton({ variant = 'secondary', size = 'md', className = '' }) {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      href={profile.resumeUrl}
      download={profile.resumeFileName}
    >
      <Download size={16} aria-hidden="true" />
      Download Resume
    </Button>
  )
}
