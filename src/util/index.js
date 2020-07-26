export const formatDuration = (duration) => {
    return `${Math.floor(duration / 60)
        .toString()
        .padStart(2, '0')}:${(duration % 60).toString().padStart(2, '0')}`;
};

export const formatDate = (date) => {
    return `2 hours ago`;
};

export const getVideoDuration = (files) => {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'metadata';

        video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(video.src);
            const duration = video.duration;
            resolve(duration);
        };

        video.src = URL.createObjectURL(files);
    });
};
