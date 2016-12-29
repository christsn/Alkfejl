$(document).ready(function(){
    $('#subCom').submit('click', function(e){
        e.preventDefault()
        const headers = {
            'csrf-token': $('[name="_csrf"]').val()
        } 
        const url = '/ajax' + $(this).attr('action')  
        $.ajax({
            url,
            data:{
                id:  $(this).attr('action').split('/')[2],
                text:  $('#newCommentText').val()
            },
            dataType: 'json',
            method: 'POST',
            headers
        }).then(function(result){
            let html='';
            html+=`<div><ul>
                    <form id="`+result.id+`" class="form-horizontal commentform" action="dl" method="post">
                    <li>          
                        <div>`+result.text+`</div>`
                        +`<a class="btn btn-danger comDelete" href="/blog/{{blog.id}}/comment/`
                        +result.id+`/delete" role="button">Hozzászólás törlése</a>
                        </li>
                </form>
                </ul></div>`;
            $('.newComDiv').append(html);    
        })
    })    
});