import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import NotesCard from "../components/NotesCard";
import NotesNotFound from "../components/NotesNotFound";
import api from "../utils/axios";
import { CornerDownLeft } from "lucide-react";

export default function SearchResultPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!query && (!start || !end)) return;

            try {
                setLoading(true);
                setData([]);

                let response;
                if (start && end) {
                    response = await api.get(`/search/time`, { params: { start, end } });
                } else {
                    response = await api.get(`/search`, { params: { title: query } });
                }

                setData(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query, start, end]);

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
        <div className="min-h-screen bg-base-100">
            <div className="p-6">
                <Link className='btn btn-primary btn-sm text-base-100' to={'/home'}>
                    <CornerDownLeft /> Back to Home
                </Link>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl md:text-4xl font-bold mb-0 mt-5">/ Search Results</h1>
                    <p className="text-sm md:text-base mt-1">
                        Results for: <strong className="text-primary">{start && end ? `${start} to ${end}` : query}</strong>
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {data && data.length > 0 ? (
                        data.map((item) => (
                            <NotesCard
                                key={item.id || item._id}
                                _id={item.id || item._id}
                                {...item}
                            />
                        ))
                    ) : (
                        <div className="col-span-full">
                            <NotesNotFound text={`Notes for "${start && end ? start + ' to ' + end : query}" not found`} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
