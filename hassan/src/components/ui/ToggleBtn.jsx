import { FaBars } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ToggleSidebar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-primary p-4 flex justify-between items-center text-white">
      <button className="lg:hidden !text-white p-2" onClick={toggleSidebar}>
        <FaBars />
      </button>
    </nav>
  );
};

ToggleSidebar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default ToggleSidebar;
