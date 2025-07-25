import '../../assets/css/styles.css'

import http_status from 'http-status';
import Logo from '../../assets/images/favicon.png'
import CookieService from '../../services/Cookie/CookieService.js';
import JwtService from '../../services/Jwt/JwtService.js';
import ToastrService from '../../services/Toastr/ToastrService.js';
import AuthService from '../../services/Authorization/AuthorizationService.js';
import RedirectBasedOnRole from '../shared/AuthUtills.js';

import { Link } from 'inferno-router'
import { success } from '../../helper/Constants/Constants.js';
import { ErrorHandler, ValidationHandler } from '../../helper/ErrorHandler/ErrorHandler.js';
import { SignIn, SignUp } from '../../services/Api/ApiService.js';

const Regex = {
    username: /^[a-zA-Z]{3}[a-zA-Z0-9_-]{5,17}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    email: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,}([-.]\w+)*$/
}
const Message = {
    username: "Username must be 8-20 characters long and can only contain letters, numbers, underscores, or hyphens.",
    password: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    email: "Invalid Email Address."
}

export function Auth({ children }) {
    return (
        <div className="Auth-Container">
            <div className="card">
                {children}
            </div>
        </div>
    )
}

export function SignInComponent() {
    if (AuthService.isAuthenticated()) {
        const role = AuthService.getUserRole();
        RedirectBasedOnRole(role);
        return;
    }

    ToastrService.displayToast()
    const handleSubmission = async (e) => {
        e.preventDefault()
        var formData = new FormData(e.target)
        var username = formData.get('Username').trim();
        var password = formData.get('Password').trim();

        if (!username) {
            ErrorHandler('UsernameErrorMessage', 'Username is required');
            return;
        }
        if (!password) {
            ErrorHandler('PasswordErrorMessage', 'Password is required');
            return;
        }

        if (!Regex.username.test(username)) {
            ErrorHandler('UsernameErrorMessage', Message.username);
            return;
        }
        if (!Regex.password.test(password)) {
            ErrorHandler('PasswordErrorMessage', Message.password);
            return;
        }

        try {
            const { status, data } = await SignIn(username, password);
            if (status == http_status.OK && data.isSuccess) {
                const jwtToken = data.data;
                CookieService.setAuthCookie(jwtToken);
                ToastrService.setToast(success, 'Login Successfull.')
                const userdata = JwtService.decodeToken(jwtToken)
                RedirectBasedOnRole(userdata.role);

            }
            else {
                ErrorHandler('PasswordErrorMessage', data.message || 'Invalid username or password');
            }
        } catch (error) {
            console.error(error);
            ErrorHandler('PasswordErrorMessage', 'Something went wrong!');
        }

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
                    <AuthInput
                        type='text'
                        name='Username'
                        icon='person'
                        errorId='UsernameErrorMessage'
                        errorMsg={Message.username}
                        regex={Regex.username}
                    />
                    <AuthInput
                        type='password'
                        name='Password'
                        icon='lock'
                        errorId='PasswordErrorMessage'
                        errorMsg={Message.password}
                        regex={Regex.password}
                    />
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
    if (AuthService.isAuthenticated()) {
        const role = AuthService.getUserRole();
        RedirectBasedOnRole(role);
        return;
    }

    const handleSubmission = async (e) => {
        e.preventDefault()
        var formData = new FormData(e.target)
        var username = formData.get('Username').trim()
        var email = formData.get('Email').trim()
        var password = formData.get('Password').trim()

        if (!username) {
            ErrorHandler('UsernameErrorMessage', 'Username is required');
            return;
        }
        if (!password) {
            ErrorHandler('PasswordErrorMessage', 'Password is required');
            return;
        }
        if (!email) {
            ErrorHandler('EmailErrorMessage', Message.email);
            return;
        }
        if (!Regex.username.test(username)) {
            ErrorHandler('UsernameErrorMessage', Message.username);
            return;
        }
        if (!Regex.password.test(password)) {
            ErrorHandler('PasswordErrorMessage', Message.password);
            return;
        }
        if (!Regex.email.test(email)) {
            ErrorHandler('EmailErrorMessage', Message.email);
            return;
        }

        try {

            const { status, data } = await SignUp(username, email, password)
            if (status === http_status.CREATED || status === http_status.OK && data.isSuccess) {
                ToastrService.setToast(success, 'Register Successfull.')
                window.location.replace('/sign-in')
            } else {
                ErrorHandler('PasswordErrorMessage', data.message || 'Username or email already exists');

            }
        } catch (error) {
            console.error(error)
            ErrorHandler('PasswordErrorMessage', 'Something went wrong!');
        }

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
                    <AuthInput
                        type='text'
                        name='Username'
                        icon='person'
                        errorId='UsernameErrorMessage'
                        errorMsg={Message.username}
                        regex={Regex.username}
                    />
                    <AuthInput
                        type='email'
                        name='Email'
                        icon='envelope'
                        errorId='EmailErrorMessage'
                        errorMsg={Message.email}
                        regex={Regex.email}
                    />
                    <AuthInput
                        type='password'
                        name='Password'
                        icon='lock'
                        errorId='PasswordErrorMessage'
                        errorMsg={Message.password}
                        regex={Regex.password}
                    />

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

function AuthInput({ type, name, icon, errorId, errorMsg, regex }) {
    return (
        <div className='Input-Group-Parent'>
            <div className="input-group ">
                <span className="input-group-text Auth-InputGroup-Text px-3 "><i className={`bi bi-${icon}`}></i></span>
                <input
                    className="form-control Auth-Input"
                    type={type}
                    name={name}
                    placeholder={name}
                    aria-label={name}
                    autoComplete={type == 'password' ? 'off' : undefined}
                    onInput={(event) => { ValidationHandler(errorId, errorMsg, regex, event) }}
                    required
                />
            </div>
            <span className='text-danger' id={errorId} style="width:100px"></span>
        </div>
    )

}