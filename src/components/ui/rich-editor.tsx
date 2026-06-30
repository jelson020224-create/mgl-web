'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

export default function RichEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content,
    editorProps: {
      attributes: { class: 'ProseMirror' },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  if (!editor) return null

  const tools = [
    { label: 'Bold', action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
    { label: 'Italic', action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
    { label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
    { label: 'H3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }) },
    { label: 'Bullet', action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
    { label: 'Ordered', action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') },
  ]

  return (
    <div className="border border-sand rounded-lg overflow-hidden">
      <div className="editor-toolbar">
        {tools.map(t => (
          <button key={t.label} type="button" onClick={t.action} className={t.active ? 'is-active' : ''}>
            {t.label}
          </button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
