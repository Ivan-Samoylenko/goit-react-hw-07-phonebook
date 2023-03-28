export const selectFilter = store => store.filter;

export const selectContacts = store => store.contacts.items;

export const selectContactsIsLoading = store => store.contacts.isLoading;

export const selectContactsError = store => store.contacts.error;
