import Download from 'lucide-react/dist/esm/icons/download'
import { Info, Pen, Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import { handleDownload } from '../utils/downloadHandler'
import formatDate from '../utils/formatDate'
import { useState } from 'react'
import api from '../utils/axios.js'
import toast from 'react-hot-toast'
import ConfirmModal from './ConfirmModal'

const NotesCard = ({ _id, title, thumbnail, subject, semester, description, fileUrl, createdAt, updatedAt, onDelete }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const wordLimit = 10;
  const words = description?.split(' ') || [];
  const isLong = words.length > wordLimit;

  const [isDeleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setDeleting(true)
      const response = await api.delete(`/delete/${_id}`)
      if (response.status == 200 || response.status == 204) {
        toast.success(`${title} Deleted successfully`)
        onDelete(_id)
      }
    } catch (error) {
      toast.error("Error deleting the notes")
      console.error(error)
    } finally {
      setDeleting(false)
    }
  }

  const confirmDelete = () => {
    setConfirmOpen(false)
    handleDelete()
  }

  return (
    <div className="card bg-base-100 rounded-[12px] border border-base-300 overflow-hidden shadow-sm h-full flex flex-col">
      <figure className="w-full h-40 md:h-48 overflow-hidden flex-shrink-0">
        <img src={thumbnail} alt={title} loading='lazy' className="w-full h-full object-cover rounded-t-[8px] [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]" />
      </figure>

      <div className="card-body p-4 gap-2 flex flex-col flex-1">
        {/* FIXED HEIGHT CONTAINER TO ALIGN CONTENT BELOW */}
        <div className=" h-[200px] md:h-[140px] flex flex-col">
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex flex-row gap-2 flex-wrap mt-1">
            <span className="badge badge-ghost border border-base-300 p-3 text-xs">Subject: {subject}</span>
            <span className="badge badge-ghost border border-base-300 p-3 text-xs">Semester: {semester}</span>
          </div>

          <div className="mt-2">
            <p className="text-sm opacity-70 line-clamp-2">
              {description}
            </p>
            {isLong && (
              <Link
                to={`/notes/${_id}`}
                className="text-primary text-[15px] ml-1 hover:underline"
              >
                ...Read more
              </Link>
            )}
          </div>
        </div>

        {/* BOTTOM CONTENT AREA */}
        <div className="flex flex-col flex-1 gap-2 justify-between">
          <div>
            <div className='flex flex-col gap-2 text-[13px] text-pretty'>
              <p className={updatedAt != createdAt ? 'font-semibold' : 'font-medium'}>Last Updated: {updatedAt === createdAt ? "No updates yet" : formatDate(updatedAt)}</p>
              <p className='font-medium'>Created: {formatDate(createdAt)} IST </p>
            </div>

            <div className='flex flex-col md:flex-row gap-3 mt-5'>
              <div className='flex gap-2 md:flex-row flex-col md:items-center md:gap-2 md:flex-1'>
                <Link to={`/notes/${_id}`} className="btn btn-outline w-full md:w-auto"><Info /> Info</Link>
                <Link to={`/update/${_id}`} className="btn btn-outline w-full md:w-auto"><Pen /> Edit</Link>
                <button onClick={() => setConfirmOpen(true)} className='btn btn-outline w-full md:w-auto'><Trash2 /> Delete</button>
              </div>
            </div>
          </div>

          <button onClick={() => handleDownload(fileUrl, title)} className='btn btn-primary w-full md:w-auto flex mt-2 text-white justify-center'><Download /> Download</button>
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        confirmAction={'Delete'}
        title="Delete notes"
        message={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default NotesCard
