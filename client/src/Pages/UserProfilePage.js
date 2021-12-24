import Header from "../Components/Header";
import UserProfile from "./../Components/UserProfile";

function UserProfilePage({ ownUser }) {
  return (
    <>
      <Header></Header>
      <UserProfile ownUser={true}></UserProfile>
    </>
  );
}
export default UserProfilePage;
