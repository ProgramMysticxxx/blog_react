import './sign.scss';

import logo from '../../resources/img/icons/logo_v1.svg';
import blogClient from '../../utils/blog_client';
import { useId, useState } from 'react';
import { setTokenCookie, setUsernameCookie } from '../../utils/cookie_manager';

const SignUp = () => {
    const usernameId = useId();
    const passwordId = useId();
    const confirmPasswordId = useId();

    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function performSignUp(e) {
        e.preventDefault();
        setLoading(true);
        setErrorText(null);

        if (username.length < 6) {
            setErrorText('Username must be at least 6 characters long');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setErrorText('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setErrorText('Passwords do not match');
            setLoading(false);
            return;
        }

        const client = await blogClient.init();
        try {
            const response = await client.register({}, {
                username: username,
                password: password,
            });
            const { user, token } = response.data;
            // alert('Successfully registered. Token: ' + token);
            setTokenCookie(token);
            setUsernameCookie(user.username);
            document.location.href = '/';
        } catch (error) {
            console.error(error);
            setErrorText("We couldn't register your account. The username may be taken or there was an error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

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
                    <div className="form_sign">
                        {/* <h5 className="title title_above">Email</h5>
                        <input type="text" name="email" placeholder="Enter your email address here" /> */}
                        <h5 className="title title_above">Username</h5>
                        <input id={usernameId} value={username} onInput={e => setUsername(e.target.value)} disabled={loading} type="text" name="name" placeholder="Enter your name here" />
                        <h5 className="title title_above">Password</h5>
                        <input id={passwordId} value={password} onInput={e => setPassword(e.target.value)} disabled={loading} type="password" name="password" placeholder="Enter a strong password here" />
                        <h5 className="title title_above">Repeat password</h5>
                        <input id={confirmPasswordId} value={confirmPassword} onInput={e => setConfirmPassword(e.target.value)} disabled={loading} type="password" name="password" placeholder="Repeat the password entered above here" />
                        <button onClick={performSignUp} disabled={loading} className="button button_sign">Sign Up</button>
                        {errorText && <p className="sign__error">{errorText}</p>}
                    </div>
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
