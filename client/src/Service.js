const url = "http://localhost:3100";

export class ShoppingListService {
    static getShoppingList(id) {
        return fetch(`${url}/list/${id}`);
    }

    static getShoppingLists() {
        return fetch(`${url}/list`);
    }

    static getUsers() {
        return fetch(`${url}/user`);
    }

    static getUser(id) {
        return fetch(`${url}/user/${id}`);
    }

    static deleteShoppingList(id) {
        return fetch(`${url}/list/${id}`, {method: "DELETE"});
    }

    static deleteListItem(id) {
        return fetch(`${url}/item/${id}`, {method: "DELETE"});
    }

    static postShoppingList(values) {
        return fetch(`${url}/list`, {
            method: "POST",
            body: JSON.stringify(values, null, 2),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }

    static putShoppingList(values) {
        return fetch(`${url}/list/${values.id}`, {
            method: "PUT",
            body: JSON.stringify(values, null, 2),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }

    static postListItem(values) {
        return fetch(`${url}/item`, {
            method: "POST",
            body: JSON.stringify(values, null, 2),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }

    static putListItem(values) {
        return fetch(`${url}/item/${values.id}`, {
            method: "PUT",
            body: JSON.stringify(values, null, 2),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
    }
}
