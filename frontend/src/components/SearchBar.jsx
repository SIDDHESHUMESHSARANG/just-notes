import { Search, Calendar } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const [text, setText] = useState("");
  const [date, setDate] = useState({ start: "", end: "" });
  const navigate = useNavigate();

  const isDatedSearch = date.start && date.end;
  const hasText = text.trim().length > 0;

  const handleSearch = () => {
    if (!isDatedSearch) {
      if (!hasText) {
        toast("Enter text or select a date range!", {
          icon: "⚠️",
          duration: 2000,
        });
        return;
      }
      if (text.length < 3) {
        toast("Please enter at least 3 characters", {
          icon: "🅰️",
          duration: 2000,
        });
        return;
      }
    }

    const params = new URLSearchParams();
    if (text) params.append("query", text);
    if (date.start) params.append("start", date.start);
    if (date.end) params.append("end", date.end);

    navigate(`/search-results?${params.toString()}`, { replace: true });
    setText("");
    setDate({ start: "", end: "" });
  };

  return (
    <div className="flex items-center gap-5">
      <div className="dropdown dropdown-bottom">
        <div
          className="tooltip tooltip-bottom tooltip-primary"
          data-tip="Search by time range"
        >
          <div
            tabIndex={0}
            role="button"
            className={`btn btn-square flex items-center justify-center ${isDatedSearch ? 'btn-primary' : 'btn-ghost'}`}
          >
            <Calendar size={20} />
          </div>
        </div>

        <div
          tabIndex={0}
          className="dropdown-content z-[2] p-4 shadow bg-base-200 rounded-box w-64 mt-2 flex flex-col gap-2 border border-base-300"
        >
          <input
            type="date"
            className="input input-sm input-bordered w-full"
            value={date.start}
            onChange={(e) => setDate({ ...date, start: e.target.value })}
          />
          <input
            type="date"
            className="input input-sm input-bordered w-full"
            value={date.end}
            onChange={(e) => setDate({ ...date, end: e.target.value })}
          />
          {isDatedSearch && (
            <>
              <button onClick={handleSearch} className="btn btn-sm btn-primary w-full">
                Search Range
              </button>
              <button
                className="btn btn-xs btn-link text-error no-underline"
                onClick={() => setDate({ start: "", end: "" })}
              >
                Clear Dates
              </button>
            </>
          )}
        </div>
      </div>

      <div className="relative flex items-center w-full gap-2">
        <input
          type="text"
          value={text}
          placeholder="Search notes..."
          className="input input-bordered w-full"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <div className={`transition-all duration-300 transform ${hasText ? "scale-100 opacity-100" : "scale-0 opacity-0 w-0 overflow-hidden"}`}>
          <button onClick={handleSearch} className="btn btn-primary">
            <Search size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
