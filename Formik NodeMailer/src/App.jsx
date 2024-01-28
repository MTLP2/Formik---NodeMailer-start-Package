import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const ContactForm = () => {
    // Définition des valeurs initiales pour les champs du formulaire
    const initialValues = {
        name: '',
        email: '',
        message: ''
    };

    // Fonction de validation des champs du formulaire
    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Email requis'; // Vérification si l'email est fourni
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Adresse email invalide'; // Vérification du format de l'email
        }
        // Ajouter ici d'autres validations si nécessaire
        return errors;
    };

    // Fonction appelée lors de la soumission du formulaire
    const onSubmit = (values, { setSubmitting }) => {
        // Envoi des données du formulaire via Axios
        axios.post('URL_DU_SERVEUR', values)
             .then(response => {
                 console.log('Message envoyé', response); // Traitement en cas de succès
                 setSubmitting(false); // Mise à jour de l'état de soumission
             })
             .catch(error => {
                 console.error('Erreur d\'envoi', error); // Traitement en cas d'erreur
                 setSubmitting(false); // Mise à jour de l'état de soumission
             });
    };

    return (
        <Formik 
            initialValues={initialValues} 
            validate={validate} 
            onSubmit={onSubmit}
        >
            <Form>
                <Field type="text" name="name" placeholder="Nom" />
                <ErrorMessage name="name" component="div" />

                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" />

                <Field as="textarea" name="message" placeholder="Message" />
                <ErrorMessage name="message" component="div" />

                <button type="submit">Envoyer</button>
            </Form>
        </Formik>
    );
};

export default ContactForm;
