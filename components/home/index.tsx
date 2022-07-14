// import CreatePost from "@/components/post/createPost";

import { CreatePostComponent, PostComponent } from "@/components/post";

export default function HomePage() {
  return (
    <>
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-9">
              <CreatePostComponent />
              <div className="mt-3 bg-white rounded-3 p-3">
                <PostComponent />
              </div>
            </div>
            <div className="col-md-3">latest content</div>
          </div>
        </div>
        <div className="col-md-3">chat</div>
      </div>
    </>
  );
}
