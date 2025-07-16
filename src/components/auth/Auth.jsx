import '../../assets/css/Auth.css'

import Logo from '../../assets/images/favicon.png'
import CookieService from '../../services/CookieService';
import JwtService from '../../services/JwtService';

import { Link } from 'inferno-router'
import { Admin } from '../../helper/Constants';

const apiUrl = "http://localhost:5051/api/Auth";

const UsernameRegex = /^[a-zA-Z]{3}[a-zA-Z0-9_-]{5,17}$/;
const UsernameErrorMessage = "Username must be 8-20 characters long and can only contain letters, numbers, underscores, or hyphens.";

const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const PasswordErrorMessage = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";

const EmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,}([-.]\w+)*$/
const EmailErrorMessage = "Invalid Email Address."

export function Auth({ children }) {
    return (
        <div className="Auth-Container">
            <div className="card">
                {children}
            </div>
        </div>
    )
}

function ErrorHandler(id, msg) {
    document.getElementById(id).innerText = msg;
}

function ValidationHandler(id, msg, regex, event) {
    if (!regex.test(event.target.value)) {
        ErrorHandler(id, msg)
    } else {
        ErrorHandler(id, null)
    }
}

export function SignInComponent() {

    const handleSubmission = (e) => {
        e.preventDefault()
        var formData = new FormData(e.target)
        var username = formData.get('Username').trim();
        var password = formData.get('Password').trim();
        var data = { Username: username, Password: password };

        if (!username) {
            ErrorHandler('UsernameErrorMessage', 'Username is required');
            return;
        }
        if (!password) {
            ErrorHandler('PasswordErrorMessage', 'Password is required');
            return;
        }

        if (!UsernameRegex.test(username)) {
            ErrorHandler('UsernameErrorMessage', UsernameErrorMessage);
            return;
        }
        if (!PasswordRegex.test(password)) {
            ErrorHandler('PasswordErrorMessage', PasswordErrorMessage);
            return;
        }

        const url = apiUrl + '/SignIn'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(async response => {
                const data = await response.json();
                return ({
                    status: response.status,
                    data: data
                })
            })
            .then(({ status, data }) => {
                if (status === 200) {
                    // window.location.replace('/dashboard')
                    const jwtToken = data.data;
                    CookieService.setAuthCookie(jwtToken)
                    const userdata = JwtService.decodeToken(jwtToken)
                    if (userdata.role == Admin) {
                        window.location.replace("/admin/dashboard")
                    } else {
                        window.location.replace("/user/dashboard")
                    }

                } else {
                    ErrorHandler('PasswordErrorMessage', data.message || 'Invalid username or password');
                }
            })
            .catch(error => {
                console.error(error)
                ErrorHandler('PasswordErrorMessage', 'Something went wrong!');
            })
    }
    return (
        <div className="px-4 py-5 text-center" >
            <div className='d-flex justify-content-center align-items-center gap-2'>
                <img src={Logo} alt="image here" />
                <span className='fs-3 fw-semibold '>
                    EdTech Quiz App
                </span>
            </div>
            <div className="px-sm-5 pb-3">
                <form className='container' onSubmit={handleSubmission}>
                    <p className='fs-4'>Signin</p>
                    <div className='Input-Group-Parent'>
                        <div className="input-group" >
                            <span className="input-group-text Auth-InputGroup-Text px-3" ><i className="bi bi-person"></i></span>
                            <input type="text" className="form-control Auth-Input" name='Username' placeholder="Username" aria-label="Username" required
                                onInput={(event) => { ValidationHandler('UsernameErrorMessage', UsernameErrorMessage, UsernameRegex, event) }}
                            />
                        </div>
                        <span className='text-danger text-start' id='UsernameErrorMessage' ></span>
                    </div>

                    <div className='Input-Group-Parent'>
                        <div className="input-group" >
                            <span className="input-group-text Auth-InputGroup-Text px-3"><i className="bi bi-lock "></i></span>
                            <input type="password" className="form-control Auth-Input" name='Password' placeholder="Password" aria-label="password" autoComplete='off' required
                                onInput={(event) => { ValidationHandler('PasswordErrorMessage', PasswordErrorMessage, PasswordRegex, event) }}
                            />
                        </div>
                        <span className='text-danger text-start' id='PasswordErrorMessage' ></span>
                    </div>
                    <input type="submit" value="Signin" className='Auth-btn' />
                </form>
            </div>
            <div className='fs-5'>
                <span>
                    Don&apos;t have an account?
                    <Link to="/sign-up" className='fw-bold text-dark text-decoration-none Pointer ms-1'>Signup</Link>
                </span>
            </div>
        </div>
    )
}

