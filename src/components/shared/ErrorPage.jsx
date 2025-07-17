import http_status from 'http-status';
import '../../assets/css/styles.css'

export default function ErrorPage({ status = http_status.NOT_FOUND, message = http_status[http_status.NOT_FOUND] }) {
    return (
        <div className='Error-Page-Wrapper text-center text-white'>
            <div className="card Error-Card">
                <h1 className='card-title Error-Card-Text'>{status}</h1>
                <p className="card-text">{message}</p>
                <p className="text-muted">Sorry, the page you are looking for does not exist. <a className='Error-Card-Text' href='/'>Go back to homepage</a></p>
            </div>
        </div>
    );
}
