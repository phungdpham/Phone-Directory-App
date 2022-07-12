export const Api = (() => {
  // const baseUrl = "http://localhost:4232";
  // const contactPath = "contacts";

  const getContacts = () => {
  if(localStorage['contacts'] === undefined) {
    localStorage['contacts'] = '';
  } else {
     let contactList = window.localStorage.getItem('contacts')
     console.log(contactList);
    //  return JSON.parse(contactList);
  }
}
    // fetch([baseUrl, contactPath].join("/")).then((response) => response.json());

  const addContact = (contact) => window.localStorage.setItem('contacts', JSON.stringify(contact))
    // fetch([baseUrl, contactPath].join("/"), {
    //   method: "POST",
    //   body: JSON.stringify(contact),
    //   headers: {
    //     "Content-type": "application/json;charset=UTF-8",
    //   },
    // }).then((response) => response.json());



  return {
    getContacts,
    addContact,
  };
})();
