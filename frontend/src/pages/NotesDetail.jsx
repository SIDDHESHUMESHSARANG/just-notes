import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import ConfirmModal from "../components/ConfirmModal";
import NotesNotFound from "../components/NotesNotFound";
import api from "../utils/axios";
import { CornerDownLeft, Pen, Trash2, Download, BookOpenText } from "lucide-react";
import { toast } from "react-hot-toast";
import { handleDownload } from "../utils/downloadHandler";
import formatDate from "../utils/formatDate";

const NotesDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const response = await api.delete(`/delete/${id}`);
      if (response.status === 200 || response.status === 204) {
        toast.success("Note deleted successfully");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error deleting note", error);
      toast.error("Unable to delete note");
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = () => {
    setConfirmOpen(false);
    handleDelete();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-dots loading-lg text-primary"></span>
          <p className="text-lg font-semibold text-base-content/70 animate-pulse">
            Loading your notes...
          </p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-100">
        <div className="p-6">
          <Link to="/home" className="btn btn-primary btn-sm text-base-100">
            <CornerDownLeft /> Back to Home
          </Link>
          <div className="mt-6">
            <NotesNotFound text="Note not found" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="p-6 max-w-8xl mx-auto">
        <Link to="/home" className="btn btn-primary btn-sm text-base-100">
          <CornerDownLeft /> Back to Home
        </Link>

        <div className="mt-6 w-full flex flex-col md:flex-row justify-between gap-10">
          {/* LEFT COLUMN: Main Info & Actions */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 break-words">
              {note.title}
            </h1>
            <div className="flex flex-row gap-2 flex-wrap mt-1">
              <span className="badge badge-ghost border border-base-300 p-3 text-xs">
                Subject: {note.subject}
              </span>
              <span className="badge badge-ghost border border-base-300 p-3 text-xs">
                Semester: {note.semester}
              </span>
            </div>

            {note.thumbnail && (
              <figure className="w-full h-60 md:h-80 overflow-hidden my-4">
                <img
                  src={note.thumbnail}
                  alt={note.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg"
                />
              </figure>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link
                to={`/update/${id}`}
                className="btn btn-outline w-full sm:w-auto"
              >
                <Pen /> Edit
              </Link>
              <button
                onClick={() => setConfirmOpen(true)}
                className="btn btn-outline w-full sm:w-auto"
                disabled={isDeleting}
              >
                <Trash2 /> Delete
              </button>
              <button
                onClick={() => handleDownload(note.fileUrl, note.title)}
                className="btn btn-primary w-full sm:w-auto text-white"
              >
                <Download /> Download
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Metadata & Description */}
          <div className="flex-1 flex flex-col gap-5 max-w-2xl">
            <div className="text-base leading-relaxed">
              <div className="flex flex-wrap gap-2 text-[13px] mt-3">
                <span className="badge badge-outline h-auto py-1">Created: {formatDate(note.createdAt)} IST</span>
                <span className="badge badge-outline h-auto py-1">
                  Last Updated:{" "}
                  {note.updatedAt === note.createdAt
                    ? "No updates yet"
                    : formatDate(note.updatedAt)}
                </span>
              </div>
            </div>

            <div className="mt-2">
              <h2 className="text-2xl text-primary font-semibold mb-4 flex items-center gap-2"><BookOpenText/> Description</h2>
              <p className="text-base-content/80 leading-7 whitespace-pre-wrap break-words p-6 md:p-0 rounded-3xl md:border-none border border-primary">
                {note.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete note"
        message={`Are you sure you want to delete "${note.title}"? This action cannot be undone.`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default NotesDetail;
