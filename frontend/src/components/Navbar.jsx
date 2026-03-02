import { Link, useLocation } from 'react-router'
import SearchBar from './SearchBar'
import ThemeSwitcher from './ThemeSwitcher'
import ReportAnIssue from './ReportAnIssue'

const Navbar = () => {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  return (
    <>
      <header className='p-4 font-[Poppins]'>
        <div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='flex flex-row items-center gap-5'>
            <Link to={'/'}>
              <h1 className='text-3xl font-bold tracking-tighter
                 bg-gradient-to-br from-red-500 via-red-600 to-red-900 
                 bg-clip-text text-transparent leading-none'>Just Notes</h1>
            </Link>
            <i className='text-gray-400 hidden sm:inline'>~ where knowledge shouts</i>
          </div>

          <div className='hidden md:flex md:flex-1 md:justify-center'>
            {!isLanding && <SearchBar />}
          </div>

          <div className='flex flex-row gap-5'>
            <div>
              <ThemeSwitcher />
            </div>
            <div>
              <ReportAnIssue/>
            </div>
          </div>
        </div>

        {!isLanding && (
          <div className='container mx-auto md:hidden px-4 mt-5'>
            <SearchBar />
          </div>
        )}
      </header>
      <hr className='border border-base-300' />
    </>
  )
}

export default Navbar
