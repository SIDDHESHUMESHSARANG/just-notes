import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/axios";
import Table from "../components/Table";
import { Link } from "react-router";
import { CornerDownLeft } from "lucide-react";

export default function CountNotes() {
    const [notesPerSub, setNotesPerSub] = useState([]);
    const [subjectPerSem, setSubjectPerSem] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTable1 = async () => {
            try {
                const response = await api.get("/notespersubject");
                setNotesPerSub(response.data);
            } catch (error) {
                console.error("Table 1 Error:", error);
            } 
        };
        
        const fetchTable2 = async () => {
            try {
                const response = await api.get("/subjectpersemester");
                setSubjectPerSem(response.data);
            } catch (error) {
                console.error("Table 2 Error:", error);
            } 
        };
        
        const loadAllData = async () => {
            setLoading(true)
                await fetchTable1()
                await fetchTable2()
            setLoading(false)
        }

        loadAllData()


    }, []);

    return (
        <div className="min-h-screen">
            <div className="flex flex-col gap-2 p-6">
                <div>
                    <Link className='btn btn-primary btn-sm text-base-100' to={'/home'}><CornerDownLeft /> Back to Home</Link>
                    <h1 className="text-2xl md:text-4xl font-bold mb-0 mt-5">
                        / Notes Stats{" "}
                    </h1>
                    <p className="text-sm md:text-base mt-1 text-gray-500">
                        Statistical figures of notes and subjects in our database.
                    </p>
                </div>

                {loading ? (
                    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <span className="loading loading-dots loading-lg text-primary"></span>
                            <p className="text-lg font-semibold text-base-content/70 animate-pulse">
                                Fetching your notes...
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold mb-0 mt-5">
                                Notes Per Subject
                            </h2>
                            <Table 
                                data={notesPerSub} 
                                dataKey="_id" 
                                label="Subject"
                                supportText="Notes"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl md:text-2xl font-bold mb-0 mt-5">
                                Subjects Per Semester
                            </h2>
                            <Table
                                data={subjectPerSem}
                                dataKey="semester"
                                label="Semester"
                                supportTitle="Semester"
                                supportText="Subjects"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
