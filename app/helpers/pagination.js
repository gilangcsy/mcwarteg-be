function Pagination(page, size, defaultSize) {
    const pageAsNumber = Number.parseInt(page)
    const sizeAsNumber = Number.parseInt(size)

    let newPage = 0
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        newPage = pageAsNumber
    }
    
    let newSize = defaultSize
    if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < defaultSize) {
        newSize = sizeAsNumber
    }

    let sizeAndPage = {
        size: newSize,
        page: newPage
    }

    return sizeAndPage;
}


module.exports = {
    Pagination: Pagination
}