$(function(){
    $('#searchUser [name=userName]').on('input', function(){
        $.get('/ajax/user',{
            userName:$(this).val()
        }).done(function(result){
            let html='';
            for(let i=0;i<result.length;i++){
                const user = result[i];
                html+='<a class="list-group-item" href="/user/'+user.id+'">'+user.username+'</a>';
            }       
            $('.suggestions').html(html);
        });
    });
})
