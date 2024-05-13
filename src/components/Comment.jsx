"use client";

import { app } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from "react-icons/hi";

const Comment = ({ comment, commentId, originalPostId }) => {
  const { data: session } = useSession();
  const db = getFirestore(app);

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user?.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session.user.uid
          ),
          {
            username: session.user.username,
            timestamp: serverTimestamp(),
          }
        );
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  return (
    <div className="flex p-3 pl-10 border-b border-gray-200 hover:bg-gray-50">
      <img
        src={comment?.userImg}
        alt="user-img"
        className="size-9 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-sm truncate">{comment?.name}</h4>
            <span className="text-xs truncate">@{comment?.username}</span>
          </div>
          <HiDotsHorizontal className="text-gray-500" />
        </div>

        <p className="text-gray-800 text-xs my-3">{comment?.comment}</p>

        <div className="flex items-center">
          {isLiked ? (
            <HiHeart
              onClick={likePost}
              className="size-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 text-red-600 hover:text-red-500 hover:bg-red-100"
            />
          ) : (
            <HiOutlineHeart
              onClick={likePost}
              className="size-8 cursor-pointer rounded-full transition duration-500 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
            />
          )}
          {likes.length > 0 && (
            <span className={`text-xs ${isLiked && "text-red-600"}`}>
              {likes.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
