import React, { useEffect, useState } from 'react'
import './RegisterModal.css'
import SubModal from '../SubModal'
import toast from 'react-hot-toast';
import axios from 'axios';
function RegisterModal({ onClose, isvisible, data, location, user }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        console.log(user);
        setName(user?.name);
        setEmail(user?.email);
    }, [isvisible])

    const handleRegister = async () => {
        console.log(user);
        if (Object.keys(user).length !== 0) {

            try {
                const response = await axios.post('https://weather-app-be.vercel.app/api/unsubscribe', {
                    email
                });
                localStorage.removeItem('user');
                toast.success("Unsubcribe successfully");
                onClose();
            } catch(error) {
                toast.error("Something went wrong, try again");
            }
            
        } else {
            if (name === '') {
                toast.error("Name is empty");
            } else if (email === '') {
                toast.error("Email is empty");
            } else {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(email)) {
                    try {
                        const response = await axios.post('https://weather-app-be.vercel.app/api/register', {
                            name,
                            email,
                            location,
                            data
                        });
                        console.log(response);
                        localStorage.setItem("user", JSON.stringify({ name, email, location }));
                        toast.success("Register successfully");
                    } catch (error) {
                        console.log(error);
                        toast.error("Some thing went wrong, please try again");
                    }

                    // // call api dang ky 
                    onClose();

                } else {
                    toast.error("Unvalid email");
                }
            }
        }

    }
    return (
        <SubModal onClose={onClose} isvisible={isvisible} name={"Account"}>
            <div className='form-register'>
                <div className='form-input'>
                    <div className='form-group'>
                        <label>Name:</label>
                        <input type='text' placeholder='Alex' onChange={(e) => setName(e.target.value)} value={user?.name} />
                    </div>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input type='email' placeholder='alex@gmail.com' onChange={(e) => setEmail(e.target.value)} value={user?.email} />
                    </div>

                </div>
                <button className='button-register' onClick={handleRegister}>{Object.keys(user).length !== 0 ? "Unsubcribe" : "Register"}</button>
            </div>
        </SubModal>
    )
}

export default RegisterModal