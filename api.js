export const Api = (() => {
  const baseUrl = "http://localhost:4232";
  const contactPath = "contacts";

  const getContacts = () =>
  fetch([baseUrl, contactPath].join('/')).then((response) => response.json());


    

  const addContact = (contact) => 
    fetch([baseUrl, contactPath].join('/'), {
      method: 'POST',
      body: JSON.stringify(contact),
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
      }
    }).then((response) => response.json());


  return {
    getContacts,
    addContact
  }
})();
