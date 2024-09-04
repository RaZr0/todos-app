import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from 'yup';
import { Status, Todo } from "../../../interfaces/todo.interface";
import { v4 as uuidv4 } from 'uuid';
import { useRef } from "react";

export interface AddTodoProps {
    onAdd: (todo: Todo) => void
}

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    dueDate: Yup.string().required('Due date is required').nullable(),
});

const initialValues = {
    name: '',
    description: '',
    dueDate: '',
    status: Status.ToDo,
};


export const AddTodo = ({ onAdd }: AddTodoProps) => {


    const formikRef = useRef<FormikProps<any>>()

    return <div>
        <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onAdd({
                    id: uuidv4(),
                    description: values.description,
                    dueDate: values.dueDate,
                    name: values.name,
                    status: values.status
                })
                formikRef.current?.resetForm();
            }}
        >
            {({ values, handleChange, errors, touched }) => (
                <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                        {/* Name Field */}
                        <Field
                            as={TextField}
                            name="name"
                            label="Name"
                            variant="outlined"
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                        />

                        <Field
                            as={TextField}
                            name="description"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                        />

                        <Field
                            as={TextField}
                            name="dueDate"
                            label="Due Date"
                            variant="outlined"
                            error={touched.dueDate && Boolean(errors.dueDate)}
                            helperText={touched.dueDate && errors.dueDate}
                        />

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Field
                                as={Select}
                                name="status"
                                label="Status"
                                onChange={handleChange}
                                value={values.status}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Status"
                                    >
                                        <MenuItem value={Status.ToDo}>{Status.ToDo}</MenuItem>
                                        <MenuItem value={Status.InProgress}>{Status.InProgress}</MenuItem>
                                        <MenuItem value={Status.Done}>{Status.Done}</MenuItem>
                                    </Select>
                                )}
                            />
                        </FormControl>

                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    </div>
}