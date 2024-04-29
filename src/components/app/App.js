/* import { useState } from 'react'; */
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 

import {HomePage, CategoriesPage, BlogingPage, ContactsPage, AboutPage, SignUpPage, SignInPage} from '../pages';

function App() {
    return (
        <Router>
            <div className='app'>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/categories" element={<CategoriesPage/>}/>
                    <Route path="/bloging" element={<BlogingPage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/contacts" element={<ContactsPage/>}/>
                    <Route path="/signUp" element={<SignUpPage/>}/>
                    <Route path="/signIn" element={<SignInPage/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App;