export function SignUpComponent() {

    const handleSubmission = (e) => {
        e.preventDefault()
        var formData = new FormData(e.target)
        var username = formData.get('Username').trim()
        var email = formData.get('Email').trim()
        var password = formData.get('Password').trim()

        var data = {
            Username: username,
            Email: email,
            Password: password
        }

        if (!username) {
            ErrorHandler('UsernameErrorMessage', 'Username is required');
            return;
        }
        if (!password) {
            ErrorHandler('PasswordErrorMessage', 'Password is required');
            return;
        }
        if (!email) {
            ErrorHandler('EmailErrorMessage', EmailErrorMessage);
            return;
        }
        if (!UsernameRegex.test(username)) {
            ErrorHandler('UsernameErrorMessage', UsernameErrorMessage);
            return;
        }
        if (!PasswordRegex.test(password)) {
            ErrorHandler('PasswordErrorMessage', PasswordErrorMessage);
            return;
        }
        if (!EmailRegex.test(email)) {
            ErrorHandler('EmailErrorMessage', EmailErrorMessage);
            return;
        }

        const url = apiUrl + '/SignUp'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(async response => {
                const data = await response.json();
                return ({
                    status: response.status,
                    data: data,
                });
            })
            .then(({ status, data }) => {
                console.log(status)
                console.log(data)
                if (status === 201 && data.isSuccess) {
                    window.location.replace('/sign-in')
                }
                else {
                    ErrorHandler('PasswordErrorMessage', data.message || 'Username or email already exists');
                }
            })
            .catch(error => {
                console.error(error)
                ErrorHandler('PasswordErrorMessage', 'Something went wrong!');
            })
    }
    return (
        <div className="p-5 text-center" >
            <div className='d-flex justify-content-center align-items-center gap-2'>
                <img src={Logo} alt="image here" />
                <span className='fs-3 fw-semibold '>
                    EdTech Quiz App
                </span>
            </div>
            <div className="px-sm-5 pb-3">
                <form onSubmit={handleSubmission}>
                    <p className='fs-4'>Signup</p>

                    <div className='Input-Group-Parent'>
                        <div className="input-group" >
                            <span className="input-group-text Auth-InputGroup-Text px-3" ><i className="bi bi-person "></i></span>
                            <input type="text" className="form-control Auth-Input" name="Username" placeholder="Username" aria-label="Username" required
                                onInput={(event) => { ValidationHandler('UsernameErrorMessage', UsernameErrorMessage, UsernameRegex, event) }}
                            />
                        </div>
                        <span className='text-danger' id='UsernameErrorMessage'></span>
                    </div>

                    <div className='Input-Group-Parent'>
                        <div className="input-group" >
                            <span className="input-group-text Auth-InputGroup-Text px-3" ><i className="bi bi-envelope "></i></span>
                            <input type="email" className="form-control Auth-Input" name="Email" placeholder="Email" aria-label="Email" required
                                onInput={(event) => { ValidationHandler('EmailErrorMessage', EmailErrorMessage, EmailRegex, event) }}
                            />
                        </div>
                        <span className='text-danger' id='EmailErrorMessage'></span>
                    </div>

                    <div className='Input-Group-Parent'>
                        <div className="input-group ">
                            <span className="input-group-text Auth-InputGroup-Text px-3 "><i className="bi bi-lock "></i></span>
                            <input type="password" className="form-control Auth-Input" name='Password' placeholder="Password" aria-label="Password" autoComplete='off' required
                                onInput={(event) => { ValidationHandler('PasswordErrorMessage', PasswordErrorMessage, PasswordRegex, event) }}
                            />
                        </div>
                        <span className='text-danger' id='PasswordErrorMessage' style="width:100px"></span>
                    </div>

                    <input type="submit" value="Signup" className='Auth-btn' />
                </form>
            </div>
            <div className='fs-5'>
                <span>
                    Already have an account?
                    <Link to="/sign-in" className='fw-bold text-dark text-decoration-none Pointer ms-1'>Signin</Link>
                </span>
            </div>
        </div>
    )
}