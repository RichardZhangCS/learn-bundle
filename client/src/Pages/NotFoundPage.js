import Header from "./../Components/Header";

export default function NotFoundPage() {
  return (
    <>
      <Header></Header>
      <div className="text-light not-found-container text-center">
        <h1 style={{ fontSize: "84px" }}>404 NOT FOUND</h1>
        <h3>No page is associated with this link :(</h3>
      </div>
    </>
  );
}
