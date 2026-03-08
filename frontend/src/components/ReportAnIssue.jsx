import { useState } from 'react'
import { BadgeAlert } from 'lucide-react'
import toast from 'react-hot-toast'
import emailjs from 'emailjs-com'
import ConfirmModal from './ConfirmModal'

const ReportAnIssue = () => {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [issue, setIssue] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmitReport = async (e) => {
        e.preventDefault()

        if (!email.trim() || !issue.trim()) {
            toast.error('Please fill in all fields')
            return
        }

        setLoading(true)
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    user_email: email,
                    issue_description: issue,
                    to_email: 'web.just.notes@gmail.com'
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )

            toast.success('Report submitted successfully!')
            setEmail('')
            setIssue('')
            setIsReportModalOpen(false)
        } catch (error) {
            console.error('Error sending report:', error)
            toast.error('Failed to submit report. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <button
                onClick={() => setIsReportModalOpen(true)}
                className='btn btn-outline rounded-full'
            >
                <BadgeAlert /> Report an issue
            </button>

            <ConfirmModal
                isOpen={isReportModalOpen}
                title="Report an Issue"
                message="Help us improve by reporting any issues you encounter."
                input1={true}
                input1Text="Your Email"
                input1Value={email}
                onInput1Change={setEmail}
                input2={true}
                input2Text="Describe the issue"
                input2Value={issue}
                badge={'To: web.just.notes@gmail.com'}
                onInput2Change={setIssue}
                onConfirm={handleSubmitReport}
                confirmAction={loading ? 'Submitting...' : 'Submit'}
                onCancel={() => {
                    setIsReportModalOpen(false)
                    setEmail('')
                    setIssue('')
                }}
            />
        </div>
    )
}

export default ReportAnIssue