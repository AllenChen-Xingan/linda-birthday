import { useState, useEffect } from 'react'
import { supabase, BUCKET_NAME } from '../lib/supabase'
import type { Blessing } from '../hooks/useBlessings'

export default function AdminPage() {
  const [blessings, setBlessings] = useState<Blessing[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const fetchAll = async () => {
    if (!supabase) { setLoading(false); return }
    const { data } = await supabase
      .from('blessings')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setBlessings(data)
    setLoading(false)
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch
  useEffect(() => { fetchAll() }, [])

  const handleDelete = async (b: Blessing) => {
    if (!supabase) return
    setDeleting(b.id)
    setConfirmId(null)

    if (b.file_url) {
      const parts = b.file_url.split(`/${BUCKET_NAME}/`)
      if (parts[1]) {
        await supabase.storage.from(BUCKET_NAME).remove([parts[1]])
      }
    }

    await supabase.from('blessings').delete().eq('id', b.id)
    setBlessings(prev => prev.filter(x => x.id !== b.id))
    setDeleting(null)
  }

  const handleDownload = async (url: string, filename: string) => {
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = filename
      a.click()
      URL.revokeObjectURL(a.href)
    } catch {
      window.open(url, '_blank')
    }
  }

  if (!supabase) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Supabase not configured.</p>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blessing Admin</h1>
            <p className="text-sm text-gray-500 mt-1">
              {blessings.length} blessing{blessings.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <button
            onClick={fetchAll}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400 text-center py-12">Loading...</p>
        ) : blessings.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No blessings yet.</p>
        ) : (
          <div className="space-y-4">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900">{b.author_name}</span>
                      {b.file_type && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          b.file_type === 'image' ? 'bg-pink-100 text-pink-700' :
                          b.file_type === 'audio' ? 'bg-amber-100 text-amber-700' :
                          b.file_type === 'video' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {b.file_type}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        {new Date(b.created_at).toLocaleString()}
                      </span>
                    </div>

                    {b.message && (
                      <p className="text-gray-700 text-sm mb-3 whitespace-pre-wrap">{b.message}</p>
                    )}

                    {/* Media preview */}
                    {b.file_url && b.file_type === 'image' && (
                      <img
                        src={b.file_url}
                        alt="Blessing"
                        className="max-w-xs max-h-48 rounded-lg object-cover mb-3"
                      />
                    )}
                    {b.file_url && b.file_type === 'audio' && (
                      <audio controls src={b.file_url} className="w-full max-w-md mb-3" />
                    )}
                    {b.file_url && b.file_type === 'video' && (
                      <video controls src={b.file_url} className="max-w-sm rounded-lg mb-3" />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 shrink-0">
                    {b.file_url && (
                      <button
                        onClick={() => handleDownload(b.file_url!, `${b.author_name}-${b.file_type || 'file'}`)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs hover:bg-blue-100 cursor-pointer"
                      >
                        Download
                      </button>
                    )}
                    {confirmId === b.id ? (
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleDelete(b)}
                          disabled={deleting === b.id}
                          className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 disabled:opacity-50 cursor-pointer"
                        >
                          {deleting === b.id ? 'Deleting...' : 'Confirm'}
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="px-3 py-1.5 text-gray-500 rounded-lg text-xs hover:bg-gray-100 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmId(b.id)}
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs hover:bg-red-100 cursor-pointer"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
