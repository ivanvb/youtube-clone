export const formatDuration = (duration) => {
    return `${Math.floor(duration / 60)
        .toString()
        .padStart(2, '0')}:${(duration % 60).toString().padStart(2, '0')}`;
};

export const formatDate = (date) => {
    console.log(date, new Date(date));
    const delta = Math.round((new Date() - new Date(date)) / 1000);

    let minute = 60,
        hour = minute * 60,
        day = hour * 24;

    let relativeTime;

    if (delta < 30) {
        relativeTime = 'just uploaded';
    } else if (delta < minute) {
        relativeTime = delta + ' seconds ago';
    } else if (delta < 2 * minute) {
        relativeTime = 'a minute ago';
    } else if (delta < hour) {
        relativeTime = Math.floor(delta / minute) + ' minutes ago';
    } else if (Math.floor(delta / hour) == 1) {
        relativeTime = '1 hour ago';
    } else if (delta < day) {
        relativeTime = Math.floor(delta / hour) + ' hours ago';
    } else if (delta < day * 2) {
        relativeTime = 'yesterday';
    } else {
        relativeTime = Math.floor(delta / day) + ' days ago';
    }

    return relativeTime;
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
