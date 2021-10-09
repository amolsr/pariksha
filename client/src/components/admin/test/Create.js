import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Chip, FormControl, Input, InputLabel, MenuItem, Paper, Select, Typography, useTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { addTest, getCategory } from '../../../helper/admin';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2, 0),
        width: "100%"
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1, 3),
        },
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function BasicTextFields() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        title: "",
        description: "",
        category: [],
        selectedMandatoryCategory: [],
        selectedOptionalCategory: [],
        startTime: "2021-1-1T12:00",
        endTime: "2021-1-1T12:00"
    });


    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleSelectMandatoryChange = (event) => {
        setState({ ...state, selectedMandatoryCategory: event.target.value });
    };

    const handleSelectOptionalChange = (event) => {
        setState({ ...state, selectedOptionalCategory: event.target.value });
    };

    const handleStartDateChange = (event) => {
        setState({ ...state, startTime: event.target.value });
    };

    const handleEndDateChange = (event) => {
        setState({ ...state, endTime: event.target.value });
    };

    const { title, description, category, selectedMandatoryCategory, selectedOptionalCategory, startTime, endTime } = state;
    const theme = useTheme();
    const handleSubmit = () => {
        addTest({ title, description, startTime: (new Date(startTime)).getTime(), endTime: (new Date(endTime)).getTime(), mandatoryCategory: selectedMandatoryCategory, optionalCategory: selectedOptionalCategory })
            .then(res => {
                if (res.success === true) {
                    toast.success("Test Created Successfully!!")
                } else {
                    throw new Error(res.errors !== undefined? res.errors[0].msg : res.msg)
                }
            })
            .catch(err => toast.error(err.message))
    }
    useEffect(() => {
        async function initials() {
            getCategory()
                .then((data) => {
                    console.log(data)
                    if (data.err || data.errors) {
                        toast.error("Error")
                    } else {
                        setState({ ...state, category: data });
                    }
                })
                .catch((error) => {
                    return error;
                });
        }
        initials();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Box
            style={{ width: "50%", margin: "auto" }}
        >
            <Paper>
                <Typography variant="h5" align="center" style={{ paddingTop: "1rem" }}> Create Test</Typography>
                <form className={classes.root} noValidate autoComplete="off">

                    <TextField
                        id="outlined-full-width"
                        label="Title"
                        placeholder="Title for the Test"
                        fullWidth
                        value={title}
                        name="title"
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        id="outlined-full-width"
                        label="Description"
                        placeholder="Short Description for Test"
                        fullWidth
                        value={description}
                        name="description"
                        onChange={handleChange}
                        margin="normal"
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-chip-label">Mandatory Category</InputLabel>
                        <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={selectedMandatoryCategory}
                            onChange={handleSelectMandatoryChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {
                                        selected.map((value) => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {category.map((name) => (
                                <MenuItem key={name} value={name} style={getStyles(name, selectedMandatoryCategory, theme)}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-chip-label">Optional Category</InputLabel>
                        <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={selectedOptionalCategory}
                            onChange={handleSelectOptionalChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {
                                        selected.map((value) => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {category.map((name) => (
                                <MenuItem key={name} value={name} style={getStyles(name, selectedOptionalCategory, theme)}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="datetime-local"
                            label="Start Time"
                            type="datetime-local"
                            onChange={handleStartDateChange}
                            defaultValue={startTime}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            id="datetime-local"
                            label="End Time"
                            type="datetime-local"
                            defaultValue={endTime}
                            onChange={handleEndDateChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </FormControl>
                    <FormControl className={classes.formControl} gutterbottom>
                        <Button variant="contained" color="primary" align="center" onClick={handleSubmit} style={{ margin: "1rem 0" }}> Submit </Button>
                    </FormControl>

                </form>
            </Paper>

        </Box>

    );
}
