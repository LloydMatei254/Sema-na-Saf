import { supabase } from '../lib/supabase'
import type { Notification } from '../types/database'

class NotificationsService {
  async getNotifications(): Promise<Notification[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return data || []
  }

  async getUnreadCount(): Promise<number> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return 0

    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('read', false)

    if (error) throw error
    return count || 0
  }

  async markAsRead(id: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)

    if (error) throw error
  }

  async markAllAsRead(): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', user.id)
      .eq('read', false)

    if (error) throw error
  }

  async createNotification(
    userId: string, 
    title: string, 
    message: string, 
    type: string,
    reportId?: string
  ): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        report_id: reportId,
        title,
        message,
        type
      })

    if (error) throw error
  }

  // Real-time subscription for notifications
  subscribeToNotifications(callback: (payload: any) => void) {
    const { data: { user } } = supabase.auth.getUser()
    
    return user.then(({ user }) => {
      if (!user) return null

      return supabase
        .channel('notifications-changes')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        }, callback)
        .subscribe()
    })
  }
}

export const notificationsService = new NotificationsService()