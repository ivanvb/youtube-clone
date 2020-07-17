import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Layout from './components/Layout/index';
import Video from './pages/Video/Video';
import Search from './pages/Search/Search';

const LobbyRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={SignUp} />
                <Redirect to={'/login'} />
            </Switch>
        </Router>
    );
};

const AppRouter = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/profile" exact component={Profile} />
                    <Route path="/video" exact component={Video} />
                    <Route path="/search" exact component={Search} />
                    <Redirect to={'/'} />
                </Switch>
            </Layout>
        </Router>
    );
};
function App() {
    const isLogged = true;

    return isLogged ? <AppRouter /> : <LobbyRouter />;
}

export default App;
