import React, {useCallback} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Background from '../assets/tell.svg'
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GoogleButton from "react-google-button";
import {CssBaseline} from "@material-ui/core";
import app from "../services/base";
import firebase from 'firebase';
import {withRouter} from "react-router";

const useStyles = makeStyles(theme => ({
    root: {
        background: "linear-gradient(#1f69fe, #02bde6)",
        minHeight: '100vh',
        paddingTop: 50,
        overflow: 'hidden'
    },
    containerCustom: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        verticalAlign: 'baseline',
        zIndex: 10
    },
    img: {
        maxWidth: "100vw",
        zIndex: 0
    },
    title: {
        fontFamily: 'Comfortaa',
        color: 'white'
    },
    subtitle: {
        fontFamily: 'Comfortaa',
        color: 'white',
        marginBottom: 80

    },
    appName: {
        fontFamily: 'Comfortaa',
        color: 'white',
    },
    formField:{
        backgroundColor: 'white',
        borderRadius: 5
    },
    submit: {
        backgroundColor: 'white',
        color: 'blue',
        marginTop: 20

    }
}));

var provider = new firebase.auth.GoogleAuthProvider();


const SignUpCool = ({history}) => {

    const classes = useStyles();
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");

        } catch (error) {
            alert(error);
        }
    }, [history]);

    const gBtnLogin = useCallback(
        async event => {
            event.preventDefault();
            try {
                await app
                    .auth()
                    .signInWithPopup(provider).then(function (result) {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        // var token = result.credential.accessToken;
                        // The signed-in user info.
                        // var user = result.user;
                        // console.log(result.user.uid);
                        // ...
                    }).catch(function (error) {
                        // Handle Errors here.
                        // var errorCode = error.code;
                        // var errorMessage = error.message;
                        // The email of the user's account used.
                        // var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        // var credential = error.credential;
                        // ...
                        console.log(error)
                    });
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );
    const handleOnClick = () => {
        history.push('/login/')
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Grid container direction={'column'} alignItems={'center'} alignContent={'center'}
            xs={12}>

                <Grid item alignItems={'center'} alignContent={'center'}>
                    <Typography variant={'h1'} className={classes.appName}>EllaQ</Typography>
                </Grid>
                <Grid item alignItems={'center'} alignContent={'center'}>
                    <Typography className={classes.subtitle}>Voice surveys as easy as a,b,c</Typography>
                </Grid>
                <Grid item alignItems={'center'} alignContent={'center'}>
                    <Typography variant="h4" className={classes.title}>Sign Up</Typography>
                </Grid>
                <Grid item xs={6} xl={6}>
                    <form className={classes.form} noValidate onSubmit={handleSignUp}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            className={classes.formField}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            className={classes.formField}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}

                        >
                            Sign Up
                        </Button>
                        {/*<Grid item xs>*/}
                        {/*    <Link href="#" variant="body2">*/}
                        {/*        Forgot password?*/}
                        {/*    </Link>*/}
                        {/*</Grid>*/}
                        <Grid item>
                            <Button onClick={handleOnClick}>
                                {"Have an account? Sign In"}
                            </Button>
                            <GoogleButton onClick={gBtnLogin} className={classes.gglBtn}/>
                        </Grid>
                    </form>
                </Grid>
                <Grid item>
                    <img src={Background} className={classes.img}/>
                </Grid>
            </Grid>
        </div>
    );


};

export default withRouter(SignUpCool);