$(function(){
  function buildChat(chat){
    var result_image = chat.image ? `<img src="${chat.image}">` : '';
    var result_content = chat.content ? chat.content : '';
    var html = `<div class="message" data-chat-id="${chat.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${chat.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${chat.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <div class="lower-message__content">
                      ${result_content}
                    </div>
                    <div class='lower-message__image'>
                      ${result_image}
                    </div>
                  </div>
                </div>`
    return html
  }

  
  $('#new_chat').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(chat){
      var html = buildChat(chat);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      return false
    })
    .fail(function(){
      alert('メッセージが送信されませんでした');
    })
    .always(function(){
      $(".form__submit").removeAttr("disabled");
    })
  })
  
  var reloadMessages = function() {
    var last_chat_id = $(".message").last().data("chat-id");
    if(location.href.match('/chats')){
      $.ajax({
        url: 'api/chats',
        type: 'GET',
        data: {id: last_chat_id},
        dataType: 'json',
      })
      .done(function(chats) {
        if (chats.length != 0) {
          chats.forEach(function(chat){
            insertHTML = ''
            insertHTML += buildChat(chat);
            $(".messages").append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
          })
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      })
    }
  }
  setInterval(reloadMessages, 5000);
})
