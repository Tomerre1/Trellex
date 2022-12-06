export const cloudinaryService = {
    uploadFile
}

function uploadFile(ev, type = 'image', blob = null) {
    const CLOUD_NAME = 'dusakec3z'
    const PRESET_NAME = 'pjprwzkr'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`

    const formData = new FormData();
    (type === 'image') ? formData.append('file', ev.target.files[0]) : formData.append('file', blob)
    formData.append('upload_preset', PRESET_NAME);

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(err => console.error(err))
}

// const CLOUD_NAME = 'dswmustlv'
// const PRESET_NAME = 'f7cyi5ho'
