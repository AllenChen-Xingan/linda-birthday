import { useState, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useBlessings } from '../hooks/useBlessings'

type RecordMode = 'audio' | 'video' | null
type Lang = 'en' | 'zh'

const t = {
  en: {
    title: 'A Blessing for Linda',
    subtitle: "Linda is turning 20 today. Leave a wish, a photo, a voice note — anything you'd like her to see on her Blessing Tree.",
    nameLabel: 'Your name',
    namePlaceholder: 'e.g. Allen',
    messageLabel: 'Your message',
    messagePlaceholder: 'Write something for Linda...',
    attachLabel: 'Attach something (optional)',
    recordVoice: '🎙️ Record voice',
    recordVideo: '📹 Record video',
    recording: 'Recording',
    stopRecording: 'Stop recording',
    removeRetry: 'Remove and try again',
    sending: 'Sending...',
    sendBlessing: 'Send Blessing 🌸',
    successTitle: 'Blessing sent!',
    successMsg: "Your blessing is now a leaf on Linda's tree. Thank you 🌸",
    sendAnother: 'Send another blessing',
    footer: 'Happy 20th Birthday, Linda 🌸 March 15, 2026',
    permError: 'Could not access microphone/camera. Please check permissions.',
    uploadFail: 'Upload failed. Please try again.',
  },
  zh: {
    title: '给 Linda 的祝福',
    subtitle: 'Linda 今天 20 岁啦！留下一句祝福、一张照片、一段语音——任何你想让她在祝福树上看到的东西。',
    nameLabel: '你的名字',
    namePlaceholder: '例如 Allen',
    messageLabel: '你的祝福',
    messagePlaceholder: '写下你想对 Linda 说的话...',
    attachLabel: '附件（可选）',
    recordVoice: '🎙️ 录音',
    recordVideo: '📹 录视频',
    recording: '正在录制',
    stopRecording: '停止录制',
    removeRetry: '删除并重试',
    sending: '发送中...',
    sendBlessing: '送出祝福 🌸',
    successTitle: '祝福已送达！',
    successMsg: '你的祝福已经成为树上的一片叶子 🌸',
    sendAnother: '再送一个祝福',
    footer: 'Linda 20 岁生日快乐 🌸 2026年3月15日',
    permError: '无法访问麦克风/摄像头，请检查权限。',
    uploadFail: '上传失败，请重试。',
  },
}

