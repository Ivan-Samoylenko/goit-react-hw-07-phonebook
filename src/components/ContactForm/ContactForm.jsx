import { TiDocumentAdd } from 'react-icons/ti';
import { Form, FieldWrapper, Field, SubmitBtn } from './ContactForm.styled';
import { toast } from 'react-toastify';
import { contactsFormValidate } from 'constants';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';

async function createNewContact(name, phone) {
  try {
    return await contactsFormValidate.validate({ name, phone });
  } catch (error) {
    toast.error(error.message);
    return null;
  }
}

export function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

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

    const phone = form.elements.number.value;

    const newContact = await createNewContact(name, phone);

    if (newContact) {
      dispatch(addContact(newContact));
      form.reset();
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FieldWrapper>
        Name
        <Field type="text" name="name" />
      </FieldWrapper>
      <FieldWrapper>
        Phone
        <Field type="tel" name="number" />
      </FieldWrapper>
      <SubmitBtn type="submit">
        <TiDocumentAdd size="30" />
        Add contact
      </SubmitBtn>
    </Form>
  );
}
