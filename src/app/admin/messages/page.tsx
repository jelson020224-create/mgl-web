import prisma from '@/lib/prisma'
import Link from 'next/link'

async function markRead(formData: FormData) {
  'use server'
  const { markMessageRead } = await import('../actions')
  await markMessageRead(Number(formData.get('id')))
}

async function delMessage(formData: FormData) {
  'use server'
  const { deleteMessage } = await import('../actions')
  await deleteMessage(Number(formData.get('id')))
}

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <>
      <h1 className="text-2xl font-bold text-black mb-6">
        Messages
        {messages.filter(m => !m.read).length > 0 && (
          <span className="ml-2 text-sm font-normal text-orange">
            ({messages.filter(m => !m.read).length} unread)
          </span>
        )}
      </h1>

      {messages.length === 0 ? (
        <div className="card p-12 text-center text-gray">
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`card p-6 ${!m.read ? 'border-l-4 border-orange' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-black">{m.name}</h3>
                  <p className="text-sm text-gray">{m.email} {m.phone && `| ${m.phone}`}</p>
                </div>
                <div className="flex gap-2">
                  {!m.read && (
                    <form action={markRead}>
                      <input type="hidden" name="id" value={m.id} />
                      <button type="submit" className="text-xs text-orange hover:underline">Mark Read</button>
                    </form>
                  )}
                  <form action={delMessage}>
                    <input type="hidden" name="id" value={m.id} />
                    <button type="submit" className="text-xs text-red-500 hover:underline">Delete</button>
                  </form>
                </div>
              </div>
              <p className="text-gray leading-relaxed whitespace-pre-line">{m.message}</p>
              <p className="text-xs text-gray mt-3">{m.createdAt.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
