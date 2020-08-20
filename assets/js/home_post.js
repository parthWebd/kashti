{
    //method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/post_form',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ol').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    let newPostDom = function (i) {
        return $(`
            <li id="post-${i._id}">${i.content}</li>
            <?if(i.user.id == locals.user.id){?>
            <small>
                    <a class="delete-post-button" href="/posts/destroy/${ i._id}">delete</a>
            </small>
            <?}?>
            <small>
                ${i.user.name}
            </small>

            <div class="post-comments-list">
                    <ul id="post-comments-<%= i.id %>">
                            
                    </ul>
            </div>
            <div class="post-comment">
                    <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="add comment..." required>
                            <input type="hidden" name="post" value="${ i._id}">
                            <button type="submit">add comment</button>
                    </form>


            </div>

            
    </ol>`);
    }


    //Method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    // console.log(data.data.post_id)
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        })
    }







    createPost();
}

{
    //method to submit the form data for new comment
    let createComment = function () {
        let newCommentForm = $('#comment-form');
        newCommentForm.submit(function (e) {
            e.preventDefault();
            console.log(newCommentForm.serialize());
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function (data) {
                    
                    let newCmnt=newCommentDom(data.data.comnt);
                    console.log(data.data.comnt);
                    $('.post-comments-list>ul').prepend(newCmnt);
                    deleteComment($(' .delete-comment-button', newCmnt));
                    
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    //Method to create a comment in DOM
    let newCommentDom = function (comment) {
        return $(`<li>${ comment.content }</li>
            <? if(comment.user.id == locals.user.id || locals.user.id == i.user.id){?>
            <small>
                    <a href="/comments/destroy/${ comment._id}">delete</a>
            </small>
            <? } ?>
            <small>
                    ${ comment.user.name }
            </small>`
        );
    }

    //Method to delete a Comment from DOM
    let deleteComment=function(deleteLink){
        console.log("Hey shyam");
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log("he ram",data.data.comnt._id);
                    $(`#comment-${data.data.comnt._id}`).remove();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });

        })
    }


    createComment();

}