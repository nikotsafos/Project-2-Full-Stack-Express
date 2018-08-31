// for put and delete
$(document).ready(function(){
  console.log('ajax is running and doc is loaded');

  // $('.delete-btn').click(function(e){
  //   e.preventDefault();
  //   var url = $(this).attr('href');
  //
  //   $.ajax({
  //     url: url,
  //     method: 'DELETE'
  //   }).done(function(res){
  //     window.location = '/' + url.split('/')[1];
  //   }).fail(function(err){
  //   });
  // });

  $('.edit').submit(function(e){
    e.preventDefault();
    console.log('about to submit put req');

    $.ajax({
      url: $(this).attr('action'),
      method: 'PUT',
      data: $(this).serialize()
    }).done(function(res){
      console.log('success', res)
    }).fail(function(err){
      console.log('error', err)
    });
  });
});
