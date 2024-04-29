import './sign.scss';

import logo from '../../resources/img/icons/logo_v1.svg';

const SignUp = () => {
    return (
        <section className="sign">
            <hr className="divider divider_sign" />
            <div className="container">
                <div className="logo sign__logo">
                    <a href="/" className="logo__link">
                        <span>Progra</span>
                        <img src={logo} alt="logotype" className="logo__img" />
                        <span>Mystic</span>
                    </a>
                </div>
                <div className="sign__wrapper">
                    <h2 className="title title_sign">Registration</h2>
                    <form action="#" className="form_sign">
                        <h5 className="title title_above">Email</h5>
                        <input type="text" name="email" placeholder="Enter your email address here" />
                        <h5 className="title title_above">Username</h5>
                        <input type="text" name="name" placeholder="Enter your name here" />
                        <h5 className="title title_above">Password</h5>
                        <input type="text" name="password" placeholder="Enter a strong password here" />
                        <h5 className="title title_above">Repeat password</h5>
                        <input type="text" name="password" placeholder="Repeat the password entered above here" />
                        <button className="button button_sign">Sign Up</button>
                    </form>
                </div>
                <div className="log-in">
                    Already registered? <a href="/signIn">Log in</a>
                </div>
                <div className="sign__nav">
                    <ul className="menu sign_menu">
                        <li>
                            <a href="/" className="menu__link">About</a>
                        </li>
                        <li>
                            <a href="/" className="menu__link">User Agreement</a>
                        </li>
                        <li>
                            <a href="/" className="menu__link">Feedback</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="divider divider_sign" />
        </section>
    )
}

export default SignUp;