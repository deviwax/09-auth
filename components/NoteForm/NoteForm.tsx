'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, NewNote } from '@/lib/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string()
    .max(500, 'Content must be at most 500 characters')
    .notRequired(),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Tag is required'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik<NewNote>
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        mutation.mutate(values, {
          onSettled: () => {
            setSubmitting(false);
          },
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" type="text" />
          <ErrorMessage name="title" component="div" className={styles.error} />

          <label htmlFor="content">Content</label>
          <Field id="content" name="content" as="textarea" />
          <ErrorMessage name="content" component="div" className={styles.error} />

          <label htmlFor="tag">Tag</label>
          <Field id="tag" name="tag" as="select">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={styles.error} />

          {mutation.isError && (
            <div className={styles.error}>
              Failed to create note. Please try again.
            </div>
          )}

          <div className={styles.buttons}>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create note'}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}