$(function(){
    $('#search [name=blogTitle]').on('input', function(){
        $.get('/ajax/blog',{
            blogTitle:$(this).val()
        }).done(function(result){
            let html='';
            for(let i=0;i<result.length;i++){
                const blog = result[i];
                html+='<a class="list-group-item" href="/blog/'+blog.id+'">'+blog.title+'</a>';
            }       
            $('.suggestions').html(html);
        });
    });
})
