﻿/** * Module with indesign document functions * @namespace Document * @memberOf IN * @author Bastien Eichenberger */IN.Document = (function (my) {    /**     * Function to create a new document     * @param {number} width the document width     * @param {number} height the document height     * @returns {number} the document with the specified index     */    my.create = function (width, height) {        return doc = app.documents.add({            documentPreferences: {                pageWidth:width,                pageHeight:height            }        });    }    /**     * Function to close the active InDesign document or the document passed as parameter     * @function close     * @memberOf IN.Document     * @param {SaveOptions} save_options NO, ASK, YES     * @param {InDesign Document} [document] the document to save     */    my.close = function (save_options, document) {        if (document === undefined) {            var document = app.activeDocument;        }        if (save_options !== SaveOptions.NO            && save_options !== SaveOptions.ASK            && save_options !== SaveOptions.YES) {            throw {                name: 'InvalidArgumentError',                message: 'you must enter a valid value for the param save_option [NO, ASK, YES]',                fileName: $.fileName,                lineNumber: $.line            };        }        document.close(save_options);    }    /**     * Function who return true if one link is out of date     * @function out_of_date_link     * @memberOf IN.Document     * @param {Document} document the indesign document     * @return {Boolean} true if a link is out of date     */    my.out_of_date_link = function (document) {        for (var i = 0; i < document.links.length; i++) {            var current_link = document.links[i];            if (current_link.status === LinkStatus.LINK_OUT_OF_DATE) {                return true;            }        }        return false;    }    /**     * Function who return true if one link is missing     * @function is_missing_link     * @memberOf IN.Document     * @param {Document} document the indesign document     * @return {Boolean} true if a link is missing     */    my.is_missing_link = function (document) {        for (var i = 0; i < document.links.length; i++) {            var current_link = document.links[i];            if (current_link.status === LinkStatus.LINK_MISSING) {                return true;            }        }        return false;    }    /**     * Function who package a document and its links     * @function save_with_package     * @memberOf IN.Document     * @param {Document} document the indesign document     * @param {String} directories_path_str the path where to store the new document     * @returns {String} the path of the new document     * @throws {Error} if an error occurred during the package for print     */    my.save_with_package = function (document, directories_path_str) {        var current_date = new Date();        var folder_package = new Folder(directories_path_str);        if (folder_package.exists === false) {            folder_package.create();        }        var doc_file = document.fullName;        var current_folder = new Folder(folder_package + "/" + current_date.year_month_day() + "_" + current_date.hours_minutes_seconds());        current_folder.create();        /**         *  bool packageForPrint (to: File, copyingFonts: bool, copyingLinkedGraphics: bool, copyingProfiles: bool, updatingGraphics: bool,         *  includingHiddenLayers: bool, ignorePreflightErrors: bool, creatingReport: bool[, versionComments: string][, forceSave: bool=false])         */        var result_package = document.packageForPrint(current_folder, false, true, false, true, false, true, false);        if (!result_package) {            throw new Error("il y a eu un problème lors de l'assemblage");        }        return current_folder + "/" + document.name;    }    /**     * Function to check if the same file is used many times (image, PDF)     * @function is_link_used_many_time     * @memberOf IN.Document     * @param {Document} document the indesign document     * @param {Link} link_item the link item     * @return {number} The number of time that the link is used     */    my.is_link_used_many_time = function (document, link_item) {        var array_all_links = document.links;        var counter = 0;        for (var i = 0; i < array_all_links.length; i++) {            var current_link = array_all_links[i];            if (link_item.filePath === current_link.filePath) {                counter++;            }        }        return counter;    }    /**     * Function to export an InDesign document as PDF     * @function export_as_PDF     * @memberOf IN.Document     * @param {Document} document the document to export     * @param {string} file_path the file path of the PDF     * @param {string } preset_name the name of the PDF export preset     * @param {InDesign Document} [document] the document to export     * @throws {InvalidArgumentError}     */    my.export_as_PDF = function (file_path, preset_name, document) {        if (document === undefined) {            var document = app.activeDocument;        }        var my_file = new File(file_path);        var export_preset = app.pdfExportPresets.item(preset_name);        if (!export_preset.isValid) {            throw {                name: 'InvalidArgumentError',                message: 'The argument preset_name ' +  preset_name + ' does not exist',                fileName: $.fileName,                lineNumber: $.line            };        }        document.exportFile(ExportFormat.pdfType, my_file, false, export_preset);    }    /**     * Function to export an InDesign document as PDF     * @function export_as_JPG     * @memberOf IN.Document     * @param {string} file_path the file path of the PDF     * @param {JPEGOptionsQuality} quality [HIGH, LOW, MEDIUM, MAXIMUM]     * @param {number} resolution the resolution of the JPEG     * @param {InDesign Document} [document] the document to export     */    my.export_as_JPG = function (file_path, quality, resolution, document) {        if (document === undefined) {            var document = app.activeDocument;        }        var my_file = new File(file_path);        app.jpegExportPreferences.jpegQuality = quality // low medium high maximum        app.jpegExportPreferences.exportResolution = resolution;        app.jpegExportPreferences.jpegExportRange = ExportRangeOrAllPages.EXPORT_ALL;        document.exportFile(ExportFormat.JPG, my_file, false);    }    return my;})(IN.Document || {});