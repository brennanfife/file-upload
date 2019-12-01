import React, { useState } from 'react'

//*FilePond
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

//*MUI
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import Chip from "@material-ui/core/Chip";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import {
    Formik,
    Form,
    useField,
    FieldArray,
} from 'formik';

import * as yup from 'yup';

import ChipInput from 'material-ui-chip-input'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3)
    },
    fileUpload: {
        marginTop: theme.spacing(2)
    }
}));

const NameTextField = ({ placeholder, label, ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <TextField
            label={label}
            fullWidth
            placeholder={placeholder}
            {...field}
            helperText={errorText}
            error={!!errorText}
        />
    );
};

const validationSchema = yup.object().shape({
    fileName: yup.string().required('File Name is required'),
});

const FileDialog = ({ open, onClose }) => {
    const classes = useStyles();

    //! COMBINE THESE TWO AND GIVE IT A TIME AUTOMATICALLY
    const [files, setFiles] = useState([])
    // const [input, setInput] = useState({
    //     name: "",
    //     tags: ""
    // })

    const chipRenderer = ({ chip, className, handleClick, handleDelete }, key) => (
        <Chip
            label={chip}
            className={className}
            onClick={handleClick}
            onDelete={handleDelete}
            key={key}
            size="small"
            color='primary'
        />
    );

    const handleSubmit = event => {
        //event.preventDefault();
        // let formData = new FormData();
        // formData.append("image", this.state.image[0]);
        // axios.post("/api/upload", formData).then(res => {
        //   console.log(res);
        //   const product = {
        //     title: this.state.title,
        //     description: this.state.description,
        //     price: this.state.price,
        //     inStock: this.state.inStock,
        //     numBought: this.state.inStock,
        //     image: "/" + res.data.path,
        //     photos: this.state.photos
        //   };
        //   axios.post("/api/products", product).then(res => {
        //     this.props.handleReload();
        //     this.props.handleCloseAdd();
        //   });
        // });
        console.log(event)
        //! need to validate first
        onClose()
    };

    return (
        <Dialog fullWidth maxWidth="md" onClose={onClose} open={open}>
            <DialogTitle>Upload File(s)</DialogTitle>

            <Formik
                validateOnChange
                initialValues={{
                    fileName: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                console.log('submit: ', data);
                //* make async call
                // register(data).then(() => {
                //     setSubmitting(false);
                // });
                }}
            >
                {({ values, errors, isSubmitting }) => (
                    <Form>

                    <Hidden smDown>
                        <DialogContent>
                            <form className={classes.container} onSubmit={handleSubmit} noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Name"
                                        className={classes.textField}
                                        // value={this.state.title}
                                        // onChange={this.handleChange("title")}
                                        margin="normal"
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                    {/* <TextField
                                        label="Tags"
                                        className={classes.textField}
                                        // value={this.state.price}
                                        // onChange={this.handleChange("price")}
                                        margin="normal"
                                        fullWidth
                                    /> */}
                                <ChipInput
                                    className={classes.textField}
                                    chipRenderer={chipRenderer}
                                    label="Tags"
                                    margin="normal"
                                    fullWidth
                                />
                                </Grid>
                            </form>
                            <FilePond
                                files={files}
                                allowMultiple={true}
                                maxFiles={5}
                                onupdatefiles={setFiles}
                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                className={classes.fileUpload}
                            />
                        </DialogContent>
                    </Hidden>

                    <Hidden mdUp>
                    <DialogContent>
                            <form className={classes.container} onSubmit={handleSubmit} noValidate autoComplete="off">
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs>
                                    <TextField
                                        label="Name"
                                        className={classes.textField}
                                        // value={this.state.title}
                                        // onChange={this.handleChange("title")}
                                        margin="normal"
                                        required
                                        fullWidth
                                    />
                                </Grid>
                                {/* <TextField
                                    label="Tags"
                                    className={classes.textField}
                                    // value={this.state.price}
                                    // onChange={this.handleChange("price")}
                                    margin="normal"
                                    fullWidth
                                /> */}
                                <Grid item xs>
                                    <ChipInput
                                        className={classes.textField}
                                        chipRenderer={chipRenderer}
                                        label="Tags"
                                        margin="normal"
                                        fullWidth
                                    />
                                </Grid>
                                </Grid>
                            </form>
                            <FilePond
                                files={files}
                                allowMultiple={true}
                                maxFiles={5}
                                onupdatefiles={setFiles}
                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                className={classes.fileUpload}
                            />
                        </DialogContent>
                    </Hidden>

                    <DialogActions>
                        <Button onClick={() => onClose()} color="primary">Cancel</Button>
                        <Button onClick={() => handleSubmit()} color="primary" variant='contained' type="submit">Submit</Button>
                    </DialogActions>

                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
                </Form>
                )}
                
            </Formik>
        </Dialog>
    )
}

export default FileDialog