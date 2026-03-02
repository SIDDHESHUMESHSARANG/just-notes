import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import api from '../utils/axios'
import { toast } from 'react-hot-toast'
import { Loader2, CornerDownLeft } from 'lucide-react'

const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [semester, setSemester] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [fileUrl, setFileUrl] = useState(null)
  const [isPublished, setIsPublished] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !title ||
      !subject ||
      !semester ||
      !description ||
      !thumbnail ||
      !fileUrl
    ) {
      toast.error('All fields and files are required')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('subject', subject)
    formData.append('semester', semester)
    formData.append('description', description)
    formData.append('thumbnail', thumbnail)
    formData.append('fileUrl', fileUrl)
    formData.append('isPublished', isPublished)

    try {
      setLoading(true)
      await api.post('/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      toast.success('Notes created successfully')
      navigate('/home')
    } catch (error) {
      console.error(error)
      toast.error(
        error.response?.data?.message || 'Failed to create notes'
      )
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-dots loading-lg text-primary"></span>
          <p className="text-lg font-semibold text-base-content/70 animate-pulse">
            Creating your notes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-6">

      <Link to="/home" className="btn btn-primary btn-sm text-base-100">
                <CornerDownLeft /> Back to Home
      </Link>

      <div className='flex flex-col gap-2 mb-5 mt-5'>
        <h1 className="text-2xl md:text-4xl font-bold">/ Create Notes</h1>
        <p className="text-sm md:text-base mt-1">create new notes and resources here.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-4xl mt-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="input input-bordered w-full"
        />

        <input
          type="number"
          placeholder="Semester (1-6)"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="input input-bordered w-full"
          min={1}
          max={6}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
        />

        <div>
          <label className="block mb-1 font-medium">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />
          {thumbnail && (
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="thumbnail preview"
              className="mt-2 h-24 object-cover"
            />
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">PDF File</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFileUrl(e.target.files[0])}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Publish now?</span>
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
          disabled={loading}
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default CreatePage