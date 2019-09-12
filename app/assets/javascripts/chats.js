$(function(){
  function buildChat(chat){
    var content = chat.content;
    var result_image = chat.image ? `<img src="${chat.image}">` : '';
    var result_content = (content ? content : '')
    var html = `<div class="message">
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
      $('#chat_content').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      return false
    })
    .fail(function(){
      alert('メッセージが送信されませんでした');
    })
    .always(function(){
      $(".form__submit").removeAttr("disabled");
    })
  })
})