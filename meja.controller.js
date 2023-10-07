/** function untuk mengolah request dan memberi respon */
const { response, request } = require("express")

/** call model meja */
const mejaModel = require(`../models/index`).meja

/** call joi library */
const joi = require(`joi`)

/**define func to validate input of meja */
const validateMeja = async(input) => {
    /** define rules of validation */
    let rules = joi.object().keys({
        nomor_meja: joi.string().required(),
        status: joi.boolean().required()
    })

    /** validation proses */
    let { error } = rules.validate(input)

    if (error) {
        /** arrange a error message if validation */
        let message = error
            .details
            .map(item => item.message)
            .join(`,`)
        return {
            status: false,
            message: message
        }
    }
    return { status: true }
}

/** membuat dan mengekspor untuk load meja */
exports.getMeja = async(request, response) => {
    try {
        /** call meja form db using model */
        let meja = await mejaModel.findAll()

        /** mmeberi respon dengan meja */
        return response.json({
            status: true,
            data: meja
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })

    }
}

/** create n export function to filter available meja */
exports.availableMeja = async(request, response) => {
    try {
        /** define param for status true*/
        let param = { status: true }

        /** get data meja from db with defined filter */
        let meja = await mejaModel.findAll({ where: param })

        /** give response */
        return response.json({
            status: true,
            data: meja
        })

    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/** create an export func to add new meja */
exports.addMeja = async(request, response) => {
    try {
        /** validate data */
        let resultValidation = validateMeja(request.body)
        if (resultValidation.status == false) { //!: membalikan keadaan false -> true = true -> false
            return response.json({
                status: false,
                message: resultValidation.message
            })
        }

        /** insert data meja to db using model */
        await mejaModel.create(request.body)

        /**give a response to tell that insert has successed */
        return response.json({
            status: true,
            data: `Data meja berhasil ditambahkan`
        })

    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/** cretae and export funct to update meja */
exports.updateMeja = async(request, response) => {
    try {
        /** get paramaeter for update */
        let id_meja = request.params.id_meja

        /** validate data meja */
        let resultValidation = validateMeja(request.body)
            /** ! tanda tidak valid */
        if (resultValidation.status == false) {
            return response.json({
                status: false,
                message: await resultValidation.message
            })
        }

        /** proses run update meja using model */
        /** await memamggil function yang menggunakan promise (update) */
        await mejaModel.update(request.body, {
            where: { id_meja: id_meja }
        })

        /** give a response */
        return response.json({
            status: true,
            message: `Data meja berhasil diubah`
        })

    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

/** create and export func to delete meja*/
exports.deleteMeja = async(request, response) => {
    try {
        /** get id_meja that will be delet */
        let id_meja = request.params.id_meja

        /** run  delete meja using model */
        await mejaModel.destroy({
            where: { id_meja: id_meja }
        })

        /** give a response */
        return response.json({
            status: true,
            message: `Data meja berhasil dihapus`
        })

    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}