import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const AlertDialogSlide = ({
                              question,
                              context,
                              yesBtnText,
                              noBtnText,
                              openModal,
                              handleShouldDeleteSurvey,
                          }) => {


    function testClose (value) {
        handleShouldDeleteSurvey(value)
    }

    return (
        <div>
            <Dialog
                open={openModal}
                onClose={handleShouldDeleteSurvey}
                aria-labelledby="alert-dialog-slide-title"
            >
                <DialogTitle id="dialog-title">{question}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="dialog-description">
                        {context}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleShouldDeleteSurvey.bind(handleShouldDeleteSurvey, false)} color="secondary">
                        {noBtnText}
                    </Button>
                    <Button onClick={handleShouldDeleteSurvey.bind(handleShouldDeleteSurvey, true)} color="primary">
                        {yesBtnText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AlertDialogSlide
