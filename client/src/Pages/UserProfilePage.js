import Header from "../Components/Header";
import UserProfile from "./../Components/UserProfile";

function UserProfilePage({ user }) {
  return (
    <>
      <Header></Header>
      <UserProfile preprovidedUser={user}></UserProfile>
    </>
  );
}
export default UserProfilePage;
