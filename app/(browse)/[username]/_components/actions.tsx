// "use client";

// import { onBlock, onUnblock } from "@/actions/block";
// import { onFollow, onUnfollow } from "@/actions/follow";
// import { Button } from "@/components/ui/button";
// import { useTransition } from "react";
// import { toast } from "sonner";

// interface ActionProps {
//   isFollowing : boolean;
//   userId : string;
//   isBlocked: boolean;
// }

// export const Actions = ({ isFollowing, userId, isBlocked }: ActionProps) => {

//   const [isPending, startTransition] = useTransition();

//   // follow user onClick
//   const handleFollow = () => {
//     startTransition(() => {
//       onFollow(userId)
//       .then((data) => toast.success(`You are now following ${data.following.username}`))
//       .catch(() => toast.error("Something went wrong"))
//     })
//   };

//   // unfollow user onClick
//   const handleUnfollow = () => {
//     startTransition(() => {
//       onUnfollow(userId)
//       .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
//       .catch(() => toast.error("Something went wrong"))
//     })
//   };

//   //on button click Unfollow if the user is already being followed
//   //on button click follow if the user is not already being followed 
//   const onClick = () => {
//     if (isFollowing) {
//       handleUnfollow();
//     } else {
//       handleFollow();
//     }
//   }

//   //block user
//   const handleBlock = () => {
//     startTransition(() => {
//       onBlock(userId)
//       .then((data) => toast.success(`You blocked ${data.blocked.username}`))
//       .catch(() => toast.error("Something went wrong"))
//     })
//   }

//   //unblock user
//   const handleUnblock = () => {
//     startTransition(() => {
//       onUnblock(userId)
//       .then((data) => toast.success(`You unblocked ${data.blocked.username}`))
//       .catch(() => toast.error("Something went wrong"))
//     })
//   }

//   return (
//     <>
//       <Button 
//         onClick={onClick}
//         disabled={isPending}
//         variant="primary"
//         className=""
//       >
//         {isFollowing ? "Unfollow" : "Follow"}
//       </Button>

//       <Button
//         onClick={handleUnblock}
//         disabled={isPending}
//       >
//         Block
//       </Button>
//     </>
//   )
// }