const url = "http://localhost:8000";

export class ShoppingListService {
  static getShoppingList() {
    return JSON.parse(
      '{"title": "Nákup na večeři!", "id":"211b9b5b-bee0-443c-b94c-c94c93c6b998", "owner":"acec32c6-9f83-4e77-9228-9dab18e49a67"}'
    );
    // return fetch(`${url}/list/${id}`).then((res) => res.json());
  }

  static getShoppingLists() {
    return fetch(`${url}/list`).then((res) => res.json());
  }

  static deleteShoppingList(id) {
    return fetch(`${url}/list/${id}`, { method: "DELETE" }).then(
      (res) => res.status
    );
  }

  static deleteListItem(id) {
    return fetch(`${url}/item/${id}`, { method: "DELETE" }).then(
      (res) => res.status
    );
  }

  static postListItem(values) {
    return fetch(`${url}/item`, {
      method: "POST",
      body: JSON.stringify(values, null, 2),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res);
  }

  static putitem(values) {
    return fetch(`${url}/item/${values.id}`, {
      method: "PUT",
      body: JSON.stringify(values, null, 2),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res);
  }
}