export default function UploadPage() {
  const { uploadBlessing } = useBlessings()
  const [lang, setLang] = useState<Lang>('en')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  const s = t[lang]

  // Recording state
  const [recordMode, setRecordMode] = useState<RecordMode>(null)
  const [recording, setRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null)

  const filePreviewUrl = useMemo(() => {
    if (!file || recordedBlob) return null
    return URL.createObjectURL(file)
  }, [file, recordedBlob])

  const startRecording = async (mode: RecordMode) => {
    if (!mode) return
    try {
      const constraints = mode === 'video'
        ? { audio: true, video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 720 } } }
        : { audio: true }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      if (mode === 'video' && videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream
        videoPreviewRef.current.play()
      }

      const mimeType = mode === 'video'
        ? (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus') ? 'video/webm;codecs=vp9,opus' : 'video/webm')
        : (MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm')

      const recorder = new MediaRecorder(stream, { mimeType })
      mediaRecorderRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType })
        setRecordedBlob(blob)
        setRecordedUrl(URL.createObjectURL(blob))
        const recordedFile = new File([blob], `recording-${Date.now()}.webm`, { type: mimeType })
        setFile(recordedFile)
        stream.getTracks().forEach(t => t.stop())
        if (videoPreviewRef.current) videoPreviewRef.current.srcObject = null
      }

      recorder.start()
      setRecording(true)
      setRecordMode(mode)
    } catch {
      alert(s.permError)
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  const clearRecording = () => {
    if (recordedUrl) URL.revokeObjectURL(recordedUrl)
    setRecordedBlob(null)
    setRecordedUrl(null)
    setRecordMode(null)
    setFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setUploading(true)
    const result = await uploadBlessing(
      name.trim(),
      message.trim() || null,
      file
    )

    if (result) {
      if (recordedUrl) URL.revokeObjectURL(recordedUrl)
      setRecordedBlob(null)
      setRecordedUrl(null)
      setRecordMode(null)
      setSuccess(true)
    } else {
      alert(s.uploadFail)
      setUploading(false)
    }
  }

  const langToggle = (
    <div className="flex justify-center mb-6">
      <div className="flex bg-cream-dark rounded-full p-0.5 text-sm">
        <button
          type="button"
          onClick={() => setLang('en')}
          className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${lang === 'en' ? 'bg-white text-text shadow-sm' : 'text-text-muted'}`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLang('zh')}
          className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${lang === 'zh' ? 'bg-white text-text shadow-sm' : 'text-text-muted'}`}
        >
          中文
        </button>
      </div>
    </div>
  )

  if (success) {
    return (
      <div className="min-h-dvh bg-cream flex items-center justify-center px-4">
        <motion.div
          className="max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, 10, -10, 0], y: [0, -10, 0] }}
            transition={{ duration: 0.6 }}
          >
            🌿
          </motion.div>
          <h2 className="font-serif text-2xl text-text mb-3">{s.successTitle}</h2>
          <p className="text-text-light text-sm mb-8">{s.successMsg}</p>
          <button
            onClick={() => {
              setSuccess(false)
              setName('')
              setMessage('')
              setFile(null)
              setUploading(false)
            }}
            className="text-sm text-gold hover:text-gold-muted underline underline-offset-4 cursor-pointer"
          >
            {s.sendAnother}
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-cream flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {langToggle}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌸</div>
          <h1 className="font-serif text-2xl md:text-3xl text-text mb-2">{s.title}</h1>
          <p className="text-text-light text-sm leading-relaxed">{s.subtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-warm-white rounded-2xl shadow-md p-6 space-y-5">
          <div>
            <label className="block text-sm text-text-light mb-2">
              {s.nameLabel} <span className="text-sakura">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={s.namePlaceholder}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/30 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold-light transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-text-light mb-2">{s.messageLabel}</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={s.messagePlaceholder}
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-cream/30 text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold-light transition-all resize-none"
            />
          </div>

          {/* File upload OR record */}
          <div>
            <label className="block text-sm text-text-light mb-3">{s.attachLabel}</label>

            {!recording && !recordedBlob && !file && (
              <div className="space-y-3">
                <div>
                  <input
                    type="file"
                    accept="image/*,audio/*,video/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gold-light file:text-white hover:file:bg-gold file:cursor-pointer cursor-pointer"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startRecording('audio')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-cream-dark text-text-light hover:bg-cream/50 text-sm transition-all cursor-pointer"
                  >
                    {s.recordVoice}
                  </button>
                  <button
                    type="button"
                    onClick={() => startRecording('video')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-cream-dark text-text-light hover:bg-cream/50 text-sm transition-all cursor-pointer"
                  >
                    {s.recordVideo}
                  </button>
                </div>
              </div>
            )}

            {recording && (
              <div className="text-center space-y-3">
                {recordMode === 'video' && (
                  <video
                    ref={videoPreviewRef}
                    muted
                    playsInline
                    className="w-full rounded-xl bg-black aspect-square object-cover"
                  />
                )}
                <div className="flex items-center justify-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-text-light">
                    {s.recording} {recordMode}...
                  </span>
                </div>
                <button
                  type="button"
                  onClick={stopRecording}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-sm transition-all cursor-pointer"
                >
                  {s.stopRecording}
                </button>
              </div>
            )}

            {!recording && recordedBlob && recordedUrl && (
              <div className="space-y-3">
                {recordMode === 'audio' && (
                  <audio controls src={recordedUrl} className="w-full" />
                )}
                {recordMode === 'video' && (
                  <video controls src={recordedUrl} className="w-full rounded-xl" />
                )}
                <button
                  type="button"
                  onClick={clearRecording}
                  className="text-sm text-text-muted hover:text-text-light underline underline-offset-4 cursor-pointer"
                >
                  {s.removeRetry}
                </button>
              </div>
            )}

            {!recording && !recordedBlob && file && (
              <div className="space-y-3">
                {file.type.startsWith('video/') && filePreviewUrl && (
                  <video
                    controls
                    playsInline
                    src={filePreviewUrl}
                    className="w-full rounded-xl"
                  />
                )}
                {file.type.startsWith('audio/') && filePreviewUrl && (
                  <audio controls src={filePreviewUrl} className="w-full" />
                )}
                {file.type.startsWith('image/') && filePreviewUrl && (
                  <img
                    src={filePreviewUrl}
                    alt="Preview"
                    className="w-full rounded-xl"
                  />
                )}
                <div className="flex items-center justify-between bg-cream/50 rounded-lg px-4 py-2.5">
                  <p className="text-xs text-text-muted truncate">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-text-muted hover:text-text-light text-sm ml-2 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={uploading || !name.trim()}
            className="w-full bg-sakura hover:bg-sakura-dark disabled:bg-cream-dark disabled:cursor-not-allowed text-white py-3 rounded-full font-medium transition-all cursor-pointer"
            whileHover={{ scale: uploading ? 1 : 1.02 }}
            whileTap={{ scale: uploading ? 1 : 0.98 }}
          >
            {uploading ? s.sending : s.sendBlessing}
          </motion.button>
        </form>

        <p className="text-center text-xs text-text-muted mt-6">{s.footer}</p>
      </motion.div>
    </div>
  )
}
