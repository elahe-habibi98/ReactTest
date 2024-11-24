import { FC } from "react";
import { FaUniversity, FaUserGraduate } from "react-icons/fa";
import { FaPhoneFlip, FaRegCircleUser } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { PiUserListFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import { TUserData } from "@core/models/userData.model";
import { faNumber } from "@core/utils/utils";

interface IItemProp {
  data: TUserData;
}

const Item: FC<IItemProp> = ({ data }): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div
      className="p-3"
      style={{
        width: "200px",
        borderRadius: "15px",
        border: "1px solid #002327",
      }}
    >
      <FaRegCircleUser
        size={30}
        color="#854055"
        className="m-auto d-block mb-3"
      />

      <div dir="rtl">
        <div className="d-flex gap-2 align-items-center mb-2">
          <PiUserListFill />
          <span>
            {data.name} {data.lastname !== "" ? data.lastname : ""}
          </span>
        </div>
        <div className="d-flex gap-2 align-items-center mb-2">
          <FaPhoneFlip /> <span>{faNumber(data.phoneNumber)}</span>
        </div>
        <div className="d-flex gap-2 align-items-center mb-2">
          <FaUserGraduate />{" "}
          <span>
            {data.grade == "1" ? "دیپلم" : data.grade == "2" ? "لیسانس" : "-"}
          </span>
        </div>
        <div className="d-flex gap-2 align-items-center mb-2">
          <FaUniversity />{" "}
          <span>{data.university !== "" ? data.university : "-"}</span>
        </div>
        <div
          className="d-flex gap-2 align-items-center mb-2 cursor-pointer"
          onClick={() => navigate(`/info/${data.id}`)}
        >
          <FiEdit /> <span>ویرایش</span>
        </div>
      </div>
    </div>
  );
};

export { Item };
