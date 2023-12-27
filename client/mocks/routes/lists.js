// users data
const LISTS = [
    {
        id: "49274cb2-d604-4c13-8786-7daf547cedd3",
        title: "Nákup na pondělí",
        status: "done",
        owner: "acec32c6-9f83-4e77-9228-9dab18e49a67",
        created_at: "2023-05-19",
        members: [
            {
                email: "owner@gmail.com",
                created_at: "2023-05-19",
                avatar: "something",
                id: "acec32c6-9f83-4e77-9228-9dab18e49a67",
            },
            {
                email: "member@gmail.com",
                created_at: "2023-05-19",
                avatar: "something",
                id: "a9ddb9d0-a32e-4c09-9dca-59a007d0b2d8",
            },
            {
                email: "notmember@gmail.com",
                created_at: "2023-05-19",
                avatar: "something",
                id: "646b2a56-599c-43e0-b15a-518c7b166d2b",
            },
        ],
    },
    {
        id: "dad9069e-9326-44fc-9fd6-5508e22f2141",
        title: "TODO list",
        status: "new",
        owner: "acec32c6-9f83-4e77-9228-9dab18e49a67",
        created_at: "2023-05-19",
        members: [
            {
                email: "owner@gmail.com",
                created_at: "2023-05-19",
                avatar: "something",
                id: "acec32c6-9f83-4e77-9228-9dab18e49a67",
            },
        ],
    },
    {
        id: "dad9069e-9326-44fc-9fd6-5508r22f2141",
        title: "Vánoce",
        status: "new",
        owner: "a9ddb9d0-a32e-4c09-9dca-59a007d0b2d8",
        created_at: "2023-05-19",
        members: [
            {
                email: "owner@gmail.com",
                created_at: "2023-05-19",
                avatar: "something",
                id: "acec32c6-9f83-4e77-9228-9dab18e49a67",
            },
            {
                email: "member@gmail.com",
                created_at: "2023-05-19",
                avatar: "something",
                id: "a9ddb9d0-a32e-4c09-9dca-59a007d0b2d8",
            },
        ],
    },
];

const ALL_LISTS = [
    {
        id: "b2f2cce4-ee5a-4b59-839b-a39b87763143",
        title: "Na zahradu",
        status: "cancelled",
        owner: "a9ddb9d0-a32e-4c09-9dca-59a007d0b2d8",
        created_at: "2023-05-19",
        members: [],
    },
    {
        id: "49274cb2-d604-4c13-8786-7daf547cedd3",
        title: "Nákup na pondělí",
        status: "done",
        owner: "acec32c6-9f83-4e77-9228-9dab18e49a67",
        created_at: "2023-05-19",
        members: [],
    },
    {
        id: "dad9069e-9326-44fc-9fd6-5508e22f2141",
        title: "TODO list",
        status: "new",
        owner: "acec32c6-9f83-4e77-9228-9dab18e49a67",
        created_at: "2023-05-19",
        members: [],
    },
    {
        id: "dad9069e-9326-44fc-9fd6-5508r22f2141",
        title: "Vánoce",
        status: "new",
        owner: "acec32c6-9f83-4e77-9228-9dab18e49a67",
        created_at: "2023-05-19",
        members: [],
    },
];

