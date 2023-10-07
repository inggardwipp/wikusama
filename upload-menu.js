//load library multer
const multer = require(`multer`);

//config of storage
const configStrorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, `./menu_image`);
    },
    filename: (request, file, callback) => {
        //icun.jpg
        //format: image-tgl-icun.jpg
        callback(null, `image-${Date.now()}-${file.originalname}`);
    },
});

//define function upload
const upload = multer({
    storage: configStrorage,
    //file
    fileFilter: (request, file, callback) => {
        //define accepted
        const extension = [`image/jpg`, `image/png`, `image/jpeg`];

        //chek the extension
        if (!extension.includes(file.mimetype)) {
            // refuse upload
            callback(null, false);
            return callback(null, `invalid type of file`);
        }

        //filter size limit
        //define max size
        const maxSize = 1 * 1024 * 1024;
        const fileSize = request.header[`content-lenghth`];

        if (fileSize > maxSize) {
            // refuse upload
            callback(null, false);
            return callback(null, `File size is over`);
        }
        // accept
        callback(null, true);
    },
});

//export function
module.exports = upload;