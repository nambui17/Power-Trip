const editTrip= async (event) => {
    event.preventDefault()
    const tripComment = document.getElementById("tripComment").value.trim()
    const startDate = document.getElementById("start-date").value.trim()
    const endDate = document.getElementById("end-date").value.trim()
    const tripPrice = document.getElementById("trip-price").value.trim()
    const tripRating =document.getElementById("trip-rating").value.trim()
    const selectUser=document.getElementById("select-user").value.trim()

    const response= await fetch(`/api/trip/${id}`,{
        method:"PUT", 
        body :{
            tripComment, 
            tripPrice, 
            tripRating, 
            startDate, 
            endDate, 
            selectUser
        }


    })
}