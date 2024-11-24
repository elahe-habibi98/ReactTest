import { FC } from "react";
import { Col, Row } from "reactstrap";

import { TUserData } from "@core/models/userData.model";
import { Item } from "./item";

interface IGridViewProp {
  data: TUserData[];
}

const GridView: FC<IGridViewProp> = ({ data }): JSX.Element => {
  return (
    <div className="p-5">
      <Row>
        {data.map((item: TUserData) => (
          <Col
            key={item.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="d-flex justify-content-center mb-3"
          >
            <Item data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export { GridView };
