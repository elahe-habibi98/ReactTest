import { FC, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Button } from "reactstrap";

import { AddUser } from "./AddUser";
import { UsersList } from "./UsersList";

const Home: FC = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div>
      <Button
        className="d-flex gap-3 align-items-center"
        style={{ backgroundColor: "#854055" }}
        onClick={() => setShowModal(true)}
      >
        افزودن کاربر جدید
        <FaUserPlus color="white" size={22} />
      </Button>
      <div className=" my-2" style={{ border: "1px solid #C5CED1" }} />
      <UsersList />
      {showModal && (
        <AddUser showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export { Home };
