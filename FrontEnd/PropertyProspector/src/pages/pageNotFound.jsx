import { NavLink } from 'react-router-dom'

export function PageNotFound() {
    return (
        <div className="PageNotFound">
            <h1>Page Not Found</h1>
            <p>What were you looking for?
                Maybe going back <NavLink to="/">home </NavLink>
                will help you find it.</p>
        </div>
    )
}
