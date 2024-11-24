import { FC, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";

import { TUserData } from "@core/models/userData.model";
import { faNumber } from "@core/utils/utils";

import scrollGif from "@assets/img/scroll2.gif";

interface IListViewProp {
  data: TUserData[];
}

const ListView: FC<IListViewProp> = ({ data }): JSX.Element => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [showGif, setShowGif] = useState<boolean>(false);
  const [gifLoaded, setGifLoaded] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setIsSmallScreen(true);
        setShowGif(true);
        setTimeout(() => {
          setShowGif(false);
        }, 2000);
      } else {
        setIsSmallScreen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gifLoaded]);
  return (
    <div className="p-5 table-responsive">
      {isSmallScreen && showGif && (
        <div className="gif-overlay">
          <img
            src={scrollGif}
            alt=""
            style={{ width: "100px", height: "100px" }}
            onLoad={() => setGifLoaded(true)}
          />
        </div>
      )}
      <Table className="table">
        <thead>
          <tr>
            <th>ویرایش</th>
            <th>دانشگاه</th>
            <th>تحصیلات</th>
            <th>نام پدر</th>
            <th>شماره تلفن</th>
            <th>نقش</th>
            <th>نام خانوداگی</th>
            <th>نام</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: TUserData) => (
            <tr key={item.id}>
              <td>
                <FiEdit
                  color="#854055"
                  className="cursor-pointer"
                  onClick={() => navigate(`/info/${item.id}`)}
                />
              </td>
              <td>{item.university !== "" ? item.university : "-"}</td>
              <td>
                {item.grade == "1"
                  ? "دیپلم"
                  : item.grade == "2"
                  ? "لیسانس"
                  : "-"}
              </td>
              <td>{item.fatherName}</td>
              <td>{faNumber(item.phoneNumber)}</td>
              <td>{item.role ? item.role : "-"}</td>
              <td>{item.lastname !== "" ? item.lastname : "-"}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export { ListView };
