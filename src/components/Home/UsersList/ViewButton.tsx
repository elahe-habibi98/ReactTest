import { FC } from "react";
import { IconType } from "react-icons/lib";

interface IViewButtonProp {
  icon: IconType;
  view: "list" | "grid";
  name: "list" | "grid";
  setView: React.Dispatch<React.SetStateAction<"list" | "grid">>;
}

const ViewButton: FC<IViewButtonProp> = ({
  icon: Icon,
  name,
  view,
  setView,
}): JSX.Element => {
  return (
    <div
      className="d-flex justify-content-center align-items-center cursor-pointer"
      style={{
        border: `1px solid ${name === view ? "#854055" : "#929FA1"} `,
        borderRadius: "14px",
        width: "40px",
        height: "40px",
      }}
      onClick={() => setView(name)}
    >
      <Icon color={name === view ? "#854055" : "#929FA1"} />
    </div>
  );
};

export { ViewButton };
