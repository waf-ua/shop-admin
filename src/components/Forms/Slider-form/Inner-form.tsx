import React from 'react'
import {Button, DialogActions, LinearProgress} from '@material-ui/core';
import {Field, Form, FormikProps} from 'formik';
import {TextField, SimpleFileUpload, Switch} from 'formik-material-ui';
import {makeStyles} from '@material-ui/core/styles';

import {IFormValues, InnerSliderFormProps} from '../../../interfaces/slider-form';
import FileUpload from "../Slider-form-edit/FileUpload";


const InnerForm: React.FC<InnerSliderFormProps & FormikProps<IFormValues>> = (
    {submitForm, isSubmitting, handleClose, ...props}) => {
    const useStyles = makeStyles({
        customBtn: {
            marginTop: "15px",
        },
    });

    const classes = useStyles();

    const dragOverHandler = (event: React.DragEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const dropHandler = (event: React.DragEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (event.dataTransfer.items) {
            for (let i = 0; i < event.dataTransfer.items.length; i++) {
                if (event.dataTransfer.items[i].kind === 'file') {
                    let file = event.dataTransfer.items[i].getAsFile();
                    props.setFieldValue("image", file)
                }
            }
        }
    }

    return (
        <Form onDrop={dropHandler}
              onDragOver={dragOverHandler}
              onDragEnd={event => {
                  event.stopPropagation();
                  event.preventDefault();
              }}>
            <Field
                fullWidth
                component={TextField}
                type="name"
                label="Name"
                name="name"
            />
            <Field
                fullWidth
                multiline
                component={TextField}
                type="text"
                label="Text"
                name="text"
            />
            <Field
                fullWidth
                multiline
                component={FileUpload}
                type="file"
                label="Image"
                name="image"
            />
            <Field
                fullWidth
                multiline
                component={TextField}
                type="href"
                label="Href"
                name="href"
            />
            {/*<Field*/}
            {/*    fullWidth*/}
            {/*    multiline*/}
            {/*    component={Switch}*/}
            {/*    type="isShown"*/}
            {/*    label="IsShown"*/}
            {/*    name="isShown"*/}
            {/*/>*/}
            <Field
                fullWidth
                multiline
                component={TextField}
                type="priority"
                label="Priority"
                name="priority"
            />
            {isSubmitting && <LinearProgress/>}
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="primary"
                    variant="contained"
                    className={classes.customBtn}
                >
                    Cancel
                </Button>
                <Button
                    className={classes.customBtn}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                >
                    Create
                </Button>
            </DialogActions>
        </Form>
    );
}

export default InnerForm;
