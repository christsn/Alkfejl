$(document).ready(function(){
 $('.comDelete').on('click', function(e){
    e.preventDefault()
    const url = '/ajax' + $(this).attr('href')
    ajaxDeleteComment(url)
      .then(data => {
        location.assign(`/blog/${id}`)
      })
      .catch(xhr => {
        $('.help-block').text(xhr.responseText)
      })
  })
})

function ajaxDeleteComment(url) {
  const headers = {
    'csrf-token': $('[name="_csrf"]').val()
  }
  const parts = url.split('/')
  const id =parts[5]
  return Promise.resolve(
    $.ajax({
      url,
      method: 'DELETE',
      dataType: 'json',
      success: function(){
        $('#'+id).remove();
      },
      headers
    })
  )
}