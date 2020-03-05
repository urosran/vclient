import React, {useEffect} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';

const ListOfQuestions = ({surveyObject, handleDeleteQuestion}) => {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }));

    const [questionsArray, setQuestionsArray] = React.useState([]);

    const classes = useStyles();

    const handleSetQuestions = (surveyAndQuestions) => {
        const questions = Object.keys(surveyAndQuestions.questions);
        setQuestionsArray(questions);

        // console.log(questions, "questions_final")
        // const questionsObject = Object.values(surveyAndQuestions);
    };

    useEffect(() => {
        if (surveyObject !== null && surveyObject !== undefined) {
            console.log(surveyObject, "test");
            handleSetQuestions(surveyObject)
        }
    }, [surveyObject]);

    return (
        <List className={classes.root}>
            {questionsArray.map(questionsObject => {
                console.log(questionsObject);
                const labelId = `checkbox-list-label-${questionsObject}`;

                return (

                    <ListItem key={questionsObject}
                              role={undefined} dense button
                    >
                        <ListItemText sytles={{fontFamily: 'Quicksand'}} id={labelId} primary={`${questionsObject}`}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments" onClick={handleDeleteQuestion}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default ListOfQuestions;