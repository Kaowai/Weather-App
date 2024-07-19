import { IoClose } from 'react-icons/io5';
import './MainModals.css'

const MainModals = ({ name, isvisible, onClose, children}) => {
    if (!isvisible) return null;
    return (
        <div className="container-modal">
            <div className="container-content">
                <div className="container-header">
                    <span>{name}</span>
                    <button onClick={onClose}>
                        <IoClose size={16} />
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainModals