$(function() {
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html;
  };

  function appendErr(msg){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${msg}</p>
                </div>`
    return html
  }

  function addName(id, name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                 </div>`
    return html;
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      if (input.length === 0) {
        $("#user-search-result").empty();
      }
      else if (input.length !== 0) {
        $("#user-search-result").empty();
        users.forEach(function(user){
          var html = appendUser(user)
          $("#user-search-result").append(html)
        });
      }
      else {
        $("#user-search-result").empty();
        var html = appendErr("一致するユーザーはいません");
        $("#user-search-result").append(html);
      }
    })

    
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  })
  
  $("#user-search-result").on("click", ".user-search-add", function() {
    $(this).parent().remove();
    var id = $(this).attr("data-user-id");
    var name = $(this).attr("data-user-name");
    var html = addName(id,name)
    $(`#chat-group-users`).append(html);
  })

  $("#chat-group-users").on("click",".user-search-remove", function() {
    $(this).parent().remove();
  })
})
