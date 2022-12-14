import React, { useState } from "react";

interface Feedback {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

type FeedbackList = Feedback[];

export const FeedbackFlow = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackList>([
    {
      name: "Joe Bloggs",
      email: "joe@bloggs.com",
      rating: 5,
      comment: "Fantastic product! Thanks.",
    },
    {
      name: "Jack Sparrow",
      email: "jack@sparrow.com",
      rating: 4,
      comment: "Nicely refined product. Great customer service.",
    },
  ]);

  return (
    <ul>
      {feedbackList.map(({ name, email, rating, comment }) => (
        <li>
          <div>Name: {name}</div>
          <div>Email: {email}</div>
          <div>Rating: {rating}</div>
          <div>Comment: {comment}</div>
        </li>
      ))}
    </ul>
  );
};
