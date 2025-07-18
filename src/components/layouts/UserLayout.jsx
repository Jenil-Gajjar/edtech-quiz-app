import '../../assets/css/styles.css'

import Logo from '../../assets/images/favicon-light.png'
import AuthService from '../../services/Authorization/AuthorizationService.js';
import ToastrService from '../../services/Toastr/ToastrService.js';
import ErrorPage from '../shared/ErrorPage.jsx';
import status from 'http-status';

import { Component } from 'inferno';
import { Link } from 'inferno-router';
import { Quiz } from '../quiz/Quiz.jsx';
import { success, User } from '../../helper/Constants/Constants.js';


export default class UserLayout extends Component {
    constructor(props) {
        super(props);
        if (!AuthService.isAuthenticated()) {
            window.location.replace('/sign-in')
            return;
        }
        if (!AuthService.hasRole(User)) {
            this.state = {
                activeComponent: null,
                error: { status: status.FORBIDDEN, message: status[status.FORBIDDEN] }
            };
            return;
        }

        const component = props.match?.params?.component;
        this.state = {
            activeComponent: component && component in this.mappings ? component : null,
            error: null
        };
        ToastrService.displayToast()
    }
    mappings = {
        'dashboard': {
            component: <Quiz />,
            icon: <i class="bi bi-grid fs-5"></i>,
            text: 'Dasboard'
        },
        'user-quiz': {
            component: <Quiz />,
            icon: <i class="bi bi-clipboard-check fs-5"></i>,
            text: 'Quiz'
        },
        'logout': {
            component: null,
            icon: <i class="bi bi-box-arrow-left fs-5"></i>,
            text: 'Logout'
        }
    };


    handleNavigation = (component) => {
        this.setState({ activeComponent: component });
        this.props.history.push(`/user/${component}`);
    };

    renderContent = () => {
        const { activeComponent } = this.state;
        const component = this.props.match?.params?.component || activeComponent || 'dashboard';

        if (component == 'logout') {
            ToastrService.setToast(success, 'Logout Successfull.')
            AuthService.logout()
            window.location.replace('/sign-in')
        }
        if (!(component in this.mappings)) {
            this.setState({
                activeComponent: null,
                error: { status: status.NOT_FOUND, message: status[status.NOT_FOUND] }

            })
            return;
        }
        return this.mappings[component]?.component || null;
    };

    render() {
        if (this.state.error) {
            const { status, message } = this.state.error;
            return (
                <ErrorPage
                    status={status}
                    message={message} />
            )
        }
        return (
            <div className="main-layout container-fluid">
                <div className="row ">
                    <div className="col-sm-4 col-md-4 col-lg-3 col-xl-2 sidebar pt-3  ">
                        <div className='d-flex justify-content-start align-items-center gap-2  '>
                            <img src={Logo} alt="" sizes="" srcset="" style="width:40px;height:40px;" />
                            <h3 className='fs-3'>Quiz App</h3>
                        </div>
                        <ul className='list-unstyled'>
                            {
                                Object.entries(this.mappings).map(([key, Object]) => {
                                    return (
                                        <li key={key} className='py-1'>
                                            <Link to={key} className='text-decoration-none text-white' onClick={() => this.handleNavigation(key)}>
                                                <div className='d-flex gap-3 align-items-center ps-2 '>
                                                    {Object.icon}
                                                    <span className='fs-4'>
                                                        {Object.text}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='col main-content '>
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        )
    }
}

