export const ratingColor = (rating) => {
    rating = Number(rating)
    return  rating >= 2400 ? 'red' :
            rating >= 2200 ? 'orange' :
            rating >= 2000 ? 'yellow' :
            rating >= 1800 ? 'purple' :
            rating >= 1600 ? 'blue' :
            rating >= 1400 ? 'cyan' :
            rating >= 1200 ? 'green' : 'gray';
}