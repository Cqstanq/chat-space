$(function(){
  function buildChat(chat){
    var html = `<div class="upper-message">
                  <div class="upper-message__user-name">
                    ${chat.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${chat.created_at}
                  </div>
                </div>
                <div class="lower-message">
                  <div class="lower-message__content">
                    ${chat.content}
                  </div>
                  <div class='lower-message__image'>
                      ${chat.image}
                  </div>
                </div>`
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
      $('.form__submit').removeAttr('data-disable-with');
      $('.messages').animate({ scrollTop: $(html)[0].scrollHeight});
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