import { useState, useEffect } from 'react'
import { notificationsService } from '../services/notifications.service'
import type { Notification } from '../types/database'
import { useAuth } from '../contexts/AuthContext'

export const useNotifications = () => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadNotifications = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)
      const [notificationsData, unreadCountData] = await Promise.all([
        notificationsService.getNotifications(),
        notificationsService.getUnreadCount()
      ])
      setNotifications(notificationsData)
      setUnreadCount(unreadCountData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await notificationsService.markAsRead(id)
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  const markAllAsRead = async () => {
    try {
      await notificationsService.markAllAsRead()
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err)
    }
  }

  useEffect(() => {
    if (user) {
      loadNotifications()
    }
  }, [user])

  // Real-time subscription
  useEffect(() => {
    if (!user) return

    const subscriptionPromise = notificationsService.subscribeToNotifications(() => {
      loadNotifications()
    })

    return () => {
      subscriptionPromise?.then(subscription => {
        subscription?.unsubscribe()
      })
    }
  }, [user])

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refresh: loadNotifications
  }
}