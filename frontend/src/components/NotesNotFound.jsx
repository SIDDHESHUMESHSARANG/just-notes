import { FileQuestion } from 'lucide-react'

const NotesNotFound = ({text}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full py-20 px-10 text-center col-span-full">
            <div className="btn btn-circle w-32 h-32 bg-base-100 border-4 border-dashed border-primary mb-6 pointer-events-none">
                <FileQuestion size={56} className="text-primary" />
            </div>

            <div className="max-w-md md:mx-auto">
                <h2 className="md:text-3xl text-2xl font-normal tracking-tight text-base-content mb-2">
                    {text}
                </h2>
            </div>
        </div>
    )
}

export default NotesNotFound
