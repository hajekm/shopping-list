import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faCheck,
  faXmark,
  faArrowAltCircleRight,
  faFilterCircleXmark,
  faUsers,
  faListCheck,
  faCirclePlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { DataView } from "primereact/dataview";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Menubar } from "primereact/menubar";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import StatusTag from "./StatusTag";
import ItemInput from "./ItemInput";

const mockList = [
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
];

const mockUsers = [
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
];

let emptyMember = {
  email: "",
  created_at: "",
  avatar: "",
  id: "",
};

let emptyList = {
  id: "",
  title: "",
  status: "",
  owner: "",
  created_at: "",
  items: [],
  members: [],
};

function ShoppingList() {
  const [lists, setLists] = useState([]);
  const [list, setList] = useState(emptyList);
  const [visibleLists, setVisibleLists] = useState([]);
  const [status, setStatus] = useState(null);
  const [users, setUsers] = useState(mockUsers);
  const [user, setUser] = useState(emptyMember);
  const [deleteListDialog, setDeleteListDialog] = useState(false);
  const [addListDialog, setAddListDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const statuses = [
    { name: "Nový", code: "new" },
    { name: "Hotový", code: "done" },
    { name: "Zrušený", code: "cancelled" },
    { name: "Vše", code: "all" },
  ];

  useEffect(() => {
    let _lists = mockList.filter((e) => e.status === "new");
    setLists(mockList);
    setVisibleLists(_lists);
  }, []);

  const saveList = (values) => {
    if (user || user.id !== "") {
      setSubmitted(true);
      let _lists = [...lists];
      let _visibleLists = [...visibleLists];
      let current = new Date();
      let _list = {
        id: uuidv4,
        title: values.title,
        status: "new",
        owner: user.id,
        created_at: current.toISOString(),
      };
      _lists.push(_list);
      _visibleLists.push(_list);
      toast.current.show({
        severity: "success",
        summary: "Úspěch",
        detail: `Seznam ${values.title} byl přidán`,
        life: 3000,
      });

      setLists(_lists);
      setVisibleLists(_visibleLists);
      setAddListDialog(false);
    } else {
      toast.current.show({
        severity: "danger",
        summary: "Chyba",
        detail: `Nejste přihlášen`,
        life: 3000,
      });
    }
  };

  const deleteList = () => {
    if (user.id !== list.owner) {
      toast.current.show({
        severity: "danger",
        summary: "Chyba",
        detail: `Nemáte oprávnění smazat položku: ${list.title}`,
        life: 3000,
      });
    } else {
      let _lists = lists.filter((e) => e.id !== list.id);
      let _visibleLists = visibleLists.filter((e) => e.id !== list.id);
      setLists(_lists);
      setVisibleLists(_visibleLists);
      setDeleteListDialog(false);
      setList(emptyList);
      toast.current.show({
        severity: "success",
        summary: "Úspěch",
        detail: `Položka ${list.title} byla smazána`,
        life: 3000,
      });
    }
  };

  const leftToolbarTemplate = () => {
    if (user && user.id !== "") {
      return (
        <div className="flex flex-wrap gap-2">
          <Button
            label="Nový seznam"
            icon={<FontAwesomeIcon className="mr-1" icon={faCirclePlus} />}
            severity="success"
            onClick={() => setAddListDialog(true)}
          />
        </div>
      );
    }
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          icon={<FontAwesomeIcon className="mr-1" icon={faFilterCircleXmark} />}
          severity="secondary"
          onClick={() => {
            let _lists = mockList.filter((e) => e.status === "new");
            setVisibleLists(_lists);
            setStatus(null);
          }}
        />
        <Dropdown
          placeholder="Dle stavu"
          name="filter"
          inputId="filter"
          options={statuses}
          optionLabel="name"
          optionValue="code"
          value={status}
          onChange={(e) => {
            if (e.value === "all") {
              setVisibleLists(lists);
            } else {
              let _lists = lists.filter((val) => e.value === val.status);
              setVisibleLists(_lists);
            }
            setStatus(e.value);
          }}
        />
      </div>
    );
  };

  const confirmDeleteList = (l) => {
    setList(l);
    setDeleteListDialog(true);
  };

  const hideDeleteListDialog = () => {
    setDeleteListDialog(false);
  };

  const hideAddListDialog = () => {
    setSubmitted(false);
    setAddListDialog(false);
  };

  const start = () => (
    <Link className="mr-8" to="/">
      <FontAwesomeIcon size={"3x"} icon={faListCheck} />
    </Link>
  );

  const end = () => (
    <Dropdown
      icon={<FontAwesomeIcon icon={faUsers} className="mr-1" />}
      value={user}
      onChange={(e) => {
        setUser(e.value);
      }}
      options={users}
      optionLabel="email"
      placeholder="Log in"
      className="w-full md:w-14rem"
    />
  );

  const deleteListDialogFooter = (
    <React.Fragment>
      <Button
        label="Ne"
        icon={<FontAwesomeIcon icon={faXmark} className="mr-1" />}
        outlined
        onClick={() => setDeleteListDialog(false)}
      />
      <Button
        label="Ano"
        icon={<FontAwesomeIcon icon={faCheck} className="mr-1" />}
        severity="danger"
        onClick={deleteList}
      />
    </React.Fragment>
  );

  const header = (l) => (
    <div className="flex flex-wrap justify-content-between gap-2 ml-3 mt-1 mr-3">
      <h5>{l.created_at}</h5>
      <Button
        icon={<FontAwesomeIcon icon={faTrashCan} />}
        rounded
        text
        visible={l.status !== "cancelled" && l.owner === user.id}
        severity="danger"
        onClick={() => confirmDeleteList(l)}
        size="small"
      />
    </div>
  );

  const footer = (l) => (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        label="Detail"
        icon={
          <FontAwesomeIcon className={"mr-1"} icon={faArrowAltCircleRight} />
        }
        onClick={() => console.log("redirect: " + l.id)}
      />
    </div>
  );

  const getOwner = (owner) => {
    const index = users.findIndex((e) => e.id === owner);
    return users[index].email;
  };

  const getShoppingList = (list) => {
    return (
      <div className="card flex justify-content-center m-5">
        <Card
          title={list.title}
          subTitle={<StatusTag status={list.status} />}
          footer={footer(list)}
          header={header(list)}
          className="md:w-20rem"
        >
          <p className="m-0">Owner: {getOwner(list.owner)}</p>
        </Card>
      </div>
    );
  };

  return (
    <div className="card">
      <Menubar title="Shopping List" start={start} end={end} />
      <div className="flex grid m-5 justify-content-center grid">
        <Toast ref={toast} />
        <br />
        <div className="col-12">
          <Toolbar
            className="mb-4"
            start={leftToolbarTemplate}
            end={rightToolbarTemplate}
          />
        </div>
        <DataView
          value={visibleLists}
          layout="grid"
          itemTemplate={getShoppingList}
        />
      </div>

      <Dialog
        visible={addListDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Nový seznam"
        modal
        className="p-fluid"
        onHide={hideAddListDialog}
      >
        <Formik
          initialValues={{
            owner: user.owner,
            status: "new",
            members: [],
          }}
          validationSchema={Yup.object({
            title: Yup.string()
              .min(3, "Musí obsahovat alespoň 3 znaky")
              .required("Povinné pole"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              saveList(values);
              setSubmitted(false);
              setSubmitting(false);
            }, 500);
          }}
        >
          {(formik) => (
            <div className="flex card justify-content-center">
              <Form className="flex flex-column gap-2">
                <ItemInput id="title" name="title" label="Název" />
                <MultiSelect
                  id="user"
                  name="user"
                  options={users}
                  value={formik.values.members}
                  onChange={(e) => {
                    formik.setFieldValue("members", e.value);
                  }}
                  optionLabel="email"
                  placeholder="Vyber členy"
                  className="w-full md:w-20rem"
                />
                <Button
                  type="submit"
                  severity="secondary"
                  icon={<FontAwesomeIcon icon={faSave} className="mr-1" />}
                  label="Uložit"
                />
              </Form>
            </div>
          )}
        </Formik>
      </Dialog>

      <Dialog
        visible={deleteListDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Potvrzení"
        modal
        footer={deleteListDialogFooter}
        onHide={hideDeleteListDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {list && (
            <span>
              Opravdu chcete smazat seznam <b>{list.title}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default ShoppingList;