const LIST_ITEM = [
    {
        id: "49274cb2-d604-4c13-8786-7daf547cedd3",
        title: "Nákup na pondělí",
        status: "new",
        owner: "acec32c6-9f83-4e77-9228-9dab18e49a67",
        created_at: "2023-05-19",
        members: [
            {
                email: "owner@gmail.com",
                created_at: "2023-05-19",
                avatar: "something",
                id: "acec32c6-9f83-4e77-9228-9dab18e49a67",
            },
            {
                email: "member@gmail.com",
                created_at: "2023-05-19",
                avatar: "something",
                id: "a9ddb9d0-a32e-4c09-9dca-59a007d0b2d8",
            },
            {
                email: "notmember@gmail.com",
                created_at: "2023-05-19",
                avatar: "something",
                id: "646b2a56-599c-43e0-b15a-518c7b166d2b",
            },
        ],
        items: [
            {
                title: "Maso",
                note: "hovězí mleté 500g",
                status: "done",
                id: "6ec88fbd-08b5-400a-b381-945db945eb3c",
                owner: "acec32c6-9f83-4e77-9228-9dab18e49a67",
                created_at: "2023-05-19",
            },
            {
                title: "Pečivo",
                status: "new",
                note: "",
                id: "caf38333-e032-49cf-a36d-b2fd7be8c8f6",
                owner: "a9ddb9d0-a32e-4c09-9dca-59a007d0b2d8",
                created_at: "2023-05-19",
            },
            {
                title: "Máslo",
                note: "",
                status: "done",
                id: "f47c3697-8a48-4a40-a95c-c7c4a88050ba",
                owner: "a9ddb9d0-a32e-4c09-9dca-59a007d0b2d8",
                created_at: "2023-05-19",
            },
            {
                title: "Párek",
                status: "new",
                note: "stačí dva páry",
                id: "7a32b920-b4ef-4b41-ad0f-99395ddb6d73",
                owner: "acec32c6-9f83-4e77-9228-9dab18e49a67",
                created_at: "2023-05-19",
            },
        ],
    },
    {
        id: "49274cb2-d604-4c13-8786-7daf547cedd3",
        title: "New title",
        status: "new",
        owner: "acec32c6-9f83-4e77-9228-9dab18e49a67",
        created_at: "2023-05-19",
        members: [
            {
                email: "owner@gmail.com",
                created_at: "2023-05-19",
                avatar: "something",
                id: "acec32c6-9f83-4e77-9228-9dab18e49a67",
            },
            {
                email: "member@gmail.com",
                created_at: "2023-05-19",
                avatar: "something",
                id: "a9ddb9d0-a32e-4c09-9dca-59a007d0b2d8",
            },
            {
                email: "notmember@gmail.com",
                created_at: "2023-05-19",
                avatar: "something",
                id: "646b2a56-599c-43e0-b15a-518c7b166d2b",
            },
        ],
        items: [
            {
                title: "Maso",
                note: "hovězí mleté 500g",
                status: "done",
                id: "6ec88fbd-08b5-400a-b381-945db945eb3c",
                owner: "acec32c6-9f83-4e77-9228-9dab18e49a67",
                created_at: "2023-05-19",
            },
            {
                title: "Pečivo",
                status: "new",
                note: "",
                id: "caf38333-e032-49cf-a36d-b2fd7be8c8f6",
                owner: "a9ddb9d0-a32e-4c09-9dca-59a007d0b2d8",
                created_at: "2023-05-19",
            },
            {
                title: "Máslo",
                note: "",
                status: "done",
                id: "f47c3697-8a48-4a40-a95c-c7c4a88050ba",
                owner: "a9ddb9d0-a32e-4c09-9dca-59a007d0b2d8",
                created_at: "2023-05-19",
            },
            {
                title: "Párek",
                status: "new",
                note: "stačí dva páry",
                id: "7a32b920-b4ef-4b41-ad0f-99395ddb6d73",
                owner: "acec32c6-9f83-4e77-9228-9dab18e49a67",
                created_at: "2023-05-19",
            },
        ],
    },
];

module.exports = [
    {
        id: "get-lists", // route id
        url: "/list", // url in express format
        method: "GET", // HTTP method
        variants: [
            {
                id: "ok", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: LISTS, // body to send
                },
            },
            {
                id: "error", // variant id
                type: "json", // variant handler id
                options: {
                    status: 400, // status to send
                    // body to send
                    body: {
                        message: "Error",
                    },
                },
            },
            {
                id: "server-error", // variant id
                type: "json", // variant handler id
                options: {
                    status: 500, // status to send
                    // body to send
                    body: {
                        message: "Server error",
                    },
                },
            },
            {
                id: "all", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: ALL_LISTS, // body to send
                },
            },
        ],
    },
    {
        id: "get-list", // route id
        url: "/list/:id", // url in express format
        method: "GET", // HTTP method
        variants: [
            {
                id: "ok", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: LIST_ITEM[0],
                },
            },
            {
                id: "real", // variant id
                type: "middleware", // variant handler id
                options: {
                    // Express middleware to execute
                    middleware: (req, res) => {
                        const listId = req.params.id;
                        const list = LISTS.find((listData) => listData.id === listId);
                        if (list) {
                            res.status(200);
                            res.send(list);
                        } else {
                            res.status(404);
                            res.send({
                                message: "User not found",
                            });
                        }
                    },
                },
            },
        ],
    },
    {
        id: "post-list", // route id
        url: "/list", // url in express format
        method: "POST", // HTTP method
        variants: [
            {
                id: "ok", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: {
                        id: "b2f2cce4-ee5a-4b59-839b-a39347763143",
                        title: "Mock",
                        status: "new",
                        owner: "acec32c6-9f83-4e77-9228-9dab18e49a67",
                        created_at: "2023-11-30",
                        members: [
                            {
                                email: "owner@gmail.com",
                                created_at: "2023-05-19",
                                avatar: "something",
                                id: "acec32c6-9f83-4e77-9228-9dab18e49a67",
                            },
                            {
                                email: "member@gmail.com",
                                created_at: "2023-05-19",
                                avatar: "something",
                                id: "a9ddb9d0-a32e-4c09-9dca-59a007d0b2d8",
                            },
                        ],
                    },
                },
            },
        ],
    },
    {
        id: "put-list", // route id
        url: "/list/:id", // url in express format
        method: "PUT", // HTTP method
        variants: [
            {
                id: "ok", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: LIST_ITEM[1],
                },
            },
        ],
    },
    {
        id: "delete-list", // route id
        url: "/list/:id", // url in express format
        method: "DELETE", // HTTP method
        variants: [
            {
                id: "ok", // variant id
                type: "json", // variant handler id
                options: {
                    status: 200, // status to send
                    body: {},
                },
            },
        ],
    },
];
