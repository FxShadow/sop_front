import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-72">
        <div className="py-24 px-8 mdm:px-0">
          {children}
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
