import { FaBell, FaUserCircle } from 'react-icons/fa'
import { Dropdown } from 'react-bootstrap'

const Topbar = () => {
  return (
    <header className="topbar bg-white shadow-sm py-3">
      <div className="d-flex justify-content-end align-items-center px-4">
        <div className="d-flex align-items-center gap-4">
          <button className="btn btn-light position-relative">
            <FaBell size={20} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3
            </span>
          </button>
          
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-user">
              <FaUserCircle size={24} className="me-2" />
              Admin
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Profil</Dropdown.Item>
              <Dropdown.Item>Paramètres</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Déconnexion</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}

export default Topbar