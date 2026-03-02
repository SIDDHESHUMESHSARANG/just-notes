import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { CornerDownLeft } from 'lucide-react'
import NotesCard from '../components/NotesCard'
import NotesNotFound from '../components/NotesNotFound'
import toast from 'react-hot-toast'
import api from '../utils/axios'

const UnpublishedNotes = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await api.get('/unp-notes')
                setData(response.data)
                
            } catch (error) {
                toast.error('Failed to load notes')
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    },[])

    const handleRemoveFromUI = (id) => {
        setData((prevData) => prevData.filter((note) => (note._id || note.id) !== id));
    };

  return (
    <div>
          <Link to="/home" className="btn btn-primary btn-sm text-base-100 ml-6 mt-10">
              <CornerDownLeft /> Back to Home
          </Link>
          <div className="flex p-6 flex-col gap-2">
              <h1 className="text-2xl md:text-4xl font-bold mb-0 ">/ Unpublished Notes</h1>
              <p className="text-sm md:text-base mt-1">Here find and manage the notes which aren't published yet.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {data && data.length > 0 ? (
                  data.map((item) => (
                      <NotesCard
                          key={item.id || item._id}
                          _id={item.id || item._id}
                          {...item}
                          onDelete={handleRemoveFromUI}
                      />
                  ))
              ) : (
                  <div className="col-span-full">
                      <NotesNotFound text={'No unpublished notes found'} />
                  </div>
              )} 
          </div>
    </div>
  )
}

export default UnpublishedNotes