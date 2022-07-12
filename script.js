import { Api } from "./api.js";

/* View */
const View = (() => {
  const domstr = {
    contactContainer: "#contactsList_container",
    submitBtn: ".btn",
    // nameBox: "#name",
    // phoneBox: "#mobile",
    // emailBox: "#email",
  };

  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  };

  const createTmp = (arr) => {
    let tmp = "";
    arr.forEach((contact) => {
      tmp += `
        <tr>
          <td>${contact.name}</td>
          <td>${contact.mobile}</td>
          <td>${contact.email}</td>
        </tr>
      `;
    });
    return tmp;
  };
  return {
    domstr,
    render,
    createTmp,
  };
})();

/* Model */
const Model = ((api, view) => {
  class Contact {
    constructor(name, mobile, email) {
      this.contactId = 1;
      this.contactName = name;
      this.contactMobile = mobile;
      this.contactEmail = email;
    }
  }
  class State {
    #contactList = [];

    get contactList() {
      return this.#contactList;
    }

    set contactList(newContactList) {
      this.#contactList = [...newContactList];
      const contactListContainer = document.querySelector(
        view.domstr.contactContainer
      );
      const tmp = view.createTmp(this.#contactList);
      view.render(contactListContainer, tmp);
    }
  }

  const { getContacts, addContact } = api;

  return {
    getContacts,
    addContact,
    Contact,
    State,
  };
})(Api, View);

/* Controller */
const Controller = ((model, view) => {
  const state = new model.State();

  const addContact = () => {
    const submitButton = document.querySelector(view.domstr.submitBtn);
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      const name = document.querySelector('#name').trim();
      const mobile = document.querySelector('#mobile').trim();
      const email = document.querySelector('#email').trim();
      
      const newContact = new model.Contact(name, mobile, email);
      console.log(newContact);

      model.addContact(newContact).then(contact => {
        state.contactList = [contact, ...state.contactList];
      })

      // clear the input box
      name.value = '';
      mobile.value = '';
      email.value = '';
    })
  }

  const init = () => {
    model.getContacts().then(contacts => {
      state.contactList = [...contacts.reverse()];
    })
  }

  const bootstrap = () => {
    init();
    addContact();
  }

  return {
    bootstrap
  }
})(Model, View);

Controller.bootstrap();

