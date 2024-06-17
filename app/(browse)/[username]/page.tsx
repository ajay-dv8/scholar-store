
import { notFound } from 'next/navigation';
import { getUserByUsername } from "@/services/user-service"
// get username as params or add to url
interface UserPageProps {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: UserPageProps) => {

  const user = await getUserByUsername(params.username)

  // return notfound page if not user
  if (!user) {
    notFound();
  }

  // check if you are already following user
  // const isFollowing = await IsFollowingUser(user.id); 
  // const isBlocked = await isBlockedByUser(user.id);

  // return notfound 404 if user is blocked by the otherUser te user is searching
  // if (isBlocked) {
  //   notFound();
  // }

  return (
    <div>
      <p>User Id: {user.id}</p> 
      <p>Username : {user.username}</p>
      {/* <p>is Following : {`${isFollowing}`}</p>
      <p>is Blocked this user : {`${isBlocked}`}</p> */}

      {/* <Actions 
        userId={user.id}
        isBlocked={false}      
        isFollowing={isFollowing} 
      /> */}
    </div>
  )
};

export default UserPage
