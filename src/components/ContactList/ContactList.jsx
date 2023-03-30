import { Contacts, ContactsItem, Text } from './ContactList.styled';
import { Contact } from 'components/Contact';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectContacts,
  selectContactsIsLoading,
  selectContactsError,
  selectFilter,
} from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import { useEffect } from 'react';

export const ContactList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {error && !isLoading && (
        <>
          <p>{error}</p>
          <p>Reload App please</p>
        </>
      )}
      {!isLoading && !error && contacts?.length === 0 && (
        <Text>There are no contacts here yet. add your first contact.</Text>
      )}
      {!isLoading &&
        !error &&
        contacts?.length !== 0 &&
        filteredContacts.length === 0 && (
          <Text> there are no matches with the "{filter}"</Text>
        )}
      {!error && filteredContacts?.length !== 0 && (
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
      {isLoading && <p>Loading ...</p>}
    </>
  );
};
