import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddSurveyIcon from '@material-ui/icons/PostAddTwoTone';
import AddQuestionIcon from '@material-ui/icons/AddCommentOutlined';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import YesOrNoDialog from "../Modals/YesOrNoDialog";
import AddQuestionModal from "../Modals/AddQuestionToSurveyModal";


export default function SurveyCollectionExpandableList({
                                                           collectionsAndSurveys,
                                                           setSurveyObject
                                                       }) {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }));

    const classes = useStyles();
    let [surveysAndCollections, setSurveysAndCollections] = React.useState(undefined);
    let [collections, setCollections] = React.useState(undefined);
    const [openModal, setOpenModal] = React.useState(false);

    function processData(data) {
        if (data !== undefined
            && data !== null
            && data[0] !== null
            && Object.values(data)[0] !== null
            && data.length !== 0) {
            console.log(Object.values(data)[0], "processed");
            setSurveysAndCollections(Object.values(data));
            setCollections(Object.keys(data));
            console.log(data, "data");
            console.log(Object.keys(data), "collections");
            console.log(Object.values(data), "surveys");

        }
    }

    function handleAddSurvey() {
        console.log("survey added")
        //TODO: add survey modal
    }


    useEffect(() => {
        processData(collectionsAndSurveys)
    }, [collectionsAndSurveys]);


    return (
        <List className={classes.root}>
            {surveysAndCollections !== undefined
            && surveysAndCollections !== null
            && surveysAndCollections.length !== 0
            && collections.map(collectionName => {
                return (
                    <ExpansionPanel key={collectionName}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <IconButton edge="start" aria-label="comments" onClick={handleAddSurvey}>
                                <AddSurveyIcon/>
                            </IconButton>
                            <Typography className={classes.heading}>{collectionName}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {console.log(collectionsAndSurveys[collectionName], "passing in")}
                            <DisplaySurveys listOfSurveysForCollection={collectionsAndSurveys[collectionName]}
                                            setSurveyObject={setSurveyObject}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                );
            })}
        </List>
    );
}


function DisplaySurveys({listOfSurveysForCollection, setSurveyObject}) {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }));


    const classes = useStyles();
    const [surveyList, setSurveyList] = React.useState([0]);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openAddQuestionModal, setOpenAddQuestionModal] = React.useState(false);
    const [shouldDelete, setShouldDelete] = React.useState(false);

    //<editor-fold desc="Delete Handlers">
    function handleShouldDeleteSurvey(shouldDeleteConfirmed) {
        setShouldDelete(shouldDeleteConfirmed);
        setOpenDeleteModal(false);
        console.log(shouldDeleteConfirmed)
    }

    function handleDeleteSurvey() {
        setOpenDeleteModal(true)
    }

    //</editor-fold>

    const loadQuestionsPane = (surveyObject) => {
        transformSurveyObject(surveyObject);
        setSurveyObject(transformSurveyObject(surveyObject));
    };

    function transformSurveyObject(surveyObject) {
        var transformedSurveyObject = {surveyName: "", questions: []};
        transformedSurveyObject.surveyName = Object.keys(surveyObject)[0];
        transformedSurveyObject.questions = Object.values(surveyObject)[0];
        return transformedSurveyObject

    }

    function handleOpenAddQuestionDialogue() {
        setOpenAddQuestionModal(true)
    }

    function handleAddQuestion() {
        setOpenAddQuestionModal(false)
    }


    function makeSurveyList(listOfSurveysForCollection) {
        console.log(listOfSurveysForCollection, "surveys");
        if (listOfSurveysForCollection !== undefined && listOfSurveysForCollection !== null) {
            setSurveyList(listOfSurveysForCollection);
        }
    }

    useEffect(() => {
        makeSurveyList(listOfSurveysForCollection)
    }, [listOfSurveysForCollection]);

    return (
        <React.Fragment>
            <List className={classes.root}>
                {surveyList.map(surveyObject => {
                    console.log(surveyObject);
                    const surveyName = Object.keys(surveyObject);
                    const labelId = `checkbox-list-label-${surveyName}`;

                    return (

                        <ListItem key={surveyName}
                                  role={undefined} dense button
                                  onClick={loadQuestionsPane.bind(loadQuestionsPane, surveyObject)}>
                            <ListItemText style={{fontFamily: 'Quicksand'}} id={labelId} primary={`${surveyName}`}/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments" onClick={handleOpenAddQuestionDialogue}>
                                    <AddQuestionIcon/>
                                </IconButton>
                                <IconButton edge="end" aria-label="comments" onClick={handleDeleteSurvey}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            <YesOrNoDialog
                question={"Are you sure you want to delete the survey?"}
                context={"You cannot undo this, all your answers will be lost"}
                yesBtnText={"Yes"}
                noBtnText={"No"}
                openModal={openDeleteModal}
                handleShouldDeleteSurvey={handleShouldDeleteSurvey}
            />
            <AddQuestionModal
                openModal={openAddQuestionModal}
                handleClose={handleAddQuestion}
            />
        </React.Fragment>
    );
}
