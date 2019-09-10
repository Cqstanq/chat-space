$(function(){
  function buildChat(chat){
    var html = `.upper-message
                  .upper-message__user-name
                    = ${chat.user_name}
                  .upper-message__date
                    = ${chat.created_at}
                .lower-message
                  - if ${chat.content}.present?
                    %p.lower-message__content
                      = ${chat.content}
                    = image_tag ${chat.image.url}, class: 'lower-message__image' if chat.image.present?`
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
      $('.messages').append(html)
      $('#chat_content').val('')
    })
    .fail(function(){
      alert('メッセージが送信されませんでした')
    })
    .always(function(){
      $(".form__submit").removeAttr("disabled");
    });
  })
})