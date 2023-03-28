import { TiDocumentAdd } from 'react-icons/ti';
import { Form, FieldWraper, Field, SubmitBtn } from './ContactForm.styled';
import { toast } from 'react-toastify';
import { contactsFormValidate } from 'constants';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  async function crreateNewContact(name, number) {
    try {
      return await contactsFormValidate.validate({ name, number });
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.elements.name.value;
    const lowerCaseName = name.toLowerCase();

    if (
      contacts.length > 0 &&
      contacts.some(contact => contact.name.toLowerCase() === lowerCaseName)
    ) {
      toast.warn(`"${name}" is already in contacts`);
      return;
    }

    const number = form.elements.number.value;

    const newContact = await crreateNewContact(name, number);

    if (newContact) {
      dispatch(addContact(newContact));
      form.reset();
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FieldWraper>
        Name
        <Field type="text" name="name" />
      </FieldWraper>
      <FieldWraper>
        Phone
        <Field type="tel" name="number" />
      </FieldWraper>
      <SubmitBtn type="submit">
        <TiDocumentAdd size="30" />
        Add contact
      </SubmitBtn>
    </Form>
  );
}
