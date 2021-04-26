const useAddMovieValidation = () => {

    function ValidateAddMovie(values) {
        let errors = {}

        errors.title = validateTitle(values.title)
        errors.director = validateDirector(values.director)
        errors.synopsis = validateSynopsis(values.synopsis)
        errors.runningTimeH = validateRunningTimeH(values.runningTimeH)
        errors.runningTimeMin = validateRunningTimeMin(values.runningTimeMin)
        errors.published = validatePublished(values.published)

        return errors
    }

    function ValidateInput(target, value) {
        switch (target) {
            case 'title':
                return validateTitle(value)
            case 'director':
                return validateDirector(value)
            case 'synopsis':
                return validateSynopsis(value)
            case 'runningTimeH':
                return validateRunningTimeH(value)
            case 'runningTimeMin':
                return validateRunningTimeMin(value)
            case 'published':
                return validatePublished(value)
            default:
                return
        }

    }

    function validateTitle(title) {
        if(!title.trim()) {
            return "Title required"
        } 
    }

    function validateDirector(director) {
        if(!director.trim()) {
            return "Director required"
        } 
    }

    function validateSynopsis(synopsis) {
        if(!synopsis.trim()) {
            return "Synopsis required"
        } 
    }


    function validateRunningTimeH(runningTimeH) {
        if(!runningTimeH.trim()) {
            return "Running time hours required"
        } else if (runningTimeH < 0 || (parseInt(runningTimeH) != runningTimeH) ) {
            return "Invalid hour format"
        } 
    }
    function validateRunningTimeMin(runningTimeMin) {
        if(!runningTimeMin.trim()) {
            return "Running time minutes required"
        } else if(runningTimeMin < 0 || runningTimeMin > 59 || (parseInt(runningTimeMin) != runningTimeMin)) {
            return "Invalid minutes format"
        }
    }

    function validatePublished(published) {
        if((published.trim() && parseInt(published) != published )) {
            return "Invalid year of publishing"
        }
    }

    return {ValidateAddMovie, ValidateInput}
}

export default useAddMovieValidation