import { FC, useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { PiListBold } from "react-icons/pi";
import { Spinner } from "reactstrap";

import { TUserData } from "@core/models/userData.model";
import { useGetUsersList } from "@core/services/api/user.api";
import { GridView } from "./GridView";
import { ListView } from "./ListView";
import { ViewButton } from "./ViewButton";

const UsersList: FC = (): JSX.Element => {
  const [view, setView] = useState<"list" | "grid">("list");
  const [data, setData] = useState<TUserData[] | []>([]);

  const { data: result, isSuccess, isFetching } = useGetUsersList();

  useEffect(() => {
    if (isSuccess) {
      setData(result.data);
    }
  }, [result, isSuccess]);
  return (
    <div>
      <div className="d-flex justify-content-end gap-2 mb-4">
        <ViewButton
          name="grid"
          view={view}
          icon={BsFillGridFill}
          setView={setView}
        />
        <ViewButton
          name="list"
          view={view}
          icon={PiListBold}
          setView={setView}
        />
      </div>
      {isFetching && (
        <div className="text-center my-3">
          <Spinner color="#854055" />
        </div>
      )}
      {isSuccess && result.data.length > 0 ? (
        view === "list" ? (
          <ListView data={data} />
        ) : (
          <GridView data={data} />
        )
      ) : isSuccess && result.data.length === 0 ? (
        <span dir="rtl" className="d-block text-center">
          اطلاعاتی برای نمایش وجود ندارد.
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export { UsersList };
