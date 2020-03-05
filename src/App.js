import React from 'react';
import Dashboard from './MainScreens/Dashboard'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./helperElements/Login";
import {AuthProvider} from "./services/Auth";
import PrivateRoute from "./services/PrivateRoute";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core/styles';
import SignUpCool from "./helperElements/SignUpCool";

const App = () => {

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    primary: {
                        // light: will be calculated from palette.primary.main,
                        main: '#0066ff',
                        // dark: will be calculated from palette.primary.main,
                        // contrastText: will be calculated to contrast with palette.primary.main
                    },
                    secondary: {
                        main: '#ff9800'
                    }
                },
            }),
    );

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <div>
                         {/*<PrivateRoute exact path="/" component={Dashboard}/>*/}
                        <Route exact path="/" component={Dashboard}/>
                        <Route exact path="/signup" component={SignUpCool}/>
                        <Route exact path="/login" component={Login}/>
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    )
};

export default App;