import './sign.scss';

import logo from '../../resources/img/icons/logo_v1.svg';

const SignIn = () => {
    return (
        <section class="sign">
            <hr class="divider divider_sign" />
            <div class="container">
                <div class="logo sign__logo">
                    <a href="/" class="logo__link">
                        <span>Progra</span>
                        <img src={logo} alt="logotype" class="logo__img" />
                        <span>Mystic</span>
                    </a>
                </div>
                <div class="sign__wrapper">
                    <h2 class="title title_sign">Log In</h2>
                    <form action="#" class="form_sign">
                        <h5 class="title title_above">Email</h5>
                        <input type="text" name="email" placeholder="Enter your email address here" />
                        <h5 class="title title_above">Password</h5>
                        <input type="text" name="password" placeholder="Enter a strong password here" />
                        <button class="button button_sign">Sign In</button>
                    </form>
                </div>
                <div class="log-in">
                    Have no account yet? <a href="/signUp">Sign Up</a>
                </div>
                <div class="sign__nav">
                    <ul class="menu sign_menu">
                        <li>
                            <a href="/" class="menu__link">About</a>
                        </li>
                        <li>
                            <a href="/" class="menu__link">User Agreement</a>
                        </li>
                        <li>
                            <a href="/" class="menu__link">Feedback</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr class="divider divider_sign" />
        </section>
    )
}

export default SignIn;