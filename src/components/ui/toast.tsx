'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface Toast {
  id: number
  type: 'success' | 'error'
  message: string
}

const ToastContext = createContext<((type: 'success' | 'error', message: string) => void) | null>(null)

export function useToast() {
  const fn = useContext(ToastContext)
  if (!fn) throw new Error('useToast must be inside ToastProvider')
  return fn
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((type: 'success' | 'error', message: string) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
