import { Review } from "../models/Review.js";

export const addReview=async(data)=>{
    const {name,rating,review,reviewerCode,email,display}=data;

    const createReview=await Review.create({
        name,
        rating,
        review,
        reviewerCode,
        email,
        display
    })
    return createReview;
}

export const getReviews=async(displayOnly = false)=>{
    const query = displayOnly ? { display: true } : {};
    const allReviews = await Review.find(query);
    return allReviews;
}

export const getReviewsAdmin=async()=>{
    const allReviews=await Review.find();
    return allReviews;
}