import { Col, Row } from "react-bootstrap";
import Avatar from "./Avatar";




const FriendsList = ({ user, indx, stateConnexion, getConversation, active }: any) => {
  return (
    <li
      key={user?.id_friend}
      className={
        active === user?.id_friend && user?.status === true
          ? "py-2 bg-light border-3 border-start border-info border-end"
          : "py-2 border-3 border-start border-white"
      }
      onClick={() => {
        getConversation(
          user?.id_friend && user?.id_friend,
          user?.room && user?.room
        );
      }}
    >
      <Row className="w-100 ps-3">
        <Col xs={2}>
          <Avatar
            avatar={user?.avatar}
            badge={stateConnexion && stateConnexion[indx][0]?.badge_status}
            statusUser={stateConnexion && stateConnexion[indx][0]?.status}
          />
        </Col>
        <Col className="m-auto">
          {user?.first_name} {user?.last_name}
        </Col>
      </Row>
    </li>
  );
};

export default FriendsList;
