import { useParams } from "react-router";
import { Container, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import defaultAvatar from "../default_profile_picture.jpg";
function UserProfile({ mode }) {
  const routeParams = useParams();
  const [userOfProfile, setUserOfProfile] = useState(undefined);

  useEffect(() => {
    if (routeParams.username) {
      async function getUserByNameFromAPI() {
        const res = await fetch(`/users/name/${routeParams.username}`);
        const userJson = await res.json();
        setUserOfProfile(userJson);
      }
      getUserByNameFromAPI(routeParams.username);
    } else if (routeParams.userid) {
      async function getUserByIDFromAPI() {
        const res = await fetch(`/users/id/${routeParams.userid}`);
        const userJson = await res.json();
        setUserOfProfile(userJson);
      }
      getUserByIDFromAPI(routeParams.userid);
    }
  }, [routeParams]);
  return (
    <section className="user-profile">
      {userOfProfile ? (
        <>
          <Container className="p-3 profile-view-container mt-5 d-flex flex-column align-items-center">
            <img
              className="rounded-circle"
              src={
                userOfProfile.avatar
                  ? `data:image/${userOfProfile.avatar.contentType};base64,${userOfProfile.avatar.dataBase64Encoded}`
                  : defaultAvatar
              }
              alt="User avatar"
              style={{ width: "250px", height: "auto" }}
            />
            <h4 className="my-2">{userOfProfile.username}</h4>
          </Container>
          <Container className="p-3 bg-light post-view-container my-2 border rounded">
            <h5>Posts</h5>
          </Container>
        </>
      ) : (
        <div className="spinner-container mt-3">
          <Spinner className="post-loading-spinner" animation="border" />
        </div>
      )}
    </section>
  );
}

export default UserProfile;
