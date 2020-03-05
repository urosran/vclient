import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import firebase from 'firebase';


const AddQuestionModal = ({
                                  handleClose,
                                  openModal
                              }
) => {
    var user = firebase.auth().currentUser;
    const [question, setQuestion] = React.useState('');

    const handleSetQuestion = e => {
        setQuestion(e.target.value);
    };


    const handleAddSurveyQuestion = () => {
        // axios({au
        //     method: "POST",
        //     // url: "https://beluga-server.herokuapp.com/adduser",
        //     url: 'http://localhost:5001/addsurvey',
        //     data: {
        //         surveyCollectionName: surveyCollectionName,
        //         surveyName: question,
        //         uuid: user.uid
        //     },
        // }).then(response => {
        //
        //     if (response.status === 200) {
        //         console.log("Survey added, awesome!");
        //         handleClose();
        //     }
        // })
        //     .catch(function (error) {
        //         if (error.response) {
        //             console.log("Something went wrong, please try again");
        //         }
        //     });
        console.log("Add question biach")

    };

    return (
        <Dialog open={openModal} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add a question</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    A single survey can contain many questions -
                    each survey will have a unique link to it
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="question"
                    label="Question"
                    type="text"
                    fullWidth
                    value={question}
                    onChange={handleSetQuestion}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleAddSurveyQuestion} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddQuestionModal;