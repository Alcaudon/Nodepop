'use strict'

exports.errorMessage = function(mensageType){ 
    if (mensageType==="find_no_one"){
        return (i18n.__('find_no_one'));
    }

    if (mensageType==="not_found"){
        return (i18n.__('not_found'));
    }

    if (mensageType==="list_error"){
        return (i18n.__('list_error'));
    }

    if (mensageType==="post_error"){
        return (i18n.__('post_error'));
    }

    if (mensageType==="error_find_One_And_Update"){
        return (i18n.__('error_find_One_And_Update'));
    }

    if (mensageType==="delete"){
        return (i18n.__('delete'));
    }
};

