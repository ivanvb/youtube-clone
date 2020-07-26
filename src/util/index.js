export const formatDuration = (duration) => {
    return `${Math.floor(duration / 60)
        .toString()
        .padStart(2, '0')}:${(duration % 60).toString().padStart(2, '0')}`;
};

export const formatDate = (date) => {
    return `2 hours ago`;
};
