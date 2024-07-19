import React from 'react'
import './MainModals.css'
import { IoClose } from 'react-icons/io5';

export default function SubModal({ name, isvisible, onClose, children}) {
    if (!isvisible) return null;
    return (
        <div className="container-modal">
            <div className="container-content sub">
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
