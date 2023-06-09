import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Button from "@/components/Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/useEditModal";
import LoginModal from "@/components/Modal/LoginModal";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import useFollow from "@/hooks/useFollow";
interface UserBioProps {
  userId: string;
}
const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const editModal = useEditModal();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const { isFollowing, toggleFollow } = useFollow(userId);
  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "dd/MM/yyyy");
  }, [fetchedUser?.createdAt]);

  const editOnClick = useCallback(() => {
    editModal.onOpen();
  }, [editModal]);
  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editOnClick} />
        ) : (
          <Button
            onClick={toggleFollow}
            label={isFollowing ? "Unfollow" : "Follow"}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div className="flex flex-row items-center ap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p className="ml-1">Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
