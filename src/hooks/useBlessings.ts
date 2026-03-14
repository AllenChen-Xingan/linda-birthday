import { useState, useEffect, useCallback } from 'react'
import { supabase, BUCKET_NAME } from '../lib/supabase'

export interface Blessing {
  id: string
  author_name: string
  message: string | null
  file_url: string | null
  file_type: 'image' | 'audio' | 'video' | null
  created_at: string
}

export function useBlessings() {
  const [blessings, setBlessings] = useState<Blessing[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBlessings = useCallback(async () => {
    if (!supabase) {
      setLoading(false)
      return
    }
    const { data, error } = await supabase
      .from('blessings')
      .select('*')
      .order('created_at', { ascending: true })

    if (!error && data) {
      setBlessings(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch
    fetchBlessings()

    if (!supabase) return

    // Realtime subscription
    const channel = supabase
      .channel('blessings-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'blessings' },
        (payload) => {
          setBlessings((prev) => [...prev, payload.new as Blessing])
        }
      )
      .subscribe()

    return () => {
      supabase!.removeChannel(channel)
    }
  }, [fetchBlessings])

  const uploadBlessing = async (
    authorName: string,
    message: string | null,
    file: File | null
  ): Promise<boolean> => {
    if (!supabase) return false

    let fileUrl: string | null = null
    let fileType: 'image' | 'audio' | 'video' | null = null

    if (file) {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return false
      }

      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName)

      fileUrl = urlData.publicUrl

      if (file.type.startsWith('image/')) fileType = 'image'
      else if (file.type.startsWith('audio/')) fileType = 'audio'
      else if (file.type.startsWith('video/')) fileType = 'video'
    }

    const { error } = await supabase.from('blessings').insert({
      author_name: authorName,
      message,
      file_url: fileUrl,
      file_type: fileType,
    })

    return !error
  }

  return { blessings, loading, uploadBlessing }
}
