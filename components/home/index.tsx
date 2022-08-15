// import CreatePost from "@/components/post/createPost";

import { CreatePostComponent, PostComponent } from "@/components/post";
import { SuggestedUserComponent } from "@/components/users";
import CustomCard from "@/globalComponents/customCard";
import { setSuggestedUser } from "@/slice/userSlices";
import {
  generateRandomSuggestedUser,
  randomLorem,
} from "@/utils/generateFakeData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "store/store";
import ICONS from "@/globalComponents/icons";
import Event from "@/globalComponents/event";
import Birthday from "@/components/users/components/birthday/birthday";
import { getFeedPostThunk } from "@/slice/postSlices";

const { HorizontalThreeDots } = ICONS;

const event = {
  content: randomLorem(5),
  title: "Graduation Ceremony",
  // seen: [
  //   { id: 1, name: randomName(), profileImage: randomAvatar() },
  //   { id: 2, name: randomName(), profileImage: randomAvatar() },
  // ],
};

export default function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.feed);
  console.log({ posts });
  const { suggestedUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getFeedPostThunk());

    const newSuggestedUser = [1].map(() => generateRandomSuggestedUser());
    dispatch(setSuggestedUser(newSuggestedUser));
  }, [dispatch]);
  return (
    <>
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-9">
              <CreatePostComponent />
              {posts.map((post, idx) => {
                return (
                  <div className="mt-3 bg-white rounded-3 p-3" key={idx}>
                    <PostComponent {...post} />
                  </div>
                );
              })}
            </div>
            <div
              // className={`col-md-3 position-fixed w-auto ${styles.fixed_col}`}
              className={`col-md-3`}
            >
              <CustomCard
                title={"You Might Like"}
                icon={
                  <div
                    style={{
                      fontSize: "15px",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  >
                    See all
                  </div>
                }
              >
                {suggestedUser.map((item, idx) => {
                  return <SuggestedUserComponent key={idx} {...item} />;
                })}
              </CustomCard>
              <CustomCard
                title={"Recent Event"}
                icon={
                  <div
                    style={{
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                  >
                    <HorizontalThreeDots />
                  </div>
                }
              >
                <Event {...event} />
              </CustomCard>
              <CustomCard
                title={"Birthdays"}
                icon={
                  <div
                    style={{
                      fontSize: "15px",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  >
                    See all
                  </div>
                }
              >
                <Birthday />
              </CustomCard>
            </div>
          </div>
        </div>
        <div className="col-md-3">chat</div>
      </div>
    </>
  );
}
