import Navbar from "../components/Navbar"
import NotesCard from "../components/NotesCard"
import api from "../utils/axios"
import { useEffect, useState } from "react"
import { CornerDownRight, Plus, ListFilterPlus } from "lucide-react"
import { toast } from "react-hot-toast"
import { Link } from "react-router"
import NotesNotFound from "../components/NotesNotFound"

const HomePage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await api.get('/')
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data.");
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const handleRemoveFromUI = (id) => {
    setData((prevData) => prevData.filter((note) => (note._id || note.id) !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-dots loading-lg text-primary"></span>
          <p className="text-lg font-semibold text-base-content/70 animate-pulse">
            Fetching your notes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-4xl font-bold mb-0 mt-5">/ Home</h1>
            <p className="text-sm md:text-base mt-1">Welcome to Just Notes! Explore our collection of notes and resources.</p>
          </div>

          <div className="flex flex-col w-full md:w-auto gap-3 md:flex-row md:items-center md:justify-end">
            <Link to="/create" className="btn btn-primary text-white w-full md:w-auto justify-center flex gap-2">
              Create New <Plus />
            </Link>

            <Link to="/subject-wise" className="btn btn-primary text-white w-full md:w-auto flex gap-2 items-center justify-center">
              Subject wise notes <CornerDownRight />
            </Link>

            <Link to="/count-per-semester" className="btn btn-primary text-white w-full md:w-auto flex gap-2 items-center justify-center">
              Notes Stats <CornerDownRight />
            </Link>
          </div>
        </div>
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
            <NotesNotFound text={'Oopsie, No Notes Found !'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
