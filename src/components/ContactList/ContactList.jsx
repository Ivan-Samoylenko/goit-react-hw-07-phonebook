import { Contacts, ContactsItem, Text } from './ContactList.styled';
import { Contact } from 'components/Contact';
import { useSelector } from 'react-redux';
import { selectContacts, selectFilter } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {contacts.length === 0 && (
        <Text>There are no contacts here yet. add your first contact.</Text>
      )}
      {contacts.length !== 0 && filteredContacts.length === 0 && (
        <Text> there are no matches with the "{filter}"</Text>
      )}
      {filteredContacts.length !== 0 && (
        <Contacts>
          {filteredContacts.map(contact => {
            return (
              <ContactsItem key={contact.id}>
                <Contact contact={contact} />
              </ContactsItem>
            );
          })}
        </Contacts>
      )}
    </>
  );
};
