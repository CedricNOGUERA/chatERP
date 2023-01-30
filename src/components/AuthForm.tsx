import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import useAuthStore from "../store/userAuthStore";

const AuthForm = ({ userdata }: any) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  //form data
  const [formName, setformName] = React.useState<string>("");
  const [formPass, setformPass] = React.useState<string>("");

  const authLogin = useAuthStore((state: any) => state.authLogin);
  const authUserId = useAuthStore((state: any) => state.authUserId);

  const authentification = (e: any) => {
    e.preventDefault();

    const userAuth = userdata?.filter(
      (filt: any) => filt.username == formName && filt.pass == formPass
    );
    userAuth[0] &&
    userAuth[0].username === formName &&
    userAuth[0].pass === formPass
      ? (setformName(""),
        setformPass(""),
        setIsError(false),
        authLogin(
          true,
          userAuth[0].id,
          userAuth[0].first_name,
          userAuth[0].last_name,
          userAuth[0].avatar
        ))
      : setIsError(true);
  };

  return (
    <Container className="w-100 mt-5" style={{ background: "none" }}>
      <Row justify="space-around" align="middle">
        <Col xs={12}>
          <Card className="p-5">
            <Container>
              <img
                src="https://img.icons8.com/stickers/144/user.png"
                alt="icon"
                loading="lazy"
              />
              <p>
                <b>Log in</b>
              </p>
            </Container>
            <Form id="form" onSubmit={authentification}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="userName"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formName}
                    onChange={(e) => {
                      setformName(e.currentTarget.value);
                    }}
                  />
                </FloatingLabel>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <FloatingLabel
                  controlId="passWord"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formPass}
                    onChange={(e) => {
                      setformPass(e.currentTarget.value);
                    }}
                  />
                </FloatingLabel>
              </Form.Group>
              {isError && (
                <>
                  <p style={{ color: "red" }}>
                    <img
                      src="https://img.icons8.com/stickers/25/delete-shield.png"
                      alt="icon"
                      loading="lazy"
                    />{" "}
                    <b>Erreur sur vos informations</b>
                  </p>
                </>
              )}
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
