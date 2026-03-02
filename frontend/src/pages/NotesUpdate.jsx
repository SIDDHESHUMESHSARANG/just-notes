import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router'
import api from '../utils/axios'
import { toast } from 'react-hot-toast'
import { Loader2, CornerDownLeft } from 'lucide-react'

const NotesUpdate = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [semester, setSemester] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [fileUrl, setFileUrl] = useState(null)
  const [isPublished, setIsPublished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [currentThumbnail, setCurrentThumbnail] = useState(null)
  const [currentFile, setCurrentFile] = useState(null)

  const navigate = useNavigate()

  // Fetch existing note data
  useEffect(() => {
    if (!id) return
    const fetchNote = async () => {
      try {
        setLoading(true)
        const res = await api.get(`/${id}`)
        const note = res.data
        setTitle(note.title || '')
        setSubject(note.subject || '')
        setSemester(note.semester || '')
        setDescription(note.description || '')
        setIsPublished(note.isPublished || false)
        setCurrentThumbnail(note.thumbnail || null)
        setCurrentFile(note.fileUrl || null)
      } catch (error) {
        console.error('Error fetching note:', error)
        toast.error('Failed to load note')
        navigate('/home')
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !subject || !semester || !description) {
      toast.error('All fields are required')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('subject', subject)
    formData.append('semester', semester)
    formData.append('description', description)
    formData.append('isPublished', isPublished)

    // Only append new files if they were selected
    if (thumbnail) {
      formData.append('thumbnail', thumbnail)
    }
    if (fileUrl) {
      formData.append('fileUrl', fileUrl)
    }

    try {
      setUpdating(true)
      await api.put(`/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      toast.success('Notes updated successfully')
      navigate(`/notes/${id}`)
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Failed to update notes')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-dots loading-lg text-primary"></span>
          <p className="text-lg font-semibold text-base-content/70 animate-pulse">
            Loading note details...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-6">
      <Link to={`/notes/${id}`} className="btn btn-primary btn-sm text-base-100">
        <CornerDownLeft /> Back to Note
      </Link>

      <div className='flex flex-col gap-2 mb-5 mt-5'>
        <h1 className="text-2xl md:text-4xl font-bold">/ Update Notes</h1>
        <p className="text-sm md:text-base mt-1">Edit and update your notes and resources here.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-4xl mt-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          placeholder="Semester (1-6)"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="input input-bordered w-full"
          min={1}
          max={6}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
          required
        />

        <div>
          <label className="block mb-1 font-medium">Thumbnail Image</label>
          {currentThumbnail && !thumbnail && (
            <div className="mb-2">
              <p className="text-sm text-base-content/70">Current thumbnail:</p>
              <img
                src={currentThumbnail}
                alt="current thumbnail"
                className="h-24 object-cover mt-1 rounded"
              />
              <p className="text-xs text-base-content/50 mt-1">Upload a new image to replace</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />
          {thumbnail && (
            <div>
              <p className="text-sm text-base-content/70 mt-2">New thumbnail preview:</p>
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="thumbnail preview"
                className="mt-2 h-24 object-cover"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">PDF File</label>
          {currentFile && !fileUrl && (
            <div className="mb-2 p-3 bg-base-200 rounded">
              <p className="text-sm text-base-content/70">Current file: PDF uploaded</p>
              <p className="text-xs text-base-content/50 mt-1">Upload a new PDF to replace</p>
            </div>
          )}
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFileUrl(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />
          {fileUrl && (
            <p className="text-sm text-success mt-2">New PDF selected</p>
          )}
        </div>

        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Publish?</span>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={() => setIsPublished((v) => !v)}
              className="toggle toggle-primary"
            />
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary text-white w-full flex justify-center"
          disabled={updating}
        >
          {updating ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Updating...
            </>
          ) : (
            'Update Notes'
          )}
        </button>
      </form>
    </div>
  )
}

export default NotesUpdate