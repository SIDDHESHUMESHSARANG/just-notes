import { useState, useEffect } from "react";
import api from "../utils/axios";
import NotesCard from "../components/NotesCard";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
import NotesNotFound from "../components/NotesNotFound";
import { Link } from "react-router";
import { CornerDownLeft } from "lucide-react";

export default function SubjectWisePage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await api.get("/groupsubjects");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data.");
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

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
                <Link className='btn btn-primary btn-sm text-base-100' to={'/home'}><CornerDownLeft /> Back to Home</Link>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl md:text-4xl font-bold mb-0 mt-5">/ Subject Wise</h1>
                    <p className="text-sm md:text-base mt-1">Browse notes organized by subject categories.</p>
                </div>
            </div>

            <div className="flex flex-col gap-12 p-6">
                {data && data.length > 0 ? (
                    data.map((group) => (
                        <div key={group._id} className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight">{group._id}</h2>
                                <div className="h-[1px] bg-base-300 flex-1"></div>
                                <span className="badge badge-primary text-white">{group.allNotes.length} Notes</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {group.allNotes.map((note) => (
                                    <NotesCard
                                        key={note._id}
                                        _id={note._id}
                                        {...note}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <NotesNotFound text={'Sorry, No Notes Found'}/>
                )}
            </div>
        </div>
    )
}
