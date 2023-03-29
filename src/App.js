import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showUser, setShowUser] = useState([]);

  const fetchPostData = async () => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/posts");
    setPostData(data);
  };

  const fetchUserData = async () => {
    const data = await axios.get("https://jsonplaceholder.typicode.com/users");
    setUserData(data);
  };
  useEffect(() => {
    fetchPostData();
    fetchUserData();
  }, []);

  const handleUserInfo = (id) => {
    const user = userData?.data.filter((item) => item.id === id);
    setShowUser(user);
  };

  const ShowPosts = () => {
    let rows = [];
    if (postData?.data) {
      for (let i = 0; i < postData?.data.length; i++) {
        rows.push(
          <div
            style={{
              border: "1px solid brown",
              padding: "10px",
              margin: "10px"
            }}
          >
            <p>
              {" "}
              <b>id:</b> {postData?.data[i].id}{" "}
            </p>
            <p>
              <b>UserId:</b> {postData?.data[i].userId}
              <button onClick={() => handleUserInfo(postData?.data[i].userId)}>
                {" "}
                Get User Info
              </button>
            </p>
            {showUser &&
            showUser.length &&
            showUser[0].id === postData?.data[i].userId ? (
              <div
                className="users"
                style={{
                  border: "1px solid brown",
                  padding: "10px",
                  margin: "10px"
                }}
              >
                <p>
                  {" "}
                  <b>Name:</b> {showUser[0].name}
                </p>
                <p>
                  {" "}
                  <b>Username:</b> {showUser[0].username}
                </p>
                <p>
                  {" "}
                  <b>Email:</b> {showUser[0].email}
                </p>
                <p>
                  {" "}
                  <b>Phone:</b> {showUser[0].phone}
                </p>
                <p>
                  {" "}
                  <b>Website:</b> {showUser[0].website}
                </p>
                {/* <p> <b> Address :</b> street </p> */}
              </div>
            ) : null}
            <p>
              <b>Body:</b> {postData?.data[i].body}{" "}
            </p>
            <p>
              <b>Title:</b> {postData?.data[i].title}{" "}
            </p>
          </div>
        );
      }
    }
    return rows;
  };
  return (
    <div className="App">
      Displaying All Posts and User Info on Onclick event
      {ShowPosts()}
    </div>
  );
}
