/* View */
const View = (() => {
  const domstr = {
    contactContainer: "#contactsList_container",
    submitBtn: ".btn",
    searchBox: ".search"
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
  const Model = ((view) => {

  class Contact {
    constructor(name, mobile, email) {
      this.contactId = Math.random();
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

  return {
    Contact,
    State,
  };
})(View);


/* Controller */
const Controller = ((model, view) => {
  const state = new model.State();

  const addContact = () => {
    const submitButton = document.querySelector(view.domstr.submitBtn);
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();

      const name = document.querySelector('#name').value.trim();
      const mobile = document.querySelector('#mobile').value.trim();
      const email = document.querySelector('#email').value.trim();

      const newContact = new model.Contact(name, mobile, email);
      console.log(newContact);

      state.contactList.push(newContact);
      console.log(state.contactList);

      // clear the input box
      name.value = '';
      mobile.value = '';
      email.value = '';
     
    })
  }

  const init = () => state.contactList.reverse();

  const bootstrap = () => {
    init();
    addContact();
  }

  return {
    bootstrap
  }
})(Model, View);

Controller.bootstrap();

