import CreatePost from "@/components/post/createPost";

export default function HomePage() {
  return (
    <>
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-9">
              <CreatePost />
              <div className="mt-3 bg-white rounded-3 p-3">frfvc</div>
            </div>
            <div className="col-md-3">latest content</div>
          </div>
        </div>
        <div className="col-md-3">chat</div>
      </div>
    </>
  );
}
