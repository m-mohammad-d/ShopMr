import React, { useState } from "react";
import { Review } from "../types/reviewsType";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditReviewModal from "./EditReviewModal";
import { GetMeResponse } from "../types/UserType";

interface CommentCardProps {
  review: Review;
  onReviewDelete: (commentId: string) => void;
  onReviewUpdate: (commentId: string, updatedData: { rating: number; comment: string }) => void;
  userInfo: GetMeResponse;
}

const CommentCard: React.FC<CommentCardProps> = ({ review, onReviewDelete, onReviewUpdate, userInfo }) => {
  const defaultProfileImage = "/userLogo.jpg";
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const handleDelete = () => {
    onReviewDelete(review._id);
    closeModal();
  };

  const handleUpdate = (updatedData: { rating: number; comment: string }) => {
    onReviewUpdate(review._id, updatedData);
    closeEditModal();
  };

  return (
    <div className="flex items-start gap-4 rounded-lg border bg-white p-4 shadow-md">
      <div className="flex-shrink-0">
        <img src={review.user.photo || defaultProfileImage} alt={`${review.user.name}'s profile`} className="h-12 w-12 rounded-full border border-gray-300 object-cover" />
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">{review.user.name}</h3>
          </div>
          {userInfo?.data?.user?.id === review?.user?._id && (
            <div className="flex gap-2">
              <FaEdit className="cursor-pointer text-blue-500 transition-colors hover:text-blue-700" onClick={openEditModal} />
              <FaTrash className="cursor-pointer text-red-500 transition-colors hover:text-red-700" onClick={openModal} />
            </div>
          )}
        </div>

        <div className="mt-1 flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} className={`text-xl ${review.rating >= star ? "text-yellow-500" : "text-gray-300"}`} />
          ))}
        </div>

        <p className="mt-2 text-gray-700">{review.comment}</p>
      </div>

      <ConfirmDeleteModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDelete} />
      <EditReviewModal isOpen={isEditModalOpen} onClose={closeEditModal} onConfirm={handleUpdate} currentReview={{ rating: review.rating, comment: review.comment }} />
    </div>
  );
};

export default CommentCard;
